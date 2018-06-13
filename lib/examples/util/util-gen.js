'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.value = exports.done = exports.next = undefined;

var _index = require('../../index');

var _op = function _op() {
    return _index.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
    return _index.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
    return _index.composeRight.apply(undefined, arguments);
};

var next = exports.next = (0, _index.dot)('next');
var done = exports.done = (0, _index.prop)('done');
var value = exports.value = (0, _index.prop)('value');