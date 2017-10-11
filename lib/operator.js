'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bitwiseRightZeroFill = exports.bitwiseRight = exports.bitwiseLeft = exports.bitwiseNot = exports.bitwiseXor = exports.bitwiseOr = exports.bitwiseAnd = undefined;

var _ramda = require('ramda');

var bitwiseAnd = exports.bitwiseAnd = (0, _ramda.curry)(function (a, b) {
  return a & b;
});
var bitwiseOr = exports.bitwiseOr = (0, _ramda.curry)(function (a, b) {
  return a | b;
});
var bitwiseXor = exports.bitwiseXor = (0, _ramda.curry)(function (a, b) {
  return a ^ b;
});
var bitwiseNot = exports.bitwiseNot = function bitwiseNot(a) {
  return ~a;
};
var bitwiseLeft = exports.bitwiseLeft = (0, _ramda.curry)(function (a, b) {
  return a << b;
});
var bitwiseRight = exports.bitwiseRight = (0, _ramda.curry)(function (a, b) {
  return a >> b;
});
var bitwiseRightZeroFill = exports.bitwiseRightZeroFill = (0, _ramda.curry)(function (a, b) {
  return a >>> b;
});