# Contributing to Ippon UI

Thanks for taking the time to contribute. Ippon UI is a monorepo of independently
published packages (`@ippon-ui/styles`, `@ippon-ui/react`, `@ippon-ui/icons`).
This guide covers the shared workflow; each package has its own guide for the
conventions specific to it.

## Ownership

Every contributor is responsible for the code they submit: its quality, its tests,
and following it through review until it is merged. A pull request is not "thrown
over the wall" — you own it from the first commit to the merge, including
addressing review feedback and keeping it green in CI.

## Opening an issue

Issues are the source of truth for the work to be done. Before opening one:

- Search the [existing issues](https://github.com/ippontech/ui/issues) to avoid
  duplicates.
- For a bug, describe the context, the expected behaviour, the actual behaviour,
  and how to reproduce it.
- For a change or a new component, describe the need and the intended scope.

Keep an issue focused on a single concern: one issue, one change.

## Getting set up

This repository uses [mise](https://mise.jdx.dev) to manage tooling and tasks.
From the monorepo root:

```sh
mise trust      # trust the local mise configuration
mise install    # install the pinned tools (Node, pnpm, Tikui CLI)
mise setup      # install dependencies
```

See the [README](./README.md) for the full list of tasks.

## Workflow

1. Pick or open an issue and assign it to yourself.
2. Create a branch from `main`.
3. Write the code in English (comments, identifiers, documentation).
4. Before committing, run:

   ```sh
   mise format        # format the code
   mise lint          # lint and auto-fix
   mise test-unit-ci  # run the unit tests
   ```

   A pre-commit hook (lefthook) also checks formatting (Prettier) and SCSS
   (Stylelint) on staged files.

## Commits

Commits follow [Conventional Commits](https://www.conventionalcommits.org):
`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`… Reference the issue in
the body or footer when relevant.

## Pull requests

- Target the `main` branch — never push to it directly.
- Open the pull request as a draft until it is ready for review.
- Keep it scoped to a single issue and link the issue with `Closes #<number>`.
- Make sure CI is green before requesting a review.

## Package guides

Each package documents its own conventions:

- [`styles/CONTRIBUTING.md`](./styles/CONTRIBUTING.md) — Pattern Library: Atomic
  Design, CAP, tokens and quarks.
- [`react/CONTRIBUTING.md`](./react/CONTRIBUTING.md) — Component Library: React
  components wrapping the Pattern Library.
- [`icons/CONTRIBUTING.md`](./icons/CONTRIBUTING.md) — icon font generated from
  Ionicons.

## License

By contributing, you agree that your contributions are licensed under the
[Apache-2.0](./LICENSE) license.
