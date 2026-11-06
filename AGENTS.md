# Ventry — Agent Instructions

## Project

Ventry is an event management and ticketing platform.

The project started as a MySQL database project and is evolving into a complete web application.

The repository contains the database, frontend and, later, backend of the same system.

The README is the main source of truth for the current roadmap and delivery checklist.

Before starting substantial work, read the README and inspect the relevant project area.

---

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
