var loadComplete = function (scene) {
    return function () {
        stage.removeAllChildren();
        var dataLevel, queue, backg;
        dataLevel = scene.getConfig()[scene.getValues().level];//
        queue = scene.getQueue();

        backg = new createjs.Bitmap(queue.getResult('backg'));
        backg.name = 'backg';
        backg.scaleX = canvas.width / backg.image.width;
        backg.scaleY = canvas.height / backg.image.height;
        stageBack.addChild(backg);
        stageBack.update();
        scene.step(dataLevel);
    };
};

var queueProgress = function (scene) {
    return function (event) {
        var value = event.loaded / event.total;
        scene.getProgress().graphics.clear()
            .beginFill('#fff').drawRoundRect(-103, -13, 306, 26, 13)
            .beginFill('#0D83BA').drawRoundRect(-100, -10, value * 300, 20, 10);
        stage.update();
    }
};

var setUp = function (obj, scene) {

    var loader;

    return function (values) {
        // values = {lan: 'en', level: 1, bool: true}
        scene.getValues = function () {
            return values;
        };

        stageSprite.removeAllChildren();
        stageBack.removeAllChildren();

        var rect = new createjs.Shape();
        rect.graphics.beginFill('#E8D24A').drawRect(0, 0, canvas.width, canvas.height);
        stage.addChild(rect);

        obj.progress = new createjs.Shape();
        obj.progress.x = canvas.width / 2;
        obj.progress.y = canvas.height * 0.5;
        stage.addChild(obj.progress);

        loader = new createjs.LoadQueue();

        loader.addEventListener('complete', function () {
            var dataLevel, Manifest;
            Manifest = [];

            values.words = loader.getResult('words');//returns png file a sprite with words
            obj.config = loader.getResult('config');
            dataLevel = obj.config[values.level];//returns an object with all info about current level
            obj.queue = new createjs.LoadQueue();
            obj.queue.addEventListener('progress', queueProgress(scene));
            obj.queue.addEventListener('complete', loadComplete(scene));

            Manifest.push({id: 'backg', src: dataLevel.backg, type: createjs.LoadQueue.IMAGE});

            for (var i = 0, l = dataLevel.img.length; i < l; i += 1) {
                Manifest.push({id: 'img' + i, src: dataLevel.img[i].src, type: createjs.LoadQueue.IMAGE});
            }

            obj.queue.loadManifest(Manifest);
        });

        loader.loadManifest([
            {
                id: 'words',
                src: 'assets/' + scene.getName() + '/' + values.level + '/img/lan/words_' + values.lan + '.png',
                type: createjs.LoadQueue.IMAGE
            },
            {id: 'config', src: 'config/' + scene.getName() + '-config.json', type: createjs.LoadQueue.JSON}
        ]);
        values.level -= 1;
    };
};

var random = function (length) {
    var rand, i, j, rd;
    rand = [];
    for (i = 0; i < length; i += 1) {
        rd = Math.floor(Math.random() * length);
        for (j = 0; j < length; j += 1) {
            if (rand[j] === rd) {
                rd = Math.floor(Math.random() * length);
                j = -1;
            }
        }
        rand.push(rd);
        //rand.push(i);
    }
    return rand;
};