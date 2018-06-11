'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cata = exports.sequenceM = exports.toJust = exports.isJust = exports.toEither = exports.flatMap = exports.fold = exports.isLeft = exports.Nothing = exports.Just = exports.Right = exports.Left = undefined;

var _index = require('../../index');

var _ramda = require('ramda');

var _bilby = require('bilby');

var _bilby2 = _interopRequireDefault(_bilby);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _op = function _op() {
    return _index.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
    return _index.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
    return _index.composeRight.apply(undefined, arguments);
};

exports.Left = _bilby.left;
exports.Right = _bilby.right;
exports.Just = _bilby.some;
exports.Nothing = _bilby.none;
var isLeft = exports.isLeft = (0, _index.prop)('isLeft');
var fold = exports.fold = (0, _index.dot2)('fold');
var flatMap = exports.flatMap = (0, _index.dot1)('flatMap');

var toEither = exports.toEither = (0, _ramda.curry)(function (l, o) {
    return _op(o, (0, _index.ifOk)(_bilby.right, _op(_op(l, _bilby.left), _index.always)));
});

var isJust = exports.isJust = (0, _index.prop)('isSome');
var toJust = exports.toJust = fold(_index.id, _index.noop);

var colon = (0, _ramda.curry)(function (x, xs) {
    return [x].concat(_toConsumableArray(xs));
});
var liftA2 = _op('liftA2', (0, _index.bindPropTo)(_bilby2.default));

var sequenceM = exports.sequenceM = function sequenceM(pure) {
    var _sequence = function _sequence(xs) {
        return xs.length === 0 ? _op([], pure) : liftA2(colon, _op(xs, _index.head), _op(_op(xs, _index.tail), _sequence));
    };
    return _sequence;
};

var cata = exports.cata = (0, _index.dot1)('cata');