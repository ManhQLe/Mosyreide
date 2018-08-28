
let ce = new CE({
    canvas:document.getElementById("main-canvas"),
    layers:["main","select"]
})

class SVGVessel{
    constructor(svgConstruct,pos){
        let position = pos || [0,0]
        let construct = svgConstruct
        Object.defineProperties(this,{
            "pos":{
                get(){
                    return position;
                },
                set:(v)=>{
                    position = pos;
                    construct.setAttribute("transform",`translate(${position[0]},${position[1]})`)
                }
            },
            "construct":{
                get(){
                    return construct;
                }
            }
        })
    }
}

var entities = [];
let zoomRate = .15;
let canvas = ce.agreement.canvas;
let track = {
    x: 0,
    y: 0
}
let state = 0

function createRClay(pos){
    let g = ce.createElement("g")
    g.setAttribute("transform",`translate(${pos[0]},${pos[1]})`)
    d3.select(g).append("rect")
    .attr("x",-50)
    .attr("y",-50)
    .attr("width",100)
    .attr("height",100)
    .attr("fill","gray")
    .attr("draggable",true)


    var clay = new mosyrejs2.RClay({
        _vessel:new SVGVessel(g,pos)
    })
    entities.push(clay);
    return clay;
    
}


function getMouse(e){
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.
    return [x,y]
}

d3.select(canvas).on("drop",(e = d3.event)=>{
    e.preventDefault();    
    let p = ce.view2World(getMouse(e));
    let c = createRClay(p);    
    ce.addElement(c.agreement._vessel.construct);

})

canvas.addEventListener("wheel", (e) => {
    let m = getMouse(e)    
    let nz = ce.zoom * (1 + ((e.deltaY < 0) ? zoomRate : -zoomRate));
    ce.zoomTo(nz, m)
})

canvas.addEventListener("click",(e)=>{
    let m = getMouse(e);
    let p = ce.view2World(m);
    ce.clearLayers(["select"])
    entities.forEach(e=>{
        let vessel = e.agreement._vessel
        let pos = vessel.pos;
        let bbox = vessel.construct.getBBox();
        
        if(GEO.rectOverlap({x:bbox.x+pos[0],y:bbox.y+pos[1],w:bbox.width,h:bbox.height},
            {x:p[0],y:p[1],w:0,h:0}
        ))
        {

            let g = ce.createElement("g")            
            d3.select(g)
            .append("rect")
            .attr("x",bbox.x+pos[0])
            .attr("y",bbox.y+pos[1])
            .attr("width",bbox.width)
            .attr("height",bbox.height)
            .attr("stroke","white")
            .attr("stroke-dasharray",3)
            .attr("fill","none")
            
            ce.addElement(g,"select");
        }
    })
})

canvas.addEventListener("mousedown", (e) => {
    let m = getMouse(e)
    track.x = m[0];
    track.y = m[1];
})

canvas.addEventListener("mousemove", (e) => {
    let m = getMouse(e)
    if (e.buttons == 1) {


        let dv = ce.toWorldScale([track.x - m[0], track.y - m[1]])
        let pos = ce.pos;
        pos[0] += dv[0];
        pos[1] += dv[1];
        track.x = m[0];
        track.y = m[1];
        ce.pos = pos;
    }
})

function Render(){
    let l = ce.getLayer();

    d3.select(l).append("circle")
    .attr("cx",50)
    .attr("cy",50)
    .attr('r',10)
    .attr("fill","#f1c40f")
    
    d3.select(l).append("rect")
    .attr("x",0)
    .attr("y",0)
    .attr("width",100)
    .attr("height",120)
    .attr("stroke","#ecf0f1")
    .attr("fill","none")
    
    d3.select(l).append("rect")
    .attr("x",0)
    .attr("y",0)
    .attr("width",100)
    .attr("height",100)
    .attr("stroke","#e74c3c")
    .attr("fill","none")
    
    d3.select(l).append("rect")
    .attr("x",50)
    .attr("y",50)
    .attr("width",50)
    .attr("height",50)
    .attr("stroke","#f1c40f")
    .attr("fill","none")
    
    
    // d3.select(l).append("circle")
    // .attr("cx",50)
    // .attr("cy",100)
    // .attr('r',50)
    // .attr("fill","#e74c3c")
    
    d3.select(l).append("rect")
    .attr("x",50)
    .attr("y",50)
    .attr("width",50)
    .attr("height",100)
    .attr("stroke","#9b59b6")
    .attr("fill","none")
    
    // ce.zoomWRect({
    //     x:50,
    //     y:50,
    //     w:50,
    //     h:100
    // },1)
    //ce.toCenter();
    // ce.lookAt([0,0])
}

Render();



