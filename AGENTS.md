Code must be in English.

## Monorepo Structure

The project is a monorepo composed of the following projects:

- **styles**: Contains a Pattern Library with visual components, organized following Atomic Design.
- **icons**: Allows generating an icon font from SVG files from Ionicons

## Commands

You should use `mise` to run commands linked to this project. If you need to add more operations or a new command, please edit the `mise.toml` file, so the command will be available.

Run from the **monorepo root** unless noted otherwise.

| Task                         | Command             |
| ---------------------------- | ------------------- |
| Trust mise                   | `mise trust`        |
| Install mise                 | `mise install`      |
| Install dependencies         | `mise setup`        |
| Start all in dev mode        | `mise dev`          |
| Build all packages           | `mise build`        |
| Format (fix)                 | `mise format`       |
| Format (check only)          | `mise format-ci`    |
| Lint (fix)                   | `mise lint`         |
| Lint (check only)            | `mise lint-ci`      |
| Unit tests (not interactive) | `mise unit-test-ci` |

## Pattern Library (`styles`)

The Pattern Library uses [Tikui](https://tikui.org) and follows [Atomic Design](http://atomicdesign.bradfrost.com/table-of-contents/):

```
src/
  quark/     # SCSS variables, mixins, fonts reused inside atoms/molecules/organisms (no rendered output)
  token/     # Design tokens (colors, shadows, typography, sizes)
  atom/      # Smallest components: badge, button, icon, ion, meter, text, title, tab
  molecule/  # Composed atoms: import-file, tabs, toggle
  organism/  # Layout-level components: card, container, h-space, v-space, grid, header, modal, button-card
  template/  # Full page layouts
```

CSS class naming uses an alternative-prefix convention: base class + `-<modifier>` (e.g. `ippon-card -shadow-2 -border`).

To develop the Pattern Library: `mise styles-dev` (serves on port 4220).

To add a component: `mise styles-create-component <component> --path <path>` where:

- component: component name in `kebab-case` (e.g. `button-card`)
- path: default is 'atom' to create inside `src/atom` from the styles directory
