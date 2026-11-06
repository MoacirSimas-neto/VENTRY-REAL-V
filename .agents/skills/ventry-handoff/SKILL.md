---
name: ventry-handoff
description: Use at the end of a Ventry development session to produce a concise handoff for the next session or computer.
---

# Ventry Session Handoff

Before creating the handoff:

1. inspect `git status`;
2. inspect the final diff;
3. run relevant verification;
4. confirm whether changes were committed.

If appropriate and authorized, create one focused commit for the completed work.

## Handoff format

Return:

### Repository
Repository name.

### Branch
Current branch.

### Commit
Commit hash and link when available.

### Completed
What was actually implemented and verified.

### Main files changed
Only the important files.

### Pending
Anything intentionally left unfinished.

### Decisions
Important technical or UI decisions made during the session.

### Problems
Errors, limitations or unresolved issues found.

### Next step
One clear recommended next task.

Keep the handoff concise and factual.

Do not claim unverified work is complete.

The result should be suitable for copying directly into another ChatGPT or Codex session.
