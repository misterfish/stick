'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isError = exports.isGeometric = exports.isArithmetic = undefined;

var _index = require('../../index');

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var _op = function _op() {
  return _index.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
  return _index.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
  return _index.composeRight.apply(undefined, arguments);
};

var testReduce = function testReduce(f) {
  return function (n) {
    return function (acc, x) {
      return f(acc, x) === n ? x : null;
    };
  };
};
var testReduceArithmetic = _op(_index.minus, testReduce);
var testReduceGeometric = _op(_index.divideBy, testReduce);

var testSequence = function testSequence(g) {
  return function (f) {
    return function (_ref) {
      var _ref2 = _toArray(_ref),
          a = _ref2[0],
          b = _ref2[1],
          rest = _ref2.slice(2);

      return (0, _index.lets)(function (_) {
        return _op(b, g(a));
      }, function (n) {
        return _op(rest, (0, _index.reduceAbort)(_op(n, f))(b)(null));
      }, function (n, reduced) {
        return reduced === null ? false : n;
      });
    };
  };
};

var containsNull = _op(null, _index.contains);

var isArithmetic = exports.isArithmetic = _op(testReduceArithmetic, testSequence(_index.minus));
var isGeometric = exports.isGeometric = _op(testReduceGeometric, testSequence(_index.divideBy));
var isError = exports.isError = function isError(x) {
  return containsNull(x) ? 'contains null' : false;
};