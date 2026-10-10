import OrderSection from './components/OrderSection';
import FilledChipBag from './components/FilledChipBag';
import { ArrowDownRight, ArrowRight, ChevronDown, Dot, Plus, Sparkles } from 'lucide-react';

function Chip({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`chip-shape ${className}`}>
      <svg viewBox="0 0 100 76" focusable="false">
        <path
          className="chip-silhouette"
          d="M17 27c-2-12 14-19 29-16 13-5 30 1 36 13 9 9 7 23-3 31-8 8-20 11-32 9-15 2-28-7-31-17-7-6-5-14 1-20z"
        />
        <path
          className="chip-surface"
          d="M82 25c4 15-5 25-19 31-13 5-27 4-39-2 7 8 17 12 28 10 12 1 22-4 29-11 8-8 10-18 1-28z"
        />
        <path
          className="chip-cupping"
          d="M30 22c9-5 21-4 29 1m-36 15c2 10 9 17 19 20"
          fill="none"
          strokeLinecap="round"
        />
        <g className="chip-toasted-spots">
          <ellipse cx="36" cy="30" rx="2.2" ry="1.5" />
          <ellipse cx="55" cy="47" rx="2.5" ry="1.8" />
          <ellipse cx="70" cy="31" rx="1.8" ry="1.3" />
          <ellipse cx="29" cy="43" rx="1.6" ry="1.2" />
          <ellipse cx="61" cy="20" rx="1.5" ry="1.1" />
          <ellipse cx="76" cy="44" rx="1.8" ry="1.3" />
        </g>
        <g className="chip-seasoning">
          <circle cx="45" cy="24" r="1.1" />
          <circle cx="66" cy="39" r="1" />
          <circle cx="47" cy="53" r=".9" />
          <circle cx="78" cy="23" r=".8" />
          <circle cx="23" cy="29" r=".8" />
        </g>
      </svg>
    </span>
  );
}

function BagIllustration() {
  return (
    <div className="bag-stage" aria-label="Illustration of a Too Much Chips bag">
      <div className="bag-shadow" />
      <div className="bag">
        <div className="bag-seal bag-seal-top" />
        <div className="bag-label mono">THE BIG HONEST BAG · Nº 01</div>
        <div className="bag-wordmark brand">TOO<br />MUCH<br /><span>CHIPS</span></div>
        <div className="bag-sun" />
        <div className="bag-bottom-copy mono">MORE CHIP. MORE ZING.</div>
        <div className="bag-seal bag-seal-bottom" />
        <Chip className="bag-chip chip-one" />
        <Chip className="bag-chip chip-two" />
        <Chip className="bag-chip chip-three" />
      </div>
      <Chip className="orbit-chip orbit-one" />
      <Chip className="orbit-chip orbit-two" />
      <Chip className="orbit-chip orbit-three" />
      <div className="seal-stamp mono">NO SAD<br />SNACKS</div>
      <div className="stage-caption mono">A BAG WITH A BETTER<br />CHIP-TO-AIR RATIO*</div>
    </div>
  );
}

function App() {
  return (
    <main>
      <header className="site-header">
        <a href="#top" className="logo-lockup" aria-label="Too Much Chips home" data-testid="link-home">
          <span className="logo-mark"><span /></span>
          <span className="brand logo-type">TOO MUCH<br />CHIPS</span>
        </a>
        <nav aria-label="Main navigation" className="desktop-nav">
          <a href="#why" data-testid="link-why">THE POINT</a>
          <a href="#how" data-testid="link-how">THE BAG</a>
          <a href="#script" data-testid="link-script">SAY IT OUT LOUD</a>
          <a href="#order" data-testid="link-order">ORDER</a>
        </nav>
        <a href="#the-promise" className="header-cta" data-testid="link-promise">
          GET THE IDEA <ArrowRight size={15} strokeWidth={2.5} />
        </a>
        <a href="#order" className="header-order" data-testid="link-order-cta">ORDER $3.50</a>
      </header>

      <section className="hero grain" id="top">
        <div className="hero-copy">
          <div className="eyebrow mono hero-enter"><span className="eyebrow-dot" /> A SNACK-SIZED REBELLION</div>
          <h1 className="brand hero-enter-delay">LESS<br />BAG.<br /><em>MORE</em><br />CHIPS.</h1>
          <p className="hero-description hero-enter-delay">You know that tiny handful at the bottom? We think the bag should have more chips in it—and those chips should bring the seasoning.</p>
          <a className="button-primary" href="#the-promise" data-testid="link-hero-cta">
            Meet the better bag <ArrowDownRight size={19} />
          </a>
          <p className="hero-footnote mono">MORE OF THE GOOD STUFF. ROOM FOR PROTECTION.</p>
        </div>
        <div className="hero-art">
          <div className="hero-art-note mono"><span>01 / A SMALL<br />BUT IMPORTANT<br />IMPROVEMENT</span><ArrowDownRight size={20} /></div>
          <BagIllustration />
          <div className="hero-side-note mono">BIG CRUNCH<br />ENERGY <Sparkles size={13} /></div>
        </div>
        <a href="#why" className="scroll-cue mono" aria-label="Scroll to why Too Much Chips" data-testid="link-scroll-why">
          SCROLL FOR THE GOOD STUFF <ChevronDown size={15} />
        </a>
      </section>

      <div className="ticker" aria-label="More chips. More seasoning. Less disappointment.">
        <div className="ticker-track" aria-hidden="true">
          {Array.from({ length: 4 }, (_, i) => (
            <span className="ticker-piece" key={i}>MORE CHIPS <Dot size={22} /> MORE SEASONING <Dot size={22} /> LESS DISAPPOINTMENT <span className="ticker-star">✳</span></span>
          ))}
        </div>
      </div>

      <section id="why" className="truth-section">
        <div className="truth-label mono"><span>01</span> / THE SNACKING SITUATION</div>
        <div className="truth-content">
          <h2 className="brand">A bag full of<br /><span>big promises.</span><br />A few little chips.</h2>
          <div className="truth-aside">
            <p>We’ve all reached into a bag expecting a snack and found a lot of <strong>crinkly air</strong> and not quite enough crunch.</p>
            <p>And the seasoning? Sometimes it shows up like it’s got somewhere else to be.</p>
            <div className="scribble-note mono">THAT'S A BIT OF A LETDOWN <span>↗</span></div>
          </div>
        </div>
        <div className="truth-bottom">
          <div className="empty-bag" aria-hidden="true">
            <div className="empty-bag-mouth" />
            <div className="bag-crinkle" />
            <span className="empty-chip"><Chip /></span>
            <span className="empty-bag-type brand">…REALLY?</span>
          </div>
          <div className="truth-quote">
            <div className="quote-mark brand">“</div>
            <blockquote className="brand">If we’re opening a bag of chips, we want to find chips.</blockquote>
            <span className="mono">— A VERY REASONABLE EXPECTATION</span>
          </div>
        </div>
      </section>

      <section className="promise-section" id="the-promise">
        <div className="promise-head">
          <div className="truth-label mono"><span>02</span> / THE WHOLE IDEA</div>
          <p className="mono">SIMPLE ON PURPOSE</p>
        </div>
        <div className="promise-title">
          <h2 className="brand">MORE OF<br />WHAT YOU<br /><em>OPENED IT FOR.</em></h2>
          <div className="promise-intro">
            <p>Too Much Chips is a straightforward idea with a very crunchy point of view.</p>
            <span className="mini-arrow"><ArrowDownRight size={25} /></span>
          </div>
        </div>
        <div className="promise-pair">
          <article className="promise-card chips-card">
            <span className="card-number mono">A / THE RATIO</span>
            <FilledChipBag />
            <h3 className="brand">More actual<br />chips in the bag.</h3>
            <p>Make room for more of the snack you came for. Not every inch can be chips, and that’s okay.</p>
            <span className="card-stamp mono">LESS EMPTY FEELING</span>
          </article>
          <article className="promise-card seasoning-card">
            <span className="card-number mono">B / THE FLAVOR</span>
            <div className="seasoning-burst" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <h3 className="brand">More seasoning<br />on the chips.</h3>
            <p>Give every bite a better shot at showing up with the flavor you were promised.</p>
            <span className="card-stamp mono">MORE BITE-BY-BITE ZING</span>
          </article>
        </div>
        <p className="fine-note mono">NO MAGIC. NO IMPOSSIBLE PROMISES. JUST A BETTER AIM.</p>
      </section>

      <section className="headspace-section" id="how">
        <div className="headspace-art" aria-hidden="true">
          <div className="air-label mono">PROTECTIVE<br />HEADSPACE</div>
          <div className="headspace-bag">
            <div className="air-zone"><span className="air-cloud">N₂</span><span className="air-arrow">↕</span></div>
            <div className="chip-zone"><Chip /><Chip /><Chip /><Chip /><Chip /><Chip /></div>
            <div className="hs-bag-copy brand">ROOM TO<br />CRUNCH</div>
          </div>
          <div className="air-callout mono">A LITTLE CUSHION<br />FOR THE CRUNCH</div>
        </div>
        <div className="headspace-copy">
          <div className="truth-label mono"><span>03</span> / A LITTLE REALITY</div>
          <h2 className="brand">Air has<br />a job, too.</h2>
          <p className="headspace-lede">That space at the top of a chip bag isn’t automatically wasted. Nitrogen and headspace help cushion chips during shipping and handling.</p>
          <p>So, no—we’re not promising a bag stuffed to the seams, or no air at all. We’re talking about making room for more actual chips while keeping the protection chips need.</p>
          <div className="honesty-tag"><span className="honesty-star">✳</span><span><strong>MORE CHIPS, NOT ZERO HEADSPACE.</strong><br />A better balance is the point.</span></div>
          <a className="text-link" href="#script" data-testid="link-script-more">See how to say it <ArrowRight size={17} /></a>
        </div>
      </section>

      <section id="script" className="script-section">
        <div className="script-topline">
          <div className="truth-label mono"><span>04</span> / PASS THE IDEA ALONG</div>
          <span className="script-badge mono">A 15-SECOND SALES SCRIPT</span>
        </div>
        <div className="script-layout">
          <div className="script-title">
            <span className="script-eyebrow mono">FOR YOUR NEXT SNACK CHAT</span>
            <h2 className="brand">Say it<br />like this.</h2>
            <p>A quick, honest way to explain the whole thing.</p>
          </div>
          <div className="script-card">
            <div className="script-card-head mono"><span>THE OPENING LINE</span><span>01—04</span></div>
            <div className="script-lines">
              <p><span>01</span><strong>“Have you ever opened a bag wishing it had more chips and more seasoning?”</strong></p>
              <p><span>02</span>“That’s the idea behind Too Much Chips.”</p>
              <p><span>03</span>“More actual chips in the bag, and more seasoning on the chips.”</p>
              <p><span>04</span>“There’s still headspace to help protect them—we’re just making room for more of the good stuff.”</p>
            </div>
            <div className="script-card-foot mono"><Sparkles size={14} /> CLEAR, CRUNCHY, AND NOT OVERPROMISING.</div>
          </div>
        </div>
      </section>

      <OrderSection />

      <section className="closing-section">
        <div className="closing-doodles" aria-hidden="true"><Chip /><Chip /><Chip /><span>✳</span></div>
        <p className="mono closing-eyebrow">THE BOTTOM OF THE BAG SHOULD NOT BE THE BEST PART</p>
        <h2 className="brand">Let’s make<br />snacks <em>snackier.</em></h2>
        <a className="closing-cta" href="#top" data-testid="link-back-to-top">Back to the top <ArrowRight size={18} /></a>
        <p className="closing-small mono">TOO MUCH CHIPS · MORE CHIPS, MORE SEASONING, HONESTLY.</p>
      </section>

      <footer className="site-footer">
        <a href="#top" className="brand footer-logo" data-testid="link-footer-home">TOO MUCH CHIPS<span>® IDEA, EXTRA CRUNCH.</span></a>
        <span className="mono">A SNACK IDEA WITH ITS HEAD IN THE RIGHT PLACE.</span>
        <a href="#the-promise" className="footer-top" data-testid="link-footer-promise">THE POINT <Plus size={14} /></a>
      </footer>
    </main>
  );
}

export default App;
