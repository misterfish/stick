'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pad = exports.repeatChar = exports.cata = undefined;

var _index = require('../../index');

var _op = function _op() {
  return _index.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
  return _index.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
  return _index.composeRight.apply(undefined, arguments);
};

var cata = exports.cata = (0, _index.dot1)('cata');

var repeatChar = exports.repeatChar = function repeatChar(n) {
  return _op3((0, _index.timesV)(n), (0, _index.join)(''));
};
var pad = exports.pad = function pad(n) {
  return function (str) {
    return _op(n - str.length, (0, _index.condS)([_op(_op(0, _index.gt), (0, _index.guard)(function (pad) {
      return _op([str, _op(' ', repeatChar(pad))], (0, _index.join)(''));
    })), _op(_index.otherwise, (0, _index.guardV)(str))]));
  };
};