---
name: 'component-library'
description: 'Component Library with React components used by the application.'
---

# Component Library

Component Library is a part of react folder, you can find it in the `react/src` folder.

It's a bounded context dedicated to React Components.

## Concept

The Component Library concept is not especially linked to a technology. The idea is to represent the mechanical part of each component.

It therefore provides React components that will be consumed by another bounded context.

## Integration with Pattern Library

The Component Library consume the Pattern Library, it uses the provided documentation to know classes and structure to use for each component. The CSS is linked using a `link` tag in the `index.html` file of the React application.

When implementing a component in the Component Library:

1. Refer to the Pattern Library documentation for the correct CSS classes and structure
2. Follow the CAP (Component Alternative Part) naming convention for variants and parts
3. Use the semantic colors and tokens defined in the Pattern Library
4. Ensure visual consistency by adhering to the Atomic Design hierarchy (atoms, molecules, organisms)

## Creating a Component

### File Organization

Each component is defined by:

- **Component file**: `react/src/Ippon<ComponentName>.tsx` (PascalCase)
- **Test file**: `react/test/Ippon<ComponentName>.spec.tsx`
- **Export**: added to `react/src/index.ts`

### React Component Structure

A component file follows this structure:

```typescriptreact
import type { DataSelectableWithChildren } from './DataSelectable.ts';
import { clsx } from 'clsx';
import { optionalToAlternativeClass } from './CAP.ts';

type IpponComponentProps = DataSelectableWithChildren<{
  variant?: 'primary' | 'secondary';
  color?: IpponTokenTextColor;
}>;

export const IpponComponent = (props: IpponComponentProps) => (
  <div
    className={clsx(
      'ippon-component',
      optionalToAlternativeClass(props.variant),
      optionalToAlternativeClass(props.color),
    )}
    data-selector={props.dataSelector}
  >
    {props.children}
  </div>
);
```

### Key Conventions

#### Props Typing

- Extend `DataSelectable<T>` for components without children
- Extend `DataSelectableWithChildren<T>` for components with children
- Always include `dataSelector?: string` (via `DataSelectable`)
- Use types from `Tokens.ts` for colors and sizes (e.g., `IpponTokenTextColor`, `IpponTokenSize`)
- Model alternatives (CAP `-variant`) as union types
- Model booleans like `border` or `placeholder` as optional props

#### CSS Class Building

- Use `clsx()` from the `clsx` library to conditionally build class names
- Import helpers from `CAP.ts`:
  - `optionalToAlternativeClass(value)` → converts `'primary'` to `'-primary'`
  - `optionalToPrefixedAlternativeClass(prefix)(value)` → converts `'l1'` with prefix `'shadow'` to `'-shadow-l1'`
  - `toAlternativeClass(value)` → always converts to alternative class (non-optional)

#### Parts and Sub-components

If the Pattern Library component has parts (CSS classes like `ippon-component--part`):

- Create a dedicated sub-component `IpponComponentPart` for parts with significant props
- Export both the main component and the part(s) from the same file
- Use `clsx('ippon-component--part', ...)` for part class names

Example with slots:

```typescriptreact
export const IpponVSpaceSlot = (props: IpponVSpaceSlotProps) => (
  <div
    className={clsx('ippon-v-space--slot', optionalToAlternativeClass(props.align))}
    data-selector={props.dataSelector}
  >
    {props.children}
  </div>
);
```

#### Exporting Components

Add each new component to `react/src/index.ts`:

```typescript
export { IpponComponent } from './IpponComponent.tsx';
export { IpponComponentPart } from './IpponComponent.tsx'; // if applicable
```

### Unit Tests

Tests are located in `react/test/` and use Vitest + Testing Library.

#### Running Tests

```shell
cd react

pnpm test:unit:ci
```

#### Test Structure

Each component test should:

1. Verify the component renders with the correct base class name
2. Test each prop variant (alternatives, colors, sizes)
3. Test children rendering
4. Test `dataSelector` binding
5. Test custom HTML tags if applicable (via `tag` prop)

Example test:

```typescriptreact
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponComponent } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

describe('IpponComponent', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    render(<IpponComponent dataSelector="ippon-component">Content</IpponComponent>);

    const component = screen.getByTestId('ippon-component');

    expect(component).toHaveClass('ippon-component');
  });

  it.each(['primary', 'secondary'] as const)('should have variant %s', (variant) => {
    render(<IpponComponent variant={variant} dataSelector="ippon-component" />);

    const component = screen.getByTestId('ippon-component');

    expect(component).toHaveClass(`-${variant}`);
  });
});
```
