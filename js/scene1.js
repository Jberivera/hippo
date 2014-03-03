/**
 * Created by jberivera
 */
var Scene1= new function(){
    var that=this;
    this.config;
    this.Queue;
    this.win=0;
    this.svg=[];

    this.initialize=function(lan,level){
        that.lan=lan;
        that.level=level-1;
        var rect=new createjs.Shape();
        rect.graphics.beginFill("#E8D24A").drawRect(0,0,canvas.width,canvas.height);
        stage.addChild(rect);
        that.progress=new createjs.Shape();
        that.progress.x=canvas.width/2;
        that.progress.y=canvas.height*0.5;
        stage.addChild(that.progress);

        that.loader = new createjs.LoadQueue();
        that.loader.addEventListener("complete", loaderComplete);
        that.loader.loadManifest([
            {id:"lan",src:"lan/"+lan+".json",type:createjs.LoadQueue.JSON},
            {id:"config",src:"config/scene1-config.json",type:createjs.LoadQueue.JSON}
        ]);
    };
};

var loaderComplete=function(){
    var loader=Scene1.loader;
    Scene1.lan=loader.getResult("lan");
    Scene1.config=loader.getResult("config");
    var level=Scene1.config[Scene1.level];
    Scene1.Queue=new createjs.LoadQueue();
    Scene1.Queue.addEventListener("progress",queueProgress);
    Scene1.Queue.addEventListener("complete",loadManifest);
    var Manifest=[];
    for(var i=0; i<level.backg.length; i++){
        Manifest.push({id:"backg"+i,src:level.backg[i].backgUrl,type:createjs.LoadQueue.IMAGE});
    }
    for(var i=0; i<level.img.length; i++){
        Manifest.push({id:"img"+i,src:level.img[i].imgUrl,type:createjs.LoadQueue.IMAGE});
    }
    Scene1.Queue.loadManifest(Manifest);
};
var queueProgress=function(event){
    var value=event.loaded/event.total;
    Scene1.progress.graphics.clear()
        .beginFill("#fff").drawRoundRect(-103,-13,306,26,13)
        .beginFill("#0D83BA").drawRoundRect(-100,-10,value*300|0,20,10);
    stage.update();
};
var loadManifest=function(){
    var level=Scene1.config[Scene1.level];
    var loader=Scene1.Queue;
    for(var i=0; i < level.backg.length;i++){
        var backg=new createjs.Bitmap(loader.getResult("backg"+ i ));
        backg.scaleX=canvas.width/backg.image.width;
        backg.scaleY=canvas.height/backg.image.height;
        stage.addChild(backg);
    }
//  imgs = an array with the images
    var img=level.img;
    for(var i=0;i < img.length;i++){
        Scene1.svg[i]=new createjs.Bitmap(loader.getResult("img"+i));
        Scene1.svg[i].scaleX=Scene1.svg[i].scaleY=canvas.width*0.00009;
        Scene1.svg[i].x=canvas.width*img[i].x;
        Scene1.svg[i].y=canvas.height*img[i].y;
        stage.addChild(Scene1.svg[i]);
    }
    for(var i=0;i<Scene1.lan.scene1[Scene1.level].length;i++){
        new circle(i);
    }
    stage.update();
};
var circle=function(i){
    var that=this;
    that.i=i;
    var c = new createjs.Shape();
    c.graphics.beginFill("#"+Math.floor(Math.random()*999)).drawCircle(0, 0, canvas.width*0.045); //set color by default > lan.scene1[level][i].color

    //lan = an array
    var lan=Scene1.lan.scene1[Scene1.level];
    var label = new createjs.Text(lan[i].drag, "bold 25px Arial", "#FFFFFF");
    label.textAlign = "center";
    label.y = -12;

    var dragger = new createjs.Container();
    dragger.x = dragger.y = 100;
    dragger.addChild(c, label);
    stage.addChild(dragger);
    dragger.on("pressmove",function(evt) {
        // currentTarget will be the container that the event listener was added to:
        evt.currentTarget.x = evt.stageX;
        evt.currentTarget.y = evt.stageY;
        stage.update();
    });
    dragger.on("pressup",function(evt){
        var bitmap=Scene1.svg[i];
        if((evt.currentTarget.x > (bitmap.x) && (evt.currentTarget.x < (bitmap.x+110)))){
            if((evt.currentTarget.y > (bitmap.y) && (evt.currentTarget.y < (bitmap.y+130)))){
                dragger.removeAllEventListeners();
                dragger.removeChild(c);
                label.font="bold 32px Arial";
                label.color="#"+Math.floor(Math.random()*999);
                label.y = -100;
                stage.update();
                Scene1.win+=1;
            }
        }
        if(Scene1.win===Scene1.lan.scene1[Scene1.level].length){
            stage.removeAllChildren();
            Scene1.win=0;
            init();
        }
    });
    stage.update();
};