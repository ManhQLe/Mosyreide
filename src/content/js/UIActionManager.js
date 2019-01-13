class UIActionManager extends mosyrejs2.RClay {
    constructor(agr){
        super(agr);
        this.defineAgreement("CE");
        this.defineAgreement("UI");
        let CE = this.agreement.CE;
        let UI = this.agreement.UI;
        let center = this.center;
        const OUT = "OUT"

        d3.select(UI[HID_NAME.CANVAS]).on("drop", function(e=d3.event){
            e.preventDefault();
            let pos = CE.view2World(UTIL.getRelativeMouse(CE.agreement.canvas, e))
            
            center[OUT] = {
                command: COMMAND.CREATE,
                data:{pos}
            }
        });
    }
}
