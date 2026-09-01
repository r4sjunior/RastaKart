(()=>{const ctx=__RK.ctx;let pe=0;
ctx.input.setScripted(()=>{const k=ctx.player,w=ctx.world;if(!k||!w)return{accel:1};
const p=w.project(k.position);const a=w.sampleSpline((p.u+18/w.trackLength)%1);
const t=a.pos.clone().addScaledVector(a.right,11.9);const to=t.sub(k.position);to.y=0;to.normalize();
const f=new a.pos.constructor(0,0,1).applyQuaternion(k.quaternion);f.y=0;f.normalize();
const e=Math.atan2(f.x*to.z-f.z*to.x,f.dot(to));const d=e-pe;pe=e;
return{accel:1,brake:0,steer:Math.max(-1,Math.min(1,e*1.8+d*18)),drift:false};});
__RK.simulate(2.6);const k=ctx.player;const v=__RK.game.get('vfx');
const t=ctx.time.t;const scan=(pool)=>{const L=pool.aLife.array;let n=0;for(let i=0;i<pool.capacity;i++){const b=L[i*4],l=L[i*4+1];if(l>0&&t-b>=0&&t-b<l)n++;}return n;};
return{surf:k.surface,speed:+k.speed.toFixed(1),lat:+ctx.world.project(k.position).lateral.toFixed(1),ground:k.onGround,alphaLive:scan(v.alpha),addLive:scan(v.add)};})()
