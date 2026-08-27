## Label

A label naming a form control.

**Accessibility:**

- Link it to its control through `for`/`id`: clicking the label focuses the control and assistive technologies announce it as the control name
- Give it an `id` when something other than its control has to be named by it too — a `listbox` pointing at it with `aria-labelledby`, for instance. `for` names the control and nothing else
