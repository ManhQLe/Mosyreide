class RealityManager extends mosyrejs2.RClay {
    constructor(agr){
        super(agr);
        let agreement = this.agreement;
        agreement.sensorPoints = ["IN"]
        this.__.CLAYS = []
        this.__.Link = new mosyrejs2.Conduit();
        this.__.Link.link(this,"X");
    }

    onResponse(cp){
        let center = this.center;
        let CE = this.agreement.CE;
        let {CLAYS, Link} = this.__;

        let msg = center["IN"];                
        let data = msg.data;

        switch(msg.command){
            case COMMAND.CREATE:
                let c = new ManagedClay({
                    "pos":data.pos,
                    "dim":[300,150],
                    CE
                })
                CLAYS.push(c);
                //CE.addElement(c.Vessel);
                Link.link(c,"OUT");
        }        
    }
}

RealityManager.CREATION = {
    createVessel:function(pos,dim,g){        
        d3.select(g)
        .attr("tranform",`translate(${pos[0]},${pos[0]})`)
        .append("rect")
        .attr("x",dim[0]/2.0)
        .attr("y",dim[1]/2.0)
        .attr("width",dim[0])
        .attr("height",dim[1])
        .attr("class","manage-clay-vessel")
        
        return g;
    }
}


class ManagedClay extends mosyrejs2.RClay{
    constructor(agr){
        super(agr);        
        let CE = agr.CE;
        this.defineAgreement("pos",[0,0])
        this.defineAgreement("dim",[100,100])
        agr.sensorPoints = ["IN"]
        this.Id = Symbol();        
        this.Vessel = RealityManager.CREATION.createVessel(agr.pos,agr.dim,CE.createElement("g"));
        this.Vessel.Author = this;
    }
}