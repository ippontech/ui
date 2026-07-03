---
name: 'pattern-library'
description: 'Pattern Libreary which allows representing graphical components. Provides CSS and uses HTML as a template language. This is where tokens, quarks, atoms, molecules, organisms, templates are defined.'
---

# Pattern Library

The Pattern Library allows representing graphical elements.

The Pattern Library concept is not especially linked to a technology. The idea is to represent the visual part of each component, the states but not the mechanical part.

In the project, the Pattern Library applies to the web.

It therefore provides:

- CSS that will be consumed by another application
- Documentation for each component with:
  - A description of the component
  - A rendering of the component
  - The source code of the component (HTML and pug)

So it's possible to consume the Pattern Library in any web application, regardless of the technology used (React, Vue, Angular, etc…).

It is organized following Atomic Design.

[Tikui](https://tikui.org/) is used to generate the documentation of the Pattern Library.

## Component

A component in Tikui is defined according to the following architecture:

```
<component>/
  <component>.mixin.pug
  <component>.code.pug
  <component>.render.pug
  _<component>.scss
```

The command to generate a component is as follows:

```shell
mise styles-create-component <component> --path <path>
```

- `<component>` is the name of the component, in `kebab-case`
- `<path>` is the path to the folder where the component will be created, default is `atom` to create inside `src/atom`
- The prefix is `ippon` using `mise`

To generate the `Button` atom with the `ippon` prefix:

```shell
mise styles-create-component button --path atom
```

- ippon is used as the prefix
- button is the name of the component
- src/atom is the path to the folder where the component (atom) will be created

## Atomic Design

Atomic Design is proposed by Brad Frost. The idea is to hierarchically compose graphical components into five levels:

- Atoms: indivisible elements such as a button, form field, or icon
- Molecules: groups of atoms to compose to form small components
- Organisms: groups of molecules to assemble to form more complex elements
- Templates: groups of organisms, molecules, or atoms to assemble to form pages
- Pages: instances of templates with real content (it is the applications consuming the Pattern Library that will create the pages)

In Tikui, these concepts are represented by folders:

```
src/
  atom/
    atom.pug
    _atom.scss
  molecule/
    molecules.pug
    _molecule.scss
  organism/
    organism.pug
    _organism.scss
  template/
    template.pug
    _template.scss
  index.pug
  tikui.scss
```

## CAP

A component follows CAP (Component Alternative Part):

- Component: the name of the component in `kebab-case`
- Alternative: an alternative of the component or a part that starts with a `-`, followed by the name of the alternative in `kebab-case`
- Part: a part of the component or an alternative that starts with `--`, followed by the name of the part in `kebab-case`

An example with a button:

In SCSS:

```scss
.ippon-button {
  // button styles

  &.-primary {
    // primary alternative styles
  }

  &.-secondary {
    // secondary alternative styles
  }

  &--icon {
    // icon part styles
  }

  &--text {
    // text part styles
  }
}
```

In HTML:

```html
<button class="ippon-button -primary">
  <span class="ippon-button--icon">Icon</span>
  <span class="ippon-button--text">Text</span>
</button>
```

## Ion

Beyond CAP, a component can expose an **ion**: a class that starts with `---`, followed by the name of the ion in `kebab-case` (e.g. `ippon-dropdown---buttons`).

An ion is set on a container and _ionizes_ the descendants that opt in. Unlike a part, the ionized behavior is **not declared by the container**: each affected component declares, in its own SCSS, how it reacts when it is ionized. This inverts the dependency, so a container never reaches into a descendant (no `> .ippon-child` selector).

An example with a `dropdown` organism that ionizes the `button` atom it contains:

The container carries the ion (in the `dropdown` mixin):

```html
<div class="ippon-dropdown ippon-dropdown---buttons" popover>
  <button class="ippon-button -text">Item</button>
</div>
```

The atom declares its ionized behavior (in `atom/button/_button.scss`, **not** in the organism):

```scss
.ippon-button {
  // button styles

  .ippon-dropdown---buttons & {
    justify-content: flex-start;
    width: 100%;
  }
}
```

Note: an ion is a naming convention, unrelated to the `atom/ion` component (which renders Ionicons icons).

## Tikui

To document with Tikui, simply include the component's Markdown file in the file where you want to document it.

You will use:

- `componentDoc` for atoms, molecules, and organisms
  - A size can be specified for the component rendering with the `height` option (example: `height=300`)
- `templateDoc` for templates
  - There is no size since the rendering area represents a button to go to the rendering

For a `Button` atom:

```pug
include:componentDoc(height=300) button/button.md
```

For a `Layout` template:

```pug
include:templateDoc layout/layout.md
```

## Token

A token is a style property. This can be a color, a font, a spacing, etc… It's a concept, so, even if it's possible to use variables to represent tokens, it's important to not confuse tokens and variables.

In the Patten Library, tokens are defined inside the `tokens` folder:

```
src/
  token/
    _token.scss
    token.pug
```

### Color

A color token can be directly the color with a quantity represented by a number from 0 to 999.

For the color `green`, it can be represented by the following tokens:

```
--ippon-color-green-100, --ippon-color-green-200, --ippon-color-green-300, --ippon-color-green-400, --ippon-color-green-500, --ippon-color-green-600, --ippon-color-green-700, --ippon-color-green-800, --ippon-color-green-900
```

But it stills a base color, the base color itself can't be used directly for a component, it must be used by a semantic color.

#### Semantic color

A semantic color is a color token that represents a meaning. For example, the `positive` semantic color use the `green` base color. The `semantic` color has also a quantity.

Here is an example for the `positive` semantic color:

```scss
:root {
  --ippon-color-positive-100: var(--ippon-color-green-100);
  --ippon-color-positive-200: var(--ippon-color-green-200);
  --ippon-color-positive-300: var(--ippon-color-green-300);
  --ippon-color-positive-400: var(--ippon-color-green-400);
  --ippon-color-positive-500: var(--ippon-color-green-500);
  --ippon-color-positive-600: var(--ippon-color-green-600);
  --ippon-color-positive-700: var(--ippon-color-green-700);
  --ippon-color-positive-800: var(--ippon-color-green-800);
  --ippon-color-positive-900: var(--ippon-color-green-900);
}
```

Another level of semantic color exists, more relative to the usage. There is the following semantic color groups:

- `surface`
- `text-icon`
- `border`

It's also possible to find alternatives like 'primary', 'secondary', 'tertiary', etc…

So it's possible to define a text or icon color `on` a surface color, for example `on-primary` or `on-secondary`.

Here is an example for the `success` semantic color:

```scss
:root {
  --ippon-color-success-surface-primary: var(--ippon-color-positive-700);
  --ippon-color-success-surface-primary-hover: var(--ippon-color-positive-800);
  --ippon-color-success-surface-primary-active: var(--ippon-color-positive-900);
  --ippon-color-success-surface-secondary: var(--ippon-color-positive-100);
  --ippon-color-success-surface-secondary-hover: var(--ippon-color-positive-200);
  --ippon-color-success-surface-secondary-active: var(--ippon-color-positive-300);
  --ippon-color-success-text-icon-primary: var(--ippon-color-positive-600);
  --ippon-color-success-text-icon-secondary: var(--ippon-color-positive-800);
  --ippon-color-success-text-icon-on-primary: var(--ippon-color-neutral-0);
  --ippon-color-success-text-icon-on-secondary: var(--ippon-color-positive-700);
  --ippon-color-success-border: var(--ippon-color-positive-500);
}
```

## Quark

A quark is a portion of an atom, molecule, or organism that is not usable without being part of a component. Generally, we use SCSS `@mixin` to represent quarks but it's not mandatory, it's a concept. For example, for a `Text` and a `Title` atom, we can imagine a set quark to represent weight alternatives:

```scss
@mixin weights {
  &.-light {
    font-weight: 300;
  }

  &.-regular {
    font-weight: 400;
  }

  &.-medium {
    font-weight: 500;
  }

  &.-bold {
    font-weight: 700;
  }
}
```

So it's possible to use this `weights` quark for both `Text` and `Title` atoms:

**Text:**

```scss
.ippon-text {
  @include weights;
}
```

**Title:**

```scss
.ippon-title {
  @include weights;
}
```

In the Pattern Library, quarks are defined in the `quark` folder:

```
src/
  quark/
    _quark.scss
```
