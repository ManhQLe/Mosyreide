class EffectVisualizer extends Visualizer {
    constructor(agr) {
        super(agr);
        agr.sensorPoints = ["IN"]
        this.CE = this.agreement.CE;
        this.CE.disableTransform(EffectVisualizer.EffectLayer);
    }    

    onResponse(cp) {
 
        let CE = this.CE;

        var msg = this.center["IN"];

        var data = msg.data;
        switch (msg.command) {
            case COMMAND.VIZCLEAR:
                break;
            case COMMAND.VIZRECTREGION:
                this._drawRectRegion(data,"viz-rect-region",EffectVisualizer.EffectLayer);
                break;
            case COMMAND.VIZREMOVE:                
                this._removeElement(data);
                break;
            case COMMAND.VIZSELECT:
                this._drawRectRegion(data,"viz-select",EffectVisualizer.WorldLayer);
                break;
            case COMMAND.VIZZOOM:
                CE.zoomTo(CE.zoom*(data.zoomRate + 1),data.p)
                break;
            case COMMAND.VIZSPAN:
                let dx = [0,0]
                vec2.sub(dx,data.p1,data.p2);
                dx = CE.toWorldScale(dx);
                vec2.add(dx,CE.pos,dx);
                CE.pos = dx;
                break;
            case COMMAND.VIZCLAY:                
                this._drawVessel(data);
        }
    }
    

    _effectLayer() {
        return this.CE.getLayer(EffectVisualizer.EffectLayer);
    }

    _removeElement(data){
        let layer = this._effectLayer();

        d3.select(layer)
            .selectAll("g").filter(d=>d.id === data.id).remove();

    }

    _drawRectRegion(data, className,layerName) {
        let genfx = (d)=> {
            let {
                p1,
                p2
            } = d;
            return [
                "M", p1[0], ",", p1[1],
                "L", p1[0], ",", p2[1],
                "L", p2[0], ",", p2[1],
                "L", p2[0], ",", p1[1], "Z"
            ].join("");
        }

        let layer = this.CE.getLayer(layerName);

        var binded = d3.select(layer)
            .selectAll(`g.${className}`)
            .filter(function(d){ return d.id === data.id})
            .data([data]);

        binded.select("path").attr("d",genfx)

        binded.enter()
            .append("g")
            .attr("class",className)            
            .append("path")            
            .attr("d", genfx)

    }

    _drawVessel(data) {
        let layer = this.CE.getLayer(EffectVisualizer.WorldLayer);        
        let {pos,dim,id} = data.clay.agreement;
        let attrs = {
            "x":-dim[0] *.5,
            "y":-dim[1] *.5,
            "width": dim[0],
            "height": dim[1]
        }
        let transform = `translate(${pos[0]},${pos[1]})`

        var binded = d3.select(layer)
            .selectAll("g.manage-clay-vessel")
            .filter(d=>d.clay.agreement.id === id)
            .data([data])

        binded.attr("transform",transform )
            .select("rect")
            .attrs(attrs)

        binded.enter()
            .append("g")
            .attrs({
                "class":"manage-clay-vessel",
                "transform": transform
            })
            .append("rect")
            .attrs(attrs)
    }
}

EffectVisualizer.WorldLayer = "WorldLayer",
EffectVisualizer.EffectLayer = "EffectLayer",
EffectVisualizer.IN = "IN"