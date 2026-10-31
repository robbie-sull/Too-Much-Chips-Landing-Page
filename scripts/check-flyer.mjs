import { chromium } from 'playwright';
import assert from 'node:assert/strict';

// Start the site (npm run dev), then: npm run flyer:check
const base = process.env.FLYER_BASE_URL || 'http://localhost:5173/';
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : { channel: 'chrome' },
);
try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 1200 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base);
  await page.getByTestId('link-footer-flyer').waitFor();
  assert.equal(await page.getByTestId('link-footer-flyer').getAttribute('href'), new URL('flyer', base).pathname);
  assert.match(await page.locator('h1').innerText(), /LESS[\s\S]*MORE[\s\S]*CHIPS/);
  for (const flavor of ['bbq', 'korean-spice']) {
    assert.match(await page.getByTestId(`text-price-${flavor}`).innerText(), /\$3\.50/);
  }
  // The isolated flyer font/print CSS should not load on the landing page.
  assert.equal(await page.evaluate(() => [...document.styleSheets].some(s => {
    try { return [...s.cssRules].some(r => r.cssText.includes('Flyer Syne')); } catch { return false; }
  })), false);
  await page.getByTestId('link-footer-flyer').click();
  await page.getByTestId('flyer-sheet').waitFor();
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.getByTestId('link-flyer-drop').getAttribute('href'), 'https://toomuchchips.com/?ref=flyer#drop');
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByTestId('link-flyer-pdf').click(),
  ]);
  assert.equal(download.suggestedFilename(), 'too-much-chips-flyer.pdf');
  assert.equal(await download.failure(), null);
  const response = await page.request.get(new URL('too-much-chips-flyer.pdf', base).href);
  assert.equal(response.status(), 200);
  assert.match(response.headers()['content-type'], /application\/pdf/);
  assert.equal((await response.body()).subarray(0, 4).toString(), '%PDF');
  await page.evaluate(() => { window.print = () => { window.__printCalled = true; }; });
  await page.getByTestId('button-flyer-print').click();
  await page.waitForFunction(() => window.__printCalled === true);
  for (const width of [375, 640]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(150);
    const geometry = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      titleWidth: document.querySelector('.fl-hero h1').scrollWidth,
      titleBox: document.querySelector('.fl-hero h1').clientWidth,
      cardColumns: getComputedStyle(document.querySelector('.fl-card')).gridTemplateColumns,
    }));
    assert.equal(geometry.overflow, false, `Mobile viewport ${width} overflows`);
    assert.ok(geometry.titleWidth <= geometry.titleBox, 'Headline clipped');
    assert.equal(geometry.cardColumns.split(' ').length, 2, 'Mobile preview changed packaging layout');
  }
  await page.emulateMedia({ media: 'print' });
  assert.equal(await page.locator('.flyer-controls').isVisible(), false);
  assert.equal(await page.locator('.flyer-print-tip').isVisible(), false);
  assert.equal(await page.getByTestId('flyer-sheet').evaluate(e => e.getBoundingClientRect().width), 816);
  assert.deepEqual(errors, []);
  console.log('PASS: landing-page prices, flyer navigation, real PDF download, drop-list link, print action, mobile proportions, no browser errors');
} finally {
  await browser.close();
}
