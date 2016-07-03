import {Base} from 'base';

export const CollisionEvent = Object.create(Base);

CollisionEvent.init = function(item1, item2, event) {
    this.item1 = item1;
    this.item2 = item2;
    this.event = event;
}

CollisionEvent.check = function() {
    var relpos = this.item1.getPosition().subtract(this.item2.getPosition());
    if(this.item1.bbox.checkCollision(relpos, this.item2.bbox))
        this.event();
}

// A collision event is dead if one or the other entities is destroyed
CollisionEvent.dead = function() {
    return this.item1.isDestroyed() || this.item2.isDestroyed();
}
