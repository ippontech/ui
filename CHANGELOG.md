# Changelog

All notable changes to the Ippon UI packages are documented in this file, so consumers can see what happens between releases.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), with one entry per release listing the affected package versions.

## 2026-07-24 — @ippon-ui/styles 0.0.11

### Added

- `prism-ippon.css` stylesheet: a light [Prism](https://prismjs.com) theme on white background built on the Ippon UI color tokens, importable with `@ippon-ui/styles/prism-ippon.css`.

### Changed

- The Pattern Library documentation code snippets use the new `prism-ippon.css` light theme instead of the dark `okaidia` theme.

## 2026-07-08 — @ippon-ui/styles 0.0.10 · @ippon-ui/react 0.0.9

### Added

- `table` molecule: `-minimal` alternative on `ippon-table--header` and `ippon-table--cell` shrinks the column to its content width (`{ minimal: true }` on the mixins).
- `table` molecule: a body row can start with a row header (`ippon-table--header` as first cell); row headers are bold and follow the same border rules as cells.
- `title-display` atom: color alternatives, the same classes as `text` (e.g. `-color-brand-primary`, `-color-neutral-tertiary`), with a `color` option on the mixin.
- `IpponTitleDisplay` React component: display title with `tag` (`h1`/`h2`/`h3` drive the size), `size` and `color` props.

### Changed

- `title` and `title-display` atoms are never underlined, so they can be used as links (`<a>` tag) without extra styling.
- The Pattern Library documentation site is fully restyled with the Ippon UI design system (Ippon UI branding, components and tokens) and its home page documents the npm installation (`npm install -D @ippon-ui/styles`) alongside the stylesheet-link usage.

## 2026-07-08 — @ippon-ui/styles 0.0.9 · @ippon-ui/react 0.0.8

### Added

- `input-text` atom: native 48px text field carrying the visual container (border, 4px radius, background), full-width by default, with hover, focus (brand outline, hidden placeholder) and `disabled` (dimmed) states. The `-error` (setting `aria-invalid="true"`) and `-success` alternatives carry a status border and a status-colored text and placeholder, and show a tinted status background while the placeholder is visible (empty, unfocused field).
- `label` atom: names a form control, linked to it through `for`/`id`.
- `helper-text` atom: contextual help or feedback message linked to its control through `aria-describedby`, with `-error` and `-success` alternatives.
- `field` molecule: vertical composition of a label, any form control and a helper text; the caller wires `for`/`id`, `aria-describedby` and the variant.
- `IpponInputText` React component forwarding native `input` props, deriving `aria-invalid` from the `error` variant.
- `IpponLabel`, `IpponHelperText` and `IpponField` React components.

## 2026-07-07 — @ippon-ui/styles 0.0.8 · @ippon-ui/react 0.0.7

### Added

- `button` atom and `button-card` organism can be used as links: an `<a href>` carrying the same classes renders without underline, and the Pattern Library documentation shows link examples.
- `IpponLinkButton` and `IpponLinkButtonCard` React components: link (`<a href>`) counterparts of `IpponButton` and `IpponButtonCard`, sharing their look but exposing only link-relevant props (no `disabled`, loading or popover behavior).

## 2026-07-03 — @ippon-ui/styles 0.0.7 · @ippon-ui/react 0.0.6

### Added

- `dropdown` organism: floating action panel built on the native popover API, opened through a button using `command`/`commandfor`, anchored to its trigger and flipping to stay within the viewport.
- `separator` atom: thin dividing line, used to group dropdown items.
- `IpponDropdown` React component, behavior-free, forwarding `onKeyDown` and `onToggle`; the `KeyboardNavigation` Storybook story shows how to wire a select-like keyboard flow.
- `IpponSeparator` React component.
- `popoverTarget` and `popoverTargetAction` props on `IpponButton` to trigger popovers without JavaScript.
- Ion convention (`component---ion`): a class set on a container that ionizes descendants, each component declaring its own ionized behavior (see the Pattern Library documentation).

### Changed

- Buttons apply their hover style on `:focus-visible`, making keyboard focus as visible as mouse hover.

Changes released before this file was introduced are not listed here.
