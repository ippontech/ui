---
name: pattern-library-create-component
description: Create a component on the Pattern Library
skills:
  - pattern-library
---

## Task

As input, you are given the level and name of the component to create.

## Steps

1. Review the instructions in `.github/instructions/pattern-library.instructions.md` to understand:
   - The Atomic Design principles (atoms, molecules, organisms, templates)
   - The Tikui component architecture
   - The CAP (Component Alternative Part) naming convention
   - Token and Quark concepts

2. Generate the component using the tikui command with the proper format:

   ```shell
    mise styles-create-component <component> --path <path>
   ```

   Where:
   - `<component>` is the component name in `kebab-case`
   - `<path>` where default is 'atom' to create inside `src/atom`

3. Ensure the generated component follows the CAP convention for alternatives and parts
