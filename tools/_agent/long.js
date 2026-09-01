(()=>{const ctx=__RK.ctx;let picks=[],uses=[],hits=0,expl=0,boosts=0,tiers=0;
const offs=[ctx.events.on('item:pickup',(e)=>picks.push(e.item)),
ctx.events.on('item:use',(e)=>uses.push(e.item)),
ctx.events.on('kart:hit',()=>hits++),
ctx.events.on('item:explode',()=>expl++),
ctx.events.on('kart:boost',()=>boosts++),
ctx.events.on('kart:drift-tier',(e)=>{if(e.tier)tiers++;})];
__RK.simulate(60);offs.forEach(o=>o());
const it=__RK.game.get('items');const v=__RK.game.get('vfx');
const count=(l)=>l.reduce((m,x)=>(m[x]=(m[x]||0)+1,m),{});
return{picks:picks.length,byItem:JSON.stringify(count(picks)),uses:uses.length,hits,expl,boosts,tiers,
boxes:it.spots.filter(s=>s.alive).length+'/'+it.spots.length,marks:v.marks.used,
laps:ctx.karts.map(k=>k.lap).join(','),state:ctx.race.state};})()
