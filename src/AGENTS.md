# Ventry Frontend — Agent Instructions

These instructions apply to work inside `src/`.

Also follow the root `AGENTS.md`.

---

## Frontend stack

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

Do not change the stack without a concrete reason and explicit approval.

---

## Development approach

Build features incrementally.

Prefer completing one user flow well instead of scaffolding many unfinished pages.

Follow the current README checklist.

Do not implement later roadmap items unless requested.

---

## Mobile first

Design for mobile screens first.

Then adapt the layout for larger screens.

Do not create a desktop layout and simply shrink it.

Important content and primary actions must remain easy to find and use on small screens.

---

## Components

Create components when they improve:

- clarity;
- reuse;
- separation of responsibility.

Do not create a component for every `div`.

Prefer a small number of meaningful components.

Keep page components readable.

---

## TypeScript

Use TypeScript strictly and intentionally.

Avoid:

- `any`;
- unnecessary type assertions;
- oversized shared types;
- premature generic abstractions.

Create types that represent the domain needed by the feature.

---

## Data

Initial development may use mock data.

Pages should consume data through a simple data layer instead of importing raw mock files directly.

Preferred direction:

Page
→ service
→ mock

Later:

Page
→ service
→ REST API

The UI should not care where the data ultimately comes from.

Keep the implementation small.

---

## UI and UX

The visual identity should feel like an event and ticketing platform.

Prioritize:

- event imagery;
- typography hierarchy;
- date and venue clarity;
- ticket availability;
- pricing;
- clear primary actions;
- consistent spacing.

Avoid generic AI UI.

Avoid unnecessary decoration.

The interface should look deliberate rather than generated from a generic prompt.

---

## States

When applicable, consider:

- loading;
- error;
- empty;
- success;
- disabled states.

Do not add fake loading or artificial complexity when the current mock implementation does not need it.

Prepare components so these states can be added naturally when the API exists.

---

## Accessibility

Use semantic HTML.

Buttons should be buttons.

Links should be links.

Images should have meaningful alt text.

Interactive elements should have visible focus states.

Maintain reasonable color contrast.

Do not rely only on color to communicate important state.

---

## Routing

Use React Router.

Public event routes should be structured predictably.

Preferred style:

- `/`
- `/eventos`
- `/eventos/:id`

Future private areas may use separate route groups.

Do not implement authentication routing before authentication exists.

---

## Styling

Use Tailwind CSS consistently.

Avoid large amounts of inline custom CSS unless there is a good reason.

Reuse spacing, typography and visual patterns.

Do not create a full design system library before the project needs one.

---

## State management

Prefer local React state initially.

Do not introduce Redux or Zustand just to prepare for future complexity.

Add a state management library only when shared application state becomes genuinely difficult to manage.

---

## API preparation

The frontend must never query MySQL directly.

Future data flow:

React
→ REST API
→ Express
→ MySQL

Mock shapes should remain reasonably compatible with the backend domain.

Do not mirror raw database rows blindly when a cleaner frontend model is appropriate.

---

## Testing

Testing should grow with meaningful behavior.

When tests are introduced:

- Vitest for unit logic;
- React Testing Library for component behavior;
- Playwright for important end-to-end flows.

Do not create meaningless tests only to increase test count.

Prioritize user-visible behavior and important business flows.
