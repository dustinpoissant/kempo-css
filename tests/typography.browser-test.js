const getStyle = (el, prop) => getComputedStyle(el)[prop];

export const beforeAll = async () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/kempo.css';
  document.head.appendChild(link);
  await new Promise(resolve => link.onload = resolve);
};

export default {
  'should apply small font size with .small': ({pass, fail}) => {
    const el = document.createElement('span');
    el.className = 'small';
    const normal = document.createElement('span');
    document.body.appendChild(el);
    document.body.appendChild(normal);
    const smallSize = parseFloat(getStyle(el, 'fontSize'));
    const normalSize = parseFloat(getStyle(normal, 'fontSize'));
    el.remove();
    normal.remove();
    if(smallSize < normalSize){
      pass(`.small reduces font size (${smallSize}px < ${normalSize}px)`);
    } else {
      fail(`Expected smaller font, got ${smallSize}px vs ${normalSize}px`);
    }
  },

  'should apply large font size with .large': ({pass, fail}) => {
    const el = document.createElement('span');
    el.className = 'large';
    const normal = document.createElement('span');
    document.body.appendChild(el);
    document.body.appendChild(normal);
    const largeSize = parseFloat(getStyle(el, 'fontSize'));
    const normalSize = parseFloat(getStyle(normal, 'fontSize'));
    el.remove();
    normal.remove();
    if(largeSize > normalSize){
      pass(`.large increases font size (${largeSize}px > ${normalSize}px)`);
    } else {
      fail(`Expected larger font, got ${largeSize}px vs ${normalSize}px`);
    }
  },

  'should apply bold font weight to headings': ({pass, fail}) => {
    const h1 = document.createElement('h1');
    document.body.appendChild(h1);
    const weight = getStyle(h1, 'fontWeight');
    h1.remove();
    if(parseInt(weight) >= 700){
      pass(`Headings are bold (weight: ${weight})`);
    } else {
      fail(`Expected bold weight >= 700, got ${weight}`);
    }
  },

  'should apply heading font sizes in descending order': ({pass, fail}) => {
    const sizes = [];
    for(let i = 1; i <= 6; i++){
      const h = document.createElement(`h${i}`);
      document.body.appendChild(h);
      sizes.push(parseFloat(getStyle(h, 'fontSize')));
      h.remove();
    }
    let descending = true;
    for(let i = 0; i < sizes.length - 1; i++){
      if(sizes[i] <= sizes[i + 1]){
        descending = false;
        break;
      }
    }
    if(descending){
      pass(`Heading sizes descend: ${sizes.join(' > ')}`);
    } else {
      fail(`Expected descending sizes, got: ${sizes.join(', ')}`);
    }
  },

  'should apply heading classes .h1-.h6': ({pass, fail}) => {
    const failed = [];
    for(let i = 1; i <= 6; i++){
      const div = document.createElement('div');
      div.className = `h${i}`;
      const h = document.createElement(`h${i}`);
      document.body.appendChild(div);
      document.body.appendChild(h);
      const divSize = getStyle(div, 'fontSize');
      const hSize = getStyle(h, 'fontSize');
      div.remove();
      h.remove();
      if(divSize !== hSize){
        failed.push(`h${i}: ${divSize} vs ${hSize}`);
      }
    }
    if(failed.length === 0){
      pass('.h1-.h6 classes match heading sizes');
    } else {
      fail(`Size mismatches: ${failed.join(', ')}`);
    }
  },

  'should apply monospace font to code': ({pass, fail}) => {
    const code = document.createElement('code');
    document.body.appendChild(code);
    const fontFamily = getStyle(code, 'fontFamily');
    code.remove();
    if(fontFamily.toLowerCase().includes('mono') || fontFamily.toLowerCase().includes('consolas')){
      pass(`Code uses monospace font: ${fontFamily}`);
    } else {
      fail(`Expected monospace font, got ${fontFamily}`);
    }
  },

  'should apply background to code': ({pass, fail}) => {
    const code = document.createElement('code');
    code.textContent = 'test';
    document.body.appendChild(code);
    const bg = getStyle(code, 'backgroundColor');
    code.remove();
    if(bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent'){
      pass(`Code has background: ${bg}`);
    } else {
      fail('Code should have a background color');
    }
  },

  'should style pre code as block': ({pass, fail}) => {
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    pre.appendChild(code);
    document.body.appendChild(pre);
    const display = getStyle(code, 'display');
    pre.remove();
    if(display === 'block'){
      pass('pre code displays as block');
    } else {
      fail(`Expected block display, got ${display}`);
    }
  },

  'should apply text alignment classes': ({pass, fail}) => {
    const tests = [
      {className: 'ta-left', expected: 'left'},
      {className: 'ta-center', expected: 'center'},
      {className: 'ta-right', expected: 'right'}
    ];
    const failed = [];
    tests.forEach(({className, expected}) => {
      const el = document.createElement('div');
      el.className = className;
      document.body.appendChild(el);
      const align = getStyle(el, 'textAlign');
      el.remove();
      if(align !== expected && align !== `${expected}`){
        failed.push(`${className}: ${align}`);
      }
    });
    if(failed.length === 0){
      pass('Text alignment classes work correctly');
    } else {
      fail(`Alignment issues: ${failed.join(', ')}`);
    }
  },

  'should style links with color': ({pass, fail}) => {
    const a = document.createElement('a');
    a.href = '#';
    document.body.appendChild(a);
    const color = getStyle(a, 'color');
    a.remove();
    if(color && color !== 'rgb(0, 0, 0)'){
      pass(`Links have color: ${color}`);
    } else {
      fail('Links should have a distinct color');
    }
  },

  'should apply .link class styling': ({pass, fail}) => {
    const span = document.createElement('span');
    span.className = 'link';
    document.body.appendChild(span);
    const color = getStyle(span, 'color');
    span.remove();
    if(color && color !== 'rgb(0, 0, 0)'){
      pass(`.link class applies link color: ${color}`);
    } else {
      fail('.link should have link color');
    }
  },

  'should style blockquote with left border': ({pass, fail}) => {
    const bq = document.createElement('blockquote');
    document.body.appendChild(bq);
    const borderLeft = getStyle(bq, 'borderLeftWidth');
    bq.remove();
    if(parseFloat(borderLeft) > 0){
      pass(`Blockquote has left border: ${borderLeft}`);
    } else {
      fail('Blockquote should have left border');
    }
  },

  'should style hr as border': ({pass, fail}) => {
    const hr = document.createElement('hr');
    document.body.appendChild(hr);
    const borderTop = getStyle(hr, 'borderTopWidth');
    hr.remove();
    if(parseFloat(borderTop) > 0){
      pass(`hr has top border: ${borderTop}`);
    } else {
      fail('hr should have top border');
    }
  },

  'should apply .ff-mono class': ({pass, fail}) => {
    const el = document.createElement('span');
    el.className = 'ff-mono';
    document.body.appendChild(el);
    const fontFamily = getStyle(el, 'fontFamily');
    el.remove();
    if(fontFamily.toLowerCase().includes('mono') || fontFamily.toLowerCase().includes('consolas')){
      pass(`.ff-mono applies monospace: ${fontFamily}`);
    } else {
      fail(`Expected monospace, got ${fontFamily}`);
    }
  },

  'should apply .no-link class': ({pass, fail}) => {
    const a = document.createElement('a');
    a.className = 'no-link';
    a.href = '#';
    document.body.appendChild(a);
    const textDecoration = getStyle(a, 'textDecorationLine');
    a.remove();
    if(textDecoration === 'none'){
      pass('.no-link removes text decoration');
    } else {
      fail(`Expected no decoration, got ${textDecoration}`);
    }
  },

  'should apply .td-n class': ({pass, fail}) => {
    const el = document.createElement('span');
    el.className = 'td-n';
    document.body.appendChild(el);
    const textDecoration = getStyle(el, 'textDecorationLine');
    el.remove();
    if(textDecoration === 'none'){
      pass('.td-n sets text-decoration: none');
    } else {
      fail(`Expected none, got ${textDecoration}`);
    }
  }
};
