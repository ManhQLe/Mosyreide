class RealityManager extends mosyrejs2.RClay {
    constructor(agr) {
        super(agr);
        let agreement = this.agreement;
        agreement.sensorPoints = ["IN"]
        this.__.CLAYS = []
        this.__.SELECTCLAYS = [],
        this.__.InnerLink = new mosyrejs2.Conduit();
        this.__.InnerLink.link([this, RealityManager.SIMWORLD]);
    }

    onResponse(cp) {
        let {
            VIZWORLD,
            SIMWORLD
        } = RealityManager;
        let center = this.center;
        let CE = this.agreement.CE;
        let {
            CLAYS, SELECTCLAYS,
            InnerLink
        } = this.__;

        let msg = center[RealityManager.IN];
        let data = msg.data;

        switch (msg.command) {
            case COMMAND.CREATECLAY:
                let clay = new ManagedClay({
                    "pos": CE.view2World(data.pos),
                    "dim": [90, 90],
                    "id":Symbol()
                })
                CLAYS.push(clay);
                InnerLink.link([clay, ManagedClay.IN]);

                center[VIZWORLD] = UTIL.createCommand(COMMAND.VIZCLAY,{clay})

                break;
            case COMMAND.SELECTCLAY:
                SELECTCLAYS.splice(0,SELECTCLAYS.length);
                data.p1 = CE.view2World(data.p1);
                data.p2 = CE.view2World(data.p2);
                center[SIMWORLD] = msg;
                break;  
            case INNERCOMMAND.IAMSELECTED:
                
        }
    }
}


RealityManager.VIZWORLD = "VIZWORLD"
RealityManager.SIMWORLD = "SIMWORLD"
RealityManager.IN = "IN"

const INNERCOMMAND = {
    IAMSELECTED: Symbol()
}


class ManagedClay extends mosyrejs2.RClay {
    constructor(agr) {
        super(agr);
        this.defineAgreement("dim", [100, 100])
        agr.sensorPoints = [ManagedClay.IN]
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
                let myBB = {
                    pos: pos,
                    dim: agr.dim
                }
                let yes = GEO.rectOverlapVec(GEO.toBoundingBox(data.p1,data.p2) ,myBB)
                UTIL.createCommand(INNERCOMMAND.IAMSELECTED,this)
                break;
        }
    }
}
ManagedClay.IN = "IN"