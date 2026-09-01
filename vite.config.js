import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  resolve: { alias: { 'three/addons/': 'three/examples/jsm/' } },
  server: { port: 5180, strictPort: true, host: '127.0.0.1' },
  preview: { port: 5180, strictPort: true, host: '127.0.0.1' },
  build: { target: 'es2022', assetsInlineLimit: 0, sourcemap: true },
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.hdr', '**/*.ktx2', '**/*.bin'],
});
