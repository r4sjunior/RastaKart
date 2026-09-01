(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const Tl="180",Mf=0,ih=1,bf=2,dd=1,fd=2,hi=3,xi=0,sn=1,Nt=2,pi=0,hs=1,Ir=2,sh=3,rh=4,Sf=5,ss=100,wf=101,Tf=102,Ef=103,Af=104,Rf=200,Cf=201,Lf=202,Pf=203,Rc=204,Cc=205,Df=206,If=207,Uf=208,Nf=209,kf=210,Ff=211,Of=212,Bf=213,zf=214,Lc=0,Pc=1,Dc=2,Bs=3,Ic=4,Uc=5,Nc=6,kc=7,pd=0,Hf=1,Vf=2,mi=0,md=1,gd=2,vd=3,xd=4,yd=5,El=6,_d=7,oh="attached",Gf="detached",Md=300,zs=301,Hs=302,Fc=303,Oc=304,oa=306,Lt=1e3,bn=1001,Ko=1002,Xt=1003,bd=1004,br=1005,Bt=1006,zo=1007,un=1008,Hn=1009,Sd=1010,wd=1011,Ur=1012,Al=1013,ds=1014,On=1015,rn=1016,Rl=1017,Cl=1018,Vs=1020,Td=35902,Ed=35899,Ad=1021,Rd=1022,Sn=1023,Nr=1026,Gs=1027,aa=1028,Ll=1029,Cd=1030,Pl=1031,Dl=1033,Ho=33776,Vo=33777,Go=33778,Wo=33779,Bc=35840,zc=35841,Hc=35842,Vc=35843,Gc=36196,Wc=37492,Xc=37496,qc=37808,Yc=37809,jc=37810,Kc=37811,Zc=37812,Jc=37813,Qc=37814,$c=37815,el=37816,tl=37817,nl=37818,il=37819,sl=37820,rl=37821,ol=36492,al=36494,cl=36495,ll=36283,hl=36284,ul=36285,dl=36286,kr=2300,Fr=2301,va=2302,ah=2400,ch=2401,lh=2402,Wf=2500,Xf=0,Ld=1,fl=2,qf=3200,Yf=3201,Pd=0,jf=1,Kn="",it="srgb",Yt="srgb-linear",Zo="linear",dt="srgb",ms=7680,hh=519,Kf=512,Zf=513,Jf=514,Dd=515,Qf=516,$f=517,ep=518,tp=519,pl=35044,Zn=35048,uh="300 es",Jn=2e3,Jo=2001;class Js{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let dh=1234567;const Tr=Math.PI/180,Ws=180/Math.PI;function Bn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(jt[r&255]+jt[r>>8&255]+jt[r>>16&255]+jt[r>>24&255]+"-"+jt[e&255]+jt[e>>8&255]+"-"+jt[e>>16&15|64]+jt[e>>24&255]+"-"+jt[t&63|128]+jt[t>>8&255]+"-"+jt[t>>16&255]+jt[t>>24&255]+jt[n&255]+jt[n>>8&255]+jt[n>>16&255]+jt[n>>24&255]).toLowerCase()}function Ze(r,e,t){return Math.max(e,Math.min(t,r))}function Il(r,e){return(r%e+e)%e}function np(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function ip(r,e,t){return r!==e?(t-r)/(e-r):0}function Er(r,e,t){return(1-t)*r+t*e}function sp(r,e,t,n){return Er(r,e,1-Math.exp(-t*n))}function rp(r,e=1){return e-Math.abs(Il(r,e*2)-e)}function op(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function ap(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function cp(r,e){return r+Math.floor(Math.random()*(e-r+1))}function lp(r,e){return r+Math.random()*(e-r)}function hp(r){return r*(.5-Math.random())}function up(r){r!==void 0&&(dh=r);let e=dh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function dp(r){return r*Tr}function fp(r){return r*Ws}function pp(r){return(r&r-1)===0&&r!==0}function mp(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function gp(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function vp(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),d=o((e-n)/2),f=s((n-e)/2),p=o((n-e)/2);switch(i){case"XYX":r.set(a*h,c*u,c*d,a*l);break;case"YZY":r.set(c*d,a*h,c*u,a*l);break;case"ZXZ":r.set(c*u,c*d,a*h,a*l);break;case"XZX":r.set(a*h,c*p,c*f,a*l);break;case"YXY":r.set(c*f,a*h,c*p,a*l);break;case"ZYZ":r.set(c*p,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function kn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ft(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Qo={DEG2RAD:Tr,RAD2DEG:Ws,generateUUID:Bn,clamp:Ze,euclideanModulo:Il,mapLinear:np,inverseLerp:ip,lerp:Er,damp:sp,pingpong:rp,smoothstep:op,smootherstep:ap,randInt:cp,randFloat:lp,randFloatSpread:hp,seededRandom:up,degToRad:dp,radToDeg:fp,isPowerOfTwo:pp,ceilPowerOfTwo:mp,floorPowerOfTwo:gp,setQuaternionFromProperEuler:vp,normalize:ft,denormalize:kn};class ve{constructor(e=0,t=0){ve.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class et{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=s[o+0],f=s[o+1],p=s[o+2],v=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=v;return}if(u!==v||c!==d||l!==f||h!==p){let g=1-a;const m=c*d+l*f+h*p+u*v,M=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const w=Math.sqrt(x),S=Math.atan2(w,m*M);g=Math.sin(g*S)/w,a=Math.sin(a*S)/w}const y=a*M;if(c=c*g+d*y,l=l*g+f*y,h=h*g+p*y,u=u*g+v*y,g===1-a){const w=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=w,l*=w,h*=w,u*=w}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[o],d=s[o+1],f=s[o+2],p=s[o+3];return e[t]=a*p+h*u+c*f-l*d,e[t+1]=c*p+h*d+l*u-a*f,e[t+2]=l*p+h*f+a*d-c*u,e[t+3]=h*p-a*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(s/2),d=c(n/2),f=c(i/2),p=c(s/2);switch(o){case"XYZ":this._x=d*h*u+l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u+d*f*p;break;case"YZX":this._x=d*h*u+l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u-d*f*p;break;case"XZY":this._x=d*h*u-l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u+d*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+i*l-s*c,this._y=i*h+o*c+s*a-n*l,this._z=s*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(e=0,t=0,n=0){T.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),h=2*(a*t-s*i),u=2*(s*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-s*u,this.z=i+c*u+s*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-s*a,this.y=s*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return xa.copy(this).projectOnVector(e),this.sub(xa)}reflect(e){return this.sub(xa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xa=new T,fh=new et;class je{constructor(e,t,n,i,s,o,a,c,l){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,c,l)}set(e,t,n,i,s,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],v=i[0],g=i[3],m=i[6],M=i[1],x=i[4],y=i[7],w=i[2],S=i[5],E=i[8];return s[0]=o*v+a*M+c*w,s[3]=o*g+a*x+c*S,s[6]=o*m+a*y+c*E,s[1]=l*v+h*M+u*w,s[4]=l*g+h*x+u*S,s[7]=l*m+h*y+u*E,s[2]=d*v+f*M+p*w,s[5]=d*g+f*x+p*S,s[8]=d*m+f*y+p*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*s*h+n*a*c+i*s*l-i*o*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*s,f=l*s-o*c,p=t*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return e[0]=u*v,e[1]=(i*l-h*n)*v,e[2]=(a*n-i*o)*v,e[3]=d*v,e[4]=(h*t-i*c)*v,e[5]=(i*s-a*t)*v,e[6]=f*v,e[7]=(n*c-l*t)*v,e[8]=(o*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ya.makeScale(e,t)),this}rotate(e){return this.premultiply(ya.makeRotation(-e)),this}translate(e,t){return this.premultiply(ya.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ya=new je;function Id(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Or(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function xp(){const r=Or("canvas");return r.style.display="block",r}const ph={};function Br(r){r in ph||(ph[r]=!0,console.warn(r))}function yp(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const mh=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gh=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function _p(){const r={enabled:!0,workingColorSpace:Yt,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===dt&&(i.r=gi(i.r),i.g=gi(i.g),i.b=gi(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===dt&&(i.r=ks(i.r),i.g=ks(i.g),i.b=ks(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Kn?Zo:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Br("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Br("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Yt]:{primaries:e,whitePoint:n,transfer:Zo,toXYZ:mh,fromXYZ:gh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:it},outputColorSpaceConfig:{drawingBufferColorSpace:it}},[it]:{primaries:e,whitePoint:n,transfer:dt,toXYZ:mh,fromXYZ:gh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:it}}}),r}const nt=_p();function gi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ks(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let gs;class Mp{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{gs===void 0&&(gs=Or("canvas")),gs.width=e.width,gs.height=e.height;const i=gs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=gs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Or("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=gi(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(gi(t[n]/255)*255):t[n]=gi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let bp=0;class Ul{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bp++}),this.uuid=Bn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(_a(i[o].image)):s.push(_a(i[o]))}else s=_a(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function _a(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Mp.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Sp=0;const Ma=new T;class Dt extends Js{constructor(e=Dt.DEFAULT_IMAGE,t=Dt.DEFAULT_MAPPING,n=bn,i=bn,s=Bt,o=un,a=Sn,c=Hn,l=Dt.DEFAULT_ANISOTROPY,h=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sp++}),this.uuid=Bn(),this.name="",this.source=new Ul(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ve(0,0),this.repeat=new ve(1,1),this.center=new ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ma).x}get height(){return this.source.getSize(Ma).y}get depth(){return this.source.getSize(Ma).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Md)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Lt:e.x=e.x-Math.floor(e.x);break;case bn:e.x=e.x<0?0:1;break;case Ko:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Lt:e.y=e.y-Math.floor(e.y);break;case bn:e.y=e.y<0?0:1;break;case Ko:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Dt.DEFAULT_IMAGE=null;Dt.DEFAULT_MAPPING=Md;Dt.DEFAULT_ANISOTROPY=1;class lt{constructor(e=0,t=0,n=0,i=1){lt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],p=c[9],v=c[2],g=c[6],m=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(p+g)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,y=(f+1)/2,w=(m+1)/2,S=(h+d)/4,E=(u+v)/4,L=(p+g)/4;return x>y&&x>w?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=S/n,s=E/n):y>w?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=S/i,s=L/i):w<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(w),n=E/s,i=L/s),this.set(n,i,s,t),this}let M=Math.sqrt((g-p)*(g-p)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(g-p)/M,this.y=(u-v)/M,this.z=(d-h)/M,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class wp extends Js{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t);const i={width:e,height:t,depth:n.depth},s=new Dt(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Ul(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qt extends wp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ud extends Dt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Tp extends Dt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vn{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Cn):Cn.fromBufferAttribute(s,o),Cn.applyMatrix4(e.matrixWorld),this.expandByPoint(Cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),jr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),jr.copy(n.boundingBox)),jr.applyMatrix4(e.matrixWorld),this.union(jr)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Cn),Cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ir),Kr.subVectors(this.max,ir),vs.subVectors(e.a,ir),xs.subVectors(e.b,ir),ys.subVectors(e.c,ir),_i.subVectors(xs,vs),Mi.subVectors(ys,xs),Fi.subVectors(vs,ys);let t=[0,-_i.z,_i.y,0,-Mi.z,Mi.y,0,-Fi.z,Fi.y,_i.z,0,-_i.x,Mi.z,0,-Mi.x,Fi.z,0,-Fi.x,-_i.y,_i.x,0,-Mi.y,Mi.x,0,-Fi.y,Fi.x,0];return!ba(t,vs,xs,ys,Kr)||(t=[1,0,0,0,1,0,0,0,1],!ba(t,vs,xs,ys,Kr))?!1:(Zr.crossVectors(_i,Mi),t=[Zr.x,Zr.y,Zr.z],ba(t,vs,xs,ys,Kr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ii=[new T,new T,new T,new T,new T,new T,new T,new T],Cn=new T,jr=new Vn,vs=new T,xs=new T,ys=new T,_i=new T,Mi=new T,Fi=new T,ir=new T,Kr=new T,Zr=new T,Oi=new T;function ba(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Oi.fromArray(r,s);const a=i.x*Math.abs(Oi.x)+i.y*Math.abs(Oi.y)+i.z*Math.abs(Oi.z),c=e.dot(Oi),l=t.dot(Oi),h=n.dot(Oi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Ep=new Vn,sr=new T,Sa=new T;class Gn{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Ep.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;sr.subVectors(e,this.center);const t=sr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(sr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(sr.copy(e.center).add(Sa)),this.expandByPoint(sr.copy(e.center).sub(Sa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const si=new T,wa=new T,Jr=new T,bi=new T,Ta=new T,Qr=new T,Ea=new T;class ca{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,si)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=si.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(si.copy(this.origin).addScaledVector(this.direction,t),si.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){wa.copy(e).add(t).multiplyScalar(.5),Jr.copy(t).sub(e).normalize(),bi.copy(this.origin).sub(wa);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Jr),a=bi.dot(this.direction),c=-bi.dot(Jr),l=bi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,p;if(h>0)if(u=o*c-a,d=o*a-c,p=s*h,u>=0)if(d>=-p)if(d<=p){const v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-p?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=p?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(wa).addScaledVector(Jr,d),f}intersectSphere(e,t){si.subVectors(e.center,this.origin);const n=si.dot(this.direction),i=si.dot(si)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,si)!==null}intersectTriangle(e,t,n,i,s){Ta.subVectors(t,e),Qr.subVectors(n,e),Ea.crossVectors(Ta,Qr);let o=this.direction.dot(Ea),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;bi.subVectors(this.origin,e);const c=a*this.direction.dot(Qr.crossVectors(bi,Qr));if(c<0)return null;const l=a*this.direction.dot(Ta.cross(bi));if(l<0||c+l>o)return null;const h=-a*bi.dot(Ea);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pe{constructor(e,t,n,i,s,o,a,c,l,h,u,d,f,p,v,g){pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,c,l,h,u,d,f,p,v,g)}set(e,t,n,i,s,o,a,c,l,h,u,d,f,p,v,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/_s.setFromMatrixColumn(e,0).length(),s=1/_s.setFromMatrixColumn(e,1).length(),o=1/_s.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=o*h,f=o*u,p=a*h,v=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+p*l,t[5]=d-v*l,t[9]=-a*c,t[2]=v-d*l,t[6]=p+f*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*h,f=c*u,p=l*h,v=l*u;t[0]=d+v*a,t[4]=p*a-f,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-p,t[6]=v+d*a,t[10]=o*c}else if(e.order==="ZXY"){const d=c*h,f=c*u,p=l*h,v=l*u;t[0]=d-v*a,t[4]=-o*u,t[8]=p+f*a,t[1]=f+p*a,t[5]=o*h,t[9]=v-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const d=o*h,f=o*u,p=a*h,v=a*u;t[0]=c*h,t[4]=p*l-f,t[8]=d*l+v,t[1]=c*u,t[5]=v*l+d,t[9]=f*l-p,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,f=o*l,p=a*c,v=a*l;t[0]=c*h,t[4]=v-d*u,t[8]=p*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*u+p,t[10]=d-v*u}else if(e.order==="XZY"){const d=o*c,f=o*l,p=a*c,v=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+v,t[5]=o*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=a*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ap,e,Rp)}lookAt(e,t,n){const i=this.elements;return gn.subVectors(e,t),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),Si.crossVectors(n,gn),Si.lengthSq()===0&&(Math.abs(n.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),Si.crossVectors(n,gn)),Si.normalize(),$r.crossVectors(gn,Si),i[0]=Si.x,i[4]=$r.x,i[8]=gn.x,i[1]=Si.y,i[5]=$r.y,i[9]=gn.y,i[2]=Si.z,i[6]=$r.z,i[10]=gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],v=n[6],g=n[10],m=n[14],M=n[3],x=n[7],y=n[11],w=n[15],S=i[0],E=i[4],L=i[8],b=i[12],_=i[1],C=i[5],D=i[9],U=i[13],k=i[2],H=i[6],O=i[10],q=i[14],z=i[3],$=i[7],re=i[11],ee=i[15];return s[0]=o*S+a*_+c*k+l*z,s[4]=o*E+a*C+c*H+l*$,s[8]=o*L+a*D+c*O+l*re,s[12]=o*b+a*U+c*q+l*ee,s[1]=h*S+u*_+d*k+f*z,s[5]=h*E+u*C+d*H+f*$,s[9]=h*L+u*D+d*O+f*re,s[13]=h*b+u*U+d*q+f*ee,s[2]=p*S+v*_+g*k+m*z,s[6]=p*E+v*C+g*H+m*$,s[10]=p*L+v*D+g*O+m*re,s[14]=p*b+v*U+g*q+m*ee,s[3]=M*S+x*_+y*k+w*z,s[7]=M*E+x*C+y*H+w*$,s[11]=M*L+x*D+y*O+w*re,s[15]=M*b+x*U+y*q+w*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],v=e[7],g=e[11],m=e[15];return p*(+s*c*u-i*l*u-s*a*d+n*l*d+i*a*f-n*c*f)+v*(+t*c*f-t*l*d+s*o*d-i*o*f+i*l*h-s*c*h)+g*(+t*l*u-t*a*f-s*o*u+n*o*f+s*a*h-n*l*h)+m*(-i*a*h-t*c*u+t*a*d+i*o*u-n*o*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],v=e[13],g=e[14],m=e[15],M=u*g*l-v*d*l+v*c*f-a*g*f-u*c*m+a*d*m,x=p*d*l-h*g*l-p*c*f+o*g*f+h*c*m-o*d*m,y=h*v*l-p*u*l+p*a*f-o*v*f-h*a*m+o*u*m,w=p*u*c-h*v*c-p*a*d+o*v*d+h*a*g-o*u*g,S=t*M+n*x+i*y+s*w;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/S;return e[0]=M*E,e[1]=(v*d*s-u*g*s-v*i*f+n*g*f+u*i*m-n*d*m)*E,e[2]=(a*g*s-v*c*s+v*i*l-n*g*l-a*i*m+n*c*m)*E,e[3]=(u*c*s-a*d*s-u*i*l+n*d*l+a*i*f-n*c*f)*E,e[4]=x*E,e[5]=(h*g*s-p*d*s+p*i*f-t*g*f-h*i*m+t*d*m)*E,e[6]=(p*c*s-o*g*s-p*i*l+t*g*l+o*i*m-t*c*m)*E,e[7]=(o*d*s-h*c*s+h*i*l-t*d*l-o*i*f+t*c*f)*E,e[8]=y*E,e[9]=(p*u*s-h*v*s-p*n*f+t*v*f+h*n*m-t*u*m)*E,e[10]=(o*v*s-p*a*s+p*n*l-t*v*l-o*n*m+t*a*m)*E,e[11]=(h*a*s-o*u*s-h*n*l+t*u*l+o*n*f-t*a*f)*E,e[12]=w*E,e[13]=(h*v*i-p*u*i+p*n*d-t*v*d-h*n*g+t*u*g)*E,e[14]=(p*a*i-o*v*i-p*n*c+t*v*c+o*n*g-t*a*g)*E,e[15]=(o*u*i-h*a*i+h*n*c-t*u*c-o*n*d+t*a*d)*E,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,h=s*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,h=o+o,u=a+a,d=s*l,f=s*h,p=s*u,v=o*h,g=o*u,m=a*u,M=c*l,x=c*h,y=c*u,w=n.x,S=n.y,E=n.z;return i[0]=(1-(v+m))*w,i[1]=(f+y)*w,i[2]=(p-x)*w,i[3]=0,i[4]=(f-y)*S,i[5]=(1-(d+m))*S,i[6]=(g+M)*S,i[7]=0,i[8]=(p+x)*E,i[9]=(g-M)*E,i[10]=(1-(d+v))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=_s.set(i[0],i[1],i[2]).length();const o=_s.set(i[4],i[5],i[6]).length(),a=_s.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Ln.copy(this);const l=1/s,h=1/o,u=1/a;return Ln.elements[0]*=l,Ln.elements[1]*=l,Ln.elements[2]*=l,Ln.elements[4]*=h,Ln.elements[5]*=h,Ln.elements[6]*=h,Ln.elements[8]*=u,Ln.elements[9]*=u,Ln.elements[10]*=u,t.setFromRotationMatrix(Ln),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=Jn,c=!1){const l=this.elements,h=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let p,v;if(c)p=s/(o-s),v=o*s/(o-s);else if(a===Jn)p=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===Jo)p=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Jn,c=!1){const l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i);let p,v;if(c)p=1/(o-s),v=o/(o-s);else if(a===Jn)p=-2/(o-s),v=-(o+s)/(o-s);else if(a===Jo)p=-1/(o-s),v=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const _s=new T,Ln=new pe,Ap=new T(0,0,0),Rp=new T(1,1,1),Si=new T,$r=new T,gn=new T,vh=new pe,xh=new et;class Pt{constructor(e=0,t=0,n=0,i=Pt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return vh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(vh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xh.setFromEuler(this),this.setFromQuaternion(xh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Pt.DEFAULT_ORDER="XYZ";class Nd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Cp=0;const yh=new T,Ms=new et,ri=new pe,eo=new T,rr=new T,Lp=new T,Pp=new et,_h=new T(1,0,0),Mh=new T(0,1,0),bh=new T(0,0,1),Sh={type:"added"},Dp={type:"removed"},bs={type:"childadded",child:null},Aa={type:"childremoved",child:null};class bt extends Js{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cp++}),this.uuid=Bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bt.DEFAULT_UP.clone();const e=new T,t=new Pt,n=new et,i=new T(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new pe},normalMatrix:{value:new je}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Nd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ms.setFromAxisAngle(e,t),this.quaternion.multiply(Ms),this}rotateOnWorldAxis(e,t){return Ms.setFromAxisAngle(e,t),this.quaternion.premultiply(Ms),this}rotateX(e){return this.rotateOnAxis(_h,e)}rotateY(e){return this.rotateOnAxis(Mh,e)}rotateZ(e){return this.rotateOnAxis(bh,e)}translateOnAxis(e,t){return yh.copy(e).applyQuaternion(this.quaternion),this.position.add(yh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_h,e)}translateY(e){return this.translateOnAxis(Mh,e)}translateZ(e){return this.translateOnAxis(bh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ri.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?eo.copy(e):eo.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),rr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ri.lookAt(rr,eo,this.up):ri.lookAt(eo,rr,this.up),this.quaternion.setFromRotationMatrix(ri),i&&(ri.extractRotation(i.matrixWorld),Ms.setFromRotationMatrix(ri),this.quaternion.premultiply(Ms.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Sh),bs.child=e,this.dispatchEvent(bs),bs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dp),Aa.child=e,this.dispatchEvent(Aa),Aa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(ri),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Sh),bs.child=e,this.dispatchEvent(bs),bs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,e,Lp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,Pp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}bt.DEFAULT_UP=new T(0,1,0);bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pn=new T,oi=new T,Ra=new T,ai=new T,Ss=new T,ws=new T,wh=new T,Ca=new T,La=new T,Pa=new T,Da=new lt,Ia=new lt,Ua=new lt;class Fn{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Pn.subVectors(e,t),i.cross(Pn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Pn.subVectors(i,t),oi.subVectors(n,t),Ra.subVectors(e,t);const o=Pn.dot(Pn),a=Pn.dot(oi),c=Pn.dot(Ra),l=oi.dot(oi),h=oi.dot(Ra),u=o*l-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,p=(o*h-a*c)*d;return s.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ai)===null?!1:ai.x>=0&&ai.y>=0&&ai.x+ai.y<=1}static getInterpolation(e,t,n,i,s,o,a,c){return this.getBarycoord(e,t,n,i,ai)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ai.x),c.addScaledVector(o,ai.y),c.addScaledVector(a,ai.z),c)}static getInterpolatedAttribute(e,t,n,i,s,o){return Da.setScalar(0),Ia.setScalar(0),Ua.setScalar(0),Da.fromBufferAttribute(e,t),Ia.fromBufferAttribute(e,n),Ua.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Da,s.x),o.addScaledVector(Ia,s.y),o.addScaledVector(Ua,s.z),o}static isFrontFacing(e,t,n,i){return Pn.subVectors(n,t),oi.subVectors(e,t),Pn.cross(oi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pn.subVectors(this.c,this.b),oi.subVectors(this.a,this.b),Pn.cross(oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Fn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Fn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Ss.subVectors(i,n),ws.subVectors(s,n),Ca.subVectors(e,n);const c=Ss.dot(Ca),l=ws.dot(Ca);if(c<=0&&l<=0)return t.copy(n);La.subVectors(e,i);const h=Ss.dot(La),u=ws.dot(La);if(h>=0&&u<=h)return t.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Ss,o);Pa.subVectors(e,s);const f=Ss.dot(Pa),p=ws.dot(Pa);if(p>=0&&f<=p)return t.copy(s);const v=f*l-c*p;if(v<=0&&l>=0&&p<=0)return a=l/(l-p),t.copy(n).addScaledVector(ws,a);const g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return wh.subVectors(s,i),a=(u-h)/(u-h+(f-p)),t.copy(i).addScaledVector(wh,a);const m=1/(g+v+d);return o=v*m,a=d*m,t.copy(n).addScaledVector(Ss,o).addScaledVector(ws,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const kd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wi={h:0,s:0,l:0},to={h:0,s:0,l:0};function Na(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class he{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=it){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,nt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=nt.workingColorSpace){if(e=Il(e,1),t=Ze(t,0,1),n=Ze(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Na(o,s,e+1/3),this.g=Na(o,s,e),this.b=Na(o,s,e-1/3)}return nt.colorSpaceToWorking(this,i),this}setStyle(e,t=it){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=it){const n=kd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gi(e.r),this.g=gi(e.g),this.b=gi(e.b),this}copyLinearToSRGB(e){return this.r=ks(e.r),this.g=ks(e.g),this.b=ks(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=it){return nt.workingToColorSpace(Kt.copy(this),e),Math.round(Ze(Kt.r*255,0,255))*65536+Math.round(Ze(Kt.g*255,0,255))*256+Math.round(Ze(Kt.b*255,0,255))}getHexString(e=it){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.workingToColorSpace(Kt.copy(this),t);const n=Kt.r,i=Kt.g,s=Kt.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=nt.workingColorSpace){return nt.workingToColorSpace(Kt.copy(this),t),e.r=Kt.r,e.g=Kt.g,e.b=Kt.b,e}getStyle(e=it){nt.workingToColorSpace(Kt.copy(this),e);const t=Kt.r,n=Kt.g,i=Kt.b;return e!==it?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(wi),this.setHSL(wi.h+e,wi.s+t,wi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(wi),e.getHSL(to);const n=Er(wi.h,to.h,t),i=Er(wi.s,to.s,t),s=Er(wi.l,to.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Kt=new he;he.NAMES=kd;let Ip=0;class zn extends Js{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ip++}),this.uuid=Bn(),this.name="",this.type="Material",this.blending=hs,this.side=xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Rc,this.blendDst=Cc,this.blendEquation=ss,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new he(0,0,0),this.blendAlpha=0,this.depthFunc=Bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ms,this.stencilZFail=ms,this.stencilZPass=ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hs&&(n.blending=this.blending),this.side!==xi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Rc&&(n.blendSrc=this.blendSrc),this.blendDst!==Cc&&(n.blendDst=this.blendDst),this.blendEquation!==ss&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Bs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ms&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ms&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ms&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Qn extends zn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pt,this.combine=pd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const It=new T,no=new ve;let Up=0;class at{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Up++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=pl,this.updateRanges=[],this.gpuType=On,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)no.fromBufferAttribute(this,t),no.applyMatrix3(e),this.setXY(t,no.x,no.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=kn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=kn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=kn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=kn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=kn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),i=ft(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),i=ft(i,this.array),s=ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==pl&&(e.usage=this.usage),e}}class Fd extends at{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Od extends at{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ut extends at{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Np=0;const An=new pe,ka=new bt,Ts=new T,vn=new Vn,or=new Vn,Gt=new T;class Et extends Js{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=Bn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Id(e)?Od:Fd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new je().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return An.makeRotationFromQuaternion(e),this.applyMatrix4(An),this}rotateX(e){return An.makeRotationX(e),this.applyMatrix4(An),this}rotateY(e){return An.makeRotationY(e),this.applyMatrix4(An),this}rotateZ(e){return An.makeRotationZ(e),this.applyMatrix4(An),this}translate(e,t,n){return An.makeTranslation(e,t,n),this.applyMatrix4(An),this}scale(e,t,n){return An.makeScale(e,t,n),this.applyMatrix4(An),this}lookAt(e){return ka.lookAt(e),ka.updateMatrix(),this.applyMatrix4(ka.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ts).negate(),this.translate(Ts.x,Ts.y,Ts.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ut(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];vn.setFromBufferAttribute(s),this.morphTargetsRelative?(Gt.addVectors(this.boundingBox.min,vn.min),this.boundingBox.expandByPoint(Gt),Gt.addVectors(this.boundingBox.max,vn.max),this.boundingBox.expandByPoint(Gt)):(this.boundingBox.expandByPoint(vn.min),this.boundingBox.expandByPoint(vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new T,1/0);return}if(e){const n=this.boundingSphere.center;if(vn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];or.setFromBufferAttribute(a),this.morphTargetsRelative?(Gt.addVectors(vn.min,or.min),vn.expandByPoint(Gt),Gt.addVectors(vn.max,or.max),vn.expandByPoint(Gt)):(vn.expandByPoint(or.min),vn.expandByPoint(or.max))}vn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Gt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Gt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Gt.fromBufferAttribute(a,l),c&&(Ts.fromBufferAttribute(e,l),Gt.add(Ts)),i=Math.max(i,n.distanceToSquared(Gt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new at(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let L=0;L<n.count;L++)a[L]=new T,c[L]=new T;const l=new T,h=new T,u=new T,d=new ve,f=new ve,p=new ve,v=new T,g=new T;function m(L,b,_){l.fromBufferAttribute(n,L),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,_),d.fromBufferAttribute(s,L),f.fromBufferAttribute(s,b),p.fromBufferAttribute(s,_),h.sub(l),u.sub(l),f.sub(d),p.sub(d);const C=1/(f.x*p.y-p.x*f.y);isFinite(C)&&(v.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(C),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(C),a[L].add(v),a[b].add(v),a[_].add(v),c[L].add(g),c[b].add(g),c[_].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let L=0,b=M.length;L<b;++L){const _=M[L],C=_.start,D=_.count;for(let U=C,k=C+D;U<k;U+=3)m(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const x=new T,y=new T,w=new T,S=new T;function E(L){w.fromBufferAttribute(i,L),S.copy(w);const b=a[L];x.copy(b),x.sub(w.multiplyScalar(w.dot(b))).normalize(),y.crossVectors(S,b);const C=y.dot(c[L])<0?-1:1;o.setXYZW(L,x.x,x.y,x.z,C)}for(let L=0,b=M.length;L<b;++L){const _=M[L],C=_.start,D=_.count;for(let U=C,k=C+D;U<k;U+=3)E(e.getX(U+0)),E(e.getX(U+1)),E(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new at(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new T,s=new T,o=new T,a=new T,c=new T,l=new T,h=new T,u=new T;if(e)for(let d=0,f=e.count;d<f;d+=3){const p=e.getX(d+0),v=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,p),s.fromBufferAttribute(t,v),o.fromBufferAttribute(t,g),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,p),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Gt.fromBufferAttribute(e,t),Gt.normalize(),e.setXYZ(t,Gt.x,Gt.y,Gt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,p=0;for(let v=0,g=c.length;v<g;v++){a.isInterleavedBufferAttribute?f=c[v]*a.data.stride+a.offset:f=c[v]*h;for(let m=0;m<h;m++)d[p++]=l[f++]}return new at(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Et,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=e(c,n);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Th=new pe,Bi=new ca,io=new Gn,Eh=new T,so=new T,ro=new T,oo=new T,Fa=new T,ao=new T,Ah=new T,co=new T;class tt extends bt{constructor(e=new Et,t=new Qn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){ao.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],u=s[c];h!==0&&(Fa.fromBufferAttribute(u,e),o?ao.addScaledVector(Fa,h):ao.addScaledVector(Fa.sub(t),h))}t.add(ao)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),io.copy(n.boundingSphere),io.applyMatrix4(s),Bi.copy(e.ray).recast(e.near),!(io.containsPoint(Bi.origin)===!1&&(Bi.intersectSphere(io,Eh)===null||Bi.origin.distanceToSquared(Eh)>(e.far-e.near)**2))&&(Th.copy(s).invert(),Bi.copy(e.ray).applyMatrix4(Th),!(n.boundingBox!==null&&Bi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Bi)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,v=d.length;p<v;p++){const g=d[p],m=o[g.materialIndex],M=Math.max(g.start,f.start),x=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=M,w=x;y<w;y+=3){const S=a.getX(y),E=a.getX(y+1),L=a.getX(y+2);i=lo(this,m,e,n,l,h,u,S,E,L),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const M=a.getX(g),x=a.getX(g+1),y=a.getX(g+2);i=lo(this,o,e,n,l,h,u,M,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,v=d.length;p<v;p++){const g=d[p],m=o[g.materialIndex],M=Math.max(g.start,f.start),x=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let y=M,w=x;y<w;y+=3){const S=y,E=y+1,L=y+2;i=lo(this,m,e,n,l,h,u,S,E,L),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const M=g,x=g+1,y=g+2;i=lo(this,o,e,n,l,h,u,M,x,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function kp(r,e,t,n,i,s,o,a){let c;if(e.side===sn?c=n.intersectTriangle(o,s,i,!0,a):c=n.intersectTriangle(i,s,o,e.side===xi,a),c===null)return null;co.copy(a),co.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(co);return l<t.near||l>t.far?null:{distance:l,point:co.clone(),object:r}}function lo(r,e,t,n,i,s,o,a,c,l){r.getVertexPosition(a,so),r.getVertexPosition(c,ro),r.getVertexPosition(l,oo);const h=kp(r,e,t,n,so,ro,oo,Ah);if(h){const u=new T;Fn.getBarycoord(Ah,so,ro,oo,u),i&&(h.uv=Fn.getInterpolatedAttribute(i,a,c,l,u,new ve)),s&&(h.uv1=Fn.getInterpolatedAttribute(s,a,c,l,u,new ve)),o&&(h.normal=Fn.getInterpolatedAttribute(o,a,c,l,u,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new T,materialIndex:0};Fn.getNormal(so,ro,oo,d.normal),h.face=d,h.barycoord=u}return h}class tn extends Et{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;p("z","y","x",-1,-1,n,t,e,o,s,0),p("z","y","x",1,-1,n,t,-e,o,s,1),p("x","z","y",1,1,e,n,t,i,o,2),p("x","z","y",1,-1,e,n,-t,i,o,3),p("x","y","z",1,-1,e,t,n,i,s,4),p("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new ut(l,3)),this.setAttribute("normal",new ut(h,3)),this.setAttribute("uv",new ut(u,2));function p(v,g,m,M,x,y,w,S,E,L,b){const _=y/E,C=w/L,D=y/2,U=w/2,k=S/2,H=E+1,O=L+1;let q=0,z=0;const $=new T;for(let re=0;re<O;re++){const ee=re*C-U;for(let Me=0;Me<H;Me++){const K=Me*_-D;$[v]=K*M,$[g]=ee*x,$[m]=k,l.push($.x,$.y,$.z),$[v]=0,$[g]=0,$[m]=S>0?1:-1,h.push($.x,$.y,$.z),u.push(Me/E),u.push(1-re/L),q+=1}}for(let re=0;re<L;re++)for(let ee=0;ee<E;ee++){const Me=d+ee+H*re,K=d+ee+H*(re+1),ce=d+(ee+1)+H*(re+1),be=d+(ee+1)+H*re;c.push(Me,K,be),c.push(K,ce,be),z+=6}a.addGroup(f,z,b),f+=z,d+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Xs(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function en(r){const e={};for(let t=0;t<r.length;t++){const n=Xs(r[t]);for(const i in n)e[i]=n[i]}return e}function Fp(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Bd(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}const vi={clone:Xs,merge:en};var Op=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vt extends zn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Op,this.fragmentShader=Bp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xs(e.uniforms),this.uniformsGroups=Fp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class zd extends bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe,this.coordinateSystem=Jn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ti=new T,Rh=new ve,Ch=new ve;class nn extends zd{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ws*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Tr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ws*2*Math.atan(Math.tan(Tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z),Ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z)}getViewSize(e,t){return this.getViewBounds(e,Rh,Ch),t.subVectors(Ch,Rh)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Tr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Es=-90,As=1;class Hd extends bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new nn(Es,As,e,t);i.layers=this.layers,this.add(i);const s=new nn(Es,As,e,t);s.layers=this.layers,this.add(s);const o=new nn(Es,As,e,t);o.layers=this.layers,this.add(o);const a=new nn(Es,As,e,t);a.layers=this.layers,this.add(a);const c=new nn(Es,As,e,t);c.layers=this.layers,this.add(c);const l=new nn(Es,As,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===Jn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Jo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Vd extends Dt{constructor(e=[],t=zs,n,i,s,o,a,c,l,h){super(e,t,n,i,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Gd extends qt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Vd(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new tn(5,5,5),s=new vt({name:"CubemapFromEquirect",uniforms:Xs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:sn,blending:pi});s.uniforms.tEquirect.value=t;const o=new tt(i,s),a=t.minFilter;return t.minFilter===un&&(t.minFilter=Bt),new Hd(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class wn extends bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zp={type:"move"};class Oa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),m=this._getHandJoint(l,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;l.inputState.pinching&&d>f+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(zp)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new wn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Nl{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new he(e),this.density=t}clone(){return new Nl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Wd extends bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pt,this.environmentIntensity=1,this.environmentRotation=new Pt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Hp{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=pl,this.updateRanges=[],this.version=0,this.uuid=Bn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const $t=new T;class kl{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=kn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=kn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=kn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=kn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=kn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),i=ft(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),i=ft(i,this.array),s=ft(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new at(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new kl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Lh=new T,Ph=new lt,Dh=new lt,Vp=new T,Ih=new pe,ho=new T,Ba=new Gn,Uh=new pe,za=new ca;class Gp extends tt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=oh,this.bindMatrix=new pe,this.bindMatrixInverse=new pe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Vn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ho),this.boundingBox.expandByPoint(ho)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Gn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ho),this.boundingSphere.expandByPoint(ho)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ba.copy(this.boundingSphere),Ba.applyMatrix4(i),e.ray.intersectsSphere(Ba)!==!1&&(Uh.copy(i).invert(),za.copy(e.ray).applyMatrix4(Uh),!(this.boundingBox!==null&&za.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,za)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new lt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===oh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Gf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Ph.fromBufferAttribute(i.attributes.skinIndex,e),Dh.fromBufferAttribute(i.attributes.skinWeight,e),Lh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=Dh.getComponent(s);if(o!==0){const a=Ph.getComponent(s);Ih.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Vp.copy(Lh).applyMatrix4(Ih),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Xd extends bt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class la extends Dt{constructor(e=null,t=1,n=1,i,s,o,a,c,l=Xt,h=Xt,u,d){super(null,o,a,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Nh=new pe,Wp=new pe;class Fl{constructor(e=[],t=[]){this.uuid=Bn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new pe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new pe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:Wp;Nh.multiplyMatrices(a,t[s]),Nh.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Fl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new la(t,e,e,Sn,On);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new Xd),this.bones.push(o),this.boneInverses.push(new pe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class qs extends at{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Rs=new pe,kh=new pe,uo=[],Fh=new Vn,Xp=new pe,ar=new tt,cr=new Gn;class Tt extends tt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new qs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Xp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Vn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rs),Fh.copy(e.boundingBox).applyMatrix4(Rs),this.boundingBox.union(Fh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Gn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rs),cr.copy(e.boundingSphere).applyMatrix4(Rs),this.boundingSphere.union(cr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(ar.geometry=this.geometry,ar.material=this.material,ar.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),cr.copy(this.boundingSphere),cr.applyMatrix4(n),e.ray.intersectsSphere(cr)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Rs),kh.multiplyMatrices(n,Rs),ar.matrixWorld=kh,ar.raycast(e,uo);for(let o=0,a=uo.length;o<a;o++){const c=uo[o];c.instanceId=s,c.object=this,t.push(c)}uo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new qs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new la(new Float32Array(i*this.count),i,this.count,aa,On));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=i*e;s[c]=a,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ha=new T,qp=new T,Yp=new je;class Zi{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Ha.subVectors(n,t).cross(qp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ha),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Yp.getNormalMatrix(e),i=this.coplanarPoint(Ha).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zi=new Gn,jp=new ve(.5,.5),fo=new T;class Ol{constructor(e=new Zi,t=new Zi,n=new Zi,i=new Zi,s=new Zi,o=new Zi){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Jn,n=!1){const i=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],f=s[7],p=s[8],v=s[9],g=s[10],m=s[11],M=s[12],x=s[13],y=s[14],w=s[15];if(i[0].setComponents(l-o,f-h,m-p,w-M).normalize(),i[1].setComponents(l+o,f+h,m+p,w+M).normalize(),i[2].setComponents(l+a,f+u,m+v,w+x).normalize(),i[3].setComponents(l-a,f-u,m-v,w-x).normalize(),n)i[4].setComponents(c,d,g,y).normalize(),i[5].setComponents(l-c,f-d,m-g,w-y).normalize();else if(i[4].setComponents(l-c,f-d,m-g,w-y).normalize(),t===Jn)i[5].setComponents(l+c,f+d,m+g,w+y).normalize();else if(t===Jo)i[5].setComponents(c,d,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),zi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zi)}intersectsSprite(e){zi.center.set(0,0,0);const t=jp.distanceTo(e.center);return zi.radius=.7071067811865476+t,zi.applyMatrix4(e.matrixWorld),this.intersectsSphere(zi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(fo.x=i.normal.x>0?e.max.x:e.min.x,fo.y=i.normal.y>0?e.max.y:e.min.y,fo.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(fo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class qd extends zn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new he(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const $o=new T,ea=new T,Oh=new pe,lr=new ca,po=new Gn,Va=new T,Bh=new T;class Bl extends bt{constructor(e=new Et,t=new qd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)$o.fromBufferAttribute(t,i-1),ea.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=$o.distanceTo(ea);e.setAttribute("lineDistance",new ut(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),po.copy(n.boundingSphere),po.applyMatrix4(i),po.radius+=s,e.ray.intersectsSphere(po)===!1)return;Oh.copy(i).invert(),lr.copy(e.ray).applyMatrix4(Oh);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let v=f,g=p-1;v<g;v+=l){const m=h.getX(v),M=h.getX(v+1),x=mo(this,e,lr,c,m,M,v);x&&t.push(x)}if(this.isLineLoop){const v=h.getX(p-1),g=h.getX(f),m=mo(this,e,lr,c,v,g,p-1);m&&t.push(m)}}else{const f=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let v=f,g=p-1;v<g;v+=l){const m=mo(this,e,lr,c,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){const v=mo(this,e,lr,c,p-1,f,p-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function mo(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if($o.fromBufferAttribute(a,i),ea.fromBufferAttribute(a,s),t.distanceSqToSegment($o,ea,Va,Bh)>n)return;Va.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(Va);if(!(l<e.near||l>e.far))return{distance:l,point:Bh.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const zh=new T,Hh=new T;class Kp extends Bl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)zh.fromBufferAttribute(t,i),Hh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+zh.distanceTo(Hh);e.setAttribute("lineDistance",new ut(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Zp extends Bl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Yd extends zn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new he(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Vh=new pe,ml=new ca,go=new Gn,vo=new T;class Jp extends bt{constructor(e=new Et,t=new Yd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),go.copy(n.boundingSphere),go.applyMatrix4(i),go.radius+=s,e.ray.intersectsSphere(go)===!1)return;Vh.copy(i).invert(),ml.copy(e.ray).applyMatrix4(Vh);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let p=d,v=f;p<v;p++){const g=l.getX(p);vo.fromBufferAttribute(u,g),Gh(vo,g,c,i,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let p=d,v=f;p<v;p++)vo.fromBufferAttribute(u,p),Gh(vo,p,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Gh(r,e,t,n,i,s,o){const a=ml.distanceSqToPoint(r);if(a<t){const c=new T;ml.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Jt extends Dt{constructor(e,t,n,i,s,o,a,c,l){super(e,t,n,i,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class zl extends Dt{constructor(e,t,n=ds,i,s,o,a=Xt,c=Xt,l,h=Nr,u=1){if(h!==Nr&&h!==Gs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:u};super(d,i,s,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ul(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class jd extends Dt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Hl extends Et{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],o=[],a=[],c=[],l=new T,h=new ve;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new ut(o,3)),this.setAttribute("normal",new ut(a,3)),this.setAttribute("uv",new ut(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hl(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Nn extends Et{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let p=0;const v=[],g=n/2;let m=0;M(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new ut(u,3)),this.setAttribute("normal",new ut(d,3)),this.setAttribute("uv",new ut(f,2));function M(){const y=new T,w=new T;let S=0;const E=(t-e)/n;for(let L=0;L<=s;L++){const b=[],_=L/s,C=_*(t-e)+e;for(let D=0;D<=i;D++){const U=D/i,k=U*c+a,H=Math.sin(k),O=Math.cos(k);w.x=C*H,w.y=-_*n+g,w.z=C*O,u.push(w.x,w.y,w.z),y.set(H,E,O).normalize(),d.push(y.x,y.y,y.z),f.push(U,1-_),b.push(p++)}v.push(b)}for(let L=0;L<i;L++)for(let b=0;b<s;b++){const _=v[b][L],C=v[b+1][L],D=v[b+1][L+1],U=v[b][L+1];(e>0||b!==0)&&(h.push(_,C,U),S+=3),(t>0||b!==s-1)&&(h.push(C,D,U),S+=3)}l.addGroup(m,S,0),m+=S}function x(y){const w=p,S=new ve,E=new T;let L=0;const b=y===!0?e:t,_=y===!0?1:-1;for(let D=1;D<=i;D++)u.push(0,g*_,0),d.push(0,_,0),f.push(.5,.5),p++;const C=p;for(let D=0;D<=i;D++){const k=D/i*c+a,H=Math.cos(k),O=Math.sin(k);E.x=b*O,E.y=g*_,E.z=b*H,u.push(E.x,E.y,E.z),d.push(0,_,0),S.x=H*.5+.5,S.y=O*.5*_+.5,f.push(S.x,S.y),p++}for(let D=0;D<i;D++){const U=w+D,k=C+D;y===!0?h.push(k,k+1,U):h.push(k+1,k,U),L+=3}l.addGroup(m,L,y===!0?1:2),m+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ta extends Nn{constructor(e=1,t=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new ta(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class zr extends Et{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],o=[];a(i),l(n),h(),this.setAttribute("position",new ut(s,3)),this.setAttribute("normal",new ut(s.slice(),3)),this.setAttribute("uv",new ut(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const x=new T,y=new T,w=new T;for(let S=0;S<t.length;S+=3)f(t[S+0],x),f(t[S+1],y),f(t[S+2],w),c(x,y,w,M)}function c(M,x,y,w){const S=w+1,E=[];for(let L=0;L<=S;L++){E[L]=[];const b=M.clone().lerp(y,L/S),_=x.clone().lerp(y,L/S),C=S-L;for(let D=0;D<=C;D++)D===0&&L===S?E[L][D]=b:E[L][D]=b.clone().lerp(_,D/C)}for(let L=0;L<S;L++)for(let b=0;b<2*(S-L)-1;b++){const _=Math.floor(b/2);b%2===0?(d(E[L][_+1]),d(E[L+1][_]),d(E[L][_])):(d(E[L][_+1]),d(E[L+1][_+1]),d(E[L+1][_]))}}function l(M){const x=new T;for(let y=0;y<s.length;y+=3)x.x=s[y+0],x.y=s[y+1],x.z=s[y+2],x.normalize().multiplyScalar(M),s[y+0]=x.x,s[y+1]=x.y,s[y+2]=x.z}function h(){const M=new T;for(let x=0;x<s.length;x+=3){M.x=s[x+0],M.y=s[x+1],M.z=s[x+2];const y=g(M)/2/Math.PI+.5,w=m(M)/Math.PI+.5;o.push(y,1-w)}p(),u()}function u(){for(let M=0;M<o.length;M+=6){const x=o[M+0],y=o[M+2],w=o[M+4],S=Math.max(x,y,w),E=Math.min(x,y,w);S>.9&&E<.1&&(x<.2&&(o[M+0]+=1),y<.2&&(o[M+2]+=1),w<.2&&(o[M+4]+=1))}}function d(M){s.push(M.x,M.y,M.z)}function f(M,x){const y=M*3;x.x=e[y+0],x.y=e[y+1],x.z=e[y+2]}function p(){const M=new T,x=new T,y=new T,w=new T,S=new ve,E=new ve,L=new ve;for(let b=0,_=0;b<s.length;b+=9,_+=6){M.set(s[b+0],s[b+1],s[b+2]),x.set(s[b+3],s[b+4],s[b+5]),y.set(s[b+6],s[b+7],s[b+8]),S.set(o[_+0],o[_+1]),E.set(o[_+2],o[_+3]),L.set(o[_+4],o[_+5]),w.copy(M).add(x).add(y).divideScalar(3);const C=g(w);v(S,_+0,M,C),v(E,_+2,x,C),v(L,_+4,y,C)}}function v(M,x,y,w){w<0&&M.x===1&&(o[x]=M.x-1),y.x===0&&y.z===0&&(o[x]=w/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zr(e.vertices,e.indices,e.radius,e.details)}}class Vl extends zr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Vl(e.radius,e.detail)}}class Qp{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),c=t||(o.isVector2?new ve:new T);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new T,i=[],s=[],o=[],a=new T,c=new pe;for(let f=0;f<=e;f++){const p=f/e;i[f]=this.getTangentAt(p,new T)}s[0]=new T,o[0]=new T;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(Ze(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(a,p))}o[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(Ze(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let p=1;p<=e;p++)s[p].applyMatrix4(c.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function Gl(){let r=0,e=0,t=0,n=0;function i(s,o,a,c){r=s,e=a,t=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){i(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,h,u){let d=(o-s)/l-(a-s)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(s){const o=s*s,a=o*s;return r+e*s+t*o+n*a}}}const xo=new T,Ga=new Gl,Wa=new Gl,Xa=new Gl;class gl extends Qp{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new T){const n=t,i=this.points,s=i.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%s]:(xo.subVectors(i[0],i[1]).add(i[0]),l=xo);const u=i[a%s],d=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(xo.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=xo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(l.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),Ga.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,p,v,g),Wa.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,p,v,g),Xa.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,p,v,g)}else this.curveType==="catmullrom"&&(Ga.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),Wa.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),Xa.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(Ga.calc(c),Wa.calc(c),Xa.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new T().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}class na extends zr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new na(e.radius,e.detail)}}class Wl extends zr{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Wl(e.radius,e.detail)}}class hn extends Et{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=e/a,d=t/c,f=[],p=[],v=[],g=[];for(let m=0;m<h;m++){const M=m*d-o;for(let x=0;x<l;x++){const y=x*u-s;p.push(y,-M,0),v.push(0,0,1),g.push(x/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let M=0;M<a;M++){const x=M+l*m,y=M+l*(m+1),w=M+1+l*(m+1),S=M+1+l*m;f.push(x,y,S),f.push(y,w,S)}this.setIndex(f),this.setAttribute("position",new ut(p,3)),this.setAttribute("normal",new ut(v,3)),this.setAttribute("uv",new ut(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hn(e.width,e.height,e.widthSegments,e.heightSegments)}}class us extends Et{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new T,d=new T,f=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const M=[],x=m/n;let y=0;m===0&&o===0?y=.5/t:m===n&&c===Math.PI&&(y=-.5/t);for(let w=0;w<=t;w++){const S=w/t;u.x=-e*Math.cos(i+S*s)*Math.sin(o+x*a),u.y=e*Math.cos(o+x*a),u.z=e*Math.sin(i+S*s)*Math.sin(o+x*a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),g.push(S+y,1-x),M.push(l++)}h.push(M)}for(let m=0;m<n;m++)for(let M=0;M<t;M++){const x=h[m][M+1],y=h[m][M],w=h[m+1][M],S=h[m+1][M+1];(m!==0||o>0)&&f.push(x,y,S),(m!==n-1||c<Math.PI)&&f.push(y,w,S)}this.setIndex(f),this.setAttribute("position",new ut(p,3)),this.setAttribute("normal",new ut(v,3)),this.setAttribute("uv",new ut(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new us(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class as extends Et{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],c=[],l=[],h=new T,u=new T,d=new T;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const v=p/i*s,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(v),u.y=(e+t*Math.cos(g))*Math.sin(v),u.z=t*Math.sin(g),a.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(p/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const v=(i+1)*f+p-1,g=(i+1)*(f-1)+p-1,m=(i+1)*(f-1)+p,M=(i+1)*f+p;o.push(v,g,M),o.push(g,m,M)}this.setIndex(o),this.setAttribute("position",new ut(a,3)),this.setAttribute("normal",new ut(c,3)),this.setAttribute("uv",new ut(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new as(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class $p extends vt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Xe extends zn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new he(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pd,this.normalScale=new ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class dn extends Xe{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ve(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ze(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new he(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new he(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new he(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class em extends zn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class tm extends zn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function yo(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function nm(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function im(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Wh(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let c=0;c!==e;++c)i[o++]=r[a+c]}return i}function Kd(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class Hr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class sm extends Hr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ah,endingEnd:ah}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case ch:s=e,a=2*t-n;break;case lh:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case ch:o=e,c=2*n-t;break;case lh:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),v=p*p,g=v*p,m=-d*g+2*d*v-d*p,M=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*p+1,x=(-1-f)*g+(1.5+f)*v+.5*p,y=f*g-f*v;for(let w=0;w!==a;++w)s[w]=m*o[h+w]+M*o[l+w]+x*o[c+w]+y*o[u+w];return s}}class rm extends Hr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)s[d]=o[l+d]*u+o[c+d]*h;return s}}class om extends Hr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Wn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=yo(t,this.TimeBufferType),this.values=yo(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:yo(e.times,Array),values:yo(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new om(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new rm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new sm(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case kr:t=this.InterpolantFactoryMethodDiscrete;break;case Fr:t=this.InterpolantFactoryMethodLinear;break;case va:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return kr;case this.InterpolantFactoryMethodLinear:return Fr;case this.InterpolantFactoryMethodSmooth:return va}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&nm(i))for(let a=0,c=i.length;a!==c;++a){const l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===va,s=e.length-1;let o=1;for(let a=1;a<s;++a){let c=!1;const l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(i)c=!0;else{const u=a*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){const v=t[u+p];if(v!==t[d+p]||v!==t[f+p]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Wn.prototype.ValueTypeName="";Wn.prototype.TimeBufferType=Float32Array;Wn.prototype.ValueBufferType=Float32Array;Wn.prototype.DefaultInterpolation=Fr;class Qs extends Wn{constructor(e,t,n){super(e,t,n)}}Qs.prototype.ValueTypeName="bool";Qs.prototype.ValueBufferType=Array;Qs.prototype.DefaultInterpolation=kr;Qs.prototype.InterpolantFactoryMethodLinear=void 0;Qs.prototype.InterpolantFactoryMethodSmooth=void 0;class Zd extends Wn{constructor(e,t,n,i){super(e,t,n,i)}}Zd.prototype.ValueTypeName="color";class Ys extends Wn{constructor(e,t,n,i){super(e,t,n,i)}}Ys.prototype.ValueTypeName="number";class am extends Hr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t);let l=e*a;for(let h=l+a;l!==h;l+=4)et.slerpFlat(s,0,o,l-a,o,l,c);return s}}class js extends Wn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new am(this.times,this.values,this.getValueSize(),e)}}js.prototype.ValueTypeName="quaternion";js.prototype.InterpolantFactoryMethodSmooth=void 0;class $s extends Wn{constructor(e,t,n){super(e,t,n)}}$s.prototype.ValueTypeName="string";$s.prototype.ValueBufferType=Array;$s.prototype.DefaultInterpolation=kr;$s.prototype.InterpolantFactoryMethodLinear=void 0;$s.prototype.InterpolantFactoryMethodSmooth=void 0;class Ks extends Wn{constructor(e,t,n,i){super(e,t,n,i)}}Ks.prototype.ValueTypeName="vector";class cm{constructor(e="",t=-1,n=[],i=Wf){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Bn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(hm(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(Wn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let c=[],l=[];c.push((a+s-1)%s,a,(a+1)%s),l.push(0,1,0);const h=im(c);c=Wh(c,1,h),l=Wh(l,1,h),!i&&c[0]===0&&(c.push(s),l.push(l[0])),o.push(new Ys(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],h=l.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(l)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,p,v){if(f.length!==0){const g=[],m=[];Kd(f,g,m,p),g.length!==0&&v.push(new u(d,g,m))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let v=0;v<d[p].morphTargets.length;v++)f[d[p].morphTargets[v]]=-1;for(const v in f){const g=[],m=[];for(let M=0;M!==d[p].morphTargets.length;++M){const x=d[p];g.push(x.time),m.push(x.morphTarget===v?1:0)}i.push(new Ys(".morphTargetInfluence["+v+"]",g,m))}c=f.length*o}else{const f=".bones["+t[u].name+"]";n(Ks,f+".position",d,"pos",i),n(js,f+".quaternion",d,"rot",i),n(Ks,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,c,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function lm(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ys;case"vector":case"vector2":case"vector3":case"vector4":return Ks;case"color":return Zd;case"quaternion":return js;case"bool":case"boolean":return Qs;case"string":return $s}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function hm(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=lm(r.type);if(r.times===void 0){const t=[],n=[];Kd(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const fi={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class um{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],p=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const dm=new um;class er{constructor(e){this.manager=e!==void 0?e:dm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}er.DEFAULT_MATERIAL_NAME="__DEFAULT";const ci={};class fm extends Error{constructor(e,t){super(e),this.response=t}}class Jd extends er{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=fi.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(ci[e]!==void 0){ci[e].push({onLoad:t,onProgress:n,onError:i});return}ci[e]=[],ci[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=ci[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0;let v=0;const g=new ReadableStream({start(m){M();function M(){u.read().then(({done:x,value:y})=>{if(x)m.close();else{v+=y.byteLength;const w=new ProgressEvent("progress",{lengthComputable:p,loaded:v,total:f});for(let S=0,E=h.length;S<E;S++){const L=h[S];L.onProgress&&L.onProgress(w)}m.enqueue(y),M()}},x=>{m.error(x)})}}});return new Response(g)}else throw new fm(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(p=>f.decode(p))}}}).then(l=>{fi.add(`file:${e}`,l);const h=ci[e];delete ci[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=ci[e];if(h===void 0)throw this.manager.itemError(e),l;delete ci[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Cs=new WeakMap;class pm extends er{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=fi.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let u=Cs.get(o);u===void 0&&(u=[],Cs.set(o,u)),u.push({onLoad:t,onError:i})}return o}const a=Or("img");function c(){h(),t&&t(this);const u=Cs.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}Cs.delete(this),s.manager.itemEnd(e)}function l(u){h(),i&&i(u),fi.remove(`image:${e}`);const d=Cs.get(this)||[];for(let f=0;f<d.length;f++){const p=d[f];p.onError&&p.onError(u)}Cs.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),fi.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class mm extends er{constructor(e){super(e)}load(e,t,n,i){const s=new Dt,o=new pm(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class ha extends bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new he(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class gm extends ha{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new he(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const qa=new pe,Xh=new T,qh=new T;class Xl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ve(512,512),this.mapType=Hn,this.map=null,this.mapPass=null,this.matrix=new pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ol,this._frameExtents=new ve(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Xh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Xh),qh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(qh),t.updateMatrixWorld(),qa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qa,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(qa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class vm extends Xl{constructor(){super(new nn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Ws*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class xm extends ha{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new vm}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Yh=new pe,hr=new T,Ya=new T;class ym extends Xl{constructor(){super(new nn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ve(4,2),this._viewportCount=6,this._viewports=[new lt(2,1,1,1),new lt(0,1,1,1),new lt(3,1,1,1),new lt(1,1,1,1),new lt(3,0,1,1),new lt(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),hr.setFromMatrixPosition(e.matrixWorld),n.position.copy(hr),Ya.copy(n.position),Ya.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ya),n.updateMatrixWorld(),i.makeTranslation(-hr.x,-hr.y,-hr.z),Yh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Yh,n.coordinateSystem,n.reversedDepth)}}class _m extends ha{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new ym}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class ua extends zd{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Mm extends Xl{constructor(){super(new ua(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ar extends ha{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.shadow=new Mm}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Rr{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class bm extends Et{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const ja=new WeakMap;class Sm extends er{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=fi.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(l=>{if(ja.has(o)===!0)i&&i(ja.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(l),s.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return fi.add(`image-bitmap:${e}`,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){i&&i(l),ja.set(c,l),fi.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});fi.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class wm extends nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Tm{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const ql="\\[\\]\\.:\\/",Em=new RegExp("["+ql+"]","g"),Yl="[^"+ql+"]",Am="[^"+ql.replace("\\.","")+"]",Rm=/((?:WC+[\/:])*)/.source.replace("WC",Yl),Cm=/(WCOD+)?/.source.replace("WCOD",Am),Lm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Yl),Pm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Yl),Dm=new RegExp("^"+Rm+Cm+Lm+Pm+"$"),Im=["material","materials","bones","map"];class Um{constructor(e,t,n){const i=n||pt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class pt{constructor(e,t,n){this.path=t,this.parsedPath=n||pt.parseTrackName(t),this.node=pt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new pt.Composite(e,t,n):new pt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Em,"")}static parseTrackName(e){const t=Dm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Im.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=pt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[i];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}pt.Composite=Um;pt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pt.prototype.GetterByBindingType=[pt.prototype._getValue_direct,pt.prototype._getValue_array,pt.prototype._getValue_arrayElement,pt.prototype._getValue_toArray];pt.prototype.SetterByBindingTypeAndVersioning=[[pt.prototype._setValue_direct,pt.prototype._setValue_direct_setNeedsUpdate,pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_array,pt.prototype._setValue_array_setNeedsUpdate,pt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_arrayElement,pt.prototype._setValue_arrayElement_setNeedsUpdate,pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_fromArray,pt.prototype._setValue_fromArray_setNeedsUpdate,pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function jh(r,e,t,n){const i=Nm(n);switch(t){case Ad:return r*e;case aa:return r*e/i.components*i.byteLength;case Ll:return r*e/i.components*i.byteLength;case Cd:return r*e*2/i.components*i.byteLength;case Pl:return r*e*2/i.components*i.byteLength;case Rd:return r*e*3/i.components*i.byteLength;case Sn:return r*e*4/i.components*i.byteLength;case Dl:return r*e*4/i.components*i.byteLength;case Ho:case Vo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Go:case Wo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case zc:case Vc:return Math.max(r,16)*Math.max(e,8)/4;case Bc:case Hc:return Math.max(r,8)*Math.max(e,8)/2;case Gc:case Wc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Xc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case qc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Yc:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case jc:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Kc:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Zc:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Jc:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Qc:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case $c:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case el:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case tl:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case nl:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case il:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case sl:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case rl:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case ol:case al:case cl:return Math.ceil(r/4)*Math.ceil(e/4)*16;case ll:case hl:return Math.ceil(r/4)*Math.ceil(e/4)*8;case ul:case dl:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Nm(r){switch(r){case Hn:case Sd:return{byteLength:1,components:1};case Ur:case wd:case rn:return{byteLength:2,components:1};case Rl:case Cl:return{byteLength:2,components:4};case ds:case Al:case On:return{byteLength:4,components:1};case Td:case Ed:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Tl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Tl);function Qd(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function km(r){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=r.createBuffer();r.bindBuffer(c,d),r.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=r.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=r.SHORT;else if(l instanceof Uint32Array)f=r.UNSIGNED_INT;else if(l instanceof Int32Array)f=r.INT;else if(l instanceof Int8Array)f=r.BYTE;else if(l instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(r.bindBuffer(l,a),u.length===0)r.bufferSubData(l,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){const p=u[d],v=u[f];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){const v=u[f];r.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(r.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:s,update:o}}var Fm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Om=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Bm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Wm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,qm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ym=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Km=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Zm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Jm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$m=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,e0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,n0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,i0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,s0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,r0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,o0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,a0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,c0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,l0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,h0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,u0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,d0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,f0="gl_FragColor = linearToOutputTexel( gl_FragColor );",p0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,m0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,g0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,v0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,x0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,y0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,M0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,b0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,S0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,w0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,T0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,E0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,A0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,R0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,C0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,L0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,P0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,D0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,I0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,U0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,N0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,k0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,F0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,O0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,B0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,z0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,H0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,V0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,G0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,W0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,X0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,q0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Y0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,j0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,K0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Z0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,J0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Q0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,tg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ng=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ig=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,og=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ag=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ug=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,dg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,yg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_g=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Mg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,bg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,wg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Eg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ag=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Pg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ug=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ng=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Fg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Gg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Wg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Xg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,qg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Kg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Jg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$g=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ev=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,tv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,iv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ov=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,av=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,uv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:Fm,alphahash_pars_fragment:Om,alphamap_fragment:Bm,alphamap_pars_fragment:zm,alphatest_fragment:Hm,alphatest_pars_fragment:Vm,aomap_fragment:Gm,aomap_pars_fragment:Wm,batching_pars_vertex:Xm,batching_vertex:qm,begin_vertex:Ym,beginnormal_vertex:jm,bsdfs:Km,iridescence_fragment:Zm,bumpmap_pars_fragment:Jm,clipping_planes_fragment:Qm,clipping_planes_pars_fragment:$m,clipping_planes_pars_vertex:e0,clipping_planes_vertex:t0,color_fragment:n0,color_pars_fragment:i0,color_pars_vertex:s0,color_vertex:r0,common:o0,cube_uv_reflection_fragment:a0,defaultnormal_vertex:c0,displacementmap_pars_vertex:l0,displacementmap_vertex:h0,emissivemap_fragment:u0,emissivemap_pars_fragment:d0,colorspace_fragment:f0,colorspace_pars_fragment:p0,envmap_fragment:m0,envmap_common_pars_fragment:g0,envmap_pars_fragment:v0,envmap_pars_vertex:x0,envmap_physical_pars_fragment:C0,envmap_vertex:y0,fog_vertex:_0,fog_pars_vertex:M0,fog_fragment:b0,fog_pars_fragment:S0,gradientmap_pars_fragment:w0,lightmap_pars_fragment:T0,lights_lambert_fragment:E0,lights_lambert_pars_fragment:A0,lights_pars_begin:R0,lights_toon_fragment:L0,lights_toon_pars_fragment:P0,lights_phong_fragment:D0,lights_phong_pars_fragment:I0,lights_physical_fragment:U0,lights_physical_pars_fragment:N0,lights_fragment_begin:k0,lights_fragment_maps:F0,lights_fragment_end:O0,logdepthbuf_fragment:B0,logdepthbuf_pars_fragment:z0,logdepthbuf_pars_vertex:H0,logdepthbuf_vertex:V0,map_fragment:G0,map_pars_fragment:W0,map_particle_fragment:X0,map_particle_pars_fragment:q0,metalnessmap_fragment:Y0,metalnessmap_pars_fragment:j0,morphinstance_vertex:K0,morphcolor_vertex:Z0,morphnormal_vertex:J0,morphtarget_pars_vertex:Q0,morphtarget_vertex:$0,normal_fragment_begin:eg,normal_fragment_maps:tg,normal_pars_fragment:ng,normal_pars_vertex:ig,normal_vertex:sg,normalmap_pars_fragment:rg,clearcoat_normal_fragment_begin:og,clearcoat_normal_fragment_maps:ag,clearcoat_pars_fragment:cg,iridescence_pars_fragment:lg,opaque_fragment:hg,packing:ug,premultiplied_alpha_fragment:dg,project_vertex:fg,dithering_fragment:pg,dithering_pars_fragment:mg,roughnessmap_fragment:gg,roughnessmap_pars_fragment:vg,shadowmap_pars_fragment:xg,shadowmap_pars_vertex:yg,shadowmap_vertex:_g,shadowmask_pars_fragment:Mg,skinbase_vertex:bg,skinning_pars_vertex:Sg,skinning_vertex:wg,skinnormal_vertex:Tg,specularmap_fragment:Eg,specularmap_pars_fragment:Ag,tonemapping_fragment:Rg,tonemapping_pars_fragment:Cg,transmission_fragment:Lg,transmission_pars_fragment:Pg,uv_pars_fragment:Dg,uv_pars_vertex:Ig,uv_vertex:Ug,worldpos_vertex:Ng,background_vert:kg,background_frag:Fg,backgroundCube_vert:Og,backgroundCube_frag:Bg,cube_vert:zg,cube_frag:Hg,depth_vert:Vg,depth_frag:Gg,distanceRGBA_vert:Wg,distanceRGBA_frag:Xg,equirect_vert:qg,equirect_frag:Yg,linedashed_vert:jg,linedashed_frag:Kg,meshbasic_vert:Zg,meshbasic_frag:Jg,meshlambert_vert:Qg,meshlambert_frag:$g,meshmatcap_vert:ev,meshmatcap_frag:tv,meshnormal_vert:nv,meshnormal_frag:iv,meshphong_vert:sv,meshphong_frag:rv,meshphysical_vert:ov,meshphysical_frag:av,meshtoon_vert:cv,meshtoon_frag:lv,points_vert:hv,points_frag:uv,shadow_vert:dv,shadow_frag:fv,sprite_vert:pv,sprite_frag:mv},ge={common:{diffuse:{value:new he(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new he(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new he(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new he(16777215)},opacity:{value:1},center:{value:new ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},jn={basic:{uniforms:en([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:en([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new he(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:en([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new he(0)},specular:{value:new he(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:en([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new he(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:en([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new he(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:en([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:en([ge.points,ge.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:en([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:en([ge.common,ge.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:en([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:en([ge.sprite,ge.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:en([ge.common,ge.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:en([ge.lights,ge.fog,{color:{value:new he(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};jn.physical={uniforms:en([jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new he(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new he(0)},specularColor:{value:new he(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const _o={r:0,b:0,g:0},Hi=new Pt,gv=new pe;function vv(r,e,t,n,i,s,o){const a=new he(0);let c=s===!0?0:1,l,h,u=null,d=0,f=null;function p(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?t:e).get(y)),y}function v(x){let y=!1;const w=p(x);w===null?m(a,c):w&&w.isColor&&(m(w,1),y=!0);const S=r.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(x,y){const w=p(y);w&&(w.isCubeTexture||w.mapping===oa)?(h===void 0&&(h=new tt(new tn(1,1,1),new vt({name:"BackgroundCubeMaterial",uniforms:Xs(jn.backgroundCube.uniforms),vertexShader:jn.backgroundCube.vertexShader,fragmentShader:jn.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(S,E,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Hi.copy(y.backgroundRotation),Hi.x*=-1,Hi.y*=-1,Hi.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Hi.y*=-1,Hi.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(gv.makeRotationFromEuler(Hi)),h.material.toneMapped=nt.getTransfer(w.colorSpace)!==dt,(u!==w||d!==w.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=w,d=w.version,f=r.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new tt(new hn(2,2),new vt({name:"BackgroundMaterial",uniforms:Xs(jn.background.uniforms),vertexShader:jn.background.vertexShader,fragmentShader:jn.background.fragmentShader,side:xi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=nt.getTransfer(w.colorSpace)!==dt,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||d!==w.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,u=w,d=w.version,f=r.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function m(x,y){x.getRGB(_o,Bd(r)),n.buffers.color.setClear(_o.r,_o.g,_o.b,y,o)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,y=1){a.set(x),c=y,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,m(a,c)},render:v,addToRenderList:g,dispose:M}}function xv(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,o=!1;function a(_,C,D,U,k){let H=!1;const O=u(U,D,C);s!==O&&(s=O,l(s.object)),H=f(_,U,D,k),H&&p(_,U,D,k),k!==null&&e.update(k,r.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,y(_,C,D,U),k!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return r.createVertexArray()}function l(_){return r.bindVertexArray(_)}function h(_){return r.deleteVertexArray(_)}function u(_,C,D){const U=D.wireframe===!0;let k=n[_.id];k===void 0&&(k={},n[_.id]=k);let H=k[C.id];H===void 0&&(H={},k[C.id]=H);let O=H[U];return O===void 0&&(O=d(c()),H[U]=O),O}function d(_){const C=[],D=[],U=[];for(let k=0;k<t;k++)C[k]=0,D[k]=0,U[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:D,attributeDivisors:U,object:_,attributes:{},index:null}}function f(_,C,D,U){const k=s.attributes,H=C.attributes;let O=0;const q=D.getAttributes();for(const z in q)if(q[z].location>=0){const re=k[z];let ee=H[z];if(ee===void 0&&(z==="instanceMatrix"&&_.instanceMatrix&&(ee=_.instanceMatrix),z==="instanceColor"&&_.instanceColor&&(ee=_.instanceColor)),re===void 0||re.attribute!==ee||ee&&re.data!==ee.data)return!0;O++}return s.attributesNum!==O||s.index!==U}function p(_,C,D,U){const k={},H=C.attributes;let O=0;const q=D.getAttributes();for(const z in q)if(q[z].location>=0){let re=H[z];re===void 0&&(z==="instanceMatrix"&&_.instanceMatrix&&(re=_.instanceMatrix),z==="instanceColor"&&_.instanceColor&&(re=_.instanceColor));const ee={};ee.attribute=re,re&&re.data&&(ee.data=re.data),k[z]=ee,O++}s.attributes=k,s.attributesNum=O,s.index=U}function v(){const _=s.newAttributes;for(let C=0,D=_.length;C<D;C++)_[C]=0}function g(_){m(_,0)}function m(_,C){const D=s.newAttributes,U=s.enabledAttributes,k=s.attributeDivisors;D[_]=1,U[_]===0&&(r.enableVertexAttribArray(_),U[_]=1),k[_]!==C&&(r.vertexAttribDivisor(_,C),k[_]=C)}function M(){const _=s.newAttributes,C=s.enabledAttributes;for(let D=0,U=C.length;D<U;D++)C[D]!==_[D]&&(r.disableVertexAttribArray(D),C[D]=0)}function x(_,C,D,U,k,H,O){O===!0?r.vertexAttribIPointer(_,C,D,k,H):r.vertexAttribPointer(_,C,D,U,k,H)}function y(_,C,D,U){v();const k=U.attributes,H=D.getAttributes(),O=C.defaultAttributeValues;for(const q in H){const z=H[q];if(z.location>=0){let $=k[q];if($===void 0&&(q==="instanceMatrix"&&_.instanceMatrix&&($=_.instanceMatrix),q==="instanceColor"&&_.instanceColor&&($=_.instanceColor)),$!==void 0){const re=$.normalized,ee=$.itemSize,Me=e.get($);if(Me===void 0)continue;const K=Me.buffer,ce=Me.type,be=Me.bytesPerElement,X=ce===r.INT||ce===r.UNSIGNED_INT||$.gpuType===Al;if($.isInterleavedBufferAttribute){const J=$.data,me=J.stride,Ae=$.offset;if(J.isInstancedInterleavedBuffer){for(let Te=0;Te<z.locationSize;Te++)m(z.location+Te,J.meshPerAttribute);_.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Te=0;Te<z.locationSize;Te++)g(z.location+Te);r.bindBuffer(r.ARRAY_BUFFER,K);for(let Te=0;Te<z.locationSize;Te++)x(z.location+Te,ee/z.locationSize,ce,re,me*be,(Ae+ee/z.locationSize*Te)*be,X)}else{if($.isInstancedBufferAttribute){for(let J=0;J<z.locationSize;J++)m(z.location+J,$.meshPerAttribute);_.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let J=0;J<z.locationSize;J++)g(z.location+J);r.bindBuffer(r.ARRAY_BUFFER,K);for(let J=0;J<z.locationSize;J++)x(z.location+J,ee/z.locationSize,ce,re,ee*be,ee/z.locationSize*J*be,X)}}else if(O!==void 0){const re=O[q];if(re!==void 0)switch(re.length){case 2:r.vertexAttrib2fv(z.location,re);break;case 3:r.vertexAttrib3fv(z.location,re);break;case 4:r.vertexAttrib4fv(z.location,re);break;default:r.vertexAttrib1fv(z.location,re)}}}}M()}function w(){L();for(const _ in n){const C=n[_];for(const D in C){const U=C[D];for(const k in U)h(U[k].object),delete U[k];delete C[D]}delete n[_]}}function S(_){if(n[_.id]===void 0)return;const C=n[_.id];for(const D in C){const U=C[D];for(const k in U)h(U[k].object),delete U[k];delete C[D]}delete n[_.id]}function E(_){for(const C in n){const D=n[C];if(D[_.id]===void 0)continue;const U=D[_.id];for(const k in U)h(U[k].object),delete U[k];delete D[_.id]}}function L(){b(),o=!0,s!==i&&(s=i,l(s.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:L,resetDefaultState:b,dispose:w,releaseStatesOfGeometry:S,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:g,disableUnusedAttributes:M}}function yv(r,e,t){let n;function i(l){n=l}function s(l,h){r.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(r.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let p=0;p<u;p++)f+=h[p];t.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<l.length;p++)o(l[p],h[p],d[p]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let p=0;for(let v=0;v<u;v++)p+=h[v]*d[v];t.update(p,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function _v(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==Sn&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const L=E===rn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Hn&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==On&&!L)}function c(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),M=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=p>0,S=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:M,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:w,maxSamples:S}}function Mv(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Zi,a=new je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const p=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,m=r.get(u);if(!i||p===null||p.length===0||s&&!g)s?h(null):l();else{const M=s?0:n,x=M*4;let y=m.clippingState||null;c.value=y,y=h(p,d,x,f);for(let w=0;w!==x;++w)y[w]=t[w];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=c.value,p!==!0||g===null){const m=f+v*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(g===null||g.length<m)&&(g=new Float32Array(m));for(let x=0,y=f;x!==v;++x,y+=4)o.copy(u[x]).applyMatrix4(M,a),o.normal.toArray(g,y),g[y+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function bv(r){let e=new WeakMap;function t(o,a){return a===Fc?o.mapping=zs:a===Oc&&(o.mapping=Hs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Fc||a===Oc)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Gd(c.height);return l.fromEquirectangularTexture(r,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const Ns=4,Kh=[.125,.215,.35,.446,.526,.582],rs=20,Ka=new ua,Zh=new he;let Za=null,Ja=0,Qa=0,$a=!1;const Ji=(1+Math.sqrt(5))/2,Ls=1/Ji,Jh=[new T(-Ji,Ls,0),new T(Ji,Ls,0),new T(-Ls,0,Ji),new T(Ls,0,Ji),new T(0,Ji,-Ls),new T(0,Ji,Ls),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)],Sv=new T;class vl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:a=Sv}=s;Za=this._renderer.getRenderTarget(),Ja=this._renderer.getActiveCubeFace(),Qa=this._renderer.getActiveMipmapLevel(),$a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=eu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$h(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Za,Ja,Qa),this._renderer.xr.enabled=$a,e.scissorTest=!1,Mo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zs||e.mapping===Hs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Za=this._renderer.getRenderTarget(),Ja=this._renderer.getActiveCubeFace(),Qa=this._renderer.getActiveMipmapLevel(),$a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:rn,format:Sn,colorSpace:Yt,depthBuffer:!1},i=Qh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Qh(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wv(s)),this._blurMaterial=Tv(s,e,t)}return i}_compileMaterial(e){const t=new tt(this._lodPlanes[0],e);this._renderer.compile(t,Ka)}_sceneToCubeUV(e,t,n,i,s){const c=new nn(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Zh),u.toneMapping=mi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));const v=new Qn({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1}),g=new tt(new tn,v);let m=!1;const M=e.background;M?M.isColor&&(v.color.copy(M),e.background=null,m=!0):(v.color.copy(Zh),m=!0);for(let x=0;x<6;x++){const y=x%3;y===0?(c.up.set(0,l[x],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[x],s.y,s.z)):y===1?(c.up.set(0,0,l[x]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[x],s.z)):(c.up.set(0,l[x],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[x]));const w=this._cubeSize;Mo(i,y*w,x>2?w:0,w,w),u.setRenderTarget(i),m&&u.render(g,c),u.render(e,c)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===zs||e.mapping===Hs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=eu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$h());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new tt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;Mo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Ka)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Jh[(i-s-1)%Jh.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new tt(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*rs-1),v=s/p,g=isFinite(s)?1+Math.floor(h*v):rs;g>rs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${rs}`);const m=[];let M=0;for(let E=0;E<rs;++E){const L=E/v,b=Math.exp(-L*L/2);m.push(b),E===0?M+=b:E<g&&(M+=2*b)}for(let E=0;E<m.length;E++)m[E]=m[E]/M;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=p,d.mipInt.value=x-n;const y=this._sizeLods[i],w=3*y*(i>x-Ns?i-x+Ns:0),S=4*(this._cubeSize-y);Mo(t,w,S,3*y,2*y),c.setRenderTarget(t),c.render(u,Ka)}}function wv(r){const e=[],t=[],n=[];let i=r;const s=r-Ns+1+Kh.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let c=1/a;o>r-Ns?c=Kh[o-r+Ns-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,v=3,g=2,m=1,M=new Float32Array(v*p*f),x=new Float32Array(g*p*f),y=new Float32Array(m*p*f);for(let S=0;S<f;S++){const E=S%3*2/3-1,L=S>2?0:-1,b=[E,L,0,E+2/3,L,0,E+2/3,L+1,0,E,L,0,E+2/3,L+1,0,E,L+1,0];M.set(b,v*p*S),x.set(d,g*p*S);const _=[S,S,S,S,S,S];y.set(_,m*p*S)}const w=new Et;w.setAttribute("position",new at(M,v)),w.setAttribute("uv",new at(x,g)),w.setAttribute("faceIndex",new at(y,m)),e.push(w),i>Ns&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Qh(r,e,t){const n=new qt(r,e,t);return n.texture.mapping=oa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Mo(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Tv(r,e,t){const n=new Float32Array(rs),i=new T(0,1,0);return new vt({name:"SphericalGaussianBlur",defines:{n:rs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:jl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function $h(){return new vt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function eu(){return new vt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function jl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ev(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Fc||c===Oc,h=c===zs||c===Hs;if(l||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new vl(r)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new vl(r)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Av(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Br("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Rv(r,e,t,n){const i={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",o),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const f in d)e.update(d[f],r.ARRAY_BUFFER)}function l(u){const d=[],f=u.index,p=u.attributes.position;let v=0;if(f!==null){const M=f.array;v=f.version;for(let x=0,y=M.length;x<y;x+=3){const w=M[x+0],S=M[x+1],E=M[x+2];d.push(w,S,S,E,E,w)}}else if(p!==void 0){const M=p.array;v=p.version;for(let x=0,y=M.length/3-1;x<y;x+=3){const w=x+0,S=x+1,E=x+2;d.push(w,S,S,E,E,w)}}else return;const g=new(Id(d)?Od:Fd)(d,1);g.version=v;const m=s.get(u);m&&e.remove(m),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Cv(r,e,t){let n;function i(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function c(d,f){r.drawElements(n,f,s,d*o),t.update(f,n,1)}function l(d,f,p){p!==0&&(r.drawElementsInstanced(n,f,s,d*o,p),t.update(f,n,p))}function h(d,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];t.update(g,n,1)}function u(d,f,p,v){if(p===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<d.length;m++)l(d[m]/o,f[m],v[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,v,0,p);let m=0;for(let M=0;M<p;M++)m+=f[M]*v[M];t.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Lv(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Pv(r,e,t){const n=new WeakMap,i=new lt;function s(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let b=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let x=0;f===!0&&(x=1),p===!0&&(x=2),v===!0&&(x=3);let y=a.attributes.position.count*x,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const S=new Float32Array(y*w*4*u),E=new Ud(S,y,w,u);E.type=On,E.needsUpdate=!0;const L=x*4;for(let _=0;_<u;_++){const C=g[_],D=m[_],U=M[_],k=y*w*4*_;for(let H=0;H<C.count;H++){const O=H*L;f===!0&&(i.fromBufferAttribute(C,H),S[k+O+0]=i.x,S[k+O+1]=i.y,S[k+O+2]=i.z,S[k+O+3]=0),p===!0&&(i.fromBufferAttribute(D,H),S[k+O+4]=i.x,S[k+O+5]=i.y,S[k+O+6]=i.z,S[k+O+7]=0),v===!0&&(i.fromBufferAttribute(U,H),S[k+O+8]=i.x,S[k+O+9]=i.y,S[k+O+10]=i.z,S[k+O+11]=U.itemSize===4?i.w:1)}}d={count:u,texture:E,size:new ve(y,w)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let f=0;for(let v=0;v<l.length;v++)f+=l[v];const p=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(r,"morphTargetBaseInfluence",p),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function Dv(r,e,t,n){let i=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}const $d=new Dt,tu=new zl(1,1),ef=new Ud,tf=new Tp,nf=new Vd,nu=[],iu=[],su=new Float32Array(16),ru=new Float32Array(9),ou=new Float32Array(4);function tr(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=nu[i];if(s===void 0&&(s=new Float32Array(i),nu[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function zt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Ht(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function da(r,e){let t=iu[e];t===void 0&&(t=new Int32Array(e),iu[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Iv(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Uv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;r.uniform2fv(this.addr,e),Ht(t,e)}}function Nv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(zt(t,e))return;r.uniform3fv(this.addr,e),Ht(t,e)}}function kv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;r.uniform4fv(this.addr,e),Ht(t,e)}}function Fv(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,n))return;ou.set(n),r.uniformMatrix2fv(this.addr,!1,ou),Ht(t,n)}}function Ov(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,n))return;ru.set(n),r.uniformMatrix3fv(this.addr,!1,ru),Ht(t,n)}}function Bv(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,n))return;su.set(n),r.uniformMatrix4fv(this.addr,!1,su),Ht(t,n)}}function zv(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Hv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;r.uniform2iv(this.addr,e),Ht(t,e)}}function Vv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;r.uniform3iv(this.addr,e),Ht(t,e)}}function Gv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;r.uniform4iv(this.addr,e),Ht(t,e)}}function Wv(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Xv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;r.uniform2uiv(this.addr,e),Ht(t,e)}}function qv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;r.uniform3uiv(this.addr,e),Ht(t,e)}}function Yv(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;r.uniform4uiv(this.addr,e),Ht(t,e)}}function jv(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(tu.compareFunction=Dd,s=tu):s=$d,t.setTexture2D(e||s,i)}function Kv(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||tf,i)}function Zv(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||nf,i)}function Jv(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||ef,i)}function Qv(r){switch(r){case 5126:return Iv;case 35664:return Uv;case 35665:return Nv;case 35666:return kv;case 35674:return Fv;case 35675:return Ov;case 35676:return Bv;case 5124:case 35670:return zv;case 35667:case 35671:return Hv;case 35668:case 35672:return Vv;case 35669:case 35673:return Gv;case 5125:return Wv;case 36294:return Xv;case 36295:return qv;case 36296:return Yv;case 35678:case 36198:case 36298:case 36306:case 35682:return jv;case 35679:case 36299:case 36307:return Kv;case 35680:case 36300:case 36308:case 36293:return Zv;case 36289:case 36303:case 36311:case 36292:return Jv}}function $v(r,e){r.uniform1fv(this.addr,e)}function ex(r,e){const t=tr(e,this.size,2);r.uniform2fv(this.addr,t)}function tx(r,e){const t=tr(e,this.size,3);r.uniform3fv(this.addr,t)}function nx(r,e){const t=tr(e,this.size,4);r.uniform4fv(this.addr,t)}function ix(r,e){const t=tr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function sx(r,e){const t=tr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function rx(r,e){const t=tr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function ox(r,e){r.uniform1iv(this.addr,e)}function ax(r,e){r.uniform2iv(this.addr,e)}function cx(r,e){r.uniform3iv(this.addr,e)}function lx(r,e){r.uniform4iv(this.addr,e)}function hx(r,e){r.uniform1uiv(this.addr,e)}function ux(r,e){r.uniform2uiv(this.addr,e)}function dx(r,e){r.uniform3uiv(this.addr,e)}function fx(r,e){r.uniform4uiv(this.addr,e)}function px(r,e,t){const n=this.cache,i=e.length,s=da(t,i);zt(n,s)||(r.uniform1iv(this.addr,s),Ht(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||$d,s[o])}function mx(r,e,t){const n=this.cache,i=e.length,s=da(t,i);zt(n,s)||(r.uniform1iv(this.addr,s),Ht(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||tf,s[o])}function gx(r,e,t){const n=this.cache,i=e.length,s=da(t,i);zt(n,s)||(r.uniform1iv(this.addr,s),Ht(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||nf,s[o])}function vx(r,e,t){const n=this.cache,i=e.length,s=da(t,i);zt(n,s)||(r.uniform1iv(this.addr,s),Ht(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||ef,s[o])}function xx(r){switch(r){case 5126:return $v;case 35664:return ex;case 35665:return tx;case 35666:return nx;case 35674:return ix;case 35675:return sx;case 35676:return rx;case 5124:case 35670:return ox;case 35667:case 35671:return ax;case 35668:case 35672:return cx;case 35669:case 35673:return lx;case 5125:return hx;case 36294:return ux;case 36295:return dx;case 36296:return fx;case 35678:case 36198:case 36298:case 36306:case 35682:return px;case 35679:case 36299:case 36307:return mx;case 35680:case 36300:case 36308:case 36293:return gx;case 36289:case 36303:case 36311:case 36292:return vx}}class yx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Qv(t.type)}}class _x{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=xx(t.type)}}class Mx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const ec=/(\w+)(\])?(\[|\.)?/g;function au(r,e){r.seq.push(e),r.map[e.id]=e}function bx(r,e,t){const n=r.name,i=n.length;for(ec.lastIndex=0;;){const s=ec.exec(n),o=ec.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){au(t,l===void 0?new yx(a,r,e):new _x(a,r,e));break}else{let u=t.map[a];u===void 0&&(u=new Mx(a),au(t,u)),t=u}}}class Xo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);bx(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function cu(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const Sx=37297;let wx=0;function Tx(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const lu=new je;function Ex(r){nt._getMatrix(lu,nt.workingColorSpace,r);const e=`mat3( ${lu.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(r)){case Zo:return[e,"LinearTransferOETF"];case dt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function hu(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+Tx(r.getShaderSource(e),a)}else return s}function Ax(r,e){const t=Ex(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Rx(r,e){let t;switch(e){case md:t="Linear";break;case gd:t="Reinhard";break;case vd:t="Cineon";break;case xd:t="ACESFilmic";break;case El:t="AgX";break;case _d:t="Neutral";break;case yd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const bo=new T;function Cx(){nt.getLuminanceCoefficients(bo);const r=bo.x.toFixed(4),e=bo.y.toFixed(4),t=bo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lx(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Sr).join(`
`)}function Px(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Dx(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Sr(r){return r!==""}function uu(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function du(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ix=/^[ \t]*#include +<([\w\d./]+)>/gm;function xl(r){return r.replace(Ix,Nx)}const Ux=new Map;function Nx(r,e){let t=We[e];if(t===void 0){const n=Ux.get(e);if(n!==void 0)t=We[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return xl(t)}const kx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fu(r){return r.replace(kx,Fx)}function Fx(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function pu(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Ox(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===dd?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===fd?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===hi&&(e="SHADOWMAP_TYPE_VSM"),e}function Bx(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case zs:case Hs:e="ENVMAP_TYPE_CUBE";break;case oa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function zx(r){let e="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===Hs&&(e="ENVMAP_MODE_REFRACTION"),e}function Hx(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case pd:e="ENVMAP_BLENDING_MULTIPLY";break;case Hf:e="ENVMAP_BLENDING_MIX";break;case Vf:e="ENVMAP_BLENDING_ADD";break}return e}function Vx(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Gx(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Ox(t),l=Bx(t),h=zx(t),u=Hx(t),d=Vx(t),f=Lx(t),p=Px(s),v=i.createProgram();let g,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Sr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Sr).join(`
`),m.length>0&&(m+=`
`)):(g=[pu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Sr).join(`
`),m=[pu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==mi?"#define TONE_MAPPING":"",t.toneMapping!==mi?We.tonemapping_pars_fragment:"",t.toneMapping!==mi?Rx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,Ax("linearToOutputTexel",t.outputColorSpace),Cx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Sr).join(`
`)),o=xl(o),o=uu(o,t),o=du(o,t),a=xl(a),a=uu(a,t),a=du(a,t),o=fu(o),a=fu(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===uh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===uh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=M+g+o,y=M+m+a,w=cu(i,i.VERTEX_SHADER,x),S=cu(i,i.FRAGMENT_SHADER,y);i.attachShader(v,w),i.attachShader(v,S),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function E(C){if(r.debug.checkShaderErrors){const D=i.getProgramInfoLog(v)||"",U=i.getShaderInfoLog(w)||"",k=i.getShaderInfoLog(S)||"",H=D.trim(),O=U.trim(),q=k.trim();let z=!0,$=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(z=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,w,S);else{const re=hu(i,w,"vertex"),ee=hu(i,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+H+`
`+re+`
`+ee)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(O===""||q==="")&&($=!1);$&&(C.diagnostics={runnable:z,programLog:H,vertexShader:{log:O,prefix:g},fragmentShader:{log:q,prefix:m}})}i.deleteShader(w),i.deleteShader(S),L=new Xo(i,v),b=Dx(i,v)}let L;this.getUniforms=function(){return L===void 0&&E(this),L};let b;this.getAttributes=function(){return b===void 0&&E(this),b};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=i.getProgramParameter(v,Sx)),_},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=wx++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=S,this}let Wx=0;class Xx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new qx(e),t.set(e,n)),n}}class qx{constructor(e){this.id=Wx++,this.code=e,this.usedTimes=0}}function Yx(r,e,t,n,i,s,o){const a=new Nd,c=new Xx,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return l.add(b),b===0?"uv":`uv${b}`}function g(b,_,C,D,U){const k=D.fog,H=U.geometry,O=b.isMeshStandardMaterial?D.environment:null,q=(b.isMeshStandardMaterial?t:e).get(b.envMap||O),z=q&&q.mapping===oa?q.image.height:null,$=p[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const re=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ee=re!==void 0?re.length:0;let Me=0;H.morphAttributes.position!==void 0&&(Me=1),H.morphAttributes.normal!==void 0&&(Me=2),H.morphAttributes.color!==void 0&&(Me=3);let K,ce,be,X;if($){const ht=jn[$];K=ht.vertexShader,ce=ht.fragmentShader}else K=b.vertexShader,ce=b.fragmentShader,c.update(b),be=c.getVertexShaderID(b),X=c.getFragmentShaderID(b);const J=r.getRenderTarget(),me=r.state.buffers.depth.getReversed(),Ae=U.isInstancedMesh===!0,Te=U.isBatchedMesh===!0,Qe=!!b.map,Vt=!!b.matcap,I=!!q,mt=!!b.aoMap,Be=!!b.lightMap,ue=!!b.bumpMap,Z=!!b.normalMap,qe=!!b.displacementMap,de=!!b.emissiveMap,ze=!!b.metalnessMap,ct=!!b.roughnessMap,rt=b.anisotropy>0,P=b.clearcoat>0,A=b.dispersion>0,V=b.iridescence>0,Y=b.sheen>0,te=b.transmission>0,j=rt&&!!b.anisotropyMap,Ue=P&&!!b.clearcoatMap,le=P&&!!b.clearcoatNormalMap,Pe=P&&!!b.clearcoatRoughnessMap,De=V&&!!b.iridescenceMap,oe=V&&!!b.iridescenceThicknessMap,_e=Y&&!!b.sheenColorMap,He=Y&&!!b.sheenRoughnessMap,Ie=!!b.specularMap,xe=!!b.specularColorMap,Ye=!!b.specularIntensityMap,N=te&&!!b.transmissionMap,ae=te&&!!b.thicknessMap,fe=!!b.gradientMap,Ee=!!b.alphaMap,ie=b.alphaTest>0,Q=!!b.alphaHash,Ce=!!b.extensions;let Ge=mi;b.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Ge=r.toneMapping);const _t={shaderID:$,shaderType:b.type,shaderName:b.name,vertexShader:K,fragmentShader:ce,defines:b.defines,customVertexShaderID:be,customFragmentShaderID:X,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Te,batchingColor:Te&&U._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&U.instanceColor!==null,instancingMorph:Ae&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:J===null?r.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Yt,alphaToCoverage:!!b.alphaToCoverage,map:Qe,matcap:Vt,envMap:I,envMapMode:I&&q.mapping,envMapCubeUVHeight:z,aoMap:mt,lightMap:Be,bumpMap:ue,normalMap:Z,displacementMap:d&&qe,emissiveMap:de,normalMapObjectSpace:Z&&b.normalMapType===jf,normalMapTangentSpace:Z&&b.normalMapType===Pd,metalnessMap:ze,roughnessMap:ct,anisotropy:rt,anisotropyMap:j,clearcoat:P,clearcoatMap:Ue,clearcoatNormalMap:le,clearcoatRoughnessMap:Pe,dispersion:A,iridescence:V,iridescenceMap:De,iridescenceThicknessMap:oe,sheen:Y,sheenColorMap:_e,sheenRoughnessMap:He,specularMap:Ie,specularColorMap:xe,specularIntensityMap:Ye,transmission:te,transmissionMap:N,thicknessMap:ae,gradientMap:fe,opaque:b.transparent===!1&&b.blending===hs&&b.alphaToCoverage===!1,alphaMap:Ee,alphaTest:ie,alphaHash:Q,combine:b.combine,mapUv:Qe&&v(b.map.channel),aoMapUv:mt&&v(b.aoMap.channel),lightMapUv:Be&&v(b.lightMap.channel),bumpMapUv:ue&&v(b.bumpMap.channel),normalMapUv:Z&&v(b.normalMap.channel),displacementMapUv:qe&&v(b.displacementMap.channel),emissiveMapUv:de&&v(b.emissiveMap.channel),metalnessMapUv:ze&&v(b.metalnessMap.channel),roughnessMapUv:ct&&v(b.roughnessMap.channel),anisotropyMapUv:j&&v(b.anisotropyMap.channel),clearcoatMapUv:Ue&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:le&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:De&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:He&&v(b.sheenRoughnessMap.channel),specularMapUv:Ie&&v(b.specularMap.channel),specularColorMapUv:xe&&v(b.specularColorMap.channel),specularIntensityMapUv:Ye&&v(b.specularIntensityMap.channel),transmissionMapUv:N&&v(b.transmissionMap.channel),thicknessMapUv:ae&&v(b.thicknessMap.channel),alphaMapUv:Ee&&v(b.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Z||rt),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!H.attributes.uv&&(Qe||Ee),fog:!!k,useFog:b.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:me,skinning:U.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:Me,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ge,decodeVideoTexture:Qe&&b.map.isVideoTexture===!0&&nt.getTransfer(b.map.colorSpace)===dt,decodeVideoTextureEmissive:de&&b.emissiveMap.isVideoTexture===!0&&nt.getTransfer(b.emissiveMap.colorSpace)===dt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Nt,flipSided:b.side===sn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ce&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ce&&b.extensions.multiDraw===!0||Te)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return _t.vertexUv1s=l.has(1),_t.vertexUv2s=l.has(2),_t.vertexUv3s=l.has(3),l.clear(),_t}function m(b){const _=[];if(b.shaderID?_.push(b.shaderID):(_.push(b.customVertexShaderID),_.push(b.customFragmentShaderID)),b.defines!==void 0)for(const C in b.defines)_.push(C),_.push(b.defines[C]);return b.isRawShaderMaterial===!1&&(M(_,b),x(_,b),_.push(r.outputColorSpace)),_.push(b.customProgramCacheKey),_.join()}function M(b,_){b.push(_.precision),b.push(_.outputColorSpace),b.push(_.envMapMode),b.push(_.envMapCubeUVHeight),b.push(_.mapUv),b.push(_.alphaMapUv),b.push(_.lightMapUv),b.push(_.aoMapUv),b.push(_.bumpMapUv),b.push(_.normalMapUv),b.push(_.displacementMapUv),b.push(_.emissiveMapUv),b.push(_.metalnessMapUv),b.push(_.roughnessMapUv),b.push(_.anisotropyMapUv),b.push(_.clearcoatMapUv),b.push(_.clearcoatNormalMapUv),b.push(_.clearcoatRoughnessMapUv),b.push(_.iridescenceMapUv),b.push(_.iridescenceThicknessMapUv),b.push(_.sheenColorMapUv),b.push(_.sheenRoughnessMapUv),b.push(_.specularMapUv),b.push(_.specularColorMapUv),b.push(_.specularIntensityMapUv),b.push(_.transmissionMapUv),b.push(_.thicknessMapUv),b.push(_.combine),b.push(_.fogExp2),b.push(_.sizeAttenuation),b.push(_.morphTargetsCount),b.push(_.morphAttributeCount),b.push(_.numDirLights),b.push(_.numPointLights),b.push(_.numSpotLights),b.push(_.numSpotLightMaps),b.push(_.numHemiLights),b.push(_.numRectAreaLights),b.push(_.numDirLightShadows),b.push(_.numPointLightShadows),b.push(_.numSpotLightShadows),b.push(_.numSpotLightShadowsWithMaps),b.push(_.numLightProbes),b.push(_.shadowMapType),b.push(_.toneMapping),b.push(_.numClippingPlanes),b.push(_.numClipIntersection),b.push(_.depthPacking)}function x(b,_){a.disableAll(),_.supportsVertexTextures&&a.enable(0),_.instancing&&a.enable(1),_.instancingColor&&a.enable(2),_.instancingMorph&&a.enable(3),_.matcap&&a.enable(4),_.envMap&&a.enable(5),_.normalMapObjectSpace&&a.enable(6),_.normalMapTangentSpace&&a.enable(7),_.clearcoat&&a.enable(8),_.iridescence&&a.enable(9),_.alphaTest&&a.enable(10),_.vertexColors&&a.enable(11),_.vertexAlphas&&a.enable(12),_.vertexUv1s&&a.enable(13),_.vertexUv2s&&a.enable(14),_.vertexUv3s&&a.enable(15),_.vertexTangents&&a.enable(16),_.anisotropy&&a.enable(17),_.alphaHash&&a.enable(18),_.batching&&a.enable(19),_.dispersion&&a.enable(20),_.batchingColor&&a.enable(21),_.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),b.push(a.mask)}function y(b){const _=p[b.type];let C;if(_){const D=jn[_];C=vi.clone(D.uniforms)}else C=b.uniforms;return C}function w(b,_){let C;for(let D=0,U=h.length;D<U;D++){const k=h[D];if(k.cacheKey===_){C=k,++C.usedTimes;break}}return C===void 0&&(C=new Gx(r,_,b,s),h.push(C)),C}function S(b){if(--b.usedTimes===0){const _=h.indexOf(b);h[_]=h[h.length-1],h.pop(),b.destroy()}}function E(b){c.remove(b)}function L(){c.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:y,acquireProgram:w,releaseProgram:S,releaseShaderCache:E,programs:h,dispose:L}}function jx(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,c){r.get(o)[a]=c}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function Kx(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function mu(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function gu(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,p,v,g){let m=r[e];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:p,renderOrder:u.renderOrder,z:v,group:g},r[e]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=p,m.renderOrder=u.renderOrder,m.z=v,m.group=g),e++,m}function a(u,d,f,p,v,g){const m=o(u,d,f,p,v,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):t.push(m)}function c(u,d,f,p,v,g){const m=o(u,d,f,p,v,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):t.unshift(m)}function l(u,d){t.length>1&&t.sort(u||Kx),n.length>1&&n.sort(d||mu),i.length>1&&i.sort(d||mu)}function h(){for(let u=e,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:c,finish:h,sort:l}}function Zx(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new gu,r.set(n,[o])):i>=s.length?(o=new gu,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function Jx(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new he};break;case"SpotLight":t={position:new T,direction:new T,color:new he,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new he,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new he,groundColor:new he};break;case"RectAreaLight":t={color:new he,position:new T,halfWidth:new T,halfHeight:new T};break}return r[e.id]=t,t}}}function Qx(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let $x=0;function e1(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function t1(r){const e=new Jx,t=Qx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new T);const i=new T,s=new pe,o=new pe;function a(l){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,p=0,v=0,g=0,m=0,M=0,x=0,y=0,w=0,S=0,E=0;l.sort(e1);for(let b=0,_=l.length;b<_;b++){const C=l[b],D=C.color,U=C.intensity,k=C.distance,H=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=D.r*U,u+=D.g*U,d+=D.b*U;else if(C.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(C.sh.coefficients[O],U);E++}else if(C.isDirectionalLight){const O=e.get(C);if(O.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const q=C.shadow,z=t.get(C);z.shadowIntensity=q.intensity,z.shadowBias=q.bias,z.shadowNormalBias=q.normalBias,z.shadowRadius=q.radius,z.shadowMapSize=q.mapSize,n.directionalShadow[f]=z,n.directionalShadowMap[f]=H,n.directionalShadowMatrix[f]=C.shadow.matrix,M++}n.directional[f]=O,f++}else if(C.isSpotLight){const O=e.get(C);O.position.setFromMatrixPosition(C.matrixWorld),O.color.copy(D).multiplyScalar(U),O.distance=k,O.coneCos=Math.cos(C.angle),O.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),O.decay=C.decay,n.spot[v]=O;const q=C.shadow;if(C.map&&(n.spotLightMap[w]=C.map,w++,q.updateMatrices(C),C.castShadow&&S++),n.spotLightMatrix[v]=q.matrix,C.castShadow){const z=t.get(C);z.shadowIntensity=q.intensity,z.shadowBias=q.bias,z.shadowNormalBias=q.normalBias,z.shadowRadius=q.radius,z.shadowMapSize=q.mapSize,n.spotShadow[v]=z,n.spotShadowMap[v]=H,y++}v++}else if(C.isRectAreaLight){const O=e.get(C);O.color.copy(D).multiplyScalar(U),O.halfWidth.set(C.width*.5,0,0),O.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=O,g++}else if(C.isPointLight){const O=e.get(C);if(O.color.copy(C.color).multiplyScalar(C.intensity),O.distance=C.distance,O.decay=C.decay,C.castShadow){const q=C.shadow,z=t.get(C);z.shadowIntensity=q.intensity,z.shadowBias=q.bias,z.shadowNormalBias=q.normalBias,z.shadowRadius=q.radius,z.shadowMapSize=q.mapSize,z.shadowCameraNear=q.camera.near,z.shadowCameraFar=q.camera.far,n.pointShadow[p]=z,n.pointShadowMap[p]=H,n.pointShadowMatrix[p]=C.shadow.matrix,x++}n.point[p]=O,p++}else if(C.isHemisphereLight){const O=e.get(C);O.skyColor.copy(C.color).multiplyScalar(U),O.groundColor.copy(C.groundColor).multiplyScalar(U),n.hemi[m]=O,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ge.LTC_FLOAT_1,n.rectAreaLTC2=ge.LTC_FLOAT_2):(n.rectAreaLTC1=ge.LTC_HALF_1,n.rectAreaLTC2=ge.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const L=n.hash;(L.directionalLength!==f||L.pointLength!==p||L.spotLength!==v||L.rectAreaLength!==g||L.hemiLength!==m||L.numDirectionalShadows!==M||L.numPointShadows!==x||L.numSpotShadows!==y||L.numSpotMaps!==w||L.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=y+w-S,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=E,L.directionalLength=f,L.pointLength=p,L.spotLength=v,L.rectAreaLength=g,L.hemiLength=m,L.numDirectionalShadows=M,L.numPointShadows=x,L.numSpotShadows=y,L.numSpotMaps=w,L.numLightProbes=E,n.version=$x++)}function c(l,h){let u=0,d=0,f=0,p=0,v=0;const g=h.matrixWorldInverse;for(let m=0,M=l.length;m<M;m++){const x=l[m];if(x.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),u++}else if(x.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(x.isRectAreaLight){const y=n.rectArea[p];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),o.identity(),s.copy(x.matrixWorld),s.premultiply(g),o.extractRotation(s),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),p++}else if(x.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),d++}else if(x.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(g),v++}}}return{setup:a,setupView:c,state:n}}function vu(r){const e=new t1(r),t=[],n=[];function i(h){l.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function n1(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new vu(r),e.set(i,[a])):s>=o.length?(a=new vu(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const i1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,s1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function r1(r,e,t){let n=new Ol;const i=new ve,s=new ve,o=new lt,a=new em({depthPacking:Yf}),c=new tm,l={},h=t.maxTextureSize,u={[xi]:sn,[sn]:xi,[Nt]:Nt},d=new vt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ve},radius:{value:4}},vertexShader:i1,fragmentShader:s1}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new Et;p.setAttribute("position",new at(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new tt(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dd;let m=this.type;this.render=function(S,E,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;const b=r.getRenderTarget(),_=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),D=r.state;D.setBlending(pi),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const U=m!==hi&&this.type===hi,k=m===hi&&this.type!==hi;for(let H=0,O=S.length;H<O;H++){const q=S[H],z=q.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);const $=z.getFrameExtents();if(i.multiply($),s.copy(z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/$.x),i.x=s.x*$.x,z.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/$.y),i.y=s.y*$.y,z.mapSize.y=s.y)),z.map===null||U===!0||k===!0){const ee=this.type!==hi?{minFilter:Xt,magFilter:Xt}:{};z.map!==null&&z.map.dispose(),z.map=new qt(i.x,i.y,ee),z.map.texture.name=q.name+".shadowMap",z.camera.updateProjectionMatrix()}r.setRenderTarget(z.map),r.clear();const re=z.getViewportCount();for(let ee=0;ee<re;ee++){const Me=z.getViewport(ee);o.set(s.x*Me.x,s.y*Me.y,s.x*Me.z,s.y*Me.w),D.viewport(o),z.updateMatrices(q,ee),n=z.getFrustum(),y(E,L,z.camera,q,this.type)}z.isPointLightShadow!==!0&&this.type===hi&&M(z,L),z.needsUpdate=!1}m=this.type,g.needsUpdate=!1,r.setRenderTarget(b,_,C)};function M(S,E){const L=e.update(v);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new qt(i.x,i.y)),d.uniforms.shadow_pass.value=S.map.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,r.setRenderTarget(S.mapPass),r.clear(),r.renderBufferDirect(E,null,L,d,v,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,r.setRenderTarget(S.map),r.clear(),r.renderBufferDirect(E,null,L,f,v,null)}function x(S,E,L,b){let _=null;const C=L.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)_=C;else if(_=L.isPointLight===!0?c:a,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const D=_.uuid,U=E.uuid;let k=l[D];k===void 0&&(k={},l[D]=k);let H=k[U];H===void 0&&(H=_.clone(),k[U]=H,E.addEventListener("dispose",w)),_=H}if(_.visible=E.visible,_.wireframe=E.wireframe,b===hi?_.side=E.shadowSide!==null?E.shadowSide:E.side:_.side=E.shadowSide!==null?E.shadowSide:u[E.side],_.alphaMap=E.alphaMap,_.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,_.map=E.map,_.clipShadows=E.clipShadows,_.clippingPlanes=E.clippingPlanes,_.clipIntersection=E.clipIntersection,_.displacementMap=E.displacementMap,_.displacementScale=E.displacementScale,_.displacementBias=E.displacementBias,_.wireframeLinewidth=E.wireframeLinewidth,_.linewidth=E.linewidth,L.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const D=r.properties.get(_);D.light=L}return _}function y(S,E,L,b,_){if(S.visible===!1)return;if(S.layers.test(E.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&_===hi)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,S.matrixWorld);const U=e.update(S),k=S.material;if(Array.isArray(k)){const H=U.groups;for(let O=0,q=H.length;O<q;O++){const z=H[O],$=k[z.materialIndex];if($&&$.visible){const re=x(S,$,b,_);S.onBeforeShadow(r,S,E,L,U,re,z),r.renderBufferDirect(L,null,U,re,S,z),S.onAfterShadow(r,S,E,L,U,re,z)}}}else if(k.visible){const H=x(S,k,b,_);S.onBeforeShadow(r,S,E,L,U,H,null),r.renderBufferDirect(L,null,U,H,S,null),S.onAfterShadow(r,S,E,L,U,H,null)}}const D=S.children;for(let U=0,k=D.length;U<k;U++)y(D[U],E,L,b,_)}function w(S){S.target.removeEventListener("dispose",w);for(const L in l){const b=l[L],_=S.target.uuid;_ in b&&(b[_].dispose(),delete b[_])}}}const o1={[Lc]:Pc,[Dc]:Nc,[Ic]:kc,[Bs]:Uc,[Pc]:Lc,[Nc]:Dc,[kc]:Ic,[Uc]:Bs};function a1(r,e){function t(){let N=!1;const ae=new lt;let fe=null;const Ee=new lt(0,0,0,0);return{setMask:function(ie){fe!==ie&&!N&&(r.colorMask(ie,ie,ie,ie),fe=ie)},setLocked:function(ie){N=ie},setClear:function(ie,Q,Ce,Ge,_t){_t===!0&&(ie*=Ge,Q*=Ge,Ce*=Ge),ae.set(ie,Q,Ce,Ge),Ee.equals(ae)===!1&&(r.clearColor(ie,Q,Ce,Ge),Ee.copy(ae))},reset:function(){N=!1,fe=null,Ee.set(-1,0,0,0)}}}function n(){let N=!1,ae=!1,fe=null,Ee=null,ie=null;return{setReversed:function(Q){if(ae!==Q){const Ce=e.get("EXT_clip_control");Q?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),ae=Q;const Ge=ie;ie=null,this.setClear(Ge)}},getReversed:function(){return ae},setTest:function(Q){Q?J(r.DEPTH_TEST):me(r.DEPTH_TEST)},setMask:function(Q){fe!==Q&&!N&&(r.depthMask(Q),fe=Q)},setFunc:function(Q){if(ae&&(Q=o1[Q]),Ee!==Q){switch(Q){case Lc:r.depthFunc(r.NEVER);break;case Pc:r.depthFunc(r.ALWAYS);break;case Dc:r.depthFunc(r.LESS);break;case Bs:r.depthFunc(r.LEQUAL);break;case Ic:r.depthFunc(r.EQUAL);break;case Uc:r.depthFunc(r.GEQUAL);break;case Nc:r.depthFunc(r.GREATER);break;case kc:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Ee=Q}},setLocked:function(Q){N=Q},setClear:function(Q){ie!==Q&&(ae&&(Q=1-Q),r.clearDepth(Q),ie=Q)},reset:function(){N=!1,fe=null,Ee=null,ie=null,ae=!1}}}function i(){let N=!1,ae=null,fe=null,Ee=null,ie=null,Q=null,Ce=null,Ge=null,_t=null;return{setTest:function(ht){N||(ht?J(r.STENCIL_TEST):me(r.STENCIL_TEST))},setMask:function(ht){ae!==ht&&!N&&(r.stencilMask(ht),ae=ht)},setFunc:function(ht,ni,Xn){(fe!==ht||Ee!==ni||ie!==Xn)&&(r.stencilFunc(ht,ni,Xn),fe=ht,Ee=ni,ie=Xn)},setOp:function(ht,ni,Xn){(Q!==ht||Ce!==ni||Ge!==Xn)&&(r.stencilOp(ht,ni,Xn),Q=ht,Ce=ni,Ge=Xn)},setLocked:function(ht){N=ht},setClear:function(ht){_t!==ht&&(r.clearStencil(ht),_t=ht)},reset:function(){N=!1,ae=null,fe=null,Ee=null,ie=null,Q=null,Ce=null,Ge=null,_t=null}}}const s=new t,o=new n,a=new i,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],p=null,v=!1,g=null,m=null,M=null,x=null,y=null,w=null,S=null,E=new he(0,0,0),L=0,b=!1,_=null,C=null,D=null,U=null,k=null;const H=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,q=0;const z=r.getParameter(r.VERSION);z.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(z)[1]),O=q>=1):z.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),O=q>=2);let $=null,re={};const ee=r.getParameter(r.SCISSOR_BOX),Me=r.getParameter(r.VIEWPORT),K=new lt().fromArray(ee),ce=new lt().fromArray(Me);function be(N,ae,fe,Ee){const ie=new Uint8Array(4),Q=r.createTexture();r.bindTexture(N,Q),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ce=0;Ce<fe;Ce++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(ae,0,r.RGBA,1,1,Ee,0,r.RGBA,r.UNSIGNED_BYTE,ie):r.texImage2D(ae+Ce,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ie);return Q}const X={};X[r.TEXTURE_2D]=be(r.TEXTURE_2D,r.TEXTURE_2D,1),X[r.TEXTURE_CUBE_MAP]=be(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[r.TEXTURE_2D_ARRAY]=be(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),X[r.TEXTURE_3D]=be(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),J(r.DEPTH_TEST),o.setFunc(Bs),ue(!1),Z(ih),J(r.CULL_FACE),mt(pi);function J(N){h[N]!==!0&&(r.enable(N),h[N]=!0)}function me(N){h[N]!==!1&&(r.disable(N),h[N]=!1)}function Ae(N,ae){return u[N]!==ae?(r.bindFramebuffer(N,ae),u[N]=ae,N===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=ae),N===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=ae),!0):!1}function Te(N,ae){let fe=f,Ee=!1;if(N){fe=d.get(ae),fe===void 0&&(fe=[],d.set(ae,fe));const ie=N.textures;if(fe.length!==ie.length||fe[0]!==r.COLOR_ATTACHMENT0){for(let Q=0,Ce=ie.length;Q<Ce;Q++)fe[Q]=r.COLOR_ATTACHMENT0+Q;fe.length=ie.length,Ee=!0}}else fe[0]!==r.BACK&&(fe[0]=r.BACK,Ee=!0);Ee&&r.drawBuffers(fe)}function Qe(N){return p!==N?(r.useProgram(N),p=N,!0):!1}const Vt={[ss]:r.FUNC_ADD,[wf]:r.FUNC_SUBTRACT,[Tf]:r.FUNC_REVERSE_SUBTRACT};Vt[Ef]=r.MIN,Vt[Af]=r.MAX;const I={[Rf]:r.ZERO,[Cf]:r.ONE,[Lf]:r.SRC_COLOR,[Rc]:r.SRC_ALPHA,[kf]:r.SRC_ALPHA_SATURATE,[Uf]:r.DST_COLOR,[Df]:r.DST_ALPHA,[Pf]:r.ONE_MINUS_SRC_COLOR,[Cc]:r.ONE_MINUS_SRC_ALPHA,[Nf]:r.ONE_MINUS_DST_COLOR,[If]:r.ONE_MINUS_DST_ALPHA,[Ff]:r.CONSTANT_COLOR,[Of]:r.ONE_MINUS_CONSTANT_COLOR,[Bf]:r.CONSTANT_ALPHA,[zf]:r.ONE_MINUS_CONSTANT_ALPHA};function mt(N,ae,fe,Ee,ie,Q,Ce,Ge,_t,ht){if(N===pi){v===!0&&(me(r.BLEND),v=!1);return}if(v===!1&&(J(r.BLEND),v=!0),N!==Sf){if(N!==g||ht!==b){if((m!==ss||y!==ss)&&(r.blendEquation(r.FUNC_ADD),m=ss,y=ss),ht)switch(N){case hs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ir:r.blendFunc(r.ONE,r.ONE);break;case sh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case rh:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case hs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ir:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case sh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case rh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}M=null,x=null,w=null,S=null,E.set(0,0,0),L=0,g=N,b=ht}return}ie=ie||ae,Q=Q||fe,Ce=Ce||Ee,(ae!==m||ie!==y)&&(r.blendEquationSeparate(Vt[ae],Vt[ie]),m=ae,y=ie),(fe!==M||Ee!==x||Q!==w||Ce!==S)&&(r.blendFuncSeparate(I[fe],I[Ee],I[Q],I[Ce]),M=fe,x=Ee,w=Q,S=Ce),(Ge.equals(E)===!1||_t!==L)&&(r.blendColor(Ge.r,Ge.g,Ge.b,_t),E.copy(Ge),L=_t),g=N,b=!1}function Be(N,ae){N.side===Nt?me(r.CULL_FACE):J(r.CULL_FACE);let fe=N.side===sn;ae&&(fe=!fe),ue(fe),N.blending===hs&&N.transparent===!1?mt(pi):mt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const Ee=N.stencilWrite;a.setTest(Ee),Ee&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),de(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?J(r.SAMPLE_ALPHA_TO_COVERAGE):me(r.SAMPLE_ALPHA_TO_COVERAGE)}function ue(N){_!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),_=N)}function Z(N){N!==Mf?(J(r.CULL_FACE),N!==C&&(N===ih?r.cullFace(r.BACK):N===bf?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):me(r.CULL_FACE),C=N}function qe(N){N!==D&&(O&&r.lineWidth(N),D=N)}function de(N,ae,fe){N?(J(r.POLYGON_OFFSET_FILL),(U!==ae||k!==fe)&&(r.polygonOffset(ae,fe),U=ae,k=fe)):me(r.POLYGON_OFFSET_FILL)}function ze(N){N?J(r.SCISSOR_TEST):me(r.SCISSOR_TEST)}function ct(N){N===void 0&&(N=r.TEXTURE0+H-1),$!==N&&(r.activeTexture(N),$=N)}function rt(N,ae,fe){fe===void 0&&($===null?fe=r.TEXTURE0+H-1:fe=$);let Ee=re[fe];Ee===void 0&&(Ee={type:void 0,texture:void 0},re[fe]=Ee),(Ee.type!==N||Ee.texture!==ae)&&($!==fe&&(r.activeTexture(fe),$=fe),r.bindTexture(N,ae||X[N]),Ee.type=N,Ee.texture=ae)}function P(){const N=re[$];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function A(){try{r.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function V(){try{r.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Y(){try{r.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{r.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function j(){try{r.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ue(){try{r.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function le(){try{r.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Pe(){try{r.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function De(){try{r.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function oe(){try{r.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _e(N){K.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),K.copy(N))}function He(N){ce.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),ce.copy(N))}function Ie(N,ae){let fe=l.get(ae);fe===void 0&&(fe=new WeakMap,l.set(ae,fe));let Ee=fe.get(N);Ee===void 0&&(Ee=r.getUniformBlockIndex(ae,N.name),fe.set(N,Ee))}function xe(N,ae){const Ee=l.get(ae).get(N);c.get(ae)!==Ee&&(r.uniformBlockBinding(ae,Ee,N.__bindingPointIndex),c.set(ae,Ee))}function Ye(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},$=null,re={},u={},d=new WeakMap,f=[],p=null,v=!1,g=null,m=null,M=null,x=null,y=null,w=null,S=null,E=new he(0,0,0),L=0,b=!1,_=null,C=null,D=null,U=null,k=null,K.set(0,0,r.canvas.width,r.canvas.height),ce.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:J,disable:me,bindFramebuffer:Ae,drawBuffers:Te,useProgram:Qe,setBlending:mt,setMaterial:Be,setFlipSided:ue,setCullFace:Z,setLineWidth:qe,setPolygonOffset:de,setScissorTest:ze,activeTexture:ct,bindTexture:rt,unbindTexture:P,compressedTexImage2D:A,compressedTexImage3D:V,texImage2D:De,texImage3D:oe,updateUBOMapping:Ie,uniformBlockBinding:xe,texStorage2D:le,texStorage3D:Pe,texSubImage2D:Y,texSubImage3D:te,compressedTexSubImage2D:j,compressedTexSubImage3D:Ue,scissor:_e,viewport:He,reset:Ye}}function c1(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ve,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(P,A){return f?new OffscreenCanvas(P,A):Or("canvas")}function v(P,A,V){let Y=1;const te=rt(P);if((te.width>V||te.height>V)&&(Y=V/Math.max(te.width,te.height)),Y<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const j=Math.floor(Y*te.width),Ue=Math.floor(Y*te.height);u===void 0&&(u=p(j,Ue));const le=A?p(j,Ue):u;return le.width=j,le.height=Ue,le.getContext("2d").drawImage(P,0,0,j,Ue),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+j+"x"+Ue+")."),le}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),P;return P}function g(P){return P.generateMipmaps}function m(P){r.generateMipmap(P)}function M(P){return P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?r.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(P,A,V,Y,te=!1){if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let j=A;if(A===r.RED&&(V===r.FLOAT&&(j=r.R32F),V===r.HALF_FLOAT&&(j=r.R16F),V===r.UNSIGNED_BYTE&&(j=r.R8)),A===r.RED_INTEGER&&(V===r.UNSIGNED_BYTE&&(j=r.R8UI),V===r.UNSIGNED_SHORT&&(j=r.R16UI),V===r.UNSIGNED_INT&&(j=r.R32UI),V===r.BYTE&&(j=r.R8I),V===r.SHORT&&(j=r.R16I),V===r.INT&&(j=r.R32I)),A===r.RG&&(V===r.FLOAT&&(j=r.RG32F),V===r.HALF_FLOAT&&(j=r.RG16F),V===r.UNSIGNED_BYTE&&(j=r.RG8)),A===r.RG_INTEGER&&(V===r.UNSIGNED_BYTE&&(j=r.RG8UI),V===r.UNSIGNED_SHORT&&(j=r.RG16UI),V===r.UNSIGNED_INT&&(j=r.RG32UI),V===r.BYTE&&(j=r.RG8I),V===r.SHORT&&(j=r.RG16I),V===r.INT&&(j=r.RG32I)),A===r.RGB_INTEGER&&(V===r.UNSIGNED_BYTE&&(j=r.RGB8UI),V===r.UNSIGNED_SHORT&&(j=r.RGB16UI),V===r.UNSIGNED_INT&&(j=r.RGB32UI),V===r.BYTE&&(j=r.RGB8I),V===r.SHORT&&(j=r.RGB16I),V===r.INT&&(j=r.RGB32I)),A===r.RGBA_INTEGER&&(V===r.UNSIGNED_BYTE&&(j=r.RGBA8UI),V===r.UNSIGNED_SHORT&&(j=r.RGBA16UI),V===r.UNSIGNED_INT&&(j=r.RGBA32UI),V===r.BYTE&&(j=r.RGBA8I),V===r.SHORT&&(j=r.RGBA16I),V===r.INT&&(j=r.RGBA32I)),A===r.RGB&&(V===r.UNSIGNED_INT_5_9_9_9_REV&&(j=r.RGB9_E5),V===r.UNSIGNED_INT_10F_11F_11F_REV&&(j=r.R11F_G11F_B10F)),A===r.RGBA){const Ue=te?Zo:nt.getTransfer(Y);V===r.FLOAT&&(j=r.RGBA32F),V===r.HALF_FLOAT&&(j=r.RGBA16F),V===r.UNSIGNED_BYTE&&(j=Ue===dt?r.SRGB8_ALPHA8:r.RGBA8),V===r.UNSIGNED_SHORT_4_4_4_4&&(j=r.RGBA4),V===r.UNSIGNED_SHORT_5_5_5_1&&(j=r.RGB5_A1)}return(j===r.R16F||j===r.R32F||j===r.RG16F||j===r.RG32F||j===r.RGBA16F||j===r.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function y(P,A){let V;return P?A===null||A===ds||A===Vs?V=r.DEPTH24_STENCIL8:A===On?V=r.DEPTH32F_STENCIL8:A===Ur&&(V=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===ds||A===Vs?V=r.DEPTH_COMPONENT24:A===On?V=r.DEPTH_COMPONENT32F:A===Ur&&(V=r.DEPTH_COMPONENT16),V}function w(P,A){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==Xt&&P.minFilter!==Bt?Math.log2(Math.max(A.width,A.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?A.mipmaps.length:1}function S(P){const A=P.target;A.removeEventListener("dispose",S),L(A),A.isVideoTexture&&h.delete(A)}function E(P){const A=P.target;A.removeEventListener("dispose",E),_(A)}function L(P){const A=n.get(P);if(A.__webglInit===void 0)return;const V=P.source,Y=d.get(V);if(Y){const te=Y[A.__cacheKey];te.usedTimes--,te.usedTimes===0&&b(P),Object.keys(Y).length===0&&d.delete(V)}n.remove(P)}function b(P){const A=n.get(P);r.deleteTexture(A.__webglTexture);const V=P.source,Y=d.get(V);delete Y[A.__cacheKey],o.memory.textures--}function _(P){const A=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(A.__webglFramebuffer[Y]))for(let te=0;te<A.__webglFramebuffer[Y].length;te++)r.deleteFramebuffer(A.__webglFramebuffer[Y][te]);else r.deleteFramebuffer(A.__webglFramebuffer[Y]);A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer[Y])}else{if(Array.isArray(A.__webglFramebuffer))for(let Y=0;Y<A.__webglFramebuffer.length;Y++)r.deleteFramebuffer(A.__webglFramebuffer[Y]);else r.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&r.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let Y=0;Y<A.__webglColorRenderbuffer.length;Y++)A.__webglColorRenderbuffer[Y]&&r.deleteRenderbuffer(A.__webglColorRenderbuffer[Y]);A.__webglDepthRenderbuffer&&r.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const V=P.textures;for(let Y=0,te=V.length;Y<te;Y++){const j=n.get(V[Y]);j.__webglTexture&&(r.deleteTexture(j.__webglTexture),o.memory.textures--),n.remove(V[Y])}n.remove(P)}let C=0;function D(){C=0}function U(){const P=C;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),C+=1,P}function k(P){const A=[];return A.push(P.wrapS),A.push(P.wrapT),A.push(P.wrapR||0),A.push(P.magFilter),A.push(P.minFilter),A.push(P.anisotropy),A.push(P.internalFormat),A.push(P.format),A.push(P.type),A.push(P.generateMipmaps),A.push(P.premultiplyAlpha),A.push(P.flipY),A.push(P.unpackAlignment),A.push(P.colorSpace),A.join()}function H(P,A){const V=n.get(P);if(P.isVideoTexture&&ze(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&V.__version!==P.version){const Y=P.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(V,P,A);return}}else P.isExternalTexture&&(V.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,V.__webglTexture,r.TEXTURE0+A)}function O(P,A){const V=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&V.__version!==P.version){X(V,P,A);return}t.bindTexture(r.TEXTURE_2D_ARRAY,V.__webglTexture,r.TEXTURE0+A)}function q(P,A){const V=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&V.__version!==P.version){X(V,P,A);return}t.bindTexture(r.TEXTURE_3D,V.__webglTexture,r.TEXTURE0+A)}function z(P,A){const V=n.get(P);if(P.version>0&&V.__version!==P.version){J(V,P,A);return}t.bindTexture(r.TEXTURE_CUBE_MAP,V.__webglTexture,r.TEXTURE0+A)}const $={[Lt]:r.REPEAT,[bn]:r.CLAMP_TO_EDGE,[Ko]:r.MIRRORED_REPEAT},re={[Xt]:r.NEAREST,[bd]:r.NEAREST_MIPMAP_NEAREST,[br]:r.NEAREST_MIPMAP_LINEAR,[Bt]:r.LINEAR,[zo]:r.LINEAR_MIPMAP_NEAREST,[un]:r.LINEAR_MIPMAP_LINEAR},ee={[Kf]:r.NEVER,[tp]:r.ALWAYS,[Zf]:r.LESS,[Dd]:r.LEQUAL,[Jf]:r.EQUAL,[ep]:r.GEQUAL,[Qf]:r.GREATER,[$f]:r.NOTEQUAL};function Me(P,A){if(A.type===On&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===Bt||A.magFilter===zo||A.magFilter===br||A.magFilter===un||A.minFilter===Bt||A.minFilter===zo||A.minFilter===br||A.minFilter===un)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(P,r.TEXTURE_WRAP_S,$[A.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,$[A.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,$[A.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,re[A.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,re[A.minFilter]),A.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,ee[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Xt||A.minFilter!==br&&A.minFilter!==un||A.type===On&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");r.texParameterf(P,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function K(P,A){let V=!1;P.__webglInit===void 0&&(P.__webglInit=!0,A.addEventListener("dispose",S));const Y=A.source;let te=d.get(Y);te===void 0&&(te={},d.set(Y,te));const j=k(A);if(j!==P.__cacheKey){te[j]===void 0&&(te[j]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,V=!0),te[j].usedTimes++;const Ue=te[P.__cacheKey];Ue!==void 0&&(te[P.__cacheKey].usedTimes--,Ue.usedTimes===0&&b(A)),P.__cacheKey=j,P.__webglTexture=te[j].texture}return V}function ce(P,A,V){return Math.floor(Math.floor(P/V)/A)}function be(P,A,V,Y){const j=P.updateRanges;if(j.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,A.width,A.height,V,Y,A.data);else{j.sort((oe,_e)=>oe.start-_e.start);let Ue=0;for(let oe=1;oe<j.length;oe++){const _e=j[Ue],He=j[oe],Ie=_e.start+_e.count,xe=ce(He.start,A.width,4),Ye=ce(_e.start,A.width,4);He.start<=Ie+1&&xe===Ye&&ce(He.start+He.count-1,A.width,4)===xe?_e.count=Math.max(_e.count,He.start+He.count-_e.start):(++Ue,j[Ue]=He)}j.length=Ue+1;const le=r.getParameter(r.UNPACK_ROW_LENGTH),Pe=r.getParameter(r.UNPACK_SKIP_PIXELS),De=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,A.width);for(let oe=0,_e=j.length;oe<_e;oe++){const He=j[oe],Ie=Math.floor(He.start/4),xe=Math.ceil(He.count/4),Ye=Ie%A.width,N=Math.floor(Ie/A.width),ae=xe,fe=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ye),r.pixelStorei(r.UNPACK_SKIP_ROWS,N),t.texSubImage2D(r.TEXTURE_2D,0,Ye,N,ae,fe,V,Y,A.data)}P.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,le),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Pe),r.pixelStorei(r.UNPACK_SKIP_ROWS,De)}}function X(P,A,V){let Y=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(Y=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(Y=r.TEXTURE_3D);const te=K(P,A),j=A.source;t.bindTexture(Y,P.__webglTexture,r.TEXTURE0+V);const Ue=n.get(j);if(j.version!==Ue.__version||te===!0){t.activeTexture(r.TEXTURE0+V);const le=nt.getPrimaries(nt.workingColorSpace),Pe=A.colorSpace===Kn?null:nt.getPrimaries(A.colorSpace),De=A.colorSpace===Kn||le===Pe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);let oe=v(A.image,!1,i.maxTextureSize);oe=ct(A,oe);const _e=s.convert(A.format,A.colorSpace),He=s.convert(A.type);let Ie=x(A.internalFormat,_e,He,A.colorSpace,A.isVideoTexture);Me(Y,A);let xe;const Ye=A.mipmaps,N=A.isVideoTexture!==!0,ae=Ue.__version===void 0||te===!0,fe=j.dataReady,Ee=w(A,oe);if(A.isDepthTexture)Ie=y(A.format===Gs,A.type),ae&&(N?t.texStorage2D(r.TEXTURE_2D,1,Ie,oe.width,oe.height):t.texImage2D(r.TEXTURE_2D,0,Ie,oe.width,oe.height,0,_e,He,null));else if(A.isDataTexture)if(Ye.length>0){N&&ae&&t.texStorage2D(r.TEXTURE_2D,Ee,Ie,Ye[0].width,Ye[0].height);for(let ie=0,Q=Ye.length;ie<Q;ie++)xe=Ye[ie],N?fe&&t.texSubImage2D(r.TEXTURE_2D,ie,0,0,xe.width,xe.height,_e,He,xe.data):t.texImage2D(r.TEXTURE_2D,ie,Ie,xe.width,xe.height,0,_e,He,xe.data);A.generateMipmaps=!1}else N?(ae&&t.texStorage2D(r.TEXTURE_2D,Ee,Ie,oe.width,oe.height),fe&&be(A,oe,_e,He)):t.texImage2D(r.TEXTURE_2D,0,Ie,oe.width,oe.height,0,_e,He,oe.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){N&&ae&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ee,Ie,Ye[0].width,Ye[0].height,oe.depth);for(let ie=0,Q=Ye.length;ie<Q;ie++)if(xe=Ye[ie],A.format!==Sn)if(_e!==null)if(N){if(fe)if(A.layerUpdates.size>0){const Ce=jh(xe.width,xe.height,A.format,A.type);for(const Ge of A.layerUpdates){const _t=xe.data.subarray(Ge*Ce/xe.data.BYTES_PER_ELEMENT,(Ge+1)*Ce/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ie,0,0,Ge,xe.width,xe.height,1,_e,_t)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ie,0,0,0,xe.width,xe.height,oe.depth,_e,xe.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ie,Ie,xe.width,xe.height,oe.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?fe&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,ie,0,0,0,xe.width,xe.height,oe.depth,_e,He,xe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ie,Ie,xe.width,xe.height,oe.depth,0,_e,He,xe.data)}else{N&&ae&&t.texStorage2D(r.TEXTURE_2D,Ee,Ie,Ye[0].width,Ye[0].height);for(let ie=0,Q=Ye.length;ie<Q;ie++)xe=Ye[ie],A.format!==Sn?_e!==null?N?fe&&t.compressedTexSubImage2D(r.TEXTURE_2D,ie,0,0,xe.width,xe.height,_e,xe.data):t.compressedTexImage2D(r.TEXTURE_2D,ie,Ie,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?fe&&t.texSubImage2D(r.TEXTURE_2D,ie,0,0,xe.width,xe.height,_e,He,xe.data):t.texImage2D(r.TEXTURE_2D,ie,Ie,xe.width,xe.height,0,_e,He,xe.data)}else if(A.isDataArrayTexture)if(N){if(ae&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ee,Ie,oe.width,oe.height,oe.depth),fe)if(A.layerUpdates.size>0){const ie=jh(oe.width,oe.height,A.format,A.type);for(const Q of A.layerUpdates){const Ce=oe.data.subarray(Q*ie/oe.data.BYTES_PER_ELEMENT,(Q+1)*ie/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Q,oe.width,oe.height,1,_e,He,Ce)}A.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,_e,He,oe.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ie,oe.width,oe.height,oe.depth,0,_e,He,oe.data);else if(A.isData3DTexture)N?(ae&&t.texStorage3D(r.TEXTURE_3D,Ee,Ie,oe.width,oe.height,oe.depth),fe&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,_e,He,oe.data)):t.texImage3D(r.TEXTURE_3D,0,Ie,oe.width,oe.height,oe.depth,0,_e,He,oe.data);else if(A.isFramebufferTexture){if(ae)if(N)t.texStorage2D(r.TEXTURE_2D,Ee,Ie,oe.width,oe.height);else{let ie=oe.width,Q=oe.height;for(let Ce=0;Ce<Ee;Ce++)t.texImage2D(r.TEXTURE_2D,Ce,Ie,ie,Q,0,_e,He,null),ie>>=1,Q>>=1}}else if(Ye.length>0){if(N&&ae){const ie=rt(Ye[0]);t.texStorage2D(r.TEXTURE_2D,Ee,Ie,ie.width,ie.height)}for(let ie=0,Q=Ye.length;ie<Q;ie++)xe=Ye[ie],N?fe&&t.texSubImage2D(r.TEXTURE_2D,ie,0,0,_e,He,xe):t.texImage2D(r.TEXTURE_2D,ie,Ie,_e,He,xe);A.generateMipmaps=!1}else if(N){if(ae){const ie=rt(oe);t.texStorage2D(r.TEXTURE_2D,Ee,Ie,ie.width,ie.height)}fe&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,_e,He,oe)}else t.texImage2D(r.TEXTURE_2D,0,Ie,_e,He,oe);g(A)&&m(Y),Ue.__version=j.version,A.onUpdate&&A.onUpdate(A)}P.__version=A.version}function J(P,A,V){if(A.image.length!==6)return;const Y=K(P,A),te=A.source;t.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+V);const j=n.get(te);if(te.version!==j.__version||Y===!0){t.activeTexture(r.TEXTURE0+V);const Ue=nt.getPrimaries(nt.workingColorSpace),le=A.colorSpace===Kn?null:nt.getPrimaries(A.colorSpace),Pe=A.colorSpace===Kn||Ue===le?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);const De=A.isCompressedTexture||A.image[0].isCompressedTexture,oe=A.image[0]&&A.image[0].isDataTexture,_e=[];for(let Q=0;Q<6;Q++)!De&&!oe?_e[Q]=v(A.image[Q],!0,i.maxCubemapSize):_e[Q]=oe?A.image[Q].image:A.image[Q],_e[Q]=ct(A,_e[Q]);const He=_e[0],Ie=s.convert(A.format,A.colorSpace),xe=s.convert(A.type),Ye=x(A.internalFormat,Ie,xe,A.colorSpace),N=A.isVideoTexture!==!0,ae=j.__version===void 0||Y===!0,fe=te.dataReady;let Ee=w(A,He);Me(r.TEXTURE_CUBE_MAP,A);let ie;if(De){N&&ae&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Ee,Ye,He.width,He.height);for(let Q=0;Q<6;Q++){ie=_e[Q].mipmaps;for(let Ce=0;Ce<ie.length;Ce++){const Ge=ie[Ce];A.format!==Sn?Ie!==null?N?fe&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ce,0,0,Ge.width,Ge.height,Ie,Ge.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ce,Ye,Ge.width,Ge.height,0,Ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?fe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ce,0,0,Ge.width,Ge.height,Ie,xe,Ge.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ce,Ye,Ge.width,Ge.height,0,Ie,xe,Ge.data)}}}else{if(ie=A.mipmaps,N&&ae){ie.length>0&&Ee++;const Q=rt(_e[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Ee,Ye,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(oe){N?fe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,_e[Q].width,_e[Q].height,Ie,xe,_e[Q].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ye,_e[Q].width,_e[Q].height,0,Ie,xe,_e[Q].data);for(let Ce=0;Ce<ie.length;Ce++){const _t=ie[Ce].image[Q].image;N?fe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ce+1,0,0,_t.width,_t.height,Ie,xe,_t.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ce+1,Ye,_t.width,_t.height,0,Ie,xe,_t.data)}}else{N?fe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ie,xe,_e[Q]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ye,Ie,xe,_e[Q]);for(let Ce=0;Ce<ie.length;Ce++){const Ge=ie[Ce];N?fe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ce+1,0,0,Ie,xe,Ge.image[Q]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ce+1,Ye,Ie,xe,Ge.image[Q])}}}g(A)&&m(r.TEXTURE_CUBE_MAP),j.__version=te.version,A.onUpdate&&A.onUpdate(A)}P.__version=A.version}function me(P,A,V,Y,te,j){const Ue=s.convert(V.format,V.colorSpace),le=s.convert(V.type),Pe=x(V.internalFormat,Ue,le,V.colorSpace),De=n.get(A),oe=n.get(V);if(oe.__renderTarget=A,!De.__hasExternalTextures){const _e=Math.max(1,A.width>>j),He=Math.max(1,A.height>>j);te===r.TEXTURE_3D||te===r.TEXTURE_2D_ARRAY?t.texImage3D(te,j,Pe,_e,He,A.depth,0,Ue,le,null):t.texImage2D(te,j,Pe,_e,He,0,Ue,le,null)}t.bindFramebuffer(r.FRAMEBUFFER,P),de(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Y,te,oe.__webglTexture,0,qe(A)):(te===r.TEXTURE_2D||te>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Y,te,oe.__webglTexture,j),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ae(P,A,V){if(r.bindRenderbuffer(r.RENDERBUFFER,P),A.depthBuffer){const Y=A.depthTexture,te=Y&&Y.isDepthTexture?Y.type:null,j=y(A.stencilBuffer,te),Ue=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,le=qe(A);de(A)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,le,j,A.width,A.height):V?r.renderbufferStorageMultisample(r.RENDERBUFFER,le,j,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,j,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ue,r.RENDERBUFFER,P)}else{const Y=A.textures;for(let te=0;te<Y.length;te++){const j=Y[te],Ue=s.convert(j.format,j.colorSpace),le=s.convert(j.type),Pe=x(j.internalFormat,Ue,le,j.colorSpace),De=qe(A);V&&de(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,De,Pe,A.width,A.height):de(A)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,De,Pe,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,Pe,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Te(P,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,P),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(A.depthTexture);Y.__renderTarget=A,(!Y.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),H(A.depthTexture,0);const te=Y.__webglTexture,j=qe(A);if(A.depthTexture.format===Nr)de(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,te,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,te,0);else if(A.depthTexture.format===Gs)de(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,te,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Qe(P){const A=n.get(P),V=P.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==P.depthTexture){const Y=P.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),Y){const te=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,Y.removeEventListener("dispose",te)};Y.addEventListener("dispose",te),A.__depthDisposeCallback=te}A.__boundDepthTexture=Y}if(P.depthTexture&&!A.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");const Y=P.texture.mipmaps;Y&&Y.length>0?Te(A.__webglFramebuffer[0],P):Te(A.__webglFramebuffer,P)}else if(V){A.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[Y]),A.__webglDepthbuffer[Y]===void 0)A.__webglDepthbuffer[Y]=r.createRenderbuffer(),Ae(A.__webglDepthbuffer[Y],P,!1);else{const te=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=A.__webglDepthbuffer[Y];r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,te,r.RENDERBUFFER,j)}}else{const Y=P.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=r.createRenderbuffer(),Ae(A.__webglDepthbuffer,P,!1);else{const te=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=A.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,te,r.RENDERBUFFER,j)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Vt(P,A,V){const Y=n.get(P);A!==void 0&&me(Y.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),V!==void 0&&Qe(P)}function I(P){const A=P.texture,V=n.get(P),Y=n.get(A);P.addEventListener("dispose",E);const te=P.textures,j=P.isWebGLCubeRenderTarget===!0,Ue=te.length>1;if(Ue||(Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture()),Y.__version=A.version,o.memory.textures++),j){V.__webglFramebuffer=[];for(let le=0;le<6;le++)if(A.mipmaps&&A.mipmaps.length>0){V.__webglFramebuffer[le]=[];for(let Pe=0;Pe<A.mipmaps.length;Pe++)V.__webglFramebuffer[le][Pe]=r.createFramebuffer()}else V.__webglFramebuffer[le]=r.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){V.__webglFramebuffer=[];for(let le=0;le<A.mipmaps.length;le++)V.__webglFramebuffer[le]=r.createFramebuffer()}else V.__webglFramebuffer=r.createFramebuffer();if(Ue)for(let le=0,Pe=te.length;le<Pe;le++){const De=n.get(te[le]);De.__webglTexture===void 0&&(De.__webglTexture=r.createTexture(),o.memory.textures++)}if(P.samples>0&&de(P)===!1){V.__webglMultisampledFramebuffer=r.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let le=0;le<te.length;le++){const Pe=te[le];V.__webglColorRenderbuffer[le]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,V.__webglColorRenderbuffer[le]);const De=s.convert(Pe.format,Pe.colorSpace),oe=s.convert(Pe.type),_e=x(Pe.internalFormat,De,oe,Pe.colorSpace,P.isXRRenderTarget===!0),He=qe(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,He,_e,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+le,r.RENDERBUFFER,V.__webglColorRenderbuffer[le])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(V.__webglDepthRenderbuffer=r.createRenderbuffer(),Ae(V.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(j){t.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture),Me(r.TEXTURE_CUBE_MAP,A);for(let le=0;le<6;le++)if(A.mipmaps&&A.mipmaps.length>0)for(let Pe=0;Pe<A.mipmaps.length;Pe++)me(V.__webglFramebuffer[le][Pe],P,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+le,Pe);else me(V.__webglFramebuffer[le],P,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);g(A)&&m(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ue){for(let le=0,Pe=te.length;le<Pe;le++){const De=te[le],oe=n.get(De);let _e=r.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(_e=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(_e,oe.__webglTexture),Me(_e,De),me(V.__webglFramebuffer,P,De,r.COLOR_ATTACHMENT0+le,_e,0),g(De)&&m(_e)}t.unbindTexture()}else{let le=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(le=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(le,Y.__webglTexture),Me(le,A),A.mipmaps&&A.mipmaps.length>0)for(let Pe=0;Pe<A.mipmaps.length;Pe++)me(V.__webglFramebuffer[Pe],P,A,r.COLOR_ATTACHMENT0,le,Pe);else me(V.__webglFramebuffer,P,A,r.COLOR_ATTACHMENT0,le,0);g(A)&&m(le),t.unbindTexture()}P.depthBuffer&&Qe(P)}function mt(P){const A=P.textures;for(let V=0,Y=A.length;V<Y;V++){const te=A[V];if(g(te)){const j=M(P),Ue=n.get(te).__webglTexture;t.bindTexture(j,Ue),m(j),t.unbindTexture()}}}const Be=[],ue=[];function Z(P){if(P.samples>0){if(de(P)===!1){const A=P.textures,V=P.width,Y=P.height;let te=r.COLOR_BUFFER_BIT;const j=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ue=n.get(P),le=A.length>1;if(le)for(let De=0;De<A.length;De++)t.bindFramebuffer(r.FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Ue.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Ue.__webglMultisampledFramebuffer);const Pe=P.texture.mipmaps;Pe&&Pe.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ue.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ue.__webglFramebuffer);for(let De=0;De<A.length;De++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(te|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(te|=r.STENCIL_BUFFER_BIT)),le){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ue.__webglColorRenderbuffer[De]);const oe=n.get(A[De]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,oe,0)}r.blitFramebuffer(0,0,V,Y,0,0,V,Y,te,r.NEAREST),c===!0&&(Be.length=0,ue.length=0,Be.push(r.COLOR_ATTACHMENT0+De),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Be.push(j),ue.push(j),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,ue)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Be))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),le)for(let De=0;De<A.length;De++){t.bindFramebuffer(r.FRAMEBUFFER,Ue.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.RENDERBUFFER,Ue.__webglColorRenderbuffer[De]);const oe=n.get(A[De]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Ue.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+De,r.TEXTURE_2D,oe,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ue.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const A=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[A])}}}function qe(P){return Math.min(i.maxSamples,P.samples)}function de(P){const A=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function ze(P){const A=o.render.frame;h.get(P)!==A&&(h.set(P,A),P.update())}function ct(P,A){const V=P.colorSpace,Y=P.format,te=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||V!==Yt&&V!==Kn&&(nt.getTransfer(V)===dt?(Y!==Sn||te!==Hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),A}function rt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=U,this.resetTextureUnits=D,this.setTexture2D=H,this.setTexture2DArray=O,this.setTexture3D=q,this.setTextureCube=z,this.rebindTextures=Vt,this.setupRenderTarget=I,this.updateRenderTargetMipmap=mt,this.updateMultisampleRenderTarget=Z,this.setupDepthRenderbuffer=Qe,this.setupFrameBufferTexture=me,this.useMultisampledRTT=de}function l1(r,e){function t(n,i=Kn){let s;const o=nt.getTransfer(i);if(n===Hn)return r.UNSIGNED_BYTE;if(n===Rl)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Cl)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Td)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Ed)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Sd)return r.BYTE;if(n===wd)return r.SHORT;if(n===Ur)return r.UNSIGNED_SHORT;if(n===Al)return r.INT;if(n===ds)return r.UNSIGNED_INT;if(n===On)return r.FLOAT;if(n===rn)return r.HALF_FLOAT;if(n===Ad)return r.ALPHA;if(n===Rd)return r.RGB;if(n===Sn)return r.RGBA;if(n===Nr)return r.DEPTH_COMPONENT;if(n===Gs)return r.DEPTH_STENCIL;if(n===aa)return r.RED;if(n===Ll)return r.RED_INTEGER;if(n===Cd)return r.RG;if(n===Pl)return r.RG_INTEGER;if(n===Dl)return r.RGBA_INTEGER;if(n===Ho||n===Vo||n===Go||n===Wo)if(o===dt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ho)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Vo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Go)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Wo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ho)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Vo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Go)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Wo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Bc||n===zc||n===Hc||n===Vc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Bc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===zc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Hc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Vc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Gc||n===Wc||n===Xc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Gc||n===Wc)return o===dt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Xc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===qc||n===Yc||n===jc||n===Kc||n===Zc||n===Jc||n===Qc||n===$c||n===el||n===tl||n===nl||n===il||n===sl||n===rl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===qc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Yc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===jc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Kc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Zc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Jc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Qc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===$c)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===el)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===tl)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===nl)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===il)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===sl)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===rl)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ol||n===al||n===cl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===ol)return o===dt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===al)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===cl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ll||n===hl||n===ul||n===dl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===ll)return s.COMPRESSED_RED_RGTC1_EXT;if(n===hl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ul)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===dl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const h1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,u1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class d1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new jd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new vt({vertexShader:h1,fragmentShader:u1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new tt(new hn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class f1 extends Js{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,p=null;const v=typeof XRWebGLBinding<"u",g=new d1,m={},M=t.getContextAttributes();let x=null,y=null;const w=[],S=[],E=new ve;let L=null;const b=new nn;b.viewport=new lt;const _=new nn;_.viewport=new lt;const C=[b,_],D=new wm;let U=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let J=w[X];return J===void 0&&(J=new Oa,w[X]=J),J.getTargetRaySpace()},this.getControllerGrip=function(X){let J=w[X];return J===void 0&&(J=new Oa,w[X]=J),J.getGripSpace()},this.getHand=function(X){let J=w[X];return J===void 0&&(J=new Oa,w[X]=J),J.getHandSpace()};function H(X){const J=S.indexOf(X.inputSource);if(J===-1)return;const me=w[J];me!==void 0&&(me.update(X.inputSource,X.frame,l||o),me.dispatchEvent({type:X.type,data:X.inputSource}))}function O(){i.removeEventListener("select",H),i.removeEventListener("selectstart",H),i.removeEventListener("selectend",H),i.removeEventListener("squeeze",H),i.removeEventListener("squeezestart",H),i.removeEventListener("squeezeend",H),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",q);for(let X=0;X<w.length;X++){const J=S[X];J!==null&&(S[X]=null,w[X].disconnect(J))}U=null,k=null,g.reset();for(const X in m)delete m[X];e.setRenderTarget(x),f=null,d=null,u=null,i=null,y=null,be.stop(),n.isPresenting=!1,e.setPixelRatio(L),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(X){if(i=X,i!==null){if(x=e.getRenderTarget(),i.addEventListener("select",H),i.addEventListener("selectstart",H),i.addEventListener("selectend",H),i.addEventListener("squeeze",H),i.addEventListener("squeezestart",H),i.addEventListener("squeezeend",H),i.addEventListener("end",O),i.addEventListener("inputsourceschange",q),M.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(E),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Ae=null,Te=null;M.depth&&(Te=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=M.stencil?Gs:Nr,Ae=M.stencil?Vs:ds);const Qe={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Qe),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new qt(d.textureWidth,d.textureHeight,{format:Sn,type:Hn,depthTexture:new zl(d.textureWidth,d.textureHeight,Ae,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const me={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,me),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new qt(f.framebufferWidth,f.framebufferHeight,{format:Sn,type:Hn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),be.setContext(i),be.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function q(X){for(let J=0;J<X.removed.length;J++){const me=X.removed[J],Ae=S.indexOf(me);Ae>=0&&(S[Ae]=null,w[Ae].disconnect(me))}for(let J=0;J<X.added.length;J++){const me=X.added[J];let Ae=S.indexOf(me);if(Ae===-1){for(let Qe=0;Qe<w.length;Qe++)if(Qe>=S.length){S.push(me),Ae=Qe;break}else if(S[Qe]===null){S[Qe]=me,Ae=Qe;break}if(Ae===-1)break}const Te=w[Ae];Te&&Te.connect(me)}}const z=new T,$=new T;function re(X,J,me){z.setFromMatrixPosition(J.matrixWorld),$.setFromMatrixPosition(me.matrixWorld);const Ae=z.distanceTo($),Te=J.projectionMatrix.elements,Qe=me.projectionMatrix.elements,Vt=Te[14]/(Te[10]-1),I=Te[14]/(Te[10]+1),mt=(Te[9]+1)/Te[5],Be=(Te[9]-1)/Te[5],ue=(Te[8]-1)/Te[0],Z=(Qe[8]+1)/Qe[0],qe=Vt*ue,de=Vt*Z,ze=Ae/(-ue+Z),ct=ze*-ue;if(J.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(ct),X.translateZ(ze),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Te[10]===-1)X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const rt=Vt+ze,P=I+ze,A=qe-ct,V=de+(Ae-ct),Y=mt*I/P*rt,te=Be*I/P*rt;X.projectionMatrix.makePerspective(A,V,Y,te,rt,P),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ee(X,J){J===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(J.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(i===null)return;let J=X.near,me=X.far;g.texture!==null&&(g.depthNear>0&&(J=g.depthNear),g.depthFar>0&&(me=g.depthFar)),D.near=_.near=b.near=J,D.far=_.far=b.far=me,(U!==D.near||k!==D.far)&&(i.updateRenderState({depthNear:D.near,depthFar:D.far}),U=D.near,k=D.far),D.layers.mask=X.layers.mask|6,b.layers.mask=D.layers.mask&3,_.layers.mask=D.layers.mask&5;const Ae=X.parent,Te=D.cameras;ee(D,Ae);for(let Qe=0;Qe<Te.length;Qe++)ee(Te[Qe],Ae);Te.length===2?re(D,b,_):D.projectionMatrix.copy(b.projectionMatrix),Me(X,D,Ae)};function Me(X,J,me){me===null?X.matrix.copy(J.matrixWorld):(X.matrix.copy(me.matrixWorld),X.matrix.invert(),X.matrix.multiply(J.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Ws*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(X){c=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)},this.getCameraTexture=function(X){return m[X]};let K=null;function ce(X,J){if(h=J.getViewerPose(l||o),p=J,h!==null){const me=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Ae=!1;me.length!==D.cameras.length&&(D.cameras.length=0,Ae=!0);for(let I=0;I<me.length;I++){const mt=me[I];let Be=null;if(f!==null)Be=f.getViewport(mt);else{const Z=u.getViewSubImage(d,mt);Be=Z.viewport,I===0&&(e.setRenderTargetTextures(y,Z.colorTexture,Z.depthStencilTexture),e.setRenderTarget(y))}let ue=C[I];ue===void 0&&(ue=new nn,ue.layers.enable(I),ue.viewport=new lt,C[I]=ue),ue.matrix.fromArray(mt.transform.matrix),ue.matrix.decompose(ue.position,ue.quaternion,ue.scale),ue.projectionMatrix.fromArray(mt.projectionMatrix),ue.projectionMatrixInverse.copy(ue.projectionMatrix).invert(),ue.viewport.set(Be.x,Be.y,Be.width,Be.height),I===0&&(D.matrix.copy(ue.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Ae===!0&&D.cameras.push(ue)}const Te=i.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const I=u.getDepthInformation(me[0]);I&&I.isValid&&I.texture&&g.init(I,i.renderState)}if(Te&&Te.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let I=0;I<me.length;I++){const mt=me[I].camera;if(mt){let Be=m[mt];Be||(Be=new jd,m[mt]=Be);const ue=u.getCameraImage(mt);Be.sourceTexture=ue}}}}for(let me=0;me<w.length;me++){const Ae=S[me],Te=w[me];Ae!==null&&Te!==void 0&&Te.update(Ae,J,l||o)}K&&K(X,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),p=null}const be=new Qd;be.setAnimationLoop(ce),this.setAnimationLoop=function(X){K=X},this.dispose=function(){}}}const Vi=new Pt,p1=new pe;function m1(r,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Bd(r)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,M,x,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(g,m):m.isMeshToonMaterial?(s(g,m),u(g,m)):m.isMeshPhongMaterial?(s(g,m),h(g,m)):m.isMeshStandardMaterial?(s(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),v(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,M,x):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===sn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===sn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const M=e.get(m),x=M.envMap,y=M.envMapRotation;x&&(g.envMap.value=x,Vi.copy(y),Vi.x*=-1,Vi.y*=-1,Vi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Vi.y*=-1,Vi.z*=-1),g.envMapRotation.value.setFromMatrix4(p1.makeRotationFromEuler(Vi)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,M,x){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*M,g.scale.value=x*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,M){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===sn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const M=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function g1(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,x){const y=x.program;n.uniformBlockBinding(M,y)}function l(M,x){let y=i[M.id];y===void 0&&(p(M),y=h(M),i[M.id]=y,M.addEventListener("dispose",g));const w=x.program;n.updateUBOMapping(M,w);const S=e.render.frame;s[M.id]!==S&&(d(M),s[M.id]=S)}function h(M){const x=u();M.__bindingPointIndex=x;const y=r.createBuffer(),w=M.__size,S=M.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,w,S),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,y),y}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const x=i[M.id],y=M.uniforms,w=M.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let S=0,E=y.length;S<E;S++){const L=Array.isArray(y[S])?y[S]:[y[S]];for(let b=0,_=L.length;b<_;b++){const C=L[b];if(f(C,S,b,w)===!0){const D=C.__offset,U=Array.isArray(C.value)?C.value:[C.value];let k=0;for(let H=0;H<U.length;H++){const O=U[H],q=v(O);typeof O=="number"||typeof O=="boolean"?(C.__data[0]=O,r.bufferSubData(r.UNIFORM_BUFFER,D+k,C.__data)):O.isMatrix3?(C.__data[0]=O.elements[0],C.__data[1]=O.elements[1],C.__data[2]=O.elements[2],C.__data[3]=0,C.__data[4]=O.elements[3],C.__data[5]=O.elements[4],C.__data[6]=O.elements[5],C.__data[7]=0,C.__data[8]=O.elements[6],C.__data[9]=O.elements[7],C.__data[10]=O.elements[8],C.__data[11]=0):(O.toArray(C.__data,k),k+=q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,D,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(M,x,y,w){const S=M.value,E=x+"_"+y;if(w[E]===void 0)return typeof S=="number"||typeof S=="boolean"?w[E]=S:w[E]=S.clone(),!0;{const L=w[E];if(typeof S=="number"||typeof S=="boolean"){if(L!==S)return w[E]=S,!0}else if(L.equals(S)===!1)return L.copy(S),!0}return!1}function p(M){const x=M.uniforms;let y=0;const w=16;for(let E=0,L=x.length;E<L;E++){const b=Array.isArray(x[E])?x[E]:[x[E]];for(let _=0,C=b.length;_<C;_++){const D=b[_],U=Array.isArray(D.value)?D.value:[D.value];for(let k=0,H=U.length;k<H;k++){const O=U[k],q=v(O),z=y%w,$=z%q.boundary,re=z+$;y+=$,re!==0&&w-re<q.storage&&(y+=w-re),D.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=y,y+=q.storage}}}const S=y%w;return S>0&&(y+=w-S),M.__size=y,M.__cache={},this}function v(M){const x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function g(M){const x=M.target;x.removeEventListener("dispose",g);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function m(){for(const M in i)r.deleteBuffer(i[M]);o=[],i={},s={}}return{bind:c,update:l,dispose:m}}class v1{constructor(e={}){const{canvas:t=xp(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const p=new Uint32Array(4),v=new Int32Array(4);let g=null,m=null;const M=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=mi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let w=!1;this._outputColorSpace=it;let S=0,E=0,L=null,b=-1,_=null;const C=new lt,D=new lt;let U=null;const k=new he(0);let H=0,O=t.width,q=t.height,z=1,$=null,re=null;const ee=new lt(0,0,O,q),Me=new lt(0,0,O,q);let K=!1;const ce=new Ol;let be=!1,X=!1;const J=new pe,me=new T,Ae=new lt,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Qe=!1;function Vt(){return L===null?z:1}let I=n;function mt(R,F){return t.getContext(R,F)}try{const R={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Tl}`),t.addEventListener("webglcontextlost",fe,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",ie,!1),I===null){const F="webgl2";if(I=mt(F,R),I===null)throw mt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Be,ue,Z,qe,de,ze,ct,rt,P,A,V,Y,te,j,Ue,le,Pe,De,oe,_e,He,Ie,xe,Ye;function N(){Be=new Av(I),Be.init(),Ie=new l1(I,Be),ue=new _v(I,Be,e,Ie),Z=new a1(I,Be),ue.reversedDepthBuffer&&d&&Z.buffers.depth.setReversed(!0),qe=new Lv(I),de=new jx,ze=new c1(I,Be,Z,de,ue,Ie,qe),ct=new bv(y),rt=new Ev(y),P=new km(I),xe=new xv(I,P),A=new Rv(I,P,qe,xe),V=new Dv(I,A,P,qe),oe=new Pv(I,ue,ze),le=new Mv(de),Y=new Yx(y,ct,rt,Be,ue,xe,le),te=new m1(y,de),j=new Zx,Ue=new n1(Be),De=new vv(y,ct,rt,Z,V,f,c),Pe=new r1(y,V,ue),Ye=new g1(I,qe,ue,Z),_e=new yv(I,Be,qe),He=new Cv(I,Be,qe),qe.programs=Y.programs,y.capabilities=ue,y.extensions=Be,y.properties=de,y.renderLists=j,y.shadowMap=Pe,y.state=Z,y.info=qe}N();const ae=new f1(y,I);this.xr=ae,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const R=Be.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Be.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(R){R!==void 0&&(z=R,this.setSize(O,q,!1))},this.getSize=function(R){return R.set(O,q)},this.setSize=function(R,F,G=!0){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=R,q=F,t.width=Math.floor(R*z),t.height=Math.floor(F*z),G===!0&&(t.style.width=R+"px",t.style.height=F+"px"),this.setViewport(0,0,R,F)},this.getDrawingBufferSize=function(R){return R.set(O*z,q*z).floor()},this.setDrawingBufferSize=function(R,F,G){O=R,q=F,z=G,t.width=Math.floor(R*G),t.height=Math.floor(F*G),this.setViewport(0,0,R,F)},this.getCurrentViewport=function(R){return R.copy(C)},this.getViewport=function(R){return R.copy(ee)},this.setViewport=function(R,F,G,W){R.isVector4?ee.set(R.x,R.y,R.z,R.w):ee.set(R,F,G,W),Z.viewport(C.copy(ee).multiplyScalar(z).round())},this.getScissor=function(R){return R.copy(Me)},this.setScissor=function(R,F,G,W){R.isVector4?Me.set(R.x,R.y,R.z,R.w):Me.set(R,F,G,W),Z.scissor(D.copy(Me).multiplyScalar(z).round())},this.getScissorTest=function(){return K},this.setScissorTest=function(R){Z.setScissorTest(K=R)},this.setOpaqueSort=function(R){$=R},this.setTransparentSort=function(R){re=R},this.getClearColor=function(R){return R.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(R=!0,F=!0,G=!0){let W=0;if(R){let B=!1;if(L!==null){const se=L.texture.format;B=se===Dl||se===Pl||se===Ll}if(B){const se=L.texture.type,ye=se===Hn||se===ds||se===Ur||se===Vs||se===Rl||se===Cl,Re=De.getClearColor(),we=De.getClearAlpha(),Oe=Re.r,Ve=Re.g,Ne=Re.b;ye?(p[0]=Oe,p[1]=Ve,p[2]=Ne,p[3]=we,I.clearBufferuiv(I.COLOR,0,p)):(v[0]=Oe,v[1]=Ve,v[2]=Ne,v[3]=we,I.clearBufferiv(I.COLOR,0,v))}else W|=I.COLOR_BUFFER_BIT}F&&(W|=I.DEPTH_BUFFER_BIT),G&&(W|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",fe,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),De.dispose(),j.dispose(),Ue.dispose(),de.dispose(),ct.dispose(),rt.dispose(),V.dispose(),xe.dispose(),Ye.dispose(),Y.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",Xn),ae.removeEventListener("sessionend",Jl),Ni.stop()};function fe(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function Ee(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const R=qe.autoReset,F=Pe.enabled,G=Pe.autoUpdate,W=Pe.needsUpdate,B=Pe.type;N(),qe.autoReset=R,Pe.enabled=F,Pe.autoUpdate=G,Pe.needsUpdate=W,Pe.type=B}function ie(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Q(R){const F=R.target;F.removeEventListener("dispose",Q),Ce(F)}function Ce(R){Ge(R),de.remove(R)}function Ge(R){const F=de.get(R).programs;F!==void 0&&(F.forEach(function(G){Y.releaseProgram(G)}),R.isShaderMaterial&&Y.releaseShaderCache(R))}this.renderBufferDirect=function(R,F,G,W,B,se){F===null&&(F=Te);const ye=B.isMesh&&B.matrixWorld.determinant()<0,Re=mf(R,F,G,W,B);Z.setMaterial(W,ye);let we=G.index,Oe=1;if(W.wireframe===!0){if(we=A.getWireframeAttribute(G),we===void 0)return;Oe=2}const Ve=G.drawRange,Ne=G.attributes.position;let $e=Ve.start*Oe,gt=(Ve.start+Ve.count)*Oe;se!==null&&($e=Math.max($e,se.start*Oe),gt=Math.min(gt,(se.start+se.count)*Oe)),we!==null?($e=Math.max($e,0),gt=Math.min(gt,we.count)):Ne!=null&&($e=Math.max($e,0),gt=Math.min(gt,Ne.count));const Ct=gt-$e;if(Ct<0||Ct===1/0)return;xe.setup(B,W,Re,G,we);let St,xt=_e;if(we!==null&&(St=P.get(we),xt=He,xt.setIndex(St)),B.isMesh)W.wireframe===!0?(Z.setLineWidth(W.wireframeLinewidth*Vt()),xt.setMode(I.LINES)):xt.setMode(I.TRIANGLES);else if(B.isLine){let ke=W.linewidth;ke===void 0&&(ke=1),Z.setLineWidth(ke*Vt()),B.isLineSegments?xt.setMode(I.LINES):B.isLineLoop?xt.setMode(I.LINE_LOOP):xt.setMode(I.LINE_STRIP)}else B.isPoints?xt.setMode(I.POINTS):B.isSprite&&xt.setMode(I.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Br("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),xt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))xt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const ke=B._multiDrawStarts,At=B._multiDrawCounts,ot=B._multiDrawCount,pn=we?P.get(we).bytesPerElement:1,ps=de.get(W).currentProgram.getUniforms();for(let mn=0;mn<ot;mn++)ps.setValue(I,"_gl_DrawID",mn),xt.render(ke[mn]/pn,At[mn])}else if(B.isInstancedMesh)xt.renderInstances($e,Ct,B.count);else if(G.isInstancedBufferGeometry){const ke=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,At=Math.min(G.instanceCount,ke);xt.renderInstances($e,Ct,At)}else xt.render($e,Ct)};function _t(R,F,G){R.transparent===!0&&R.side===Nt&&R.forceSinglePass===!1?(R.side=sn,R.needsUpdate=!0,Yr(R,F,G),R.side=xi,R.needsUpdate=!0,Yr(R,F,G),R.side=Nt):Yr(R,F,G)}this.compile=function(R,F,G=null){G===null&&(G=R),m=Ue.get(G),m.init(F),x.push(m),G.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),R!==G&&R.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),m.setupLights();const W=new Set;return R.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const se=B.material;if(se)if(Array.isArray(se))for(let ye=0;ye<se.length;ye++){const Re=se[ye];_t(Re,G,B),W.add(Re)}else _t(se,G,B),W.add(se)}),m=x.pop(),W},this.compileAsync=function(R,F,G=null){const W=this.compile(R,F,G);return new Promise(B=>{function se(){if(W.forEach(function(ye){de.get(ye).currentProgram.isReady()&&W.delete(ye)}),W.size===0){B(R);return}setTimeout(se,10)}Be.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let ht=null;function ni(R){ht&&ht(R)}function Xn(){Ni.stop()}function Jl(){Ni.start()}const Ni=new Qd;Ni.setAnimationLoop(ni),typeof self<"u"&&Ni.setContext(self),this.setAnimationLoop=function(R){ht=R,ae.setAnimationLoop(R),R===null?Ni.stop():Ni.start()},ae.addEventListener("sessionstart",Xn),ae.addEventListener("sessionend",Jl),this.render=function(R,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(F),F=ae.getCamera()),R.isScene===!0&&R.onBeforeRender(y,R,F,L),m=Ue.get(R,x.length),m.init(F),x.push(m),J.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),ce.setFromProjectionMatrix(J,Jn,F.reversedDepth),X=this.localClippingEnabled,be=le.init(this.clippingPlanes,X),g=j.get(R,M.length),g.init(),M.push(g),ae.enabled===!0&&ae.isPresenting===!0){const se=y.xr.getDepthSensingMesh();se!==null&&ma(se,F,-1/0,y.sortObjects)}ma(R,F,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort($,re),Qe=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,Qe&&De.addToRenderList(g,R),this.info.render.frame++,be===!0&&le.beginShadows();const G=m.state.shadowsArray;Pe.render(G,R,F),be===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=g.opaque,B=g.transmissive;if(m.setupLights(),F.isArrayCamera){const se=F.cameras;if(B.length>0)for(let ye=0,Re=se.length;ye<Re;ye++){const we=se[ye];$l(W,B,R,we)}Qe&&De.render(R);for(let ye=0,Re=se.length;ye<Re;ye++){const we=se[ye];Ql(g,R,we,we.viewport)}}else B.length>0&&$l(W,B,R,F),Qe&&De.render(R),Ql(g,R,F);L!==null&&E===0&&(ze.updateMultisampleRenderTarget(L),ze.updateRenderTargetMipmap(L)),R.isScene===!0&&R.onAfterRender(y,R,F),xe.resetDefaultState(),b=-1,_=null,x.pop(),x.length>0?(m=x[x.length-1],be===!0&&le.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,M.pop(),M.length>0?g=M[M.length-1]:g=null};function ma(R,F,G,W){if(R.visible===!1)return;if(R.layers.test(F.layers)){if(R.isGroup)G=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(F);else if(R.isLight)m.pushLight(R),R.castShadow&&m.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||ce.intersectsSprite(R)){W&&Ae.setFromMatrixPosition(R.matrixWorld).applyMatrix4(J);const ye=V.update(R),Re=R.material;Re.visible&&g.push(R,ye,Re,G,Ae.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||ce.intersectsObject(R))){const ye=V.update(R),Re=R.material;if(W&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ae.copy(R.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Ae.copy(ye.boundingSphere.center)),Ae.applyMatrix4(R.matrixWorld).applyMatrix4(J)),Array.isArray(Re)){const we=ye.groups;for(let Oe=0,Ve=we.length;Oe<Ve;Oe++){const Ne=we[Oe],$e=Re[Ne.materialIndex];$e&&$e.visible&&g.push(R,ye,$e,G,Ae.z,Ne)}}else Re.visible&&g.push(R,ye,Re,G,Ae.z,null)}}const se=R.children;for(let ye=0,Re=se.length;ye<Re;ye++)ma(se[ye],F,G,W)}function Ql(R,F,G,W){const B=R.opaque,se=R.transmissive,ye=R.transparent;m.setupLightsView(G),be===!0&&le.setGlobalState(y.clippingPlanes,G),W&&Z.viewport(C.copy(W)),B.length>0&&qr(B,F,G),se.length>0&&qr(se,F,G),ye.length>0&&qr(ye,F,G),Z.buffers.depth.setTest(!0),Z.buffers.depth.setMask(!0),Z.buffers.color.setMask(!0),Z.setPolygonOffset(!1)}function $l(R,F,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[W.id]===void 0&&(m.state.transmissionRenderTarget[W.id]=new qt(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float")?rn:Hn,minFilter:un,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:nt.workingColorSpace}));const se=m.state.transmissionRenderTarget[W.id],ye=W.viewport||C;se.setSize(ye.z*y.transmissionResolutionScale,ye.w*y.transmissionResolutionScale);const Re=y.getRenderTarget(),we=y.getActiveCubeFace(),Oe=y.getActiveMipmapLevel();y.setRenderTarget(se),y.getClearColor(k),H=y.getClearAlpha(),H<1&&y.setClearColor(16777215,.5),y.clear(),Qe&&De.render(G);const Ve=y.toneMapping;y.toneMapping=mi;const Ne=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),m.setupLightsView(W),be===!0&&le.setGlobalState(y.clippingPlanes,W),qr(R,G,W),ze.updateMultisampleRenderTarget(se),ze.updateRenderTargetMipmap(se),Be.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let gt=0,Ct=F.length;gt<Ct;gt++){const St=F[gt],xt=St.object,ke=St.geometry,At=St.material,ot=St.group;if(At.side===Nt&&xt.layers.test(W.layers)){const pn=At.side;At.side=sn,At.needsUpdate=!0,eh(xt,G,W,ke,At,ot),At.side=pn,At.needsUpdate=!0,$e=!0}}$e===!0&&(ze.updateMultisampleRenderTarget(se),ze.updateRenderTargetMipmap(se))}y.setRenderTarget(Re,we,Oe),y.setClearColor(k,H),Ne!==void 0&&(W.viewport=Ne),y.toneMapping=Ve}function qr(R,F,G){const W=F.isScene===!0?F.overrideMaterial:null;for(let B=0,se=R.length;B<se;B++){const ye=R[B],Re=ye.object,we=ye.geometry,Oe=ye.group;let Ve=ye.material;Ve.allowOverride===!0&&W!==null&&(Ve=W),Re.layers.test(G.layers)&&eh(Re,F,G,we,Ve,Oe)}}function eh(R,F,G,W,B,se){R.onBeforeRender(y,F,G,W,B,se),R.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),B.onBeforeRender(y,F,G,W,R,se),B.transparent===!0&&B.side===Nt&&B.forceSinglePass===!1?(B.side=sn,B.needsUpdate=!0,y.renderBufferDirect(G,F,W,B,R,se),B.side=xi,B.needsUpdate=!0,y.renderBufferDirect(G,F,W,B,R,se),B.side=Nt):y.renderBufferDirect(G,F,W,B,R,se),R.onAfterRender(y,F,G,W,B,se)}function Yr(R,F,G){F.isScene!==!0&&(F=Te);const W=de.get(R),B=m.state.lights,se=m.state.shadowsArray,ye=B.state.version,Re=Y.getParameters(R,B.state,se,F,G),we=Y.getProgramCacheKey(Re);let Oe=W.programs;W.environment=R.isMeshStandardMaterial?F.environment:null,W.fog=F.fog,W.envMap=(R.isMeshStandardMaterial?rt:ct).get(R.envMap||W.environment),W.envMapRotation=W.environment!==null&&R.envMap===null?F.environmentRotation:R.envMapRotation,Oe===void 0&&(R.addEventListener("dispose",Q),Oe=new Map,W.programs=Oe);let Ve=Oe.get(we);if(Ve!==void 0){if(W.currentProgram===Ve&&W.lightsStateVersion===ye)return nh(R,Re),Ve}else Re.uniforms=Y.getUniforms(R),R.onBeforeCompile(Re,y),Ve=Y.acquireProgram(Re,we),Oe.set(we,Ve),W.uniforms=Re.uniforms;const Ne=W.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ne.clippingPlanes=le.uniform),nh(R,Re),W.needsLights=vf(R),W.lightsStateVersion=ye,W.needsLights&&(Ne.ambientLightColor.value=B.state.ambient,Ne.lightProbe.value=B.state.probe,Ne.directionalLights.value=B.state.directional,Ne.directionalLightShadows.value=B.state.directionalShadow,Ne.spotLights.value=B.state.spot,Ne.spotLightShadows.value=B.state.spotShadow,Ne.rectAreaLights.value=B.state.rectArea,Ne.ltc_1.value=B.state.rectAreaLTC1,Ne.ltc_2.value=B.state.rectAreaLTC2,Ne.pointLights.value=B.state.point,Ne.pointLightShadows.value=B.state.pointShadow,Ne.hemisphereLights.value=B.state.hemi,Ne.directionalShadowMap.value=B.state.directionalShadowMap,Ne.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ne.spotShadowMap.value=B.state.spotShadowMap,Ne.spotLightMatrix.value=B.state.spotLightMatrix,Ne.spotLightMap.value=B.state.spotLightMap,Ne.pointShadowMap.value=B.state.pointShadowMap,Ne.pointShadowMatrix.value=B.state.pointShadowMatrix),W.currentProgram=Ve,W.uniformsList=null,Ve}function th(R){if(R.uniformsList===null){const F=R.currentProgram.getUniforms();R.uniformsList=Xo.seqWithValue(F.seq,R.uniforms)}return R.uniformsList}function nh(R,F){const G=de.get(R);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.batchingColor=F.batchingColor,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.instancingMorph=F.instancingMorph,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function mf(R,F,G,W,B){F.isScene!==!0&&(F=Te),ze.resetTextureUnits();const se=F.fog,ye=W.isMeshStandardMaterial?F.environment:null,Re=L===null?y.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Yt,we=(W.isMeshStandardMaterial?rt:ct).get(W.envMap||ye),Oe=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ve=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ne=!!G.morphAttributes.position,$e=!!G.morphAttributes.normal,gt=!!G.morphAttributes.color;let Ct=mi;W.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Ct=y.toneMapping);const St=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,xt=St!==void 0?St.length:0,ke=de.get(W),At=m.state.lights;if(be===!0&&(X===!0||R!==_)){const Qt=R===_&&W.id===b;le.setState(W,R,Qt)}let ot=!1;W.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==At.state.version||ke.outputColorSpace!==Re||B.isBatchedMesh&&ke.batching===!1||!B.isBatchedMesh&&ke.batching===!0||B.isBatchedMesh&&ke.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&ke.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&ke.instancing===!1||!B.isInstancedMesh&&ke.instancing===!0||B.isSkinnedMesh&&ke.skinning===!1||!B.isSkinnedMesh&&ke.skinning===!0||B.isInstancedMesh&&ke.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&ke.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&ke.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&ke.instancingMorph===!1&&B.morphTexture!==null||ke.envMap!==we||W.fog===!0&&ke.fog!==se||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==le.numPlanes||ke.numIntersection!==le.numIntersection)||ke.vertexAlphas!==Oe||ke.vertexTangents!==Ve||ke.morphTargets!==Ne||ke.morphNormals!==$e||ke.morphColors!==gt||ke.toneMapping!==Ct||ke.morphTargetsCount!==xt)&&(ot=!0):(ot=!0,ke.__version=W.version);let pn=ke.currentProgram;ot===!0&&(pn=Yr(W,F,B));let ps=!1,mn=!1,nr=!1;const Rt=pn.getUniforms(),Tn=ke.uniforms;if(Z.useProgram(pn.program)&&(ps=!0,mn=!0,nr=!0),W.id!==b&&(b=W.id,mn=!0),ps||_!==R){Z.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Rt.setValue(I,"projectionMatrix",R.projectionMatrix),Rt.setValue(I,"viewMatrix",R.matrixWorldInverse);const on=Rt.map.cameraPosition;on!==void 0&&on.setValue(I,me.setFromMatrixPosition(R.matrixWorld)),ue.logarithmicDepthBuffer&&Rt.setValue(I,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Rt.setValue(I,"isOrthographic",R.isOrthographicCamera===!0),_!==R&&(_=R,mn=!0,nr=!0)}if(B.isSkinnedMesh){Rt.setOptional(I,B,"bindMatrix"),Rt.setOptional(I,B,"bindMatrixInverse");const Qt=B.skeleton;Qt&&(Qt.boneTexture===null&&Qt.computeBoneTexture(),Rt.setValue(I,"boneTexture",Qt.boneTexture,ze))}B.isBatchedMesh&&(Rt.setOptional(I,B,"batchingTexture"),Rt.setValue(I,"batchingTexture",B._matricesTexture,ze),Rt.setOptional(I,B,"batchingIdTexture"),Rt.setValue(I,"batchingIdTexture",B._indirectTexture,ze),Rt.setOptional(I,B,"batchingColorTexture"),B._colorsTexture!==null&&Rt.setValue(I,"batchingColorTexture",B._colorsTexture,ze));const En=G.morphAttributes;if((En.position!==void 0||En.normal!==void 0||En.color!==void 0)&&oe.update(B,G,pn),(mn||ke.receiveShadow!==B.receiveShadow)&&(ke.receiveShadow=B.receiveShadow,Rt.setValue(I,"receiveShadow",B.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Tn.envMap.value=we,Tn.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&F.environment!==null&&(Tn.envMapIntensity.value=F.environmentIntensity),mn&&(Rt.setValue(I,"toneMappingExposure",y.toneMappingExposure),ke.needsLights&&gf(Tn,nr),se&&W.fog===!0&&te.refreshFogUniforms(Tn,se),te.refreshMaterialUniforms(Tn,W,z,q,m.state.transmissionRenderTarget[R.id]),Xo.upload(I,th(ke),Tn,ze)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Xo.upload(I,th(ke),Tn,ze),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Rt.setValue(I,"center",B.center),Rt.setValue(I,"modelViewMatrix",B.modelViewMatrix),Rt.setValue(I,"normalMatrix",B.normalMatrix),Rt.setValue(I,"modelMatrix",B.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Qt=W.uniformsGroups;for(let on=0,ga=Qt.length;on<ga;on++){const ki=Qt[on];Ye.update(ki,pn),Ye.bind(ki,pn)}}return pn}function gf(R,F){R.ambientLightColor.needsUpdate=F,R.lightProbe.needsUpdate=F,R.directionalLights.needsUpdate=F,R.directionalLightShadows.needsUpdate=F,R.pointLights.needsUpdate=F,R.pointLightShadows.needsUpdate=F,R.spotLights.needsUpdate=F,R.spotLightShadows.needsUpdate=F,R.rectAreaLights.needsUpdate=F,R.hemisphereLights.needsUpdate=F}function vf(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(R,F,G){const W=de.get(R);W.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),de.get(R.texture).__webglTexture=F,de.get(R.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:G,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,F){const G=de.get(R);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0};const xf=I.createFramebuffer();this.setRenderTarget=function(R,F=0,G=0){L=R,S=F,E=G;let W=!0,B=null,se=!1,ye=!1;if(R){const we=de.get(R);if(we.__useDefaultFramebuffer!==void 0)Z.bindFramebuffer(I.FRAMEBUFFER,null),W=!1;else if(we.__webglFramebuffer===void 0)ze.setupRenderTarget(R);else if(we.__hasExternalTextures)ze.rebindTextures(R,de.get(R.texture).__webglTexture,de.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Ne=R.depthTexture;if(we.__boundDepthTexture!==Ne){if(Ne!==null&&de.has(Ne)&&(R.width!==Ne.image.width||R.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ze.setupDepthRenderbuffer(R)}}const Oe=R.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(ye=!0);const Ve=de.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Ve[F])?B=Ve[F][G]:B=Ve[F],se=!0):R.samples>0&&ze.useMultisampledRTT(R)===!1?B=de.get(R).__webglMultisampledFramebuffer:Array.isArray(Ve)?B=Ve[G]:B=Ve,C.copy(R.viewport),D.copy(R.scissor),U=R.scissorTest}else C.copy(ee).multiplyScalar(z).floor(),D.copy(Me).multiplyScalar(z).floor(),U=K;if(G!==0&&(B=xf),Z.bindFramebuffer(I.FRAMEBUFFER,B)&&W&&Z.drawBuffers(R,B),Z.viewport(C),Z.scissor(D),Z.setScissorTest(U),se){const we=de.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+F,we.__webglTexture,G)}else if(ye){const we=F;for(let Oe=0;Oe<R.textures.length;Oe++){const Ve=de.get(R.textures[Oe]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Oe,Ve.__webglTexture,G,we)}}else if(R!==null&&G!==0){const we=de.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,we.__webglTexture,G)}b=-1},this.readRenderTargetPixels=function(R,F,G,W,B,se,ye,Re=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=de.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ye!==void 0&&(we=we[ye]),we){Z.bindFramebuffer(I.FRAMEBUFFER,we);try{const Oe=R.textures[Re],Ve=Oe.format,Ne=Oe.type;if(!ue.textureFormatReadable(Ve)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ue.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=R.width-W&&G>=0&&G<=R.height-B&&(R.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Re),I.readPixels(F,G,W,B,Ie.convert(Ve),Ie.convert(Ne),se))}finally{const Oe=L!==null?de.get(L).__webglFramebuffer:null;Z.bindFramebuffer(I.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(R,F,G,W,B,se,ye,Re=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=de.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ye!==void 0&&(we=we[ye]),we)if(F>=0&&F<=R.width-W&&G>=0&&G<=R.height-B){Z.bindFramebuffer(I.FRAMEBUFFER,we);const Oe=R.textures[Re],Ve=Oe.format,Ne=Oe.type;if(!ue.textureFormatReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ue.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $e=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,$e),I.bufferData(I.PIXEL_PACK_BUFFER,se.byteLength,I.STREAM_READ),R.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Re),I.readPixels(F,G,W,B,Ie.convert(Ve),Ie.convert(Ne),0);const gt=L!==null?de.get(L).__webglFramebuffer:null;Z.bindFramebuffer(I.FRAMEBUFFER,gt);const Ct=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await yp(I,Ct,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,$e),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,se),I.deleteBuffer($e),I.deleteSync(Ct),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,F=null,G=0){const W=Math.pow(2,-G),B=Math.floor(R.image.width*W),se=Math.floor(R.image.height*W),ye=F!==null?F.x:0,Re=F!==null?F.y:0;ze.setTexture2D(R,0),I.copyTexSubImage2D(I.TEXTURE_2D,G,0,0,ye,Re,B,se),Z.unbindTexture()};const yf=I.createFramebuffer(),_f=I.createFramebuffer();this.copyTextureToTexture=function(R,F,G=null,W=null,B=0,se=null){se===null&&(B!==0?(Br("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),se=B,B=0):se=0);let ye,Re,we,Oe,Ve,Ne,$e,gt,Ct;const St=R.isCompressedTexture?R.mipmaps[se]:R.image;if(G!==null)ye=G.max.x-G.min.x,Re=G.max.y-G.min.y,we=G.isBox3?G.max.z-G.min.z:1,Oe=G.min.x,Ve=G.min.y,Ne=G.isBox3?G.min.z:0;else{const En=Math.pow(2,-B);ye=Math.floor(St.width*En),Re=Math.floor(St.height*En),R.isDataArrayTexture?we=St.depth:R.isData3DTexture?we=Math.floor(St.depth*En):we=1,Oe=0,Ve=0,Ne=0}W!==null?($e=W.x,gt=W.y,Ct=W.z):($e=0,gt=0,Ct=0);const xt=Ie.convert(F.format),ke=Ie.convert(F.type);let At;F.isData3DTexture?(ze.setTexture3D(F,0),At=I.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(ze.setTexture2DArray(F,0),At=I.TEXTURE_2D_ARRAY):(ze.setTexture2D(F,0),At=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,F.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,F.unpackAlignment);const ot=I.getParameter(I.UNPACK_ROW_LENGTH),pn=I.getParameter(I.UNPACK_IMAGE_HEIGHT),ps=I.getParameter(I.UNPACK_SKIP_PIXELS),mn=I.getParameter(I.UNPACK_SKIP_ROWS),nr=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,St.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,St.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Oe),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ve),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ne);const Rt=R.isDataArrayTexture||R.isData3DTexture,Tn=F.isDataArrayTexture||F.isData3DTexture;if(R.isDepthTexture){const En=de.get(R),Qt=de.get(F),on=de.get(En.__renderTarget),ga=de.get(Qt.__renderTarget);Z.bindFramebuffer(I.READ_FRAMEBUFFER,on.__webglFramebuffer),Z.bindFramebuffer(I.DRAW_FRAMEBUFFER,ga.__webglFramebuffer);for(let ki=0;ki<we;ki++)Rt&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,de.get(R).__webglTexture,B,Ne+ki),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,de.get(F).__webglTexture,se,Ct+ki)),I.blitFramebuffer(Oe,Ve,ye,Re,$e,gt,ye,Re,I.DEPTH_BUFFER_BIT,I.NEAREST);Z.bindFramebuffer(I.READ_FRAMEBUFFER,null),Z.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(B!==0||R.isRenderTargetTexture||de.has(R)){const En=de.get(R),Qt=de.get(F);Z.bindFramebuffer(I.READ_FRAMEBUFFER,yf),Z.bindFramebuffer(I.DRAW_FRAMEBUFFER,_f);for(let on=0;on<we;on++)Rt?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,En.__webglTexture,B,Ne+on):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,En.__webglTexture,B),Tn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Qt.__webglTexture,se,Ct+on):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Qt.__webglTexture,se),B!==0?I.blitFramebuffer(Oe,Ve,ye,Re,$e,gt,ye,Re,I.COLOR_BUFFER_BIT,I.NEAREST):Tn?I.copyTexSubImage3D(At,se,$e,gt,Ct+on,Oe,Ve,ye,Re):I.copyTexSubImage2D(At,se,$e,gt,Oe,Ve,ye,Re);Z.bindFramebuffer(I.READ_FRAMEBUFFER,null),Z.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Tn?R.isDataTexture||R.isData3DTexture?I.texSubImage3D(At,se,$e,gt,Ct,ye,Re,we,xt,ke,St.data):F.isCompressedArrayTexture?I.compressedTexSubImage3D(At,se,$e,gt,Ct,ye,Re,we,xt,St.data):I.texSubImage3D(At,se,$e,gt,Ct,ye,Re,we,xt,ke,St):R.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,se,$e,gt,ye,Re,xt,ke,St.data):R.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,se,$e,gt,St.width,St.height,xt,St.data):I.texSubImage2D(I.TEXTURE_2D,se,$e,gt,ye,Re,xt,ke,St);I.pixelStorei(I.UNPACK_ROW_LENGTH,ot),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,pn),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ps),I.pixelStorei(I.UNPACK_SKIP_ROWS,mn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,nr),se===0&&F.generateMipmaps&&I.generateMipmap(At),Z.unbindTexture()},this.initRenderTarget=function(R){de.get(R).__webglFramebuffer===void 0&&ze.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?ze.setTextureCube(R,0):R.isData3DTexture?ze.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?ze.setTexture2DArray(R,0):ze.setTexture2D(R,0),Z.unbindTexture()},this.resetState=function(){S=0,E=0,L=null,Z.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=nt._getUnpackColorSpace()}}class x1{#o=new Map;on(e,t){return this.#o.has(e)||this.#o.set(e,new Set),this.#o.get(e).add(t),()=>this.off(e,t)}once(e,t){const n=this.on(e,(...i)=>{n(),t(...i)});return n}off(e,t){this.#o.get(e)?.delete(t)}emit(e,t){const n=this.#o.get(e);if(n)for(const i of[...n])try{i(t)}catch(s){console.error(`[EventBus] "${e}" handler failed`,s)}}clear(){this.#o.clear()}}class Kl{constructor(e=2654435769){this.seed=e>>>0,this._s=this.seed}next(){this._s=this._s+1831565813>>>0;let e=this._s;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}range(e,t){return e+(t-e)*this.next()}int(e,t){return Math.floor(this.range(e,t+1))}pick(e){return e[Math.floor(this.next()*e.length)]}sign(){return this.next()<.5?-1:1}fork(e=1){return new Kl((this._s^Math.imul(e,2246822507))>>>0)}reset(){this._s=this.seed}}const xu={accel:["KeyW","ArrowUp","KeyZ"],brake:["KeyS","ArrowDown"],left:["KeyA","ArrowLeft"],right:["KeyD","ArrowRight"],drift:["ShiftLeft","ShiftRight","Space"],item:["KeyE","ControlLeft","Enter"],look:["KeyQ"],pause:["Escape","KeyP"]};class y1{constructor(e=window){this.target=e,this.keys=new Set,this.gamepadIndex=null,this.touch={steer:0,accel:0,brake:0,drift:!1,item:!1,active:!1},this.enabled=!0,this.state={accel:0,brake:0,steer:0,drift:!1,item:!1,look:0,pause:!1,pressed:{drift:!1,item:!1,pause:!1},source:"keyboard"},this._prev={drift:!1,item:!1,pause:!1},this._scripted=null,this._onKeyDown=t=>{this.enabled&&(t.repeat||(this.keys.add(t.code),Object.values(xu).some(n=>n.includes(t.code))&&t.preventDefault()))},this._onKeyUp=t=>{this.keys.delete(t.code)},this._onBlur=()=>this.keys.clear(),this._onGamepad=t=>{this.gamepadIndex=t.gamepad.index},e.addEventListener("keydown",this._onKeyDown,{passive:!1}),e.addEventListener("keyup",this._onKeyUp),e.addEventListener("blur",this._onBlur),e.addEventListener("gamepadconnected",this._onGamepad)}setScripted(e){this._scripted=e}_held(e){return xu[e].some(t=>this.keys.has(t))}update(e){const t=this.state;if(this._scripted)Object.assign(t,{accel:0,brake:0,steer:0,drift:!1,item:!1,look:0},this._scripted(e)||{}),t.source="script";else{let n=this._held("accel")?1:0,i=this._held("brake")?1:0,s=(this._held("right")?1:0)-(this._held("left")?1:0),o=this._held("drift"),a=this._held("item"),c=this._held("look")?1:0,l="keyboard";const h=this._pad();if(h){const d=(v=>Math.abs(v)<.18?0:(v-Math.sign(v)*.18)/.82)(h.axes[0]??0),f=Math.max(h.buttons[7]?.value??0,h.buttons[0]?.pressed?1:0),p=Math.max(h.buttons[6]?.value??0,h.buttons[1]?.pressed?1:0);(f||p||Math.abs(d)>0||h.buttons[5]?.pressed)&&(l="gamepad"),n=Math.max(n,f),i=Math.max(i,p),Math.abs(d)>Math.abs(s)&&(s=d),o=o||!!(h.buttons[5]?.pressed||h.buttons[4]?.pressed),a=a||!!(h.buttons[2]?.pressed||h.buttons[3]?.pressed),c=Math.max(c,h.buttons[11]?.pressed?1:0)}this.touch.active&&(l="touch",n=Math.max(n,this.touch.accel),i=Math.max(i,this.touch.brake),Math.abs(this.touch.steer)>Math.abs(s)&&(s=this.touch.steer),o=o||this.touch.drift,a=a||this.touch.item),t.accel=n,t.brake=i,t.steer=Math.max(-1,Math.min(1,s)),t.drift=o,t.item=a,t.look=c,t.source=l,t.pause=this._held("pause")}return t.pressed.drift=t.drift&&!this._prev.drift,t.pressed.item=t.item&&!this._prev.item,t.pressed.pause=t.pause&&!this._prev.pause,this._prev.drift=t.drift,this._prev.item=t.item,this._prev.pause=t.pause,t}_pad(){if(typeof navigator>"u"||!navigator.getGamepads)return null;const e=navigator.getGamepads();if(this.gamepadIndex!=null&&e[this.gamepadIndex])return e[this.gamepadIndex];for(const t of e)if(t&&t.connected)return this.gamepadIndex=t.index,t;return null}dispose(){this.target.removeEventListener("keydown",this._onKeyDown),this.target.removeEventListener("keyup",this._onKeyUp),this.target.removeEventListener("blur",this._onBlur),this.target.removeEventListener("gamepadconnected",this._onGamepad)}}const Gi=1/120,yu=8;class _1{constructor(e,t={}){this.canvas=e,this.opts=t,this.systems=[],this.running=!1,this._acc=0,this._last=0,this._raf=0,this.ctx={game:this,canvas:e,scene:new Wd,camera:new nn(62,16/9,.1,4e3),renderer:null,composer:null,world:null,karts:[],player:null,events:new x1,rng:new Kl(t.seed??1337),input:new y1,assets:null,time:{t:0,dt:0,frame:0,scale:1},race:{state:"idle",lap:1,totalLaps:3,countdown:3,timeMs:0},quality:t.quality??"high",debug:{enabled:!1,freeze:!1},viewport:{w:1,h:1,dpr:1}}}add(e){return this.systems.push(e),this.systems.sort((t,n)=>(t.order??100)-(n.order??100)),e}get(e){return this.systems.find(t=>t.name===e)}async init(){for(const e of this.systems)e.init&&await e.init(this.ctx);return this.resize(),window.addEventListener("resize",this._onResize=()=>this.resize()),this}resize(){const e=Math.min(window.devicePixelRatio||1,this.opts.maxDpr??2),t=this.canvas.clientWidth||window.innerWidth,n=this.canvas.clientHeight||window.innerHeight;Object.assign(this.ctx.viewport,{w:t,h:n,dpr:e}),this.ctx.camera.aspect=t/n,this.ctx.camera.updateProjectionMatrix();for(const i of this.systems)i.resize?.(t,n,this.ctx)}start(){if(this.running)return;this.running=!0,this._last=performance.now();const e=t=>{this._raf=requestAnimationFrame(e),this.frame((t-this._last)/1e3),this._last=t};this._raf=requestAnimationFrame(e)}stop(){this.running=!1,cancelAnimationFrame(this._raf)}frame(e){const t=this.ctx,n=Math.min(e,.25)*t.time.scale;t.input.update(t.time.t),this._acc+=n;let i=0;for(;this._acc>=Gi&&i<yu;)t.debug.freeze||this.step(Gi),this._acc-=Gi,i++;i===yu&&(this._acc=0);const s=this._acc/Gi;t.time.dt=n,t.time.frame++;for(const o of this.systems)o.lateUpdate?.(n,t);for(const o of this.systems)o.render?.(s,t)}step(e){const t=this.ctx;t.time.t+=e;for(const n of this.systems)n.update?.(e,t)}simulate(e){const t=Math.round(e/Gi),n=2,i=Gi*n,s=this.ctx;for(let o=0;o<t;o++)if(s.input.update(s.time.t),this.step(Gi),(o+1)%n===0){s.time.dt=i,s.time.frame++;for(const a of this.systems)a.lateUpdate?.(i,s)}}renderOnce(){for(const e of this.systems)e.render?.(0,this.ctx)}dispose(){this.stop(),window.removeEventListener("resize",this._onResize);for(const e of[...this.systems].reverse())e.dispose?.();this.ctx.input.dispose(),this.ctx.events.clear(),this.systems.length=0}}const Cr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class ei{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const M1=new ua(-1,1,1,-1,0,1);class b1 extends Et{constructor(){super(),this.setAttribute("position",new ut([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ut([0,2,0,0,2,0],2))}}const S1=new b1;class Ui{constructor(e){this._mesh=new tt(S1,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,M1)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class w1 extends ei{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof vt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=vi.clone(e.uniforms),this.material=new vt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ui(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class _u extends ei{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class T1 extends ei{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class E1{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ve);this._width=n.width,this._height=n.height,t=new qt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:rn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new w1(Cr),this.copyPass.material.blending=pi,this.clock=new Tm}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}_u!==void 0&&(o instanceof _u?n=!0:o instanceof T1&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ve);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class A1 extends ei{constructor(e,t=1){super();const n=Cr;this.map=e,this.opacity=t,this.needsSwap=!1,this.uniforms=vi.clone(n.uniforms),this.material=new vt({uniforms:this.uniforms,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,depthTest:!1,depthWrite:!1,premultipliedAlpha:!0}),this._fsQuad=new Ui(null)}render(e,t,n){const i=e.autoClear;e.autoClear=!1,this._fsQuad.material=this.material,this.uniforms.opacity.value=this.opacity,this.uniforms.tDiffuse.value=this.map,this.material.transparent=this.opacity<1,e.setRenderTarget(this.renderToScreen?null:n),this.clear&&e.clear(),this._fsQuad.render(e),e.autoClear=i}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const R1={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new he(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Zs extends ei{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new ve(e.x,e.y):new ve(256,256),this.clearColor=new he(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new qt(s,o,{type:rn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new qt(s,o,{type:rn});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const d=new qt(s,o,{type:rn});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),s=Math.round(s/2),o=Math.round(o/2)}const a=R1;this.highPassUniforms=vi.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new vt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ve(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=vi.clone(Cr.uniforms),this.blendMaterial=new vt({uniforms:this.copyUniforms,vertexShader:Cr.vertexShader,fragmentShader:Cr.fragmentShader,blending:Ir,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new he,this._oldClearAlpha=1,this._basic=new Qn,this._fsQuad=new Ui(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new ve(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=Zs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Zs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new vt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ve(.5,.5)},direction:{value:new ve(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new vt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Zs.BlurDirectionX=new ve(1,0);Zs.BlurDirectionY=new ve(0,1);const So={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new ve(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},wo={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new ve(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},tc={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new ve(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`};class C1 extends ei{constructor(){super(),this._edgesRT=new qt(1,1,{depthBuffer:!1,type:rn}),this._edgesRT.texture.name="SMAAPass.edges",this._weightsRT=new qt(1,1,{depthBuffer:!1,type:rn}),this._weightsRT.texture.name="SMAAPass.weights";const e=this,t=new Image;t.src=this._getAreaTexture(),t.onload=function(){e._areaTexture.needsUpdate=!0},this._areaTexture=new Dt,this._areaTexture.name="SMAAPass.area",this._areaTexture.image=t,this._areaTexture.minFilter=Bt,this._areaTexture.generateMipmaps=!1,this._areaTexture.flipY=!1;const n=new Image;n.src=this._getSearchTexture(),n.onload=function(){e._searchTexture.needsUpdate=!0},this._searchTexture=new Dt,this._searchTexture.name="SMAAPass.search",this._searchTexture.image=n,this._searchTexture.magFilter=Xt,this._searchTexture.minFilter=Xt,this._searchTexture.generateMipmaps=!1,this._searchTexture.flipY=!1,this._uniformsEdges=vi.clone(So.uniforms),this._materialEdges=new vt({defines:Object.assign({},So.defines),uniforms:this._uniformsEdges,vertexShader:So.vertexShader,fragmentShader:So.fragmentShader}),this._uniformsWeights=vi.clone(wo.uniforms),this._uniformsWeights.tDiffuse.value=this._edgesRT.texture,this._uniformsWeights.tArea.value=this._areaTexture,this._uniformsWeights.tSearch.value=this._searchTexture,this._materialWeights=new vt({defines:Object.assign({},wo.defines),uniforms:this._uniformsWeights,vertexShader:wo.vertexShader,fragmentShader:wo.fragmentShader}),this._uniformsBlend=vi.clone(tc.uniforms),this._uniformsBlend.tDiffuse.value=this._weightsRT.texture,this._materialBlend=new vt({uniforms:this._uniformsBlend,vertexShader:tc.vertexShader,fragmentShader:tc.fragmentShader}),this._fsQuad=new Ui(null)}render(e,t,n){this._uniformsEdges.tDiffuse.value=n.texture,this._fsQuad.material=this._materialEdges,e.setRenderTarget(this._edgesRT),this.clear&&e.clear(),this._fsQuad.render(e),this._fsQuad.material=this._materialWeights,e.setRenderTarget(this._weightsRT),this.clear&&e.clear(),this._fsQuad.render(e),this._uniformsBlend.tColor.value=n.texture,this._fsQuad.material=this._materialBlend,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._fsQuad.render(e))}setSize(e,t){this._edgesRT.setSize(e,t),this._weightsRT.setSize(e,t),this._materialEdges.uniforms.resolution.value.set(1/e,1/t),this._materialWeights.uniforms.resolution.value.set(1/e,1/t),this._materialBlend.uniforms.resolution.value.set(1/e,1/t)}dispose(){this._edgesRT.dispose(),this._weightsRT.dispose(),this._areaTexture.dispose(),this._searchTexture.dispose(),this._materialEdges.dispose(),this._materialWeights.dispose(),this._materialBlend.dispose(),this._fsQuad.dispose()}_getAreaTexture(){return"data:image/png;base64,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"}_getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}}const To={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class L1 extends ei{constructor(){super(),this.uniforms=vi.clone(To.uniforms),this.material=new $p({name:To.name,uniforms:this.uniforms,vertexShader:To.vertexShader,fragmentShader:To.fragmentShader}),this._fsQuad=new Ui(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},nt.getTransfer(this._outputColorSpace)===dt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===md?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===gd?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===vd?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===xd?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===El?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===_d?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===yd&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const nc=new pe;class fa{constructor(e){e=e||{},this.zNear=e.webGL===!0?-1:0,this.vertices={near:[new T,new T,new T,new T],far:[new T,new T,new T,new T]},e.projectionMatrix!==void 0&&this.setFromProjectionMatrix(e.projectionMatrix,e.maxFar||1e4)}setFromProjectionMatrix(e,t){const n=this.zNear,i=e.elements[11]===0;return nc.copy(e).invert(),this.vertices.near[0].set(1,1,n),this.vertices.near[1].set(1,-1,n),this.vertices.near[2].set(-1,-1,n),this.vertices.near[3].set(-1,1,n),this.vertices.near.forEach(function(s){s.applyMatrix4(nc)}),this.vertices.far[0].set(1,1,1),this.vertices.far[1].set(1,-1,1),this.vertices.far[2].set(-1,-1,1),this.vertices.far[3].set(-1,1,1),this.vertices.far.forEach(function(s){s.applyMatrix4(nc);const o=Math.abs(s.z);i?s.z*=Math.min(t/o,1):s.multiplyScalar(Math.min(t/o,1))}),this.vertices}split(e,t){for(;e.length>t.length;)t.push(new fa);t.length=e.length;for(let n=0;n<e.length;n++){const i=t[n];if(n===0)for(let s=0;s<4;s++)i.vertices.near[s].copy(this.vertices.near[s]);else for(let s=0;s<4;s++)i.vertices.near[s].lerpVectors(this.vertices.near[s],this.vertices.far[s],e[n-1]);if(n===e.length-1)for(let s=0;s<4;s++)i.vertices.far[s].copy(this.vertices.far[s]);else for(let s=0;s<4;s++)i.vertices.far[s].lerpVectors(this.vertices.near[s],this.vertices.far[s],e[n])}}toSpace(e,t){for(let n=0;n<4;n++)t.vertices.near[n].copy(this.vertices.near[n]).applyMatrix4(e),t.vertices.far[n].copy(this.vertices.far[n]).applyMatrix4(e)}}const Mu={lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

vec3 geometryClearcoatNormal = vec3( 0.0 );

#ifdef USE_CLEARCOAT

	geometryClearcoatNormal = clearcoatNormal;

#endif

#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		// Iridescence F0 approximation
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointLightInfo( pointLight, geometryPosition, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;

		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;
 	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;

	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

		getSpotLightInfo( spotLight, geometryPosition, directLight );

  		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;

		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct ) && defined( USE_CSM ) && defined( CSM_CASCADES )

	DirectionalLight directionalLight;
	float linearDepth = (vViewPosition.z) / (shadowFar - cameraNear);
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#if defined( USE_SHADOWMAP ) && defined( CSM_FADE )
		vec2 cascade;
		float cascadeCenter;
		float closestEdge;
		float margin;
		float csmx;
		float csmy;

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

			directionalLight = directionalLights[ i ];
			getDirectionalLightInfo( directionalLight, directLight );

			#if ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
				// NOTE: Depth gets larger away from the camera.
				// cascade.x is closer, cascade.y is further
				cascade = CSM_cascades[ i ];
				cascadeCenter = ( cascade.x + cascade.y ) / 2.0;
				closestEdge = linearDepth < cascadeCenter ? cascade.x : cascade.y;
				margin = 0.25 * pow( closestEdge, 2.0 );
				csmx = cascade.x - margin / 2.0;
				csmy = cascade.y + margin / 2.0;
				if( linearDepth >= csmx && ( linearDepth < csmy || UNROLLED_LOOP_INDEX == CSM_CASCADES - 1 ) ) {

					float dist = min( linearDepth - csmx, csmy - linearDepth );
					float ratio = clamp( dist / margin, 0.0, 1.0 );

					vec3 prevColor = directLight.color;
					directionalLightShadow = directionalLightShadows[ i ];
					directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

					bool shouldFadeLastCascade = UNROLLED_LOOP_INDEX == CSM_CASCADES - 1 && linearDepth > cascadeCenter;
					directLight.color = mix( prevColor, directLight.color, shouldFadeLastCascade ? ratio : 1.0 );

					ReflectedLight prevLight = reflectedLight;
					RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

					bool shouldBlend = UNROLLED_LOOP_INDEX != CSM_CASCADES - 1 || UNROLLED_LOOP_INDEX == CSM_CASCADES - 1 && linearDepth < cascadeCenter;
					float blendRatio = shouldBlend ? ratio : 1.0;

					reflectedLight.directDiffuse = mix( prevLight.directDiffuse, reflectedLight.directDiffuse, blendRatio );
					reflectedLight.directSpecular = mix( prevLight.directSpecular, reflectedLight.directSpecular, blendRatio );
					reflectedLight.indirectDiffuse = mix( prevLight.indirectDiffuse, reflectedLight.indirectDiffuse, blendRatio );
					reflectedLight.indirectSpecular = mix( prevLight.indirectSpecular, reflectedLight.indirectSpecular, blendRatio );

				}
			#endif

		}
		#pragma unroll_loop_end
	#elif defined (USE_SHADOWMAP)

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

			directionalLight = directionalLights[ i ];
			getDirectionalLightInfo( directionalLight, directLight );

			#if ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )

				directionalLightShadow = directionalLightShadows[ i ];
				if(linearDepth >= CSM_cascades[UNROLLED_LOOP_INDEX].x && linearDepth < CSM_cascades[UNROLLED_LOOP_INDEX].y) directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

				if(linearDepth >= CSM_cascades[UNROLLED_LOOP_INDEX].x && (linearDepth < CSM_cascades[UNROLLED_LOOP_INDEX].y || UNROLLED_LOOP_INDEX == CSM_CASCADES - 1)) RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

			#endif

		}
		#pragma unroll_loop_end

	#elif ( NUM_DIR_LIGHT_SHADOWS > 0 )
		// note: no loop here - all CSM lights are in fact one light only
		getDirectionalLightInfo( directionalLights[0], directLight );
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	#endif

	#if ( NUM_DIR_LIGHTS > NUM_DIR_LIGHT_SHADOWS)
		// compute the lights not casting shadows (if any)

		#pragma unroll_loop_start
		for ( int i = NUM_DIR_LIGHT_SHADOWS; i < NUM_DIR_LIGHTS; i ++ ) {

			directionalLight = directionalLights[ i ];

			getDirectionalLightInfo( directionalLight, directLight );

			RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

		}
		#pragma unroll_loop_end

	#endif

#endif


#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct ) && !defined( USE_CSM ) && !defined( CSM_CASCADES )

	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalLightInfo( directionalLight, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

	vec3 iblIrradiance = vec3( 0.0 );

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	#if defined( USE_LIGHT_PROBES )

		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );

	#endif

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );

		}
		#pragma unroll_loop_end

	#endif

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`,lights_pars_begin:`
#if defined( USE_CSM ) && defined( CSM_CASCADES )
uniform vec2 CSM_cascades[CSM_CASCADES];
uniform float cameraNear;
uniform float shadowFar;
#endif
	`+We.lights_pars_begin},bu=new pe,ic=new fa({webGL:!0}),li=new T,ur=new Vn,sc=[],rc=[],oc=new pe,Su=new pe,P1=new T(0,1,0);class D1{constructor(e){this.camera=e.camera,this.parent=e.parent,this.cascades=e.cascades||3,this.maxFar=e.maxFar||1e5,this.mode=e.mode||"practical",this.shadowMapSize=e.shadowMapSize||2048,this.shadowBias=e.shadowBias||1e-6,this.lightDirection=e.lightDirection||new T(1,-1,1).normalize(),this.lightIntensity=e.lightIntensity||3,this.lightNear=e.lightNear||1,this.lightFar=e.lightFar||2e3,this.lightMargin=e.lightMargin||200,this.customSplitsCallback=e.customSplitsCallback,this.fade=!1,this.mainFrustum=new fa({webGL:!0}),this.frustums=[],this.breaks=[],this.lights=[],this.shaders=new Map,this._createLights(),this.updateFrustums(),this._injectInclude()}_createLights(){for(let e=0;e<this.cascades;e++){const t=new Ar(16777215,this.lightIntensity);t.castShadow=!0,t.shadow.mapSize.width=this.shadowMapSize,t.shadow.mapSize.height=this.shadowMapSize,t.shadow.camera.near=this.lightNear,t.shadow.camera.far=this.lightFar,t.shadow.bias=this.shadowBias,this.parent.add(t),this.parent.add(t.target),this.lights.push(t)}}_initCascades(){const e=this.camera;e.updateProjectionMatrix(),this.mainFrustum.setFromProjectionMatrix(e.projectionMatrix,this.maxFar),this.mainFrustum.split(this.breaks,this.frustums)}_updateShadowBounds(){const e=this.frustums;for(let t=0;t<e.length;t++){const i=this.lights[t].shadow.camera,s=this.frustums[t],o=s.vertices.near,a=s.vertices.far,c=a[0];let l;c.distanceTo(a[2])>c.distanceTo(o[2])?l=a[2]:l=o[2];let h=c.distanceTo(l);if(this.fade){const u=this.camera,d=Math.max(u.far,this.maxFar),f=s.vertices.far[0].z/(d-u.near),p=.25*Math.pow(f,2)*(d-u.near);h+=p}i.left=-h/2,i.right=h/2,i.top=h/2,i.bottom=-h/2,i.updateProjectionMatrix()}}_getBreaks(){const e=this.camera,t=Math.min(e.far,this.maxFar);switch(this.breaks.length=0,this.mode){case"uniform":n(this.cascades,e.near,t,this.breaks);break;case"logarithmic":i(this.cascades,e.near,t,this.breaks);break;case"practical":s(this.cascades,e.near,t,.5,this.breaks);break;case"custom":this.customSplitsCallback===void 0&&console.error("CSM: Custom split scheme callback not defined."),this.customSplitsCallback(this.cascades,e.near,t,this.breaks);break}function n(o,a,c,l){for(let h=1;h<o;h++)l.push((a+(c-a)*h/o)/c);l.push(1)}function i(o,a,c,l){for(let h=1;h<o;h++)l.push(a*(c/a)**(h/o)/c);l.push(1)}function s(o,a,c,l,h){sc.length=0,rc.length=0,i(o,a,c,rc),n(o,a,c,sc);for(let u=1;u<o;u++)h.push(Qo.lerp(sc[u-1],rc[u-1],l));h.push(1)}}update(){const e=this.camera,t=this.frustums;oc.lookAt(new T,this.lightDirection,P1),Su.copy(oc).invert();for(let n=0;n<t.length;n++){const i=this.lights[n],s=i.shadow.camera,o=(s.right-s.left)/this.shadowMapSize,a=(s.top-s.bottom)/this.shadowMapSize;bu.multiplyMatrices(Su,e.matrixWorld),t[n].toSpace(bu,ic);const c=ic.vertices.near,l=ic.vertices.far;ur.makeEmpty();for(let h=0;h<4;h++)ur.expandByPoint(c[h]),ur.expandByPoint(l[h]);ur.getCenter(li),li.z=ur.max.z+this.lightMargin,li.x=Math.floor(li.x/o)*o,li.y=Math.floor(li.y/a)*a,li.applyMatrix4(oc),i.position.copy(li),i.target.position.copy(li),i.target.position.x+=this.lightDirection.x,i.target.position.y+=this.lightDirection.y,i.target.position.z+=this.lightDirection.z}}_injectInclude(){We.lights_fragment_begin=Mu.lights_fragment_begin,We.lights_pars_begin=Mu.lights_pars_begin}setupMaterial(e){e.defines=e.defines||{},e.defines.USE_CSM=1,e.defines.CSM_CASCADES=this.cascades,this.fade&&(e.defines.CSM_FADE="");const t=[],n=this,i=this.shaders;e.onBeforeCompile=function(s){const o=Math.min(n.camera.far,n.maxFar);n._getExtendedBreaks(t),s.uniforms.CSM_cascades={value:t},s.uniforms.cameraNear={value:n.camera.near},s.uniforms.shadowFar={value:o},i.set(e,s)},i.set(e,null)}_updateUniforms(){const e=Math.min(this.camera.far,this.maxFar);this.shaders.forEach(function(n,i){if(n!==null){const s=n.uniforms;this._getExtendedBreaks(s.CSM_cascades.value),s.cameraNear.value=this.camera.near,s.shadowFar.value=e}!this.fade&&"CSM_FADE"in i.defines?(delete i.defines.CSM_FADE,i.needsUpdate=!0):this.fade&&!("CSM_FADE"in i.defines)&&(i.defines.CSM_FADE="",i.needsUpdate=!0)},this)}_getExtendedBreaks(e){for(;e.length<this.breaks.length;)e.push(new ve);e.length=this.breaks.length;for(let t=0;t<this.cascades;t++){const n=this.breaks[t],i=this.breaks[t-1]||0;e[t].x=i,e[t].y=n}}updateFrustums(){this._getBreaks(),this._initCascades(),this._updateShadowBounds(),this._updateUniforms()}remove(){for(let e=0;e<this.lights.length;e++)this.parent.remove(this.lights[e].target),this.parent.remove(this.lights[e])}dispose(){const e=this.shaders;e.forEach(function(t,n){delete n.onBeforeCompile,delete n.defines.USE_CSM,delete n.defines.CSM_CASCADES,delete n.defines.CSM_FADE,t!==null&&(delete t.uniforms.CSM_cascades,delete t.uniforms.cameraNear,delete t.uniforms.shadowFar),n.needsUpdate=!0}),e.clear()}}const I1=300,U1=new Set(["MeshStandardMaterial","MeshPhysicalMaterial","MeshLambertMaterial","MeshPhongMaterial","MeshToonMaterial"]);class N1{constructor(e,t,n){if(this.scene=e,this.camera=t,this.cfg=n,this._seen=new WeakSet,this._sunDir=new T(0,-1,0),this.skyFill=new Ar(10473727,.55),this.skyFill.castShadow=!1,this.skyFill.name="RK.SkyFill",e.add(this.skyFill,this.skyFill.target),this.bounce=new Ar(12624497,.45),this.bounce.castShadow=!1,this.bounce.name="RK.GroundBounce",e.add(this.bounce,this.bounce.target),this.hemi=new gm(12376319,7043669,.1),e.add(this.hemi),n.shadows){this.csm=new D1({camera:t,parent:e,cascades:n.cascades,maxFar:I1,mode:"practical",shadowMapSize:n.shadowMapSize,shadowBias:-4e-4,lightIntensity:0,lightNear:1,lightFar:1200,lightMargin:160,lightDirection:new T(-1,-1,-1).normalize()}),this.csm.fade=!0;for(const i of this.csm.lights)i.shadow.normalBias=.035,i.shadow.bias=-4e-4,i.shadow.camera.updateProjectionMatrix();this.csm.updateFrustums()}else{this.sun=new Ar(16777215,3),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(n.shadowMapSize,n.shadowMapSize),this.sun.shadow.camera.near=1,this.sun.shadow.camera.far=500,this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=.05;const i=60;Object.assign(this.sun.shadow.camera,{left:-i,right:i,top:i,bottom:-i}),this.sun.shadow.camera.updateProjectionMatrix(),e.add(this.sun,this.sun.target)}}apply(e){if(this._sunDir.copy(e.sunDir).negate().normalize(),this.csm){this.csm.lightDirection.copy(this._sunDir);for(const n of this.csm.lights)n.color.copy(e.sunColor),n.intensity=e.sunIntensity}else this.sun&&(this.sun.color.copy(e.sunColor),this.sun.intensity=e.sunIntensity);this.skyFill.color.copy(e.fill.skyColor),this.skyFill.intensity=e.fill.skyIntensity,this.bounce.color.copy(e.fill.bounceColor),this.bounce.intensity=e.fill.bounceIntensity;const t=e.sunDir.clone().negate();t.y=Math.abs(t.y)*.35+.55,t.normalize(),this.skyFill.position.copy(t).multiplyScalar(120),this.skyFill.target.position.set(0,0,0),this.bounce.position.set(e.sunDir.x*40,-60,e.sunDir.z*40),this.bounce.target.position.set(0,0,0),this.invalidate()}update(e){const t=e.position;this._fillCached||(this._fillCached=!0,this._fillOffset=this.skyFill.position.clone(),this._bounceOffset=this.bounce.position.clone()),this.skyFill.position.copy(t).add(this._fillOffset),this.skyFill.target.position.copy(t),this.bounce.position.copy(t).add(this._bounceOffset),this.bounce.target.position.copy(t),this.skyFill.target.updateMatrixWorld(),this.bounce.target.updateMatrixWorld(),this.csm?this.csm.update():this.sun&&(this.sun.position.copy(t).addScaledVector(this._sunDir,-140),this.sun.target.position.copy(t),this.sun.target.updateMatrixWorld())}invalidate(){this._fillCached=!1}syncMaterials(e){if(!this.csm)return 0;let t=0;return e.traverse(n=>{const i=n.material;if(!i)return;const s=Array.isArray(i)?i:[i];for(const o of s){if(!o||this._seen.has(o)||(this._seen.add(o),!U1.has(o.type)))continue;const a=o.onBeforeCompile;this.csm.setupMaterial(o);const c=o.onBeforeCompile;a&&a!==zn.prototype.onBeforeCompile&&(o.onBeforeCompile=function(l,h){c.call(this,l,h),a.call(this,l,h)}),o.needsUpdate=!0,t++}}),t}dispose(){this.csm?.remove?.(),this.csm?.dispose?.()}}const k1=`
varying vec3 vDir;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vDir = wp.xyz - cameraPosition;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`,F1=`
precision highp float;

uniform vec3  uSunDir;
uniform vec3  uSunColor;
uniform float uSunDisc;
uniform float uSunDiscSize;
uniform float uSunHalo;

uniform vec3  uZenith;
uniform vec3  uMid;
uniform vec3  uHorizon;
uniform vec3  uGround;
uniform float uGradExp;
uniform float uHaze;

uniform sampler2D uNoise;
uniform float uTime;
uniform float uCloudCover;
uniform float uCloudScale;
uniform float uCloudSpeed;
uniform float uCloudOpacity;
uniform float uCirrus;
uniform vec3  uCloudLit;
uniform vec3  uCloudDark;
uniform float uCloudLayers;   // 0 = none, 1 = cumulus only, 2 = cumulus + cirrus

varying vec3 vDir;

float density(vec2 uv, vec2 w) {
  vec4 n0 = texture2D(uNoise, uv + w);
  vec4 n1 = texture2D(uNoise, uv * 2.61 + vec2(0.317, 0.719) + w * 1.9);
  // G = coverage band, R = mid band, B = erosion band
  float d = n0.g * 0.58 + n0.r * 0.26 + n1.b * 0.16;
  // weather cells break the deck up into islands instead of a uniform mush
  d *= 0.62 + 0.62 * n0.a;
  return d;
}

void main() {
  vec3 dir = normalize(vDir);
  float y = dir.y;
  float cosT = dot(dir, uSunDir);

  // ---- base gradient -------------------------------------------------------
  float a = pow(clamp(1.0 - max(y, 0.0), 0.0, 1.0), uGradExp);
  vec3 col = mix(uZenith, uMid, smoothstep(0.00, 0.62, a));
  col = mix(col, uHorizon, smoothstep(0.66, 1.00, a));

  // ---- atmospheric glow around the sun ------------------------------------
  float m0 = pow(max(cosT, 0.0), 6.0);
  float m1 = pow(max(cosT, 0.0), 48.0);
  float m2 = pow(max(cosT, 0.0), 900.0);
  col += uSunColor * (m0 * 0.085 + m1 * 0.30 + m2 * 0.85) * uSunHalo;

  // horizon haze band: thickens the join between sky and land
  col = mix(col, uHorizon, exp(-abs(y) * 11.0) * uHaze * 0.42);

  // ---- sun disc ------------------------------------------------------------
  float ang = acos(clamp(cosT, -1.0, 1.0));
  float disc = 1.0 - smoothstep(uSunDiscSize * 0.78, uSunDiscSize * 1.22, ang);
  col += uSunColor * disc * uSunDisc;

  // ---- cloud decks ---------------------------------------------------------
  if (uCloudLayers > 0.5 && y > 0.004) {
    vec2 plane = dir.xz / max(y, 0.045);
    float t = uTime * uCloudSpeed;

    // cumulus deck
    vec2 uv = plane * uCloudScale * 0.055;
    vec2 wind = vec2(t * 0.0022, t * 0.0011);
    float d = density(uv, wind);
    float cov = smoothstep(uCloudCover, uCloudCover + 0.20, d);

    if (cov > 0.001) {
      // fake self-shadowing: compare density against density a step toward the sun
      vec2 sunStep = normalize(uSunDir.xz + vec2(1e-4, 1e-4)) * 0.030;
      float dl = density(uv - sunStep, wind);
      float lit = clamp((d - dl) * 7.0 + 0.52, 0.0, 1.0);
      lit = mix(lit, 1.0, 0.22);

      vec3 cc = mix(uCloudDark, uCloudLit, lit);
      // silver lining where the deck thins out in front of the sun
      float rim = pow(max(cosT, 0.0), 9.0) * (1.0 - cov) * 1.6;
      cc += uSunColor * rim * 0.9;
      cc += uSunColor * pow(max(cosT, 0.0), 2.0) * 0.06;

      float fade = smoothstep(0.006, 0.14, y);
      col = mix(col, cc, cov * fade * uCloudOpacity);
    }

    // cirrus deck: higher, thinner, faster, stretched
    if (uCloudLayers > 1.5 && uCirrus > 0.001) {
      vec2 uv2 = plane * vec2(0.020, 0.055) * uCloudScale + vec2(t * 0.0009, 0.0);
      vec4 n = texture2D(uNoise, uv2);
      float c2 = smoothstep(0.52, 0.86, n.r * 0.6 + n.b * 0.4);
      float fade2 = smoothstep(0.02, 0.30, y);
      vec3 cirCol = mix(uCloudLit, uSunColor, pow(max(cosT, 0.0), 5.0) * 0.6);
      col = mix(col, cirCol, c2 * fade2 * uCirrus * 0.55);
    }
  }

  // ---- below the horizon ---------------------------------------------------
  col = mix(col, uGround, smoothstep(-0.005, -0.10, y));

  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
`;class O1{constructor(e){this.uniforms={uSunDir:{value:new T(0,1,0)},uSunColor:{value:new he(1,1,1)},uSunDisc:{value:30},uSunDiscSize:{value:.026},uSunHalo:{value:1},uZenith:{value:new he(1727144)},uMid:{value:new he(7448792)},uHorizon:{value:new he(16766624)},uGround:{value:new he(7039576)},uGradExp:{value:1.3},uHaze:{value:.7},uNoise:{value:e},uTime:{value:0},uCloudCover:{value:.46},uCloudScale:{value:.62},uCloudSpeed:{value:1},uCloudOpacity:{value:.97},uCirrus:{value:.42},uCloudLit:{value:new he(16773336)},uCloudDark:{value:new he(8358056)},uCloudLayers:{value:2}},this.material=new vt({name:"RK.Sky",uniforms:this.uniforms,vertexShader:k1,fragmentShader:F1,side:sn,depthWrite:!1,depthTest:!1,fog:!1}),this.mesh=new tt(new us(3e3,48,24),this.material),this.mesh.renderOrder=-1e3,this.mesh.frustumCulled=!1,this.mesh.name="RK.SkyDome",this.envMaterial=this.material.clone(),this.envMaterial.uniforms=this.uniforms,this.envMaterial.depthTest=!0,this.envMaterial.depthWrite=!0,this.envScene=new Wd,this.envMesh=new tt(new us(80,40,24),this.envMaterial),this.envMesh.frustumCulled=!1,this.envScene.add(this.envMesh)}apply(e,t=2){const n=this.uniforms;n.uSunDir.value.copy(e.sunDir),n.uSunColor.value.copy(e.sunColor),n.uSunDisc.value=e.sky.sunDisc,n.uSunDiscSize.value=e.sunDiscSize,n.uSunHalo.value=e.sky.sunHalo,n.uZenith.value.copy(e.sky.zenith),n.uMid.value.copy(e.sky.mid),n.uHorizon.value.copy(e.sky.horizon),n.uGround.value.copy(e.sky.ground),n.uGradExp.value=e.sky.gradExp,n.uHaze.value=e.sky.haze,n.uCloudCover.value=e.sky.cloudCover,n.uCloudScale.value=e.sky.cloudScale,n.uCloudSpeed.value=e.sky.cloudSpeed,n.uCloudOpacity.value=e.sky.cloudOpacity,n.uCirrus.value=e.sky.cirrus,n.uCloudLit.value.copy(e.sky.cloudLit),n.uCloudDark.value.copy(e.sky.cloudDark),n.uCloudLayers.value=t}setTime(e){this.uniforms.uTime.value=e}follow(e){this.mesh.position.copy(e.position)}dispose(){this.mesh.geometry.dispose(),this.envMesh.geometry.dispose(),this.material.dispose(),this.envMaterial.dispose()}}const wu=r=>r*r*(3-2*r);function B1(r,e){const t=new Float32Array(e*e);for(let n=0;n<e*e;n++)t[n]=r.next();return t}function z1(r,e,t,n){const i=t*e,s=n*e,o=Math.floor(i),a=Math.floor(s),c=wu(i-o),l=wu(s-a),h=(o%e+e)%e,u=((o+1)%e+e)%e,d=(a%e+e)%e,f=((a+1)%e+e)%e,p=r[d*e+h],v=r[d*e+u],g=r[f*e+h],m=r[f*e+u],M=p+(v-p)*c,x=g+(m-g)*c;return M+(x-M)*l}function H1(r,e=512){const n=[];for(let c=0;c<7;c++){const l=Math.max(3,Math.round(3*Math.pow(1.9,c)));n.push({n:l,g:B1(r,l)})}const i=[[2,4],[0,3],[3,4],[0,2]],s=new Uint8Array(e*e*4),o=1/e;for(let c=0;c<4;c++){const[l,h]=i[c];let u=0;for(let d=0;d<h;d++)u+=Math.pow(.55,d);for(let d=0;d<e;d++){const f=(d+.5)*o;for(let p=0;p<e;p++){const v=(p+.5)*o;let g=0,m=1;for(let M=0;M<h;M++){const x=n[Math.min(l+M,6)];g+=z1(x.g,x.n,v,f)*m,m*=.55}g/=u,s[(d*e+p)*4+c]=Math.max(0,Math.min(255,Math.round(g*255)))}}}const a=new la(s,e,e,Sn);return a.wrapS=a.wrapT=Lt,a.minFilter=un,a.magFilter=Bt,a.generateMipmaps=!0,a.anisotropy=4,a.colorSpace=Kn,a.needsUpdate=!0,a.name="rk-cloud-noise",a}const xn=r=>new he(r),qo={noon:{label:"meio-dia tropical",sun:{elevation:66,azimuth:34,color:16774882,intensity:3.35,discSize:.021},sky:{zenith:1466568,mid:6599918,horizon:14086399,ground:7309938,gradExp:1.55,haze:.45,sunHalo:.55,sunDisc:26,cloudCover:.5,cloudScale:.75,cloudSpeed:1,cloudOpacity:.95,cloudLit:16777215,cloudDark:10467020,cirrus:.3},fog:{color:12575223,sunColor:16773327,density:.0011,falloff:.03,groundY:-2,start:120,max:.72},fill:{skyColor:10473727,skyIntensity:.3,bounceColor:10338170,bounceIntensity:.24},env:{intensity:.78},exposure:1,grade:{saturation:1.2,contrast:1.1,sCurve:.3,blackPoint:.05,whitePoint:.94,lift:.008,shadowTint:2834283,highlightTint:16774109,tintAmount:.16,vignette:.24,grain:.006},bloom:{strength:.34,threshold:.82,radius:.58},godRays:.42},golden:{label:"tarde dourada",sun:{elevation:26,azimuth:-46,color:16766874,intensity:4.4,discSize:.026},sky:{zenith:1727144,mid:7448792,horizon:16766624,ground:7039576,gradExp:1.3,haze:.72,sunHalo:1.25,sunDisc:34,cloudCover:.46,cloudScale:.62,cloudSpeed:1,cloudOpacity:.97,cloudLit:16773336,cloudDark:8358056,cirrus:.42},fog:{color:11127270,sunColor:16765850,density:.0013,falloff:.03,groundY:-2,start:95,max:.76},fill:{skyColor:9420287,skyIntensity:.32,bounceColor:12624497,bounceIntensity:.28},env:{intensity:.8},exposure:1,grade:{saturation:1.24,contrast:1.12,sCurve:.34,blackPoint:.055,whitePoint:.93,lift:.01,shadowTint:2902662,highlightTint:16770749,tintAmount:.22,vignette:.26,grain:.007},bloom:{strength:.42,threshold:.8,radius:.62},godRays:.72},sunset:{label:"pôr do sol",sun:{elevation:6.5,azimuth:-84,color:16751183,intensity:3.2,discSize:.032},sky:{zenith:1912694,mid:9400232,horizon:16747078,ground:4865852,gradExp:1.1,haze:.95,sunHalo:1.85,sunDisc:28,cloudCover:.42,cloudScale:.55,cloudSpeed:.8,cloudOpacity:1,cloudLit:16757367,cloudDark:5064304,cirrus:.55},fog:{color:10127020,sunColor:16751704,density:.0021,falloff:.026,groundY:-2,start:70,max:.84},fill:{skyColor:8163032,skyIntensity:.38,bounceColor:12615760,bounceIntensity:.26},env:{intensity:.88},exposure:1.04,grade:{saturation:1.28,contrast:1.12,sCurve:.32,blackPoint:.055,whitePoint:.93,lift:.016,shadowTint:3356031,highlightTint:16764826,tintAmount:.3,vignette:.3,grain:.008},bloom:{strength:.52,threshold:.72,radius:.7},godRays:1.05}},ia="golden";function V1(r){const e=qo[r]??qo[ia],t=Qo.degToRad(e.sun.elevation),n=Qo.degToRad(e.sun.azimuth),i=new T(Math.cos(t)*Math.sin(n),Math.sin(t),Math.cos(t)*Math.cos(n)).normalize();return{name:qo[r]?r:ia,raw:e,sunDir:i,sunColor:xn(e.sun.color),sunIntensity:e.sun.intensity,sunDiscSize:e.sun.discSize,sky:{zenith:xn(e.sky.zenith),mid:xn(e.sky.mid),horizon:xn(e.sky.horizon),ground:xn(e.sky.ground),gradExp:e.sky.gradExp,haze:e.sky.haze,sunHalo:e.sky.sunHalo,sunDisc:e.sky.sunDisc,cloudCover:e.sky.cloudCover,cloudScale:e.sky.cloudScale,cloudSpeed:e.sky.cloudSpeed,cloudOpacity:e.sky.cloudOpacity,cirrus:e.sky.cirrus,cloudLit:xn(e.sky.cloudLit),cloudDark:xn(e.sky.cloudDark)},fog:{color:xn(e.fog.color),sunColor:xn(e.fog.sunColor),density:e.fog.density,falloff:e.fog.falloff,groundY:e.fog.groundY,start:e.fog.start??80,max:e.fog.max??.8},fill:{skyColor:xn(e.fill.skyColor),skyIntensity:e.fill.skyIntensity,bounceColor:xn(e.fill.bounceColor),bounceIntensity:e.fill.bounceIntensity},envIntensity:e.env.intensity,exposure:e.exposure,grade:{saturation:e.grade.saturation,contrast:e.grade.contrast,lift:e.grade.lift,sCurve:e.grade.sCurve,blackPoint:e.grade.blackPoint,whitePoint:e.grade.whitePoint,vignette:e.grade.vignette,grain:e.grade.grain,shadowTint:xn(e.grade.shadowTint),highlightTint:xn(e.grade.highlightTint),tintAmount:e.grade.tintAmount},bloom:{...e.bloom},godRays:e.godRays}}const Tu=Object.keys(qo),ac=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,sf=`
uniform mat4 uProjInv;
uniform mat4 uViewInv;
uniform float uNear;
uniform float uFar;

vec3 viewPosFromDepth(vec2 uv, float d) {
  vec4 ndc = vec4(uv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
  vec4 v = uProjInv * ndc;
  return v.xyz / v.w;
}
vec3 worldPosFromDepth(vec2 uv, float d) {
  return (uViewInv * vec4(viewPosFromDepth(uv, d), 1.0)).xyz;
}
`,G1=`
precision highp float;
varying vec2 vUv;
uniform sampler2D tDepth;
uniform mat4 uProj;
uniform vec2 uRes;
uniform float uRadius;
uniform float uBias;
uniform float uIntensity;
uniform float uPower;
${sf}

const float GOLDEN = 2.39996323;

float ign(vec2 p) {
  return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y));
}

void main() {
  float d = texture2D(tDepth, vUv).x;
  if (d >= 0.99995) { gl_FragColor = vec4(1.0); return; }

  vec3 P = viewPosFromDepth(vUv, d);
  vec3 N = normalize(cross(dFdx(P), dFdy(P)));
  if (dot(N, normalize(-P)) < 0.0) N = -N;

  float rot = ign(gl_FragCoord.xy) * 6.2831853;

  // Two nested radii out of one tap loop. The wide ring gives the broad ambient
  // darkening; the tight ring (a quarter of the radius) is what actually reads
  // as a *contact* shadow where a tyre meets tarmac, and it is the term that was
  // missing -- one radius sized for room-scale occlusion cannot resolve a 4 cm
  // gap. The tight ring is weighted higher because contact is what grounds the
  // object.
  float occW = 0.0, occT = 0.0;
  float nW = 0.0, nT = 0.0;

  for (int i = 0; i < AO_SAMPLES; i++) {
    float fi = (float(i) + 0.5) / float(AO_SAMPLES);
    float ang = rot + float(i) * GOLDEN;
    bool tight = (i - (i / 2) * 2) == 1;
    float R = tight ? uRadius * 0.25 : uRadius;
    float rad = sqrt(fi) * R;
    vec3 S = P + vec3(cos(ang), sin(ang), 0.0) * rad + N * R * 0.06;

    vec4 clip = uProj * vec4(S, 1.0);
    vec2 suv = clip.xy / clip.w * 0.5 + 0.5;
    if (suv.x < 0.0 || suv.x > 1.0 || suv.y < 0.0 || suv.y > 1.0) continue;

    float sd = texture2D(tDepth, suv).x;
    if (sd >= 0.99995) continue;
    vec3 Ps = viewPosFromDepth(suv, sd);

    vec3 v = Ps - P;
    float len = length(v);
    if (len < 1e-4) continue;
    float range = clamp(R / len, 0.0, 1.0);
    float o = max(0.0, dot(N, v / len) - uBias) * range * range;
    if (tight) { occT += o; nT += 1.0; } else { occW += o; nW += 1.0; }
  }

  float occ = occW / max(nW, 1.0) * 0.65 + occT / max(nT, 1.0) * 1.35;
  float ao = clamp(1.0 - occ * uIntensity, 0.0, 1.0);
  ao = pow(ao, uPower);

  // Fade AO out with distance: past ~60 m the half-res depth cannot resolve the
  // geometry any more and the term degenerates into shimmering noise.
  float vd = -P.z;
  ao = mix(ao, 1.0, smoothstep(45.0, 90.0, vd));

  gl_FragColor = vec4(ao, ao, ao, 1.0);
}
`,W1=`
precision highp float;
varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform vec2 uSunUv;
uniform float uDensity;
uniform float uDecay;

void main() {
  vec2 delta = (vUv - uSunUv) * (uDensity / float(SHAFT_STEPS));
  vec2 p = vUv;
  vec3 acc = vec3(0.0);
  float illum = 1.0;
  for (int i = 0; i < SHAFT_STEPS; i++) {
    p -= delta;
    vec2 cp = clamp(p, vec2(0.0), vec2(1.0));
    float d = texture2D(tDepth, cp).x;
    float sky = step(0.99995, d);
    acc += texture2D(tDiffuse, cp).rgb * sky * illum;
    illum *= uDecay;
  }
  gl_FragColor = vec4(acc / float(SHAFT_STEPS), 1.0);
}
`,X1=`
precision highp float;
varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform sampler2D tAo;
uniform sampler2D tShaft;
uniform vec2 uAoTexel;
uniform float uAoStrength;
uniform vec3 uCamPos;
uniform vec3 uSunDir;
uniform vec3 uFogColor;
uniform vec3 uFogSunColor;
uniform float uFogDensity;
uniform float uFogFalloff;
uniform float uFogGroundY;
uniform float uFogStart;
uniform float uFogMax;
uniform float uShaftIntensity;
uniform vec3 uShaftTint;
uniform float uSunOnScreen;
${sf}

/**
 * Analytic integral of an exponentially height-decaying medium along a ray.
 * (Inigo Quilez's formulation.) Far geometry therefore picks up the sky colour
 * gradually instead of stepping into a grey wall like FogExp2 does.
 */
float heightFog(vec3 ro, vec3 rd, float t) {
  float b = uFogFalloff;
  float h = ro.y - uFogGroundY;
  float denom = b * rd.y;
  float amount;
  if (abs(denom) < 1e-4) {
    amount = uFogDensity * exp(-b * h) * t;
  } else {
    amount = (uFogDensity / denom) * exp(-b * h) * (1.0 - exp(-denom * t));
  }
  return 1.0 - exp(-max(amount, 0.0));
}

void main() {
  vec3 col = texture2D(tDiffuse, vUv).rgb;
  float d = texture2D(tDepth, vUv).x;
  bool isSky = d >= 0.99995;

  #ifdef USE_AO
  if (!isSky) {
    vec2 t = uAoTexel;
    float ao =
      texture2D(tAo, vUv + vec2(-0.5, -0.5) * t).r +
      texture2D(tAo, vUv + vec2( 0.5, -0.5) * t).r +
      texture2D(tAo, vUv + vec2(-0.5,  0.5) * t).r +
      texture2D(tAo, vUv + vec2( 0.5,  0.5) * t).r;
    ao *= 0.25;
    col *= mix(1.0, ao, uAoStrength);
  }
  #endif

  if (!isSky) {
    vec3 wp = worldPosFromDepth(vUv, d);
    vec3 rd = wp - uCamPos;
    float dist = length(rd);
    rd /= max(dist, 1e-4);
    // Nothing inside uFogStart is fogged at all. Aerial perspective that starts
    // at the bumper is what turned the mid-field into milk; a hard clear zone
    // keeps the 0-80 m band -- the band the player actually reads -- crisp.
    float t = max(dist - uFogStart, 0.0);
    float f = heightFog(uCamPos, rd, t);
    // ...and it never fully dissolves the far field either, so distant scenery
    // keeps a silhouette instead of becoming a flat plate of sky colour.
    f = clamp(f, 0.0, 1.0) * uFogMax;
    float su = max(dot(rd, uSunDir), 0.0);
    vec3 fc = mix(uFogColor, uFogSunColor, pow(su, 5.0));
    col = mix(col, fc, f);
  }

  #ifdef USE_SHAFTS
  col += texture2D(tShaft, vUv).rgb * uShaftTint * (uShaftIntensity * uSunOnScreen);
  #endif

  gl_FragColor = vec4(col, 1.0);
}
`;class q1 extends ei{constructor(e,t){super(),this.camera=e,this.cfg={ao:!0,aoSamples:12,shafts:!0,shaftSteps:24,...t},this.needsSwap=!0,this.sceneTexture=null,this.depthTexture=null,this._size=new ve(1,1);const n={type:rn,depthBuffer:!1,stencilBuffer:!1};this.aoRT=new qt(1,1,n),this.aoRT.texture.name="RK.AO",this.shaftRT=new qt(1,1,n),this.shaftRT.texture.name="RK.Shafts",this.aoMaterial=new vt({name:"RK.AO",defines:{AO_SAMPLES:this.cfg.aoSamples},uniforms:{tDepth:{value:null},uProj:{value:new pe},uProjInv:{value:new pe},uViewInv:{value:new pe},uNear:{value:.1},uFar:{value:1e3},uRes:{value:new ve},uRadius:{value:1.5},uBias:{value:.02},uIntensity:{value:1.35},uPower:{value:1.6}},vertexShader:ac,fragmentShader:G1,depthTest:!1,depthWrite:!1}),this.shaftMaterial=new vt({name:"RK.Shafts",defines:{SHAFT_STEPS:this.cfg.shaftSteps},uniforms:{tDiffuse:{value:null},tDepth:{value:null},uSunUv:{value:new ve(.5,.5)},uDensity:{value:.9},uDecay:{value:.955}},vertexShader:ac,fragmentShader:W1,depthTest:!1,depthWrite:!1}),this.compositeMaterial=new vt({name:"RK.Atmosphere",defines:{},uniforms:{tDiffuse:{value:null},tDepth:{value:null},tAo:{value:this.aoRT.texture},tShaft:{value:this.shaftRT.texture},uAoTexel:{value:new ve},uAoStrength:{value:.95},uProjInv:{value:new pe},uViewInv:{value:new pe},uNear:{value:.1},uFar:{value:1e3},uCamPos:{value:new T},uSunDir:{value:new T(0,1,0)},uFogColor:{value:new he(11127270)},uFogSunColor:{value:new he(16765850)},uFogDensity:{value:.009},uFogFalloff:{value:.026},uFogGroundY:{value:-2},uFogStart:{value:90},uFogMax:{value:.82},uShaftIntensity:{value:.7},uShaftTint:{value:new he(16769200)},uSunOnScreen:{value:0}},vertexShader:ac,fragmentShader:X1,depthTest:!1,depthWrite:!1}),this._quad=new Ui(this.compositeMaterial),this._applyDefines()}_applyDefines(){const e=this.compositeMaterial.defines;delete e.USE_AO,delete e.USE_SHAFTS,this.cfg.ao&&(e.USE_AO=""),this.cfg.shafts&&(e.USE_SHAFTS=""),this.compositeMaterial.needsUpdate=!0}setEnabledEffects({ao:e,shafts:t}){e!==void 0&&(this.cfg.ao=e),t!==void 0&&(this.cfg.shafts=t),this._applyDefines()}setSize(e,t){this._size.set(e,t),this.aoRT.setSize(Math.max(1,Math.floor(e/2)),Math.max(1,Math.floor(t/2))),this.shaftRT.setSize(Math.max(1,Math.floor(e/4)),Math.max(1,Math.floor(t/4))),this.aoMaterial.uniforms.uRes.value.set(this.aoRT.width,this.aoRT.height),this.compositeMaterial.uniforms.uAoTexel.value.set(1/this.aoRT.width,1/this.aoRT.height)}sync(e,t,n,i){const s=this.compositeMaterial.uniforms,o=this.aoMaterial.uniforms;e.updateMatrixWorld();const a=e.projectionMatrixInverse;for(const c of[s,o])c.uProjInv.value.copy(a),c.uViewInv.value.copy(e.matrixWorld),c.uNear.value=e.near,c.uFar.value=e.far;o.uProj.value.copy(e.projectionMatrix),s.uCamPos.value.copy(e.position),s.uSunDir.value.copy(t.sunDir),s.uFogColor.value.copy(t.fog.color),s.uFogSunColor.value.copy(t.fog.sunColor),s.uFogDensity.value=t.fog.density,s.uFogFalloff.value=t.fog.falloff,s.uFogGroundY.value=t.fog.groundY,s.uFogStart.value=t.fog.start,s.uFogMax.value=t.fog.max,s.uShaftTint.value.copy(t.sunColor),s.uShaftIntensity.value=i,s.uSunOnScreen.value=n.visibility,this.shaftMaterial.uniforms.uSunUv.value.set(n.x,n.y)}render(e,t){const n=this.sceneTexture,i=this.depthTexture;this.cfg.ao&&(this.aoMaterial.uniforms.tDepth.value=i,this._quad.material=this.aoMaterial,e.setRenderTarget(this.aoRT),e.clear(),this._quad.render(e)),this.cfg.shafts&&this.compositeMaterial.uniforms.uSunOnScreen.value>.001&&(this.shaftMaterial.uniforms.tDiffuse.value=n,this.shaftMaterial.uniforms.tDepth.value=i,this._quad.material=this.shaftMaterial,e.setRenderTarget(this.shaftRT),e.clear(),this._quad.render(e)),this.compositeMaterial.uniforms.tDiffuse.value=n,this.compositeMaterial.uniforms.tDepth.value=i,this._quad.material=this.compositeMaterial,this.renderToScreen?e.setRenderTarget(null):e.setRenderTarget(t),this._quad.render(e)}dispose(){this.aoRT.dispose(),this.shaftRT.dispose(),this.aoMaterial.dispose(),this.shaftMaterial.dispose(),this.compositeMaterial.dispose(),this._quad.dispose()}}const Y1=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,j1=`
precision highp float;
varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform vec2  uCenter;
uniform float uRadial;      // motion blur strength (screen fraction)
uniform float uNear;
uniform float uFar;
uniform float uFocusStart;  // metres: everything nearer is perfectly sharp
uniform float uFocusEnd;    // metres: CoC reaches its maximum here
uniform float uDofMax;      // max CoC in screen fraction
uniform float uAspect;

const float GOLDEN = 2.39996323;

float viewDistance(float d) {
  float z = d * 2.0 - 1.0;
  return (2.0 * uNear * uFar) / (uFar + uNear - z * (uFar - uNear));
}

void main() {
  vec3 base = texture2D(tDiffuse, vUv).rgb;

  if (uRadial < 0.0008 && uDofMax < 0.0004) {
    gl_FragColor = vec4(base, 1.0);
    return;
  }

  vec2 toC = vUv - uCenter;
  toC.x *= uAspect;
  float r2 = clamp(dot(toC, toC) * 3.0, 0.0, 1.0);
  vec2 mdir = (vUv - uCenter) * uRadial * r2;

  float d = texture2D(tDepth, vUv).x;
  float dist = viewDistance(d);
  float coc = smoothstep(uFocusStart, uFocusEnd, dist) * uDofMax;

  vec3 acc = base;
  float wsum = 1.0;

  for (int i = 0; i < TAPS; i++) {
    float fi = (float(i) + 1.0) / float(TAPS);
    float ang = float(i) * GOLDEN;
    vec2 disk = vec2(cos(ang), sin(ang)) * sqrt(fi) * coc;
    disk.x /= uAspect;
    vec2 off = mdir * (fi - 0.5) * 2.0 + disk;
    vec2 suv = clamp(vUv + off, vec2(0.0015), vec2(0.9985));
    float w = 1.0 - 0.45 * fi;
    acc += texture2D(tDiffuse, suv).rgb * w;
    wsum += w;
  }

  gl_FragColor = vec4(acc / wsum, 1.0);
}
`;class K1 extends ei{constructor({taps:e=10}={}){super(),this.material=new vt({name:"RK.CameraBlur",defines:{TAPS:e},uniforms:{tDiffuse:{value:null},tDepth:{value:null},uCenter:{value:new ve(.5,.5)},uRadial:{value:0},uNear:{value:.1},uFar:{value:1e3},uFocusStart:{value:55},uFocusEnd:{value:260},uDofMax:{value:0},uAspect:{value:1.777}},vertexShader:Y1,fragmentShader:j1,depthTest:!1,depthWrite:!1}),this._quad=new Ui(this.material)}setSize(e,t){this.material.uniforms.uAspect.value=e/Math.max(1,t)}render(e,t,n){this.material.uniforms.tDiffuse.value=n.texture,this.renderToScreen?e.setRenderTarget(null):e.setRenderTarget(t),this._quad.render(e)}dispose(){this.material.dispose(),this._quad.dispose()}}const Z1=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,J1=`
precision highp float;
varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform float uAberration;
uniform float uVignette;
uniform float uGrain;
uniform float uTime;
uniform float uSaturation;
uniform float uContrast;
uniform float uSCurve;
uniform float uBlackPoint;
uniform float uWhitePoint;
uniform float uLift;
uniform vec3  uShadowTint;
uniform vec3  uHighlightTint;
uniform float uTintAmount;
uniform float uSpeedLines;
uniform vec3  uFlashColor;
uniform float uFlash;
uniform float uAspect;

float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

float hash21(vec2 p) {
  p = fract(p * vec2(233.34, 851.73));
  p += dot(p, p + 23.45);
  return fract(p.x * p.y);
}

void main() {
  vec2 c = vUv - 0.5;
  vec2 ca = c;
  ca.x *= uAspect;
  float r2 = dot(ca, ca);

  // ---- chromatic aberration: lateral only, grows with r^2 -------------------
  vec3 col;
  if (uAberration > 0.00002) {
    vec2 off = c * r2 * uAberration;
    col.r = texture2D(tDiffuse, clamp(vUv + off, 0.0005, 0.9995)).r;
    col.g = texture2D(tDiffuse, vUv).g;
    col.b = texture2D(tDiffuse, clamp(vUv - off, 0.0005, 0.9995)).b;
  } else {
    col = texture2D(tDiffuse, vUv).rgb;
  }
  col = max(col, 0.0);

  // ---- black / white point -------------------------------------------------
  // The single most important line in the file. Tone mapping leaves the darkest
  // pixel well above zero; remapping [bp, wp] onto [0, 1] is what puts real
  // black back on the screen and lets a highlight actually reach paper white.
  col = (col - uBlackPoint) / max(uWhitePoint - uBlackPoint, 1e-3);
  col = clamp(col, 0.0, 1.0);

  // ---- tonal shaping -------------------------------------------------------
  // A smoothstep S-curve: it pins 0 and 1, so it deepens shadows and brightens
  // highlights without ever clipping either end into a flat plate.
  col = mix(col, col * col * (3.0 - 2.0 * col), uSCurve);

  // Linear contrast around a pivot below mid grey, so the road (which occupies
  // the lower midtones) gets pushed down rather than up.
  const float PIVOT = 0.44;
  col = clamp((col - PIVOT) * uContrast + PIVOT, 0.0, 1.0);

  // A whisper of lift back into the deepest shadows: Nintendo shadows carry hue
  // rather than going to dead zero. Applied *after* the crush so it is a hue
  // carrier, not a haze.
  col += uLift * (1.0 - smoothstep(0.0, 0.28, luma(col)));

  // ---- split tone: cool shadows, warm highlights ---------------------------
  float l = luma(col);
  vec3 tint = mix(uShadowTint, uHighlightTint, smoothstep(0.14, 0.80, l));
  col = mix(col, col * tint * 2.0, uTintAmount * 0.5);

  // ---- vibrance: push unsaturated pixels harder than saturated ones ---------
  float mx = max(col.r, max(col.g, col.b));
  float mn = min(col.r, min(col.g, col.b));
  float sat = mx - mn;
  float amount = (uSaturation - 1.0) * (1.0 - sat * 0.6);
  col = mix(vec3(luma(col)), col, 1.0 + amount);

  // ---- boost speed lines ---------------------------------------------------
  if (uSpeedLines > 0.001) {
    float ang = atan(ca.y, ca.x);
    float rr = sqrt(r2);
    // The angle has to be quantised into wedges before it is hashed. Sampling
    // the hash with a continuous angle gives every pixel its own value, which
    // reads as white speckle over the whole frame rather than radial streaks.
    float band = floor(rr * 2.6);
    float wedge = floor(ang * 44.0);
    float n = hash21(vec2(wedge, band * 7.0));
    float lines = smoothstep(0.86, 0.995, n) * smoothstep(0.30, 0.78, rr);
    col += lines * uSpeedLines * vec3(1.0, 0.97, 0.90);
  }

  // ---- impact flash --------------------------------------------------------
  col = mix(col, uFlashColor, clamp(uFlash, 0.0, 1.0));

  // ---- vignette ------------------------------------------------------------
  col *= 1.0 - uVignette * smoothstep(0.10, 0.62, r2);

  // ---- grain ---------------------------------------------------------------
  // Display space, and rolled off in the highlights: in linear space this same
  // amplitude turned into visible dirt all over the road after tone mapping.
  if (uGrain > 0.0001) {
    float g = hash21(vUv * 1024.0 + fract(uTime) * 91.7) - 0.5;
    col += g * uGrain * (1.0 - 0.7 * smoothstep(0.5, 1.0, luma(col)));
  }

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;class Q1 extends ei{constructor(){super(),this.material=new vt({name:"RK.Grade",uniforms:{tDiffuse:{value:null},uAberration:{value:.0016},uVignette:{value:.26},uGrain:{value:.008},uTime:{value:0},uSaturation:{value:1.2},uContrast:{value:1.1},uSCurve:{value:.3},uBlackPoint:{value:.045},uWhitePoint:{value:.94},uLift:{value:.01},uShadowTint:{value:new he(.44,.48,.6)},uHighlightTint:{value:new he(.56,.52,.44)},uTintAmount:{value:.22},uSpeedLines:{value:0},uFlashColor:{value:new he(1,1,1)},uFlash:{value:0},uAspect:{value:1.777}},vertexShader:Z1,fragmentShader:J1,depthTest:!1,depthWrite:!1}),this._quad=new Ui(this.material)}applyPreset(e){const t=this.material.uniforms;t.uSaturation.value=e.saturation,t.uContrast.value=e.contrast,t.uSCurve.value=e.sCurve??.3,t.uBlackPoint.value=e.blackPoint??.045,t.uWhitePoint.value=e.whitePoint??.94,t.uLift.value=e.lift,t.uTintAmount.value=e.tintAmount,e.vignette!==void 0&&(t.uVignette.value=e.vignette),e.grain!==void 0&&(t.uGrain.value=e.grain);const n=(i,s)=>{const o=Math.max(i.r,i.g,i.b)||1;s.setRGB(i.r/o*.5,i.g/o*.5,i.b/o*.5)};n(e.shadowTint,t.uShadowTint.value),n(e.highlightTint,t.uHighlightTint.value)}setSize(e,t){this.material.uniforms.uAspect.value=e/Math.max(1,t)}render(e,t,n){this.material.uniforms.tDiffuse.value=n.texture,this.renderToScreen?e.setRenderTarget(null):e.setRenderTarget(t),this._quad.render(e)}dispose(){this.material.dispose(),this._quad.dispose()}}const Eu=(r,e,t)=>r<e?e:r>t?t:r,Au={low:{shadows:!1,cascades:1,shadowMapSize:1024,ao:!1,shafts:!1,bloom:!1,blur:!1,smaa:!1,cloudLayers:0,aoSamples:6,shaftSteps:12},medium:{shadows:!0,cascades:2,shadowMapSize:1024,ao:!1,shafts:!0,bloom:!0,blur:!0,smaa:!1,cloudLayers:1,aoSamples:8,shaftSteps:16},high:{shadows:!0,cascades:3,shadowMapSize:2048,ao:!0,shafts:!0,bloom:!0,blur:!0,smaa:!0,cloudLayers:2,aoSamples:12,shaftSteps:24},ultra:{shadows:!0,cascades:4,shadowMapSize:2048,ao:!0,shafts:!0,bloom:!0,blur:!0,smaa:!0,cloudLayers:2,aoSamples:16,shaftSteps:32}};class $1{name="render";order=0;#o=0;#e=0;#t=new he(1,1,1);#i=Object.assign(new ve(.5,.5),{visibility:0});#s=new T;#r=new T;#n={over:0,under:0,scale:1};async init(e){this.ctx=e;const t=Au[e.quality]??Au.high;this.tier=t;const n=new v1({canvas:e.canvas,antialias:!1,alpha:!1,stencil:!1,depth:!0,powerPreference:"high-performance"});n.outputColorSpace=it,n.toneMapping=El,n.toneMappingExposure=1,n.shadowMap.enabled=t.shadows,n.shadowMap.type=fd,n.info.autoReset=!1,e.renderer=n,this.maxAniso=n.capabilities.getMaxAnisotropy();const i=e.rng.fork(1473);this.cloudNoise=H1(i,t.cloudLayers?512:128),this.sky=new O1(this.cloudNoise),e.scene.add(this.sky.mesh),this.lighting=new N1(e.scene,e.camera,{cascades:t.cascades,shadowMapSize:t.shadowMapSize,shadows:t.shadows}),this.tod=null,this.setTimeOfDay(e.opts?.timeOfDay??ia),this.pmrem=new vl(n),this.pmrem.compileEquirectangularShader(),this.#u();const s=new ve;n.getSize(s);const o=Math.max(2,s.x),a=Math.max(2,s.y);this.beauty=new qt(o,a,{type:rn,colorSpace:Yt,depthBuffer:!0}),this.depthTex=new zl(o,a,Vs),this.depthTex.format=Gs,this.beauty.depthTexture=this.depthTex;const c=new E1(n,new qt(o,a,{type:rn,colorSpace:Yt}));c.setPixelRatio(1),e.composer=c,this.composer=c,t.ao||t.shafts?(this.atmosphere=new q1(e.camera,{ao:t.ao,aoSamples:t.aoSamples,shafts:t.shafts,shaftSteps:t.shaftSteps}),this.atmosphere.depthTexture=this.depthTex,this.atmosphere.sceneTexture=this.beauty.texture,c.addPass(this.atmosphere)):c.addPass(new A1(this.beauty.texture,1)),t.bloom&&(this.bloom=new Zs(new ve(o,a),.5,.55,.9),c.addPass(this.bloom)),t.blur&&(this.blur=new K1({taps:e.quality==="ultra"?14:10}),this.blur.material.uniforms.tDepth.value=this.depthTex,this.blur.material.uniforms.uNear.value=e.camera.near,this.blur.material.uniforms.uFar.value=e.camera.far,c.addPass(this.blur)),this.output=new L1,c.addPass(this.output),t.smaa&&(this.smaa=new C1,c.addPass(this.smaa)),this.grade=new Q1,c.addPass(this.grade),this.#h(),e.render={_sys:this,setSpeedFactor:l=>{this.#o=Eu(l,0,1)},pulse:(l,h=1)=>this.pulse(l,h),setTimeOfDay:l=>{this.setTimeOfDay(l),this.#h(),this.#u()},timesOfDay:Tu,syncMaterials:()=>this.lighting.syncMaterials(e.scene),get exposure(){return n.toneMappingExposure}},this.lighting.syncMaterials(e.scene),e.events.on("kart:boost",l=>{l?.kart?.isPlayer&&this.pulse("boost",1)}),e.events.on("kart:hit",l=>{l?.kart?.isPlayer&&this.pulse("hit",1)}),e.events.on("item:lightning",()=>this.pulse("lightning",1)),e.onProgress?.(.1,"acendendo as luzes")}setTimeOfDay(e){return this.todName=Tu.includes(e)?e:ia,this.tod=V1(this.todName),this.tod}#h(){const e=this.ctx,t=this.tod;this.lighting.apply(t),this.sky.apply(t,this.tier.cloudLayers),e.renderer.toneMappingExposure=t.exposure,this.grade.applyPreset(t.grade),this.bloom&&(this.bloom.strength=t.bloom.strength,this.bloom.threshold=t.bloom.threshold,this.bloom.radius=t.bloom.radius),e.scene.fog=this.atmosphere?null:new Nl(t.fog.color.getHex(),t.fog.density*.55),this.#s.copy(t.sunDir).multiplyScalar(2200)}#u(){const e=this.ctx,t=this.tier.cloudLayers?256:128,n=new Gd(t,{type:rn}),i=new Hd(1,6e3,n),s=[];e.scene.traverse(c=>{c.isMesh&&c!==this.sky.mesh&&(s.push([c,c.visible]),c.visible=!1)});const o=e.renderer.toneMapping;e.renderer.toneMapping=mi,i.position.set(0,0,0),this.sky.mesh.position.set(0,0,0),i.update(e.renderer,e.scene),e.renderer.toneMapping=o;for(const[c,l]of s)c.visible=l;const a=this.pmrem.fromCubemap(n.texture);this.envMap?.dispose?.(),this.envMap=a.texture,e.scene.environment=this.envMap,e.scene.environmentIntensity=this.tod.envIntensity,n.dispose()}pulse(e,t=1){switch(e){case"boost":this.#e=Math.max(this.#e,.3*t),this.#t.setRGB(.45,.85,1);break;case"hit":this.#e=Math.max(this.#e,.55*t),this.#t.setRGB(1,.35,.25);break;case"lightning":this.#e=Math.max(this.#e,1*t),this.#t.setRGB(1,1,.85);break;default:this.#e=Math.max(this.#e,.3*t),this.#t.setRGB(1,1,1)}}resize(e,t,n){const i=n.viewport.dpr*this.#n.scale;n.renderer.setPixelRatio(i),n.renderer.setSize(e,t,!1);const s=Math.max(2,Math.round(e*i)),o=Math.max(2,Math.round(t*i));this.composer.setSize(e,t),this.beauty.setSize(s,o),this.atmosphere?.setSize(s,o),this.blur?.setSize(s,o),this.grade?.setSize(s,o),this.bloom?.setSize?.(s,o)}lateUpdate(e,t){(t.time.frame&15)===0&&this.lighting.syncMaterials(t.scene),this.sky.setTime(t.time.t),this.sky.follow(t.camera),this.lighting.update(t.camera),this.#r.copy(t.camera.position).add(this.#s).project(t.camera);const n=this.#r.z>1;this.#i.set((this.#r.x+1)*.5,(this.#r.y+1)*.5);const i=this.#i.x,s=this.#i.y,o=Math.max(Math.abs(i-.5),Math.abs(s-.5));this.#i.visibility=n?0:Eu(1-(o-.45)/.35,0,1);const a=n?0:this.tod.godRays;if(this.atmosphere&&this.atmosphere.sync(t.camera,this.tod,this.#i,a),this.blur){const l=this.blur.material.uniforms;l.uRadial.value=Math.pow(this.#o,1.6)*.021,l.uDofMax.value=.0026,l.uFocusStart.value=42,l.uFocusEnd.value=210,l.uCenter.value.set(.5,.5),l.uNear.value=t.camera.near,l.uFar.value=t.camera.far}const c=this.grade.material.uniforms;c.uTime.value=t.time.t,c.uSpeedLines.value=Math.max(0,this.#o-.86)*1.6,this.#e=Math.max(0,this.#e-e*2.6),c.uFlash.value=this.#e,c.uFlashColor.value.copy(this.#t)}render(e,t){const n=t.renderer;n.info.reset(),n.setRenderTarget(this.beauty),n.clear(),n.render(t.scene,t.camera),n.setRenderTarget(null),this.composer.render(),this.#f(n)}#f(){const e=this.#n,t=performance.now()-(this._lastFrameStart??performance.now());this._lastFrameStart=performance.now(),t>20?(e.over++,e.under=0):t<12&&(e.under++,e.over=0),e.over>90&&e.scale>.65?(e.scale-=.1,e.over=0,this.ctx.game.resize()):e.under>240&&e.scale<1&&(e.scale=Math.min(1,e.scale+.1),e.under=0,this.ctx.game.resize())}dispose(){this.lighting?.dispose?.(),this.sky?.dispose?.(),this.atmosphere?.dispose?.(),this.blur?.dispose?.(),this.grade?.dispose?.(),this.bloom?.dispose?.(),this.beauty?.dispose?.(),this.depthTex?.dispose?.(),this.pmrem?.dispose?.(),this.composer?.dispose?.(),this.ctx?.renderer?.dispose?.()}}function Yn(r,e=!1){const t=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},o={},a=r[0].morphTargetsRelative,c=new Et;let l=0;for(let h=0;h<r.length;++h){const u=r[h];let d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(t){let h=0;const u=[];for(let d=0;d<r.length;++d){const f=r[d].index;for(let p=0;p<f.count;++p)u.push(f.getX(p)+h);h+=r[d].attributes.position.count}c.setIndex(u)}for(const h in s){const u=Ru(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let v=0;v<o[h].length;++v)f.push(o[h][v][d]);const p=Ru(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(p)}}return c}function Ru(r){let e,t,n,i=-1,s=0;for(let l=0;l<r.length;++l){const h=r[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*t}const o=new e(s),a=new at(o,t,n);let c=0;for(let l=0;l<r.length;++l){const h=r[l];if(h.isInterleavedBufferAttribute){const u=c/t;for(let d=0,f=h.count;d<f;d++)for(let p=0;p<t;p++){const v=h.getComponent(d,p);a.setComponent(d+u,p,v)}}else o.set(h.array,c);c+=h.count*t}return i!==void 0&&(a.gpuType=i),a}function Cu(r,e){if(e===Xf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===fl||e===Ld){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===fl)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}const ey=new T(0,1,0),Is=(r,e,t)=>r<e?e:r>t?t:r,ty=(r,e,t)=>{if(r===e)return t<r?0:1;const n=Is((t-r)/(e-r),0,1);return n*n*(3-2*n)};class ny{constructor(e){this.closed=e.closed!==!1,this.cpVecs=e.points.map(_=>new T(_[0],_[1],_[2])),this.curve=new gl(this.cpVecs,this.closed,"centripetal",.5),this.curve.arcLengthDivisions=4e3,this.length=this.curve.getLength();const t=e.sampleStep??1.6,n=Math.max(128,Math.round(this.length/t));this.N=n,this.ds=this.length/n;const i=new Float32Array(n+1),s=new Float32Array(n+1),o=new Float32Array(n+1),a=new Float32Array(n+1),c=new Float32Array(n+1),l=new Float32Array(n+1),h=new T;for(let _=0;_<=n;_++){const C=this.closed?_%n/n:_/n;this.curve.getPointAt(C,h),i[_]=h.x,s[_]=h.y,o[_]=h.z,this.curve.getTangentAt(C,h).normalize(),a[_]=h.x,c[_]=h.y,l[_]=h.z}if(this.cpU=this.cpVecs.map(_=>{let C=0,D=1/0;for(let U=0;U<n;U++){const k=(i[U]-_.x)**2+(s[U]-_.y)**2+(o[U]-_.z)**2;k<D&&(D=k,C=U)}return C/n}),e.bumps){const _=new Float32Array(n);for(const C of e.bumps){const D=this.uAt(C.cp0),U=this.uAt(C.cp1),k=Math.round(D*n),O=(Math.round(U*n)-k+n)%n||1,q=C.kind==="kicker"||C.kind==="drop";for(let z=0;z<=O;z++){const $=(k+z)%n,re=z/O;let ee;C.kind==="kicker"?ee=Math.pow(re,1.7):C.kind==="drop"?ee=1-re*re*(3-2*re):ee=Math.sin(Math.PI*re)**2;const Me=C.height*ee;_[$]=q?Math.max(_[$],Me):_[$]+Me}}for(let C=0;C<n;C++)s[C]+=_[C];s[n]=s[0];for(let C=0;C<=n;C++){const D=(C-1+n)%n,U=(C+1)%n,k=i[U]-i[D],H=s[U]-s[D],O=o[U]-o[D],q=Math.hypot(k,H,O)||1;a[C]=k/q,c[C]=H/q,l[C]=O/q}}const u=new Float32Array(n);for(let _=0;_<n;_++){const C=(_-3+n)%n,D=(_+3)%n,U=a[C],k=l[C],H=a[D],O=l[D],q=U*O-k*H,z=Is(U*H+k*O,-1,1),$=Math.atan2(q,z);u[_]=$/(6*this.ds)}this.kappa=this.#o(u,6);const d=e.bankGain??0,f=e.maxBank??0,p=new Float32Array(n);for(let _=0;_<n;_++)p[_]=Is(this.kappa[_]*d,-f,f);this.bank=this.#o(p,10),this.width=this.#e(e.width??[[0,14]],n),this.wallL=this.#e(e.wallL??[[0,0]],n),this.wallR=this.#e(e.wallR??[[0,0]],n),this.shoulder=this.#e(e.shoulder??[[0,2.4]],n);const v=new Float32Array(n+1),g=new Float32Array(n+1),m=new Float32Array(n+1),M=new Float32Array(n+1),x=new Float32Array(n+1),y=new Float32Array(n+1),w=new T,S=new T,E=new T,L=new et;for(let _=0;_<=n;_++){const C=_%n;w.set(a[_],c[_],l[_]),S.crossVectors(ey,w).normalize(),S.lengthSq()<1e-6&&S.set(1,0,0),E.crossVectors(w,S).normalize(),L.setFromAxisAngle(w,this.bank[C]),S.applyQuaternion(L),E.applyQuaternion(L),v[_]=S.x,g[_]=S.y,m[_]=S.z,M[_]=E.x,x[_]=E.y,y[_]=E.z}const b=new Float32Array(n+1);for(let _=1;_<=n;_++)b[_]=b[_-1]+Math.hypot(i[_]-i[_-1],s[_]-s[_-1],o[_]-o[_-1]);this.realLength=b[n],Object.assign(this,{px:i,py:s,pz:o,tx:a,ty:c,tz:l,rx:v,ry:g,rz:m,nx:M,ny:x,nz:y,dist:b}),this.#t(),this._s={pos:new T,tangent:new T,normal:new T,right:new T,width:0,banking:0},this._p={u:0,lateral:0,distAlong:0,forward:new T}}#o(e,t){const n=e.length,i=new Float32Array(n);for(let s=0;s<n;s++){let o=0,a=0;for(let c=-t;c<=t;c++){const l=1-Math.abs(c)/(t+1);o+=e[(s+c+n*4)%n]*l,a+=l}i[s]=o/a}return i}#e(e,t){const n=e.map(([s,o])=>[this.uAt(s),o]).sort((s,o)=>s[0]-o[0]),i=new Float32Array(t);for(let s=0;s<t;s++){const o=s/t;let a=n[n.length-1],c=n[0],l=a[0]-1,h=c[0];for(let u=0;u<n.length;u++)n[u][0]<=o&&(a=n[u],l=n[u][0],c=n[(u+1)%n.length],h=c[0]+(u+1>=n.length?1:0));i[s]=a[1]+(c[1]-a[1])*ty(l,h,o)}return i}uAt(e){const t=this.cpU.length,n=Math.floor(e),i=e-n,s=this.cpU[(n%t+t)%t];let o=this.cpU[((n+1)%t+t)%t];return i===0?s:(o<s&&(o+=1),(s+(o-s)*i)%1)}#t(){let e=1/0,t=-1/0,n=1/0,i=-1/0;for(let u=0;u<this.N;u++)this.px[u]<e&&(e=this.px[u]),this.px[u]>t&&(t=this.px[u]),this.pz[u]<n&&(n=this.pz[u]),this.pz[u]>i&&(i=this.pz[u]);const s=260;this.gx0=e-s,this.gz0=n-s;const o=t-e+s*2,a=i-n+s*2,c=128;this.gw=c,this.gh=c,this.gcx=o/c,this.gcz=a/c;const l=new Int32Array(c*c),h=Math.max(1,Math.floor(this.N/512));for(let u=0;u<c;u++){const d=this.gz0+(u+.5)*this.gcz;for(let f=0;f<c;f++){const p=this.gx0+(f+.5)*this.gcx;let v=0,g=1/0;for(let m=0;m<this.N;m+=h){const M=this.px[m]-p,x=this.pz[m]-d,y=M*M+x*x;y<g&&(g=y,v=m)}l[u*c+f]=v}}this.seeds=l,this.seedStride=h}#i(e,t){const n=Is(Math.floor((e-this.gx0)/this.gcx),0,this.gw-1),i=Is(Math.floor((t-this.gz0)/this.gcz),0,this.gh-1);return this.seeds[i*this.gw+n]}#s(e,t,n){const i=this.px[e]-t,s=this.pz[e]-n;return i*i+s*s}nearestIndex(e,t){const n=this.N;let i=this.#i(e,t),s=this.#s(i,e,t);const o=this.seedStride+6;let a=!0,c=0;for(;a&&c++<64;){a=!1;const l=[Math.max(1,o>>1),4,1];for(const h of l)for(;;){const u=(i-h+n)%n,d=(i+h)%n,f=this.#s(u,e,t),p=this.#s(d,e,t);if(f<s&&f<=p)i=u,s=f,a=!0;else if(p<s)i=d,s=p,a=!0;else break}}return i}project(e,t){const n=this.N,i=this.nearestIndex(e.x,e.z);let s=0,o=i,a=1/0;for(const S of[(i-1+n)%n,i]){const E=(S+1)%n,L=this.px[S],b=this.pz[S],_=this.px[E],C=this.pz[E],D=_-L,U=C-b,k=D*D+U*U||1,H=Is(((e.x-L)*D+(e.z-b)*U)/k,0,1),O=L+D*H,q=b+U*H,z=(e.x-O)**2+(e.z-q)**2;z<a&&(a=z,s=H,o=S)}const c=o,l=(c+1)%n,h=s,u=this.tx[c]+(this.tx[l]-this.tx[c])*h,d=this.tz[c]+(this.tz[l]-this.tz[c])*h,f=this.ty[c]+(this.ty[l]-this.ty[c])*h,p=Math.hypot(u,f,d)||1,v=this.rx[c]+(this.rx[l]-this.rx[c])*h,g=this.rz[c]+(this.rz[l]-this.rz[c])*h,m=this.px[c]+(this.px[l]-this.px[c])*h,M=this.pz[c]+(this.pz[l]-this.pz[c])*h,x=Math.hypot(v,g)||1,y=((e.x-m)*v+(e.z-M)*g)/x,w=t||this._p;return w.u=(c+h)/n%1,w.lateral=y,w.distAlong=this.dist[c]+(this.dist[c+1]-this.dist[c])*h,w.forward.set(u/p,f/p,d/p),w.index=c,w}sample(e,t){const n=this.N;let i=e%1;i<0&&(i+=1);const s=i*n,o=Math.floor(s)%n,a=s-Math.floor(s),c=(o+1)%n,l=t||this._s;return l.pos.set(this.px[o]+(this.px[c]-this.px[o])*a,this.py[o]+(this.py[c]-this.py[o])*a,this.pz[o]+(this.pz[c]-this.pz[o])*a),l.tangent.set(this.tx[o]+(this.tx[c]-this.tx[o])*a,this.ty[o]+(this.ty[c]-this.ty[o])*a,this.tz[o]+(this.tz[c]-this.tz[o])*a).normalize(),l.right.set(this.rx[o]+(this.rx[c]-this.rx[o])*a,this.ry[o]+(this.ry[c]-this.ry[o])*a,this.rz[o]+(this.rz[c]-this.rz[o])*a).normalize(),l.normal.set(this.nx[o]+(this.nx[c]-this.nx[o])*a,this.ny[o]+(this.ny[c]-this.ny[o])*a,this.nz[o]+(this.nz[c]-this.nz[o])*a).normalize(),l.width=this.width[o]+(this.width[c]-this.width[o])*a,l.banking=this.bank[o]+(this.bank[c]-this.bank[o])*a,l.wallL=this.wallL[o]+(this.wallL[c]-this.wallL[o])*a,l.wallR=this.wallR[o]+(this.wallR[c]-this.wallR[o])*a,l.shoulder=this.shoulder[o]+(this.shoulder[c]-this.shoulder[o])*a,l.curvature=this.kappa[o]+(this.kappa[c]-this.kappa[o])*a,l.distAlong=this.dist[o]+(this.dist[o+1]-this.dist[o])*a,l}widthAtIndex(e){return this.width[e%this.N]}point(e,t,n=new T){const i=this.sample(e);return n.copy(i.pos).addScaledVector(i.right,t)}}const sa=.86,Zl=r=>r.map(([e,t,n])=>[e*sa,t,n*sa]),iy=Zl([[-240,2,-176],[-150,2,-180],[-55,2.2,-184],[45,3,-180],[140,6,-158],[205,10,-108],[232,14,-58],[216,17.2,-16],[244,20.6,22],[254,26,66],[240,34,124],[206,42,172],[140,47.5,202],[70,50,208],[16,50.4,201],[1,50.2,180],[10,49.6,153],[62,48.6,136],[76,45,96],[40,40,46],[-18,36,24],[-84,33,30],[-142,24,58],[-198,15,96],[-252,9,112],[-300,5,80],[-306,3,20],[-320,2,-40],[-334,2,-100],[-318,2,-150]]),sy=[[0,19],[2,19],[3,18],[4,16.5],[5,15.5],[6,13],[7,11.5],[8,12.5],[9,14],[10,15.5],[11,16.5],[12,16],[13,14],[14,13],[15,12.5],[16,13],[17,13.5],[18,14],[19,12],[20,11.5],[21,12.5],[22,19],[22.6,18],[23,14],[24,13.5],[25,15],[26,16],[27,16],[28,17],[29,18]],Lu=[[0,0],[3,0],[4,11],[5,10.5],[6,8.5],[7,7.5],[8,8],[9,9],[10,10],[11,11],[12,10.5],[13,9.5],[14,9],[15,8.5],[16,9],[17,9],[18,9.5],[19,7.5],[20,7.2],[21,8],[22,0],[23,0],[24,0],[25,0],[26,0],[27,0],[28,0],[29,0]],ry=[[0,12.5],[1,12.5],[2,12.5],[3,12],[4,0],[5,0],[6,8.5],[7,7.5],[8,8],[9,0],[10,0],[11,0],[12,0],[13,9.5],[14,9],[15,8.5],[16,9],[17,9],[18,0],[19,7.5],[20,7.2],[21,8],[22,0],[23,0],[24,0],[25,10],[26,10.5],[27,10.5],[28,11],[29,12]],oy=[[0,3.5],[3,3],[4,2.4],[6,1.2],[9,2.2],[13,2.6],[19,.8],[22,3.2],[25,2.6],[28,3.4]],ay=[{cp0:20.7,cp1:21.06,height:6,kind:"kicker"},{cp0:21.06,cp1:21.36,height:6,kind:"drop"},{cp0:1.2,cp1:2.1,height:1.1,kind:"roller"},{cp0:26.2,cp1:27.1,height:1.6,kind:"roller"},{cp0:11.3,cp1:12.2,height:2,kind:"roller"}],cy=4.6,ly=.245,hy=[{cp0:0,cp1:4,style:"bamboo"},{cp0:4,cp1:6,style:"sandbag"},{cp0:6,cp1:9,style:"wall"},{cp0:9,cp1:19,style:"stone"},{cp0:19,cp1:22,style:"rail"},{cp0:22,cp1:25,style:"bamboo"},{cp0:25,cp1:30,style:"stone"}],cc=[{cp:3.55,lanes:[-4.5,0,4.5]},{cp:8.6,lanes:[-3,3]},{cp:17.35,lanes:[-3.2,3.2]},{cp:20.72,lanes:[-3.6,0,3.6]},{cp:24.75,lanes:[-3.4,3.4]},{cp:29.35,lanes:[-5,0,5]}],uy=[{cp:3.15,kind:"chevron",side:1},{cp:6.4,kind:"arrow",side:-1},{cp:7.6,kind:"arrow",side:1},{cp:15.2,kind:"chevron",side:-1},{cp:20.3,kind:"arrow",side:0},{cp:23.4,kind:"chevron",side:1},{cp:28.3,kind:"chevron",side:-1}],dy=Zl([[-146,23,60],[-178,17,50],[-214,11.5,42],[-248,7.5,40],[-276,5.6,52],[-298,5,72]]),fy=[[0,9],[1,7],[2,6.2],[3,6],[4,7],[5,9]],Pu={enter:22.08,exit:25.02},py=.58,my=[{cp:1.5,n:5},{cp:5.4,n:4},{cp:9.6,n:4},{cp:12.4,n:5},{cp:18.6,n:4},{cp:22.9,n:5},{cp:26.4,n:4}],Du=24,yn={seaLevel:0,coastZ:-205*sa,coastX:-352*sa,extent:1500,gorge:{path:Zl([[152,0,202],[96,0,156],[44,0,98],[6,0,52],[-20,0,22],[-52,0,-18],[-88,0,-62]]),width:30,depth:24,fallAt:2}},lc={cp0:5.6,cp1:9.2,rows:3},gy=[{cp:.35,side:-1,len:64,tiers:7},{cp:1.55,side:-1,len:46,tiers:6},{cp:29.5,side:-1,len:42,tiers:5},{cp:15.05,side:1,len:34,tiers:5},{cp:22.6,side:1,len:30,tiers:4}],Iu=[{cp:0,kind:"start"},{cp:4.6,kind:"banner"},{cp:9.4,kind:"banner"},{cp:17.6,kind:"banner"},{cp:22.35,kind:"banner"},{cp:26.8,kind:"banner"}],Eo={houses:[3126182,16033066,14701375,8176730,5930960,15914571,14711472,15757360],seaShallow:4182727,seaDeep:748687,foam:15924223},yt=r=>r<0?0:r>1?1:r,Uu=(r,e,t)=>{const n=yt((t-r)/(e-r||1));return n*n*(3-2*n)};function Yo(r,e,t){let n=Math.imul(r|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}const Nu=r=>r*r*(3-2*r);function vy(r,e,t,n){const i=Math.floor(r),s=Math.floor(e),o=r-i,a=e-s,c=(v,g)=>Yo((v%t+t)%t,(g%t+t)%t,n),l=c(i,s),h=c(i+1,s),u=c(i,s+1),d=c(i+1,s+1),f=Nu(o),p=Nu(a);return l*(1-f)*(1-p)+h*f*(1-p)+u*(1-f)*p+d*f*p}function st(r,e,t,n,i,s=.5){let o=1,a=0,c=0,l=t;for(let h=0;h<n;h++)a+=o*vy(r*l,e*l,l,i+h*977),c+=o,o*=s,l*=2;return a/c}function fn(r){const e=document.createElement("canvas");return e.width=e.height=r,e}function $n(r,{srgb:e=!0,repeat:t=1,aniso:n=8}={}){const i=new Jt(r);return i.wrapS=i.wrapT=Lt,i.repeat.set(t,t),i.anisotropy=n,i.colorSpace=e?it:Kn,i.generateMipmaps=!0,i.minFilter=un,i.magFilter=Bt,i.needsUpdate=!0,i}function pa(r,e,t=2.4,n=8){const i=fn(e),s=i.getContext("2d"),o=s.createImageData(e,e),a=o.data,c=(l,h)=>r[(h%e+e)%e*e+(l%e+e)%e];for(let l=0;l<e;l++)for(let h=0;h<e;h++){const u=c(h-1,l-1),d=c(h,l-1),f=c(h+1,l-1),p=c(h-1,l),v=c(h+1,l),g=c(h-1,l+1),m=c(h,l+1),M=c(h+1,l+1),x=f+2*v+M-(u+2*p+g),y=g+2*m+M-(u+2*d+f);let w=-x*t,S=-y*t,E=1;const L=1/Math.hypot(w,S,E);w*=L,S*=L,E*=L;const b=(l*e+h)*4;a[b]=(w*.5+.5)*255,a[b+1]=(S*.5+.5)*255,a[b+2]=(E*.5+.5)*255,a[b+3]=255}return s.putImageData(o,0,0),$n(i,{srgb:!1,aniso:n})}function Vr(r,e,t=8){const n=fn(e),i=n.getContext("2d"),s=i.createImageData(e,e);for(let o=0;o<e*e;o++){const a=yt(r[o])*255;s.data[o*4]=s.data[o*4+1]=s.data[o*4+2]=a,s.data[o*4+3]=255}return i.putImageData(s,0,0),$n(n,{srgb:!1,aniso:t})}function xy(r,e,t=512){const n=new Float32Array(t*t),i=fn(t),s=i.getContext("2d"),o=s.createImageData(t,t),a=o.data,c=170;for(let h=0;h<t;h++)for(let u=0;u<t;u++){const d=u/t,f=h/t,p=d*c,v=f*c;let g=9,m=9;const M=Math.floor(p),x=Math.floor(v);for(let H=-1;H<=1;H++)for(let O=-1;O<=1;O++){const q=M+O,z=x+H,$=(q%c+c)%c,re=(z%c+c)%c,ee=q+Yo($,re,11)*.96+.02,Me=z+Yo($,re,23)*.96+.02,K=(p-ee)**2+(v-Me)**2;K<g?(m=g,g=K):K<m&&(m=K)}const y=yt((Math.sqrt(m)-Math.sqrt(g))*2.1),w=Math.floor(p),S=Math.floor(v),E=Yo((w%c+c)%c,(S%c+c)%c,57),L=st(d,f,190,2,5),b=st(d,f,17,3,913),_=st(d,f,4,3,91),C=1-Math.abs(st(d,f,11,4,3307)*2-1),D=yt((C-.86)*7.4);n[h*t+u]=yt(y*.5+L*.22+b*.16+_*.12-D*.55);let U=.15+(_-.5)*.052+(b-.5)*.034+(y-.45)*.03*(.6+E*.8)+(L-.5)*.016;U=yt(U)*(1-D*.34);const k=(h*t+u)*4;a[k]=yt(U*.972)*255,a[k+1]=yt(U*1)*255,a[k+2]=yt(U*.948)*255,a[k+3]=255}s.putImageData(o,0,0);const l=new Float32Array(t*t);for(let h=0;h<t*t;h++)l[h]=.74+n[h]*.24;return{map:$n(i,{aniso:e}),normalMap:pa(n,t,.75,e),roughnessMap:Vr(l,t,e)}}function yy(r=256,e=8821,t=8){const n=new Float32Array(r*r);let i=1,s=0;for(let a=0;a<r;a++)for(let c=0;c<r;c++){const l=c/r,h=a/r;let u=st(l,h,3,3,e)*.52+st(l,h,6,3,e+131)*.3+st(l,h,11,2,e+277)*.18;const d=st(l,h,5,2,e+613);u-=Uu(.6,.76,d)*.2,u+=Uu(.3,.16,d)*.1,n[a*r+c]=u,u<i&&(i=u),u>s&&(s=u)}const o=1/(s-i||1);for(let a=0;a<r*r;a++)n[a]=(n[a]-i)*o;return Vr(n,r,t)}function _y(r=256,e=4211,t=8){const n=new Float32Array(r*r);let i=1,s=0;for(let a=0;a<r;a++)for(let c=0;c<r;c++){const l=c/r,h=a/r,u=st(l,h,3,4,e)*.5+st(l,h,7,3,e+31)*.32+st(l,h,13,2,e+77)*.18;n[a*r+c]=u,u<i&&(i=u),u>s&&(s=u)}const o=1/(s-i||1);for(let a=0;a<r*r;a++)n[a]=(n[a]-i)*o;return Vr(n,r,t)}function hc(r,e,t){const n=fn(r),i=n.getContext("2d"),s=i.createImageData(r,r),o=s.data,a=new Float32Array(r*r);for(let c=0;c<r;c++)for(let l=0;l<r;l++){const h=l/r,u=c/r;let d,f,p,v;if(t==="sand"){const m=.5+.5*Math.sin((h*5.2+u*2.1)*Math.PI*2*6+st(h,u,5,3,71)*7),M=st(h,u,150,2,7),x=st(h,u,9,4,401),y=m*.2+M*.22+x*.58;d=214+y*34-17,f=196+y*34-17,p=156+y*36-18,M>.9&&(d+=20,f+=18,p+=15),v=m*.45+M*.3+x*.25}else if(t==="grass"){const m=st(h,u,110,2,17),M=st(h,u,26,3,233),x=st(h,u,6,3,401),y=m*.18+M*.42+x*.4;d=42+y*46-20+x*26,f=96+y*74-32+x*30,p=30+y*28-12+x*8,v=m*.6+M*.4}else{const m=1-Math.abs(st(h,u,14,4,37)*2-1),M=.5+.5*Math.sin((u*3.1+h*.8)*Math.PI*2*5+st(h,u,7,3,611)*5),x=st(h,u,96,2,733),y=m*.52+M*.22+x*.26;d=84+y*92-40,f=79+y*86-37,p=72+y*76-33,m>.74&&(d-=26,f-=25,p-=20),v=m*.55+M*.2+x*.25}const g=(c*r+l)*4;o[g]=yt(d/255)*255,o[g+1]=yt(f/255)*255,o[g+2]=yt(p/255)*255,o[g+3]=255,a[c*r+l]=v}return i.putImageData(s,0,0),{canvas:n,height:a}}function My(r,e,t=256){const n=hc(t,r,"sand"),i=hc(t,r,"grass"),s=hc(t,r,"rock"),o=new Float32Array(t*t);for(let c=0;c<t*t;c++)o[c]=n.height[c]*.4+i.height[c]*.3+s.height[c]*.3;const a=new Float32Array(t*t);for(let c=0;c<t*t;c++)a[c]=.8+o[c]*.18;return{sand:$n(n.canvas,{aniso:e}),grass:$n(i.canvas,{aniso:e}),rock:$n(s.canvas,{aniso:e}),normalMap:pa(o,t,1.4,e),roughnessMap:Vr(a,t,e)}}function by(r,e,t=256){const n=fn(t),i=n.getContext("2d"),s=i.createImageData(t,t),o=new Float32Array(t*t);for(let a=0;a<t;a++)for(let c=0;c<t;c++){const l=c/t,h=a/t,u=st(l,h,32,4,61),d=.5+.5*Math.sin(l*6.283*3+st(l,h,6,2,99)*4),f=u*.7+d*.3,p=(a*t+c)*4;s.data[p]=yt((122+f*74-34)/255)*255,s.data[p+1]=yt((92+f*60-28)/255)*255,s.data[p+2]=yt((62+f*46-22)/255)*255,s.data[p+3]=255,o[a*t+c]=f}return i.putImageData(s,0,0),{map:$n(n,{aniso:e}),normalMap:pa(o,t,2.2,e)}}function Sy(r=8,e=256){const t=fn(e),n=t.getContext("2d"),i=e/r;for(let o=0;o<r;o++)for(let a=0;a<r;a++)n.fillStyle=(a+o)%2?"#ffffff":"#16181c",n.fillRect(a*i,o*i,i,i);const s=new Jt(t);return s.wrapS=s.wrapT=Lt,s.colorSpace=it,s.anisotropy=8,s}function ku(r,e=256){const t=fn(e),n=t.getContext("2d");if(n.clearRect(0,0,e,e),n.fillStyle="#ffffff",n.strokeStyle="#ffffff",r==="arrow")n.beginPath(),n.moveTo(e*.5,e*.06),n.lineTo(e*.9,e*.5),n.lineTo(e*.66,e*.5),n.lineTo(e*.66,e*.94),n.lineTo(e*.34,e*.94),n.lineTo(e*.34,e*.5),n.lineTo(e*.1,e*.5),n.closePath(),n.fill();else for(let s=0;s<3;s++){const o=e*(.08+s*.3);n.beginPath(),n.moveTo(e*.08,o+e*.18),n.lineTo(e*.5,o),n.lineTo(e*.92,o+e*.18),n.lineTo(e*.92,o+e*.26),n.lineTo(e*.5,o+e*.08),n.lineTo(e*.08,o+e*.26),n.closePath(),n.fill()}const i=new Jt(t);return i.colorSpace=it,i.anisotropy=8,i}function wy(r=256){const e=fn(r),t=e.getContext("2d");t.fillStyle="#0d1013",t.fillRect(0,0,r,r);const n=["#d8232a","#ffd21e","#1eae4b"];for(let s=0;s<6;s++){t.fillStyle=n[s%3];const o=r*(s/6)-r*.06;t.beginPath(),t.moveTo(0,o+r*.14),t.lineTo(r*.5,o),t.lineTo(r,o+r*.14),t.lineTo(r,o+r*.2),t.lineTo(r*.5,o+r*.06),t.lineTo(0,o+r*.2),t.closePath(),t.fill()}t.strokeStyle="#ffffff",t.lineWidth=r*.035,t.strokeRect(r*.017,r*.017,r*.966,r*.966);const i=new Jt(e);return i.colorSpace=it,i.anisotropy=8,i}function Ty(r=256,e=8){const t=new Float32Array(r*r);for(let n=0;n<r;n++)for(let i=0;i<r;i++){const s=i/r,o=n/r,a=st(s*1,o*1,6,4,131),c=st(s*2,o*.7,17,3,733),l=st(s*.6,o*1.4,40,2,977);t[n*r+i]=a*.5+c*.32+l*.18}return pa(t,r,1.9,e)}function Ey(r=256,e=8){const t=new Float32Array(r*r);for(let n=0;n<r;n++)for(let i=0;i<r;i++){const s=i/r,o=n/r,a=st(s,o,9,4,1301)*.55+st(s,o,30,3,1777)*.45;t[n*r+i]=yt((a-.34)*2.3)}return Vr(t,r,e)}function Ay(r=128,e=[180,170,158]){const t=fn(r),n=t.getContext("2d"),i=n.createImageData(r,r);for(let s=0;s<r;s++)for(let o=0;o<r;o++){const a=o/r,c=s/r,l=.5+.5*Math.sin(a*Math.PI*2*9),h=st(a,c,12,4,881),u=st(a*.3,c*2.4,20,3,313),d=l*.62+u*.38;let f=e[0]*(.62+d*.62),p=e[1]*(.62+d*.62),v=e[2]*(.62+d*.62);if(h>.66){const m=(h-.66)*2.6;f=f*(1-m)+132*m,p=p*(1-m)+74*m,v=v*(1-m)+42*m}const g=(s*r+o)*4;i.data[g]=yt(f/255)*255,i.data[g+1]=yt(p/255)*255,i.data[g+2]=yt(v/255)*255,i.data[g+3]=255}return n.putImageData(i,0,0),$n(t,{aniso:8})}function Ry(r=512,e){const t=fn(r),n=t.getContext("2d"),i=r/4;n.fillStyle="#12161a",n.fillRect(0,0,r,i);const s=["#1eae4b","#ffd21e","#d8232a"];for(let a=0;a<3;a++)n.fillStyle=s[a],n.fillRect(0,a*i*.055,r,i*.055),n.fillRect(0,i-(a+1)*i*.055,r,i*.055);n.fillStyle="#f2f6f8",n.font=`bold ${Math.round(i*.42)}px sans-serif`,n.textAlign="center",n.textBaseline="middle",n.fillText("KINGSTON COAST",r*.5,i*.5),n.fillStyle="#ffd21e",n.font=`bold ${Math.round(i*.2)}px sans-serif`,n.fillText("★ RASTA KART GRAND PRIX ★",r*.5,i*.8);const o=new Jt(t);return o.colorSpace=it,o.anisotropy=8,o.wrapS=o.wrapT=bn,o}function Cy(r,e=256){const t=fn(e),n=t.getContext("2d");n.clearRect(0,0,e,e);const i=["#e0533f","#f4a52a","#2fb3a6","#5a7fd0","#7cc45a","#f2d64b","#e07ab0","#f2f6f8","#1eae4b","#d8232a"],s=["#5a3a24","#7a4f30","#3d2718","#9a6a44","#c99a70"],o=16;for(let c=0;c<3;c++){const l=e*(c/3),h=e/3;for(let u=0;u<o;u++){const d=r.range(-.3,.3),f=e*((u+.5+d)/o),p=e/o*r.range(.75,1.05),v=p*.3,g=l+h*.98,m=r.range(0,.1)*h;n.fillStyle=r.pick(i),n.beginPath(),n.ellipse(f,g-h*.22-m,p*.52,h*.34,0,0,Math.PI*2),n.fill(),n.fillStyle=r.pick(s),n.beginPath(),n.arc(f,g-h*.52-m,v,0,Math.PI*2),n.fill()}}const a=new Jt(t);return a.colorSpace=it,a.anisotropy=8,a.wrapS=Lt,a.wrapT=bn,a}function Ly(r=256){const e=fn(r),t=e.getContext("2d"),n=t.createImageData(r,r);for(let s=0;s<r;s++)for(let o=0;o<r;o++){const a=o/r,c=s/r,l=st(a*3,c*.22,26,3,1913),h=st(a,c,40,3,2287),u=yt(l*.7+h*.3),d=(s*r+o)*4,f=210+u*45;n.data[d]=yt(f/255)*255,n.data[d+1]=yt((f+6)/255)*255,n.data[d+2]=255,n.data[d+3]=yt(.3+u*.62+c*.22)*255}t.putImageData(n,0,0);const i=new Jt(e);return i.colorSpace=it,i.wrapS=i.wrapT=Lt,i.anisotropy=8,i}function Fu(r,e=128,t=[126,96,62],n=.5){const i=fn(e),s=i.getContext("2d"),o=s.createImageData(e,e);for(let a=0;a<e;a++)for(let c=0;c<e;c++){const l=c/e,h=a/e,u=st(l*.35,h*3,16,3,211),d=.5+.5*Math.sin(l*Math.PI*2*6+u*6),f=u*(1-n)+d*n,p=(a*e+c)*4;o.data[p]=yt((t[0]+f*70-34)/255)*255,o.data[p+1]=yt((t[1]+f*62-30)/255)*255,o.data[p+2]=yt((t[2]+f*50-24)/255)*255,o.data[p+3]=255}return s.putImageData(o,0,0),$n(i,{aniso:4})}function Py(r=128){const e=fn(r),t=e.getContext("2d"),n=t.createImageData(r,r);for(let i=0;i<r;i++)for(let s=0;s<r;s++){const o=s/r,a=i/r,l=.82+st(o,a,24,4,313)*.36,h=(i*r+s)*4;n.data[h]=n.data[h+1]=n.data[h+2]=yt(l)*255,n.data[h+3]=255}return t.putImageData(n,0,0),$n(e,{aniso:4})}const Ei=new T(0,1,0),Dn=new T,os=(r,e,t)=>r<e?e:r>t?t:r,ln=(r,e,t)=>{const n=os((t-r)/(e-r||1),0,1);return n*n*(3-2*n)},Dy=(r,e,t)=>r+(e-r)*t,an=1.15,dr=.075,Ai=.22,Ou=22,uc=10;function cs(r,e,t){let n=Math.imul(r|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,1274126177);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function Qi(r,e,t){const n=Math.floor(r),i=Math.floor(e),s=r-n,o=e-i,a=s*s*(3-2*s),c=o*o*(3-2*o),l=cs(n,i,t),h=cs(n+1,i,t),u=cs(n,i+1,t),d=cs(n+1,i+1,t);return l+(h-l)*a+(u-l)*c+(l-h-u+d)*a*c}function Bu(r,e,t,n,i){let s=n,o=1,a=0,c=0,l=1;for(let h=0;h<t;h++){let u=1-Math.abs(Qi(r*s,e*s,i+h*613)*2-1);u*=u,a+=u*o*l,l=.35+u*.65,c+=o,o*=.52,s*=2.07}return a/c}const zu=[{x:340,z:470,r:380,h:232,sharp:1.55},{x:-60,z:560,r:330,h:196,sharp:1.7},{x:640,z:170,r:300,h:178,sharp:1.5},{x:-430,z:430,r:280,h:148,sharp:1.8},{x:190,z:318,r:190,h:86,sharp:2.1},{x:900,z:620,r:520,h:300,sharp:1.35},{x:-820,z:700,r:460,h:240,sharp:1.4}];class Iy{name="world";order=10;async init(e){this.ctx=e;const t=e.quality??"high";this.q=t;const n=e.rng.fork(8017729);this.rng=n;const i=Math.min(16,e.renderer?.capabilities?.getMaxAnisotropy?.()??8);e.onProgress?.(.12,"traçando o circuito"),this.ribbon=new ny({points:iy,closed:!0,sampleStep:1.5,width:sy,wallL:Lu,wallR:ry,wall:Lu,shoulder:oy,bankGain:cy,maxBank:ly,bumps:ay}),this.trackLength=this.ribbon.length,this.root=new wn,this.root.name="world",e.scene.add(this.root),this.gorgeSeg=[];const s=yn.gorge.path;for(let a=0;a<s.length-1;a++){const c=s[a][0],l=s[a][2],h=s[a+1][0],u=s[a+1][2],d=h-c,f=u-l;this.gorgeSeg.push({ax:c,az:l,ex:d,ez:f,inv:1/(d*d+f*f||1)})}e.onProgress?.(.2,"pintando o asfalto");const o=t==="low"?256:t==="medium"?384:512;this.tex={asphalt:xy(n,i,o),ground:My(n,i,t==="low"?128:256),dirt:by(n,i,t==="low"?128:256),macro:_y(256,4211,i),roadMacro:yy(256,8821,i),boost:wy(256),checker:Sy(10,256),waterN:Ty(t==="low"?128:256,i),foam:Ey(256,i),corrugated:Ay(128),banner:Ry(512),crowd:Cy(n,256),falls:Ly(256),bark:Fu(n,128),plank:Fu(n,128,[138,108,74],.15),stucco:Py(128),arrow:ku("arrow",256),chevron:ku("chevron",256)},e.onProgress?.(.26,"medindo o litoral"),this.#n(),this.#M(),this.#e(),e.onProgress?.(.34,"levantando o terreno"),this.#h(),e.onProgress?.(.44,"enchendo o mar"),this.#u(),e.onProgress?.(.5,"montando as barreiras"),this.#T(),this.#c(),this.#l(),this.#a(),e.onProgress?.(.56,"erguendo as arquibancadas"),this.#d(),this.#E(n),e.onProgress?.(.6,"construindo a vila"),this.#_(n),e.onProgress?.(.64,"abrindo o desfiladeiro"),this.#L(n),this.#p(),e.onProgress?.(.67,"plantando o cenário"),this.#A(n),this.checkpoints=Array.from({length:Du},(a,c)=>c/Du),this.itemBoxSpots=[];for(const a of my){const c=this.ribbon.uAt(a.cp),l=this.ribbon.sample(c),h=Math.min(l.width*.72,(a.n-1)*3);for(let u=0;u<a.n;u++){const d=a.n===1?0:(u/(a.n-1)-.5)*h;this.itemBoxSpots.push(l.pos.clone().addScaledVector(l.right,d).addScaledVector(l.normal,1.05))}}this.boostRanges=cc.map(a=>({u:this.ribbon.uAt(a.cp),half:7/this.trackLength,lanes:a.lanes})),e.world=this.#P(),e.onProgress?.(.7,"circuito pronto")}#o(e,t,n,i=.42){const s=this.tex.macro,o=t/n;return e.onBeforeCompile=a=>{a.uniforms.uMacroMap={value:s},a.uniforms.uMacroRatio={value:o},a.uniforms.uMacroK={value:i},a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>
          uniform sampler2D uMacroMap;
          uniform float uMacroRatio;
          uniform float uMacroK;`).replace("#include <map_fragment>",`
          #ifdef USE_MAP
            vec4 sampledDiffuseColor = texture2D( map, vMapUv );
            vec2 mUv = mat2( 0.8, -0.6, 0.6, 0.8 ) * vMapUv * uMacroRatio + vec2( 0.37, 0.11 );
            float macroL = texture2D( uMacroMap, mUv ).r;
            vec2 mUv2 = vMapUv * uMacroRatio * 0.31 - vec2( 0.19, 0.63 );
            macroL = macroL * 0.65 + texture2D( uMacroMap, mUv2 ).r * 0.35;
            sampledDiffuseColor.rgb *= 1.0 + ( macroL - 0.5 ) * uMacroK * 2.0;
            diffuseColor *= sampledDiffuseColor;
          #endif
        `)},e.customProgramCacheKey=()=>`rk-tilebreak-${o.toFixed(4)}-${i}`,e}#e(){const e=this.ribbon,t=e.N,n=9,i=new Float32Array((t+1)*n*3),s=new Float32Array((t+1)*n*3),o=new Float32Array((t+1)*n*2),a=new Float32Array((t+1)*n*3),c=new Float32Array((t+1)*n*2),l={pos:new T,tangent:new T,right:new T,normal:new T,width:0,banking:0,wallL:0,wallR:0,shoulder:0,curvature:0,distAlong:0},h=new T,u=new he,d=new he(16777215),f=new he(14272932),p=1,v=16720921,g=16513008;for(let w=0;w<=t;w++){e.sample(w%t/t,l);const S=l.width*.5,E=Math.max(.6,l.shoulder),L=1/Math.max(.001,S),b=[[-S-an-E,-Ai,f,2],[-S-an,0,f,2],[-S-an,dr,null,1],[-S,dr,null,1],[-S,0,d,0],[S,0,d,0],[S,dr,null,1],[S+an,dr,null,1],[S+an+E,-Ai,f,2]],_=Math.floor(w%t/p)%2===0;u.setHex(_?v:g);for(let C=0;C<n;C++){const[D,U,k,H]=b[C];h.copy(l.pos).addScaledVector(l.right,D).addScaledVector(l.normal,U);const O=(w*n+C)*3,q=(w*n+C)*2;i[O]=h.x,i[O+1]=h.y,i[O+2]=h.z,s[O]=l.normal.x,s[O+1]=l.normal.y,s[O+2]=l.normal.z,o[q]=D/uc,o[q+1]=l.distAlong/uc,c[q]=D*L,c[q+1]=H;const z=k??u;a[O]=z.r,a[O+1]=z.g,a[O+2]=z.b}}const m=[];for(let w=0;w<t;w++)for(let S=0;S<n-1;S++){const E=w*n+S,L=E+1,b=(w+1)*n+S,_=b+1;m.push(E,b,L,L,b,_)}const M=new Et;M.setAttribute("position",new at(i,3)),M.setAttribute("normal",new at(s,3)),M.setAttribute("uv",new at(o,2)),M.setAttribute("color",new at(a,3)),M.setAttribute("aRoad",new at(c,2)),M.setIndex(m),M.computeBoundingSphere();const x=this.tex.asphalt;for(const w of[x.map,x.normalMap,x.roughnessMap])w&&(w.wrapS=w.wrapT=Lt,w.repeat.set(1,1),w.generateMipmaps=!0,w.minFilter=un,w.needsUpdate=!0);const y=new Xe({map:x.map??null,normalMap:x.normalMap??null,roughnessMap:x.roughnessMap??null,vertexColors:!0,color:16777215,roughness:1,metalness:0,normalScale:new ve(.34,.34),envMapIntensity:.3});this.#t(y),this.road=new tt(M,y),this.road.receiveShadow=!0,this.road.name="road",this.root.add(this.road)}#t(e){const t=this.tex.roadMacro;return e.onBeforeCompile=n=>{n.uniforms.uRoadMacro={value:t},n.uniforms.uMacroScale={value:1/92},n.uniforms.uTile={value:uc},n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
          attribute vec2 aRoad;
          varying vec2 vRoad;
          varying vec3 vRoadW;`).replace("#include <begin_vertex>",`#include <begin_vertex>
          vRoad = aRoad;
          vRoadW = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;`),n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
          uniform sampler2D uRoadMacro;
          uniform float uMacroScale;
          uniform float uTile;
          varying vec2 vRoad;
          varying vec3 vRoadW;
          float rkWear;   // 0 = untouched tarmac, 1 = polished wheel path
          float rkPaint;  // 1 where paint covers the surface`).replace("#include <map_fragment>",`
          vec4 rkTex = texture2D( map, vMapUv );
          float rkLat = vRoad.x;
          float rkA   = abs( rkLat );
          float rkTar = 1.0 - step( 0.5, vRoad.y );        // 1 on the tarmac

          // ---- low frequency, world space: never repeats with the tile ----
          vec2 mUv  = mat2( 0.83, -0.56, 0.56, 0.83 ) * vRoadW.xz * uMacroScale;
          vec2 mUv2 = vRoadW.xz * uMacroScale * 0.33 + vec2( 0.21, 0.68 );
          float rkMacro = texture2D( uRoadMacro, mUv ).r * 0.64
                        + texture2D( uRoadMacro, mUv2 ).r * 0.36;

          vec3 rkC = rkTex.rgb;
          // broad value drift + resurfacing patches (mean preserving)
          rkC *= mix( 0.72, 1.30, rkMacro );

          // ---- rubbered-in wheel paths -----------------------------------
          float band = exp( -pow( ( rkA - 0.40 ) / 0.20, 2.0 ) );
          rkWear = band * ( 0.55 + 0.45 * rkMacro );
          rkC *= 1.0 - 0.26 * rkWear;
          // the very centre is scrubbed clean and slightly paler
          rkC *= 1.0 + 0.10 * exp( -pow( rkA / 0.10, 2.0 ) );

          // ---- paint ------------------------------------------------------
          float sMet = vMapUv.y * uTile;
          float edge = smoothstep( 0.880, 0.898, rkA ) * ( 1.0 - smoothstep( 0.952, 0.968, rkA ) );
          float dash = step( 0.5, fract( sMet / 7.0 ) )
                     * ( 1.0 - smoothstep( 0.030, 0.052, rkA ) );
          rkPaint = clamp( ( edge + dash ) * rkTar, 0.0, 1.0 );
          // paint is worn where the tyres cross it
          rkPaint *= 1.0 - 0.35 * rkWear;
          rkC = mix( rkC, vec3( 0.80, 0.80, 0.77 ) * ( 0.86 + rkTex.g * 0.9 ), rkPaint );

          // ---- kerb + shoulder --------------------------------------------
          // Lift them off the bitumen albedo, keeping only its grain, so the
          // vertex colour lands at full chroma. One material, three surfaces.
          vec3 rkPainted = vec3( 0.62 ) + ( rkTex.ggg - vec3( 0.145 ) ) * 1.15;
          rkC = mix( rkPainted, rkC, rkTar );

          diffuseColor *= vec4( rkC, 1.0 );
        `).replace("#include <roughnessmap_fragment>",`
          float roughnessFactor = roughness;
          #ifdef USE_ROUGHNESSMAP
            roughnessFactor *= texture2D( roughnessMap, vMapUv ).g;
          #endif
          // polished wheel paths and wet-look paint catch the low sun
          roughnessFactor *= 1.0 - 0.22 * rkWear - 0.30 * rkPaint;
        `).replace("#include <normal_fragment_maps>",`
          #ifdef USE_NORMALMAP
            vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
            // flatten the chippings under the tyre paths and under paint
            mapN.xy *= normalScale * ( 1.0 - 0.5 * rkWear - 0.8 * rkPaint );
            normal = normalize( tbn * mapN );
          #endif
        `)},e.customProgramCacheKey=()=>"rk-road-v2",e}#i(e,t){const n=yn.gorge;let i=1/0;for(let a=0;a<this.gorgeSeg.length;a++){const c=this.gorgeSeg[a],l=os(((e-c.ax)*c.ex+(t-c.az)*c.ez)*c.inv,0,1),h=e-(c.ax+c.ex*l),u=t-(c.az+c.ez*l),d=h*h+u*u;d<i&&(i=d)}const s=Math.sqrt(i),o=n.width*.5;return n.depth*(1-ln(o*.55,o*2.35,s))}#s(e,t){const n=yn,i=t-n.coastZ,s=e-n.coastX,o=(Qi(e*.0037,t*.0037,5501)-.5)*46+(Qi(e*.0121,t*.0121,911)-.5)*15,a=Math.min(i,s)+o,c=ln(-3,26,a)*3.1,l=(Qi(e*.0091,t*.0091,17)-.5)*8+(Qi(e*.0261,t*.0261,71)-.5)*2.6;let h=0;for(let p=0;p<zu.length;p++){const v=zu[p],g=e-v.x,m=t-v.z,M=Math.sqrt(g*g+m*m)/v.r;if(M>=1)continue;const x=1-M;h+=v.h*Math.pow(x,v.sharp)}if(h>.5){const p=Bu(e*.0043,t*.0043,4,1,2251);h*=.44+p*.86,h+=Bu(e*.019,t*.019,2,1,4423)*Math.min(14,h*.16)}const u=a<0?a*.3-ln(0,-220,a)*16:0;let d=c+l*ln(-4,40,a)+h+u-1.4;const f=this.#i(e,t);return f>.01&&(d-=f),d}#r(e,t,n,i){let s=this.#s(e,t);const o=i.width*.5+an+Math.max(.6,i.shoulder),a=Math.abs(n.lateral)-o;if(a<Ou){const c=os(n.lateral,-o,o),l=i.pos.y+i.right.y*c-Ai,h=1-ln(0,Ou,Math.max(0,a));s=s*(1-h)+l*h}return s}#n(){const e=new Vn().setFromPoints(this.ribbon.cpVecs),t=(e.min.x+e.max.x)*.5,n=(e.min.z+e.max.z)*.5,i=yn.extent+700,s=this.q==="low"?192:this.q==="medium"?320:448,o=-50,a=270,c=new Uint8Array(s*s),l=new Float32Array(s*s);for(let u=0;u<s;u++){const d=n-i*.5+(u+.5)*(i/s);for(let f=0;f<s;f++){const p=t-i*.5+(f+.5)*(i/s),v=this.#s(p,d);l[u*s+f]=v,c[u*s+f]=os(Math.round((v-o)/(a-o)*255),0,255)}}const h=new la(c,s,s,aa,Hn);h.wrapS=h.wrapT=bn,h.minFilter=h.magFilter=Bt,h.needsUpdate=!0,this.heightField={tex:h,raw:l,N:s,cx:t,cz:n,ext:i,H_MIN:o,H_MAX:a},this.terrainCenter={x:t,z:n,ext:yn.extent}}#h(){const e=this.q,t=e==="low"?160:e==="medium"?224:288,n=yn.extent,i=new hn(n,n,t,t);i.rotateX(-Math.PI/2);const s=i.attributes.position,o=s.count,a=new Float32Array(o*3),c=new Float32Array(o*3),l=this.terrainCenter.x,h=this.terrainCenter.z,u=new he,d=new T,f={u:0,lateral:0,distAlong:0,forward:new T,index:0},p=n/t;for(let x=0;x<o;x++){const y=s.getX(x)+l,w=s.getZ(x)+h;d.set(y,0,w),this.ribbon.project(d,f);const S=this.ribbon.sample(f.u),E=this.#r(y,w,f,S);s.setX(x,y),s.setZ(x,w),s.setY(x,E);const L=this.#s(y+p,w)-this.#s(y-p,w),b=this.#s(y,w+p)-this.#s(y,w-p),_=Math.hypot(L,b)/(2*p),C=Qi(y*.031,w*.031,33),D=Qi(y*.0072,w*.0072,88),U=(1-ln(1.4+C*1.6,5.6+C*2.4,E))*(1-ln(.55,1.1,_)),k=os(ln(.42+C*.22,.95,_)+ln(52+D*34,118+D*30,E),0,1),H=os(1-U-k,0,1),O=U+k+H||1;c[x*3]=U/O,c[x*3+1]=H/O,c[x*3+2]=k/O;const q=.86+D*.22+(C-.5)*.1;u.setRGB(q,q,q);const z=ln(9,26,E)*(1-Uy(_,E,D))*(.55+D*.5);u.lerp(new he(2779700),z*.55),E>96&&u.lerp(new he(12169632),ln(96,190,E)*.5),E<.4&&u.multiplyScalar(.74),a[x*3]=u.r,a[x*3+1]=u.g,a[x*3+2]=u.b}i.setAttribute("color",new at(a,3)),i.setAttribute("aSplat",new at(c,3)),i.computeVertexNormals(),i.computeBoundingSphere();const v=this.tex.ground;for(const x of[v.sand,v.grass,v.rock,v.normalMap,v.roughnessMap])x&&(x.wrapS=x.wrapT=Lt,x.repeat.set(1,1));const g=new Xe({map:v.sand,normalMap:v.normalMap??null,roughnessMap:v.roughnessMap??null,vertexColors:!0,roughness:1,metalness:0,normalScale:new ve(.85,.85),envMapIntensity:.45}),m=7.5,M=96;g.onBeforeCompile=x=>{x.uniforms.uGrassMap={value:v.grass},x.uniforms.uRockMap={value:v.rock},x.uniforms.uMacroMap={value:this.tex.macro},x.uniforms.uDetail={value:1/m},x.uniforms.uMacro={value:1/M},x.vertexShader=x.vertexShader.replace("#include <common>",`#include <common>
          attribute vec3 aSplat;
          varying vec3 vSplat;
          varying vec3 vWPos;`).replace("#include <begin_vertex>",`#include <begin_vertex>
          vSplat = aSplat;
          vWPos = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;`),x.fragmentShader=x.fragmentShader.replace("#include <common>",`#include <common>
          uniform sampler2D uGrassMap;
          uniform sampler2D uRockMap;
          uniform sampler2D uMacroMap;
          uniform float uDetail;
          uniform float uMacro;
          varying vec3 vSplat;
          varying vec3 vWPos;`).replace("#include <map_fragment>",`
          vec2 dUv = vWPos.xz * uDetail;
          vec3 w = vSplat / max( vSplat.x + vSplat.y + vSplat.z, 1e-4 );
          vec3 detail =
              texture2D( map,       dUv ).rgb * w.x
            + texture2D( uGrassMap, dUv ).rgb * w.y
            + texture2D( uRockMap,  dUv ).rgb * w.z;
          // a second, far coarser pass of the same maps breaks the tiling grid
          vec2 cUv = vWPos.xz * uDetail * 0.161 + vec2( 0.23, 0.71 );
          vec3 coarse =
              texture2D( map,       cUv ).rgb * w.x
            + texture2D( uGrassMap, cUv ).rgb * w.y
            + texture2D( uRockMap,  cUv ).rgb * w.z;
          detail = mix( detail, detail * coarse * 3.1, 0.34 );
          float macroL = texture2D( uMacroMap, vWPos.xz * uMacro ).r;
          detail *= 0.80 + macroL * 0.42;
          diffuseColor.rgb *= detail;
        `).replace("#include <normal_fragment_maps>",`
          #ifdef USE_NORMALMAP
            vec3 mapN = texture2D( normalMap, vWPos.xz * uDetail ).xyz * 2.0 - 1.0;
            mapN.xy *= normalScale;
            normal = normalize( tbn * mapN );
          #endif
        `).replace("#include <roughnessmap_fragment>",`
          float roughnessFactor = roughness;
          #ifdef USE_ROUGHNESSMAP
            roughnessFactor *= texture2D( roughnessMap, vWPos.xz * uDetail ).g;
          #endif
        `)},g.customProgramCacheKey=()=>"rk-terrain-splat",this.terrain=new tt(i,g),this.terrain.receiveShadow=!0,this.terrain.name="terrain",this.root.add(this.terrain)}#u(){const e=this.heightField,t=yn.extent*2.6,n=this.q==="low"?48:this.q==="medium"?96:144,i=new hn(t,t,n,n);i.rotateX(-Math.PI/2);const s=this.tex.waterN;s.wrapS=s.wrapT=Lt;const o=this.tex.foam;o.wrapS=o.wrapT=Lt;const a=new Xe({color:16777215,roughness:.16,metalness:.02,envMapIntensity:1.5,transparent:!0,depthWrite:!1}),c={uTime:{value:0},uWaterN:{value:s},uFoamMap:{value:o},uHeight:{value:e.tex},uHfOrigin:{value:new ve(e.cx-e.ext*.5,e.cz-e.ext*.5)},uHfInv:{value:1/e.ext},uHMin:{value:e.H_MIN},uHRange:{value:e.H_MAX-e.H_MIN},uSeaLevel:{value:yn.seaLevel},uShallow:{value:new he(Eo.seaShallow)},uDeep:{value:new he(Eo.seaDeep)},uFoamCol:{value:new he(Eo.foam)}};this.waterUniforms=c,a.onBeforeCompile=l=>{Object.assign(l.uniforms,c),l.vertexShader=l.vertexShader.replace("#include <common>",`#include <common>
          uniform float uTime;
          varying vec3 vWPos;`).replace("#include <begin_vertex>",`#include <begin_vertex>
          vec3 wp = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
          // two long swells so the horizon line is never dead straight
          float s1 = sin( dot( wp.xz, vec2( 0.0090, 0.0043 ) ) + uTime * 0.55 );
          float s2 = sin( dot( wp.xz, vec2( -0.0051, 0.0116 ) ) + uTime * 0.41 );
          transformed.y += s1 * 0.42 + s2 * 0.28;
          vWPos = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;`),l.fragmentShader=l.fragmentShader.replace("#include <common>",`#include <common>
          uniform float uTime;
          uniform sampler2D uWaterN;
          uniform sampler2D uFoamMap;
          uniform sampler2D uHeight;
          uniform vec2 uHfOrigin;
          uniform float uHfInv;
          uniform float uHMin;
          uniform float uHRange;
          uniform float uSeaLevel;
          uniform vec3 uShallow;
          uniform vec3 uDeep;
          uniform vec3 uFoamCol;
          varying vec3 vWPos;

          float rkGround( vec2 p ) {
            vec2 uv = ( p - uHfOrigin ) * uHfInv;
            if ( uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0 ) return -40.0;
            return texture2D( uHeight, uv ).r * uHRange + uHMin;
          }`).replace("#include <map_fragment>",`
          float gh = rkGround( vWPos.xz );
          float depth = uSeaLevel - gh;

          // water colour: turquoise over the shelf, deep teal offshore
          vec3 wcol = mix( uShallow, uDeep, smoothstep( 0.15, 11.0, depth ) );
          wcol = mix( wcol * 1.18, wcol, smoothstep( 0.0, 3.0, depth ) );

          // surf: a broken band that breathes with the swell
          float swell = sin( dot( vWPos.xz, vec2( 0.052, 0.031 ) ) - uTime * 0.9 ) * 0.5 + 0.5;
          float band = 1.0 - smoothstep( 0.0, 1.5 + swell * 1.9, depth );
          float wash = smoothstep( -0.55, 0.25, depth );
          vec2 fUv = vWPos.xz * 0.055 + vec2( uTime * 0.010, uTime * 0.007 );
          float fn = texture2D( uFoamMap, fUv ).r;
          float fn2 = texture2D( uFoamMap, vWPos.xz * 0.017 - vec2( uTime * 0.004, 0.0 ) ).r;
          float foam = clamp( band * wash * ( fn * 0.72 + fn2 * 0.55 + 0.18 ), 0.0, 1.0 );
          foam = smoothstep( 0.18, 0.62, foam );
          // a hard lip right at the water line
          foam = max( foam, ( 1.0 - smoothstep( 0.0, 0.32, depth ) ) * wash * 0.85 );

          wcol = mix( wcol, uFoamCol, foam );
          diffuseColor.rgb *= wcol;
          diffuseColor.a *= mix( 0.66, 1.0, smoothstep( 0.0, 2.2, depth ) );
          diffuseColor.a = max( diffuseColor.a, foam );
        `).replace("#include <roughnessmap_fragment>",`
          float gh2 = rkGround( vWPos.xz );
          float depth2 = uSeaLevel - gh2;
          float foamR = 1.0 - smoothstep( 0.0, 2.4, depth2 );
          float roughnessFactor = mix( roughness, 0.72, foamR );
        `).replace("#include <normal_fragment_maps>",`
          // The sheet is horizontal, so the map can be applied directly in world
          // space: no tangent frame, no seam where the plane's UVs wrap.
          vec2 p1 = vWPos.xz * 0.075 + vec2( uTime * 0.021, uTime * 0.013 );
          vec2 p2 = vWPos.xz * 0.026 - vec2( uTime * 0.011, uTime * 0.008 );
          vec2 p3 = vWPos.xz * 0.235 + vec2( -uTime * 0.055, uTime * 0.034 );
          vec3 n1 = texture2D( uWaterN, p1 ).xyz * 2.0 - 1.0;
          vec3 n2 = texture2D( uWaterN, p2 ).xyz * 2.0 - 1.0;
          vec3 n3 = texture2D( uWaterN, p3 ).xyz * 2.0 - 1.0;
          vec2 nxz = n1.xy * 0.55 + n2.xy * 0.75 + n3.xy * 0.30;
          vec3 wN = normalize( vec3( nxz.x, 1.35, nxz.y ) );
          normal = normalize( ( viewMatrix * vec4( wN, 0.0 ) ).xyz );
        `)},a.customProgramCacheKey=()=>"rk-water",this.waterMat=a,this.water=new tt(i,a),this.water.position.set(this.terrainCenter.x,yn.seaLevel,this.terrainCenter.z),this.water.renderOrder=1,this.water.name="sea",this.root.add(this.water)}#f(e){for(const t of hy)if(e>=t.cp0&&e<t.cp1)return t.style;return"stone"}#T(){const e=this.ribbon,t=e.N,n=this.q==="low"?4:2,i=[];for(const S of[-1,1]){let E=null;for(let L=0;L<=t;L+=n){const b=L%t/t,_=e.sample(b);if((S<0?_.wallL:_.wallR)>.01){const U=_.width*.5+an+Math.max(.6,_.shoulder),k=_.pos.clone().addScaledVector(_.right,S*(U+.55)).addScaledVector(_.normal,-Ai);E||(E=[],i.push(E)),E.push({at:k,normal:_.normal.clone(),right:_.right.clone(),tangent:_.tangent.clone(),side:S,u:b})}else E=null}}const s=[],o=[];for(const S of i)for(let E=0;E<S.length;E++)if(s.push(S[E]),E+1<S.length){const L=S[E],b=S[E+1],_=b.at.clone().sub(L.at),C=_.length();C>.05&&C<16&&o.push({a:L,b,dir:_,len:C})}if(this.barrierPosts=s,!s.length)return;const a=new pe,c=new et,l=new T(1,1,1),h=new Nn(.13,.17,1.15,6);h.translate(0,.58,0);const u=new Xe({map:this.tex.bark,color:11043151,roughness:.9,metalness:.02}),d=new Tt(h,u,s.length);d.castShadow=!0,d.receiveShadow=!0;for(let S=0;S<s.length;S++){const E=s[S];c.setFromUnitVectors(Ei,E.normal),a.compose(E.at,c,l),d.setMatrixAt(S,a)}d.instanceMatrix.needsUpdate=!0;const f=new tn(1,.22,.13),p=new Xe({vertexColors:!0,roughness:.62,metalness:.05}),v=new Tt(f,p,o.length*2);v.castShadow=!0,v.receiveShadow=!0;const g=[2010699,16765470,14164778],m=new he,M=new et,x=new T,y=new T;let w=0;for(let S=0;S<o.length;S++){const{a:E,b:L,dir:b,len:_}=o[S];x.copy(b).normalize(),M.setFromUnitVectors(new T(1,0,0),x);const C=E.at.clone().addScaledVector(b,.5);m.setHex(g[Math.floor(S/3)%3]);for(const D of[.5,.95])y.set(_*1.02,1,1),a.compose(C.clone().addScaledVector(E.normal,D),M,y),v.setMatrixAt(w,a),v.setColorAt(w,m),w++}v.count=w,v.instanceMatrix.needsUpdate=!0,v.instanceColor&&(v.instanceColor.needsUpdate=!0),this.root.add(d,v)}#c(){const e=this.ribbon,t=new Xe({map:this.tex.boost,emissive:2807039,emissiveMap:this.tex.boost,emissiveIntensity:1.6,roughness:.5,metalness:.1,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3});this.boostMat=t;const n=new hn(2.6,6.2,1,1).rotateX(-Math.PI/2);let i=0;for(const h of cc)i+=h.lanes.length;i+=1;const s=new Tt(n,t,i),o=new pe,a=new et,c=new T(1,1,1);let l=0;for(const h of cc){const u=e.uAt(h.cp),d=e.sample(u);for(const f of h.lanes){const p=d.pos.clone().addScaledVector(d.right,f).addScaledVector(d.normal,.02),v=new pe().lookAt(Dn,d.normal,d.tangent);a.setFromRotationMatrix(v),o.compose(p,a,c),s.setMatrixAt(l++,o)}}if(this.shortcut){const h=this.shortcut,u=py,d=h.curve.getPointAt(u),f=h.curve.getTangentAt(u).normalize(),p=new T(0,1,0),v=d.clone().addScaledVector(p,.05);a.setFromRotationMatrix(new pe().lookAt(Dn,p,f)),o.compose(v,a,c),s.setMatrixAt(l++,o),this.shortcutBoost=v.clone()}s.count=l,s.instanceMatrix.needsUpdate=!0,s.renderOrder=2,this.root.add(s)}#l(){const e=this.ribbon,t={arrow:[],chevron:[]};for(const n of uy)(t[n.kind]??t.arrow).push(n);for(const n of Object.keys(t)){const i=t[n];if(!i.length)continue;const s=n==="arrow"?this.tex.arrow:this.tex.chevron,o=new Xe({map:s,alphaMap:s,transparent:!0,opacity:.72,roughness:.95,metalness:0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4,color:16777215}),a=n==="arrow"?[4,6]:[5.2,7],c=new hn(a[0],a[1]).rotateX(-Math.PI/2),l=new Tt(c,o,i.length),h=new pe,u=new et,d=new T(1,1,1);i.forEach((f,p)=>{const v=e.sample(e.uAt(f.cp)),g=f.side*Math.min(v.width*.26,4.2),m=v.pos.clone().addScaledVector(v.right,g).addScaledVector(v.normal,.03);u.setFromRotationMatrix(new pe().lookAt(Dn,v.normal,v.tangent)),h.compose(m,u,d),l.setMatrixAt(p,h)}),l.instanceMatrix.needsUpdate=!0,l.renderOrder=2,this.root.add(l)}}#a(){const t=this.ribbon.sample(0),n=this.tex.checker;n&&(n.wrapS=n.wrapT=Lt,n.repeat.set(1,1));const i=new hn(t.width,3).rotateX(-Math.PI/2),s=new tt(i,new Xe({map:n,roughness:.85,metalness:0,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}));s.position.copy(t.pos).addScaledVector(t.normal,.03),s.quaternion.setFromRotationMatrix(new pe().lookAt(Dn,t.normal,t.tangent)),s.renderOrder=1,this.root.add(s)}#d(){const e=this.ribbon,t=new Xe({color:2830134,roughness:.5,metalness:.55}),n=new Xe({color:2010699,roughness:.45,metalness:.25}),i=new Xe({map:this.tex.banner,roughness:.75,metalness:0,side:Nt}),s=new Nn(.3,.42,1,10);s.translate(0,.5,0);const o=new tn(1,1.35,.85),a=new hn(1,1),c=Iu.length,l=new Tt(s,t,c*2),h=new Tt(o,n,c*3),u=new Tt(a,i,c);l.castShadow=!0,h.castShadow=!0;const d=new pe,f=new et,p=new T;new he;let v=0,g=0,m=0;for(const M of Iu){const x=e.uAt(M.cp),y=e.sample(x),w=y.width*.5+(M.kind==="start"?2.6:2),S=M.kind==="start"?8.2:7.4;f.setFromRotationMatrix(new pe().lookAt(y.tangent,Dn,y.normal));const E=y.pos.clone().addScaledVector(y.normal,-Ai);for(const b of[-1,1]){const _=E.clone().addScaledVector(y.right,b*w);p.set(1,S,1),d.compose(_,f,p),l.setMatrixAt(v++,d)}p.set(w*2+1,1,1),d.compose(E.clone().addScaledVector(y.normal,S+.6),f,p),h.setMatrixAt(g++,d);for(let b=0;b<2;b++)p.set(w*2+1.2,.24,.95),d.compose(E.clone().addScaledVector(y.normal,S+1.5+b*.42),f,p),h.setMatrixAt(g++,d);const L=w*2-.6;p.set(L,L*.25,1),d.compose(E.clone().addScaledVector(y.normal,S-.45),f,p),u.setMatrixAt(m++,d)}h.count=g,l.count=v,u.count=m,l.instanceMatrix.needsUpdate=!0,h.instanceMatrix.needsUpdate=!0,u.instanceMatrix.needsUpdate=!0,this.root.add(l,h,u)}#E(e){const t=this.ribbon,n=[],i=[],s=[],o=(h,u,d,f)=>{const p=new tn(h,u,d);return p.applyMatrix4(f),p},a=new pe,c=new et,l=new T(1,1,1);for(const h of gy){const u=t.uAt(h.cp),d=t.sample(u),f=d.width*.5+an+Math.max(.6,d.shoulder);c.setFromRotationMatrix(new pe().lookAt(d.tangent,Dn,Ei));const p=d.pos.clone().addScaledVector(d.right,h.side*(f+2.4)).addScaledVector(Ei,-Ai),v=new pe().compose(p,c,l),g=h.side,m=.92,M=1.35;for(let S=0;S<h.tiers;S++){const E=.55+S*m,L=g*(.9+S*M);a.identity().makeTranslation(L,E*.5,0),n.push(o(M,E,h.len,v.clone().multiply(a)));const b=new hn(h.len,1.75);b.rotateY(Math.PI/2),g>0&&b.rotateY(Math.PI);const _=b.attributes.uv,C=Math.max(2,Math.round(h.len/3.2));for(let U=0;U<_.count;U++)_.setX(U,_.getX(U)*C);_.needsUpdate=!0;const D=new pe().makeTranslation(L,E+.85,0);b.applyMatrix4(v.clone().multiply(D)),i.push(b)}const x=g*(.9+h.tiers*M+.5),y=.55+h.tiers*m;a.identity().makeTranslation(x,y*.5,0),n.push(o(.6,y+.4,h.len+.6,v.clone().multiply(a)));const w=y+3.1;a.identity(),a.makeRotationZ(g*.1),a.setPosition(g*(.4+h.tiers*M*.5),w,0),s.push(o(h.tiers*M+2.6,.28,h.len+1.2,v.clone().multiply(a)));for(const S of[-h.len*.42,0,h.len*.42]){const E=new pe().makeTranslation(x,(w+y*.5)*.5+.4,S);n.push(o(.3,w-y*.4,.3,v.clone().multiply(E)))}}if(n.length){const h=Yn(n,!1),u=new Xe({map:this.tex.stucco,color:13617078,roughness:.92,metalness:0}),d=new tt(h,u);d.castShadow=!0,d.receiveShadow=!0,d.name="stands",this.root.add(d),n.forEach(f=>f.dispose())}if(s.length){const h=Yn(s,!1),u=new Xe({map:this.tex.corrugated,color:14989372,roughness:.65,metalness:.25}),d=new tt(h,u);d.castShadow=!0,this.root.add(d),s.forEach(f=>f.dispose())}if(i.length){const h=Yn(i,!1),u=new Xe({map:this.tex.crowd,alphaMap:this.tex.crowd,transparent:!0,alphaTest:.35,side:Nt,roughness:.85,metalness:0}),d=new tt(h,u);d.name="crowd",this.root.add(d),i.forEach(f=>f.dispose())}}#_(e){const t=this.ribbon,n=t.uAt(lc.cp0);let i=t.uAt(lc.cp1);i<n&&(i+=1);const s=[],o=[],a=[],c=Eo.houses,l=new T,h={u:0,lateral:0,distAlong:0,forward:new T,index:0},u=new T,d=this.q==="low"?34:64;let f=0;for(;s.length<d&&f++<d*12;){const C=(n+(i-n)*e.next())%1,D=t.sample(C),U=e.sign(),k=D.width*.5+an+Math.max(.6,D.shoulder),H=e.int(0,lc.rows-1),O=k+5.5+H*10+e.range(-2.4,2.4);l.copy(D.pos).addScaledVector(D.right,U*O),u.set(l.x,0,l.z),t.project(u,h);const q=t.sample(h.u);if(Math.abs(h.lateral)<q.width*.5+4.5)continue;const z=this.#r(l.x,l.z,h,q);if(z<.8)continue;l.y=z;const $=e.range(4.4,7.2),re=e.range(4,6.4),ee=e.range(3,4.4),Me=Math.atan2(-D.right.x*U,-D.right.z*U)+e.range(-.28,.28);s.push({at:l.clone(),w:$,d:re,h:ee,yaw:Me,col:e.pick(c)}),o.push({at:l.clone(),w:$,d:re,h:ee,yaw:Me,col:e.pick([12077114,4878204,9080692,13605434])}),e.next()<.55&&a.push({at:l.clone(),w:$,d:re,h:ee,yaw:Me})}if(!s.length)return;const p=new pe,v=new et,g=new Pt,m=new T,M=new he,x=new tn(1,1,1);x.translate(0,.5,0);const y=new Xe({map:this.tex.stucco,roughness:.9,metalness:0,vertexColors:!0}),w=new Tt(x,y,s.length);w.castShadow=!0,w.receiveShadow=!0,s.forEach((C,D)=>{g.set(0,C.yaw,0),v.setFromEuler(g),m.set(C.w,C.h,C.d),p.compose(C.at,v,m),w.setMatrixAt(D,p),w.setColorAt(D,M.setHex(C.col))}),w.instanceMatrix.needsUpdate=!0,w.instanceColor&&(w.instanceColor.needsUpdate=!0);const S=new Nn(.72,.72,1,3,1);S.rotateZ(Math.PI/2),S.rotateX(Math.PI/2),S.rotateY(Math.PI/2);const E=new Tt(S,new Xe({map:this.tex.corrugated,roughness:.68,metalness:.2,vertexColors:!0}),o.length);E.castShadow=!0,o.forEach((C,D)=>{g.set(0,C.yaw,0),v.setFromEuler(g),m.set(C.w*1.16,C.d*1,C.d*1.16),p.compose(C.at.clone().setY(C.at.y+C.h+C.d*.16),v,m),E.setMatrixAt(D,p),E.setColorAt(D,M.setHex(C.col))}),E.instanceMatrix.needsUpdate=!0,E.instanceColor&&(E.instanceColor.needsUpdate=!0);const L=new Nn(.11,.13,1,5);L.translate(0,.5,0);const b=new Tt(L,new Xe({map:this.tex.plank,color:11043930,roughness:.92}),a.length*2);let _=0;a.forEach(C=>{g.set(0,C.yaw,0),v.setFromEuler(g);const D=Math.sin(C.yaw),U=Math.cos(C.yaw);for(const k of[-1,1]){const H=C.at.clone();H.x+=D*(C.d*.62)+Math.cos(C.yaw)*k*C.w*.42,H.z+=U*(C.d*.62)-Math.sin(C.yaw)*k*C.w*.42,m.set(1,C.h*.82,1),p.compose(H,v,m),b.setMatrixAt(_++,p)}}),b.count=_,b.instanceMatrix.needsUpdate=!0,b.castShadow=!0,this.root.add(w,E,b)}#L(e){const t=yn.gorge,n=this.ribbon,i=n.uAt(18.75);let o=n.uAt(21.35);o<i&&(o+=1);const a=26,c=[],l=[],h=new pe,u=new et,d=new T(1,1,1);let f=null;for(let ee=0;ee<=a;ee++){const Me=(i+(o-i)*(ee/a))%1,K=n.sample(Me),ce=K.width*.5+an+Math.max(.6,K.shoulder);u.setFromRotationMatrix(new pe().lookAt(K.tangent,Dn,K.normal));const be=K.pos.clone().addScaledVector(K.normal,-Ai-.5);if(f){const X=be.clone().sub(f).length()*1.08,J=be.clone().lerp(f,.5),me=new tn(ce*2+.6,.9,X);me.applyMatrix4(h.compose(J,u,d)),c.push(me);for(const Ae of[-1,1]){const Te=new tn(.3,1.5,X);Te.applyMatrix4(h.compose(J.clone().addScaledVector(K.right,Ae*(ce+.2)).addScaledVector(K.normal,-.35),u,d)),l.push(Te)}}if(ee%6===3){const X=this.#s(K.pos.x,K.pos.z),J=Math.max(2,K.pos.y-X);for(const me of[-1,1]){const Ae=new Nn(.85,1.25,J,8);Ae.translate(0,-J*.5-1,0),Ae.applyMatrix4(h.compose(K.pos.clone().addScaledVector(K.right,me*(ce*.62)),u,d)),l.push(Ae)}}f=be}if(c.length){const ee=Yn(c,!1),Me=new tt(ee,new Xe({map:this.tex.stucco,color:10129791,roughness:.94,metalness:0}));Me.castShadow=!0,Me.receiveShadow=!0,Me.name="bridge-deck",this.root.add(Me),c.forEach(K=>K.dispose())}if(l.length){const ee=Yn(l,!1),Me=new tt(ee,new Xe({color:7301726,roughness:.75,metalness:.25}));Me.castShadow=!0,Me.name="bridge-truss",this.root.add(Me),l.forEach(K=>K.dispose())}const p=t.path[t.fallAt],v=p[0],g=p[2],m=this.#s(v,g)+t.depth*.72,M=this.#s(v,g),x=Math.max(6,m-M),y=t.width*.42,w=new wn,S=new Xe({map:this.tex.falls,alphaMap:this.tex.falls,transparent:!0,opacity:.9,side:Nt,roughness:.28,metalness:0,depthWrite:!1,emissive:10476031,emissiveIntensity:.18});this.fallMat=S;const E=new T(t.path[t.fallAt+1][0]-v,0,t.path[t.fallAt+1][2]-g).normalize();for(let ee=0;ee<3;ee++){const Me=y*(1-ee*.22),K=new hn(Me,x),ce=new tt(K,S);ce.position.set(v+E.x*ee*.9,M+x*.5,g+E.z*ee*.9),ce.quaternion.setFromRotationMatrix(new pe().lookAt(E,Dn,Ei)),w.add(ce)}const L=new tt(new Hl(y*.95,20).rotateX(-Math.PI/2),new Xe({color:14677247,roughness:.35,metalness:0,transparent:!0,opacity:.85}));L.position.set(v+E.x*2.4,M+.35,g+E.z*2.4),w.add(L);const b=t.path.map(ee=>new T(ee[0],this.#s(ee[0],ee[2])+.25,ee[2])),_=new gl(b,!1,"centripetal",.5),C=60,D=new Float32Array((C+1)*2*3),U=new Float32Array((C+1)*2*2),k=[],H=new T,O=new T,q=new T;for(let ee=0;ee<=C;ee++){const Me=ee/C;_.getPointAt(Me,H),_.getTangentAt(Me,O).normalize(),q.crossVectors(Ei,O).normalize();const K=t.width*.3;for(let ce=0;ce<2;ce++){const be=(ee*2+ce)*3,X=ce===0?-1:1;D[be]=H.x+q.x*K*X,D[be+1]=H.y,D[be+2]=H.z+q.z*K*X,U[(ee*2+ce)*2]=ce,U[(ee*2+ce)*2+1]=Me*24}if(ee<C){const ce=ee*2,be=ce+1,X=ce+2,J=ce+3;k.push(ce,X,be,be,X,J)}}const z=new Et;z.setAttribute("position",new at(D,3)),z.setAttribute("uv",new at(U,2)),z.setIndex(k),z.computeVertexNormals();const $=new Xe({color:5884376,roughness:.18,metalness:0,normalMap:this.tex.waterN,normalScale:new ve(.8,.8),transparent:!0,opacity:.88,envMapIntensity:1.2});this.riverMat=$,$.normalMap&&($.normalMap.wrapS=$.normalMap.wrapT=Lt);const re=new tt(z,$);re.name="gorge-river",w.add(re),w.name="waterfall",this.root.add(w)}#M(){const e=dy.map(S=>new T(S[0],S[1],S[2])),t=new gl(e,!1,"centripetal",.5),n=this.ribbon,i=n.sample(n.uAt(Pu.enter)),s=n.sample(n.uAt(Pu.exit));e[0].copy(i.pos).addScaledVector(i.right,-i.width*.42),e[e.length-1].copy(s.pos).addScaledVector(s.right,-s.width*.42),t.updateArcLengths?.();const o=220,a=[],c=fy,l=new T,h=new T,u=new T;let d=1/0,f=-1/0,p=1/0,v=-1/0;for(let S=0;S<=o;S++){const E=S/o;t.getPointAt(E,l),t.getTangentAt(E,h).normalize(),u.crossVectors(Ei,h).normalize();const L=E*(c.length-1),b=Math.min(c.length-1,Math.floor(L)),_=Math.min(c.length-1,b+1),C=L-b,D=Dy(c[b][1],c[_][1],C*C*(3-2*C));a.push({p:l.clone(),t:h.clone(),r:u.clone(),w:D}),d=Math.min(d,l.x-D),f=Math.max(f,l.x+D),p=Math.min(p,l.z-D),v=Math.max(v,l.z+D)}const g=14;d-=g,f+=g,p-=g,v+=g;const m=160,M=(f-d)/m,x=(v-p)/m,y=new Float32Array(m*m),w=new Float32Array(m*m);for(let S=0;S<m;S++){const E=p+(S+.5)*x;for(let L=0;L<m;L++){const b=d+(L+.5)*M;let _=1/0,C=null;for(let H=0;H<a.length;H++){const O=a[H],q=b-O.p.x,z=E-O.p.z,$=q*q+z*z;$<_&&(_=$,C=O)}const D=Math.sqrt(_),U=C.w*.5,k=1-ln(U,U+6,D);w[S*m+L]=k,y[S*m+L]=C.p.y}}this.shortcut={curve:t,samples:a,minX:d,minZ:p,gw:M,gh:x,GN:m,hgt:y,mask:w}}#p(){const e=this.shortcut;if(!e)return;const t=e.samples,n=t.length-1,i=4,s=new Float32Array((n+1)*i*3),o=new Float32Array((n+1)*i*2),a=[];let c=0;for(let x=0;x<=n;x++){const y=t[x];x>0&&(c+=y.p.distanceTo(t[x-1].p));const w=y.w*.5,S=[-w-1.6,-w,w,w+1.6];for(let E=0;E<i;E++){const L=S[E],b=(x*i+E)*3;s[b]=y.p.x+y.r.x*L,s[b+1]=y.p.y+(E===0||E===i-1?-.22:.02),s[b+2]=y.p.z+y.r.z*L,o[(x*i+E)*2]=L/6,o[(x*i+E)*2+1]=c/6}if(x<n)for(let E=0;E<i-1;E++){const L=x*i+E,b=L+1,_=(x+1)*i+E,C=_+1;a.push(L,_,b,b,_,C)}}const l=new Et;l.setAttribute("position",new at(s,3)),l.setAttribute("uv",new at(o,2)),l.setIndex(a),l.computeVertexNormals();const h=this.tex.dirt;for(const x of[h.map,h.normalMap])x&&(x.wrapS=x.wrapT=Lt);const u=new Xe({map:h.map,normalMap:h.normalMap,roughness:1,metalness:0,normalScale:new ve(.9,.9),polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});this.#o(u,6,58,.4);const d=new tt(l,u);d.receiveShadow=!0,d.name="shortcut",this.root.add(d);const f=e.samples[Math.floor(e.samples.length*.42)],p=[],v=new et().setFromRotationMatrix(new pe().lookAt(f.t,Dn,Ei)),g=new pe;for(let x=-6;x<=6;x++){const y=new tn(f.w+1,.16,.75);y.applyMatrix4(g.compose(f.p.clone().addScaledVector(f.t,x*.95).setY(f.p.y+.1),v,new T(1,1,1))),p.push(y)}for(const x of[-1,1]){for(let w=-6;w<=6;w+=3){const S=new tn(.14,1,.14);S.applyMatrix4(g.compose(f.p.clone().addScaledVector(f.t,w*.95).addScaledVector(f.r,x*(f.w*.5+.4)).setY(f.p.y+.6),v,new T(1,1,1))),p.push(S)}const y=new tn(.12,.12,12);y.applyMatrix4(g.compose(f.p.clone().addScaledVector(f.r,x*(f.w*.5+.4)).setY(f.p.y+1.05),v,new T(1,1,1))),p.push(y)}const m=Yn(p,!1),M=new tt(m,new Xe({map:this.tex.plank,color:11570012,roughness:.95,metalness:0}));M.castShadow=!0,M.receiveShadow=!0,this.root.add(M),p.forEach(x=>x.dispose())}#b(e,t){const n=this.shortcut;if(!n)return null;const i=Math.floor((e-n.minX)/n.gw),s=Math.floor((t-n.minZ)/n.gh);if(i<0||s<0||i>=n.GN||s>=n.GN)return null;const o=n.mask[s*n.GN+i];return o<.02?null:{k:o,y:n.hgt[s*n.GN+i]}}#m(e=4.6,t=.62){const i=[],s=[],o=[],a=new he(2055722),c=new he(7651402),l=new he;for(let u=0;u<=7;u++){const d=u/7,f=e*d,p=-1.9*d*d*d-.15*d,v=1+(u%2===0?.16:-.16),g=t*Math.sin(Math.PI*Math.pow(d,.62))*v+.03;if(l.copy(a).lerp(c,.25+d*.75),i.push(f,p+.05,0),s.push(l.r,l.g,l.b),i.push(f,p,-g),s.push(l.r*.8,l.g*.8,l.b*.8),i.push(f,p,g),s.push(l.r*.8,l.g*.8,l.b*.8),u<7){const m=u*3;o.push(m,m+3,m+1,m+1,m+3,m+4),o.push(m,m+2,m+3,m+2,m+5,m+3)}}const h=new Et;return h.setAttribute("position",new ut(i,3)),h.setAttribute("color",new ut(s,3)),h.setIndex(o),h.computeVertexNormals(),h}#A(e){const t=this.q,n=this.ribbon,i=t==="low"?150:t==="medium"?300:460,s=t==="low"?7:9,o=t==="low"?260:t==="medium"?620:1100,a=t==="low"?300:t==="medium"?800:1500,c=t==="low"?120:340,l=new pe,h=new et,u=new Pt,d=new T(1,1,1),f=new T,p=new T,v=new T,g={u:0,lateral:0,distAlong:0,forward:new T,index:0},m=new he,M=(ue,Z,qe,de,ze)=>{const ct=e.next(),rt=n.sample(ct),P=e.sign(),V=rt.width*.5+an+Math.max(.6,rt.shoulder)+ue+e.range(0,Z);p.copy(rt.pos).addScaledVector(rt.right,P*V),v.set(p.x,0,p.z),n.project(v,g);const Y=n.sample(g.u);if(Math.abs(g.lateral)<Y.width*.5+ze||this.#b(p.x,p.z))return null;const te=this.#s(p.x,p.z);return te<qe||te>de?null:(p.y=te,{fr:rt,frp:Y,gy:te})},x=new T,y=(ue,Z)=>{const qe=Z-yn.coastZ,de=ue-yn.coastX;return qe<de?x.set(0,0,-1):x.set(-1,0,0),x},w=7.4,S=1.45,E=new T(S,w,0),L=new Nn(.16,.32,w,7,5);L.translate(0,w*.5,0);{const ue=L.attributes.position;for(let Z=0;Z<ue.count;Z++){const de=ue.getY(Z)/w;ue.setX(Z,ue.getX(Z)+S*de*de);const ze=1+Math.sin(de*42)*.035;ue.setX(Z,ue.getX(Z)*1),ue.setZ(Z,ue.getZ(Z)*ze)}L.computeVertexNormals()}const b=new ta(.34,.9,7);b.translate(S,w+.2,0);const _=Yn([L,b],!1);L.dispose(),b.dispose();const C=new Xe({map:this.tex.bark,color:10517584,roughness:.95,metalness:0}),D=this.#m(4.7,.66),U=new Xe({vertexColors:!0,side:Nt,roughness:.72,metalness:0,color:16777215}),k=new Tt(_,C,i),H=new Tt(D,U,i*s);k.castShadow=!0,H.castShadow=t==="ultra",H.receiveShadow=!1;const O=new T,q=new et,z=new et;let $=0,re=0,ee=0;for(;$<i&&ee++<i*14;){if(!M(4,44,.7,26,4.5)||p.y>8&&e.next()<.72)continue;const Z=e.range(.78,1.24),qe=y(p.x,p.z),de=Math.atan2(qe.x,qe.z)+e.range(-.55,.55),ze=e.range(.05,.19);z.setFromAxisAngle(Ei,de),q.setFromAxisAngle(new T(0,0,1),0),u.set(0,de,0),h.setFromEuler(u);const ct=new et().setFromAxisAngle(new T(0,0,-1),ze);h.multiply(ct),l.compose(p,h,d.clone().multiplyScalar(Z)),k.setMatrixAt($,l),O.copy(E).multiplyScalar(Z).applyQuaternion(h).add(p),O.y+=.15*Z;for(let rt=0;rt<s;rt++){const P=rt/s*Math.PI*2+e.range(-.14,.14)+de,A=e.range(.16,.62);u.set(0,P,A);const V=new et().setFromEuler(u);V.premultiply(ct);const Y=Z*e.range(.82,1.16);l.compose(O,V,f.set(Y,Y,Y)),H.setMatrixAt(re++,l)}$++}k.count=$,H.count=re,k.instanceMatrix.needsUpdate=!0,H.instanceMatrix.needsUpdate=!0,this.root.add(k,H),this.palmCount=$;const Me=new Nn(.16,.34,4.6,5);Me.translate(0,2.3,0);const K=new Tt(Me,new Xe({map:this.tex.bark,color:9267781,roughness:.95}),o),ce=new na(1,0);{const ue=ce.attributes.position;for(let Z=0;Z<ue.count;Z++)ue.setY(Z,ue.getY(Z)*.72),ue.setX(Z,ue.getX(Z)*(.9+cs(Z,3,71)*.35)),ue.setZ(Z,ue.getZ(Z)*(.9+cs(Z,7,91)*.35));ce.computeVertexNormals()}const be=new Tt(ce,new Xe({roughness:.86,metalness:0,flatShading:!0,vertexColors:!1}),o);be.castShadow=t!=="low",K.castShadow=t!=="low";let X=0;ee=0;const J=[3111480,2386480,4034367,2055980,5216834,2780490];for(;X<o&&ee++<o*10;){if(!M(6,240,4.5,130,6))continue;const Z=e.range(.8,2.1);u.set(0,e.range(0,Math.PI*2),0),h.setFromEuler(u),l.compose(p,h,f.set(Z,Z*e.range(.85,1.25),Z)),K.setMatrixAt(X,l);const qe=Z*e.range(1.9,3.1);l.compose(p.clone().setY(p.y+4.4*Z),h,f.set(qe,qe*.86,qe)),be.setMatrixAt(X,l),be.setColorAt(X,m.setHex(e.pick(J))),X++}K.count=X,be.count=X,K.instanceMatrix.needsUpdate=!0,be.instanceMatrix.needsUpdate=!0,be.instanceColor&&(be.instanceColor.needsUpdate=!0),this.root.add(K,be);const me=new na(1,0);{const ue=me.attributes.position;for(let Z=0;Z<ue.count;Z++)ue.setY(Z,ue.getY(Z)*.62+.3),ue.setX(Z,ue.getX(Z)*(.85+cs(Z,11,31)*.5));me.computeVertexNormals()}const Ae=new Tt(me,new Xe({roughness:.92,metalness:0,flatShading:!0}),a);let Te=0;ee=0;const Qe=[4098876,2912051,5873732,7313978,9086268,3111509];for(;Te<a&&ee++<a*8;){if(!M(3.2,170,1.4,140,3.4))continue;const Z=e.range(.5,1.5);u.set(e.range(-.1,.1),e.range(0,Math.PI*2),e.range(-.1,.1)),h.setFromEuler(u),l.compose(p,h,f.set(Z*e.range(.8,1.4),Z*e.range(.6,1.1),Z*e.range(.8,1.4))),Ae.setMatrixAt(Te,l),Ae.setColorAt(Te,m.setHex(e.pick(Qe))),Te++}Ae.count=Te,Ae.instanceMatrix.needsUpdate=!0,Ae.instanceColor&&(Ae.instanceColor.needsUpdate=!0),this.root.add(Ae);const Vt=new Vl(1,0),I=new Tt(Vt,new Xe({map:this.tex.ground.rock,color:12169376,roughness:.98,metalness:0,flatShading:!0}),c);I.castShadow=t!=="low",I.receiveShadow=!0;let mt=0;for(ee=0;mt<c&&ee++<c*8;){if(!M(2.6,200,-1,150,3))continue;const Z=e.range(.5,2.6);u.set(e.range(0,1),e.range(0,Math.PI*2),e.range(0,1)),h.setFromEuler(u),l.compose(p.clone().setY(p.y-Z*.35),h,f.set(Z*e.range(.8,1.5),Z*e.range(.5,1),Z*e.range(.8,1.5))),I.setMatrixAt(mt++,l)}I.count=mt,I.instanceMatrix.needsUpdate=!0,this.root.add(I);const Be=t==="low"?0:26;if(Be){const ue=new Nn(.05,.05,2.3,5);ue.translate(0,1.15,0);const Z=new ta(1.5,.75,9);Z.translate(0,2.35,0);const qe=new Tt(ue,new Xe({color:14208436,roughness:.8}),Be),de=new Tt(Z,new Xe({roughness:.7,metalness:0,side:Nt}),Be);de.castShadow=!0;const ze=[14164778,16765470,2010699,15922936,3126182];let ct=0;for(ee=0;ct<Be&&ee++<Be*24;){if(!M(6,40,.6,3.4,6))continue;u.set(e.range(-.06,.06),e.range(0,Math.PI*2),e.range(-.06,.06)),h.setFromEuler(u);const P=e.range(.85,1.15);l.compose(p,h,f.set(P,P,P)),qe.setMatrixAt(ct,l),de.setMatrixAt(ct,l),de.setColorAt(ct,m.setHex(e.pick(ze))),ct++}qe.count=ct,de.count=ct,qe.instanceMatrix.needsUpdate=!0,de.instanceMatrix.needsUpdate=!0,de.instanceColor&&(de.instanceColor.needsUpdate=!0),this.root.add(qe,de)}}#P(){const e=this,t=this.ribbon,n=new T,i={u:0,lateral:0,distAlong:0,forward:new T,index:0},s={y:0,normal:new T(0,1,0),surface:"grass",onTrack:!1,banking:0},o=(a,c)=>{for(const l of e.boostRanges){let h=Math.abs(a-l.u);if(h>.5&&(h=1-h),!(h>l.half)){for(const u of l.lanes)if(Math.abs(c-u)<1.4)return!0}}return!1};return{trackLength:e.trackLength,checkpoints:e.checkpoints,checkpointCount:e.checkpoints.length,itemBoxSpots:e.itemBoxSpots,minY:-60,maxLateral:110,ribbon:t,sampleGround(a,c){n.set(a,0,c),t.project(n,i);const l=t.sample(i.u),h=i.lateral,u=l.width*.5,d=Math.max(.6,l.shoulder),f=Math.abs(h);if(s.banking=l.banking,f<=u)s.y=l.pos.y+l.right.y*h,s.normal.copy(l.normal),s.surface=o(i.u,h)?"boost":"road",s.onTrack=!0;else if(f<=u+an)s.y=l.pos.y+l.right.y*h+dr,s.normal.copy(l.normal),s.surface="road",s.onTrack=!0;else if(f<=u+an+d)s.y=l.pos.y+l.right.y*h-Ai,s.normal.copy(l.normal),s.surface="dirt",s.onTrack=!1;else{const p=e.#r(a,c,i,l);s.normal.set(0,1,0),s.onTrack=!1;const v=e.#b(a,c);v&&v.k>.35?(s.y=p*(1-v.k)+v.y*v.k,s.surface="dirt"):(s.y=p,s.surface=p<=yn.seaLevel+.15?"water":p<2.6?"sand":"grass")}return s},sampleSpline(a){return t.sample(a)},project(a){return t.project(a)},collideWall(a,c=1){n.set(a.x,0,a.z),t.project(n,i);const l=t.sample(i.u),h=l.width*.5+an+Math.max(.6,l.shoulder),u=Math.sign(i.lateral)||1,d=u<0?l.wallL:l.wallR;if(!d||d<=.01)return null;const f=h+.55,p=Math.abs(i.lateral)+c-f;return p<=0?null:{normal:l.right.clone().multiplyScalar(-u),depth:p}},respawn(a){const c=t.sample((a%1+1)%1),l=c.pos.clone().addScaledVector(c.normal,1.4),h=new et().setFromRotationMatrix(new pe().lookAt(c.tangent,Dn,c.normal));return{position:l,quaternion:h}},startGrid(a){const h=(-(6+Math.floor(a/2)*5.5)/e.trackLength%1+1)%1,u=t.sample(h),d=(a%2===0?-1:1)*Math.min(3.4,u.width*.22),f=u.pos.clone().addScaledVector(u.right,d).addScaledVector(u.normal,.6),p=new et().setFromRotationMatrix(new pe().lookAt(u.tangent,Dn,u.normal));return{position:f,quaternion:p}}}}lateUpdate(e,t){const n=t.time.t;this.waterUniforms&&(this.waterUniforms.uTime.value=n),this.riverMat?.normalMap&&this.riverMat.normalMap.offset.set(n*.02,-n*.55),this.fallMat?.map&&(this.fallMat.map.offset.y=-n*1.35%1),this.boostMat&&(this.boostMat.emissiveIntensity=1.3+Math.sin(n*6)*.5,this.tex.boost&&(this.tex.boost.offset.y=-n*1.6%1))}dispose(){this.root?.traverse(e=>{e.geometry?.dispose?.();const t=e.material;Array.isArray(t)?t.forEach(n=>n.dispose?.()):t?.dispose?.()}),this.root?.parent?.remove(this.root)}}function Uy(r,e,t){return os(ln(.42+t*.22,.95,r)+ln(52+t*34,118+t*30,e),0,1)}class Ny extends er{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new zy(t)}),this.register(function(t){return new Hy(t)}),this.register(function(t){return new Zy(t)}),this.register(function(t){return new Jy(t)}),this.register(function(t){return new Qy(t)}),this.register(function(t){return new Gy(t)}),this.register(function(t){return new Wy(t)}),this.register(function(t){return new Xy(t)}),this.register(function(t){return new qy(t)}),this.register(function(t){return new By(t)}),this.register(function(t){return new Yy(t)}),this.register(function(t){return new Vy(t)}),this.register(function(t){return new Ky(t)}),this.register(function(t){return new jy(t)}),this.register(function(t){return new Fy(t)}),this.register(function(t){return new $y(t)}),this.register(function(t){return new e_(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Rr.extractUrlBase(e);o=Rr.resolveURL(l,this.path)}else o=Rr.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){i?i(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new Jd(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,o,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===rf){try{o[Je.KHR_BINARY_GLTF]=new t_(e)}catch(u){i&&i(u);return}s=JSON.parse(o[Je.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new p_(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case Je.KHR_MATERIALS_UNLIT:o[u]=new Oy;break;case Je.KHR_DRACO_MESH_COMPRESSION:o[u]=new n_(s,this.dracoLoader);break;case Je.KHR_TEXTURE_TRANSFORM:o[u]=new i_;break;case Je.KHR_MESH_QUANTIZATION:o[u]=new s_;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function ky(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const Je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Fy{constructor(e){this.parser=e,this.name=Je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let l;const h=new he(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Yt);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Ar(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new _m(h),l.distance=u;break;case"spot":l=new xm(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),qn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class Oy{constructor(){this.name=Je.KHR_MATERIALS_UNLIT}getMaterialType(){return Qn}extendParams(e,t,n){const i=[];e.color=new he(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Yt),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,it))}return Promise.all(i)}}class By{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class zy{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ve(a,a)}return Promise.all(s)}}class Hy{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class Vy{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class Gy{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new he(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Yt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,it)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class Wy{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class Xy{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new he().setRGB(a[0],a[1],a[2],Yt),Promise.all(s)}}class qy{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class Yy{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new he().setRGB(a[0],a[1],a[2],Yt),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,it)),Promise.all(s)}}class jy{constructor(e){this.parser=e,this.name=Je.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class Ky{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:dn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class Zy{constructor(e){this.parser=e,this.name=Je.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class Jy{constructor(e){this.parser=e,this.name=Je.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}}class Qy{constructor(e){this.parser=e,this.name=Je.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}}class $y{constructor(e){this.name=Je.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class e_{constructor(e){this.name=Je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==Rn.TRIANGLES&&l.mode!==Rn.TRIANGLE_STRIP&&l.mode!==Rn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(const p of u){const v=new pe,g=new T,m=new et,M=new T(1,1,1),x=new Tt(p.geometry,p.material,d);for(let y=0;y<d;y++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,y),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,y),c.SCALE&&M.fromBufferAttribute(c.SCALE,y),x.setMatrixAt(y,v.compose(g,m,M));for(const y in c)if(y==="_COLOR_0"){const w=c[y];x.instanceColor=new qs(w.array,w.itemSize,w.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&p.geometry.setAttribute(y,c[y]);bt.prototype.copy.call(x,p),this.parser.assignFinalMaterial(x),f.push(x)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const rf="glTF",fr=12,Hu={JSON:1313821514,BIN:5130562};class t_{constructor(e){this.name=Je.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,fr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==rf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-fr,s=new DataView(e,fr);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const c=s.getUint32(o,!0);if(o+=4,c===Hu.JSON){const l=new Uint8Array(e,fr+o,a);this.content=n.decode(l)}else if(c===Hu.BIN){const l=fr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class n_{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const h in o){const u=yl[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=yl[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Fs[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const p in f.attributes){const v=f.attributes[p],g=c[p];g!==void 0&&(v.normalized=g)}u(f)},a,l,Yt,d)})})}}class i_{constructor(){this.name=Je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class s_{constructor(){this.name=Je.KHR_MESH_QUANTIZATION}}class of extends Hr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,p=e*l,v=p-l,g=-2*f+3*d,m=f-d,M=1-g,x=m-d+u;for(let y=0;y!==a;y++){const w=o[v+y+a],S=o[v+y+c]*h,E=o[p+y+a],L=o[p+y]*h;s[y]=M*w+x*S+g*E+m*L}return s}}const r_=new et;class o_ extends of{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return r_.fromArray(s).normalize().toArray(s),s}}const Rn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Fs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Vu={9728:Xt,9729:Bt,9984:bd,9985:zo,9986:br,9987:un},Gu={33071:bn,33648:Ko,10497:Lt},dc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},yl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ri={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},a_={CUBICSPLINE:void 0,LINEAR:Fr,STEP:kr},fc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function c_(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Xe({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:xi})),r.DefaultMaterial}function Wi(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function qn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function l_(r,e,t){let n=!1,i=!1,s=!1;for(let l=0,h=e.length;l<h;l++){const u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){const u=e[l];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;a.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function h_(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function u_(r){let e;const t=r.extensions&&r.extensions[Je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+pc(t.attributes):e=r.indices+":"+pc(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+pc(r.targets[n]);return e}function pc(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function _l(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function d_(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const f_=new pe;class p_{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new ky,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new mm(this.options.manager):this.textureLoader=new Sm(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Jd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Wi(s,a,i),qn(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,h]of o.children.entries())s(h,a.children[l])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Je.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(Rr.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=dc[i.type],a=Fs[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new at(l,o,c))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],c=dc[i.type],l=Fs[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0;let v,g;if(f&&f!==u){const m=Math.floor(d/f),M="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let x=t.cache.get(M);x||(v=new l(a,m*f,i.count*f/h),x=new Hp(v,f/h),t.cache.add(M,x)),g=new kl(x,c,d%f/h,p)}else a===null?v=new l(i.count*c):v=new l(a,d,i.count*c),g=new at(v,c,p);if(i.sparse!==void 0){const m=dc.SCALAR,M=Fs[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,w=new M(o[1],x,i.sparse.count*m),S=new l(o[2],y,i.sparse.count*c);a!==null&&(g=new at(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let E=0,L=w.length;E<L;E++){const b=w[E];if(g.setX(b,S[E*c]),c>=2&&g.setY(b,S[E*c+1]),c>=3&&g.setZ(b,S[E*c+2]),c>=4&&g.setW(b,S[E*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(s.samplers||{})[o.sampler]||{};return h.magFilter=Vu[d.magFilter]||Bt,h.minFilter=Vu[d.minFilter]||un,h.wrapS=Gu[d.wrapS]||Lt,h.wrapT=Gu[d.wrapT]||Lt,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Xt&&h.minFilter!==Bt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(v){const g=new Dt(v);g.needsUpdate=!0,d(g)}),t.load(Rr.resolveURL(u,s.path),p,void 0,f)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),qn(u,o),u.userData.mimeType=o.mimeType||d_(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[Je.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Je.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=s.associations.get(o);o=s.extensions[Je.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Yd,zn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new qd,zn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),s&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Xe}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},c=s.extensions||{},l=[];if(c[Je.KHR_MATERIALS_UNLIT]){const u=i[Je.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,s,t))}else{const u=s.pbrMetallicRoughness||{};if(a.color=new he(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Yt),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,it)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Nt);const h=s.alphaMode||fc.OPAQUE;if(h===fc.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===fc.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Qn&&(l.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new ve(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;a.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&o!==Qn&&(l.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Qn){const u=s.emissiveFactor;a.emissive=new he().setRGB(u[0],u[1],u[2],Yt)}return s.emissiveTexture!==void 0&&o!==Qn&&l.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,it)),Promise.all(l).then(function(){const u=new o(a);return s.name&&(u.name=s.name),qn(u,s),t.associations.set(u,{materials:e}),s.extensions&&Wi(i,u,s),u})}createUniqueName(e){const t=pt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[Je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Wu(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],h=u_(l),u=i[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[Je.KHR_DRACO_MESH_COMPRESSION]?d=s(l):d=Wu(new Et,l,t),i[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const h=o[c].material===void 0?c_(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,p=h.length;f<p;f++){const v=h[f],g=o[f];let m;const M=l[f];if(g.mode===Rn.TRIANGLES||g.mode===Rn.TRIANGLE_STRIP||g.mode===Rn.TRIANGLE_FAN||g.mode===void 0)m=s.isSkinnedMesh===!0?new Gp(v,M):new tt(v,M),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===Rn.TRIANGLE_STRIP?m.geometry=Cu(m.geometry,Ld):g.mode===Rn.TRIANGLE_FAN&&(m.geometry=Cu(m.geometry,fl));else if(g.mode===Rn.LINES)m=new Kp(v,M);else if(g.mode===Rn.LINE_STRIP)m=new Bl(v,M);else if(g.mode===Rn.LINE_LOOP)m=new Zp(v,M);else if(g.mode===Rn.POINTS)m=new Jp(v,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&h_(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),qn(m,s),g.extensions&&Wi(i,m,g),t.assignFinalMaterial(m),u.push(m)}for(let f=0,p=u.length;f<p;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&Wi(i,u[0],s),u[0];const d=new wn;s.extensions&&Wi(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,p=u.length;f<p;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new nn(Qo.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ua(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),qn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],c=[];for(let l=0,h=o.length;l<h;l++){const u=o[l];if(u){a.push(u);const d=new pe;s!==null&&d.fromArray(s.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Fl(a,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],p=i.samplers[f.sampler],v=f.target,g=v.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,M=i.parameters!==void 0?i.parameters[p.output]:p.output;v.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",M)),l.push(p),h.push(v))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],p=u[2],v=u[3],g=u[4],m=[];for(let x=0,y=d.length;x<y;x++){const w=d[x],S=f[x],E=p[x],L=v[x],b=g[x];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();const _=n._createAnimationTracks(w,S,E,L,b);if(_)for(let C=0;C<_.length;C++)m.push(_[C])}const M=new cm(s,void 0,m);return qn(M,i),M})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,f_)});for(let f=0,p=u.length;f<p;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(s.isBone===!0?h=new Xd:l.length>1?h=new wn:l.length===1?h=l[0]:h=new bt,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(s.name&&(h.userData.name=s.name,h.name=o),qn(h,s),s.extensions&&Wi(n,h,s),s.matrix!==void 0){const u=new pe;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new wn;n.name&&(s.name=i.createUniqueName(n.name)),qn(s,n),n.extensions&&Wi(t,s,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)s.add(c[h]);const l=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof zn||d instanceof Dt)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=l(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,c=[];Ri[s.path]===Ri.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(Ri[s.path]){case Ri.weights:l=Ys;break;case Ri.rotation:l=js;break;case Ri.translation:case Ri.scale:l=Ks;break;default:n.itemSize===1?l=Ys:l=Ks;break}const h=i.interpolation!==void 0?a_[i.interpolation]:Fr,u=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const p=new l(c[d]+"."+Ri[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),o.push(p)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=_l(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof js?o_:of;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function m_(r,e,t){const n=e.attributes,i=new Vn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new T(c[0],c[1],c[2]),new T(l[0],l[1],l[2])),a.normalized){const h=_l(Fs[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new T,c=new T;for(let l=0,h=s.length;l<h;l++){const u=s[l];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){const v=_l(Fs[d.componentType]);c.multiplyScalar(v)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new Gn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Wu(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(c){r.setAttribute(a,c)})}for(const o in n){const a=yl[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return nt.workingColorSpace!==Yt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${nt.workingColorSpace}" not supported.`),qn(r,e),m_(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?l_(r,e.targets,t):r})}function g_(r){const e=new Map,t=new Map,n=r.clone();return af(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,o=e.get(i),a=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=a.map(function(c){return t.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),n}function af(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)af(r.children[n],e.children[n],t)}const Ao=(r,e,t=0)=>{let n=r*374761393+e*668265263+t*1442695040|0;return n=(n^n>>>13)*1274126177,((n^n>>>16)>>>0)/4294967295},Ml=r=>r*r*(3-2*r);function v_(r,e,t){const n=Math.floor(r),i=Math.floor(e),s=Ml(r-n),o=Ml(e-i),a=Ao(n,i,t),c=Ao(n+1,i,t),l=Ao(n,i+1,t),h=Ao(n+1,i+1,t);return a+(c-a)*s+(l+(h-l)*s-(a+(c-a)*s))*o}function fs(r,e,t,n){let i=0,s=.5,o=1;for(let a=0;a<t;a++)i+=s*v_(r*o,e*o,n+a),o*=2,s*=.5;return i}function Gr(r){const e=document.createElement("canvas");return e.width=e.height=r,e}function Wr(r,e,t){const n=new ImageData(e,e),i=(a,c)=>r[(c+e)%e*e+(a+e)%e];for(let a=0;a<e;a++)for(let c=0;c<e;c++){const l=(i(c+1,a)-i(c-1,a))*t,h=(i(c,a+1)-i(c,a-1))*t;let u=-l,d=-h,f=1;const p=Math.hypot(u,d,f);u/=p,d/=p,f/=p;const v=(a*e+c)*4;n.data[v]=(u*.5+.5)*255,n.data[v+1]=(d*.5+.5)*255,n.data[v+2]=(f*.5+.5)*255,n.data[v+3]=255}const s=Gr(e);s.getContext("2d").putImageData(n,0,0);const o=new Jt(s);return o.wrapS=o.wrapT=Lt,o}function x_(r=256){const e=new Float32Array(r*r),t=Gr(r),n=t.getContext("2d");n.fillStyle="#16171a",n.fillRect(0,0,r,r);for(let s=0;s<r;s++)for(let o=0;o<r;o++){const a=o/r,c=s/r;let l=.5;if(Math.min(c,1-c)<.14)l=.34+.06*Math.sin(a*Math.PI*2*26);else{const d=c<.5?-1:1,p=((a*14+d*(Math.abs(c-.5)*9))%1+1)%1,v=Math.abs(c-.5)<.055?0:1;l=(p>.22?1:.15)*v*.85+.15,l+=fs(o*.13,s*.13,3,7)*.12}e[s*r+o]=l;const u=22+l*26;n.fillStyle=`rgb(${u|0},${u*1.01|0},${u*1.06|0})`,n.fillRect(o,s,1,1)}const i=new Jt(t);return i.wrapS=i.wrapT=Lt,i.colorSpace=it,{map:i,normalMap:Wr(e,r,2.6)}}function y_(r=256){const e=new Float32Array(r*r);for(let n=0;n<r;n++)for(let i=0;i<r;i++)e[n*r+i]=fs(i*.55,n*.55,2,11)*.55+fs(i*.06,n*.06,3,3)*.45;const t=Wr(e,r,.42);return t.repeat.set(3,3),t}function __(r=256){const e=new Float32Array(r*r);for(let n=0;n<r;n++)for(let i=0;i<r;i++)e[n*r+i]=fs(i*.9,n*.05,3,23)*.8+fs(i*.04,n*.04,2,5)*.2;const t=Wr(e,r,.3);return t.repeat.set(2,2),t}function M_(r=256){const e=new Float32Array(r*r);for(let n=0;n<r;n++)for(let i=0;i<r;i++)e[n*r+i]=fs(i*1.6,n*1.6,2,41);const t=Wr(e,r,.5);return t.repeat.set(4,4),t}function b_(r=256){const e=new Float32Array(r*r),t=Gr(r),n=t.getContext("2d");for(let s=0;s<r;s++)for(let o=0;o<r;o++){const a=o/r*6,c=s/r*6,l=Math.abs((a+c)%1-.5)+Math.abs((a-c+8)%1-.5),u=Ml(Math.min(1,l*1.6))*.8+fs(o*1.1,s*1.1,2,17)*.2;e[s*r+o]=u;const d=26+u*30;n.fillStyle=`rgb(${d*1.1|0},${d*.95|0},${d*.9|0})`,n.fillRect(o,s,1,1)}const i=new Jt(t);return i.colorSpace=it,i.wrapS=i.wrapT=Lt,{map:i,normalMap:Wr(e,r,1.5)}}function S_(r=512,e=256){const t=document.createElement("canvas");t.width=r,t.height=e;const n=t.getContext("2d");n.clearRect(0,0,r,e);const i=[["#1b8f3a",.1],["#f2c521",.16],["#cf2027",.22]];for(const[h,u]of i)n.fillStyle=h,n.beginPath(),n.moveTo(0,e*u),n.lineTo(r,e*(u-.03)),n.lineTo(r,e*(u+.045)),n.lineTo(0,e*(u+.055)),n.closePath(),n.fill();const s=r*.62,o=e*.6,a=e*.27;n.save(),n.translate(s,o);const c=n.createRadialGradient(0,0,a*.4,0,0,a*1.15);c.addColorStop(0,"#f7d14a"),c.addColorStop(.65,"#e0a521"),c.addColorStop(1,"rgba(180,120,20,0)"),n.fillStyle=c,n.beginPath();for(let h=0;h<13;h++){const u=h/13*Math.PI*2,d=a*(h%2?1.14:.9);n.lineTo(Math.cos(u)*d,Math.sin(u)*d)}n.closePath(),n.fill(),n.fillStyle="#3a2a10",n.beginPath(),n.ellipse(0,a*.05,a*.52,a*.58,0,0,Math.PI*2),n.fill(),n.fillStyle="#f7d14a",n.beginPath(),n.ellipse(0,a*.02,a*.4,a*.46,0,0,Math.PI*2),n.fill(),n.fillStyle="#2a1c08",n.beginPath(),n.ellipse(-a*.17,-a*.1,a*.075,a*.1,0,0,Math.PI*2),n.fill(),n.beginPath(),n.ellipse(a*.17,-a*.1,a*.075,a*.1,0,0,Math.PI*2),n.fill(),n.beginPath(),n.ellipse(0,a*.22,a*.13,a*.1,0,0,Math.PI*2),n.fill(),n.restore();const l=new Jt(t);return l.colorSpace=it,l.anisotropy=4,l}function w_(r=128){const e=Gr(r),t=e.getContext("2d");t.clearRect(0,0,r,r);const n=t.createRadialGradient(r/2,r/2,0,r/2,r/2,r/2);n.addColorStop(0,"rgba(0,0,0,0.86)"),n.addColorStop(.42,"rgba(0,0,0,0.60)"),n.addColorStop(.72,"rgba(0,0,0,0.20)"),n.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=n,t.fillRect(0,0,r,r);const i=new Jt(e);return i.colorSpace=it,i}function T_(r=256){const e=Gr(r),t=e.getContext("2d");t.clearRect(0,0,r,r);const n=["#118a3c","#f5c518","#d02128"];for(let s=0;s<3;s++){t.fillStyle=n[s],t.beginPath();const o=r*(.3+s*.135);t.moveTo(r*.1,o),t.lineTo(r*.5,o-r*.16),t.lineTo(r*.9,o),t.lineTo(r*.9,o+r*.075),t.lineTo(r*.5,o-r*.085),t.lineTo(r*.1,o+r*.075),t.closePath(),t.fill()}const i=new Jt(e);return i.colorSpace=it,i.anisotropy=4,i}const Lr=[{name:"rasta",body:1084221,trim:15908120,accent:12721186,rim:15908120},{name:"sunset",body:14176543,trim:16172394,accent:8004953,rim:16172394},{name:"ocean",body:1270943,trim:9427186,accent:668515,rim:13620956},{name:"lime",body:7319071,trim:15005117,accent:2644237,rim:15005117},{name:"magenta",body:11018348,trim:15840984,accent:4852525,rim:15840984},{name:"violet",body:6044328,trim:12166890,accent:2364744,rim:12166890},{name:"coal",body:2237996,trim:14240798,accent:856084,rim:14240798},{name:"cream",body:14207138,trim:3104061,accent:12066596,rim:3104061}];function Ro(r,e){if(e<=r[0][0])return r[0][1];const t=r[r.length-1];if(e>=t[0])return t[1];for(let n=1;n<r.length;n++){if(e>r[n][0])continue;const[i,s]=r[n-1],[o,a]=r[n],c=(e-i)/(o-i);return s+(a-s)*(c*c*(3-2*c))}return t[1]}const Ii=(r,e)=>r<0?-Math.pow(-r,e):Math.pow(r,e);function Xr(r,e,t,n){const i=new Et;return i.setAttribute("position",new ut(r,3)),i.setAttribute("uv",new ut(t,2)),i.setIndex(n),i.attributes.normal||i.computeVertexNormals(),i}function ui(r,e=18){const t=[],n=[],i=[];for(let s=0;s<r.length;s++){const[o,a]=r[s];for(let c=0;c<=e;c++){const l=c/e*Math.PI*2;t.push(o,Math.cos(l)*a,Math.sin(l)*a),n.push(c/e,s/(r.length-1))}}for(let s=0;s<r.length-1;s++)for(let o=0;o<e;o++){const a=s*(e+1)+o,c=a+1,l=(s+1)*(e+1)+o,h=l+1;i.push(a,l,c,c,l,h)}return Xr(t,null,n,i)}function cn(r,e,t,n=.34,i=12,s=7){const o=[],a=[],c=[];for(let h=0;h<=s;h++){const u=h/s*Math.PI-Math.PI/2,d=Ii(Math.cos(u),n),f=Ii(Math.sin(u),n);for(let p=0;p<=i;p++){const v=p/i*Math.PI*2;o.push(d*Ii(Math.cos(v),n)*r*.5,f*e*.5,d*Ii(Math.sin(v),n)*t*.5),a.push(p/i,h/s)}}for(let h=0;h<s;h++)for(let u=0;u<i;u++){const d=h*(i+1)+u,f=d+1,p=(h+1)*(i+1)+u,v=p+1;c.push(d,p,f,f,p,v)}const l=Xr(o,null,a,c);return l.computeVertexNormals(),l}function E_(r,e,t,n,i,s=12){const o=[],a=[],c=[],l=t*.5,h=r+e,u=[[-l,r],[-l*.86,h],[l*.86,h],[l,r]];for(let p=0;p<=s;p++){const v=n+(i-n)*(p/s),g=Math.cos(v),m=Math.sin(v);for(let M=0;M<u.length;M++){const[x,y]=u[M];o.push(x,m*y,g*y),a.push(p/s,M/(u.length-1))}}const d=u.length;for(let p=0;p<s;p++)for(let v=0;v<d-1;v++){const g=p*d+v,m=g+1,M=(p+1)*d+v,x=M+1;c.push(g,M,m,m,M,x)}for(const[p,v]of[[0,!1],[s,!0]]){const g=p*d,m=v?[0,1,2,0,2,3]:[0,2,1,0,3,2];for(const M of m)c.push(g+M)}const f=Xr(o,null,a,c);return f.computeVertexNormals(),f}const A_=1.03,R_=.075,Di=.215,C_=[[-1,.16],[-.93,.36],[-.8,.455],[-.58,.49],[-.2,.5],[.15,.49],[.45,.462],[.72,.4],[.9,.29],[1,.14]],L_=[[-1,.47],[-.9,.61],[-.74,.672],[-.56,.668],[-.42,.618],[-.1,.59],[.25,.578],[.55,.528],[.8,.448],[1,.372]],P_=[[-1,.24],[-.86,.152],[-.55,.112],[.2,.108],[.55,.126],[.82,.19],[1,.28]],D_=[[-1,0],[-.6,0],[-.49,1],[.24,1],[.4,0],[1,0]],$i=26,di=20,jo=12;function I_(){const r=di+jo,e=[],t=[];for(let h=0;h<=$i;h++){const u=h/$i*2-1,d=u*A_,f=Ro(C_,u),p=Ro(L_,u),v=Ro(P_,u),g=Ro(D_,u),m=Math.max(.03,f-R_),M=p-v;for(let y=0;y<di;y++){const w=y/(di-1),S=Math.PI*(1+w),E=3.1,L=Ii(Math.cos(S),2/E),b=Ii(Math.sin(S),2/E);e.push(L*f,p+b*M,d),t.push(w,h/$i*2.4)}const x=(p-Di)*g;for(let y=0;y<jo;y++){const w=y/(jo-1),S=Math.PI*(1+w),E=2.4,L=-Ii(Math.cos(S),2/E),b=Ii(Math.sin(S),2/E),_=p-.018*(1-L*L);e.push(L*m,_+b*x,d),t.push(w,h/$i*2.4)}}const n=[],i=[],s=[];for(let h=0;h<$i;h++)for(let u=0;u<r;u++){const d=(u+1)%r,f=h*r+u,p=h*r+d,v=(h+1)*r+u,g=(h+1)*r+d,m=[f,v,p,p,v,g];(u<di-1?n:u===di-1||u===r-1?i:s).push(...m)}const o=[],a=[...e],c=[...t];for(const[h,u]of[[0,!0],[$i,!1]]){let d=0,f=0,p=0;for(let g=0;g<r;g++)d+=e[(h*r+g)*3],f+=e[(h*r+g)*3+1],p+=e[(h*r+g)*3+2];const v=a.length/3;a.push(d/r,f/r,p/r),c.push(.5,.5);for(let g=0;g<r;g++){const m=h*r+g,M=h*r+(g+1)%r;o.push(...u?[v,M,m]:[v,m,M])}}const l=(h,u=e,d=t)=>{const f=Xr(u,null,d,h);return f.computeVertexNormals(),f};return{hull:Yn([l(n),l(o,a,c)],!1),lip:l(i),well:l(s),grid:{pos:e,RING:r}}}function mc(r,e,t,n,i,s=.009,o=!1,a="x"){const{pos:c,RING:l}=r,h=[],u=[],d=[],f=new T,p=new T,v=new T,g=new T,m=t-e,M=i-n,x=(S,E,L)=>L.fromArray(c,(S*l+E)*3);for(let S=e;S<=t;S++)for(let E=n;E<=i;E++){x(S,E,p),x(Math.min(S+1,$i),E,v),x(S,Math.min(E+1,l-1),g),f.copy(v).sub(p).cross(g.clone().sub(p)).normalize(),f.lengthSq()<.5&&f.set(0,1,0),(a==="x"?f.x*p.x<0:f.y<0)&&f.negate(),h.push(p.x+f.x*s,p.y+f.y*s,p.z+f.z*s);const L=(S-e)/m;u.push(o?1-L:L,1-(E-n)/M)}const y=M+1;for(let S=0;S<m;S++)for(let E=0;E<M;E++){const L=S*y+E;d.push(L,L+y,L+1,L+1,L+y,L+y+1)}const w=Xr(h,null,u,d);return w.computeVertexNormals(),w}let Co=null;function cf(){if(Co)return Co;const r=x_(256),e=b_(256),t=y_(256),n=__(256),i=M_(256),s=S_(512,256),o=T_(256),a=w_(128);for(const p of[r.map,r.normalMap,e.map,e.normalMap,t,n,i])p&&(p.wrapS=p.wrapT=Lt);r.map.repeat.set(6,1),r.normalMap.repeat.set(6,1);const c=new Xe({color:13029078,metalness:1,roughness:.15,normalMap:n,normalScale:new ve(.22,.22),envMapIntensity:1.5}),l=new Xe({color:1184534,metalness:0,roughness:.96,map:r.map,normalMap:r.normalMap,normalScale:new ve(1.35,1.35),envMapIntensity:.22}),h=new Xe({color:1645859,metalness:.1,roughness:.62,normalMap:i,normalScale:new ve(.5,.5),envMapIntensity:.55}),u=new Xe({color:2369325,roughness:.8,metalness:.02,map:e.map,normalMap:e.normalMap,envMapIntensity:.45}),d=new dn({color:16772800,emissive:16764786,emissiveIntensity:.9,roughness:.08,metalness:0,clearcoat:1}),f=new Qn({map:a,transparent:!0,depthWrite:!1,opacity:.62,color:0,toneMapped:!1});return Co={tyre:r,seat:e,paintN:t,metalN:n,plasticN:i,livery:s,hood:o,blob:a,chrome:c,rubber:l,darkPlastic:h,seatMat:u,glass:d,blobMat:f,tub:I_(),liveryMats:new Map},Co}function U_(r){const e=cf();if(e.liveryMats.has(r))return e.liveryMats.get(r);const t=Lr[r%Lr.length],n={liv:t,paint:new dn({color:t.body,metalness:0,roughness:.36,clearcoat:.95,clearcoatRoughness:.075,normalMap:e.paintN,normalScale:new ve(.16,.16),envMapIntensity:.7}),trim:new dn({color:t.trim,metalness:.18,roughness:.3,clearcoat:.85,clearcoatRoughness:.1,envMapIntensity:.85}),accent:new dn({color:t.accent,metalness:.05,roughness:.34,clearcoat:.85,clearcoatRoughness:.1,envMapIntensity:.7}),rim:new Xe({color:t.rim,metalness:.75,roughness:.28,normalMap:e.metalN,normalScale:new ve(.2,.2),envMapIntensity:1.1}),decal:new Xe({map:e.livery,transparent:!0,roughness:.3,metalness:0,envMapIntensity:.5,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,side:Nt,alphaTest:.02}),hood:new Xe({map:e.hood,transparent:!0,roughness:.3,metalness:0,envMapIntensity:.5,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,side:Nt,alphaTest:.02})};return e.liveryMats.set(r,n),n}function N_(){return ui([[-.5,.6],[-.5,.855],[-.455,.965],[-.33,1],[.33,1],[.455,.965],[.5,.855],[.5,.6]],20)}function k_(){return ui([[-.4,0],[-.4,.2],[-.44,.4],[-.4,.585],[-.36,.635],[.36,.635],[.4,.585],[.44,.4],[.4,.2],[.4,0]],14)}const Lo=[{name:"FL",x:.545,z:.655,r:.255,w:.205,front:!0},{name:"FR",x:-.545,z:.655,r:.255,w:.205,front:!0},{name:"RL",x:.555,z:-.655,r:.335,w:.325,front:!1},{name:"RR",x:-.555,z:-.655,r:.335,w:.325,front:!1}];class F_{constructor(e=0,t="high"){const n=cf(),i=U_(e);this.livery=i.liv,this.quality=t,this.materials=i,this.owned=[];const s=new wn;s.name=`kart:${i.liv.name}`,this.root=s;const o=[],a=[],c=[],l=[],h=[],u=[],d=[],f=(K,ce,be)=>{be&&ce.applyMatrix4(be),K.push(ce)},p=(K,ce,be,X=0,J=0,me=0)=>new pe().compose(new T(K,ce,be),new et().setFromEuler(new Pt(X,J,me)),new T(1,1,1));o.push(n.tub.hull.clone()),a.push(n.tub.lip.clone()),l.push(n.tub.well.clone());for(const K of Lo){const ce=K.front?.055:.075,be=E_(K.r+.045,K.front?.055:.072,K.w+ce*2,Math.PI*.06,Math.PI*.94,K.front?9:12);f(o,be,p(K.x,K.r,K.z))}for(const K of[-1,1]){const ce=cn(.16,.2,1.02,.32,10,6);f(a,ce,p(K*.485,.285,-.02));const be=cn(.055,.055,.94,.3,8,5);f(h,be,p(K*.545,.325,-.02))}const v=cn(.5,.24,.34,.3,12,7);f(a,v,p(0,.4,.9));const g=new as(.3,.045,7,16,Math.PI*1.05);f(c,g,p(0,.315,1,Math.PI/2,0,-Math.PI*.025));const m=new as(.34,.05,7,16,Math.PI*1.05);f(c,m,p(0,.34,-1.02,Math.PI/2,Math.PI,-Math.PI*.025));for(let K=0;K<4;K++){const ce=cn(.4,.028,.05,.28,6,4);f(l,ce,p(0,.22+K*.045,.965))}for(const K of[-1,1]){const ce=ui([[-.03,0],[-.03,.055],[.02,.07],[.03,.055],[.03,0]],10);ce.rotateY(Math.PI/2),f(d,ce,p(K*.19,.455,1.005))}const M=cn(.44,.09,.42,.28,10,5);f(u,M,p(0,Di+.075,-.235));const x=cn(.46,.5,.14,.26,10,6);f(u,x,p(0,Di+.3,-.455,-.2));for(const K of[-1,1]){const ce=cn(.09,.42,.17,.3,8,5);f(u,ce,p(K*.2,Di+.27,-.41,-.2))}const y=new as(.15,.032,6,14,Math.PI);f(c,y,p(0,Di+.545,-.5,-.2,0,0));const w=cn(.62,.1,.24,.3,10,5);f(l,w,p(0,.5,.375,-.42));for(let K=-1;K<=1;K++){const ce=ui([[-.012,0],[-.012,.05],[.012,.05],[.012,0]],10);ce.rotateX(Math.PI/2-.42),f(h,ce,p(K*.16,.547,.39))}const S=ui([[-.2,.03],[.2,.03]],8);S.rotateY(Math.PI/2),f(c,S,p(0,.545,.055,.6));const E=cn(.44,.3,.34,.22,10,6);f(l,E,p(0,.6,-.82));for(let K=0;K<4;K++){const ce=cn(.48,.035,.3,.22,8,4);f(c,ce,p(0,.6+(K-1.5)*.075,-.82))}for(const K of[-1,1]){const ce=ui([[-.34,.055],[.2,.062],[.34,.07]],10);ce.rotateY(Math.PI/2),f(c,ce,p(K*.3,.545,-1.02,-.22,0,K*.1));const be=ui([[-.05,0],[-.05,.07],[.03,.086],[.05,.078],[.055,.05],[.02,.045],[.02,0]],10);be.rotateY(Math.PI/2),f(h,be.clone(),p(K*.325,.612,-1.3,-.22,0,K*.1)),this[`exhaust${K<0?"R":"L"}`]={x:K*.325,y:.612,z:-1.3}}const L=cn(.98,.05,.26,.2,10,4);f(h,L,p(0,.905,-.99,.13));const b=cn(.98,.04,.07,.2,8,4);f(a,b,p(0,.928,-1.11,.13));for(const K of[-1,1]){const ce=cn(.045,.26,.11,.22,6,4);f(c,ce,p(K*.36,.775,-.97,.13))}for(const K of Lo){const ce=ui([[-.09,.038],[.09,.038]],8);ce.rotateZ(Math.PI/2),f(c,ce,p(K.x*.68,K.r+.13,K.z))}const _=[mc(n.tub.grid,7,20,0,3,.01,!1),mc(n.tub.grid,7,20,di-4,di-1,.01,!0)],C=[mc(n.tub.grid,20,25,di+1,di+jo-2,.012,!1,"y")],D=(K,ce,be,X=!1)=>{if(!K.length)return null;const J=Yn(K,!1);for(const Ae of K)Ae.dispose();if(!J)return null;this.owned.push(J);const me=new tt(J,ce);return me.name=be,me.castShadow=X,me.receiveShadow=!0,s.add(me),me};this.paintMesh=D(o,i.paint,"body",!0),D(a,i.trim,"trim",!1),D(c,n.chrome,"chrome",!1),D(l,n.darkPlastic,"dark",!1),this.accentMesh=D(h,i.accent,"accent",!1),D(u,n.seatMat,"seat",!0),D(_,i.decal,"decal",!1),D(C,i.hood,"hood",!1),D(d,n.glass,"lamps",!1);const U=[],k=new as(.158,.026,7,18);U.push(k);for(let K=0;K<3;K++){const ce=K*(Math.PI*2/3)+Math.PI/2,be=cn(.135,.028,.022,.25,6,4);be.applyMatrix4(new pe().compose(new T(Math.cos(ce)*.075,Math.sin(ce)*.075,0),new et().setFromEuler(new Pt(0,0,ce)),new T(1,1,1))),U.push(be)}const H=ui([[-.018,0],[-.018,.05],[.018,.05],[.018,0]],12);H.rotateY(Math.PI/2),U.push(H);const O=Yn(U,!1);for(const K of U)K.dispose();this.owned.push(O);const q=new wn;q.position.set(0,.632,.175),q.rotation.x=.62;const z=new tt(O,n.darkPlastic);z.name="wheelrim",q.add(z),s.add(q),this.steeringWheel=q;const $=.168;this.gripL=new T(Math.cos(.42)*$,Math.sin(.42)*$,.045),this.gripR=new T(-Math.cos(.42)*$,Math.sin(.42)*$,.045);const re=N_(),ee=k_();this.owned.push(re,ee),this.tyres=new Tt(re,n.rubber,4),this.rims=new Tt(ee,i.rim,4),this.tyres.castShadow=!0,this.tyres.receiveShadow=!0,this.rims.receiveShadow=!0;for(const K of[this.tyres,this.rims])K.instanceMatrix.setUsage(Zn),K.frustumCulled=!1,s.add(K);this.spin=[0,0,0,0],this.#o=new bt,this.#e([.24,.24,.24,.24]);const Me=new hn(1.75,2.45);Me.rotateX(-Math.PI/2),this.owned.push(Me),this.blob=new tt(Me,n.blobMat.clone()),this.blob.position.y=.02,this.blob.renderOrder=-1,this.blob.frustumCulled=!1,s.add(this.blob),this.driverAnchor=new bt,this.driverAnchor.position.set(0,Di+.205,-.2),this.footAnchor=new T(0,Di+.03,.22),this.seatY=Di+.205}#o;#e(e,t=0){const n=this.#o;for(let i=0;i<4;i++){const s=Lo[i],o=e[i]??.24,a=Math.max(-.085,Math.min(.085,(o-.24)*.42));n.position.set(s.x,s.r+a,s.z),n.quaternion.setFromEuler(new Pt(this.spin[i],s.front?t:0,0,"YXZ")),n.scale.set(s.w,s.r,s.r),n.updateMatrix(),this.tyres.setMatrixAt(i,n.matrix),n.scale.set(s.w*1.02,s.r,s.r),n.updateMatrix(),this.rims.setMatrixAt(i,n.matrix)}this.tyres.instanceMatrix.needsUpdate=!0,this.rims.instanceMatrix.needsUpdate=!0}update(e,t){const n=e.steerAngle??0,i=e.forwardSpeed??e.speed??0,s=[0,1,2,3].map(c=>e.wheelContacts?.[c]?.compression??.24);for(let c=0;c<4;c++)this.spin[c]+=i/Lo[c].r*t;this.#e(s,n*.55),this.steeringWheel&&(this.steeringWheel.rotation.z=-n*1.6);const o=(e.boost?.timer??0)>0,a=this.accentMesh?.material;if(a){const c=o?1.6:0;a.emissive.setRGB(1,.45,.12),a.emissiveIntensity+=(c-a.emissiveIntensity)*Math.min(1,t*12)}if(this.blob){const c=e.onGround?.62:.12,l=this.blob.material;l.opacity+=(c-l.opacity)*Math.min(1,t*8)}}dispose(){for(const e of this.owned)e.dispose?.();this.owned.length=0,this.blob?.material?.dispose?.()}}const lf="./",O_=`${lf}assets/characters/rasta.glb`,B_=`${lf}assets/characters/rasta.rig.json`,ls=(r,e,t)=>r<e?e:r>t?t:r,gc=(r,e,t,n)=>r+(e-r)*(1-Math.exp(-t*n)),vc=Math.PI/180,es="Right",ts="Left",z_={Hip:[-7,0,0],Belly:[7,0,0],Chest:[10,0,0],Head:[-8,0,0],[`${ts}_Thigh`]:[-84,-4,-15],[`${ts}_Leg`]:[74,2,4],[`${ts}_Foot`]:[-18,0,-6],[`${es}_Thigh`]:[-84,4,15],[`${es}_Leg`]:[74,-2,-4],[`${es}_Foot`]:[-18,0,6],[`${ts}_Arm`]:[0,22,58],[`${ts}_Forearm`]:[0,46,0],[`${ts}_Hand`]:[-80,0,0],[`${es}_Arm`]:[0,-22,-58],[`${es}_Forearm`]:[0,-46,0],[`${es}_Hand`]:[-80,0,0]},H_=[{side:es,axis:new T(1,0,0),grip:"gripL",out:1},{side:ts,axis:new T(-1,0,0),grip:"gripR",out:-1}],V_=[["Beanie","beanie",.5],["Dread_L","dreadL",1],["Dread_C","dreadC",1.15],["Dread_R","dreadR",1]];function hf(r){const e={},t=new Pt;for(const[n,i]of Object.entries(r))t.set((i[0]??0)*vc,(i[1]??0)*vc,(i[2]??0)*vc,"XYZ"),e[n]=new et().setFromEuler(t);return e}const G_=hf(z_);class Ci{constructor(e,t,n=.6){this.k=e,this.d=t,this.limit=n,this.x=0,this.v=0}step(e,t){return this.v+=(-this.k*(this.x-e)-this.d*this.v)*t,this.x=ls(this.x+this.v*t,-this.limit,this.limit),this.x}}const pr=new T,xc=new T;new T;const Li=new T,Xi=new T,Po=new et,Pr=new et,ra=new T;function W_(r,e,t,n,i,s,o){const a=e.position.length()*o,c=t.position.length()*o;if(a<1e-5||c<1e-5)return!1;r.getWorldPosition(pr),Li.copy(n).sub(pr);const l=Li.length();if(l<1e-5)return!1;Li.multiplyScalar(1/l);const h=ls(l,Math.abs(a-c)+1e-4,a+c-1e-4),u=ls((a*a+h*h-c*c)/(2*a*h),-1,1),d=Math.acos(u);return Xi.copy(i).sub(pr),Xi.addScaledVector(Li,-Xi.dot(Li)),Xi.lengthSq()<1e-8&&Xi.set(0,-1,0).addScaledVector(Li,-Li.y*-1),Xi.normalize(),xc.copy(pr).addScaledVector(Li,Math.cos(d)*a).addScaledVector(Xi,Math.sin(d)*a),Xu(r,ra.copy(xc).sub(pr).normalize(),s),Xu(e,ra.copy(n).sub(xc).normalize(),s),l<=a+c}function Xu(r,e,t){r.parent?r.parent.getWorldQuaternion(Po):Po.identity(),Po.invert(),ra.copy(e).applyQuaternion(Po).normalize(),Pr.setFromUnitVectors(t,ra),r.quaternion.copy(Pr),r.updateMatrix(),r.matrixWorldNeedsUpdate=!0}class X_{name="characters";order=20;#o=[];#e=new Map;#t=new T;#i=new T;#s=new T;#r=new T;async init(e){this.ctx=e,e.onProgress?.(.72,"trazendo o piloto");const t=new Ny,[n,i]=await Promise.all([t.loadAsync(O_).catch(s=>(console.warn("[characters] GLB indisponível",s),null)),fetch(B_).then(s=>s.ok?s.json():null).catch(()=>null)]);this.rigData=i,this.template=n?n.scene:null,this.posesQ={};for(const[s,o]of Object.entries(i?.poses??{}))o?.euler&&(this.posesQ[s]=hf(o.euler));for(const[s,o]of Object.entries(i?.poses??{})){if(!o?.euler)continue;const a={},c=new Pt;for(const[l,h]of Object.entries(o.euler))c.set(h[0]??0,h[1]??0,h[2]??0,"XYZ"),a[l]=new et().setFromEuler(c);this.posesQ[s]=a}this.template&&this.template.traverse(s=>{if(!s.isMesh&&!s.isSkinnedMesh)return;s.castShadow=!0,s.receiveShadow=!0,s.frustumCulled=!1;const o=s.material;o&&(o.vertexColors=!0,o.roughness=.88,o.metalness=0,o.envMapIntensity=.45,o.flatShading=!0,o.needsUpdate=!0)}),e.events.on("kart:spawn",s=>this.attach(s,e));for(const s of e.karts)s.visual||this.attach(s,e);e.events.on("kart:hit",s=>this.#n(s,"hit",1)),e.events.on("kart:trick",s=>this.#n(s,"cheer",.55)),e.events.on("kart:drift-tier",s=>{(s?.tier??0)>=3&&this.#n(s.kart??s,"cheer",.35)}),e.events.on("race:finish",s=>{const o=s?.kart??s;o&&this.#n(o,(o.place??9)<=3?"victory":"sad",9,.85)}),e.onProgress?.(.85,"montando os karts")}attach(e,t=this.ctx){const n=new wn;n.name=`racer:${e.id}`;const i=e.liveryIndex??e.id??0,s=e.isPlayer?0:1+((i-1)%(Lr.length-1)+Lr.length-1)%(Lr.length-1),o=new F_(s,t.quality);n.add(o.root);let a=null,c=null;const l=1;if(this.template){a=g_(this.template),a.scale.setScalar(l);const u=o.driverAnchor.position;a.position.set(u.x,u.y-.6*l,u.z),n.add(a),c={},a.traverse(d=>{d.isBone&&(c[d.name]=d)}),c.Head&&c.Head.scale.setScalar(1.16)}e.visual=n,t.scene.add(n);const h={kart:e,group:n,kartModel:o,driver:a,bones:c,scale:l,lean:0,pitch:0,yaw:0,prevVel:new T,bob:t.rng.range(0,Math.PI*2),react:null,springs:{beanie:[new Ci(95,12,.34),new Ci(95,12,.34)],dreadL:[new Ci(54,7.6,.7),new Ci(54,7.6,.7)],dreadC:[new Ci(48,7,.75),new Ci(48,7,.75)],dreadR:[new Ci(54,7.6,.7),new Ci(54,7.6,.7)]}};this.#o.push(h),this.#e.set(e.id,h),c&&this.#h(h,0)}#n(e,t,n,i=1){const s=this.#e.get(e?.id);!s||!this.posesQ?.[t]||(s.react={pose:t,t:0,dur:n,peak:i,w:0})}#h(e,t){const n=e.bones,i=t>.001&&e.react?this.posesQ[e.react.pose]:null;for(const[s,o]of Object.entries(G_)){const a=n[s];if(!a)continue;a.quaternion.copy(o);const c=i?.[s];c&&a.quaternion.slerp(c,t)}}lateUpdate(e,t){const n=t.time.t;for(const i of this.#o){const s=i.kart;if(!i.group||(i.group.position.copy(s.position),i.group.quaternion.copy(s.quaternion),i.kartModel.update(s,e),!i.bones))continue;this.#t.copy(s.velocity).sub(i.prevVel).multiplyScalar(1/Math.max(e,1e-4)),i.prevVel.copy(s.velocity);const o=Pr.copy(i.group.quaternion).invert(),a=this.#i.copy(this.#t).applyQuaternion(o).multiplyScalar(.012),c=ls(a.x,-1.2,1.2),l=ls(a.z,-1.2,1.2),h=s.drift?.active?s.drift.dir:0,u=ls(s.speed/Math.max(1,s.stats?.topSpeed??26),0,1),d=s.steerAngle??0;let f=0;if(i.react){i.react.t+=e;const w=i.react;f=w.dur>4?Math.min(1,w.t/.35)*w.peak:Math.min(1,w.t/.12)*Math.max(0,1-w.t/w.dur)*w.peak,w.t>w.dur&&(i.react=null,f=0)}this.#h(i,f);const p=-c*.26-h*.2,v=ls(-l*.14,-.16,.22)+u*.11,g=d*.3+h*.22;i.lean=gc(i.lean,p,9,e),i.pitch=gc(i.pitch,v,8,e),i.yaw=gc(i.yaw,g,7,e);const m=1-f,M=[["Chest",.6,.55],["Belly",.3,.3],["Hip",.14,.16]];for(const[w,S,E]of M){const L=i.bones[w];L&&L.quaternion.multiply(Pr.setFromEuler(new Pt(i.pitch*S*m,i.yaw*E*m,i.lean*E*1.5*m,"XYZ")))}const x=i.bones.Head;if(x&&x.quaternion.multiply(Pr.setFromEuler(new Pt(-i.pitch*.35*m,i.yaw*.9*m,-i.lean*.5*m,"XYZ"))),i.group.updateMatrixWorld(!0),f<.6){const w=i.kartModel.steeringWheel;for(const S of H_){const E=i.bones[`${S.side}_Arm`],L=i.bones[`${S.side}_Forearm`],b=i.bones[`${S.side}_Hand`];!E||!L||!b||(this.#s.copy(i.kartModel[S.grip]),w.localToWorld(this.#s),i.group.localToWorld(this.#r.set(S.out*1.05,.1,-.45)),!W_(E,L,b,this.#s,this.#r,S.axis,i.scale))||b.quaternion.setFromEuler(new Pt(-1.35,0,S.out*.35,"XYZ"))}i.group.updateMatrixWorld(!0)}const y=Math.sin(n*11+i.bob)*.012*u;for(const[w,S,E]of V_){const L=i.bones[w];if(!L)continue;const b=i.springs[S],_=b[0].step(-l*.5*E+y,e),C=b[1].step(-c*.7*E-h*.3*E,e);L.quaternion.setFromEuler(new Pt(_,0,C,"XYZ"))}}}dispose(){for(const e of this.#o)e.kartModel?.dispose?.(),e.group?.parent?.remove(e.group);this.#o.length=0,this.#e.clear()}}const Ke={chassis:{mass:220,halfTrack:.74,halfBase:.88,radius:1.05,rideHeight:.06},suspension:{restLength:.42,sagRatio:.24,probeExtra:.22,dampingRatio:.88,reboundExtra:1.35,maxForce:42e3,wheelRadius:.42},lean:{maxRollDeg:9,freqHz:1.9,dampingRatio:.78,rollPerLatAccelDeg:.55,terrainRollDeg:6.5,terrainPitchDeg:5,maxPitchDeg:8,driftRollDeg:16},align:{groundRate:9,airRate:2.6,maxTiltDeg:55,deadband:.004},drive:{accelRef:12,peakAccel:21.5,curveExp:2.3,topSpeedOvershoot:1.06,rollDrag:.1,aeroDrag:.0016,coastDecel:6.5,brakeDecel:21,reverseTop:7.5,reverseAccel:7,reverseThreshold:.6},steer:{handlingRef:2.6,yawRateLowDeg:118,yawRateHighDeg:62,yawRateBoostDeg:50,inputRate:12,minTurnSpeed:.5,fadeInSpeed:3},grip:{stiffness:11,maxLatAccel:26,driftStiffness:3.4,driftMaxLatAccel:15.5,surface:{road:1,boost:1,dirt:.72,sand:.6,grass:.66,water:.4},spinStiffness:1.2},surfaces:{speedMul:{road:1,boost:1,dirt:.78,sand:.62,grass:.55,water:.35},dragBoost:{road:0,boost:0,dirt:5,sand:11,grass:8,water:16},offroadRecovery:.55,rumbleHeave:.9,rumbleSteerDeg:1.6,rumbleHz:17,padBoostTime:1.6,padBoostPower:1.5,padCooldown:.5},boost:{accelBonus:26,decayRate:1.5},drift:{minSpeed:6,engageSteer:.12,hopSpeed:2.9,hopWindow:.3,hopYawDeg:9,slipMinDeg:11,slipMaxDeg:34,slipRate:5,yawMulMin:.55,yawMulMax:1.55,slipSpeedCost:.1,tierThresholds:[240,510,780],chargeFast:300,chargeSlow:120,chargeFastSteer:.55,miniTurboRef:4.25,boostTime:[.62,1.674,2.633],boostPower:[1.22,1.33,1.45],airGrace:.16,breakSpeed:4},air:{gravityUp:20,gravityDown:30,pitchRateDeg:85,pitchMaxDeg:26,yawRateDeg:34,drag:.05,trickMinUp:2.2,trickWindow:.35,trickMinAir:.28,trickDuration:.45,trickBoostTime:.55,trickBoostPower:1.26,landAlignGood:.94,landPenaltyMax:.32,landHardImpact:9,landAbsorb:.75,coyote:.1},collide:{wallRestitution:.32,wallSpeedLoss:.45,wallGrazeCos:.42,wallGrazeFriction:.12,wallPush:1.02,wallEventSpeed:1.5,chargeCancelImpulse:3.5},status:{spinTurns:2.5,spinDrag:2.2,squashSpeedMul:.42,squashDrag:3}},Us={topSpeed:26,accel:12,handling:2.6,weight:1,offroad:.45,miniTurbo:4.25,grip:1},Wt=(r,e,t)=>r<e?e:r>t?t:r,Ft=r=>r<0?0:r>1?1:r,Ps=(r,e,t)=>r+(e-r)*t,mr=r=>r>0?1:r<0?-1:0,qi=(r,e)=>1-Math.exp(-r*e);function qu(r){return r=(r+Math.PI)%(Math.PI*2),r<0&&(r+=Math.PI*2),r-Math.PI}function q_(r){const e=Math.sin(r*127.1)*43758.5453123;return(e-Math.floor(e))*2-1}const yc=(r,e=0)=>Number.isFinite(r)?r:e,Ut=Math.PI/180,gr=Math.PI*2,Do=new T(0,1,0),Y_=[{key:"FL",sx:-1,sz:1},{key:"FR",sx:1,sz:1},{key:"RL",sx:-1,sz:-1},{key:"RR",sx:1,sz:-1}];class j_{constructor(e,t){this.k=e,this.ctx=t;const n=e.stats,i=Ke.chassis,s=Ke.suspension;this.mass=i.mass*(n.weight??1),this.invMass=1/this.mass,this.sag=s.restLength*s.sagRatio,this.springK=this.mass*Ke.air.gravityDown/(4*this.sag);const o=2*Math.sqrt(this.springK*(this.mass/4));this.springC=o*s.dampingRatio,this.anchorY=s.restLength-this.sag-i.rideHeight,this.wheels=Y_.map(a=>({key:a.key,front:a.sz>0,side:a.sx,local:new T(a.sx*i.halfTrack,this.anchorY,a.sz*i.halfBase),anchor:new T,pos:new T,contact:new T,normal:new T(0,1,0),len:s.restLength-this.sag,vel:0,compression:s.sagRatio,force:0,grounded:!0,surface:"road",groundY:0,spin:0})),e.wheelContacts=this.wheels,this.yaw=0,this.up=e.up,this.roll=0,this.rollVel=0,this.pitch=0,this.pitchVel=0,this.airPitch=0,this.trickSpin=0,this.fwd=new T(0,0,1),this.right=new T(1,0,0),this._v=new T,this._v2=new T,this._v3=new T,this._q=new et,this._q2=new et,this._m=new pe,this._prevVel=new T,this.speedCap=n.topSpeed,this.localAccel=new T,this.airTime=0,this.groundTime=0,this.coyote=0,this.hopTimer=0,this.hopArmed=!1,this.driftAir=0,this.launchUp=0,this.padCooldown=0,this.spin={t:0,dur:0,dir:1},this.squash={t:0,dur:0},this.trick={t:0,dur:0,kind:0,done:!1},this.wasGrounded=!0,this.prevSurface="road",this.rumble=0,this.controls={throttle:0,brake:0,steer:0,drift:!1,driftPressed:!1,item:!1}}place(e){const t=this.k;this.fwd.set(0,0,1).applyQuaternion(t.quaternion),this.yaw=Math.atan2(this.fwd.x,this.fwd.z);const n=_c(e,t.position.x,t.position.z);t.position.y=n.y+Ke.chassis.rideHeight,this.up.copy(n.normal),t.groundNormal.copy(n.normal),t.surface=n.surface,this.speedCap=t.stats.topSpeed,this.makeBasis(),this.buildQuaternion(),this.refreshWheels(e,!0)}integrate(e,t,n){const i=this.k;if(Object.assign(this.controls,n),this.tickTimers(e),i.frozen){this.frozenStep(e,t);return}this._prevVel.copy(i.velocity),this.suspension(e,t);const s=this.groundedCount>0;s?(this.coyote=Ke.air.coyote,this.groundTime+=e):(this.coyote=Math.max(0,this.coyote-e),this.groundTime=0);const o=s||this.coyote>0;s?(this.wasGrounded||this.onLanded(t),this.airTime=0):(this.wasGrounded&&this.onLeftGround(t),this.airTime+=e),this.wasGrounded=s,i.onGround=s,i.air.off=!s,i.air.time=this.airTime,this.alignUp(e,s),this.makeBasis();const a=i.velocity.dot(this.fwd),c=i.velocity.dot(this.right),l=i.velocity.dot(this.up),h=Math.hypot(a,c);this.driftMachine(e,t,s,h);const u=this.steering(e,t,a,h,o);this.yaw=qu(this.yaw+u*e);let d=a,f=c,p=l;if(o){const v=this.groundForces(e,t,a,c,h);d=v.fwd,f=v.lat,p=l+(this.springAccel-this.gravity())*e}else{const v=this.airForces(e,t,a,c);d=v.fwd,f=v.lat,p=l-this.gravity()*e,p=Math.max(p,-55)}if(i.velocity.copy(this.fwd).multiplyScalar(d).addScaledVector(this.right,f).addScaledVector(this.up,p),o){const v=1-Math.abs(this.up.y);v>.01&&(this._v.copy(Do).addScaledVector(this.up,-this.up.y).multiplyScalar(-1),i.velocity.addScaledVector(this._v,this.gravity()*v*e*.9))}i.position.addScaledVector(i.velocity,e),this._v.copy(i.velocity).sub(this._prevVel).multiplyScalar(1/e),this.localAccel.set(this._v.dot(this.right),this._v.dot(this.up),this._v.dot(this.fwd)),Number.isFinite(i.position.x+i.position.y+i.position.z)||i.position.copy(this._prevVel).set(0,0,0),i.velocity.set(yc(i.velocity.x),yc(i.velocity.y),yc(i.velocity.z))}tickTimers(e){const t=this.k;if(t.boost.timer>0&&(t.boost.timer-=e,t.boost.timer<=0&&(t.boost.timer=0,t.boost.source=null,t.boost.power=1)),this.spin.t>0&&(this.spin.t-=e,this.spin.t<=0&&(this.spin.t=0,t.spinning=!1)),this.squash.t>0&&(this.squash.t-=e,this.squash.t<=0?(this.squash.t=0,t.squashed=!1,t.squashAmount=0):t.squashAmount=Math.min(1,this.squash.t/.18)),this.trick.t>0){this.trick.t-=e;const n=1-Ft(this.trick.t/this.trick.dur);this.trickSpin=Math.sin(n*Math.PI)*(this.trick.kind===1?1:-1)*.55,this.trick.t<=0&&(this.trickSpin=0)}this.hopTimer>0&&(this.hopTimer-=e),this.padCooldown>0&&(this.padCooldown-=e)}frozenStep(e,t){const n=this.k;n.velocity.set(0,0,0),n.forwardSpeed=0,n.speed=0,this.fwd.set(0,0,1).applyQuaternion(n.quaternion),this.yaw=Math.atan2(this.fwd.x,this.fwd.z);const i=_c(t,n.position.x,n.position.z);n.position.y+=(i.y+Ke.chassis.rideHeight-n.position.y)*qi(14,e),n.surface=i.surface,n.groundNormal.copy(i.normal),this.alignUp(e,!0,i.normal),this.roll+=(0-this.roll)*qi(9,e),this.pitch+=(0-this.pitch)*qi(9,e),this.rollVel=this.pitchVel=0,this.airPitch=0,n.onGround=!0,n.air.off=!1,n.air.time=0,this.airTime=0,this.wasGrounded=!0,this.makeBasis(),this.suspension(e,t)}suspension(e,t){const n=this.k,i=Ke.suspension,s=i.restLength,o=s+i.probeExtra;let a=0,c=0,l=[0,0,0,0];this.deepest=0;for(let h=0;h<4;h++){const u=this.wheels[h];u.anchor.copy(u.local).applyQuaternion(n.quaternion).add(n.position);const d=_c(t,u.anchor.x,u.anchor.z);u.groundY=d.y,u.normal.copy(d.normal),u.surface=d.surface;const f=Math.max(.25,this.up.dot(d.normal));let p=(u.anchor.y-d.y)*Math.max(.25,d.normal.y)/f;Number.isFinite(p)||(p=o);const v=u.len,g=Wt(p,0,o);if(u.grounded=p<=s,u.grounded){c++,u.len=g,u.vel=(v-u.len)/e;const m=s-u.len,M=this.springC*(u.vel<0?i.reboundExtra:1);let x=this.springK*m+M*u.vel;x=Wt(x,0,i.maxForce),u.force=x,a+=x,p<0&&(this.deepest=Math.max(this.deepest,-p))}else u.len=g,u.vel=0,u.force=0;u.compression=Ft((s-u.len)/s),l[h]=u.compression,u.pos.copy(u.anchor).addScaledVector(this.up,-Math.min(u.len,s)),u.contact.copy(u.pos).addScaledVector(this.up,-.42*0),u.spin=(u.spin+(this.k.forwardSpeed||0)*e/i.wheelRadius)%gr}this.groundedCount=c,this.springAccel=a*this.invMass,this.compFL=l[0],this.compFR=l[1],this.compRL=l[2],this.compRR=l[3],n.surface=J_(this.wheels)}alignUp(e,t,n){const i=Ke.align,s=this._v3;if(n)s.copy(n);else if(t){s.set(0,0,0);let c=0;for(const l of this.wheels)l.grounded&&(s.add(l.normal),c++);c===0?s.copy(Do):s.multiplyScalar(1/c)}else s.copy(Do);s.lengthSq()<1e-6&&s.copy(Do),s.normalize();const o=Math.cos(i.maxTiltDeg*Ut);if(s.y<o&&(s.setY(0),s.lengthSq()<1e-6&&s.set(0,0,1),s.normalize().multiplyScalar(Math.sqrt(Math.max(0,1-o*o))),s.y=o,s.normalize()),1-this.up.dot(s)>i.deadband*i.deadband){const c=t?i.groundRate:i.airRate;this.up.lerp(s,qi(c,e)).normalize()}}makeBasis(){this.fwd.set(Math.sin(this.yaw),0,Math.cos(this.yaw)),this.fwd.addScaledVector(this.up,-this.fwd.dot(this.up)),this.fwd.lengthSq()<1e-6&&this.fwd.set(Math.sin(this.yaw),0,Math.cos(this.yaw)),this.fwd.normalize(),this.right.copy(this.up).cross(this.fwd).normalize()}leanStep(e){const t=Ke.lean,n=this.k,i=gr*t.freqHz,s=t.dampingRatio,o=Wt(this.localAccel.x,-40,40),a=Wt(this.localAccel.z,-40,40);let c=t.rollPerLatAccelDeg*Ut*o,l=-.4*Ut*a;const h=(this.compFL+this.compRL-(this.compFR+this.compRR))*.5,u=(this.compRL+this.compRR-(this.compFL+this.compFR))*.5;c+=h*t.terrainRollDeg*Ut,l+=u*t.terrainPitchDeg*Ut,n.drift.active&&(c+=n.drift.dir*t.driftRollDeg*Ut*Ft(Math.abs(this.slip)/(Ke.drift.slipMaxDeg*Ut)));const d=t.maxRollDeg*Ut,f=t.maxPitchDeg*Ut;c=Wt(c,-d,d),l=Wt(l,-f,f),this.rollVel+=(i*i*(c-this.roll)-2*s*i*this.rollVel)*e,this.pitchVel+=(i*i*(l-this.pitch)-2*s*i*this.pitchVel)*e,this.roll=Wt(this.roll+this.rollVel*e,-d*1.4,d*1.4),this.pitch=Wt(this.pitch+this.pitchVel*e,-f*1.4,f*1.4)}buildQuaternion(){const e=this.k;this._m.makeBasis(this.right,this.up,this.fwd),e.quaternion.setFromRotationMatrix(this._m);const t=Wt(this.pitch+this.airPitch,-1.2,1.2);if(this.roll!==0&&e.quaternion.multiply(this._q.setFromAxisAngle(Z_,this.roll)),t!==0&&e.quaternion.multiply(this._q.setFromAxisAngle(Yu,t)),this.trickSpin!==0&&e.quaternion.multiply(this._q.setFromAxisAngle(Yu,this.trickSpin*gr)),this.spin.t>0){const n=1-this.spin.t/Math.max(.001,this.spin.dur);e.quaternion.multiply(this._q.setFromAxisAngle(K_,this.spin.dir*n*gr*Ke.status.spinTurns))}}steering(e,t,n,i,s){const o=this.k,a=Ke.steer,c=this.controls,h=-(this.spin.t>0?0:Wt(c.steer,-1,1));if(o.steerInput+=(h-o.steerInput)*qi(a.inputRate,e),this.spin.t>0)return o.steerAngle=0,0;if(!s)return o.steerAngle=o.steerInput*.25,o.steerInput*Ke.air.yawRateDeg*Ut;const u=o.stats,d=(u.handling??Us.handling)/a.handlingRef,f=Math.max(1,u.topSpeed),p=Ft(i/f);let v=Ps(a.yawRateLowDeg,a.yawRateHighDeg,p)*Ut;if(i>f){const x=Ft((i-f)/(f*.6));v=Ps(v,a.yawRateBoostDeg*Ut,x)}v*=d;const g=Ft((i-a.minTurnSpeed)/Math.max(.01,a.fadeInSpeed-a.minTurnSpeed)),m=n<-.4?-1:1;let M;if(o.drift.active){const x=Ke.drift,w=(Wt(o.steerInput*o.drift.dir,-1,1)+1)*.5;M=o.drift.dir*v*Ps(x.yawMulMin,x.yawMulMax,w)*g;const S=o.drift.dir*Ps(x.slipMinDeg,x.slipMaxDeg,w)*Ut,E=(this.slip-S)*o.drift.dir;M-=o.drift.dir*Wt(E,-.6,1.2)*x.slipRate,o.steerAngle=Wt(o.drift.dir*.42+o.steerInput*.22,-.7,.7)}else M=o.steerInput*v*g*m,o.steerAngle=o.steerInput*Ps(.55,.24,p);if(this.rumble>.001){const x=q_(Math.floor(t.time.t*Ke.surfaces.rumbleHz)*1.7+o.id*13.1);M+=x*Ke.surfaces.rumbleSteerDeg*Ut*this.rumble*6}return o.steerNorm=o.steerInput,M}groundForces(e,t,n,i,s){const o=this.k,a=Ke.drive,c=Ke.grip,l=Ke.surfaces,h=this.controls,u=o.stats,d=o.surface,f=o.boost.timer>0,p=l.speedMul[d]??1,v=Ft(u.offroad??Us.offroad),g=p>=1?1:Ft(p+(1-p)*v*l.offroadRecovery),m=(l.dragBoost[d]??0)*(1-v*l.offroadRecovery);if(this.rumble=f?0:(1-g)*Ft(s/Math.max(1,u.topSpeed)),d!==this.prevSurface){const q=(l.speedMul[this.prevSurface]??1)<1,z=p<1;z!==q&&t.events.emit("kart:offroad",{kart:o,surface:d,entering:z}),d==="boost"&&this.padCooldown<=0&&(this.padCooldown=l.padCooldown,o.giveBoost(l.padBoostTime,l.padBoostPower,"pad")),this.prevSurface=d}else d==="boost"&&this.padCooldown<=0&&(this.padCooldown=l.padCooldown,o.giveBoost(l.padBoostTime,l.padBoostPower,"pad"));let M=u.topSpeed*g;f&&(M=Math.max(M,u.topSpeed*o.boost.power)),this.squash.t>0&&(M*=Ke.status.squashSpeedMul),o.drift.active&&(M*=1-Ke.drift.slipSpeedCost*Ft(Math.abs(this.slip)/(Ke.drift.slipMaxDeg*Ut))),this.speedCap=M>this.speedCap?M:this.speedCap+(M-this.speedCap)*qi(Ke.boost.decayRate,e);const x=(u.accel??Us.accel)/a.accelRef,y=Ft(s/Math.max(1,this.speedCap*a.topSpeedOvershoot));let w=0;const S=this.spin.t>0?0:h.throttle,E=this.spin.t>0?0:h.brake;S>0&&(w+=S*a.peakAccel*x*(1-Math.pow(y,a.curveExp))),f&&(w+=Ke.boost.accelBonus*Ft(1-y)),E>0&&(n>a.reverseThreshold?w-=E*a.brakeDecel:w-=E*a.reverseAccel*Ft(1-Math.abs(n)/a.reverseTop)),S<=0&&E<=0&&(w-=mr(n)*Math.min(a.coastDecel,Math.abs(n)/e)),w-=n*a.rollDrag,w-=mr(n)*n*n*a.aeroDrag,m>0&&(w-=mr(n)*m),this.spin.t>0&&(w-=n*Ke.status.spinDrag),this.squash.t>0&&(w-=n*Ke.status.squashDrag);let L=n+w*e;n<0&&L<-7.5&&(L=-7.5);const b=c.surface[d]??1,_=u.grip??Us.grip;let C,D;this.spin.t>0?(C=c.spinStiffness,D=c.maxLatAccel):o.drift.active?(C=c.driftStiffness,D=c.driftMaxLatAccel):(C=c.stiffness,D=c.maxLatAccel),C*=b*_,D*=b*_;const U=Wt(-i*C,-D,D);let k=i+U*e;Math.abs(k)>Math.abs(i)&&(k=i);const H=Math.hypot(L,k),O=this.speedCap*1.02;if(H>O){const q=1-Math.min(.5,(H-O)/Math.max(.5,H)*12*e+(H-O)/H*.35);L*=q,k*=q}if(this.rumble>.001){const q=t.time.t*l.rumbleHz*gr+o.id*2.3;this.springAccel+=Math.sin(q)*l.rumbleHeave*this.rumble*24}return this.slipUpdate(L,k),{fwd:L,lat:k}}slipUpdate(e,t){const n=Math.hypot(e,t);this.slip=n>.4?Math.atan2(-t,Math.abs(e)):0,this.slip=-this.slip}airForces(e,t,n,i){const s=Ke.air,o=this.controls;this.k;const a=Wt((o.brake-o.throttle)*.85,-1,1);this.airPitch+=a*s.pitchRateDeg*Ut*e,this.airPitch=Wt(this.airPitch,-26*Ut,s.pitchMaxDeg*Ut);const c=1-qi(s.drag,e);return this.slipUpdate(n*c,i*c),{fwd:n*c,lat:i*c}}gravity(){const e=Ke.air;return this.k.velocity.dot(this.up)>0?e.gravityUp:e.gravityDown}driftMachine(e,t,n,i){const s=this.k,o=Ke.drift,a=this.controls,c=s.drift;if(this.spin.t>0){this.releaseDrift(t,!1);return}if(a.driftPressed&&(!n&&this.airTime<Ke.air.trickWindow&&!this.trick.done&&this.launchUp>Ke.air.trickMinUp?this.doTrick(t):n&&!c.active&&this.hopTimer<=0&&i>o.minSpeed&&this.hop(t)),this.hopArmed){const m=s.steerInput;Math.abs(m)>o.engageSteer?(c.active=!0,c.dir=mr(m),c.charge=0,c.counter=0,c.tier=0,c.tierProgress=0,this.hopArmed=!1,this.driftAir=0,this.yaw+=-c.dir*0+c.dir*o.hopYawDeg*Ut*0,this.yaw=qu(this.yaw+c.dir*o.hopYawDeg*Ut),t.events.emit("kart:drift-start",{kart:s,dir:c.dir})):(this.hopTimer<=0||n)&&(this.hopArmed=!1)}if(!c.active)return;if(!a.drift||i<o.breakSpeed){this.releaseDrift(t,!0);return}if(!n){this.driftAir+=e,this.driftAir>o.airGrace&&c.counter>0&&(c.counter=0,c.charge=0,c.tierProgress=0,c.tier!==0&&(c.tier=0,t.events.emit("kart:drift-tier",{kart:s,tier:0})));return}this.driftAir=0;const l=(s.stats.miniTurbo??Us.miniTurbo)/o.miniTurboRef,h=Math.abs(s.steerInput),u=Ft((h-.15)/Math.max(.01,o.chargeFastSteer-.15)),d=Ps(o.chargeSlow,o.chargeFast,u)*l;c.counter+=d*e;const f=o.tierThresholds;let p=0;c.counter>=f[2]?p=3:c.counter>=f[1]?p=2:c.counter>=f[0]&&(p=1),p>c.tier&&(c.tier=p,t.events.emit("kart:drift-tier",{kart:s,tier:p,dir:c.dir})),c.charge=Ft(c.counter/f[2]);const v=p===0?0:f[p-1],g=p>=3?f[2]:f[p];c.tierProgress=p>=3?1:Ft((c.counter-v)/Math.max(1,g-v))}hop(e){const t=this.k,n=Ke.drift;t.velocity.addScaledVector(this.up,n.hopSpeed),this.hopTimer=n.hopWindow,this.hopArmed=!0,this.wasGrounded=!0,this.driftAir=0,e.events.emit("kart:hop",{kart:t})}releaseDrift(e,t){const n=this.k,i=n.drift;if(!i.active)return;const s=Ke.drift,o=i.tier;i.active=!1,i.dir=0,i.charge=0,i.counter=0,i.tier=0,i.tierProgress=0,this.driftAir=0,t&&o>0&&(n.giveBoost(s.boostTime[o-1],s.boostPower[o-1],"minitrubo"),e.events.emit("kart:boost",{kart:n,source:"minitrubo",tier:o,duration:s.boostTime[o-1],power:s.boostPower[o-1]})),e.events.emit("kart:drift-end",{kart:n,tier:o})}onLeftGround(e){this.launchUp=this.k.velocity.dot(this.up),this.trick.done=!1,this.k.air.trickDone=!1,this.airPitch=0}doTrick(e){const t=this.k,n=Ke.air,i=t.velocity.dot(this.up);(i+Math.sqrt(Math.max(0,i*i+2*n.gravityDown*1)))/n.gravityDown<n.trickMinAir||(this.trick.done=!0,this.trick.dur=n.trickDuration,this.trick.t=n.trickDuration,this.trick.kind=t.steerInput>.3?1:t.steerInput<-.3?2:0,t.air.trickDone=!0,e.events.emit("kart:trick",{kart:t,kind:this.trick.kind,dir:mr(t.steerInput)}))}onLanded(e){const t=this.k,n=Ke.air,i=Math.max(0,-this._prevVel.dot(this.up)),s=t.velocity.dot(this.up);s<0&&t.velocity.addScaledVector(this.up,-s*n.landAbsorb);let o=1;const a=this._v.copy(t.velocity).addScaledVector(this.up,-t.velocity.dot(this.up));if(a.lengthSq()>1&&(a.normalize(),o=Ft(a.dot(this.fwd)),o<n.landAlignGood)){const c=n.landPenaltyMax*(1-o/n.landAlignGood);t.velocity.multiplyScalar(1-c)}this.pitchVel+=Wt(i,0,14)*.16,this.trick.done&&(this.trick.done=!1,t.air.trickDone=!1,o>.6&&(t.giveBoost(n.trickBoostTime,n.trickBoostPower,"trick"),e.events.emit("kart:boost",{kart:t,source:"trick",tier:0,duration:n.trickBoostTime,power:n.trickBoostPower}))),this.airPitch=0,this.launchUp=0,e.events.emit("kart:land",{kart:t,impact:i,hard:i>=n.landHardImpact,strength:Ft(i/n.landHardImpact),speed:t.speed,aligned:o,surface:t.surface})}resolveWorld(e,t){const n=this.k;if(n.frozen)return;const i=Ke.collide,s=Ke.chassis.radius;let o=null;try{o=t.world.collideWall?.(n.position,s)??null}catch{o=null}if(o&&o.normal&&o.depth>0){const a=this._v.copy(o.normal);a.lengthSq()<1e-6&&a.set(0,1,0),a.normalize(),n.position.addScaledVector(a,o.depth*i.wallPush);const c=n.velocity.dot(a);if(c<0){const l=n.velocity.length(),u=(l>.01?Math.abs(c)/l:0)<i.wallGrazeCos;this._v2.copy(n.velocity).addScaledVector(a,-c),u?(this._v2.multiplyScalar(1-i.wallGrazeFriction),n.velocity.copy(this._v2).addScaledVector(a,-c*.15)):(this._v2.multiplyScalar(1-i.wallSpeedLoss),n.velocity.copy(this._v2).addScaledVector(a,-c*i.wallRestitution),n.drift.active&&this.releaseDrift(t,!1)),Math.abs(c)>i.wallEventSpeed&&t.events.emit("kart:wall",{kart:n,normal:a.clone(),speed:Math.abs(c),graze:u,strength:Ft(Math.abs(c)/14)})}}if(this.deepest>.001){n.position.addScaledVector(this.up,Math.min(this.deepest,.5));const a=n.velocity.dot(this.up);a<0&&n.velocity.addScaledVector(this.up,-a)}}finalize(e,t){const n=this.k;this.makeBasis(),this.leanStep(e),this.buildQuaternion(),this.refreshWheels(t,!1);const i=n.velocity.dot(this.fwd),s=n.velocity.dot(this.right);n.forwardSpeed=i,n.speed=Math.hypot(i,s),n.slipAngle=this.slip??0,n.up.copy(this.up),n.groundNormal.copy(this.wheels[0].normal),n.airborne=!n.onGround,n.rumble=this.rumble}refreshWheels(e,t){const n=this.k,i=Ke.suspension;for(const s of this.wheels)s.anchor.copy(s.local).applyQuaternion(n.quaternion).add(n.position),s.pos.copy(s.anchor).addScaledVector(this.up,-Math.min(s.len,i.restLength)),s.contact.copy(s.pos).addScaledVector(this.up,-.42)}applyImpulse(e){const t=this.k,n=1/Math.max(.4,t.stats.weight??1);t.velocity.addScaledVector(e,n),e.length()*n>Ke.collide.chargeCancelImpulse&&t.drift.active&&this.releaseDrift(this.ctx,!1)}spinOut(e=1.1){const t=this.k;this.spin.t>e||(this.spin.t=e,this.spin.dur=e,this.spin.dir=t.drift.active?-t.drift.dir:t.steerInput>=0?1:-1,this.spin.dir===0&&(this.spin.dir=1),t.spinning=!0,t.boost.timer=0,t.boost.power=1,t.boost.source=null,this.releaseDrift(this.ctx,!1),this.ctx.events.emit("kart:spinout",{kart:t,duration:e}))}squashKart(e=1.6){const t=this.k;this.squash.t=Math.max(this.squash.t,e),this.squash.dur=e,t.squashed=!0,t.squashAmount=1,t.boost.timer=0,t.boost.power=1,this.releaseDrift(this.ctx,!1),this.ctx.events.emit("kart:squash",{kart:t,duration:e})}}const Yu=new T(1,0,0),K_=new T(0,1,0),Z_=new T(0,0,1),ns=new T(0,1,0),In={y:0,normal:ns,surface:"road",onTrack:!0,banking:0};function _c(r,e,t){const n=r.world;let i=null;if(n&&n.sampleGround)try{i=n.sampleGround(e,t)}catch{i=null}if(!i)return In.y=0,ns.set(0,1,0),In.surface="road",In.onTrack=!0,In.banking=0,In;In.y=Number.isFinite(i.y)?i.y:0;const s=i.normal;return s&&Number.isFinite(s.x+s.y+s.z)&&s.x*s.x+s.y*s.y+s.z*s.z>1e-6?(ns.set(s.x,s.y,s.z).normalize(),ns.y<0&&ns.multiplyScalar(-1)):ns.set(0,1,0),In.normal=ns,In.surface=typeof i.surface=="string"?i.surface:"road",In.onTrack=i.onTrack!==!1,In.banking=Number.isFinite(i.banking)?i.banking:0,In}function J_(r){const e=Object.create(null);let t="road",n=-1;for(const i of r){if(!i.grounded)continue;const s=i.surface||"road",o=i.front?2:1;e[s]=(e[s]??0)+o,e[s]>n&&(n=e[s],t=s)}if(n<0)return r[0].surface||"road";for(const i of r)if(i.grounded&&i.surface==="boost")return"boost";return t}const Q_=(r,e,t)=>r<e?e:r>t?t:r,ju=.95,$_=8,Ku=[{name:"Rasta",stats:{topSpeed:27,accel:12,handling:2.65,weight:1,miniTurbo:4.5}},{name:"Zion",stats:{topSpeed:28.4,accel:10.4,handling:2.3,weight:1.22,miniTurbo:3.5}},{name:"Marley",stats:{topSpeed:26.2,accel:13.4,handling:3,weight:.84,miniTurbo:5}},{name:"Selah",stats:{topSpeed:27.4,accel:11.6,handling:2.55,weight:1.05,miniTurbo:4.25}},{name:"Kofi",stats:{topSpeed:28.8,accel:10,handling:2.2,weight:1.3,miniTurbo:3.25}},{name:"Nia",stats:{topSpeed:26,accel:13.8,handling:3.1,weight:.8,miniTurbo:5.25}},{name:"Tafari",stats:{topSpeed:27.2,accel:12.2,handling:2.7,weight:1,miniTurbo:4.5}},{name:"Ayo",stats:{topSpeed:27.8,accel:11.2,handling:2.45,weight:1.12,miniTurbo:4}}];class eM{name="physics";order=30;#o=[];#e=new T;#t=new T;#i=new T;async init(e){this.ctx=e;for(let t=0;t<$_;t++){const n=this.#s(e,t);e.karts.push(n);const i=new j_(n,e);n._body=i,i.place(e),this.#o.push(i)}e.player=e.karts[0];for(const t of e.karts)e.events.emit("kart:spawn",t);e.onProgress?.(.9,"alinhando o grid")}#s(e,t){const n=e.world.startGrid(t),i=Ku[t%Ku.length];return{id:t,name:i.name,isPlayer:t===0,characterId:"rasta",liveryIndex:t,position:n.position.clone(),quaternion:n.quaternion.clone(),up:new T(0,1,0),velocity:new T,speed:0,forwardSpeed:0,steerInput:0,steerAngle:0,drift:{active:!1,dir:0,charge:0,tier:0},boost:{timer:0,power:1,source:null},air:{off:!1,time:0,trickDone:!1},onGround:!0,surface:"road",groundNormal:new T(0,1,0),wheelContacts:[],lap:1,checkpoint:0,progress:0,place:t+1,finished:!1,frozen:!0,visual:null,stats:{...Us,...i.stats},applyImpulse(o){this._body?.applyImpulse(o)},spinOut(o){this._body?.spinOut(o)},squash(o){this._body?.squashKart(o)},giveBoost(o,a=1.35,c="item"){const l=this.boost;l.timer=Math.max(l.timer,o),l.power=Math.max(l.power,a),l.source=c}}}#r(e,t){if(e.isPlayer){const i=t.input.state;return{throttle:i.accel,brake:i.brake,steer:i.steer,drift:i.drift,driftPressed:i.pressed.drift,item:i.pressed.item}}const n=e.aiControls;return n||this.#n(e,t)}#n(e,t){const n=t.world,i=n.project(e.position),s=n.sampleSpline(i.u),a=1/(1+Math.abs(s.curvature??0)*42),c=(12+Math.min(e.speed,30)*.6)*Math.max(.32,a),l=n.sampleSpline((i.u+c/n.trackLength)%1),u=this.#e.copy(l.pos).addScaledVector(l.right,-i.lateral*.35).sub(e.position).setY(0);if(u.lengthSq()<1e-6)return{throttle:1,brake:0,steer:0,drift:!1,driftPressed:!1,item:!1};u.normalize();const d=this.#t.set(0,0,1).applyQuaternion(e.quaternion).setY(0).normalize(),f=Math.atan2(d.x*u.z-d.z*u.x,d.dot(u)),p=e._aiPrevErr??f;e._aiPrevErr=f;const v=f-p,g=Q_(f*1.9+v*24,-1,1),m=Math.abs(l.curvature??0),M=m>1e-4?Math.min(e.stats.topSpeed,Math.sqrt(9.2/m)):e.stats.topSpeed,x=e.speed-M;return{throttle:x>0?0:1,brake:x>3?Math.min(1,(x-3)/6):0,steer:g,drift:!1,driftPressed:!1,item:!1}}update(e,t){const n=this.#o;for(let i=0;i<n.length;i++){const s=t.karts[i],o=this.#r(s,t);s.throttleInput=o.throttle,s.brakeInput=o.brake,n[i].integrate(e,t,o)}this.#h(e,t);for(let i=0;i<n.length;i++)n[i].resolveWorld(e,t);for(let i=0;i<n.length;i++)n[i].finalize(e,t)}#h(e,t){const n=t.karts,i=(ju*2)**2;for(let s=0;s<n.length;s++){const o=n[s];if(!o.frozen)for(let a=s+1;a<n.length;a++){const c=n[a];if(c.frozen)continue;this.#e.copy(c.position).sub(o.position);const l=this.#e.lengthSq();if(l>i||l<1e-6)continue;const h=Math.sqrt(l),u=this.#e.multiplyScalar(1/h),d=ju*2-h,f=o.stats.weight,p=c.stats.weight,v=f+p;o.position.addScaledVector(u,-d*(p/v)),c.position.addScaledVector(u,d*(f/v)),this.#t.copy(c.velocity).sub(o.velocity);const g=this.#t.dot(u);if(g>=0)continue;const m=-1.42*g/(1/f+1/p);this.#i.copy(u).multiplyScalar(m),o.velocity.addScaledVector(this.#i,-1/f),c.velocity.addScaledVector(this.#i,1/p),Math.abs(g)>4&&t.events.emit("kart:bump",{a:o,b:c,force:Math.abs(g)})}}}dispose(){this.#o.length=0}}class tM{name="ai";order=35;async init(e){this.ctx=e}update(e,t){}dispose(){}}const nM=["coin","banana","shellGreen","boost","shellRed","triple","bomb","ghost","star","bolt"],iM={coin:[30,18,8,2,0],banana:[22,20,14,8,4],shellGreen:[20,18,14,8,4],boost:[10,18,22,22,16],shellRed:[8,14,18,18,12],triple:[4,8,12,16,14],bomb:[4,6,10,12,10],ghost:[2,4,6,8,10],star:[0,2,6,14,22],bolt:[0,0,2,6,18]},_n={boost:{uses:1,boost:{time:1.9,power:1.55}},triple:{uses:3,boost:{time:1.7,power:1.5}},banana:{uses:1,drop:!0,radius:1.05,spin:.95},shellGreen:{uses:1,speed:33,life:8,radius:1.15,spin:1.15,bounce:!0},shellRed:{uses:1,speed:30,life:9,radius:1.15,spin:1.25,homing:5.5},bomb:{uses:1,speed:21,life:2.6,radius:6.2,spin:1.35,fuse:!0},star:{uses:1,duration:7.2,boost:{time:7.2,power:1.32}},bolt:{uses:1,squash:3.6},coin:{uses:1,boost:{time:.55,power:1.12}},ghost:{uses:1,duration:5.5,boost:{time:.8,power:1.15}}};function sM(r,e){const t=Math.max(0,Math.min(1,e))*4,n=Math.min(3,Math.floor(t)),i=t-n;let s=0;const o=[];for(const c of nM){const l=iM[c],h=l[n]*(1-i)+l[n+1]*i;h<=0||(s+=h,o.push([c,s]))}if(s<=0)return"banana";const a=r.next()*s;for(const[c,l]of o)if(a<l)return c;return o[o.length-1][0]}const Pi=new T(0,1,0),Zu=new T(1,0,0),vr=new pe().makeScale(0,0,0),Ju=r=>r<0?0:r>1?1:r,Mc=10,Qu=12,$u=4,ed=2.3,bc=4.5,rM=.7,oM=2.8;function aM(){const r=document.createElement("canvas");r.width=r.height=128;const e=r.getContext("2d");e.clearRect(0,0,128,128),e.font="bold 104px ui-sans-serif, system-ui, sans-serif",e.textAlign="center",e.textBaseline="middle",e.lineWidth=14,e.lineJoin="round",e.strokeStyle="rgba(255,255,255,0.30)",e.strokeText("?",64,70),e.fillStyle="#ffffff",e.fillText("?",64,70);const t=new Jt(r);return t.colorSpace=it,t.anisotropy=4,t.needsUpdate=!0,t}const cM=`
precision highp float;
attribute float aPhase;
varying vec3 vN;
varying vec3 vView;
varying vec2 vUv;
varying float vPhase;
void main() {
  vUv = uv;
  vPhase = aPhase;
  vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vN = normalize(mat3(instanceMatrix) * normal);
  vView = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`,lM=`
precision highp float;
uniform float uTime;
uniform sampler2D uMark;
varying vec3 vN;
varying vec3 vView;
varying vec2 vUv;
varying float vPhase;

// cheap cosine palette: a full hue sweep with no texture lookup
vec3 iris(float t) {
  return 0.55 + 0.45 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));
}

void main() {
  float f = 1.0 - abs(dot(normalize(vN), normalize(vView)));
  float fres = pow(clamp(f, 0.0, 1.0), 2.0);

  // hue runs around the cube and drifts with time, so the box shimmers even
  // when both it and the camera are still
  float h = vPhase + uTime * 0.28 + vN.y * 0.18 + vUv.x * 0.22;
  vec3 tint = iris(h);

  float mark = texture2D(uMark, vUv).a;

  // crystalline frame: the cube needs a hard silhouette or it reads as a
  // soap bubble the moment motion blur touches it
  float e = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
  float edge = 1.0 - smoothstep(0.015, 0.075, e);

  vec3 col = tint * (0.85 + 1.5 * fres)
           + vec3(1.0, 0.96, 0.74) * mark * 2.3
           + vec3(1.0) * edge * 0.55;
  float alpha = clamp(0.52 + fres * 0.42 + mark * 0.45 + edge * 0.45, 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;class hM{name="items";order=40;#o=new pe;#e=new et;#t=new et;#i=new T;#s=new T;#r=new T;#n=new T(1,1,1);#h=new he;#u=[];async init(e){this.ctx=e,this.rng=e.rng.fork(6115),this.root=new wn,this.root.name="items",e.scene.add(this.root),this.#T(e),this.#l(e);for(const t of e.karts)this.#f(t);this.#u.push(e.events.on("kart:spawn",t=>this.#f(t))),this.pool={shells:Array.from({length:Mc},()=>this.#a()),bananas:Array.from({length:Qu},()=>this.#a()),bombs:Array.from({length:$u},()=>this.#a())},e.items={give:(t,n)=>this.#L(t,n),use:t=>this.#A(t,e),hazards:()=>this.pool,boxes:()=>this.spots},e.onProgress?.(.88,"enchendo as caixas")}#f(e){e.item===void 0&&(e.item=null,e.itemCount=0,e.coins=0,e.starTimer=0,e.ghostTimer=0,e.invuln=0,e._aiItemDelay=0)}#T(e){const t=e.world?.itemBoxSpots??[];this.spots=t.map((a,c)=>({pos:a.clone(),alive:!0,timer:0,phase:c*.137%1,spin:(c%2===0?1:-1)*1.15}));const n=this.spots.length;if(!n){this.boxMesh=null;return}this.markTex=aM();const i=new tn(1.5,1.5,1.5),s=new Float32Array(n);for(let a=0;a<n;a++)s[a]=this.spots[a].phase;i.setAttribute("aPhase",new qs(s,1)),this.boxMat=new vt({vertexShader:cM,fragmentShader:lM,uniforms:{uTime:{value:0},uMark:{value:this.markTex}},transparent:!0,depthWrite:!1,side:Nt,toneMapped:!1,fog:!1}),this.boxMesh=new Tt(i,this.boxMat,n),this.boxMesh.instanceMatrix.setUsage(Zn),this.boxMesh.frustumCulled=!1,this.boxMesh.renderOrder=6,this.boxMesh.name="items:boxes",this.root.add(this.boxMesh);const o=new Wl(.4,0);this.coreMat=new Qn({color:16771752,transparent:!0,opacity:.9,blending:Ir,depthWrite:!1,toneMapped:!1,fog:!1}),this.coreMesh=new Tt(o,this.coreMat,n),this.coreMesh.instanceMatrix.setUsage(Zn),this.coreMesh.frustumCulled=!1,this.coreMesh.renderOrder=7,this.coreMesh.name="items:box-cores",this.root.add(this.coreMesh)}#c(e,t,n,i,s=5){const o=new Tt(e,t,n);o.instanceMatrix.setUsage(Zn),o.frustumCulled=!1,o.castShadow=i==="items:bananas",o.renderOrder=s,o.name=i;for(let a=0;a<n;a++)o.setMatrixAt(a,vr);return this.root.add(o),o}#l(e){const t=(a,c={})=>new Xe({color:a,roughness:.34,metalness:.05,envMapIntensity:1.1,...c}),n=new us(.46,14,10);n.scale(1,.82,1),this.shellMesh=this.#c(n,t(16777215),Mc,"items:shells"),this.shellMesh.instanceColor=new qs(new Float32Array(Mc*3).fill(1),3),this.shellMesh.instanceColor.setUsage(Zn);const i=new as(.3,.11,6,12,Math.PI*1.05);i.rotateX(Math.PI/2),this.bananaMesh=this.#c(i,t(16766776,{emissive:3812352}),Qu,"items:bananas");const s=new us(.42,12,9);this.bombMesh=this.#c(s,t(1580066,{roughness:.5}),$u,"items:bombs");const o=new us(.3,10,8);this.orbMesh=this.#c(o,t(16734789,{emissive:5246984}),e.karts.length*3+6,"items:orbits")}#a(){return{live:!1,kind:"",owner:null,target:null,pos:new T,vel:new T,life:0,age:0,spin:0,bounces:0,armed:0}}update(e,t){t.race?.state!=="idle"&&(this.#d(e,t),this.#M(e,t),this.#x(e,t))}#d(e,t){if(!this.boxMesh)return;const n=t.time.t;this.boxMat.uniforms.uTime.value=n;for(const i of this.spots){if(!i.alive){i.timer-=e,i.timer<=0&&(i.alive=!0,i.timer=0);continue}for(const s of t.karts)if(!(s.frozen||s.finished)&&!(s.item||(s.itemCount??0)>0)&&!(s.position.distanceToSquared(i.pos)>ed*ed)){this.#_(s,i,t);break}}this.#E(n)}#E(e){for(let t=0;t<this.spots.length;t++){const n=this.spots[t];if(n.alive)this.#n.setScalar(1);else{const s=Ju((bc-n.timer)/bc);if(s<.86){this.boxMesh.setMatrixAt(t,vr),this.coreMesh.setMatrixAt(t,vr);continue}const o=(s-.86)/.14;this.#n.setScalar(o*(1.28-.28*o))}const i=Math.sin(e*1.9+n.phase*6.28)*.16;this.#i.copy(n.pos),this.#i.y+=i,this.#e.setFromAxisAngle(Pi,e*n.spin+n.phase*6.28),this.#t.setFromAxisAngle(Zu,Math.sin(e*.9+n.phase*4)*.3),this.#e.multiply(this.#t),this.#o.compose(this.#i,this.#e,this.#n),this.boxMesh.setMatrixAt(t,this.#o),this.#n.multiplyScalar(.8+Math.sin(e*5.5+n.phase*9)*.1),this.#o.compose(this.#i,this.#e,this.#n),this.coreMesh.setMatrixAt(t,this.#o)}this.boxMesh.instanceMatrix.needsUpdate=!0,this.coreMesh.instanceMatrix.needsUpdate=!0}#_(e,t,n){t.alive=!1,t.timer=bc;const i=n.race?.fieldSize||n.karts.length||8,s=Math.min(i,Math.max(1,e.place||i)),o=sM(this.rng,i>1?(s-1)/(i-1):0);this.#L(e,o),n.events.emit("item:pickup",{kart:e,item:o,place:s}),n.events.emit("audio:sfx",{name:"item-get",position:e.position,volume:.8}),n.vfx?.burst("pickup",t.pos,{color:16773792,count:22}),n.vfx?.burst("ring",t.pos,{color:16769146,from:.5,to:4,life:.4})}#L(e,t){e.item=t,e.itemCount=_n[t]?.uses??1}#M(e,t){for(const n of t.karts)n.item===void 0&&this.#f(n),n.starTimer>0&&(n.starTimer-=e,n.invuln=Math.max(n.invuln,n.starTimer),n.giveBoost(.2,_n.star.boost.power,"star"),this.rng.next()<.5&&(this.#i.copy(n.position).addScaledVector(Pi,this.rng.range(.1,1.1)).addScaledVector(this.#p(n),this.rng.range(-.9,.9)),t.vfx?.burst("aura",this.#i,{color:16767034})),n.starTimer<=0?t.events.emit("item:star-end",{kart:n}):this.#m(n,t)),n.ghostTimer>0&&(n.ghostTimer-=e,n.invuln=Math.max(n.invuln,n.ghostTimer),this.rng.next()<.18&&(this.#i.copy(n.position).addScaledVector(Pi,.6),t.vfx?.burst("sparkle",this.#i,{color:13623551,count:2}))),n.invuln>0&&(n.invuln-=e),!(n.frozen||n.finished)&&(n.isPlayer?t.input.state.pressed.item&&this.#A(n,t):n.item&&(n._aiItemDelay<=0&&(n._aiItemDelay=this.rng.range(rM,oM)),n._aiItemDelay-=e,n._aiItemDelay<=0&&(this.#A(n,t),n._aiItemDelay=0)));this.#B(t)}#p(e){return this.#r.set(1,0,0).applyQuaternion(e.quaternion)}#b(e){return this.#s.set(0,0,1).applyQuaternion(e.quaternion)}#m(e,t){for(const n of t.karts)n===e||n.frozen||n.finished||n.starTimer>0||n.invuln>0||e.position.distanceToSquared(n.position)>4.4||(this.#I(n,e,1.15,t,"star"),this.#i.copy(n.position).sub(e.position).setY(.35).normalize().multiplyScalar(11),n.applyImpulse(this.#i))}#A(e,t){const n=e.item;if(!n)return;const i=_n[n]??{};switch(n){case"boost":case"triple":e.giveBoost(i.boost.time,i.boost.power,"item"),t.events.emit("kart:boost",{kart:e,source:"item",tier:0,duration:i.boost.time,power:i.boost.power});break;case"coin":e.coins=(e.coins??0)+1,e.giveBoost(i.boost.time,i.boost.power,"item"),t.vfx?.burst("sparkle",e.position,{color:16765514,count:12});break;case"banana":this.#k(e);break;case"shellGreen":this.#F(e,t,!1);break;case"shellRed":this.#F(e,t,!0);break;case"bomb":this.#R(e);break;case"star":e.starTimer=i.duration,e.invuln=i.duration,e.giveBoost(i.boost.time,i.boost.power,"star"),t.events.emit("kart:boost",{kart:e,source:"star",tier:0,duration:i.boost.time,power:i.boost.power}),t.vfx?.burst("ring",e.position,{color:16767034,from:.6,to:6,life:.5});break;case"ghost":e.ghostTimer=i.duration,e.invuln=Math.max(e.invuln,i.duration),e.giveBoost(i.boost.time,i.boost.power,"item"),t.vfx?.burst("sparkle",e.position,{color:14214911,count:18});break;case"bolt":this.#P(e,t);break}e.itemCount=Math.max(0,(e.itemCount??1)-1),e.itemCount<=0&&(e.item=null),t.events.emit("item:use",{kart:e,item:n,remaining:e.itemCount}),t.events.emit("audio:sfx",{name:`item-${n}`,position:e.position,volume:.9})}#P(e,t){t.events.emit("item:lightning",{kart:e});for(const n of t.karts)n===e||n.frozen||n.finished||n.starTimer>0||(n.squash(_n.bolt.squash),n.item=null,n.itemCount=0,t.events.emit("kart:hit",{kart:n,by:e,source:"bolt"}))}#S(e){for(const t of e)if(!t.live)return t;return null}#k(e){const t=this.#S(this.pool.bananas);t&&(this.#b(e),t.live=!0,t.kind="banana",t.owner=e,t.target=null,t.pos.copy(e.position).addScaledVector(this.#s,-2.3),t.pos.y+=.1,t.vel.set(0,0,0),t.life=1e9,t.age=0,t.armed=.4,t.spin=this.rng.range(0,6.28))}#F(e,t,n){const i=this.#S(this.pool.shells);if(!i)return;const s=n?_n.shellRed:_n.shellGreen;this.#b(e),i.live=!0,i.kind=n?"shellRed":"shellGreen",i.owner=e,i.target=n?this.#D(e,t):null,i.pos.copy(e.position).addScaledVector(this.#s,2.2),i.pos.y+=.15,i.vel.copy(this.#s).multiplyScalar(s.speed).addScaledVector(e.velocity,.25),i.life=s.life,i.age=0,i.bounces=0,i.armed=.14,i.spin=0}#R(e){const t=this.#S(this.pool.bombs);t&&(this.#b(e),t.live=!0,t.kind="bomb",t.owner=e,t.target=null,t.pos.copy(e.position).addScaledVector(this.#s,2),t.pos.y+=.6,t.vel.copy(this.#s).multiplyScalar(_n.bomb.speed).addScaledVector(Pi,4.5).addScaledVector(e.velocity,.4),t.life=_n.bomb.life,t.age=0,t.armed=.18,t.spin=0)}#D(e,t){let n=null,i=-1;for(const s of t.karts)s===e||s.finished||s.place<e.place&&s.place>i&&(n=s,i=s.place);return n}#x(e,t){this.#g(this.pool.shells,e,t),this.#g(this.pool.bananas,e,t),this.#g(this.pool.bombs,e,t),this.#O(t)}#g(e,t,n){for(const i of e){if(!i.live)continue;if(i.age+=t,i.armed>0&&(i.armed-=t),i.kind==="banana"){const a=n.world.sampleGround(i.pos.x,i.pos.z);i.pos.y+=(a.y+.22-i.pos.y)*Math.min(1,t*12)}else if(i.kind==="bomb"){i.vel.y-=22*t,i.pos.addScaledVector(i.vel,t);const a=n.world.sampleGround(i.pos.x,i.pos.z);if(i.pos.y<=a.y+.42&&(i.pos.y=a.y+.42,i.vel.y=Math.abs(i.vel.y)*.32,i.vel.x*=.72,i.vel.z*=.72),i.spin+=t*6,i.age>=i.life){this.#v(i,n);continue}}else{if(i.kind==="shellRed"&&i.target&&!i.target.finished){const l=_n.shellRed;this.#i.copy(i.target.position).sub(i.pos).setY(0);const h=this.#i.length();h>.01&&(this.#i.divideScalar(h),i.vel.addScaledVector(this.#i,l.homing*t*l.speed*.16),i.vel.setLength(l.speed))}i.pos.addScaledVector(i.vel,t);const a=n.world.sampleGround(i.pos.x,i.pos.z);i.pos.y+=(a.y+.4-i.pos.y)*Math.min(1,t*9),i.spin+=t*13;const c=n.world.collideWall?.(i.pos,.42);if(c&&c.depth>0)if(i.kind==="shellGreen"&&i.bounces<4){i.pos.addScaledVector(c.normal,c.depth+.05);const l=i.vel.dot(c.normal);i.vel.addScaledVector(c.normal,-2*l),i.bounces++,n.vfx?.burst("sparkle",i.pos,{color:12582864,count:6}),n.events.emit("audio:sfx",{name:"shell-bounce",position:i.pos,volume:.6})}else{this.#C(i,n);continue}if(i.age>=i.life){this.#C(i,n);continue}}const s=_n[i.kind]??{radius:1.1,spin:1},o=s.radius*s.radius;for(const a of n.karts)if(!(a.frozen||a.finished)&&!(a===i.owner&&i.armed>0)&&!(a.position.distanceToSquared(i.pos)>o)){if(a.starTimer>0||a.invuln>0){if(i.kind!=="banana"){this.#C(i,n);break}continue}if(i.kind==="bomb"){this.#v(i,n);break}this.#I(a,i.owner,s.spin,n,i.kind),this.#i.copy(i.vel).setY(2.5).multiplyScalar(.24),a.applyImpulse(this.#i),this.#C(i,n);break}}}#I(e,t,n,i,s){e.spinOut(n),e.item=null,e.itemCount=0,e.invuln=.6,i.events.emit("kart:hit",{kart:e,by:t,source:s}),i.vfx?.burst("sparkle",e.position,{color:16773280,count:14})}#C(e,t){e.live=!1,t.vfx?.burst("puff",e.pos,{color:14472911,count:5,scale:1}),t.vfx?.burst("sparkle",e.pos,{color:16777215,count:6})}#v(e,t){e.live=!1;const n=_n.bomb.radius;t.events.emit("item:explode",{position:e.pos.clone(),radius:n,by:e.owner}),t.vfx?.burst("explode",e.pos,{radius:n});for(const i of t.karts){if(i.frozen||i.finished||i.starTimer>0||i.invuln>0)continue;const s=i.position.distanceToSquared(e.pos);if(s>n*n)continue;const o=1-Math.sqrt(s)/n;this.#I(i,e.owner,_n.bomb.spin,t,"bomb"),this.#i.copy(i.position).sub(e.pos).setY(0).normalize().multiplyScalar(16*o).addScaledVector(Pi,6*o),i.applyImpulse(this.#i)}}#O(e){const t=e.time.t;this.#U(this.pool.shells,this.shellMesh,(n,i)=>{this.#e.setFromAxisAngle(Pi,n.spin),this.#n.setScalar(1),this.#h.setHex(n.kind==="shellRed"?16733766:4644986,it),this.shellMesh.instanceColor.setXYZ(i,this.#h.r,this.#h.g,this.#h.b)}),this.shellMesh.instanceColor.needsUpdate=!0,this.#U(this.pool.bananas,this.bananaMesh,n=>{this.#e.setFromAxisAngle(Pi,n.spin+t*.6),this.#n.setScalar(1)}),this.#U(this.pool.bombs,this.bombMesh,n=>{this.#e.setFromAxisAngle(Zu,n.spin);const i=1+Math.sin(n.age*22)*.09*Ju(n.age/_n.bomb.life);this.#n.setScalar(i)})}#U(e,t,n){for(let i=0;i<e.length;i++){const s=e[i];if(!s.live){t.setMatrixAt(i,vr);continue}n(s,i),this.#o.compose(s.pos,this.#e,this.#n),t.setMatrixAt(i,this.#o)}t.instanceMatrix.needsUpdate=!0}#B(e){const t=this.orbMesh;if(!t)return;const n=e.time.t;let i=0;for(const s of e.karts)if(!(s.item!=="triple"||(s.itemCount??0)<=0))for(let o=0;o<s.itemCount&&i<t.count;o++,i++){const a=n*2.4+o/3*Math.PI*2;this.#i.copy(s.position),this.#i.x+=Math.cos(a)*1.75,this.#i.z+=Math.sin(a)*1.75,this.#i.y+=.55+Math.sin(n*3+o)*.08,this.#e.setFromAxisAngle(Pi,-a),this.#n.setScalar(1),this.#o.compose(this.#i,this.#e,this.#n),t.setMatrixAt(i,this.#o)}for(;i<t.count;i++)t.setMatrixAt(i,vr);t.instanceMatrix.needsUpdate=!0}dispose(){for(const e of this.#u)e?.();this.#u.length=0,this.root?.traverse(e=>{e.geometry?.dispose?.();const t=e.material;Array.isArray(t)?t.forEach(n=>n.dispose?.()):t?.dispose?.()}),this.markTex?.dispose?.(),this.root?.parent?.remove(this.root)}}const uM=`
precision highp float;

attribute vec3 aOrigin;
attribute vec3 aVel;
attribute vec4 aLife;     // birth, life, size0, size1
attribute vec4 aColorA;   // rgb + alpha at birth
attribute vec4 aColorB;   // rgb + alpha at death
attribute vec4 aParams;   // drag, gravity, rot0, rotSpeed
attribute vec4 aOpts;     // atlasCell, stretch, mode, fadePow

uniform float uTime;
uniform vec2  uAtlas;     // cols, rows
uniform float uScale;

varying vec2 vUv;
varying vec4 vColor;

void main() {
  float age = uTime - aLife.x;
  float life = max(aLife.y, 1e-4);
  float u = age / life;

  if (age < 0.0 || u >= 1.0) {
    vColor = vec4(0.0);
    vUv = vec2(0.0);
    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);   // behind the far plane: clipped
    return;
  }

  // ---- closed-form ballistic integration ---------------------------------
  float k = max(aParams.x, 1e-3);
  float e = exp(-k * age);
  vec3 pos = aOrigin
           + aVel * ((1.0 - e) / k)
           + vec3(0.0, 0.5 * aParams.y * age * age, 0.0);
  vec3 vel = aVel * e + vec3(0.0, aParams.y * age, 0.0);

  float size = mix(aLife.z, aLife.w, u) * uScale;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vec2 q = position.xy;                       // unit quad, -0.5 .. 0.5

  float rot = aParams.z + aParams.w * age;
  float cr = cos(rot), sr = sin(rot);
  vec2 rq = vec2(q.x * cr - q.y * sr, q.x * sr + q.y * cr);

  // screen-space velocity basis, for stretched sprites
  vec3 vView = (modelViewMatrix * vec4(vel, 0.0)).xyz;
  vec2 d = vView.xy;
  float dl = length(d);
  vec2 dir = dl > 1e-4 ? d / dl : vec2(0.0, 1.0);
  vec2 perp = vec2(-dir.y, dir.x);
  float stretched = size * (1.0 + aOpts.y * dl);
  vec2 offVel = dir * (q.y * stretched) + perp * (q.x * size);

  float useVel = step(1.5, aOpts.z);
  float useGround = step(0.5, aOpts.z) * (1.0 - useVel);

  vec4 clipBill = projectionMatrix * (mv + vec4(mix(rq * size, offVel, useVel), 0.0, 0.0));
  vec4 clipGround = projectionMatrix * (modelViewMatrix *
      vec4(pos + vec3(rq.x, 0.0, rq.y) * size, 1.0));
  gl_Position = mix(clipBill, clipGround, useGround);

  // ---- atlas cell --------------------------------------------------------
  float cell = aOpts.x;
  float cx = mod(cell, uAtlas.x);
  float cy = floor(cell / uAtlas.x);
  vec2 inset = uv * 0.980 + 0.010;
  vUv = (vec2(cx, cy) + inset) / uAtlas;

  // ---- colour / fade -----------------------------------------------------
  vColor = mix(aColorA, aColorB, u);
  float fade = pow(max(0.0, 1.0 - u), max(0.05, aOpts.w));
  fade *= smoothstep(0.0, 0.055, u);
  vColor.a *= fade;
}
`,dM=`
precision highp float;
uniform sampler2D uMap;
varying vec2 vUv;
varying vec4 vColor;
void main() {
  vec4 t = texture2D(uMap, vUv);
  float a = t.a * vColor.a;
  if (a < 0.004) discard;
  gl_FragColor = vec4(vColor.rgb * t.rgb, a);
}
`,xr=new he;class td{constructor(e){const t=this.capacity=e.capacity;this.head=0,this.live=0,this._dirty=!1;const n=new hn(1,1),i=new bm;i.index=n.index,i.attributes.position=n.attributes.position,i.attributes.uv=n.attributes.uv,i.instanceCount=t,n.dispose();const s=o=>{const a=new qs(new Float32Array(t*o),o);return a.setUsage(Zn),a};this.aOrigin=s(3),this.aVel=s(3),this.aLife=s(4),this.aColorA=s(4),this.aColorB=s(4),this.aParams=s(4),this.aOpts=s(4),i.setAttribute("aOrigin",this.aOrigin),i.setAttribute("aVel",this.aVel),i.setAttribute("aLife",this.aLife),i.setAttribute("aColorA",this.aColorA),i.setAttribute("aColorB",this.aColorB),i.setAttribute("aParams",this.aParams),i.setAttribute("aOpts",this.aOpts);for(let o=0;o<t;o++)this.aLife.array[o*4+1]=0;this.material=new vt({vertexShader:uM,fragmentShader:dM,uniforms:{uTime:{value:0},uMap:{value:e.map},uAtlas:{value:new ve(e.cols,e.rows)},uScale:{value:1}},transparent:!0,depthWrite:!1,depthTest:!0,blending:e.additive?Ir:hs,side:Nt,toneMapped:!1,fog:!1}),this.mesh=new tt(i,this.material),this.mesh.frustumCulled=!1,this.mesh.renderOrder=e.renderOrder??10,this.mesh.matrixAutoUpdate=!1,this.mesh.name=e.additive?"vfx:additive":"vfx:alpha",this.geometry=i,this._lo=t,this._hi=-1}spawn(e){const t=this.head;this.head=(this.head+1)%this.capacity;let n=t*3;this.aOrigin.array[n]=e.x,this.aOrigin.array[n+1]=e.y,this.aOrigin.array[n+2]=e.z,this.aVel.array[n]=e.vx||0,this.aVel.array[n+1]=e.vy||0,this.aVel.array[n+2]=e.vz||0,n=t*4;const i=this.aLife.array;i[n]=e.birth,i[n+1]=e.life,i[n+2]=e.size0,i[n+3]=e.size1??e.size0;const s=this.aColorA.array;s[n]=e.r0,s[n+1]=e.g0,s[n+2]=e.b0,s[n+3]=e.a0??1;const o=this.aColorB.array;o[n]=e.r1??e.r0,o[n+1]=e.g1??e.g0,o[n+2]=e.b1??e.b0,o[n+3]=e.a1??0;const a=this.aParams.array;a[n]=e.drag??1.5,a[n+1]=e.gravity??-9.8,a[n+2]=e.rot??0,a[n+3]=e.rotSpeed??0;const c=this.aOpts.array;return c[n]=e.cell,c[n+1]=e.stretch??0,c[n+2]=e.mode??0,c[n+3]=e.fade??1,t<this._lo&&(this._lo=t),t>this._hi&&(this._hi=t),this._dirty=!0,t}setScale(e){this.material.uniforms.uScale.value=e}flush(e){if(this.material.uniforms.uTime.value=e,!this._dirty)return;const t=this._lo,i=this._hi-t+1;for(const s of[this.aOrigin,this.aVel,this.aLife,this.aColorA,this.aColorB,this.aParams,this.aOpts])s.addUpdateRange(t*s.itemSize,i*s.itemSize),s.needsUpdate=!0;this._lo=this.capacity,this._hi=-1,this._dirty=!1}clear(){const e=this.aLife.array;for(let t=0;t<this.capacity;t++)e[t*4+1]=0;this.aLife.needsUpdate=!0,this.head=0}dispose(){this.geometry.dispose(),this.material.dispose()}}function Se(r,e,t,n=1){return typeof t=="number"?xr.setHex(t,it):xr.copy(t),r["r"+e]=xr.r*n,r["g"+e]=xr.g*n,r["b"+e]=xr.b*n,r}const Le={GLOW:0,SPARK:1,STREAK:2,SMOKE:3,RING:4,STAR:5,LEAF:6,CHUNK:7,DROP:8,FLAME:9,SPARKLE:10,CLOUD:11,DISC:12,HALO:13,BAR:14,COIN:15},yr=4,Ds=192;function uf(r,e){const t=document.createElement("canvas");return t.width=r,t.height=e??r,t.getContext("2d",{willReadFrequently:!1})}function ti(r,e,t,n,i){const s=r.createRadialGradient(e,t,0,e,t,Math.max(.01,n));for(const o of i)s.addColorStop(o[0],o[1]);r.fillStyle=s,r.beginPath(),r.arc(e,t,n,0,Math.PI*2),r.fill()}const Fe=r=>"rgba(255,255,255,"+r+")",yi=r=>"rgba(0,0,0,"+r+")";function fM(r,e){ti(r,e/2,e/2,e/2,[[0,Fe(1)],[.22,Fe(.82)],[.55,Fe(.24)],[1,Fe(0)]])}function pM(r,e){ti(r,e/2,e/2,e/2,[[0,Fe(.55)],[.45,Fe(.22)],[1,Fe(0)]])}function mM(r,e){const t=e/2;r.save(),r.translate(t,t);for(let n=0;n<4;n++){r.rotate(Math.PI/2);const i=n%2===0?t*.98:t*.62,s=r.createLinearGradient(0,0,0,-i);s.addColorStop(0,Fe(1)),s.addColorStop(.32,Fe(.42)),s.addColorStop(1,Fe(0)),r.fillStyle=s,r.beginPath(),r.moveTo(-e*.03,0),r.lineTo(0,-i),r.lineTo(e*.03,0),r.closePath(),r.fill()}r.restore(),ti(r,t,t,e*.24,[[0,Fe(1)],[.4,Fe(.85)],[1,Fe(0)]])}function gM(r,e){const t=e/2;r.save(),r.translate(t,t),r.rotate(Math.PI/4);for(let n=0;n<4;n++){r.rotate(Math.PI/2);const i=r.createLinearGradient(0,0,0,-t);i.addColorStop(0,Fe(.95)),i.addColorStop(1,Fe(0)),r.fillStyle=i,r.beginPath(),r.moveTo(-e*.016,0),r.lineTo(0,-t*.96),r.lineTo(e*.016,0),r.closePath(),r.fill()}r.restore(),ti(r,t,t,e*.13,[[0,Fe(1)],[1,Fe(0)]])}function vM(r,e){const t=e/2;for(let n=0;n<e;n++){const i=n/(e-1),s=Math.sin(Math.PI*Math.pow(i,.8))*t*.36+.6,o=Math.min(1,Math.sin(Math.PI*Math.pow(i,.55))*1.15);r.fillStyle=Fe(o.toFixed(3)),r.fillRect(t-s,n,s*2,1)}r.globalCompositeOperation="lighter",ti(r,t,e*.3,e*.26,[[0,Fe(.5)],[1,Fe(0)]]),r.globalCompositeOperation="source-over"}function xM(r,e){const t=e/2,n=r.createLinearGradient(0,0,0,e);n.addColorStop(0,Fe(0)),n.addColorStop(.5,Fe(1)),n.addColorStop(1,Fe(0)),r.fillStyle=n,r.fillRect(t-e*.045,0,e*.09,e)}function nd(r,e,t,n,i){const s=e/2;for(let a=0;a<n;a++){const c=t.range(0,Math.PI*2),l=Math.sqrt(t.next())*s*.46,h=s+Math.cos(c)*l,u=s+Math.sin(c)*l,d=t.range(s*.22,s*.5),f=t.range(.16,.34)*i;ti(r,h,u,d,[[0,Fe(f.toFixed(3))],[.55,Fe((f*.55).toFixed(3))],[1,Fe(0)]])}const o=r.createRadialGradient(s,s,s*.4,s,s,s);o.addColorStop(0,yi(1)),o.addColorStop(1,yi(0)),r.globalCompositeOperation="destination-in",r.fillStyle=o,r.fillRect(0,0,e,e),r.globalCompositeOperation="source-over"}function yM(r,e){const t=e/2,n=r.createRadialGradient(t,t,t*.48,t,t,t);n.addColorStop(0,Fe(0)),n.addColorStop(.55,Fe(1)),n.addColorStop(1,Fe(0)),r.fillStyle=n,r.beginPath(),r.arc(t,t,t,0,Math.PI*2),r.fill()}function _M(r,e){const t=e/2;ti(r,t,t,t,[[0,Fe(.5)],[.62,Fe(.66)],[.86,Fe(1)],[1,Fe(0)]])}function MM(r,e){const t=e/2,n=t*.94,i=t*.4;r.save(),r.translate(t,t),r.rotate(-Math.PI/2),r.beginPath();for(let s=0;s<10;s++){const o=s%2===0?n:i,a=s/10*Math.PI*2,c=Math.cos(a)*o,l=Math.sin(a)*o;s===0?r.moveTo(c,l):r.lineTo(c,l)}r.closePath(),r.fillStyle=Fe(1),r.fill(),r.restore()}function bM(r,e){const t=e/2;r.fillStyle=Fe(1),r.beginPath(),r.moveTo(t,e*.06),r.quadraticCurveTo(e*.92,t,t,e*.94),r.quadraticCurveTo(e*.08,t,t,e*.06),r.fill(),r.globalCompositeOperation="destination-out",r.strokeStyle=yi(.5),r.lineWidth=e*.035,r.beginPath(),r.moveTo(t,e*.12),r.lineTo(t,e*.88),r.stroke(),r.globalCompositeOperation="source-over"}function SM(r,e,t){const n=e/2;r.beginPath();const i=8;for(let s=0;s<i;s++){const o=s/i*Math.PI*2,a=n*t.range(.55,.94),c=n+Math.cos(o)*a,l=n+Math.sin(o)*a;s===0?r.moveTo(c,l):r.lineTo(c,l)}r.closePath(),r.fillStyle=Fe(1),r.fill(),r.globalCompositeOperation="destination-out",ti(r,n*1.35,n*1.35,n*.55,[[0,yi(.42)],[1,yi(0)]]),r.globalCompositeOperation="source-over"}function wM(r,e){const t=e/2;r.fillStyle=Fe(1),r.beginPath(),r.moveTo(t,e*.05),r.quadraticCurveTo(e*.86,e*.64,t,e*.95),r.quadraticCurveTo(e*.14,e*.64,t,e*.05),r.fill(),r.globalCompositeOperation="destination-out",ti(r,t,e*.7,e*.16,[[0,yi(.45)],[1,yi(0)]]),r.globalCompositeOperation="source-over"}function TM(r,e){const t=e/2,n=r.createLinearGradient(0,e,0,0);n.addColorStop(0,Fe(0)),n.addColorStop(.16,Fe(.5)),n.addColorStop(.52,Fe(.95)),n.addColorStop(1,Fe(0)),r.fillStyle=n,r.beginPath(),r.moveTo(t,e*.02),r.bezierCurveTo(e*.96,e*.42,e*.8,e*.99,t,e*.99),r.bezierCurveTo(e*.2,e*.99,e*.04,e*.42,t,e*.02),r.fill(),r.globalCompositeOperation="lighter",ti(r,t,e*.66,e*.26,[[0,Fe(.85)],[1,Fe(0)]]),r.globalCompositeOperation="source-over"}function EM(r,e){const t=e/2;r.lineWidth=e*.12,r.strokeStyle=Fe(1),r.beginPath(),r.arc(t,t,t*.72,0,Math.PI*2),r.stroke(),r.fillStyle=Fe(.5),r.beginPath(),r.arc(t,t,t*.62,0,Math.PI*2),r.fill(),r.fillStyle=Fe(1),r.fillRect(t-e*.055,t-e*.3,e*.11,e*.6)}function AM(r){const e=Ds*yr,t=uf(e,e);t.clearRect(0,0,e,e);const n=(s,o)=>{const a=s%yr*Ds,c=Math.floor(s/yr)*Ds;t.save(),t.translate(a,c),t.beginPath(),t.rect(0,0,Ds,Ds),t.clip(),o(t,Ds),t.restore()};n(Le.GLOW,fM),n(Le.SPARK,mM),n(Le.STREAK,vM),n(Le.SMOKE,(s,o)=>nd(s,o,r,26,1)),n(Le.RING,yM),n(Le.STAR,MM),n(Le.LEAF,bM),n(Le.CHUNK,(s,o)=>SM(s,o,r)),n(Le.DROP,wM),n(Le.FLAME,TM),n(Le.SPARKLE,gM),n(Le.CLOUD,(s,o)=>nd(s,o,r,44,.6)),n(Le.DISC,_M),n(Le.HALO,pM),n(Le.BAR,xM),n(Le.COIN,EM);const i=new Jt(t.canvas);return i.colorSpace=it,i.minFilter=un,i.magFilter=Bt,i.generateMipmaps=!0,i.wrapS=i.wrapT=bn,i.flipY=!1,i.needsUpdate=!0,{texture:i,cols:yr,rows:yr}}function RM(r){const n=uf(64,256);n.clearRect(0,0,64,256);const i=n.createLinearGradient(0,0,64,0);i.addColorStop(0,Fe(0)),i.addColorStop(.18,Fe(.7)),i.addColorStop(.5,Fe(1)),i.addColorStop(.82,Fe(.7)),i.addColorStop(1,Fe(0)),n.fillStyle=i,n.fillRect(0,0,64,256),n.globalCompositeOperation="destination-out";for(let o=0;o<5;o++){const a=(o+.5)/5*64+r.range(-2,2);n.fillStyle=yi(r.range(.12,.3).toFixed(3)),n.fillRect(a-1.2,0,2.4,256)}for(let o=0;o<300;o++){const a=r.range(0,64),c=r.range(0,256),l=r.range(1.2,5.5);n.fillStyle=yi(r.range(.05,.4).toFixed(3)),n.beginPath(),n.arc(a,c,l,0,Math.PI*2),n.fill()}n.globalCompositeOperation="source-over";const s=new Jt(n.canvas);return s.colorSpace=it,s.minFilter=un,s.magFilter=Bt,s.wrapS=s.wrapT=bn,s.needsUpdate=!0,s}const CM=`
precision highp float;
attribute float aBirth;
attribute float aAlpha;
uniform float uTime;
uniform float uLife;
varying vec2 vUv;
varying float vFade;
void main() {
  float age = uTime - aBirth;
  // hold at full for the first third of the life, then fall off smoothly
  float f = 1.0 - clamp((age - uLife * 0.34) / (uLife * 0.66), 0.0, 1.0);
  vFade = aAlpha * f * f * step(0.0, age);
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,LM=`
precision highp float;
uniform sampler2D uMap;
uniform vec3 uColor;
varying vec2 vUv;
varying float vFade;
void main() {
  float a = texture2D(uMap, vUv).a * vFade;
  if (a < 0.006) discard;
  gl_FragColor = vec4(uColor, a);
}
`;class PM{constructor(e){const t=this.capacity=e.capacity;this.life=e.life??7,this.head=0,this.used=0,this._lo=t,this._hi=-1;const n=new Float32Array(t*4*3),i=new Float32Array(t*4*2),s=new Float32Array(t*4),o=new Float32Array(t*4),a=new Uint32Array(t*6);for(let l=0;l<t;l++){const h=l*4,u=l*6;a[u]=h,a[u+1]=h+1,a[u+2]=h+2,a[u+3]=h,a[u+4]=h+2,a[u+5]=h+3,s[h]=s[h+1]=s[h+2]=s[h+3]=-1e9}const c=new Et;this.aPos=new at(n,3).setUsage(Zn),this.aUv=new at(i,2).setUsage(Zn),this.aBirth=new at(s,1).setUsage(Zn),this.aAlpha=new at(o,1).setUsage(Zn),c.setAttribute("position",this.aPos),c.setAttribute("uv",this.aUv),c.setAttribute("aBirth",this.aBirth),c.setAttribute("aAlpha",this.aAlpha),c.setIndex(new at(a,1)),c.setDrawRange(0,0),c.boundingSphere=new Gn(new T,1e6),this.material=new vt({vertexShader:CM,fragmentShader:LM,uniforms:{uTime:{value:0},uLife:{value:this.life},uMap:{value:e.map},uColor:{value:new he(e.color??855052)}},transparent:!0,depthWrite:!1,depthTest:!0,polygonOffset:!0,polygonOffsetFactor:-6,polygonOffsetUnits:-6,side:Nt,toneMapped:!1,fog:!1}),this.mesh=new tt(c,this.material),this.mesh.frustumCulled=!1,this.mesh.matrixAutoUpdate=!1,this.mesh.renderOrder=4,this.mesh.name="vfx:tyremarks",this.geometry=c}push(e,t,n,i,s,o,a,c){const l=this.head;this.head=(this.head+1)%this.capacity,this.used<this.capacity&&this.used++;const h=this.aPos.array;let u=l*12;h[u]=e.x,h[u+1]=e.y,h[u+2]=e.z,h[u+3]=t.x,h[u+4]=t.y,h[u+5]=t.z,h[u+6]=i.x,h[u+7]=i.y,h[u+8]=i.z,h[u+9]=n.x,h[u+10]=n.y,h[u+11]=n.z;const d=this.aUv.array;u=l*8,d[u]=0,d[u+1]=a,d[u+2]=1,d[u+3]=a,d[u+4]=1,d[u+5]=c,d[u+6]=0,d[u+7]=c;const f=this.aBirth.array,p=this.aAlpha.array;u=l*4,f[u]=f[u+1]=f[u+2]=f[u+3]=s,p[u]=p[u+1]=p[u+2]=p[u+3]=o,l<this._lo&&(this._lo=l),l>this._hi&&(this._hi=l)}flush(e){if(this.material.uniforms.uTime.value=e,this._hi<0)return;const t=this._lo,n=this._hi-t+1;this.aPos.addUpdateRange(t*12,n*12),this.aPos.needsUpdate=!0,this.aUv.addUpdateRange(t*8,n*8),this.aUv.needsUpdate=!0,this.aBirth.addUpdateRange(t*4,n*4),this.aBirth.needsUpdate=!0,this.aAlpha.addUpdateRange(t*4,n*4),this.aAlpha.needsUpdate=!0,this.geometry.setDrawRange(0,this.used*6),this._lo=this.capacity,this._hi=-1}clear(){this.aBirth.array.fill(-1e9),this.aBirth.needsUpdate=!0,this.head=0,this.used=0,this.geometry.setDrawRange(0,0)}dispose(){this.geometry.dispose(),this.material.dispose()}}const Io=new T(0,1,0),Sc=(r,e,t)=>r<e?e:r>t?t:r,Yi=r=>r<0?0:r>1?1:r,id=[null,{core:3120639,glow:683263,tail:9896,gain:3.6},{core:16747026,glow:16732672,tail:9378304,gain:3.4},{core:10898687,glow:8003327,tail:3344015,gain:3.8}],wc={minitrubo:4834047,pad:16761402,trick:8319231,item:16747050,star:16767034,default:16753714},Mn={road:{color:10262417,cell:Le.SMOKE,rate:0,size:.55,life:.55,debris:0,rise:.5},dirt:{color:12619880,cell:Le.SMOKE,rate:26,size:1.15,life:1.15,debris:16,rise:1.5},sand:{color:15983284,cell:Le.SMOKE,rate:28,size:1.25,life:1.2,debris:14,rise:1.3},grass:{color:10272370,cell:Le.SMOKE,rate:18,size:.9,life:.85,debris:24,rise:1},water:{color:15398911,cell:Le.SMOKE,rate:30,size:.95,life:.65,debris:38,rise:1.8},boost:{color:16761962,cell:Le.SMOKE,rate:0,size:.6,life:.5,debris:0,rise:.9}},ji=12169899,sd={low:{add:600,alpha:260,marks:0,rate:.4,far:34},medium:{add:1200,alpha:480,marks:700,rate:.68,far:46},high:{add:2e3,alpha:760,marks:1200,rate:1,far:62},ultra:{add:2800,alpha:1e3,marks:1600,rate:1.15,far:78}};class DM{name="vfx";order=50;#o={};#e=new T;#t=new T;#i=new T;#s=new T;#r=new T;#n=new T;#h=[];#u=[];async init(e){this.ctx=e,this.rng=e.rng.fork(6236065);const t=this.tier=sd[e.quality]??sd.high;this.farSq=t.far*t.far;const n=AM(this.rng.fork(17));this.atlas=n,this.add=new td({capacity:t.add,map:n.texture,cols:n.cols,rows:n.rows,additive:!0,renderOrder:12}),this.alpha=new td({capacity:t.alpha,map:n.texture,cols:n.cols,rows:n.rows,additive:!1,renderOrder:11}),e.scene.add(this.add.mesh,this.alpha.mesh),t.marks>0&&(this.markTex=RM(this.rng.fork(34)),this.marks=new PM({capacity:t.marks,map:this.markTex,life:7.5}),e.scene.add(this.marks.mesh));for(const i of e.karts)this.#f(i);e.events.on("kart:spawn",i=>this.#f(i)),this.#T(e),e.vfx={burst:(i,s,o)=>this.burst(i,s,o),sparkle:(i,s,o)=>this.#y(i,s??16773280,o??10),trailPuff:(i,s)=>this.#G(i,s),get budget(){return{add:t.add,alpha:t.alpha}}},e.onProgress?.(.92,"acendendo as faíscas")}#f(e){this.#h.some(t=>t.kart===e)||this.#h.push({kart:e,spark:0,sparkGlow:0,smoke:0,dust:[0,0,0,0],flame:0,trail:0,lastTier:0,boostTint:wc.default,wasBoost:!1,wheels:[0,1,2,3].map(()=>({has:!1,v:0,l:new T,r:new T,c:new T})),near:1})}#T(e){const t=e.events;this.#u=[t.on("kart:drift-tier",n=>this.#D(n)),t.on("kart:boost",n=>this.#x(n)),t.on("kart:land",n=>this.#g(n)),t.on("kart:wall",n=>this.#I(n)),t.on("kart:hit",n=>this.#C(n)),t.on("kart:spinout",n=>this.#C(n)),t.on("kart:squash",n=>this.#v(n)),t.on("kart:bump",n=>this.#O(n)),t.on("kart:hop",n=>this.#U(n)),t.on("kart:trick",n=>this.#B(n)),t.on("item:pickup",n=>this.#z(n)),t.on("item:explode",n=>this.burst("explode",n?.position??n?.kart?.position,n)),t.on("item:lightning",()=>this.#H()),t.on("race:start",()=>this.#V())]}#c(e,t,n,i){const s=this.#o;return s.x=0,s.y=0,s.z=0,s.vx=0,s.vy=0,s.vz=0,s.birth=this.ctx.time.t,s.life=t,s.size0=n,s.size1=i??n,s.r0=1,s.g0=1,s.b0=1,s.a0=1,s.r1=1,s.g1=1,s.b1=1,s.a1=0,s.drag=1.6,s.gravity=-9.8,s.rot=0,s.rotSpeed=0,s.cell=e,s.stretch=0,s.mode=0,s.fade=1,s}#l(e,t){return e.x=t.x,e.y=t.y,e.z=t.z,e}#a(e,t){return e.vx=t.x,e.vy=t.y,e.vz=t.z,e}update(e,t){const n=t.camera.position,i=this.tier.rate;for(const s of this.#h){const o=s.kart;if(!o||o.frozen){s.near=0;continue}const a=n.distanceToSquared(o.position);if(s.near=a>this.farSq*2.25?0:a>this.farSq?.18:a>this.farSq*.25?.55:1,s.near<=0)continue;this.#d(o);const c=i*s.near;this.#E(e,t,s,o,c),this.#p(e,t,s,o,c),this.#A(e,t,s,o,c),this.marks&&this.#F(e,t,s,o)}}#d(e){this.#s.set(0,0,1).applyQuaternion(e.quaternion),this.#r.set(1,0,0).applyQuaternion(e.quaternion),this.#n.copy(e.up??Io)}#E(e,t,n,i,s){const o=i.drift;if(!o?.active||!i.onGround){n.spark=n.sparkGlow=n.smoke=0;return}const a=Yi(i.speed/14);if(a<.12)return;const c=o.tier|0,l=id[c],h=Yi((o.charge??0)/780);for(n.smoke+=(c>0?8:12)*a*s*e;n.smoke>=1;)n.smoke-=1,this.#M(i,a);if(!l)return;const u=(330+190*h)*a*s;n.spark+=u*e;let d=0;for(;n.spark>=1&&d<10;)n.spark-=1,d++,this.#_(i,l,a,c);for(n.sparkGlow+=52*a*s*e;n.sparkGlow>=1;)n.sparkGlow-=1,this.#L(i,l,a)}#_(e,t,n,i){const s=this.rng,o=s.next()<.62?e.drift.dir>0?2:3:e.drift.dir>0?3:2,a=e.wheelContacts?.[o];if(!a)return;const c=a.pos??a.contact,l=-Math.sign(e.drift.dir||1),h=s.next(),u=h<.5?Le.SPARKLE:h<.86?Le.STREAK:Le.SPARK,d=this.#c(u,s.range(.1,.21),s.range(.15,.29),s.range(.02,.05));this.#e.copy(c).addScaledVector(this.#n,.08+s.range(0,.1)).addScaledVector(this.#r,s.range(-.1,.1)).addScaledVector(this.#s,s.range(-.14,.1)),this.#l(d,this.#e);const f=s.range(.9,2.8),p=l*s.range(.3,1.4),v=s.range(.6,2);if(this.#t.copy(e.velocity).multiplyScalar(.45).addScaledVector(this.#s,-f).addScaledVector(this.#r,p).addScaledVector(this.#n,v),this.#a(d,this.#t),d.drag=s.range(7.5,11),d.gravity=-10,d.mode=2,d.stretch=u===Le.STREAK?s.range(.28,.5):s.range(.05,.14),d.rot=s.range(0,6.28),d.rotSpeed=s.range(-5,5),d.fade=.5,Se(d,"0",t.core,t.gain),Se(d,"1",t.tail,1.5),d.a0=1,d.a1=0,this.add.spawn(d),s.next()<.075){const g=this.#c(Le.SPARKLE,s.range(.12,.22),s.range(.18,.3),.02);g.x=d.x,g.y=d.y,g.z=d.z,g.vx=d.vx*.5,g.vy=d.vy*.5,g.vz=d.vz*.5,g.drag=4.5,g.gravity=-8,g.fade=1.1,g.rot=s.range(0,6.28),g.rotSpeed=s.range(-3,3),Se(g,"0",t.core,t.gain*1.25),Se(g,"1",t.glow,1.4),this.add.spawn(g)}}#L(e,t,n){const i=this.rng;for(const s of[2,3]){const o=e.wheelContacts?.[s];if(!o||o.grounded===!1)continue;const a=o.pos??o.contact,c=this.#c(Le.GLOW,.11,i.range(.24,.38),.06);this.#e.copy(a).addScaledVector(this.#n,.05),this.#l(c,this.#e),this.#a(c,this.#t.copy(e.velocity).multiplyScalar(.85)),c.drag=6,c.gravity=0,c.fade=1.4,Se(c,"0",t.glow,1.9+n*.8),Se(c,"1",t.tail,.5),c.a0=.85,this.add.spawn(c)}}#M(e,t){const n=this.rng,i=e.wheelContacts?.[n.next()<.5?2:3];if(!i||i.grounded===!1)return;const s=i.pos??i.contact,o=Mn[i.surface??e.surface]??Mn.road,a=(i.surface??e.surface)==="road"||(i.surface??e.surface)==="boost",c=this.#c(Le.SMOKE,n.range(.45,.85),n.range(.26,.4),n.range(.85,1.35));this.#e.copy(s).addScaledVector(this.#n,.14).addScaledVector(this.#r,n.range(-.18,.18)),this.#l(c,this.#e),this.#t.copy(e.velocity).multiplyScalar(.42).addScaledVector(this.#s,-n.range(.6,2.4)).addScaledVector(this.#n,n.range(.25,.9)).addScaledVector(this.#r,-Math.sign(e.drift.dir||1)*n.range(.2,1.4)),this.#a(c,this.#t),c.drag=2.1,c.gravity=.35,c.rot=n.range(0,6.28),c.rotSpeed=n.range(-1.4,1.4),c.fade=1.25,Se(c,"0",a?ji:o.color,.95),Se(c,"1",a?ji:o.color,.75),c.a0=a?.24:.46,c.a1=0,this.alpha.spawn(c)}#p(e,t,n,i,s){const o=i.wheelContacts;if(!o||o.length<4)return;const a=Yi(i.speed/16);if(!(a<.06))for(let c=0;c<4;c++){const l=o[c];if(!l||l.grounded===!1){n.dust[c]=0;continue}const h=l.surface??i.surface??"road",u=Mn[h]??Mn.road;if(u.rate<=0){n.dust[c]=0;continue}if(c<2){n.dust[c]=0;continue}const d=1,f=i.drift?.active?1.7:1;n.dust[c]+=u.rate*d*f*a*s*e;let p=0;for(;n.dust[c]>=1&&p<4;)n.dust[c]-=1,p++,h==="water"?this.#m(i,l,u):this.#b(i,l,u,a,c>=2)}}#b(e,t,n,i,s){const o=this.rng,a=t.pos??t.contact,c=this.#c(Le.SMOKE,n.life*o.range(.75,1.25),n.size*o.range(.34,.52),n.size*o.range(1.15,1.85));if(this.#e.copy(a).addScaledVector(this.#n,.1).addScaledVector(this.#r,o.range(-.22,.22)),this.#l(c,this.#e),this.#t.copy(e.velocity).multiplyScalar(s?.24:.18).addScaledVector(this.#s,-o.range(.8,3.6)*i).addScaledVector(this.#n,n.rise*o.range(.6,1.6)).addScaledVector(this.#r,o.range(-1.1,1.1)),this.#a(c,this.#t),c.drag=1.9,c.gravity=.25,c.rot=o.range(0,6.28),c.rotSpeed=o.range(-1.1,1.1),c.fade=1.35,Se(c,"0",n.color,1.45),Se(c,"1",n.color,.95),c.a0=o.range(.46,.72),c.a1=0,this.alpha.spawn(c),n.debris>0&&o.next()<n.debris/100){const l=n.cell===Le.SMOKE&&n.color===Mn.grass.color,h=this.#c(l?Le.LEAF:Le.CHUNK,o.range(.45,.85),o.range(.055,.13),o.range(.04,.1));h.x=c.x,h.y=c.y,h.z=c.z,this.#t.copy(e.velocity).multiplyScalar(.34).addScaledVector(this.#s,-o.range(1.5,5.5)).addScaledVector(this.#n,o.range(2,5)).addScaledVector(this.#r,o.range(-2.4,2.4)),this.#a(h,this.#t),h.drag=.9,h.gravity=-13,h.rot=o.range(0,6.28),h.rotSpeed=o.range(-9,9),h.fade=.6,Se(h,"0",n.color,l?.9:.72),Se(h,"1",n.color,l?.75:.55),h.a0=.95,h.a1=.6,this.alpha.spawn(h)}}#m(e,t,n){const i=this.rng,s=t.pos??t.contact,o=this.#c(Le.CLOUD,i.range(.35,.6),i.range(.28,.5),i.range(1,1.6));if(this.#e.copy(s).addScaledVector(this.#n,.05),this.#l(o,this.#e),this.#t.copy(e.velocity).multiplyScalar(.35).addScaledVector(this.#n,i.range(1.6,3.6)).addScaledVector(this.#r,i.range(-2.2,2.2)),this.#a(o,this.#t),o.drag=2.6,o.gravity=-3.2,o.fade=1.2,Se(o,"0",n.color,1.25),Se(o,"1",n.color,.9),o.a0=i.range(.42,.7),o.a1=0,this.alpha.spawn(o),i.next()<.5){const a=this.#c(Le.DROP,i.range(.4,.8),i.range(.06,.14),.04);a.x=o.x,a.y=o.y,a.z=o.z,this.#t.copy(e.velocity).multiplyScalar(.5).addScaledVector(this.#n,i.range(3,6.5)).addScaledVector(this.#r,i.range(-3.5,3.5)).addScaledVector(this.#s,i.range(-2,2)),this.#a(a,this.#t),a.drag=.6,a.gravity=-16,a.mode=2,a.stretch=.05,a.fade=.7,Se(a,"0",16777215,1.2),Se(a,"1",n.color,.8),a.a0=.85,a.a1=.2,this.add.spawn(a)}}#A(e,t,n,i,s){if(!((i.boost?.timer??0)>0)){n.flame=n.trail=0,n.wasBoost=!1;return}n.wasBoost=!0;const a=n.boostTint,c=Sc((i.boost.power??1.35)-1,0,1.2);n.flame+=(72+50*c)*s*e;let l=0;for(;n.flame>=1&&l<6;)n.flame-=1,l++,this.#S(i,a);for(n.trail+=26*s*e;n.trail>=1;)n.trail-=1,this.#k(i,a)}#P(e,t,n){return n.copy(e.position).addScaledVector(this.#r,t*.3).addScaledVector(this.#n,.62).addScaledVector(this.#s,-1.32)}#S(e,t){const n=this.rng,i=n.next()<.5?-1:1;this.#P(e,i,this.#e);const s=this.#c(Le.FLAME,n.range(.1,.2),n.range(.16,.28),n.range(.04,.09));if(this.#l(s,this.#e),this.#t.copy(e.velocity).multiplyScalar(.72).addScaledVector(this.#s,-n.range(4.5,9)).addScaledVector(this.#n,n.range(-.3,1.1)).addScaledVector(this.#r,i*n.range(0,.7)),this.#a(s,this.#t),s.drag=4.4,s.gravity=1.2,s.mode=2,s.stretch=n.range(.14,.26),s.fade=.85,Se(s,"0",16771512,1.35),Se(s,"1",t,.8),s.a0=1,s.a1=0,this.add.spawn(s),n.next()<.3){const o=this.#c(Le.SMOKE,n.range(.3,.55),.18,n.range(.7,1.1));o.x=s.x,o.y=s.y,o.z=s.z,this.#t.copy(e.velocity).multiplyScalar(.5).addScaledVector(this.#s,-n.range(1,3)).addScaledVector(this.#n,n.range(.4,1.4)),this.#a(o,this.#t),o.drag=2.4,o.gravity=.4,o.fade=1.3,o.rot=n.range(0,6.28),o.rotSpeed=n.range(-1,1),Se(o,"0",7170664,.9),Se(o,"1",9078403,.7),o.a0=.26,o.a1=0,this.alpha.spawn(o)}}#k(e,t){const n=this.rng,i=this.#c(Le.STREAK,n.range(.2,.36),n.range(.09,.18),.02);this.#e.copy(e.position).addScaledVector(this.#s,-n.range(.9,1.5)).addScaledVector(this.#n,n.range(.12,.4)).addScaledVector(this.#r,n.range(-.62,.62)),this.#l(i,this.#e),this.#t.copy(e.velocity).multiplyScalar(.3).addScaledVector(this.#s,-n.range(2,5)).addScaledVector(this.#n,n.range(.2,1.2)),this.#a(i,this.#t),i.drag=3.2,i.gravity=.8,i.mode=2,i.stretch=.34,i.fade=.9,Se(i,"0",t,1.5),Se(i,"1",t,.5),i.a0=.9,i.a1=0,this.add.spawn(i)}#F(e,t,n,i){const s=i.wheelContacts;if(!s)return;const o=!!i.drift?.active,a=(i._body?.controls?.brake??0)>.5&&i.speed>8,c=(i.boost?.timer??0)>.25&&i.speed>6,l=(o||a||c)&&i.speed>4;for(let h=0;h<4;h++){const u=s[h],d=n.wheels[h],f=u?.surface??i.surface,p=f==="road"||f==="boost";if(!u||u.grounded===!1||!l||!p||h<2&&!o){d.has=!1;continue}const v=u.pos??u.contact;if(d.has&&d.c.distanceToSquared(v)<.3)continue;const g=(h>=2?.16:.12)*(o?1.25:1);this.#e.copy(this.#r).multiplyScalar(g);const m=this.#t.copy(v).sub(this.#e).addScaledVector(this.#n,.035),M=this.#i.copy(v).add(this.#e).addScaledVector(this.#n,.035);if(d.has){const x=d.c.distanceTo(v)*.55,y=(o?.62:.42)*Yi(i.speed/12)*n.near;this.marks.push(d.l,d.r,m,M,t.time.t,y,d.v,d.v+x),d.v+=x}else d.v=0;d.l.copy(m),d.r.copy(M),d.c.copy(v),d.has=!0}}#R(e){return this.#h.find(t=>t.kart===e)}#D(e){const t=e?.kart,n=e?.tier|0;if(!t)return;const i=this.#R(t);if(i&&(i.lastTier=n),!n)return;const s=id[n];this.#d(t);const o=this.rng;for(const c of[2,3]){const l=t.wheelContacts?.[c];if(!l)continue;const h=l.pos??l.contact;for(let d=0;d<14;d++){const f=this.#c(Le.SPARK,o.range(.22,.44),o.range(.2,.36),.02);this.#l(f,this.#e.copy(h).addScaledVector(this.#n,.1)),this.#t.copy(t.velocity).multiplyScalar(.45).addScaledVector(this.#s,-o.range(1.2,6)).addScaledVector(this.#r,o.range(-4,4)).addScaledVector(this.#n,o.range(1,4.5)),this.#a(f,this.#t),f.drag=o.range(2.6,4.4),f.gravity=-13,f.mode=2,f.stretch=o.range(.12,.24),f.fade=.5,Se(f,"0",s.core,s.gain*1.2),Se(f,"1",s.tail,1.6),this.add.spawn(f)}const u=this.#c(Le.GLOW,.26,.1,.62);this.#l(u,this.#e.copy(h).addScaledVector(this.#n,.2)),this.#a(u,this.#t.copy(t.velocity).multiplyScalar(.7)),u.drag=5,u.gravity=0,u.fade=1.8,Se(u,"0",s.glow,2.6),Se(u,"1",s.tail,.7),this.add.spawn(u)}const a=this.#c(Le.RING,.3,.4,2.6);this.#l(a,this.#e.copy(t.position).addScaledVector(this.#n,-.28)),a.mode=1,a.drag=8,a.gravity=0,a.fade=1.6,Se(a,"0",s.glow,2.4),Se(a,"1",s.tail,.4),a.a0=.85,this.add.spawn(a)}#x(e){const t=e?.kart;if(!t)return;const n=this.#R(t),i=e.source??t.boost?.source??"default",s=wc[i]??wc.default;n&&(n.boostTint=s),this.#d(t);const o=this.rng,a=this.#c(Le.RING,.46,.8,6);this.#l(a,this.#e.copy(t.position).addScaledVector(this.#n,-.26)),a.mode=1,a.drag=9,a.gravity=0,a.fade=1.5,Se(a,"0",s,1.7),Se(a,"1",s,.35),a.a0=.95,this.add.spawn(a);for(const c of[-1,1]){this.#P(t,c,this.#e);for(let l=0;l<12;l++){const h=this.#c(Le.FLAME,o.range(.16,.34),o.range(.2,.4),o.range(.05,.12));this.#l(h,this.#e),this.#t.copy(t.velocity).multiplyScalar(.6).addScaledVector(this.#s,-o.range(6,15)).addScaledVector(this.#n,o.range(-.6,1.8)).addScaledVector(this.#r,c*o.range(0,2)),this.#a(h,this.#t),h.drag=3.6,h.gravity=1.4,h.mode=2,h.stretch=o.range(.16,.3),h.fade=.8,Se(h,"0",16772800,1.6),Se(h,"1",s,.9),this.add.spawn(h)}}for(let c=0;c<8;c++){const l=this.#c(Le.CLOUD,o.range(.4,.8),o.range(.3,.5),o.range(1.2,2));this.#l(l,this.#e.copy(t.position).addScaledVector(this.#s,-1.4).addScaledVector(this.#r,o.range(-.9,.9)).addScaledVector(this.#n,-.1)),this.#t.copy(t.velocity).multiplyScalar(.25).addScaledVector(this.#s,-o.range(1,4)).addScaledVector(this.#n,o.range(.5,2)).addScaledVector(this.#r,o.range(-2,2)),this.#a(l,this.#t),l.drag=2.2,l.gravity=.3,l.fade=1.3,l.rot=o.range(0,6.28),l.rotSpeed=o.range(-1,1);const h=Mn[t.surface]??Mn.road;Se(l,"0",t.surface==="road"?ji:h.color,1),Se(l,"1",t.surface==="road"?ji:h.color,.7),l.a0=.34,l.a1=0,this.alpha.spawn(l)}}#g(e){const t=e?.kart;if(!t)return;const n=Sc(e.impact??0,0,30);if(n<2.2)return;this.#d(t);const i=this.rng,s=Mn[t.surface]??Mn.dirt,o=t.surface==="road"?ji:s.color,a=Math.round(Sc(4+n*1.4,4,26)*this.tier.rate);for(let l=0;l<a;l++){const h=i.range(0,Math.PI*2),u=this.#c(Le.CLOUD,i.range(.5,1),i.range(.35,.6),i.range(1.4,2.6));this.#l(u,this.#e.copy(t.position).addScaledVector(this.#n,-.32).addScaledVector(this.#s,Math.cos(h)*i.range(.2,1)).addScaledVector(this.#r,Math.sin(h)*i.range(.2,1))),this.#t.set(Math.sin(h),0,Math.cos(h)).multiplyScalar(i.range(1.4,4)*Yi(n/9)).addScaledVector(this.#n,i.range(.5,1.8)).addScaledVector(t.velocity,.18),this.#a(u,this.#t),u.drag=2.4,u.gravity=.25,u.fade=1.35,u.rot=i.range(0,6.28),u.rotSpeed=i.range(-1.2,1.2),Se(u,"0",o,1.05),Se(u,"1",o,.7),u.a0=i.range(.3,.55),u.a1=0,this.alpha.spawn(u)}const c=this.#c(Le.RING,.42,.6,3+n*.28);this.#l(c,this.#e.copy(t.position).addScaledVector(this.#n,-.3)),c.mode=1,c.drag=9,c.gravity=0,c.fade=1.7,Se(c,"0",o,1.3),Se(c,"1",o,.3),c.a0=.55,this.alpha.spawn(c),e.hard&&this.#y(t.position,16773824,8)}#I(e){const t=e?.kart;if(!t)return;const n=Yi(e.strength??.5);if(n<.12)return;this.#d(t);const i=this.rng,s=Math.round(6+n*26),o=e.normal??this.#i.set(0,0,1);this.#e.copy(t.position).addScaledVector(o,-1).addScaledVector(this.#n,-.1);for(let a=0;a<s;a++){const c=this.#c(Le.SPARK,i.range(.14,.34),i.range(.09,.2),.02);this.#l(c,this.#e),this.#t.copy(o).multiplyScalar(i.range(2,9)).addScaledVector(this.#n,i.range(.5,5)).addScaledVector(this.#s,i.range(-4,1)).addScaledVector(this.#r,i.range(-2.5,2.5)),this.#a(c,this.#t),c.drag=3.6,c.gravity=-14,c.mode=2,c.stretch=.09,c.fade=.55,Se(c,"0",16773312,2.2),Se(c,"1",16742938,1),this.add.spawn(c)}for(let a=0;a<Math.round(3+n*6);a++){const c=this.#c(Le.SMOKE,i.range(.4,.8),.3,i.range(1,1.7));this.#l(c,this.#e),this.#t.copy(o).multiplyScalar(i.range(.5,2.5)).addScaledVector(this.#n,i.range(.4,1.6)),this.#a(c,this.#t),c.drag=2.2,c.gravity=.2,c.fade=1.3,c.rot=i.range(0,6.28),c.rotSpeed=i.range(-1.4,1.4),Se(c,"0",11578020,.95),Se(c,"1",11578020,.7),c.a0=.3*(.4+n),c.a1=0,this.alpha.spawn(c)}}#C(e){const t=e?.kart;if(!t)return;this.#d(t);const n=this.rng;for(let i=0;i<10;i++){const s=this.#c(Le.STAR,n.range(.45,.8),n.range(.1,.2),n.range(.04,.08));this.#l(s,this.#e.copy(t.position).addScaledVector(this.#n,n.range(.5,1.1))),this.#t.set(n.range(-1,1),0,n.range(-1,1)).normalize().multiplyScalar(n.range(1.5,4.5)).addScaledVector(this.#n,n.range(1.5,4)).addScaledVector(t.velocity,.35),this.#a(s,this.#t),s.drag=1.6,s.gravity=-7.5,s.rot=n.range(0,6.28),s.rotSpeed=n.range(-7,7),s.fade=.8,Se(s,"0",16773280,1.6),Se(s,"1",16756768,.7),this.add.spawn(s)}this.#w(t.position,13617602,8,1.4)}#v(e){const t=e?.kart;if(!t)return;this.#d(t);const n=this.#c(Le.RING,.5,.4,4.5);this.#l(n,this.#e.copy(t.position).addScaledVector(this.#n,-.3)),n.mode=1,n.drag=8,n.gravity=0,n.fade=1.5,Se(n,"0",16774048,1.6),Se(n,"1",16765498,.3),this.add.spawn(n),this.#w(t.position,13617602,12,1.7)}#O(e){const t=e?.a,n=e?.b;if(!t||!n)return;this.#e.copy(t.position).add(n.position).multiplyScalar(.5);const i=Yi((e.force??4)/12);this.#w(this.#e,14209739,Math.round(3+i*6),1),this.#y(this.#e,16774080,Math.round(2+i*5))}#U(e){const t=e?.kart;if(!t||!t.onGround)return;this.#d(t);const n=Mn[t.surface]??Mn.road;this.#w(this.#e.copy(t.position).addScaledVector(this.#n,-.3),t.surface==="road"?ji:n.color,5,1)}#B(e){const t=e?.kart;t&&this.#y(t.position,10481919,14)}#z(e){const t=e?.kart;t&&this.#y(t.position,16773792,16)}#H(){const e=this.rng;for(const t of this.#h){const n=t.kart;if(n)for(let i=0;i<6;i++){const s=this.#c(Le.BAR,e.range(.1,.22),e.range(.1,.22),.02);this.#l(s,this.#e.copy(n.position).addScaledVector(Io,e.range(.4,3.2))),this.#a(s,this.#t.set(0,-e.range(6,16),0)),s.drag=.5,s.gravity=0,s.mode=2,s.stretch=.16,s.fade=.6,Se(s,"0",16777215,3),Se(s,"1",16773280,1.2),this.add.spawn(s)}}}#V(){for(const e of this.#h){const t=e.kart;if(!t)continue;this.#d(t);const n=Mn[t.surface]??Mn.road;this.#w(this.#e.copy(t.position).addScaledVector(this.#n,-.25).addScaledVector(this.#s,-1.1),t.surface==="road"?ji:n.color,10,1.6)}}#w(e,t,n,i){const s=this.rng,o=Math.max(1,Math.round(n*this.tier.rate));for(let a=0;a<o;a++){const c=this.#c(Le.CLOUD,s.range(.45,.9),.32*i,s.range(1,1.9)*i);this.#l(c,this.#t.copy(e).addScaledVector(Io,s.range(-.1,.4))),this.#a(c,this.#i.set(s.range(-1,1),s.range(.2,1.2),s.range(-1,1)).multiplyScalar(s.range(1,3))),c.drag=2.3,c.gravity=.25,c.fade=1.3,c.rot=s.range(0,6.28),c.rotSpeed=s.range(-1.2,1.2),Se(c,"0",t,1),Se(c,"1",t,.7),c.a0=s.range(.26,.48),c.a1=0,this.alpha.spawn(c)}}#y(e,t,n){if(!e)return;const i=this.rng,s=Math.max(1,Math.round(n*this.tier.rate));for(let o=0;o<s;o++){const a=this.#c(Le.SPARKLE,i.range(.3,.65),i.range(.14,.34),.02);this.#l(a,this.#t.copy(e).addScaledVector(Io,i.range(.2,1.3))),this.#a(a,this.#i.set(i.range(-1,1),i.range(-.2,1),i.range(-1,1)).multiplyScalar(i.range(1.5,5))),a.drag=2.6,a.gravity=-3.5,a.fade=.9,a.rot=i.range(0,6.28),a.rotSpeed=i.range(-4,4),Se(a,"0",16774880,1.9),Se(a,"1",t,.9),this.add.spawn(a)}}#G(e,t){const n=this.rng,i=this.#c(Le.GLOW,n.range(.18,.34),n.range(.2,.36),.03);this.#l(i,this.#t.copy(e)),this.#a(i,this.#i.set(n.range(-.6,.6),n.range(.2,1.2),n.range(-.6,.6))),i.drag=3,i.gravity=.6,i.fade=1.1,Se(i,"0",t??16777215,1.5),Se(i,"1",t??16777215,.4),this.add.spawn(i)}burst(e,t,n={}){if(!t)return;const i=this.rng;switch(e){case"explode":{const s=n.radius?n.radius/5:1,o=this.#c(Le.DISC,.3,.6*s,7*s);this.#l(o,this.#t.copy(t)),o.drag=8,o.gravity=0,o.fade=1.4,Se(o,"0",16767370,1.9),Se(o,"1",16734736,1.1),this.add.spawn(o);const a=this.#c(Le.RING,.55,1*s,12*s);this.#l(a,this.#t.copy(t).setY(t.y-.5)),a.mode=1,a.drag=6,a.gravity=0,a.fade=1.5,Se(a,"0",16765066,1.8),Se(a,"1",16734746,.3),this.add.spawn(a);for(let c=0;c<Math.round(30*this.tier.rate);c++){const l=this.#c(Le.FLAME,i.range(.24,.55),i.range(.4,.9)*s,i.range(.1,.3));this.#l(l,this.#t.copy(t)),this.#a(l,this.#i.set(i.range(-1,1),i.range(-.1,1.1),i.range(-1,1)).normalize().multiplyScalar(i.range(4,16)*s)),l.drag=3,l.gravity=2,l.mode=2,l.stretch=.08,l.fade=.8,Se(l,"0",16761690,2.3),Se(l,"1",16724488,1.5),this.add.spawn(l)}for(let c=0;c<Math.round(22*this.tier.rate);c++){const l=this.#c(Le.SMOKE,i.range(.8,1.6),i.range(.5,.9)*s,i.range(2.2,4)*s);this.#l(l,this.#t.copy(t)),this.#a(l,this.#i.set(i.range(-1,1),i.range(0,1.2),i.range(-1,1)).multiplyScalar(i.range(1.5,6))),l.drag=1.7,l.gravity=.7,l.fade=1.4,l.rot=i.range(0,6.28),l.rotSpeed=i.range(-1.2,1.2),Se(l,"0",4866880,1),Se(l,"1",7169635,.75),l.a0=i.range(.4,.7),l.a1=0,this.alpha.spawn(l)}this.#y(t,16760938,12);break}case"pickup":this.#y(t,n.color??16773792,n.count??18);break;case"sparkle":this.#y(t,n.color??16777215,n.count??10);break;case"puff":this.#w(t,n.color??12564914,n.count??8,n.scale??1.2);break;case"ring":{const s=this.#c(Le.RING,n.life??.45,n.from??.6,n.to??5);this.#l(s,this.#t.copy(t)),s.mode=1,s.drag=8,s.gravity=0,s.fade=1.5,Se(s,"0",n.color??16777215,n.gain??2.6),Se(s,"1",n.color??16777215,.4),this.add.spawn(s);break}case"aura":{const s=this.#c(Le.SPARKLE,i.range(.3,.6),i.range(.16,.34),.02);this.#l(s,this.#t.copy(t)),this.#a(s,this.#i.set(i.range(-1,1),i.range(.3,1.6),i.range(-1,1)).multiplyScalar(i.range(1,3))),s.drag=2.4,s.gravity=-1.5,s.fade=.9,s.rot=i.range(0,6.28),s.rotSpeed=i.range(-6,6),Se(s,"0",16777215,4),Se(s,"1",n.color??16767034,1.6),this.add.spawn(s);break}default:this.#y(t,16777215,6)}}lateUpdate(e,t){const n=t.time.t;this.add.flush(n),this.alpha.flush(n),this.marks?.flush(n)}dispose(){for(const e of this.#u)e?.();this.#u.length=0,this.add?.mesh?.parent?.remove(this.add.mesh),this.alpha?.mesh?.parent?.remove(this.alpha.mesh),this.marks?.mesh?.parent?.remove(this.marks.mesh),this.add?.dispose(),this.alpha?.dispose(),this.marks?.dispose(),this.markTex?.dispose(),this.atlas?.texture?.dispose(),this.#h.length=0}}const Tc=new T(0,1,0),Uo=(r,e,t)=>r<e?e:r>t?t:r,rd=(r,e,t,n)=>r+(e-r)*(1-Math.exp(-t*n)),od={distance:6.4,distanceSpeed:1.6,distanceBoost:1.1,height:2.55,heightSpeed:.25,lookAhead:8,lookAheadSpeed:4,lookHeight:1.05,posLambda:8.5,lookLambda:11,yawLambda:6,fovBase:60,fovSpeed:9,fovBoost:14,fovLambda:5.5,driftYaw:.28,driftRoll:.055,steerRoll:.016,rollLambda:7,groundClear:1.05,shakeDecay:5.5};class IM{name="camera";order=60;#o=new T;#e=new T;#t=0;#i=od.fovBase;#s=0;#r=0;#n=0;#h=null;#u=null;#f=new T;#T=new T;#c=new T;#l=new Pt(0,0,0,"YXZ");async init(e){this.ctx=e,this.tune={...od};const t=e.player;t&&(this.#t=this.#d(t),this.#E(t,0),this.#e.copy(t.position)),e.camera.fov=this.#i,e.camera.near=.25,e.camera.far=4e3,e.camera.updateProjectionMatrix(),e.events.on("kart:hit",n=>{this.#a(n)&&this.kick(.85)}),e.events.on("kart:wall",n=>{this.#a(n)&&this.kick(.35)}),e.events.on("kart:land",n=>{this.#a(n)&&this.kick(Uo((n?.impact??1)*.4,.12,.7))}),e.events.on("race:start",()=>{this.#u=null}),e.events.on("race:countdown",n=>{n?.n===0&&(this.#u=null)}),e.race?.state==="countdown"&&(this.#u={t:0,dur:Math.max(.1,e.race.countdown)}),e.cameraApi={kick:n=>this.kick(n),pose:(n,i)=>this.pose(n,i),clearPose:()=>this.clearPose(),tune:this.tune}}#a(e){return e?.kart?!!e.kart.isPlayer:!1}kick(e=.5){this.#r=Math.min(1.6,this.#r+e)}#d(e){return this.#l.setFromQuaternion(e.quaternion,"YXZ").y}#E(e,t){const n=this.tune.distance+t;this.#o.set(e.position.x-Math.sin(this.#t)*n,e.position.y+this.tune.height,e.position.z-Math.cos(this.#t)*n)}lateUpdate(e,t){if(this.#h){this.#_(t);return}const n=t.player;if(!n)return;const i=this.tune,s=Math.max(1,n.stats?.topSpeed??26),o=Uo(n.speed/s,0,1.6),a=(n.boost?.timer??0)>0,c=n.drift?.active?n.drift.dir:0;let u=(this.#d(n)+c*i.driftYaw-this.#t)%(Math.PI*2);u>Math.PI&&(u-=Math.PI*2),u<-Math.PI&&(u+=Math.PI*2),this.#t+=u*(1-Math.exp(-i.yawLambda*e));const d=i.distance+o*i.distanceSpeed+(a?i.distanceBoost:0),f=i.height+o*i.heightSpeed,p=this.#f.set(n.position.x-Math.sin(this.#t)*d,n.position.y+f,n.position.z-Math.cos(this.#t)*d),v=t.world?.sampleGround?.(p.x,p.z);v&&Number.isFinite(v.y)&&(p.y=Math.max(p.y,v.y+i.groundClear)),this.#o.lerp(p,1-Math.exp(-i.posLambda*e));const g=this.#T.set(0,0,1).applyQuaternion(n.quaternion),m=i.lookAhead+o*i.lookAheadSpeed,M=this.#c.copy(n.position).addScaledVector(g,m);M.y+=i.lookHeight,this.#e.lerp(M,1-Math.exp(-i.lookLambda*e));const x=t.camera;x.position.copy(this.#o),x.up.copy(Tc),x.lookAt(this.#e);const y=c*i.driftRoll+(n.steerAngle??0)*i.steerRoll;if(this.#s=rd(this.#s,y,i.rollLambda,e),x.rotateZ(this.#s),this.#r>.001){this.#n+=e*47;const S=this.#r*this.#r*.05;x.rotateX(Math.sin(this.#n*2.7)*S),x.rotateY(Math.sin(this.#n*3.9+1.3)*S),x.rotateZ(Math.sin(this.#n*5.1+2.1)*S*.6),this.#r=Math.max(0,this.#r-i.shakeDecay*e*this.#r)}const w=i.fovBase+o*i.fovSpeed+(a?i.fovBoost:0);if(this.#i=rd(this.#i,w,i.fovLambda,e),Math.abs(x.fov-this.#i)>.02&&(x.fov=this.#i,x.updateProjectionMatrix()),t.render?.setSpeedFactor?.(Uo(o+(a?.45:0),0,1)),this.#u){this.#u.t+=e;const S=Uo(this.#u.t/this.#u.dur,0,1),E=1-Math.pow(1-S,3),L=9*(1-E);x.position.x-=Math.sin(this.#t)*L,x.position.z-=Math.cos(this.#t)*L,x.position.y+=3.4*(1-E),x.lookAt(this.#e),S>=1&&(this.#u=null)}}#_(e){const t=this.#h;e.camera.position.copy(t.position),e.camera.up.copy(Tc),e.camera.lookAt(t.target),e.camera.fov!==t.fov&&(e.camera.fov=t.fov,e.camera.updateProjectionMatrix())}pose(e,t={}){const n=this.ctx,i=n.player,s=t.at?new T().fromArray(t.at):i?i.position.clone():new T,o=i?this.#d(i):0,a=(u,d,f)=>new T(u,d,f).applyAxisAngle(Tc,o);let c,l,h=55;switch(e){case"chase":return this.#h=null,this.lateUpdate(1/60,n),{pose:"chase",live:!0};case"hero":c=s.clone().add(a(4,2,-4.8)),l=s.clone().add(a(0,.8,.3)),h=42;break;case"front":c=s.clone().add(a(.5,1.45,5.4)),l=s.clone().add(a(0,.95,0)),h=38;break;case"wheel":c=s.clone().add(a(1.85,.8,1.75)),l=s.clone().add(a(.65,.4,.85)),h=34;break;case"overhead":c=s.clone().add(new T(0,240,.01)),l=s.clone(),h=60;break;case"vista":c=s.clone().add(a(-13,7,-21)),l=s.clone().add(a(0,1.5,26)),h=50;break;case"horizon":c=s.clone().add(new T(0,5.5,0)),l=s.clone().add(a(0,9,60)),h=70;break;case"grid":c=s.clone().add(a(0,8.5,-17)),l=s.clone().add(a(0,.6,7)),h=46;break;case"lowchase":c=s.clone().add(a(0,.75,-5.2)),l=s.clone().add(a(0,.9,14)),h=58;break;default:return null}return t.fov&&(h=t.fov),this.#h={position:c,target:l,fov:h},this.#_(n),{pose:e,position:c.toArray(),target:l.toArray(),fov:h}}clearPose(){this.#h=null}dispose(){}}const ad=3,UM=1.4;class NM{name="race";order=45;#o=new T;async init(e){this.ctx=e;const t=e.world;this.checkpoints=Array.isArray(t?.checkpoints)&&t.checkpoints.length?[...t.checkpoints].sort((n,i)=>n-i):Array.from({length:t?.checkpointCount??16},(n,i)=>i/(t?.checkpointCount??16)),this.cpCount=this.checkpoints.length,this.trackLength=t?.trackLength??1e3,e.race.totalLaps=e.opts?.laps??e.race.totalLaps??3,e.race.state="countdown",e.race.countdown=ad,e.race.timeMs=0,e.race.startedAt=0,e.race.results=[];for(const n of e.karts)this.#e(n);this._lastCountShown=ad+1,e.events.on("kart:respawn-request",n=>this.#n(n))}#e(e){const t=this.ctx.world?.project?.(e.position);e.lap=1,e.checkpoint=0,e.nextCp=0,e.progress=0,e.raceDistance=0,e.lastU=t?.u??0,e.finished=!1,e.finishTimeMs=0,e.lapTimes=[],e.lapStartMs=0,e.bestLapMs=0,e.respawn={active:!1,timer:0,u:t?.u??0},e.frozen=!0,e.offTrackTime=0}update(e,t){const n=t.race;if(n.state==="countdown"){n.countdown-=e;const i=Math.ceil(n.countdown);if(i<this._lastCountShown&&(this._lastCountShown=i,i>0&&t.events.emit("race:countdown",{n:i})),n.countdown<=0){n.state="racing",n.countdown=0;for(const s of t.karts)s.frozen=!1,s.lapStartMs=0;t.events.emit("race:start",{}),t.events.emit("race:countdown",{n:0})}return}if(n.state==="racing"||n.state==="finishing"){n.timeMs+=e*1e3;for(const i of t.karts)this.#t(i,e,t),this.#r(i,e,t);this.#u(t),n.state==="racing"&&t.player?.finished?(n.state="finishing",n.finishGraceMs=6e3):n.state==="finishing"&&(n.finishGraceMs-=e*1e3,(n.finishGraceMs<=0||t.karts.every(i=>i.finished))&&(n.state="results",t.events.emit("race:results",{results:n.results,karts:t.karts})))}}#t(e,t,n){if(e.finished)return;const s=n.world.project(e.position),o=s.u;let a=o-e.lastU;a>.5&&(a-=1),a<-.5&&(a+=1),e.lastU=o;const c=this.checkpoints[e.nextCp];a>0&&this.#i(o,a,c)&&(e.checkpoint=e.nextCp,e.nextCp=(e.nextCp+1)%this.cpCount,e.nextCp===0&&this.#s(e,n)),e.progress=e.lap-1+e.nextCp/this.cpCount*.999+o*1e-4;let l=s.distAlong;e.nextCp===0&&l>this.trackLength*.5&&(l-=this.trackLength),e.raceDistance=(e.lap-1)*this.trackLength+l,e.lateral=s.lateral,e.splineU=o}#i(e,t,n){const i=e-t;return i<=n&&e>=n||i>e&&i<=n+1&&e+1>=n}#s(e,t){const n=t.race,i=n.timeMs-e.lapStartMs;e.lapStartMs=n.timeMs,e.lapTimes.push(i),(!e.bestLapMs||i<e.bestLapMs)&&(e.bestLapMs=i),e.lap>=n.totalLaps?(e.finished=!0,e.finishTimeMs=n.timeMs,n.results.push({id:e.id,name:e.name,place:n.results.length+1,timeMs:e.finishTimeMs,bestLapMs:e.bestLapMs}),e.place=n.results.length,t.events.emit("race:finish",{kart:e,place:e.place,timeMs:e.finishTimeMs})):(e.lap++,e.isPlayer&&(n.lap=e.lap),t.events.emit("race:lap",{kart:e,lap:e.lap,lapMs:i,final:e.lap===n.totalLaps}))}#r(e,t,n){if(e.finished)return;if(e.respawn.active){e.respawn.timer-=t,e.respawn.timer<=0&&this.#h(e,n);return}const i=e.position.y<(n.world.minY??-25),s=e.surface==="water"&&e.onGround,o=Math.abs(e.lateral??0)>(n.world.maxLateral??90),a=e.onGround&&(e.surface==="grass"||e.surface==="sand");e.offTrackTime=a?e.offTrackTime+t:0;const c=e.offTrackTime>4||Math.abs(e.lateral??0)>34;(i||s||o||c)&&this.#n(e)}#n(e){e.respawn.active||(e.respawn.active=!0,e.respawn.timer=UM,e.respawn.u=e.splineU??e.respawn.u,e.frozen=!0,e.velocity.set(0,0,0),e.forwardSpeed=0,this.ctx.events.emit("kart:respawn-start",{kart:e}))}#h(e,t){const n=t.world,i=n.respawn?n.respawn(e.respawn.u):(()=>{const s=n.sampleSpline(e.respawn.u),o=new et().setFromRotationMatrix(new pe().lookAt(new T,s.tangent.clone().negate(),s.normal));return{position:s.pos.clone().add(this.#o.copy(s.normal).multiplyScalar(1.2)),quaternion:o}})();e.position.copy(i.position),e.quaternion.copy(i.quaternion),e.velocity.set(0,0,0),e.forwardSpeed=0,e.drift.active=!1,e.drift.charge=0,e.drift.tier=0,e.respawn.active=!1,e.frozen=!1,t.events.emit("kart:respawn-end",{kart:e})}#u(e){const t=e.karts.filter(i=>!i.finished);t.sort((i,s)=>s.raceDistance-i.raceDistance);const n=e.race.results.length;t.forEach((i,s)=>{i.place=n+s+1}),e.race.playerPlace=e.player?.place??1,e.race.fieldSize=e.karts.length}dispose(){}}const kM='#rk{--green: #24d15c;--green-d: #0a7a2e;--green-l: #7dffa6;--gold: #ffc61a;--gold-l: #ffe98a;--gold-d: #d07d00;--red: #f04437;--red-d: #9d1610;--ink: #05100a;--ink-2: #0b1a11;--paper: #f2fbf4;--panel: linear-gradient(170deg, rgba(11, 26, 17, .86) 0%, rgba(4, 10, 7, .92) 100%);--edge: 1px solid rgba(255, 255, 255, .14);--glowline: linear-gradient(90deg, var(--green) 0%, var(--gold) 50%, var(--red) 100%);--shadow: 0 .35em 1.4em rgba(0, 0, 0, .55), 0 .06em .2em rgba(0, 0, 0, .6);--font: "Segoe UI", system-ui, -apple-system, Roboto, sans-serif;--display: "Arial Black", "Archivo Black", "Segoe UI Black", "Helvetica Neue", var(--font);--pad-x: max( calc(1.6vmin + 8px) , env(safe-area-inset-left));--pad-y: max( calc(1.6vmin + 8px) , env(safe-area-inset-top));--pad-b: max( calc(1.6vmin + 8px) , env(safe-area-inset-bottom));--r: clamp(8px, 1.5vmin, 20px);position:absolute;inset:0;pointer-events:none;color:var(--paper);font-family:var(--font);font-variant-numeric:tabular-nums;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;contain:layout style}#rk *{box-sizing:border-box}#rk svg{display:block;width:100%;height:100%;overflow:visible}#rk .grid{position:absolute;inset:0;display:grid;grid-template-columns:auto minmax(0,1fr) auto;grid-template-rows:auto minmax(0,1fr) auto;padding:var(--pad-y) var(--pad-x) var(--pad-b);gap:clamp(6px,1.2vmin,18px);opacity:1;transition:opacity .32s ease,transform .32s cubic-bezier(.2,.8,.3,1)}#rk.hide-hud .grid{opacity:0;transform:scale(.985)}#rk .a-tl{grid-area:1/1;justify-self:start;align-self:start;display:flex;flex-direction:column;gap:clamp(6px,1.1vmin,14px)}#rk .a-tc{grid-area:1/2;justify-self:center;align-self:start}#rk .a-tr{grid-area:1/3;justify-self:end;align-self:start;display:flex;flex-direction:column;align-items:flex-end;gap:clamp(6px,1.1vmin,14px)}#rk .a-mc{grid-area:2/1 / 3/4;justify-self:center;align-self:start;padding-top:4vmin}#rk .a-bl{grid-area:3/1;justify-self:start;align-self:end;display:flex;flex-direction:column;align-items:flex-start;gap:clamp(6px,1.1vmin,14px)}#rk .a-br{grid-area:3/3;justify-self:end;align-self:end}#rk .swoop{animation:rk-swoop .5s cubic-bezier(.18,.9,.26,1.05) both}@keyframes rk-swoop{0%{opacity:0;transform:translate3d(0,.8em,0) scale(.94)}}#rk .chip{display:inline-flex;align-items:center;gap:.55em;padding:.34em .78em .38em;border-radius:calc(var(--r) * .9);background:var(--panel);border:var(--edge);box-shadow:var(--shadow);backdrop-filter:blur(6px) saturate(1.15);-webkit-backdrop-filter:blur(6px) saturate(1.15)}#rk .chip .ico{width:1.5em;height:1.5em;flex:none}#rk .place{position:relative;display:flex;align-items:flex-end;line-height:.78;font-family:var(--display);font-weight:900;transform-origin:100% 100%;filter:drop-shadow(0 .06em .05em rgba(0,0,0,.75)) drop-shadow(0 .02em .015em rgba(0,0,0,.9))}#rk .place .num{position:relative;font-size:clamp(58px,15vmin,210px);letter-spacing:-.04em;transform:skew(-7deg)}#rk .place .num i{font-style:normal;display:block}#rk .place .num .stroke{position:absolute;inset:0;color:transparent;-webkit-text-stroke:.13em #fff;paint-order:stroke fill}#rk .place .num .fill{background:linear-gradient(178deg,#fff6cf 4%,var(--gold) 38%,#ff9d0b 72%,#cf6b00 100%);-webkit-background-clip:text;background-clip:text;color:transparent}#rk .place .ord{position:relative;font-size:clamp(24px,5.6vmin,78px);margin-left:-.06em;margin-bottom:.48em;transform:skew(-7deg)}#rk .place .ord i{font-style:normal;display:block}#rk .place .ord .stroke{position:absolute;inset:0;color:transparent;-webkit-text-stroke:.2em #fff}#rk .place .ord .fill{background:linear-gradient(178deg,#fff6cf,var(--gold) 45%,#d97c00);-webkit-background-clip:text;background-clip:text;color:transparent}#rk .place .of{font-family:var(--font);font-weight:800;font-size:clamp(12px,2.1vmin,26px);color:#ffffffc7;margin:0 0 .95em .35em;letter-spacing:.06em;text-shadow:0 2px 4px rgba(0,0,0,.9)}#rk .place.up{animation:rk-place-up .62s cubic-bezier(.2,.9,.25,1) both}#rk .place.down{animation:rk-place-down .62s cubic-bezier(.2,.9,.25,1) both}@keyframes rk-place-up{0%{transform:scale(1)}22%{transform:scale(1.28) translateY(-.04em)}to{transform:scale(1)}}@keyframes rk-place-down{0%{transform:scale(1)}22%{transform:scale(.82) translateY(.05em)}to{transform:scale(1)}}#rk .place .flash{position:absolute;inset:-18% -14%;border-radius:999px;opacity:0;pointer-events:none}#rk .place.up .flash{background:radial-gradient(closest-side,rgba(60,255,130,.75),transparent 72%);animation:rk-flash .62s ease-out both}#rk .place.down .flash{background:radial-gradient(closest-side,rgba(255,70,55,.75),transparent 72%);animation:rk-flash .62s ease-out both}@keyframes rk-flash{0%{opacity:.95;transform:scale(.7)}to{opacity:0;transform:scale(1.25)}}#rk .lap{font-family:var(--display);font-size:clamp(15px,2.5vmin,34px);letter-spacing:.01em;transition:transform .3s cubic-bezier(.2,.9,.3,1)}#rk .lap .tag{font-family:var(--font);font-weight:800;font-size:.52em;letter-spacing:.18em;color:#fff9;margin-right:.1em}#rk .lap .n{color:#fff;text-shadow:0 2px 5px rgba(0,0,0,.8)}#rk .lap .n b{color:var(--gold)}#rk .lap .sep{color:#ffffff73;margin:0 .12em}#rk .lap.final{background:linear-gradient(170deg,#ffc61af5,#d07d00f5);border-color:#ffffff8c;animation:rk-final-pulse 1.05s ease-in-out infinite}#rk .lap.final .tag{color:#1e0e00b8}#rk .lap.final .n,#rk .lap.final .n b,#rk .lap.final .sep{color:#1d0f00;text-shadow:none}@keyframes rk-final-pulse{0%,to{transform:scale(1);box-shadow:var(--shadow),0 0 #ffc61a80}50%{transform:scale(1.045);box-shadow:var(--shadow),0 0 0 .5em #ffc61a00}}#rk .speedo{--v: 0;position:relative;width:clamp(112px,20vmin,250px);aspect-ratio:1 / .68;filter:drop-shadow(0 .3em .8em rgba(0,0,0,.55))}#rk .speedo .arc-bg{stroke:#060e09c7}#rk .speedo .arc-tick{stroke:#ffffff4d}#rk .speedo .arc-fill{stroke:url(#rk-speedgrad);stroke-dasharray:var(--len) 1000;stroke-dashoffset:calc((1 - var(--v)) * var(--len));transition:stroke-dashoffset .09s linear}#rk .speedo .needle{transform:rotate(calc(-115deg + var(--v) * 230deg));transform-origin:50% 72.5%;transition:transform .09s cubic-bezier(.3,.8,.4,1)}#rk .speedo .read{position:absolute;left:0;right:0;bottom:2%;text-align:center;font-family:var(--display);line-height:.9}#rk .speedo .read .kmh{font-size:clamp(24px,5.2vmin,66px);color:#fff;text-shadow:0 .06em .1em rgba(0,0,0,.95),0 0 .5em rgba(36,209,92,.35);transform:skew(-6deg);display:inline-block}#rk .speedo .read .unit{display:block;font-family:var(--font);font-weight:800;font-size:clamp(9px,1.35vmin,16px);letter-spacing:.26em;color:#ffffff8c;margin-top:.35em}#rk .speedo.boosting .read .kmh{color:var(--gold-l);text-shadow:0 .06em .1em rgba(0,0,0,.95),0 0 .7em rgba(255,198,26,.9)}#rk .speedo.boosting{animation:rk-boostshake .22s ease-in-out infinite}@keyframes rk-boostshake{0%,to{transform:translateZ(0)}50%{transform:translate3d(.4%,-.6%,0)}}#rk .item{position:relative;width:clamp(66px,11.5vmin,152px);aspect-ratio:1;border-radius:calc(var(--r) * 1.25);background:var(--panel);border:2px solid rgba(255,255,255,.2);box-shadow:var(--shadow),inset 0 0 2.4em #24d15c1f;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);overflow:hidden;transition:transform .25s cubic-bezier(.2,.9,.3,1),border-color .25s ease}#rk .item:before{content:"";position:absolute;inset:0;border-radius:inherit;padding:2px;background:var(--glowline);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:.5}#rk .item .glyphs{position:absolute;inset:13%}#rk .item .g{position:absolute;inset:0;opacity:0;transform:scale(.72) rotate(-8deg);transition:opacity .12s ease,transform .18s cubic-bezier(.2,.9,.3,1)}#rk .item .g.on{opacity:1;transform:none}#rk .item.spin .g.on{transition:none}#rk .item.spin{animation:rk-item-spin .16s linear infinite}@keyframes rk-item-spin{0%,to{transform:rotate(-1.5deg)}50%{transform:rotate(1.5deg)}}#rk .item.landed{animation:rk-item-land .45s cubic-bezier(.2,1.5,.4,1) both;border-color:var(--gold)}@keyframes rk-item-land{0%{transform:scale(1.42)}60%{transform:scale(.95)}to{transform:scale(1)}}#rk .item .label{position:absolute;left:0;right:0;bottom:0;text-align:center;font-weight:900;font-size:clamp(7px,1.05vmin,13px);letter-spacing:.1em;padding:.3em 0 .34em;background:linear-gradient(0deg,rgba(0,0,0,.8),transparent);color:var(--gold-l);opacity:0;transform:translateY(100%);transition:opacity .2s ease,transform .28s cubic-bezier(.2,.9,.3,1)}#rk .item.has .label{opacity:1;transform:none}#rk .item .sheen{position:absolute;inset:-40% -120%;background:linear-gradient(74deg,transparent 42%,rgba(255,255,255,.5) 50%,transparent 58%);opacity:0}#rk .item.landed .sheen{animation:rk-sheen .6s .1s ease-out both}@keyframes rk-sheen{0%{opacity:.9;transform:translate(-45%)}to{opacity:0;transform:translate(45%)}}#rk .times{display:flex;flex-direction:column;gap:.18em;padding:.5em .8em .58em;border-radius:calc(var(--r) * .9);background:var(--panel);border:var(--edge);box-shadow:var(--shadow);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);font-size:clamp(11px,1.55vmin,20px)}#rk .times .row{display:flex;align-items:baseline;justify-content:space-between;gap:1.1em}#rk .times .k{font-weight:800;font-size:.74em;letter-spacing:.16em;color:#ffffff80}#rk .times .v{font-family:var(--display);font-size:1.12em;color:#fff;font-variant-numeric:tabular-nums}#rk .times .row.total .v{font-size:1.5em;color:var(--gold)}#rk .times .row.best .v{color:var(--green-l)}#rk .times .row.best.record .v{animation:rk-rec 1s ease-out 3}@keyframes rk-rec{0%,to{transform:none}30%{transform:scale(1.18)}}#rk .map{position:relative;width:clamp(104px,19vmin,248px);aspect-ratio:1;border-radius:calc(var(--r) * 1.1);background:var(--panel);border:var(--edge);box-shadow:var(--shadow);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);overflow:hidden}#rk .map canvas{position:absolute;inset:0;width:100%;height:100%}#rk .map .cap{position:absolute;left:0;right:0;top:0;font-weight:900;font-size:clamp(7px,1.05vmin,13px);letter-spacing:.18em;padding:.4em .8em;color:#ffffff9e;background:linear-gradient(180deg,rgba(0,0,0,.55),transparent)}#rk .board{width:clamp(126px,21vmin,280px);padding:.42em;border-radius:calc(var(--r) * .9);background:var(--panel);border:var(--edge);box-shadow:var(--shadow);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);font-size:clamp(9.5px,1.4vmin,18px);display:flex;flex-direction:column;gap:.14em}#rk .board .r{display:grid;grid-template-columns:1.9em 1fr auto;align-items:center;gap:.35em;padding:.18em .32em;border-radius:.45em;transition:transform .35s cubic-bezier(.2,.9,.3,1),background-color .3s ease}#rk .board .r .p{font-family:var(--display);color:var(--gold);text-align:right}#rk .board .r .nm{font-weight:700;color:#fffc;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;letter-spacing:.01em}#rk .board .r .dot{width:.55em;height:.55em;border-radius:50%;box-shadow:0 0 0 1.5px #00000080}#rk .board .r.me{background:linear-gradient(90deg,#24d15c57,#24d15c0f);box-shadow:inset 0 0 0 1px #7dffa666}#rk .board .r.me .nm{color:#fff;font-weight:900}#rk .board .r.me .p{color:var(--green-l)}#rk .board .r.done .nm{color:#ffffff73}#rk .warns{display:flex;flex-direction:column;align-items:center;gap:.5vmin}#rk .warn{font-family:var(--display);font-size:clamp(16px,3.4vmin,48px);letter-spacing:.02em;padding:.2em .7em .26em;border-radius:.3em;transform:skew(-8deg);box-shadow:0 .2em .8em #0009;animation:rk-warn-in .35s cubic-bezier(.15,1.2,.4,1) both}#rk .warn>span{display:block;transform:skew(8deg)}#rk .warn.danger{background:linear-gradient(175deg,#ff5b4e,var(--red-d));color:#fff;text-shadow:0 2px 3px rgba(0,0,0,.45)}#rk .warn.gold{background:linear-gradient(175deg,var(--gold-l),var(--gold-d));color:#24160a}#rk .warn.good{background:linear-gradient(175deg,var(--green-l),var(--green-d));color:#04240f}#rk .warn.blink{animation:rk-warn-in .35s cubic-bezier(.15,1.2,.4,1) both,rk-blink .62s .35s steps(1,end) infinite}#rk .warn.out{animation:rk-warn-out .3s ease-in both}@keyframes rk-warn-in{0%{opacity:0;transform:skew(-8deg) scale(.6) translateY(-.3em)}}@keyframes rk-warn-out{to{opacity:0;transform:skew(-8deg) scale(1.15)}}@keyframes rk-blink{0%,55%{opacity:1}56%,to{opacity:.18}}#rk .count{position:absolute;inset:0;display:grid;place-items:center;pointer-events:none}#rk .count .n{font-family:var(--display);font-size:clamp(110px,28vmin,400px);line-height:1;position:relative;opacity:0;transform:skew(-6deg)}#rk .count .n i{font-style:normal;display:block}#rk .count .n .stroke{position:absolute;inset:0;color:transparent;-webkit-text-stroke:.1em #fff;filter:drop-shadow(0 .04em .04em rgba(0,0,0,.8))}#rk .count .n .fill{background:linear-gradient(178deg,#fff9dd 5%,var(--gold) 42%,#ef8a00 100%);-webkit-background-clip:text;background-clip:text;color:transparent}#rk .count.go .n .fill{background:linear-gradient(178deg,#d9ffe6 5%,var(--green) 45%,#067a2c 100%);-webkit-background-clip:text;background-clip:text}#rk .count .halo{position:absolute;inset:-30%;border-radius:50%;background:radial-gradient(closest-side,rgba(255,198,26,.45),transparent 70%);opacity:0}#rk .count.go .halo{background:radial-gradient(closest-side,rgba(36,209,92,.55),transparent 70%)}#rk .count.beat .n{animation:rk-count 1s cubic-bezier(.16,1,.3,1) both}#rk .count.beat .halo{animation:rk-halo .85s ease-out both}@keyframes rk-count{0%{opacity:0;transform:skew(-6deg) scale(2.4)}16%{opacity:1;transform:skew(-6deg) scale(1)}70%{opacity:1;transform:skew(-6deg) scale(1.02)}to{opacity:0;transform:skew(-6deg) scale(.72)}}@keyframes rk-halo{0%{opacity:1;transform:scale(.4)}to{opacity:0;transform:scale(1.5)}}#rk .screens{position:absolute;inset:0}#rk .screen{position:absolute;inset:0;display:none;pointer-events:auto;opacity:0;transition:opacity .3s ease}#rk .screen.open{display:block;opacity:1}#rk .screen .veil{position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 18%,#143e22d1,#040c08ed 58%,#020604f7)}#rk .screen.thin .veil{background:linear-gradient(180deg,#030906c7,#030906e0);backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px)}#rk .screen .body{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(10px,2vmin,28px);padding:calc(var(--pad-y) + 2vmin) calc(var(--pad-x) + 2vmin) calc(var(--pad-b) + 2vmin);overflow:hidden}#rk .screen.open .body>*{animation:rk-rise .42s cubic-bezier(.2,.9,.25,1) both}#rk .screen.open .body>*:nth-child(2){animation-delay:.05s}#rk .screen.open .body>*:nth-child(3){animation-delay:.1s}#rk .screen.open .body>*:nth-child(4){animation-delay:.15s}#rk .screen.open .body>*:nth-child(5){animation-delay:.2s}@keyframes rk-rise{0%{opacity:0;transform:translate3d(0,1.4em,0)}}#rk .wordmark{font-family:var(--display);font-size:clamp(38px,10vmin,148px);line-height:.86;letter-spacing:-.035em;text-align:center;transform:skew(-7deg);position:relative}#rk .wordmark i{font-style:normal;display:block}#rk .wordmark .stroke{position:absolute;inset:0;color:transparent;-webkit-text-stroke:.1em rgba(255,255,255,.95);filter:drop-shadow(0 .05em .05em rgba(0,0,0,.8))}#rk .wordmark .fill{background:linear-gradient(103deg,var(--green) 0%,#6ff08d 18%,var(--gold) 48%,#ff8b2a 74%,var(--red) 100%);-webkit-background-clip:text;background-clip:text;color:transparent}#rk .wordmark .sub{display:block;transform:skew(7deg);font-family:var(--font);font-weight:800;font-size:clamp(9px,1.6vmin,20px);letter-spacing:.58em;margin-top:.9em;color:#ffffff80;text-indent:.58em}#rk .screen h2{font-family:var(--display);font-size:clamp(20px,4vmin,54px);letter-spacing:.01em;transform:skew(-7deg);color:#fff;text-shadow:0 .08em .18em rgba(0,0,0,.7)}#rk .screen .hint{font-size:clamp(9px,1.35vmin,16px);font-weight:700;letter-spacing:.2em;color:#ffffff61;text-align:center}#rk .screen .hint kbd{font:inherit;border:1px solid rgba(255,255,255,.28);border-radius:.4em;padding:.1em .45em;margin:0 .15em;color:#ffffffb8}#rk .menu{display:flex;flex-direction:column;gap:clamp(5px,.9vmin,12px);width:min(30em,74vw)}#rk .mi{position:relative;display:flex;align-items:center;justify-content:space-between;gap:1em;pointer-events:auto;cursor:pointer;padding:.62em 1em .68em 1.15em;border-radius:calc(var(--r) * .85);background:linear-gradient(100deg,#ffffff13,#ffffff06);border:1px solid rgba(255,255,255,.13);font-family:var(--display);font-size:clamp(14px,2.35vmin,30px);color:#ffffffd1;transform-origin:0 50%;transition:transform .2s cubic-bezier(.2,.9,.3,1),background-color .2s ease,color .2s ease,border-color .2s ease;overflow:hidden}#rk .mi:before{content:"";position:absolute;left:0;top:0;bottom:0;width:.32em;background:var(--glowline);transform:scaleY(0);transition:transform .22s cubic-bezier(.2,.9,.3,1)}#rk .mi .val{font-family:var(--font);font-weight:800;font-size:.74em;letter-spacing:.08em;color:var(--gold);display:flex;align-items:center;gap:.7em}#rk .mi .val .arw{width:.9em;height:.9em;opacity:.5;transition:opacity .2s ease}#rk .mi .val .arw.l{transform:rotate(180deg)}#rk .mi.sel{background:linear-gradient(100deg,#24d15c4d,#ffc61a1a);border-color:#ffffff73;color:#fff;transform:translate(.5em) scale(1.025);box-shadow:0 .3em 1.2em #00000080}#rk .mi.sel:before{transform:scaleY(1)}#rk .mi.sel .val .arw{opacity:1}#rk .mi.primary{background:linear-gradient(100deg,#24d15c59,#0a7a2e4d)}#rk .mi.primary.sel{background:linear-gradient(100deg,var(--green),#12a544);color:#04230f}#rk .mi.primary.sel .val{color:#04230f}#rk .picker{display:flex;gap:clamp(6px,1.2vmin,16px);align-items:stretch;justify-content:center;flex-wrap:wrap;max-width:min(56em,92vw)}#rk .card{pointer-events:auto;cursor:pointer;width:clamp(74px,11vmin,148px);border-radius:calc(var(--r) * .9);padding:.7em .4em .6em;background:linear-gradient(175deg,#ffffff14,#ffffff05);border:1px solid rgba(255,255,255,.12);display:flex;flex-direction:column;align-items:center;gap:.45em;transition:transform .22s cubic-bezier(.2,.9,.3,1),box-shadow .22s ease,border-color .22s ease,background-color .22s ease}#rk .card .art{width:62%;aspect-ratio:1;color:var(--c, var(--green));filter:drop-shadow(0 .12em .2em rgba(0,0,0,.5))}#rk .card .nm{font-family:var(--display);font-size:clamp(9px,1.35vmin,17px);letter-spacing:.04em;color:#ffffffbf}#rk .card .bars{display:flex;flex-direction:column;gap:2px;width:78%}#rk .card .bar{height:clamp(3px,.45vmin,6px);border-radius:99px;background:#ffffff21;overflow:hidden}#rk .card .bar span{display:block;height:100%;border-radius:99px;background:var(--glowline);transform-origin:0 50%;transform:scaleX(var(--f, .5))}#rk .card.sel{border-color:#fff;background:linear-gradient(175deg,#fff3,#ffffff0d);transform:translateY(-.5em) scale(1.07);box-shadow:0 .5em 1.6em #0009,0 0 0 .15em #ffc61a8c}#rk .card.sel .nm{color:#fff}#rk .card.sel .art{animation:rk-bob 1.9s ease-in-out infinite}@keyframes rk-bob{0%,to{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-8%) rotate(3deg)}}#rk .sectitle{font-weight:900;font-size:clamp(9px,1.4vmin,17px);letter-spacing:.34em;color:#ffffff6b;text-align:center}#rk .podium{display:flex;flex-direction:column;gap:clamp(3px,.55vmin,8px);width:min(46em,90vw)}#rk .pr{display:grid;grid-template-columns:2.6em 1fr auto auto;align-items:center;gap:.8em;padding:.42em .9em .46em;border-radius:calc(var(--r) * .8);background:linear-gradient(100deg,#ffffff13,#ffffff05);border:1px solid rgba(255,255,255,.1);font-size:clamp(11px,1.75vmin,23px);animation:rk-slide .45s cubic-bezier(.2,.9,.25,1) both;animation-delay:calc(var(--i) * .07s)}@keyframes rk-slide{0%{opacity:0;transform:translate3d(-1.6em,0,0)}}#rk .pr .p{font-family:var(--display);font-size:1.35em;text-align:right;color:#fff9}#rk .pr .nm{font-family:var(--display);color:#ffffffe0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#rk .pr .t{font-variant-numeric:tabular-nums;font-weight:700;color:#ffffffb3}#rk .pr .bl{font-variant-numeric:tabular-nums;font-weight:700;font-size:.82em;color:var(--green-l);opacity:.85;min-width:7em;text-align:right}#rk .pr.gold{background:linear-gradient(100deg,#ffc61a61,#ffc61a0f);border-color:#ffe88c8c}#rk .pr.gold .p,#rk .pr.gold .nm{color:#fff}#rk .pr.silver{background:linear-gradient(100deg,#d6e2e842,#d6e2e80a)}#rk .pr.bronze{background:linear-gradient(100deg,#cf813e42,#cf813e0a)}#rk .pr.me{box-shadow:inset 0 0 0 1.5px var(--green-l)}#rk .pr .p.medal{color:var(--gold)}#rk .touch{position:absolute;inset:0;display:none}#rk.touch-on .touch{display:block}#rk .tstick{position:absolute;left:calc(var(--pad-x) + 1vmin);bottom:calc(var(--pad-b) + 1vmin);width:clamp(120px,30vmin,220px);aspect-ratio:1;border-radius:50%;pointer-events:auto;touch-action:none;background:radial-gradient(closest-side,rgba(255,255,255,.1),rgba(255,255,255,.03) 70%,transparent);border:2px solid rgba(255,255,255,.18);box-shadow:inset 0 0 3em #00000059}#rk .tstick .knob{position:absolute;left:50%;top:50%;width:46%;aspect-ratio:1;margin:-23% 0 0 -23%;border-radius:50%;background:linear-gradient(175deg,#ffffffe6,#bed0c3b3);box-shadow:0 .2em .6em #00000080;transform:translate3d(calc(var(--sx, 0) * 54%),0,0);transition:transform .07s linear}#rk .tstick .tick{position:absolute;inset:0;display:grid;place-items:center;color:#ffffff4d;font-weight:900;font-size:1.6vmin}#rk .tbtns{position:absolute;right:calc(var(--pad-x) + 1vmin);bottom:calc(var(--pad-b) + 1vmin);display:grid;grid-template-columns:repeat(2,auto);gap:clamp(8px,1.6vmin,18px);align-items:end}#rk .tb{pointer-events:auto;touch-action:none;-webkit-tap-highlight-color:transparent;width:clamp(58px,13vmin,108px);aspect-ratio:1;border-radius:50%;display:grid;place-items:center;font-family:var(--display);font-size:clamp(10px,1.7vmin,20px);letter-spacing:.06em;color:#fff;background:linear-gradient(175deg,#ffffff2b,#ffffff0d);border:2px solid rgba(255,255,255,.25);box-shadow:0 .3em .9em #00000080;transition:transform .1s ease,background-color .1s ease;user-select:none}#rk .tb.big{width:clamp(84px,19vmin,156px);grid-row:span 2;align-self:end}#rk .tb.accel{background:linear-gradient(175deg,#24d15c8c,#0a7a2e80)}#rk .tb.drift{background:linear-gradient(175deg,#ffc61a80,#d07d0073)}#rk .tb.item{background:linear-gradient(175deg,#f0443780,#9d161073)}#rk .tb.on{transform:scale(.9);background-color:#ffffff4d}#rk.portrait .a-tr{flex-direction:row-reverse;align-items:flex-start}#rk.portrait .board{display:none}#rk.portrait .a-bl{flex-direction:row;align-items:flex-end;gap:1.2vmin}#rk.portrait .grid{grid-template-rows:auto minmax(0,1fr) auto auto}#rk.portrait .a-bl{grid-area:3/1 / 4/3}#rk.portrait .a-br{grid-area:3/3}#rk.portrait .place .num{font-size:clamp(52px,13vmin,120px)}#rk.portrait .menu{width:min(30em,88vw)}#rk.portrait .picker{max-width:94vw}#rk.portrait .pr{grid-template-columns:2.2em 1fr auto;font-size:clamp(10px,3vmin,18px)}#rk.portrait .pr .bl{display:none}#rk.touch-on .a-bl{margin-bottom:clamp(120px,31vmin,232px)}#rk.touch-on .a-br{margin-bottom:clamp(88px,20vmin,168px)}#rk.touch-on.portrait .a-bl{margin-bottom:clamp(126px,32vmin,240px)}@media(prefers-reduced-motion:reduce){#rk *,#rk *:before,#rk *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}#rk .gaugewrap{display:flex;flex-direction:column;align-items:center;gap:clamp(3px,.55vmin,8px)}#rk .mt{display:flex;gap:clamp(3px,.5vmin,7px)}#rk .mt i{display:block;width:clamp(15px,2.8vmin,34px);height:clamp(4px,.72vmin,9px);border-radius:99px;background:#ffffff21;box-shadow:inset 0 0 0 1px #00000080;transition:background-color .1s ease,box-shadow .1s ease}#rk .mt.t1 i:nth-child(1){background:#5ec6ff;box-shadow:0 0 .5em #5ec6fff2}#rk .mt.t2 i:nth-child(-n+2){background:#ffa524;box-shadow:0 0 .5em #ffa524f2}#rk .mt.t3 i{background:#c46bff;box-shadow:0 0 .55em #c46bfff2}#rk .mt.pop{animation:rk-mtpop .32s cubic-bezier(.2,1.4,.4,1) both}@keyframes rk-mtpop{0%{transform:scale(1.28)}to{transform:scale(1)}}#rk .count .hub{position:relative;display:grid;place-items:center}#rk .speedo .needle{transform-box:view-box}#rk .speedo>svg{position:absolute;inset:0}#rk .place .of{white-space:nowrap}#rk .item .g>svg{width:100%;height:100%}#rk .tbtns{grid-template-columns:auto auto auto}#rk .tb.brake{grid-column:1;grid-row:2}#rk .tb.item{grid-column:2;grid-row:1}#rk .tb.drift{grid-column:2;grid-row:2}#rk .tb.accel{grid-column:3;grid-row:1 / span 2}';function df(r,e,t){const n=document.createElement(r);return e&&(n.className=e),t!=null&&(n.innerHTML=t),n}function ne(r,e,t,n){const i=df(e,t,n);return r.appendChild(i),i}function Ot(r,e){const t=String(e);return r._rkText===t?!1:(r._rkText=t,r.textContent=t,!0)}function wt(r,e,t){const n="_rkC_"+e;return r[n]===!!t?!1:(r[n]=!!t,r.classList.toggle(e,!!t),!0)}function Ec(r,e,t){const n="_rkV_"+e,i=String(t);return r[n]===i?!1:(r[n]=i,r.style.setProperty(e,i),!0)}function Ki(r,e){r.classList.remove(e),r.offsetWidth,r.classList.add(e)}const bl=r=>r<10?"0"+r:""+r,FM=r=>r<10?"00"+r:r<100?"0"+r:""+r;function Ac(r){if(!Number.isFinite(r)||r<=0)return"-'--″---";const e=Math.floor(r),t=Math.floor(e/6e4),n=Math.floor(e%6e4/1e3),i=e%1e3;return`${t}'${bl(n)}″${FM(i)}`}function cd(r){(!Number.isFinite(r)||r<0)&&(r=0);const e=Math.floor(r),t=Math.floor(e/6e4),n=Math.floor(e%6e4/1e3),i=Math.floor(e%1e3/100);return`${bl(t)}:${bl(n)}.${i}`}function No(){return"º"}const _r=(r,e,t)=>r<e?e:r>t?t:r,Zt=(r,e="")=>`<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" ${e} fill="none" stroke-linejoin="round" stroke-linecap="round">${r}</svg>`,Mt="#0b1410",ko=(r,e)=>`
  <defs><linearGradient id="mg${r.slice(1)}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${r}"/><stop offset="1" stop-color="${e}"/></linearGradient></defs>
  <path d="M32 8c13 0 22 9.6 22 20.5 0 4.2-3 6.5-7.4 6.5H17.4C13 35 10 32.7 10 28.5 10 17.6 19 8 32 8Z"
        fill="url(#mg${r.slice(1)})" stroke="${Mt}" stroke-width="3.4"/>
  <ellipse cx="21.5" cy="21" rx="6.2" ry="5" fill="#fff8e6"/>
  <ellipse cx="41" cy="18.5" rx="7" ry="5.6" fill="#fff8e6"/>
  <ellipse cx="46" cy="29" rx="4.2" ry="3.2" fill="#fff8e6"/>
  <path d="M22 35h20v9c0 6.6-4.5 11-10 11s-10-4.4-10-11v-9Z" fill="#fdf3d8" stroke="${Mt}" stroke-width="3.4"/>
  <path d="M27 41.5c0 4 .6 7.4 2 10.2" stroke="${Mt}" stroke-width="2.4" opacity=".45"/>`,ld=(r,e)=>`
  <defs><linearGradient id="sg${r.slice(1)}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${r}"/><stop offset="1" stop-color="${e}"/></linearGradient></defs>
  <path d="M32 6c14.4 0 25 10.4 25 23.5S46.4 53 32 53 7 42.6 7 29.5 17.6 6 32 6Z"
        fill="url(#sg${r.slice(1)})" stroke="${Mt}" stroke-width="3.4"/>
  <path d="M9 34c8 6 38 6 46 0" stroke="${Mt}" stroke-width="3" opacity=".8"/>
  <path d="M32 6v28M18 10.5 24 33M46 10.5 40 33" stroke="${Mt}" stroke-width="2.6" opacity=".55"/>
  <path d="M7.5 34.5c0 10.6 11 18.5 24.5 18.5S56.5 45.1 56.5 34.5c0 0-9 4.5-24.5 4.5S7.5 34.5 7.5 34.5Z"
        fill="#fdf3d8" stroke="${Mt}" stroke-width="3.4"/>
  <ellipse cx="22" cy="18" rx="6" ry="4" fill="#fff" opacity=".38"/>`,Sl={none:()=>Zt(`<circle cx="32" cy="32" r="16" stroke="#ffffff" stroke-width="3" opacity=".18"
                  stroke-dasharray="5 7"/>`),boost:()=>Zt(ko("#ff5d4a","#c8221b")),triple:()=>Zt(`
    <g transform="translate(2 16) scale(.52)">${ko("#ff5d4a","#c8221b")}</g>
    <g transform="translate(30 16) scale(.52)">${ko("#ff5d4a","#c8221b")}</g>
    <g transform="translate(16 -6) scale(.52)">${ko("#ffd24a","#e08a00")}</g>`),banana:()=>Zt(`
    <defs><linearGradient id="bng" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffe14d"/><stop offset="1" stop-color="#d99400"/></linearGradient></defs>
    <path d="M13 12c1.5 20 11 32 33 34.5 4 .5 6 4 3 6.5-6 5-20 4.5-29.5-4C10 41 7.5 27 9 14.5 9.4 10.8 12.7 8.6 13 12Z"
          fill="url(#bng)" stroke="${Mt}" stroke-width="3.4"/>
    <path d="M17 18c2.4 13 10 22 24 26" stroke="#fff6c9" stroke-width="3" opacity=".65"/>
    <path d="M10.5 12.5 8 7" stroke="${Mt}" stroke-width="4"/>`),shellGreen:()=>Zt(ld("#4fe07a","#12923c")),shellRed:()=>Zt(ld("#ff6a5c","#c1201a")),bomb:()=>Zt(`
    <path d="M25 14c2-5 9-6 12-2" stroke="#c98a3a" stroke-width="4"/>
    <circle cx="27" cy="40" r="20" fill="#1b2026" stroke="${Mt}" stroke-width="3.4"/>
    <ellipse cx="20" cy="32" rx="6.5" ry="4.5" fill="#fff" opacity=".3" transform="rotate(-30 20 32)"/>
    <path d="M38 21 46 13" stroke="#c98a3a" stroke-width="5"/>
    <path d="M50 6c3 3 3 7 0 9-3-2-3-6 0-9Z" fill="#ffd24a" stroke="${Mt}" stroke-width="2.6"/>
    <circle cx="50" cy="9" r="6" fill="#ffb01a" opacity=".55"/>`),star:()=>Zt(`
    <defs><linearGradient id="stg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff3a8"/><stop offset=".5" stop-color="#ffcb1c"/>
      <stop offset="1" stop-color="#e08a00"/></linearGradient></defs>
    <path d="M32 4 40 24l21.5 1.4-16.6 13.8 5.4 21L32 48.6 13.7 60.2l5.4-21L2.5 25.4 24 24 32 4Z"
          fill="url(#stg)" stroke="${Mt}" stroke-width="3.4"/>
    <circle cx="25" cy="28" r="2.8" fill="${Mt}"/><circle cx="39" cy="28" r="2.8" fill="${Mt}"/>
    <path d="M27 37c3 3 7 3 10 0" stroke="${Mt}" stroke-width="3"/>`),bolt:()=>Zt(`
    <defs><linearGradient id="blg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff17a"/><stop offset="1" stop-color="#f0a400"/></linearGradient></defs>
    <path d="M38 3 13 36h13L22 61l27-35H35L38 3Z" fill="url(#blg)" stroke="${Mt}" stroke-width="3.4"/>`),coin:()=>Zt(`
    <defs><linearGradient id="cng" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#e09000"/></linearGradient></defs>
    <ellipse cx="32" cy="32" rx="20" ry="25" fill="url(#cng)" stroke="${Mt}" stroke-width="3.4"/>
    <ellipse cx="32" cy="32" rx="11" ry="16" fill="none" stroke="${Mt}" stroke-width="2.8" opacity=".55"/>
    <path d="M32 20v24" stroke="${Mt}" stroke-width="3.4"/>`),ghost:()=>Zt(`
    <path d="M32 6c12 0 20 9 20 21v29l-7-6-6 6-7-6-7 6-6-6-7 6V27C12 15 20 6 32 6Z"
          fill="#eef3ff" stroke="${Mt}" stroke-width="3.4"/>
    <circle cx="25" cy="26" r="4.5" fill="${Mt}"/><circle cx="40" cy="26" r="4.5" fill="${Mt}"/>
    <path d="M26 38c4 4 9 4 13 0" stroke="${Mt}" stroke-width="3.2"/>`)},wl=["boost","triple","banana","shellGreen","shellRed","bomb","star","bolt","coin","ghost"],OM={none:"",boost:"TURBO",triple:"TURBO TRIPLO",banana:"BANANA",shellGreen:"CASCO VERDE",shellRed:"CASCO VERMELHO",bomb:"BOMBA",star:"ESTRELA",bolt:"RAIO",coin:"MOEDA",ghost:"FANTASMA"},BM={flag:()=>Zt(`
    <path d="M13 4v56" stroke="#f4f7f4" stroke-width="6"/>
    <path d="M19 8h38v26H19z" fill="#f4f7f4"/>
    <path d="M19 8h9.5v8.7H19zM38 8h9.5v8.7H38zM28.5 16.7H38v8.6h-9.5zM47.5 16.7H57v8.6h-9.5z
             M19 25.3h9.5V34H19zM38 25.3h9.5V34H38z" fill="#101613"/>`),clock:()=>Zt(`
    <circle cx="32" cy="34" r="23" fill="none" stroke="currentColor" stroke-width="5"/>
    <path d="M32 20v15l10 6" stroke="currentColor" stroke-width="5"/>
    <path d="M22 6h20" stroke="currentColor" stroke-width="5"/>`),trophy:()=>Zt(`
    <path d="M18 8h28v14c0 8.8-6.3 15-14 15s-14-6.2-14-15V8Z" fill="#ffcb1c" stroke="${Mt}" stroke-width="3.4"/>
    <path d="M18 12H9v4c0 6 4 10 9 10M46 12h9v4c0 6-4 10-9 10" stroke="${Mt}" stroke-width="3.4"/>
    <path d="M28 37h8v9h-8zM18 46h28v8H18z" fill="#ffcb1c" stroke="${Mt}" stroke-width="3.4"/>`),chevron:()=>Zt('<path d="M24 14 42 32 24 50" stroke="currentColor" stroke-width="7"/>'),kart:()=>Zt(`
    <path d="M8 40c0-6 6-10 14-10h20c8 0 14 4 14 10v5H8v-5Z" fill="currentColor"/>
    <circle cx="19" cy="47" r="8" fill="#101613"/><circle cx="45" cy="47" r="8" fill="#101613"/>
    <path d="M24 30l6-11h8l4 11" fill="currentColor"/>`)},Os=new Map;function zM(r){return Os.has(r)||Os.set(r,(Sl[r]??Sl.none)()),Os.get(r)}function Mr(r){const e="ui:"+r;return Os.has(e)||Os.set(e,(BM[r]??Sl.none)()),Os.get(e)}const Un=[{name:"Rasta",color:"#1eae4b",stats:{topSpeed:27,accel:12,handling:2.65,weight:1,miniTurbo:4.5}},{name:"Zion",color:"#f2622e",stats:{topSpeed:28.4,accel:10.4,handling:2.3,weight:1.22,miniTurbo:3.5}},{name:"Marley",color:"#1b7fd4",stats:{topSpeed:26.2,accel:13.4,handling:3,weight:.84,miniTurbo:5}},{name:"Selah",color:"#8bd42a",stats:{topSpeed:27.4,accel:11.6,handling:2.55,weight:1.05,miniTurbo:4.25}},{name:"Kofi",color:"#d42a8b",stats:{topSpeed:28.8,accel:10,handling:2.2,weight:1.3,miniTurbo:3.25}},{name:"Nia",color:"#7a4fd4",stats:{topSpeed:26,accel:13.8,handling:3.1,weight:.8,miniTurbo:5.25}},{name:"Tafari",color:"#59606b",stats:{topSpeed:27.2,accel:12.2,handling:2.7,weight:1,miniTurbo:4.5}},{name:"Ayo",color:"#e8d7ab",stats:{topSpeed:27.8,accel:11.2,handling:2.45,weight:1.12,miniTurbo:4}}],Fo=[{id:"low",label:"BAIXA"},{id:"medium",label:"MÉDIA"},{id:"high",label:"ALTA"},{id:"ultra",label:"ULTRA"}],Oo=["none",...wl],HM=50,VM=49.3,is=38,wr=115,GM=is*(wr*2)*Math.PI/180,Bo=(r,e)=>{const t=r*Math.PI/180;return[HM+Math.sin(t)*e,VM-Math.cos(t)*e]};function WM(){const[r,e]=Bo(-wr,is),[t,n]=Bo(wr,is),i=`M${r.toFixed(2)} ${e.toFixed(2)} A${is} ${is} 0 1 1 ${t.toFixed(2)} ${n.toFixed(2)}`;let s="";for(let o=0;o<=10;o++){const a=-wr+o/10*wr*2,c=o%5===0,[l,h]=Bo(a,is-(c?8.5:6.5)),[u,d]=Bo(a,is-4.6);s+=`<path class="arc-tick" d="M${l.toFixed(2)} ${h.toFixed(2)}L${u.toFixed(2)} ${d.toFixed(2)}" stroke-width="${c?1.9:1.1}" stroke-linecap="round"/>`}return`<svg viewBox="0 0 100 68" xmlns="http://www.w3.org/2000/svg" fill="none">
    <defs>
      <linearGradient id="rk-speedgrad" x1="0" y1="1" x2="1" y2="0.1">
        <stop offset="0" stop-color="#24d15c"/>
        <stop offset=".52" stop-color="#ffc61a"/>
        <stop offset="1" stop-color="#f04437"/>
      </linearGradient>
    </defs>
    <path d="${i}" stroke="rgba(4,10,7,.86)" stroke-width="12.5" stroke-linecap="round"/>
    <path class="arc-bg" d="${i}" stroke-width="8" stroke-linecap="round"/>
    ${s}
    <path class="arc-fill" d="${i}" stroke-width="8" stroke-linecap="round" style="--len:${GM.toFixed(2)}"/>
    <g class="needle">
      <path d="M50 12.2 L51.75 29.6 L48.25 29.6 Z" fill="#ffffff" stroke="#08120c" stroke-width="1" stroke-linejoin="round"/>
    </g>
  </svg>`}class XM{name="hud";order=70;#o=new Map;#e=[];#t=[];#i={};#s=null;#r=null;#n=null;#h=null;#u=[];#f=0;async init(e){this.ctx=e;const t=new URLSearchParams(typeof location<"u"?location.search:"");this.settings={quality:Fo.findIndex(n=>n.id===e.quality)<0?2:Fo.findIndex(n=>n.id===e.quality),volume:7,sens:6},this.charIndex=_r(Number(t.get("char")??0)|0,0,Un.length-1),this.#T(),this.#c(),this.#A(),this.#P(),this.#B(),this.#S(this.charIndex,!0),e.settings=e.settings??{},e.settings.volume=this.settings.volume/10,e.settings.sensitivity=this.settings.sens/10,e.hud={open:n=>this.#x(n),close:()=>this.#g(),toast:(n,i,s)=>this.#v("api",n,i,s??2200),root:this.root,sync:()=>this.lateUpdate(0,e)},t.has("nomenu")?this.#g():this.#x("menu"),this.#G(e,!0),e.onProgress?.(.98,"montando o hud")}#T(){let e=document.getElementById("rk-hud-css");e||(e=document.createElement("style"),e.id="rk-hud-css",document.head.appendChild(e)),e.textContent=kM,this.styleTag=e}#c(){const e=document.getElementById("ui-root")??document.body,t=this.root=df("div");t.id="rk",e.appendChild(t);const n=this.parts={},i=n.grid=ne(t,"div","grid swoop"),s=ne(i,"div","a-tl"),o=n.lap=ne(s,"div","lap chip");ne(o,"span","ico",Mr("flag")),ne(o,"span","tag").textContent="VOLTA",n.lapCur=ne(ne(o,"span","n"),"b"),ne(o,"span","sep").textContent="/",n.lapTot=ne(o,"span","n");const a=ne(s,"div","times"),c=(L,b)=>{const _=ne(a,"div","row "+L);return ne(_,"span","k").textContent=b,{row:_,v:ne(_,"span","v")}};n.tTotal=c("total","TEMPO"),n.tLap=c("cur","VOLTA"),n.tBest=c("best","MELHOR"),n.warns=ne(ne(i,"div","a-tc"),"div","warns");const l=ne(i,"div","a-tr"),h=n.mapBox=ne(l,"div","map");n.mapCanvas=ne(h,"canvas"),ne(h,"div","cap").textContent="CIRCUITO";const u=n.board=ne(l,"div","board");for(let L=0;L<8;L++){const b=ne(u,"div","r"),_={node:b,p:ne(b,"span","p"),nm:ne(b,"span","nm"),dot:ne(b,"span","dot"),id:-1};this.#e.push(_)}const d=ne(i,"div","a-bl"),f=n.item=ne(d,"div","item"),p=ne(f,"div","glyphs");n.glyphs={};for(const L of Oo)n.glyphs[L]=ne(p,"div","g",zM(L));ne(f,"div","sheen"),n.itemLabel=ne(f,"div","label");const v=ne(d,"div","gaugewrap"),g=n.speedo=ne(v,"div","speedo",WM()),m=ne(g,"div","read");n.kmh=ne(m,"span","kmh"),ne(m,"span","unit").textContent="KM/H",n.mt=ne(v,"div","mt");for(let L=0;L<3;L++)ne(n.mt,"i");const M=n.place=ne(ne(i,"div","a-br"),"div","place");ne(M,"div","flash");const x=ne(M,"div","num");n.placeNumS=ne(x,"i","stroke"),n.placeNumF=ne(x,"i","fill");const y=ne(M,"div","ord");ne(y,"i","stroke").textContent=No(),ne(y,"i","fill").textContent=No(),n.placeOf=ne(M,"div","of");const w=n.count=ne(t,"div","count"),S=ne(w,"div","hub");ne(S,"div","halo");const E=ne(S,"div","n");n.countS=ne(E,"i","stroke"),n.countF=ne(E,"i","fill"),this.#b(t),n.screens=ne(t,"div","screens"),this.#d(),this.#E(),this.#_(),this.#L()}#l(e,t){const n=ne(this.parts.screens,"div","screen"+(t?" thin":""));ne(n,"div","veil");const i=ne(n,"div","body");return this.#i[e]={node:n,body:i,items:[],index:0},this.#i[e]}#a(e,t,n={}){const i=ne(e,"div","mi"+(n.primary?" primary":""));ne(i,"span",null).textContent=t;const s=ne(i,"span","val");let o=null;return n.values?(ne(s,"span","arw l",Mr("chevron")),o=ne(s,"span","ov"),ne(s,"span","arw r",Mr("chevron"))):n.value!=null?(o=ne(s,"span","ov"),o.textContent=n.value):ne(s,"span","arw r",Mr("chevron")),{node:i,out:o}}#d(){const e=this.#l("menu",!1),t=e.body,n=ne(t,"div","wordmark");ne(n,"i","stroke").textContent="RASTA KART",ne(n,"i","fill").textContent="RASTA KART",ne(n,"span","sub").textContent="GRANDE PRÊMIO",ne(t,"div","sectitle").textContent="ESCOLHA SEU PILOTO";const i=ne(t,"div","picker");Un.forEach((l,h)=>{const u=ne(i,"div","card");u.style.setProperty("--c",l.color),ne(u,"div","art",Mr("kart")),ne(u,"div","nm").textContent=l.name.toUpperCase();const d=ne(u,"div","bars"),f=[(l.stats.topSpeed-25.4)/3.8,(l.stats.accel-9.4)/5,(l.stats.handling-2.05)/1.25];for(const p of f)ne(ne(d,"div","bar"),"span").style.setProperty("--f",p.toFixed(3));u.addEventListener("click",()=>{e.index=0,this.#S(h),this.#p(e)}),u.addEventListener("pointerenter",()=>{e.index=0,this.#p(e)}),this.#t.push(u)});const s=ne(t,"div","menu"),o=this.#a(s,"LARGAR",{primary:!0}),a=this.#a(s,"OPÇÕES"),c=ne(t,"div","hint");c.innerHTML="<kbd>&larr;</kbd><kbd>&rarr;</kbd> escolher &nbsp;·&nbsp; <kbd>&uarr;</kbd><kbd>&darr;</kbd> navegar &nbsp;·&nbsp; <kbd>Enter</kbd> confirmar<br>W/&uarr; acelera &nbsp;·&nbsp; A/D dirige &nbsp;·&nbsp; Shift derrapa &nbsp;·&nbsp; Esc pausa",e.items=[{mark:l=>this.#t.forEach((h,u)=>wt(h,"sel",u===this.charIndex&&l!==!1)),left:()=>this.#S((this.charIndex+Un.length-1)%Un.length),right:()=>this.#S((this.charIndex+1)%Un.length),enter:()=>{e.index=1,this.#p(e)}},{node:o.node,enter:()=>this.#F()},{node:a.node,enter:()=>this.#x("options","menu")}],this.#M(e)}#E(){const e=this.#l("options",!0),t=e.body;ne(t,"h2",null).textContent="OPÇÕES";const n=ne(t,"div","menu"),i=this.#a(n,"QUALIDADE",{values:!0}),s=this.#a(n,"VOLUME",{values:!0}),o=this.#a(n,"SENSIBILIDADE",{values:!0}),a=this.#a(n,"VOLTAR");ne(t,"div","hint").innerHTML="<kbd>&larr;</kbd><kbd>&rarr;</kbd> ajustar &nbsp;·&nbsp; <kbd>Esc</kbd> voltar",this.optOut={q:i.out,vol:s.out,sen:o.out};const c=(l,h,u,d)=>{this.settings[l]=_r(this.settings[l]+h,u,d),this.#k()};e.items=[{node:i.node,left:()=>c("quality",-1,0,3),right:()=>c("quality",1,0,3),enter:()=>c("quality",1,0,3)},{node:s.node,left:()=>c("volume",-1,0,10),right:()=>c("volume",1,0,10)},{node:o.node,left:()=>c("sens",-1,1,10),right:()=>c("sens",1,1,10)},{node:a.node,enter:()=>this.#D()}],this.#M(e),this.#k()}#_(){const e=this.#l("pause",!0),t=e.body;ne(t,"h2",null).textContent="PAUSA";const n=ne(t,"div","menu"),i=this.#a(n,"CONTINUAR",{primary:!0}),s=this.#a(n,"OPÇÕES"),o=this.#a(n,"REINICIAR"),a=this.#a(n,"SAIR PARA O MENU");ne(t,"div","hint").innerHTML="<kbd>Esc</kbd> continuar",e.items=[{node:i.node,enter:()=>this.#g()},{node:s.node,enter:()=>this.#x("options","pause")},{node:o.node,enter:()=>this.#R()},{node:a.node,enter:()=>this.#R(!0)}],this.#M(e)}#L(){const e=this.#l("results",!1),t=e.body,n=ne(t,"h2",null);n.textContent="RESULTADO",this.parts.resultTitle=n,this.parts.podium=ne(t,"div","podium");const i=ne(t,"div","menu"),s=this.#a(i,"CORRER DE NOVO",{primary:!0}),o=this.#a(i,"MENU PRINCIPAL");ne(t,"div","hint").innerHTML="<kbd>Enter</kbd> confirmar",e.items=[{node:s.node,enter:()=>this.#R()},{node:o.node,enter:()=>this.#R(!0)}],this.#M(e)}#M(e){e.items.forEach((t,n)=>{t.node&&(t.node.addEventListener("click",i=>{const s=t.node.getBoundingClientRect();e.index=n,this.#p(e),t.left&&t.right?(i.clientX<s.left+s.width*.35?t.left:t.right)():t.enter?.()}),t.node.addEventListener("pointerenter",()=>{e.index=n,this.#p(e)}))})}#p(e){e.items.forEach((t,n)=>{const i=n===e.index;t.mark?t.mark(i):t.node&&wt(t.node,"sel",i)})}#b(e){const t=this.parts,n=ne(e,"div","touch"),i=t.stick=ne(n,"div","tstick");t.knob=ne(i,"div","knob"),ne(i,"div","tick").textContent="◀   ▶";const s=ne(n,"div","tbtns"),o=(v,g)=>{const m=ne(s,"div","tb "+v);return m.textContent=g,m};t.bBrake=o("brake","RÉ"),t.bItem=o("item","ITEM"),t.bDrift=o("drift","DRIFT"),t.bAccel=o("accel big","GÁS");const a=this.touch={steer:0,accel:0,brake:0,drift:!1,item:!1,active:!1},c=()=>{const v=this.ctx?.input?.touch;v&&Object.assign(v,a)};let l=null;const h=v=>{const g=i.getBoundingClientRect(),m=(v.clientX-(g.left+g.width/2))/(g.width*.42);a.steer=_r(m,-1,1)*(.55+this.settings.sens*.045),a.steer=_r(a.steer,-1,1),a.active=!0,Ec(t.knob,"--sx",a.steer.toFixed(3)),c()};this.#m(i,"pointerdown",v=>{l=v.pointerId,i.setPointerCapture(v.pointerId),h(v),v.preventDefault()}),this.#m(i,"pointermove",v=>{v.pointerId===l&&h(v)});const u=v=>{v.pointerId===l&&(l=null,a.steer=0,Ec(t.knob,"--sx","0"),c())};this.#m(i,"pointerup",u),this.#m(i,"pointercancel",u);const d=(v,g)=>{const m=x=>{v.setPointerCapture?.(x.pointerId),wt(v,"on",!0),g(!0),a.active=!0,c(),x.preventDefault()},M=()=>{wt(v,"on",!1),g(!1),c()};this.#m(v,"pointerdown",m),this.#m(v,"pointerup",M),this.#m(v,"pointercancel",M),this.#m(v,"pointerleave",M)};d(t.bAccel,v=>{a.accel=v?1:0}),d(t.bBrake,v=>{a.brake=v?1:0}),d(t.bDrift,v=>{a.drift=v}),d(t.bItem,v=>{a.item=v});const f=new URLSearchParams(typeof location<"u"?location.search:""),p=typeof matchMedia=="function"&&matchMedia("(pointer: coarse)").matches;this.touchOn=f.has("touch")?f.get("touch")!=="0":p,wt(e,"touch-on",this.touchOn)}#m(e,t,n){e.addEventListener(t,n,{passive:!1}),this.#u.push([e,t,n])}#A(){const e=this.ctx.events;this.offs=[e.on("race:countdown",t=>this.#C(t?.n??0)),e.on("race:start",()=>{Ki(this.parts.grid,"swoop")}),e.on("race:lap",t=>{if(!t?.kart?.isPlayer)return;t.final&&this.#v("final","VOLTA FINAL!","gold",2600,!0);const n=t.kart.bestLapMs;n&&t.lapMs<=n+.001&&t.kart.lapTimes.length>1&&(this.#v("rec","MELHOR VOLTA","good",2e3),Ki(this.parts.tBest.row,"record"))}),e.on("race:finish",t=>{t?.kart?.isPlayer&&this.#v("fin",`${t.place}${No()} LUGAR!`,t.place<=3?"good":"gold",3200)}),e.on("race:results",()=>this.#I()),e.on("kart:drift-tier",t=>{!t?.kart?.isPlayer||!t.tier||Ki(this.parts.mt,"pop")}),e.on("kart:respawn-start",t=>{t?.kart?.isPlayer&&this.#v("resp","RESGATE","danger",1600)}),e.on("item:pickup",t=>{t&&t.kart&&!t.kart.isPlayer||(this.#N={until:this.ctx.time.t+.85,id:this.#V(t?.item)})}),e.on("item:use",t=>{t&&t.kart&&!t.kart.isPlayer||(this.#N=null,this.#w("none"))}),e.on("kart:hit",t=>{t?.kart?.isPlayer&&this.#v("hit","ATINGIDO!","danger",1200)})]}#P(){this.#h=e=>{if(!this.#r)return;const t=this.#i[this.#r];if(!t)return;const n=t.items[t.index];let i=!0;switch(e.code){case"ArrowUp":case"KeyW":t.index=(t.index+t.items.length-1)%t.items.length,this.#p(t);break;case"ArrowDown":case"KeyS":t.index=(t.index+1)%t.items.length,this.#p(t);break;case"ArrowLeft":case"KeyA":n?.left?.();break;case"ArrowRight":case"KeyD":n?.right?.();break;case"Enter":case"Space":case"NumpadEnter":n?.enter?.();break;case"Escape":case"KeyP":this.#D();break;default:i=!1}i&&(e.preventDefault(),e.stopPropagation())},window.addEventListener("keydown",this.#h,{capture:!0})}#S(e,t){const n=this.ctx;this.charIndex=e;const i=Un[e],s=n.karts?.[0];if(s){const o=n.karts.find(a=>a!==s&&a.name===i.name);o&&(o.name=s.name,Object.assign(o.stats,Un.find(a=>a.name===s.name)?.stats??{})),s.name=i.name,Object.assign(s.stats,i.stats)}this.#t.forEach((o,a)=>wt(o,"sel",a===e)),t||this.#X()}#k(){const e=this.settings,t=this.ctx,n=Fo[e.quality];this.optOut&&(Ot(this.optOut.q,n.label),Ot(this.optOut.vol,e.volume===0?"MUDO":`${e.volume*10}%`),Ot(this.optOut.sen,`${e.sens}/10`)),t.quality!==n.id&&(t.quality=n.id,t.events.emit("quality:change",{quality:n.id}),t.game?.resize?.()),t.settings=t.settings??{},t.settings.volume=e.volume/10,t.settings.sensitivity=e.sens/10,t.events.emit("audio:volume",{volume:e.volume/10})}#F(){this.#g(),Ki(this.parts.grid,"swoop")}#R(e){const t=new URLSearchParams(location.search);t.set("char",String(this.charIndex)),t.set("quality",Fo[this.settings.quality].id),e?t.delete("nomenu"):t.set("nomenu","1"),location.search=t.toString()}#D(){this.#r==="options"?this.#x(this.optionsFrom??"menu"):this.#r==="pause"?this.#g():this.#r}#x(e,t){e==="options"&&(this.optionsFrom=t??this.optionsFrom??"menu");for(const i in this.#i)wt(this.#i[i].node,"open",i===e);this.#r=e;const n=this.#i[e];n&&(n.index=0,this.#p(n)),wt(this.root,"hide-hud",!0),this.ctx?.time&&(this.ctx.time.scale=0)}#g(){for(const e in this.#i)wt(this.#i[e].node,"open",!1);this.#r=null,wt(this.root,"hide-hud",!1),this.ctx?.time&&(this.ctx.time.scale=1)}#I(){const e=this.ctx,t=this.parts.podium;for(;t.firstChild;)t.removeChild(t.firstChild);const n=[];for(const a of e.race.results??[])n.push(a);const i=new Set(n.map(a=>a.id));for(const a of e.karts)i.has(a.id)||n.push({id:a.id,name:a.name,place:a.place??n.length+1,timeMs:0,bestLapMs:a.bestLapMs});n.sort((a,c)=>a.place-c.place);const s=["gold","silver","bronze"];n.forEach((a,c)=>{const l=e.karts.find(f=>f.id===a.id),h=["pr",s[c]??"",l?.isPlayer?"me":""].filter(Boolean).join(" "),u=ne(t,"div",h);u.style.setProperty("--i",String(c));const d=ne(u,"span","p"+(c<3?" medal":""));d.textContent=`${a.place}${No()}`,ne(u,"span","nm").textContent=a.name.toUpperCase(),ne(u,"span","t").textContent=a.timeMs?cd(a.timeMs):"—",ne(u,"span","bl").textContent=Ac(a.bestLapMs)});const o=n.find(a=>e.karts.find(c=>c.id===a.id)?.isPlayer);Ot(this.parts.resultTitle,o&&o.place<=3?"PÓDIO!":"RESULTADO"),this.#x("results")}#C(e){const t=this.parts,n=e>0?String(e):"GO!";Ot(t.countS,n),Ot(t.countF,n),wt(t.count,"go",e===0),Ki(t.count,"beat")}#v(e,t,n="gold",i=2200,s=!1){let o=this.#o.get(e);if(!o){const a=ne(this.parts.warns,"div","warn "+n);o={node:a,span:ne(a,"span"),kind:n},this.#o.set(e,o)}o.kind!==n&&(o.node.classList.remove(o.kind),o.node.classList.add(n),o.kind=n),Ot(o.span,t),wt(o.node,"blink",s),o.node.classList.remove("out"),o.closing=!1,o.until=i>0?this.ctx.time.t+i/1e3:1/0,Ki(o.node,"warn")}#O(e){const t=this.#o.get(e);t&&t.until===1/0&&(t.until=this.ctx.time.t)}#U(e){for(const[t,n]of this.#o)e<n.until||(n.closing?e>=n.closeAt&&(n.node.remove(),this.#o.delete(t)):(n.closing=!0,n.closeAt=e+.32,n.node.classList.add("out")))}#B(){const e=this.ctx.world;if(!e?.sampleSpline)return;const t=320,n=new Float32Array(t*2),i=new Float32Array(t*2),s=new Float32Array(t*2);let o=1/0,a=-1/0,c=1/0,l=-1/0;for(let h=0;h<t;h++){const u=e.sampleSpline(h/t),d=(u.width??12)*.5+1.2,f=u.pos.x-u.right.x*d,p=u.pos.z-u.right.z*d,v=u.pos.x+u.right.x*d,g=u.pos.z+u.right.z*d;n[h*2]=f,n[h*2+1]=p,i[h*2]=v,i[h*2+1]=g,s[h*2]=u.pos.x,s[h*2+1]=u.pos.z,o=Math.min(o,f,v),a=Math.max(a,f,v),c=Math.min(c,p,g),l=Math.max(l,p,g)}this.#n={N:t,L:n,R:i,C:s,minX:o,maxX:a,minZ:c,maxZ:l,bg:null,w:0,h:0,sc:1,ox:0,oy:0},this.#z()}#z(){const e=this.#n,t=this.parts.mapCanvas;if(!e||!t)return;const n=this.parts.mapBox.getBoundingClientRect(),i=Math.min(this.ctx.viewport?.dpr||1,2),s=Math.max(64,Math.round((n.width||160)*i));if(s===e.w&&e.bg)return;t.width=t.height=e.w=e.h=s;const o=s*.11,a=e.maxX-e.minX,c=e.maxZ-e.minZ,l=Math.min((s-o*2)/a,(s-o*2)/c);e.sc=l,e.ox=(s-a*l)*.5-e.minX*l,e.oy=(s-c*l)*.5-e.minZ*l;const h=document.createElement("canvas");h.width=h.height=s;const u=h.getContext("2d"),d=M=>M*l+e.ox,f=M=>M*l+e.oy;u.beginPath();for(let M=0;M<e.N;M++){const x=d(e.L[M*2]),y=f(e.L[M*2+1]);M?u.lineTo(x,y):u.moveTo(x,y)}for(let M=e.N-1;M>=0;M--)u.lineTo(d(e.R[M*2]),f(e.R[M*2+1]));u.closePath(),u.fillStyle="rgba(232, 248, 236, .19)",u.fill(),u.strokeStyle="rgba(255, 255, 255, .38)",u.lineWidth=Math.max(1,s*.006),u.stroke(),u.beginPath();for(let M=0;M<e.N;M++){const x=d(e.C[M*2]),y=f(e.C[M*2+1]);M?u.lineTo(x,y):u.moveTo(x,y)}u.closePath(),u.setLineDash([s*.022,s*.026]),u.strokeStyle="rgba(255, 198, 26, .5)",u.lineWidth=Math.max(1,s*.008),u.stroke(),u.setLineDash([]);const p=d(e.C[0]),v=f(e.C[1]),g=d(e.L[0])-p,m=f(e.L[1])-v;u.beginPath(),u.moveTo(p-g,v-m),u.lineTo(p+g,v+m),u.strokeStyle="#ffffff",u.lineWidth=Math.max(2,s*.018),u.stroke(),e.bg=h}#H(e){const t=this.#n,n=this.parts.mapCanvas;if(!t?.bg||!n)return;const i=n.getContext("2d"),s=t.w;i.clearRect(0,0,s,s),i.drawImage(t.bg,0,0);const o=Math.max(2.4,s*.031);for(const a of e.karts){const c=a.position.x*t.sc+t.ox,l=a.position.z*t.sc+t.oy,h=a.isPlayer;i.beginPath(),i.arc(c,l,h?o*1.32:o,0,Math.PI*2),i.fillStyle=h?"#ffffff":Un[a.liveryIndex%Un.length]?.color??"#9aa",i.globalAlpha=a.finished?.4:1,i.fill(),i.lineWidth=Math.max(1,s*.008),i.strokeStyle=h?"#08120c":"rgba(6,14,9,.75)",i.stroke(),h&&(i.beginPath(),i.arc(c,l,o*.6,0,Math.PI*2),i.fillStyle="#24d15c",i.fill()),i.globalAlpha=1}}#V(e){if(!e)return"none";const t=typeof e=="string"?e:e.id??e.name??e.type;return Oo.includes(t)?t:"none"}#w(e,t){const n=this.parts;if(this.curItem!==e){for(const i of Oo)wt(n.glyphs[i],"on",i===e);this.curItem=e,wt(n.item,"has",e!=="none"),Ot(n.itemLabel,OM[e]??""),t&&Ki(n.item,"landed")}}#y(e){const t=this.parts,n=e.player,i=this.#V(n?.item);if(this.#N){const s=e.time.t;if(s<this.#N.until){wt(t.item,"spin",!0);const a=Math.floor(s*15)%wl.length,c=wl[a];for(const l of Oo)wt(t.glyphs[l],"on",l===c);this.curItem=c,wt(t.item,"has",!1);return}const o=this.#N.id!=="none"?this.#N.id:i;this.#N=null,wt(t.item,"spin",!1),this.curItem=null,this.#w(o,!0);return}wt(t.item,"spin",!1),this.#w(i)}lateUpdate(e,t){this.#G(t,!1)}#G(e,t){const n=this.parts,i=e.race,s=e.player;if(this.#f++,e.input?.state?.pressed?.pause&&(!this.#r&&i.state!=="results"?this.#x("pause"):this.#r==="pause"?this.#g():this.#r==="options"&&this.#D()),!s)return;const o=i.playerPlace||s.place||1,a=i.fieldSize||e.karts.length||8;o!==this.lastPlace&&(Ot(n.placeNumF,o)&&Ot(n.placeNumS,o),!t&&this.lastPlace!=null&&(n.place.classList.remove("up","down"),n.place.offsetWidth,n.place.classList.add(o<this.lastPlace?"up":"down")),this.lastPlace=o),Ot(n.placeOf,"/"+a);const c=Math.min(s.lap??1,i.totalLaps);Ot(n.lapCur,c),Ot(n.lapTot,i.totalLaps);const l=c>=i.totalLaps&&i.state!=="results";wt(n.lap,"final",l);const h=i.timeMs??0;Ot(n.tTotal.v,cd(h));const u=i.state==="countdown"?0:Math.max(0,h-(s.lapStartMs??0));Ot(n.tLap.v,Ac(u)),Ot(n.tBest.v,Ac(s.bestLapMs));const d=Math.round((s.speed??0)*3.6);Ot(n.kmh,d);const f=(s.stats?.topSpeed??27)*1.55;Ec(n.speedo,"--v",_r((s.speed??0)/f,0,1).toFixed(3)),wt(n.speedo,"boosting",(s.boost?.timer??0)>0);const p=s.drift?.active?s.drift.tier??0:0;p!==this.lastTier&&(n.mt.classList.remove("t1","t2","t3"),p>0&&n.mt.classList.add("t"+Math.min(3,p)),this.lastTier=p),this.#y(e),this.#q(e),this.#W(e,s,i),this.#U(e.time.t);const v=e.quality==="low"?3:1;(t||this.#f%v===0)&&this.#H(e)}#W(e,t,n){if(n.state!=="racing"&&n.state!=="finishing"){this.#O("wrong");return}const i=t.quaternion,s=2*(i.x*i.z+i.w*i.y),o=1-2*(i.x*i.x+i.y*i.y),a=e.world?.project?.(t.position);let c=!1;a?.forward&&(t.speed??0)>4&&!t.respawn?.active&&(c=s*a.forward.x+o*a.forward.z<-.3),c&&!this.#o.has("wrong")?this.#v("wrong","NA CONTRAMÃO!","danger",0,!0):c||this.#O("wrong")}#X(){this.boardOrder=null}#q(e){const t=this.parts.board,n=this.sortBuf=this.sortBuf??[];n.length=0;for(const s of e.karts)n.push(s);n.sort((s,o)=>(s.place||99)-(o.place||99));let i=!this.boardOrder;if(!i){for(let s=0;s<n.length;s++)if(this.boardOrder[s]!==n[s].id){i=!0;break}}if(i){const s=this.#e.slice(0,n.length).map(c=>c.node),o=s.map(c=>c.offsetTop);n.forEach((c,l)=>t.appendChild(this.#e[l].node));const a=s.map(c=>c.offsetTop);s.forEach((c,l)=>{const h=o[l]-a[l];h&&(c.style.transition="none",c.style.transform=`translateY(${h}px)`)}),t.offsetWidth,s.forEach(c=>{c.style.transition="",c.style.transform=""}),this.boardOrder=n.map(c=>c.id)}n.forEach((s,o)=>{const a=this.#e[o];if(!a)return;Ot(a.p,s.place||o+1),Ot(a.nm,s.name),wt(a.node,"me",!!s.isPlayer),wt(a.node,"done",!!s.finished);const c=Un[s.liveryIndex%Un.length]?.color??"#9aa";a.id!==s.id&&(a.dot.style.background=c,a.id=s.id)})}resize(e,t,n){wt(this.root,"portrait",t>e),this.#z(),this.#H(n)}dispose(){for(const e of this.offs??[])e?.();this.#h&&window.removeEventListener("keydown",this.#h,{capture:!0});for(const[e,t,n]of this.#u)e.removeEventListener(t,n);this.#u.length=0,this.root?.remove(),this.styleTag?.remove(),this.ctx&&(this.ctx.hud=null,this.ctx.time.scale=1)}#N=null}class qM{name="audio";order=80;async init(e){this.ctx=e}update(e,t){}dispose(){}}const Dr=new URLSearchParams(location.search),ff=document.getElementById("boot"),hd=document.getElementById("boot-bar"),ud=document.getElementById("boot-msg"),pf=(r,e)=>{hd&&(hd.style.width=`${Math.round(r*100)}%`),ud&&e&&(ud.textContent=e)},kt=new _1(document.getElementById("gl"),{seed:Number(Dr.get("seed")??1337),quality:Dr.get("quality")??"high",maxDpr:Number(Dr.get("dpr")??2)});kt.ctx.debug.enabled=Dr.has("debug");kt.ctx.onProgress=pf;kt.add(new $1);kt.add(new Iy);kt.add(new X_);kt.add(new eM);kt.add(new tM);kt.add(new hM);kt.add(new NM);kt.add(new DM);kt.add(new IM);kt.add(new XM);kt.add(new qM);await kt.init();pf(1,"pronto");ff?.classList.add("done");setTimeout(()=>ff?.remove(),600);window.__RK={game:kt,ctx:kt.ctx,ready:!0,simulate:r=>kt.simulate(r),renderOnce:()=>kt.renderOnce(),pose:(r,e)=>kt.get("camera")?.pose(r,e)};Dr.has("static")||kt.start();
//# sourceMappingURL=index-BJi03Qej.js.map
