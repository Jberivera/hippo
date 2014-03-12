var http = require("http");
var url=require("url");
var requestHandlers=require("./requestHandlers");
var port = Number(process.env.PORT || 5000);
function iniciar(route, handle){
	http.createServer(function(req, res){
		var pathname= url.parse(req.url).pathname;
        setHandle(handle,pathname);
		route(handle,pathname,res);

	}).listen(port);
	console.log("Listening on "+port);
}
function setHandle(handle,pathname){
    if(!handle[pathname]){
        handle[pathname]=requestHandlers.data;
    }
}
exports.iniciar=iniciar;
