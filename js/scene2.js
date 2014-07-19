var Scene2={};
(function(){
    "use strict";
    var obj={
        progress:{},
        config:{},
        queue:{}
    };
    Scene2=(function(){
        var queue,config,win,svg,progress;

        return {
            getName:function(){
                return "scene2";
            },
            step: function(level){

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
    Scene2.initialize = setUp(obj,Scene2);
}());
