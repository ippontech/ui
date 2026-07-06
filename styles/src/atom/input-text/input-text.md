## Input text

A native text field carrying the visual container: border, radius and background.

**Alternatives:**

- Default
- Error `-error` (adds `aria-invalid="true"`, error border; tinted background while the placeholder shows)
- Success `-success` (success border; same background mechanics as error)

**States:**

- Hover (highlighted background)
- Focus (brand outline, hidden placeholder; an error or success field keeps its status border)
- Placeholder shown (an empty, unfocused error or success field gets the tinted background; focused, filled or placeholder-less it keeps the resting one)
- Disabled `disabled` (dimmed field and `not-allowed` cursor)

**Accessibility:**

- Name the field with a _Label_ atom linked through `for`/`id`
- Describe it with a _Helper text_ atom linked through `aria-describedby`

> The placeholder is a hint, not a label: it disappears on input.
