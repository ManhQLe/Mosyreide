class UIActionManager extends mosyrejs2.RClay {
    constructor(agr) {
        super(agr);
        this.defineAgreement("CE");
        this.defineAgreement("UI");

        let UI = this.agreement.UI;
        let center = this.center;
        let {OUTREAL,OUTVIZ} = UIActionManager;
        let canvas = UI[HID_NAME.CANVAS];

        d3.select(canvas).on("drop", function (e = d3.event) {
            e.preventDefault();

            center[OUTREAL] = {
                command: COMMAND.CREATECLAY,
                data: {
                    pos: UTIL.getRelativeMouse(canvas, e)
                }
            }
        });

        d3.select(canvas).on("wheel", function (e = d3.event) {
            let pos = UTIL.getRelativeMouse(canvas, e);
            let zoomRate = 0.1 * e.wheelDelta / Math.abs(e.wheelDelta)
            center[OUTVIZ] = {
                Command:COMMAND.VIZZOOM,
                data:{
                    p:pos,
                    zoomRate
                }                
            }
        })


        let pivotPoint, lastPoint, currentPoint, id;

        d3.select(canvas).on("mousedown",function(e = d3.event){
            lastPoint = pivotPoint = UTIL.getRelativeMouse(canvas, e)
        })

        d3.select(canvas).on("mouseup", function (e = d3.event) {

            if(pivotPoint && (currentPoint[0]===pivotPoint[0] && currentPoint[1]===pivotPoint[1]))
            {
                center[OUTREAL] = {
                    command: COMMAND.SELECTCLAY,
                    data: {
                        p1: pivotPoint,
                        p2: currentPoint
                    }
                }
            }
        })

        d3.select(document).on("mousemove", function (e = d3.event) {

            currentPoint = UTIL.getRelativeMouse(canvas, e);
            let isMarqueeing = e.buttons === 1 && !e.altKey
            let isSpanning = e.buttons === 1 && e.altKey;

            if (isMarqueeing) {
                pivotPoint || (pivotPoint = currentPoint);
                if (pivotPoint[0] >= 0 && pivotPoint[1] >= 0) {
                    !id && (id = Symbol());
                    center[OUTVIZ] = {
                        Command: COMMAND.VIZRECTREGION,
                        data: {
                            id,
                            p1: pivotPoint,
                            p2: currentPoint
                        }
                    };
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
                center[OUTVIZ] = {
                    Command: COMMAND.VIZSPAN,
                    data:{
                        p1:lastPoint,
                        p2:currentPoint
                    }
                }
                lastPoint = currentPoint;
            } else {
                lastPoint = null;
            }


        })
    }
}

UIActionManager.OUTREAL = "OUTREAL"
UIActionManager.OUTVIZ = "OUTVIZ"