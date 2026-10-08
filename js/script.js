const $=id=>document.getElementById(id),OPEN=480,CLOSE=1320;
const P={potato:["🥔","Potato","آلو",["Curry","Fry"]],onion:["🧅","Onion","پیاز",["Curry","Salad","Fry"]],tomato:["🍅","Tomato","ٹماٹر",["Curry","Salad","Soup"]],cauli:["🥦","Cauliflower","پھول گوبھی",["Curry","Fry"]],okra:["🌿","Okra","بھنڈی",["Curry","Fry"]],spinach:["🥬","Spinach","پالک",["Curry","Soup"]],cucumber:["🥒","Cucumber","کھیرا",["Salad"]],carrot:["🥕","Carrot","گاجر",["Salad","Soup"]],chilli:["🌶️","Green chilli","ہری مرچ",["Curry","Salad"]],lemon:["🍋","Lemon","لیموں",["Salad"]],coriander:["🌱","Coriander","دھنیا",["Curry","Salad","Soup"]],garlic:["🧄","Garlic","لہسن",["Curry","Soup","Fry"]],peas:["🫛","Peas","مٹر",["Curry"]],capsicum:["🫑","Capsicum","شملہ مرچ",["Fry","Salad"]]};
const D=[["Aloo gobi",["potato","cauli","tomato","onion","chilli","coriander"]],["Bhindi masala",["okra","onion","tomato","chilli","garlic"]],["Palak curry",["spinach","onion","tomato","garlic","chilli"]],["Kachumber salad",["cucumber","tomato","onion","lemon","coriander","chilli"]],["Carrot & pea pulao veg",["carrot","peas","onion","garlic","coriander"]]];
let di=0,flt="All";
function plan(i){di=i;$("dishes").innerHTML=D.map((d,j)=>`<button class="${j===i?"on":""}">${d[0]}</button>`).join("");$("dishes").querySelectorAll("button").forEach((b,j)=>b.onclick=()=>plan(j));
const it=D[i][1];$("plan").style.animation="none";$("plan").offsetWidth;$("plan").style.animation="";
$("plan").innerHTML=`<h3>${D[i][0]}: ${it.length} stops</h3><div class="chips">${it.map((k,n)=>`<span class="chip" style="animation-delay:${n*80}ms"><span>${P[k][0]}</span>${P[k][1]}</span>`).join("")}</div><button class="btn" id="cp">Copy shopping list</button>`;
$("cp").onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(D[i][0]+" shopping list:\n"+it.map(k=>"- "+P[k][1]).join("\n"));$("cp").textContent="Copied ✓";setTimeout(()=>$("cp").textContent="Copy shopping list",1500)}}
const F=["All","Curry","Fry","Salad","Soup"];
function crates(){$("fl").innerHTML=F.map(f=>`<button class="${f===flt?"on":""}">${f}</button>`).join("");$("fl").querySelectorAll("button").forEach((b,j)=>b.onclick=()=>{flt=F[j];crates()});
$("cr").innerHTML=Object.values(P).filter(p=>flt==="All"||p[3].includes(flt)).map((p,i)=>`<div class="cr" style="animation-delay:${i*40}ms"><span class="e">${p[0]}</span><b>${p[1]}</b><small>${p[2]}</small><em>${p[3].join(" · ")}</em></div>`).join("")}
const f=m=>{const h=Math.floor(m/60);return((h%12)||12)+":"+String(m%60).padStart(2,"0")+" "+(h<12?"AM":"PM")};
function tick(){const n=new Date(),p=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Karachi",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(n),m=(+p.find(x=>x.type==="hour").value%24)*60+ +p.find(x=>x.type==="minute").value,on=m>=OPEN&&m<CLOSE;
$("rs").classList.toggle("off",!on);$("rs").textContent=on?"** OPEN NOW ** until "+f(CLOSE):"** CLOSED ** opens "+f(OPEN);
$("rd").textContent="DATE ......... "+new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Karachi",day:"2-digit",month:"short",year:"numeric"}).format(n).toUpperCase()}
document.querySelectorAll("[data-n]").forEach(el=>{const t=+el.dataset.n;let c=0;const s=Math.ceil(t/40);const id=setInterval(()=>{c=Math.min(c+s,t);el.textContent=c.toLocaleString("en-US").replace(/,/g,t>5000?",":"");if(c>=t)clearInterval(id)},35)});
plan(0);crates();tick();setInterval(tick,30000);
