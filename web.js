#!/usr/bin/env node

var server = require("./server");
var router=require("./router");
var requestHandlers=require("./requestHandlers");

var handle={};
handle["/"]=requestHandlers.index;
handle["/holamundo"]=requestHandlers.holamundo;

server.iniciar(router.route, handle);
