# Table Topics

Impromptu speaking practice: random prompts and a simple timer with zone feedback.

## About

Use the question-mark help icon in the top-right corner to open the About dialog. It explains what Table Topics is, that the app does not record audio, tips for structuring answers (including OREO), the size of the prompt database, and a short “Who built this?” note at the bottom (with a link to [Speak Up Cambridge](https://speakupcambridge.wordpress.com/) — same color as body text, underlined). Press Escape or click the backdrop or × to close.

While you are speaking (after **Begin**), a short line under the **Stop** button reads: *Nothing is recorded — only your time is measured.* (The footnote uses the class `speaking-footnote` because some cosmetic filter lists hide elements whose class names contain `privacy`.)

## Favicon

The tab icon is `public/favicon.png`. Vite serves files in `public/` at the site root (`/favicon.png`). Replace that file and rebuild as needed.

## Analytics (Vercel)

The app uses [Vercel Web Analytics](https://vercel.com/docs/analytics) via `@vercel/analytics`: `<Analytics />` is mounted in `src/main.jsx`. Enable Web Analytics on the Vercel project, deploy, then open the live URL; page views appear in the project’s Analytics tab (give it a minute if nothing shows at first). Local `npm run dev` does not send production analytics. Use an ad blocker–free browser when verifying.

## Google Analytics 4 (optional)

Custom events and engagement timing use [GA4](https://support.google.com/analytics/answer/9304153) via gtag, implemented in `src/analytics.js` and wired from `table-topics.jsx`.

1. In [Google Analytics](https://analytics.google.com/), create or open a property, add a **Web** data stream for your site URL, and copy the **Measurement ID** (`G-XXXXXXXXXX`).
2. Set `VITE_GA_MEASUREMENT_ID` to that value—for local dev, add a `.env` file (see `.env.example`). On Vercel (or similar), define the same variable in the project Environment Variables and redeploy.
3. If the variable is empty or unset, no Google script loads and `trackEvent` calls are no-ops.

Reported events (see **Reports → Engagement → Events** in GA4):

| Event name | When it fires |
|------------|----------------|
| *(automatic)* `page_view` | First load after gtag config |
| `show_question` | User taps **Show Question** |
| `about_open` | User taps the help / question-mark (About) control |
| `exercise_begin` | User taps **Begin** after seeing a prompt |
| `exercise_complete` | User taps **Stop** after speaking; includes `duration_ms` (milliseconds) and `time_bucket` (`under` / `okay` / `perfect` / `over`, same zones as the timer UI) |
| `site_leave` | Tab or window is closed or the user navigates away; sent with `transport_type: beacon` when possible. Includes `linger_seconds` (rounded) and `engagement_time_msec` (time since page load). |

**Tip:** In GA4, use **Configure → Custom definitions** to register event parameters you care about (`linger_seconds`, `duration_ms`, `time_bucket`) as custom dimensions for easier exploration. Event counts for `exercise_begin` vs `exercise_complete` show how often people start vs finish a full run.

Privacy: `anonymize_ip` is enabled in the gtag config. Combine with your own privacy policy / consent strategy if you serve users in regions that require it.

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## Prompts

All impromptu questions live in `table-topics-questions.js`. Edit the `PROMPTS` string array to add or change copy. The module also exports `TABLE_TOPIC_QUESTIONS` (frozen `{ id, text }` objects with stable numeric ids like `tt-001`) and `QUESTION_TEXTS` for the picker.

## Session History

The Session History panel (`HistoryPanel`) is implemented but hidden by default. To show it, set `SHOW_SESSION_HISTORY` to `true` at the top of `table-topics.jsx`. History state still updates while the panel is hidden.

## Layout

The app shell places the help control in a fixed top-right region using the viewport inset `--app-chrome-corner` (default 16px) and inner padding `--app-chrome-pad` (default 8px). The page shell uses a centered `.main-area` column (header, card, zone legend) with a fixed-height main card (`460px`) for consistent vertical room. On viewports `768px` wide or narrower, the main heading (`.header-title`, “table topics”) uses `calc(60px * 0.8)`—80% of the desktop `60px` size. The card uses flexbox (`justify-content: safe center`) so each state’s block—*ready* (prompt + Show Question), *revealed* (Your Topic + Begin), *speaking*, and *done*—is vertically centered when it fits; if the content is taller than the card (for example a long prompt plus the speaking UI and footnote under **Stop**), the card scrolls (`overflow-y: auto`) instead of clipping the bottom. The *done* results view omits the topic label to save vertical space, showing the prompt, timer, and feedback only.

## Colors

Neutrals and the primary button are defined as CSS custom properties on `:root` in `table-topics.css`:

- `--color-bg`, `--color-text` — page background and primary copy
- `--color-text-secondary` — labels and secondary text (single mid grey)
- `--color-text-muted` — timers, tertiary UI, and borders on subtle controls (replaces separate `#666` / `#999` shades)
- `--color-border` — light rules and dividers (card footer, timer track, history rows)
- `--color-primary`, `--color-on-primary` — filled primary button

Timer tick lines and the stop-button pulse ring use `color-mix()` from those tokens so extra one-off greys are not needed. Zone accent colors for the timer bar are still chosen in `table-topics.jsx` (`zoneColor`).
