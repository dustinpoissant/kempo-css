---
mode: "agent"
tools: ['edit', 'runNotebooks', 'search', 'new', 'runCommands', 'runTasks', 'chromedevtools/chrome-devtools-mcp/*', 'usages', 'vscodeAPI', 'problems', 'changes', 'testFailure', 'openSimpleBrowser', 'fetch', 'githubRepo', 'extensions', 'todos', 'runSubagent']
---

# Theme Editor

## Background
kempo-css can be customized by the consumer by creating their own theme file (css) which overwrites the CSS Custom Properties defined in `src/kempo.css`, the file should not overwrite the actual style properties of elements, only overwrite CSS Custom Properties.

## Description

### Page Layout
The theme editor" is a GUI which allows consumers to create and download a theme file. The page should be spit into 3 sections:
  1. Navigation: The navbar is on top of the page.
  2. Theme Editor: A set of inputs on the left side of the page, this should be full height (except the navigation) and be independently scrollable.
     - This should have two sections, the top is a download / upload buttons, and a theme select.
  3. Demo: HTML Elements that serve as examples to the user so they can see how their changes will affect the page. This should also be independently scrollable.

### Changing the theme
There should be two ways to change the theme.
  - A `k-theme-switcher` component in the navigation bar (supports auto/light/dark) - already in place.
  - A select dropdown on the top of the theme editor which allows the user to choose between "dark" and "light" (no "auto" option). This controls which theme's colors are being edited in the color pickers below. 
  - The select dropdown should subscribe to the theme context to stay in sync when the theme changes via the `k-theme-switcher`. When "auto" is detected, resolve it to the actual current theme (light or dark) using the theme util.
 
## Resources

### Kempo-UI
The theme editor should be built using the kempo-ui component library, which is based on Lit. Kempo-UI has already been installed as an external library.
  - If new components need to be created for this feature, they should be placed in `src/components/` following the project's base component architecture (ShadowComponent, LightComponent, or HybridComponent).
  - The "theme" utility should be used to get / set the theme and subscribe to theme changes.
    - https://dustinpoissant.github.io/kempo-ui/utils/theme.html
  - The "context" utility should be used to store the theme overwrites and synchronize UI state.
    - https://dustinpoissant.github.io/kempo-ui/utils/context.html
  - The "Color Picker" component should be used in the GUI.
    - https://dustinpoissant.github.io/kempo-ui/components/color-picker.html
  - The "Dialog" component should be used to allow the user to upload an existing theme for editing.
    - https://dustinpoissant.github.io/kempo-ui/components/dialog.html
 
### chrome-devtools-mcp
The page is already running at http://localhost:4048/theme-editor.html there is no need to start a server, just use the chrome-devtools-mcp to verify that the theme editor is working exactly as expected.

## Phases

  0. Create a custom component `k-theme-property-input` in `src/components/` that handles CSS custom property values.
     - This component should detect if the value is a CSS custom property reference (contains `var(--`).
     - It should provide a toggle/switch to choose between "Custom Value" and "Reference Property".
     - When in "Custom Value" mode for colors, show a `k-color-picker`.
     - When in "Reference Property" mode, show a select dropdown listing all available CSS custom properties (filtered to relevant types, e.g., only color properties for color values).
     - For properties with `light-dark()`, handle both the light and dark values, which may each independently be either a color or a property reference.
     - The component should emit a change event with the full value (e.g., `var(--c_primary)` or `rgb(51, 102, 255)`).
     - Use the chrome-devtools-mcp to verify this component works correctly in isolation before moving on.
  1. Create a JavaScript object that is the default theme.
     - This can be determined by looking at `src/kempo.css` and seeing what CSS Custom Properties are defined in the `:root` rule.
     - The object structure should store light and dark values separately for properties using `light-dark()`, and preserve `var()` references:
  2. Create the inputs for the CSS Custom Properties, the default values should be the default values from phase 1.
     - For color CSS Custom Properties that use `light-dark()`, show one `k-theme-property-input` per property. The displayed value should reflect the current editing theme (selected in the theme editor dropdown, not necessarily the applied theme).
     - The `k-theme-property-input` component should handle both direct color values and `var()` references automatically.
     - Group inputs logically: Colors first (primary, secondary, danger, warning, success, backgrounds, text colors), then typography (fonts, sizes, weights), then spacing/layout, then other properties.
     - For each input, add a label showing the CSS variable name (e.g., "Primary Color (--c_primary)").
     - The demo content is already loaded via `<k-import src="./docs.inc.html">` in the right pane and includes examples of all themed elements.
     - Use the chrome-devtools-mcp to verify the page looks correct before moving on to the next phase.s-is
         // ... etc
       }
       ```
     - Log it to the devtools console and verify using the chrome-devtools-mcp before moving on to the next phase.
  2. Create the inputs for the CSS Custom Properties, the default values should be the default values from phase 1.
     - For color CSS Custom Properties that use `light-dark()`, show one `k-color-picker` per property. The displayed value should reflect the current editing theme (selected in the theme editor dropdown, not necessarily the applied theme).
     - Group inputs logically: Colors first (primary, secondary, danger, warning, success, backgrounds, text colors), then typography (fonts, sizes, weights), then spacing/layout, then other properties.
     - For each color picker, add a label showing the CSS variable name (e.g., "Primary Color (--c_primary)").
     - The demo content is already loaded via `<k-import src="./docs.inc.html">` in the right pane and includes examples of all themed elements.
     - Use the chrome-devtools-mcp to verify the page looks correct before moving on to the next phase. 
  3. Create an event listener that listens for any change on any input, creates a new "theme" object, compares that to the default theme object from phase 1 to create a "diff" object.
  4. Create a theme css string from the diff object.
     - Convert the diff object back into CSS custom properties with `light-dark()` functions where appropriate.
     - The CSS should be wrapped in a `:root` selector.
     - Apply this theme by injecting it into a `<style id="custom-theme">` tag in the head, replacing any existing custom theme.
     - Save the CSS string to kempo-ui context for later download.
     - Log the CSS string to the devtools console.
     - Use the chrome-devtools-mcp to verify that the page looks correct and the CSS string in the devtools console looks correct:
       - Change a color input for the light theme, verify the page updates immediately when in light mode.
       - Switch to dark theme in the editor dropdown, change a dark color, verify the page updates when in dark mode.
       - Change a non-color input (e.g., font size, spacing) and verify the page updates across both themes.sole looks correct.
       - Change a color input and verify that the page is updating and looks by looking at the demo.
       - Change a non-color input and verify that the page is updating and looks correct by looking at the demo. 
  5. Hookup the "Download" button so that when the user clicks it, it downloads the minimal (diff) theme.
      - If you have a way to verify this automatically attempt it but I might have to verify this manually, im not sure if AI agents can save the file and verify it. Ask me to save the file, i will then attach the theme file to the chat context so you can verify it looks correct.
  6. Hookup the "Upload" button, it should use the kempo-ui Dialog to open a dialog that allows the user to upload a theme file, then when they click "Apply" it will will update the inputs on the page.
      - If you have a way to verify this automatically attempt it, but I might have to verify this manually.