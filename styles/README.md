# @ippon-ui/styles

The Ippon UI Pattern Library: design tokens and components as SCSS/CSS, built with [Tikui](https://tikui.org) following [Atomic Design](https://atomicdesign.bradfrost.com).

## Installation

The package is bundled into your application, so install it as a dev dependency:

```sh
npm install -D @ippon-ui/styles
```

## Usage

Import the fonts, icons and the compiled stylesheet once in your application entry point:

```ts
import '@ippon-ui/styles/fonts/open-sans/400.css';
import '@ippon-ui/styles/fonts/open-sans/600.css';
import '@ippon-ui/styles/fonts/open-sans/700.css';
import '@ippon-ui/styles/fonts/saira-extra-condensed/700.css';
import '@ippon-ui/styles/icons/ionicons.css';
import '@ippon-ui/styles/tikui.css';
```

Then use the CSS classes in your markup. Classes follow an alternative-prefix convention: a base class plus `-<modifier>` modifiers.

```html
<button class="ippon-button -information">Save</button>
<span class="ippon-badge -success">Done</span>
```

## License

[Apache-2.0](./LICENCE) © Ippon Technologies
