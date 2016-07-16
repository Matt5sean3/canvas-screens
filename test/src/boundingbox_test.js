
describe("BoundingBox", function() {
    var foo;
    beforeEach("Creates a new bounding box", function(){
        foo = BoundingBox.create(50, 50);
    });
    it("Should return true for checks in bounds", function() {
        // near origin corner
        assert.isNotOk(foo.check(Vector.create(-1, -1)));
        assert.isNotOk(foo.check(Vector.create(-1, 0)));
        assert.isNotOk(foo.check(Vector.create(0, -1)));
        assert.isOk(foo.check(Vector.create(0, 0)));

        // center
        assert.isOk(foo.check(Vector.create(25, 25)));

        // far corner
        assert.isOk(foo.check(Vector.create(49, 49)));
        assert.isNotOk(foo.check(Vector.create(50, 50)));
        assert.isNotOk(foo.check(Vector.create(49, 50)));
        assert.isNotOk(foo.check(Vector.create(50, 49)));

        // top right corner
        assert.isOk(foo.check(Vector.create(0, 49)));
        assert.isNotOk(foo.check(Vector.create(-1, 49)));
        assert.isNotOk(foo.check(Vector.create(0, 50)));
        assert.isNotOk(foo.check(Vector.create(-1, 49)));

        // bottom left corner
        assert.isOk(foo.check(Vector.create(49, 0)));
    });
});

