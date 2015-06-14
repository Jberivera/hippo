"use strict";

var fs = require('fs'),
    path = require("path");

var types = {
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "text/plain",
    ".png": "image/png",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpg",
    ".svg": "image/svg+xml"
};

function index(res) {
    fs.readFile("index.html", "utf8", function (err, data) {
        res.writeHead(200, {"Content-Type": "text/html"});
        if (err) {
            throw err;
        } else {
            res.write(data);
        }
        res.end();
    });
}

function data(res, filePath) {
    readFile(res, filePath.substring(1), types[path.extname(filePath)]);
}

function readFile(res, filePath, fileType) {
    res.writeHead(200, {'Content-Type': fileType });
    if (fileType.substring(0, 5) === 'image') {
        res.end(fs.readFileSync(filePath), "binary");
    } else {
        fs.readFile(filePath, "utf8", function(err, data) {
            if (err) throw err;
            res.end(data);
        });
    }
}

exports.index = index;
exports.data = data;
