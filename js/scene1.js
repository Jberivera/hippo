var Scene1 = new function () {
    var that = this;
    this.config;
    this.Queue;
    this.win = 0;
    this.svg = [];

    this.initialize = function (lan, level, bool) {
        that.lan = lan;
        that.level = level - 1;
        that.bool=bool;
        stage.removeAllChildren();
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
            {id: "names", src: "assets/scene1/" + level + "/img/lan/names_" + lan + ".png", type: createjs.LoadQueue.IMAGE},
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
    Manifest.push({id: "backg", src: level.backg, type: createjs.LoadQueue.IMAGE});
    for (var i = 0; i < level.img.length; i++) {
        Manifest.push({id: "img" + i, src: level.img[i], type: createjs.LoadQueue.IMAGE});
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
    var backg = new createjs.Bitmap(loader.getResult("backg"));
    backg.scaleX = canvas.width / backg.image.width;
    backg.scaleY = canvas.height / backg.image.height;
    stage.addChild(backg);

    var img = level.img;
    var position=level.position;
    var randomNames=Random(img);
    var randomPosition=Random(img);

    for (var i = 0; i < img.length; i++) {
        new image(randomNames[i],loader,position[randomPosition[i]]);
    }
    for (var i = 0; i < img.length; i++) {
        new draggable(randomNames[i]);
    }
    stage.update();
};
var Random=function(array){
    var random=[];
    for(var i=0;i<array.length;i++){
        var rd=Math.floor(Math.random()*array.length);
        for(var j=0;j<random.length;j++){
            if(random[j]===rd){
                rd=Math.floor(Math.random()*array.length);
                j=-1;
            }
        }
        random.push(rd);
    }
    return random;
}
var image=function(i,loader,position){
    var svg = new createjs.Bitmap(loader.getResult("img" + i));
    svg.scaleX = svg.scaleY = canvas.width * 0.0005;
    if(Scene1.bool){
        var j=i*3;
        var names=new createjs.SpriteSheet({
            "animations":{
                "gray":[j],
                "drag":[j+1],
                "done":[j+2]
            },
            "images":[Scene1.loader.getResult("names")],
            "frames":{
                "regX":90,
                "regY":85,
                "height":130,
                "width":340,
                "count":27
            }
        });

        var name = new createjs.Sprite(names,"gray");
        name.scaleX=name.scaleY=canvas.width*0.00065;
    }

    Scene1.svg[i] = new createjs.Container();
    Scene1.svg[i].x = canvas.width * position.x;
    Scene1.svg[i].y = canvas.height * position.y;
    Scene1.svg[i].addChild(svg,name);
    stage.addChild(Scene1.svg[i]);
};
var draggable = function (i) {
    var that = this;
    that.i = i;
    var c = new createjs.Shape();
    c.graphics.beginFill("#" + Math.floor(Math.random() * 999)).drawRoundRect(0, 0, 230,67,5);

    var j=i*3;
    var names=new createjs.SpriteSheet({
        "animations":{
            "gray":[j],
            "drag":[j+1],
            "done":[j+2]
        },
        "images":[Scene1.loader.getResult("names")],
        "frames":{
            "regX":30,
            "regY":25,
            "height":130,
            "width":340,
            "count":27
        }
    });
    var name = new createjs.Sprite(names,"drag");

    name.scaleX=name.scaleY=canvas.width*0.00065;

    var cwidth=230*canvas.width*0.0008;
    var cheight=67*canvas.height*0.0008;
    c.scaleX = c.scaleY = canvas.width*0.0008;


    var dragger = new createjs.Container();
    dragger.x = dragger.y = 20;
    dragger.addChild(c, name);
    stage.addChild(dragger);
    dragger.on("pressmove", function (evt) {
        // currentTarget will be the container that the event listener was added to:
//        name.scaleX = name.scaleY = 1.35;
        c.graphics._fillInstructions[0].params[1]="transparent";
        evt.currentTarget.x = evt.stageX-cwidth/2;
        evt.currentTarget.y = evt.stageY-cheight;
        stage.update();
    });
    dragger.on("pressup", function (evt) {
        var bitmap = Scene1.svg[i];
        if ((evt.currentTarget.x+115 > (bitmap.x) && (evt.currentTarget.x < (bitmap.x + 50)))) {
            if ((evt.currentTarget.y+80 > (bitmap.y) && (evt.currentTarget.y < (bitmap.y + 80)))) {
                dragger.removeAllEventListeners();
                Scene1.win += 1;
                if(Scene1.bool){
                    dragger.removeAllChildren();
                    Scene1.svg[i].children[1].gotoAndStop("done");
                }else{
                    name.gotoAndStop("done");
                    dragger.y=bitmap.y-35;
                    dragger.x=bitmap.x-50;
                }
            }
        }
        if (Scene1.win === Scene1.config[Scene1.level].img.length) {
            if(Scene1.bool){
                Scene1.initialize(language, Scene1.level+1 , false);
            }else{
                var newGame=setInterval(function(){
                    clearInterval(newGame);
                    Scene1.initialize(language, 2 , true);
                },1000);
            }
            Scene1.win = 0;
//            init();
        }
        stage.update();
    });
    stage.update();
};