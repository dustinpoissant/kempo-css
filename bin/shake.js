#!/usr/bin/env node
import { readFileSync } from 'fs';
import { resolve } from 'path';
import shake from '../src/shake.js';

const args = process.argv.slice(2);
const flagIndex = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : undefined;
};

const htmlPath = flagIndex('--html') || args.find(a => !a.startsWith('--'));
const themePath = flagIndex('--theme');

if(!htmlPath){
  console.error('Usage: kempo-css-shake --html <file.html> [--theme <theme.css>]');
  process.exit(1);
}

const html = readFileSync(resolve(htmlPath), 'utf-8');
const options = {};
if(themePath){
  options.theme = resolve(themePath);
}

process.stdout.write(shake(html, options));
