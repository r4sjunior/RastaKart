(()=>{const ctx=__RK.ctx;let boom=0;
const off=ctx.events.on('item:explode',()=>{boom=ctx.time.t;});
ctx.items.give(ctx.player,'bomb');ctx.items.use(ctx.player);
for(let i=0;i<60;i++){__RK.simulate(0.05);if(boom)break;}
__RK.simulate(0.12);off();
const v=__RK.game.get('vfx');const t=ctx.time.t;
const scan=(p)=>{const L=p.aLife.array;let n=0;for(let i=0;i<p.capacity;i++){const b=L[i*4],l=L[i*4+1];if(l>0&&t-b>=0&&t-b<l)n++;}return n;};
return{boom:+boom.toFixed(2),now:+t.toFixed(2),add:scan(v.add),alpha:scan(v.alpha),place:ctx.player.place};})()
