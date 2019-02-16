const HID_NAME = {
    RCLAYBTN:"RCLAYBTN",
    CONDUITBTN:"CONDUITBTN",
    CANVAS:"CANVAS"
}

const COMMAND = {
    CREATECLAY:0,
    SELECTCLAY:1,


    VIZZOOM:2,
    VIZSPAN:3,
    VIZCLEAR:4,    
    VIZRECTREGION:5,
    VIZREMOVE:6,
    VIZSELECT:7,
    VIZCLAY:8
    
}

const UTIL = {
    getRelativeMouse:function(dom,e){
        var rect = dom.getBoundingClientRect();
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top;  //y position within the element.
        return [x, y]
    }
}