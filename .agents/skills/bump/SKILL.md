---
name: 'bump'
description: 'Bump package versions and update CHANGELOG.md so consumers can see what happens between releases. Use when a feature or fix branch is ready.'
---

# Changelog & version bump

`CHANGELOG.md` at the monorepo root tells package consumers what changed. Every branch that changes a published package (`styles`, `react`, `icons`) must bump the affected versions and document the changes before being merged.

## Workflow

1. **Identify affected packages**: `git diff origin/main...HEAD --stat` and `git log origin/main..HEAD` show which packages changed. Ignore packages with no consumer-facing change.
2. **Bump versions**: in each affected `<package>/package.json`, increment the patch number (`0.0.x` + 1), or the minor number (`0.x.0`) if the branch contains a breaking change (see [Breaking changes](#breaking-changes)). The repository convention is one bump per feature branch, folded into the feature commit.
3. **Align internal peer dependencies**: if a package now relies on something introduced in another package of the same branch (e.g. `react` consuming new `styles` CSS classes), update the corresponding `peerDependencies` range (e.g. `"@ippon-ui/styles": "~0.0.7"`). Moving that range to a breaking version of the other package is itself breaking for the consumers of this package, so bump this package's minor number too.
4. **Reinstall**: run `mise setup` so the lockfile stays consistent.
5. **Update `CHANGELOG.md`**: add a release entry right after the introduction, above the previous entries.
6. **Verify**: `mise build`, `mise lint-ci` and `mise test-unit-ci` must pass.

## Release entry format

```markdown
## YYYY-MM-DD — @ippon-ui/styles X.Y.Z · @ippon-ui/react X.Y.Z

### Added

- `component` organism: what it brings to the consumer.

### Changed

- What changed and what it means for the consumer.
```

- The heading lists only the packages bumped by the branch, each with its new version, separated by `·`.
- Use the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) categories: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`. Only include the categories that apply.
- One line per change, in English, consumer-focused: describe what the consumer gets or must adapt, not internal details (CI, tests, tooling stay out unless they affect consumers).
- Wrap component, class, prop and token names in backticks.
- Start a breaking line with `- **Breaking** — ` and give the migration: what to replace with what, and what visibly breaks if the consumer does nothing.

## Breaking changes

The packages are pre-1.0, where a patch bump is not enough to protect consumers: `~0.0.11` means `>=0.0.11 <0.1.0`, so a consumer on `~0.0.10` installs `0.0.12` automatically and inherits the break with no signal. Only a minor bump falls outside their range. **A branch containing a breaking change bumps the minor number, never the patch number.**

A change is breaking as soon as an existing consumer must edit something to keep the current behaviour. In this repository that mostly means:

- `styles`: a CSS class renamed, removed, or now required somewhere it was not (hand-written HTML has no compiler to catch it), a Pug mixin option renamed or removed, a design token removed or renamed.
- `react`: a component or a prop renamed or removed, a prop becoming required, a rendered structure that consumers select from their own CSS or tests.
- `icons`: an icon name removed or renamed.

Recomposing a component out of a new atom is a typical breaking case: the React component keeps working, but the markup it documents changed, so hand-written HTML must follow. Look for it in `git diff origin/main...HEAD` on the `.pug` and `.scss` files, not only in the public API.

When in doubt, ask what a consumer already on the previous version has to do after upgrading. If the answer is not "nothing", it is breaking.

## Conventions

- A same branch usually produces a single entry, updated as the branch evolves.
- The changelog update and the version bumps belong to the feature commit (branches follow a single squashed commit convention).
- Never rewrite past release entries; a correction is a new entry.
