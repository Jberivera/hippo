var Scene1 = {};
(function () {
    "use strict";
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

    var Image = function (obj) {
        //obj = {i : number, q : queueObject, p : position}
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
        array[obj.i].x = canvas.width * obj.p.x;
        array[obj.i].y = canvas.height * obj.p.y;
        array[obj.i].addChild(svg, name);
        stage.addChild(array[obj.i]);
    };

    var Draggable = function (i) {
        var that, c, j, names, name, cwidth, cheight, dragger;
        that = this;
        that.i = i;
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
        stage.addChild(dragger);
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

    var queueProgress = function (event) {
        var value = event.loaded / event.total;
        Scene1.getProgress().graphics.clear()
            .beginFill("#fff").drawRoundRect(-103, -13, 306, 26, 13)
            .beginFill("#0D83BA").drawRoundRect(-100, -10, value * 300, 20, 10);
        stage.update();
    };

    var loadComplete = function () {
        var level, queue, backg, img, position, randomNames, randomPosition, i;
        level = Scene1.getConfig()[Scene1.getValues().level];//
        queue = Scene1.getQueue();
        backg = new createjs.Bitmap(queue.getResult("backg"));
        backg.scaleX = canvas.width / backg.image.width;
        backg.scaleY = canvas.height / backg.image.height;
        stage.addChild(backg);

        img = level.img;//level.img is equal to an array of strings, urls of svg files
        position = level.position; //level.position is equal to an array of objects like this {x:0.5 , y:0.4}
        randomNames = random(img);
        randomPosition = random(img);

        for (i = 0; i < img.length; i += 1) {
            new Image({i: randomNames[i], q: queue, p: position[randomPosition[i]]});
        }
        for (i = 0; i < img.length; i += 1) {
            new Draggable(randomNames[i]);
        }
        stage.update();
    };

    Scene1 = (function () {
        var config, queue, loader, win, svg, progress;
        queue = {};
        loader = {};
        win = 0;
        svg = [];
        return {
            initialize: function (values) {
                // Values = {lan: "en", level: 1, bool: true}
                this.getValues = function () {
                    return values;
                };

                stage.removeAllChildren();
                var rect = new createjs.Shape();
                rect.graphics.beginFill("#E8D24A").drawRect(0, 0, canvas.width, canvas.height);
                stage.addChild(rect);

                progress = new createjs.Shape();
                progress.x = canvas.width / 2;
                progress.y = canvas.height * 0.5;
                stage.addChild(progress);

                loader = new createjs.LoadQueue();

                loader.addEventListener("complete", function () {
                    var level, Manifest, i;
                    values.lan = loader.getResult("lan");
                    values.names = loader.getResult("names");//returns a png file, an sprite with names
                    config = loader.getResult("config");
                    level = config[values.level];//returns an object with all info about current level
                    queue = new createjs.LoadQueue();
                    queue.addEventListener("progress", queueProgress);
                    queue.addEventListener("complete", loadComplete);

                    Manifest = [];
                    Manifest.push({id: "backg", src: level.backg, type: createjs.LoadQueue.IMAGE});
                    for (i = 0; i < level.img.length; i += 1) {
                        Manifest.push({id: "img" + i, src: level.img[i], type: createjs.LoadQueue.IMAGE});
                    }
                    queue.loadManifest(Manifest);
                });

                loader.loadManifest([
                    {id: "names", src: "assets/scene1/" + values.level + "/img/lan/names_" + values.lan + ".png", type: createjs.LoadQueue.IMAGE},
                    {id: "config", src: "config/scene1-config.json", type: createjs.LoadQueue.JSON}
                ]);
                values.level -= 1;
            },
            getQueue: function () {
                return queue;
            },
            getConfig: function () {
                return config;//return an array of objects [{},{},{}]
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
                return progress;
            }
        };
    }());
}());