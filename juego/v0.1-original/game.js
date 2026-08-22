
const missions = [
 {key:"pagina",icon:"📄",label:"Página",title:"Un archivo no es todavía un sitio",
 story:"Luna diseñó la portada de su emprendimiento y guardó index.html en su notebook. Esa portada, vista en el navegador, es…",
 visual:"📁 proyecto /  📄 index.html",
 opts:["un dominio","una página web","un hosting","un servidor"],ans:1,
 good:"Exacto. Una página web es un documento individual que puede verse en un navegador.",
 bad:"Pensá en una sola pantalla/documento HTML, no en todo el conjunto."},
 {key:"sitio",icon:"🗂️",label:"Sitio",title:"El proyecto creció",
 story:"Ahora Luna tiene Inicio, Productos, Nosotros y Contacto. ¿Cómo llamamos al conjunto de todas esas páginas relacionadas?",
 visual:"📄 Inicio   📄 Productos   📄 Nosotros   📄 Contacto",
 opts:["sitio web","URL","landing page","dominio"],ans:0,
 good:"¡Bien! Varias páginas relacionadas forman un sitio web.",
 bad:"No buscamos una dirección ni una página especial: buscamos el conjunto completo."},
 {key:"hosting",icon:"☁️",label:"Hosting",title:"Nadie puede verla",
 story:"Luna le manda a una amiga la ruta C:\\Usuarios\\Luna\\Desktop\\index.html. En el celular de su amiga no funciona. ¿Qué necesita hacer?",
 visual:"💻 Luna  ─── ? ───  📱 amiga",
 opts:["cambiar el color del sitio","subir los archivos a un hosting","comprar otro celular","convertir HTML en PDF"],ans:1,
 good:"Correcto. El hosting permite alojar los archivos para que estén disponibles en Internet.",
 bad:"El problema es que los archivos siguen viviendo solamente en la computadora de Luna."},
 {key:"servidor",icon:"🖥️",label:"Servidor",title:"¿Dónde viven los archivos?",
 story:"El servicio de hosting guarda el sitio en una computadora preparada para responder solicitudes de Internet. Esa computadora cumple el rol de…",
 visual:"📱 visitante  →  🌐 Internet  →  🖥️ ______  →  📄 archivos",
 opts:["navegador","servidor","dominio","landing page"],ans:1,
 good:"Exacto: el servidor entrega los archivos cuando alguien solicita el sitio.",
 bad:"Buscamos la máquina/sistema que responde y entrega los archivos del sitio."},
 {key:"dominio",icon:"🌐",label:"Dominio",title:"Una dirección fácil de recordar",
 story:"El sitio ya está alojado, pero Luna quiere que sus clientes recuerden algo como lunacrea.com. ¿Qué necesita?",
 visual:"?  →  lunacrea.com",
 opts:["una nueva página","un dominio","otro hosting","una imagen JPG"],ans:1,
 good:"Sí. El dominio es el nombre que usamos para identificar y encontrar un sitio con facilidad.",
 bad:"Buscamos el nombre legible que las personas pueden recordar."},
 {key:"url",icon:"🔗",label:"URL",title:"Llegar al lugar exacto",
 story:"Un cliente quiere compartir directamente la página de productos: https://lunacrea.com/productos.html. Esa dirección completa es…",
 visual:"https://lunacrea.com/productos.html",
 opts:["un servidor","una URL","un sitio web","un archivo local"],ans:1,
 good:"¡Exacto! La URL indica la ubicación concreta de un recurso en la web.",
 bad:"Fijate que aparece una dirección completa que lleva a un recurso específico."},
 {key:"landing",icon:"🎯",label:"Landing",title:"La campaña",
 story:"Luna lanza un curso por Instagram. Quiere una página centrada en una sola acción: que la gente se inscriba. ¿Qué conviene crear?",
 visual:"📣 ANUNCIO → ? → [ INSCRIBIRME ]",
 opts:["una landing page","otro dominio obligatorio","un servidor nuevo","cuatro sitios diferentes"],ans:0,
 good:"Perfecto. Una landing page está diseñada alrededor de un objetivo o conversión concreta.",
 bad:"Buscamos una página enfocada en una acción muy específica."}
];

let i=0, score=0, answered=false;
const $=id=>document.getElementById(id);
function map(){
 $("map").innerHTML=missions.map((m,n)=>`<div class="node ${n<i?'done':n===i?'active':''}"><div class="dot">${n<i?'✓':m.icon}</div><span>${m.label}</span></div>`).join("");
}
function render(){
 answered=false; map();
 const m=missions[i];
 $("sceneIcon").textContent=m.icon;$("step").textContent=`Misión ${i+1} de ${missions.length}`;
 $("title").textContent=m.title;$("story").textContent=m.story;$("visual").textContent=m.visual;
 $("feedback").textContent="";$("feedback").className="feedback";$("next").classList.add("hidden");
 $("options").innerHTML=m.opts.map((o,n)=>`<button class="option" data-n="${n}">${o}</button>`).join("");
 document.querySelectorAll(".option").forEach(b=>b.onclick=()=>choose(+b.dataset.n));
}
function choose(n){
 if(answered)return; answered=true; const m=missions[i], buttons=[...document.querySelectorAll(".option")];
 buttons.forEach(b=>b.disabled=true);
 if(n===m.ans){score++; $("score").textContent=score;buttons[n].classList.add("correct");$("feedback").textContent="✓ "+m.good;$("feedback").classList.add("ok")}
 else{buttons[n].classList.add("wrong");buttons[m.ans].classList.add("correct");$("feedback").textContent="↻ "+m.bad;$("feedback").classList.add("no")}
 $("next").classList.remove("hidden");
}
$("next").onclick=()=>{i++; if(i<missions.length)render(); else finish()};
function finish(){
 $("map").innerHTML=missions.map(m=>`<div class="node done"><div class="dot">✓</div><span>${m.label}</span></div>`).join("");
 document.querySelector(".game-card").innerHTML=`<div class="final" style="grid-column:1/-1">
 <div class="big">🚀</div><h2>¡El sitio está online!</h2>
 <p>Conseguiste <strong>${score}/${missions.length}</strong> estrellas. Lo importante es que ahora podés reconstruir el recorrido.</p>
 <div class="diagram"><span class="pill">👤 visitante</span><span class="arrow">→</span><span class="pill">🔗 URL / 🌐 dominio</span><span class="arrow">→</span><span class="pill">☁️ hosting</span><span class="arrow">→</span><span class="pill">🖥️ servidor</span><span class="arrow">→</span><span class="pill">🗂️ sitio</span><span class="arrow">→</span><span class="pill">📄 página</span></div>
 <p><strong>Desafío final:</strong> explicale a otra persona qué ocurre desde que escribe una dirección hasta que ve una página.</p>
 <button class="next" onclick="location.reload()">Jugar otra vez ↻</button></div>`;
}
render();
