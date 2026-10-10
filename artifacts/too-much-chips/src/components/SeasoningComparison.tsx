import { useId } from 'react';
import './SeasoningComparison.css';

const CHIP_OUTLINE = 'M17 27c-2-12 14-19 29-16 13-5 30 1 36 13 9 9 7 23-3 31-8 8-20 11-32 9-15 2-28-7-31-17-7-6-5-14 1-20z';

function ComparisonChip({ seasoned }: { seasoned: boolean }) {
  const id = useId();
  const grains = seasoned
    ? Array.from({ length: 125 }, (_, index) => ({
        x: 16 + ((index * 29) % 69),
        y: 13 + ((index * 19) % 50),
        size: 0.65 + (index % 4) * 0.3,
      }))
    : [{ x: 38, y: 27, size: .8 }, { x: 63, y: 43, size: .9 }];

  return (
    <svg viewBox="0 0 100 76" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={`${id}-clip`}><path d={CHIP_OUTLINE} /></clipPath>
        <radialGradient id={`${id}-color`} cx="40%" cy="30%" r="75%">
          <stop offset="0" stopColor={seasoned ? '#edb35c' : '#ffe1a0'} />
          <stop offset=".65" stopColor={seasoned ? '#db8532' : '#f1c66f'} />
          <stop offset="1" stopColor={seasoned ? '#b35b28' : '#dba14f'} />
        </radialGradient>
      </defs>
      <path d={CHIP_OUTLINE} fill={`url(#${id}-color)`} stroke="#bf873e" strokeWidth="1.2" />
      <path d="M30 22c9-5 21-4 29 1m-36 15c2 10 9 17 19 20" fill="none" stroke="#ffe4ae" strokeWidth="1.7" opacity=".65" strokeLinecap="round" />
      <g clipPath={`url(#${id}-clip)`}>
        {grains.map((grain, index) => (
          <ellipse key={index} cx={grain.x} cy={grain.y} rx={grain.size} ry={grain.size * .72}
            fill={index % 3 === 0 ? '#f8d58c' : index % 3 === 1 ? '#853c24' : '#bd4c28'}
            transform={`rotate(${index * 37} ${grain.x} ${grain.y})`} />
        ))}
      </g>
      <path d="M82 25c4 15-5 25-19 31-13 5-27 4-39-2" fill="none" stroke="#a8652c" strokeWidth="1.4" opacity=".5" />
    </svg>
  );
}

export default function SeasoningComparison() {
  return (
    <div className="seasoning-comparison">
      <div className="seasoning-comparison-chips">
        <figure>
          <ComparisonChip seasoned={false} />
          <figcaption className="mono">Other competitors’ chips</figcaption>
        </figure>
        <figure className="seasoning-comparison-ours">
          <ComparisonChip seasoned />
          <figcaption className="mono">Too Much Chips</figcaption>
        </figure>
      </div>
      <span className="seasoning-comparison-note mono">Illustrated comparison</span>
    </div>
  );
}
