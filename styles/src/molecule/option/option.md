## Option

One row of a floating list of options: a check box, a label, an optional secondary text and an optional trailing slot. It is presentational and orchestrates nothing — the _Combobox_ organism decides which row is selected and which one is active.

The check box is drawn by the quark the _Checkbox_ atom uses, but it is **not** a checkbox: a `role="option"` row must not contain a focusable control, because DOM focus has to stay in the field that owns the list. The selection is carried by `aria-selected`, not by an input.

**Alternatives:**

- Selected `-selected` (filled box and check glyph)
- Active `-active` (full-bleed highlight for the row the keyboard points at)
- Single `-single` (a bare check glyph instead of a box, for a list where only one option can be picked)
- Disabled `-disabled` (dimmed row, `not-allowed` cursor, no highlight on hover)
- Placeholder `-placeholder` (a row still on its way: the box and the label are shimmer blocks, drawn by the same quark _Text_ and _Title_ use for their own placeholder). It carries no `role="option"`, no `id` and no `aria-selected`, and is `aria-hidden`: it is a row-shaped hole, not an option, and nothing about it can be selected or announced. Being the same height as a real row is the point — the list keeps its size and the rows that follow do not jump when the answer lands

**States:**

- Hover, which draws the same highlight as `-active`: the design has one highlight and it serves both pointer and keyboard
- Under `forced-colors`, that highlight is a background and the system throws backgrounds away, so `-active` also draws an outline in the system `Highlight` colour. Only `-active` does: it is where the keyboard stands, and a reader who cannot see it no longer knows what `Enter` would pick. Hover needs nothing — the pointer says where it is

**Parts:**

- `--check` the box or the glyph
- `--label` the option label, truncated with an ellipsis rather than wrapped
- `--description` an optional secondary text
- `--suffix` an optional trailing slot, for a _Badge_ or an _Icon_

**Accessibility:**

- `role="option"` with `aria-selected` on every row, and `aria-disabled` on a disabled one. A `-placeholder` row is the exception and claims none of them
- A row never takes DOM focus: the pointer press that would move it is cancelled, since focus belongs to the field that owns the list. A disabled row answers no pointer at all — the guard is the row's own, not something each caller has to remember
- The row needs an `id` so the field can point at it with `aria-activedescendant`
