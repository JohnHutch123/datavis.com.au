// Generates the social preview image (public/images/og.png, 1200x630) and the
// square logo (public/images/logo-512.png) from public/images/datavis-logo.svg.
// Run after changing the logo or the wording below:  npm run images
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../public/images/', import.meta.url);
const logoSvg = await readFile(new URL('datavis-logo.svg', root));
const logo = `data:image/svg+xml;base64,${logoSvg.toString('base64')}`;

const title = 'Datavis Pty Ltd';
const lines = ['Vulkan graphics for Delphi,', 'data visualisation and apps'];
const chips = ['Vulkan', 'Delphi', 'Object Pascal', 'GitHub', 'Claude'];
const url = 'www.datavis.com.au';
const font = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

let x = 96;
const chipSvg = chips
  .map((c) => {
    const w = 28 + c.length * 13.5;
    const s = `<g transform="translate(${x},468)"><rect width="${w}" height="44" rx="22" fill="#1c2538" stroke="#263049"/>` +
      `<text x="${w / 2}" y="29" text-anchor="middle" font-family="${font}" font-size="21" fill="#c9d2e3">${c}</text></g>`;
    x += w + 12;
    return s;
  })
  .join('');

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="a" cx="15%" cy="0%" r="70%"><stop offset="0" stop-color="#4cc2ff" stop-opacity=".28"/><stop offset="1" stop-color="#4cc2ff" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="95%" cy="15%" r="60%"><stop offset="0" stop-color="#8b7bff" stop-opacity=".26"/><stop offset="1" stop-color="#8b7bff" stop-opacity="0"/></radialGradient>
    <linearGradient id="t" x1="0" x2="1"><stop offset="0" stop-color="#4cc2ff"/><stop offset="1" stop-color="#8b7bff"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0b0f17"/>
  <rect width="1200" height="630" fill="url(#a)"/>
  <rect width="1200" height="630" fill="url(#b)"/>
  <image href="${logo}" x="96" y="84" width="96" height="96"/>
  <text x="216" y="148" font-family="${font}" font-size="44" font-weight="700" fill="#e6eaf2">${title}</text>
  <text x="96" y="290" font-family="${font}" font-size="64" font-weight="700" fill="url(#t)">${lines[0]}</text>
  <text x="96" y="370" font-family="${font}" font-size="64" font-weight="700" fill="#e6eaf2">${lines[1]}</text>
  ${chipSvg}
  <text x="1104" y="566" text-anchor="end" font-family="${font}" font-size="24" fill="#9aa5ba">${url}</text>
  <rect x="0" y="622" width="1200" height="8" fill="url(#t)"/>
</svg>`;

await sharp(Buffer.from(og)).png().toFile(fileURLToPath(new URL('og.png', root)));
await sharp(logoSvg, { density: 600 }).resize(512, 512).png().toFile(fileURLToPath(new URL('logo-512.png', root)));
console.log('Wrote public/images/og.png and public/images/logo-512.png');
