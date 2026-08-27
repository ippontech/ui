## Combobox

A text field that filters a list of options and lets the reader pick one or several of them. It is the only component here that orchestrates: it owns whether the panel is expanded, which option is active, what is selected, and the ARIA relations that tie the field to the list. That is what makes it an organism rather than another composition like _Field_.

It composes _Input search_ for the field, _Option_ and _Option list_ for the panel, _Dropdown_ for the floating surface, _Badge_ for the selection counter, and sits inside a _Field_ that carries the label and the helper text.

**Anchoring**, which is the one thing the _Dropdown_ organism could not already do:

A dropdown of actions is opened by an invoker button, and the invoker anchors the panel implicitly. A combobox is anchored to a text field, which is not an invoker and has to open the panel programmatically. So the panel is `popover="manual"` — with `auto` the click landing in the field would light-dismiss the panel that click just opened — and the anchoring is explicit: `anchor-name` on the field, `position-anchor` on the panel, `anchor-scope` on the wrapper so two combobox on the same page do not both anchor to the first field. The panel takes the width of the field through `anchor-size(width)`.

**Alternatives** carried by the field, and identical to _Input text_ there:

- Error `-error`
- Success `-success`

**States:**

- Closed at rest: placeholder and magnifier in the inversed tertiary colour, helper text below
- Open: the panel under the field, the magnifier turned primary
- With a selection: the counter badge and its clear cross, and the selected labels joined by commas in the field once it is closed. Labels too long for the field are truncated with an ellipsis rather than wrapped. A closed field carrying a selection shows that selection whatever is left in the query, so the caller never has to remember to clear the query after a pick; an unfinished query is hidden, never lost, and comes back when the field opens again
- Read only `readonly`: the field keeps its value and stops being typed into; the panel does not open
- Disabled `disabled`: dimmed field, `not-allowed` cursor, no panel
- Loading, empty and failed: carried by _Option list_, not by the field. Loading is drawn as placeholder rows, never as a progress bar
- A panel that would hold nothing at all — no option, no placeholder row, nothing to say, nothing to offer — is not opened, and `aria-expanded` stays `false`. An empty floating box says nothing a reader could use, and the field already says that it takes a search. It opens by itself as soon as it has something, so a reader who focused an empty combobox sees the answer land without touching anything

**Single and multiple:**

Multiple is the case the design draws: a check box on every row and one counter badge for the whole selection, never one removable chip per value. Single select reuses the same rows through the `-single` alternative of _Option_ — a bare check glyph instead of a box — shows no counter, and closes the panel as soon as an option is picked.

**Parts:**

- `--control` the field, which carries the anchor name
- `--selection` the selection stated in words for assistive technology, so the count is not carried by the badge alone. It is a `status` region, mounted even while empty, so a later count is announced
- `--chevron` the trailing caret
- `--list` the floating panel

The panel also takes a footer through _Option list_, for a "load more" button or the sentinel of an infinite scroll: the component paginates nothing itself, it only gives the caller the place to do it.

**Accessibility:**

- `role="combobox"` on the input, with `aria-expanded`, `aria-controls` pointing at the `listbox` itself — not at the floating panel holding it — and `aria-autocomplete="list"`
- The `listbox` is named through `aria-labelledby`, pointing at the same _Label_ atom that names the field: `for` names the input and names nothing else, so the list would otherwise be announced without a name
- The clear cross of the counter is a button: name it through `clearLabel`, which the component hands to the _Badge_ icon
- DOM focus never leaves the input: the active option is tracked with `aria-activedescendant`, which is why no option row may hold a focusable control
- Keyboard: `ArrowDown` / `ArrowUp` move the active option and open a closed panel, wrapping around — which is how the last option is reached without a key of its own, `Enter` selects the active option, `Escape` closes and leaves focus in the input — and keeps closing it even when nothing inside the panel holds focus any more, so an orphaned focus never leaves a panel that only a pointer could dismiss
- `Home` and `End` are left alone, even while the panel is open: the field is a text field, and the combobox pattern gives those two keys to the text cursor. Taking them for the list would cost the reader the only way to reach the start and the end of a long search
- While the panel is open, `Escape` is the panel's and cancels its default action, so it dismisses one layer at a time rather than reaching whatever else on the page answers that key. A closed combobox claims nothing. Disabled options are skipped and the active option is scrolled into view
- The panel closes on a pointer landing outside the component, and on focus moving to a named element outside it — so `Tab` closes it without selecting. `Tab` onto something the panel itself holds — a clear cross, a footer button — keeps it open instead, which is the only way such a control is reachable without a pointer
- A focus loss that names no destination never closes the panel. That is what a browser reports when the focused element is simply taken out of the document, which is exactly what a footer button that hides itself once the last page is loaded does: the panel has to survive it, and the pointer is what dismisses it afterwards
- Pointer: the panel opens on a pointer landing anywhere on the field, chevron included, and not only when the field takes focus — otherwise a field that already holds focus, which is what a pick in a single-select list leaves behind, could never reopen its list. Hovering a row makes it active, clicking it selects it without taking focus from the input
- The counter badge is described in words through `aria-describedby`, next to the helper text

> The component holds no data. It never fetches, never debounces, never caches and never filters: it renders the options it is handed, and the caller owns the query. The one thing it knows about a search is whether it is still running — the query handler may hand back a promise, and the list carries `aria-busy` for as long as the newest one is pending.
