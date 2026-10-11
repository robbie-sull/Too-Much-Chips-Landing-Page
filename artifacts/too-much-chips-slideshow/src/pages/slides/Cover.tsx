export default function Cover() {
  return (
    <main className="w-screen h-screen overflow-hidden relative deck-frame bg-bg text-text">
      <div className="logo-lockup" aria-label="Too Much Chips logo">
        <span className="logo-mark"><span /></span>
        <span className="logo-type"><span>TOO MUCH</span><span>CHIPS</span></span>
      </div>
      <h1 className="font-display font-extrabold text-[8.8vw] leading-[1.02] mt-[8vh] mb-0">Too Much <span className="text-primary">Chips</span></h1>
      <div className="absolute left-[6vw] right-[6vw] bottom-[10vh] grid grid-cols-2 gap-[6.4vw]">
        <section className="border-t-[.5vw] border-primary pt-[4vh]">
          <h2 className="presenter-name">Rory Sullivan</h2>
          <p className="presenter-detail">seventh grade</p>
          <p className="presenter-detail">Hudsonville Christian Middle School</p>
        </section>
        <section className="border-t-[.5vw] border-accent pt-[4vh]">
          <h2 className="presenter-name">Emerson Bakker</h2>
          <p className="presenter-detail">fifth grade</p>
          <p className="presenter-detail">Black River Elementary</p>
        </section>
      </div>
    </main>
  );
}
