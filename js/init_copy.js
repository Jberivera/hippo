/**
 * Created by jberivera
 */

var stage;
var loader;
var lan;
var config;

var canvas = document.getElementById("myCanvas");
//var ctx=canvas.getContext("2d");

var container = document.getElementById("container");
container.style.width = "100%";
container.style.height = window.innerHeight + "px";

var init = function () {
    console.log("init()");
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    stage = new createjs.Stage(canvas);

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest([
        {id: "lan", src: "lan/es.json", type: createjs.LoadQueue.JSON},
        {id: "config", src: "lan/scene1-config.json", type: createjs.LoadQueue.JSON}
    ]);
};
var handleComplete = function (event) {
    console.log("handleComplete()");

    lan = loader.getResult("lan");
    config = loader.getResult("config");

    new background(config.stage1.backg[0].backgUrl);
    new background(config.stage1.backg[1].backgUrl);
    new background(config.stage1.backg[2].backgUrl);
    new background(config.stage1.backg[3].backgUrl, true);
};

var background = function (src, boolean) {
    var background = new Image();
    background.src = src;
    background.onload = function (event) {
        handleImageLoad(event, boolean);
    };
};
var handleImageLoad = function (event, boolean) {
    var image = event.target;
    var bitmap = new createjs.Bitmap(image);
    bitmap.scaleX = canvas.width / bitmap.image.width;
    bitmap.scaleY = canvas.height / bitmap.image.height;

    stage.addChild(bitmap);
    stage.update();

    if (boolean) {
        console.log(lan.stage1.length);
        for (var i = 0; i < lan.stage1.length; i++) {
            new circle(i);
        }
    }
};
var circle = function (i) {
    var circle = new createjs.Shape();
    circle.graphics.beginFill("#" + Math.floor(Math.random() * 999)).drawCircle(0, 0, 50); //Next lan.satage1[i].color
    var label = new createjs.Text(lan.stage1[i].drag, "bold 14px Arial", "#FFFFFF");
    label.textAlign = "center";
    label.y = -7;

    var dragger = new createjs.Container();
    dragger.x = dragger.y = 100;
    dragger.addChild(circle, label);
    stage.addChild(dragger);

    dragger.on("pressmove", function (evt) {
        // currentTarget will be the container that the event listener was added to:
        evt.currentTarget.x = evt.stageX;
        evt.currentTarget.y = evt.stageY;
        // make sure to redraw the stage to show the change:
        stage.update();
    });
    stage.update();
};
