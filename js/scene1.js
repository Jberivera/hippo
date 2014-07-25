var Scene1 = {};

(function () {
    "use strict";
    var cwidth, cheight;
    var random = function (array) {
        var rand, i, j, rd;
        rand = [];
        for (i = 0; i < array.length; i += 1) {
            rd = Math.floor(Math.random() * array.length);
            for (j = 0; j < rand.length; j += 1) {
                if (rand[j] === rd) {
                    rd = Math.floor(Math.random() * array.length);
                    j = -1;
                }
            }
            rand.push(rd);
        }
        return rand;
    };

    var image = function (obj) {
        //obj = {i : number, q : queueObject, p : {x:0.07 y:0.04}} p:position
        var svg, j, names, name, array;

        svg = new createjs.Bitmap(obj.q.getResult("img" + obj.i));
        svg.scaleX = svg.scaleY = canvas.width * 0.0005;

        if (Scene1.getValues().bool) {
            j = obj.i * 3;
            names = new createjs.SpriteSheet({
                "animations": {
                    "gray": [j],
                    "drag": [j + 1],
                    "done": [j + 2]
                },
                "images": [Scene1.getValues().names],
                "frames": {
                    "regX": 90,
                    "regY": 85,
                    "height": 130,
                    "width": 340,
                    "count": 27
                }
            });

            name = new createjs.Sprite(names, "gray");
            name.scaleX = name.scaleY = canvas.width * 0.00065;
        }
        array = Scene1.getSvg();
        array[obj.i] = new createjs.Container();
        array[obj.i].name = "imageContainer" + obj.i;
        array[obj.i].obj = obj;
        array[obj.i].x = canvas.width * obj.p.x;
        array[obj.i].y = canvas.height * obj.p.y;
        array[obj.i].addChild(svg, name);
        stage.addChild(array[obj.i]);
    };

    var draggable = function (i) {
        var c, j, names, name, dragger;
        c = new createjs.Shape();
        c.graphics.beginFill("#" + Math.floor(Math.random() * 999)).drawRoundRect(0, 0, 230, 67, 5);

        j = i * 3;
        names = new createjs.SpriteSheet({
            "animations": {
                "gray": [j],
                "drag": [j + 1],
                "done": [j + 2]
            },
            "images": [Scene1.getValues().names],
            "frames": {
                "regX": 30,
                "regY": 25,
                "height": 130,
                "width": 340,
                "count": 27
            }
        });
        name = new createjs.Sprite(names, "drag");
        name.scaleX = name.scaleY = canvas.width * 0.00065;

        cwidth = 230 * canvas.width * 0.0008;
        cheight = 67 * canvas.height * 0.0008;
        c.scaleX = c.scaleY = canvas.width * 0.0008;


        dragger = new createjs.Container();
        dragger.x = dragger.y = 20;
        dragger.addChild(c, name);
        dragger.name = "dragger" + i;

        stage.addChild(dragger);

//        stage.scalebyClassName("dragger");

        dragger.on("pressmove", function (evt) {
            // currentTarget will be the container that the event listener was added to:
//        name.scaleX = name.scaleY = 1.35;
            c.graphics._fillInstructions[0].params[1] = "transparent";
            evt.currentTarget.x = evt.stageX - cwidth / 2;
            evt.currentTarget.y = evt.stageY - cheight;
            stage.update();
        });
        dragger.on("pressup", function (evt) {
            var bitmap, currentlevel;
            bitmap = Scene1.getSvg()[i];

            if ((evt.currentTarget.x + 115 > (bitmap.x) && (evt.currentTarget.x < (bitmap.x + 50)))) {
                if ((evt.currentTarget.y + 80 > (bitmap.y) && (evt.currentTarget.y < (bitmap.y + 80)))) {
                    dragger.removeAllEventListeners();
                    Scene1.setWin(1);
                    if (Scene1.getValues().bool) {
                        dragger.removeAllChildren();
                        dragger.name = null;
                        Scene1.getSvg()[i].children[1].gotoAndStop("done");
                    } else {
                        name.gotoAndStop("done");
                        dragger.y = bitmap.y - 35;
                        dragger.x = bitmap.x - 50;
                    }
                }
            }
            if (Scene1.getWin() === Scene1.getConfig()[Scene1.getValues().level].img.length) {
                if (Scene1.getValues().bool) {
                    window.setTimeout(function () {
                        currentlevel = Scene1.getValues().level + 1;
                        Scene1.initialize({lan: language, level: currentlevel, bool: false});
                    }, 500);
                } else {
                    window.setTimeout(function () {
                        Scene1.initialize({lan: language, level: 2, bool: true});
                    }, 500);
                }
                Scene1.setWin(0);
//            init();
            }
            stage.update();
        });
        stage.update();
    };

    var obj = {
        progress: {},
        config: {},
        queue: {}
    };
    Scene1 = (function () {
        var win, svg;
        win = 0;
        svg = [];
        return {
            getName: function () {
                return "scene1";
            },
            step: function (level) {
                var img, position, randomNames, randomPosition, i;
                img = level.img;//level.img is equal to an array of strings, urls of svg files
                position = level.position; //level.position is equal to an array of objects like {x:0.5 , y:0.4}

                randomNames = random(img);
                randomPosition = random(img);

                for (i = 0; i < img.length; i += 1) {
                    image({i: randomNames[i], q: obj.queue, p: position[randomPosition[i]]});
                }
                for (i = 0; i < img.length; i += 1) {
                    draggable(randomNames[i]);
                }
                stage.update();

                window.onresize = resize(img.length);
            },
            getQueue: function () {
                return obj.queue;
            },
            getConfig: function () {
                return obj.config;//return an array of objects [{},{},{}]
            },
            setWin: function (n) {
                win = n === 0 ? 0 : win + n;
            },
            getWin: function () {
                return win;
            },
            getSvg: function () {
                return svg;//return a vector
            },
            getProgress: function () {
                return obj.progress;
            }
        };
    }());
    Scene1.initialize = setUp(obj, Scene1);

    var resize = function (length) {

        return function () {
            var i;
            setAspectRatio();
            for (i = 0; i < length; i += 1) {
                var dragger, imgC, backg, ch1, ch2;
                cwidth = 230 * canvas.width * 0.0008;
                cheight = 67 * canvas.height * 0.0008;

                dragger = stage.getChildByName("dragger" + i);
                if (dragger) {
                    ch1 = dragger.children[0];
                    ch2 = dragger.children[1];

                    ch1.scaleX = ch1.scaleY = canvas.width * 0.0008;
                    ch2.scaleX = ch2.scaleY = canvas.width * 0.00065;
                }
                imgC = stage.getChildByName("imageContainer" + i);
                if (imgC) {
                    ch1 = imgC.children[0];
                    ch2 = imgC.children[1];

                    ch1.scaleX = ch1.scaleY = canvas.width * 0.0005;
                    ch2.scaleX = ch2.scaleY = canvas.width * 0.00065;
                    imgC.x = canvas.width * imgC.obj.p.x;
                    imgC.y = canvas.height * imgC.obj.p.y;
                }
                backg = stage.getChildByName("backg");
                backg.scaleX = canvas.width / backg.image.width;
                backg.scaleY = canvas.height / backg.image.height;
            }
            stage.update();
        };
    };
}());