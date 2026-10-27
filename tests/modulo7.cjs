const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const target=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname.replace(/^\/$/,'/index.html')));if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(target,(err,data)=>{if(err){res.writeHead(404);return res.end();}res.setHeader('Content-Type',target.endsWith('.js')?'application/javascript':target.endsWith('.css')?'text/css':'text/html');res.end(data);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;try{
 const base='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const ctx=await browser.newContext({viewport:{width:1366,height:900},acceptDownloads:true});await ctx.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(base);
 assert.equal(await p.locator('#nav button').count(),7);assert.equal(await p.locator('aside').count(),0);
 const ids=await p.locator('[id]').evaluateAll(es=>es.map(e=>e.id));assert.equal(ids.length,new Set(ids).size);
 fs.mkdirSync(path.join(root,'tmp'),{recursive:true});await p.screenshot({path:path.join(root,'tmp/home.png'),fullPage:true});
 await p.click('#nav-module7');await p.getByRole('button',{name:'Sí, continuar',exact:true}).click();await p.fill('#m7Name','Estudiante QA');await p.fill('#m7Team','Equipo Verde');
 await p.fill('#m7Observe','No cambia la apariencia porque las reglas son las mismas.');
 for(let i=0;i<4;i++)await p.selectOption('#m7Sort'+i,i%2?'css':'html');await p.click('#m7SortCheck');assert.match(await p.textContent('#m7SortFeedback'),/4\/4/);
 await p.click('[data-m7-check="0"]');await p.click('[data-m7-hint="0"]');await p.click('[data-m7-solution="0"]');
 const answers=['<head><link href="estilos.css" rel="stylesheet"></head>','<head><link rel="stylesheet" href="estilos.css"></head>','h1 { color: purple; }'];
 for(let i=0;i<3;i++){await p.fill('#m7Repair'+i,answers[i]);await p.click('[data-m7-check="'+i+'"]');}assert.match(await p.textContent('#m7Score'),/3\/3/);await p.fill('#m7Explain','Corregí el nombre para que coincida con el archivo CSS.');
 await p.click('#m7ToWorkshop');await p.fill('#m7Plan','Ofrecemos macetas recicladas para familias.');
 const html='<!doctype html><html lang="es"><head><title>Macetas</title><link rel="stylesheet" href="estilos.css"></head><body><header><h1>Macetas verdes</h1></header><main><p>Fabricamos macetas con material recuperado para que las familias puedan cultivar sus plantas.</p><img src="https://example.com/maceta.jpg" alt="Maceta de material recuperado" onerror="parent.unsafe=true"><script>parent.unsafe=true<\/script></main></body></html>',css='body{background-color:white;color:darkgreen;font-family:Arial,sans-serif}h1{text-align:center;color:purple}';
 await p.fill('#m7HTML',html);await p.fill('#m7CSS',css);await p.click('#m7Check');assert.equal(await p.locator('#m7Checks .ok').count(),6);assert.equal(await p.evaluate(()=>window.unsafe),undefined);
 const frame=p.frameLocator('#m7Preview');assert.equal(await frame.locator('h1').evaluate(e=>getComputedStyle(e).color),'rgb(128, 0, 128)');
 await p.fill('#m7HTML',html.replace('estilos.css','error.css'));await p.click('#m7Check');assert.notEqual(await frame.locator('h1').evaluate(e=>getComputedStyle(e).color),'rgb(128, 0, 128)');
 await p.fill('#m7HTML',html);await p.click('#m7Check');
 let download=p.waitForEvent('download');await p.click('#m7Download');await(await download).saveAs(path.join(root,'tmp/project.zip'));
 download=p.waitForEvent('download');await p.click('#m7Backup');await(await download).saveAs(path.join(root,'tmp/backup.json'));
 await p.fill('#m7Peer','Mi compañero entendió el producto y leyó todo.');await p.fill('#m7Change','Mejoramos el contraste.');await p.fill('#m7Test','Cambié color del título a violeta y se actualizó.');await p.click('#m7ToClose');
 for(let i=1;i<=4;i++)await p.fill('#m7Reflect'+i,'Reflexión individual '+i);await p.selectOption('#m7Confidence',{index:1});
 await p.fill('#m7URL','file:///C:/mi-pagina/index.html');await p.click('#m7Report');assert.match(await p.textContent('#m7ReportStatus'),/enlace web válido/);
 await p.fill('#m7URL','https://example.com/macetas');await p.click('#m7Report');assert.match(await p.textContent('#m7ReportStatus'),/marcá la casilla/);await p.check('#m7LinkTested');
 const popup=p.waitForEvent('popup');await p.click('#m7Report');const report=await popup;await report.waitForLoadState();const text=await report.textContent('pre');assert.ok(!text.includes('Actividad incompleta'));assert.match(text,/Pistas: 1; solución consultada: sí/);assert.match(text,/Intento 2/);assert.match(text,/7. INDEX.HTML/);assert.match(text,/8. ESTILOS.CSS/);assert.equal(await report.locator('a').getAttribute('href'),'https://example.com/macetas');await report.pdf({path:path.join(root,'tmp/report.pdf'),format:'A4'});await report.close();
 assert.match(await p.locator('#module7Close [data-delivery-status="7"]').textContent(),/Informe abierto/);
 await p.fill('#m7Reflect4','Una respuesta actualizada');assert.match(await p.locator('#module7Close [data-delivery-status="7"]').textContent(),/PDF actualizado/);
 await p.reload();await p.evaluate(()=>go('module7Workshop'));if(await p.locator('#deliveryGuard').isVisible())await p.getByRole('button',{name:'Sí, continuar',exact:true}).click();assert.equal(await p.inputValue('#m7HTML'),html);
 // Recuperar el respaldo en otro navegador sin depender del almacenamiento anterior.
 const other=await browser.newContext();await other.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());const q=await other.newPage();await q.goto(base);await q.evaluate(()=>go('module7Workshop'));await q.getByRole('button',{name:'Sí, continuar',exact:true}).click();q.on('dialog',d=>d.accept());await q.setInputFiles('#m7Restore',path.join(root,'tmp/backup.json'));await q.waitForFunction(()=>document.getElementById('m7RestoreStatus').textContent.includes('recuperado'));assert.equal(await q.inputValue('#m7HTML'),html);assert.equal(await q.inputValue('#m7Name'),'Estudiante QA');await other.close();
 for(const width of [1366,390,320]){await p.setViewportSize({width,height:900});for(const id of ['home','module7','module7Workshop','module7Close','deliveries']){await p.evaluate(id=>go(id),id);if(await p.locator('#deliveryGuard').isVisible())await p.getByRole('button',{name:'Sí, continuar',exact:true}).click();assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'sin desborde '+id+' '+width);} }
 await p.setViewportSize({width:1366,height:900});await p.evaluate(()=>go('module7Workshop'));if(await p.locator('#deliveryGuard').isVisible())await p.getByRole('button',{name:'Sí, continuar',exact:true}).click();await p.screenshot({path:path.join(root,'tmp/workshop.png'),fullPage:true});assert.deepEqual(errors,[]);console.log('OK: navegación, misiones, CSS conectado, vista segura, ZIP, respaldo entre notebooks, PDF con enlace y móvil.');
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}})().catch(e=>{console.error(e);process.exitCode=1;});
