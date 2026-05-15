# Ravenmoor & Co. — Haunted Real Estate

A haunted real estate listings app. Today we're using it to dip our toes into **Vitest + React Testing Library** on a codebase you didn't write.

> 🗂 **You should be on the `vitest-lesson` branch.** If you're not: `git switch vitest-lesson`. The `main` branch is last week's Storybook lesson.

> _"Discreet representation for distinguished hauntings since 1923."_

---

## Setup

You'll need [Bun](https://bun.com/) installed.

```sh
bun install
```

Three commands you'll use today (each can run in its own terminal):

```sh
bun dev            # the app, at http://localhost:5173
bun run test       # vitest in watch mode — re-runs on save
bun run test:run   # one-shot test run (good for CI / verifying)
```

Storybook (`bun run storybook`) is still set up if you want to use it alongside, but you don't need it today.

---

## What's in this codebase

```
src/
├── components/                       one folder per component
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.module.css
│   │   ├── Button.stories.jsx
│   │   ├── Button.test.jsx           ← only Button has a test so far
│   │   └── index.js
│   ├── GhostBadge/
│   ├── HauntingRating/
│   ├── PriceTag/
│   ├── PropertyCard/
│   ├── AgentCard/
│   ├── GhostCard/
│   ├── WitnessQuote/
│   ├── PageHeader/
│   ├── Navbar/
│   ├── Footer/
│   └── Layout/
├── pages/                            one folder per route
└── data/                             mock data: properties, ghosts, agents
```

The convention for each component folder:

- `ComponentName.jsx` — the component
- `ComponentName.module.css` — its styles
- `ComponentName.stories.jsx` — Storybook stories
- `ComponentName.test.jsx` — its tests **(today's lesson)**
- `index.js` — re-exports

Tests live **next to the code they test.** Not in a separate `__tests__` folder, not in a separate `/tests` directory. Right next to the file. That's increasingly the modern convention and it's what your bigger project will use too.

---

## Today's Assignment

We'll build up in three steps, same shape as last week: **edit an existing test → write a test from scratch → use tests to make a change safely.**

### Part 1 — Run and edit existing tests _(~5 min)_

**Step 1.** Run the tests:

```sh
bun run test
```

Vitest starts in watch mode. You should see `Button.test.jsx` pass. Leave it running — it'll re-run automatically every time you save.

**Step 2.** Open `src/components/Button/Button.test.jsx` and read it. Notice:

- `describe(...)` groups related tests
- `it(...)` is one test case (alias for `test`)
- `render(<Component />)` mounts the component into a fake DOM
- `screen.getByRole(...)` queries the rendered output the way an accessibility tool (or a user) would
- `expect(...)` is the assertion

**Step 3.** Add one new test that asserts **a disabled Button does not fire `onClick` when clicked**. Hint:

```jsx
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const onClick = vi.fn()
render(<Button disabled onClick={onClick}>Click me</Button>)
await userEvent.click(screen.getByRole('button'))
expect(onClick).not.toHaveBeenCalled()
```

Save. Watch your new test light up green in the terminal.

---

### Part 2 — Write a test file from scratch _(~10 min)_

Same component we wrote a story for last week: `PriceTag`.

Create `src/components/PriceTag/PriceTag.test.jsx`. The component renders:

- A formatted price (`$1,250,000`)
- The text "negotiable due to demons" — but **only** when the `negotiable` prop is `true`

Write at least these tests:

1. **renders the formatted price** for `price={1250000}`. Assert the text `$1,250,000` appears.
2. **does not show the negotiable text** when `negotiable` is `false` (the default).
3. **shows the negotiable text** when `negotiable={true}`.
4. **handles small numbers** — for `price={295000}` the rendered text should be `$295,000`.

Use `Button.test.jsx` as a template for imports and setup.

> 💡 **`queryByText` vs `getByText`** — `getByText` _throws_ if the element doesn't exist. `queryByText` returns `null` instead. Use `queryByText` when asserting something is **not** there.

---

### Part 3 — Use tests as a safety net _(~10 min)_

Now you have a small safety net for `PriceTag`. Let's see what it catches.

**Step 1.** Make this change to `src/components/PriceTag/PriceTag.jsx`: change the text `'negotiable due to demons'` to `'price negotiable'`. Save.

Look at your terminal. **One of your tests just failed.**

Read the failure carefully. Vitest is telling you:

- _Which_ test failed
- _What_ it expected to find (the old text)
- _What_ the DOM actually contained (the new text)

**This is what tests do.** They catch you when you change behavior the rest of the system was relying on. Sometimes that's a bug. Sometimes that's a deliberate refactor and the test is what's stale.

**Step 2.** You have two choices. Pick one and do it:

- **(a) The change is intentional** — update the test to assert the new text. Tests should go green.
- **(b) The change is a bug** — revert the change in `PriceTag.jsx`. Tests should also go green.

Either choice is correct. The point is: **the test forced you to make the decision explicitly**, instead of breaking quietly.

**Track this:** notice how different the feedback loop is from last week's "change something, click around to verify nothing broke." Tests give you the answer in milliseconds.

---

### Bonus Challenges _(if you finish early)_

#### 🥉 Challenge 1 — Test a simple component

Pick `GhostBadge`, `WitnessQuote`, or `HauntingRating`. Write its `.test.jsx`. Cover every meaningful prop variation. Some hints:

- `GhostBadge`: it renders a label based on `type` — assert the right text shows up
- `WitnessQuote`: it renders the quote, witness, and (optional) date
- `HauntingRating`: trickier — see how the wrapper has `aria-label="4 of 5 skulls"` and use that instead of trying to count SVGs (`getByLabelText`)

#### 🥈 Challenge 2 — Test `PropertyCard` (and learn _wrappers_, again)

Same problem as Storybook last week: `PropertyCard` uses `<Link>` from `react-router-dom` and needs a router context. In Storybook we solved it with a **decorator**. In RTL we solve it with a **wrapper**.

```jsx
import { MemoryRouter } from 'react-router-dom'

render(
  <MemoryRouter>
    <PropertyCard property={sampleProperty} />
  </MemoryRouter>
)
```

Or — cleaner — pass a `wrapper` option to `render`:

```jsx
render(<PropertyCard property={sampleProperty} />, { wrapper: MemoryRouter })
```

Write at least:

- A test that the title and address render
- A test that the price is formatted correctly
- A test that the card is a link to `/property/{id}` (use `getByRole('link', { name: ... })` and check its `href`)

> Same pattern as Storybook decorators. **Anything needing context (router, theme, auth) needs a wrapper everywhere.** Memorize this.

#### 🥈 Challenge 3 — Test the form interaction

`SubmitHaunting` is a real interactive form. Write `SubmitHaunting.test.jsx` that:

1. Fills out the required fields using `userEvent.type(...)`
2. Clicks the **Submit Disclosure** button
3. Asserts the confirmation screen appears (look for "An agent will be in touch.")

You'll need to handle the radio buttons too — `userEvent.click` on the right `<label>` works.

#### 🥇 Challenge 4 — Combine with last week's bonuses

If you built the `AmenityTag` (or any new component) last week, write its test file. If you wrote stories for `HauntingRating`, those story arg-objects are valid test inputs — you can literally `render(<HauntingRating {...UnhauntedStory.args} />)`.

This is one of the deeper reasons stories and tests live next to the component: **they describe the same things, from different angles.**

---

## Notes on the codebase

- **No semicolons.** Match the existing style.
- **CSS Modules.** Class names get scoped automatically.
- **Plain JS, no TypeScript.**
- **React Router v7.** Routes are declared in `src/App.jsx`.
- **Vitest** runs with `jsdom` and `@testing-library/jest-dom` matchers preloaded — see `vitest.setup.js`.
- **Query priority:** prefer `getByRole`, then `getByLabelText`, then `getByText`. Avoid `getByTestId` and `container.querySelector` — they couple tests to implementation details.
