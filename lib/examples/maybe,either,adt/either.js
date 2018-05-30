#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var toEither = function toEither(l) {
  return (0, _index.ifOk)(_bilby.right, _op(_op(l, _bilby.left), _index.always));
};

var flatMap = (0, _index.dot1)('flatMap');
var fold = (0, _index.dot2)('fold');
var arrowSnd = function arrowSnd(f) {
  return function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        a = _ref2[0],
        b = _ref2[1];

    return [a, _op(b, f)];
  };
};
var foldArrow = function foldArrow(f) {
  return function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
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

var formatAnswer = _op3(_op3(_index.list, (0, _index.asterisk)([_fishLib.yellow, _index.id])), (0, _index.sprintfN)('%s → %s'));

var getTranslation = _op3(propOf(translations), toEither('no translation'));
var getCount = _op3(propOf(count), toEither('no count'));

var getQuotient = (0, _index.condS)([_op(_op(0, _index.eq), (0, _index.guardV)(_op('count was zero', _bilby.left))), _op(_index.otherwise, (0, _index.guard)(_op3((0, _index.divideInto)(10), _bilby.right)))]);

var doLookup = _op3(_op3(getTranslation, flatMap(getCount)), flatMap(getQuotient));

var calculate = _op3(doLookup, fold(_op3((0, _index.prependTo)([_op('✘', _fishLib.red)]), (0, _index.sprintfN)('%s %s')), _op3((0, _index.prependTo)([_op('✔', _fishLib.green)]), (0, _index.sprintfN)('%s %s'))));

var doit = _op3(_op3((0, _index.timesV)(2), arrowSnd(calculate)), foldArrow(formatAnswer));

var go = function go(_) {
  return _op(_op(['rouge', 'bleu', 'vert', 'blanc'], (0, _index.map)(doit)), (0, _index.tap)((0, _index.map)(_fishLib.log)));
};

go();