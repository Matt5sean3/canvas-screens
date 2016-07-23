
export const Slider = Object.create(Base);

Slider.init = function(loc, width, height, slider_width) {
    this.loc = loc;
    this.width = width;
    this.height = height;
    this.slider_width = slider_width;
    this.slider_pos = 0;
    this.sliding = false;
};

Slider.draw = function(ctx, time, dt) {
    ctx.save();
    ctx.translate(this.loc.x(), this.loc.y());
    this.render(ctx, time, dt);
    ctx.restore();
};

Slider.render = function(ctx, time, dt) {
    ctx.strokeStyle = "#CCCCCC";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, this.width, this.height);
    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(this.getValue() * (this.width - this.slider_width), 0, this.slider_width, this.height);
};

Slider.getValue = function() {
    return this.slider_value;
};

Slider.setValue = function(value) {
    this.slider_value = value;
};

Slider.down = function(pos) {
    var relpos = pos.subtract(this.loc);
    if(relpos.x() > 0 && 
        relpos.x() <= this.width && 
        relpos.y() > 0 && 
        relpos.y() <= this.height) {
        this.sliding = true;
        this.setSliderPosition(relpos.x());
    }
};

Slider.lift = function(pos) {
    if(this.sliding)
        this.setSliderPosition(pos.subtract(this.loc).x());
    this.sliding = false;
};

Slider.move = function(pos) {
    if(this.sliding)
        this.setSliderPosition(pos.subtract(this.loc).x());
};

Slider.setSliderPosition = function(xpos) {
    var floatpos = (xpos - this.slider_width / 2) / (this.width - 
        this.slider_width);
    // clamp between 0 and 1
    this.setValue(Math.min(1.0, Math.max(0.0, floatpos)));
};

