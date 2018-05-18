'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sideN = exports.side5 = exports.side4 = exports.side3 = exports.side2 = exports.side1 = exports.side = undefined;

var _ramda = require('ramda');

var _index = require('./index');

var side = exports.side = function side(prop) {
    return (0, _ramda.tap)((0, _index.dot)(prop));
};

// --- canonical can take functions from both main and manual.
// beware of circular loops -- be sure tests are up to date.

var side1 = exports.side1 = (0, _ramda.curry)(function (prop, val) {
    return (0, _ramda.tap)((0, _index.dot1)(prop)(val));
});
var side2 = exports.side2 = (0, _ramda.curry)(function (prop, val1, val2) {
    return (0, _ramda.tap)((0, _index.dot2)(prop)(val1)(val2));
});
var side3 = exports.side3 = (0, _ramda.curry)(function (prop, val1, val2, val3) {
    return (0, _ramda.tap)((0, _index.dot3)(prop)(val1)(val2)(val3));
});
var side4 = exports.side4 = (0, _ramda.curry)(function (prop, val1, val2, val3, val4) {
    return (0, _ramda.tap)((0, _index.dot4)(prop)(val1)(val2)(val3)(val4));
});
var side5 = exports.side5 = (0, _ramda.curry)(function (prop, val1, val2, val3, val4, val5) {
    return (0, _ramda.tap)((0, _index.dot5)(prop)(val1)(val2)(val3)(val4)(val5));
});
var sideN = exports.sideN = (0, _ramda.curry)(function (prop, vs) {
    return (0, _ramda.tap)((0, _index.dotN)(prop)(vs));
});