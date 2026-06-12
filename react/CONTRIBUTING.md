# Contributing to `@ippon-ui/react`

The React Component Library provides the **mechanical** part of each component:
React components that render the Pattern Library markup and expose typed props.
The Pattern Library owns the markup, the CSS classes and the visual states; refer
to its documentation for the classes and structure to use, and follow its CAP
convention (Component Alternative Part), tokens and Atomic Design hierarchy.

Read the repository's root `CONTRIBUTING.md` first for the shared workflow
(issues, branches, commits, pull requests).

## File organisation

Each component is made of:

- **Component**: `react/src/Ippon<ComponentName>.tsx` (PascalCase).
- **Test**: `react/test/Ippon<ComponentName>.spec.tsx`.
- **Export**: added to `react/src/index.ts`.

## Component conventions

```tsx
import type { DataSelectableWithChildren } from './DataSelectable.ts';
import { clsx } from 'clsx';
import { optionalToAlternativeClass } from './CAP.ts';

type IpponComponentProps = DataSelectableWithChildren<{
  alternative?: 'primary' | 'secondary';
}>;

export const IpponComponent = (props: IpponComponentProps) => (
  <div
    className={clsx('ippon-component', optionalToAlternativeClass(props.alternative))}
    data-selector={props.dataSelector}
  >
    <span className="ippon-component--label">{props.children}</span>
  </div>
);
```

- Extend `DataSelectable<T>` (no children) or `DataSelectableWithChildren<T>`
  (with children); both provide `dataSelector?: string`.
- `data-selector` exposes the element so it can be targeted in tests
  (Testing Library is configured with `testIdAttribute: 'data-selector'`); always
  forward it.
- Use the types from `Tokens.ts` for colours and sizes (e.g.
  `IpponTokenTextColor`, `IpponTokenSize`).
- Model CAP **alternatives** as union types and booleans like `border` as
  optional props.
- Build class names with `clsx()` and the helpers from `CAP.ts`:
  `optionalToAlternativeClass('primary')` → `'-primary'`,
  `optionalToPrefixedAlternativeClass('shadow')('l1')` → `'-shadow-l1'`,
  `toAlternativeClass(value)` (non-optional).

For a CAP **part** (`ippon-component--part`) with significant props, create a
dedicated sub-component and export both from the same file:

```tsx
type IpponComponentLabelProps = DataSelectableWithChildren<{
  alternative?: 'strong';
}>;

export const IpponComponentLabel = (props: IpponComponentLabelProps) => (
  <span
    className={clsx('ippon-component--label', optionalToAlternativeClass(props.alternative))}
    data-selector={props.dataSelector}
  >
    {props.children}
  </span>
);
```

## Tests

Tests use Vitest and Testing Library and live in `react/test/`. Each test should
verify the base class name, every alternative, children rendering, the
`data-selector` binding, and any custom tag support. From the monorepo root:

```sh
mise react-lint           # ESLint
mise react-test-unit-ci   # Vitest
```

## License

Contributions are licensed under [Apache-2.0](./LICENCE).
