"use strict";

function route(handle, pathname, res) {
    //console.log("Ruteando " + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](res, pathname);
    } else {
        console.log("No se encontro manipulador para " + pathname);
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write("Holy 404 Error, Batman!");
        res.end();
    }
}
exports.route = route;
