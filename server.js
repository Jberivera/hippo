var http = require("http");
var url = require("url");
var requestHandlers = require("./requestHandlers");
var port = Number(process.env.PORT || 5000);
function iniciar(route, handle) {
    http.createServer(function (req, res) {
        var pathname = url.parse(req.url).pathname;
        setData(handle, pathname);
        route(handle, pathname, res);

    }).listen(port);
    console.log("Listening on " + port);
}
function setData(handle, pathname) {
    var sub = pathname.substring(pathname.length - 3, pathname.length);
    if (!handle[pathname] && (sub === ".js" || sub === "css" || sub === "son" || sub === "png" || sub === "svg")) {
        handle[pathname] = requestHandlers.data;
    }
}
exports.iniciar = iniciar;
