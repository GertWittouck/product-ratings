# Feefo Product Rating

My solution to Part 2 (UI Assessment) of the Feefo full-stack technical assessment. It is a React + TypeScript version of the Feefo "Product Rating" card: the overall score, a row of stars and a breakdown of reviews per star level.

The rating data comes from a small mock backend ([json-server](https://github.com/typicode/json-server)), so the app loads its data the way it would from a real API.

## Getting started

### Prerequisites

- Node.js 20.19+ or 22.12+ (needed by Vite 8). I developed it on Node 22.
- npm

### Install

```bash
npm install
```

### Run the app

The app needs two processes, so open two terminals:

```bash
# Terminal 1: start the mock API on http://localhost:3001
npm run api

# Terminal 2: start the Vite dev server
npm run dev
```

Then open the URL that Vite prints, usually http://localhost:5173.

The API serves the data in [`db.json`](db.json) at `GET /productRating`. If you change the counts in that file, the score, the label ("Excellent", "Very good" and so on) and the bars all update after a page refresh.

To point the app at a different API, copy `.env.example` to `.env.local` and change `VITE_API_URL`.

### Other commands

| Command              | What it does                                       |
| -------------------- | -------------------------------------------------- |
| `npm test`           | Runs all tests once (Vitest + Testing Library)     |
| `npm run test:watch` | Runs the tests in watch mode                       |
| `npm run lint`       | Runs ESLint                                        |
| `npm run build`      | Type-checks and builds a production bundle         |
| `npm run preview`    | Serves the production build locally                |

The tests mock the API, so `npm run api` doesn't need to be running for them.

## Project structure

```
db.json                         mock backend data served by json-server
src/
  App.tsx                       loads the data and shows loading / error / the card
  index.css                     global styles: font, colour variables, .visually-hidden helper
  types/rating.ts               TypeScript types for the rating data
  api/getProductRating.ts       fetch call to the backend
  hooks/useProductRating.ts     React hook that loads the data and tracks loading / error state
  utils/rating.ts               pure functions: total, average, label, percentages, star fill
  components/
    ProductRating/              the card; puts the pieces below together
    StarRating/                 row of star tiles for a rating such as 4.6
    StarTile/                   one square tile, partly filled when needed
    StarIcon/                   the star SVG, reused in the tiles and in the breakdown
    RatingBreakdown/            the list of bars, highest star level first
    RatingBar/                  one row of the breakdown
    FeefoLogo/                  the feefo wordmark
```

Each component has its own folder with the component, its CSS Module and its test (where a test is useful).

## Approach and decisions

### Keeping it simple
I kept the code deliberately plain:
- function components with typed props
- one small custom hook for data loading
- logic in plain functions that are easy to unit test

There is no state-management library, no data-fetching library and no UI kit, because a single widget doesn't need them.

### Component boundaries
- **`ProductRating`** is purely presentational. It receives a `RatingSummary` and renders it, and doesn't know where the data came from. Fetching lives in `api/` and `hooks/`, and `App` puts the two together.
- **Smaller components** (`StarRating`, `StarTile`, `RatingBar` and so on) only take the values they need, such as `rating`, `fill` or `count`. That makes them reusable, for example a `StarRating` on a product listing.
- **The calculations** live in `utils/rating.ts`, outside the components, so they can be tested without rendering anything.

### Data model
The API only returns the **count per star level**. The average (4.6), the total and the label ("Excellent") are **calculated** from those counts rather than stored, so they can't get out of sync with the breakdown. The sample data gives 5677 / 1232 = 4.61, which rounds to 4.6 as in the design.

### Styling: CSS Modules
I chose CSS Modules because:
- Vite supports them out of the box, so there's nothing extra to install.
- They are plain CSS, so anyone can read them.
- Class names are scoped to each component, so styles don't leak between components.

Shared values (colours and the font) are CSS custom properties in `index.css`.

### Responsiveness
- The card is `width: 100%` with a `max-width`, so it shrinks on narrow screens.
- Padding, tile size and heading size use `clamp()`, so they scale smoothly with the viewport.
- Breakdown rows use CSS grid, so the bar track takes up whatever width is left.

I checked it at desktop width and at 320px.

### Accessibility
- The card is a `<section>` labelled by its `<h2>` heading, so it appears as a landmark region.
- "Excellent" is written in normal case and shown in capitals with CSS (`text-transform`), so screen readers read it as a word instead of spelling it out.
- The star tiles are hidden from screen readers (`aria-hidden`), because the visible text "4.6 out of 5" already says the same thing. This avoids the rating being announced twice.
- The breakdown is a real list (`<ul>`) with an accessible name. Each row has visually hidden text such as "5 stars: 952 reviews (77%)", and the visual bar, icon and number are hidden from screen readers. A screen reader hears one clear sentence per row instead of "5, 952".
- The logo SVG has `role="img"` and `aria-label="Feefo"`.
- The loading message uses `role="status"` and the error message uses `role="alert"`, so both are announced.
- Text colours were chosen to meet WCAG AA contrast on white.

### Interactivity
The design is a static display widget, so I didn't invent interactions that aren't in the design. The behaviour that *is* tested is:
- data loading, with the loading, success and error states
- the calculations
- the rendering of different data, for example a lower score shows "Good" instead of "Excellent"

### Testing
- I used Vitest because it shares Vite's config, plus React Testing Library and jest-dom.
- Tests query the page the way a user would, mostly by role and text, for example `getByRole('heading', { name: 'Excellent' })`.
- The utility functions have their own unit tests, including edge cases such as zero reviews (no division by zero).

### Libraries added
| Library                                   | Why                                                   |
| ----------------------------------------- | ----------------------------------------------------- |
| `vitest`, `jsdom`                          | Test runner and browser-like environment              |
| `@testing-library/react`, `jest-dom`       | Component testing and readable assertions             |
| `json-server`                              | Mock REST API, so the app fetches its data like it would in production |

All of them are development dependencies. The production bundle only contains React.

## What I would do next

- Add a skeleton placeholder instead of the loading text, and a "try again" button on error.
- Support a "No reviews yet" state when the total is 0.
- Add Storybook to show the components on their own with different data.
- Add visual regression tests (for example Playwright screenshots) to catch styling changes.
- Add translations for the labels ("Excellent", "out of" and so on).
- Replace the hand-made SVG wordmark with the official Feefo logo asset.
