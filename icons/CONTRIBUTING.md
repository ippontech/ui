# Contributing to `@ippon-ui/icons`

This package generates an icon font from [Ionicons](https://ionic.io/ionicons).
It is a build step, not a hand-written collection: it ships the compiled font,
its stylesheet and the TypeScript types of every available icon name.

Read the repository's root `CONTRIBUTING.md` first for the shared workflow
(issues, branches, commits, pull requests).

## How it works

`index.ts` is the whole package. It:

1. Reads the SVG icons shipped by the `ionicons` dependency.
2. Categorises each icon (`logo-*`, `*-outline`, `*-sharp`, or filled) and
   writes the `IconClassic`, `IconLogo` and `IconVariant` types to `types/`.
3. Fixes the SVGs and converts them to the `ionicons` font under `dist/`, with
   the `ippon-ion` class-name prefix.

## Building

From the monorepo root:

```sh
mise icons-build  # runs `node index.ts`
```

The generated `dist/` and `types/` are not committed. Most changes here mean
bumping the `ionicons` dependency (Renovate handles this) or adjusting the
generation in `index.ts`; rerun the build and check the produced types.

## What it produces

- A `dist/` folder with the `ionicons` web font and its stylesheet. Icons are
  exposed as CSS classes prefixed with `ippon-ion` and support ligatures, so a
  consuming application can render an icon from its name.
- A `types/index.d.ts` with the available icon names as types — `IconClassic`,
  `IconLogo` and `IconVariant` (`'sharp' | 'outline'`) — to type props against
  the existing icons.

## License

Contributions are licensed under [Apache-2.0](./LICENCE).
