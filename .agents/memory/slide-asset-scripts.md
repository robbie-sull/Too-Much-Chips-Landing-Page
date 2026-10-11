---
name: Standalone slide asset scripts
description: JSX runtime differences between Vite and standalone asset preparation.
---

Do not assume standalone TSX asset-preparation scripts inherit Vite's automatic JSX runtime. Use explicit React element construction or a verified standalone JSX setup.

**Why:** The slide scaffold preserves JSX in its TypeScript configuration; standalone execution compiled asset JSX to a React global that was absent, even though the same JSX works through Vite.

**How to apply:** When preparing artwork outside the running app, verify the standalone rendering path before relying on browser-only build configuration.
