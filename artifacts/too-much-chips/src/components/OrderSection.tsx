import { ArrowUpRight, Lock } from 'lucide-react';
import { SQUARE_CHECKOUT_LINKS } from '../config/square-checkout-links';
import './OrderSection.css';

const PRODUCTS = [
  { id: 'bbq' as const, name: 'BBQ', tag: 'FLAVOR A', tone: 'order-tomato' },
  { id: 'korean-spice' as const, name: 'Korean Spice', tag: 'FLAVOR B', tone: 'order-lime' },
];

function validLink(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).protocol === 'https:' ? url : null;
  } catch {
    return null;
  }
}

export default function OrderSection() {
  const checkoutReady = PRODUCTS.some((product) => validLink(SQUARE_CHECKOUT_LINKS[product.id]));
  return (
    <section className="order-section" id="order" aria-labelledby="order-title">
      <div className="order-topline">
        <div className="order-label mono"><span>05</span> / GET A BAG</div>
        <span className="order-badge mono">{checkoutReady ? 'CHECKOUT VIA SQUARE' : 'SQUARE CHECKOUT · COMING SOON'}</span>
      </div>
      <h2 id="order-title" className="brand order-title">Pick your<br /><em>flavor.</em></h2>
      <p className="order-intro">
        {checkoutReady
          ? 'Two flavors, one price. Choose a bag and finish on Square’s checkout page.'
          : 'BBQ or Korean Spice. $3.50 per bag. Online ordering through Square is coming soon.'}
      </p>
      <div className="order-grid">
        {PRODUCTS.map((p) => {
          const href = validLink(SQUARE_CHECKOUT_LINKS[p.id]);
          return (
            <article className={`order-card ${p.tone}`} key={p.id} data-testid={`card-order-${p.id}`}>
              <div className="order-bag" aria-hidden="true">
                <span className="order-bag-top" />
                <span className="order-bag-name brand">{p.name.toUpperCase().split(' ').map((w) => <span key={w} className="order-bag-line">{w}</span>)}</span>
                {p.id === 'bbq' && <span className="order-bag-sun" />}
                {p.id === 'korean-spice' && <span className="order-bag-dots" />}
              </div>
              <div className="order-info">
                <span className="order-tag mono">{p.tag}</span>
                <h3 className="brand">{p.name}</h3>
                <p className="order-price brand" data-testid={`text-price-${p.id}`}>$3.50<span className="mono"> / BAG</span></p>
                {href ? (
                  <a className="order-btn" href={href} target="_blank" rel="noopener noreferrer" data-testid={`link-checkout-${p.id}`}>
                    Checkout with Square <ArrowUpRight size={17} aria-hidden="true" />
                    <span className="order-sr">, {p.name}, opens in a new tab</span>
                  </a>
                ) : (
                  <>
                    <button type="button" className="order-btn" disabled aria-describedby={`order-note-${p.id}`} data-testid={`button-checkout-${p.id}`}>
                      <Lock size={15} aria-hidden="true" /> Checkout coming soon
                      <span className="order-sr"> for {p.name}</span>
                    </button>
                    <p className="order-note mono" id={`order-note-${p.id}`} data-testid={`text-status-${p.id}`}>SQUARE CHECKOUT LINK COMING SOON.</p>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
