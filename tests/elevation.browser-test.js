const getStyle = (el, prop) => getComputedStyle(el)[prop];

export const beforeAll = async () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/kempo.css';
  document.head.appendChild(link);
  await new Promise(resolve => link.onload = resolve);
};

export default {
  'elevation-0 should set z-index 0': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'elevation-0';
    el.style.position = 'relative';
    document.body.appendChild(el);
    const zIndex = getStyle(el, 'zIndex');
    el.remove();
    if(zIndex === '0'){
      pass(`elevation-0 has z-index: ${zIndex}`);
    } else {
      fail(`Expected z-index 0, got ${zIndex}`);
    }
  },

  'elevation-2 should set z-index 20': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'elevation-2';
    el.style.position = 'relative';
    document.body.appendChild(el);
    const zIndex = getStyle(el, 'zIndex');
    el.remove();
    if(zIndex === '20'){
      pass(`elevation-2 has z-index: ${zIndex}`);
    } else {
      fail(`Expected z-index 20, got ${zIndex}`);
    }
  },

  'elevation-5 should set z-index 50': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'elevation-5';
    el.style.position = 'relative';
    document.body.appendChild(el);
    const zIndex = getStyle(el, 'zIndex');
    el.remove();
    if(zIndex === '50'){
      pass(`elevation-5 has z-index: ${zIndex}`);
    } else {
      fail(`Expected z-index 50, got ${zIndex}`);
    }
  },

  'elevation-10 should set z-index 100': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'elevation-10';
    el.style.position = 'relative';
    document.body.appendChild(el);
    const zIndex = getStyle(el, 'zIndex');
    el.remove();
    if(zIndex === '100'){
      pass(`elevation-10 has z-index: ${zIndex}`);
    } else {
      fail(`Expected z-index 100, got ${zIndex}`);
    }
  },

  'elevation-* should not set background-color': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'elevation-5';
    document.body.appendChild(el);
    const bg = getStyle(el, 'backgroundColor');
    const bodyBg = getStyle(document.body, 'backgroundColor');
    el.remove();
    if(bg === bodyBg || bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent'){
      pass(`elevation-5 does not set background-color (got: ${bg})`);
    } else {
      fail(`elevation-5 should not set background-color, got ${bg}`);
    }
  },

  'elevation-* should not set box-shadow': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'elevation-5';
    document.body.appendChild(el);
    const shadow = getStyle(el, 'boxShadow');
    el.remove();
    if(shadow === 'none'){
      pass('elevation-5 does not set box-shadow');
    } else {
      fail(`elevation-5 should not set box-shadow, got ${shadow}`);
    }
  },

  '.shadow.elevation-0 should have inset box-shadow': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'elevation-0 shadow';
    document.body.appendChild(el);
    const shadow = getStyle(el, 'boxShadow');
    el.remove();
    if(shadow && shadow !== 'none' && shadow.includes('inset')){
      pass(`.shadow.elevation-0 has inset shadow: ${shadow}`);
    } else {
      fail(`Expected inset shadow for elevation-0 shadow, got ${shadow}`);
    }
  },

  '.shadow.elevation-1 should have inset box-shadow': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'elevation-1 shadow';
    document.body.appendChild(el);
    const shadow = getStyle(el, 'boxShadow');
    el.remove();
    if(shadow && shadow !== 'none' && shadow.includes('inset')){
      pass(`.shadow.elevation-1 has inset shadow: ${shadow}`);
    } else {
      fail(`Expected inset shadow for elevation-1 shadow, got ${shadow}`);
    }
  },

  '.shadow.elevation-2 should have no box-shadow': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'elevation-2 shadow';
    document.body.appendChild(el);
    const shadow = getStyle(el, 'boxShadow');
    el.remove();
    if(shadow === 'none'){
      pass('.shadow.elevation-2 has no shadow (page level)');
    } else {
      fail(`Expected no shadow for elevation-2 shadow, got ${shadow}`);
    }
  },

  '.shadow.elevation-3 should have outset box-shadow': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'elevation-3 shadow';
    document.body.appendChild(el);
    const shadow = getStyle(el, 'boxShadow');
    el.remove();
    if(shadow && shadow !== 'none' && !shadow.includes('inset')){
      pass(`.shadow.elevation-3 has outset shadow: ${shadow}`);
    } else {
      fail(`Expected outset shadow for elevation-3 shadow, got ${shadow}`);
    }
  },

  '.shadow.elevation-10 should have large outset box-shadow': ({pass, fail}) => {
    const el3 = document.createElement('div');
    el3.className = 'elevation-3 shadow';
    document.body.appendChild(el3);
    const shadow3 = getStyle(el3, 'boxShadow');
    el3.remove();

    const el10 = document.createElement('div');
    el10.className = 'elevation-10 shadow';
    document.body.appendChild(el10);
    const shadow10 = getStyle(el10, 'boxShadow');
    el10.remove();

    if(shadow10 && shadow10 !== 'none' && !shadow10.includes('inset') && shadow10 !== shadow3){
      pass(`.shadow.elevation-10 has larger shadow than elevation-3`);
    } else {
      fail(`Expected elevation-10 shadow to be larger than elevation-3. elevation-3=${shadow3}, elevation-10=${shadow10}`);
    }
  },

  '.bg-elevation.elevation-0 should apply background color': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'elevation-0 bg-elevation';
    document.body.appendChild(el);
    const bg = getStyle(el, 'backgroundColor');
    el.remove();
    if(bg && bg !== 'rgba(0, 0, 0, 0)'){
      pass(`.bg-elevation.elevation-0 has background: ${bg}`);
    } else {
      fail(`Expected background color for bg-elevation elevation-0, got ${bg}`);
    }
  },

  '.bg-elevation.elevation-2 should match --c_bg': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'elevation-2 bg-elevation';
    document.body.appendChild(el);
    const bg = getStyle(el, 'backgroundColor');
    const bodyBg = getStyle(document.body, 'backgroundColor');
    el.remove();
    if(bg === bodyBg){
      pass(`.bg-elevation.elevation-2 matches body background: ${bg}`);
    } else {
      fail(`Expected elevation-2 bg-elevation to match body bg. got ${bg}, body=${bodyBg}`);
    }
  },

  '.bg-elevation.elevation-0 should be darker than elevation-2 in light mode': ({pass, fail}) => {
    const el0 = document.createElement('div');
    el0.className = 'elevation-0 bg-elevation';
    document.body.appendChild(el0);
    const bg0 = getStyle(el0, 'backgroundColor');
    el0.remove();

    const el2 = document.createElement('div');
    el2.className = 'elevation-2 bg-elevation';
    document.body.appendChild(el2);
    const bg2 = getStyle(el2, 'backgroundColor');
    el2.remove();

    const parseRgb = (s) => {
      const m = s.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      return m ? parseInt(m[1]) + parseInt(m[2]) + parseInt(m[3]) : 0;
    };

    const brightness0 = parseRgb(bg0);
    const brightness2 = parseRgb(bg2);

    if(brightness0 < brightness2){
      pass(`elevation-0 bg (${bg0}) is darker than elevation-2 bg (${bg2})`);
    } else {
      fail(`Expected elevation-0 to be darker than elevation-2. bg0=${bg0}, bg2=${bg2}`);
    }
  },

  '.bg-elevation lower levels should have distinct backgrounds': ({pass, fail}) => {
    const levels = [0, 1, 2, 3, 4];
    const bgs = levels.map(n => {
      const el = document.createElement('div');
      el.className = `elevation-${n} bg-elevation`;
      document.body.appendChild(el);
      const bg = getStyle(el, 'backgroundColor');
      el.remove();
      return bg;
    });
    const unique = new Set(bgs);
    if(unique.size === bgs.length){
      pass(`bg-elevation levels 0–4 all have distinct background colors`);
    } else {
      fail(`Expected distinct backgrounds for levels ${levels.join(', ')}, got: ${bgs.join(', ')}`);
    }
  },
};
