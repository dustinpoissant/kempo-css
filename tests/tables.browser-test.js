const getStyle = (el, prop) => getComputedStyle(el)[prop];

/* innerHTML so the parser adds the <tbody> that the .no-headers and .left-headers selectors need */
const build = html => {
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.appendChild(host);
  return host;
};

const leftHeaders = '<table class="left-headers"><tbody><tr><th>a</th><td>b</td><td>c</td></tr><tr><th>d</th><td>e</td><td>f</td></tr><tr><th>g</th><td>h</td><td>i</td></tr></tbody></table>';

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
  },

  'should give the first row of a .no-headers table a top border and top corner radius': ({pass, fail}) => {
    const host = build('<table class="no-headers"><tbody><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></tbody></table>');
    const [a, b, c] = host.querySelectorAll('td');
    const border = parseFloat(getStyle(a, 'borderTopWidth'));
    const tl = parseFloat(getStyle(a, 'borderTopLeftRadius'));
    const tr = parseFloat(getStyle(b, 'borderTopRightRadius'));
    const secondRowTop = parseFloat(getStyle(c, 'borderTopWidth'));
    host.remove();
    if(border > 0 && tl > 0 && tr > 0 && secondRowTop === 0){
      pass('First row has a top border and rounded top corners, second row does not have a top border');
    } else {
      fail(`Expected border and radius on first row only, got border: ${border}, tl: ${tl}, tr: ${tr}, second row border: ${secondRowTop}`);
    }
  },

  'should not add a top border or top radius to a table without .no-headers': ({pass, fail}) => {
    const host = build('<table><tbody><tr><td>a</td><td>b</td></tr></tbody></table>');
    const [a] = host.querySelectorAll('td');
    const border = parseFloat(getStyle(a, 'borderTopWidth'));
    const tl = parseFloat(getStyle(a, 'borderTopLeftRadius'));
    host.remove();
    if(border === 0 && tl === 0){
      pass('Plain table first row cells have no top border or radius');
    } else {
      fail(`Expected none, got border: ${border}, tl: ${tl}`);
    }
  },

  'should round the outer corners of a .left-headers table': ({pass, fail}) => {
    const host = build(leftHeaders);
    const ths = host.querySelectorAll('th');
    const tds = host.querySelectorAll('td');
    const tl = parseFloat(getStyle(ths[0], 'borderTopLeftRadius'));
    const bl = parseFloat(getStyle(ths[2], 'borderBottomLeftRadius'));
    const tr = parseFloat(getStyle(tds[1], 'borderTopRightRadius'));
    const br = parseFloat(getStyle(tds[tds.length - 1], 'borderBottomRightRadius'));
    host.remove();
    if(tl > 0 && bl > 0 && tr > 0 && br > 0){
      pass('All four outer corners are rounded');
    } else {
      fail(`Expected all four corners rounded, got tl: ${tl}, bl: ${bl}, tr: ${tr}, br: ${br}`);
    }
  },

  'should give a .left-headers table one top border and no radius on inner header cells': ({pass, fail}) => {
    const host = build(leftHeaders);
    const ths = host.querySelectorAll('th');
    const firstTop = parseFloat(getStyle(ths[0], 'borderTopWidth'));
    const middleTop = parseFloat(getStyle(ths[1], 'borderTopWidth'));
    const middleRadius = ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius'].map(prop => parseFloat(getStyle(ths[1], prop)));
    host.remove();
    if(firstTop > 0 && middleTop === 0 && middleRadius.every(radius => radius === 0)){
      pass('Only the first header cell has a top border, the middle one is square');
    } else {
      fail(`Expected a square middle header without a top border, got first top: ${firstTop}, middle top: ${middleTop}, middle radius: ${middleRadius}`);
    }
  },

  'should leave the top corners to the thead in a .left-headers table with a thead': ({pass, fail}) => {
    const host = build('<table class="left-headers"><thead><tr><th>x</th><th>y</th></tr></thead><tbody><tr><th>a</th><td>b</td></tr><tr><th>c</th><td>d</td></tr></tbody></table>');
    const [corner, , a, c] = host.querySelectorAll('th');
    const cornerRadius = parseFloat(getStyle(corner, 'borderTopLeftRadius'));
    const bodyTop = parseFloat(getStyle(a, 'borderTopWidth'));
    const bodyRadius = parseFloat(getStyle(a, 'borderTopLeftRadius'));
    const lastRadius = parseFloat(getStyle(c, 'borderBottomLeftRadius'));
    host.remove();
    if(cornerRadius > 0 && bodyTop === 0 && bodyRadius === 0 && lastRadius > 0){
      pass('Corner header is rounded, first body header is square without a top border, last is rounded at the bottom');
    } else {
      fail(`Unexpected corners, got corner: ${cornerRadius}, body top: ${bodyTop}, body radius: ${bodyRadius}, last: ${lastRadius}`);
    }
  },

  'should not let .left-headers change a table nested in it': ({pass, fail}) => {
    const host = build('<table class="left-headers"><tbody><tr><th>a</th><td><table><tbody><tr><th>x</th><td>y</td></tr><tr><th>z</th><td>w</td></tr></tbody></table></td></tr></tbody></table>');
    const inner = host.querySelectorAll('table table th');
    const firstRadius = parseFloat(getStyle(inner[0], 'borderTopLeftRadius'));
    const secondTop = parseFloat(getStyle(inner[1], 'borderTopWidth'));
    host.remove();
    if(firstRadius > 0 && secondTop > 0){
      pass('Nested table keeps the default th styles');
    } else {
      fail(`Expected default th styles in the nested table, got radius: ${firstRadius}, second top border: ${secondTop}`);
    }
  }
};
