const base = import.meta.env.BASE_URL;

export default function ThankYou() {
  return (
    <main className="w-screen h-screen overflow-hidden relative deck-frame bg-bg text-text">
      <div className="absolute left-[6vw] top-[12vh] bottom-[12vh] w-[45vw] flex flex-col justify-between">
        <div className="logo-lockup" aria-label="Too Much Chips logo">
          <span className="logo-mark"><span /></span>
          <span className="logo-type"><span>TOO MUCH</span><span>CHIPS</span></span>
        </div>
        <h1 className="font-display font-extrabold text-[8vw] leading-[1.08]">Thank You</h1>
        <a href="https://too-much-chips-landing-page.replit.app/" target="_blank" rel="noopener noreferrer" className="deck-link">https://too-much-chips-landing-page.replit.app/</a>
      </div>
      <img src={`${base}website-qr.svg`} crossOrigin="anonymous" alt="QR code for https://too-much-chips-landing-page.replit.app/" className="absolute right-[6vw] top-[16vh] w-[38vw] h-[38vw] object-contain" />
    </main>
  );
}
