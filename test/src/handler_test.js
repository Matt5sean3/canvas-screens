
describe("Handler", function() {
    var foo;
    var eventer;
    var handler;
    beforeEach("Replace eventer, reset foo, create handler", function() {
        foo = 0;
        eventer = Eventer.create();
        handler = Handler.create(eventer, "triggered", function() { foo++; });
    }); 
    it("Should not handle triggers before enabled", function() {
        eventer.trigger();
        assert.equal(foo, 0);
    });
    it("Should handle triggers if-and-only-if enabled", function() {
        handler.enable();
        assert.equal(foo, 0);
        eventer.trigger();
        assert.equal(foo, 1);
        handler.disable();
        eventer.trigger();
        assert.equal(foo, 1);
    });
});

