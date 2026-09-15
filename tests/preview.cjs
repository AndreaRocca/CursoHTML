// Vista local para revisión docente: node tests/preview.cjs
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
http.createServer((req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname;
  let file;
  try{file=path.resolve(root,'.'+decodeURIComponent(pathname==='/'?'/index.html':pathname));}catch{res.writeHead(400);res.end();return;}
  if(!file.startsWith(root+path.sep)||file.includes(path.sep+'.git'+path.sep)||file.includes(path.sep+'tmp'+path.sep)){res.writeHead(403);res.end();return;}
  fs.readFile(file,(error,body)=>{
    if(error){res.writeHead(404);res.end();return;}
    const types={'.html':'text/html','.js':'application/javascript','.css':'text/css'};
    res.setHeader('Content-Type',(types[path.extname(file)]||'application/octet-stream')+'; charset=utf-8');res.end(body);
  });
}).listen(4173,'127.0.0.1',()=>console.log('Vista local: http://127.0.0.1:4173/#module3'));
