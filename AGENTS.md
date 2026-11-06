# Ventry — Agent Instructions

## Project

Ventry is an event management and ticketing platform.

The project started as a MySQL database project and is evolving into a complete web application.

The repository contains the database, frontend and, later, backend of the same system.

The README is the main source of truth for the current roadmap and delivery checklist.

Before starting substantial work, read the README and inspect the relevant project area.

---

## Lovable workflow

- Use Lovable primarily for frontend work. The app lives at the repository root, with source code in src/ and static assets in public/.
- Keep database/ unchanged during automated frontend or Lovable work. Make SQL changes only when explicitly requested and verify them manually in MySQL Workbench.
- Keep MySQL as the project database. Do not replace it with Supabase or PostgreSQL.
- Add backend or authentication only when explicitly requested.
- Keep the synced branch buildable. Preserve .lovable/ and published Git history.


## Main architecture

Current direction:

Frontend:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

Future backend:
- Node.js
- Express
- REST API

Database:
- MySQL

Expected communication:

Frontend
→ REST API
→ Backend
→ MySQL

The frontend must never connect directly to MySQL.

---

## General principles

Prefer:

- simple solutions;
- small implementations;
- readable code;
- explicit domain concepts;
- gradual evolution;
- existing project conventions.

Avoid unnecessary abstractions and dependencies.

Do not introduce a technology only because it is common in large applications.

Add tools when a real project need appears.

---

## Scope discipline

Only implement what the current task or README checklist requires.

Do not proactively build future features.

Examples of features that must not be added unless explicitly requested:

- authentication;
- checkout;
- real payments;
- organizer dashboard;
- backend API;
- MySQL integration;
- advanced global state;
- complex architecture.

Do not expand a small task into a larger rewrite.

---

## Database protection

The database is developed and studied manually by the project owner.

During frontend tasks:

- do not modify `database/`;
- do not rewrite SQL;
- do not rename database entities;
- do not change procedures or tests.

Only modify database files when the task explicitly asks for database work.

Preserve all existing SQL history.

---

## Domain consistency

The frontend and future backend should use concepts consistent with the MySQL model.

Important domain concepts include:

- Evento
- Local
- Organizador
- TipoIngresso
- Lote
- Cliente
- Compra
- ItemCompra
- Ingresso

Do not model the entire database in the frontend prematurely.

Create only the domain types needed by the current feature.

Avoid:

- `any`;
- giant types;
- mixing UI state into domain types without a clear reason.

---

## Data access

During the initial frontend phase, data may be mocked.

Pages and components should not depend directly on raw JSON files.

Prefer a simple boundary:

Page / Feature
→ data service or repository
→ mock data

Later:

Page / Feature
→ same data boundary
→ REST API
→ backend
→ MySQL

Keep this boundary simple. Do not create enterprise-style repository abstractions unless they are actually useful.

---

## Frontend quality

The frontend should be:

- mobile-first;
- responsive;
- accessible;
- intuitive;
- visually consistent;
- suitable for an event platform.

Avoid generic AI-generated visual patterns such as:

- excessive gradients;
- glassmorphism everywhere;
- unnecessary cards inside cards;
- random shadows;
- generic SaaS dashboard styling;
- decorative complexity with no UX benefit.

Important information should be immediately understandable.

---

## Dependency policy

Do not add dependencies without a clear reason.

Current initial frontend stack:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

Optional later, only when justified:

- TanStack Query
- React Hook Form
- Zod
- Vitest
- React Testing Library
- Playwright
- Zustand

Do not add Redux, Next.js, GraphQL or large component libraries without explicit discussion or a concrete requirement.

---

## Git

Keep commits focused.

Do not include unrelated changes.

Never commit:

- credentials;
- passwords;
- database connection secrets;
- `.env` files containing real secrets.

Use `.env.example` when environment variables are introduced.

Before committing, inspect the diff.

---

## Verification

Before declaring implementation complete:

- run the project;
- run the build;
- check TypeScript errors;
- run lint if configured;
- run relevant tests if configured;
- check for obvious console errors;
- inspect the Git diff.

Do not claim something works without verification.

---

## Session handoff

At the end of development sessions, provide:

- branch;
- commit hash;
- commit link when possible;
- main files changed;
- what is working;
- what remains pending;
- important architectural decisions;
- problems found;
- next recommended step.

The handoff should be concise enough to paste into another ChatGPT/Codex session.

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->
