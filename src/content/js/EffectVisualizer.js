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
                let p1 = data.p1;
                let p2 = data.p2;
                this._drawRectRegion(data);
                break;
        }
    }

    _layer() {
        return this.agreement.CE.getLayer("visual");
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
            .selectAll("g").data([data], function (d) {
                return d.id
            });

        binded.select("path").attr("d",genfx)

        binded.enter()
            .append("g")
            .append("path")
            .attr("class","viz-rect-region")
            .attr("d", genfx)

    }
}