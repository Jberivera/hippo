var Scene2 = {};
(function () {
    'use strict';
    var cwidth, cheight;
    var position = [
        {
            'x': 0.35,
            'y': 0.2
        },
        {
            'x': 0.1,
            'y': 0.7
        },
        {
            'x': 0.83,
            'y': 0.15
        },
        {
            'x': 0.6,
            'y': 0.84
        },
        {
            'x': 0.46,
            'y': 0.85
        },
        {
            'x': 0.87,
            'y': 0.5
        },
        {
            'x': 0.7,
            'y': 0.8
        },
        {
            'x': 0.1,
            'y': 0.1
        },
        {
            'x': 0.6,
            'y': 0.15
        }
    ];
    var before = 0;

    var emdash = function (obj) {
        var width, array, i, j, dash, sheet, sprite;
//        height = canvas.width * 0.03;
        width = 80 * obj.size;
        j = obj.i * 2;
        array = Scene2.getArray();

        sheet = new createjs.SpriteSheet({
            'animations': {
                'drag': [j],
                'done': [j + 1],
                'blank':[9]
            },
            'images': [Scene2.getValues().words],
            'frames': {
                'regX': 30,
                'regY': 65,
                'height': 85,
                'width': 178,
                'count': obj.length * 2
            }
        });

        sprite = new createjs.Sprite(sheet, 'blank');
        sprite.scaleX = sprite.scaleY = canvas.width * 0.00125;

        i = obj.i;
        obj.x = before;
        before = obj.x + width + 10;

        dash = new createjs.Shape();
        dash.graphics.beginFill('#FFFFFF').drawRoundRect(0, 0, width, 30, 5);//(x , y , width, height, round)
        array[i] = new createjs.Container();
        array[i].name = 'dash' + i;
        array[i].scaleX = array[i].scaleY = canvas.width * 0.0008;
        array[i].x = array[i].scaleX * obj.x;
        array[i].obj = obj;
        array[i].addChild(dash, sprite);

        Scene2.getContainer().addChild(array[i]);
    };
    var draggable = function (obj) {
        var j, sheet, drag, sprite;
        j = obj.i * 2;

        sheet = new createjs.SpriteSheet({
            'animations': {
                'drag': [j],
                'done': [j + 1]
            },
            'images': [Scene2.getValues().words],
            'frames': {
                'regX': 20,
                'regY': 25,
                'height': 85,
                'width': 178,
                'count': obj.length * 2
            }
        });
        sprite = new createjs.Sprite(sheet, 'drag');
        sprite.scaleX = sprite.scaleY = canvas.width * 0.00065;

        drag = new createjs.Container();
        drag.x = canvas.width * obj.pos.x;
        drag.y = canvas.height * obj.pos.y;
        drag.obj = obj;
        drag.name = 'drag' + obj.i;
        drag.addChild(sprite);

        stage.addChild(drag);

        drag.on('pressmove', function (evt) {
            // currentTarget will be the container that the event listener was added to:
//        name.scaleX = name.scaleY = 1.35;
            evt.currentTarget.x = evt.stageX - cwidth / 2;
            evt.currentTarget.y = evt.stageY - cheight;
            stage.update();
        });
        drag.on('pressup', function (evt) {
            var dash, currentlevel, container;
            container = Scene2.getContainer();
            dash = Scene2.getArray()[obj.i];
            //Los if crean un cuadrado logico alrededor de cada imagen donde se puede soltar el Drag
            if ((evt.currentTarget.x > (dash.x) && (evt.currentTarget.x < (dash.x + 150)))) {
                if ((evt.currentTarget.y + 80 > (container.y) && (evt.currentTarget.y < (container.y + 80)))) {

                    drag.removeAllEventListeners();
                    drag.name = null;
                    drag.removeAllChildren();

                    Scene1.setWin(1);
                    dash.children[1].gotoAndStop('done');

                    stage.update();
//                    if (Scene1.getValues().bool) {
//                        drag.removeAllChildren();
//                        drag.name = null;
//                        Scene1.getArray()[i].children[1].gotoAndStop('done');
//                    } else {
//                        name.gotoAndStop('done');
//                        drag.y = dash.y - 35;
//                        drag.x = dash.x - 50;
//                    }
                }
            }
        });
    };

    var obj = {
        progress: {},
        config: {},
        queue: {}
    };
    Scene2 = (function () {
        var win, array, container;
        win = 0;
        array = [];

        return {
            getName: function () {
                return 'scene2';
            },
            step: function (dataLevel) {
                var lan, phw, randomPosition, randomWords;
                lan = Scene2.getValues().lan;
                phw = dataLevel.phraseWords;
                container = new createjs.Container();
                container.y = canvas.height * 0.6;
                container.x = canvas.width * 0.05;
                stage.addChild(container);

                cwidth = 230 * canvas.width * 0.0008;
                cheight = 67 * canvas.height * 0.0008;

                randomPosition = random(9);
                before = canvas.width / phw[lan].length;

                for (var i = 0, l = phw[lan].length; i < l; i += 1) {
                    emdash({i: i, length: l, size: phw[lan][i]});
                }
                for (var i = 0, l = phw[lan].length; i < l; i += 1) {
                    draggable({i: i, length: l, pos: position[randomPosition[i]]});
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
            },
            getContainer: function () {
                return container;
            }
        };
    }());
    Scene2.initialize = setUp(obj, Scene2);

    var resize = function (length) {

        return function () {
            var backg, dash, drag, container, ch1, ch2;
            setAspectRatio();
            backg = stageBack.getChildByName('backg');
            backg.scaleX = canvas.width / backg.image.width;
            backg.scaleY = canvas.height / backg.image.height;
            container = Scene2.getContainer();
            //container.y = canvas.height * 0.6;
            //container.x = canvas.width * 0.05;

            cwidth = 230 * canvas.width * 0.0008;
            cheight = 67 * canvas.height * 0.0008;

            for (var i = 0; i < length; i += 1) {
                dash = container.getChildByName('dash' + i);
                if (dash) {
                    ch1 = dash.children[0];
                    ch2 = dash.children[1];
                    ch2.scaleX = ch2.scaleY = canvas.width * 0.00125;

                    dash.scaleX = dash.scaleY = canvas.width * 0.0008;
                    dash.x = dash.scaleX * dash.obj.x;
                }
                drag = stage.getChildByName('drag' + i);
                if (drag) {
                    ch1 = drag.children[0];
                    //ch1.scaleX = ch1.scaleY = canvas.width * 0.00065;

                    //drag.x = canvas.width * drag.obj.pos.x;
                    //drag.y = canvas.height * drag.obj.pos.y;
                }
            }
            stage.update();
            stageBack.update();
        };
    };
}());