var fs = require('fs');

function index(res, pathname) {
    fs.readFile("index.html", "utf8", function (err, data) {
        res.writeHead(200, {"Content-Type": "text/html"});
        if (err) {

        } else {
            res.write(data);
        }
        res.end();
    });
}
function data(res, pathname) {
    var sub = pathname.substring(pathname.length - 3, pathname.length);
    var path = pathname.substring(1);
    var Type;
    switch (sub) {
        case ".js":
            Type = "application/javascript";
            readFile(res,path,Type);
            break;
        case "css":
            Type = "text/css";
            readFile(res,path,Type);
            break;
        case "son":
            Type = "text/plain";
            readFile(res,path,Type);
            break;
        case "png":
            Type = "image/png";
            imgFile(res,path,Type);
            break;
        case "svg":
            Type = "image/svg+xml";
            imgFile(res,path,Type);
            break;
    }

}
function readFile(res,path, Type) {
    fs.readFile(path, "utf8", function (err, data) {
        res.writeHead(200, {"Content-Type": Type});
        if (err) {

        } else {
            res.end(data);
        }
    });
}
function imgFile(res,path,Type){
    var image = fs.readFileSync(path);
    res.writeHead(200, {'Content-Type': Type });
    res.end(image, 'binary');
}
exports.index = index;
exports.data = data;
