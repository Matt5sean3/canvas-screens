BoundingCircle.init = function(r) {
    this.radius = r;
};

// Checks whether a location is within a bounding circle
BoundingCircle.check = function(relpos) {
    return this.radius * this.radius >= relpos.radiusSq();
};

