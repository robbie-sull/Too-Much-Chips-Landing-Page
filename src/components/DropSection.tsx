import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { NEXT_DROP, WAITLIST_URL } from '../config/drop';
import FlavorChipArtwork from './FlavorChipArtwork';
import './DropSection.css';

const PRODUCTS = [
  { id: 'bbq' as const, name: 'BBQ', tag: 'FLAVOR A', tone: 'order-tomato' },
  { id: 'korean-spice' as const, name: 'Korean Spice', tag: 'FLAVOR B', tone: 'order-lime' },
];

const STEPS = [
  ['01', 'Join the list', 'Name, email, done.'],
  ['02', 'Get the drop email', 'Once a month, when orders open.'],
  ['03', 'Grab your bags', 'Small batches. When they’re gone, they’re gone.'],
];

type Status = 'idle' | 'sending' | 'done' | 'error';

// Where this visitor came from, e.g. ?ref=flyer on the printed QR code.
function signupSource() {
  return new URLSearchParams(window.location.search).get('ref')?.slice(0, 40) || 'site';
}

export default function DropSection() {
  const [status, setStatus] = useState<Status>('idle');
  const [email, setEmail] = useState('');
  const ready = WAITLIST_URL.startsWith('https://');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = new URLSearchParams({
      name: String(form.get('name') ?? '').trim(),
      email: String(form.get('email') ?? '').trim(),
      flavors: form.getAll('flavor').join(', '),
      source: signupSource(),
      company: String(form.get('company') ?? ''),
    });
    setEmail(body.get('email')!);
    setStatus('sending');
    try {
      // A plain form-encoded POST avoids a CORS preflight, which Apps Script can't answer.
      const res = await fetch(WAITLIST_URL, { method: 'POST', body });
      const data = await res.json();
      setStatus(data.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="order-section" id="drop" aria-labelledby="drop-title">
      <div className="order-topline">
        <div className="order-label mono"><span>05</span> / THE DROP</div>
        <span className="order-badge mono" data-testid="text-next-drop">NEXT DROP · {NEXT_DROP ? NEXT_DROP.toUpperCase() : 'DATE TBA'}</span>
      </div>

      <h2 id="drop-title" className="brand order-title">Get on the<br /><em>drop list.</em></h2>
      <div className="drop-layout">
        <div className="drop-copy">
          <p className="order-intro">We make chips in small batches and open orders once a month. Join the list and you’ll hear the second the next drop opens.</p>
          <ol className="drop-steps">
            {STEPS.map(([n, title, text]) => (
              <li key={n}><span className="mono">{n}</span><div><strong className="brand">{title}</strong><p>{text}</p></div></li>
            ))}
          </ol>
        </div>

        <div className="drop-card" aria-live="polite">
          {status === 'done' ? (
            <div className="drop-done" data-testid="text-signup-done">
              <span className="drop-done-mark"><Check size={28} strokeWidth={3} aria-hidden="true" /></span>
              <p className="mono drop-card-label">YOU’RE ON THE LIST</p>
              <h3 className="brand">See you at<br />the drop.</h3>
              <p>We’ll email <strong>{email}</strong> when orders open.</p>
            </div>
          ) : (
            <form onSubmit={submit} data-testid="form-waitlist">
              <p className="mono drop-card-label">JOIN THE DROP LIST</p>
              <label className="drop-field">
                <span className="mono">FIRST NAME</span>
                <input name="name" autoComplete="given-name" maxLength={80} data-testid="input-name" />
              </label>
              <label className="drop-field">
                <span className="mono">EMAIL *</span>
                <input name="email" type="email" required autoComplete="email" maxLength={254} data-testid="input-email" />
              </label>
              <fieldset className="drop-flavors">
                <legend className="mono">WHICH FLAVORS ARE YOU AFTER?</legend>
                {PRODUCTS.map((p) => (
                  <label key={p.id} className={`drop-flavor ${p.tone}`}>
                    <input type="checkbox" name="flavor" value={p.name} data-testid={`checkbox-${p.id}`} />
                    <span>{p.name}</span>
                  </label>
                ))}
              </fieldset>
              {/* Honeypot: people never see this field; bots that fill it get ignored. */}
              <label className="drop-trap" aria-hidden="true">
                Company <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
              <button className="order-btn drop-submit mono" type="submit" disabled={!ready || status === 'sending'} data-testid="button-join">
                {status === 'sending' ? 'Saving your spot…' : 'Save my spot'} <ArrowRight size={16} aria-hidden="true" />
              </button>
              {!ready && <p className="order-note mono">SIGNUPS OPEN SOON.</p>}
              {status === 'error' && (
                <p className="drop-error" role="alert" data-testid="text-signup-error">That didn’t go through. Check your email address and try again.</p>
              )}
              <p className="drop-fine">One email per drop. No spam, just chips.</p>
            </form>
          )}
        </div>
      </div>

      <div className="order-grid">
        {PRODUCTS.map((p) => (
          <article className={`order-card ${p.tone}`} key={p.id} data-testid={`card-order-${p.id}`}>
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
              <p className="order-price brand" data-testid={`text-price-${p.id}`}>$3.50<span className="mono"> / BAG</span></p>
              <p className="order-note mono">IN EVERY DROP.</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
