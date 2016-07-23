
export const TimedSplashScreen = Object.create(SplashScreen);

TimedSplashScreen.init = function(ctx, duration, nextScreen, media) {
    SplashScreen.call(this, ctx, nextScreen, media);
    this.duration = duration;
};

TimedSplashScreen.draw = function(currentTime) {
    SplashScreen.draw.call(this, currentTime);
    if(this.elapsedTime > this.duration)
        this.close();
};

