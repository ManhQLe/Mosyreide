const canvas = document.getElementById("main-canvas")
 
let ce = new CE({
    canvas,
    layers: [EffectVisualizer.WorldLayer, EffectVisualizer.EffectLayer]
})

let EV = new EffectVisualizer({
    canvas,
    CE:ce
});

let UAI = new UIActionManager({
    UI:{        
        [HID_NAME.CANVAS]:canvas
    }
});
let RE = new RealityManager({
    CE:ce
});


mosyrejs2.Conduit.createLink([
    UAI,UIActionManager.OUTREAL,
    RE,RealityManager.IN,    
])


let c1 = mosyrejs2.Conduit.createLink([
    UAI,UIActionManager.OUTVIZ,
    EV,EffectVisualizer.IN,
    RE,RealityManager.VIZWORLD
])

console.log(c1.contacts)


