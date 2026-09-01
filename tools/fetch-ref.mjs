#!/usr/bin/env node
/**
 * Downloads reference frames for visual comparison into tests/refs/.
 * Reference images are used only as an on-screen quality yardstick during
 * development; nothing here ships in the game build.
 *
 *   node tools/fetch-ref.mjs <url> [outName]
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve, extname } from 'node:path';

const [url, name] = process.argv.slice(2);
if (!url) { console.error('usage: fetch-ref.mjs <url> [name]'); process.exit(2); }
const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (rasta-kart dev ref fetch)' } });
if (!res.ok) { console.error(`HTTP ${res.status} ${res.statusText}`); process.exit(1); }
const type = res.headers.get('content-type') || '';
if (!type.startsWith('image/')) { console.error(`not an image: ${type}`); process.exit(1); }
const ext = extname(new URL(url).pathname) || ('.' + type.split('/')[1].split(';')[0]);
const out = resolve('tests/refs', (name || `ref_${Date.now()}`) + (extname(name || '') ? '' : ext));
await mkdir(resolve('tests/refs'), { recursive: true });
await writeFile(out, Buffer.from(await res.arrayBuffer()));
console.log(out);
