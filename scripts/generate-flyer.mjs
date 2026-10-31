// Run against the managed preview: pnpm --filter @workspace/too-much-chips run flyer:pdf
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const base = process.env.FLYER_BASE_URL || `https://${process.env.REPLIT_DEV_DOMAIN}/`;
if (!process.env.FLYER_BASE_URL && !process.env.REPLIT_DEV_DOMAIN) {
  throw new Error('Set FLYER_BASE_URL to the running app URL (including its base path).');
}
const output = fileURLToPath(new URL('../public/too-much-chips-flyer.pdf', import.meta.url));
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/repl/tools/bin/chromium',
  args: ['--no-sandbox'],
});
try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 1200 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(new URL('flyer', base).href);
  await page.getByTestId('flyer-sheet').waitFor();
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.getByTestId('link-flyer-checkout').getAttribute('href'), 'https://square.link/u/YdzZqfzg');
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
