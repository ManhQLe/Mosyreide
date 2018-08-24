let ce = new CE({
    canvas:document.getElementById("main-canvas"),
    //zoom:2,
    zoomRate:.35
})

d3.select(ce.__.g).append("circle")
.attr("cx",50)
.attr("cy",50)
.attr('r',10)
.attr("fill","#f1c40f")

d3.select(ce.__.g).append("rect")
.attr("x",0)
.attr("y",0)
.attr("width",100)
.attr("height",120)
.attr("stroke","#ecf0f1")
.attr("fill","none")

d3.select(ce.__.g).append("rect")
.attr("x",0)
.attr("y",0)
.attr("width",100)
.attr("height",100)
.attr("stroke","#e74c3c")
.attr("fill","none")

d3.select(ce.__.g).append("rect")
.attr("x",50)
.attr("y",50)
.attr("width",50)
.attr("height",50)
.attr("stroke","#f1c40f")
.attr("fill","none")


// d3.select(ce.__.g).append("circle")
// .attr("cx",50)
// .attr("cy",100)
// .attr('r',50)
// .attr("fill","#e74c3c")

d3.select(ce.__.g).append("rect")
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
