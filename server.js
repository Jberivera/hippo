"use strict";

var http = require("http"),
    url = require("url"),
    path = require("path"),
    requestHandlers = require("./requestHandlers");

var port = +process.env.PORT || 5000;

var format = [
    ".js",
    ".css",
    ".json",
    ".png",
    ".jpeg",
    ".jpg",
    ".svg"
];

function setData(handle, filePath) {
    if (!handle[filePath] && format.indexOf(path.extname(filePath)) >= 0) {
        handle[filePath] = requestHandlers.data;
    }
}

function startServer(route, handle) {
    http.createServer(function (req, res) {
        var pathname = url.parse(req.url).pathname;
        setData(handle, pathname);
        route(handle, pathname, res);
    }).listen(port);
    console.log("Listening on " + port);
}

exports.startServer = startServer;
