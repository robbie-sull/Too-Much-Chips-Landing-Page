# Too Much Chips

Landing page for a kid-run chip business.
Vite + React 19, plain CSS plus Tailwind v4 base styles, hosted on Vercel from
`main`. Ordering runs as monthly "drops": the site collects a waitlist and
orders happen when a drop opens. There is no checkout on the site.

## Commands

- `npm run dev`: dev server at http://localhost:5173
- `npm run build`: `tsc --noEmit` then `vite build` into `dist/`
- `npm run flyer:pdf` / `npm run flyer:check`: need the dev server running and Google Chrome installed

## Product facts

- The name is "Too Much Chips": capital T, M, C, with the S. All-caps wordmarks are intentional.
- Bags are $3.50. Flavors are BBQ and Korean Spice.
- Drop settings (`NEXT_DROP`, `WAITLIST_URL`, `FLYER_URL`) live in `src/config/drop.ts`.
- Signups POST form-encoded to a Google Apps Script web app (`waitlist/Code.gs`),
  which appends to a Sheet and emails the Sheet owner. Keep the request a
  "simple" CORS request (no custom headers, no JSON body) or Apps Script breaks.

## Design direction (approved by the owners, keep it)

- Preserve the overall typography (Syne, DM Sans, DM Mono), colors (ink `#232849`,
  paper `#f5f0d9`, tomato `#ed5538`, lime `#d8e83e`), copy voice and layout. Make
  targeted changes, not redesigns.
- The angled, brim-full pouch and the coordinated BBQ/Korean Spice packaging were
  called "near perfection". Further bag changes should be small refinements.
- Seasoning on chips must look scattered naturally, never in rows, stripes or
  grids. A repeating seasoning pattern "really annoys some people".
- Bag graphics should look like snack packaging, not fabric. Prefer
  flavor-specific chip imagery over repeating decorative patterns.
- The printed flyer's layout, artwork and palette are approved. Copy tweaks only.

## Flyer PDF gotchas

- The flyer uses static font files (`src/assets/fonts/*-400/500/800`) scoped to
  `/flyer`. Variable fonts exported as unnamed Type3 glyphs, so don't swap them
  back and don't load the flyer fonts on the main page.
- Verify the actual PDF (page count, embedded fonts, QR target) rather than
  trusting the browser preview. `scripts/verify-flyer.py` does this if
  `pymupdf`, `Pillow` and `zxing-cpp` are installed.
