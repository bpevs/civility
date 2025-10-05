# Civility 🎩

### Unopinionated Styles and Utilities for Semantic Webapps

Civility is a set of CSS and JS tools meant for building webapps in a very structured way. We provide:

### A Classless Baselayer

If you build a website with semantic html, good accessibility, and aria attribute usage, a clean an unoffensive UI will be free via classless CSS.

By assuming that you are using good html structure and accessibility, our baselayer can provide more specific styles than standard classless CSS frameworks.

### Themes and Utility CSS

We provide a system for defining themes and colors. The majority of styles can be handled via updating these CSS variables. These classes are used to style the baselayer, but are also used to provide `utility.css`, which is a set of css utilities based on [tachyons-css](https://github.com/tachyons-css/tachyons).

### Custom Elements

For some concepts that don't exist in HTML, we provide custom elements under the `ui-` namespace, such as `ui-tag`, `ui-card`, and `ui-grid`.

# Getting Started

Include the framework and theme in your HTML:

```html
<link rel="stylesheet" href="dist/civility.css">
<link rel="stylesheet" href="dist/themes/default.css">
```

# Architecture Overview

Civiity follows a layered approach where each layer builds upon the previous one:

1. **normalize.css** - Browser consistency
2. **themes/[theme-name].css** - Design tokens and variables
3. **base.css** - Classless semantic styling
4. **components.css** - Custom components with `ui-` prefix
5. **app.css** - Your application-specific styles

## Layer 1: normalize.css

Uses [modern-normalize](https://github.com/sindresorhus/modern-normalize) to smooth over browser quirks and provide consistent defaults.

## Layer 2: themes/[theme-name].css

Defines all design tokens used throughout the framework:

- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale using CSS custom properties
- **Border radius**: From small (4px) to full rounded
- **Shadows**: Elevation system for depth
- **Transitions**: Consistent animation timing
- **Layout**: Breakpoints and container sizes
- **Z-index**: Layering system for overlays

### Available Theme Variables

```css
/* Typography */
--font-family-base, --font-family-mono
--f7 through --f1
--fw-normal, --fw-medium, --fw-semibold, --fw-bold
--lh-tight, --lh-base, --lh-relaxed

/* Spacing */
--s1 through --s7

/* Border radius */
--br-none, --br-sm, --br-base, --br-lg, --br-xl, --br-full

/* Shadows */
--shadow-sm through --shadow-xl

/* Transitions */
--transition-fast, --transition-base, --transition-slow
```

## Layer 3: base.css

A **classless** CSS layer that provides complete styling using only semantic HTML. The goal is that normalize.css + themes + base.css = a fully functional (if boring) application.

### Structural Opinions

Civiity assumes proper semantic HTML structure:

```html
<html>
  <body>
    <header>
      <nav><!-- Navigation with ul > li structure --></nav>
    </header>
    <main><!-- Main content --></main>
    <footer><!-- Footer content --></footer>
  </body>
</html>
```

### Key Features

- **Landmark styling**: Automatic layout for header, main, footer
- **Navigation**: Dropdown support for nested ul elements
- **Typography**: Complete heading and text styling
- **Forms**: Styled inputs, buttons, fieldsets with focus states
- **Tables**: Clean table styling with proper headers
- **ARIA support**: Automatic styling for `role="tab"`, `role="tabpanel"`, etc.
- **Accessibility**: Focus-visible support, reduced motion preferences
- **Responsive**: Mobile-first responsive design

### ARIA-Aware Styling

Civiity automatically styles ARIA patterns:

```html
<!-- Tab interface -->
<div role="tablist">
  <button role="tab" aria-selected="true">Tab 1</button>
  <button role="tab" aria-selected="false">Tab 2</button>
</div>
<div role="tabpanel">Content 1</div>
<div role="tabpanel" hidden>Content 2</div>
```

## Layer 4: components.css

Custom components using HTML custom elements with `ui-` prefix. These components are theme-aware but base.css has no knowledge of them.

### Available Components

```html
<!-- Cards -->
<ui-card clickable>Card content</ui-card>

<!-- Badges -->
<ui-badge variant="success">Success</ui-badge>
<ui-badge variant="warning">Warning</ui-badge>
<ui-badge variant="error">Error</ui-badge>
<ui-badge variant="info">Info</ui-badge>

<!-- Layout -->
<ui-grid cols="3">Grid items</ui-grid>
<ui-stack direction="row" spacing="lg">Stacked items</ui-stack>

<!-- Progress -->
<ui-progress style="--progress-value: 75%"></ui-progress>

<!-- Alerts -->
<ui-alert variant="success">Success message</ui-alert>

<!-- Loading -->
<ui-spinner size="lg"></ui-spinner>

<!-- Button groups -->
<ui-button-group attached>
  <button>Button 1</button>
  <button>Button 2</button>
</ui-button-group>
```

### Component Features

- **Semantic**: Uses custom elements, not classes
- **Accessible**: Built with ARIA patterns in mind
- **Themeable**: Respects theme variables
- **Responsive**: Adapts to different screen sizes
- **Lightweight**: No JavaScript required (except for interactive components)

## Layer 5: app.css

Application-specific styles. Civiity handles common patterns, so app.css should only contain:

- Brand-specific styling (colors, custom layouts)
- Domain-specific components (e.g., flashcard styles for a learning app)
- Layout overrides for specific use cases
- Integration styles between framework and app logic

### Best Practices for app.css

1. **Use theme variables** instead of hardcoded values
2. **Prefer semantic HTML + framework** over custom classes
3. **Only add custom styles** for truly app-specific needs
4. **Keep it minimal** - let the framework do the heavy lifting

# Color System

Civility follows a strict **neutral-first** approach:

1. **Everything neutral by default**: Uses `currentColor`, `--body`, `--background`
2. **Links are colored**: Only `<a>` elements use `--primary` by default
3. **Variants add color**: `ui-badge variant="success"` gets green styling
4. **No hardcoded colors**: All colors use theme variables

### 1. Theme Layers (`styles/themes/default.css`)

1. **Theme declares palette**: Base, primary, secondary colors
2. **Mathematical color variations**: Automatically generate lighter/darker variants
3. **Opt-in color classes**: Add `primary`, `secondary`, `primary-inverse` classes as needed
4. **Maintains neutral default**: Color is always opt-in, never forced

Added complete HSL-based color definitions:

**Base Colors:**

- Black, Gray, White (neutrals)
- Blue, Green, Yellow, Orange, Red, Purple (brand colors)

**Semantic Colors:**

- `--error` (red-based)
- `--warning` (orange-based)
- `--info` (blue-based)
- `--success` (green-based)

**Application Colors:**

- `--background` / `--background-dull`
- `--body` / `--body-dull`
- `--primary` / `--primary-dull`
- `--secondary` / `--secondary-dull`

### 2. Color Variables (`styles/base/colors.css`)

The existing `colors.css` file defines the final color variables using HSL composition:

```css
--primary: hsl(var(--primaryH), var(--primaryS), var(--primaryL));
--primary-dull: hsl(var(--primaryH), var(--primaryS), var(--primaryL), 0.3);
```

This enables mathematical color variations and maintains consistency.

## Usage Examples

```html
<!-- Neutral by default -->
<ui-card>Content uses currentColor</ui-card>

<!-- Color when requested -->
<ui-badge variant="success">Green badge</ui-badge>
<ui-alert variant="error">Red alert</ui-alert>

<!-- Links are the only colored element -->
<a href="#link">Uses --primary color</a>
```
