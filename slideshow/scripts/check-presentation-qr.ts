import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, type Page } from 'playwright';
import { createServer, type ViteDevServer } from 'vite';
import { PNG } from 'pngjs';
import jsQR from 'jsqr';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { QRCodeSVG } from 'qrcode.react';

// This is deliberately independent of the asset generator and merchant checkout.
// Do not normalize the URL: losing the trailing slash must fail the check.
const EXPECTED_WEBSITE = 'https://too-much-chips-landing-page.replit.app/';
const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
assert(args.every((arg, i) => arg === '--self-test' || arg === '--url' || args[i - 1] === '--url'),
  'Usage: check:presentation-qr [--url <running-deck-base-url>] [--self-test]');
const urlIndex = args.indexOf('--url');
const suppliedUrl = urlIndex === -1 ? undefined : args[urlIndex + 1];
assert(urlIndex === -1 || (suppliedUrl && !suppliedUrl.startsWith('--')), '--url requires a base URL');
const output = await mkdtemp(path.join(tmpdir(), 'presentation-qr-'));
let server: ViteDevServer | undefined;
let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;

async function verifyFinalSlide(page: Page, label: string) {
  const slide = page.locator('main.deck-frame').filter({
    has: page.getByRole('heading', { name: 'Thank You', exact: true }),
  });
  await slide.waitFor({ state: 'visible' });
  const qrImage = slide.locator('img');
  assert.equal(await qrImage.count(), 1, 'Final slide must have exactly one QR image');
  await qrImage.evaluate(async (image) => {
    await (image as HTMLImageElement).decode();
    await document.fonts.ready;
  });
  const bounds = await qrImage.boundingBox();
  const viewport = page.viewportSize()!;
  assert(bounds && bounds.width >= 120 && bounds.height >= 120 &&
    bounds.x >= 0 && bounds.y >= 0 &&
    bounds.x + bounds.width <= viewport.width &&
    bounds.y + bounds.height <= viewport.height,
  'QR must be visible, reasonably sized, and fully inside the final slide');

  // Decode the pixels in the actual rendered slide, not the SVG source or its metadata.
  const screenshot = await page.screenshot({ path: path.join(output, `${label}.png`), animations: 'disabled' });
  const png = PNG.sync.read(screenshot);
  const decoded = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  assert(decoded, 'Rendered final-slide QR must be independently decodable');
  assert.equal(decoded.data, EXPECTED_WEBSITE, 'QR must encode the exact website URL including trailing slash');

  const alternative = slide.locator('a.deck-link');
  assert.equal(await alternative.count(), 1, 'Final slide must have exactly one alternative website link');
  assert(await alternative.isVisible(), 'Alternative website link must be visible');
  assert.equal(await alternative.getAttribute('href'), EXPECTED_WEBSITE, 'Alternative link must match the exact QR destination');
  assert.equal((await alternative.innerText()).trim(), EXPECTED_WEBSITE, 'Displayed alternative URL must match the destination');
  console.log(`PASS ${label}: rendered QR and alternative link match ${EXPECTED_WEBSITE}`);
}

try {
  const manifest = JSON.parse(await readFile(path.join(root, 'src/data/slides-manifest.json'), 'utf8')) as
    Array<{ position: number; filepath: string }>;
  const finalSlide = [...manifest].sort((a, b) => a.position - b.position).at(-1);
  assert(finalSlide?.filepath === 'src/pages/slides/ThankYou.tsx', 'ThankYou must remain the final slide');

  let baseUrl = suppliedUrl;
  if (!baseUrl) {
    // Only this test process gets these defaults; workspace configuration is untouched.
    process.env.PORT ||= '4178';
    process.env.BASE_PATH ||= '/too-much-chips-slideshow/';
    server = await createServer({
      root,
      configFile: path.join(root, 'vite.config.ts'),
      server: { host: '127.0.0.1', port: 0, open: false },
      clearScreen: false,
    });
    await server.listen();
    const address = server.httpServer?.address();
    assert(address && typeof address !== 'string', 'Test preview did not open a port');
    baseUrl = `http://127.0.0.1:${address.port}${server.config.base}`;
  }
  const deckBase = new URL(baseUrl!.endsWith('/') ? baseUrl! : `${baseUrl}/`);
  const slideUrl = new URL(`slide${finalSlide.position}`, deckBase).href;
  const bundledChromium = '/repl/tools/bin/chromium';
  const executablePath = process.env.CHROMIUM_PATH ||
    (existsSync(bundledChromium) ? bundledChromium : undefined);
  browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(slideUrl, { waitUntil: 'networkidle' });
  await verifyFinalSlide(page, 'final-slide');
  assert.deepEqual(errors, [], 'Final slide must render without browser exceptions');

  if (args.includes('--self-test')) {
    // Negative controls prove the check catches broken graphics and exact-link regressions.
    await page.locator('a.deck-link').evaluate((link) => {
      link.setAttribute('href', 'https://too-much-chips-landing-page.replit.app');
    });
    await assert.rejects(() => verifyFinalSlide(page, 'bad-alternative-link'), /Alternative link must match/);
    console.log('PASS negative control: alternative link missing slash is rejected');
    await page.goto(slideUrl, { waitUntil: 'networkidle' });
    const setQr = async (svg: string) => {
      await page.locator('main.deck-frame').filter({
        has: page.getByRole('heading', { name: 'Thank You', exact: true }),
      }).locator('img').evaluate((image, source) => {
        image.setAttribute('src', `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`);
      }, svg);
    };
    const wrongQr = renderToStaticMarkup(createElement(QRCodeSVG, {
      value: EXPECTED_WEBSITE.slice(0, -1), size: 800, level: 'M', marginSize: 4,
    })).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
    await setQr(wrongQr);
    await assert.rejects(() => verifyFinalSlide(page, 'qr-missing-slash'), /QR must encode the exact/);
    console.log('PASS negative control: decodable QR missing trailing slash is rejected');
    await setQr('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800"><rect width="800" height="800" fill="white"/></svg>');
    await assert.rejects(() => verifyFinalSlide(page, 'blank-qr'), /must be independently decodable/);
    console.log('PASS negative control: blank QR is rejected');
  }
  console.log(`Presentation QR check passed. Screenshots: ${output}`);
} catch (error) {
  console.error(`Presentation QR check failed. Screenshots (if captured): ${output}`);
  throw error;
} finally {
  await browser?.close();
  await server?.close();
}
