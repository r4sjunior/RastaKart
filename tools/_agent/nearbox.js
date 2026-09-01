(()=>{const ctx=__RK.ctx;const it=__RK.game.get('items');const k=ctx.player;
const fwd=new (k.position.constructor)();let best=1e9,steps=0;
for(let i=0;i<400;i++){__RK.simulate(0.1);steps++;
fwd.set(0,0,1).applyQuaternion(k.quaternion);
best=1e9;
for(const s of it.spots){if(!s.alive)continue;const d=k.position.distanceTo(s.pos);
const to=s.pos.clone().sub(k.position).normalize();if(to.dot(fwd)<0.85)continue;
if(d<best)best=d;}
if(best>=9&&best<=17)break;}
return{steps,best:+best.toFixed(1),t:+ctx.time.t.toFixed(1),item:k.item,place:k.place,u:+ctx.world.project(k.position).u.toFixed(3)};})()
