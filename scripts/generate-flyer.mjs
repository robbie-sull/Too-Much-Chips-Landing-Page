// Start the site (npm run dev), then: FLYER_BASE_URL=http://localhost:5173/ npm run flyer:pdf
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const base = process.env.FLYER_BASE_URL || 'http://localhost:5173/';
const output = fileURLToPath(new URL('../public/too-much-chips-flyer.pdf', import.meta.url));
// Uses the installed Google Chrome; set CHROMIUM_PATH to use a different browser.
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : { channel: 'chrome' },
);
try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 1200 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(new URL('flyer', base).href);
  await page.getByTestId('flyer-sheet').waitFor();
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.getByTestId('link-flyer-drop').getAttribute('href'), 'https://toomuchchips.com/?ref=flyer#drop');
  await page.emulateMedia({ media: 'print' });
  const sizes = await page.evaluate(() => {
    const sheet = document.querySelector('.flyer-sheet');
    const qr = document.querySelector('.fl-qr');
    const inner = document.querySelector('.fl-inner');
    return { width: sheet.clientWidth, height: sheet.clientHeight, qr: qr.clientWidth,
      contentHeight: inner.scrollHeight, availableHeight: inner.clientHeight,
      fonts: ['800 60px "Flyer Syne"', '400 16px "Flyer DM Sans"', '400 14px "Flyer DM Mono"'].every(font => document.fonts.check(font)) };
  });
  assert.deepEqual([sizes.width, sizes.height], [816, 1056]);
  assert.ok(sizes.qr >= 120, 'QR must be at least 1.25 inches');
  assert.ok(sizes.contentHeight <= sizes.availableHeight, 'Flyer content is clipped');
  assert.ok(sizes.fonts, 'Flyer fonts have not loaded');
  await page.pdf({ path: output, format: 'Letter', preferCSSPageSize: true,
    printBackground: true, displayHeaderFooter: false, tagged: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 } });
  assert.deepEqual(errors, []);
  console.log(`Generated ${output}`, sizes);
} finally {
  await browser.close();
}
