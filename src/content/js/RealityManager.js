class RealityManager extends mosyrejs2.RClay {
    constructor(agr){
        super(agr);
        let agreement = this.agreement;
        agreement.sensorPoints = ["IN"]
        this.__.CLAYS = []
        this.__.Link = new mosyrejs2.Conduit();
        this.__.Link.link(this,"MY_WORLD");
    }

    onResponse(cp){
        let center = this.center;
        let CE = this.agreement.CE;
        let {CLAYS, Link} = this.__;

        let msg = center["IN"];                
        let data = msg.data;

        switch(msg.command){
            case COMMAND.CREATECLAY:
                let c = new ManagedClay({
                    "pos":data.pos,
                    "dim":[90,90],
                    CE
                })
                CLAYS.push(c);
                Link.link(c,"IN");
                break;
            case COMMAND.SELECTCLAY:
                
        }        
    }
}

RealityManager.CREATION = {
    createVessel:function(pos,dim,g){        
        d3.select(g)
        .attr("transform",`translate(${pos[0]},${pos[1]})`)
        .append("rect")
        .attr("x",-dim[0]/2.0)
        .attr("y",-dim[1]/2.0)
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
        this.Vessel.Entity = this;
        CE.addElement(this.Vessel)
    }
}