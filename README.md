# Kempo CSS

A lightweight, modern CSS framework that provides kempo utilities and components for rapid web development.

## Features

- **Lightweight**: Minimal footprint with only the essentials
- **Modern**: Built with modern CSS practices and design principles
- **Flexible**: Utility-first approach with semantic components
- **Dark Mode**: Built-in dark theme support with easy toggling
- **Color Utilities**: Comprehensive background and text color classes

## Documentation

View the complete documentation and live examples at:
**[https://dustinpoissant.github.io/kempo-css/](https://dustinpoissant.github.io/kempo-css/)**

## Installation

### NPM

```bash
npm install kempo-css
```

Then include the CSS files in your project:
```html
<link rel="stylesheet" href="node_modules/kempo-css/kempo.css">
<link rel="stylesheet" href="node_modules/kempo-css/kempo-hljs.css">
```

Or import in your CSS/SCSS files:
```css
@import 'kempo-css/kempo.css';
@import 'kempo-css/kempo-hljs.css';
```

### Download

1. Download the CSS files from the [documentation page](https://dustinpoissant.github.io/kempo-css/)
2. Include them in your project:

```html
<link rel="stylesheet" href="path/to/kempo.css">
<link rel="stylesheet" href="path/to/kempo-hljs.css">
```

### Build from Source

1. Clone the repository:
```bash
git clone https://github.com/dustinpoissant/kempo-css.git
cd kempo-css
```

2. Install dependencies:
```bash
npm install
```

3. Build minified versions:
```bash
npm run build
```

## Quick Start

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My App</title>
    <link rel="stylesheet" href="https://dustinpoissant.github.io/kempo-css/kempo.css">
</head>
<body>
    <div class="container">
        <h1 class="tc-primary">Hello, Kempo CSS!</h1>
        <button class="btn btn-primary">Get Started</button>
    </div>
</body>
</html>
```

## Development

- `npm run build` - Build minified CSS files
- `npm run build:watch` - Watch for changes and rebuild automatically

## License

ISC License - feel free to use in personal and commercial projects.

---

**[View Documentation](https://dustinpoissant.github.io/kempo-css/)** | **[Report Issues](https://github.com/dustinpoissant/kempo-css/issues)**

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Setting up your development environment
- Code style and conventions
- Testing guidelines
- Pull request process

## License

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 2.0 Generic License](https://creativecommons.org/licenses/by-nc-sa/2.0/) - see the [LICENSE.md](LICENSE.md) file for details.
