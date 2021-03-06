
import { Base } from './base.js';
import { Handler } from './handler.js';

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

Screen.init = function(target, requestFrame, cancelFrame) {
    this.target = target;
    this.requestFrame = 
      (requestFrame === undefined)? window.requestAnimationFrame.bind(window) : requestFrame;
    this.cancelFrame = 
      (cancelFrame === undefined)? window.cancelAnimationFrame.bind(window) : cancelFrame;
    this.frameRequest = null;
    this.lastTime = 0;
    this.elapsedTime = 0;
    this.dt = 0;
    this.handlers = [];
};

Screen.addHandler = function(object, event_name, handler) {
    this.handlers.push(Handler.create(object, event_name, handler));
};

Screen.draw = function(currentTime) {
    if(this.lastTime === 0)
        this.dt = 0;
    else
        this.dt = (currentTime - this.lastTime) / 1000;
    this.elapsedTime += this.dt;
    this.lastTime = currentTime;
    this.frameRequest = this.requestFrame(this.draw.bind(this));
};

Screen.open = function() {
    this.elapsedTime = 0;
    this.unpause();
};

// Should be possible to close without unpausing first
Screen.close = function() {
    this.pause();
    // unpausing after closing should be undefined but will work
    // sometimes
};

Screen.pause = function() {
    // cancelAnimationFrame is experimental but widely supported
    // TODO: add a workaround for non-compatible browsers
    if(this.frameRequest) {
        this.cancelFrame(this.frameRequest);
        this.frameRequest = null;
        for(var i = 0; i < this.handlers.length; i++)
            this.handlers[i].disable(this.target);
    }
};

Screen.unpause = function() {
    this.lastTime = 0;
    this.frameRequest = window.requestAnimationFrame(this.draw.bind(this));
    for(var i = 0; i < this.handlers.length; i++)
        this.handlers[i].enable(this.target);
};

