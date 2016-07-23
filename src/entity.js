
import { Base } from './base.js';
import { Vector } from './vectorgeo.js';
import { BoundingCircle } from './boundingcircle.js';

export const Entity = Object.create(Base);

Entity.init = function(pos, vel, bbox) {
    this.pos = (pos === undefined) ? Vector.create(0, 0) : pos;
    this.vel = (vel === undefined) ? Vector.create(0, 0) : vel;
    this.bbox = (bbox === undefined) ? new BoundingCircle(0) : bbox;
    this.destroyed = false; // treat as protected
};

Entity.getPosition = function() {
    return this.pos;
};

Entity.getVelocity = function() {
    return this.vel;
};

Entity.destroy = function() {
    this.destroyed = true;
};

Entity.isDestroyed = function() {
    return this.destroyed;
};

Entity.draw = function(ctx, currentTime, dt) {
    
};

