const getVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export const beforeAll = async () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/kempo.css';
  document.head.appendChild(link);
  await new Promise(resolve => link.onload = resolve);
};

export default {
  'should have font family variables': ({pass, fail}) => {
    const vars = ['--ff_body', '--ff_heading', '--ff_mono'];
    const missing = vars.filter(v => !getVar(v));
    if(missing.length === 0){
      pass('All font family variables exist');
    } else {
      fail(`Missing font family variables: ${missing.join(', ')}`);
    }
  },

  'should have font size variables': ({pass, fail}) => {
    const vars = [
      '--fs_base', '--fs_small', '--fs_large',
      '--fs_h1', '--fs_h2', '--fs_h3', '--fs_h4', '--fs_h5', '--fs_h6'
    ];
    const missing = vars.filter(v => !getVar(v));
    if(missing.length === 0){
      pass('All font size variables exist');
    } else {
      fail(`Missing font size variables: ${missing.join(', ')}`);
    }
  },

  'should have font weight variables': ({pass, fail}) => {
    const vars = ['--fw_base', '--fw_bold'];
    const missing = vars.filter(v => !getVar(v));
    if(missing.length === 0){
      pass('All font weight variables exist');
    } else {
      fail(`Missing font weight variables: ${missing.join(', ')}`);
    }
  },

  'should have spacer variables': ({pass, fail}) => {
    const vars = ['--spacer', '--spacer_h', '--spacer_q'];
    const missing = vars.filter(v => !getVar(v));
    if(missing.length === 0){
      pass('All spacer variables exist');
    } else {
      fail(`Missing spacer variables: ${missing.join(', ')}`);
    }
  },

  'should have layout variables': ({pass, fail}) => {
    const vars = ['--line-height', '--container_width', '--animation_ms', '--radius'];
    const missing = vars.filter(v => !getVar(v));
    if(missing.length === 0){
      pass('All layout variables exist');
    } else {
      fail(`Missing layout variables: ${missing.join(', ')}`);
    }
  },

  'should have background color variables': ({pass, fail}) => {
    const vars = ['--c_bg', '--c_bg__inv', '--c_bg__alt', '--c_overscroll'];
    const missing = vars.filter(v => !getVar(v));
    if(missing.length === 0){
      pass('All background color variables exist');
    } else {
      fail(`Missing background color variables: ${missing.join(', ')}`);
    }
  },

  'should have border color variables': ({pass, fail}) => {
    const vars = ['--c_border', '--c_border__inv'];
    const missing = vars.filter(v => !getVar(v));
    if(missing.length === 0){
      pass('All border color variables exist');
    } else {
      fail(`Missing border color variables: ${missing.join(', ')}`);
    }
  },

  'should have semantic color variables': ({pass, fail}) => {
    const vars = [
      '--c_primary', '--c_primary__hover',
      '--c_secondary', '--c_secondary__hover',
      '--c_success', '--c_success__hover',
      '--c_warning', '--c_warning__hover',
      '--c_danger', '--c_danger__hover'
    ];
    const missing = vars.filter(v => !getVar(v));
    if(missing.length === 0){
      pass('All semantic color variables exist');
    } else {
      fail(`Missing semantic color variables: ${missing.join(', ')}`);
    }
  },

  'should have text color variables': ({pass, fail}) => {
    const vars = [
      '--tc', '--tc_dark', '--tc_light', '--tc_inv', '--tc_muted',
      '--tc_on_primary', '--tc_on_secondary', '--tc_on_success',
      '--tc_on_warning', '--tc_on_danger',
      '--tc_primary', '--tc_secondary', '--tc_success', '--tc_warning', '--tc_danger'
    ];
    const missing = vars.filter(v => !getVar(v));
    if(missing.length === 0){
      pass('All text color variables exist');
    } else {
      fail(`Missing text color variables: ${missing.join(', ')}`);
    }
  },

  'should have button variables': ({pass, fail}) => {
    const vars = [
      '--btn_padding', '--btn_box_shadow', '--btn_box_shadow__hover',
      '--btn_border', '--btn_bg', '--btn_bg__hover', '--btn_tc'
    ];
    const missing = vars.filter(v => !getVar(v));
    if(missing.length === 0){
      pass('All button variables exist');
    } else {
      fail(`Missing button variables: ${missing.join(', ')}`);
    }
  },

  'should have input variables': ({pass, fail}) => {
    const vars = [
      '--input_padding', '--input_border_width', '--input_bg',
      '--input_tc', '--c_input_accent', '--c_input_border'
    ];
    const missing = vars.filter(v => !getVar(v));
    if(missing.length === 0){
      pass('All input variables exist');
    } else {
      fail(`Missing input variables: ${missing.join(', ')}`);
    }
  },

  'should have link variables': ({pass, fail}) => {
    const vars = ['--link_decoration', '--tc_link', '--tc_link__hover'];
    const missing = vars.filter(v => !getVar(v));
    if(missing.length === 0){
      pass('All link variables exist');
    } else {
      fail(`Missing link variables: ${missing.join(', ')}`);
    }
  },

  'should have focus and shadow variables': ({pass, fail}) => {
    const vars = ['--focus_shadow', '--focus_shadow_on_primary', '--drop_shadow', '--drop_shadow__light', '--drop_shadow__dark', '--c_overlay'];
    const missing = vars.filter(v => !getVar(v));
    if(missing.length === 0){
      pass('All focus and shadow variables exist');
    } else {
      fail(`Missing focus and shadow variables: ${missing.join(', ')}`);
    }
  },

  'should have highlight variable': ({pass, fail}) => {
    const value = getVar('--c_highlight');
    if(value){
      pass('Highlight variable exists');
    } else {
      fail('Missing --c_highlight variable');
    }
  }
};
