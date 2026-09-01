import * as THREE from 'three';
import { readFileSync } from 'node:fs';
const rig = JSON.parse(readFileSync('public/assets/characters/rasta.rig.json','utf8'));
const orders=['XYZ','XZY','YXZ','YZX','ZXY','ZYX'];
const want=['Right_Thigh','Right_Leg','Right_Foot','Left_Foot','Left_Hand','Right_Hand','Head','Chest'];
for(const pose of ['sit','sitLow']){
 const eul=rig.poses[pose].euler;
 for(const ord of orders){
  const objs=rig.bones.map(b=>{const o=new THREE.Object3D();o.position.fromArray(b.local);return o;});
  rig.bones.forEach((b,i)=>{ if(b.parent>=0) objs[b.parent].add(objs[i]); });
  rig.bones.forEach((b,i)=>{ const e=eul[b.name]; if(e) objs[i].quaternion.setFromEuler(new THREE.Euler(e[0],e[1],e[2],ord)); });
  objs[0].updateMatrixWorld(true);
  const s=want.map(n=>{const i=rig.bones.findIndex(b=>b.name===n);const p=objs[i].getWorldPosition(new THREE.Vector3());return n.replace('Right_','R').replace('Left_','L')+'('+p.x.toFixed(2)+','+p.y.toFixed(2)+','+p.z.toFixed(2)+')';}).join(' ');
  console.log(pose.padEnd(7),ord,s);
 }
 console.log();
}
