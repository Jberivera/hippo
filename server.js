var http = require("http");
var url=require("url");
var port = Number(process.env.PORT || 5000);
function iniciar(route, handle){
	http.createServer(function(req, res){

		var pathname= url.parse(req.url).pathname;
		console.log("Peticion para "+ pathname +" Recibida");
		route(handle,pathname,res);

	}).listen(port);
	console.log("Servidor Iniciado");
}
exports.iniciar=iniciar;
