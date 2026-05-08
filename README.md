# Ravenmoor & Co. — Haunted Real Estate

A haunted real estate listings app. We're using it today to learn what Storybook is good for, on a codebase you didn't write.

> _"Discreet representation for distinguished hauntings since 1923."_

---

## Setup

You'll need [Bun](https://bun.com/) installed.

```sh
bun install
```

Two dev servers — leave both running in separate terminals:

```sh
bun dev            # the app, at http://localhost:5173
bun run storybook  # Storybook, at http://localhost:6006
```

`bun run build` produces a production bundle if you want to verify your changes compile.

---

## What's in this codebase

```
src/
├── components/              one folder per component
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.module.css
│   │   ├── Button.stories.jsx     ← only Button has a story so far
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
├── pages/                   one folder per route
│   ├── Listings/            /
│   ├── PropertyDetail/      /property/:id
│   ├── Ghosts/              /ghosts
│   ├── Agents/              /agents
│   ├── SubmitHaunting/      /submit
│   └── NotFound/            *
├── data/                    mock data: properties, ghosts, agents
└── styles/                  global CSS + design tokens
```

Each component lives in its own folder. The convention is:

- `ComponentName.jsx` — the component
- `ComponentName.module.css` — its styles (CSS modules)
- `ComponentName.stories.jsx` — its Storybook stories
- `ComponentName.test.jsx` — its tests _(coming next week)_
- `index.js` — re-exports the default so imports stay clean

This is how a lot of professional React codebases organize components. Get used to it.

---

## Today's Assignment

You just walked into a codebase you didn't write. There are 12 components, 6 pages, and a fair amount of mock data. Your job is to make two small changes — and pay attention to **how different the experience feels**.

### Part 1 — Edit _without_ Storybook _(~15 min)_

**Do not open Storybook at any point in this part. Pretend it doesn't exist.**

Update the `GhostBadge` component so that **the `demon` variant looks more menacing** than the other types. Specifically:

- A red glow around the badge (CSS `box-shadow`)
- A thicker border (use the existing border, but bump the width)
- The label rendered in **UPPERCASE** and **bold**
- The other five variants (poltergeist, wraith, friendly, banshee, shade) must remain **unchanged**

To verify your change, you need to look at the `demon` badge in **every place it appears**. Find them all using the running app at `http://localhost:5173`:

1. On the Listings page (which properties have demon hauntings?)
2. On a Property Detail page for one of those properties
3. On the Ghost Roster page, filtered to demons
4. On the Submit a Haunting form (the radio buttons)

**Track this:**

- ⏱ How long did it take you to find the file?
- 🧭 How many pages/clicks did you need to verify all four contexts?
- 🐛 Did anything break that you wouldn't have caught if you'd only looked at one place?

---

### Part 2 — Edit _with_ Storybook _(~15 min)_

**For this part, do not open the app at `localhost:5173` until you're done. Use Storybook only.**

The component is `PropertyCard`. It currently has **no story file**.

**Step 1.** Create `src/components/PropertyCard/PropertyCard.stories.jsx`. Look at how `Button.stories.jsx` is written for the format. Write at least these stories:

- `Default` — a typical property
- `Catastrophic` — a property with `hauntingRating: 5` (a 5-skull haunting)
- `Friendly` — a property with `primaryHaunting: 'friendly'`
- `NonNegotiable` — a property where `negotiable: false`
- `Expensive` — a property with `price > 2000000`

You can import sample data from `src/data/properties.js` or pass a hand-built object as `args`.

> 💡 `PropertyCard` uses `<Link>` from `react-router-dom`, which needs a router context. Wrap your stories with a `MemoryRouter` decorator — ask if you're not sure how.

**Step 2.** Now add a feature: when `property.hauntingRating === 5`, the card should display a **`CATASTROPHIC`** banner overlay on the image (your choice of placement and styling, but it should be obvious). Use your `Catastrophic` story to design and verify this. The other ratings should look exactly the same as before.

**Track this:**

- ⏱ How long did it take this time, compared to Part 1?
- 🔁 How many times did you switch between the editor and the browser?
- 🤔 Where would Storybook have helped in Part 1?

---

### Bonus _(if you finish early)_

Pick any other component without a story (`HauntingRating`, `PriceTag`, `GhostBadge`, `AgentCard`, `GhostCard`, `WitnessQuote`, `PageHeader`) and write its `*.stories.jsx`. Cover every prop variant you can think of.

---

## Notes on the codebase

- **No semicolons.** Match the existing style.
- **CSS Modules.** Class names get scoped automatically — `import styles from './Foo.module.css'` and use `styles.className`.
- **Plain JS, no TypeScript.**
- **React Router v7.** Routes are declared in `src/App.jsx`.
- **Mock images** are hardcoded Unsplash URLs in `src/data/properties.js`. If any 404, swap with another Unsplash photo URL.
