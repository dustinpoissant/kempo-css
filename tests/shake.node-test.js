import shake from '../src/shake.js';

/*
  Tree shaking for emails. The shaken CSS has no var() left, only the rules the HTML uses, and a custom property that a class
  sets (`.primary { --btn_tc: white }`) still reaches the rules that read it, because a mail client cannot resolve it.
*/

const rule = (css, selectorPart) => [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].find(match => match[1].includes(selectorPart))?.[2] ?? '';

export default {
  'only the rules the HTML uses are kept, with no var() left': async ({ pass, fail }) => {
    const css = shake('<p class="tc-muted">Hi</p>', { colorMode: 'light' });
    if(!css.includes('.tc-muted')) return fail('a used class was removed');
    if(css.includes('.btn') || /(^|[,}\s])table[,{\s]/.test(css)) return fail('rules for things that are not in the HTML were kept');
    if(css.includes('var(')) return fail('a var() was left');
    if(css.includes('light-dark(')) return fail('a light-dark() was left');
    pass('');
  },

  'a primary button has white text, not the default black': async ({ pass, fail }) => {
    const css = shake('<a class="btn primary" href="#">Go</a>', { colorMode: 'light' });
    const base = rule(css, '.btn,');
    if(!/color:\s*rgba\(0, 0, 0/.test(base)) return fail(`the default button text should be dark: ${base.slice(0, 200)}`);
    const primary = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].filter(match => /\.btn\.btn\.primary/.test(match[1]) || /\.btn\.primary/.test(match[1]) && /(^|;)\s*color:/.test(match[2]));
    if(!primary.some(match => /(^|;)\s*color:\s*rgba\(255, 255, 255/.test(match[2]))) return fail('nothing gives the primary button white text');
    if(css.includes('--btn_tc')) return fail('a custom property was left');
    pass('');
  },

  'the hover colour of a primary button is white too': async ({ pass, fail }) => {
    const css = shake('<button class="primary">Go</button>', { colorMode: 'light' });
    const hover = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].find(match => /:hover/.test(match[1]) && /\.primary/.test(match[1]) && /(^|;)\s*color:\s*rgba\(255, 255, 255/.test(match[2]));
    if(!hover) return fail('the hover state of a primary button does not have white text');
    pass('');
  },

  'a custom property set by a class does not change an element without it': async ({ pass, fail }) => {
    const css = shake('<a class="btn" href="#">Go</a>', { colorMode: 'light' });
    if(/rgba\(255, 255, 255/.test(rule(css, '.btn'))) return fail('a plain button got the white text of a primary one');
    pass('');
  },

  'joined selectors never mix two element types': async ({ pass, fail }) => {
    const css = shake('<button class="primary">Go</button><input type="submit" class="primary">', { colorMode: 'light' });
    const pieces = [...css.matchAll(/([^{}]+)\{/g)].flatMap(match => match[1].split(',')).map(piece => piece.trim().replace(/\[type="button"\]/g, ''));
    if(pieces.some(piece => /^input/.test(piece) && /button[.:\[]/.test(piece) || /^button/.test(piece) && /input[.:\[]/.test(piece))) return fail('a selector asks for an element that is two tags at once');
    pass('');
  },
};
