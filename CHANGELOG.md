# Changelog

All notable changes to this project will be documented in this file.

## [2.1.4] - 2026-04-13
- Added `.td-u` (underline) and `.td-lt` (line-through) text decoration utility classes
- Added Text Decoration section to typography docs
- Added unit tests for `.td-u` and `.td-lt`

## [2.1.3] - 2026-06-28
- Split docs into multiple pages using kempo-server v3 templating system
- Added `docs-src/` directory with templates, pages, and fragments
- Updated build script to render docs from `docs-src/` to `docs/`
- Added `dev` script for on-demand SSR with live CSS from `src/`
- Upgraded kempo-server to v3

## [2.1.1] - 2026-03-21
- Added LLM.txt

## [2.1.0] - 2026-03-21

### Changed
- Non-neutral colors (hover states, text colors, bg variants, border variants) are now auto-calculated from their base color using `oklch` relative color syntax — theme consumers only need to define the base colors
- Elevation system now tops out at level 5; levels 6–10 alias level 5 for both shadows and backgrounds
- Docs updated to reflect the elevation cap

## [2.0.0] - 2026-03-20

### Changed
- **Breaking:** Redesigned elevation system from levels -2–3 to 0–10
- `elevation-*` classes now only set `z-index` (in increments of 10); level 2 is the page default (z-index 20)
- Added `shadow` class: combine with `elevation-*` to apply box-shadow — inset for levels 0–1, none for level 2, outset for levels 3–10
- Added `bg-elevation` class: combine with `elevation-*` to apply elevation-appropriate background colors
- Added 11 new CSS custom properties: `--c_bg_elevation_0` through `--c_bg_elevation_10` (`--c_bg_elevation_2` equals `var(--c_bg)`)
- Replaced old `--elevation_*_shadow` variables with `--shadow_0` through `--shadow_10` (and `__light`/`__dark` variants)
- Updated docs with separate sections for z-index, shadow, and bg-elevation utilities
- Updated tests: revised colors test and added `tests/elevation.browser-test.js` with 15 new tests

### Changed
- Reorganized files
- Moved and updated .github/copilot-instructions.md -> AGENTS.md

## [1.3.12] - 2026-03-12

### Changed
- Updated github workflows

## [1.3.10] - 2026-02-26

### Changed
- Added `!important` to color utility classes for higher specificity

## [1.3.3] - 2026-01-30

### Fixed
- Fixed checkboxes and radio button styling

### Changed
- Moved dependencies to devDependencies (not needed for consumers, only development)
- CI workflow improvements for NPM publishing

> Versions 1.3.4–1.3.9 were published on the same day as CI/CD workflow fixes for NPM publishing; no CSS or feature changes.

## [1.3.2] - 2025-12-01

### Changed
- Changed license to MIT for jsDelivr compatibility

## [1.3.1] - 2025-12-01

### Fixed
- Fixed build output

## [1.3.0] - 2025-11-30

### Added
- Added elevation utility classes
- Added more drop shadow options

## [1.2.0] - 2025-11-29

### Fixed
- Fixed drop shadow utilities

### Added
- Added unit tests for drop shadows

## [1.1.0] - 2025-11-26

### Added
- Added section navigation to theme-editor sidemenu
- Removed kempo-ui dependency, now serving from CDN instead

## [1.0.9] - 2025-11-26

### Added
- Theme builder / theme editor

## [1.0.8] - 2025-10-29

### Added
- Added LICENSE file

## [1.0.7] - 2025-10-29

### Added
- Added icon support
- Added `no-scroll` utility class
- Started theme builder component

## [1.0.6] - 2025-10-01

### Changed
- Made select element options match the active theme

## [1.0.5] - 2025-08-22

### Added
- Initial release published to NPM
- Base CSS reset and theme system
- Typography utilities
- Color utilities
- Spacing utilities
- Flexbox and grid layout utilities
- Button styles
- Form styles
- Table styles
- Documentation site
- GitHub Actions workflow for automated NPM publishing
