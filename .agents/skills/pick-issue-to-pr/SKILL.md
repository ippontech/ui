---
name: 'pick-issue-to-pr'
description: 'Use when the user wants to pick a GitHub issue to work on from a list, or to carry on with the issue the current branch already references. Works in the current checkout: takes the issue the branch is linked to, or otherwise lists open issues (the ones already assigned to the current user first) for the user to choose from. Self-assigns it, creates a branch only when starting from the default branch, clarifies the issue one question at a time, plans (one approval checkpoint), implements, opens a draft PR, and folds every later change — including review feedback — into a single amended commit.'
---

# Pick Issue to PR

Take a GitHub issue all the way to a draft pull request, working in the current checkout on a branch other than the default one, and keeping that branch at a **single commit**. The issue comes from a pick-list, unless the branch already checked out names one.

## Tooling

Every GitHub interaction below is described by **intent**, not by tool name. Use whatever the session offers to fulfil it — a GitHub MCP server if one is connected, the `gh` CLI otherwise. Use `git` directly for all local repository operations (fetch, branch, commit, push).

Derive `owner`/`repo` from the `origin` remote: `git remote get-url origin` (handles both `git@github.com:OWNER/REPO.git` and `https://github.com/OWNER/REPO.git`).

## Workflow

### 1. Start from the branch already checked out

Work happens **where the skill runs**, so the branch under your feet decides both which issue to work on and whether there is anything to create.

```bash
git fetch origin
DEFAULT=$(git symbolic-ref --quiet --short refs/remotes/origin/HEAD 2>/dev/null | sed 's@^origin/@@')
DEFAULT=${DEFAULT:-main}
CURRENT=$(git branch --show-current)
```

When `CURRENT` is not `$DEFAULT`, look for an issue it is already linked to:

- an open PR from that branch whose body references an issue (`Closes #<N>`), or
- a branch name starting with an issue number (`21-grid-slot-stretch` → issue 21).

**A branch already linked to an issue is the choice — skip step 2 entirely and do not ask.** Say which issue and which branch the work continues on, then go to step 3.

Otherwise, go to step 2 to pick an issue.

### 2. List the issues and let the user choose

Skip this step when step 1 already found the issue.

List the **open** issues of the current repo, then present them **sorted so the issues already assigned to the authenticated GitHub user come first**, the rest after.

Show the list (number, title, assignees, labels) and ask the user which one they want to work on. **Do not pick for them.** Wait for the choice before continuing.

### 3. Self-assign the chosen issue

Resolve the authenticated GitHub user, then add them to the issue's assignees. Assignment is **relative to whoever runs the skill**, never hard-coded — if someone else runs it, it assigns to them. Nothing to do if they are already an assignee.

### 4. Create a branch, but only if needed

**Create a branch only when the checkout sits on the destination branch.**

- **On `$DEFAULT`** — create the branch off the **latest remote default branch**, not the local checkout. Name it after the issue: `<issue-number>-<kebab-slug-of-title>` (e.g. `12-fix-badge-contrast`), unless recent history suggests another scheme.

  ```bash
  git switch -c "<branch>" "origin/$DEFAULT"
  ```

  If a branch or an open PR already references the issue, reuse it rather than creating a second one: `git switch "<branch>"`.

  Check first that the working tree is clean (`git status --short`) — if it is not, ask the user what to do with the pending changes rather than moving them onto another branch.

- **On any other branch** — keep the branch from step 1, whatever its name. Nothing to create, nothing to switch: this step is a no-op. Only ask the user if the branch looks unrelated to the chosen issue.

### 5. Make sure the project is ready

Only if the project's dependencies are missing or stale (fresh clone, lockfile changed since the last install):

```bash
mise trust && mise install && mise setup && mise build
```

If the project doesn't use mise, run the project's documented install/setup instead. In an already-working checkout, skip this.

### 6. Clarify the issue — one question at a time

Read the full issue (body, comments, labels) and the relevant code, then question the user to remove ambiguity:

- Ask **exactly one question per turn** and wait for the answer before the next.
- Stop asking once you have enough to write a confident plan.
- The user may decide to **complete the issue itself**. When they do, update the issue on GitHub so the issue stays the source of truth.

### 7. Propose a plan — REQUIRED CHECKPOINT

Build a concrete plan from the issue, the answers, and a look at the code. Present it and **wait for approval**. This is the only mandatory stop before implementation.

### 8. Implement

Implement the change following the approved plan and the repo's own conventions (read CLAUDE.md / AGENTS.md and neighbouring code). Keep the diff scoped to the issue.

### 9. Commit once, push, open a draft PR

The branch must hold **exactly one commit**.

- Detect the repo's commit convention (recent `git log --oneline -20`, any commitlint config). Reference the issue in the commit.
- Create the single commit, then:

```bash
git push -u origin <branch>
```

- Open a **draft** PR targeting `$DEFAULT` with a body that closes the issue (`Closes #<N>`).

When the branch already carries its commit and its PR — the case step 1 picked up — amend and force-push instead, as in step 10, and update the PR body if the scope moved.

Report the PR URL.

### 10. Fold reviews into the single commit

When reviews arrive — read the PR review threads — or the user asks for changes:

- Apply the changes, then **amend the existing commit** — never add a second commit:

```bash
git commit --amend --no-edit   # or adjust the message if the scope changed
git push --force-with-lease
```

- Reply to each review thread saying what you did.

#### Resolve only what is actually resolved

After replying, **resolve a thread only when its feedback is fully addressed in the pushed commit** and you are confident the change satisfies it. Resolving a thread is usually not exposed as a plain command; the GraphQL `resolveReviewThread` mutation does it, keyed on the **thread node id** (the `id` field like `PRRT_…` returned with the review comments, _not_ a comment id):

```bash
gh api graphql -f query='mutation($t:ID!){ resolveReviewThread(input:{threadId:$t}){ thread { isResolved } } }' -f t="PRRT_…"
```

**Leave the thread open for the reviewer whenever you are not closing the loop yourself**: replying with a question, pushing back or proposing an alternative not yet agreed, only partially addressing it, or deferring it to a follow-up. When in doubt, leave it open. Never resolve a thread you have not replied to.

Repeat until the PR is approved. **The branch ends with a single commit, always.**

## Notes

- Never push directly to the default branch.
- One issue = one branch = one PR = one commit.
- Once the PR is merged, go back to the default branch and delete the local branch.
