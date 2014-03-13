/**
 * Created by jberivera
 */
var stage;
//Container
var container = document.getElementById("container");

if (window.innerWidth > window.innerHeight) {
    container.style.width = window.innerWidth + "px";
    container.style.height = window.innerHeight + "px";
} else {
    container.style.width = window.innerHeight + "px";
    container.style.height = window.innerWidth + "px";
}

//Canvas
var canvas = document.getElementById("myCanvas");
canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;
var Queue;
var Scenes = [null, Scene1];
var language = "es";
var init = function () {
    stage = new createjs.Stage(canvas);
    createjs.Touch.enable(stage);
    Queue = new createjs.LoadQueue();
    Queue.addEventListener("complete", selectionPanel);
    Queue.Manifest = [
        {id: "setting", src: "assets/init/setting-icon48.png"},
        {id: "scene1", src: "assets/init/scene1.png"},
        {id: "scene2", src: "assets/init/scene1.png"},
        {id: "scene3", src: "assets/init/scene1.png"},
        {id: "scene4", src: "assets/init/scene1.png"}
    ];
    Queue.loadManifest(Queue.Manifest);
};
var selectionPanel = function () {
    var rect = new createjs.Shape();
    rect.graphics.beginFill("#E8D24A").drawRect(0, 0, canvas.width, canvas.height);
    stage.addChild(rect);

    for (var i = 1; i < Queue.Manifest.length; i++) {
        new Scene(i);
    }
    new settingButton();

    stage.update();
};
var settingButton = function () {
    var setting = new createjs.Bitmap(Queue.getResult("setting"));
    setting.x = canvas.width - canvas.width*0.10;
    setting.y = 25;
    stage.addChild(setting);
    setting.on("click", function () {
        settingPanel();
    });
};
var lanvect = ["es", "en" , "es"];//Just for try
var settingPanel = function () {
    var rect = new createjs.Shape();
    rect.graphics.beginFill("#5A3EA1").drawRect(0, 0, canvas.width - 200, canvas.height - 200);
    var ok = new createjs.Shape();
    console.log(rect);
    var okwidth=rect.graphics._activeInstructions[0].params[2]*0.35;
    var okheight=rect.graphics._activeInstructions[0].params[3];
    ok.graphics.beginFill("#57998C").drawRect(okwidth, okheight-70, 370, 70);

    var settings = new createjs.Container();
    settings.x = 100;
    settings.y = 100;
    settings.addChild(rect,ok);
    for (var i = 0; i < lanvect.length; i++) {
        settings.addChild(new lanOption(lanvect[i], i).c);
    }
    settings.on("click",function(){

    });
    ok.on("click",function(){
        stage.removeChild(ok.parent);
        stage.update();
    });
    stage.addChild(settings);
    stage.update();
};
var lanOption = function (lan, i) {
    this.c=new createjs.Container();//Container
    var opt = new createjs.Shape();
    opt.graphics.beginFill("#000").drawRect(100 * (i + 1) + 150 * i, 100, 150,150);
    var label = new createjs.Text(lan, "bold 25px Arial", "#FFFFFF");
    label.textAlign = "center";
    label.x=175 * (i + 1) + 75 * i;
    label.y = 160;
    this.c.addChild(opt,label);
    var that = this;
    this.c.on("click", function () {
        language = lan;
        console.log(that.c.parent);
        var parent=that.c.parent.children;
        for(var j=2;j<parent.length;j++){
            parent[j].children[0].graphics._fillInstructions[0].params[1]="#000";
        }
        opt.graphics._fillInstructions[0].params[1]="#AD4A3A";
        stage.update();
    });
};
var layout = {
    max: null,
    i: null,
    y: canvas.height * 0.2 + 40
};
var Scene = function (i) {
    var selectScene = new createjs.Bitmap(Queue.getResult("scene" + i));
    var x = selectScene.image.width * (i - 1) + 100 * i;
    var y = canvas.height * 0.2;
    if (x + selectScene.image.width < canvas.width) {
        selectScene.x = x;
        selectScene.y = y;
    } else {
        if (!layout.max) {
            layout.max = i - 1;
            layout.i = i - 1;
        } else if (i - layout.i === layout.max + 1) {
            layout.i = i - 1;
            layout.y += 150;
        }
        var ii = i - layout.i;
        x = selectScene.image.width * (ii - 1) + 100 * ii;
        y = selectScene.image.height + layout.y;
        selectScene.x = x;
        selectScene.y = y;
    }
    stage.addChild(selectScene);
    selectScene.on("click", function () {
        stage.removeChild(selectScene);
        if (Scenes[i]) {
            stage.removeAllChildren();
            Scenes[i].initialize(language, 1);
        }
        stage.update();
    });
    stage.update();
};