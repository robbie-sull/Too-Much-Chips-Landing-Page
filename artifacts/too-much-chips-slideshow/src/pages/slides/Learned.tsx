export default function Learned() {
  return (
    <main className="w-screen h-screen overflow-hidden relative deck-frame bg-bg text-text">
      <h1 className="deck-title w-[87vw]">What I Learned About Myself</h1>
      <div className="absolute left-[6vw] right-[6vw] top-[36vh] bottom-[10vh] grid grid-cols-2 gap-[6.4vw] items-start">
        <p className="text-[3vw] leading-[1.4] border-t-[.5vw] border-primary pt-[5vh]"><strong className="font-display font-extrabold text-primary">Rory</strong> is good at presenting and coming up with ideas,</p>
        <p className="text-[3vw] leading-[1.4] border-t-[.5vw] border-accent pt-[5vh]">and <strong className="font-display font-extrabold">Emerson</strong> is good at designing and coming up with ideas.</p>
      </div>
    </main>
  );
}
