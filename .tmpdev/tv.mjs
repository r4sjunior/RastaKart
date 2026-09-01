import { Ribbon } from '../src/world/Ribbon.js';
import * as L from '../src/world/layout.js';
const t0 = Date.now();
const r = new Ribbon({
  points: L.TRACK_POINTS, closed: true, sampleStep: 1.5,
  width: L.WIDTH_KEYS, wallL: L.WALL_L_KEYS, wallR: L.WALL_R_KEYS,
  shoulder: L.SHOULDER_KEYS, bumps: L.BUMPS,
  bankGain: L.BANK_GAIN, maxBank: L.MAX_BANK,
});
console.log('build ms', Date.now()-t0);
console.log('length', r.realLength.toFixed(1), 'samples', r.N);
// grade
let maxGrade=0, gi=0;
for (let i=0;i<r.N;i++){ const g=Math.abs(r.ty[i]); if(g>maxGrade){maxGrade=g;gi=i;} }
console.log('max grade', (maxGrade*100).toFixed(1)+'%', 'at u', (gi/r.N).toFixed(3));
// min radius
let maxK=0, ki=0;
for (let i=0;i<r.N;i++){ const k=Math.abs(r.kappa[i]); if(k>maxK){maxK=k;ki=i;} }
console.log('min radius', (1/maxK).toFixed(1),'m at u',(ki/r.N).toFixed(3));
// bank
let maxB=0; for(let i=0;i<r.N;i++) maxB=Math.max(maxB,Math.abs(r.bank[i]));
console.log('max bank', (maxB*180/Math.PI).toFixed(1)+'deg');
// elevation
let lo=1e9,hi=-1e9; for(let i=0;i<r.N;i++){lo=Math.min(lo,r.py[i]);hi=Math.max(hi,r.py[i]);}
console.log('elevation', lo.toFixed(1),'->',hi.toFixed(1));
// cp u table
console.log('cpU', r.cpU.map((u,i)=>i+':'+u.toFixed(3)).join(' '));
// radius histogram per cp section
for (let c=0;c<L.TRACK_POINTS.length;c++){
  const u=r.cpU[c]; const i=Math.round(u*r.N);
  console.log(String(c).padStart(2), 'u='+u.toFixed(3), 'R='+(1/Math.max(1e-4,Math.abs(r.kappa[i]))).toFixed(0).padStart(5), 'w='+r.width[i].toFixed(1), 'bank='+(r.bank[i]*180/Math.PI).toFixed(1), 'y='+r.py[i].toFixed(1), 'grade='+(r.ty[i]*100).toFixed(1)+'%');
}
// perf of project
const THREE = await import('three');
const p = new THREE.Vector3();
const t1=Date.now();
let acc=0;
for(let n=0;n<200000;n++){ p.set(((n*37)%700)-350, 0, ((n*53)%700)-350); acc+=r.project(p).u; }
console.log('project 200k in', Date.now()-t1, 'ms', acc.toFixed(0));
