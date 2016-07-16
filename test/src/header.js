import { assert } from "chai";
import EventTarget from "eventtarget";
import { Base, Handler, Screen, BoundingShape, BoundingBox, BoundingCircle } from "canvas-screens";

const Eventer = Object.create(Base);

EventTarget.call(Eventer);

Eventer.trigger = function() {
    this.dispatchEvent( {"type": "triggered", "foo": "bar"} );
};

const Framer = Object.create(Base);

Framer.init = function() {
    this.requests = [];
};

Framer.request = function(callback) {
    this.requests.push(callback);
    return this.requests.length - 1;
};

Framer.cancel = function(id) {
    this.requests[id] = function() {};
};

Framer.update = function() {
    for(let i = 0; i < this.requests.length; i++) {
        this.requests[i](Date.now());
    }
    this.requests = [];
};

