let canvas = document.getElementById("main-canvas")
console.log(canvas.offsetHeight)
let mainApp = new PIXI.Application({
    width:1,
    heigh:1,
    view:canvas,
    backgroundColor:0x000000,
    antialias:true,
    resolution:1
})
mainApp.renderer.autoResize = true;
mainApp.renderer.resize(canvas.offsetWidth,canvas.offsetHeight);
window.onresize = function(){
    mainApp.renderer.resize(canvas.offsetWidth,canvas.offsetHeight);
    this.console.log(canvas.offsetWidth,canvas.offsetHeight)
    
    this.console.log(mainApp.renderer.view.width,mainApp.renderer.view.height)
}

