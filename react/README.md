# @ippon-ui/react

The Ippon UI React component library, wrapping the [`@ippon-ui/styles`](https://www.npmjs.com/package/@ippon-ui/styles) Pattern Library.

## Installation

The components render the Pattern Library markup, so they require `@ippon-ui/styles` alongside React 19. Both UI packages are bundled into your application, so install them as dev dependencies:

```sh
npm install -D @ippon-ui/react @ippon-ui/styles
```

`react` and `react-dom` (`^19`) are peer dependencies provided by your application.

## Usage

Import the fonts, icons and stylesheet once in your application entry point:

```ts
import '@ippon-ui/styles/fonts/open-sans/400.css';
import '@ippon-ui/styles/fonts/open-sans/600.css';
import '@ippon-ui/styles/fonts/open-sans/700.css';
import '@ippon-ui/styles/fonts/saira-extra-condensed/700.css';
import '@ippon-ui/styles/icons/ionicons.css';
import '@ippon-ui/styles/tikui.css';
```

Then use the components:

```tsx
import { IpponButton } from '@ippon-ui/react';

export const SaveButton = () => (
  <IpponButton color="information" onClick={() => console.log('saved')}>
    Save
  </IpponButton>
);
```

## Documentation

Every component is documented in [Storybook](https://storybook.js.org). Stories live in
[`stories/`](./stories) (one file per component) and render against the built
`@ippon-ui/styles` stylesheet.

Build the styles first (from the monorepo root), then serve Storybook on port `4230`:

```sh
mise build        # builds icons + styles + react
mise react-dev    # serves Storybook at http://localhost:4230
```

`mise react-build` builds the React library and then its static Storybook (output in
`storybook-static/`).

## License

[Apache-2.0](./LICENCE) © Ippon Technologies
