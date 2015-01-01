var Scene3 = {};
(function(){
    'use strict';
    var cwidth, cheight, stroke, oldPt, oldMidPt, drawingCanvas, draw = false, wrong = false, word = [], erase = true;

    var characters = {
        a : [{"x": 0.7, "y": 0.8}, {"x": 0.63, "y": 0.5}, {"x": 0.6, "y": 0.7}, {"x": 0.5, "y": 0.8}, {"x": 0.4, "y": 0.8}, {"x": 0.3, "y": 0.6}, {"x": 0.3, "y": 0.4}, {"x": 0.4, "y": 0.3}, {"x": 0.5, "y": 0.3}, {"x": 0.6, "y": 0.4}],
        v : [{"x": 0.3, "y": 0.2}, {"x": 0.4, "y": 0.5}, {"x": 0.5, "y": 0.8}, {"x": 0.6, "y": 0.5}, {"x": 0.7, "y": 0.2}],
        i : [[{"x": 0.5, "y": 0.8}, {"x": 0.5, "y": 0.6}, {"x": 0.5, "y": 0.4}],[{"x": 0.5, "y": 0.2}]]
    };

    function handleMouseDown(event) {
        //if (stage.contains(title)) { stage.clear(); stage.removeChild(title); }
        stroke = 54;
        oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
        oldMidPt = oldPt;
        stage.addEventListener("stagemousemove", handleMouseMove);
    }

    function handleMouseMove(event) {
        if(draw && !wrong){
            var midPt = new createjs.Point(oldPt.x + stage.mouseX>>1, oldPt.y+stage.mouseY>>1);

            drawingCanvas.graphics.clear().setStrokeStyle(stroke, 'round', 'round').beginStroke('#501CE8').moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

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
    function redraw(){
        stage.removeChild(stage.getChildByName('draw'));
        if(erase){
            stage.clear();
        }
        drawingCanvas = new createjs.Shape();
        drawingCanvas.name = "draw";
        stage.addChild(drawingCanvas);
    }
    var point = function (obj) {
        var c, container, ch1;
        c = new createjs.Shape();
        c.graphics.beginFill(obj.i === obj.last ? '#501CE8':'#16A82C').drawCircle(0, 0, 40);

        c.scaleX = c.scaleY = canvas.width * 0.0008;

        container = new createjs.Container();
        container.x = container.y = 120;
        container.addChild(c);
        container.name = 'container' + obj.i;

        container.x = canvas.width * obj.pos.x;
        container.y = canvas.height * obj.pos.y;

        var before = stage.getChildByName('container' + (obj.i-1));
        if(before){
            ch1 = before.children[0];
        }

        if(obj.i === obj.last){
            container.on('pressmove', function(event){
                if(ch1 && !draw){
                    wrong = false;
                    ch1.graphics._fillInstructions[0].params[1] = '#E86223';
                }
                draw = true;
                stage.update();
            });
            container.addEventListener('pressup', function(){
                var container, ch1;
                for(var i = 0; i < obj.last; i+=1){
                    container = stage.getChildByName('container' + i);
                    ch1 = container.children[0];
                    var str = ch1.graphics._fillInstructions[0].params[1];
                    if(str === '#501CE8'){
                        Scene3.setWin(1);
                    }
                }
                if(Scene3.getWin() === obj.last) {
                    console.log("!Ganaste");
                    stage.removeAllChildren();
                    draw = wrong = false;
                    redraw();
                    madeChar();
                }else{
                    redraw();
                    for(var i = 0; i < obj.last; i+=1){
                        container = stage.getChildByName('container' + i);
                        ch1 = container.children[0];
                        ch1.graphics._fillInstructions[0].params[1] = '#16A82C';
                    }   
                    draw = false;
                }
                Scene3.setWin(0);
                stage.update();
            });
        }else{
            container.addEventListener('mouseover', function(event) {
                var str = c.graphics._fillInstructions[0].params[1];

                if(draw && str === '#E86223' && !wrong){
                    c.graphics._fillInstructions[0].params[1] = '#501CE8';
                    if (ch1) {
                        ch1.graphics._fillInstructions[0].params[1] = '#E86223';
                    }
                }else{
                    wrong = true;
                    redraw();
                }
                stage.update();
            });
        }
        stage.addChild(container);
        stage.update();
    };

    var madeChar = (function(){
        var j = 0, next = false;
        return function(){
            var chars, last;

            chars = characters[word[j]];//equals to an array of objects like {x:0.5 , y:0.4}

            if(!chars[0].x && !next){
                erase = false;
                next = true;
                chars = chars[0];
                j-=1;
            }else if(next){
                erase = true;
                next = false;
                chars = chars[1];
            }
            last = (chars.length - 1);
            for (var i = 0, l = chars.length; i < l; i += 1) {
                point({i: i, pos: chars[i], last : last});
            }
            j+=1;
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
                text.x = 50;
                text.y = 50;
                word = dataLevel.word.match(/[\s\S]{1,1}/g) || [];
                console.log(word);
                cwidth = 230 * canvas.width * 0.0008;
                cheight = 67 * canvas.height * 0.0008;

                drawingCanvas = new createjs.Shape();
                drawingCanvas.name = "draw";
                stage.enableMouseOver();
                stage.addEventListener("stagemousedown", handleMouseDown);
                stage.addEventListener("stagemouseup", handleMouseUp);

                madeChar();
                
                stage.autoClear = false;
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
