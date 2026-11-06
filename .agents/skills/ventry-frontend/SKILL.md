---
name: ventry-frontend
description: Use when implementing or modifying frontend features in the Ventry repository.
---

# Ventry Frontend Workflow

Before implementing frontend work:

1. Read the root `AGENTS.md`.
2. Read `src/AGENTS.md`.
3. Read the relevant section of `README.md`.
4. Inspect the current frontend implementation before creating new structure.

## Implementation principles

Keep the task small.

Implement only the requested feature.

Prefer the simplest design that supports the current requirement and known near-term roadmap.

Do not build speculative infrastructure.

Do not modify the database during frontend work.

## Domain

Reuse existing domain language from Ventry.

Create only the TypeScript types needed by the current feature.

## Data

If the backend does not exist yet:

- use mock data;
- access it through a small data boundary;
- keep page components independent from the raw mock source.

## UI

Start mobile-first.

Prioritize clarity and usability over decoration.

Avoid generic AI-generated UI patterns.

## Completion

Before declaring the feature finished:

1. run the application;
2. run build;
3. check TypeScript;
4. run lint/tests if configured;
5. inspect responsive behavior;
6. inspect the Git diff.

Then use the `ventry-handoff` workflow.
