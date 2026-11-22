import { useId } from 'react';
import { CHIP_SHAPES, ChipBody, scatterSeasoning, SEASONING } from './chipArt';
import './SeasoningComparison.css';

// The same chip both times, so the only difference is the seasoning.
const SHAPE = CHIP_SHAPES[1];
const HEAVY = scatterSeasoning(SHAPE, 17429, 170, SEASONING.house.colors, 1.15);
const LIGHT = scatterSeasoning(SHAPE, 5521, 7, SEASONING.house.colors, 1.15);

function ComparisonChip({ seasoned }: { seasoned: boolean }) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 76" aria-hidden="true" focusable="false">
      <ChipBody id={id} shape={SHAPE} grains={seasoned ? HEAVY : LIGHT} dust={seasoned ? SEASONING.house.dust : undefined} />
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
