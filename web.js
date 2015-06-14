"use strict";

var server = require("./server"),
    router = require("./router"),
    requestHandlers = require("./requestHandlers");

var handler = {};

handler["/"] = requestHandlers.index;
server.startServer(router.route, handler);
