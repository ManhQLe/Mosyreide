
let ce = new CE({
    canvas: document.getElementById("main-canvas"),
    layers: ["main", "visual"]
})

let EV = new EffectVisualizer({
    CE:ce
});

let UAI = new UIActionManager({
    CE:ce,
    UI:{        
        [HID_NAME.CANVAS]:ce.agreement.canvas
    }
});
let RE = new RealityManager({
    CE:ce
});


mosyrejs2.Conduit.createLink([UAI,"OUT",RE,"IN"])
mosyrejs2.Conduit.createLink([UAI,"OUTVIZ",EV,"IN"])
