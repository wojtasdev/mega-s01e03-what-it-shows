# support-kb — #4471 split into three

This repo is the deliverable for MEGA.dev Challenge S01E03 ("what it shows").

Support ticket **#4471** merged 412 reports and was marked `known`: "the parser reads dates
month-first, our tenants write the day first." Running the kb's own `causes.ts` logic against the
real export data shows that's only part of the story — #4471 is actually **three** separate
problems:

| problem | reports | tenants | issue |
| --- | --- | --- | --- |
| **parser** reads dates month-first for day-first tenants | 374 | 11 | [#1](https://github.com/wojtasdev/mega-s01e03-what-it-shows/issues/1) |
| **hint**: `booking-v3`'s on-screen hint tells day-first users to type month-first | 33 | 3 | [#2](https://github.com/wojtasdev/mega-s01e03-what-it-shows/issues/2) |
| **one-day move**: a timezone/day-boundary shift, not a date-order bug at all | 5 | 5 | [#3](https://github.com/wojtasdev/mega-s01e03-what-it-shows/issues/3) |

374 + 33 + 5 = 412 — the whole ticket.

## What's in this repo

- `README-kb-export.md` — the original export's own README, unchanged.
- `src/` — the `support-kb` export (`src/lib`, `src/routes`), as given, **plus**:
  - `src/routes/kb/incidents/4471-split/+page.svx` — the new kb page this Challenge asks for,
    written to the export's own conventions (signed frontmatter, numbers computed by components
    from `reports-4471.json`/`desk-notes.json`, not typed into prose).
- `package.json`, `svelte.config.js`, `vite.config.js`, `src/app.html`, `src/routes/+layout.svelte`
  — a minimal SvelteKit + mdsvex scaffold, added here because the export ships only `src/` and a
  README, not a buildable project. This is what makes the new page a real, running kb page instead
  of a description of one.
- `rendered/incidents-4471-split.html` — the new page as the kb will actually render it: the
  literal SSR output of `npm run dev` for `/kb/incidents/4471-split`, saved as a static snapshot so
  it can be read without running the project.

## Running it

```
npm install
npm run dev
# http://localhost:5173/kb/incidents/4471-split
# http://localhost:5173/kb  — index, lists every page including the new one
```

## Method

For each report merged into #4471, cause is derived from the tenant's locale and booking form
(`causeOf` in `src/lib/kb/causes.ts`), exactly as the kb does it on `/kb/incidents/4471` today. That
split already separates `parser` from `hint`. The third problem was already flagged, but not split
out: `src/lib/data/desk-notes.json`'s `oneDayMove` list names 5 report ids the desk read as a
one-day shift rather than a month/day swap — the existing `CauseTable` component already footnotes
this on the original page, it just never got a ticket. Reading those 5 reports' bodies confirms it:
they describe a one-day shift across timezones, not a transposed date.
