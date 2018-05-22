#!/usr/bin/env node
'use strict';

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _stick = require('stick');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _op = function _op() {
    return _stick.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
    return _stick.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
    return _stick.composeRight.apply(undefined, arguments);
};

_op(3, _fishLib.log);