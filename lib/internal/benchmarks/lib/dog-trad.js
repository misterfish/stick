'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var DogExplicit = function DogExplicit(_ref) {
    var color = _ref.color,
        speed = _ref.speed;

    this.color = color;
    this.speed = speed;
};

var DogCycle = function DogCycle(props) {
    for (var i in props) {
        this[i] = props[i];
    }
};

// const Dog = DogExplicit
var Dog = DogCycle;

exports.default = Dog;

Dog.prototype.speak = function () {
    return 'woof';
};