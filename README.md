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

### Part 2 — Edit _with_ Storybook _(~20 min)_

**For this part, do not open the app at `localhost:5173` until you're done. Use Storybook only.**

We'll build up in three steps: edit a story → create a story → use stories to design a feature.

#### Step 1 — Edit an existing story _(~3 min)_

Open `src/components/Button/Button.stories.jsx`. Read through it. Notice:

- `export default { ... }` defines the component meta (title, controls, etc.)
- Each named `export` is a separate story
- `args` are the props passed to the component

Add a new story called `Haunted` with whatever props you like — change the label, the size, the variant. Save the file. Watch Storybook hot-reload your new story into the sidebar.

That's a story. That's the whole format.

#### Step 2 — Create a story file from scratch _(~7 min)_

We're going to start with one of the simplest components in the app: `PriceTag`.

Create `src/components/PriceTag/PriceTag.stories.jsx`. The component takes only three props (read `PriceTag.jsx` to confirm):

- `price` — number (e.g. `480000`)
- `negotiable` — boolean
- `size` — `'sm' | 'md' | 'lg'`

Write at least these stories:

- `Default` — a typical price (try `1250000`)
- `Negotiable` — `negotiable={true}`
- `Bargain` — a low price like `295000`
- `Estate` — a very high price like `3200000`
- `Small`, `Large` — one for each non-default size

Use `Button.stories.jsx` as a template. There's no router involved, no internal SVG, no decorators — just three props.

#### Step 3 — Make a feature change, designed in Storybook _(~10 min)_

Now add a feature to `PriceTag`: **when the price is greater than `$2,000,000`, the price text should be rendered in the accent gold color (`var(--color-accent)`)**, as a subtle premium indicator. Prices at or below that should look exactly the same as before.

**Use your `Estate` story to design this.** Don't open the app. Don't navigate to a property detail. Just edit `PriceTag.module.css` (and `.jsx` if needed), save, and watch Storybook update.

When you're done, _then_ open `localhost:5173` and confirm the change appears correctly on Listings (Ravenscroft Estate at \$2.8M, Forgotten Penthouse at \$3.2M, Iron Gate Mansion is _just under_ at \$1.85M and should look unchanged) and on their detail pages.

**Track this:**

- ⏱ How long did Step 3 take, compared to your `GhostBadge` change in Part 1?
- 🔁 How many times did you switch between the editor and the browser?
- 🤔 Where would Storybook have saved you time in Part 1?

---

### Bonus Challenges _(if you finish early)_

Pick any of these — they get progressively harder. You don't have to do them in order.

#### 🥉 Challenge 1 — Cover an existing component with stories

Pick any component _without_ a story file (`HauntingRating`, `GhostBadge`, `AgentCard`, `GhostCard`, `WitnessQuote`, `PageHeader`, `Footer`, `Navbar`) and write its `*.stories.jsx`. Cover every prop variant you can think of, including edge cases:

- `HauntingRating` with `rating={0}` all the way up to `rating={5}`, plus `showLabel`, plus all three sizes
- `GhostBadge` with each of the six `type` values, plus both sizes
- `AgentCard` with `compact={true}` and `compact={false}`

A good rule of thumb: **if a prop has a finite set of values, you should have a story for each value.**

#### 🥈 Challenge 2 — Write stories for `PropertyCard` (and learn _decorators_)

`PropertyCard` is the trickiest component in the app to write a story for, because it uses `<Link>` from `react-router-dom`. If you try the obvious thing, Storybook will throw a runtime error: `useNavigate() may be used only in the context of a <Router> component`.

The fix is a Storybook concept called a **decorator** — a function that wraps every story in some context. In your story file:

```jsx
import { MemoryRouter } from 'react-router-dom'
import PropertyCard from './PropertyCard'

export default {
  title: 'Components/PropertyCard',
  component: PropertyCard,
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}
```

Now write at least these stories (you can pull sample data from `src/data/properties.js` or hand-build a property object):

- `Default` — a typical property
- `Catastrophic` — `hauntingRating: 5`
- `Friendly` — `primaryHaunting: 'friendly'`
- `NonNegotiable` — `negotiable: false`

> Decorators are how you handle anything that needs context: routers, theme providers, auth, redux. Memorize the pattern — you'll use it constantly.

#### 🥈 Challenge 3 — Add a new haunting type, end-to-end

We currently support six ghost types: `poltergeist`, `wraith`, `friendly`, `banshee`, `demon`, `shade`. Add a seventh — your choice. Suggestions: `wendigo`, `revenant`, `doppelganger`, `kelpie`, `imp`.

To do this, you'll need to touch:

1. `GhostBadge.jsx` — add the label
2. `GhostBadge.module.css` — add a color variant (`.type-yourtype`)
3. Its story file — add a `YourType` story
4. `src/data/ghosts.js` — assign the new type to a ghost
5. `src/data/properties.js` — set `primaryHaunting` of one property to the new type
6. `Listings` and `Ghosts` page filters — add the new type to the filter list

Notice how Storybook makes step 3 trivial — you can verify the new variant looks right in seconds, _before_ you wire it into any data or pages.

#### 🥇 Challenge 4 — Build a brand new component from scratch

Build a new component, with its own folder, styles, and stories file, and use it somewhere in the app. Pick **one** of these (or pitch your own):

**`AmenityTag`** _(easiest)_ — a small pill-shaped tag for property features. Props: `icon` (optional), `label`, `tone` (`'default' | 'warning' | 'reassuring'`). Use it in `PropertyDetail` to show amenities like:

> ✦ Original fixtures · ⚠ Sealed sun room · 🕯 Recently consecrated

**`OpenHouseBadge`** _(medium)_ — a date/time badge advertising an upcoming viewing. Props: `date` (Date or ISO string), `startTime`, `endTime`, `byAppointmentOnly` (boolean). Use it on a few `PropertyCard`s in the Listings page (you'll need to add `openHouse` data to some properties).

**`HauntingTimeline`** _(hard)_ — a vertical timeline of incidents for a property. Each entry shows date + description + severity. Props: an array of `{ date, description, severity }`. Use it in `PropertyDetail` instead of (or in addition to) the current `Disclosed Incidents` list. You'll need to add timestamped incidents to one or two properties.

**Requirements regardless of which you pick:**

- Live in `src/components/YourComponent/` with the standard four files (`.jsx`, `.module.css`, `.stories.jsx`, `index.js`)
- Have at least 3 stories covering different prop combinations
- Be actually used somewhere in the app
- Match the existing visual style (use the design tokens in `src/styles/global.css` — never hardcode colors)
- Follow the codebase conventions (no semicolons, CSS modules, plain JS)

---

## Notes on the codebase

- **No semicolons.** Match the existing style.
- **CSS Modules.** Class names get scoped automatically — `import styles from './Foo.module.css'` and use `styles.className`.
- **Plain JS, no TypeScript.**
- **React Router v7.** Routes are declared in `src/App.jsx`.
- **Mock images** are hardcoded Unsplash URLs in `src/data/properties.js`. If any 404, swap with another Unsplash photo URL.
