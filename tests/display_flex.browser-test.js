const getStyle = (el, prop) => getComputedStyle(el)[prop];

export const beforeAll = async () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/kempo.css';
  document.head.appendChild(link);
  await new Promise(resolve => link.onload = resolve);
};

export default {
  'should apply display block with .d-b': ({pass, fail}) => {
    const el = document.createElement('span');
    el.className = 'd-b';
    document.body.appendChild(el);
    const display = getStyle(el, 'display');
    el.remove();
    if(display === 'block'){
      pass('.d-b sets display: block');
    } else {
      fail(`Expected block, got ${display}`);
    }
  },

  'should apply display inline-block with .d-ib': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'd-ib';
    document.body.appendChild(el);
    const display = getStyle(el, 'display');
    el.remove();
    if(display === 'inline-block'){
      pass('.d-ib sets display: inline-block');
    } else {
      fail(`Expected inline-block, got ${display}`);
    }
  },

  'should apply display grid with .d-g': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'd-g';
    document.body.appendChild(el);
    const display = getStyle(el, 'display');
    el.remove();
    if(display === 'grid'){
      pass('.d-g sets display: grid');
    } else {
      fail(`Expected grid, got ${display}`);
    }
  },

  'should apply display inline with .d-i': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'd-i';
    document.body.appendChild(el);
    const display = getStyle(el, 'display');
    el.remove();
    if(display === 'inline'){
      pass('.d-i sets display: inline');
    } else {
      fail(`Expected inline, got ${display}`);
    }
  },

  'should apply display none with .d-n': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'd-n';
    document.body.appendChild(el);
    const display = getStyle(el, 'display');
    el.remove();
    if(display === 'none'){
      pass('.d-n sets display: none');
    } else {
      fail(`Expected none, got ${display}`);
    }
  },

  'should apply display flex with .d-f': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'd-f';
    document.body.appendChild(el);
    const display = getStyle(el, 'display');
    const flexWrap = getStyle(el, 'flexWrap');
    el.remove();
    if(display === 'flex' && flexWrap === 'wrap'){
      pass('.d-f sets display: flex with wrap');
    } else {
      fail(`Expected flex with wrap, got display: ${display}, flex-wrap: ${flexWrap}`);
    }
  },

  'should apply display inline-flex with .d-if': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'd-if';
    document.body.appendChild(el);
    const display = getStyle(el, 'display');
    const flexWrap = getStyle(el, 'flexWrap');
    el.remove();
    if(display === 'inline-flex' && flexWrap === 'wrap'){
      pass('.d-if sets display: inline-flex with wrap');
    } else {
      fail(`Expected inline-flex with wrap, got display: ${display}, flex-wrap: ${flexWrap}`);
    }
  },

  'should apply flex grow with .flex classes': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'flex';
    document.body.appendChild(el);
    const flexGrow = getStyle(el, 'flexGrow');
    el.remove();
    if(flexGrow === '1'){
      pass('.flex sets flex-grow: 1');
    } else {
      fail(`Expected flex-grow: 1, got ${flexGrow}`);
    }
  },

  'should apply flex-0 correctly': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'flex-0';
    document.body.appendChild(el);
    const flexGrow = getStyle(el, 'flexGrow');
    el.remove();
    if(flexGrow === '0'){
      pass('.flex-0 sets flex-grow: 0');
    } else {
      fail(`Expected flex-grow: 0, got ${flexGrow}`);
    }
  },

  'should apply higher flex values': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'flex-5';
    document.body.appendChild(el);
    const flexGrow = getStyle(el, 'flexGrow');
    el.remove();
    if(flexGrow === '5'){
      pass('.flex-5 sets flex-grow: 5');
    } else {
      fail(`Expected flex-grow: 5, got ${flexGrow}`);
    }
  },

  'should apply fixed positioning with .fixed': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'fixed';
    document.body.appendChild(el);
    const position = getStyle(el, 'position');
    const top = getStyle(el, 'top');
    const width = getStyle(el, 'width');
    const zIndex = getStyle(el, 'zIndex');
    el.remove();
    if(position === 'fixed' && top === '0px' && zIndex !== 'auto'){
      pass('.fixed applies fixed positioning at top with z-index');
    } else {
      fail(`Expected fixed position at top, got position: ${position}, top: ${top}, z-index: ${zIndex}`);
    }
  }
};
