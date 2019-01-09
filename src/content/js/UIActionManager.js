class UIActionManager extends mosyrejs2.RClay {
    constructor(agr){
        super(agr);
        this.defineAgreement("CE");
        this.defineAgreement("UI");
        let ce = this.CE;
        let ui = this.UI;
        console.log(ui)

        d3.select(ui[HID_NAME.CANVAS]).on("drop", function(e=d3.event){
            e.preventDefault();
            let pos = UTIL.getMouse(e)
            console.log(e.target)
        });
    }
}
