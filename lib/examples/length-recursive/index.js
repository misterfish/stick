#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _sanda = require('sanda');

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

// const length = prop ('length')

var laatStarN = _sanda.laatStarDat;

// --- n means n + 1 args.
var laatStar1 = (0, _ramda.curry)(function (a, z) {
    return _op([[a], z], (0, _sanda.applyN)(laatStarN));
});
var laatStar2 = (0, _ramda.curry)(function (a, b, z) {
    return _op([[a, b], z], (0, _sanda.applyN)(laatStarN));
});
var laatStar3 = (0, _ramda.curry)(function (a, b, c, z) {
    return _op([[a, b, c], z], (0, _sanda.applyN)(laatStarN));
});
var laatStar4 = (0, _ramda.curry)(function (a, b, c, d, z) {
    return _op([[a, b, c, d], z], (0, _sanda.applyN)(laatStarN));
});
var laatStar5 = (0, _ramda.curry)(function (a, b, c, d, e, z) {
    return _op([[a, b, c, d, e], z], (0, _sanda.applyN)(laatStarN));
});
var laatStar6 = (0, _ramda.curry)(function (a, b, c, d, e, f, z) {
    return _op([[a, b, c, d, e, f], z], (0, _sanda.applyN)(laatStarN));
});

var length1 = (0, _sanda.ifEmpty)(_op(0, _sanda.blush), laatStar3(_ramda.head, _ramda.tail, function (_, h, t) {
    return 1 + length(t);
}));

var length2 = (0, _sanda.ifEmpty)(_op(0, _sanda.blush), _op2((0, _ramda.splitAt)(1), function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        h = _ref2[0],
        t = _ref2[1];

    return 1 + length(t);
}));

var headTail = function headTail(f) {
    return _op2((0, _ramda.splitAt)(1), f);
};

// --- not tco.
var length3 = (0, _sanda.ifEmpty)(_op(0, _sanda.blush), headTail(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        h = _ref4[0],
        t = _ref4[1];

    return 1 + length(t);
}));

var length = function () {
    var _length = function _length(xs, n) {
        return xs.length === 0 ? 0 : _length(_op(xs, _ramda.tail), n + 1);
    };
    return function (xs) {
        return _length(xs, 0);
    };
}();_op(_op(_op([[1, 2, 3], [4], [], [8, 9, 10, 11], (0, _ramda.range)(1, 10e3)], (0, _ramda.map)(function (xs) {
    return _op(_op(_op(xs, length), (0, _sanda.appendTo)([_op(xs, (0, _ramda.join)('|'))])), (0, _sanda.sprintfN)("The length of %s is %s"));
})), (0, _ramda.join)('\n')), _fishLib.log);