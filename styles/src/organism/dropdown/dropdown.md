## Dropdown

Floating panel anchored to a trigger, built on the native popover API.

**Ions:** a triple dash is an ion, not an alternative — it names what the panel ionizes inside it rather than a variant of the panel itself, the same shape as `ippon-import-file---icon-surface`. An alternative carries a single dash.

- Buttons `ippon-dropdown---buttons` (the default): a panel of actions. Pair it with a button using `command="toggle-popover"` and `commandfor` pointing to the panel `id`; the trigger becomes the implicit anchor. Buttons placed inside are ionized full-width, and an `ippon-separator` can group them.
- Options `ippon-dropdown---options`: a panel of options. It drops the gap and the horizontal padding so an _Option list_ fills it edge to edge, which is what a full-bleed row highlight needs.

**Anchoring:**

An invoker button anchors the panel implicitly. A panel opened by something that is not an invoker — a text field, for instance — has to be anchored explicitly with `anchor-name` and `position-anchor`, and opened with `showPopover()` / `hidePopover()`. The _Combobox_ organism does exactly that.

**Popover kind:**

`popover` defaults to `auto`, which light-dismisses on a click outside the panel. A panel whose trigger sits outside it, such as the field of a combobox, needs `popover="manual"` instead: with `auto` the very click that should open it would close it again. A manual panel owes the reader its own dismissal — at least `Escape` and a click outside.
