## Field

A vertical composition of a _Label_ atom, any form control (_Input text_ today, textarea or select tomorrow) and a _Helper text_ atom.

**Wiring (done by the caller):**

- Link the label to the control through `for`/`id`
- Link the helper text to the control through `aria-describedby`
- Pass the same variant (`error` or `success`) to the control and the helper text
- Give a variant control a placeholder: the tinted background only shows through `:placeholder-shown`

> The field itself carries no state: the control and the helper text do.
