# MediaOdyssey2026 AI Coding Guidelines

## Project Overview
This is a **static website for a university media workshop** ("평화와 미래" / Peace and Future) documenting a 2026 event at Chung-Ang University's School of Media Communication. The site showcases work by four team divisions: Performance/Video, Photography, Design, and Web.

**Key characteristics:**
- Pure HTML/CSS/JavaScript (no build process)
- Based on [HTML5 UP "Dopetrope" template](https://html5up.net/)
- Multi-language support (Korean primary, English secondary)
- Responsive design with SASS compilation pipeline
- Custom drawing canvas feature for interactive content

## Architecture & File Organization

### Core Structure
- **Root HTML files**: Team-specific pages (`mediaTeam.html`, `designTeam.html`, etc.) + informational pages (`introduce.html`, `road.html`)
- **`assets/css/main.css`**: Compiled CSS (~3000 lines); generated from SASS, do NOT edit directly
- **`assets/sass/main.scss`**: Source stylesheet with Korean custom fonts (KerisBaeum, LeeSunShinDotum, EF_jejudoldam) and responsive breakpoints
- **`assets/js/`**: jQuery + utility libraries (minimal custom code; `main.js` handles jQuery initialization and animations)
- **`draw_memo.js`**: Standalone p5.js sketch (likely old prototype); **not currently used in HTML pages**

### Critical Patterns
1. **Font Loading**: Korean fonts loaded from CDN (jsdelivr.net/projectnoonnu) with `font-display: swap` for performance
2. **Responsive Breakpoints**: Defined in SASS using `@include breakpoints()` mixin—standard sizes: xlarge (1281-1680px), large (981-1280px), medium (737-980px), small (null-736px)
3. **Navigation**: Sticky header with dropdown menus via `jquery.dropotron.min.js`
4. **Preload Animation**: All pages include `is-preload` body class removed by jQuery on load

## Drawing Canvas Feature

### Current Implementation
**File**: [websiteTeam_draw.html](websiteTeam_draw.html) (~322 lines)

**Technologies**: Vanilla Canvas API (not p5.js), no external libraries
- Canvas element: `1200px × 800px` (3:2 aspect ratio) with responsive scaling
- Drawing controls: Brush color picker, size slider, shape tools (line, circle, rectangle)
- Drawing modes: Standard, Highlighter, Crayon, Pen
- Preset color palette: `#ff2828` (red), `#1c97ff` (blue), `#eaeaea` (light gray), `#2e2929` (dark gray)
- Undo/Reset: `resetCanvas()` clears canvas; paths stored in `ImageData` array for undo support

**Canvas Scaling**: Uses `canvas.getBoundingClientRect()` and scale factors (`scaleX`, `scaleY`) to map CSS-sized canvas to internal resolution—critical for accurate mouse coordinates on high-DPI/zoomed displays.

**Media**: Background images support via `<img>` sibling with `pointer-events: none` overlay pattern

## Development Workflow

### No Build System
- Serve files directly (live server or HTTP)
- SASS → CSS compilation happens **outside this repo** (likely manual or Git CI); source `.scss` files exist but `main.css` is checked in
- Changes to SASS require manual compilation before committing

### Testing Strategy
- **`test.html`**: Blank test page for ad-hoc experiments
- Use browser DevTools for CSS/JS debugging
- Canvas coordinate testing important due to DPI scaling

### Key Dependencies
- **jQuery 1.11.3**: Loaded in every page (`assets/js/jquery.min.js`)
- **FontAwesome**: Icon library via minified CSS
- **External URLs**: Google Fonts, jsDelivr CDN for Korean fonts (no offline fallback)

## Code Conventions

### HTML
- Use `lang="ko"` on `<html>` tag
- Include standard viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />`
- Apply `is-preload` class to `<body>` for fade-in animations
- Team pages use `no-sidebar` class variant

### CSS/SASS
- **Do NOT edit compiled `main.css`**—modify `main.scss` and recompile
- Use SCSS variables from `assets/sass/libs/_vars.scss` for colors, sizes
- Apply `@include breakpoints()` mixin for responsive rules (see `main.scss` line 19)
- Korean font names: `'KerisBaeum'` (headings), `'LeeSunShinDotum'` (body), `'EF_jejudoldam'` (special)

### JavaScript
- Favor jQuery for DOM manipulation (existing codebase)
- Avoid jQuery for canvas operations (use vanilla Canvas API)
- Initialize jQuery plugins on page load (see `$window.on('load')` pattern in `assets/js/main.js`)
- Use global objects for drawing state (e.g., `brushColor`, `brushSize`, `shapes[]` array in draw_memo.js)

## Common Tasks

### Adding a New Team Page
1. Copy existing team HTML (e.g., `designTeam.html`)
2. Update `<title>` and hero content
3. Add nav link to all pages: search for `<li class="current">` and add new menu item to `<ul>` in header
4. **No SASS/CSS changes needed** unless adding new component types

### Extending Canvas Features
- Keep canvas code inline in HTML `<script>` tag (as in `websiteTeam_draw.html`)
- For new brush types: add `if` branch in `BrushType()` function and corresponding UI buttons
- Test scaling: resize browser window and verify drawing coordinates remain accurate

### Updating Fonts or Colors
- Change font: Update `@font-face` in `main.scss` lines 11-44, recompile
- Change color: Edit CSS color values in `main.scss` or add new SCSS variable in `libs/_vars.scss`
- **Never hardcode hex colors in HTML `<style>` tags** if they're brand-consistent

## Edge Cases & Gotchas
1. **Canvas Hi-DPI**: Always use `getBoundingClientRect()` + scale factors; don't assume `canvas.width` matches displayed size
2. **Korean Font Loading**: Slow CDN fallback—add visual feedback if fonts aren't loaded (use `font-display: swap`)
3. **jQuery Version**: Old jQuery 1.11.3; avoid modern syntax in plugins
4. **SASS Compilation**: If `main.css` is outdated, SCSS changes won't appear; check compilation logs
5. **Dropdown Menu Lag**: `jquery.dropotron` may flicker on slow devices; test mobile before committing

## Reference Files
- [index.html](index.html) — Navigation hub and homepage
- [assets/sass/main.scss](assets/sass/main.scss) — Styling source (edit this, not CSS)
- [assets/js/main.js](assets/js/main.js) — jQuery initialization patterns
- [websiteTeam_draw.html](websiteTeam_draw.html) — Interactive canvas example
