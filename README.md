# Too Much Chips

The website for Too Much Chips: more chips in the bag, more seasoning on the
chips. Live at [toomuchchips.com](https://toomuchchips.com).

It's a small React site built with Vite. Vercel builds and hosts it straight
from this repo: every push to `main` goes live in about a minute.

## Running a drop

Everything lives in [`src/config/drop.ts`](src/config/drop.ts):

- `NEXT_DROP` is the date shown on the site, e.g. `'Sat, Nov 15'`.
- `WAITLIST_URL` is where signups go (a Google Sheet that emails you).
  [`waitlist/README.md`](waitlist/README.md) covers the one-time setup and
  how to email everyone on drop day.

You can edit that file right on github.com (pencil icon → Commit changes) and
the site updates itself.

## Working on the site

Needs [Node.js](https://nodejs.org) 20.19 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check and build into dist/
```

The printable flyer is at `/flyer`. After changing it, regenerate the PDF with
the dev server running: `npm run flyer:pdf` (uses Google Chrome).

## What's where

- `src/App.tsx` is the landing page. `src/components/DropSection.tsx` is the
  drop list signup.
- `src/pages/Flyer.tsx` is the printable flyer. `public/too-much-chips-flyer.pdf`
  is its PDF.
- `waitlist/` is the Google Apps Script that stores signups.
- `slideshow/` is the class presentation from Replit, kept for reference. It
  isn't built or deployed.

This site was moved off Replit in October 2026. The original Replit project is
in the git history at commit `29f49a6`.
