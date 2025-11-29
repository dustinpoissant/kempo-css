const getStyle = (el, prop) => getComputedStyle(el)[prop];

export const beforeAll = async () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/kempo.css';
  document.head.appendChild(link);
  await new Promise(resolve => link.onload = resolve);
};

export default {
  'should apply box-sizing border-box to all elements': ({pass, fail}) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const boxSizing = getStyle(div, 'boxSizing');
    div.remove();
    if(boxSizing === 'border-box'){
      pass('box-sizing is border-box');
    } else {
      fail(`Expected border-box, got ${boxSizing}`);
    }
  },

  'should reset margin on body': ({pass, fail}) => {
    const margin = getStyle(document.body, 'margin');
    if(margin === '0px'){
      pass('Body margin is reset to 0');
    } else {
      fail(`Expected 0px margin, got ${margin}`);
    }
  },

  'should set min-height 100vh on body': ({pass, fail}) => {
    const minHeight = getStyle(document.body, 'minHeight');
    const viewportHeight = window.innerHeight;
    const minHeightValue = parseFloat(minHeight);
    if(minHeightValue >= viewportHeight){
      pass('Body min-height is at least 100vh');
    } else {
      fail(`Expected min-height >= ${viewportHeight}px, got ${minHeight}`);
    }
  },

  'should apply background color to body': ({pass, fail}) => {
    const bg = getStyle(document.body, 'backgroundColor');
    if(bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)'){
      pass(`Body has background color: ${bg}`);
    } else {
      fail('Body should have a background color');
    }
  },

  'should apply text color to body': ({pass, fail}) => {
    const color = getStyle(document.body, 'color');
    if(color && color !== 'transparent' && color !== 'rgba(0, 0, 0, 0)'){
      pass(`Body has text color: ${color}`);
    } else {
      fail('Body should have a text color');
    }
  },

  'should reset top margin on headings': ({pass, fail}) => {
    const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const failed = [];
    headings.forEach(tag => {
      const el = document.createElement(tag);
      document.body.appendChild(el);
      const marginTop = getStyle(el, 'marginTop');
      el.remove();
      if(marginTop !== '0px'){
        failed.push(`${tag}: ${marginTop}`);
      }
    });
    if(failed.length === 0){
      pass('All headings have top margin reset to 0');
    } else {
      fail(`Headings with non-zero top margin: ${failed.join(', ')}`);
    }
  },

  'should apply bottom margin to headings': ({pass, fail}) => {
    const h1 = document.createElement('h1');
    document.body.appendChild(h1);
    const marginBottom = parseFloat(getStyle(h1, 'marginBottom'));
    h1.remove();
    if(marginBottom > 0){
      pass(`Headings have bottom margin: ${marginBottom}px`);
    } else {
      fail('Headings should have bottom margin for spacing');
    }
  },

  'should apply bottom margin to paragraphs': ({pass, fail}) => {
    const p = document.createElement('p');
    document.body.appendChild(p);
    const marginBottom = parseFloat(getStyle(p, 'marginBottom'));
    const marginTop = getStyle(p, 'marginTop');
    p.remove();
    if(marginTop === '0px' && marginBottom > 0){
      pass(`Paragraphs have 0 top margin and ${marginBottom}px bottom margin`);
    } else {
      fail(`Expected 0 top margin and positive bottom margin, got top: ${marginTop}, bottom: ${marginBottom}px`);
    }
  },

  'should apply container max-width': ({pass, fail}) => {
    const container = document.createElement('div');
    container.className = 'container';
    document.body.appendChild(container);
    const maxWidth = getStyle(container, 'maxWidth');
    container.remove();
    if(maxWidth && maxWidth !== 'none'){
      pass(`Container has max-width: ${maxWidth}`);
    } else {
      fail('Container should have a max-width');
    }
  },

  'should center container horizontally': ({pass, fail}) => {
    const container = document.createElement('div');
    container.className = 'container';
    document.body.appendChild(container);
    const marginLeft = getStyle(container, 'marginLeft');
    const marginRight = getStyle(container, 'marginRight');
    container.remove();
    // When container is narrower than viewport, auto margins compute to equal pixel values
    // When container fills viewport, they're both 0 or equal
    if(marginLeft === marginRight){
      pass('Container is horizontally centered');
    } else {
      fail(`Expected equal margins, got left: ${marginLeft}, right: ${marginRight}`);
    }
  },

  'should apply padding to container': ({pass, fail}) => {
    const container = document.createElement('div');
    container.className = 'container';
    document.body.appendChild(container);
    const paddingLeft = parseFloat(getStyle(container, 'paddingLeft'));
    const paddingRight = parseFloat(getStyle(container, 'paddingRight'));
    container.remove();
    if(paddingLeft > 0 && paddingRight > 0){
      pass(`Container has padding: left ${paddingLeft}px, right ${paddingRight}px`);
    } else {
      fail('Container should have left and right padding');
    }
  },

  'should style main element like container': ({pass, fail}) => {
    const main = document.createElement('main');
    document.body.appendChild(main);
    const maxWidth = getStyle(main, 'maxWidth');
    const marginLeft = getStyle(main, 'marginLeft');
    const marginRight = getStyle(main, 'marginRight');
    main.remove();
    if(maxWidth && maxWidth !== 'none' && marginLeft === marginRight){
      pass('Main element is styled like container');
    } else {
      fail(`Main should have max-width and centered margins, got maxWidth: ${maxWidth}, margins: ${marginLeft}/${marginRight}`);
    }
  },

  'should hide overflow on body.no-scroll': ({pass, fail}) => {
    document.body.classList.add('no-scroll');
    const overflow = getStyle(document.body, 'overflow');
    document.body.classList.remove('no-scroll');
    if(overflow === 'hidden'){
      pass('body.no-scroll hides overflow');
    } else {
      fail(`Expected overflow hidden, got ${overflow}`);
    }
  },

  'should style summary element with pointer cursor': ({pass, fail}) => {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = 'Test';
    details.appendChild(summary);
    document.body.appendChild(details);
    const cursor = getStyle(summary, 'cursor');
    details.remove();
    if(cursor === 'pointer'){
      pass('Summary has pointer cursor');
    } else {
      fail(`Expected pointer cursor, got ${cursor}`);
    }
  },

  'should reset menu margin and padding': ({pass, fail}) => {
    const menu = document.createElement('menu');
    document.body.appendChild(menu);
    const margin = getStyle(menu, 'margin');
    const padding = getStyle(menu, 'padding');
    menu.remove();
    if(margin === '0px' && padding === '0px'){
      pass('Menu margin and padding reset');
    } else {
      fail(`Menu should have 0 margin/padding, got margin: ${margin}, padding: ${padding}`);
    }
  }
};
