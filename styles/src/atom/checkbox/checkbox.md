## Checkbox

A native checkbox and its label. The native input stays in the accessibility tree and keeps the keyboard behaviour the browser already gives it; only its rendering is replaced by the box the design asks for.

The box is drawn by a quark shared with the _Option_ molecule, so a checked option row and a checked checkbox are the same square by construction.

**Alternatives:**

- Default
- Error `-error` (error border on the box)

**States:**

- Unchecked / checked
- Focus (brand outline around the box, drawn only for keyboard focus)
- Disabled `disabled` (dimmed control and `not-allowed` cursor)

**Accessibility:**

- The whole component is a `label`, so the text names the control and clicking it toggles the box
- Describe it with a _Helper text_ atom linked through `aria-describedby`

> Do not reuse this atom inside a `listbox`: an option row must not contain a focusable control. The _Option_ molecule draws the same box without the input for that reason.
