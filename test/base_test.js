const assert = require("chai").assert;
const CS = require("canvas-screens");
const Base = CS.Base;

// Create a test object
const TestObj = Object.create(Base);

TestObj.init = function(a) {
    this.a = a;
};

TestObj.getA = function() {
    return this.a;
};

describe("Base", function() {
    it("should call the inherited init", function() {
        let p = TestObj.create(1);
        assert.equal(p.getA(), 1);
        let q = TestObj.create(5);
        assert.equal(q.getA(), 5);
    });
});

