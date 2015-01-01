var Scene1 = {};

(function () {
    'use strict';
    var cwidth, cheight;

    var image = function (obj) {
        //obj = {i : number, q : queueObject, pos : {x:0.07 y:0.04}} p:position
        var svg, j, sheet, name, array, i;
        i = obj.i;
        array = Scene1.getArray();
        svg = new createjs.Bitmap(obj.q.getResult('img' + obj.i));
        svg.scaleX = svg.scaleY = canvas.width * 0.0005;

        j = obj.i * 3;
        sheet = new createjs.SpriteSheet({
            'animations': {
                'gray': [j],
                'drag': [j + 1],
                'done': [j + 2],
                'blank': [28]
            },
            'images': [Scene1.getValues().words],
            'frames': {
                'regX': 90,
                'regY': 85,
                'height': 130,
                'width': 340,
                'count': 27
            }
        });
        if (Scene1.getValues().bool) {
            name = new createjs.Sprite(sheet, 'gray');
            name.scaleX = name.scaleY = canvas.width * 0.00065;
        } else {
            name = new createjs.Sprite(sheet, 'blank');
            name.scaleX = name.scaleY = canvas.width * 0.00065;
        }

        array[i] = new createjs.Container();
        array[i].name = 'imageContainer' + i;
        array[i].obj = obj;
        array[i].x = canvas.width * obj.pos.x;
        array[i].y = canvas.height * obj.pos.y;
        array[i].addChild(svg, name);
        stage.addChild(array[obj.i]);
    };

    var draggable = function (i) {
        var c, j, sheet, name, drag;
        c = new createjs.Shape();
        c.graphics.beginFill('#' + Math.floor(Math.random() * 999)).drawRoundRect(0, 0, 230, 67, 5);

        j = i * 3;
        sheet = new createjs.SpriteSheet({
            'animations': {
                'gray': [j],
                'drag': [j + 1],
                'done': [j + 2]
            },
            'images': [Scene1.getValues().words],
            'frames': {
                'regX': 30,
                'regY': 25,
                'height': 130,
                'width': 340,
                'count': 27
            }
        });
        name = new createjs.Sprite(sheet, 'drag');

        name.scaleX = name.scaleY = canvas.width * 0.00065;
        c.scaleX = c.scaleY = canvas.width * 0.0008;

        drag = new createjs.Container();
        drag.x = drag.y = 20;
        drag.addChild(c, name);
        drag.name = 'drag' + i;

        stage.addChild(drag);

//        stage.scalebyClassName('drag');

        drag.on('pressmove', function (evt) {
            // currentTarget will be the container that the event listener was added to:
//        name.scaleX = name.scaleY = 1.35;
            c.graphics._fillInstructions[0].params[1] = 'transparent';
            evt.currentTarget.x = evt.stageX - cwidth / 2;
            evt.currentTarget.y = evt.stageY - cheight;
            stage.update();
        });
        drag.on('pressup', function (evt) {
            var bitmap, currentlevel;
            bitmap = Scene1.getArray()[i];
            //Los if crean un cuadrado logico alrededor de cada imagen donde se puede soltar el Drag
            if ((evt.currentTarget.x + 115 > (bitmap.x) && (evt.currentTarget.x < (bitmap.x + 50)))) {
                if ((evt.currentTarget.y + 80 > (bitmap.y) && (evt.currentTarget.y < (bitmap.y + 80)))) {
                    drag.removeAllEventListeners();
                    Scene1.setWin(1);
                    drag.removeAllChildren();
                    drag.name = null;
                    bitmap.children[1].gotoAndStop('done');
                }
            }
            if (Scene1.getWin() === Scene1.getConfig()[Scene1.getValues().level].img.length) {
                if (Scene1.getValues().bool) {
                    window.setTimeout(function () {
                        currentlevel = Scene1.getValues().level + 1;
                        Scene1.initialize({lan: language, level: currentlevel, bool: false});
                    }, 400);
                } else {
                    window.setTimeout(function () {
                        Scene1.initialize({lan: language, level: 2, bool: true});
                    }, 400);
                }
                Scene1.setWin(0);
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
        var win, array;
        win = 0;
        array = [];
        return {
            getName: function () {
                return 'scene1';
            },
            step: function (dataLevel) {
                var img, position, randomWords, randomPosition;
                img = dataLevel.img;//level.img is equal to an array of strings, urls of svg files
                position = dataLevel.position; //level.position is equal to an array of objects like {x:0.5 , y:0.4}

                cwidth = 230 * canvas.width * 0.0008;
                cheight = 67 * canvas.height * 0.0008;

                randomWords = random(img.length);
                randomPosition = random(img.length);

                for (var i = 0, l = img.length; i < l; i += 1) {
                    image({i: randomWords[i], q: obj.queue, pos: position[randomPosition[i]]});
                }
                for (var i = 0, l = img.length; i < l; i += 1) {
                    draggable(randomWords[i]);
                }
                stage.update();

                window.onresize = resize(l);
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
            getArray: function () {
                return array;//return a vector
            },
            getProgress: function () {
                return obj.progress;
            }
        };
    }());
    Scene1.initialize = setUp(obj, Scene1);

    var resize = function (length) {

        return function () {
            var drag, imgC, backg, ch1, ch2;
            setAspectRatio();
            backg = stageBack.getChildByName('backg');
            backg.scaleX = canvas.width / backg.image.width;
            backg.scaleY = canvas.height / backg.image.height;

            cwidth = 230 * canvas.width * 0.0008;
            cheight = 67 * canvas.height * 0.0008;

            for (var i = 0; i < length; i += 1) {
                drag = stage.getChildByName('drag' + i);
                if (drag) {
                    ch1 = drag.children[0];
                    ch2 = drag.children[1];

                    ch1.scaleX = ch1.scaleY = canvas.width * 0.0008;
                    ch2.scaleX = ch2.scaleY = canvas.width * 0.00065;
                }
                imgC = stage.getChildByName('imageContainer' + i);

                if (imgC) {
                    ch1 = imgC.children[0];
                    ch2 = imgC.children[1];

                    ch1.scaleX = ch1.scaleY = canvas.width * 0.0005;
                    ch2.scaleX = ch2.scaleY = canvas.width * 0.00065;
                    imgC.x = canvas.width * imgC.obj.pos.x;
                    imgC.y = canvas.height * imgC.obj.pos.y;
                }
            }
            stage.update();
            stageBack.update();
        };
    };
}());