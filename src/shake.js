import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as csstree from 'css-tree';
import { Parser } from 'htmlparser2';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const kempoPath = resolve(__dirname, 'kempo.css');

/*
  Variable Extraction — only from top-level :root rules
*/
const extractRootVars = css => {
  const vars = new Map();
  const ast = csstree.parse(css);
  ast.children.forEach(node => {
    if(node.type !== 'Rule') return;
    const selector = csstree.generate(node.prelude);
    if(selector !== ':root') return;
    node.block.children.forEach(child => {
      if(child.type === 'Declaration' && child.property.startsWith('--')){
        vars.set(child.property, csstree.generate(child.value));
      }
    });
  });
  return vars;
};

/*
  Resolve all var() references to flat values via multi-pass
*/
const resolveAllVars = vars => {
  const resolved = new Map(vars);
  let changed = true;
  let passes = 0;
  while(changed && passes < 30){
    changed = false;
    passes++;
    for(const [key, val] of resolved){
      const newVal = val.replace(
        /var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)/g,
        (match, name, fallback) => {
          if(name === key) return match;
          const ref = resolved.get(name);
          if(ref !== undefined && !ref.includes(`var(${key})`)){
            changed = true;
            return ref;
          }
          if(fallback !== undefined){
            changed = true;
            return fallback.trim();
          }
          return match;
        }
      );
      if(newVal !== val) resolved.set(key, newVal);
    }
  }
  return resolved;
};

/*
  HTML Token Collection
*/
const collectHTMLTokens = html => {
  const tags = new Set(['html', 'body']);
  const classes = new Set();
  const ids = new Set();
  const attrs = new Set();
  const parser = new Parser({
    onopentag(name, attributes){
      tags.add(name.toLowerCase());
      if(attributes.class){
        attributes.class.split(/\s+/).forEach(c => {
          if(c) classes.add(c);
        });
      }
      if(attributes.id) ids.add(attributes.id);
      Object.keys(attributes).forEach(a => attrs.add(a.toLowerCase()));
    }
  });
  parser.write(html);
  parser.end();
  return { tags, classes, ids, attrs };
};

/*
  Selector Matching — check if any part of a selector matches HTML tokens
*/
const selectorMatchesHTML = (selectorStr, tokens) => {
  const parts = selectorStr.split(',');
  return parts.some(part => {
    const trimmed = part.trim();
    if(!trimmed) return false;
    if(trimmed === ':root' || trimmed === '*') return true;
    const cleaned = trimmed
      .replace(/::[\w-]+/g, '')
      .replace(/:[\w-]+(\([^)]*\))?/g, '');
    const segments = cleaned.split(/[\s>+~]+/).filter(Boolean);
    return segments.every(segment => {
      const tagMatch = segment.match(/^([a-zA-Z][\w-]*)/);
      const classMatches = [...segment.matchAll(/\.([\w-]+)/g)].map(m => m[1]);
      const idMatches = [...segment.matchAll(/#([\w-]+)/g)].map(m => m[1]);
      const attrMatches = [...segment.matchAll(/\[([\w-]+)/g)].map(m => m[1].toLowerCase());
      if(tagMatch && !tokens.tags.has(tagMatch[1].toLowerCase())) return false;
      if(classMatches.length && classMatches.some(c => !tokens.classes.has(c))) return false;
      if(idMatches.length && idMatches.some(id => !tokens.ids.has(id))) return false;
      if(attrMatches.length && attrMatches.some(a => !tokens.attrs.has(a))) return false;
      return true;
    });
  });
};

/*
  Inline var() references in a CSS string using resolved values
*/
const inlineVars = (css, vars) => {
  let result = css;
  let prev;
  do {
    prev = result;
    result = result.replace(
      /var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)/g,
      (match, name, fallback) => {
        const val = vars.get(name);
        if(val !== undefined) return val;
        if(fallback !== undefined) return fallback.trim();
        return match;
      }
    );
  } while(result !== prev);
  return result;
};

/*
  Main shake function
*/
export default (html, { theme } = {}) => {
  const kempoCss = readFileSync(kempoPath, 'utf-8');
  const vars = extractRootVars(kempoCss);
  if(theme){
    const themeCSS = typeof theme === 'string' && theme.includes('{')
      ? theme
      : readFileSync(resolve(theme), 'utf-8');
    extractRootVars(themeCSS).forEach((val, key) => vars.set(key, val));
  }
  const resolved = resolveAllVars(vars);
  const tokens = collectHTMLTokens(html);
  const ast = csstree.parse(kempoCss);

  /* Remove :root rules that are purely variable declarations */
  csstree.walk(ast, {
    visit: 'Rule',
    enter(node, item, list){
      const selector = csstree.generate(node.prelude);
      if(selector === ':root'){
        let allVars = true;
        node.block.children.forEach(child => {
          if(child.type !== 'Declaration' || !child.property.startsWith('--')){
            allVars = false;
          }
        });
        if(allVars){
          list.remove(item);
          return;
        }
        /* Strip variable declarations from mixed :root blocks */
        const toRemove = [];
        node.block.children.forEach((child, childItem) => {
          if(child.type === 'Declaration' && child.property.startsWith('--')){
            toRemove.push(childItem);
          }
        });
        toRemove.forEach(childItem => node.block.children.remove(childItem));
        return;
      }
    }
  });

  /* Remove theme-specific override rules (dark/light/auto attribute selectors) */
  csstree.walk(ast, {
    visit: 'Rule',
    enter(node, item, list){
      const selector = csstree.generate(node.prelude);
      if(/\[theme=/.test(selector)){
        list.remove(item);
      }
    }
  });

  /* Remove prefers-color-scheme media queries */
  csstree.walk(ast, {
    visit: 'Atrule',
    enter(node, item, list){
      if(node.name !== 'media') return;
      const query = csstree.generate(node.prelude);
      if(query.includes('prefers-color-scheme')){
        list.remove(item);
      }
    }
  });

  /* Tree-shake: remove rules whose selectors don't match the HTML */
  csstree.walk(ast, {
    visit: 'Rule',
    enter(node, item, list){
      const selector = csstree.generate(node.prelude);
      if(!selectorMatchesHTML(selector, tokens)){
        list.remove(item);
      }
    }
  });

  /* Remove now-empty @media blocks */
  csstree.walk(ast, {
    visit: 'Atrule',
    enter(node, item, list){
      if(node.name === 'media' && node.block && node.block.children.size === 0){
        list.remove(item);
      }
    }
  });

  return inlineVars(csstree.generate(ast), resolved);
};
