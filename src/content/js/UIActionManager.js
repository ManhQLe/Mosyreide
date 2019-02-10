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

       
        let p1,p2;

        d3.select(canvas).on("mousemove",function(e = d3.event){
            //Alt key is to move canvas

            if(e.buttons === 1) {  
                p2 = UTIL.getRelativeMouse(canvas,e);
                !p1 && (p1 = p2);

                if(e.altKey){
                    
                    let d = [0,0]
                    vec2.sub(d,p1,p2);
                    d =  CE.toWorldScale(d);
                    vec2.add(CE.pos,CE.pos,d);
                    CE.pos = CE.pos;
                    p1 = p2;
                }
                else{
                    
                }
            }
            else
            {
                p1 = p2 = null;    
            }
            
        })
    }

   
}
