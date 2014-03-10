
var fs=require('fs');

function index(res,pathname){
	console.log("Manipulador de peticion 'iniciar' ha sido llamado.");
	fs.readFile("index.html","utf8",function(err,data){
        res.writeHead(200,{"Content-Type":"text/html"});
        if(err){
            res.write("Ups, that's awkward");
        }else{
            res.write(data);
        }
        res.end();
    });
}
function css(res,pathname){
    console.log("Manipulador de peticion 'CSS' ha sido llamado.");
    fs.readFile("css/base.css","utf8",function(err,data){
        res.writeHead(200,{"Content-Type":"text/css"});
        if(err){
            res.write("Ups, that's awkward");
        }else{
            res.end(data);
        }
    });
}

function js(res,pathname){
    var path=pathname.substring(1);
    console.log("Manipulador de peticion 'JS' ha sido llamado. ");
    fs.readFile(path,"utf8",function(err,data){
        res.writeHead(200,{"Content-Type":"application/javascript"});
        if(err){
            res.write("Ups, that's awkward");
        }else{
            res.end(data);
        }
    });
}

function json(res,pathname){
    var path=pathname.substring(1);
    console.log("Manipulador de peticion 'JSON' ha sido llamado. ");
    fs.readFile(path,"utf8",function(err,data){
        res.writeHead(200,{"Content-Type":"text/plain"});
        if(err){
            res.write("Ups, that's awkward");
        }else{
            res.end(data);
        }
    });
}

function png(res,pathname){
    var path=pathname.substring(1);
    console.log("Manipulador de peticion 'IMG' ha sido llamado. ");
    var image=fs.readFileSync(path);
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(image, 'binary');
}

function svg(res,pathname){
    var path=pathname.substring(1);
    console.log("Manipulador de peticion 'SVG' ha sido llamado. ");
    var image=fs.readFileSync(path);
    res.writeHead(200, {'Content-Type': 'image/svg+xml' });
    res.end(image, 'binary');
}

function holamundo(res,pathname){
	console.log("Manipulador de peticion 'subir' ha sido llamado.");
	res.writeHead(200,{"Content-Type":"text/html"});
	res.write("Cual hola mundo, no seas pendejo");
	res.end();
}
exports.index=index;
exports.holamundo=holamundo;
exports.css=css;
exports.js=js;
exports.png=png;
exports.json=json;
exports.svg=svg;
