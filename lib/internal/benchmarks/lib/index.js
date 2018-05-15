#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.myside1 = exports.myside = exports.mydot = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _stick = require('stick');

var _util = require('../util');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var _op = function _op(a, b) {
    return b(a);
};

var _op2 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(b, a);
});

var _op3 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(a, b);
});

var logWith = function logWith(header) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _fishLib.log.apply(undefined, [header].concat(args));
    };
};

var obj = {
    flag: true,
    toggle: function toggle(n) {
        console.log('n', n);
        for (var i = 0; i < n; i++) {
            this.flag = !this.flag;
        }
    },
    get: function get() {
        return this.flag;
    }
};

var mydot = exports.mydot = function mydot(prop) {
    return function (o) {
        return o[prop]();
    };
};
var myside = exports.myside = function myside(prop) {
    return function (o) {
        return o[prop](), o;
    };
};
var myside1 = exports.myside1 = function myside1(prop) {
    return function (val) {
        return function (o) {
            return o[prop](val), o;
        };
    };
};

var side1J = function side1J(prop) {
    return function (val) {
        return function (o) {
            return (0, _stick.dot1)(prop)(val)(o), o;
        };
    };
};
var side1C = (0, _ramda.curry)(function (prop, val) {
    return (0, _ramda.tap)((0, _stick.dot1)(prop)(val));
});

var toggleJ = side1J('toggle')(12);
var toggleC = side1C('toggle')(10);

var n = 1; //e4

var testSide1J = function testSide1J(_) {
    return _op(obj, toggleJ);
};

var suite1 = [function (_) {
    return (0, _util.bench)('testSide1J', n)(testSide1J);
}];

var suites = [suite1];

_op(suites, (0, _ramda.map)(_op(_stick.invoke, _ramda.forEach)));

_op(obj, toggleJ);
_op(obj.flag, _fishLib.log);
_op(obj, toggleJ);
_op(obj.flag, _fishLib.log);
obj.toggle(1);
_op(obj.flag, _fishLib.log);