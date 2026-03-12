# Code Contribution Guidelines

## Project Structure

 - The actual CSS file (the main file for this project) is at `src/kempo.css`.
 - All documnentation should be in the `docs/` directory. This directory is used by GitHub as the "GitHub Pages", so all links need to be relative, and there will be a build script which copies all code to the `docs/` directory.
 - Components used in the docs / theme builder should live within the docs directory directly, as they are not part of the distributed code for this project.
 - All tests should live in the `tests/` directory. These use the kempo-testing-framework, do not assume they are jest/enszyme or any other popular testing framework, instead read the existing tests or the docs (https://github.com/dustinpoissant/kempo-testing-framework/blob/main/README.md) to understand how these tests work.

### Minimal Comments, Empty Lines, and Spacing

Use minimal comments. Assume readers understand the language. Some exceptions include:
  - complex logic
  - anti-patterns
  - code organization

Do not put random empty lines within code; put them where they make sense for readability, for example:
  - above and below definitions for functions and classes.
  - to help break up large sections of logic to be more readable. If there are 100 lines of code with no breaks, it gets hard to read.
  - above multi-line comments to indicate the comment belongs to the code below

No  empty lines in css.

End each file with an empty line.

End each line with a `;` when possible, even if it is optional.

## Development Workflow

### Local Development Server
- **DO NOT** start a development server - one is already running
- Default port: **8083**
- Base URL: `http://localhost:4048/`
- Documentation URLs follow the directory/file structure in `docs/`
- Use this server for all testing and verification

### Testing and Verification
- **ALWAYS** verify changes using the live documentation on the running server
- Use Chrome DevTools Protocol (chrome-devtools-mcp) for interactive testing
- **DO NOT** create one-off test files or framework-less tests
- Test components in their natural documentation environment
- Validate both functionality and visual appearance
- Always add to the changelog after each commit. Assume the next version incrament will be a patch version unless stated otherwise.
