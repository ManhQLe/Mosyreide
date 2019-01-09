const HID_NAME = {
    RCLAYBTN:"RCLAYBTN",
    CONDUITBTN:"CONDUITBTN",
    CANVAS:"CANVAS"
}

const UTIL = {
    getMouse:function(){
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top;  //y position within the element.
        return [x, y]
    }
}