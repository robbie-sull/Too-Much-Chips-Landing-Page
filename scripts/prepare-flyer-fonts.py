"""Create static print-safe instances from the bundled licensed variable fonts."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

folder = Path(__file__).resolve().parents[1] / "artifacts/too-much-chips/src/assets/fonts"
for family, weights in [("syne", [800]), ("dm-sans", [400, 500])]:
    font = TTFont(folder / f"{family}-variable.woff2")
    for weight in weights:
        axes = {axis.axisTag: axis.defaultValue for axis in font["fvar"].axes}
        axes["wght"] = weight
        static = instantiateVariableFont(font, axes, inplace=False)
        static.flavor = None
        static.save(folder / f"{family}-{weight}.ttf")
