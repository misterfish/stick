#!/usr/bin/env node
'use strict';

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _index = require('../../index');

var _types = require('./types');

var _sequence = require('./sequence');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _op = function _op() {
  return _index.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
  return _index.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
  return _index.composeRight.apply(undefined, arguments);
};

var checkSequence = (0, _index.condS)([_op(_sequence.isArithmetic, (0, _index.guard)(function (_, n) {
  return _op(n, _types.ArithmeticSequence);
})), _op(_sequence.isGeometric, (0, _index.guard)(function (_, c) {
  return _op(c, _types.GeometricSequence);
})), _op(_sequence.isError, (0, _index.guard)(function (_, reason) {
  return _op(reason, _types.ErrorSequence);
})), _op(_index.otherwise, (0, _index.guard)(function () {
  return _types.IrregularSequence;
}))]);

var format = (0, _util.cata)({
  ArithmeticSequence: function ArithmeticSequence(n) {
    return _op(_op(['arithmetic', n], (0, _index.map)(_fishLib.yellow)), (0, _index.sprintfN)('%s: y = %sx'));
  },
  GeometricSequence: function GeometricSequence(c) {
    return _op(_op(['geometric', c], (0, _index.map)(_fishLib.green)), (0, _index.sprintfN)('%s: y = %s ** x'));
  },
  ErrorSequence: function ErrorSequence(reason) {
    return _op(_op(reason, _fishLib.red), (0, _index.sprintf1)('error: %s'));
  },
  IrregularSequence: function IrregularSequence(_) {
    return _op('irregular sequence', _fishLib.brightRed);
  }
});

var report = function report(xs) {
  return function (resolved) {
    return _op([_op(_op(xs, (0, _index.join)(', ')), (0, _util.pad)(13)), resolved], (0, _index.sprintfN)('%s → %s'));
  };
};

var doit = function doit(xs) {
  return _op(_op(_op(xs, checkSequence), format), report(xs));
};

var go = function go(_) {
  return _op(_op([[0, 4, 8, 12], // --- arithmetic
  [1, 3, 9, 27], // --- geometric
  [0, 1, 2, 5], // --- irregular
  [null, 1, 2, 5] // --- error
  ], (0, _index.map)(doit)), (0, _index.tap)((0, _index.map)(_fishLib.log)));
};

go();