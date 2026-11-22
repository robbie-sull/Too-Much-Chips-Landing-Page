// Shared potato-chip drawing: thin, curled, crinkle-edged slices.
// Every chip is drawn in a 100 × 76 box. Shapes and seasoning come from fixed
// seeds, so the art is identical on every visit and never falls into a pattern.

type Point = [number, number];
type Spot = { x: number; y: number; rx: number; ry: number; angle: number };
export type Grain = Spot & { color: string };

export type ChipShape = {
  outline: string;
  polygon: Point[];
  shine: string;
  shade: string;
  ridge: string;
  shadeFrom: Point;
  shadeTo: Point;
  blisters: Spot[];
  toast: Spot[];
};

const CX = 50;
const CY = 38;
const TAU = Math.PI * 2;

export function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (value: number) => Math.round(value * 10) / 10;

// Smooth curve through the points (Catmull-Rom written as cubic Béziers).
function spline(points: Point[], closed: boolean, move = true) {
  const count = points.length;
  const at = (i: number) => closed ? points[(i + count) % count] : points[Math.max(0, Math.min(count - 1, i))];
  let d = `${move ? 'M' : 'L'}${n(points[0][0])} ${n(points[0][1])}`;
  for (let i = 0; i < (closed ? count : count - 1); i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    d += `C${n(p1[0] + (p2[0] - p0[0]) / 6)} ${n(p1[1] + (p2[1] - p0[1]) / 6)} ${n(p2[0] - (p3[0] - p1[0]) / 6)} ${n(p2[1] - (p3[1] - p1[1]) / 6)} ${n(p2[0])} ${n(p2[1])}`;
  }
  return closed ? `${d}Z` : d;
}

const towardCenter = ([x, y]: Point, amount: number): Point => [x + (CX - x) * amount, y + (CY - y) * amount];
const angularGap = (a: number, b: number) => Math.abs(((a - b + Math.PI * 3) % TAU) - Math.PI);
const centroid = (points: Point[]): Point => points.reduce<Point>((sum, p) => [sum[0] + p[0] / points.length, sum[1] + p[1] / points.length], [0, 0]);

type ShapeOptions = {
  seed: number;
  rx: number; // half-width; a small ry makes a chip seen almost edge-on
  ry: number;
  tilt: number;
  fold: number; // direction of the curl across the chip
  bend: number;
  snapped?: number; // direction of a broken-off edge
};

function buildShape({ seed, rx, ry, tilt, fold, bend, snapped }: ShapeOptions): ChipShape {
  const random = seeded(seed);
  // Low waves give the slice its shape; the fast ones crinkle the fried edge.
  const waves = [[3, .04], [4, .026], [5, .016], [7, .012], [9, .03], [10, .011], [11, .024], [13, .007]]
    .map(([k, amp]) => ({ k, amp: amp * (.55 + random() * .9), phase: random() * TAU }));
  const unit = Array.from({ length: 44 }, (_, i) => {
    const a = (i / 44) * TAU + (random() - .5) * .04;
    let r = 1 + waves.reduce((sum, w) => sum + w.amp * Math.cos(w.k * a + w.phase), 0);
    if (snapped !== undefined) {
      const reach = Math.cos(a - snapped);
      const limit = .8 + (random() - .5) * .035;
      if (r * reach > limit) r = limit / reach;
    }
    return { a, r };
  });
  const cos = Math.cos(tilt);
  const sin = Math.sin(tilt);
  const place = (a: number, r: number): Point => {
    const x = Math.cos(a) * r * rx;
    const y = Math.sin(a) * r * ry;
    return [CX + x * cos - y * sin, CY + x * sin + y * cos];
  };
  const polygon = unit.map(({ a, r }) => place(a, r));

  // Light catches the far rim.
  const shineCenter = -Math.PI / 2 - tilt - .55 + (random() - .5) * .3;
  const shine = spline(unit
    .filter((p) => angularGap(p.a, shineCenter) < .5)
    .sort((p, q) => angularGap(p.a, shineCenter - .5) - angularGap(q.a, shineCenter - .5))
    .map(({ a, r }) => towardCenter(place(a, r), .17)), false);

  // The curl: a soft bend splits the slice into a lit side and a shaded side.
  const nearest = (a: number) => unit.reduce((best, p, i) => angularGap(p.a, a) < angularGap(unit[best].a, a) ? i : best, 0);
  const [ia, ib] = [nearest(fold + Math.PI), nearest(fold)];
  const [pa, pb] = [polygon[ia], polygon[ib]];
  const along: Point = [pb[0] - pa[0], pb[1] - pa[1]];
  const length = Math.hypot(...along);
  const normal: Point = [-along[1] / length, along[0] / length];
  const side = normal[0] * .6 + normal[1] * .8 > 0 ? 1 : -1; // light from the upper left
  const curve: Point[] = [pa, ...[.33, .67].map((t): Point => {
    const sway = bend * (t < .5 ? .5 : .35) * length * side;
    return [pa[0] + along[0] * t - normal[0] * sway, pa[1] + along[1] * t - normal[1] * sway];
  }), pb];
  const arc = (step: number) => {
    const run: Point[] = [];
    for (let i = ib; i !== ia; i = (i + step + unit.length) % unit.length) run.push(polygon[i]);
    return [...run, polygon[ia]];
  };
  const facing = (run: Point[]) => {
    const [x, y] = centroid(run);
    return ((x - CX) * normal[0] + (y - CY) * normal[1]) * side;
  };
  const shadeArc = [arc(1), arc(-1)].sort((a, b) => facing(b) - facing(a))[0];

  const spot = (minR: number, maxR: number, size: number): Spot => {
    const a = random() * TAU;
    const [x, y] = place(a, minR + random() * (maxR - minR));
    const width = size * (.6 + random() * .8);
    return { x, y, rx: width, ry: width * (.3 + random() * .2), angle: (a + tilt) * 180 / Math.PI + 90 };
  };

  return {
    outline: spline(polygon, true),
    polygon,
    shine,
    shade: `${spline(curve, false)}${spline(shadeArc.slice(1), false, false)}Z`,
    ridge: spline(curve.map(([x, y]): Point => [x - normal[0] * side * 1.6, y - normal[1] * side * 1.6]), false),
    shadeFrom: centroid(curve),
    shadeTo: centroid(shadeArc),
    blisters: Array.from({ length: 3 }, () => spot(.2, .62, 2.2)),
    toast: Array.from({ length: 6 }, () => spot(.86, 1, 5)),
  };
}

// Broad, snapped, and nearly edge-on chips, so groups of chips look like chips.
export const CHIP_SHAPES: ChipShape[] = [
  buildShape({ seed: 3107, rx: 42, ry: 30, tilt: -.12, fold: -.15, bend: .22 }),
  buildShape({ seed: 8821, rx: 40, ry: 31, tilt: .18, fold: 1.25, bend: .2, snapped: -.4 }),
  buildShape({ seed: 5153, rx: 43, ry: 20, tilt: .05, fold: .25, bend: -.16 }),
  buildShape({ seed: 1979, rx: 39, ry: 31, tilt: -.3, fold: 2.1, bend: .24, snapped: 2.5 }),
  buildShape({ seed: 6404, rx: 42, ry: 17, tilt: .32, fold: .6, bend: .2 }),
  buildShape({ seed: 7290, rx: 41, ry: 25, tilt: -.25, fold: 2.6, bend: .2 }),
];

function inside([x, y]: Point, polygon: Point[]) {
  let hit = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

export const SEASONING = {
  house: { colors: ['#c9461f', '#e0612a', '#a83a1b', '#ea8434'], dust: '#e3742b' },
  bbq: { colors: ['#8d3a1c', '#b04a22', '#6f2f19', '#cf6a2b'], dust: '#cf5f26' },
  koreanSpice: { colors: ['#b3261c', '#d93a22', '#7c1d16', '#e8562a'], dust: '#d8401f' },
};

// Natural seasoning: an uneven dusting with denser drifts (one settles in the
// curl), never rows or grids.
export function scatterSeasoning(shape: ChipShape, seed: number, count: number, colors: string[], size: number) {
  const random = seeded(seed);
  const drifts = [shape.shadeTo, ...Array.from({ length: 2 }, (): Point => [24 + random() * 52, 18 + random() * 40])];
  const grains: Grain[] = [];
  for (let tries = 0; grains.length < count && tries < count * 40; tries++) {
    const x = 6 + random() * 88;
    const y = 4 + random() * 68;
    if (!inside([x, y], shape.polygon)) continue;
    const pull = drifts.reduce((sum, [dx, dy]) => sum + Math.exp(-((x - dx) ** 2 + (y - dy) ** 2) / 260), 0);
    if (random() > .38 + pull * .6) continue;
    const rx = size * (.55 + random() * .75);
    grains.push({ x, y, rx, ry: rx * (.5 + random() * .35), angle: random() * 180, color: colors[Math.floor(random() * colors.length)] });
  }
  return grains;
}

type ChipBodyProps = {
  id: string; // unique per chip, e.g. from useId()
  shape: ChipShape;
  grains: Grain[];
  dust?: string; // tints heavily seasoned chips
};

export function ChipBody({ id, shape, grains, dust }: ChipBodyProps) {
  return (
    <g>
      <defs>
        <clipPath id={`${id}-clip`}><path d={shape.outline} /></clipPath>
        <linearGradient id={`${id}-face`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fde6a4" />
          <stop offset="1" stopColor="#f4c862" />
        </linearGradient>
        <linearGradient id={`${id}-shade`} gradientUnits="userSpaceOnUse"
          x1={n(shape.shadeFrom[0])} y1={n(shape.shadeFrom[1])} x2={n(shape.shadeTo[0])} y2={n(shape.shadeTo[1])}>
          <stop offset="0" stopColor="#e39b3b" stopOpacity="0" />
          <stop offset=".5" stopColor="#e39b3b" stopOpacity=".36" />
          <stop offset="1" stopColor="#d9892f" stopOpacity=".56" />
        </linearGradient>
        {dust && (
          <radialGradient id={`${id}-dust`} gradientUnits="userSpaceOnUse" cx={n(shape.shadeTo[0])} cy={n(shape.shadeTo[1])} r="40">
            <stop offset="0" stopColor={dust} stopOpacity=".4" />
            <stop offset="1" stopColor={dust} stopOpacity=".12" />
          </radialGradient>
        )}
      </defs>
      <path d={shape.outline} fill={`url(#${id}-face)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <path d={shape.outline} fill="none" stroke="#e6a443" strokeWidth="4" opacity=".5" />
        {shape.toast.map((s, i) => (
          <ellipse key={i} cx={n(s.x)} cy={n(s.y)} rx={n(s.rx)} ry={n(s.ry)} fill="#d08a33" opacity=".38" transform={`rotate(${Math.round(s.angle)} ${n(s.x)} ${n(s.y)})`} />
        ))}
        <path d={shape.shade} fill={`url(#${id}-shade)`} />
        <path d={shape.ridge} fill="none" stroke="#fff2c8" strokeWidth="5" strokeLinecap="round" opacity=".3" />
        {dust && <path d={shape.outline} fill={`url(#${id}-dust)`} />}
        {shape.blisters.map((s, i) => (
          <g key={i}>
            <circle cx={n(s.x)} cy={n(s.y)} r={n(s.rx * .7)} fill="#fdebb8" opacity=".9" />
            <path d={`M${n(s.x - s.rx * .7)} ${n(s.y)}a${n(s.rx * .7)} ${n(s.rx * .7)} 0 0 0 ${n(s.rx * 1.4)} 0`} fill="none" stroke="#d99a40" strokeWidth=".6" />
          </g>
        ))}
        {grains.map((g, i) => (
          <ellipse key={i} cx={n(g.x)} cy={n(g.y)} rx={n(g.rx)} ry={n(g.ry)} fill={g.color} transform={`rotate(${Math.round(g.angle)} ${n(g.x)} ${n(g.y)})`} />
        ))}
      </g>
      <path d={shape.outline} fill="none" stroke="#c07d2b" strokeWidth="1" strokeLinejoin="round" />
      <path d={shape.shine} fill="none" stroke="#fff6dc" strokeWidth="1.5" strokeLinecap="round" opacity=".8" />
    </g>
  );
}
