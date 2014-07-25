var Scene2={};
(function(){
    "use strict";
    var obj={
        progress:{},
        config:{},
        queue:{}
    };
    Scene2 = (function(){
        var win, svg;
        win = 0;
        svg = [];

        return {
            getName:function(){
                return "scene2";
            },
            step: function(level){

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
    Scene2.initialize = setUp(obj, Scene2);
}());