var Scene3 = {};
(function () {
    'use strict';
    var cwidth, cheight, stroke, oldPt, oldMidPt, drawingCanvas, color, draw = false, wrong = false, word = [], saveStage = true, currentlevel;

    var characters = {
        a : [{"x": 0.7, "y": 0.7}, {"x": 0.63, "y": 0.4}, {"x": 0.6, "y": 0.6}, {"x": 0.5, "y": 0.7}, {"x": 0.4, "y": 0.7}, {"x": 0.3, "y": 0.5}, {"x": 0.3, "y": 0.3}, {"x": 0.4, "y": 0.2}, {"x": 0.5, "y": 0.2}, {"x": 0.6, "y": 0.3}],
        b : [[{"x": 0.5, "y": 0.8}, {"x": 0.5, "y": 0.6}, {"x": 0.5, "y": 0.4}, {"x": 0.5, "y": 0.2}], [{"x": 0.5, "y": 0.8}, {"x": 0.6, "y": 0.8}, {"x": 0.7, "y": 0.7}, {"x": 0.7, "y": 0.6}, {"x": 0.6, "y": 0.47}, {"x": 0.5, "y": 0.5}]],
        c : [{"x": 0.6, "y": 0.8}, {"x": 0.4, "y": 0.8}, {"x": 0.3, "y": 0.7}, {"x": 0.3, "y": 0.4}, {"x": 0.4, "y": 0.2}, {"x": 0.6, "y": 0.2}],
        d : [[{"x": 0.5, "y": 0.8}, {"x": 0.5, "y": 0.6}, {"x": 0.5, "y": 0.4}, {"x": 0.5, "y": 0.2}], [{"x": 0.5, "y": 0.8}, {"x": 0.4, "y": 0.8}, {"x": 0.3, "y": 0.7}, {"x": 0.3, "y": 0.6}, {"x": 0.4, "y": 0.47}, {"x": 0.5, "y": 0.5}]],
        e : [{"x": 0.6, "y": 0.8}, {"x": 0.4, "y": 0.8}, {"x": 0.3, "y": 0.7}, {"x": 0.3, "y": 0.4}, {"x": 0.4, "y": 0.2}, {"x": 0.6, "y": 0.2}, {"x": 0.6, "y": 0.4}, {"x": 0.4, "y": 0.4}],
        f : [[{"x": 0.5, "y": 0.8}, {"x": 0.5, "y": 0.6}, {"x": 0.5, "y": 0.4}, {"x": 0.6, "y": 0.2}, {"x": 0.7, "y": 0.2}],[{"x": 0.58, "y": 0.5}, {"x": 0.43, "y": 0.5}]],
        g : [{"x": 0.3, "y": 0.8}, {"x": 0.5, "y": 0.8}, {"x": 0.5, "y": 0.6}, {"x": 0.5, "y": 0.4}, {"x": 0.5, "y": 0.2}, {"x": 0.45, "y": 0.3}, {"x": 0.35, "y": 0.4}, {"x": 0.25, "y": 0.23}, {"x": 0.35, "y": 0.1}, {"x": 0.45, "y": 0.13}],
        h : [[{"x": 0.5, "y": 0.8}, {"x": 0.5, "y": 0.6}, {"x": 0.5, "y": 0.4}, {"x": 0.5, "y": 0.2}], [{"x": 0.7, "y": 0.8}, {"x": 0.7, "y": 0.6}, {"x": 0.6, "y": 0.47}, {"x": 0.5, "y": 0.5}]],
        i : [[{"x": 0.5, "y": 0.8}, {"x": 0.5, "y": 0.6}, {"x": 0.5, "y": 0.4}],[{"x": 0.5, "y": 0.2}]],
        j : [[{"x": 0.4, "y": 0.8}, {"x": 0.5, "y": 0.8}, {"x": 0.5, "y": 0.6}, {"x": 0.5, "y": 0.4}], [{"x": 0.5, "y": 0.2}]],
        k : [[{"x": 0.5, "y": 0.8}, {"x": 0.5, "y": 0.6}, {"x": 0.5, "y": 0.4}, {"x": 0.5, "y": 0.2}], [{"x": 0.7, "y": 0.8}, {"x": 0.5, "y": 0.5}, {"x": 0.7, "y": 0.2}]],
        l : [{"x": 0.6, "y": 0.8}, {"x": 0.5, "y": 0.8}, {"x": 0.5, "y": 0.6}, {"x": 0.5, "y": 0.4}, {"x": 0.5, "y": 0.2}],
        m : [[{"x": 0.5, "y": 0.6}, {"x": 0.48, "y": 0.4}, {"x": 0.4, "y": 0.3}, {"x": 0.3, "y": 0.3}, {"x": 0.2, "y": 0.6}, {"x": 0.2, "y": 0.2}], [{"x": 0.8, "y": 0.6}, {"x": 0.8, "y": 0.4}, {"x": 0.7, "y": 0.3}, {"x": 0.6, "y": 0.3}, {"x": 0.53, "y": 0.4}, {"x": 0.5, "y": 0.6}]],
        n : [{"x": 0.7, "y": 0.6}, {"x": 0.68, "y": 0.4}, {"x": 0.6, "y": 0.3}, {"x": 0.5, "y": 0.3}, {"x": 0.4, "y": 0.6}, {"x": 0.4, "y": 0.2}],
        ñ : [[{"x": 0.7, "y": 0.6}, {"x": 0.68, "y": 0.4}, {"x": 0.6, "y": 0.3}, {"x": 0.5, "y": 0.3}, {"x": 0.4, "y": 0.6}, {"x": 0.4, "y": 0.2}], [{"x": 0.7, "y": 0.15}, {"x": 0.56, "y": 0.08}, {"x": 0.46, "y": 0.15}]],
        o : [{"x": 0.63, "y": 0.4}, {"x": 0.6, "y": 0.6}, {"x": 0.5, "y": 0.7}, {"x": 0.4, "y": 0.7}, {"x": 0.3, "y": 0.5}, {"x": 0.3, "y": 0.3}, {"x": 0.4, "y": 0.2}, {"x": 0.5, "y": 0.2}, {"x": 0.6, "y": 0.3}],
        p : [{"x": 0.5, "y": 0.8}, {"x": 0.5, "y": 0.6}, {"x": 0.5, "y": 0.4}, {"x": 0.5, "y": 0.2}, {"x": 0.55, "y": 0.3}, {"x": 0.65, "y": 0.4}, {"x": 0.75, "y": 0.23}, {"x": 0.65, "y": 0.1}, {"x": 0.55, "y": 0.13}],
        q : [{"x": 0.5, "y": 0.8}, {"x": 0.5, "y": 0.6}, {"x": 0.5, "y": 0.4}, {"x": 0.5, "y": 0.2}, {"x": 0.45, "y": 0.3}, {"x": 0.35, "y": 0.4}, {"x": 0.25, "y": 0.23}, {"x": 0.35, "y": 0.1}, {"x": 0.45, "y": 0.13}],
        r : [[{"x": 0.5, "y": 0.8}, {"x": 0.5, "y": 0.6}, {"x": 0.5, "y": 0.4}, {"x": 0.5, "y": 0.2}], [{"x": 0.65, "y": 0.23}, {"x": 0.55, "y": 0.3}, {"x": 0.5, "y": 0.5}]],
        s : [{"x": 0.3, "y": 0.8}, {"x": 0.5, "y": 0.8}, {"x": 0.6, "y": 0.7}, {"x": 0.6, "y": 0.6}, {"x": 0.5, "y": 0.5}, {"x": 0.4, "y": 0.5}, {"x": 0.3, "y": 0.4}, {"x": 0.3, "y": 0.3}, {"x": 0.4, "y": 0.2}, {"x": 0.6, "y": 0.2}],
        t : [[{"x": 0.5, "y": 0.8}, {"x": 0.5, "y": 0.6}, {"x": 0.5, "y": 0.4}, {"x": 0.5, "y": 0.2}], [{"x": 0.58, "y": 0.4}, {"x": 0.43, "y": 0.4}]],
        u : [{"x": 0.7, "y": 0.2}, {"x": 0.7, "y": 0.5}, {"x": 0.6, "y": 0.7}, {"x": 0.4, "y": 0.7}, {"x": 0.3, "y": 0.5}, {"x": 0.3, "y": 0.2}],
        v : [{"x": 0.7, "y": 0.2}, {"x": 0.6, "y": 0.5}, {"x": 0.5, "y": 0.8}, {"x": 0.4, "y": 0.5}, {"x": 0.3, "y": 0.2}],
        w : [{"x": 0.8, "y": 0.2}, {"x": 0.65, "y": 0.7}, {"x": 0.5, "y": 0.2}, {"x": 0.35, "y": 0.7}, {"x": 0.2, "y": 0.2}],
        x : [[{"x": 0.3, "y": 0.7}, {"x": 0.5, "y": 0.4}, {"x": 0.7, "y": 0.2}], [{"x": 0.7, "y": 0.7}, {"x": 0.5, "y": 0.4}, {"x": 0.3, "y": 0.2}]],
        y : [[{"x": 0.5, "y": 0.4}, {"x": 0.3, "y": 0.2}], [{"x": 0.3, "y": 0.7}, {"x": 0.5, "y": 0.4}, {"x": 0.7, "y": 0.2}]],
        z : [{"x": 0.7, "y": 0.7}, {"x": 0.3, "y": 0.7}, {"x": 0.5, "y": 0.4}, {"x": 0.7, "y": 0.2}, {"x": 0.3, "y": 0.2}],
        "á" : [[{"x": 0.7, "y": 0.8}, {"x": 0.63, "y": 0.5}, {"x": 0.6, "y": 0.7}, {"x": 0.5, "y": 0.8}, {"x": 0.4, "y": 0.8}, {"x": 0.3, "y": 0.6}, {"x": 0.3, "y": 0.4}, {"x": 0.4, "y": 0.3}, {"x": 0.5, "y": 0.3}, {"x": 0.6, "y": 0.4}],[{"x": 0.53, "y": 0.17}, {"x": 0.6, "y": 0.07}]],
        "é" : [[{"x": 0.6, "y": 0.8}, {"x": 0.4, "y": 0.8}, {"x": 0.3, "y": 0.7}, {"x": 0.3, "y": 0.52}, {"x": 0.4, "y": 0.32}, {"x": 0.6, "y": 0.32}, {"x": 0.6, "y": 0.52}, {"x": 0.4, "y": 0.52}], [{"x": 0.53, "y": 0.17}, {"x": 0.6, "y": 0.07}]],
        "í" : [[{"x": 0.5, "y": 0.8}, {"x": 0.5, "y": 0.6}, {"x": 0.5, "y": 0.4}],[{"x": 0.5, "y": 0.2}, {"x": 0.55, "y": 0.15}]],
        "ó" : [[{"x": 0.63, "y": 0.45}, {"x": 0.6, "y": 0.65}, {"x": 0.5, "y": 0.75}, {"x": 0.4, "y": 0.75}, {"x": 0.3, "y": 0.55}, {"x": 0.3, "y": 0.35}, {"x": 0.4, "y": 0.25}, {"x": 0.5, "y": 0.25}, {"x": 0.6, "y": 0.35}], [{"x": 0.58, "y": 0.17}, {"x": 0.65, "y": 0.07}]],
        "ú" : [[{"x": 0.7, "y": 0.25}, {"x": 0.7, "y": 0.55}, {"x": 0.6, "y": 0.75}, {"x": 0.4, "y": 0.75}, {"x": 0.3, "y": 0.55}, {"x": 0.3, "y": 0.25}], [{"x": 0.53, "y": 0.17}, {"x": 0.6, "y": 0.07}]]
    };

    function handleMouseDown(event) {
        //if (stage.contains(title)) { stage.clear(); stage.removeChild(title); }
        stroke = 54;
        oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
        oldMidPt = oldPt;
        stage.addEventListener("stagemousemove", handleMouseMove);
    }

    function handleMouseMove(event) {
        if (draw && !wrong) {
            var midPt = new createjs.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);

            drawingCanvas.graphics.clear().setStrokeStyle(stroke, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

            oldPt.x = stage.mouseX;
            oldPt.y = stage.mouseY;

            oldMidPt.x = midPt.x;
            oldMidPt.y = midPt.y;

            stage.update();
        }
    }

    function handleMouseUp(event) {
        stage.removeEventListener("stagemousemove", handleMouseMove);
    }

    function redraw() {
        stage.removeChild(stage.getChildByName('draw'));
        stage.clear();
        drawingCanvas = new createjs.Shape();
        drawingCanvas.name = "draw";
        stage.addChild(drawingCanvas);
    }

    var greyPoint = function (obj) {
        var c, container, color;

        color = '#D1C6FF';
        c = new createjs.Shape();
        c.graphics.beginFill(color).drawCircle(0, 0, 40);
        c.scaleX = c.scaleY = canvas.width * 0.0008;
        container = new createjs.Container();
        container.x = container.y = 120;
        container.addChild(c);
        container.name = 'container' + obj.i;

        container.x = canvas.width * obj.pos.x;
        container.y = canvas.height * obj.pos.y;

        stageSprite.addChild(container);
        stageSprite.update();
    };

    var point = function (obj) {
        var c, container, ch1;

        color = obj.changeColor ? '#5888A8' : '#1688A8';

        c = new createjs.Shape();
        c.graphics.beginFill(obj.i === obj.last ? color : '#16A82C').drawCircle(0, 0, 40);

        c.scaleX = c.scaleY = canvas.width * 0.0008;

        container = new createjs.Container();
        container.x = container.y = 120;
        container.addChild(c);
        container.name = 'container' + obj.i;

        container.x = canvas.width * obj.pos.x;
        container.y = canvas.height * obj.pos.y;

        var before = stage.getChildByName('container' + (obj.i - 1));
        if (before) {
            ch1 = before.children[0];
        }

        if (obj.i === obj.last) {
            container.on('pressmove', function (event) {
                if (ch1 && !draw) {
                    wrong = false;
                    ch1.graphics._fill.style = '#E86223';
                }
                draw = true;
                stage.update();
            });
            container.addEventListener('pressup', function () {
                var container, ch1;
                for (var i = 0; i < obj.last; i += 1) {
                    container = stage.getChildByName('container' + i);
                    ch1 = container.children[0];
                    var str = ch1.graphics._fill.style;
                    if (str === color) {
                        Scene3.setWin(1);
                    }
                }
                if (Scene3.getWin() === obj.last) {
                    if (saveStage) {
                        saveStageAsBmp();
                    }
                    stage.removeAllChildren();
                    draw = wrong = false;
                    redraw();
                    makeChar();
                } else {
                    redraw();
                    for (var i = 0; i < obj.last; i += 1) {
                        container = stage.getChildByName('container' + i);
                        ch1 = container.children[0];
                        ch1.graphics._fill.style = '#16A82C';
                    }
                    draw = false;
                }
                Scene3.setWin(0);
                stage.update();
            });
        } else {
            container.addEventListener('mouseover', function (event) {
                var str = c.graphics._fill.style;

                if (draw && str === '#E86223' && !wrong) {
                    c.graphics._fill.style = color;
                    if (ch1) {
                        ch1.graphics._fill.style = '#E86223';
                    }
                } else {
                    wrong = true;
                    redraw();
                }
                stage.update();
            });
        }
        stage.addChild(container);
        stage.update();
    };

    function saveStageAsBmp() {
        stageSprite.removeAllChildren();
        var bmp = new createjs.Bitmap(canvas);
        stageSprite.addChild(bmp);
        stageSprite.update();
    }

    var makeChar = (function () {
        var j = 0, next = false;
        return function () {
            var chars, last, greyChars;

            chars = characters[word[j]];//equals to an array of objects like {x:0.5 , y:0.4}

            if (!chars) {
                stageUi.removeAllChildren();
                stageSprite.removeAllChildren();
                stage.removeAllChildren();

                stageSprite.update();
                stageUi.update();
                stage.update();

                next = false, j = 0;
                currentlevel = currentlevel === Scene3.getConfig().length ? 1 : currentlevel + 1;
                Scene3.initialize({lan: language, level: currentlevel, bool: true});
            } else {
                if (!chars[0].x && !next) {
                    saveStage = true;

                    next = true;

                    greyChars = chars[1];
                    for (var i = 0, l = greyChars.length; i < l; i += 1) {
                        greyPoint({i: i, pos: greyChars[i], changeColor: next});
                    }
                    chars = chars[0];
                    j -= 1;
                } else if (next) {
                    saveStage = false;
                    next = false;
                    chars = chars[1];
                } else {
                    stageSprite.removeAllChildren();
                    stageSprite.update();
                }
                last = (chars.length - 1);
                for (var i = 0, l = chars.length; i < l; i += 1) {
                    point({i: i, pos: chars[i], last: last, changeColor: next});
                }
                j += 1;
            }
        };
    }());

    var obj = {
        progress: {},
        config: {},
        queue: {}
    };
    Scene3 = (function () {
        var win, array;
        win = 0;
        array = [];
        return {
            getName: function () {
                return 'scene3';
            },
            step: function (dataLevel) {
                var text = new createjs.Text(dataLevel.word, "30px Arial", "#ff7700");


                draw = false, wrong = false, saveStage = true;

                text.x = 50;
                text.y = 50;
                word = dataLevel.word.match(/[\s\S]{1,1}/g) || [];

                cwidth = 230 * canvas.width * 0.0008;
                cheight = 67 * canvas.height * 0.0008;

                currentlevel = Scene3.getValues().level + 1;

                drawingCanvas = new createjs.Shape();
                drawingCanvas.name = "draw";

                stage.enableMouseOver();
                stage.addEventListener("stagemousedown", handleMouseDown);
                stage.addEventListener("stagemouseup", handleMouseUp);

                makeChar();

                stage.autoClear = false;

                //stageSprite.autoClear = false;
                stage.addChild(drawingCanvas);

                stageUi.addChild(text);
                stageUi.update();
                stage.update();

                window.onresize = resize(0);
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
    Scene3.initialize = setUp(obj, Scene3);

    var resize = function (length) {

        return function () {

        };
    };
}());
