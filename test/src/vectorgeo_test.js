const assert = require("chai").assert;
const CS = require("canvas-screens");
const Vector = CS.Vector;
const PolarVector = CS.PolarVector;
const WrapVector = CS.WrapVector;
const WrapPolarVector = CS.WrapPolarVector;

// v - actual
// i - expected
function vector_description(name, v, i) {
    describe(name, function() {
        var e = 1e-10;
        it("Should equal based on x and y", function() {
            assert.isOk(v.equals(i));
        });
        it("Gets x and y", function() {
            assert.closeTo(v.x(), i.x(), e);
            assert.closeTo(v.y(), i.y(), e);
        });
        it("Gets radius", function() {
            assert.closeTo(v.radius(), i.radius(), e);
        });
        it("Gets radius squared", function() {
            assert.closeTo(v.radiusSq(), i.radiusSq(), e);
        });
        it("Gets angle", function() {
            assert.closeTo(v.angle(), i.angle(), e);
        });
        it("Adds to X", function() {
            assert.closeTo(v.addX(1).x(), i.x() + 1, e);
        });
        it("Adds to Y", function() {
            assert.closeTo(v.addY(1).y(), i.y() + 1, e);
        });
        it("Should sum vectors", function() {
            assert.isOk(v.add(Vector.create(1, 1)).equals(i.add(Vector.create(1, 1))));
        });
        it("Should difference vectors", function() {
            assert.isOk(v.subtract(Vector.create(1, 1)).equals(Vector.create(2, 3)));
        });
        it("Should multiply vectors", function() {
            assert.isOk(v.multiply(Vector.create(2, 3)).equals(Vector.create(6, 12)));
        });
        it("Should divide vectors", function() {
            assert.isOk(v.divide(Vector.create(3, 4)).equals(Vector.create(1, 1)));
        });
        it("Should scalar multiply", function() {
            assert.isOk(v.scalarMultiply(2).equals(Vector.create(6, 8)));
        });
        it("Should scalar divide", function() {
            assert.isOk(v.scalarDivide(2).equals(Vector.create(1.5, 2)));
        });
        it("Should invert", function() {
            assert.isOk(v.invert().equals(Vector.create(-3, -4)));
        });
        it("Should rotate", function() {
            assert.isOk(v.rotate(Math.PI / 2).equals(Vector.create(-4, 3)));
        });
        it("Should normalize", function() {
            assert.isOk(v.normalize().equals(Vector.create(0.6, 0.8)));
        });
        it("Should dot product", function() {
            assert.closeTo(v.dot(Vector.create(2, 3)), 18, e);
        });
        it("Should measure distance", function() {
            assert.closeTo(v.distance(Vector.create(0, 0)), 5, e);
        });
    });
}

var i = Object.create(null);
i.x = function() { return 3; };
i.y = function() { return 4; };
i.angle = function() { return Math.atan2(4, 3); };
i.radius = function() { return 5; };
i.radiusSq = function() { return 25; };
i.addX = function(v) { return Vector.create(3 + v, this.y()); };
i.addY = function(v) { return Vector.create(3, 4 + v); };
i.add = function(v) { return Vector.create(3 + v.x(), 4 + v.y()); };
i.multiply = function(v) { return Vector.create(3 * v.x(), 4 * v.y()); };
i.divide = function(v) { return Vector.create(3 / v.x(), 4 / v.y()); };
i.scalarMultiply = function(v) { return Vector.create(3 * v, 4 * v); };
i.scalarDivide = function(v) { return Vector.create(3 / v, 4 / v); };
i.invert = function(v) { return Vector.create(-3, -4); };
i.rotate = function(v) { return Vector.create(3 * Math.cos(v) - 4 * Math.sin(v), Math.cos(v) * 4 + 3 * Math.sin(v)); };
i.normalize = function(v) { return Vector.create(3 / 5, 4 / 5); };
i.dot = function(v) { return 3 * v.x() + 4 * v.y(); };
i.distance = function(v) { return Math.sqrt((3 - v.x()) * (3 - v.x()) + (4 - v.y()) * (4 - v.y())); };

vector_description("Vector", Vector.create(3, 4), i);
vector_description("PolarVector", PolarVector.create(Math.atan2(4, 3), 5), i);
vector_description("WrapVector", Vector.wrap({"x": 3, "y": 4}), i);
vector_description("WrapPolarVector", Vector.wrap({"angle": Math.atan2(4, 3), "radius": 5}), i);

