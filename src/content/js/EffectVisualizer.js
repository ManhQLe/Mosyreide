class EffectVisualizer extends Visualizer {
    constructor(agr) {
        super(agr);
        agr.sensorPoints = ["IN"]
    }    

    onResponse(cp) {
        let E = this.__.E;

        var msg = this.center["IN"];
        var data = msg.data;
        switch (msg.Command) {
            case COMMAND.CLEAR:
                break;
            case COMMAND.VIZRECTREGION:
                this._drawRectRegion(data,"viz-rect-region");
                break;
            case COMMAND.VIZREMOVE:
                this._removeElement(data);
                break;
            case COMMAND.VIZSELECT:
                this._drawRectRegion(data,"viz-select");
        }
    }

    _layer() {
        return this.agreement.CE.getLayer("visual");
    }

    _removeElement(data){
        let layer = this._layer();

        d3.select(layer)
            .selectAll("g").filter(d=>d.id === data.id).remove();

    }

    _drawRectRegion(data, className) {
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

        let id = data.id;
        let layer = this._layer();

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
}

EffectVisualizer.IN = "IN"