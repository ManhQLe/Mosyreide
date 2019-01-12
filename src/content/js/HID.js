const HID_NAME = {
    RCLAYBTN:"RCLAYBTN",
    CONDUITBTN:"CONDUITBTN",
    CANVAS:"CANVAS"
}

const COMMAND = {
    CREATE:0,
    VIZVESSEL:1
}

const UTIL = {
    getRelativeMouse:function(dom,e){
        var rect = dom.getBoundingClientRect();
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top;  //y position within the element.
        return [x, y]
    }
}