// Ejecutar con Node y Playwright. QA local, sin publicar respuestas ni imágenes.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const target=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname.replace(/^\/$/,'/index.html')));if(!target.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}fs.readFile(target,(e,data)=>{if(e){res.writeHead(404);res.end();return;}res.setHeader('Content-Type',target.endsWith('.js')?'application/javascript':target.endsWith('.css')?'text/css':'text/html');res.end(data);});});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;let browser;
 try{
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const context=await browser.newContext({viewport:{width:1366,height:900},acceptDownloads:true});
 await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base);
 assert.equal(await page.locator('#nav button').count(),8);
 const ids=await page.locator('[id]').evaluateAll(es=>es.map(e=>e.id));assert.equal(ids.length,new Set(ids).size);
 assert.match(await page.textContent('#nav-m1'),/Módulo 1/);assert.ok(!(await page.textContent('#m0')).includes('Módulo 0'));
 // Recuperación de progreso antiguo: m0 continúa conservado; ya no es una entrega.
 await page.evaluate(()=>{state.done=['m0','m1'];state.projectIdea='SOLO-MODULO-1';state.moduleTwoProject={m2ProjectName:'SOLO-MODULO-2'};persist();});await page.reload();assert.equal(await page.evaluate(()=>state.done.includes('m0')),true);assert.equal(await page.textContent('#progressText'),'25%');
 // Un informe por módulo y no se confunde abrirlo con descargarlo.
 for(const n of [1,2]){
   await page.evaluate(()=>go('home'));await page.evaluate(n=>openDelivery(n===1?'class1':'module2'),n);await page.fill('#studentName','Estudiante QA');
   const promise=page.waitForEvent('popup');await page.click('button[onclick="downloadWork()"]');const report=await promise;await report.waitForLoadState();const text=await report.textContent('pre');
   assert.match(text,new RegExp('ENTREGA DEL MÓDULO '+n));assert.ok(text.includes('SOLO-MODULO-'+n));assert.ok(!text.includes('SOLO-MODULO-'+(n===1?2:1)));await report.close();
   assert.match(await page.locator('#delivery [data-delivery-status="'+n+'"]').textContent(),/Informe abierto/);
   await page.locator('#delivery [data-delivery-confirm="'+n+'"]').click();assert.match(await page.locator('#delivery [data-delivery-status="'+n+'"]').textContent(),/guardaste/);
 }
 // Cambiar la respuesta de M2 vuelve a exigir una versión actualizada.
 await page.evaluate(()=>go('module2'));await page.fill('#m2ProjectName','SOLO-MODULO-2-EDITADO');await page.evaluate(()=>saveModuleTwoProject());await page.click('#nav-module3');assert.equal(await page.locator('#deliveryGuard').isVisible(),true);await page.getByRole('button',{name:'Revisar el cierre y PDF',exact:true}).click();assert.match(await page.locator('#delivery [data-delivery-status="2"]').textContent(),/actualizado/);assert.equal(await page.locator('#delivery [data-delivery-confirm="2"]').isDisabled(),true);
 await page.click('#nav-module3');await page.getByRole('button',{name:'Continuar; lo revisaré en Classroom',exact:true}).click();assert.equal(await page.locator('#module3').isVisible(),true);
 // M3 conserva informe propio y su declaración de guardado.
 await page.fill('#m3Name','Estudiante QA');await page.evaluate(()=>{document.getElementById('m3DeliveryType').value='file';document.getElementById('m3DeliveryType').dispatchEvent(new Event('change'));go('module3Close');});
 const p3=page.waitForEvent('popup');await page.click('#m3Report');const report3=await p3;await report3.waitForLoadState();assert.match(await report3.textContent('pre'),/MÓDULO 3/);assert.ok(!(await report3.textContent('pre')).includes('SOLO-MODULO-2'));await report3.close();await page.locator('#module3Close [data-delivery-confirm="3"]').click();
 await page.click('#nav-module4');if(await page.locator('#deliveryGuard').isVisible())await page.getByRole('button',{name:'Sí, continuar',exact:true}).click();await page.fill('#m4Name','Estudiante QA');await page.fill('#m4Observe','El porcentaje modifica el ancho disponible.');
 await page.click('[data-m4-check="0"]');await page.click('[data-m4-hint="0"]');await page.click('[data-m4-solution="0"]');
 const sample=await page.inputValue('#m4SampleCode');const solutions=['<h1 style="color:purple;">Taller Verde</h1>',sample,'<ol><li>Elegir</li><li>Confirmar</li></ol>','<p>La inscripción es <strong>gratuita</strong>.</p>','<h2 style="color:darkgreen;font-family:Georgia,serif;">Nuestras propuestas</h2>'];
 for(let i=0;i<5;i++){await page.fill('#m4Repair'+i,solutions[i]);await page.click('[data-m4-check="'+i+'"]');}
 assert.match(await page.textContent('#m4RepairScore'),/5\/5/);await page.fill('#m4Repair0','<p>Roto</p>');assert.match(await page.textContent('#m4RepairScore'),/4\/5/);await page.fill('#m4Repair0',solutions[0]);await page.click('[data-m4-check="0"]');
 await page.click('#m4ToWorkshop');const before=await page.evaluate(()=>state.moduleThree.code);await page.click('#m4Import');assert.equal(await page.inputValue('#m4Code'),before);
 const code='<h1 style="color:purple;font-family:Georgia,serif;">SOLO-MODULO-4</h1><p>Inscripción <strong>gratuita</strong>.</p>'+sample+'<ol><li>Elegir</li><li>Confirmar</li></ol>';
 await page.fill('#m4Code',code);await page.click('#m4Check');assert.equal(await page.locator('#m4Checks .ok').count(),6);assert.equal(await page.evaluate(()=>state.moduleThree.code),before);
 await page.reload();await page.click('#nav-module4');if(await page.locator('#deliveryGuard').isVisible())await page.getByRole('button',{name:'Sí, continuar',exact:true}).click();await page.click('#m4ToWorkshop');assert.equal(await page.inputValue('#m4Code'),code);assert.match(await page.textContent('#m4RepairScore'),/5\/5/);
 const d=page.waitForEvent('download');await page.click('#m4Download');assert.equal((await d).suggestedFilename(),'modulo4.html');
 // Vista aislada: imágenes y CSS permitidos; script/eventos/navegación eliminados.
 await page.fill('#m4Code','<script>parent.__bad=1</script><img src="https://example.invalid/a.png" onerror="parent.__bad=2"><a href="javascript:alert(1)">X</a><p style="color:purple;background-image:url(https://example.invalid/t)">Texto</p>');await page.click('#m4Check');
 const frame=page.frameLocator('#m4Preview');assert.equal(await frame.locator('script').count(),0);assert.equal(await frame.locator('[onerror],[href]').count(),0);assert.equal(await page.evaluate(()=>window.__bad),undefined);assert.equal(await frame.locator('p').evaluate(e=>e.style.backgroundImage),'');assert.equal(await frame.locator('p').evaluate(e=>e.style.color),'purple');
 await page.fill('#m4Code',code);await page.click('#m4Check');await page.click('#m4ToClose');await page.selectOption('#m4DeliveryType','file');
 const popup=page.waitForEvent('popup');await page.click('#m4Report');const report=await popup;await report.waitForLoadState();const text=await report.textContent('pre');assert.match(text,/MÓDULO 4/);assert.match(text,/Actividad incompleta/);assert.ok(text.includes(code));assert.match(text,/Intento 1/);assert.match(text,/pistas: 1/);assert.ok(!text.includes('SOLO-MODULO-2'));await report.close();
 await page.locator('#module4Close [data-delivery-confirm="4"]').click();await page.click('#m4BackWorkshop');await page.fill('#m4Code',code+'<p>Un cambio posterior</p>');await page.click('#m4ToClose');assert.match(await page.locator('#module4Close [data-delivery-status="4"]').textContent(),/actualizado/);
 // Popup bloqueado no debe registrar una preparación nueva.
 const prepared=await page.evaluate(()=>state.moduleDeliveries[4].preparedAt);await page.evaluate(()=>{window.originalOpen=window.open;window.open=()=>null;});await page.click('#m4Report');assert.match(await page.textContent('#m4ReportStatus'),/Permití/);assert.equal(await page.evaluate(()=>state.moduleDeliveries[4].preparedAt),prepared);await page.evaluate(()=>window.open=window.originalOpen);
 for(const width of [390,320]){await page.setViewportSize({width,height:844});for(const screen of ['module4','module4Workshop','module4Close','deliveries']){await page.evaluate(id=>go(id),screen);if(await page.locator('#deliveryGuard').isVisible())await page.getByRole('button',{name:'Sí, continuar',exact:true}).click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Sin overflow '+screen+' '+width);}}
 // Reinicio limitado a M4, sin tocar respuestas o informes de otros módulos.
 await page.evaluate(()=>go('module4'));if(await page.locator('#deliveryGuard').isVisible())await page.getByRole('button',{name:'Sí, continuar',exact:true}).click();page.once('dialog',d=>d.accept());await page.click('#m4New');await page.waitForLoadState();await page.click('#nav-module4');if(await page.locator('#deliveryGuard').isVisible())await page.getByRole('button',{name:'Sí, continuar',exact:true}).click();assert.equal(await page.inputValue('#m4Name'),'');assert.equal(await page.evaluate(()=>state.moduleDeliveries[4]),undefined);assert.equal(await page.evaluate(()=>state.moduleTwoProject.m2ProjectName),'SOLO-MODULO-2-EDITADO');
 assert.deepEqual(errors,[]);
 await page.evaluate(()=>localStorage.setItem('webCourseState','{invalid'));await page.reload();assert.equal(await page.locator('#m4Name').count(),1);
 console.log('OK: módulos 1–4, informes separados, guardado declarado, aviso de cambio, edición invalida informe, estado previo, cinco reparaciones, seis criterios, importación M3 aislada, HTML, PDF, popup bloqueado, sandbox, móvil y reinicio.');
 await context.close();
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
