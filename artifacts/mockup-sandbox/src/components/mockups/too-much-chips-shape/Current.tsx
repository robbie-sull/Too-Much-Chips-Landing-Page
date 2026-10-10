import './_group.css';

function Chip({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`chip-shape ${className}`}>
      <i /><i /><i />
    </span>
  );
}

function NewChip() {
  return (
    <span aria-hidden="true" className="chip-shape new-chip">
      <svg viewBox="0 0 100 76" focusable="false">
        <path className="chip-silhouette" d="M17 27c-2-12 14-19 29-16 13-5 30 1 36 13 9 9 7 23-3 31-8 8-20 11-32 9-15 2-28-7-31-17-7-6-5-14 1-20z" />
        <path className="chip-surface" d="M82 25c4 15-5 25-19 31-13 5-27 4-39-2 7 8 17 12 28 10 12 1 22-4 29-11 8-8 10-18 1-28z" />
        <path className="chip-cupping" d="M30 22c9-5 21-4 29 1m-36 15c2 10 9 17 19 20" fill="none" strokeLinecap="round" />
        <g className="chip-toasted-spots">
          <ellipse cx="36" cy="30" rx="2.2" ry="1.5" /><ellipse cx="55" cy="47" rx="2.5" ry="1.8" />
          <ellipse cx="70" cy="31" rx="1.8" ry="1.3" /><ellipse cx="29" cy="43" rx="1.6" ry="1.2" />
          <ellipse cx="61" cy="20" rx="1.5" ry="1.1" /><ellipse cx="76" cy="44" rx="1.8" ry="1.3" />
        </g>
        <g className="chip-seasoning">
          <circle cx="45" cy="24" r="1.1" /><circle cx="66" cy="39" r="1" />
          <circle cx="47" cy="53" r=".9" /><circle cx="78" cy="23" r=".8" /><circle cx="23" cy="29" r=".8" />
        </g>
      </svg>
    </span>
  );
}

export function Current() {
  return (
    <main className="chip-study">
      <article className="chip-study-card">
        <p className="chip-study-label">Too Much Chips / chip-shape study</p>
        <div className="chip-study-row">
          <div className="chip-study-sample">
            <Chip className="chip-sample-rotated" />
            <p className="chip-study-caption">Original / smooth oval</p>
          </div>
          <div className="chip-study-sample">
            <NewChip />
            <p className="chip-study-caption">New / thin, curled, seasoned</p>
          </div>
        </div>
      </article>
    </main>
  );
}
