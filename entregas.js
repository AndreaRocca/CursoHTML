/* Un informe independiente por módulo; preparación no equivale a entrega. */
(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const names=['','Comunicar y comprender la web','Propósito y destinatarios','Mi primera página HTML','Mejoramos nuestra página','HTML con sentido'];
  if(!state.moduleDeliveries||typeof state.moduleDeliveries!=='object'||Array.isArray(state.moduleDeliveries))state.moduleDeliveries={};
  const registry=state.moduleDeliveries;
  const originalGo=go,originalPersist=persist;
  function snapshot(n){
    if(n===1)return JSON.stringify([state.studentName,state.projectIdea,state.siteDecision,state.reflection,state.gameResult,state.problemDone,state.quizOneDone,state.quizTwoDone]);
    if(n===2)return JSON.stringify([state.studentName,state.moduleTwoProject,state.moduleTwoMeta,state.moduleTwoComparisonScore,state.moduleTwoQuizScore]);
    const w=n===3?state.moduleThree:n===4?state.moduleFour:state.moduleFive;
    return JSON.stringify(w?[w.fields,w.code,w.repairCode,w.repairAttempts,w.repairSolved,w.repairSolutions,w.attempts,w.hints]:null);
  }
  function record(n){const r=registry[n];return r&&typeof r==='object'&&!Array.isArray(r)?r:{};}
  function current(n){const r=record(n);return !!r.preparedAt&&r.snapshot===snapshot(n);}
  function status(n){const r=record(n);if(r.pdfElsewhereAt&&r.pdfElsewhereSnapshot===snapshot(n))return 'Ya tenés el PDF guardado en otra computadora.';if(r.pdfElsewhereAt)return 'Cambiaste respuestas locales: revisá si necesitás entregar un PDF actualizado.';if(r.preparedAt&&!current(n))return 'Cambiaste respuestas: prepará un PDF actualizado.';if(r.savedAt&&current(n))return 'Declaraste que guardaste el PDF de este módulo.';if(current(n))return 'Informe abierto: falta confirmar que guardaste el PDF.';return 'Esta notebook no permite saber si ya guardaste o entregaste el PDF. Revisalo en Classroom.';}
  function el(tag,text,parent){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(parent)parent.append(e);return e;}
  function button(text,fn,parent){const b=el('button',text,parent);b.type='button';b.className='btn ghost';b.onclick=fn;return b;}
  function save(){try{persist();}catch{$('deliveryStorage').textContent='No pudimos guardar este control. Conservá los PDF antes de salir.';}}
  let openingPDF=false;
  function open(n){openingPDF=true;try{if(n<3){deliveryMode=n===1?'class1':'module2';openDelivery(deliveryMode);}else originalGo(n===3?'module3Close':n===4?'module4Close':'module5Close');}finally{openingPDF=false;}refresh();}
  function card(n,parent,common=false){
    const box=el('article',undefined,parent);box.className='card delivery-card';if(common)box.dataset.commonDelivery=String(n);
    el('h3','Entrega del Módulo '+n+' · '+names[n],box);
    const summary=el('p',status(n),box);summary.dataset.deliveryStatus=String(n);summary.setAttribute('role','status');
    el('p','Guardá CursoHTML_Modulo'+n+'_TuNombre.pdf y adjuntalo en la tarea del módulo '+n+' de Classroom. Este PDF no reemplaza los de otros módulos.',box);
    const actions=el('div',undefined,box);actions.className='actions';button('Ir al PDF del módulo '+n,()=>open(n),actions);
    const confirm=button('Ya guardé este PDF',()=>{registry[n]={...record(n),savedAt:new Date().toISOString(),pdfElsewhereAt:null};save();refresh();},actions);confirm.dataset.deliveryConfirm=String(n);
    const elsewhere=el('details',undefined,box);el('summary','Ya guardé el PDF en otra computadora',elsewhere);el('p','Confirmá que conservás el PDF de este módulo. No hace falta repetirlo en esta computadora. La entrega en Classroom la revisa la docente.',elsewhere);
    button('Ya tengo guardado el PDF del módulo '+n,()=>{registry[n]={...record(n),pdfElsewhereAt:new Date().toISOString(),pdfElsewhereSnapshot:snapshot(n)};save();refresh();},elsewhere);
    button('Borrar este recordatorio local',()=>{delete registry[n];save();refresh();},elsewhere);
  }
  const hub=$('deliveries');el('h2','Mis entregas por módulo',hub);el('p','Un módulo = un PDF. Cada clase genera un archivo independiente, aunque trabajes desde notebooks diferentes.',hub);el('p','Este control solo recuerda guardar un PDF por módulo. Abrir el informe no guarda el archivo. La entrega en Classroom la revisa la docente.',hub);const storage=el('p','',hub);storage.id='deliveryStorage';storage.setAttribute('role','status');[1,2,3,4,5].forEach(n=>card(n,hub));
  const note=el('article',undefined,$('home'));note.className='card delivery-card';el('h3','Cada módulo tiene su entrega',note);el('p','Los módulos 1 a 5 tienen un PDF propio. Podés comenzar una clase en otra notebook: recuperá el HTML si está disponible o usá la plantilla del módulo.',note);button('Recordatorio de los PDF por módulo',()=>originalGo('deliveries'),note);
  card(1,$('delivery'),true);card(2,$('delivery'),true);card(2,$('module2Close'));card(3,$('module3Close'));card(4,$('module4Close'));card(5,$('module5Close'));
  const dialog=el('dialog',undefined,document.body);dialog.id='deliveryGuard';el('h2','Antes de cambiar de módulo',dialog);const message=el('p','',dialog);const actions=el('div',undefined,dialog);actions.className='actions';let target='',leaving=0;
  button('Revisar el cierre y PDF',()=>{dialog.close();open(leaving);},actions);
  button('Sí, continuar',()=>{dialog.close();originalGo(target);refresh();},actions);
  button('Continuar; lo revisaré en Classroom',()=>{dialog.close();originalGo(target);refresh();},actions);
  button('Volver a mi módulo',()=>dialog.close(),actions);
  function moduleFor(screen){if(['m0','m1','m1b','soon'].includes(screen))return 1;if(screen==='delivery')return deliveryMode==='module2'?2:1;const m=/^module([2345])/.exec(screen||'');return m?Number(m[1]):0;}
  go=function(id){const from=moduleFor(document.querySelector('.screen.active')?.id),to=moduleFor(id);if(!openingPDF&&id!=='delivery'&&to>1&&to>from){leaving=to-1;target=id;message.textContent='¿Ya entregaste el PDF del módulo '+leaving+' en Classroom? Podés haberlo hecho desde otra notebook: no necesitás repetirlo acá. Recordá que cada módulo tiene su propio PDF. La entrega la revisa la docente.';if(!dialog.open)dialog.showModal();return;}originalGo(id);refresh();};
  function refresh(){
    document.querySelectorAll('[data-common-delivery]').forEach(e=>e.hidden=Number(e.dataset.commonDelivery)!==(deliveryMode==='module2'?2:1));
    document.querySelectorAll('[data-delivery-status]').forEach(e=>e.textContent=status(Number(e.dataset.deliveryStatus)));
    document.querySelectorAll('[data-delivery-confirm]').forEach(e=>e.disabled=!current(Number(e.dataset.deliveryConfirm)));
  }
  window.courseDelivery={prepared(n){registry[n]={preparedAt:new Date().toISOString(),snapshot:snapshot(n)};save();refresh();},refresh};
  persist=function(){originalPersist();refresh();};
  ['projectIdea','siteDecision','studentName',...Array.from({length:5},(_,i)=>'reflection'+(i+1)),...moduleTwoProjectFields,...moduleTwoMetaFields].forEach(id=>{const input=$(id);input.addEventListener(input.tagName==='SELECT'?'change':'input',()=>{if(id==='projectIdea'||id==='siteDecision'||id==='studentName')state[id]=input.value;else if(id.startsWith('reflection'))collectReflection();else if(moduleTwoProjectFields.includes(id))collectModuleTwoProject();else collectModuleTwoMeta();save();});});
  window.addEventListener('DOMContentLoaded',refresh);refresh();
})();
