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
        <path className="chip-silhouette" d="M25 7c8-4 15 1 21 1 8-4 15 2 21 5 9-2 16 4 16 11 7 5 3 13 2 18 5 7-1 14-7 16-4 8-13 6-20 5-7 6-15 1-21 2-9 4-16-2-17-6-9 0-13-7-10-13-7-5-3-14 0-18-5-6-2-12 3-15-1-3 3-5 12-6z" />
        <path className="chip-surface" d="M27 11c7-3 13 1 19 1 7-3 13 2 19 5 8-2 13 4 14 10 6 4 3 11 1 15 4 6-1 11-6 13-4 6-11 5-17 4-6 5-13 1-19 2-7 3-13-2-14-6-7 0-10-6-8-11-6-4-3-11 0-15-4-5-2-10 2-13-1-2 2-4 9-5z" />
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
            <p className="chip-study-caption">New / wavy, crisp, seasoned</p>
          </div>
        </div>
      </article>
    </main>
  );
}
