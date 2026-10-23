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
  Resolve light-dark(a, b) → a (light) or b (dark)
  Handles nested parens inside arguments
*/
const resolveLightDark = (css, mode) => {
  let result = css;
  let searchFrom = 0;
  while(true){
    const idx = result.indexOf('light-dark(', searchFrom);
    if(idx === -1) break;
    const start = idx;
    let i = idx + 'light-dark('.length;
    let depth = 1;
    let commaPos = -1;
    while(i < result.length && depth > 0){
      if(result[i] === '(') depth++;
      else if(result[i] === ')') depth--;
      else if(result[i] === ',' && depth === 1 && commaPos === -1) commaPos = i;
      if(depth === 0) break;
      i++;
    }
    if(commaPos === -1 || depth !== 0){
      searchFrom = idx + 1;
      continue;
    }
    const lightVal = result.slice(start + 'light-dark('.length, commaPos).trim();
    const darkVal = result.slice(commaPos + 1, i).trim();
    const replacement = mode === 'dark' ? darkVal : lightVal;
    result = result.slice(0, start) + replacement + result.slice(i + 1);
    searchFrom = start;
  }
  return result;
};

/*
  Custom properties set by a rule other than :root, such as `.btn.primary { --btn_tc: white }` over `.btn { color: var(--btn_tc) }`.
  Inlining var() with the :root values alone loses those overrides (the primary button's text would stay the default black), and a
  mail client cannot resolve them either. So for each rule that sets such a property, every rule that reads it gets a copy for the
  elements that match both: the two compound selectors joined (`.btn.primary`, `.btn:hover.primary`) with the reading declarations
  and the set value put in. Only a rule of a single compound selector (no descendant or child combinator) can be joined this way;
  `.a .b { --x: 1 }` over `.b { color: var(--x) }` is left as the :root value.
*/
const splitCompound = selector => {
  let depth = 0;
  let type = '';
  const text = selector.trim();
  for(let i = 0; i < text.length; i++){
    const char = text[i];
    if(char === '(' || char === '[') depth++;
    else if(char === ')' || char === ']') depth--;
    else if(depth === 0 && /[\s>+~,]/.test(char)) return null;
  }
  const match = /^([a-zA-Z][\w-]*|\*)/.exec(text);
  if(match) type = match[1];
  return { type, rest: text.slice(type.length) };
};

const joinCompounds = (a, b) => {
  const left = splitCompound(a);
  const right = splitCompound(b);
  if(!left || !right || left.rest.includes('::') || right.rest.includes('::')) return null;
  if(left.type && right.type && left.type !== right.type) return null;
  return `${left.type || right.type}${left.rest}${right.rest}`;
};

const declarationsOf = node => {
  const found = [];
  node.block.children.forEach(child => {
    if(child.type === 'Declaration') found.push({ property: child.property, value: csstree.generate(child.value), important: Boolean(child.important) });
  });
  return found;
};

const selectorsOf = node => node.prelude.type === 'SelectorList' ? node.prelude.children.toArray().map(selector => csstree.generate(selector)) : [];

const flattenScopedVars = (ast, tokens) => {
  const rules = ast.children.toArray().filter(node => node.type === 'Rule');
  const added = [];
  rules.forEach(setter => {
    const set = new Map(declarationsOf(setter).filter(declaration => declaration.property.startsWith('--')).map(declaration => [declaration.property, declaration.value]));
    if(!set.size) return;
    const setterSelectors = selectorsOf(setter);
    rules.forEach(reader => {
      if(reader === setter) return;
      const reading = declarationsOf(reader).filter(declaration => !declaration.property.startsWith('--') && [...set.keys()].some(name => declaration.value.includes(`var(${name}`)));
      if(!reading.length) return;
      const body = reading.map(declaration => {
        const value = declaration.value.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)/g, (match, name) => (set.has(name) ? set.get(name) : match));
        return `${declaration.property}:${value}${declaration.important ? '!important' : ''}`;
      }).join(';');
      const joined = [];
      selectorsOf(reader).forEach(readerSelector => setterSelectors.forEach(setterSelector => {
        const selector = joinCompounds(readerSelector, setterSelector);
        if(selector && selectorMatchesHTML(selector, tokens) && !joined.includes(selector)) joined.push(selector);
      }));
      if(joined.length) added.push(`${joined.join(',')}{${body}}`);
    });
  });
  if(added.length) csstree.parse(added.join('\n')).children.forEach(node => ast.children.appendData(node));
};

/*
  Main shake function
*/
export default (html, { theme, colorMode } = {}) => {
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

  flattenScopedVars(ast, tokens);

  /* Every var() is inlined below, so the custom properties themselves are dead weight in an email */
  csstree.walk(ast, {
    visit: 'Declaration',
    enter(node, item, list){
      if(node.property.startsWith('--')) list.remove(item);
    }
  });

  let output = inlineVars(csstree.generate(ast), resolved);
  if(colorMode === 'light' || colorMode === 'dark'){
    output = resolveLightDark(output, colorMode);
  }
  return output;
};
