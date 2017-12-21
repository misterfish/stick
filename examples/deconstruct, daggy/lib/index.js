#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.show1 = exports.show = exports.showThing1 = exports.showThing = exports.showThingOld = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _stick = require('stick');

var _daggy = require('daggy');

var _daggy2 = _interopRequireDefault(_daggy);

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

var _op4 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(b, a);
});

var _op5 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(a, b);
});

var getThree = _op(3, _ramda.always);
var double = _op(2, _ramda.multiply);
var triple = _op(3, _ramda.multiply);

_op((0, _stick.laats)(function (_) {
    return getThree();
}, function (three) {
    return _op(three, double);
}, function (three, six) {
    return _op(six, triple);
}, function (three, six, eighteen) {
    return three + six + eighteen;
}), _fishLib.log);

_op((0, _stick.laats)(getThree, double, _op4(_stick.arg1, triple), _op4(_stick.list, _ramda.sum)), _fishLib.log);

/*
 * line 1 can be easily reduced.
 * line 2 can be reduced using transformation X.
 * if we wish to go further we can reduce line 3 using the `arg1` function.
 *     arg1 (a, b, c, ...) returns b
 * you can think of the argument list as a tuple and arg1 as a function which plucks index 1,
 * somewhat like `snd` in haskell.
 * line 4 can be reducedd using the `list` function, which converts its arguments into an array:
 *     list (a, b, c, ...) = [a, b, c, ...]
 * so
 *     list (three, six, eighteen) // -> [three, six, eighteen]
 * can be composed with ramda's sum function.
 */

var laatsNO = (0, _ramda.curry)(function (fs, o) {
    return _op(_stick.laats, (0, _stick.passN)([_op(o, _ramda.always)].concat((0, _toConsumableArray3.default)(fs))));
});

// --- N to force you to remember []

_op(_op(getThree(), laatsNO([function (three) {
    return _op(three, double);
}, function (three, six) {
    return _op(six, triple);
}, function (three, six, eighteen) {
    return three + six + eighteen;
}])), _fishLib.log);

_op(_op(getThree(), laatsNO([double, _op4(_stick.arg1, triple), _op4(_stick.list, _ramda.sum)])), _fishLib.log);

var Thing = _daggy2.default.taggedSum('Thing', {
    Ding: ['color'],
    Dong: ['size']
});

var cata = (0, _stick.dot1)('cata');

var Ding = Thing.Ding,
    Dong = Thing.Dong;


var ding = Ding('blue');

var deconstruct = (0, _ramda.curry)(function (f, x) {
    return f(x)(x);
});

var deconstructOld = (0, _ramda.curry)(function (f, x) {
    return f(x, x);
});

var gip = { colors: ['blue', 'red'], brightness: 'bright' };
var gop = { colors: ['uglyblue', 'uglyyellow'], brightness: 'dull' };

var combineColors = function combineColors(_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        x = _ref2[0],
        y = _ref2[1];

    return (0, _ramda.and)(_op(x, (0, _stick.eq)('blue')), _op(y, (0, _stick.eq)('red'))) ? 'purple' : 'gruel';
};

var guardA = _op4(_ramda.always, _stick.guard);

var brightMapFold = function brightMapFold(_ref3) {
    var colors = _ref3.colors;
    return _op(_op(colors, combineColors), (0, _stick.sprintf1)('%s, brightly'));
};
var dullMapFold = function dullMapFold(_ref4) {
    var colors = _ref4.colors;
    return _op(_op(colors, combineColors), (0, _stick.sprintf1)('%s, dully'));
};

var showThingOld = exports.showThingOld = deconstructOld(function (ding, _ref5) {
    var color = _ref5.color;
    return _op(ding, cata({
        Ding: function Ding(color) {
            return _op(color, _fishLib.log);
        }
    }));
});

var showThing = exports.showThing = deconstruct(function (ding) {
    return function (_ref6) {
        var color = _ref6.color;
        return _op(ding, cata({
            Ding: function Ding(color) {
                return _op(color, _fishLib.log);
            }
        }));
    };
});

var showThing1 = exports.showThing1 = deconstruct(function (_ref7) {
    var color = _ref7.color;
    return cata({
        Ding: function Ding(color) {
            return _op(color, _fishLib.log);
        }
    });
});

_op(ding, showThingOld);
_op(ding, showThing);
_op(ding, showThing1);

// --- optional: repeat param, for clarity
// export const show = gip => gip | deconstruct (({ brightness, }) => brightness | cond ([

var show = exports.show = deconstruct(function (_ref8) {
    var brightness = _ref8.brightness;
    return _op(brightness, (0, _stick.cond)([_op(_op('bright', _stick.eq), guardA(_op4(brightMapFold, _fishLib.log))), _op(_stick.otherwise, guardA(_op4(dullMapFold, _fishLib.log)))]));
});

var show1 = exports.show1 = (0, _stick.laatsO)([(0, _ramda.prop)('brightness'), function (_, brightness) {
    return _op(brightness, (0, _stick.cond)([_op(_op('bright', _stick.eq), guardA(_op4(brightMapFold, _fishLib.log))), _op(_stick.otherwise, guardA(_op4(dullMapFold, _fishLib.log)))]));
}, function (gip, _, f) {
    return _op(gip, f);
}]);

_op(gip, show);
_op(gop, show);

_op(gip, show1);
_op(gop, show1);