import{readFileSync as f,writeFileSync as w,mkdirSync as m,readdirSync as d}from"node:fs";
let I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output",u=new Uint8Array(65536),L=0;
function r(p,q){let D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),s=0,c=0,x=0,t=0,i=0;L=0;
for(;;){if(t==1e6)return 10;if(x<0||x>=p.length)return 9;let o=p[x];
if(o>7&&!(o>15&&o<35&&o!=31)&&!(o>47&&o<53)&&o!=64&&o!=65&&!(o>79&&o<84))return 5;
let g=o==1?1:o==2?4:o>47&&o<52?2:0;if(x+g>=p.length)return 9;t++;let y=x+1+g;x=y;
if(!o)return 0;
if(o==1){if(s>255)return 3;D[s++]=(p[y-1]<<24)>>24;continue}
if(o==2){if(s>255)return 3;D[s++]=p[y-4]|p[y-3]<<8|p[y-2]<<16|p[y-1]<<24;continue}
if(o==3){if(!s)return 2;s--;continue}
if(o==4){if(!s)return 2;if(s>255)return 3;D[s]=D[s-1];s++;continue}
if(o==5){if(s<2)return 2;let v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;continue}
if(o==6){if(s<2)return 2;if(s>255)return 3;D[s]=D[s-2];s++;continue}
if(o==7){if(s<3)return 2;let a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;continue}
if(o==23){if(!s)return 2;D[s-1]=-D[s-1]|0;continue}
if(o==27){if(!s)return 2;D[s-1]=~D[s-1];continue}
if(o>15&&o<35){if(s<2)return 2;let b=D[s-1],a=D[s-2],v=0;
if(o==16)v=a+b|0;else if(o==17)v=a-b|0;else if(o==18)v=Math.imul(a,b);
else if(o==19){if(!b)return 4;v=a==-2147483648&&b==-1?a:(a/b)|0}
else if(o==20){if(!b)return 4;v=b==-1?0:a%b|0}
else if(o==21){if(!b)return 4;v=Math.floor((a>>>0)/(b>>>0))|0}
else if(o==22){if(!b)return 4;v=(a>>>0)%(b>>>0)|0}
else if(o==24)v=a&b;else if(o==25)v=a|b;else if(o==26)v=a^b;
else if(o==28)v=a<<(b&31);else if(o==29)v=a>>(b&31);else if(o==30)v=(a>>>(b&31))|0;
else if(o==32)v=a==b?1:0;else if(o==33)v=a<b?1:0;else v=(a>>>0)<(b>>>0)?1:0;
s-=2;D[s++]=v;continue}
if(o>47&&o<51){let k=((p[y-2]|p[y-1]<<8)<<16)>>16,v=1;if(o>48){if(!s)return 2;v=D[--s];v=o==49?v==0:v!=0}if(v)x=y+k;continue}
if(o==51){if(c==64)return 7;C[c++]=y;x=p[y-2]|p[y-1]<<8;continue}
if(o==52){if(!c)return 8;x=C[--c];continue}
if(o==64){if(!s)return 2;let a=D[s-1];if(a<0||a>255)return 6;D[s-1]=M[a];continue}
if(o==65){if(s<2)return 2;let a=D[s-1],v=D[s-2];if(a<0||a>255)return 6;s-=2;M[a]=v;continue}
if(o==80){if(!s)return 2;let z=String(D[s-1]);if(L+z.length>65536)return 11;s--;for(let j=0;j<z.length;j++)u[L++]=z.charCodeAt(j);continue}
if(o==81){if(!s)return 2;if(L>65535)return 11;u[L++]=D[--s]&255;continue}
if(o==82){if(s>255)return 3;D[s++]=i<q.length?q[i++]:-1;continue}
if(!s)return 2;return D[--s]&255}}
for(let e of d(I).sort()){let c=r(new Uint8Array(f(I+"/"+e+"/program.bin")),new Uint8Array(f(I+"/"+e+"/input.bin")));m(O+"/"+e,{recursive:!0});w(O+"/"+e+"/stdout.bin",u.slice(0,L));w(O+"/"+e+"/exit.txt",c+"\n")}
