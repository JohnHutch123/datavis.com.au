// Builds every logo image the site uses from the source logos in assets/logo/.
// Run after changing a source logo or the wording below:  npm run images
//
//   assets/logo/logo-light-source.png  logo on white  -> header in light mode
//   assets/logo/logo-dark-source.png   logo on grey   -> header in dark mode
//
// The source files have solid backgrounds; this script removes them (keeping
// smooth edges) and writes:
//   public/images/logo-light.png  public/images/logo-dark.png   transparent wordmarks
//   public/images/logo-512.png    square icon on white (iPhone home screen)
//   public/favicon.png            48x48 browser tab icon
//   public/images/og.png          1200x630 link-preview card
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const SRC_LIGHT = here('../assets/logo/logo-light-source.png');
const SRC_DARK = here('../assets/logo/logo-dark-source.png');
const OUT = (p) => here(`../public/${p}`);

// The square icon uses the last letters of the light logo: 3 = "vïs".
// (Letters that touch, like "ta", count as one, so counting from the end is reliable.)
const MARK_LAST_LETTERS = 3;

/** Turn the background colour (read from the top-left pixel) into transparency. */
async function removeBackground(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const bg = [data[0], data[1], data[2]];
  for (let i = 0; i < data.length; i += 4) {
    // Alpha = how far the pixel is from the background, relative to how far it could be.
    let a = 0;
    for (let c = 0; c < 3; c++) {
      const v = data[i + c];
      const d = v > bg[c] ? (v - bg[c]) / (255 - bg[c] || 1) : (bg[c] - v) / (bg[c] || 1);
      if (d > a) a = d;
    }
    if (a < 0.04) a = 0;
    if (a === 0) {
      data[i + 3] = 0;
      continue;
    }
    // Recover the logo colour that was blended with the background at the edges.
    for (let c = 0; c < 3; c++) {
      data[i + c] = Math.max(0, Math.min(255, Math.round((data[i + c] - bg[c] * (1 - a)) / a)));
    }
    data[i + 3] = Math.round(a * 255);
  }
  return sharp(data, { raw: info }).png().toBuffer().then((b) => sharp(b).trim({ threshold: 1 }).png().toBuffer());
}

const light = await removeBackground(SRC_LIGHT);
const dark = await removeBackground(SRC_DARK);

// Header wordmarks: 640 px wide (sharp on high-density screens at the header size).
for (const [name, buf] of [['logo-light', light], ['logo-dark', dark]]) {
  const out = await sharp(buf).resize({ width: 640 }).png({ compressionLevel: 9, palette: false }).toFile(OUT(`images/${name}.png`));
  console.log(`images/${name}.png ${out.width}x${out.height}`);
}

// Square mark: crop "vïs" (the last letters of "datavis") from the transparent
// light logo, found by looking for the gaps between letters above the underline.
const { data: px, info: pi } = await sharp(light).raw().toBuffer({ resolveWithObject: true });
const opaque = (x, y) => px[(y * pi.width + x) * 4 + 3] > 40;
let underlineTop = pi.height;
for (let y = pi.height - 1; y >= 0; y--) {
  let n = 0;
  for (let x = 0; x < pi.width; x++) if (opaque(x, y)) n++;
  if (n > pi.width * 0.6) underlineTop = y;
  else if (underlineTop < pi.height) break;
}
const letters = [];
let start = -1;
for (let x = 0; x < pi.width; x++) {
  let ink = false;
  for (let y = 0; y < underlineTop - 2 && !ink; y++) ink = opaque(x, y);
  if (ink && start < 0) start = x;
  if (!ink && start >= 0) { letters.push([start, x]); start = -1; }
}
if (start >= 0) letters.push([start, pi.width]);
if (letters.length < MARK_LAST_LETTERS) throw new Error(`Found ${letters.length} letters in the logo; adjust MARK_LAST_LETTERS`);
const markLeft = Math.max(0, letters[letters.length - MARK_LAST_LETTERS][0] - 4);
const markBuf = await sharp(light)
  .extract({ left: markLeft, top: 0, width: pi.width - markLeft, height: pi.height })
  .trim({ threshold: 1 })
  .png()
  .toBuffer();

async function squareIcon(size, pad) {
  const inner = await sharp(markBuf).resize({ width: size - pad * 2, height: size - pad * 2, fit: 'inside' }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([{ input: inner, gravity: 'centre' }])
    .png();
}
await (await squareIcon(512, 72)).toFile(OUT('images/logo-512.png'));
await (await squareIcon(48, 4)).toFile(OUT('favicon.png'));
console.log('images/logo-512.png 512x512, favicon.png 48x48');

// Link-preview card.
const lines = ['Vulkan graphics for Delphi,', 'data visualisation and apps'];
const chips = ['Vulkan', 'Delphi', 'Object Pascal', 'GitHub', 'Claude'];
const font = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
let x = 96;
const chipSvg = chips
  .map((c) => {
    const w = 28 + c.length * 13.5;
    const s =
      `<g transform="translate(${x},468)"><rect width="${w}" height="44" rx="22" fill="#1c2538" stroke="#263049"/>` +
      `<text x="${w / 2}" y="29" text-anchor="middle" font-family="${font}" font-size="21" fill="#c9d2e3">${c}</text></g>`;
    x += w + 12;
    return s;
  })
  .join('');
const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="a" cx="15%" cy="0%" r="70%"><stop offset="0" stop-color="#4cc2ff" stop-opacity=".28"/><stop offset="1" stop-color="#4cc2ff" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="95%" cy="15%" r="60%"><stop offset="0" stop-color="#8b7bff" stop-opacity=".26"/><stop offset="1" stop-color="#8b7bff" stop-opacity="0"/></radialGradient>
    <linearGradient id="t" x1="0" x2="1"><stop offset="0" stop-color="#4cc2ff"/><stop offset="1" stop-color="#8b7bff"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0b0f17"/>
  <rect width="1200" height="630" fill="url(#a)"/>
  <rect width="1200" height="630" fill="url(#b)"/>
  <text x="96" y="310" font-family="${font}" font-size="64" font-weight="700" fill="url(#t)">${lines[0]}</text>
  <text x="96" y="390" font-family="${font}" font-size="64" font-weight="700" fill="#e6eaf2">${lines[1]}</text>
  ${chipSvg}
  <text x="1104" y="566" text-anchor="end" font-family="${font}" font-size="24" fill="#9aa5ba">www.datavis.com.au · Pty Ltd</text>
  <rect x="0" y="622" width="1200" height="8" fill="url(#t)"/>
</svg>`;
// Logo panel: the light logo on a white rounded card, as the brand was designed.
const logoW = 380;
const logoImg = await sharp(light).resize({ width: logoW }).toBuffer();
const logoH = (await sharp(logoImg).metadata()).height ?? 85;
const panel = await sharp({
  create: { width: logoW + 56, height: logoH + 40, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
})
  .composite([
    { input: logoImg, left: 28, top: 20 },
    // Round the panel's corners.
    {
      input: Buffer.from(`<svg width="${logoW + 56}" height="${logoH + 40}"><rect width="100%" height="100%" rx="18" fill="#fff"/></svg>`),
      blend: 'dest-in',
    },
  ])
  .png()
  .toBuffer();
await sharp(Buffer.from(card)).composite([{ input: panel, left: 96, top: 72 }]).png().toFile(OUT('images/og.png'));
console.log('images/og.png 1200x630');
