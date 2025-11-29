const getStyle = (el, prop) => getComputedStyle(el)[prop];

export const beforeAll = async () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/kempo.css';
  document.head.appendChild(link);
  await new Promise(resolve => link.onload = resolve);
};

export default {
  'should style text input as block': ({pass, fail}) => {
    const input = document.createElement('input');
    input.type = 'text';
    document.body.appendChild(input);
    const display = getStyle(input, 'display');
    const width = getStyle(input, 'width');
    input.remove();
    if(display === 'block'){
      pass('Text input displays as block');
    } else {
      fail(`Expected block, got ${display}`);
    }
  },

  'should apply background to text input': ({pass, fail}) => {
    const input = document.createElement('input');
    input.type = 'text';
    document.body.appendChild(input);
    const bg = getStyle(input, 'backgroundColor');
    input.remove();
    if(bg && bg !== 'rgba(0, 0, 0, 0)'){
      pass(`Text input has background: ${bg}`);
    } else {
      fail('Text input should have background');
    }
  },

  'should apply border to text input': ({pass, fail}) => {
    const input = document.createElement('input');
    input.type = 'text';
    document.body.appendChild(input);
    const border = parseFloat(getStyle(input, 'borderWidth'));
    input.remove();
    if(border > 0){
      pass(`Text input has border: ${border}px`);
    } else {
      fail('Text input should have border');
    }
  },

  'should apply border radius to text input': ({pass, fail}) => {
    const input = document.createElement('input');
    input.type = 'text';
    document.body.appendChild(input);
    const radius = parseFloat(getStyle(input, 'borderRadius'));
    input.remove();
    if(radius > 0){
      pass(`Text input has border radius: ${radius}px`);
    } else {
      fail('Text input should have border radius');
    }
  },

  'should style select as block': ({pass, fail}) => {
    const select = document.createElement('select');
    document.body.appendChild(select);
    const display = getStyle(select, 'display');
    const cursor = getStyle(select, 'cursor');
    select.remove();
    if(display === 'block' && cursor === 'pointer'){
      pass('Select displays as block with pointer cursor');
    } else {
      fail(`Expected block/pointer, got ${display}/${cursor}`);
    }
  },

  'should style textarea as block with resize': ({pass, fail}) => {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    const display = getStyle(textarea, 'display');
    const resize = getStyle(textarea, 'resize');
    textarea.remove();
    if(display === 'block' && resize === 'vertical'){
      pass('Textarea displays as block with vertical resize');
    } else {
      fail(`Expected block/vertical, got ${display}/${resize}`);
    }
  },

  'should style label as block with pointer cursor': ({pass, fail}) => {
    const label = document.createElement('label');
    document.body.appendChild(label);
    const display = getStyle(label, 'display');
    const cursor = getStyle(label, 'cursor');
    label.remove();
    if(display === 'block' && cursor === 'pointer'){
      pass('Label displays as block with pointer cursor');
    } else {
      fail(`Expected block/pointer, got ${display}/${cursor}`);
    }
  },

  'should style checkbox input': ({pass, fail}) => {
    const input = document.createElement('input');
    input.type = 'checkbox';
    document.body.appendChild(input);
    const display = getStyle(input, 'display');
    const cursor = getStyle(input, 'cursor');
    input.remove();
    if(display === 'inline-block' && cursor === 'pointer'){
      pass('Checkbox is inline-block with pointer cursor');
    } else {
      fail(`Expected inline-block/pointer, got ${display}/${cursor}`);
    }
  },

  'should style radio input': ({pass, fail}) => {
    const input = document.createElement('input');
    input.type = 'radio';
    document.body.appendChild(input);
    const display = getStyle(input, 'display');
    const cursor = getStyle(input, 'cursor');
    input.remove();
    if(display === 'inline-block' && cursor === 'pointer'){
      pass('Radio is inline-block with pointer cursor');
    } else {
      fail(`Expected inline-block/pointer, got ${display}/${cursor}`);
    }
  },

  'should reduce opacity on disabled input': ({pass, fail}) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.disabled = true;
    document.body.appendChild(input);
    const opacity = parseFloat(getStyle(input, 'opacity'));
    input.remove();
    if(opacity < 1){
      pass(`Disabled input has reduced opacity: ${opacity}`);
    } else {
      fail(`Expected opacity < 1, got ${opacity}`);
    }
  },

  'should reduce opacity on disabled select': ({pass, fail}) => {
    const select = document.createElement('select');
    select.disabled = true;
    document.body.appendChild(select);
    const opacity = parseFloat(getStyle(select, 'opacity'));
    select.remove();
    if(opacity < 1){
      pass(`Disabled select has reduced opacity: ${opacity}`);
    } else {
      fail(`Expected opacity < 1, got ${opacity}`);
    }
  },

  'should reduce opacity on disabled textarea': ({pass, fail}) => {
    const textarea = document.createElement('textarea');
    textarea.disabled = true;
    document.body.appendChild(textarea);
    const opacity = parseFloat(getStyle(textarea, 'opacity'));
    textarea.remove();
    if(opacity < 1){
      pass(`Disabled textarea has reduced opacity: ${opacity}`);
    } else {
      fail(`Expected opacity < 1, got ${opacity}`);
    }
  },

  'should style color input': ({pass, fail}) => {
    const input = document.createElement('input');
    input.type = 'color';
    document.body.appendChild(input);
    const height = parseFloat(getStyle(input, 'height'));
    input.remove();
    if(height > 0){
      pass(`Color input has height: ${height}px`);
    } else {
      fail('Color input should have height');
    }
  },

  'should style select[multiple]': ({pass, fail}) => {
    const select = document.createElement('select');
    select.multiple = true;
    document.body.appendChild(select);
    const height = parseFloat(getStyle(select, 'height'));
    const resize = getStyle(select, 'resize');
    select.remove();
    if(height > 50 && resize === 'vertical'){
      pass(`select[multiple] has height ${height}px and vertical resize`);
    } else {
      fail(`Expected height > 50 and vertical resize, got ${height}px/${resize}`);
    }
  },

  'should style label.checkbox as inline-block': ({pass, fail}) => {
    const label = document.createElement('label');
    label.className = 'checkbox';
    document.body.appendChild(label);
    const display = getStyle(label, 'display');
    label.remove();
    if(display === 'inline-block'){
      pass('label.checkbox displays as inline-block');
    } else {
      fail(`Expected inline-block, got ${display}`);
    }
  },

  'should style label.radio as inline-block': ({pass, fail}) => {
    const label = document.createElement('label');
    label.className = 'radio';
    document.body.appendChild(label);
    const display = getStyle(label, 'display');
    label.remove();
    if(display === 'inline-block'){
      pass('label.radio displays as inline-block');
    } else {
      fail(`Expected inline-block, got ${display}`);
    }
  }
};
