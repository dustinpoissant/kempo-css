const getStyle = (el, prop) => getComputedStyle(el)[prop];

export const beforeAll = async () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/kempo.css';
  document.head.appendChild(link);
  await new Promise(resolve => link.onload = resolve);
};

export default {
  'should apply .bg-default': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'bg-default';
    document.body.appendChild(el);
    const bg = getStyle(el, 'backgroundColor');
    el.remove();
    if(bg && bg !== 'rgba(0, 0, 0, 0)'){
      pass(`.bg-default applies background: ${bg}`);
    } else {
      fail('bg-default should apply background');
    }
  },

  'should apply .bg-alt': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'bg-alt';
    document.body.appendChild(el);
    const bg = getStyle(el, 'backgroundColor');
    el.remove();
    if(bg && bg !== 'rgba(0, 0, 0, 0)'){
      pass(`.bg-alt applies background: ${bg}`);
    } else {
      fail('bg-alt should apply background');
    }
  },

  'should apply .bg-inv with inverted colors': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'bg-inv';
    document.body.appendChild(el);
    const bg = getStyle(el, 'backgroundColor');
    const color = getStyle(el, 'color');
    el.remove();
    if(bg && bg !== 'rgba(0, 0, 0, 0)'){
      pass(`.bg-inv applies inverted background: ${bg}`);
    } else {
      fail('bg-inv should apply background');
    }
  },

  'should apply .bg-primary': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'bg-primary';
    document.body.appendChild(el);
    const bg = getStyle(el, 'backgroundColor');
    el.remove();
    if(bg && bg.includes('51') && bg.includes('102') && bg.includes('255')){
      pass(`.bg-primary applies primary color: ${bg}`);
    } else {
      fail(`Expected primary blue, got ${bg}`);
    }
  },

  'should apply .bg-secondary': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'bg-secondary';
    document.body.appendChild(el);
    const bg = getStyle(el, 'backgroundColor');
    el.remove();
    if(bg && bg.includes('153') && bg.includes('51') && bg.includes('255')){
      pass(`.bg-secondary applies secondary color: ${bg}`);
    } else {
      fail(`Expected secondary purple, got ${bg}`);
    }
  },

  'should apply .bg-success': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'bg-success';
    document.body.appendChild(el);
    const bg = getStyle(el, 'backgroundColor');
    el.remove();
    if(bg && bg.includes('136') && bg.includes('0')){
      pass(`.bg-success applies green: ${bg}`);
    } else {
      fail(`Expected green, got ${bg}`);
    }
  },

  'should apply .bg-warning': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'bg-warning';
    document.body.appendChild(el);
    const bg = getStyle(el, 'backgroundColor');
    el.remove();
    if(bg && bg.includes('255') && bg.includes('102')){
      pass(`.bg-warning applies orange: ${bg}`);
    } else {
      fail(`Expected orange, got ${bg}`);
    }
  },

  'should apply .bg-danger': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'bg-danger';
    document.body.appendChild(el);
    const bg = getStyle(el, 'backgroundColor');
    el.remove();
    if(bg && bg.includes('255') && bg.includes('51')){
      pass(`.bg-danger applies red: ${bg}`);
    } else {
      fail(`Expected red, got ${bg}`);
    }
  },

  'should apply .tc-default': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'tc-default';
    document.body.appendChild(el);
    const color = getStyle(el, 'color');
    el.remove();
    if(color && color !== 'rgba(0, 0, 0, 0)'){
      pass(`.tc-default applies color: ${color}`);
    } else {
      fail('tc-default should apply color');
    }
  },

  'should apply .tc-primary': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'tc-primary';
    document.body.appendChild(el);
    const color = getStyle(el, 'color');
    el.remove();
    if(color && color !== 'rgba(0, 0, 0, 0)'){
      pass(`.tc-primary applies color: ${color}`);
    } else {
      fail('tc-primary should apply color');
    }
  },

  'should apply .tc-secondary': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'tc-secondary';
    document.body.appendChild(el);
    const color = getStyle(el, 'color');
    el.remove();
    if(color && color !== 'rgba(0, 0, 0, 0)'){
      pass(`.tc-secondary applies color: ${color}`);
    } else {
      fail('tc-secondary should apply color');
    }
  },

  'should apply .tc-success': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'tc-success';
    document.body.appendChild(el);
    const color = getStyle(el, 'color');
    el.remove();
    if(color && color !== 'rgba(0, 0, 0, 0)'){
      pass(`.tc-success applies color: ${color}`);
    } else {
      fail('tc-success should apply color');
    }
  },

  'should apply .tc-warning': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'tc-warning';
    document.body.appendChild(el);
    const color = getStyle(el, 'color');
    el.remove();
    if(color && color !== 'rgba(0, 0, 0, 0)'){
      pass(`.tc-warning applies color: ${color}`);
    } else {
      fail('tc-warning should apply color');
    }
  },

  'should apply .tc-danger': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'tc-danger';
    document.body.appendChild(el);
    const color = getStyle(el, 'color');
    el.remove();
    if(color && color !== 'rgba(0, 0, 0, 0)'){
      pass(`.tc-danger applies color: ${color}`);
    } else {
      fail('tc-danger should apply color');
    }
  },

  'should apply .tc-muted': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'tc-muted';
    document.body.appendChild(el);
    const color = getStyle(el, 'color');
    el.remove();
    if(color && color.includes('0.5')){
      pass(`.tc-muted applies muted color: ${color}`);
    } else {
      fail(`Expected muted (50% opacity), got ${color}`);
    }
  },

  'should set text color on .bg-primary': ({pass, fail}) => {
    const el = document.createElement('div');
    el.className = 'bg-primary';
    el.textContent = 'Test';
    document.body.appendChild(el);
    const color = getStyle(el, 'color');
    el.remove();
    if(color && color.includes('255')){
      pass(`.bg-primary sets light text color: ${color}`);
    } else {
      fail(`Expected light text, got ${color}`);
    }
  },

  'should prioritize .bg-primary over .elevation-3 background': ({pass, fail}) => {
    const combined = document.createElement('div');
    combined.className = 'elevation-3 bg-primary';
    document.body.appendChild(combined);

    const bgOnly = document.createElement('div');
    bgOnly.className = 'bg-primary';
    document.body.appendChild(bgOnly);

    const elevationOnly = document.createElement('div');
    elevationOnly.className = 'elevation-3';
    document.body.appendChild(elevationOnly);

    const combinedBg = getStyle(combined, 'backgroundColor');
    const bgPrimaryOnly = getStyle(bgOnly, 'backgroundColor');
    const elevationOnlyBg = getStyle(elevationOnly, 'backgroundColor');

    combined.remove();
    bgOnly.remove();
    elevationOnly.remove();

    if(combinedBg === bgPrimaryOnly && combinedBg !== elevationOnlyBg){
      pass(`Combined classes use bg-primary color: ${combinedBg}`);
    } else {
      fail(`Expected bg-primary to win. combined=${combinedBg}, bg-primary=${bgPrimaryOnly}, elevation=${elevationOnlyBg}`);
    }
  },

  'should prioritize .btn.primary over .bg-alt background': ({pass, fail}) => {
    const combined = document.createElement('button');
    combined.className = 'btn primary bg-alt';
    document.body.appendChild(combined);

    const primaryOnly = document.createElement('button');
    primaryOnly.className = 'btn primary';
    document.body.appendChild(primaryOnly);

    const bgAltOnly = document.createElement('button');
    bgAltOnly.className = 'btn bg-alt';
    document.body.appendChild(bgAltOnly);

    const combinedBg = getStyle(combined, 'backgroundColor');
    const primaryOnlyBg = getStyle(primaryOnly, 'backgroundColor');
    const bgAltOnlyBg = getStyle(bgAltOnly, 'backgroundColor');

    combined.remove();
    primaryOnly.remove();
    bgAltOnly.remove();

    if(combinedBg === primaryOnlyBg && combinedBg !== bgAltOnlyBg){
      pass(`Combined button classes keep primary color: ${combinedBg}`);
    } else {
      fail(`Expected btn.primary to win. combined=${combinedBg}, primary=${primaryOnlyBg}, bg-alt=${bgAltOnlyBg}`);
    }
  }
};
