# Presentation QR regression check

From the workspace root:

```sh
pnpm --filter @workspace/too-much-chips-slideshow run check:presentation-qr
pnpm --filter @workspace/too-much-chips-slideshow run test:presentation-qr
```

The first command starts and stops an isolated Vite preview, renders the final
slide at 1920×1080, and independently decodes the rendered screenshot with jsQR.
It checks the exact `https://too-much-chips-landing-page.replit.app/` destination,
including the trailing slash, and the alternative link's href and visible text.
It also checks that the QR image is fully within the slide and that the slide
does not throw browser exceptions. It **does not regenerate** the QR SVG first:
an outdated or damaged committed asset must fail rather than be silently fixed.

The second command additionally proves that a broken QR, a decodable QR without
the trailing slash, and an alternative link without the slash are rejected.
Negative controls affect only that browser tab, never the slide files.

To check an already running deck instead:

```sh
pnpm --filter @workspace/too-much-chips-slideshow run check:presentation-qr --url http://127.0.0.1:80/too-much-chips-slideshow/
```

Chromium uses Replit's `/repl/tools/bin/chromium` when present. Elsewhere, install
Playwright's Chromium with `pnpm --filter @workspace/too-much-chips-slideshow exec playwright install chromium`,
or set `CHROMIUM_PATH` to a compatible existing browser. Screenshots are written
to a reported temporary directory, not to Git or the deployed presentation.

This is presentation-only. It neither imports the flyer tests nor checks Square
checkout links, payment amounts, or the website's current availability.
