#!/usr/bin/env node
'use strict';

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _stickJs = require('stick-js');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _op = function _op() {
    return _stickJs.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
    return _stickJs.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
    return _stickJs.composeRight.apply(undefined, arguments);
};

_op(_op(_op(_op(_op([1, 2, 3], (0, _stickJs.map)(function (x) {
    return x + 1;
})), (0, _stickJs.join)('')), _chalk2.default.red), (0, _stickJs.sprintf1)('The answer is %s')), _fishLib.log); // outputs 'The answer is 2/3/4' (colorfully)'),