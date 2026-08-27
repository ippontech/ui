## Ion (Icons)

Ion are based on _Ionicons_, the set is [available here]([[TIKUI_BASEPATH]]icons/index.html).

There is two kinds of icons:

- Classic ones: start with `ippon-ion-` followed by suffix (Variant):
  - Nothing: the default one (**Filled**).
  - `-outline` for the **outline** version.
  - `-sharp` for the **sharp** version.
- Logo ones: start with `ippon-ion-logo-` followed by the name of the logo.

**Accessibility:**

- An icon at rest is decorative: it is a `span` carrying `role="presentation"`, and the text around it carries the meaning
- A `clickable` icon is a `button`, and a button with no text needs a name of its own: pass `label`, which renders `aria-label`. There is no sensible default, so an icon button given no label reaches assistive technology unnamed
