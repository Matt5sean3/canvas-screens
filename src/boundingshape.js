
import { Base } from './base.js';

export const BoundingShape = Object.create(Base);

BoundingShape.check = function(relpos) {
    return false;
};

