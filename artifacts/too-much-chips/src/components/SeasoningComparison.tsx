import { useId } from 'react';
import './SeasoningComparison.css';

const CHIP_OUTLINE = 'M17 27c-2-12 14-19 29-16 13-5 30 1 36 13 9 9 7 23-3 31-8 8-20 11-32 9-15 2-28-7-31-17-7-6-5-14 1-20z';
const SEASONED_CHIP_OUTLINE = 'M29 11C41 5 59 9 65 18C71 20 81 17 86 27C93 40 82 49 72 55C61 61 49 69 36 64C26 61 29 53 21 48C10 40 14 26 22 22C26 19 23 15 29 11Z';

// Fixed-seed scatter keeps the illustration stable without creating repeating rows.
function createSeasoningScatter() {
  let seed = 17429;
  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
  const colors = ['#f8d58c', '#853c24', '#bd4c28', '#bd4c28'];
  return Array.from({ length: 350 }, () => ({
    x: 13 + random() * 77,
    y: 8 + random() * 60,
    size: 0.8 + random() * 1.2,
    angle: random() * 180,
    color: colors[Math.floor(random() * colors.length)],
  }));
}

const SEASONING_SCATTER = createSeasoningScatter();
const LIGHT_SEASONING = [
  { x: 38, y: 27, size: .8 }, { x: 63, y: 43, size: .9 },
  { x: 52, y: 20, size: 1 }, { x: 31, y: 44, size: .9 },
  { x: 52, y: 53, size: 1.1 },
].map((grain, index) => ({ ...grain, angle: index * 37, color: '#99562b' }));

function ComparisonChip({ seasoned }: { seasoned: boolean }) {
  const id = useId();
  const outline = seasoned ? SEASONED_CHIP_OUTLINE : CHIP_OUTLINE;
  const grains = seasoned ? SEASONING_SCATTER : LIGHT_SEASONING;

  return (
    <svg viewBox="0 0 100 76" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={`${id}-clip`}><path d={outline} /></clipPath>
        <radialGradient id={`${id}-color`} cx="40%" cy="30%" r="75%">
          <stop offset="0" stopColor={seasoned ? '#edb35c' : '#ffe1a0'} />
          <stop offset=".65" stopColor={seasoned ? '#db8532' : '#f1c66f'} />
          <stop offset="1" stopColor={seasoned ? '#b35b28' : '#dba14f'} />
        </radialGradient>
      </defs>
      <path d={outline} fill={`url(#${id}-color)`} stroke="#bf873e" strokeWidth="1.2" />
      <path d={seasoned ? 'M25 24Q34 9 53 16M23 45Q33 53 36 60' : 'M30 22c9-5 21-4 29 1m-36 15c2 10 9 17 19 20'} fill="none" stroke="#ffe4ae" strokeWidth="1.7" opacity=".65" strokeLinecap="round" />
      <g clipPath={`url(#${id}-clip)`}>
        {grains.map((grain, index) => (
          <ellipse key={index} cx={grain.x} cy={grain.y} rx={grain.size} ry={grain.size * .72}
            fill={grain.color}
            transform={`rotate(${grain.angle} ${grain.x} ${grain.y})`} />
        ))}
      </g>
      <path d={seasoned ? 'M84 28Q80 44 61 51Q41 59 36 64' : 'M82 25c4 15-5 25-19 31-13 5-27 4-39-2'} fill="none" stroke="#a8652c" strokeWidth="1.4" opacity=".5" />
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
