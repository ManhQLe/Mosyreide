class StructureManager extends mosyrejs2.RClay {
    constructor(agr){
        super(agr);
        let agreement = this.agreement;
        agreement.sensorPoints = ["IN"]
    }

    onResponse(cp){
        let sensor = this.sensor;
        let cmd =  this.sensor["IN"];                
        let data;

        switch(cmd){
            case COMMAND.CREATE:

        }

        sensor["OUT"] = {
            command: COMMAND.VIZVESSEL,
            data: StructureManager.CREATION.createVessel(cmd.data,)
        }
    }
}

StructureManager.CREATION = {
    createVessel:function(pos,dim){
   
    }
}