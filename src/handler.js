
import { Base } from './base.js';

export const Handler = Object.create(Base);

Handler.init = function(object, name, event) {
    this.object = object;
    this.name = name;
    this.event = event;
};

Handler.enable = function() {
    this.object.addEventListener(this.name, this.event);
};

Handler.disable = function() {
    this.object.removeEventListener(this.name, this.event);
};

