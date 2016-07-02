"use strict";

// === START MENU SCREEN
MenuScreen.init = function(ctx) {
    Screen.init.call(this, ctx);
    this.options = [];
    this.sliders = [];
    this.addHandler(ctx.canvas, "mousedown", this.handleClick.bind(this));
    this.addHandler(ctx.canvas, "mouseup", this.handleLift.bind(this));
}

MenuScreen.open = function() {
    Screen.open.call(this);
    if("parent_screen" in this) {
        this.parent_screen.pause();
    }
}

MenuScreen.close = function() {
    Screen.close.call(this);
    if("parent_screen" in this) {
        this.parent_screen.unpause();
    }
}

MenuScreen.handleClick = function(e) {
    var mouseLocation = getMousePosition(e, this.ctx.canvas);
    for(var i = 0; i < this.options.length; i++)
        this.options[i].check(mouseLocation);
    for(var i = 0; i < this.sliders.length; i++)
        this.sliders[i].down(mouseLocation);
}

MenuScreen.handleMove = function(e) {
    var mouseLocation = getMousePosition(e, this.ctx.canvas);
    for(var i = 0; i < this.sliders.length; i++)
        this.sliders[i].move(mouseLocation);
}

MenuScreen.handleLift = function(e) {
    var mouseLocation = getMousePosition(e, this.ctx.canvas);
    for(var i = 0; i < this.sliders.length; i++)
        this.sliders[i].lift(mouseLocation);
}

MenuScreen.addOption = function(loc, renderFunction, bbox, event) {
    if(loc instanceof Button) {
        this.options.push(loc);
        return loc;
    } else {
        var button = new Button(loc, renderFunction, bbox, event)
        this.options.push(button);
        return button;
    }
}

MenuScreen.addSlider = function(loc, get_function, set_function, width, height, slider_width) {
    var slider = new Slider(loc, width, height, slider_width);
    slider.getValue = get_function;
    slider.setValue = set_function;
    this.sliders.push(slider);
}

MenuScreen.draw = function(currentTime) {
    Screen.draw.call(this, currentTime);
    this.ctx.save();
    this.render(this.ctx);
    this.ctx.restore();
    
    for(var i = 0; i < this.options.length; i++) {
        this.ctx.save();
        this.options[i].draw(this.ctx, this.lastTime, this.dt);
        this.ctx.restore();
    }
    for(var i = 0; i < this.sliders.length; i++) {
        this.ctx.save();
        this.sliders[i].draw(this.ctx, this.lastTime, this.dt);
        this.ctx.restore();
    }
}

MenuScreen.render = function(ctx, currentTime, dt) {
    // placeholder
    ctx.font = "20px Arial";
    ctx.fillStyle = "#FF0000";
    ctx.fillText("MENU PLACEHOLDER", 40, 40);
}
