#!/usr/bin/env node
'use strict';

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _index = require('../../../index');

var _bilby = require('bilby');

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

var flatMap = (0, _index.dot1)('flatMap');
var getOrElse = (0, _index.dot1)('getOrElse');

var k = flatMap;

var inc = (0, _index.add)(1);

var isOdd = _op3((0, _index.modulo)(2), (0, _index.ne)(0));
var ifLt0 = _op(_op(0, _index.lt), _index.ifPredicate);
var ifOdd = _op(isOdd, _index.ifPredicate);

var step1 = ifLt0(_op(_bilby.none, _index.always), _op3(inc, _bilby.some));
var step2 = ifOdd(_op(_bilby.none, _index.always), _op3(inc, _bilby.some));

var transform = _op3(k(step1), k(step2));_op(_op(_op(-1, (0, _index.rangeTo)(3)), (0, _index.map)(_op3(_op3(_bilby.some, transform), getOrElse('none')))), _fishLib.log);