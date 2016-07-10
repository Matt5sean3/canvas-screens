Button.init = function(loc, bbox, event) {
    this.loc = loc;
    this.bbox = bbox;
    this.event = event;
};

Button.draw = function(ctx, currentTime, dt) {
    ctx.save();
    ctx.translate(this.loc.x(), this.loc.y());
    this.render(ctx, currentTime, dt);
    ctx.restore();
};

Button.check = function(loc) {
    if(this.bbox.check(loc.subtract(this.loc)))
        this.event();
};

Button.render = function(ctx, currentTime, dt) {
    // placeholder
    ctx.fillStyle = "#00FF00";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.font = this.bbox.height + "px Arial";
    ctx.fillText("PLAY", 0, 0);
};

