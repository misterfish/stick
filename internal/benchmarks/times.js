#!/usr/bin/env node
'use strict';

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _stick = require('stick');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _op = function _op(a, b) {
    return b(a);
};

var _op2 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(b, a);
});

var _op3 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(a, b);
});

var f1 = function f1(_) {
    return {
        age: 10,
        page: 20
    };
};

var N = 1e3;
var g1 = function g1(n) {
    return function (_) {
        return _op(f1, (0, _stick.times)(n));
    };
};
var g2 = function g2(n) {
    return function (_) {
        for (var i = 0; i < n; i++) {
            f1();
        }
    };
};

_op(f1, (0, _util.bench)('f1', 1e6));
_op(g1(1e3), (0, _util.bench)('times', 1e4));
_op(g2(1e3), (0, _util.bench)('loop', 1e4));