import { chromium } from 'playwright';
const args = ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--enable-webgl','--disable-gpu-sandbox'];
const b = await chromium.launch({ args });
const p = await b.newPage();
await p.setContent('<canvas id=c></canvas>');
const info = await p.evaluate(() => {
  const c = document.getElementById('c');
  const gl = c.getContext('webgl2');
  if (!gl) return { ok:false };
  const d = gl.getExtension('WEBGL_debug_renderer_info');
  return {
    ok:true,
    renderer: d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
    vendor: d ? gl.getParameter(d.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR),
    maxTex: gl.getParameter(gl.MAX_TEXTURE_SIZE),
    exts: ['EXT_color_buffer_float','OES_texture_float_linear','EXT_texture_filter_anisotropic','WEBGL_compressed_texture_s3tc']
      .filter(e => gl.getExtension(e)),
  };
});
console.log(JSON.stringify(info, null, 2));
await b.close();
