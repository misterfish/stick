#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bench = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _stick = require('stick');

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

var bench = exports.bench = function bench(tag, n) {
    return function (f) {
        var now = Date.now();
        for (var i = 0; i < n; i++) {
            f();
        }var dt = Date.now() - now;_op(_op([tag, n, dt, n / dt], (0, _stick.sprintfN)('%s: %s iters, took %.1f ms (%.1f iters / ms)')), _fishLib.log);
    };
};