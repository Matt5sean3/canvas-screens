// Clicking through is a fundamental splash screen option
// Some splash screens are timed though

// START SPLASH SCREEN
SplashScreen.init = function(ctx, nextScreen, media) {
    Screen.init.call(this, ctx);
    this.next = nextScreen;
    this.media = (media === undefined)? []: media;
    this.addHandler(ctx.canvas, "mousedown", this.close.bind(this));
}

SplashScreen.open = function() {
    Screen.open.call(this);
    // Reset the start of the accompanying media
    for(var i = 0; i < this.media.length; i++)
        this.media[i].currentTime = 0;
}

SplashScreen.unpause = function() {
    Screen.unpause.call(this);
    // start or resume playing the accompanying media
    for(var i = 0; i < this.media.length; i++)
        this.media[i].play();
}

SplashScreen.draw = function(currentTime) {
    Screen.draw.call(this, currentTime);
    this.ctx.save();
    this.render(this.ctx, this.elapsedTime, this.dt);
    this.ctx.restore();
}

SplashScreen.pause = function() {
    Screen.pause.call(this);
    // pause accompanying media
    for(var i = 0; i < this.media.length; i++)
        this.media[i].pause();
}

SplashScreen.close = function() {
    Screen.close.call(this);
    this.next.open();
}

SplashScreen.render = function(ctx, currentTime, dt) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#0000FF";
    ctx.fillText("SPLASH PLACEHOLDER", 40, 40);
}
// === END SPLASH SCREEN

