// Ejecutar: node tests/modulo3.cjs. Requiere Playwright y Chrome instalado.
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(__dirname,'..');
const main=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const m of main.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
new vm.Script(fs.readFileSync(path.join(root,'modulo3.js'),'utf8'));
const server=http.createServer((req,res)=>{
  const name=new URL(req.url,'http://localhost').pathname;
  const target=path.resolve(root,'.'+decodeURIComponent(name==='/'?'/index.html':name));
  if(!target.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  fs.readFile(target,(error,body)=>{if(error){res.writeHead(404);res.end();return;}
    res.setHeader('Content-Type',target.endsWith('.js')?'application/javascript':target.endsWith('.css')?'text/css':'text/html');res.end(body);});
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const url='http://127.0.0.1:'+server.address().port;
  let browser;
  try{
    browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
    const context=await browser.newContext({viewport:{width:1366,height:900},acceptDownloads:true});
    await context.route('**/*',route=>{
      const target=route.request().url();
      if(target.startsWith(url))return route.continue();
      // Verificar navegación sin depender de Internet ni cargar sitios externos.
      if(target==='https://andrearocca.github.io/CursoHTML/')return route.fulfill({contentType:'text/html',body:'<!doctype html><title>Destino de prueba</title><p>Enlace abierto.</p>'});
      return route.abort();
    });
    const page=await context.newPage();const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(url);await page.click('#nav-module3');
    assert.equal(await page.locator('#module3').isVisible(),true);
    const ids=await page.locator('[id]').evaluateAll(nodes=>nodes.map(n=>n.id));assert.equal(ids.length,new Set(ids).size);
    const studentContent=await page.locator('.screen').allTextContents();
    assert.ok(!studentContent.join(' ').match(/\b\d+\s*(?:[–+\-]\s*\d+\s*)?(?:min(?:utos)?|segundos)\b/i),'Sin tiempos en las pantallas de estudiantes');
    assert.equal(await page.locator('#m3CopyTrial').count(),1);
    assert.match(await page.textContent('#m3TrialCode'),/Mi primera página/);
    assert.match(await page.textContent('#m3TrialCode'),/target="_blank"/);
    assert.match(await page.textContent('#module3Share'),/YachayCodex/);
    assert.ok(!(await page.textContent('#module3Share')).includes('CodePen'));
    assert.match(await page.textContent('#module3Workshop'),/Revisá y mejorá tu trabajo/);
    await page.fill('#m3Name','Estudiante Prueba');await page.fill('#m3Observe','Ahora se distingue el título.');
    await page.reload();await page.click('#nav-module3');assert.equal(await page.inputValue('#m3Name'),'Estudiante Prueba');
    // Error, solución consultada y tres reparaciones auténticas.
    await page.click('[data-repair="0"]');assert.match(await page.textContent('#m3RepairFeedback0'),/Todavía/);
    await page.click('[data-solution="0"]');
    const repairCode=[
      '<a href="https://andrearocca.github.io/CursoHTML/">Conocer el curso</a>',
      '<h1>Taller Verde</h1><p>Aprendé a cuidar tus plantas.</p>',
      '<ul><li>Sembrar</li><li>Compartir</li></ul>'
    ];
    for(let i=0;i<3;i++){await page.fill('#m3Repair'+i,repairCode[i]);await page.click('[data-repair="'+i+'"]');}
    assert.match(await page.textContent('#m3RepairScore'),/3\/3/);
    await page.frameLocator('#m3RepairPreview0').getByRole('link',{name:'Conocer el curso'}).waitFor();
    assert.ok((await page.locator('#m3RepairPreview0').boundingBox()).height<=150,'Vista compacta de enlace');
    const previewPopupPromise=page.waitForEvent('popup');
    await page.frameLocator('#m3RepairPreview0').getByRole('link',{name:'Conocer el curso'}).click();
    const previewPopup=await previewPopupPromise;await previewPopup.waitForLoadState();
    assert.equal(previewPopup.url(),'https://andrearocca.github.io/CursoHTML/');await previewPopup.close();
    assert.ok(await page.locator('#module3').isVisible(),'El enlace no cambia la pantalla del curso');
    await page.click('#m3ToWorkshop');await page.fill('#m3Project','Club del Libro');
    const code=`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Club del Libro</title></head><body><h1>Club del Libro</h1><p>Lecturas para jóvenes del barrio.</p><h2>Actividades</h2><ul><li>Leer novelas</li><li>Intercambiar libros</li><li>Debatir historias</li></ul><h2>Sumate a leer</h2><p>Encontrá una historia para compartir.</p><a href="https://example.org/">Ver la biblioteca</a></body></html>`;
    await page.fill('#m3Code',code);await page.frameLocator('#m3Preview').locator('h1').waitFor();
    assert.equal(await page.frameLocator('#m3Preview').locator('h1').textContent(),'Club del Libro');
    await page.click('#m3Check');assert.equal(await page.locator('#m3Checks li.ok').count(),7);
    const downloaded=page.waitForEvent('download');await page.click('#m3Download');const download=await downloaded;
    assert.equal(download.suggestedFilename(),'index.html');assert.equal(fs.readFileSync(await download.path(),'utf8'),code);
    await page.reload();await page.click('#nav-module3');await page.click('#m3ToWorkshop');assert.equal(await page.inputValue('#m3Code'),code);
    await page.click('#m3ToShare');await page.selectOption('#m3DeliveryType','link');await page.fill('#m3Url','file:///C:/mi-web/index.html');await page.click('#m3ToClose');await page.click('#m3Report');assert.match(await page.textContent('#m3ReportStatus'),/URL completa/);
    for(const empty of ['https://codepen.io/pen/','https://app.yachaycodex.dev/','https://app.yachaycodex.dev/shared/']){
      await page.click('#m3BackShare');await page.fill('#m3Url',empty);await page.click('#m3ToClose');await page.click('#m3Report');assert.match(await page.textContent('#m3ReportStatus'),/URL completa/);
    }
    await page.click('#m3BackShare');await page.selectOption('#m3DeliveryType','file');await page.click('#m3ToClose');await page.fill('#m3Reflect1','h1 presenta el título y p un párrafo.');
    // Datos de clases anteriores no deben aparecer en este informe.
    await page.evaluate(()=>{state.projectIdea='NO-INCLUIR-CLASE1';state.moduleTwoProject={m2ProjectName:'NO-INCLUIR-CLASE2'};persist();});
    const popupPromise=page.waitForEvent('popup');await page.click('#m3Report');const report=await popupPromise;await report.waitForLoadState();
    const content=await report.textContent('pre');assert.ok(content.includes(code));assert.ok(content.includes('Estudiante Prueba'));assert.ok(content.includes('Intentos: 2'));assert.ok(content.includes('Consultó una solución: sí'));assert.ok(!content.includes('NO-INCLUIR'));
    assert.equal(await report.locator('button').textContent(),'Guardar como PDF');await report.close();
    // Exportación mínima para análisis docente: sin identidad ni producciones.
    const metricsDownload=page.waitForEvent('download');await page.click('#m3Metrics');const metricsFile=await metricsDownload;
    assert.equal(metricsFile.suggestedFilename(),'metricas-modulo3.json');
    const metricsText=fs.readFileSync(await metricsFile.path(),'utf8');const metrics=JSON.parse(metricsText);
    assert.equal(metrics.schema,'cursohtml-m3-metricas');assert.equal(metrics.version,1);
    assert.deepEqual(metrics.repairAttempts,[2,1,1]);assert.deepEqual(metrics.repairSolutions,[true,false,false]);
    assert.equal(metrics.reflectionAnswered[0],true);assert.equal(metrics.deliveryType,'file');
    for(const privateValue of ['Estudiante Prueba','Club del Libro','NO-INCLUIR','https://example.org/','h1 presenta el título'])assert.ok(!metricsText.includes(privateValue));
    const dashboard=await context.newPage();await dashboard.goto(url+'/investigacion/metricas.html');
    await dashboard.locator('#files').setInputFiles([
      {name:'alumno-a.json',mimeType:'application/json',buffer:Buffer.from(metricsText)},
      {name:'alumno-b.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...metrics,repairAttempts:[1,3,2],repairSolutions:[false,true,false],deliveryType:'link',peerFeedback:true}))},
      {name:'otro.json',mimeType:'application/json',buffer:Buffer.from('{"name":"No válido"}')}
    ]);
    await dashboard.getByText('2 archivo(s) válido(s) cargado(s). 1 rechazado(s). No se enviaron datos.').waitFor();
    assert.match(await dashboard.locator('#repairs').textContent(),/Enlace y href1\.51\/21\/22\/2/);
    assert.match(await dashboard.locator('#summary').textContent(),/2Archivos válidos/);
    assert.ok(!(await dashboard.locator('body').textContent()).includes('Estudiante Prueba'));
    const csvDownload=dashboard.waitForEvent('download');await dashboard.click('#csv');const csv=await csvDownload;
    assert.equal(csv.suggestedFilename(),'resumen-metricas-modulo3.csv');
    assert.ok(fs.readFileSync(await csv.path(),'utf8').includes('Enlace y href: solución consultada'));
    await dashboard.click('#clear');assert.equal(await dashboard.locator('#results').isVisible(),false);await dashboard.close();
    // Enlace incluido como anchor seguro y solo si se elige ese modo.
    await page.click('#m3BackShare');await page.selectOption('#m3DeliveryType','link');await page.fill('#m3Url','https://app.yachaycodex.dev/shared/8bd91167a1dec46a118c2fc5a0ee25d3');await page.check('#m3LinkTested');await page.click('#m3ToClose');
    const linkedPromise=page.waitForEvent('popup');await page.click('#m3Report');const linked=await linkedPromise;await linked.waitForLoadState();assert.equal(await linked.locator('a').getAttribute('href'),'https://app.yachaycodex.dev/shared/8bd91167a1dec46a118c2fc5a0ee25d3');await linked.close();
    // Bloqueo de ventana: no pierde la producción y da una instrucción.
    await page.evaluate(()=>{window.open=()=>null;});await page.click('#m3Report');assert.match(await page.textContent('#m3ReportStatus'),/Permití abrir/);
    await page.reload();await page.click('#nav-module3');await page.click('#m3ToWorkshop');
    // Código activo no puede ejecutar scripts en la vista ni acceder al curso.
    await page.fill('#m3Code','<h1>Prueba segura</h1><script>parent.document.body.innerHTML="ATAQUE"</script><img src="https://example.org/imagen.png" onerror="alert(1)"><a href="javascript:alert(1)">Enlace riesgoso</a>');
    await page.waitForTimeout(100);assert.equal(await page.locator('#nav-module3').count(),1);
    assert.equal(await page.frameLocator('#m3Preview').locator('script').count(),0);
    assert.equal(await page.frameLocator('#m3Preview').locator('a[href]').count(),0);
    await page.fill('#m3Code',code);
    await page.frameLocator('#m3Preview').locator('h1').waitFor();
    if(process.env.QA_DIR){
      fs.mkdirSync(process.env.QA_DIR,{recursive:true});
      await page.locator('#m3Code').evaluate(el=>{el.scrollTop=0;el.scrollLeft=0;});
      await page.locator('#m3Code').scrollIntoViewIfNeeded();await page.waitForTimeout(250);
      await page.screenshot({path:path.join(process.env.QA_DIR,'taller-desktop.png')});
    }
    for(const width of [390,320]){
      await page.setViewportSize({width,height:844});await page.click('#nav-module3');await page.waitForTimeout(400);
      assert.ok(await page.evaluate(()=>window.scrollY>0));
      for(const button of ['m3ToWorkshop','m3ToShare','m3ToClose']){
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false,'Sin overflow móvil antes de '+button+' a '+width);
        await page.click('#'+button);
        if(process.env.QA_DIR&&width===390&&button==='m3ToWorkshop'){
          await page.locator('#m3Preview').scrollIntoViewIfNeeded();await page.waitForTimeout(250);
          await page.screenshot({path:path.join(process.env.QA_DIR,'taller-movil.png')});
        }
      }
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    }
    await page.setViewportSize({width:1366,height:900});await page.click('#nav-module3');
    // Las entregas anteriores continúan por su propia ruta.
    for(const mode of ['module2','class1']){
      await page.evaluate(mode=>openDelivery(mode),mode);await page.fill('#studentName','Prueba previa');
      const oldPromise=page.waitForEvent('popup');await page.click('button[onclick="downloadWork()"]');const oldReport=await oldPromise;await oldReport.waitForLoadState();
      const oldText=await oldReport.textContent('pre');assert.ok(!oldText.includes('CÓDIGO HTML COMPLETO'));
      assert.ok(oldText.includes(mode==='module2'?'NO-INCLUIR-CLASE2':'NO-INCLUIR-CLASE1'));await oldReport.close();
    }
    await page.click('#nav-module3');
    // Reinicio de un estudiante nuevo: solo M3, sin tocar otras clases.
    page.once('dialog',dialog=>dialog.accept());await page.click('#m3New');await page.waitForLoadState();await page.click('#nav-module3');assert.equal(await page.inputValue('#m3Name'),'');
    const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('webCourseState')));assert.equal(saved.moduleTwoProject.m2ProjectName,'NO-INCLUIR-CLASE2');assert.ok(!saved.done.includes('module3'));
    assert.deepEqual(errors,[]);
    console.log('OK: JS, IDs únicos, guardado/recarga, 3 reparaciones, 7 misiones, descarga HTML, PDF independiente, enlace seguro, popup bloqueado, aislamiento, móvil 390/320 y reinicio de M3.');
    await context.close();
    const broken=await browser.newContext();const brokenPage=await broken.newPage();await brokenPage.goto(url);await brokenPage.evaluate(()=>localStorage.setItem('webCourseState','{inválido'));await brokenPage.reload();await brokenPage.click('#nav-module3');assert.equal(await brokenPage.locator('#m3Name').count(),1);await broken.close();
    console.log('OK: recuperación ante estado JSON inválido.');
  }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
