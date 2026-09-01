(()=>{const ctx=__RK.ctx;const it=__RK.game.get('items');
let picks=[],uses=[],hits=0,expl=0;
const o1=ctx.events.on('item:pickup',(e)=>picks.push((e.kart.isPlayer?'P:':'')+e.item));
const o2=ctx.events.on('item:use',(e)=>uses.push(e.item));
const o3=ctx.events.on('kart:hit',()=>hits++);
const o4=ctx.events.on('item:explode',()=>expl++);
__RK.simulate(20);
o1();o2();o3();o4();
const live=(l)=>l.filter(p=>p.live).length;
const h=it.pool;
return{picks:picks.length,pickList:picks.slice(0,14).join(','),uses:uses.length,useList:uses.slice(0,14).join(','),hits,expl,
boxesAlive:it.spots.filter(s=>s.alive).length+'/'+it.spots.length,
liveShells:live(h.shells),liveBananas:live(h.bananas),liveBombs:live(h.bombs),
playerItem:ctx.player.item,playerPlace:ctx.player.place};})()
