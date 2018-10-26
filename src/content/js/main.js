
let ce = new CE({
    canvas: document.getElementById("main-canvas"),
    layers: ["main", "visual"]
})

class SVGVessel {
    constructor(svgConstruct, pos) {
        let position = pos || [0, 0]
        let construct = svgConstruct
        Object.defineProperties(this, {
            "pos": {
                get() {
                    return position;
                },
                set: (v) => {
                    position = pos;
                    construct.setAttribute("transform", `translate(${position[0]},${position[1]})`)
                }
            },
            "construct": {
                get() {
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

function createRClay(pos) {
    let g = ce.createElement("g")
    g.setAttribute("transform", `translate(${pos[0]},${pos[1]})`)
    d3.select(g).append("rect")
        .attr("x", -50)
        .attr("y", -50)
        .attr("width", 100)
        .attr("height", 100)
        .attr("fill", "gray")
        .attr("draggable", true)

    var clay = new mosyrejs2.RClay({
        _vessel: new SVGVessel(g, pos)
    })
    entities.push(clay);
    return clay;
}
function findEntities(fx) {
    let col = [];
    entities.forEach(e => {
        fx(e) ? col.push(e) : 1;
    })
    return col;
}

function findEntitiesByRegion(rect) {
    return findEntities(e => {
        let vessel = e.agreement._vessel
        let pos = vessel.pos;
        let bbox = vessel.construct.getBBox();
        console.log(rect)
        return (GEO.rectOverlap(
            { x: bbox.x + pos[0], y: bbox.y + pos[1], w: bbox.width, h: bbox.height },
            rect
        ))
    })
}

function findEntitiesByHitPoint(p) {
    return findEntitiesByRegion({ x: p[0], y: p[1], w: 0, h: 0 })
}

function getMouse(e) {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.
    return [x, y]
}

d3.select(canvas).on("drop", (e = d3.event) => {
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


canvas.addEventListener("mousedown", (e) => {
    let m = getMouse(e)
    track.x = m[0];
    track.y = m[1];
})

canvas.addEventListener("mouseup", (e) => {
   
})

canvas.addEventListener("mousemove", (e) => {
    let m = getMouse(e)
})

