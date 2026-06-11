# @ippon-ui/icons

The Ippon UI icon font, generated from [Ionicons](https://ionic.io/ionicons). It ships the compiled font, its stylesheet and the TypeScript types of every available icon name.

## Installation

The font is bundled into your application, so install it as a dev dependency:

```sh
npm install -D @ippon-ui/icons
```

## Usage

In most cases you consume the icons through the higher-level packages:

- the stylesheet is re-exported by [`@ippon-ui/styles`](https://www.npmjs.com/package/@ippon-ui/styles) as `@ippon-ui/styles/icons/ionicons.css`;
- the [`@ippon-ui/react`](https://www.npmjs.com/package/@ippon-ui/react) `IpponIcon` and `IpponIon` components render them by name.

This package also exposes the icon names as types, so you can type your own props against the available icons:

```ts
import type { IconClassic, IconLogo, IconVariant } from '@ippon-ui/icons';

type Icon = {
  name: IconClassic | IconLogo;
  variant?: IconVariant; // 'sharp' | 'outline'
};
```

## License

[Apache-2.0](./LICENCE) © Ippon Technologies
