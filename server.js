var http = require("http");
var url=require("url");
var requestHandlers=require("./requestHandlers");
var port = Number(process.env.PORT || 5000);
function iniciar(route, handle){
	http.createServer(function(req, res){
		var pathname= url.parse(req.url).pathname;
        setHandle(handle,pathname);
		console.log("Peticion para "+ pathname +" Recibida");
		route(handle,pathname,res);

	}).listen(port);
	console.log("Listening on "+port);
}
function setHandle(handle,pathname){
    var sub=pathname.substring(pathname.length-3,pathname.length);
    switch (sub){
        case ".js":handle[pathname]=requestHandlers.js;
            break;
        case "css":handle[pathname]=requestHandlers.css;
            break;
        case "son":handle[pathname]=requestHandlers.json;
            break;
        case "png":handle[pathname]=requestHandlers.png;
            break;
        case "svg":handle[pathname]=requestHandlers.svg;
            break;
    }
}
exports.iniciar=iniciar;
