const getStyle = (el, prop) => getComputedStyle(el)[prop];

export const beforeAll = async () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/kempo.css';
  document.head.appendChild(link);
  await new Promise(resolve => link.onload = resolve);
};

export default {
  'should style .card with border': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'card';
    document.body.appendChild(el);
    const border = parseFloat(getStyle(el, 'borderWidth'));
    el.remove();
    if(border > 0){
      pass(`.card has border: ${border}px`);
    } else {
      fail('card should have border');
    }
  },

  'should style .card with border radius': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'card';
    document.body.appendChild(el);
    const radius = parseFloat(getStyle(el, 'borderRadius'));
    el.remove();
    if(radius > 0){
      pass(`.card has border-radius: ${radius}px`);
    } else {
      fail('card should have border radius');
    }
  },

  'should style .card with padding': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'card';
    document.body.appendChild(el);
    const paddingTop = parseFloat(getStyle(el, 'paddingTop'));
    const paddingLeft = parseFloat(getStyle(el, 'paddingLeft'));
    const paddingRight = parseFloat(getStyle(el, 'paddingRight'));
    el.remove();
    if(paddingTop > 0 && paddingLeft > 0 && paddingRight > 0){
      pass('.card has padding on top, left, and right');
    } else {
      fail(`Expected padding, got top: ${paddingTop}, left: ${paddingLeft}, right: ${paddingRight}`);
    }
  },

  'should style .card with margin-bottom': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'card';
    document.body.appendChild(el);
    const marginBottom = parseFloat(getStyle(el, 'marginBottom'));
    el.remove();
    if(marginBottom > 0){
      pass(`.card has margin-bottom: ${marginBottom}px`);
    } else {
      fail('card should have margin-bottom');
    }
  },

  'should have .drop-shadow class that sets box-shadow': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'drop-shadow';
    document.body.appendChild(el);
    const shadow = getStyle(el, 'boxShadow');
    el.remove();
    if(shadow && shadow !== 'none'){
      pass(`.drop-shadow has box-shadow: ${shadow}`);
    } else {
      fail(`Expected box-shadow, got ${shadow}`);
    }
  },

  'should style .icon as inline-block': ({pass, fail}) => {
    const el = document.createElement('span');
    el.className = 'icon';
    document.body.appendChild(el);
    const display = getStyle(el, 'display');
    el.remove();
    if(display === 'inline-block'){
      pass('.icon displays as inline-block');
    } else {
      fail(`Expected inline-block, got ${display}`);
    }
  },

  'should style .icon with width': ({pass, fail}) => {
    const el = document.createElement('span');
    el.className = 'icon';
    document.body.appendChild(el);
    const width = getStyle(el, 'width');
    el.remove();
    if(width && width !== 'auto'){
      pass(`.icon has width: ${width}`);
    } else {
      fail('icon should have width');
    }
  },

  'should style .icon with vertical-align top': ({pass, fail}) => {
    const el = document.createElement('span');
    el.className = 'icon';
    document.body.appendChild(el);
    const verticalAlign = getStyle(el, 'verticalAlign');
    el.remove();
    if(verticalAlign === 'top'){
      pass('.icon has vertical-align: top');
    } else {
      fail(`Expected top, got ${verticalAlign}`);
    }
  },

  'should remove iframe border': ({pass, fail}) => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const border = getStyle(iframe, 'borderStyle');
    iframe.remove();
    if(border === 'none'){
      pass('iframe has no border');
    } else {
      fail(`Expected none, got ${border}`);
    }
  },

  'should make iframe full width': ({pass, fail}) => {
    const container = document.createElement('div');
    container.style.width = '500px';
    const iframe = document.createElement('iframe');
    container.appendChild(iframe);
    document.body.appendChild(container);
    const width = getStyle(iframe, 'width');
    container.remove();
    if(width === '100%' || parseFloat(width) >= 490){
      pass(`iframe has full width: ${width}`);
    } else {
      fail(`Expected 100%, got ${width}`);
    }
  }
};
