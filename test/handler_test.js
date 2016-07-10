const assert = require("chai").assert;
const EventTarget = require("eventtarget");
const CS = require("canvas-screens");
const Handler = CS.Handler;

const TestObj = {
    "trigger": function() {
        this.dispatchEvent( {"type": "triggered", "foo": "bar"} );
    }
};
EventTarget.call(TestObj);

describe("Handler", function() {
    it("Should not handle triggers before enabled", function() {
        let foo = 0;
        let handler = Handler.create(TestObj, "triggered", function() { foo++; });
        TestObj.trigger();
        assert.equal(foo, 0);
    });
    it("Should handle triggers if-and-only-if enabled", function() {
        let foo = 0;
        let handler = Handler.create(TestObj, "triggered", function() { foo++; });
        handler.enable();
        assert.equal(foo, 0);
        TestObj.trigger();
        assert.equal(foo, 1);
        handler.disable();
        TestObj.trigger();
        assert.equal(foo, 1);
    });
});

