/**
 * Build-time asset preparation only. The finished presentation serves its own
 * SVGs and screenshot and has no runtime imports from the storefront.
 */
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { writeFile, mkdir } from 'node:fs/promises';

const out = new URL('../public/', import.meta.url);
await mkdir(out, { recursive: true });
const qr = renderToStaticMarkup(
  createElement(QRCodeSVG, {
    value: 'https://too-much-chips-landing-page.replit.app/',
    size: 800, marginSize: 4, level: 'M', fgColor: '#232849', bgColor: '#ffffff',
  }),
);
await writeFile(new URL('website-qr.svg', out), qr.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" '));
