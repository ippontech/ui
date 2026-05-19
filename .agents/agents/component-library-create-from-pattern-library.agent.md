---
name: component-library-create-from-pattern-library
description: Create a component in the Component Library based on a component from the Pattern Library
skills:
  - component-library
  - pattern-library
---

## Task

As input, you are given the component name to create in the Component Library (based on an existing Pattern Library component).

## Steps

1. Check if a component already exists in `react/src/` that covers this need by searching for existing `Ippon<ComponentName>` components

2. Read the Pattern Library component documentation from the node module `@ippon-ui/styles` located in `node_modules/@ippon-ui/styles/dist`:
   - Locate `src/<level>/<component-name>/<component-name>.mixin.pug` (where `<level>` is atom, molecule, organism, or template)
   - Understand the HTML structure, alternatives (CAP `-variant`), and parts (CAP `--part`)
   - Read `<component-name>.md` for component details

3. Write unit tests in `react/test/Ippon<ComponentName>.spec.tsx`:
   - Create tests for all expected props: variants, colors, sizes
   - Include tests for children rendering and `dataSelector` binding
   - Follow the test structure from Component Library "Unit Tests" section
   - Run `cd app && pnpm test:unit` to verify tests are red before implementing

4. Implement the React component in `react/src/Ippon<ComponentName>.tsx`:
   - Follow the structure and conventions from Component Library "Creating a Component" section
   - Type props using `DataSelectable` or `DataSelectableWithChildren`
   - Build CSS classes using `clsx` and helpers from `CAP.ts`
   - Create sub-components for any parts (CAP `--part`)
   - Run tests with `cd app && pnpm test:unit` until all tests pass

5. Export the component from `react/src/index.ts`:
   - Add `export { IpponComponent } from './IpponComponent.tsx';`
   - If applicable, also export any sub-components or parts
