/**
 * Created by jberivera
 */
var stage;
//Container
var container=document.getElementById("container");
container.style.width="100%";
container.style.height=window.innerHeight+"px";
//Canvas
var canvas=document.getElementById("myCanvas");
canvas.width=container.offsetWidth;
canvas.height=container.offsetHeight;
var Queue;
var Scenes=[null,Scene1];
var language="es";
var init=function(){
    stage=new createjs.Stage(canvas);
    createjs.Touch.enable(stage);
    Queue= new createjs.LoadQueue();
    Queue.addEventListener("complete",selectionPanel);
    Queue.Manifest=[
        {id:"setting",src:"assets/init/setting-icon48.png"},
        {id:"scene1",src:"assets/init/scene1.png"},
        {id:"scene2",src:"assets/init/scene1.png"},
        {id:"scene3",src:"assets/init/scene1.png"},
        {id:"scene4",src:"assets/init/scene1.png"}
    ];
    Queue.loadManifest(Queue.Manifest);
//    Scenes.push(Scene1);
};
var selectionPanel=function(){
    var rect=new createjs.Shape();
    rect.graphics.beginFill("#E8D24A").drawRect(0,0,canvas.width,canvas.height);
    stage.addChild(rect);

    for(var i=1; i<Queue.Manifest.length;i++){
        new Scene(i);
    }
    new settingButton();

    stage.update();
};
var settingButton=function(){
    var setting=new createjs.Bitmap(Queue.getResult("setting"));
    setting.x=canvas.width-100;
    setting.y=25;
    stage.addChild(setting);
    setting.on("click",function(){
        settingPanel();
    });
};
var lanvect=["es","en"];
var settingPanel=function(){
    var rect=new createjs.Shape();
    rect.graphics.beginFill("000").drawRect(0,0,canvas.width-200,canvas.height-200);

//    var es=lanOption("es");

    var en=new createjs.Shape();
    en.graphics.beginFill("#fff485").drawCircle(270,100,70);

    var settings=new createjs.Container();
    settings.x = 100;
    settings.y = 100;
    settings.addChild(rect);
    for(var i=0;i < lanvect.length;i++){
        settings.addChild(new lanOption(lanvect[i],i).c);
    }
    stage.addChild(settings);
    stage.update();
};
var lanOption=function(lan,i){
    this.c=new createjs.Shape();
    this.c.graphics.beginFill("#"+Math.floor(Math.random()*999)).drawCircle(100*(i+1)+80*i,100,70);
    var that=this;
    this.c.on("click",function(){
        console.log(lan);
        language=lan;
        stage.removeChild(that.c.parent);
        stage.update();
    });
//    return es;
};
var layout={
    max:null,
    i:null,
    y:canvas.height*0.2 + 40
};
var Scene=function(i){
    var selectScene=new createjs.Bitmap(Queue.getResult("scene"+i));
    var x=selectScene.image.width*(i-1)+100*i;
    var y=canvas.height*0.2;
    if(x+selectScene.image.width<canvas.width){
        selectScene.x=x;
        selectScene.y=y;
    }else{
        if(!layout.max){//set layout.max when its
            layout.max=i-1;
            layout.i=i-1;
        }else if(i-layout.i===layout.max+1){
            layout.i=i-1;
            layout.y+=150;
        }
        var ii=i-layout.i;
        x=selectScene.image.width*(ii-1)+100*ii;
        y=selectScene.image.height+layout.y;
        selectScene.x=x;
        selectScene.y=y;
    }
    stage.addChild(selectScene);
    selectScene.on("click",function(){
        stage.removeChild(selectScene);
        if(Scenes[i]){
            stage.removeAllChildren();
            Scenes[i].initialize(language,1);
        }
        stage.update();
    });
    stage.update();
};