Handler.create = function(object, name, event) {
    var created = Object.create(Handler);
    created.object = object;
    created.name = name;
    created.event = event;
}

Handler.enable = function() {
    this.object.addEventListener(this.name, this.event, false);
}

Handler.disable = function(canvas) {
    this.object.removeEventListener(this.name, this.event);
}

