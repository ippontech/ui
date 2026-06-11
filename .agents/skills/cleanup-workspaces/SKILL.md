---
name: 'cleanup-workspaces'
description: 'Use when the user wants to clean up stale or merged git worktrees under ~/.workspace (e.g. after PRs are merged and their remote branches deleted). Prunes workspaces whose remote branch is gone. Companion to pick-issue-to-pr.'
---

# Cleanup Workspaces

Remove git worktrees under `~/.workspace/<group>/<project>/<branch>` whose upstream branch has been deleted on the remote (typically because the PR was merged). Companion to the `pick-issue-to-pr` skill, which creates those workspaces.

## Workflow

### 1. Discover workspaces

Scan `~/.workspace/` for `<group>/<project>/<branch>` directories. Group them by their main repository (the worktree's common git dir). For each distinct repository, run the steps below once.

`git worktree list` from any checkout of a repo lists all its worktrees with paths and branches — use it to get the authoritative list rather than relying on directory names alone.

### 2. Prune remote-tracking refs

For each repository:

```bash
git fetch --prune origin
```

This deletes remote-tracking refs for branches that no longer exist on the remote.

### 3. Identify workspaces whose branch is gone

A workspace branch is a cleanup candidate when its upstream is gone:

```bash
git branch -vv
```

Branches whose upstream was pruned show `: gone]` in the output. Cross-check that the branch is actually merged or its PR is closed before removing — prefer `: gone]` (branch deleted on remote) as the signal, since that means the PR was merged or the branch was deleted intentionally.

Optionally confirm via the GitHub MCP / `gh` that the associated PR is merged/closed when in doubt.

### 4. Remove the workspace and its branch

For each confirmed candidate:

```bash
git worktree remove "<path>"        # add --force only if it refuses due to untracked/modified files
git branch -D "<branch>"            # the now-dangling local branch
```

Then tidy administrative files:

```bash
git worktree prune
```

Also remove now-empty `<group>/<project>` parent directories under `~/.workspace/`.

### 5. Report

List what was removed and what was kept (and why, e.g. uncommitted changes blocking removal). **Never** force-remove a workspace that has uncommitted or unpushed work without explicitly flagging it to the user and getting confirmation.

## Safety

- Only ever operate inside `~/.workspace/`.
- Do not remove the main working checkout, only linked worktrees.
- A workspace with uncommitted/unpushed changes is surfaced to the user, never silently force-removed.
