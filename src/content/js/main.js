let canvas = document.getElementById("main-canvas")

let mainApp = new PIXI.Application({
    width:100,
    height: 100,
    view:canvas,
    backgroundColor:0x000000,
    antialias:true,
    resolution:1
})
let renderer = mainApp.renderer;

function resize(){
    let w = window.innerWidth;
    let h = window.innerHeight;
    renderer.resize(w,h);
    // renderer.view.style.width = w+"px"
    // renderer.view.style.height = h+"px"
}
resize();

window.onresize = function(){
    resize();
}


PIXI.loader
.add("Test","content/images/Beagle-MP.jpg")
.load(function(){
    let x = new PIXI.Sprite(PIXI.loader.resources["Test"].texture);
    mainApp.stage.addChild(x)
})
