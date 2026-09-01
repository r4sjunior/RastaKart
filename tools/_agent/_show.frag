const ctx=__RK.ctx;let pe=0,pulse=false,phase=0;
ctx.input.setScripted(()=>{const k=ctx.player,w=ctx.world;if(!k||!w)return{accel:1};
const p=w.project(k.position),L=w.trackLength;
const lead=15+Math.min(k.speed,30)*0.45;const a=w.sampleSpline((p.u+lead/L)%1);
const t=a.pos.clone().addScaledVector(a.right,-p.lateral*1.0);const to=t.sub(k.position);to.y=0;to.normalize();
const f=new a.pos.constructor(0,0,1).applyQuaternion(k.quaternion);f.y=0;f.normalize();
const e=Math.atan2(f.x*to.z-f.z*to.x,f.dot(to));const d1=e-pe;pe=e;
const line=Math.max(-1,Math.min(1,e*2.1+d1*18));
if(!k.drift.active){phase=0;pulse=!pulse;return{accel:1,brake:0,steer:0.55,drift:pulse};}
phase++;
const st=phase<12?0.55:line;
return{accel:1,brake:0,steer:st,drift:true};});
