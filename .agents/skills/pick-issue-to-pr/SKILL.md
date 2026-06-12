---
name: 'pick-issue-to-pr'
description: 'Use when the user wants to pick a GitHub issue to work on from a list. Lists open issues (the ones already assigned to the current user first), lets the user choose one, self-assigns it, creates an isolated workspace, runs setup, clarifies the issue one question at a time, plans (one approval checkpoint), implements, opens a draft PR, and folds every later change — including review feedback — into a single amended commit.'
---

# Pick Issue to PR

Take a GitHub issue from a pick-list all the way to a draft pull request, working in an isolated workspace and keeping the branch at a **single commit**.

## Tooling

Prefer the **GitHub MCP** tools (`mcp__github__*`). If they are not available in the session, fall back to the `gh` CLI for the equivalent operations. Use `git` directly for all local repository operations (fetch, worktree, commit, push).

Derive `owner`/`repo` from the `origin` remote: `git remote get-url origin` (handles both `git@github.com:OWNER/REPO.git` and `https://github.com/OWNER/REPO.git`).

## Workflow

### 1. List the issues and let the user choose

Resolve the current user first — assignment is **relative to whoever runs the skill**, never hard-coded:

- `mcp__github__get_me` (or `gh api user --jq .login`).

List the **open** issues of the current repo, then present them **sorted so the issues already assigned to the current user come first**, the rest after:

- `mcp__github__list_issues` with `state: open` (or `gh issue list --state open --json number,title,assignees,labels`).

Show the list (number, title, assignees, labels) and ask the user which one they want to work on. **Do not pick for them.** Wait for the choice before continuing.

### 2. Self-assign the chosen issue

Assign the issue to the current user resolved in step 1:

- `mcp__github__issue_write` (method `update`, add the current login to `assignees`), or `gh issue edit <N> --add-assignee @me`.

This is always the user running the skill — if someone else runs it, it assigns to them.

### 3. Create an isolated workspace linked to the issue

The workspace is a git worktree based on the **latest remote default branch**, not the local checkout.

```bash
git fetch origin
DEFAULT=$(git symbolic-ref --quiet --short refs/remotes/origin/HEAD 2>/dev/null | sed 's@^origin/@@')
DEFAULT=${DEFAULT:-main}
```

- Parse `<group>/<project>` from the origin URL (e.g. `ippontech/ui` -> group `ippontech`, project `ui`).
- Branch name linked to the issue: `<issue-number>-<kebab-slug-of-title>` (e.g. `12-fix-badge-contrast`). If recent history suggests another scheme, match it.
- Path: `~/.workspace/<group>/<project>/<branch>`.

```bash
WT="$HOME/.workspace/<group>/<project>/<branch>"
git worktree add -b "<branch>" "$WT" "origin/$DEFAULT"
```

If the branch already exists, reuse it: `git worktree add "$WT" "<branch>"`. Do all subsequent work with that worktree as the working directory.

### 4. Run setup in the workspace

From the workspace root (only if a `mise.toml` exists there):

```bash
mise trust && mise install && mise setup && mise build
```

If the project doesn't use mise, run the project's documented install/setup instead.

### 5. Clarify the issue — one question at a time

Read the full issue (`mcp__github__issue_read` get + comments + labels) and the relevant code, then question the user to remove ambiguity:

- Ask **exactly one question per turn** and wait for the answer before the next.
- Stop asking once you have enough to write a confident plan.
- The user may decide to **complete the issue itself**. When they do, update the issue on GitHub (`mcp__github__issue_write` / `gh issue edit`) so the issue stays the source of truth.

### 6. Propose a plan — REQUIRED CHECKPOINT

Build a concrete plan from the issue, the answers, and a look at the code. Present it and **wait for approval**. This is the only mandatory stop before implementation.

### 7. Implement

Implement the change following the approved plan and the repo's own conventions (read CLAUDE.md / AGENTS.md and neighbouring code). Keep the diff scoped to the issue.

### 8. Commit once, push, open a draft PR

The branch must hold **exactly one commit**.

- Detect the repo's commit convention (recent `git log --oneline -20`, any commitlint config). Reference the issue in the commit.
- Create the single commit, then:

```bash
git push -u origin <branch>
```

- Open a **draft** PR targeting `$DEFAULT` with a body that closes the issue (`mcp__github__create_pull_request` with `draft: true`, or `gh pr create --draft --base "$DEFAULT" --body "Closes #<N>"`).

Report the PR URL.

### 9. Fold reviews into the single commit

When reviews arrive (read them: `mcp__github__pull_request_read` get_review_comments, or `gh pr view --comments`) or the user asks for changes:

- Apply the changes, then **amend the existing commit** — never add a second commit:

```bash
git commit --amend --no-edit   # or adjust the message if the scope changed
git push --force-with-lease
```

- Reply to each review thread (`mcp__github__add_reply_to_pull_request_comment`, or `gh api`) saying what you did.

#### Resolve only what is actually resolved

After replying, **resolve a thread only when its feedback is fully addressed in the pushed commit** and you are confident the change satisfies it. Resolving has no direct MCP or `gh pr` command; use the GraphQL `resolveReviewThread` mutation, keyed on the **thread node id** (the `id` field like `PRRT_…` from `get_review_comments`, _not_ a comment id):

```bash
gh api graphql -f query='mutation($t:ID!){ resolveReviewThread(input:{threadId:$t}){ thread { isResolved } } }' -f t="PRRT_…"
```

**Leave the thread open for the reviewer whenever you are not closing the loop yourself**: replying with a question, pushing back or proposing an alternative not yet agreed, only partially addressing it, or deferring it to a follow-up. When in doubt, leave it open. Never resolve a thread you have not replied to.

Repeat until the PR is approved. **The branch ends with a single commit, always.**

## Notes

- Never push directly to the default branch.
- One issue = one branch = one workspace = one PR = one commit.
- The worktree stays under `~/.workspace/...` until the branch is merged; it can be cleaned up afterwards with `git worktree remove`.
