import DropSection from './components/DropSection';
import FilledChipBag from './components/FilledChipBag';
import SeasoningComparison from './components/SeasoningComparison';
import { CHIP_SHAPES, ChipBody, scatterSeasoning, SEASONING } from './components/chipArt';
import { useEffect, useId } from 'react';
import { ArrowDownRight, ArrowRight, Dot, Plus } from 'lucide-react';

// One fixed scatter per chip shape: heavy for the hero, a light sprinkle elsewhere.
const HEAVY_SEASONING = CHIP_SHAPES.map((shape, i) => scatterSeasoning(shape, 73192 + i * 31, 34, SEASONING.house.colors, 2));
const LIGHT_SEASONING = CHIP_SHAPES.map((shape, i) => scatterSeasoning(shape, 4411 + i * 17, 6, SEASONING.house.colors, 1.5));

function Chip({ className = '', shape = 0, heavilySeasoned = false }: { className?: string; shape?: number; heavilySeasoned?: boolean }) {
  const id = useId();
  return (
    <span aria-hidden="true" className={`chip-shape ${className}`}>
      <svg viewBox="0 0 100 76" focusable="false">
        <ChipBody
          id={id}
          shape={CHIP_SHAPES[shape]}
          grains={(heavilySeasoned ? HEAVY_SEASONING : LIGHT_SEASONING)[shape]}
          dust={heavilySeasoned ? SEASONING.house.dust : undefined}
        />
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
        <Chip className="bag-chip chip-one" shape={0} heavilySeasoned />
        <Chip className="bag-chip chip-two" shape={3} heavilySeasoned />
        <Chip className="bag-chip chip-three" shape={4} heavilySeasoned />
      </div>
      <Chip className="orbit-chip orbit-one" shape={1} heavilySeasoned />
      <Chip className="orbit-chip orbit-two" shape={2} heavilySeasoned />
      <Chip className="orbit-chip orbit-three" shape={5} heavilySeasoned />
    </div>
  );
}

function App() {
  // The browser looks for #drop before React has drawn the page, so links like
  // the flyer QR (/?ref=flyer#drop) would land at the top without this.
  useEffect(() => {
    const target = window.location.hash && document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: 'instant' });
  }, []);

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
          <a href="#drop" data-testid="link-drop">THE DROP</a>
        </nav>
        <a href="#drop" className="header-order" data-testid="link-drop-cta">JOIN THE DROP</a>
      </header>

      <section className="hero grain" id="top">
        <div className="hero-copy">
          <h1 className="brand hero-enter-delay">LESS<br />BAG.<br /><em>MORE</em><br />CHIPS.</h1>
          <p className="hero-description hero-enter-delay">You know that tiny handful at the bottom? We think the bag should have more chips in it—and those chips should bring the seasoning.</p>
          <a className="button-primary" href="#the-promise" data-testid="link-hero-cta">
            Meet the better bag <ArrowDownRight size={19} />
          </a>
        </div>
        <div className="hero-art">
          <BagIllustration />
        </div>
      </section>

      <div className="ticker" aria-label="More chips. More seasoning. Less disappointment.">
        <div className="ticker-track" aria-hidden="true">
          {Array.from({ length: 4 }, (_, i) => (
            <span className="ticker-piece" key={i}>MORE CHIPS <Dot size={22} /> MORE SEASONING <Dot size={22} /> LESS DISAPPOINTMENT <span className="ticker-star">✳</span></span>
          ))}
        </div>
      </div>

      <section id="why" className="truth-section">
        <div className="truth-content">
          <h2 className="brand">A bag full of<br /><span>big promises.</span><br />A few little chips.</h2>
          <div className="truth-aside">
            <p>We’ve all reached into a bag expecting a snack and found a lot of <strong>crinkly air</strong> and not quite enough crunch.</p>
            <p>And the seasoning? Sometimes it shows up like it’s got somewhere else to be.</p>
          </div>
        </div>
        <div className="truth-bottom">
          <div className="empty-bag" aria-hidden="true">
            <div className="empty-bag-mouth" />
            <div className="bag-crinkle" />
            <span className="empty-chip"><Chip shape={3} /></span>
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
        <div className="promise-title">
          <h2 className="brand">MORE OF<br />WHAT YOU<br /><em>OPENED IT FOR.</em></h2>
          <div className="promise-intro">
            <p>Too Much Chips is a straightforward idea with a very crunchy point of view.</p>
            <span className="mini-arrow"><ArrowDownRight size={25} /></span>
          </div>
        </div>
        <div className="promise-pair">
          <article className="promise-card chips-card">
            <FilledChipBag />
            <h3 className="brand">More actual<br />chips in the bag.</h3>
            <p>Make room for more of the snack you came for. Not every inch can be chips, and that’s okay.</p>
          </article>
          <article className="promise-card seasoning-card">
            <SeasoningComparison />
            <h3 className="brand">More seasoning<br />on the chips.</h3>
            <p>Give every bite a better shot at showing up with the flavor you were promised.</p>
          </article>
        </div>
      </section>

      <section className="headspace-section" id="how">
        <div className="headspace-art" aria-hidden="true">
          <div className="air-label mono">PROTECTIVE<br />HEADSPACE</div>
          <div className="headspace-bag">
            <div className="air-zone"><span className="air-cloud">N₂</span><span className="air-arrow">↕</span></div>
            <div className="chip-zone">{[0, 2, 1, 5, 3, 4].map((shape) => <Chip key={shape} shape={shape} />)}</div>
            <div className="hs-bag-copy brand">ROOM TO<br />CRUNCH</div>
          </div>
          <div className="air-callout mono">A LITTLE CUSHION<br />FOR THE CRUNCH</div>
        </div>
        <div className="headspace-copy">
          <h2 className="brand">Air has<br />a job, too.</h2>
          <p className="headspace-lede">That space at the top of a chip bag isn’t automatically wasted. Nitrogen and headspace help cushion chips during shipping and handling.</p>
          <p>So, no—we’re not promising a bag stuffed to the seams, or no air at all. We’re talking about making room for more actual chips while keeping the protection chips need.</p>
          <div className="honesty-tag"><span className="honesty-star">✳</span><span><strong>MORE CHIPS, NOT ZERO HEADSPACE.</strong><br />A better balance is the point.</span></div>
        </div>
      </section>

      <DropSection />

      <section className="closing-section">
        <div className="closing-doodles" aria-hidden="true"><Chip shape={1} /><Chip shape={4} /><Chip shape={0} /><span>✳</span></div>
        <h2 className="brand">Let’s make<br />snacks <em>snackier.</em></h2>
        <a className="closing-cta" href="#top" data-testid="link-back-to-top">Back to the top <ArrowRight size={18} /></a>
      </section>

      <footer className="site-footer">
        <a href="#top" className="brand footer-logo" data-testid="link-footer-home">TOO MUCH CHIPS</a>
        <span className="mono">A SNACK IDEA WITH ITS HEAD IN THE RIGHT PLACE.</span>
        <a href={`${import.meta.env.BASE_URL}flyer`} className="footer-top" data-testid="link-footer-flyer" style={{ opacity: .7 }}>FLYER</a>
        <a href="#the-promise" className="footer-top" data-testid="link-footer-promise">THE POINT <Plus size={14} /></a>
      </footer>
    </main>
  );
}

export default App;
