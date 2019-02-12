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
                this._drawRectRegion(data);
                break;
            case COMMAND.VIZREMOVE:
                this._removeElement(data);
        }
    }

    _layer() {
        return this.agreement.CE.getLayer("visual");
    }

    _removeElement(data){
        let layer = this._layer();

        d3.select(layer)
            .selectAll("g.viz-rect-region").filter(d=>d.id === data.id).remove();

    }

    _drawRectRegion(data) {
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
            .selectAll("g.viz-rect-region").filter(function(d){ return d.id === data.id}).data([data]);

        binded.select("path").attr("d",genfx)

        binded.enter()
            .append("g")
            .attr("class","viz-rect-region")            
            .append("path")            
            .attr("d", genfx)

    }
}