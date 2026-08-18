## Input search

A text field that carries the visual container of _Input text_ and, unlike it, has room inside the box: a leading icon and a trailing slot on either side of the native input.

The container is shared with _Input text_ through a quark, so both fields have the same border, radius, background and status mechanics and cannot drift apart.

**Alternatives:**

- Default
- Error `-error` (adds `aria-invalid="true"`, error border; tinted background while the placeholder shows)
- Success `-success` (success border; same background mechanics as error)

**States:**

- Hover (highlighted background)
- Focus (brand outline drawn outside the border, hidden placeholder; the leading icon turns primary)
- Filled (the leading icon turns primary and stays there)
- Read only `readonly` (secondary background, no hover, text still selectable)
- Disabled `disabled` (dimmed field and `not-allowed` cursor)

**Parts:**

- `--icon` the leading icon, a magnifier by default
- `--input` the native input, stripped of its own box
- `--suffix` the trailing slot, where a _Badge_ or a chevron belongs

**Accessibility:**

- Name the field with a _Label_ atom linked through `for`/`id`
- Describe it with a _Helper text_ atom linked through `aria-describedby`
- The leading icon is decorative and carries no name of its own
