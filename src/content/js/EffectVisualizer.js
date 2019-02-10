class EffectVisualizer extends Visualizer {
    constructor(agr) {
        super(agr);
        this.sensorPoints = ["IN"]
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

                this._drawRectRegion(data)


                if (E[id]) {
                    g = E[id]
                } else {

                }
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
            .select("g").data([data], function (d) {
                return d.id
            });

        binded.attr("d",genfx)

        binded.enter()
            .append("path")
            .attr("d", genfx)

    }
}