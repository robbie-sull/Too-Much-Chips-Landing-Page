const base = import.meta.env.BASE_URL;

export default function FavoritePart() {
  return (
    <main className="w-screen h-screen overflow-hidden relative deck-frame bg-bg text-text">
      <h1 className="deck-title w-[87vw]">Favorite part of the weekend</h1>
      <div className="absolute left-[6vw] right-[6vw] top-[31vh] bottom-[9vh] grid grid-cols-[.8fr_1.2fr] gap-[4vw] items-center">
        <p className="font-display font-extrabold text-[5.8vw] leading-[1.1] text-primary">Making the website</p>
        <img src={`${base}website.png`} crossOrigin="anonymous" alt="The Too Much Chips website" className="w-full h-full object-contain" />
      </div>
    </main>
  );
}
