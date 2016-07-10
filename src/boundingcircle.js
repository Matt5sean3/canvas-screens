BoundingCircle.init = function(r) {
    this.radius = r;
};

BoundingCircle.checkCollision = function(relpos, circle) {
    // needs to use right comparison based on each object's type
    var centerToCenter = circle.radius + this.radius;
    return relpos.radiusSq() < centerToCenter * centerToCenter;
};

// Checks whether a location is within a bounding circle
BoundingCircle.check = function(relpos) {
    return this.radius * this.radius > relpos.radiusSq();
};

BoundingCircle.draw = function(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "#FFFFFF";
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
};

