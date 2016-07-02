
TextButton.init = function(loc, text, font, style, event) {
    // Calculate the bounding box
    Button.init.call(this, loc, new BoundingBox(0, 0), event);
    this.v_offset = 0;
    this.font = font;
    this.style = style;
    this.text = text;
}

TextButton.measure = function(ctx) {
    // measure the text
    var metrics = ctx.measureText(this.text);
    var width = metrics.width;
    var height;
    // Only works with fonts with size specified in pixels
    height = ctx.font.split("px")[0];
    this.bbox = new BoundingBox(width, height);
}

TextButton.render = function(ctx, currentTime, dt) {
    ctx.font = this.font;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = this.style;
    this.measure(ctx);
    ctx.fillText(this.text, 0, 0);
}
