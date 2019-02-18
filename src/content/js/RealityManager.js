class RealityManager extends mosyrejs2.RClay {
    constructor(agr) {
        super(agr);
        let agreement = this.agreement;
        
        agreement.sensorPoints = [RealityManager.COMM, RealityManager.SIMWORLD]

        this.setSensorPoint(RealityManager.SIMWORLD,1);
        
        this.__.CLAYS = []
        this.__.SELECTEDCLAYS = [],
            this.__.InnerLink = new mosyrejs2.Conduit();
        this.__.InnerLink.link([this, RealityManager.SIMWORLD]);
    }

    onResponse(cp) {
        let {
            VIZWORLD,
            SIMWORLD,
            COMM
        } = RealityManager;
        let center = this.center;
        let CE = this.agreement.CE;
        let {
            CLAYS,
            SELECTEDCLAYS,
            InnerLink
        } = this.__;

        let msg = center[RealityManager.COMM];
        let data = msg.data;
        console.log("DOH")      
        debugger;  
        switch (msg.command) {
            case COMMAND.CREATECLAY:
                let clay = new ManagedClay({
                    "pos": CE.view2World(data.pos),
                    "dim": [90, 90],
                    "id": Symbol()
                })
                CLAYS.push(clay);
                InnerLink.link([clay, ManagedClay.COMM]);

                center[VIZWORLD] = UTIL.createCommand(COMMAND.VIZCLAY, {
                    clay
                })
                break;
            case COMMAND.SELECTCLAY:
                SELECTEDCLAYS.splice(0, SELECTEDCLAYS.length);
                data.p1 = CE.view2World(data.p1);
                data.p2 = CE.view2World(data.p2);
                center[SIMWORLD] = msg;
                break;
            case INNERCOMMAND.IAMSELECTED:
                console.log("SELEDASD")
                SELECTEDCLAYS.push(data.clay);
                // center[COMM] = UTIL.createCommand(COMMAND.SELECTEDCLAYS, {
                //     clays: [...SELECTEDCLAYS]
                // })

        }
    }
}


RealityManager.VIZWORLD = Symbol()
RealityManager.SIMWORLD = Symbol()
RealityManager.COMM = Symbol()

const INNERCOMMAND = {
    IAMSELECTED: Symbol()
}


class ManagedClay extends mosyrejs2.RClay {
    constructor(agr) {
        super(agr);
        this.defineAgreement("dim", [100, 100])
        agr.sensorPoints = [ManagedClay.COMM]
    }

    onResponse(cp) {

        let center = this.center;
        let agr = this.agreement;
        let msg = center[ManagedClay.COMM];
        let data = msg.data;
        switch (msg.command) {
            case COMMAND.SELECTCLAY:
                let pos = [0, 0];
                vec2.add(pos, agr.pos, [-agr.dim[0] * .5, -agr.dim[1] * .5])
                let myBB = {
                    pos: pos,
                    dim: agr.dim
                }
                let yes = GEO.rectOverlapVec(GEO.toBoundingBox(data.p1, data.p2), myBB)
                console.log("TEST ME")
                // yes && (center[ManagedClay.COMM] = UTIL.createCommand(INNERCOMMAND.IAMSELECTED, {
                //     clay: this
                // }))
                break;
        }
    }
}
ManagedClay.COMM = Symbol()