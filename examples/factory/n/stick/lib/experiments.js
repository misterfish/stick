#!/usr/bin/env node
'use strict';

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _index = require('./index');

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

var notOk = _ramda.isNil;
var guardA = _op2(_index.blush, _index.guard);
var upper = (0, _index.dot)('toUpperCase');

// --- null for invalid, match object for valid.
var validateLeserID = (0, _index.xMatch)(/^ (?:Leser_)? ([0-9a-fA-F_] {3,4}) $/);

var makeValidLeserID = (0, _index.cond)([_op((0, _ramda.either)(notOk, _ramda.isEmpty), guardA([void 8, void 8])), _op(_index.otherwise, (0, _index.guard)(_op2(validateLeserID, (0, _index.cond)([_op(_index.ok, (0, _index.guard)(function (m) {
  return [true, _op(_op(m[1], upper), (0, _index.concatTo)('Leser_'))];
})), _op(_index.otherwise, guardA([false, void 8]))]))))]);

var makeValidLeserIDTrad = function makeValidLeserIDTrad(x) {
  if (x === undefined || x === null || x === '') return [void 8, void 8];
  var v = validateLeserID(x);
  if (v === undefined || v === null) return [false, void 8];
  return [true, 'Leser_' + v[1].toUpperCase()];
};

// stick is tied up with ramda. so actually it's no 'either'
var makeValidLeserIDNoCondNoRamda = function makeValidLeserIDNoCondNoRamda(x) {
  if (_op(x, notOk)) return [void 8, void 8];
  if (_op(x, _ramda.isEmpty)) return [void 8, void 8];
  var v = validateLeserID(x);
  if (_op(v, notOk)) return [false, void 8];
  return [true, 'Leser_' + v[1].toUpperCase()];
};_op(_op(_op(['', '123', 'abc', '12AC', '12At', '12ac', '12at', '12345', 'Leser_123', 'Leser_abc', 'Leser_ABc', 'Leser_aBT', 'Leser_1234f'], (0, _ramda.map)(function (x) {
  return x + ' : ' + _op(x, makeValidLeserID) + ' trad: ' + _op(x, makeValidLeserIDTrad);
})), (0, _ramda.join)('\n')), _fishLib.log);

var bench = (0, _ramda.curry)(function (n, f) {
  var t1 = Date.now();
  for (var i = 0; i < n; i++) {
    f();
  }var td = Date.now() - t1;
  return _op([_op(n, _fishLib.yellow), _op(td / n, _fishLib.green)], (0, _index.sprintfN)("Num calls %s, time per call %s"));
});

(0, _fishLib.info)('trad');_op(_op([function (_) {
  return _op('Leser_123', makeValidLeserIDTrad);
}, function (_) {
  return _op('Leser_abT', makeValidLeserIDTrad);
}, function (_) {
  return _op('12AC', makeValidLeserIDTrad);
}], (0, _ramda.map)(bench(1000))), _fishLib.log);

(0, _fishLib.info)('no cond');_op(_op([function (_) {
  return _op('Leser_123', makeValidLeserIDNoCondNoRamda);
}, function (_) {
  return _op('Leser_abT', makeValidLeserIDNoCondNoRamda);
}, function (_) {
  return _op('12AC', makeValidLeserIDNoCondNoRamda);
}], (0, _ramda.map)(bench(1000))), _fishLib.log);

(0, _fishLib.info)('functional');_op(_op([function (_) {
  return _op('Leser_123', makeValidLeserID);
}, function (_) {
  return _op('Leser_abT', makeValidLeserID);
}, function (_) {
  return _op('12AC', makeValidLeserID);
}], (0, _ramda.map)(bench(1000))), _fishLib.log);