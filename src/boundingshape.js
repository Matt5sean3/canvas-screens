import {Base} from 'base';

export const BoundingShape = Object.create(Base);

BoundingShape.check = function(relpos) {
    return false;
}

