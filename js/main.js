var stage;
var canvas = document.getElementById('gameCanvas');
//getting ui canvas component
var ui = document.getElementById('uiCanvas');

var Queue = {};

//Vector that contains all scenes for easy reference them on Scene() function
var Scenes = [null, Scene1, Scene2];

var language = 'es';//Global Language

var setAspectRatio = (function () {

    var ratio = 1920 / 1080;

    return function () {
        ui.width = canvas.width = window.innerWidth;
        ui.height = canvas.height = window.innerWidth / ratio;

        if(canvas.height < window.innerHeight){
            var diferencia = window.innerHeight - canvas.height;
            canvas.style.marginTop = ui.style.marginTop = diferencia/2 + 'px';
        }else{
            canvas.style.marginTop = ui.style.marginTop = '0px';
        }

//    console.log('canvas.width:' + canvas.width);
//    console.log('canvas.height:' + canvas.height);
//    console.log('---');
    };
}());

var init = function () {

    stage = new createjs.Stage(canvas);
    stageUi = new createjs.Stage(ui);

    createjs.Touch.enable(stage);
    createjs.Touch.enable(stageUi);

    setAspectRatio();

    Queue = new createjs.LoadQueue();
    Queue.addEventListener('complete', selectionPanel);
    Queue.Manifest = [
        {id: 'setting', src: 'assets/init/setting-icon48.png'},
        {id: 'scene1', src: 'assets/init/scene1.png'},
        {id: 'scene2', src: 'assets/init/scene1.png'},
        {id: 'scene3', src: 'assets/init/scene1.png'}
    ];
    Queue.loadManifest(Queue.Manifest);
};

//this function draws main panel
var selectionPanel = function () {
    //----Drawing----
    //background
    var rect, container;

    rect = new createjs.Shape();
    rect.graphics.beginFill('#E8D24A').drawRect(0, 0, canvas.width, canvas.height);
    rect.name = "backg";
    stage.addChild(rect);

    container = new createjs.Container();
    container.name = "container";
    container.y = canvas.height * 0.35;
    container.x = canvas.width * -0.02;
    container.scaleX = container.scaleY = canvas.width * 0.00105;
    //scenes images
    for (var i = 1, l = Queue.Manifest.length; i < l; i++) {
        sceneImage(i, container);
    }

    //setting button
    settingButton();

    window.onresize = function () {
        var c, backg, setting;
        ui.style.zIndex = '-1';
        setAspectRatio();

        backg = stage.getChildByName('backg');
        backg.scaleX = canvas.width / backg.graphics._activeInstructions[0].params[2];
        backg.scaleY = canvas.height / backg.graphics._activeInstructions[0].params[3];

        c = stage.getChildByName('container');
        c.y = canvas.height * 0.35;
        c.x = canvas.width * -0.02;
        c.scaleX = c.scaleY = canvas.width * 0.00105;

        setting = stage.getChildByName('setting');
        setting.x = canvas.width - canvas.width * 0.10;
        setting.y = 25;
        stage.update();
    };

    stage.update();
};

var sceneImage = function (i, container) {
    var scene, x;
    scene = new createjs.Bitmap(Queue.getResult('scene' + i));

    x = scene.image.width * (i - 1) + 100 * i;
    scene.x = x;

    scene.on('click', function () {
        stage.removeChild(scene);
        if (Scenes[i]) {
            stage.removeAllChildren();
            Scenes[i].initialize({lan: language, level: 1, bool: true});
        }
        stage.update();
    });
    container.addChild(scene);
    stage.addChild(container);
    stage.update();
};

var settingButton = function () {
    var setting = new createjs.Bitmap(Queue.getResult('setting'));
    setting.x = canvas.width - canvas.width * 0.10;
    setting.y = 25;
    setting.name = "setting";
    stage.addChild(setting);
    setting.on('click', function () {
        ui.style.zIndex = '1';
        settingPanel();
    });
    stage.update();
};
//this functions draws a setting panel

var settingPanel = function () {
    var lanOptions, rect, ok, okwidth, okheight, settings;
    lanOptions = ['es', 'en' , 'es'];
    rect = new createjs.Shape();
    rect.graphics.beginFill('#5A3EA1').drawRect(0, 0, canvas.width - 200, canvas.height - 200);
    ok = new createjs.Shape();
    okwidth = rect.graphics._activeInstructions[0].params[2] * 0.35;
    okheight = rect.graphics._activeInstructions[0].params[3];
    ok.graphics.beginFill('#57998C').drawRect(okwidth, okheight - 70, 370, 70);

    settings = new createjs.Container();
    settings.x = 100;
    settings.y = 100;
    settings.addChild(rect, ok);
    stageUi.addChild(settings);
    for (var i = 0, l = lanOptions.length; i < l; i++) {
        settings.addChild(lanOption(lanOptions[i], i));
    }

    ok.on('click', function () {
        ui.style.zIndex = '-1';
        stageUi.removeAllChildren();
        stageUi.update();
    });

    stageUi.update();
};
var lanOption = function (lan, i) {
    var c = new createjs.Container();//Container
    var opt = new createjs.Shape();
    opt.graphics.beginFill('#000').drawRect(100 * (i + 1) + 150 * i, 100, 150, 150);
    var label = new createjs.Text(lan, 'bold 25px Arial', '#FFFFFF');
    label.textAlign = 'center';
    label.x = 175 * (i + 1) + 75 * i;
    label.y = 160;
    c.addChild(opt, label);
    c.on('click', function () {
        language = lan;
        var parent = c.parent.children;
        for (var j = 2, l = parent.length; j < l; j++) {
            parent[j].children[0].graphics._fillInstructions[0].params[1] = '#000';
        }
        opt.graphics._fillInstructions[0].params[1] = '#AD4A3A';
        stageUi.update();
    });
    return c;
};