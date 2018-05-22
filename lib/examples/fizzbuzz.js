#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

// const { log, } = console
var bothN = function bothN(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        a = _ref2[0],
        b = _ref2[1];

    return (0, _ramda.both)(a, b);
};
var orN = function orN(_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        a = _ref4[0],
        b = _ref4[1];

    return (0, _ramda.or)(a, b);
};
var andN = function andN(_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        a = _ref6[0],
        b = _ref6[1];

    return (0, _ramda.and)(a, b);
};
var isMultiple = function isMultiple(x) {
    return function (y) {
        return y % x === 0;
    };
};
var isMultiple3 = _op(3, isMultiple);
var isMultiple5 = _op(5, isMultiple);
var isMultiple7 = _op(7, isMultiple);
var isMultiple3or7 = _op([isMultiple3, isMultiple7], _ramda.anyPass);
var whenIsMultiple3or7 = _op(isMultiple3or7, _stick.whenPredicate);
var logWith = function logWith(header) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _fishLib.log.apply(undefined, [header].concat(args));
    };
};
var fizzBuzz1 = whenIsMultiple3or7(_fishLib.log);

var makeRow = function makeRow(str) {
    return function (n) {
        return _op([n, str], (0, _stick.sprintfN)('%s: %s'));
    };
};
var row = function row(str) {
    return _op3(makeRow(str), _fishLib.log);
};
var fizz = row('fizz');
var buzz = row('buzz');
var fizzbuzz = row('fizzbuzz');
var niks = row('');

var fizzBuzz2 = (0, _stick.letS)([isMultiple3, isMultiple5, function (_, is3, is5) {
    return _op([is3, is5], andN);
}, function (n, is3, is5, is15) {
    return (0, _stick.cond)(_op(_op(is15, _stick.blush), (0, _stick.guard)(function (_) {
        return _op(n, fizzbuzz);
    })), _op(_op(is3, _stick.blush), (0, _stick.guard)(function (_) {
        return _op(n, fizz);
    })), _op(_op(is5, _stick.blush), (0, _stick.guard)(function (_) {
        return _op(n, buzz);
    })), _op(_stick.otherwise, (0, _stick.guard)(function (_) {
        return _op(n, niks);
    })));
}]);

var fizzBuzz = fizzBuzz2;

_op(_op(1, (0, _stick.rangeTo)(100)), (0, _stick.map)(fizzBuzz));