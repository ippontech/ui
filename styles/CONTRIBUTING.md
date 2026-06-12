# Contributing to `@ippon-ui/styles`

The Pattern Library represents the **visual** part of each component as SCSS/CSS:
the rendering and the states, not the mechanical behaviour. It is built with
[Tikui](https://tikui.org) and documents every component so any web application
can consume it, regardless of its technology.

Read the repository's root `CONTRIBUTING.md` first for the shared workflow
(issues, branches, commits, pull requests).

## Atomic Design

Components are organised following
[Atomic Design](https://atomicdesign.bradfrost.com), hierarchically composed:

- `atom/` — indivisible elements (button, badge, icon, text, title…).
- `molecule/` — groups of atoms (tabs, toggle, import-file…).
- `organism/` — groups of molecules (card, container, grid, header, modal…).
- `template/` — page layouts assembled from organisms, molecules and atoms.

`quark/` and `token/` hold the shared building blocks described below.

## CAP — Component Alternative Part

CSS classes follow the CAP convention:

- **Component**: the component name in `kebab-case` (`.ippon-button`).
- **Alternative**: an alternative or state, prefixed with `-` (`&.-primary`).
- **Part**: a part of the component, prefixed with `--` (`&--icon`).

```scss
.ippon-button {
  &.-primary {
    /* primary alternative */
  }

  &--icon {
    /* icon part */
  }
}
```

```html
<button class="ippon-button -primary">
  <span class="ippon-button--icon">Icon</span>
  <span class="ippon-button--text">Text</span>
</button>
```

## Tokens

A token is a style property (a colour, a font, a spacing…). It is a concept:
even when implemented with a CSS variable, do not confuse a token with a
variable. Tokens live in `token/`.

- **Base colours** carry a quantity from `100` to `900`
  (`--ippon-color-green-500`). A base colour is never used directly by a
  component.
- **Semantic colours** give a base colour a meaning (`positive` uses `green`)
  and are grouped by usage: `surface`, `text-icon`, `border`, with alternatives
  such as `primary`/`secondary` and `on-*` variants for content placed on a
  surface (`--ippon-color-success-text-icon-on-primary`).

Components must use semantic colours, never base colours directly.

## Quarks

A quark is a portion of a component that cannot be used on its own (typically a
SCSS `@mixin`). Use a quark to share styling across components — for example a
`weights` mixin reused by both `Text` and `Title`. Quarks live in `quark/` and
produce no rendered output by themselves.

## Creating a component

Generate the scaffold with the Tikui CLI (from the monorepo root):

```sh
mise styles-create-component <component> --path <path>
```

- `<component>` — name in `kebab-case` (e.g. `button-card`).
- `--path` — folder under `src/`, defaults to `atom`.
- The `ippon` prefix is applied automatically.

Each component is made of four files:

```
<component>/
  <component>.mixin.pug
  <component>.code.pug
  <component>.render.pug
  _<component>.scss
```

Document it by including its Markdown file where it should appear:

- `include:componentDoc(height=300) button/button.md` for atoms, molecules and
  organisms (the optional `height` sizes the rendering).
- `include:templateDoc layout/layout.md` for templates.

## Checks

From the monorepo root:

```sh
mise styles-lint           # Stylelint (auto-fix)
mise styles-test-unit-ci   # Vitest + sass-true
```

## License

Contributions are licensed under [Apache-2.0](./LICENCE).
