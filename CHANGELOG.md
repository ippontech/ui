# Changelog

All notable changes to the Ippon UI packages are documented in this file, so consumers can see what happens between releases.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), with one entry per release listing the affected package versions.

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
