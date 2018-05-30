'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pad = exports.repeatChar = exports.cata = undefined;

var _stickJs = require('stick-js');

var _op = function _op() {
  return _stickJs.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
  return _stickJs.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
  return _stickJs.composeRight.apply(undefined, arguments);
};

var cata = exports.cata = (0, _stickJs.dot1)('cata');

var repeatChar = exports.repeatChar = function repeatChar(n) {
  return _op3((0, _stickJs.timesV)(n), (0, _stickJs.join)(''));
};
var pad = exports.pad = function pad(n) {
  return function (str) {
    return _op(n - str.length, (0, _stickJs.condS)([_op(_op(0, _stickJs.gt), (0, _stickJs.guard)(function (pad) {
      return _op([str, _op(' ', repeatChar(pad))], (0, _stickJs.join)(''));
    })), _op(_stickJs.otherwise, (0, _stickJs.guardV)(str))]));
  };
};