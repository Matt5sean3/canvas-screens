
function test_vectors() {
    function test_identity(v, i, n) {
        var e = 1e-10;
        if(!v.equals(i))
            alert(n + ".equals fails");
        if(Math.abs(v.x() - i.x()) > e || Math.abs(v.y() - i.y()) > e)
            alert(n + ".x or .y fails: " + v.x() + ", " + v.y());
        if(v.radius() != i.radius())
            alert(n + ".radius fails: " + v.radius());
        if(v.radiusSq() != i.radiusSq())
            alert(n + ".radiusSq fails: " + v.radiusSq());
        if(v.angle() != i.angle())
            alert(n + ".angle fails: " + v.angle());
        if(!v.addX(1).equals(i.addX(1)))
            alert(n + ".addX fails: " + v.addX(1));
        if(!v.addY(1).equals(i.addY(1)))
            alert(n + ".addY fails: " + v.addY(1));
        if(!v.add(Vector.create(1, 1)).equals(i.add(Vector.create(1, 1))))
            alert(n + ".add fails: " + v.add(Vector.create(1, 1)));
        if(!v.subtract(Vector.create(1, 1)).equals(Vector.create(2, 3)))
            alert(n + ".subtract fails: " + v.subtract(Vector.create(1, 1)));
        if(!v.multiply(Vector.create(2, 3)).equals(Vector.create(6, 12)))
            alert(n + ".multiply fails: " + v.multiply(Vector.create(2, 3)));
        if(!v.divide(Vector.create(3, 4)).equals(Vector.create(1, 1)))
            alert(n + ".divide fails: " + v.divide(Vector.create(3, 4)));
        if(!v.scalarMultiply(2).equals(Vector.create(6, 8)))
            alert(n + ".scalarMultiply fails: " + v.scalarMultiply(2));
        if(!v.scalarDivide(2).equals(Vector.create(1.5, 2)))
            alert(n + ".scalarDivide fails: " + v.scalarDivide(2));
        if(!v.invert().equals(Vector.create(-3, -4)))
            alert(n + ".invert fails: " + v.invert());
        if(!v.rotate(Math.PI / 2).equals(Vector.create(-4, 3)))
            alert(n + ".rotate fails: " + v.rotate(Math.PI / 2).x() + ", " + v.rotate(Math.PI / 2).y());
        if(!v.normalize().equals(Vector.create(0.6, 0.8)))
            alert(n + ".normalize fails: " + v.normalize().x() + ", " + v.normalize().y());
        if(v.dot(Vector.create(2, 3)) != 18)
            alert(n + ".dot fails: " + v.dot(Vector.create(2, 3)));
        if(v.distance(Vector.create(0, 0)) != 5)
            alert(n + ".distance fails: " + v.distance(Vector.create(0, 0)));
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

    try {
        test_identity(Vector.create(3, 4), i, "Vector");
        test_identity(PolarVector.create(Math.atan2(4, 3), 5), i, "PolarVector");
        test_identity(Vector.wrap({"x": 3, "y": 4}), i, "WrapVector");
        test_identity(Vector.wrap({"angle": Math.atan2(4, 3), "radius": 5}), i, "WrapPolarVector");
    } catch(e) {
        alert("Error while testing: " + e);
    }
}
