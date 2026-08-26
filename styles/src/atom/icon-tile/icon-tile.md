## Icon tile

A static icon laid on a rounded surface, borrowing the look of an icon-only [button]([[TIKUI_BASEPATH]]atom/index.html#buttons) without any of its states. Use it to mark or illustrate a block, never to trigger an action: it renders a `<span>`, it is not focusable and has no hover or active state. When the icon must be actionable, use a button instead.

The icon is decorative, so it is exposed as `role="presentation"`. Give the surrounding block its own accessible text.

**Icon:**

Pass `icon` the same `{ name, variant }` object a [button]([[TIKUI_BASEPATH]]atom/index.html#buttons) takes, for example `{ name: 'hardware-chip', variant: 'outline' }`. The `variant` is optional and defaults to the filled icon.

**Colors:**

- Brand (default)
- Success `-success`
- Error `-error`
- Information `-information`
- Warning `-warning`
- Neutral `-neutral`

**Sizes:**

- Small `-small` (16px icon)
- Medium (default, 20px icon)
- Large `-large` (24px icon)
