---
name: Flyer printing
description: Non-obvious PDF font and preview constraints for Too Much Chips printed materials.
---

Use static font instances for branded print PDFs; keep fonts self-hosted and scoped to the flyer rather than changing landing-page typography.

**Why:** In this environment Chromium exported the variable Syne and DM Sans fonts as unnamed Type3 glyph fonts. Static instances retain named, embedded fonts and selectable text.

**How to apply:** When changing printed materials, verify embedded fonts in the generated PDF instead of trusting the browser preview. Preserve the website's existing font setup.

Export only the flyer content, not the surrounding development preview.

**Why:** The development preview can inject a fixed sharing banner and body padding, which produced a second blank PDF page and displaced the artwork despite correct Letter dimensions.

**How to apply:** Verify page count and PDF content from the actual export; a screenshot alone does not establish print correctness.

Preserve the approved flyer design when making copy refinements.

**Why:** The user said “love this” and asked only to change the scan instruction to “scan to pre order now.”

**How to apply:** Keep the existing layout, artwork, and palette unless the user requests a redesign.
