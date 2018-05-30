#!/usr/bin/env node

'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _stickJs = require('stick-js');

var _bilby = require('bilby');

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

var toEither = function toEither(l) {
  return (0, _stickJs.ifOk)(_bilby.right, _op(_op(l, _bilby.left), _stickJs.always));
};

var flatMap = (0, _stickJs.dot1)('flatMap');
var fold = (0, _stickJs.dot2)('fold');
var arrowSnd = function arrowSnd(f) {
  return function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        a = _ref2[0],
        b = _ref2[1];

    return [a, _op(b, f)];
  };
};
var foldArrow = function foldArrow(f) {
  return function (_ref3) {
    var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
        a = _ref4[0],
        b = _ref4[1];

    return f(a, b);
  };
};
// @todo remove
var propOf = function propOf(o) {
  return function (prop) {
    return o[prop];
  };
};

var translations = {
  rouge: 'red',
  bleu: 'blue',
  vert: 'green'
  // blanc undefined
};

var count = {
  red: 5,
  blue: 0
  // green undefined
};

var formatAnswer = _op3(_op3(_stickJs.list, (0, _stickJs.asterisk)([_fishLib.yellow, _stickJs.id])), (0, _stickJs.sprintfN)('%s → %s'));

var getTranslation = _op3(propOf(translations), toEither('no translation'));
var getCount = _op3(propOf(count), toEither('no count'));

var getQuotient = (0, _stickJs.condS)([_op(_op(0, _stickJs.eq), (0, _stickJs.guardV)(_op('count was zero', _bilby.left))), _op(_stickJs.otherwise, (0, _stickJs.guard)(_op3((0, _stickJs.divideInto)(10), _bilby.right)))]);

var doLookup = _op3(_op3(getTranslation, flatMap(getCount)), flatMap(getQuotient));

var calculate = _op3(doLookup, fold(_op3((0, _stickJs.prependTo)([_op('✘', _fishLib.red)]), (0, _stickJs.sprintfN)('%s %s')), _op3((0, _stickJs.prependTo)([_op('✔', _fishLib.green)]), (0, _stickJs.sprintfN)('%s %s'))));

var doit = _op3(_op3((0, _stickJs.timesV)(2), arrowSnd(calculate)), foldArrow(formatAnswer));

var go = function go(_) {
  return _op(_op(['rouge', 'bleu', 'vert', 'blanc'], (0, _stickJs.map)(doit)), (0, _stickJs.tap)((0, _stickJs.map)(_fishLib.log)));
};

go();