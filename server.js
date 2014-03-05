var http = require("http");
var url=require("url");

function iniciar(route, handle){
	http.createServer(function(req, res){

		var pathname= url.parse(req.url).pathname;
		console.log("Peticion para "+ pathname +" Recibida");
		route(handle,pathname,res);

	}).listen(8888);
	console.log("Servidor Iniciado");
}
exports.iniciar=iniciar;
