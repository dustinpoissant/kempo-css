#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

// Check for watch flag
const isWatchMode = process.argv.includes('--watch');

if (isWatchMode) {
  console.log('Watch mode enabled - monitoring CSS files for changes...\n');
} else {
  console.log('Building Kempo CSS...\n');
}

// Define input and output files
const inputFiles = [
  'kempo.css',
  'kempo-hljs.css'
];

const outputDir = 'dist';
const outputFiles = [
  'kempo.min.css',
  'kempo-hljs.min.css'
];

// Create dist directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
  console.log(`Created ${outputDir}/ directory`);
}

// Minify each CSS file
inputFiles.forEach((inputFile, index) => {
  const outputFile = path.join(outputDir, outputFiles[index]);
  
  try {
    // Check if input file exists
    if (!fs.existsSync(inputFile)) {
      console.log(`Skipping ${inputFile} (file not found)`);
      return;
    }

    // Get file size before minification
    const originalSize = fs.statSync(inputFile).size;

    // Minify the CSS using clean-css-cli
    console.log(`Minifying ${inputFile}...`);
    execSync(`npx cleancss -o ${outputFile} ${inputFile}`, { stdio: 'inherit' });

    // Get file size after minification
    const minifiedSize = fs.statSync(outputFile).size;
    const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);

    console.log(`${inputFile} → ${outputFile}`);
    console.log(`   Original: ${(originalSize / 1024).toFixed(1)}KB`);
    console.log(`   Minified: ${(minifiedSize / 1024).toFixed(1)}KB`);
    console.log(`   Savings: ${savings}%\n`);
  } catch (error) {
    console.error(`Error minifying ${inputFile}:`, error.message);
  }
});

// Process and minify components
async function processComponents(){
  const componentsDir = 'src/components';
  const docsComponentsDir = 'docs/components';

  if(!fs.existsSync(componentsDir)){
    return;
  }

  if(!fs.existsSync(docsComponentsDir)){
    fs.mkdirSync(docsComponentsDir, { recursive: true });
    console.log(`Created ${docsComponentsDir}/ directory`);
  }

  const componentFiles = fs.readdirSync(componentsDir).filter(file => file.endsWith('.js'));
  
  console.log('\nProcessing JavaScript files...');
  for(const file of componentFiles){
    const srcPath = path.join(componentsDir, file);
    const destPath = path.join(docsComponentsDir, file);
    
    try{
      const code = fs.readFileSync(srcPath, 'utf-8');
      
      if(file.endsWith('.min.js')){
        fs.writeFileSync(destPath, code);
        console.log(`Copied ${srcPath} → ${destPath} (already minified)`);
      }else{
        console.log(`Minifying ${srcPath}...`);
        const result = await minify(code);
        fs.writeFileSync(destPath, result.code);
        const originalSize = Buffer.byteLength(code, 'utf-8');
        const minifiedSize = Buffer.byteLength(result.code, 'utf-8');
        const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
        console.log(`   Original: ${(originalSize / 1024).toFixed(1)}KB`);
        console.log(`   Minified: ${(minifiedSize / 1024).toFixed(1)}KB`);
        console.log(`   Savings: ${savings}%`);
      }
    }catch(error){
      console.error(`Error processing ${srcPath}:`, error.message);
    }
  }
}

processComponents().then(() => {

// Copy CSS to docs
const cssFiles = ['src/kempo.css', 'src/kempo-hljs.css'];
const docsDir = 'docs';

cssFiles.forEach(file => {
  if(fs.existsSync(file)){
    const fileName = path.basename(file);
    const destPath = path.join(docsDir, fileName);
    fs.copyFileSync(file, destPath);
    console.log(`Copied ${file} → ${destPath}`);
  }
});

// Copy minified CSS to docs
const minifiedFiles = fs.readdirSync(outputDir).filter(file => file.endsWith('.css'));
minifiedFiles.forEach(file => {
  const srcPath = path.join(outputDir, file);
  const destPath = path.join(docsDir, file);
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${srcPath} → ${destPath}`);
});

  console.log('\nBuild complete!');
  console.log(`Minified files are in the ${outputDir}/ directory`);
}).catch(error => {
  console.error('Build error:', error);
  process.exit(1);
});

// Watch mode functionality
if (isWatchMode) {
  console.log('Watching for changes... (Press Ctrl+C to stop)\n');
  
  inputFiles.forEach(inputFile => {
    if (fs.existsSync(inputFile)) {
      fs.watchFile(inputFile, { interval: 1000 }, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
          console.log(`\n${inputFile} changed, rebuilding...`);
          
          // Find the corresponding output file
          const index = inputFiles.indexOf(inputFile);
          const outputFile = path.join(outputDir, outputFiles[index]);
            try {
            const originalSize = fs.statSync(inputFile).size;
            console.log(`Minifying ${inputFile}...`);
            execSync(`npx cleancss -o ${outputFile} ${inputFile}`, { stdio: 'inherit' });
            
            const minifiedSize = fs.statSync(outputFile).size;
            const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
            
            console.log(`${inputFile} → ${outputFile}`);
            console.log(`   Original: ${(originalSize / 1024).toFixed(1)}KB`);
            console.log(`   Minified: ${(minifiedSize / 1024).toFixed(1)}KB`);
            console.log(`   Savings: ${savings}%`);
            console.log('\nWatching for changes...');
          } catch (error) {
            console.error(`Error minifying ${inputFile}:`, error.message);
          }
        }
      });
    }
  });
}