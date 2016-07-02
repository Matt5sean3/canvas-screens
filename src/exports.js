// Declares the classes and export

// Also presents the object hierarchy fairly nicely
const Base = Object.create(null);

export const Vector = Object.create(Base);
export const PolarVector = Object.create(Vector);
export const WrapVector = Object.create(Vector);
export const WrapPolarVector = Object.create(PolarVector);

export const BoundingShape = Object.create(Base);
export const BoundingBox = Object.create(BoundingShape);
export const BoundingCircle = Object.create(BoundingShape);

export const CollisionEvent = Object.create(Base);

export const CollisionGroup = Object.create(Base);

export const Entity = Object.create(Base);

export const Screen = Object.create(Base);
export const SplashScreen = Object.create(Screen);
export const TimedSplashScreen = Object.create(TimedSplashScreen);
export const MenuScreen = Object.create(Screen);
export const LoadScreen = Object.create(Screen);

export const Button = Object.create(Base);
export const TextButton = Object.create(Button);

export const Slider = Object.create(Base);

