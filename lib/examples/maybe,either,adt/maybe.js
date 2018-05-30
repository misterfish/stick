#!/usr/bin/env node
'use strict';

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _index = require('../../index');

var _bilby = require('bilby');

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

var toMaybe = function toMaybe(o) {
  return _op(o, (0, _index.ifOk)(_bilby.some, _op(_bilby.none, _index.always)));
};

var flatMap = (0, _index.dot1)('flatMap');
var fold = (0, _index.dot2)('fold');

var translations = {
  rouge: 'red',
  bleu: 'blue',
  vert: 'green'
};

var count = {
  red: 5,
  blue: 0
  // green missing
};

var formatAnswer = function formatAnswer(input) {
  return function (answer) {
    return _op([_op(input, _fishLib.yellow), answer], (0, _index.sprintfN)('%s → %s'));
  };
};

var go = function go(_) {
  return _op(_op(['rouge', 'bleu', 'vert', 'blanc'], (0, _index.map)(doit)), (0, _index.tap)((0, _index.map)(_fishLib.log)));
};

var doit = function doit(x) {
  return _op(_op(x, calculate), formatAnswer(x));
};

var calculate = function calculate(french) {
  return _op(doLookup(french), fold(function (answer) {
    return answer + ' ' + (0, _fishLib.green)('✔');
  }, _op((0, _fishLib.red)('✘'), _index.always)));
};

var doLookup = function doLookup(french) {
  return _op(_op(_op(french, getTranslation), flatMap(getCount)), flatMap(getQuotient));
};

var getTranslation = function getTranslation(french) {
  return _op(translations[french], toMaybe);
};

var getCount = function getCount(english) {
  return _op(count[english], toMaybe);
};

var getQuotient = (0, _index.condS)([_op(_op(0, _index.eq), (0, _index.guard)(function (_) {
  return _bilby.none;
})), _op(_index.otherwise, (0, _index.guard)(function (cnt) {
  return (0, _bilby.some)(10 / cnt);
}))]);

go();