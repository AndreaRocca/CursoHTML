/* Curso de Andrea Rocca · CC BY-NC-SA 4.0.
   Estado de una sola clase; no se necesitan respuestas de otra computadora.
   El HTML del estudiante se ejecuta únicamente en iframes aislados sin scripts. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const starter = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi primera propuesta</title>
</head>
<body>
  <h1>Nombre de mi proyecto</h1>
  <p>Contá qué ofrecés y a quién está dirigido.</p>
  <h2>Qué vas a encontrar</h2>
  <ul>
    <li>Primera propuesta</li>
    <li>Segunda propuesta</li>
    <li>Tercera propuesta</li>
  </ul>
  <h2>Participá</h2>
  <p>Explicá por qué vale la pena sumarse.</p>
  <a href="https://andrearocca.github.io/CursoHTML/" target="_blank" rel="noopener noreferrer">Conocer el curso</a>
</body>
</html>`;
  const demoText = 'Taller Verde\nAprendé a cuidar plantas en espacios pequeños.\nQué hacemos\nSembramos\nCompartimos semillas\nConocer el curso';
  const demoHTML = '<h1>Taller Verde</h1>\n<p>Aprendé a cuidar plantas en espacios pequeños.</p>\n<h2>Qué hacemos</h2>\n<ul>\n  <li>Sembramos</li>\n  <li>Compartimos semillas</li>\n</ul>\n<a href="https://andrearocca.github.io/CursoHTML/">Conocer el curso</a>';
  const repairs = [
    {title:'Misión 1 · El enlace no lleva a ningún lado',
      goal:'Martina quiere enlazar al curso. Repará el atributo que indica el destino. Conservá el texto del enlace.',
      code:'<a destino="https://andrearocca.github.io/CursoHTML/">Conocer el curso</a>',
      hint:'La dirección de un enlace se escribe en href, entre comillas.',
      solution:'<a href="https://andrearocca.github.io/CursoHTML/">Conocer el curso</a>'},
    {title:'Misión 2 · Todo parece un solo párrafo',
      goal:'El nombre Taller Verde es el título principal, no un párrafo. Cambiá sus dos etiquetas. Conservá la descripción.',
      code:'<p>Taller Verde</p>\n<p>Aprendé a cuidar tus plantas.</p>',
      hint:'El título principal se marca con h1. Abrí y cerrá el mismo elemento.',
      solution:'<h1>Taller Verde</h1>\n<p>Aprendé a cuidar tus plantas.</p>'},
    {title:'Misión 3 · Dos propuestas, una lista',
      goal:'Convertí Sembrar y Compartir en dos elementos de una lista sin orden. Conservá las palabras.',
      code:'<ul>\n  <p>Sembrar</p>\n  <p>Compartir</p>\n</ul>',
      hint:'ul contiene la lista; cada elemento de esa lista se marca con li.',
      solution:'<ul>\n  <li>Sembrar</li>\n  <li>Compartir</li>\n</ul>'}
  ];
  const lessons = [
    ['📄 Un archivo que el navegador interpreta',
      'HTML es un lenguaje de marcado: indica qué función cumple cada parte del contenido. No es un lenguaje de programación ni se ocupa, por sí solo, de toda la apariencia. Guardamos el documento como <code>index.html</code>; el navegador lo interpreta. Abrirlo en tu máquina no lo publica en Internet.',
      '<span class="file-chip">index.html</span> <span class="micro-arrow">→</span> <span class="browser-chip">Navegador → página visible</span>'],
    ['🧳 Lo que prepara la página y lo que se ve',
      '<code>&lt;!DOCTYPE html&gt;</code> indica que usamos HTML actual. <code>&lt;html lang="es"&gt;</code> contiene el documento y declara su idioma. <code>&lt;head&gt;</code> reúne información como la codificación UTF-8 y <code>&lt;title&gt;</code>, el título de la pestaña. <code>&lt;body&gt;</code> contiene lo que verá el visitante. La línea viewport ayuda a que la página se adapte al celular.',
      '<pre class="m3-code">&lt;head&gt;\n  &lt;title&gt;Taller Verde&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;h1&gt;Taller Verde&lt;/h1&gt;\n&lt;/body&gt;</pre>'],
    ['🧩 Apertura + contenido + cierre',
      'En <code>&lt;p&gt;Aprendé con Martina.&lt;/p&gt;</code>, <code>&lt;p&gt;</code> abre el elemento y <code>&lt;/p&gt;</code> lo cierra. El texto queda entre ambos. Las etiquetas no se muestran como texto: el navegador las interpreta. Las que usamos para títulos, párrafos, listas y enlaces tienen apertura y cierre. No todas las etiquetas HTML funcionan así: <code>&lt;meta&gt;</code>, por ejemplo, no lleva cierre.',
      '<span class="file-chip">&lt;p&gt;</span> Aprendé con Martina. <span class="file-chip">&lt;/p&gt;</span>'],
    ['🪜 Dar jerarquía, no solamente tamaño',
      '<code>&lt;h1&gt;</code> marca el título principal de esta página y <code>&lt;h2&gt;</code> sus títulos de sección. <code>&lt;p&gt;</code> marca un párrafo. No elegimos títulos solamente para agrandar letras. Una lista sin orden usa <code>&lt;ul&gt;</code>; cada propuesta queda dentro de <code>&lt;li&gt;</code>. Las etiquetas deben anidarse: cerramos li antes de cerrar ul.',
      '<pre class="m3-code">&lt;h1&gt;Taller Verde&lt;/h1&gt;\n&lt;p&gt;Un taller para principiantes.&lt;/p&gt;\n&lt;h2&gt;Actividades&lt;/h2&gt;\n&lt;ul&gt;\n  &lt;li&gt;Sembrar&lt;/li&gt;\n  &lt;li&gt;Compartir semillas&lt;/li&gt;\n&lt;/ul&gt;</pre>'],
    ['🔗 Una acción necesita un destino',
      '<code>&lt;a&gt;</code> crea un enlace. El atributo <code>href</code> indica su destino; el texto entre las etiquetas indica qué verá el visitante. Una URL completa comienza, por ejemplo, con <code>https://</code>. El texto “Conocer el curso” es más claro que “Click aquí”. Es una llamada a la acción como las del Módulo 2. No crea por sí sola un formulario ni realiza una inscripción.',
      '<pre class="m3-code">&lt;a href="https://andrearocca.github.io/CursoHTML/"&gt;\n  Conocer el curso\n&lt;/a&gt;</pre>']
  ];
  function fresh(){return {fields:{},code:starter,repairCode:repairs.map(r=>r.code),repairAttempts:[0,0,0],repairSolved:[false,false,false],repairSolutions:[false,false,false],checks:null,lesson:0};}
  if(!state.moduleThree || typeof state.moduleThree!=='object' || Array.isArray(state.moduleThree)) state.moduleThree=fresh();
  let work=state.moduleThree;
  // Acotar una posible versión previa del estado a los tipos que usa este módulo.
  const defaults=fresh();
  Object.keys(defaults).forEach(key=>{
    if(typeof work[key]!==typeof defaults[key] || (Array.isArray(defaults[key])&&!Array.isArray(work[key]))) work[key]=defaults[key];
  });
  work.fields=work.fields&&typeof work.fields==='object'?work.fields:{};
  work.lesson=Math.max(0,Math.min(lessons.length-1,Number(work.lesson)||0));
  let storageFailed=false;
  function save(){
    try{persist();storageFailed=false;}catch(error){storageFailed=true;}
    document.querySelectorAll('.m3-autosave').forEach(el=>el.textContent=storageFailed
      ? '⚠ No se pudo guardar en este navegador. Descargá el HTML y prepará el PDF antes de salir.'
      : '✓ Guardado automático en este navegador. No se envía a la docente.');
  }
  function head(label,title,description){return `<div class="section-head"><div><div class="eyebrow" style="color:var(--primary)">Módulo 3 · Clase 3 · ${label}</div><h2>${title}</h2><p>${description}</p></div></div>`;}
  const status='<div class="mini-status m3-autosave" role="status">Se guarda en esta computadora; entregá el PDF antes de irte.</div>';
  const textField=(id,label,placeholder='')=>`<label for="${id}">${label}</label><textarea data-m3-field id="${id}" placeholder="${placeholder}"></textarea>`;
  $('module3').innerHTML=head('Primera parte','Mi primera página HTML','Hoy no solamente vas a reconocer conceptos: vas a escribir, probar y mejorar una página propia.')+`
    <div class="lesson">
      <article class="card">
        <div class="lesson-label">🎯 Un encargo real</div>
        <h3>Martina ya sabe qué quiere comunicar. Falta construirlo.</h3>
        <p>Ayudala a reparar una página y después creá la de tu proyecto: puede ser un club, un emprendimiento, una banda, una biblioteca o una propuesta escolar. Si tu idea de la clase anterior está en otra computadora, recuperá el PDF de Classroom o elegí una idea provisoria. <strong>No necesitás volver a completar el Módulo 2.</strong></p>
        <div class="m3-route"><span>Encargo</span><span>Mirar y entender</span><span>Reparar</span><span>Crear</span><span>Probar y compartir</span><span>Reflexionar</span><span>Entregar</span></div>
        <p><strong>Meta:</strong> una página con título principal, descripción, dos secciones, lista y enlace útil. Los colores y las imágenes los trabajaremos después; hoy importa que se entienda la propuesta.</p>
        <label for="m3Name">Tu nombre y apellido (solo para la entrega)</label><input data-m3-field class="student-name" id="m3Name" autocomplete="name" placeholder="Nombre y apellido">
        <div class="callout">Las computadoras son compartidas. Si ves respuestas de otra persona, usá “Empezar como otro estudiante”. Antes de irte, guardá el PDF en Classroom y descargá tu HTML: el navegador no es tu carpeta personal.</div>
        <div class="actions"><button class="btn ghost" id="m3New">Empezar como otro estudiante</button></div>${status}
      </article>
      <article class="card">
        <div class="lesson-label">🔎 Antes de jugar · Mirá qué cambia</div>
        <h3>Las mismas palabras, otra organización</h3>
        <p>Alterná entre texto sin marcar y HTML. No agregamos colores: agregamos significado y estructura.</p>
        <div class="actions"><button class="btn ghost" id="m3Plain" aria-pressed="false">Texto sin marcar</button><button class="btn" id="m3Marked" aria-pressed="true">Con HTML</button></div>
        <div class="m3-split" style="margin-top:16px"><pre class="m3-code" id="m3DemoCode"></pre><div><p class="m3-preview-caption">👁 Vista previa de la página</p><iframe class="m3-preview m3-mini-preview" id="m3Demo" title="Comparación entre texto y HTML" sandbox="allow-popups allow-popups-to-escape-sandbox"></iframe></div></div>
        ${textField('m3Observe','¿Qué cambia para quien visita la página? Nombrá una diferencia.','Ahora puedo distinguir...')}
      </article>
      <article class="card micro-lesson" id="m3Lesson">
        <div class="micro-head"><div><div class="lesson-label">🧭 Confirmamos lo observado</div><h3>Lo necesario para empezar</h3></div><span class="micro-counter" id="m3Counter"></span></div>
        <div class="micro-track" aria-hidden="true"><div class="micro-fill" id="m3Fill"></div></div>
        <div id="m3Step"></div>
        <div class="micro-controls"><button class="btn ghost" id="m3Prev">← Anterior</button><button class="btn" id="m3Next">Siguiente →</button></div>
        <p class="m3-source">Referencia: <a href="https://developer.mozilla.org/es/docs/Learn/Getting_started_with_the_web/HTML_basics" target="_blank" rel="noopener noreferrer">Conceptos básicos de HTML · MDN</a>.</p>
      </article>
      <div class="grid">
        <article class="card"><div class="icon">🧳</div><h3>Documento</h3><p><code>head</code> prepara información; <code>body</code> contiene el contenido visible.</p></article>
        <article class="card"><div class="icon">🪜</div><h3>Títulos y párrafos</h3><p><code>h1</code>: título principal. <code>h2</code>: sección. <code>p</code>: párrafo.</p></article>
        <article class="card"><div class="icon">📋</div><h3>Lista</h3><p><code>ul</code> agrupa una lista sin orden. Cada elemento va dentro de <code>li</code>.</p></article>
        <article class="card"><div class="icon">🔗</div><h3>Enlace</h3><p><code>a</code> crea el enlace; <code>href</code> indica la dirección de destino.</p></article>
      </div>
      <article class="card" id="m3RepairGame">
        <div class="lesson-label">🛠️ Minijuego · Rescatá la web de Martina</div>
        <h3>Tres reparaciones, tres piezas recuperadas</h3>
        <p>Esta vez respondés <strong>editando HTML</strong>, no eligiendo definiciones. Probá, mirá y corregí. No hay penalización por intentar. Las misiones no siguen el orden de las tarjetas.</p>
        <div class="m3-sticky-status"><strong id="m3RepairScore">0/3 piezas recuperadas</strong><span>Explicá lo que cambiás.</span></div>
        ${repairs.map((r,i)=>`<article style="margin-top:24px"><h3>${r.title}</h3><p>${r.goal}</p><label for="m3Repair${i}">HTML que vas a reparar</label><textarea class="m3-editor m3-repair" id="m3Repair${i}" spellcheck="false"></textarea><details class="m3-hint"><summary>Necesito una pista</summary><p>${r.hint}</p></details><div class="actions"><button class="btn" data-repair="${i}">Probar reparación</button><button class="btn ghost" data-solution="${i}">Ver una solución</button></div><div class="feedback" id="m3RepairFeedback${i}" role="status"></div><p class="m3-preview-caption" id="m3RepairCaption${i}">👁 Así se ve ahora tu página · Misión ${i+1}</p><iframe class="m3-preview m3-repair-preview ${i===0?'m3-link-preview':''}" id="m3RepairPreview${i}" title="Vista previa de la página reparada, misión ${i+1}" aria-describedby="m3RepairCaption${i}" sandbox="allow-popups allow-popups-to-escape-sandbox"></iframe></article>`).join('')}
        ${textField('m3RepairExplain','Elegí una reparación: ¿qué cambiaste y por qué?','Cambié... porque...')}
        ${status}
        <div class="actions"><button class="btn ok" id="m3ToWorkshop">Ahora construyo mi página →</button></div>
        <p class="mini-status">Si una misión te cuesta, podés avanzar y pedir ayuda. La entrega registrará lo realizado.</p>
      </article>
    </div>`;
  $('module3Workshop').innerHTML=head('Taller','De una idea a una página','Tu proyecto, tus palabras y tus decisiones.')+`
    <div class="lesson">
      <article class="card">
        <div class="lesson-label">✍️ Recuperá tu intención</div>
        <p>Podés consultar la ficha del Módulo 2 en Classroom, pero esta entrega es independiente. Si no la tenés a mano, respondé estas dos preguntas y empezá.</p>
        <label for="m3Project">Nombre de tu proyecto</label><input class="student-name" data-m3-field id="m3Project" placeholder="Ejemplo: Taller Verde">
        ${textField('m3Audience','¿Para quién es y qué querés que haga al visitar la página?','Está dirigida a... y quiero que...')}
      </article>
      <article class="card">
        <div class="lesson-label">🚀 Construí tu página en tres pasos</div>
        <ol class="m3-mission-list"><li><strong>Dale identidad:</strong> cambiá el título de la pestaña, el h1 y la descripción. Explicá qué ofrecés y para quién.</li><li><strong>Organizá:</strong> escribí dos títulos h2, otro párrafo y una lista con al menos tres propuestas concretas.</li><li><strong>Invitá a actuar:</strong> cambiá el enlace por un destino real relacionado con tu propuesta y un texto claro. Puede ser el sitio de una institución o un recurso útil; no inventes un formulario que no existe.</li></ol>
        <p><strong>Acuerdo:</strong> podés usar la plantilla y pedir ayuda, pero no alcanza con entregar el ejemplo sin cambiar. Tenés que poder explicar al menos dos etiquetas y una decisión. No publiques datos personales, teléfonos, contraseñas ni fotos de personas.</p>
        <div class="m3-split">
          <div><label for="m3Code">Tu archivo index.html</label><textarea class="m3-editor" id="m3Code" spellcheck="false" aria-describedby="m3EditorHelp"></textarea></div>
          <div><label for="m3Preview">Vista previa de tu página</label><iframe class="m3-preview" id="m3Preview" title="Vista previa de tu página HTML" sandbox="allow-popups allow-popups-to-escape-sandbox"></iframe></div>
        </div>
        <p class="mini-status" id="m3EditorHelp">La vista cambia al escribir. Es una prueba local, no una publicación. Por seguridad no ejecuta JavaScript, formularios ni recursos externos. Los enlaces con una dirección válida se abren en una pestaña nueva.</p>
        <div class="actions"><button class="btn" id="m3Check">Revisar mis misiones</button><button class="btn ghost" id="m3Download">Descargar index.html</button><button class="btn ghost" id="m3ResetCode">Volver a la plantilla</button></div>
        <ul class="m3-checklist" id="m3Checks" aria-live="polite"></ul>
        ${status}
        <details class="m3-hint"><summary>¿Cómo lo abro fuera del curso?</summary><p>Descargá index.html, buscá el archivo en Descargas y abrilo con el navegador. Sigue siendo local: esa ruta no le sirve a tu docente desde otra computadora. Para editarlo también podés abrirlo con un editor de texto. Asegurate de que no termine en .html.txt.</p></details>
      </article>
      <article class="card">
        <h3>Revisá y mejorá tu trabajo</h3>
        <p>Agregá un nuevo elemento a la lista sin copiar uno existente. Después revisá la claridad de tu página: ¿se entiende qué ofrecés, para quién y qué debe hacer quien la visite? Cambiá el texto que no se entiende.</p>
        ${textField('m3Extra','¿Qué agregaste a la lista y qué revisaste o mejoraste?')}
        <div class="actions"><button class="btn ghost" id="m3BackLearn">← Volver a las explicaciones</button><button class="btn ok" id="m3ToShare">Probar y preparar el enlace →</button></div>
      </article>
    </div>`;
  $('module3Share').innerHTML=head('Prueba','Que otra persona pueda verlo','Revisá la claridad de tu página y prepará el trabajo para compartirlo.')+`
    <div class="lesson">
      <article class="card">
        <div class="lesson-label">👥 Probá con un compañero o compañera</div>
        <p>Mostrale la página a un compañero o compañera, sin explicar nada. Pedile que diga qué ofrecés y qué acción puede realizar.</p>
        ${textField('m3Peer','¿Qué entendió la otra persona? ¿Qué te sugirió cambiar?','Entendió... Me sugirió...')}
        ${textField('m3Change','¿Qué mejoraste después de probar? Si no cambiaste nada, justificá por qué.')}
        <div class="actions"><button class="btn ghost" id="m3EditAgain">Volver al editor y mejorar</button></div>
      </article>
      <article class="card">
        <div class="lesson-label">🔗 Editor HTML en línea · YachayCodex</div>
        <p>Vamos a usar <strong>YachayCodex</strong> para probar HTML y obtener un enlace que otra persona pueda abrir. El editor tiene paneles HTML, CSS y JS; hoy usamos solamente HTML.</p>
        <p>Compartir no es lo mismo que conservar una carpeta personal: guardá también tu archivo HTML y el PDF. Usá un alias y contenido ficticio, sin datos del curso ni nombre completo en la página pública. No copies este curso allí; compartí solamente tu producción. Si la plataforma pide una cuenta o no permite compartir, consultá a la docente y usá el plan B.</p>
        <h3>Primero, probá cómo funciona el editor</h3>
        <p>Usá este ejemplo para aprender a pegar, modificar y guardar código antes de llevar tu propia página.</p>
        <pre class="m3-code" id="m3TrialCode"></pre>
        <div class="actions"><button class="btn" id="m3CopyTrial">Copiar código de prueba</button></div>
        <div class="mini-status" id="m3TrialStatus" role="status"></div>
        <ol class="m3-mission-list"><li>Abrí <a href="https://app.yachaycodex.dev/" target="_blank" rel="noopener noreferrer">el editor de YachayCodex</a>.</li><li>Pegá el ejemplo en <strong>HTML</strong> y dejá CSS y JS vacíos.</li><li>Cambiá el título visible y el párrafo para reconocer tu prueba. Probá “Volver al curso”: debe abrir otra pestaña.</li><li>Abrí el ícono <strong>Compartir</strong> y elegí <strong>Compartir Código</strong>. Escribí un título con un alias, pulsá <strong>Compartir Código</strong> y copiá el enlace que genere.</li><li>Abrí ese enlace en otra pestaña y comprobá que aparezcan tus cambios. Antes de entregar, probalo también en otra computadora o ventana privada.</li></ol>
        <h3>Ahora, llevá tu propia página</h3>
        <ol class="m3-mission-list"><li>Usá <strong>Copiar HTML para YachayCodex</strong> y pegalo en su panel HTML, reemplazando la prueba. Copiamos solo el contenido de body; CSS y JS quedan vacíos.</li><li>Probá la página y su enlace. Para abrir un enlace externo en otra pestaña, agregá <code>target="_blank"</code> y <code>rel="noopener noreferrer"</code> a la etiqueta a, como en el ejemplo.</li><li>Compartí el código final siguiendo los pasos de la prueba. Si lo modificás después, volvé a compartir y comprobá el enlace de la versión final: no supongas que el anterior se actualiza solo.</li><li>Abrí el enlace en una ventana privada o en otra computadora. ¿Se ve sin iniciar sesión? ¿Funciona la llamada a la acción? Si no, revisá el enlace o usá el plan B.</li><li>Pegá el enlace más abajo. Si cambiás el código en YachayCodex, traé el HTML final al editor del curso, reemplazando lo que está entre <code>&lt;body&gt;</code> y <code>&lt;/body&gt;</code>, para que el PDF y la web coincidan. Descargá el archivo actualizado. Si iniciaste sesión, cerrala al terminar.</li></ol>
        <div class="actions"><button class="btn" id="m3CopyBody">Copiar HTML para YachayCodex</button><button class="btn ghost" id="m3CopyFull">Copiar documento completo (respaldo)</button></div>
        <div class="mini-status" id="m3CopyStatus" role="status"></div>
        <p class="m3-source">Sitio oficial: <a href="https://yachaycodex.dev/" target="_blank" rel="noopener noreferrer">YachayCodex</a>. La interfaz puede variar. El enlace no reemplaza el archivo HTML ni la entrega en Classroom.</p>
      </article>
      <article class="card">
        <div class="lesson-label">📁 Plan B · Si no podés compartir en línea</div>
        <p>Si no podés usar el editor en línea o generar el enlace, descargá tu HTML y adjuntalo junto al PDF en Classroom. El PDF incluirá el código completo aunque no tengas un enlace. <strong>La dirección de esta página del curso no comparte lo que escribiste en su editor.</strong></p>
        <div class="actions"><button class="btn ghost" id="m3DownloadBackup">Descargar mi archivo HTML</button></div>
        <label for="m3DeliveryType">¿Cómo entregás tu producción?</label><select data-m3-field id="m3DeliveryType"><option value="">Elegí una opción</option><option value="link">Con enlace público a mi trabajo</option><option value="file">Sin enlace: adjunto HTML y PDF en Classroom</option></select>
        <label for="m3Url">Enlace a la versión final compartida (si elegiste entregar con enlace)</label><input data-m3-field id="m3Url" class="student-name" type="url" placeholder="https://app.yachaycodex.dev/shared/...">
        <label class="inline-check"><input type="checkbox" data-m3-field id="m3LinkTested"><span>Probé el enlace en una ventana privada u otra computadora y se puede ver sin mi cuenta.</span></label>
        <div class="actions"><button class="btn ghost" id="m3OpenLink">Abrir mi enlace para revisarlo</button></div><div class="mini-status" id="m3UrlStatus" role="status"></div>
        ${textField('m3ShareProblem','Si no pudiste publicar o probar el enlace, ¿qué dificultad apareció? (opcional)')}
        ${status}
        <div class="actions"><button class="btn ghost" id="m3BackWorkshop">← Volver a mi HTML</button><button class="btn ok" id="m3ToClose">Cierre de esta clase →</button></div>
      </article>
    </div>`;
  $('module3Close').innerHTML=head('Cierre y entrega','Lo construí. ¿Puedo explicarlo?','Reconocé tus avances y dejá preguntas para la próxima clase.')+`
    <div class="lesson">
      <article class="card">
        <div class="lesson-label">🧠 Cinco preguntas para cerrar o abrir la clase siguiente</div>
        ${textField('m3Reflect1','1. Elegí dos etiquetas que usaste: ¿qué función cumple cada una?','Usé... para...')}
        ${textField('m3Reflect2','2. ¿Qué error o dificultad encontraste y cómo intentaste resolverlo?')}
        ${textField('m3Reflect3','3. ¿Qué decisión de tu página ayuda a los destinatarios o al propósito del proyecto?')}
        ${textField('m3Reflect4','4. ¿Qué diferencia hay entre verla en este editor y compartir una URL que otra persona puede abrir?')}
        ${textField('m3Reflect5','5. ¿Qué pregunta te quedó sin responder o sobre qué necesitás más explicación?')}
        <label for="m3Confidence">Semáforo: ¿podrías cambiar esta página sin copiar todo de nuevo?</label><select data-m3-field id="m3Confidence"><option value="">Elegí un color</option><option>🟢 Verde: puedo hacerlo y explicarlo</option><option>🟡 Amarillo: puedo hacerlo con ayuda</option><option>🔴 Rojo: necesito volver a practicar</option></select>
        ${status}
      </article>
      <article class="card">
        <div class="lesson-label">📥 Entrega independiente · Módulo 3 / Clase 3</div>
        <h3>Tu proceso y tu página en un PDF</h3>
        <p>Incluye tus respuestas de <strong>esta clase</strong>, reparaciones, intentos, uso de soluciones, revisión de la página, enlace si lo tenés, devolución y código HTML completo. No depende de las respuestas de los módulos anteriores.</p>
        <p><strong>Antes de irte:</strong> prepará el informe, elegí “Guardar como PDF” en la impresión y adjuntalo en Classroom. Si no publicaste, adjuntá además index.html. Conservá una copia para continuar en otra computadora. El PDF documenta lo que hiciste: no es una prueba inalterable ni una calificación automática.</p>
        <div class="actions"><button class="btn ghost" id="m3BackShare">← Revisar entrega y enlace</button><button class="btn ok" id="m3Report">Preparar PDF del Módulo 3</button></div>
        <div class="mini-status" id="m3ReportStatus" role="status"></div>
      </article>
    </div>`;

  // Vista aislada: no scripts, almacenamiento, formularios ni recursos de red.
  // Solo enlaces HTTP(S) sin credenciales abren un destino en otra pestaña.
  // Se retiran elementos activos antes de mostrarla; el código original sigue intacto.
  function parse(code){return new DOMParser().parseFromString(code,'text/html');}
  function preview(id,code){
    const doc=parse(code);
    doc.querySelectorAll('script,iframe,object,embed,link,base,meta,style').forEach(el=>el.remove());
    doc.querySelectorAll('*').forEach(el=>{
      [...el.attributes].forEach(a=>{if(/^on/i.test(a.name)||['src','srcset','action','formaction','style'].includes(a.name)) el.removeAttribute(a.name);});
      if(el.tagName==='A'){
        const url=safeUrl(el.getAttribute('href')||'');
        el.removeAttribute('href');el.removeAttribute('target');el.removeAttribute('rel');
        if(url){el.href=url.href;el.target='_blank';el.rel='noopener noreferrer';el.title='Abrir en una pestaña nueva';el.style.color='#2155bd';el.style.textDecoration='underline';}
      }
    });
    // CSP antes de todo contenido; las reglas de presentación son del curso.
    const csp=`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; form-action 'none'; base-uri 'none'">`;
    $(id).srcdoc='<!DOCTYPE html><html lang="es"><head>'+csp+'<meta charset="UTF-8"><style>body{padding:12px;font:16px/1.55 system-ui,sans-serif;overflow-wrap:anywhere}h1{font-size:28px;line-height:1.2}h2{font-size:21px}pre{white-space:pre-wrap}</style></head><body>'+doc.body.innerHTML+'</body></html>';
  }
  function collect(){
    document.querySelectorAll('[data-m3-field]').forEach(el=>work.fields[el.id]=el.type==='checkbox'?el.checked:el.value);
    work.code=$('m3Code').value;
    repairs.forEach((r,i)=>work.repairCode[i]=$('m3Repair'+i).value);
  }
  function bind(id,fn){$(id).addEventListener('click',fn);}
  function move(screen){collect();save();go(screen);}
  function renderLesson(){
    const n=work.lesson;
    $('m3Step').innerHTML=`<h3>${lessons[n][0]}</h3><p>${lessons[n][1]}</p><div class="micro-visual">${lessons[n][2]}</div>`;
    $('m3Counter').textContent=`Paso ${n+1} de ${lessons.length}`;
    $('m3Fill').style.width=`${(n+1)/lessons.length*100}%`;
    $('m3Prev').disabled=n===0;
    $('m3Next').textContent=n===lessons.length-1?'Ir al minijuego ↓':'Siguiente →';
  }
  function showDemo(marked){
    $('m3DemoCode').textContent=marked?demoHTML:demoText;
    preview('m3Demo',marked?demoHTML:'<p>'+escape(demoText)+'</p>');
    $('m3Plain').setAttribute('aria-pressed',String(!marked));$('m3Marked').setAttribute('aria-pressed',String(marked));
  }
  function repairValid(i,code){
    const doc=parse(code);
    const clean=s=>s.replace(/\s+/g,' ').trim();
    if(i===0){const a=doc.querySelector('a');return !!a&&a.getAttribute('href')==='https://andrearocca.github.io/CursoHTML/'&&clean(a.textContent)==='Conocer el curso'&&/<\/a\s*>/i.test(code);}
    if(i===1){return clean(doc.querySelector('h1')?.textContent||'')==='Taller Verde'&&clean(doc.querySelector('p')?.textContent||'')==='Aprendé a cuidar tus plantas.'&&/<\/h1\s*>/i.test(code);}
    const list=doc.querySelector('ul');const items=list?[...list.children]:[];
    return items.length===2&&items.every(el=>el.tagName==='LI')&&clean(items[0].textContent)==='Sembrar'&&clean(items[1].textContent)==='Compartir'&&(code.match(/<\/li\s*>/gi)||[]).length===2&&/<\/ul\s*>/i.test(code);
  }
  function score(){
    $('m3RepairScore').textContent=`${work.repairSolved.filter(Boolean).length}/3 piezas recuperadas`;
  }
  function feedbackRepair(i,ok){
    const el=$('m3RepairFeedback'+i);el.className='feedback show '+(ok?'ok':'bad');
    el.textContent=ok?'✅ Pieza recuperada. Mirá el resultado y explicá qué cambiaste.':'🔎 Todavía falta. Revisá la función de la etiqueta o del atributo y conservá el contenido solicitado. Podés usar la pista y volver a probar.';
  }
  function attempt(i){
    collect();work.repairAttempts[i]++;const ok=repairValid(i,work.repairCode[i]);
    work.repairSolved[i]=ok;feedbackRepair(i,ok);preview('m3RepairPreview'+i,work.repairCode[i]);score();save();
  }
  function safeUrl(value){
    try{const url=new URL(value.trim());return ['http:','https:'].includes(url.protocol)&&!url.username&&!url.password?url:null;}catch{return null;}
  }
  const text=el=>el?.textContent.trim()||'';
  function inspect(code){
    const doc=parse(code),body=doc.body;
    const h1s=[...body.querySelectorAll('h1')];const ps=[...body.querySelectorAll('p')];
    const titles=[...body.querySelectorAll('h2')].filter(el=>text(el));
    const list=[...body.querySelectorAll('ul')].some(el=>[...el.children].filter(c=>c.tagName==='LI'&&text(c)).length>=3);
    const links=[...body.querySelectorAll('a')].filter(a=>text(a)&&safeUrl(a.getAttribute('href')||''));
    const rows=[
      [/<!doctype\s+html\s*>/i.test(code)&&/<html\b/i.test(code)&&/<head\b/i.test(code)&&/<body\b/i.test(code)&&/<\/head\s*>/i.test(code)&&/<\/body\s*>/i.test(code)&&/<\/html\s*>/i.test(code),'Documento con doctype, html, head y body, y sus cierres'],
      [text(doc.querySelector('title'))!==''&&text(doc.querySelector('title'))!=='Mi primera propuesta','Título de pestaña personalizado'],
      [h1s.length===1&&text(h1s[0])!==''&&text(h1s[0])!=='Nombre de mi proyecto','Un título principal h1 personalizado'],
      [ps.filter(p=>text(p)&&!['Contá qué ofrecés y a quién está dirigido.','Explicá por qué vale la pena sumarse.'].includes(text(p))).length>=2,'Dos párrafos escritos para tu proyecto'],
      [titles.length>=2&&titles.every(el=>!['Qué vas a encontrar','Participá'].includes(text(el))),'Dos títulos de sección h2 personalizados'],
      [list&&![...body.querySelectorAll('li')].some(el=>['Primera propuesta','Segunda propuesta','Tercera propuesta'].includes(text(el))),'Lista ul con al menos tres propuestas propias'],
      [links.some(a=>text(a)!=='Conocer el curso'),'Enlace con URL completa y texto de acción propio']
    ];
    return {rows,score:rows.filter(r=>r[0]).length,total:rows.length};
  }
  function renderChecks(result){
    $('m3Checks').innerHTML=result.rows.map(([ok,label])=>`<li class="${ok?'ok':'bad'}">${ok?'✓':'○'} ${escape(label)}</li>`).join('')+'<li>Revisión orientativa: no comprueba toda la sintaxis ni si el destino del enlace existe. Probá también la claridad y los enlaces con una persona.</li>';
  }
  function check(){collect();work.checks=inspect(work.code);renderChecks(work.checks);save();}
  function download(){
    collect();save();const blob=new Blob([work.code],{type:'text/html;charset=utf-8'});const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download='index.html';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  async function copy(bodyOnly){
    collect();save();const value=bodyOnly?parse(work.code).body.innerHTML:work.code;
    try{await navigator.clipboard.writeText(value);$('m3CopyStatus').textContent=bodyOnly?'✓ Copiado el contenido de body para el panel HTML de YachayCodex.':'✓ Copiado el archivo completo para index.html.';}
    catch{$('m3CopyStatus').textContent='No se pudo copiar automáticamente. Volvé al editor y copiá con Ctrl+C. Para YachayCodex, seleccioná solo lo que está entre <body> y </body>.';}
  }
  const trialCode='<h1>Mi primera página</h1>\n<p>Estoy aprendiendo a crear una página con HTML.</p>\n<h2>Lo que quiero aprender</h2>\n<ul>\n  <li>Organizar información</li>\n  <li>Crear enlaces</li>\n  <li>Publicar mi página</li>\n</ul>\n<a href="https://andrearocca.github.io/CursoHTML/"\n   target="_blank"\n   rel="noopener noreferrer">\n  Volver al curso de HTML\n</a>';
  $('m3TrialCode').textContent=trialCode;
  async function copyTrial(){
    try{await navigator.clipboard.writeText(trialCode);$('m3TrialStatus').textContent='✓ Código de prueba copiado. Pegalo en el panel HTML de YachayCodex.';}
    catch{$('m3TrialStatus').textContent='Seleccioná el ejemplo de arriba y copialo con Ctrl+C; después pegalo en el editor.';}
  }
  function publicWorkUrl(){
    const url=safeUrl(work.fields.m3Url||'');
    if(!url)return null;
    if(url.hostname==='andrearocca.github.io'&&url.pathname.replace(/\/$/,'')==='/CursoHTML')return null;
    if(url.hostname==='codepen.io'&&!/\/(?:pen|full|details)\/[^/]+/.test(url.pathname))return null;
    if(url.hostname==='yachaycodex.dev')return null;
    if(url.hostname==='app.yachaycodex.dev'&&(!url.pathname.replace(/\//g,'')||/^\/shared\/?$/.test(url.pathname)))return null;
    if(['localhost','127.0.0.1','0.0.0.0'].includes(url.hostname))return null;
    return url.href;
  }
  function report(){
    collect();save();const f=work.fields,st=$('m3ReportStatus'),name=(f.m3Name||'').trim();
    if(!name){st.textContent='Escribí tu nombre al comienzo del módulo antes de preparar el PDF.';go('module3');$('m3Name').focus();return;}
    if(!f.m3DeliveryType){st.textContent='Elegí cómo entregás: enlace o HTML adjunto. Volvé a “Revisar entrega y enlace”.';return;}
    const link=f.m3DeliveryType==='link'?publicWorkUrl():null;
    if(f.m3DeliveryType==='link'&&!link){st.textContent='Necesitamos una URL completa al trabajo guardado (http o https), no una ruta local, el editor vacío ni la dirección de este curso. Si no pudiste publicarlo, elegí entregar HTML y PDF.';return;}
    work.checks=inspect(work.code);renderChecks(work.checks);
    const answer=id=>String(f[id]||'').trim()||'(Sin respuesta)';
    const lines=[
      'DISEÑAR PARA LA WEB — MÓDULO 3 / CLASE 3',
      'Mi primera página HTML · Tecnología · 4.º año',
      '',`Estudiante: ${name}`,`Fecha: ${new Date().toLocaleString('es-AR')}`,
      '', 'PROYECTO',answer('m3Project'),'Destinatarios y acción esperada:',answer('m3Audience'),
      '', '1. OBSERVACIÓN: TEXTO Y HTML',answer('m3Observe'),
      '', '2. MINIJUEGO: RESCATÁ LA WEB DE MARTINA',
      ...repairs.flatMap((r,i)=>[
        r.title,`Estado actual: ${work.repairSolved[i]?'resuelta':'pendiente'}. Intentos: ${work.repairAttempts[i]||0}. Consultó una solución: ${work.repairSolutions[i]?'sí':'no'}.`,
        'Código de la reparación:',work.repairCode[i],''
      ]),
      'Una reparación explicada:',answer('m3RepairExplain'),
      '', '3. REVISIÓN ORIENTATIVA DE MI PÁGINA',
      `${work.checks.score}/${work.checks.total} criterios detectados. No equivale a una nota ni a una validación completa.`,
      ...work.checks.rows.map(([ok,label])=>(ok?'Cumple: ':'Para revisar: ')+label),
      '', '4. PRUEBA Y MEJORA',
      'Lo que entendió otra persona y lo que sugirió:',answer('m3Peer'),
      'Lo que mejoré:',answer('m3Change'),
      'Revisión y mejora: elemento agregado a la lista y cambios realizados:',answer('m3Extra'),
      '', '5. ENTREGA DE LA PÁGINA',
      link?`Enlace público: ${link}`:'Sin enlace: se entrega el archivo index.html junto a este PDF en Classroom.',
      `El estudiante declara haber probado el enlace sin su cuenta: ${link?(f.m3LinkTested?'sí':'no'):'no corresponde'}. El curso no verificó su accesibilidad.`,
      'Dificultad al publicar o probar (si hubo):',answer('m3ShareProblem'),
      '', '6. DEVOLUCIÓN FINAL',
      '1. Dos etiquetas y sus funciones:',answer('m3Reflect1'),
      '2. Error o dificultad y cómo intenté resolverlo:',answer('m3Reflect2'),
      '3. Decisión relacionada con destinatarios o propósito:',answer('m3Reflect3'),
      '4. Diferencia entre vista local y enlace compartido:',answer('m3Reflect4'),
      '5. Pregunta pendiente o tema que requiere más explicación:',answer('m3Reflect5'),
      'Semáforo:',answer('m3Confidence'),
      '', '7. CÓDIGO HTML COMPLETO — VERSIÓN AL PREPARAR ESTE INFORME',work.code,
      '', 'Entrega independiente: no incluye respuestas de otras clases.',
      'El informe registra el proceso declarado y el estado local; no certifica autoría ni es inalterable.',
      'Curso creado por Andrea Rocca · CC BY-NC-SA 4.0 · https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es'
    ];
    if(openWorkReport('Curso HTML - Modulo 3 - '+name,lines.join('\n'),st,link)){
      if(!state.done.includes('module3'))state.done.push('module3');save();
      st.textContent='Informe abierto. Guardalo como PDF y adjuntalo en Classroom. Abrir el informe no lo entrega automáticamente.';
    }
  }
  // Restaurar todos los campos, incluidos intentos y códigos de las misiones.
  document.querySelectorAll('[data-m3-field]').forEach(el=>{
    if(el.type==='checkbox')el.checked=!!work.fields[el.id];else el.value=work.fields[el.id]||'';
    el.addEventListener(el.tagName==='SELECT'||el.type==='checkbox'?'change':'input',()=>{collect();save();});
  });
  $('m3Code').value=work.code;
  $('m3Code').addEventListener('input',()=>{collect();work.checks=null;$('m3Checks').textContent='Cambiaste el código: volvé a revisar tus misiones.';save();preview('m3Preview',work.code);});
  repairs.forEach((r,i)=>{
    $('m3Repair'+i).value=work.repairCode[i]||r.code;
    // Verificar el código actual: un éxito anterior no se conserva tras romperlo.
    work.repairSolved[i]=repairValid(i,$('m3Repair'+i).value)&&!!work.repairSolved[i];
    $('m3Repair'+i).addEventListener('input',()=>{collect();work.repairSolved[i]=false;$('m3RepairFeedback'+i).className='feedback';score();save();});
    preview('m3RepairPreview'+i,$('m3Repair'+i).value);
    if(work.repairSolved[i])feedbackRepair(i,true);
  });
  document.querySelectorAll('[data-repair]').forEach(b=>b.addEventListener('click',()=>attempt(Number(b.dataset.repair))));
  document.querySelectorAll('[data-solution]').forEach(b=>b.addEventListener('click',()=>{
    const i=Number(b.dataset.solution);work.repairSolutions[i]=true;save();
    const el=$('m3RepairFeedback'+i);el.className='feedback show ok';el.textContent='Una solución posible:\n'+repairs[i].solution+'\nAhora escribí la reparación vos y probala. La consulta quedará registrada.';el.style.whiteSpace='pre-wrap';
  }));
  bind('m3New',()=>{
    if(!confirm('¿Empezar un trabajo nuevo del Módulo 3? Se borrarán solo sus respuestas y su código en este navegador. Descargá antes el PDF/HTML que quieras conservar.'))return;
    state.moduleThree=fresh();state.done=state.done.filter(id=>id!=='module3');work=state.moduleThree;save();location.reload();
  });
  bind('m3Plain',()=>showDemo(false));bind('m3Marked',()=>showDemo(true));
  bind('m3Prev',()=>{work.lesson--;renderLesson();save();});
  bind('m3Next',()=>{if(work.lesson===lessons.length-1){$('m3RepairGame').scrollIntoView({behavior:'smooth',block:'start'});return;}work.lesson++;renderLesson();save();});
  bind('m3ToWorkshop',()=>move('module3Workshop'));bind('m3BackLearn',()=>move('module3'));
  bind('m3Check',check);bind('m3Download',download);bind('m3DownloadBackup',download);
  bind('m3ResetCode',()=>{if(confirm('¿Reemplazar tu código por la plantilla? Descargá antes el HTML si querés conservarlo.')){$('m3Code').value=starter;collect();work.checks=null;$('m3Checks').textContent='';preview('m3Preview',starter);save();}});
  bind('m3ToShare',()=>{check();move('module3Share');});bind('m3BackWorkshop',()=>move('module3Workshop'));bind('m3EditAgain',()=>move('module3Workshop'));
  bind('m3CopyFull',()=>copy(false));bind('m3CopyBody',()=>copy(true));
  bind('m3CopyTrial',copyTrial);
  bind('m3OpenLink',()=>{
    collect();save();const url=publicWorkUrl();if(!url){$('m3UrlStatus').textContent='Pegá una URL completa del trabajo guardado, no una ruta local ni el editor vacío.';return;}
    window.open(url,'_blank','noopener,noreferrer');$('m3UrlStatus').textContent='Probalo también en una ventana privada. Abrirlo acá no verifica que sea público.';
  });
  bind('m3ToClose',()=>move('module3Close'));bind('m3BackShare',()=>move('module3Share'));bind('m3Report',report);
  // Recuperación de un HTML de Classroom: pegarlo aquí recupera la producción,
  // no el estado de actividades de otra clase.
  showDemo(true);renderLesson();score();preview('m3Preview',work.code);
  if(work.checks)renderChecks(inspect(work.code));save();
  if(location.hash==='#module3')go('module3');
})();
