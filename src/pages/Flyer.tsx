import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import FlavorChipArtwork from '../components/FlavorChipArtwork';
import { FLYER_URL } from '../config/drop';
import '../components/DropSection.css';
import './Flyer.css';

const BASE = import.meta.env.BASE_URL;
const PRODUCTS = [
  { id: 'bbq' as const, name: 'BBQ', tag: 'FLAVOR A', tone: 'order-tomato' },
  { id: 'korean-spice' as const, name: 'Korean Spice', tag: 'FLAVOR B', tone: 'order-lime' },
];

export default function Flyer() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    document.title = 'Too Much Chips — Printable Sales Flyer';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'BBQ and Korean Spice. $3.50 per bag. Download or print the Too Much Chips flyer and scan to join the monthly drop list.');
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', 'Too Much Chips — Printable Sales Flyer');
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', 'BBQ and Korean Spice. $3.50 per bag. Print, share, and scan to join the monthly drop list.');
    const fit = () => setScale(Math.min(1, (window.innerWidth - 24) / 816));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  const print = async () => {
    await document.fonts.ready;
    window.print();
  };
  return (
    <div className="flyer-page">
      <div className="flyer-controls">
        <a className="fc-btn" href={BASE} data-testid="link-flyer-home">Back to site</a>
        <a className="fc-btn" href={`${BASE}too-much-chips-flyer.pdf`} download data-testid="link-flyer-pdf">Download PDF</a>
        <button className="fc-btn fc-solid" onClick={print} data-testid="button-flyer-print">Print flyer</button>
      </div>
      <p className="flyer-print-tip">US Letter · Print at 100% with background graphics on and headers/footers off. The PDF is already set up for printing.</p>
      <div className="flyer-scaler" style={{ width: 816 * scale, height: 1056 * scale }}>
        <article className="flyer-sheet" data-testid="flyer-sheet" style={{ transform: `scale(${scale})` }}>
          <div className="fl-inner">
            <header className="fl-top">
              <span className="logo-lockup" aria-label="Too Much Chips">
                <span className="logo-mark"><span /></span>
                <span className="brand fl-wordmark">TOO MUCH CHIPS</span>
              </span>
              <span className="mono fl-top-note">THE BIG HONEST BAG · Nº 01</span>
            </header>
            <section className="fl-hero">
              <h1 className="brand">LESS BAG.<br /><em>MORE CHIPS.</em></h1>
              <p className="fl-lede">More actual chips in the bag. More seasoning on the chips. That is the whole idea.</p>
              <span className="fl-stamp mono">NO SAD<br />SNACKS</span>
            </section>
            <div className="fl-ticker brand">MORE CHIPS · MORE SEASONING · LESS DISAPPOINTMENT</div>
            <section className="fl-bags">
              {PRODUCTS.map((p) => (
                <div className={`order-card fl-card ${p.tone}`} key={p.id}>
                  <div className="order-bag" aria-hidden="true">
                    <span className="order-bag-top" />
                    <span className="order-bag-company mono">TOO MUCH CHIPS</span>
                    <span className="order-bag-name brand">{p.name.toUpperCase().split(' ').map((w) => <span key={w} className="order-bag-line">{w}</span>)}</span>
                    <FlavorChipArtwork flavor={p.id} />
                    <span className="order-bag-bottom" />
                  </div>
                  <div className="order-info">
                    <span className="order-tag mono">{p.tag}</span>
                    <h3 className="brand">{p.name}</h3>
                    <p className="order-price brand">$3.50<span className="mono"> / BAG</span></p>
                  </div>
                </div>
              ))}
            </section>
            <section className="fl-points">
              <div><b className="mono">01 / THE RATIO</b><h2 className="brand">More chips in the bag.</h2><p>Make room for more of the snack you came for.</p></div>
              <div><b className="mono">02 / THE FLAVOR</b><h2 className="brand">More seasoning on the chips.</h2><p>Give every bite a better shot at the flavor you were promised.</p></div>
            </section>
            <section className="fl-order">
              <div className="fl-qr">
                <QRCodeSVG value={FLYER_URL} size={144} marginSize={4} fgColor="#232849" bgColor="#ffffff" level="M" title="QR code to the Too Much Chips drop list" />
              </div>
              <div className="fl-order-copy">
                <p className="mono fl-scan">SCAN TO JOIN THE MONTHLY DROP</p>
                <p className="brand fl-big">BBQ or Korean Spice.<br /><em>$3.50 per bag.</em></p>
                <a className="fl-url mono" href={FLYER_URL} target="_blank" rel="noopener noreferrer" data-testid="link-flyer-drop">toomuchchips.com</a>
                <p className="fl-caveat">Not zero headspace: a little protective air still cushions the chips. We are making room for more of the good stuff.</p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
