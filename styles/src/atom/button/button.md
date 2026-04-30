## Button

**Colors:**

- Default
- Success `-success`
- Error `-error`
- Information `-information`
- Warning `-warning`
- Neutral `-neutral`

**Variants:**

- Primary
- Secondary `-secondary`
- Outline `-outline`
- Text `-text`

**States:**

- Loading `-loading` (adds `disabled` and `aria-busy="true"`)
  - When a right icon is present, replace it with a `sync` icon (the CSS animation is handled by `-loading`)

**Icons:**

If you use [icons]([[TIKUI_BASEPATH]]icons/index.html), don't forget to wrap each child in a **part**:

- `icon-button--icon` for the icon
- `icon-button--text` for the text

> It's because the space before and after the icon is different from a _text_ or an _icon_.
