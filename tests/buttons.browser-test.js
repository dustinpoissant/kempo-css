const getStyle = (el, prop) => getComputedStyle(el)[prop];

export const beforeAll = async () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/kempo.css';
  document.head.appendChild(link);
  await new Promise(resolve => link.onload = resolve);
};

export default {
  'should style button element': ({pass, fail}) => {
    const btn = document.createElement('button');
    btn.textContent = 'Test';
    document.body.appendChild(btn);
    const display = getStyle(btn, 'display');
    const cursor = getStyle(btn, 'cursor');
    const borderRadius = parseFloat(getStyle(btn, 'borderRadius'));
    btn.remove();
    if(display === 'inline-block' && cursor === 'pointer' && borderRadius > 0){
      pass('Button has correct base styling');
    } else {
      fail(`Expected inline-block/pointer/radius, got display: ${display}, cursor: ${cursor}, radius: ${borderRadius}`);
    }
  },

  'should style .btn class': ({pass, fail}) => {
    const el = document.createElement('a');
    el.className = 'btn';
    document.body.appendChild(el);
    const display = getStyle(el, 'display');
    const cursor = getStyle(el, 'cursor');
    el.remove();
    if(display === 'inline-block' && cursor === 'pointer'){
      pass('.btn class applies button styling');
    } else {
      fail(`Expected inline-block/pointer, got ${display}/${cursor}`);
    }
  },

  'should style input[type="button"]': ({pass, fail}) => {
    const input = document.createElement('input');
    input.type = 'button';
    input.value = 'Test';
    document.body.appendChild(input);
    const cursor = getStyle(input, 'cursor');
    input.remove();
    if(cursor === 'pointer'){
      pass('input[type="button"] has pointer cursor');
    } else {
      fail(`Expected pointer, got ${cursor}`);
    }
  },

  'should style input[type="submit"]': ({pass, fail}) => {
    const input = document.createElement('input');
    input.type = 'submit';
    document.body.appendChild(input);
    const cursor = getStyle(input, 'cursor');
    input.remove();
    if(cursor === 'pointer'){
      pass('input[type="submit"] has pointer cursor');
    } else {
      fail(`Expected pointer, got ${cursor}`);
    }
  },

  'should apply .primary button style': ({pass, fail}) => {
    const btn = document.createElement('button');
    btn.className = 'primary';
    document.body.appendChild(btn);
    const bg = getStyle(btn, 'backgroundColor');
    btn.remove();
    if(bg && bg !== 'rgba(0, 0, 0, 0)'){
      pass(`.primary button has background: ${bg}`);
    } else {
      fail('Primary button should have background color');
    }
  },

  'should apply .secondary button style': ({pass, fail}) => {
    const btn = document.createElement('button');
    btn.className = 'secondary';
    document.body.appendChild(btn);
    const bg = getStyle(btn, 'backgroundColor');
    btn.remove();
    if(bg && bg !== 'rgba(0, 0, 0, 0)'){
      pass(`.secondary button has background: ${bg}`);
    } else {
      fail('Secondary button should have background color');
    }
  },

  'should apply .success button style': ({pass, fail}) => {
    const btn = document.createElement('button');
    btn.className = 'success';
    document.body.appendChild(btn);
    const bg = getStyle(btn, 'backgroundColor');
    btn.remove();
    if(bg && bg.includes('0, 1') || bg.includes('rgb(0')){
      pass(`.success button has green background: ${bg}`);
    } else {
      fail(`Expected green, got ${bg}`);
    }
  },

  'should apply .warning button style': ({pass, fail}) => {
    const btn = document.createElement('button');
    btn.className = 'warning';
    document.body.appendChild(btn);
    const bg = getStyle(btn, 'backgroundColor');
    btn.remove();
    if(bg && bg !== 'rgba(0, 0, 0, 0)'){
      pass(`.warning button has background: ${bg}`);
    } else {
      fail('Warning button should have background color');
    }
  },

  'should apply .danger button style': ({pass, fail}) => {
    const btn = document.createElement('button');
    btn.className = 'danger';
    document.body.appendChild(btn);
    const bg = getStyle(btn, 'backgroundColor');
    btn.remove();
    if(bg && bg !== 'rgba(0, 0, 0, 0)'){
      pass(`.danger button has background: ${bg}`);
    } else {
      fail('Danger button should have background color');
    }
  },

  'should apply .link button style': ({pass, fail}) => {
    const btn = document.createElement('button');
    btn.className = 'link';
    document.body.appendChild(btn);
    const bg = getStyle(btn, 'backgroundColor');
    const border = getStyle(btn, 'borderStyle');
    btn.remove();
    if(bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent'){
      pass('.link button has transparent background');
    } else {
      fail(`Expected transparent, got ${bg}`);
    }
  },

  'should reduce opacity on disabled button': ({pass, fail}) => {
    const btn = document.createElement('button');
    btn.disabled = true;
    document.body.appendChild(btn);
    const opacity = parseFloat(getStyle(btn, 'opacity'));
    btn.remove();
    if(opacity < 1){
      pass(`Disabled button has reduced opacity: ${opacity}`);
    } else {
      fail(`Expected opacity < 1, got ${opacity}`);
    }
  },

  'should style .btn-grp as inline-flex': ({pass, fail}) => {
    const grp = document.createElement('div');
    grp.className = 'btn-grp';
    document.body.appendChild(grp);
    const display = getStyle(grp, 'display');
    grp.remove();
    if(display === 'inline-flex'){
      pass('.btn-grp displays as inline-flex');
    } else {
      fail(`Expected inline-flex, got ${display}`);
    }
  },

  'should remove border radius on middle buttons in .btn-grp': ({pass, fail}) => {
    const grp = document.createElement('div');
    grp.className = 'btn-grp';
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    const btn3 = document.createElement('button');
    grp.appendChild(btn1);
    grp.appendChild(btn2);
    grp.appendChild(btn3);
    document.body.appendChild(grp);
    const btn2TLRadius = parseFloat(getStyle(btn2, 'borderTopLeftRadius'));
    const btn2TRRadius = parseFloat(getStyle(btn2, 'borderTopRightRadius'));
    grp.remove();
    if(btn2TLRadius === 0 && btn2TRRadius === 0){
      pass('Middle button in .btn-grp has no border radius');
    } else {
      fail(`Expected 0 radius, got TL: ${btn2TLRadius}, TR: ${btn2TRRadius}`);
    }
  },

  'should style .no-btn as unstyled button': ({pass, fail}) => {
    const btn = document.createElement('button');
    btn.className = 'no-btn';
    document.body.appendChild(btn);
    const bg = getStyle(btn, 'backgroundColor');
    const border = getStyle(btn, 'borderStyle');
    btn.remove();
    if((bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') && border === 'none'){
      pass('.no-btn removes button styling');
    } else {
      fail(`Expected transparent/none, got bg: ${bg}, border: ${border}`);
    }
  },

  'should apply .full class for full width': ({pass, fail}) => {
    const container = document.createElement('div');
    container.style.width = '500px';
    const btn = document.createElement('button');
    btn.className = 'full';
    container.appendChild(btn);
    document.body.appendChild(container);
    const btnWidth = parseFloat(getStyle(btn, 'width'));
    container.remove();
    // .full should make the button take full container width
    if(btnWidth >= 490){
      pass(`.full makes button full width: ${btnWidth}px`);
    } else {
      fail(`Expected ~500px width, got ${btnWidth}px`);
    }
  }
};
