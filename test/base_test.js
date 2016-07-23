// Create a test object
import { Base } from '../src/base.js';
import { assert } from 'chai';
import { it, describe } from 'mocha';

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

