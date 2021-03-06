#!/usr/bin/env node
'use strict';

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _index = require('../../index');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _op = function _op() {
    return _index.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
    return _index.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
    return _index.composeRight.apply(undefined, arguments);
};

_op(_op(_op(_op(_op([1, 2, 3], (0, _index.map)(function (x) {
    return x + 1;
})), (0, _index.join)('')), _chalk2.default.red), (0, _index.sprintf1)('The answer is %s')), _fishLib.log); // outputs 'The answer is 2/3/4' (colorfully)'),