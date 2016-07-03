export const Base = Object.create(null);

Base.create = function() {
    var created = Object.create(this);
    created.init.apply(created, arguments);
    return created;
}

Base.init = function(created) {
}

