/**
 * Hand-built inline SVG icon set. Every glyph is drawn on a 64x64 grid with a
 * heavy dark keyline so it stays readable at 24px on a phone and at 160px on a
 * 4K TV. No emoji, no external assets.
 */

const S = (body, extra = '') =>
  `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" ${extra}` +
  ` fill="none" stroke-linejoin="round" stroke-linecap="round">${body}</svg>`;

const KEY = '#0b1410';

/* ------------------------------------------------------------------ items */

const mushroom = (cap, capD) => `
  <defs><linearGradient id="mg${cap.slice(1)}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${cap}"/><stop offset="1" stop-color="${capD}"/></linearGradient></defs>
  <path d="M32 8c13 0 22 9.6 22 20.5 0 4.2-3 6.5-7.4 6.5H17.4C13 35 10 32.7 10 28.5 10 17.6 19 8 32 8Z"
        fill="url(#mg${cap.slice(1)})" stroke="${KEY}" stroke-width="3.4"/>
  <ellipse cx="21.5" cy="21" rx="6.2" ry="5" fill="#fff8e6"/>
  <ellipse cx="41" cy="18.5" rx="7" ry="5.6" fill="#fff8e6"/>
  <ellipse cx="46" cy="29" rx="4.2" ry="3.2" fill="#fff8e6"/>
  <path d="M22 35h20v9c0 6.6-4.5 11-10 11s-10-4.4-10-11v-9Z" fill="#fdf3d8" stroke="${KEY}" stroke-width="3.4"/>
  <path d="M27 41.5c0 4 .6 7.4 2 10.2" stroke="${KEY}" stroke-width="2.4" opacity=".45"/>`;

const shell = (a, b) => `
  <defs><linearGradient id="sg${a.slice(1)}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
  <path d="M32 6c14.4 0 25 10.4 25 23.5S46.4 53 32 53 7 42.6 7 29.5 17.6 6 32 6Z"
        fill="url(#sg${a.slice(1)})" stroke="${KEY}" stroke-width="3.4"/>
  <path d="M9 34c8 6 38 6 46 0" stroke="${KEY}" stroke-width="3" opacity=".8"/>
  <path d="M32 6v28M18 10.5 24 33M46 10.5 40 33" stroke="${KEY}" stroke-width="2.6" opacity=".55"/>
  <path d="M7.5 34.5c0 10.6 11 18.5 24.5 18.5S56.5 45.1 56.5 34.5c0 0-9 4.5-24.5 4.5S7.5 34.5 7.5 34.5Z"
        fill="#fdf3d8" stroke="${KEY}" stroke-width="3.4"/>
  <ellipse cx="22" cy="18" rx="6" ry="4" fill="#fff" opacity=".38"/>`;

export const ICONS = {
  none: () => S(`<circle cx="32" cy="32" r="16" stroke="#ffffff" stroke-width="3" opacity=".18"
                  stroke-dasharray="5 7"/>`),

  boost: () => S(mushroom('#ff5d4a', '#c8221b')),

  triple: () => S(`
    <g transform="translate(2 16) scale(.52)">${mushroom('#ff5d4a', '#c8221b')}</g>
    <g transform="translate(30 16) scale(.52)">${mushroom('#ff5d4a', '#c8221b')}</g>
    <g transform="translate(16 -6) scale(.52)">${mushroom('#ffd24a', '#e08a00')}</g>`),

  banana: () => S(`
    <defs><linearGradient id="bng" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffe14d"/><stop offset="1" stop-color="#d99400"/></linearGradient></defs>
    <path d="M13 12c1.5 20 11 32 33 34.5 4 .5 6 4 3 6.5-6 5-20 4.5-29.5-4C10 41 7.5 27 9 14.5 9.4 10.8 12.7 8.6 13 12Z"
          fill="url(#bng)" stroke="${KEY}" stroke-width="3.4"/>
    <path d="M17 18c2.4 13 10 22 24 26" stroke="#fff6c9" stroke-width="3" opacity=".65"/>
    <path d="M10.5 12.5 8 7" stroke="${KEY}" stroke-width="4"/>`),

  shellGreen: () => S(shell('#4fe07a', '#12923c')),
  shellRed: () => S(shell('#ff6a5c', '#c1201a')),

  bomb: () => S(`
    <path d="M25 14c2-5 9-6 12-2" stroke="#c98a3a" stroke-width="4"/>
    <circle cx="27" cy="40" r="20" fill="#1b2026" stroke="${KEY}" stroke-width="3.4"/>
    <ellipse cx="20" cy="32" rx="6.5" ry="4.5" fill="#fff" opacity=".3" transform="rotate(-30 20 32)"/>
    <path d="M38 21 46 13" stroke="#c98a3a" stroke-width="5"/>
    <path d="M50 6c3 3 3 7 0 9-3-2-3-6 0-9Z" fill="#ffd24a" stroke="${KEY}" stroke-width="2.6"/>
    <circle cx="50" cy="9" r="6" fill="#ffb01a" opacity=".55"/>`),

  star: () => S(`
    <defs><linearGradient id="stg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff3a8"/><stop offset=".5" stop-color="#ffcb1c"/>
      <stop offset="1" stop-color="#e08a00"/></linearGradient></defs>
    <path d="M32 4 40 24l21.5 1.4-16.6 13.8 5.4 21L32 48.6 13.7 60.2l5.4-21L2.5 25.4 24 24 32 4Z"
          fill="url(#stg)" stroke="${KEY}" stroke-width="3.4"/>
    <circle cx="25" cy="28" r="2.8" fill="${KEY}"/><circle cx="39" cy="28" r="2.8" fill="${KEY}"/>
    <path d="M27 37c3 3 7 3 10 0" stroke="${KEY}" stroke-width="3"/>`),

  bolt: () => S(`
    <defs><linearGradient id="blg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff17a"/><stop offset="1" stop-color="#f0a400"/></linearGradient></defs>
    <path d="M38 3 13 36h13L22 61l27-35H35L38 3Z" fill="url(#blg)" stroke="${KEY}" stroke-width="3.4"/>`),

  coin: () => S(`
    <defs><linearGradient id="cng" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#e09000"/></linearGradient></defs>
    <ellipse cx="32" cy="32" rx="20" ry="25" fill="url(#cng)" stroke="${KEY}" stroke-width="3.4"/>
    <ellipse cx="32" cy="32" rx="11" ry="16" fill="none" stroke="${KEY}" stroke-width="2.8" opacity=".55"/>
    <path d="M32 20v24" stroke="${KEY}" stroke-width="3.4"/>`),

  ghost: () => S(`
    <path d="M32 6c12 0 20 9 20 21v29l-7-6-6 6-7-6-7 6-6-6-7 6V27C12 15 20 6 32 6Z"
          fill="#eef3ff" stroke="${KEY}" stroke-width="3.4"/>
    <circle cx="25" cy="26" r="4.5" fill="${KEY}"/><circle cx="40" cy="26" r="4.5" fill="${KEY}"/>
    <path d="M26 38c4 4 9 4 13 0" stroke="${KEY}" stroke-width="3.2"/>`),
};

export const ITEM_ORDER = ['boost', 'triple', 'banana', 'shellGreen', 'shellRed', 'bomb', 'star', 'bolt', 'coin', 'ghost'];

export const ITEM_LABEL = {
  none: '', boost: 'TURBO', triple: 'TURBO TRIPLO', banana: 'BANANA',
  shellGreen: 'CASCO VERDE', shellRed: 'CASCO VERMELHO', bomb: 'BOMBA',
  star: 'ESTRELA', bolt: 'RAIO', coin: 'MOEDA', ghost: 'FANTASMA',
};

/* --------------------------------------------------------------- ui glyphs */

export const UI = {
  flag: () => S(`
    <path d="M13 4v56" stroke="#f4f7f4" stroke-width="6"/>
    <path d="M19 8h38v26H19z" fill="#f4f7f4"/>
    <path d="M19 8h9.5v8.7H19zM38 8h9.5v8.7H38zM28.5 16.7H38v8.6h-9.5zM47.5 16.7H57v8.6h-9.5z
             M19 25.3h9.5V34H19zM38 25.3h9.5V34H38z" fill="#101613"/>`),

  clock: () => S(`
    <circle cx="32" cy="34" r="23" fill="none" stroke="currentColor" stroke-width="5"/>
    <path d="M32 20v15l10 6" stroke="currentColor" stroke-width="5"/>
    <path d="M22 6h20" stroke="currentColor" stroke-width="5"/>`),

  trophy: () => S(`
    <path d="M18 8h28v14c0 8.8-6.3 15-14 15s-14-6.2-14-15V8Z" fill="#ffcb1c" stroke="${KEY}" stroke-width="3.4"/>
    <path d="M18 12H9v4c0 6 4 10 9 10M46 12h9v4c0 6-4 10-9 10" stroke="${KEY}" stroke-width="3.4"/>
    <path d="M28 37h8v9h-8zM18 46h28v8H18z" fill="#ffcb1c" stroke="${KEY}" stroke-width="3.4"/>`),

  chevron: () => S(`<path d="M24 14 42 32 24 50" stroke="currentColor" stroke-width="7"/>`),

  kart: () => S(`
    <path d="M8 40c0-6 6-10 14-10h20c8 0 14 4 14 10v5H8v-5Z" fill="currentColor"/>
    <circle cx="19" cy="47" r="8" fill="#101613"/><circle cx="45" cy="47" r="8" fill="#101613"/>
    <path d="M24 30l6-11h8l4 11" fill="currentColor"/>`),
};

const cache = new Map();
/** Returns the SVG markup for `name`, built once and memoised. */
export function icon(name) {
  if (!cache.has(name)) cache.set(name, (ICONS[name] ?? ICONS.none)());
  return cache.get(name);
}
export function uiIcon(name) {
  const k = 'ui:' + name;
  if (!cache.has(k)) cache.set(k, (UI[name] ?? ICONS.none)());
  return cache.get(k);
}
