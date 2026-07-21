// Генератор OG-зображення (1200×630) для превʼю в соцмережах/месенджерах (ТЗ §9).
//
// Статичне зображення бренду на весь сайт — одне для всіх сторінок (проп ogImage
// у BaseLayout дозволяє перекрити для окремої сторінки в майбутньому).
//
// SVG → PNG через @resvg/resvg-js: він дає контроль над шрифтами (піксельний
// RetroVille NC у нас локально в public/fonts/, кирилицю бере з системного sans).
// PNG комітиться в public/og.png — перегенерувати: `node scripts/make-og-image.mjs`.
import { Resvg } from '@resvg/resvg-js';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { writeFileSync } from 'node:fs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fontPath = join(root, 'public/fonts/Retroville_NC.ttf');
const outPath = join(root, 'public/og.png');

const W = 1200;
const H = 630;
const PAD = 80;

// Смуга Sinclair (як RainbowBar на сайті): 4 BRIGHT-кольори як заливка (§4.2).
const RAINBOW = ['#FF0000', '#FFFF00', '#00FF00', '#00FFFF'];
const topBar = RAINBOW.map((c, i) => {
  const w = W / RAINBOW.length;
  return `<rect x="${i * w}" y="0" width="${w}" height="14" fill="${c}"/>`;
}).join('');

// Кутовий «прапорець» Spectrum — 4 діагональні смуги внизу праворуч.
const flag = (() => {
  const bw = 30; // ширина смуги
  const skew = 46; // нахил
  const h = 168;
  const baseX = W - PAD - RAINBOW.length * bw - skew;
  const y0 = H - 70 - h;
  return RAINBOW.map((c, i) => {
    const x = baseX + i * bw;
    return `<polygon points="${x + skew},${y0} ${x + skew + bw},${y0} ${x + bw},${y0 + h} ${x},${y0 + h}" fill="${c}"/>`;
  }).join('');
})();

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#000000"/>
  ${topBar}
  ${flag}
  <text x="${PAD}" y="150" font-family="IBM Plex Mono, Menlo, monospace" font-size="24" letter-spacing="6" fill="#00FFFF">${esc('SOFTWARE & COMPUTER MUSEUM')}</text>
  <text x="${PAD}" y="320" font-family="RetroVille NC" font-size="112" fill="#FFFFFF">ZX SPECTRUM</text>
  <text x="${PAD}" y="410" font-family="Helvetica Neue, Arial, sans-serif" font-size="34" fill="#D7D7D7">${esc('Освітній розділ про 8-бітний комп’ютер Sinclair')}</text>
  <text x="${PAD}" y="465" font-family="IBM Plex Mono, Menlo, monospace" font-size="24" fill="#A8A8A8">${esc('Історія · Моделі · Клони · Софт · Периферія')}</text>
  <rect x="${PAD}" y="530" width="44" height="4" fill="#FFD700"/>
  <text x="${PAD}" y="565" font-family="IBM Plex Mono, Menlo, monospace" font-size="26" fill="#FFD700">spectrum.sncmuseum.org</text>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: 'original' },
  font: {
    fontFiles: [fontPath],
    loadSystemFonts: true,
    defaultFontFamily: 'Helvetica Neue',
  },
});
const png = resvg.render().asPng();
writeFileSync(outPath, png);
console.log(`OG-зображення: ${outPath} (${png.length} байт)`);
