import { useId } from 'react';

type Flavor = 'bbq' | 'korean-spice';

const OUTLINES = [
  'M17 27c-2-12 14-19 29-16 13-5 30 1 36 13 9 9 7 23-3 31-8 8-20 11-32 9-15 2-28-7-31-17-7-6-5-14 1-20z',
  'M29 11C41 5 59 9 65 18C71 20 81 17 86 27C93 40 82 49 72 55C61 61 49 69 36 64C26 61 29 53 21 48C10 40 14 26 22 22C26 19 23 15 29 11Z',
  'M18 24Q21 10 40 13Q61 3 78 22Q92 35 80 51Q69 67 50 63Q34 70 21 55Q9 40 18 24Z',
];

function seasoning(flavor: Flavor, chip: number) {
  let seed = (flavor === 'bbq' ? 7193 : 29371) + chip * 107;
  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
  const palette = flavor === 'bbq'
    ? ['#754027', '#a9572d', '#c17a3a', '#f1bd65']
    : ['#b72c21', '#e74928', '#81261b', '#efb15a'];
  return Array.from({ length: flavor === 'bbq' ? 90 : 120 }, () => ({
    x: 14 + random() * 74,
    y: 10 + random() * 56,
    radius: .7 + random() * 1.2,
    angle: random() * 180,
    color: palette[Math.floor(random() * palette.length)],
  }));
}

const SPECKLES = {
  bbq: OUTLINES.map((_, index) => seasoning('bbq', index)),
  'korean-spice': OUTLINES.map((_, index) => seasoning('korean-spice', index)),
};
const POSITIONS = ['translate(1 0) rotate(-17 40 30)', 'translate(66 3) rotate(18 40 30)', 'translate(35 30) rotate(-3 40 30)'];

export default function FlavorChipArtwork({ flavor }: { flavor: Flavor }) {
  const id = useId();
  const bbq = flavor === 'bbq';
  return (
    <svg className="order-bag-picture" viewBox="0 0 150 100" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-gold`} cx="35%" cy="25%" r="85%">
          <stop offset="0" stopColor={bbq ? '#f4cd83' : '#f4b866'} />
          <stop offset=".65" stopColor={bbq ? '#df9b48' : '#df873b'} />
          <stop offset="1" stopColor={bbq ? '#ad6530' : '#af5029'} />
        </radialGradient>
        {OUTLINES.map((path, index) => (
          <clipPath key={index} id={`${id}-clip-${index}`}><path d={path} /></clipPath>
        ))}
      </defs>
      {OUTLINES.map((path, index) => (
        <g key={index} transform={POSITIONS[index]}>
          <g transform="scale(.85)">
            <path d={path} transform="translate(1 3)" fill="#301d13" opacity=".25" />
            <path d={path} fill={`url(#${id}-gold)`} stroke={bbq ? '#9b5c2a' : '#9c4325'} strokeWidth="1.2" />
            <g clipPath={`url(#${id}-clip-${index})`}>
              {SPECKLES[flavor][index].map((grain, grainIndex) => (
                <ellipse key={grainIndex} cx={grain.x} cy={grain.y} rx={grain.radius}
                  ry={grain.radius * .65} fill={grain.color}
                  transform={`rotate(${grain.angle} ${grain.x} ${grain.y})`} />
              ))}
            </g>
            <path d="M24 29Q27 18 40 18M24 43Q30 53 42 56" fill="none" stroke="#ffe2a3" strokeWidth="1.8" opacity=".65" strokeLinecap="round" />
          </g>
        </g>
      ))}
    </svg>
  );
}
