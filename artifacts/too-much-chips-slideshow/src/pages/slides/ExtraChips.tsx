const base = import.meta.env.BASE_URL;

export default function ExtraChips() {
  return (
    <main className="w-screen h-screen overflow-hidden relative deck-frame bg-bg text-text">
      <h1 className="deck-title">The Solution</h1>
      <p className="deck-copy absolute left-[6vw] top-[33vh] w-[43vw]">Too Much Chips will have <strong>extra chips</strong> in the bag and <strong className="text-primary">extra seasoning</strong> on those chips.</p>
      <div className="absolute right-[6vw] top-[29vh] bottom-[9vh] w-[39vw] bg-accent">
        <img src={`${base}filled-chip-bag.svg`} crossOrigin="anonymous" alt="The website's illustrated bag filled with seasoned chips" className="w-full h-full object-contain p-[2vw]" />
      </div>
    </main>
  );
}
