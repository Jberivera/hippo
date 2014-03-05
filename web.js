#!/usr/bin/env node

var server = require("./server");
var router=require("./router");
var requestHandlers=require("./requestHandlers");

var handle={};
handle["/"]=requestHandlers.index;
handle["http://tranquil-reaches-4333.herokuapp.com/"]=requestHandlers.index;
handle["/holamundo"]=requestHandlers.holamundo;
handle["/css/base.css"]=requestHandlers.css;
handle["/js/init.js"]=requestHandlers.js;
handle["/js/scene1.js"]=requestHandlers.js;
handle["/lan/en.json"]=requestHandlers.json;
handle["/lan/es.json"]=requestHandlers.json;
handle["/config/scene1-config.json"]=requestHandlers.json;
handle["/assets/init/scene1.png"]=requestHandlers.img;
handle["/assets/init/setting-icon48.png"]=requestHandlers.img;
handle["/assets/scene1/1/backg/landscape1.svg"]=requestHandlers.svg;
handle["/assets/scene1/1/backg/landscape2.svg"]=requestHandlers.svg;
handle["/assets/scene1/1/backg/landscape3.svg"]=requestHandlers.svg;
handle["/assets/scene1/1/backg/landscape4.svg"]=requestHandlers.svg;
handle["/assets/scene1/1/img/cat.svg"]=requestHandlers.svg;
handle["/assets/scene1/1/img/chicken.svg"]=requestHandlers.svg;
handle["/assets/scene1/1/img/cow.svg"]=requestHandlers.svg;
handle["/assets/scene1/1/img/dog.svg"]=requestHandlers.svg;
handle["/assets/scene1/1/img/frog.svg"]=requestHandlers.svg;
handle["/assets/scene1/1/img/horse.svg"]=requestHandlers.svg;
handle["/assets/scene1/1/img/pig.svg"]=requestHandlers.svg;
handle["/assets/scene1/1/img/rabbit.svg"]=requestHandlers.svg;
handle["/assets/scene1/1/img/sheep.svg"]=requestHandlers.svg;
handle["/assets/scene1/1/img/wolf.svg"]=requestHandlers.svg;

server.iniciar(router.route, handle);
