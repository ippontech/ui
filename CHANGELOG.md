# Changelog

All notable changes to the Ippon UI packages are documented in this file, so consumers can see what happens between releases.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), with one entry per release listing the affected package versions.

## 2026-08-27 — @ippon-ui/styles 0.2.0 · @ippon-ui/react 0.2.0

### Fixed

- `combobox`: its Pug mixin ionized the floating panel as a panel of actions. It handed the dropdown an `alternative` option the dropdown never read, so `ippon-dropdown---buttons` applied and the panel kept the gap and the horizontal padding a list of options has to drop. `IpponSingleCombobox` and `IpponMultiCombobox` were already right; the Pattern Library markup matches them now, and the option rows fill the panel edge to edge.
- `combobox`: the `listbox` of the documented example reached assistive technology with no name. The _Label_ atom naming the field carried no `id` and the example passed no `labelledBy`, which _Option list_ documents as the way to name a list — a `for` association names the input and names nothing else. The example also pointed `aria-controls` at the floating panel rather than at the `listbox` it holds, where the React components had always pointed at the list.
- `checkbox`: the `-error` alternative changed the class alone in Pug, where `IpponCheckbox` and the `input-text` mixin both set `aria-invalid="true"`. The validation error was visible and announced to nobody.
- Icon buttons with no accessible name: the clear cross of the `combobox` counter, the one of the `input-search` example, the two clickable icons of the `badge` example, the icon-only `button` examples and the two `modal` close buttons. Each carries a name now.

### Added

- `combobox`: `clearLabel` option on `ippon-combobox--control`, naming the clear cross of the counter badge. It is the counterpart of `labels.clear` on `IpponMultiCombobox`; the library invents no user-facing wording, since it cannot know the language.
- `button`: `label` option on the `ippon-button` mixin and `label` prop on `IpponButton`, both setting `aria-label`. A button is named by its text, and an icon-only button has none.
- `label`: `id` option on the `ippon-label` mixin, so a `listbox` can be named by it through `aria-labelledby`. `IpponLabel` already took one.

### Changed

- **Breaking** — `IpponSingleCombobox`, `IpponMultiCombobox` and `IpponOptionList` read a `message` or a `footer` that renders nothing — `null`, `false`, an empty string — as absent now, where only `undefined` counted as absent before. `{condition && <p/>}` yields `false` and `{condition ? <p/> : null}` yields `null`, so the ordinary React way of saying "nothing here" was counting as content: a combobox holding no option opened an empty panel, and an _Option list_ drew an empty footer box under its rows. Nothing to do for a caller who omits the slot or fills it; a caller passing `message={null}` to keep the panel opening has to pass the content that panel should hold instead.
- `combobox`: `ippon-combobox--selection` is a `status` region in Pug, as it already was in React, so a count that appears after the first render is announced.

## 2026-08-26 — @ippon-ui/styles 0.1.3 · @ippon-ui/react 0.1.3

### Added

- `icon-tile` atom: a static icon on a rounded surface, borrowing the icon-only geometry of the `button` — `radius-m`, and the same padding and icon size per size alternative — with none of its states. It is what a block needing a visual anchor in the brand colour had to fake with a disabled button until now, which carried an affordance the anchor does not have. It is a separate atom from `icon-surface` rather than a shape alternative on it, because the two disagree on more than their radius: `icon-tile` defaults to brand where `icon-surface` defaults to neutral, and its `-information` maps to the `information-2` tokens like the `button` does rather than to `information`. It declares no border, no state and no focus, and renders the ion `<span>` itself instead of wrapping one, so the tile and the glyph are a single element carrying `role="presentation"` — the icon is decorative, and the accessible text belongs to the surrounding block. Colors: brand (default), `-success`, `-error`, `-information`, `-warning`, `-neutral`. Sizes: `-small` (16px icon), default (20px icon), `-large` (24px icon). The icon is passed the same way as on a `button`, as a `{ name, variant }` object, so the two spell an icon identically.
- `IpponIconTile` React component, with `icon`, `color` and `size` props. Its `icon` takes the `{ name, variant }` object `IpponButton` already takes, so an icon is passed the same way whichever component receives it.

## 2026-08-21 — @ippon-ui/styles 0.1.2 · @ippon-ui/react 0.1.2

### Added

- `combobox` organism: a text field that filters a list of options and lets the reader pick one or several of them. It owns the expanded state, the active option, the selection and the ARIA relations between the field and the list, so a consumer no longer rebuilds the keyboard handling and the ARIA wiring on top of `input-text` and `dropdown`. Keyboard: `ArrowDown` / `ArrowUp` move the active option and open a closed panel and wrap around, which is how the last option is reached without a key of its own, `Enter` selects, `Escape` closes and leaves focus in the field; disabled options are skipped and the active option is scrolled into view. `Home` and `End` are deliberately left alone: the field is a text field, and the combobox pattern gives those two keys to the text cursor rather than to the list. The panel closes on a pointer landing outside the component, and on focus moving to a named element outside it, so `Tab` closes it — unless it lands on something the panel itself holds, such as a footer button, which is what makes that button reachable without a pointer. A focus loss that names no destination closes the panel like any other, unless the element that lost focus also left the document — which is what a browser reports when a footer control removes itself once its work is done; the panel survives that, and a pointer or `Escape` dismisses it afterwards. While the panel is open, `Escape` cancels its own default action, so it dismisses the panel alone rather than also reaching whatever else on the page answers that key; a closed combobox claims nothing. It holds no data: it never fetches, never debounces, never caches and never filters, and renders the options it is handed — the one thing it knows about a search is whether it is still running.
- `IpponSingleCombobox` and `IpponMultiCombobox` React components, generic over the option type. Single and multiple select are two components rather than one discriminated by a boolean, because they do not behave the same: a single select closes on the pick and draws a bare check glyph, a multiple select stays open and carries one counter badge for the whole selection. Both take `query` / `onQueryChange` for the fully controlled query, `options` carrying `{ key, label, description?, disabled? }` alongside whatever else the caller keeps on them — a pick hands that object straight back, so nothing has to be looked up again — a `message` slot for what the list has to say beside its rows, a `footer` slot inside the scrolling area for what it has to offer, `placeholderRows` for the rows still on their way, and `variant`, `disabled` and `readOnly`. `onQueryChange` may hand back a promise: the list then carries `aria-busy` for as long as the newest one is pending, which is the whole of what these components know about asynchronism, and why they take no `busy` prop that could contradict the query. There is no search hook and no search contract to satisfy — the debouncing, the guard that keeps a late answer from overwriting a newer one and the wording belong to the caller and to whatever data layer it already has, and the `Asynchronous` story writes all three out. `IpponMultiCombobox` adds `onSelectionChange`, which reports the next selection for a pick, an unpick and the clear cross alike, and a required `labels` object: the library never invents user-facing wording, since it cannot know the language. The panel opens on focus and on a pointer landing anywhere on the field, so a field that already holds focus still reopens its list after a pick — unless it would hold nothing at all, in which case it stays closed and opens by itself once it has something, since an empty floating box says nothing a reader could use. Both derive `${id}-listbox` and `${id}-option-${key}` internally, so no ARIA relation is wired by hand. A closed field carrying a selection shows that selection whatever is left in the query, so the caller never has to clear the query after a pick.
- `option-list` molecule: stacks `option` rows into a `listbox`, and carries both a footer under them and the content shown when the list has no rows — loading, empty, failed. It scrolls past five rows, so a long list keeps the floating panel a readable size. The footer sits inside the scrolling area and outside the `listbox`, which is what lets a caller put a "load more" button, a "20 of 137" counter or the sentinel of an infinite scroll there. The message is rendered beside the rows and outside the scroll, never in their place: a search still in flight keeps the previous results on screen instead of making the panel flicker at every keystroke. Loading is neither a message nor a progress bar — nothing here knows how far along it is — but `placeholderRows`, a count of `-placeholder` rows drawn at the end of the list. Where they land tells the two kinds of loading apart: what **adds** puts them after the rows already there, where they read as the continuation they are, and what **replaces** shows none at all, since the results on screen are kept until the new ones land — except on the very first load, when there is nothing to keep. The two slots are kept apart on purpose — a control in the `role="status"` region would be announced again at every keystroke, and one that removes itself once its work is done would drop focus with it.
- `option` molecule: one row of a floating list — a check box, a label, an optional secondary text and an optional trailing slot — with `-selected`, `-active`, `-single`, `-disabled` and `-placeholder` alternatives. A `-placeholder` row is a row-shaped hole: shimmer blocks from the same quark _Text_ and _Title_ already use, no `role="option"`, no `id`, no `aria-selected`, and `aria-hidden` — it holds the height of a real row so the list keeps its size, and claims nothing that could be selected or announced. The active row also draws an outline in the system `Highlight` colour under `forced-colors`, where its background highlight would otherwise be thrown away and leave a keyboard reader unable to see what `Enter` would pick. Its check box is drawn, not a real checkbox: a `role="option"` row must hold no focusable control, because focus stays in the field that owns the list — the row cancels the pointer press that would move focus to it, and a disabled row answers no pointer at all, so neither rule is left for a caller to remember.
- `IpponOptionList` and `IpponOption` React components.
- `input-search` atom: a text field with room inside its box for a leading icon and a trailing slot, which `input-text` has not since it is the bare native input. It shares the container of `input-text` through a quark, and adds a read-only state to the alternatives and states `input-text` already documents.
- `IpponInputSearch` React component with `icon` and `suffix` props, forwarding every native input prop.
- `checkbox` atom: a native checkbox and its label, rendered as the box the design asks for, with an `-error` alternative and a focus ring drawn for keyboard focus only. Its box comes from the same quark as the `option` row, so both stay identical.
- `IpponCheckbox` React component.
- `dropdown` organism: `ippon-dropdown---options` ion next to `ippon-dropdown---buttons`, a panel of options that drops the gap and the horizontal padding so an `option-list` fills it edge to edge. Its documentation now states what the triple dash means here: an ion names what the panel ionizes inside it, where an alternative would carry a single dash. Its documentation now covers anchoring a panel to something that is not an invoker button, and the `manual` popover such a panel needs.
- `IpponDropdown` React component: `ion` and `popover` props, both defaulting to the current behaviour (`buttons` and `auto`). `CAP.ts` gains `toIonClass` beside `toAlternativeClass`, so the two CAP shapes are built by name rather than by hand-written template string.
- `ion` atom: `label` option on the Pug mixin and `label` prop on `IpponIon`, setting `aria-label`. A clickable icon carrying no text had no accessible name.
- `IpponLabel` React component: `id` prop, so a label can name a `listbox` through `aria-labelledby`, which a `for` attribute cannot do.

### Changed

- `input-text` reads its container — border, radius, background, hover, focus, disabled, `-error` and `-success` — from a quark now shared with `input-search`, instead of declaring it itself. The generated CSS is unchanged byte for byte and the markup is untouched: nothing to do for consumers.

## 2026-08-11 — @ippon-ui/styles 0.1.1 · @ippon-ui/react 0.1.1

### Added

- `grid` organism: `-stretch` alternative on `ippon-grid--slot` makes the content of a slot fill its cell. A slot already takes the full height of its row, but its child kept its natural height, so cards of a same row ended at different heights. With `-stretch` the child fills the slot, whatever that child is (`ippon-card`, `ippon-button-card`, …). Slots without the alternative keep their previous behaviour.
- `IpponGridSlot` React component: `stretch` prop for the `-stretch` alternative.

## 2026-07-29 — @ippon-ui/styles 0.1.0 · @ippon-ui/react 0.1.0

### Added

- `error-area` molecule: fills a zone whose content could not be loaded, with a title, a description and no frame of its own so it sits inside the card or grid cell that already draws one. An action (a retry button) and a detail are both optional; the detail hides a stack trace or an error payload behind a native `details` disclosure. Its padding grows once the surrounding `container` is wide enough.
- `IpponErrorArea` React component: `title` and `description` props, children rendered as the action slot, and an optional `detailMessage` accepting a `string` or an `Error` (rendering its `stack`, falling back to its `message`) together with the required `detailLabel` and an optional `language`.
- `icon-surface` atom: an icon laid on a rounded surface, with `-success`, `-error`, `-information` and `-warning` alternatives on a neutral default.
- `IpponIconSurface` React component with a `color` prop.
- `code` atom: a preformatted code block carrying the frame and the monospace typography, scrolling instead of stretching its container. Giving a language adds the `language-*` class [Prism](https://prismjs.com) styles and reads. Its documentation lists the stylesheet and scripts a page must load for Prism to colorize anything, and what the theme takes over on the typography.
- `IpponCode` React component with `language` and `className` props.
- `code` typography tokens (`--ippon-typography-code-font`, `-size`, `-line-height`, `-weight`).

### Changed

- `prism-ippon.css` uses the new `--ippon-typography-code-font` token instead of a hard-coded font stack. That token is currently `monospace` alone, so highlighted code now renders with the browser default monospace font rather than the previous `Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono'` stack.
- **Breaking** — `import-file` molecule renders its icon through the new `icon-surface` atom, which changes the markup it expects. Hand-written HTML must replace `ippon-import-file--icon` with `ippon-icon-surface` on the icon wrapper, and add `ippon-import-file---icon-surface` next to `ippon-import-file` on the root label. Without the first change the round surface behind the icon disappears; without the second it stops turning blue on hover and drag over. `IpponImportFile` consumers have nothing to do, unless they select `.ippon-import-file--icon` from their own CSS or tests.

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
