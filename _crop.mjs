// node crop.mjs <in.png> <x> <y> <w> <h> <outW> <out.png>
import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const [inp, x, y, w, h, outW, out] = process.argv.slice(2);
const buf = await readFile(resolve(inp));
const url = `data:image/png;base64,${buf.toString('base64')}`;
const scale = Number(outW) / Number(w);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: Math.round(Number(w)*scale), height: Math.round(Number(h)*scale) } });
await p.setContent(`<style>*{margin:0;padding:0}body{background:#000;overflow:hidden}
img{position:absolute;left:${-x*scale}px;top:${-y*scale}px;width:${'auto'};transform-origin:0 0;transform:scale(${scale});image-rendering:auto}</style><img src="${url}">`);
await p.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));
await p.screenshot({ path: resolve(out) });
await b.close();
console.log('ok', out);
