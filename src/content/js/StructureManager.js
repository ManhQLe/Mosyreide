class StructureManager extends mosyrejs2.RClay {
    constructor(agr){
        super(agr);
        let agreement = this.agreement;
        agreement.sensorPoints = ["IN"]
        this.__.CLAYS = []
    }

    onResponse(cp){
        let sensor = this.sensor;
        let CE = this.agreement.CE;
        let CLAYS = this.__.CLAYS;

        let msg = this.sensor["IN"];                
        let data = cmd.data;

        switch(msg.command){
            case COMMAND.CREATE:

        }

        sensor["OUT"] = {
            command: COMMAND.VIZVESSEL,
            data: StructureManager.CREATION.createVessel(cmd.data,)
        }
    }
}

StructureManager.CREATION = {
    createVessel:function(pos,dim,canvas){
        let g = d3.select(canvas).append("g")
        g.attr("tranform",`translate(${pos[0]},${pos[0]})`)
        g.append("rect")
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
        agr.sensorPoints = ["IN"]
        agr.Id = Symbol();
        this.defineAgreement("pos",[0,0])
        this.defineAgreement("dim",[100,100])

        agr.Vessel = StructureManager.CREATION.createVessel(agr.pos,agr.dim,CE.canvas);
    }
}