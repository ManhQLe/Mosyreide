class UIActionManager extends mosyrejs2.RClay {
    constructor(agr) {
        super(agr);
        this.defineAgreement("CE");
        this.defineAgreement("UI");

        this.STATE = {
            MODE: IMODE.NORMAL,
            isSpanning: false,
            isMarqueeing: false,
            lastPoint: null,
            currentPoint: null,
            pivotPoint: null,
            marqueeId: Symbol()
        }

        let me = this;

        let UI = this.agreement.UI;
        let center = this.center;
       
        let canvas = UI[HID_NAME.CANVAS];

        d3.select(canvas).on("drop", function (e = d3.event) {
            e.preventDefault();
            center[UIActionManager.REALITY] = {
                command: COMMAND.CREATECLAY,
                data: {
                    pos: UTIL.getRelativeMouse(canvas, e)
                }
            }
        });

        d3.select(canvas).on("wheel", function (e = d3.event) {
            let pos = UTIL.getRelativeMouse(canvas, e);
            let zoomRate = 0.1 * e.wheelDelta / Math.abs(e.wheelDelta)
            center[OUTVIZ] = UTIL.createCommand(COMMAND.VIZZOOM, {
                p: pos,
                zoomRate
            });

        })

        d3.select(document).on("mousedown", function (e = d3.event) {
            let STATE = me.STATE;
            STATE.lastPoint = STATE.pivotPoint = UTIL.getRelativeMouse(canvas, e)
            me.mousedown()
        })

        d3.select(document).on("mouseup", function (e = d3.event) {
            me.mouseup();
        })

        d3.select(document).on("mousemove", function (e = d3.event) {
            let STATE = me.STATE;
            STATE.currentPoint = UTIL.getRelativeMouse(canvas, e);

            switch(STATE.MODE){
                case IMODE.NORMAL:
                    STATE.isMarqueeing =  e.buttons === 1 &&
                    !e.altKey && me.isInCanvas()

                    STATE.isSpanning = e.buttons === 1 && e.altKey;
                    break;
                case IMODE.SELECTED:
                    break;

            }

            me.mousemove()
        })
    }

    isInCanvas() {
        let STATE = this.STATE;
        return STATE.pivotPoint &&
            STATE.pivotPoint[0] >= 0 && STATE.pivotPoint[1] >= 0;
    }

    mousedown() {
       
    }

    mouseup() {
        let {
            REALITY,
            OUTVIZ
        } = UIActionManager;

        let {STATE,center} = this;
        let {currentPoint, pivotPoint, isMarqueeing, marqueeId} = STATE;

        if (this.isInCanvas() &&
            (currentPoint[0] === pivotPoint[0] && currentPoint[1] === pivotPoint[1])) {            
            center[REALITY] = UTIL.createCommand(COMMAND.SELECTCLAY, {
                p1: [...pivotPoint],
                p2: [...currentPoint]
            })            
        }

        if (isMarqueeing) {
            center[OUTVIZ] = UTIL.createCommand(COMMAND.VIZREMOVE, {
                id: marqueeId
            });

            pivotPoint && (center[REALITY] = UTIL.createCommand(COMMAND.SELECTCLAY, {
                p1: [...pivotPoint],
                p2: [...currentPoint]
            }))
            
            STATE.marqueeId = null;
            STATE.isMarqueeing = false;
        }
        STATE.pivotPoint = null;
        STATE.lastPoint = null;
    }

    mousemove() {
        let {
            OUTVIZ
        } = UIActionManager;

        let {
            STATE,
            center
        } = this;
        let {
            pivotPoint,
            currentPoint,
            lastPoint, marqueeId
        } = STATE
        if (STATE.isMarqueeing) {
            center[OUTVIZ] = {
                command: COMMAND.VIZRECTREGION,
                data: {
                    id: marqueeId,
                    p1: [...pivotPoint],
                    p2: [...currentPoint]
                }
            };

        }

        if (STATE.isSpanning) {
            center[OUTVIZ] = {
                command: COMMAND.VIZSPAN,
                data: {
                    p1: [...lastPoint],
                    p2: [...currentPoint]
                }
            }
            STATE.lastPoint = currentPoint;
        } else {
            STATE.lastPoint = null;
        }
    }

    onResponse(cp){
        let {STATE,center} = this
        let {REALITY} = UIActionManager
        let msg = center[REALITY]
        let data = msg.data
        switch(msg.command){
            case COMMAND.SELECTEDCLAYS:
                console.log(data.clays.length);
                STATE.MODE = IMODE.SELECTED;
        }
    }
}

UIActionManager.REALITY = Symbol()
UIActionManager.OUTVIZ = Symbol()
