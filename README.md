# Ippon UI

Ippon's design system, distributed as a monorepo of independently published packages.

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)

## Packages

| Package                                                              | Description                                                                                                                                                     | Docs                                   |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| [`@ippon-ui/styles`](https://www.npmjs.com/package/@ippon-ui/styles) | Pattern Library: design tokens and components as SCSS/CSS, built with [Tikui](https://tikui.org) following [Atomic Design](https://atomicdesign.bradfrost.com). | [styles/README.md](./styles/README.md) |
| [`@ippon-ui/react`](https://www.npmjs.com/package/@ippon-ui/react)   | React component library wrapping the Pattern Library.                                                                                                           | [react/README.md](./react/README.md)   |
| [`@ippon-ui/icons`](https://www.npmjs.com/package/@ippon-ui/icons)   | Icon font and types generated from [Ionicons](https://ionic.io/ionicons).                                                                                       | [icons/README.md](./icons/README.md)   |

## Development

This repository uses [mise](https://mise.jdx.dev) to manage tooling and tasks. From the monorepo root:

```sh
mise trust      # trust the local mise configuration
mise install    # install the pinned tools (Node, pnpm, Tikui CLI)
mise setup      # install dependencies
mise build      # build all packages
```

Common tasks:

| Task                                    | Command             |
| --------------------------------------- | ------------------- |
| Start all packages in dev mode          | `mise dev`          |
| Develop the Pattern Library (port 4220) | `mise styles-dev`   |
| Build all packages                      | `mise build`        |
| Format                                  | `mise format`       |
| Lint                                    | `mise lint`         |
| Unit tests                              | `mise test-unit-ci` |

See [`AGENTS.md`](./AGENTS.md) for the monorepo structure and conventions.

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for how to open an issue, the
development workflow, and the per-package guides.

## License

[Apache-2.0](./LICENSE) © Ippon Technologies
