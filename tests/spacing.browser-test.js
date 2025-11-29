const getStyle = (el, prop) => getComputedStyle(el)[prop];

export const beforeAll = async () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/kempo.css';
  document.head.appendChild(link);
  await new Promise(resolve => link.onload = resolve);
};

export default {
  'should apply full padding with .p': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'p';
    document.body.appendChild(el);
    const pt = parseFloat(getStyle(el, 'paddingTop'));
    const pr = parseFloat(getStyle(el, 'paddingRight'));
    const pb = parseFloat(getStyle(el, 'paddingBottom'));
    const pl = parseFloat(getStyle(el, 'paddingLeft'));
    el.remove();
    if(pt > 0 && pr > 0 && pb > 0 && pl > 0 && pt === pr && pr === pb && pb === pl){
      pass(`.p applies equal padding on all sides: ${pt}px`);
    } else {
      fail(`Expected equal padding, got t:${pt} r:${pr} b:${pb} l:${pl}`);
    }
  },

  'should apply directional padding classes': ({pass, fail}) => {
    const tests = [
      {className: 'pt', prop: 'paddingTop'},
      {className: 'pr', prop: 'paddingRight'},
      {className: 'pb', prop: 'paddingBottom'},
      {className: 'pl', prop: 'paddingLeft'}
    ];
    const failed = [];
    tests.forEach(({className, prop}) => {
      const el = document.createElement('div');
      el.className = className;
      document.body.appendChild(el);
      const value = parseFloat(getStyle(el, prop));
      el.remove();
      if(value <= 0){
        failed.push(`${className}: ${value}`);
      }
    });
    if(failed.length === 0){
      pass('Directional padding classes work');
    } else {
      fail(`Failed: ${failed.join(', ')}`);
    }
  },

  'should apply axis padding with .px and .py': ({pass, fail}) => {
    const elX = document.createElement('div');
    elX.className = 'px';
    const elY = document.createElement('div');
    elY.className = 'py';
    document.body.appendChild(elX);
    document.body.appendChild(elY);
    const pxL = parseFloat(getStyle(elX, 'paddingLeft'));
    const pxR = parseFloat(getStyle(elX, 'paddingRight'));
    const pyT = parseFloat(getStyle(elY, 'paddingTop'));
    const pyB = parseFloat(getStyle(elY, 'paddingBottom'));
    elX.remove();
    elY.remove();
    if(pxL > 0 && pxR > 0 && pyT > 0 && pyB > 0){
      pass('.px and .py apply axis padding');
    } else {
      fail(`px: L${pxL}/R${pxR}, py: T${pyT}/B${pyB}`);
    }
  },

  'should apply half padding with .ph': ({pass, fail}) => {
    const full = document.createElement('div');
    full.className = 'p';
    const half = document.createElement('div');
    half.className = 'ph';
    document.body.appendChild(full);
    document.body.appendChild(half);
    const fullVal = parseFloat(getStyle(full, 'paddingTop'));
    const halfVal = parseFloat(getStyle(half, 'paddingTop'));
    full.remove();
    half.remove();
    if(halfVal < fullVal && halfVal > 0){
      pass(`.ph is smaller than .p (${halfVal}px < ${fullVal}px)`);
    } else {
      fail(`Expected half: ${halfVal} < full: ${fullVal}`);
    }
  },

  'should apply quarter padding with .pq': ({pass, fail}) => {
    const full = document.createElement('div');
    full.className = 'p';
    const quarter = document.createElement('div');
    quarter.className = 'pq';
    document.body.appendChild(full);
    document.body.appendChild(quarter);
    const fullVal = parseFloat(getStyle(full, 'paddingTop'));
    const quarterVal = parseFloat(getStyle(quarter, 'paddingTop'));
    full.remove();
    quarter.remove();
    if(quarterVal < fullVal && quarterVal > 0){
      pass(`.pq is smaller than .p (${quarterVal}px < ${fullVal}px)`);
    } else {
      fail(`Expected quarter: ${quarterVal} < full: ${fullVal}`);
    }
  },

  'should reset padding with .p0': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'p0';
    el.style.padding = '50px';
    document.body.appendChild(el);
    const pt = parseFloat(getStyle(el, 'paddingTop'));
    el.remove();
    if(pt < 1){
      pass('.p0 resets padding to ~0');
    } else {
      fail(`Expected ~0, got ${pt}px`);
    }
  },

  'should apply full margin with .m': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'm';
    document.body.appendChild(el);
    const mt = parseFloat(getStyle(el, 'marginTop'));
    const mr = parseFloat(getStyle(el, 'marginRight'));
    const mb = parseFloat(getStyle(el, 'marginBottom'));
    const ml = parseFloat(getStyle(el, 'marginLeft'));
    el.remove();
    if(mt > 0 && mr > 0 && mb > 0 && ml > 0){
      pass(`.m applies margin on all sides: ${mt}px`);
    } else {
      fail(`Expected positive margins, got t:${mt} r:${mr} b:${mb} l:${ml}`);
    }
  },

  'should apply directional margin classes': ({pass, fail}) => {
    const tests = [
      {className: 'mt', prop: 'marginTop'},
      {className: 'mr', prop: 'marginRight'},
      {className: 'mb', prop: 'marginBottom'},
      {className: 'ml', prop: 'marginLeft'}
    ];
    const failed = [];
    tests.forEach(({className, prop}) => {
      const el = document.createElement('div');
      el.className = className;
      document.body.appendChild(el);
      const value = parseFloat(getStyle(el, prop));
      el.remove();
      if(value <= 0){
        failed.push(`${className}: ${value}`);
      }
    });
    if(failed.length === 0){
      pass('Directional margin classes work');
    } else {
      fail(`Failed: ${failed.join(', ')}`);
    }
  },

  'should reset margin with .m0': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'm0';
    el.style.margin = '50px';
    document.body.appendChild(el);
    const mt = parseFloat(getStyle(el, 'marginTop'));
    el.remove();
    if(mt === 0){
      pass('.m0 resets margin to 0');
    } else {
      fail(`Expected 0, got ${mt}px`);
    }
  },

  'should apply negative margin with .-m': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = '-m';
    document.body.appendChild(el);
    const mt = parseFloat(getStyle(el, 'marginTop'));
    el.remove();
    if(mt < 0){
      pass(`.-m applies negative margin: ${mt}px`);
    } else {
      fail(`Expected negative margin, got ${mt}px`);
    }
  },

  'should apply border with .b': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'b';
    document.body.appendChild(el);
    const bt = parseFloat(getStyle(el, 'borderTopWidth'));
    const br = parseFloat(getStyle(el, 'borderRightWidth'));
    const bb = parseFloat(getStyle(el, 'borderBottomWidth'));
    const bl = parseFloat(getStyle(el, 'borderLeftWidth'));
    el.remove();
    if(bt > 0 && br > 0 && bb > 0 && bl > 0){
      pass('.b applies border on all sides');
    } else {
      fail(`Expected borders, got t:${bt} r:${br} b:${bb} l:${bl}`);
    }
  },

  'should apply directional borders': ({pass, fail}) => {
    const tests = [
      {className: 'bt', prop: 'borderTopWidth'},
      {className: 'br', prop: 'borderRightWidth'},
      {className: 'bb', prop: 'borderBottomWidth'},
      {className: 'bl', prop: 'borderLeftWidth'}
    ];
    const failed = [];
    tests.forEach(({className, prop}) => {
      const el = document.createElement('div');
      el.className = className;
      document.body.appendChild(el);
      const value = parseFloat(getStyle(el, prop));
      el.remove();
      if(value <= 0){
        failed.push(`${className}: ${value}`);
      }
    });
    if(failed.length === 0){
      pass('Directional border classes work');
    } else {
      fail(`Failed: ${failed.join(', ')}`);
    }
  },

  'should remove border with .b0': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'b0';
    el.style.border = '5px solid red';
    document.body.appendChild(el);
    const bt = getStyle(el, 'borderTopStyle');
    el.remove();
    if(bt === 'none'){
      pass('.b0 removes borders');
    } else {
      fail(`Expected none, got ${bt}`);
    }
  },

  'should apply border radius with .r': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'r';
    document.body.appendChild(el);
    const radius = parseFloat(getStyle(el, 'borderTopLeftRadius'));
    el.remove();
    if(radius > 0){
      pass(`.r applies border radius: ${radius}px`);
    } else {
      fail(`Expected radius, got ${radius}`);
    }
  },

  'should apply corner-specific radius': ({pass, fail}) => {
    const tests = [
      {className: 'rtl', prop: 'borderTopLeftRadius'},
      {className: 'rtr', prop: 'borderTopRightRadius'},
      {className: 'rbr', prop: 'borderBottomRightRadius'},
      {className: 'rbl', prop: 'borderBottomLeftRadius'}
    ];
    const failed = [];
    tests.forEach(({className, prop}) => {
      const el = document.createElement('div');
      el.className = className;
      document.body.appendChild(el);
      const value = parseFloat(getStyle(el, prop));
      el.remove();
      if(value <= 0){
        failed.push(`${className}: ${value}`);
      }
    });
    if(failed.length === 0){
      pass('Corner radius classes work');
    } else {
      fail(`Failed: ${failed.join(', ')}`);
    }
  },

  'should remove radius with .r0': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'r0';
    el.style.borderRadius = '20px';
    document.body.appendChild(el);
    const radius = parseFloat(getStyle(el, 'borderTopLeftRadius'));
    el.remove();
    if(radius === 0){
      pass('.r0 removes border radius');
    } else {
      fail(`Expected 0, got ${radius}`);
    }
  },

  'should apply pill shape with .round': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'round';
    document.body.appendChild(el);
    const radius = parseFloat(getStyle(el, 'borderTopLeftRadius'));
    el.remove();
    if(radius > 1000){
      pass(`.round applies large radius: ${radius}px`);
    } else {
      fail(`Expected very large radius, got ${radius}`);
    }
  }
};
