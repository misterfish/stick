'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.uniqueWith = exports.pathDot = exports.either = exports.on = exports.padTo = exports.allOk = exports.mapObj = exports.ellipsisAfter = exports.substring = exports.lazyFindPred = exports.mapX = exports.length = exports.tryCatchS = exports.findPredMaybeGen = exports.findPredOkGen = exports.findPredOk = exports.xRegExpFlags = exports.minus = exports.recover = exports.then = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _index = require('../../index');

var _utilPred = require('./util-pred');

var _utilBilby = require('./util-bilby');

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

// --- beware circular reference: don't use these in point-free functions.


var then = exports.then = (0, _index.dot1)('then');
var recover = exports.recover = (0, _index.dot1)('catch');

var minus = exports.minus = (0, _ramda.curry)(function (a, b) {
    return b - a;
});

var removeSpaces = (0, _index.dot2)('replace')(/\s+/g)('');

// --- beware, overwrites any flags that the re already had.
var xRegExpFlags = exports.xRegExpFlags = function xRegExpFlags(re, flags) {
    return new RegExp(_op(re.source, removeSpaces), flags);
};

var findPredOk = exports.findPredOk = (0, _ramda.curry)(function (pred, xs) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = xs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var x = _step.value;

            var p = pred(x);
            if ((0, _index.ok)(p)) return p;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
});

var findPredOkGen = exports.findPredOkGen = (0, _ramda.curry)(function (pred, gen) {
    var n = void 0;
    while (!(n = gen.next()).done) {
        var p = pred(n.value);
        if ((0, _index.ok)(p)) return p;
    }
});

var findPredMaybeGen = exports.findPredMaybeGen = (0, _ramda.curry)(function (pred, gen) {
    var n = void 0;
    while (!(n = gen.next()).done) {
        var p = pred(n.value);
        if (_op(p, _utilBilby.isJust)) return _op(p, _utilBilby.toJust);
    }
});

var tryCatchS = exports.tryCatchS = (0, _ramda.curry)(function (good, bad, f, v) {
    return (0, _index.tryCatch)(good, bad, function (_) {
        return f(v);
    });
});

var length = exports.length = (0, _index.prop)('length');

var mapX = exports.mapX = _op(_index.map, _index.addIndex);

// ------ lazyfish extensions
var lazyFindPred = exports.lazyFindPred = (0, _ramda.curry)(function (pred, lxs) {
    while (true) {
        var _lxs$next = lxs.next(),
            value = _lxs$next.value,
            done = _lxs$next.done;

        if (done) break;
        var predVal = pred(value);
        if (predVal) return predVal;
    }
});

var substring = exports.substring = (0, _index.dot2)('substring');

var ellipsisAfter = exports.ellipsisAfter = (0, _ramda.curry)(function (n, s) {
    return _op(s, (0, _utilPred.ifLongerThan)(n)(_op3(substring(0, n), (0, _index.concat)('…')), _index.id));
});

// --- only own (R.toPairs and R.map are like this too)
// --- order: k, v
var mapObj = exports.mapObj = (0, _ramda.curry)(function (f, o) {
    var ret = [];
    for (var i in o) {
        ret.push(f(i, o[i]));
    }
    return ret;
});

var allOk = exports.allOk = function allOk(x) {
    return _op(_op(x, (0, _ramda.findIndex)(_op3(_index.ok, _index.not))), (0, _utilPred.ifNegativeOne)(_index.T, _index.F));
};

// --- doesn't truncate if too long.
var padTo = exports.padTo = (0, _ramda.curry)(function (n, str) {
    return (0, _index.lets)(function (_) {
        return str.length;
    }, function (l) {
        return _op(str, (0, _index.condS)([_op(function (_) {
            return l >= n;
        }, (0, _index.guardV)(str)), _op(_index.otherwise, (0, _index.guard)(function (x) {
            return _op(x, _op(_op((0, _index.timesV)(n - l)(' '), (0, _index.join)('')), _index.concat));
        }))]));
    });
});

var on = exports.on = (0, _index.side2)('on');

var either = exports.either = function either(f, g) {
    return (0, _index.againstEither)(f, g);
};

var pathDot = exports.pathDot = _op3((0, _index.split)('.'), _index.path);

var uniqueWith = exports.uniqueWith = function uniqueWith(f) {
    return function (xs) {
        var ret = [];
        var s = new Set();
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = xs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var x = _step2.value;

                var xx = f(x);
                if (s.has(xx)) continue;
                ret.push(x);
                s.add(f(x));
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return ret;
    };
};