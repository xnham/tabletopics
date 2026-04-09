# Table Topics

Impromptu speaking practice: random prompts and a simple timer with zone feedback.

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## Session History

The Session History panel (`HistoryPanel`) is implemented but hidden by default. To show it, set `SHOW_SESSION_HISTORY` to `true` at the top of `table-topics.jsx`. History state still updates while the panel is hidden.

## Layout

The page shell uses a centered `.main-area` column (header, card, zone legend) with a fixed-height main card (`460px`) for consistent vertical room. The card uses flexbox (`justify-content: center`) so each state’s block—*ready* (prompt + Show Question), *revealed* (Your Topic + Begin), *speaking*, and *done*—is vertically centered between the card’s top and bottom rules. The *done* results view omits the topic label to save vertical space, showing the prompt, timer, and feedback only.

## Colors

Neutrals and the primary button are defined as CSS custom properties on `:root` in `table-topics.css`:

- `--color-bg`, `--color-text` — page background and primary copy
- `--color-text-secondary` — labels and secondary text (single mid grey)
- `--color-text-muted` — timers, tertiary UI, and borders on subtle controls (replaces separate `#666` / `#999` shades)
- `--color-border` — light rules and dividers (card footer, timer track, history rows)
- `--color-primary`, `--color-on-primary` — filled primary button

Timer tick lines and the stop-button pulse ring use `color-mix()` from those tokens so extra one-off greys are not needed. Zone accent colors for the timer bar are still chosen in `table-topics.jsx` (`zoneColor`).
