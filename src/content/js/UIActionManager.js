class UIActionManager extends mosyrejs2.RClay {
    constructor(agr) {
        super(agr);
        this.defineAgreement("CE");
        this.defineAgreement("UI");
        let CE = this.agreement.CE;
        let UI = this.agreement.UI;
        let center = this.center;
        let {OUTREAL,OUTVIZ} = UIActionManager;
        let canvas = UI[HID_NAME.CANVAS];

        d3.select(canvas).on("drop", function (e = d3.event) {
            e.preventDefault();

            let pos = CE.view2World(UTIL.getRelativeMouse(canvas, e))

            center[OUTREAL] = {
                command: COMMAND.CREATECLAY,
                data: {
                    pos
                }
            }
        });

        d3.select(canvas).on("wheel", function (e = d3.event) {
            let pos = UTIL.getRelativeMouse(canvas, e);
            let zoomRate = 0.1 * e.wheelDelta / Math.abs(e.wheelDelta)
            let zoom = CE.zoom * (1 + zoomRate);
            CE.zoomTo(zoom, pos)
        })

        d3.select(canvas).on("click", function (e = d3.event) {
            let pos = CE.view2World(UTIL.getRelativeMouse(canvas, e))
            center[OUTREAL] = {
                command: COMMAND.SELECTCLAY,
                data: {
                    pos
                }
            }
        })


        let pivotPoint, lastPoint, currentPoint, id;

        d3.select(document).on("mousemove", function (e = d3.event) {
            currentPoint = UTIL.getRelativeMouse(canvas, e);
            let isMarqueeing = e.buttons === 1 && !e.altKey
            let isSpanning = e.buttons === 1 && e.altKey;

            if (isMarqueeing) {
                pivotPoint || (pivotPoint = currentPoint);
                if (pivotPoint[0] >= 0 && pivotPoint[1] >= 0) {
                    !id && (id = Date.now());
                    center[OUTREAL] = {
                        Command: COMMAND.VIZRECTREGION,
                        data: {
                            id,
                            p1: CE.view2World(pivotPoint),
                            p2: CE.view2World(currentPoint)
                        }
                    };

                    center
                }
            } else {
                center[OUTVIZ] = {
                    Command: COMMAND.VIZREMOVE,
                    data: {
                        id
                    }
                }
                pivotPoint = null;
                id = null;
            }

            if (isSpanning) {
                lastPoint || (lastPoint = currentPoint)
                let d = [0, 0]
                vec2.sub(d, lastPoint, currentPoint);
                d = CE.toWorldScale(d);
                vec2.add(CE.pos, CE.pos, d);
                CE.pos = CE.pos;
                lastPoint = currentPoint;
            } else {
                lastPoint = null;
            }


        })
    }
}

UIActionManager.OUTREAL = "OUTREAL"
UIActionManager.OUTVIZ = "OUTVIZ"