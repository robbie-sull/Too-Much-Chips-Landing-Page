"""Verify and render the generated flyer PDF. Run: python scripts/verify-flyer.py"""
from pathlib import Path
import pymupdf as fitz
from PIL import Image
import zxingcpp

root = Path(__file__).resolve().parents[1]
pdf = fitz.open(root / "public/too-much-chips-flyer.pdf")
assert len(pdf) == 1, f"Expected one page, got {len(pdf)}"
page = pdf[0]
assert tuple(page.rect) == (0, 0, 612, 792), page.rect
text = page.get_text()
for required in ["LESS BAG.", "MORE CHIPS.", "BBQ", "Korean Spice", "$3.50", "SCAN TO JOIN THE MONTHLY DROP", "toomuchchips.com"]:
    assert required in text, f"Missing or clipped text: {required}"
for controls in ["Back to site", "Download PDF", "Print flyer", "US Letter", "temporary development preview"]:
    assert controls not in text, f"Preview controls leaked into PDF: {controls}"
assert any(link.get("uri") == "https://toomuchchips.com/?ref=flyer#drop" for link in page.get_links()), "Missing clickable drop-list link"
fonts = [font[3] for font in page.get_fonts()]
assert all(any(name in font for font in fonts) for name in ["Syne", "DMSans", "DMMono"]), fonts
for font in page.get_fonts():
    assert pdf.extract_font(font[0])[3], f"Font not embedded: {font[3]}"
out = root / "generated-artifacts"
out.mkdir(exist_ok=True)
pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2))
pixmap.save(out / "flyer-pdf.png")
decoded = zxingcpp.read_barcodes(Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples))
assert [code.text for code in decoded] == ["https://toomuchchips.com/?ref=flyer#drop"], decoded
# Also decode at ordinary 96 DPI, not only at high-resolution export size.
small = page.get_pixmap(matrix=fitz.Matrix(96 / 72, 96 / 72))
assert any(code.text == "https://toomuchchips.com/?ref=flyer#drop" for code in zxingcpp.read_barcodes(Image.frombytes("RGB", (small.width, small.height), small.samples)))
print("PASS: one US Letter page, embedded fonts, exact QR at 96/144 DPI, clickable drop-list link, no preview controls")
print("Visual render:", out / "flyer-pdf.png")
