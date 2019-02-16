const HID_NAME = {
    RCLAYBTN:"RCLAYBTN",
    CONDUITBTN:"CONDUITBTN",
    CANVAS:"CANVAS"
}

const COMMAND = {
    CREATECLAY:0,
    SELECTCLAY:1,

    CLEAR:2,
    VIZRECTREGION:3,    
    VIZREMOVE:4,
    VIZSELECT:5,
    VIZZOOM:6,
    VIZSPAN:7
}

const UTIL = {
    getRelativeMouse:function(dom,e){
        var rect = dom.getBoundingClientRect();
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top;  //y position within the element.
        return [x, y]
    }
}