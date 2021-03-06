
function getMousePosition(e, canvas) {
    var ret;
    if ("offsetX" in e && "offsetY" in e)
        ret = Vector.create(e.offsetX, e.offsetY);
    else if (
            "pageX" in e && 
            "pageY" in e && 
            "offsetLeft" in canvas && 
            "offsetTop" in canvas)
        ret = Vector.create(
            e.pageX - canvas.offsetLeft, 
            e.pageY - canvas.offsetTop);
    return ret;
}

