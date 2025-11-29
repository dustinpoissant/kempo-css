const getStyle = (el, prop) => getComputedStyle(el)[prop];

export const beforeAll = async () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/kempo.css';
  document.head.appendChild(link);
  await new Promise(resolve => link.onload = resolve);
};

export default {
  'should apply flex display to .row': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'row';
    document.body.appendChild(el);
    const display = getStyle(el, 'display');
    const flexWrap = getStyle(el, 'flexWrap');
    el.remove();
    if(display === 'flex' && flexWrap === 'wrap'){
      pass('.row applies flex with wrap');
    } else {
      fail(`Expected flex/wrap, got display: ${display}, wrap: ${flexWrap}`);
    }
  },

  'should apply flex to .col': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'col';
    document.body.appendChild(el);
    const flexGrow = getStyle(el, 'flexGrow');
    el.remove();
    if(flexGrow === '1'){
      pass('.col has flex-grow: 1');
    } else {
      fail(`Expected flex-grow: 1, got ${flexGrow}`);
    }
  },

  'should apply span-6 as 50% width': ({pass, fail}) => {
    const row = document.createElement('div');
    row.className = 'row';
    row.style.width = '1000px';
    const col = document.createElement('div');
    col.className = 'span-6';
    row.appendChild(col);
    document.body.appendChild(row);
    const flexBasis = getStyle(col, 'flexBasis');
    row.remove();
    if(flexBasis === '50%'){
      pass('.span-6 sets flex-basis to 50%');
    } else {
      fail(`Expected 50%, got ${flexBasis}`);
    }
  },

  'should apply span-12 as 100% width': ({pass, fail}) => {
    const col = document.createElement('div');
    col.className = 'span-12';
    document.body.appendChild(col);
    const flexBasis = getStyle(col, 'flexBasis');
    col.remove();
    if(flexBasis === '100%'){
      pass('.span-12 sets flex-basis to 100%');
    } else {
      fail(`Expected 100%, got ${flexBasis}`);
    }
  },

  'should apply span-4 as ~33.333% width': ({pass, fail}) => {
    const col = document.createElement('div');
    col.className = 'span-4';
    document.body.appendChild(col);
    const flexBasis = getStyle(col, 'flexBasis');
    col.remove();
    if(flexBasis.includes('33.333')){
      pass(`.span-4 sets flex-basis to ${flexBasis}`);
    } else {
      fail(`Expected ~33.333%, got ${flexBasis}`);
    }
  },

  'should apply span-3 as 25% width': ({pass, fail}) => {
    const col = document.createElement('div');
    col.className = 'span-3';
    document.body.appendChild(col);
    const flexBasis = getStyle(col, 'flexBasis');
    col.remove();
    if(flexBasis === '25%'){
      pass('.span-3 sets flex-basis to 25%');
    } else {
      fail(`Expected 25%, got ${flexBasis}`);
    }
  },

  'should apply grid columns with .cols-2': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'd-g cols-2';
    document.body.appendChild(el);
    const cols = getStyle(el, 'gridTemplateColumns');
    el.remove();
    if(cols.split(' ').length === 2){
      pass(`.cols-2 creates 2 columns: ${cols}`);
    } else {
      fail(`Expected 2 columns, got ${cols}`);
    }
  },

  'should apply grid columns with .cols-3': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'd-g cols-3';
    document.body.appendChild(el);
    const cols = getStyle(el, 'gridTemplateColumns');
    el.remove();
    if(cols.split(' ').length === 3){
      pass(`.cols-3 creates 3 columns: ${cols}`);
    } else {
      fail(`Expected 3 columns, got ${cols}`);
    }
  },

  'should apply grid columns with .cols-4': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'd-g cols-4';
    document.body.appendChild(el);
    const cols = getStyle(el, 'gridTemplateColumns');
    el.remove();
    if(cols.split(' ').length === 4){
      pass(`.cols-4 creates 4 columns: ${cols}`);
    } else {
      fail(`Expected 4 columns, got ${cols}`);
    }
  },

  'should have all span classes 1-12': ({pass, fail}) => {
    const missing = [];
    for(let i = 1; i <= 12; i++){
      const col = document.createElement('div');
      col.className = `span-${i}`;
      document.body.appendChild(col);
      const flexBasis = getStyle(col, 'flexBasis');
      col.remove();
      if(!flexBasis || flexBasis === '0%' || flexBasis === 'auto'){
        missing.push(i);
      }
    }
    if(missing.length === 0){
      pass('All span-1 through span-12 classes exist');
    } else {
      fail(`Missing spans: ${missing.join(', ')}`);
    }
  },

  'should have cols classes 2-10': ({pass, fail}) => {
    const working = [];
    for(let i = 2; i <= 10; i++){
      const el = document.createElement('div');
      el.className = `d-g cols-${i}`;
      document.body.appendChild(el);
      const cols = getStyle(el, 'gridTemplateColumns');
      el.remove();
      if(cols.split(' ').length === i){
        working.push(i);
      }
    }
    if(working.length === 9){
      pass('All cols-2 through cols-10 classes work');
    } else {
      fail(`Working: ${working.join(', ')}, expected 2-10`);
    }
  }
};
