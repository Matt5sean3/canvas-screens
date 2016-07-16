
describe("BoundingCircle", function() {
  var bounding_circle;
  beforeEach("Create a new BoundingCircle", function() {
    bounding_circle = BoundingCircle.create(50);
  });
  it("Should check true for points within the radius", function() {
    assert.isOk(bounding_circle.check(Vector.create(0, 0)));
    assert.isOk(bounding_circle.check(Vector.create(50, 0)));
    assert.isOk(bounding_circle.check(Vector.create(-50, 0)));
    assert.isOk(bounding_circle.check(Vector.create(0, 50)));
    assert.isOk(bounding_circle.check(Vector.create(0, -50)));
    assert.isOk(bounding_circle.check(Vector.create(25, 25)));
    assert.isOk(bounding_circle.check(Vector.create(-25, 25)));
    assert.isOk(bounding_circle.check(Vector.create(25, -25)));
    assert.isOk(bounding_circle.check(Vector.create(-25, -25)));
  });
});

