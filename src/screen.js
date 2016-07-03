import {Base} from "base";

/**
 * The life cycle of a screen
 * 
 * Screen(ctx)
 * open()
 * -> performs initialization for the screen
 * -> Sets time progression to zero
 * -> calls unpause internally
 * 
 * pause()
 * -> freezes time progression and rendering of the screen
 * 
 * unpause()
 * -> Resumes time progression at the time when it paused
 * 
 * ... pause and unpause as many times as desired, whenever desired ...
 * 
 * close()
 * -> pauses the screen internally
 * -> performs cleanup and final actions for the screen
 **/

export const Screen = Object.create(Base);

Screen.init = function(ctx) {
    this.ctx = ctx;
    this.frameRequest = null;
    this.lastTime = 0;
    this.elapsedTime = 0;
    this.dt = 0;
    this.handlers = [];
}

Screen.addHandler = function(object, event_name, handler) {
    this.handlers.push(new Handler(object, event_name, handler));
}

Screen.draw = function(currentTime) {
    if(this.lastTime == 0)
        this.dt = 0;
    else
        this.dt = (currentTime - this.lastTime) / 1000;
    this.elapsedTime += this.dt;
    this.lastTime = currentTime;
    this.frameRequest = window.requestAnimationFrame(this.draw.bind(this));
    // clear the canvas
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
}

Screen.open = function() {
    this.elapsedTime = 0;
    this.unpause();
}

Screen.close = function() {
    this.pause();
    // unpausing after closing should be undefined but will work
    // sometimes
}

Screen.pause = function() {
    // cancelAnimationFrame is experimental
    // TODO: add a workaround for non-compatible browsers
    window.cancelAnimationFrame(this.frameRequest);
    for(var i = 0; i < this.handlers.length; i++)
        this.handlers[i].disable(this.ctx.canvas);
}

Screen.unpause = function() {
    this.lastTime = 0;
    this.frameRequest = window.requestAnimationFrame(this.draw.bind(this));
    for(var i = 0; i < this.handlers.length; i++)
        this.handlers[i].enable(this.ctx.canvas);
}

