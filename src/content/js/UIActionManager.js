class UIActionManager extends mosyrejs2.RClay {
    constructor(agr){
        super(agr);
        this.defineAgreement("CE");
        this.defineAgreement("UI");
        let CE = this.agreement.CE;
        let UI = this.agreement.UI;
        let center = this.center;
        const OUTPORT = "OUT"
        let canvas = UI[HID_NAME.CANVAS];

        d3.select(canvas).on("drop", function(e=d3.event){
            e.preventDefault();
            
            let pos = CE.view2World(UTIL.getRelativeMouse(canvas, e))

            center[OUTPORT] = {
                command: COMMAND.CREATECLAY,
                data:{pos}
            }
        });

        d3.select(canvas).on("wheel",function(e=d3.event){
            let pos = UTIL.getRelativeMouse(canvas,e);
            let zoomRate = 0.1 * e.wheelDelta/ Math.abs(e.wheelDelta)
            let zoom = CE.zoom*(1+zoomRate);
            CE.zoomTo(zoom,pos)
        })

        d3.select(canvas).on("click",function(e = d3.event){
            let pos = CE.view2World(UTIL.getRelativeMouse(canvas, e))
            center[OUTPORT] = {
                command:COMMAND.SELECTCLAY,
                data:{pos}
            }
        })
    }
}
