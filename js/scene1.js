var Scene1 = new function () {
    var that = this;
    this.config;
    this.Queue;
    this.win = 0;
    this.svg = [];

    this.initialize = function (lan, level) {
        that.lan = lan;
        that.level = level - 1;
        var rect = new createjs.Shape();
        rect.graphics.beginFill("#E8D24A").drawRect(0, 0, canvas.width, canvas.height);
        stage.addChild(rect);
        that.progress = new createjs.Shape();
        that.progress.x = canvas.width / 2;
        that.progress.y = canvas.height * 0.5;
        stage.addChild(that.progress);

        that.loader = new createjs.LoadQueue();
        that.loader.addEventListener("complete", loaderComplete);
        that.loader.loadManifest([
            {id: "names", src: "assets/scene1/" + level + "/img/lan/names-" + lan + ".png", type: createjs.LoadQueue.IMAGE},
            {id: "lan", src: "lan/"+lan+".json", type: createjs.LoadQueue.JSON},
            {id: "config", src: "config/scene1-config.json", type: createjs.LoadQueue.JSON}
        ]);
    };
};

var loaderComplete = function () {
    var loader = Scene1.loader;
    Scene1.lan = loader.getResult("lan");
    Scene1.config = loader.getResult("config");
    var level = Scene1.config[Scene1.level];
    Scene1.Queue = new createjs.LoadQueue();
    Scene1.Queue.addEventListener("progress", queueProgress);
    Scene1.Queue.addEventListener("complete", loadManifest);
    var Manifest = [];
    for (var i = 0; i < level.backg.length; i++) {
        Manifest.push({id: "backg" + i, src: level.backg[i].backgUrl, type: createjs.LoadQueue.IMAGE});
    }
    for (var i = 0; i < level.img.length; i++) {
        Manifest.push({id: "img" + i, src: level.img[i].imgUrl, type: createjs.LoadQueue.IMAGE});
    }
    Scene1.Queue.loadManifest(Manifest);
};
var queueProgress = function (event) {
    var value = event.loaded / event.total;
    Scene1.progress.graphics.clear()
        .beginFill("#fff").drawRoundRect(-103, -13, 306, 26, 13)
        .beginFill("#0D83BA").drawRoundRect(-100, -10, value * 300 | 0, 20, 10);
    stage.update();
};
var loadManifest = function () {
    var level = Scene1.config[Scene1.level];
    var loader = Scene1.Queue;
    for (var i = 0; i < level.backg.length; i++) {
        var backg = new createjs.Bitmap(loader.getResult("backg" + i));
        backg.scaleX = canvas.width / backg.image.width;
        backg.scaleY = canvas.height / backg.image.height;
        stage.addChild(backg);
    }
//  imgs = array with images
    var img = level.img;
    for (var i = 0; i < img.length; i++) {
        new image(i,loader,img);
    }
    var lan=Scene1.lan.scene1[Scene1.level];
    for (var i = 0; i < Scene1.lan.scene1[Scene1.level].length; i++) {
        new circle(i);
    }
    stage.update();
};
var image=function(i,loader,img){
    var svg = new createjs.Bitmap(loader.getResult("img" + i));
    svg.scaleX = svg.scaleY = canvas.width * 0.00009;

    var j=i*3;
    var names=new createjs.SpriteSheet({
        "animations":{
            "gray":[j],
            "drag":[j+1],
            "done":[j+2]
        },
        "images":[Scene1.loader.getResult("names")],
        "frames":{
            "regX":33,
            "regY":25,
            "height":63,
            "width":180,
            "count":24
        }
    });
    var name = new createjs.Sprite(names,"gray");

    Scene1.svg[i] = new createjs.Container();
    Scene1.svg[i].x = canvas.width * img[i].x;
    Scene1.svg[i].y = canvas.height * img[i].y;
    Scene1.svg[i].addChild(svg,name);
    stage.addChild(Scene1.svg[i]);
};
var circle = function (i) {
    var that = this;
    that.i = i;
    var c = new createjs.Shape();
    c.graphics.beginFill("#" + Math.floor(Math.random() * 999)).drawRoundRect(0, 0, 180,63,5); //canvas.width * 0.045 set color by default > lan.scene1[level][i].color

//    var lan = Scene1.lan.scene1[Scene1.level];
//    var label = new createjs.Text(lan[i].drag, "bold 25px Arial", "#FFFFFF");
//    label.textAlign = "center";
//    label.y = -12;
    var j=i*3;
    var names=new createjs.SpriteSheet({
        "animations":{
            "gray":[j],
            "drag":[j+1],
            "done":[j+2]
        },
        "images":[Scene1.loader.getResult("names")],
        "frames":{
            "regX":0,
            "regY":0,
            "height":63,
            "width":180,
            "count":24
        }
    });
    var name = new createjs.Sprite(names,"drag");

    var dragger = new createjs.Container();
    dragger.x = dragger.y = 100;
    dragger.addChild(c, name);
    stage.addChild(dragger);
    dragger.on("pressmove", function (evt) {
        // currentTarget will be the container that the event listener was added to:
//        name.scaleX = name.scaleY = 1.35;
//        c.graphics._fillInstructions[0].params[1]="transparent";
//        label.font = "bold 40px Arial";
//        label.y = -20;
        evt.currentTarget.x = evt.stageX-90;
        evt.currentTarget.y = evt.stageY-63;
        stage.update();
    });
    dragger.on("pressup", function (evt) {
//        name.scaleX = name.scaleY = 1;
//        label.font = "bold 25px Arial";
//        label.y = -12;
        var bitmap = Scene1.svg[i];
        if ((evt.currentTarget.x+90 > (bitmap.x) && (evt.currentTarget.x < (bitmap.x + 110)))) {
            if ((evt.currentTarget.y+63 > (bitmap.y) && (evt.currentTarget.y < (bitmap.y + 130)))) {
                dragger.removeAllEventListeners();
                dragger.removeAllChildren();
                Scene1.svg[i].children[1].gotoAndStop("done");
//                label.font = "bold 32px Arial";
//                label.color = "#" + Math.floor(Math.random() * 999);
//                label.y = -100;
                Scene1.win += 1;
            }
        }
        if (Scene1.win === Scene1.lan.scene1[Scene1.level].length) {
            stage.removeAllChildren();
            Scene1.win = 0;
            init();
        }
        stage.update();
    });
    stage.update();
};