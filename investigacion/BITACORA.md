# Bitácora de diseño e investigación

## Curso HTML y juego «¡Publicá la web!»

**Docente:** Andrea Rocca  
**Grupo:** 4.º año, turno tarde  
**Inicio documentado:** 19 de agosto de 2026  
**Última actualización:** 22 de agosto de 2026  
**Estado:** reconstrucción inicial validada con conversaciones e historial de GitHub

## Propósito de esta bitácora

Registrar el proceso real que comenzó con el diseño de un curso HTML interactivo, continuó con la identificación de una dificultad conceptual en el aula y derivó en el diseño del juego educativo «¡Publicá la web!».

El registro servirá como base para analizar la experiencia y, eventualmente, elaborar una presentación para un concurso de prácticas docentes innovadoras, una ponencia, un documento de investigación o un artículo.

La bitácora distingue entre:

- **evidencias comprobadas:** archivos, historial de GitHub, capturas y registros fechados;
- **observaciones docentes:** situaciones registradas durante las clases;
- **recuerdos por verificar:** datos que todavía necesitan contrastarse con otras evidencias;
- **interpretaciones e hipótesis:** explicaciones provisorias que orientan el diseño y la investigación.

---

## 19 de agosto de 2026 — Diseño y publicación del curso inicial

### Evidencia comprobada

La experiencia comenzó con el pedido de construir un curso HTML interactivo para estudiantes de 4.º año, de acuerdo con el plan de trabajo presentado por la docente.

El historial del repositorio registra:

- **17:46:** incorporación de `curso_web_4to_prototipo.html`;
- **19:39:** cambio de nombre del archivo a `index.html`, dejándolo preparado como página principal del repositorio y para su publicación mediante GitHub Pages.

Commits asociados:

- `7128ca4` — *Add files via upload*;
- `733b01b` — *Rename curso_web_4to_prototipo.html to index.html*.

El prototipo quedó constituido como un único archivo HTML responsive, sin registro de usuarios ni base de datos. Incluía portada, barra de progreso, almacenamiento local de respuestas, Módulo 0, Módulo 1 y actividades con retroalimentación automática.

### Intención pedagógica inicial

El curso no fue pensado solamente para enseñar etiquetas HTML. Su recorrido general vinculaba:

1. análisis de la comunicación web;
2. planificación y organización de la información;
3. identidad visual;
4. producción con HTML y CSS;
5. comprensión básica de Internet y la arquitectura cliente-servidor;
6. publicación, prueba, accesibilidad y mejora;
7. presentación de un producto final.

El producto final propuesto era un sitio sencillo para una organización, emprendimiento o proyecto escolar. Debía incluir identidad visual, información clara, secciones organizadas, enlaces funcionales, imágenes adecuadas, criterios de accesibilidad y registro de fuentes.

---

## Módulo 0 — «Comunicar en la web»

### Evidencia comprobada

El módulo planteaba que diseñar un sitio no consiste únicamente en elegir colores, sino en definir qué se quiere comunicar, a quién y con qué propósito.

Incluía una web ficticia deliberadamente confusa. Los estudiantes debían identificar tres problemas relevantes:

- no quedaba claro qué ofrecía la organización;
- no existía una jerarquía clara de la información;
- los llamados a la acción eran confusos.

La consigna indicaba expresamente que no debían buscar solamente qué estaba «feo», sino qué impedía comprender la propuesta.

Una segunda actividad pedía imaginar una organización o emprendimiento que pudiera convertirse en tema del proyecto final. La respuesta quedaba almacenada localmente en el navegador.

### Idea central presentada

Una página comunica antes de que se lea todo: la organización, los títulos, las imágenes y los botones indican qué es importante y qué acciones se pueden realizar.

---

## Módulo 1 — «La web por dentro»

### Corrección de la reconstrucción inicial

En las conversaciones posteriores se recordaba que el cuestionario podía haber estado en el Módulo 2. La revisión del archivo original permite establecer que estaba en el **Módulo 1**.

Este dato deja de considerarse un recuerdo pendiente y pasa a ser evidencia comprobada.

### Conceptos presentados antes de la actividad

El curso incluía seis tarjetas con definiciones breves:

- **Página web:** documento individual que se muestra en el navegador.
- **Sitio web:** conjunto organizado de páginas y recursos relacionados.
- **Landing page:** página pensada para presentar una propuesta y orientar a una acción concreta.
- **Dominio:** nombre o dirección que se utiliza para encontrar un sitio.
- **Alojamiento:** servicio donde se guardan los archivos para que estén disponibles en Internet.
- **Navegador:** programa que solicita, interpreta y muestra el contenido web.

### Mini juego «¿Quién es quién?»

Después de las definiciones aparecían cuatro situaciones autocorregibles:

1. «chimeleta.com.ar» es un **dominio**.
2. Una página destinada a presentar un único producto y llevar al visitante al botón «Comprar» es una **landing page**.
3. Chrome, Firefox y Edge son **navegadores**.
4. Un conjunto formado por Inicio, Quiénes somos, Productos y Contacto es un **sitio web**.

Para completar la actividad era necesario obtener cuatro respuestas correctas. Si había errores, el sistema recomendaba prestar atención a la diferencia entre la dirección, el conjunto de páginas y el programa que las muestra.

### Recorrido técnico presentado

El módulo mostraba también esta secuencia:

1. la persona escribe una URL;
2. el navegador busca dónde está el sitio;
3. solicita los archivos al servidor;
4. interpreta y muestra la página.

Se anunciaba que cliente-servidor, protocolos y publicación serían profundizados más adelante.

### Aplicación al proyecto del estudiante

El cierre preguntaba si el proyecto necesitaba un sitio con varias secciones o si podía resolverse mediante una única landing page, y solicitaba justificar la decisión.

---

## Observación docente que cambia el proyecto

### Observación registrada

Durante la utilización del curso, la docente advirtió que los estudiantes no comprendían adecuadamente varios de los conceptos presentados, en particular:

- página web;
- sitio web;
- hosting o alojamiento;
- dominio;
- landing page.

Fue necesario detener el recorrido y explicar los conceptos uno por uno. Aun después de esa explicación, resultó difícil para varios estudiantes diferenciarlos y relacionarlos.

### Interpretación inicial

La dificultad no parecía limitarse a memorizar vocabulario. La explicación breve y el mini juego permitían reconocer definiciones, pero no necesariamente construir un modelo mental integrado del funcionamiento de la web.

El problema pedagógico comenzó a formularse así:

> Es posible enseñar a escribir etiquetas HTML sin que los estudiantes comprendan el ecosistema en el que ese HTML se guarda, se publica y se vuelve accesible para otras personas.

Esta observación llevó a evitar una solución basada únicamente en ampliar definiciones o agregar más preguntas.

---

## 22 de agosto de 2026 — Nacimiento de «¡Publicá la web!»

### Decisión de diseño

La docente propuso crear un juego de estrategia, una aventura de decisiones o una experiencia visual narrativa que permitiera afianzar los conceptos.

Se decidió que los estudiantes debían **utilizar los conceptos para resolver problemas**, en vez de volver a leer sus definiciones.

Se incorporaron dos términos que ayudaban a completar la relación entre los componentes:

- servidor;
- URL.

El sistema conceptual quedó planteado inicialmente como:

**página web → sitio web → landing page → dominio → URL → hosting → servidor**

### Historia del juego

Un emprendimiento tiene una web terminada, pero nadie puede verla. El estudiante debe tomar decisiones para conseguir que quede publicada y accesible.

El recorrido visual propuesto fue:

**archivos → servidor/hosting → dominio → URL → visitante**

Cada decisión correcta debía permitir obtener o colocar una pieza de la arquitectura:

- página;
- sitio;
- servidor;
- hosting;
- dominio;
- URL;
- landing page.

El cierre debía reconstruir visualmente el recorrido completo y mostrar el mensaje «¡Tu sitio está online!».

### Situaciones consideradas

1. Una estudiante guarda `index.html` en su notebook y envía a una amiga la ruta local del archivo. La amiga no puede abrirla. La decisión necesaria es publicar los archivos en un hosting.
2. El sitio ya está alojado, pero se desea una dirección propia y fácil de recordar. Es necesario registrar o asociar un dominio.
3. Inicio, Productos, Galería y Contacto son cuatro páginas que, en conjunto, forman un sitio web.
4. Una campaña de redes sociales que busca exclusivamente inscripciones puede dirigir a una landing page.
5. Si se deja de pagar el dominio, la dirección puede dejar de conducir al sitio, aunque eso no implica que los archivos HTML se borren automáticamente.
6. Si el servidor deja de responder, el visitante no puede acceder normalmente al sitio.

También se propuso cerrar con una explicación abierta:

> ¿Cómo hace una persona, desde su celular, para llegar hasta tu página?

Esta explicación funcionaría como evidencia de comprensión de la relación entre dominio, hosting o servidor, sitio y página.

---

## Decisión tecnológica

Se comparó la creación de una APK con una aplicación web en HTML, CSS y JavaScript.

Se eligió una aplicación web publicada en GitHub Pages porque:

- puede abrirse mediante un enlace o código QR;
- funciona en celulares, tabletas y computadoras;
- no requiere habilitar la instalación de APK;
- puede actualizarse sin redistribuir instaladores;
- constituye un ejemplo real de los contenidos que enseña.

Se consideró incorporar posteriormente características de PWA para permitir instalación y uso sin conexión después de la primera carga.

La PWA se postergó hasta validar el funcionamiento pedagógico. La primera versión debía concentrarse en que el juego fuera comprensible, atractivo y funcional tanto en celulares como en computadoras.

---

## Versión 0.1 recuperada

### Evidencia comprobada

El 22 de agosto de 2026 se recuperó el archivo `publica_la_web_MVP.zip`. El ZIP conservaba cuatro archivos con fecha interna del mismo día a las 13:21:

- `index.html`;
- `style.css`;
- `game.js`;
- `README.md`.

Se incorporó una copia intacta en `juego/v0.1-original/`. Esta carpeta funciona como evidencia de la primera versión y no deberá modificarse. Las iteraciones posteriores se realizarán en otra ubicación o mediante copias claramente identificadas.

La revisión confirmó que el juego presenta a **Martina** y propone ayudarla a llevar su emprendimiento desde una notebook hasta Internet. El nombre se unificó con el utilizado en los videos para mantener la continuidad narrativa del curso.

### Características registradas

- HTML, CSS y JavaScript;
- siete misiones, una por cada concepto;
- página web, sitio web, hosting, servidor, dominio, URL y landing page;
- mapa de progreso;
- puntaje;
- retroalimentación inmediata;
- diseño responsive;
- cierre visual del recorrido;
- ausencia de librerías y recursos externos.

La secuencia visual final recuperada es:

**visitante → URL/dominio → hosting → servidor → sitio → página**

El archivo `README.md` confirma que el MVP fue pensado para abrirse localmente o publicarse en GitHub Pages y que la ausencia de recursos externos buscaba facilitar una futura conversión a PWA con funcionamiento sin conexión.

### Primera valoración

El MVP fue considerado funcional, pero todavía estaba más cerca de un cuestionario visualmente atractivo que del juego narrativo y estratégico imaginado.

Para una segunda versión se propuso:

- aumentar la narrativa;
- introducir decisiones con consecuencias;
- incorporar acontecimientos inesperados;
- disminuir la sensación de preguntas con opciones;
- fortalecer la construcción visual del sistema;
- explorar recorridos o finales diferentes.

---

## Reflexión sobre programación e inteligencia artificial

La experiencia abrió una pregunta más amplia:

> ¿Cómo acompañar a estudiantes que pueden pedir a una inteligencia artificial que produzca una página o un videojuego, pero todavía no comprenden los conceptos necesarios para diseñarlo, evaluarlo y publicarlo?

Inicialmente se distinguieron tres capas:

1. **Artefacto:** la página, aplicación o juego que se desea crear.
2. **Software:** archivos, HTML, CSS, JavaScript, imágenes, enlaces, estructura y ejecución en el navegador.
3. **Infraestructura:** dispositivo local, servidor, hosting, dominio, URL, Internet, nube, almacenamiento y transferencia de datos.

La IA puede facilitar la creación del artefacto y producir gran parte del software. Sin embargo, si la infraestructura continúa siendo una caja negra, el estudiante puede obtener un producto funcional sin comprender qué construyó, dónde se encuentra ni cómo llega a otras personas.

Un ejemplo surgido en clase fue la pregunta:

> Tenés un correo de Google. ¿Dónde está físicamente ese correo?

La dificultad para explicar qué es «la nube» y dónde se almacenan físicamente los datos reforzó la idea de que publicar no debe tratarse como un paso meramente técnico, sino como parte del aprendizaje de programación.

### Hallazgos provisorios

> Saber pedir código no equivale a saber diseñar software.

> La inteligencia artificial reduce algunas barreras de producción, pero no reemplaza la construcción de modelos conceptuales sobre el software y su infraestructura.

> La IA puede generar el artefacto sin que el estudiante haya construido el modelo mental que permite comprender cómo existe y funciona ese artefacto.

---

## Pregunta inicial de investigación

> ¿De qué manera una experiencia lúdica y narrativa basada en la resolución de problemas favorece la construcción de modelos mentales sobre la arquitectura y la publicación de sitios web en estudiantes de 4.º año que comienzan a desarrollar software con apoyo de inteligencia artificial?

Esta formulación es provisoria. Deberá revisarse después de las primeras aplicaciones del juego.

## Hipótesis iniciales

1. Las definiciones aisladas no son suficientes para construir relaciones entre página, sitio, servidor, hosting, dominio y URL.
2. Una narrativa basada en problemas concretos puede favorecer una comprensión más integrada.
3. La construcción visual de la arquitectura puede resultar más significativa que la memorización de términos separados.
4. Las situaciones nuevas de transferencia permiten observar mejor la comprensión que la repetición de las preguntas del juego.
5. Publicar el propio juego puede transformar conceptos abstractos en una experiencia observable.
6. En un contexto de programación asistida por IA, los modelos conceptuales sobre software e infraestructura adquieren mayor importancia, aunque disminuya la necesidad inicial de dominar toda la sintaxis.

---

## Evidencias que se deberán reunir

- capturas del curso original;
- capturas del Módulo 1 y del mini juego;
- registro más detallado de lo ocurrido durante la primera clase;
- respuestas o errores frecuentes de los estudiantes;
- código original o reconstrucción identificada de la versión 0.1;
- capturas y registro de cambios de cada versión del juego;
- diagnóstico previo a la intervención;
- actividad posterior con situaciones nuevas;
- observaciones durante el uso en celular y computadora;
- comentarios espontáneos de los estudiantes;
- problemas técnicos durante la publicación o aplicación;
- decisiones de diseño y sus fundamentos.

Las capturas deberán tener fecha, número, epígrafe y una explicación de qué evidencia aportan.

---

## Próximos pasos registrados

1. Preservar `index.html` como línea de base del curso utilizado el 19 de agosto.
2. Conservar `juego/v0.1-original/` como copia inalterada del MVP recuperado.
3. Crear una copia de trabajo separada para las próximas iteraciones.
4. Publicar y probar la versión 0.1 en computadora y celular.
5. Registrar qué se comprende, qué resulta confuso y qué se siente demasiado parecido a un cuestionario.
6. Diseñar la versión 0.2 a partir de esas observaciones.
7. Preparar un diagnóstico y una actividad posterior de transferencia.

---

## 22 de agosto de 2026 — Exportación de las producciones

### Situación observada

Las ideas y respuestas abiertas quedaban almacenadas solamente en el navegador mediante `localStorage`. Ese mecanismo permitía continuar el recorrido en el mismo dispositivo, pero no ofrecía a los estudiantes una forma directa de entregar sus producciones en Classroom.

### Decisión tomada

Se agregó al final del recorrido una sección «Descargá tu trabajo». El estudiante debe escribir su nombre y puede generar un archivo de texto que contiene:

- nombre y apellido;
- fecha y hora de descarga;
- porcentaje de avance;
- idea para el proyecto final;
- decisión fundamentada entre sitio web y landing page;
- estado de las actividades y módulos completados.

La descarga recupera también el contenido que permanezca escrito en los campos, aunque el estudiante no haya presionado previamente el botón «Guardar». El nombre se utiliza para generar un archivo identificable, por ejemplo `curso-html-martina-perez.txt`, que puede entregarse directamente mediante Classroom.

### Fundamento

La modificación convierte las producciones locales en una evidencia portable y entregable sin incorporar cuentas, base de datos ni recolección centralizada de información personal.

---

## 22 de agosto de 2026 — Microlección «¿Dónde vive una página web?»

### Situación observada

Se identificó un salto conceptual entre la definición breve «Una página web es un documento individual que se muestra en el navegador» y las situaciones del mini juego. Antes de resolver las misiones, los estudiantes necesitaban comprender qué es materialmente una página web y distinguir entre verla localmente y publicarla.

### Cambio realizado

Se incorporó al comienzo del Módulo 1 una microlección interactiva de cinco pasos:

1. una página comienza como un archivo con extensión `.html`;
2. el archivo puede guardarse en una carpeta junto con otras páginas e imágenes;
3. el navegador interpreta el HTML y puede mostrarlo localmente;
4. cada archivo HTML puede representar una página y varias páginas relacionadas forman un sitio;
5. abrir un archivo local no equivale a publicarlo: para hacerlo accesible hay que alojarlo en un servidor conectado a Internet.

El recorrido termina con una pregunta puente sobre una estudiante que puede ver `index.html` en su notebook. Para continuar debe reconocer que la página todavía no está publicada porque el archivo permanece únicamente en su computadora.

### Decisión multimedia

La explicación interactiva será el contenido principal, de modo que no dependa de un servicio externo. Se proyecta incorporar como complemento un audio o video breve con el mismo guion, manteniendo una transcripción visible por razones de accesibilidad.

---

## 22 de agosto de 2026 — Reorganización del Módulo 1

### Situación observada

La incorporación del video y de la microlección mostró que presentar página, sitio, navegador, hosting, servidor, dominio, URL y landing page en una única secuencia podía volver a producir una acumulación de conceptos.

### Decisión tomada

El Módulo 1 se dividió en dos lecciones internas dentro del mismo archivo del curso:

**Lección 1 — Archivos, páginas y navegador**

1. video «¿Qué es una página web?» alojado en YouTube;
2. microlección «¿Dónde vive una página web?»;
3. tarjetas de página web, sitio web y navegador;
4. mini juego de tres situaciones.

**Lección 2 — Publicar y encontrar una web**

1. video introductorio «¿Cómo llega una página web a Internet?»;
2. explicación interactiva en un recorrido deslizante con íconos;
3. tarjetas conceptuales de hosting, servidor, dominio, URL y landing page;
4. síntesis visual «¿Qué ocurre cuando escribimos una dirección?» como puente entre los conceptos y su aplicación;
5. mini juego de cinco situaciones;
6. aplicación al proyecto del estudiante.

Se mantuvo un único `index.html`, pero cada lección funciona como una pantalla separada. Esto reduce la extensión visible de cada recorrido sin fragmentar el almacenamiento, el progreso ni la descarga de evidencias.

El video se incorporó mediante el reproductor de YouTube con privacidad mejorada (`youtube-nocookie.com`). Esta decisión evita agregar al repositorio un archivo MP4 de aproximadamente 92 MB y permite que YouTube adapte la reproducción a distintas conexiones y dispositivos. La microlección escrita permanece disponible debajo del video como contenido principal y alternativa accesible.

Durante la prueba local apareció el error 153 del reproductor de YouTube. La causa fue que el curso se había abierto directamente como archivo (`file://`), sin una dirección web que el reproductor pudiera utilizar como referencia. Se agregó una detección automática: en modo local se muestra una explicación y un enlace para abrir el video en YouTube; cuando el curso se accede mediante `http://` o `https://`, se muestra el reproductor incrustado.

### Precisión conceptual incorporada

Se aclaró que `.com` es un dominio genérico internacional y no un dominio exclusivo de Estados Unidos; el dominio territorial de ese país es `.us`. También se incorporó que NIC Argentina es el registro oficial de los dominios `.ar` y que `.com.ar` es una de sus zonas de registro.

Durante la revisión se detectó que URL aparecía en las tarjetas y en la evaluación, pero todavía no tenía una explicación propia. Se agregó un paso que distingue dominio de URL mediante el ejemplo `https://chimeleta.com.ar/productos.html`: `chimeleta.com.ar` es el dominio, `/productos.html` es la ruta y el conjunto constituye la URL completa. La microlección pasó de cinco a seis pasos. También se decidió producir un segundo video integrador sobre hosting, servidor, dominio, URL y landing page.

El segundo video fue producido con una herramienta de IA gratuita, mediante un único prompt y sin iteraciones de corrección. La explicación conceptual, el audio y los textos descriptivos son correctos; los problemas aparecen en algunas imágenes generadas, por ejemplo una notebook cuya pantalla está del lado equivocado o palabras inexistentes integradas en la escena. Inicialmente se lo presentó como «Repasemos con mirada crítica», pero al revisar la secuencia se advirtió que aparece antes de la explicación. Por eso se reformuló como «Primera aproximación»: el video introduce los conceptos, la explicación interactiva con íconos los desarrolla paso a paso y el minijuego permite aplicarlos. La observación de objetos imposibles, partes invertidas o texto inventado se mantiene como consigna secundaria de alfabetización mediática, sin poner en duda el contenido conceptual.

### Cierre de la primera clase de 90 minutos

El aviso genérico «Próximo módulo» se reemplazó por un cierre completo para la primera jornada. Después de las dos lecciones, los estudiantes realizan el juego integrador «¡Publicá la web!», compuesto por siete misiones sobre página, sitio, hosting, servidor, dominio, URL y landing page. El juego quedó incorporado dentro del curso y comunica su puntaje al recorrido principal para incluirlo en la evidencia final.

Después del juego se incorporó una devolución escrita con cinco preguntas:

1. ¿Qué aprendiste hoy que antes no sabías?
2. ¿Qué ocurre desde que una persona escribe una dirección hasta que ve una página web?
3. ¿Qué concepto resultó más claro y por qué?
4. ¿Qué preguntas quedaron sin responder?
5. ¿Qué aspecto no se entendió o requiere más explicación?

Las preguntas cumplen una doble función. Si la clase alcanza los 90 minutos, funcionan como cierre metacognitivo y evaluación de salida. Si no hay tiempo suficiente, quedan disponibles para abrir la clase siguiente y recuperar dudas. Las cinco respuestas, incluso cuando alguna quede sin completar, se agregan al archivo TXT junto con la idea de proyecto, la decisión entre sitio y landing page, el resultado del juego y el registro de actividades. De este modo se genera una única evidencia descargable para entregar mediante Classroom.

### Corrección de navegación en celulares

Durante una prueba desde un teléfono se observó que, al seleccionar una opción del menú, cambiaba la sección activa pero la página se desplazaba hacia el inicio general. Como en la disposición móvil el menú se encuentra encima del contenido, el estudiante permanecía visualmente en el menú y podía interpretar que la opción no había funcionado. Se modificó la navegación para que, en pantallas de hasta 850 píxeles, el desplazamiento termine directamente en el comienzo de la sección seleccionada. En pantallas grandes se mantiene el desplazamiento habitual hacia la parte superior.

En una segunda prueba móvil, el paso 4 de «De la carpeta a Internet» se extendía fuera de la pantalla al mostrar la URL completa en orientación vertical. Las direcciones web son cadenas largas sin espacios y algunos navegadores evitan dividirlas automáticamente. Se ajustaron los ejemplos para que puedan repartirse visualmente entre varias líneas y se limitó el ancho mínimo de los elementos de la lección. La URL conserva todos sus caracteres y su significado, pero ya no debería generar desplazamiento horizontal.

---

## Plantilla para próximas entradas

### Fecha y versión

### Objetivo

### Situación observada

### Evidencia disponible

### Decisión tomada

### Fundamento pedagógico

### Cambio realizado

### Resultado de la prueba

### Interpretación o hipótesis

### Preguntas abiertas

### Siguiente paso


## Entrega para Classroom en PDF

La docente comunica que probó CursoHTML con sus estudiantes y considera que funcionó; es una valoración docente, aún sin análisis sistemático. También observó edición del archivo de entrega. Solicita una barrera práctica, sin controles estrictos. Se sustituye la descarga TXT por un informe que se guarda como PDF mediante la impresión del navegador. Conserva nombre, ideas, actividades, juego y reflexiones; el avance local permanece. No se presenta el PDF como evidencia inalterable. La modificación local todavía debe publicarse para llegar al sitio de GitHub.
