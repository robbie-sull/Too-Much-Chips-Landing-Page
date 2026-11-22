import { useId } from 'react';
import { CHIP_SHAPES, ChipBody, scatterSeasoning, SEASONING } from './chipArt';

type Flavor = 'bbq' | 'korean-spice';

const CHIPS = {
  bbq: { shapes: [0, 1, 5], seed: 7193, seasoning: SEASONING.bbq },
  'korean-spice': { shapes: [3, 0, 1], seed: 29371, seasoning: SEASONING.koreanSpice },
};
const GRAINS = {
  bbq: CHIPS.bbq.shapes.map((shape, i) => scatterSeasoning(CHIP_SHAPES[shape], CHIPS.bbq.seed + i * 107, 32, SEASONING.bbq.colors, 2)),
  'korean-spice': CHIPS['korean-spice'].shapes.map((shape, i) => scatterSeasoning(CHIP_SHAPES[shape], CHIPS['korean-spice'].seed + i * 107, 36, SEASONING.koreanSpice.colors, 2)),
};
const POSITIONS = ['translate(1 0) rotate(-17 40 30)', 'translate(66 3) rotate(18 40 30)', 'translate(35 30) rotate(-3 40 30)'];

export default function FlavorChipArtwork({ flavor }: { flavor: Flavor }) {
  const id = useId();
  const { shapes, seasoning } = CHIPS[flavor];
  return (
    <svg className="order-bag-picture" viewBox="0 0 150 100" aria-hidden="true" focusable="false">
      {shapes.map((shape, index) => (
        <g key={index} transform={POSITIONS[index]}>
          <g transform="scale(.85)">
            <path d={CHIP_SHAPES[shape].outline} transform="translate(1 3)" fill="#301d13" opacity=".25" />
            <ChipBody id={`${id}-${index}`} shape={CHIP_SHAPES[shape]} grains={GRAINS[flavor][index]} dust={seasoning.dust} />
          </g>
        </g>
      ))}
    </svg>
  );
}
