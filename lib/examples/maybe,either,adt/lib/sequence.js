'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isError = exports.isGeometric = exports.isArithmetic = undefined;

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _stickJs = require('stick-js');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _op = function _op() {
  return _stickJs.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
  return _stickJs.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
  return _stickJs.composeRight.apply(undefined, arguments);
};

var testReduce = function testReduce(f) {
  return function (n) {
    return function (acc, x) {
      return f(acc, x) === n ? x : null;
    };
  };
};
var testReduceArithmetic = _op(_stickJs.minus, testReduce);
var testReduceGeometric = _op(_stickJs.divideBy, testReduce);

var testSequence = function testSequence(g) {
  return function (f) {
    return function (_ref) {
      var _ref2 = (0, _toArray3.default)(_ref),
          a = _ref2[0],
          b = _ref2[1],
          rest = _ref2.slice(2);

      return (0, _stickJs.lets)(function (_) {
        return _op(b, g(a));
      }, function (n) {
        return _op(rest, (0, _stickJs.reduceAbort)(_op(n, f))(b)(null));
      }, function (n, reduced) {
        return reduced === null ? false : n;
      });
    };
  };
};

var containsNull = _op(null, _stickJs.contains);

var isArithmetic = exports.isArithmetic = _op(testReduceArithmetic, testSequence(_stickJs.minus));
var isGeometric = exports.isGeometric = _op(testReduceGeometric, testSequence(_stickJs.divideBy));
var isError = exports.isError = function isError(x) {
  return containsNull(x) ? 'contains null' : false;
};