
import { Base } from './base.js';
import { CollisionEvent } from './collisionevent.js';
export const CollisionGroup = Object.create(Base);

CollisionGroup.init = function() {
    this.collisionEvents = [];
};

CollisionGroup.checkCollisions = function() {
    // Check the collisions for which events exist
    for(var i = 0; i < this.collisionEvents.length; i++)
        this.collisionEvents[i].check();
};

CollisionGroup.clean = function() {
    // cleans out dead collision events
    for(var i = 0; i < this.collisionEvents.length; i++)
        if(this.collisionEvents[i].dead()) {
            this.collisionEvents.splice(i, 1);
            i--;
        }
};

CollisionGroup.addCollisionEvent = function(item1, item2, evt) {
    this.collisionEvents.push(new CollisionEvent(item1, item2, evt));
};

CollisionGroup.removeCollision = function(event) {
    // Not the fastest thing but this shouldn't happen too often
    for(var i = 0; i < this.collisionEvents.length; i++)
        if(this.collisionEvents[i] == event) {
            this.collisionEvents.splice(i, 1);
            break;
        }
};

