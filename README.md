# Table Topics

Impromptu speaking practice: random prompts and a simple timer with zone feedback.

## About

Use the question-mark help icon in the top-right corner to open the About dialog. It explains what Table Topics is, that the app does not record audio, tips for structuring answers (including OREO), and the size of the prompt database. Press Escape or click the backdrop or × to close.

## Favicon

The tab icon is `public/favicon.png`. Vite serves files in `public/` at the site root (`/favicon.png`). Replace that file and rebuild as needed.

## Analytics (Vercel)

The app uses [Vercel Web Analytics](https://vercel.com/docs/analytics) via `@vercel/analytics`: `<Analytics />` is mounted in `src/main.jsx`. Enable Web Analytics on the Vercel project, deploy, then open the live URL; page views appear in the project’s Analytics tab (give it a minute if nothing shows at first). Local `npm run dev` does not send production analytics. Use an ad blocker–free browser when verifying.

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## Prompts

All impromptu questions live in `table-topics-questions.js`. Edit the `PROMPTS` string array to add or change copy. The module also exports `TABLE_TOPIC_QUESTIONS` (frozen `{ id, text }` objects with stable numeric ids like `tt-001`) and `QUESTION_TEXTS` for the picker.

## Session History

The Session History panel (`HistoryPanel`) is implemented but hidden by default. To show it, set `SHOW_SESSION_HISTORY` to `true` at the top of `table-topics.jsx`. History state still updates while the panel is hidden.

## Layout

The app shell places the help control in a fixed top-right region using the viewport inset `--app-chrome-corner` (default 16px) and inner padding `--app-chrome-pad` (default 8px). The page shell uses a centered `.main-area` column (header, card, zone legend) with a fixed-height main card (`460px`) for consistent vertical room. On viewports `768px` wide or narrower, the main heading (`.header-title`, “table topics”) uses `calc(60px * 0.8)`—80% of the desktop `60px` size. The card uses flexbox (`justify-content: center`) so each state’s block—*ready* (prompt + Show Question), *revealed* (Your Topic + Begin), *speaking*, and *done*—is vertically centered between the card’s top and bottom rules. The *done* results view omits the topic label to save vertical space, showing the prompt, timer, and feedback only.

## Colors

Neutrals and the primary button are defined as CSS custom properties on `:root` in `table-topics.css`:

- `--color-bg`, `--color-text` — page background and primary copy
- `--color-text-secondary` — labels and secondary text (single mid grey)
- `--color-text-muted` — timers, tertiary UI, and borders on subtle controls (replaces separate `#666` / `#999` shades)
- `--color-border` — light rules and dividers (card footer, timer track, history rows)
- `--color-primary`, `--color-on-primary` — filled primary button

Timer tick lines and the stop-button pulse ring use `color-mix()` from those tokens so extra one-off greys are not needed. Zone accent colors for the timer bar are still chosen in `table-topics.jsx` (`zoneColor`).
