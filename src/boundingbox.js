BoundingBox.init= function(width, height) {
    this.width = width;
    this.height = height;
};

BoundingBox.check = function(relpos) {
    return relpos.x() >= 0 && relpos.x() < this.width &&
        relpos.y() >= 0 && relpos.y() < this.height;
};

