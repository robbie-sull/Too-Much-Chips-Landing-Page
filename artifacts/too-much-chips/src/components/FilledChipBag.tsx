import { useId } from 'react';

// A three-quarter view: the wide opening exposes chips across the whole bag.
export default function FilledChipBag() {
  const id = useId();
  const chips = [
    [83, 49, -25], [119, 42, 15], [158, 42, -12], [198, 50, 25],
    [60, 69, 20], [98, 64, -10], [139, 64, 28], [179, 65, -20], [216, 70, 12],
    [76, 87, -12], [115, 88, 25], [154, 86, -30], [194, 88, 18],
    [99, 105, -20], [138, 107, 15], [175, 105, -8],
    [110, 54, 38], [166, 54, -35], [128, 78, -5], [175, 80, 35],
  ];

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
          <g id={`${id}-chip`}>
            <path d="M-21-5C-25-16-9-22 1-18C14-22 27-9 24 2C26 12 11 20 0 17C-14 20-25 8-21-5Z" fill={`url(#${id}-gold)`} stroke="#d69841" strokeWidth="1.4" />
            <path d="M-16 5Q-8 18 10 11M-10-10Q0-15 9-9" fill="none" stroke="#ffe1a0" strokeWidth="2" strokeLinecap="round" />
            <g fill="#b97430" opacity=".7">
              <circle cx="-9" cy="-3" r="1.3" /><circle cx="8" cy="4" r="1.6" />
              <circle cx="1" cy="-10" r="1" /><circle cx="-3" cy="9" r="1" />
              <circle cx="16" cy="-4" r="1.1" />
            </g>
          </g>
        </defs>
        <g transform="rotate(-10 150 116)">
          <ellipse cx="155" cy="235" rx="83" ry="10" fill="var(--ink)" opacity=".16" />
          <path d="M48 78C49 106 68 122 59 152C54 176 69 196 62 218L76 232Q151 249 232 225L238 214C228 191 247 169 239 147C233 123 254 104 252 78Z" fill={`url(#${id}-pouch)`} stroke="var(--ink)" strokeWidth="2" />
          <path d="M52 103L76 138L63 155L84 176L72 209M246 104L224 138L239 155L219 181L233 210" fill="none" stroke="#687717" strokeWidth="2" opacity=".5" />
          <path d="M78 131L91 155M78 180L91 215M211 144L204 178M202 196L214 216" fill="none" stroke="#f7fbc8" strokeWidth="3" opacity=".65" />
          <path d="M64 220Q150 243 234 217L232 225Q151 249 76 232Z" fill="#aebc30" stroke="var(--ink)" strokeWidth="1" />
          {Array.from({ length: 19 }, (_, i) => (
            <path key={i} d={`M${78 + i * 8} ${228 + Math.sin(i / 5) * 5}l-1 7`} stroke="#778523" strokeWidth="1" opacity=".6" />
          ))}
          <ellipse cx="150" cy="77" rx="108" ry="52" fill={`url(#${id}-foil)`} stroke="var(--ink)" strokeWidth="1.5" />
          <ellipse cx="150" cy="77" rx="102" ry="46" fill="#a87334" />
          <g clipPath={`url(#${id}-opening)`}>
            {chips.map(([x, y, angle], index) => (
              <use key={index} href={`#${id}-chip`} transform={`translate(${x} ${y}) rotate(${angle})`} />
            ))}
          </g>
          <ellipse cx="150" cy="77" rx="104" ry="48" fill="none" stroke="#eeeede" strokeWidth="2.5" />
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

