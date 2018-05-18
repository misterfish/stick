'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sideN = exports.side5 = exports.side4 = exports.side3 = exports.side2 = exports.side1 = exports.side = undefined;

var _ramda = require('ramda');

// --- canonical can take functions from both main and manual.
// beware of circular loops -- be sure tests are up to date.

var side = exports.side = function side(prop) {
    return (0, _ramda.tap)(dot(prop));
};
var side1 = exports.side1 = (0, _ramda.curry)(function (prop, val) {
    return (0, _ramda.tap)(dot1(prop)(val));
});
var side2 = exports.side2 = (0, _ramda.curry)(function (prop, val1, val2) {
    return (0, _ramda.tap)(dot2(prop)(val1)(val2));
});
var side3 = exports.side3 = (0, _ramda.curry)(function (prop, val1, val2, val3) {
    return (0, _ramda.tap)(dot3(prop)(val1)(val2)(val3));
});
var side4 = exports.side4 = (0, _ramda.curry)(function (prop, val1, val2, val3, val4) {
    return (0, _ramda.tap)(dot4(prop)(val1)(val2)(val3)(val4));
});
var side5 = exports.side5 = (0, _ramda.curry)(function (prop, val1, val2, val3, val4, val5) {
    return (0, _ramda.tap)(dot5(prop)(val1)(val2)(val3)(val4)(val5));
});
var sideN = exports.sideN = (0, _ramda.curry)(function (prop, vs) {
    return (0, _ramda.tap)(dotN(prop)(vs));
});