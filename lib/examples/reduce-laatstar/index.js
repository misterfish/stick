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

// 'uncurry' is really crazy.

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

var myReduce3 = (0, _ramda.curry)(function (f, acc, xs) {
    return _op(xs, (0, _sanda.ifEmpty)(function (_) {
        return acc;
    }, function (_) {
        return (0, _sanda.laatStar)(function (_) {
            return (0, _ramda.head)(xs);
        }, function (_) {
            return (0, _ramda.tail)(xs);
        }, function (h, t) {
            return myReduce3(f, f(acc, h), t);
        });
    }));
});

var myReduce2 = (0, _ramda.curry)(function (f, acc, xs) {
    return _op(xs, (0, _sanda.ifEmpty)(function (_) {
        return acc;
    }, laatStarN([_ramda.head, _ramda.tail, function (_, h, t) {
        return myReduce2(f, f(acc, h), t);
    }])));
});

var myReduce1 = (0, _ramda.uncurryN)(3)(function (f, acc) {
    return (0, _sanda.ifEmpty)(_op(acc, _sanda.blush), laatStar3(_ramda.head, _ramda.tail, function (_, h, t) {
        return _op(t, myReduce1(f)(f(acc, h)));
    }));
});

var myReduce4 = (0, _ramda.uncurryN)(3)(function (f, acc) {
    return (0, _sanda.ifEmpty)(_op(acc, _sanda.blush), laatStar5(_ramda.head, _ramda.tail, _op(myReduce4(f), _sanda.blush), function (_, h, t) {
        return f(acc, h);
    }, function (_, h, t, reducer, reduced) {
        return _op(t, reducer(reduced));
    }));
});

// --- sux.
var myReduce5 = (0, _ramda.uncurryN)(3)(function (f, acc) {
    return (0, _sanda.ifEmpty)(_op(acc, _sanda.blush), laatStar3(_op(myReduce5(f), _sanda.blush), function (xs) {
        return _op(_op(_op(xs, _ramda.head), (0, _sanda.appendTo)([acc])), (0, _sanda.applyN)(f));
    }, function (xs, reducer, reduced) {
        return _op(_op(xs, _ramda.tail), reducer(reduced));
    }));
})

// --- add all these numbers (55)
;_op(_op(_op([[myReduce1, _fishLib.green], [myReduce2, _fishLib.cyan], [myReduce3, _fishLib.yellow], [myReduce4, _fishLib.brightRed], [myReduce5, _fishLib.brightBlue]], (0, _ramda.map)(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        myReduce = _ref2[0],
        color = _ref2[1];

    return _op(_op(_op([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], myReduce(function (a, b) {
        return a + b;
    }, 0)), color), (0, _sanda.sprintf1)("The answer is: %s"));
})), (0, _ramda.join)('\n')), _fishLib.log);