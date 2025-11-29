const getStyle = (el, prop) => getComputedStyle(el)[prop];

export const beforeAll = async () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/kempo.css';
  document.head.appendChild(link);
  await new Promise(resolve => link.onload = resolve);
};

export default {
  'should make table full width': ({pass, fail}) => {
    const table = document.createElement('table');
    document.body.appendChild(table);
    const width = getStyle(table, 'width');
    table.remove();
    if(width.endsWith('%') || parseFloat(width) > 500){
      pass(`Table has full width: ${width}`);
    } else {
      fail(`Expected full width, got ${width}`);
    }
  },

  'should collapse table borders': ({pass, fail}) => {
    const table = document.createElement('table');
    document.body.appendChild(table);
    const borderSpacing = getStyle(table, 'borderSpacing');
    table.remove();
    if(borderSpacing === '0px' || borderSpacing === '0px 0px'){
      pass('Table has collapsed borders (border-spacing: 0)');
    } else {
      fail(`Expected 0 border-spacing, got ${borderSpacing}`);
    }
  },

  'should style th with bold font': ({pass, fail}) => {
    const table = document.createElement('table');
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = 'Header';
    tr.appendChild(th);
    table.appendChild(tr);
    document.body.appendChild(table);
    const fontWeight = getStyle(th, 'fontWeight');
    table.remove();
    if(parseInt(fontWeight) >= 700){
      pass(`th has bold font weight: ${fontWeight}`);
    } else {
      fail(`Expected bold, got ${fontWeight}`);
    }
  },

  'should style th with background': ({pass, fail}) => {
    const table = document.createElement('table');
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    tr.appendChild(th);
    table.appendChild(tr);
    document.body.appendChild(table);
    const bg = getStyle(th, 'backgroundColor');
    table.remove();
    if(bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent'){
      pass(`th has background: ${bg}`);
    } else {
      fail('th should have background color');
    }
  },

  'should apply left text-align to th': ({pass, fail}) => {
    const table = document.createElement('table');
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    tr.appendChild(th);
    table.appendChild(tr);
    document.body.appendChild(table);
    const textAlign = getStyle(th, 'textAlign');
    table.remove();
    if(textAlign === 'left' || textAlign === 'start'){
      pass(`th has left alignment: ${textAlign}`);
    } else {
      fail(`Expected left alignment, got ${textAlign}`);
    }
  },

  'should apply padding to th and td': ({pass, fail}) => {
    const table = document.createElement('table');
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const td = document.createElement('td');
    tr.appendChild(th);
    tr.appendChild(td);
    table.appendChild(tr);
    document.body.appendChild(table);
    const thPadding = parseFloat(getStyle(th, 'padding'));
    const tdPadding = parseFloat(getStyle(td, 'padding'));
    table.remove();
    if(thPadding > 0 && tdPadding > 0){
      pass(`th and td have padding: th=${thPadding}px, td=${tdPadding}px`);
    } else {
      fail(`Expected padding, got th: ${thPadding}, td: ${tdPadding}`);
    }
  },

  'should apply borders to th and td': ({pass, fail}) => {
    const table = document.createElement('table');
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const td = document.createElement('td');
    tr.appendChild(th);
    tr.appendChild(td);
    table.appendChild(tr);
    document.body.appendChild(table);
    const thBorder = parseFloat(getStyle(th, 'borderBottomWidth'));
    const tdBorder = parseFloat(getStyle(td, 'borderBottomWidth'));
    table.remove();
    if(thBorder > 0 && tdBorder > 0){
      pass('th and td have borders');
    } else {
      fail(`Expected borders, got th: ${thBorder}, td: ${tdBorder}`);
    }
  },

  'should apply border radius to first th': ({pass, fail}) => {
    const table = document.createElement('table');
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    tr.appendChild(th);
    table.appendChild(tr);
    document.body.appendChild(table);
    const radius = parseFloat(getStyle(th, 'borderTopLeftRadius'));
    table.remove();
    if(radius > 0){
      pass(`First th has border-top-left-radius: ${radius}px`);
    } else {
      fail('First th should have border radius');
    }
  },

  'should apply border radius to last th': ({pass, fail}) => {
    const table = document.createElement('table');
    const tr = document.createElement('tr');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    tr.appendChild(th1);
    tr.appendChild(th2);
    table.appendChild(tr);
    document.body.appendChild(table);
    const radius = parseFloat(getStyle(th2, 'borderTopRightRadius'));
    table.remove();
    if(radius > 0){
      pass(`Last th has border-top-right-radius: ${radius}px`);
    } else {
      fail('Last th should have border radius');
    }
  },

  'should apply border radius to last row cells': ({pass, fail}) => {
    const table = document.createElement('table');
    const tr1 = document.createElement('tr');
    const th = document.createElement('th');
    tr1.appendChild(th);
    const tr2 = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    tr2.appendChild(td1);
    tr2.appendChild(td2);
    table.appendChild(tr1);
    table.appendChild(tr2);
    document.body.appendChild(table);
    const td1Radius = parseFloat(getStyle(td1, 'borderBottomLeftRadius'));
    const td2Radius = parseFloat(getStyle(td2, 'borderBottomRightRadius'));
    table.remove();
    if(td1Radius > 0 && td2Radius > 0){
      pass('Last row has corner border radius');
    } else {
      fail(`Expected radius, got td1: ${td1Radius}, td2: ${td2Radius}`);
    }
  },

  'should style .table-wrapper with overflow-x auto': ({pass, fail}) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';
    document.body.appendChild(wrapper);
    const overflow = getStyle(wrapper, 'overflowX');
    wrapper.remove();
    if(overflow === 'auto'){
      pass('.table-wrapper has overflow-x: auto');
    } else {
      fail(`Expected auto, got ${overflow}`);
    }
  }
};
