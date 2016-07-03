

import {BoundingShape} from 'boundingshape';

export const BoundingBox = Object.create(BoundingShape);

BoundingBox.init= function(width, height) {
    this.width = width;
    this.height = height;
}

BoundingBox.check = function(relpos) {
    return relpos.x() > 0 && relpos.x() < this.width &&
        relpos.y() > 0 && relpos.y() < this.height;
}

BoundingBox.draw = function(ctx) {
    ctx.save();
    ctx.strokeStyle = "#FFFFFF";
    ctx.strokeRect(0, 0, this.width, this.height);
    ctx.restore();
}
