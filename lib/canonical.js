'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._lets = exports.ampersand = exports.asterisk = exports.getType = exports.isType = exports.mergeAllIn = exports.mergeToWithM = exports.mergeFromWithM = exports.mergeFrom = exports.mergeTo = exports.concatFromM = exports.concatFrom = exports.concatTo = exports.prependFrom = exports.appendFromM = exports.appendTo = exports.decorateException = exports.exception = exports.tryCatch = exports.divideBy = exports.plus = exports.minus = exports.subtractFrom = exports.lte = exports.lt = exports.gte = exports.gt = exports.notOk = exports.ok = exports.condO = exports.condo = exports._cond = exports.whenBind = exports.ifBind = exports.bindTry = exports.bind = exports.whenHasIn = exports.ifHasIn = exports.whenHas = exports.ifHas = exports.whenPredicate = exports.ifPredicate = exports.sideN = exports.side5 = exports.side4 = exports.side3 = exports.side2 = exports.side1 = exports.side = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// --- canonical can take functions from both main and manual.
// beware of circular dependencies -- be sure tests are up to date.
// --- index and manual do not take from canonical, so in princple there shouldn't be any.

var _ramda = require('ramda');

var _index = require('./index');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var side = exports.side = function side(prop) {
    return (0, _ramda.tap)((0, _index.dot)(prop));
};
var side1 = exports.side1 = (0, _ramda.curry)(function (prop, val) {
    return (0, _ramda.tap)((0, _index.dot1)(prop)(val));
});
var side2 = exports.side2 = (0, _ramda.curry)(function (prop, val1, val2) {
    return (0, _ramda.tap)((0, _index.dot2)(prop)(val1)(val2));
});
var side3 = exports.side3 = (0, _ramda.curry)(function (prop, val1, val2, val3) {
    return (0, _ramda.tap)((0, _index.dot3)(prop)(val1)(val2)(val3));
});
var side4 = exports.side4 = (0, _ramda.curry)(function (prop, val1, val2, val3, val4) {
    return (0, _ramda.tap)((0, _index.dot4)(prop)(val1)(val2)(val3)(val4));
});
var side5 = exports.side5 = (0, _ramda.curry)(function (prop, val1, val2, val3, val4, val5) {
    return (0, _ramda.tap)((0, _index.dot5)(prop)(val1)(val2)(val3)(val4)(val5));
});
var sideN = exports.sideN = (0, _ramda.curry)(function (prop, vs) {
    return (0, _ramda.tap)((0, _index.dotN)(prop)(vs));
});

var ifPredicate = exports.ifPredicate = (0, _ramda.curry)(function (f, yes, no, x) {
    return f(x) === true ? yes(x) : no(x);
});
var whenPredicate = exports.whenPredicate = (0, _ramda.curry)(function (f, yes, x) {
    return x | ifPredicate(f)(yes)(noop);
});

var ifHas = exports.ifHas = (0, _ramda.curry)(function (yes, no, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        o = _ref2[0],
        k = _ref2[1];

    return o | (0, _ramda.has)(k) ? yes(o[k], o, k) : no(o, k);
});
var whenHas = exports.whenHas = (0, _ramda.curry)(function (yes, spec) {
    return spec | ifHas(yes)(noop);
});

var ifHasIn = exports.ifHasIn = (0, _ramda.curry)(function (yes, no, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        o = _ref4[0],
        k = _ref4[1];

    return o | (0, _ramda.hasIn)(k) ? yes(o[k], o, k) : no(o, k);
});
var whenHasIn = exports.whenHasIn = (0, _ramda.curry)(function (yes, spec) {
    return spec | ifHasIn(yes)(noop);
});

var whenFunction = _index.isFunction | whenPredicate;

// --- dies if o[prop] is not a function.
var bind = exports.bind = (0, _ramda.curry)(function (o, prop) {
    return o[prop].bind(o);
});

// --- returns undefined if o[prop] is not a function.
var bindTry = exports.bindTry = (0, _ramda.curry)(function (o, prop) {
    return o[prop] | whenFunction(function () {
        return bind(o, prop);
    });
});

var ifBind = exports.ifBind = (0, _ramda.curry)(function (yes, no, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        o = _ref6[0],
        k = _ref6[1];

    return lets(function (_) {
        return k | bindTry(o);
    }, ifOk(yes, no));
});

var whenBind = exports.whenBind = function whenBind(yes) {
    return ifBind(yes)(noop);
};

var _cond = exports._cond = function _cond(withTarget, blocks, target) {
    var result = void 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = blocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref7 = _step.value;

            var _ref8 = _slicedToArray(_ref7, 2);

            var test = _ref8[0];
            var exec = _ref8[1];

            // --- null or undefined test ('otherwise') matches immediately
            if (test | notOk) return withTarget ? exec(target) : exec();

            var _result = withTarget ? test(target) : test();
            // @todo test.
            if (_result) return withTarget ? exec(target, _result) : exec(_result);
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
};

var condo = exports.condo = function condo(blocks) {
    return _cond(false, blocks);
};
var condO = exports.condO = (0, _ramda.curry)(function (blocks, target) {
    return _cond(true, blocks, target);
});

var ok = exports.ok = isNil >> not;
var notOk = exports.notOk = isNil;

var gt = exports.gt = (0, _ramda.flip)(_ramda.gt);
var gte = exports.gte = (0, _ramda.flip)(_ramda.gte);
var lt = exports.lt = (0, _ramda.flip)(_ramda.lt);
var lte = exports.lte = (0, _ramda.flip)(_ramda.lte);

var subtractFrom = exports.subtractFrom = _ramda.subtract;
var minus = exports.minus = (0, _ramda.flip)(subtractFrom);
var plus = exports.plus = _ramda.add;

var divideBy = exports.divideBy = (0, _ramda.flip)(_ramda.divide);

var tryCatch = exports.tryCatch = (0, _ramda.curry)(function (good, bad, f) {
    var successVal = void 0;
    try {
        successVal = f();
    } catch (e) {
        return bad(e);
    }
    return good(successVal);
});

var exception = exports.exception = function exception() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new Error(args | (0, _ramda.join)(' '));
};

var decorateException = exports.decorateException = (0, _ramda.curry)(function (prefix, e) {
    return e | assocM('message', joinOk(' ')([prefix, e.message]));
});

var appendTo = exports.appendTo = (0, _ramda.flip)(_index.appendFrom);
var appendFromM = exports.appendFromM = (0, _ramda.flip)(_index.appendToM);
var prependFrom = exports.prependFrom = (0, _ramda.flip)(_index.prependTo);

var concatTo = exports.concatTo = _ramda.concat;
var concatFrom = exports.concatFrom = (0, _ramda.flip)(_ramda.concat);
var concatFromM = exports.concatFromM = (0, _ramda.flip)(_index.concatToM);

var mergeTo = exports.mergeTo = rMerge;
var mergeFrom = exports.mergeFrom = (0, _ramda.flip)(rMerge);

var mergeFromWithM = exports.mergeFromWithM = (0, _ramda.curry)(function (collision, src, tgt) {
    return mergeToWithM(collision, tgt, src);
});

var mergeToWithM = exports.mergeToWithM = (0, _ramda.curry)(function (collision, tgt, src) {
    var ret = tgt;

    var _loop = function _loop(i) {
        // [src, i] | whenHas ((v, o, k) => [ret, i] | ifHasIn (
        [src, i] | whenHas(function (v, o, k) {
            return [ret, i] | ifHas(function (v, o, k) {
                return ret[i] = collision(ret[i], src[i]);
            }, function (o, k) {
                return ret[i] = src[i];
            });
        });
    };

    for (var i in src) {
        _loop(i);
    }return ret;
});

var mergeAllIn = exports.mergeAllIn = function mergeAllIn(xs) {
    return xs | (0, _ramda.reduce)(function (target, source) {
        return source | (0, _index.mergeToInM)(target);
    }, {});
};

var isType = exports.isType = (0, _ramda.curry)(function (t, x) {
    return x | provideTo({}.toString) | (0, _index.dot2)('slice')(8, -1) | equals(t);
});

var getType = exports.getType = provideTo({}.toString) >> (0, _index.dot2)('slice')(8, -1)();

var asterisk = exports.asterisk = (0, _ramda.curry)(function (fs, xs) {
    return xs | zip(fs) | map(function (_ref9) {
        var _ref10 = _slicedToArray(_ref9, 2),
            f = _ref10[0],
            x = _ref10[1];

        return f(x);
    });
});

var ampersand = exports.ampersand = function ampersand(fs) {
    return function (x) {
        return fs | letS([function (_) {
            return function (f) {
                return f(x);
            };
        }, function (fs, mapper) {
            return fs | map(mapper);
        }]);
    };
};

var ignore = function ignore(n) {
    return function (f) {
        return function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            return args | splitAt(n) | prop(1) | passToN(f);
        };
    };
};
var headTail = function headTail(f) {
    return splitAt(1) >> f;
};

// --- generic form, for any non-zero number of arguments.
var _lets = exports._lets = function _lets() {
    for (var _len3 = arguments.length, xs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        xs[_key3] = arguments[_key3];
    }

    var executeStep = function executeStep(prevVals) {
        return applyToN(prevVals);
    };

    var ys = xs
    // --- acc contains running output array, up to the previous item.
    | mapAccum(function (acc, v) {
        return executeStep(acc)(v) | function (stepVal) {
            return [[].concat(_toConsumableArray(acc), [stepVal]), stepVal];
        };
    })([]) | prop(1);

    return ys | last;
};