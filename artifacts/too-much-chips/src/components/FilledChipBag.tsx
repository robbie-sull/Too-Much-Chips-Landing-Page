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
      <svg viewBox="0 0 300 220" focusable="false">
        <defs>
          <clipPath id={`${id}-opening`}>
            <ellipse cx="150" cy="77" rx="102" ry="46" />
          </clipPath>
          <g id={`${id}-chip`}>
            <path d="M-21-5C-25-16-9-22 1-18C14-22 27-9 24 2C26 12 11 20 0 17C-14 20-25 8-21-5Z" fill="#f6c36a" stroke="#d69841" strokeWidth="1.4" />
            <path d="M-16 5Q-8 18 10 11M-10-10Q0-15 9-9" fill="none" stroke="#ffe1a0" strokeWidth="2" strokeLinecap="round" />
            <g fill="#b97430" opacity=".7">
              <circle cx="-9" cy="-3" r="1.3" /><circle cx="8" cy="4" r="1.6" />
              <circle cx="1" cy="-10" r="1" /><circle cx="-3" cy="9" r="1" />
              <circle cx="16" cy="-4" r="1.1" />
            </g>
          </g>
        </defs>
        <g transform="rotate(-10 150 116)">
          <ellipse cx="155" cy="193" rx="87" ry="13" fill="var(--ink)" opacity=".16" />
          <path d="M48 78L65 178Q150 212 235 178L252 78Z" fill="var(--lime)" stroke="var(--ink)" strokeWidth="2.5" />
          <path d="M223 96L211 183L235 178L252 78Z" fill="#b6c52e" />
          <ellipse cx="150" cy="77" rx="105" ry="49" fill="#ded7b4" stroke="var(--ink)" strokeWidth="2.5" />
          <ellipse cx="150" cy="77" rx="102" ry="46" fill="#a87334" />
          <g clipPath={`url(#${id}-opening)`}>
            {chips.map(([x, y, angle], index) => (
              <use key={index} href={`#${id}-chip`} transform={`translate(${x} ${y}) rotate(${angle})`} />
            ))}
          </g>
          <ellipse cx="150" cy="77" rx="105" ry="49" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
          <path d="M47 81Q150 166 253 81" fill="none" stroke="var(--paper)" strokeWidth="4" />
          <text x="150" y="153" textAnchor="middle" fill="var(--ink)" className="brand" fontWeight="800" fontSize="16">
            <tspan x="150">TOO MUCH</tspan>
            <tspan x="150" dy="19">CHIPS</tspan>
          </text>
        </g>
      </svg>
    </div>
  );
}

