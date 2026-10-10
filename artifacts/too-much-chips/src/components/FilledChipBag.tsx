import { useId } from 'react';

const CHIP_OUTLINE = 'M-21-5C-25-16-9-22 1-18C14-22 27-9 24 2C26 12 11 20 0 17C-14 20-25 8-21-5Z';
const CHIPS = [
  [62, 90, 32], [219, 91, -28], [135, 34, 8], [207, 57, -35],
  [83, 49, -25], [119, 42, 15], [158, 42, -12], [198, 50, 25],
  [60, 69, 20], [98, 64, -10], [139, 64, 28], [179, 65, -20], [216, 70, 12],
  [76, 87, -12], [115, 88, 25], [154, 86, -30], [194, 88, 18],
  [99, 105, -20], [138, 107, 15], [175, 105, -8],
  [110, 54, 38], [166, 54, -35], [128, 78, -5], [175, 80, 35],
];

// Independent, stable random samples avoid repeated seasoning motifs across chips.
const SEASONING = CHIPS.map((_, index) => {
  let seed = 82719 + index * 1973;
  const random = () => {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let n = Math.imul(seed ^ seed >>> 15, 1 | seed);
    n = n + Math.imul(n ^ n >>> 7, 61 | n) ^ n;
    return ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
  const colors = ['#9c4923', '#bd5827', '#da7331', '#713c23', '#e99845'];
  return Array.from({ length: 115 }, () => ({
    x: -24 + random() * 49,
    y: -20 + random() * 40,
    rx: .45 + random() * .9,
    ry: .3 + random() * .65,
    angle: random() * 180,
    color: colors[Math.floor(random() * colors.length)],
    opacity: .65 + random() * .3,
  }));
});

// A three-quarter view: the wide opening exposes chips across the whole bag.
export default function FilledChipBag() {
  const id = useId();

  return (
    <div className="filled-chip-bag" aria-hidden="true">
      <svg viewBox="0 0 300 260" focusable="false">
        <defs>
          <linearGradient id={`${id}-pouch`} x1="0" y1="0" x2="1" y2=".2">
            <stop offset="0" stopColor="#8c9b24" />
            <stop offset=".18" stopColor="#d8e83e" />
            <stop offset=".42" stopColor="#eef68b" />
            <stop offset=".65" stopColor="#d8e83e" />
            <stop offset="1" stopColor="#9ba72a" />
          </linearGradient>
          <linearGradient id={`${id}-foil`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a7aaa4" />
            <stop offset=".35" stopColor="#fffdf0" />
            <stop offset=".7" stopColor="#c0c2b5" />
            <stop offset="1" stopColor="#fffdf0" />
          </linearGradient>
          <radialGradient id={`${id}-gold`}>
            <stop offset="0" stopColor="#ffe3a0" />
            <stop offset=".7" stopColor="#f1bc62" />
            <stop offset="1" stopColor="#dca047" />
          </radialGradient>
          <clipPath id={`${id}-opening`}>
            <ellipse cx="150" cy="77" rx="102" ry="46" />
          </clipPath>
          <clipPath id={`${id}-chip-surface`}>
            <path d={CHIP_OUTLINE} />
          </clipPath>
          {SEASONING.map((grains, index) => (
            <g key={index} id={`${id}-chip-${index}`}>
              <path d={CHIP_OUTLINE} fill={`url(#${id}-gold)`} />
              <g clipPath={`url(#${id}-chip-surface)`}>
                <path d={CHIP_OUTLINE} fill="#d46b2e" opacity=".12" />
                {grains.map((grain, grainIndex) => (
                  <ellipse key={grainIndex} cx={grain.x} cy={grain.y}
                    rx={grain.rx} ry={grain.ry} fill={grain.color} opacity={grain.opacity}
                    transform={`rotate(${grain.angle} ${grain.x} ${grain.y})`} />
                ))}
              </g>
              <path d={CHIP_OUTLINE} fill="none" stroke="#d69841" strokeWidth="1.4" />
              <path d="M-16 5Q-8 18 10 11M-10-10Q0-15 9-9" fill="none" stroke="#ffe1a0" strokeWidth="2" strokeLinecap="round" opacity=".85" />
            </g>
          ))}
        </defs>
        <g transform="rotate(-10 150 116)">
          <ellipse cx="155" cy="235" rx="83" ry="10" fill="var(--ink)" opacity=".16" />
          <path d="M48 78C49 106 68 122 59 152C54 176 69 196 62 218L76 232Q151 249 232 225L238 214C228 191 247 169 239 147C233 123 254 104 252 78Z" fill={`url(#${id}-pouch)`} stroke="var(--ink)" strokeWidth="2" />
          <path d="M52 103L76 138L63 155L84 176L72 209M246 104L224 138L239 155L219 181L233 210" fill="none" stroke="#687717" strokeWidth="2" opacity=".5" />
          <path d="M78 131L91 155M78 180L91 215M211 144L204 178M202 196L214 216" fill="none" stroke="#f7fbc8" strokeWidth="3" opacity=".65" />
          <path d="M94 139Q101 151 99 158M191 137Q185 148 190 155M100 203L109 216M192 202L185 219" fill="none" stroke="#839222" strokeWidth="1.2" opacity=".45" />
          <path d="M107 132Q120 143 136 139M172 198Q153 207 126 201" fill="none" stroke="#fbffdc" strokeWidth="2" opacity=".6" />
          <path d="M64 220Q150 243 234 217L232 225Q151 249 76 232Z" fill="#aebc30" stroke="var(--ink)" strokeWidth="1" />
          {Array.from({ length: 19 }, (_, i) => (
            <path key={i} d={`M${78 + i * 8} ${228 + Math.sin(i / 5) * 5}l-1 7`} stroke="#778523" strokeWidth="1" opacity=".6" />
          ))}
          <ellipse cx="150" cy="77" rx="108" ry="52" fill={`url(#${id}-foil)`} stroke="var(--ink)" strokeWidth="1.5" />
          <ellipse cx="150" cy="77" rx="102" ry="46" fill="#a87334" />
          <g clipPath={`url(#${id}-opening)`}>
            {CHIPS.map(([x, y, angle], index) => (
              <use key={index} href={`#${id}-chip-${index}`} transform={`translate(${x} ${y}) rotate(${angle})`} />
            ))}
          </g>
          <ellipse cx="150" cy="77" rx="104" ry="48" fill="none" stroke="#eeeede" strokeWidth="2.5" />
          <path d="M61 47L64 53M84 34L87 40M114 27L116 33M149 24L150 30M187 29L185 35M219 40L216 46M241 56L236 59" fill="none" stroke="#8b8d82" strokeWidth="1.3" opacity=".65" />
          <path d="M44 84L50 87L54 96Q148 164 246 95L251 88L256 85" fill="none" stroke={`url(#${id}-foil)`} strokeWidth="4" />
          <text x="150" y="168" textAnchor="middle" fill="var(--ink)" className="brand" fontWeight="800" fontSize="16">
            <tspan x="150">TOO MUCH</tspan>
            <tspan x="150" dy="19">CHIPS</tspan>
          </text>
        </g>
      </svg>
    </div>
  );
}

