class RealityManager extends mosyrejs2.RClay {
    constructor(agr) {
        super(agr);
        let agreement = this.agreement;
        agreement.sensorPoints = ["IN"]
        this.__.CLAYS = []
        this.__.InnerLink = new mosyrejs2.Conduit();
        this.__.InnerLink.link([this, RealityManager.SIMWORLD]);
    }

    onResponse(cp) {
        let {
            OUTVIZ,
            SIMWORLD
        } = RealityManager;
        let center = this.center;
        let CE = this.agreement.CE;
        let {
            CLAYS,
            InnerLink
        } = this.__;

        let msg = center[RealityManager.IN];
        let data = msg.data;

        switch (msg.command) {
            case COMMAND.CREATECLAY:
                let c = new ManagedClay({
                    "pos": data.pos,
                    "dim": [90, 90],
                    CE
                })
                CLAYS.push(c);
                InnerLink.link([c, ManagedClay.IN]);
                break;
            case COMMAND.SELECTCLAY:
                center[SIMWORLD] = msg;
           

        }
    }
}

RealityManager.OUTVIZ = "OUTVIZ"
RealityManager.SIMWORLD = "SIMWORLD"
RealityManager.IN = "IN"

RealityManager.CREATION = {
    createVessel: function (pos, dim, g) {
        d3.select(g)
            .attr("transform", `translate(${pos[0]},${pos[1]})`)
            .append("rect")
            .attr("x", -dim[0] / 2.0)
            .attr("y", -dim[1] / 2.0)
            .attr("width", dim[0])
            .attr("height", dim[1])
            .attr("class", "manage-clay-vessel")

        return g;
    }
}

class ManagedClay extends mosyrejs2.RClay {
    constructor(agr) {
        super(agr);
        let CE = agr.CE;
        this.defineAgreement("dim", [100, 100])
        agr.sensorPoints = ["IN"]
        this.Id = Symbol();
        this.Vessel = RealityManager.CREATION.createVessel(agr.pos, agr.dim, CE.createElement("g"));
        this.Vessel.Entity = this;
        CE.addElement(this.Vessel)
    }

    onResponse(cp) {

        let center = this.center;
        let agr = this.agreement;
        let msg = center["IN"];
        let data = msg.data;
        switch (msg.command) {
            case COMMAND.SELECTCLAY:
                let pos = [0, 0];
                vec2.add(pos, agr.pos, [-agr.dim[0] * .5, -agr.dim[1] * .5])
                let yes = GEO.rectOverlapVec({
                    pos: data.pos,
                    dim: data.dim
                }, {
                    pos: pos,
                    dim: agr.dim
                })

                console.log(yes);
                break;

        }
    }
}
ManagedClay.IN = "IN"