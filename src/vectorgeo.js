"use strict";
// Does vector mathematics

// These are meant to be essentially immutable objects
// With a weak compiler this could be inefficient memory-wise
// With a good compiler this can be very lean

// The main point here is that there are no side-effects
// This makes reasoning about the code much-much easier
// Whereas Victor.js was ALL side-effects

// Supports getting and setting in both a polar and xy style
Vector.init = function(created, x, y) {
    this.data = new Float64Array(2);
    this.x = x;
    this.y = y;
}
// Methods that must be defined in a subclass
Vector.x = function() {
    return this.data[0];
};
Vector.y = function() {
    return this.data[1];
};
Vector.radius = function() {
    return Math.sqrt(this.radiusSq());
};
Vector.radiusSq = function() {
    return this.x() * this.x() + this.y() * this.y();
};
Vector.angle = function() {
    return Math.atan2(this.y(), this.x());
};
// Methods defined in terms of the other functions
Vector.add = function(v) {
    return Vector.create(this.x() + v.x(), this.y() + v.y());
};
Vector.addX = function(v) {
    return Vector.create(this.x() + v, this.y());
};
Vector.addY = function(v) {
    return Vector.create(this.x(), this.y() + v);
};
Vector.subtract = function(v) {
    return Vector.create(this.x() - v.x(), this.y() - v.y());
};
Vector.multiply = function(v) {
    return Vector.create(this.x() * v.x(), this.y() * v.y());
};
Vector.divide = function(v) {
    return Vector.create(this.x() / v.x(), this.y() / v.y());
};
Vector.scalarMultiply = function(v) {
    return Vector.create(this.x() * v, this.y() * v);
};
Vector.scalarDivide = function(v) {
    return Vector.create(this.x() / v, this.y() / v);
};
Vector.invert = function() {
    return Vector.create(-this.x(), -this.y());
};
Vector.rotate = function(angle) {
    return PolarVector.create(this.angle() + angle, this.radius());
};
Vector.normalize = function() {
    return PolarVector.create(this.angle(), 1);
};
Vector.dot = function(v) {
    return this.x() * v.x() + this.y() * v.y();
};
Vector.distance = function(v) {
    return this.subtract(v).radius();
};
Vector.equals = function(v, e) {
    if(e === undefined)
        e = 1e-10;
    return Math.abs(this.x() - v.x()) < e && Math.abs(this.y() - v.y()) < e;
};
Vector.toString = function() {
    return "Vector<" + this.x() + ", " + this.y() + ">";
};
Vector.wrap = function(wrapped) {
    if("x" in wrapped && "y" in wrapped) {
        return WrapVector.create(wrapped);
    } else if("angle" in wrapped && "radius" in wrapped) {
        return WrapPolarVector.create(wrapped);
    } else {
        throw "Failed to wrap object: " + wrapped;
    }
};

// For compiler efficiency reasons, doing it this way is better.
PolarVector = Object.create(Vector);
// More efficient for radius-angle vectors
PolarVector.init = function(created, angle, radius) {
    this.data = new Float64Array(2);
    this.data[0] = angle;
    this.data[1] = radius;
};
PolarVector.angle = function() {
    return this.data[0];
};
PolarVector.radius = function() {
    return this.data[1];
};
PolarVector.x = function() {
    return this.radius() * Math.cos(this.angle());
};
PolarVector.y = function() {
    return this.radius() * Math.sin(this.angle());
};
// A few faster implementations
PolarVector.radiusSq = function() {
    return this.radius() * this.radius();
};
PolarVector.scalarMultiply = function(v) {
    return PolarVector.create(this.angle(), this.radius() * v);
};
PolarVector.scalarDivide = function(v) {
    return PolarVector.create(this.angle(), this.radius() / v);
};
// An implementation for debug purposes
PolarVector.toString = function() {
    return "PolarVector<angle: = " + this.angle() + ", radius = " + this.radius() + ">";
};

WrapVector.init = function(wrapped) {
    this.wrapped = wrapped;
};

WrapVector.x = function() {
    return this.wrapped.x;
};

WrapVector.y = function() {
    return this.wrapped.y;
};

WrapPolarVector.init = function(wrapped) {
    this.wrapped = wrapped;
};
WrapPolarVector.radius = function() {
    return this.wrapped.radius;
};
WrapPolarVector.angle = function() {
    return this.wrapped.angle;
};

