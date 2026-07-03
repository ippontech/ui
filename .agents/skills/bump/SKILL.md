---
name: 'bump'
description: 'Bump package versions and update CHANGELOG.md so consumers can see what happens between releases. Use when a feature or fix branch is ready.'
---

# Changelog & version bump

`CHANGELOG.md` at the monorepo root tells package consumers what changed. Every branch that changes a published package (`styles`, `react`, `icons`) must bump the affected versions and document the changes before being merged.

## Workflow

1. **Identify affected packages**: `git diff origin/main...HEAD --stat` and `git log origin/main..HEAD` show which packages changed. Ignore packages with no consumer-facing change.
2. **Bump versions**: increment the patch number (`0.0.x` + 1) in each affected `<package>/package.json`. The repository convention is one bump per feature branch, folded into the feature commit.
3. **Align internal peer dependencies**: if a package now relies on something introduced in another package of the same branch (e.g. `react` consuming new `styles` CSS classes), update the corresponding `peerDependencies` range (e.g. `"@ippon-ui/styles": "~0.0.7"`).
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

## Conventions

- A same branch usually produces a single entry, updated as the branch evolves.
- The changelog update and the version bumps belong to the feature commit (branches follow a single squashed commit convention).
- Never rewrite past release entries; a correction is a new entry.
