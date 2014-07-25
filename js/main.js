var stage;

var canvas = document.getElementById("gameCanvas");
//getting ui canvas component
var ui = document.getElementById("uiCanvas");

var Queue = {};

//Vector that contains all scenes for easy reference them on Scene() function
var Scenes = [null, Scene1, Scene2];

var language = "es";//Global Language

var setAspectRatio = (function () {

    var ratio = 1920 / 1080;

    return function () {
        ui.width = canvas.width = window.innerWidth;
        ui.height = canvas.height = window.innerWidth / ratio;

        if(canvas.height < window.innerHeight){
            var diferencia = window.innerHeight - canvas.height;
            canvas.style.marginTop = ui.style.marginTop = diferencia/2 + "px";
            console.log(diferencia);
        }else{
            canvas.style.marginTop = ui.style.marginTop = "0px";
        }

    console.log("canvas.width:" + canvas.width);
    console.log("canvas.height:" + canvas.height);
    console.log("---");
    };
}());

var init = function () {

    stage = new createjs.Stage(canvas);
    stageUi = new createjs.Stage(ui);

    createjs.Touch.enable(stage);
    createjs.Touch.enable(stageUi);

    setAspectRatio();

    Queue = new createjs.LoadQueue();
    Queue.addEventListener("complete", selectionPanel);
    Queue.Manifest = [
        {id: "setting", src: "assets/init/setting-icon48.png"},
        {id: "scene1", src: "assets/init/scene1.png"},
        {id: "scene2", src: "assets/init/scene1.png"},
        {id: "scene3", src: "assets/init/scene1.png"}
    ];
    Queue.loadManifest(Queue.Manifest);
};

//this function draws main panel
var selectionPanel = function () {
    //----Drawing----
    //background
    var rect = new createjs.Shape();
    rect.graphics.beginFill("#E8D24A").drawRect(0, 0, canvas.width, canvas.height);
    stage.addChild(rect);

    //scenes images
    for (var i = 1; i < Queue.Manifest.length; i++) {
        sceneImage(i);
    }

    //setting button
    settingButton();

    window.onresize = function () {
        setAspectRatio();

        stage.removeAllChildren();
        selectionPanel();

    };

    stage.update();
};

var layout = {
    max: null,
    i: null,
    y: canvas.height * 0.2 + 40
};

var sceneImage = function (i) {
    var scene = new createjs.Bitmap(Queue.getResult("scene" + i));

    //setting layout scene
    var x = scene.image.width * (i - 1) + 100 * i;
    var y = canvas.height * 0.2;
    if (x + scene.image.width < canvas.width) {
        scene.x = x;
        scene.y = y;
    } else {
        if (!layout.max) {
            layout.max = i - 1;
            layout.i = i - 1;
        } else if (i - layout.i === layout.max + 1) {
            layout.i = i - 1;
            layout.y += 150;
        }
        var ii = i - layout.i;
        x = scene.image.width * (ii - 1) + 100 * ii;
        y = scene.image.height + layout.y;
        scene.x = x;
        scene.y = y;
    }
    //end layout logic

    stage.addChild(scene);
    scene.on("click", function () {
        stage.removeChild(scene);
        if (Scenes[i]) {
            stage.removeAllChildren();
            Scenes[i].initialize({lan: language, level: 1, bool: true});
        }
        stage.update();
    });
    stage.update();
};

var settingButton = function () {
    var setting = new createjs.Bitmap(Queue.getResult("setting"));
    setting.x = canvas.width - canvas.width * 0.10;
    setting.y = 25;
    stage.addChild(setting);
    setting.on("click", function () {
        ui.style.zIndex = '1';
        settingPanel();
    });
    stage.update();
};
//this functions draws a setting panel

var settingPanel = function () {
    var lanOptions = ["es", "en" , "es"];
    var rect = new createjs.Shape();
    rect.graphics.beginFill("#5A3EA1").drawRect(0, 0, canvas.width - 200, canvas.height - 200);
    var ok = new createjs.Shape();
    var okwidth = rect.graphics._activeInstructions[0].params[2] * 0.35;
    var okheight = rect.graphics._activeInstructions[0].params[3];
    ok.graphics.beginFill("#57998C").drawRect(okwidth, okheight - 70, 370, 70);

    var settings = new createjs.Container();
    settings.x = 100;
    settings.y = 100;
    settings.addChild(rect, ok);
    stageUi.addChild(settings);
    for (var i = 0; i < lanOptions.length; i++) {
        settings.addChild(lanOption(lanOptions[i], i));
    }

    ok.on("click", function () {
        ui.style.zIndex = '-1';
        stageUi.removeAllChildren();
        stageUi.update();
    });

    stageUi.update();
};
var lanOption = function (lan, i) {
    var c = new createjs.Container();//Container
    var opt = new createjs.Shape();
    opt.graphics.beginFill("#000").drawRect(100 * (i + 1) + 150 * i, 100, 150, 150);
    var label = new createjs.Text(lan, "bold 25px Arial", "#FFFFFF");
    label.textAlign = "center";
    label.x = 175 * (i + 1) + 75 * i;
    label.y = 160;
    c.addChild(opt, label);
    c.on("click", function () {
        language = lan;
        var parent = c.parent.children;
        for (var j = 2; j < parent.length; j++) {
            parent[j].children[0].graphics._fillInstructions[0].params[1] = "#000";
        }
        opt.graphics._fillInstructions[0].params[1] = "#AD4A3A";
        stageUi.update();
    });
    return c;
};