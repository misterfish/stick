'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mapTuplesIn = exports.mapTuples = exports.mapValuesIn = exports.mapKeysIn = exports.mapValues = exports.mapKeys = exports.valuesIn = exports.values = exports.mapAsValuesIn = exports.mapAsValues = exports.keysIn = exports.keys = exports.mapAsKeysIn = exports.mapAsKeys = exports.withFilter = exports.defaultToV = exports.otherwise = exports.guardV = exports.guard = exports.condPredicate = exports.condElse = exports.F = exports.T = exports.blush = exports.toThe = exports.moduloWholePart = exports.modulo = exports.divideInto = exports.divideBy = exports.multiply = exports.plus = exports.add = exports.minus = exports.subtractFrom = exports.subtract = exports.bindLate = exports.bind = exports.bindTry = exports.bindTo = exports.factoryMixinPost = exports.factoryMixinPre = exports.factoryStatics = exports.factory = exports.factoryInit = exports.factoryProps = exports.factoryMixins = exports.arg6 = exports.arg5 = exports.arg4 = exports.arg3 = exports.arg2 = exports.arg1 = exports.arg0 = exports.flattenPrototype = exports.discardPrototype = exports.ifXReplaceStrFlags = exports.ifXReplaceStr = exports.ifXReplace = exports.ifReplace = exports.xReplaceStrFlags = exports.xReplaceStr = exports.xReplace = exports.xMatchStrFlags = exports.xMatchStr = exports.xMatch = exports.xMatchGlobal = undefined;
exports.match = exports.xRegExpStr = exports.xRegExpFlags = exports.xRegExp = exports.nieuwN = exports.nieuw3 = exports.nieuw2 = exports.nieuw1 = exports.nieuw = exports.joinOk = exports.list = exports.compactOk = exports.compact = exports.rangeBy = exports.isInteger = exports.isFunction = exports.isArray = exports.isType = exports.timesSide = exports.timesF = exports.timesV = exports.repeatSide = exports.repeatF = exports.repeatV = exports.zipAll = exports.sprintfN = exports.sprintf1 = exports.flip5 = exports.flip4 = exports.flip3 = exports.flip = exports.passToN = exports.passTo = exports.applyToN = exports.applyTo5 = exports.applyTo4 = exports.applyTo3 = exports.applyTo2 = exports.applyTo1 = exports.invoke = exports.provideToN = exports.provideTo5 = exports.provideTo4 = exports.provideTo3 = exports.provideTo2 = exports.provideTo1 = exports.provideTo = exports.callOnN = exports.callOn5 = exports.callOn4 = exports.callOn3 = exports.callOn2 = exports.callOn1 = exports.callOn = exports.letsS = exports.lets = exports.letsN = exports.lets6 = exports.lets5 = exports.lets4 = exports.lets3 = exports.lets2 = exports.letN = exports.laat = exports.asterisk = exports.ampersand = exports.reduceObjIn = exports.reduceObj = exports.eachObjIn = exports.eachObj = exports.mapPairsIn = exports.mapPairs = exports.addCollection = exports.addIndex = exports.each = exports.map = exports.mergeAllIn = exports.mergeToIn = exports.mergeFromIn = exports.mergeFromInM = exports.mergeToInM = exports.mergeFromWhenOkM = exports.mergeToWhenOkM = exports.mergeFromWithM = exports.mergeToWithM = exports.mergeToM = exports.mergeFromM = exports.mergeFrom = exports.mergeTo = exports.concatFromM = exports.concatToM = exports.precatFrom = exports.precatTo = exports.concatFrom = exports.concatTo = exports.prependToM = exports.prependFromM = exports.prependFrom = exports.prependTo = exports.appendToM = undefined;
exports.appendFromM = exports.appendTo = exports.appendFrom = exports.assocM = exports.assoc = exports.prop = exports.join = exports.split = exports.defaultTo__ = exports.defaultTo = exports.cascade = exports.die = exports.decorateException = exports.raise = exports.exception = exports.tryCatch = exports.tryCatch__ = exports.condS = exports.condN = exports.cond = exports.ifBind__ = exports.ifHasIn__ = exports.ifHas__ = exports.ifFunction__ = exports.ifNo__ = exports.ifYes__ = exports.ifFalse__ = exports.ifTrue__ = exports.ifNotOk__ = exports.ifOk__ = exports.ifPredicate__ = exports.whenBind = exports.ifBind = exports.whenHasIn = exports.ifHasIn = exports.whenHas = exports.ifHas = exports.whenFalsey = exports.ifFalsey = exports.whenTruthy = exports.ifTruthy = exports.whenNo = exports.ifNo = exports.whenYes = exports.ifYes = exports.whenFalse = exports.ifFalse = exports.whenTrue = exports.ifTrue = exports.whenNotOk = exports.ifNotOk = exports.whenOk = exports.ifOk = exports.whenPredicate = exports.ifPredicate = exports.isFalsey = exports.isTruthy = exports.isNo = exports.isYes = exports.isFalse = exports.isTrue = exports.sideN = exports.side5 = exports.side4 = exports.side3 = exports.side2 = exports.side1 = exports.side = exports.dotN = exports.dot5 = exports.dot4 = exports.dot3 = exports.dot2 = exports.dot1 = exports.dot = exports.lte = exports.lt = exports.gte = exports.gt = exports.ne = exports.eq = exports.notOk = exports.ok = exports.noop = exports.roll = exports.recurry = exports.doe = exports.bitwiseRightZeroFillBy = exports.bitwiseRightBy = exports.bitwiseLeftBy = exports.bitwiseRightZeroFill = exports.bitwiseRight = exports.bitwiseLeft = exports.bitwiseNot = exports.bitwiseXor = exports.bitwiseOr = exports.bitwiseAnd = exports.compose = exports.composeRight = exports.pipe = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ramda = require('ramda');

var _operator = require('./operator');

var _monad = require('./monad');

var _manual = require('./manual');

var _manual2 = _interopRequireDefault(_manual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// ramda map works on objs: keys same, values altered.
// could make an object mapper which lets you return pairs.
//
// Object.assign and {...} drop proto vals.

var _op = function _op() {
    return pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
    return compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
    return composeRight.apply(undefined, arguments);
};

// --- xxx


var double = function double(x) {
    return _op(x, multiply(2));
};
var triple = function triple(x) {
    return _op(x, multiply(3));
};
var quadruple = function quadruple(x) {
    return _op(x, multiply(4));
};
// ---

var pipe = exports.pipe = function pipe(a, b) {
    return b(a);
};
var composeRight = exports.composeRight = function composeRight(a, b) {
    return function () {
        return b(a.apply(undefined, arguments));
    };
};
var compose = exports.compose = function compose(a, b) {
    return function () {
        return a(b.apply(undefined, arguments));
    };
};

exports.bitwiseAnd = _operator.bitwiseAnd;
exports.bitwiseOr = _operator.bitwiseOr;
exports.bitwiseXor = _operator.bitwiseXor;
exports.bitwiseNot = _operator.bitwiseNot;
exports.bitwiseLeft = _operator.bitwiseLeft;
exports.bitwiseRight = _operator.bitwiseRight;
exports.bitwiseRightZeroFill = _operator.bitwiseRightZeroFill;
exports.bitwiseLeftBy = _operator.bitwiseLeftBy;
exports.bitwiseRightBy = _operator.bitwiseRightBy;
exports.bitwiseRightZeroFillBy = _operator.bitwiseRightZeroFillBy;
exports.doe = _monad.doe;


var oPro = Object.prototype;
var hasOwn = oPro.hasOwnProperty;

// const r = (a => b => c => a * b * c) | recurry
// r (1, 2, 3) = roll (orig) (1, 2, 3)
// r (1, 2)    = roll (orig) (1, 2)
// r (1) = roll (orig) (1)
// r (1) (2) (3)
// r ()

var recurry = exports.recurry = function recurry(n) {
    return function (f) {
        return function () {
            var rolled = roll(f).apply(undefined, arguments);
            var dn = n - arguments.length;
            return dn <= 1 ? rolled : recurry(dn)(rolled);
        };
    };
};

var _recurry = recurry;

// --- note that the resulting function is not curried, and does not have a well-defined arity. Use
// R.uncurryN if this is a problem.

var roll = exports.roll = function roll(f) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var g = f;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;
                g = g(i);
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

        return g;
    };
};

var noop = exports.noop = function noop() {};

var ok = exports.ok = function ok(x) {
    return x != null;
};
var notOk = exports.notOk = function notOk(x) {
    return x == null;
};

// --- different from R.equals, which considers two different objects equal if their contents are
//     the same (equivalent).
// --- different from R.identical, which has some different semantics involving e.g. 0 and -0.
// --- literally just wraps ===.
// rationale: must be able to confidently refactor working code which uses ===

var eq = exports.eq = _recurry(2)(_manual2.default.eq);
var ne = exports.ne = _recurry(2)(_manual2.default.ne);
var gt = exports.gt = _recurry(2)(_manual2.default.gt);
var gte = exports.gte = _recurry(2)(_manual2.default.gte);
var lt = exports.lt = _recurry(2)(_manual2.default.lt);
var lte = exports.lte = _recurry(2)(_manual2.default.lte);

var dot = exports.dot = _recurry(2)(_manual2.default.dot);
var dot1 = exports.dot1 = _recurry(3)(_manual2.default.dot1);
var dot2 = exports.dot2 = _recurry(4)(_manual2.default.dot2);
var dot3 = exports.dot3 = _recurry(5)(_manual2.default.dot3);
var dot4 = exports.dot4 = _recurry(6)(_manual2.default.dot4);
var dot5 = exports.dot5 = _recurry(7)(_manual2.default.dot5);
var dotN = exports.dotN = _recurry(3)(_manual2.default.dotN);

var side = exports.side = _recurry(2)(_manual2.default.side);
var side1 = exports.side1 = _recurry(3)(_manual2.default.side1);
var side2 = exports.side2 = _recurry(4)(_manual2.default.side2);
var side3 = exports.side3 = _recurry(5)(_manual2.default.side3);
var side4 = exports.side4 = _recurry(6)(_manual2.default.side4);
var side5 = exports.side5 = _recurry(7)(_manual2.default.side5);
var sideN = exports.sideN = _recurry(3)(_manual2.default.sideN);

// whenEmpty, whenFunction, ifNotPredicate: -> user-space.
// also, ifNotPredicate would be confusing:
//  should ifNotPredicate match falsey or false? If falsey, it breaks symmetry with ifPredicate; if
// false, it behaves differently than ifPredicate (pred >> not), which is also confusing.
//

var isTrue = exports.isTrue = _op(true, eq);
var isFalse = exports.isFalse = _op(false, eq); // --- exactly false.
var isYes = exports.isYes = Boolean;
var isNo = exports.isNo = _op3(isYes, _ramda.not);
var isTruthy = exports.isTruthy = isYes;
var isFalsey = exports.isFalsey = isNo;

var ifPredicate = exports.ifPredicate = _recurry(4)(_manual2.default.ifPredicate);
var whenPredicate = exports.whenPredicate = _recurry(3)(_manual2.default.whenPredicate);

var ifOk = exports.ifOk = ifPredicate(ok);
var whenOk = exports.whenOk = whenPredicate(ok);
var ifNotOk = exports.ifNotOk = ifPredicate(notOk);
var whenNotOk = exports.whenNotOk = whenPredicate(notOk);
var ifTrue = exports.ifTrue = ifPredicate(isTrue);
var whenTrue = exports.whenTrue = whenPredicate(isTrue);
var ifFalse = exports.ifFalse = ifPredicate(isFalse);
var whenFalse = exports.whenFalse = whenPredicate(isFalse);
var ifYes = exports.ifYes = ifPredicate(isYes);
var whenYes = exports.whenYes = whenPredicate(isYes);
var ifNo = exports.ifNo = ifPredicate(isNo);
var whenNo = exports.whenNo = whenPredicate(isNo);
var ifTruthy = exports.ifTruthy = ifYes;
var whenTruthy = exports.whenTruthy = whenYes;
var ifFalsey = exports.ifFalsey = ifNo;
var whenFalsey = exports.whenFalsey = whenNo;

// --- these have a different calling convention, so their names are a bit misleading based on the
// above pattern.
var ifHas = exports.ifHas = _recurry(3)(_manual2.default.ifHas);
var whenHas = exports.whenHas = _recurry(2)(_manual2.default.whenHas);
var ifHasIn = exports.ifHasIn = _recurry(3)(_manual2.default.ifHasIn);
var whenHasIn = exports.whenHasIn = _recurry(2)(_manual2.default.whenHasIn);

var ifBind = exports.ifBind = _recurry(3)(_manual2.default.ifBind);
var whenBind = exports.whenBind = _recurry(2)(_manual2.default.whenBind);

// --- @deprecated.
var ifPredicate__ = exports.ifPredicate__ = function ifPredicate__(f, x, yes) {
    var no = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
    return _op(x, ifPredicate(f)(yes)(no));
};
var ifOk__ = exports.ifOk__ = function ifOk__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifOk(yes)(no));
};
var ifNotOk__ = exports.ifNotOk__ = function ifNotOk__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifNotOk(yes)(no));
};
var ifTrue__ = exports.ifTrue__ = function ifTrue__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifTrue(yes)(no));
};
var ifFalse__ = exports.ifFalse__ = function ifFalse__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifFalse(yes)(no));
};
var ifYes__ = exports.ifYes__ = function ifYes__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifYes(yes)(no));
};
var ifNo__ = exports.ifNo__ = function ifNo__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifNo(yes)(no));
};
var ifFunction__ = exports.ifFunction__ = function ifFunction__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifFunction(yes)(no));
};
var ifHas__ = exports.ifHas__ = function ifHas__(spec, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(spec, ifHas(yes)(no));
};
var ifHasIn__ = exports.ifHasIn__ = function ifHasIn__(spec, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(spec, ifHasIn(yes)(no));
};
var ifBind__ = exports.ifBind__ = function ifBind__(spec, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(spec, ifBind(yes)(no));
};

var cond = exports.cond = _manual2.default.cond;
var condN = exports.condN = function condN(blocks) {
    return cond.apply(undefined, _toConsumableArray(blocks));
};
var condS = exports.condS = _recurry(2)(_manual2.default.condS);

// ------ exceptions.

// @deprecated
var tryCatch__ = exports.tryCatch__ = function tryCatch__(whatToTry) {
    var howToCatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

    try {
        return whatToTry();
    } catch (e) {
        return howToCatch(e);
    }
};

var tryCatch = exports.tryCatch = _recurry(3)(_manual2.default.tryCatch);
var exception = exports.exception = function exception() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return new Error(args.join(' '));
};
var raise = exports.raise = function raise(e) {
    throw e;
};
var decorateException = exports.decorateException = _recurry(2)(_manual2.default.decorateException);

// --- despite the name, die simply throws an exception, which can of course be caught.
// it shouldn't be too surprising to JS users that it doesn't halt the runtime.

var die = exports.die = _op3(exception, raise);

// ------ cascade

var cascade = exports.cascade = function cascade(val) {
    for (var _len3 = arguments.length, fxs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        fxs[_key3 - 1] = arguments[_key3];
    }

    return fxs.reduce(function (a, b) {
        return b(a);
    }, val);
};

// --------- data.

// ------ defaultTo.

var defaultTo = exports.defaultTo = _recurry(2)(_manual2.default.defaultTo);

// --- @deprecated
var defaultTo__ = exports.defaultTo__ = function defaultTo__(x, f) {
    return _op(x, defaultTo(f));
};

// ------ join, split etc.
var split = exports.split = _recurry(2)(_manual2.default.split);
var join = exports.join = _recurry(2)(_manual2.default.join);

// ------ object manipulation.

var prop = exports.prop = _recurry(2)(_manual2.default.prop);
var assoc = exports.assoc = _recurry(3)(_manual2.default.assoc);
var assocM = exports.assocM = _recurry(3)(_manual2.default.assocM);

// ------ append.

var appendFrom = exports.appendFrom = _recurry(2)(_manual2.default.appendFrom);
var appendTo = exports.appendTo = _recurry(2)(_manual2.default.appendTo);
var appendFromM = exports.appendFromM = _recurry(2)(_manual2.default.appendFromM);
var appendToM = exports.appendToM = _recurry(2)(_manual2.default.appendToM);

// ------ prepend.

var prependTo = exports.prependTo = _recurry(2)(_manual2.default.prependTo);
var prependFrom = exports.prependFrom = _recurry(2)(_manual2.default.prependFrom);
var prependFromM = exports.prependFromM = _recurry(2)(_manual2.default.prependFromM);
var prependToM = exports.prependToM = _recurry(2)(_manual2.default.prependToM);

// --- arrays or strings
// --- ramda's concat does more type checking and also allows fantasy land semigroups.
var concatTo = exports.concatTo = _recurry(2)(_manual2.default.concatTo);
var concatFrom = exports.concatFrom = _recurry(2)(_manual2.default.concatFrom);
var precatTo = exports.precatTo = concatFrom;
var precatFrom = exports.precatFrom = concatTo;

// --- only arrays (strings will throw)
var concatToM = exports.concatToM = _recurry(2)(_manual2.default.concatToM);
var concatFromM = exports.concatFromM = _recurry(2)(_manual2.default.concatFromM);

// --- own properties, including null/undefined.
// --- 2x faster than Object.assign.
// --- @todo: why is it so much faster?

var mergeTo = exports.mergeTo = _recurry(2)(_manual2.default.mergeTo);
var mergeFrom = exports.mergeFrom = _recurry(2)(_manual2.default.mergeFrom);
var mergeFromM = exports.mergeFromM = _recurry(2)(_manual2.default.mergeFromM);
var mergeToM = exports.mergeToM = _recurry(2)(_manual2.default.mergeToM);

// --- copies enumerable own properties from src into tgt, mut.
////// --- uses collision function if key exists in the target, anywhere in target's prototype chain.
// --- 'with' refers to collision
// --- 'to' refers to tgt
// --- to avoid non-intuitive behavior, only own properties are checked on the target.
////// --- if a collision occurs in the target's prototype chain, the value will surface, regardless of whether src or tgt version is chosen.

var mergeToWithM = exports.mergeToWithM = _recurry(3)(_manual2.default.mergeToWithM);
var mergeFromWithM = exports.mergeFromWithM = _recurry(3)(_manual2.default.mergeFromWithM);

var mergeToWhenOkM = exports.mergeToWhenOkM = _recurry(2)(_manual2.default.mergeToWhenOkM);
var mergeFromWhenOkM = exports.mergeFromWhenOkM = _recurry(2)(_manual2.default.mergeFromWhenOkM);

var mergeToInM = exports.mergeToInM = _recurry(2)(_manual2.default.mergeToInM);
var mergeFromInM = exports.mergeFromInM = _recurry(2)(_manual2.default.mergeFromInM);

// --- all enumerable properties (non-own and own) on both the src and tgt will be copied to the new
// object.
var mergeFromIn = exports.mergeFromIn = _recurry(2)(_manual2.default.mergeFromIn);

// --- all enumerable properties (non-own and own) on both the src and tgt will be copied to the new
// object.
var mergeToIn = exports.mergeToIn = _recurry(2)(_manual2.default.mergeToIn);

// --- like R.mergeAll but also use prototype vals.
// --- to and from not applicable, also not curried or meant to be used piped.
var mergeAllIn = exports.mergeAllIn = function mergeAllIn(xs) {
    return xs.reduce(function (tgt, src) {
        return mergeToInM(tgt)(src);
    }, {});
};

// ------ map.

// --- simple dispatches to Array.prototype.map

var map = exports.map = _recurry(2)(_manual2.default.map);
var each = exports.each = _recurry(2)(_manual2.default.each);

var addIndex = exports.addIndex = _recurry(3)(_manual2.default.addIndex);
var addCollection = exports.addCollection = _recurry(3)(_manual2.default.addCollection);

// --- returns an object.
// --- user function f is expected to return pairs: [k, v]
//
// if target is an obj, it maps on key/value pairs of object -- this is different from ramda's map
// in that it can change the keys.
// if target is an array [key, value, key, value], it maps on pairs (think %foo= @foo in perl)
//
// ordering: k, v.
// everywhere else: v, k.
//
// @todo optimise
// @todo aren't array pairs better than spaced ones?

var ifArray = function ifArray() {
    return ifPredicate(isArray).apply(undefined, arguments);
};

// @todo
var mapPairs = exports.mapPairs = (0, _ramda.curry)(function (f, obj) {
    return _op(obj, ifArray(_op3(_op3((0, _ramda.splitEvery)(2), map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        return f(k, v);
    })), _ramda.fromPairs), _op3(_op3(_ramda.toPairs, map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        return f(k, v);
    })), _ramda.fromPairs)));
});

// @todo
// --- doesn't take array, only obj.
var mapPairsIn = exports.mapPairsIn = (0, _ramda.curry)(function (f, obj) {
    return _op(_op(_op(obj, _ramda.toPairsIn), map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            k = _ref6[0],
            v = _ref6[1];

        return f(k, v);
    })), _ramda.fromPairs);
});

var eachObj = exports.eachObj = _recurry(2)(_manual2.default.eachObj);
var eachObjIn = exports.eachObjIn = _recurry(2)(_manual2.default.eachObjIn);

var reduceObj = exports.reduceObj = _recurry(3)(_manual2.default.reduceObj);
var reduceObjIn = exports.reduceObjIn = _recurry(3)(_manual2.default.reduceObjIn);

// fs `ampersand` x = map map' fs where map' f = f x
var ampersand = exports.ampersand = _recurry(2)(_manual2.default.ampersand);
var asterisk = exports.asterisk = _recurry(2)(_manual2.default.asterisk);

// --------- laat / let

// --- last arg must be a function.
// 1 arg is possible but trivial.
var laat = exports.laat = function laat() {
    for (var _len4 = arguments.length, xs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        xs[_key4] = arguments[_key4];
    }

    var f = xs.pop();
    return letN(xs, f);
};

/*
 * For example, our `defaultTo` takes a function:
 * null | defaultTo (_ -> 'bad news')
 * For simple values, defaultToV can be more convenient:
 * null | defaultToV ('bad news')
*/
// i like letV fitting the pattern
// laat -> letV
// letN -> letNV
// lets2 -> let2
// letsN -> letN
// lets -> laat
// letsS -> letS

var letN = exports.letN = _recurry(2)(_manual2.default.letN);

// --- these can be called directly by speed freaks; `lets` should be good enough for nearly all
// uses.
var lets2 = exports.lets2 = function lets2(f1, f2) {
    var n1 = f1();
    return f2(n1);
};

var lets3 = exports.lets3 = function lets3(f1, f2, f3) {
    var n1 = f1();
    var n2 = f2(n1);
    return f3(n1, n2);
};

var lets4 = exports.lets4 = function lets4(f1, f2, f3, f4) {
    var n1 = f1();
    var n2 = f2(n1);
    var n3 = f3(n1, n2);
    return f4(n1, n2, n3);
};

var lets5 = exports.lets5 = function lets5(f1, f2, f3, f4, f5) {
    var n1 = f1();
    var n2 = f2(n1);
    var n3 = f3(n1, n2);
    var n4 = f4(n1, n2, n3);
    return f5(n1, n2, n3, n4);
};

var lets6 = exports.lets6 = function lets6(f1, f2, f3, f4, f5, f6) {
    var n1 = f1();
    var n2 = f2(n1);
    var n3 = f3(n1, n2);
    var n4 = f4(n1, n2, n3);
    var n5 = f5(n1, n2, n3, n4);
    return f6(n1, n2, n3, n4, n5);
};

var letsN = exports.letsN = function letsN(xs) {
    return lets.apply(undefined, _toConsumableArray(xs));
};

// --- generic form, for any non-zero number of arguments.
var _lets = function _lets() {
    for (var _len5 = arguments.length, xs = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        xs[_key5] = arguments[_key5];
    }

    var executeStep = function executeStep(prevVals) {
        return applyToN(prevVals);
    };

    var ys = _op(_op(xs
    // --- acc contains running output array, up to the previous item.
    , (0, _ramda.mapAccum)(function (acc, v) {
        return _op(executeStep(acc)(v), function (stepVal) {
            return [[].concat(_toConsumableArray(acc), [stepVal]), stepVal];
        });
    })([])), (0, _ramda.prop)(1));

    return _op(ys, _ramda.last);
};

var lets = exports.lets = function lets() {
    if (arguments.length === 2) return lets2.apply(undefined, arguments);
    if (arguments.length === 3) return lets3.apply(undefined, arguments);
    if (arguments.length === 4) return lets4.apply(undefined, arguments);
    if (arguments.length === 5) return lets5.apply(undefined, arguments);
    if (arguments.length === 6) return lets6.apply(undefined, arguments);
    return _lets.apply(undefined, arguments);
};

// --- move xxx
var letsS = exports.letsS = (0, _ramda.curry)(function (specAry, tgt) {
    return lets.apply(undefined, [function (_) {
        return tgt;
    }].concat(_toConsumableArray(specAry)));
});

// --- 'call' and 'provide' always mean pass a context.
// --- 'apply' always means 'apply this function to some params'
// --- 'pass' means 'pass these params to a function'
// --- 'invoke' means just call this function, no context or params.

// ------ ; {}.toString | callOn ([])

var callOn = exports.callOn = _recurry(2)(_manual2.default.callOn);
var callOn1 = exports.callOn1 = _recurry(3)(_manual2.default.callOn1);
var callOn2 = exports.callOn2 = _recurry(4)(_manual2.default.callOn2);
var callOn3 = exports.callOn3 = _recurry(5)(_manual2.default.callOn3);
var callOn4 = exports.callOn4 = _recurry(6)(_manual2.default.callOn4);
var callOn5 = exports.callOn5 = _recurry(7)(_manual2.default.callOn5);
var callOnN = exports.callOnN = _recurry(3)(_manual2.default.callOnN);

// ------ ; [] | provideTo ({}.toString)

var provideTo = exports.provideTo = _recurry(2)(_manual2.default.provideTo);
var provideTo1 = exports.provideTo1 = _recurry(3)(_manual2.default.provideTo1);
var provideTo2 = exports.provideTo2 = _recurry(4)(_manual2.default.provideTo2);
var provideTo3 = exports.provideTo3 = _recurry(5)(_manual2.default.provideTo3);
var provideTo4 = exports.provideTo4 = _recurry(6)(_manual2.default.provideTo4);
var provideTo5 = exports.provideTo5 = _recurry(7)(_manual2.default.provideTo5);
var provideToN = exports.provideToN = _recurry(3)(_manual2.default.provideToN);

var invoke = exports.invoke = function invoke(f) {
    return f();
};

// ------ sum | applyToN ([1, 2, 3])
var applyTo1 = exports.applyTo1 = _recurry(2)(_manual2.default.applyTo1);
var applyTo2 = exports.applyTo2 = _recurry(3)(_manual2.default.applyTo2);
var applyTo3 = exports.applyTo3 = _recurry(4)(_manual2.default.applyTo3);
var applyTo4 = exports.applyTo4 = _recurry(5)(_manual2.default.applyTo4);
var applyTo5 = exports.applyTo5 = _recurry(6)(_manual2.default.applyTo5);
var applyToN = exports.applyToN = _recurry(2)(_manual2.default.applyToN);

// --- 1 | passTo (double)
var passTo = exports.passTo = _recurry(2)(_manual2.default.passTo);
// --- ; [1, 2, 3] | passToN (sum)
var passToN = exports.passToN = _recurry(2)(_manual2.default.passToN);

// --- flip first and second args of a curried function, even for functions with more than 2 args
// and for manually curried functions, unlike R.flip.
// --- does not work with non-curried functions.

var flip = exports.flip = _recurry(3)(_manual2.default.flip);
var flip3 = exports.flip3 = _recurry(4)(_manual2.default.flip3);
var flip4 = exports.flip4 = _recurry(5)(_manual2.default.flip4);
var flip5 = exports.flip5 = _recurry(6)(_manual2.default.flip5);

// ------ sprintf
var sprintf1 = exports.sprintf1 = _recurry(2)(_manual2.default.sprintf1);
var sprintfN = exports.sprintfN = _recurry(2)(_manual2.default.sprintfN);

// --- R.zip only takes two.
var zipAll = exports.zipAll = function zipAll() {
    for (var _len6 = arguments.length, xss = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        xss[_key6] = arguments[_key6];
    }

    var ret = [];
    var l = xss[0].length;

    var _loop = function _loop(i) {
        ret.push(xss.map(function (xs) {
            return xs[i];
        }));
    };

    for (var i = 0; i < l; i++) {
        _loop(i);
    }return ret;
};

// ------ repeat, side

var repeatV = exports.repeatV = _recurry(2)(_manual2.default.repeatV);
var repeatF = exports.repeatF = _recurry(2)(_manual2.default.repeatF);
var repeatSide = exports.repeatSide = _recurry(2)(_manual2.default.repeatSide);
var timesV = exports.timesV = _recurry(2)(_manual2.default.timesV);
var timesF = exports.timesF = _recurry(2)(_manual2.default.timesF);
var timesSide = exports.timesSide = _recurry(2)(_manual2.default.timesSide);

// ------ types. @test

var isType = exports.isType = _recurry(2)(_manual2.default.isType);
var isArray = exports.isArray = isType('Array');
var isFunction = exports.isFunction = isType('Function');

/*
// --- wants upper case, e.g. output of toString.
export const CANONisType = curry ((t, x) => x
| provideTo ({}.toString)
| dot2 ('slice') (8, -1)
| equals (t)
)
*/
// xxx getType
// export const getType = provideTo ({}.toString)
//    >> dot2 ('slice') (8, -1) (
//)


// @test
// --- assumed to be a Number.
var isInteger = exports.isInteger = function isInteger(x) {
    return x === Math.floor(x);
};

// xxx timesVoid, to not make an array.
// maybe timesV

// @todo
// export const rangeBy = curry ((from, to, by, f) => {
//     for (let i = from; i <= to; i += by) f (i)
// })
// export const range = curry ((from, to, f) => rangeBy (from, to, 1, f))

// excl, so it's like ramda.
// they already provide range.
var rangeBy = exports.rangeBy = (0, _ramda.curry)(function (from, to, by) {
    var coll = [];
    for (var i = from; i < to; i += by) {
        coll.push(i);
    }return coll;
});

var compact = exports.compact = (0, _ramda.filter)(Boolean);
var compactOk = exports.compactOk = (0, _ramda.reject)(_ramda.isNil);

// --- turn positional args into a list with those values.
var list = exports.list = function list() {
    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
    }

    return args;
};

var joinOk = exports.joinOk = (0, _ramda.curry)(function (j, xs) {
    return _op(_op(xs, compactOk), join(j));
});

// --------- new.
// xxx german aliases

var nieuw = exports.nieuw = function nieuw(x) {
    return new x();
};
var nieuw1 = exports.nieuw1 = (0, _ramda.curry)(function (x, val) {
    return new x(val);
});
var nieuw2 = exports.nieuw2 = (0, _ramda.curry)(function (x, val1, val2) {
    return new x(val1, val2);
});
var nieuw3 = exports.nieuw3 = (0, _ramda.curry)(function (x, val1, val2, val3) {
    return new x(val1, val2, val3);
});
var nieuwN = exports.nieuwN = (0, _ramda.curry)(function (x, vs) {
    return new (Function.prototype.bind.apply(x, [null].concat(_toConsumableArray(vs))))();
});

// --------- regex.
// @deps: dot1

// --- leaving out the 'flip' versions: assuming you generally want to pipe the target to the match
// functions.

var removeSpaces = dot2('replace')(/\s+/g)('');

// --- input: regex.
var xRegExp = exports.xRegExp = function xRegExp(re) {
    return new RegExp(_op(re.source, removeSpaces), re.flags);
};

// @todo test
// --- beware, overwrites any flags that the re already had.
var xRegExpFlags = exports.xRegExpFlags = function xRegExpFlags(re, flags) {
    return new RegExp(_op(re.source, removeSpaces), flags);
};

// --- input: string, [string].
var xRegExpStr = exports.xRegExpStr = function xRegExpStr(reStr) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return letN([_op(reStr, removeSpaces), flags], nieuw2(RegExp));
};

var match = exports.match = (0, _ramda.curry)(function (re, target) {
    return re.exec(target);
});

// xxx there should be a 'replace' version of all these functions as well.

// xxx make xMatch incur only a compile-time cost.

// @todo test
// @todo xMatchStrGlobal, maybe flags variations too
var xMatchGlobal = exports.xMatchGlobal = (0, _ramda.curry)(function (re, mapper, target) {
    var out = [];
    var reGlobal = xRegExpFlags(re, 'g');
    var m = void 0;
    while (m = reGlobal.exec(target)) {
        _op(mapper.apply(undefined, _toConsumableArray(m)), appendToM(out));
    }return out;
});

// --- input: regex.
var xMatch = exports.xMatch = (0, _ramda.curry)(function (re, target) {
    return _op(xRegExp(re), dot1('exec', target));
});

// --- input: string.
var xMatchStr = exports.xMatchStr = (0, _ramda.curry)(function (reStr, target) {
    return _op(target, xMatch(new RegExp(reStr)));
});

// --- input: string, string.
var xMatchStrFlags = exports.xMatchStrFlags = (0, _ramda.curry)(function (reStr, flags, target) {
    return _op(target, xMatch(new RegExp(reStr, flags)));
});

var xReplace = exports.xReplace = (0, _ramda.curry)(function (re, repl, target) {
    return target.replace(xRegExp(re), repl);
});

var xReplaceStr = exports.xReplaceStr = (0, _ramda.curry)(function (reStr, repl, target) {
    return target.replace(xRegExpStr(reStr), repl);
});

var xReplaceStrFlags = exports.xReplaceStrFlags = (0, _ramda.curry)(function (reStr, flags, repl, target) {
    return target.replace(xRegExpStr(reStr, flags), repl);
});

var ifReplace = exports.ifReplace = _recurry(5)(_manual2.default.ifReplace);

var ifXReplace = exports.ifXReplace = (0, _ramda.curry)(function (yes, no, re, repl, target) {
    return ifReplace(yes, no, _op(re, xRegExp), repl, target);
});

var ifXReplaceStr = exports.ifXReplaceStr = (0, _ramda.curry)(function (yes, no, reStr, repl, target) {
    return ifReplace(yes, no, xRegExpStr(reStr), repl, target);
});

var ifXReplaceStrFlags = exports.ifXReplaceStrFlags = (0, _ramda.curry)(function (yes, no, reStr, flags, repl, target) {
    return ifReplace(yes, no, xRegExpStr(reStr, flags), repl, target);
});

// --- returns a copy with prototype vals discarded.
var discardPrototype = exports.discardPrototype = function discardPrototype(o) {
    return Object.assign({}, o);
};

// --- returns a copy with prototype vals surfaced.
var flattenPrototype = exports.flattenPrototype = mergeToInM({});

// --- using rest params to pluck it is about 4 times faster than writing the args out -- but even
// the latter can do 1e5 iterations per ms.

var arg0 = exports.arg0 = function arg0() {
    return arguments.length <= 0 ? undefined : arguments[0];
};
var arg1 = exports.arg1 = function arg1() {
    return arguments.length <= 1 ? undefined : arguments[1];
};
var arg2 = exports.arg2 = function arg2() {
    return arguments.length <= 2 ? undefined : arguments[2];
};
var arg3 = exports.arg3 = function arg3() {
    return arguments.length <= 3 ? undefined : arguments[3];
};
var arg4 = exports.arg4 = function arg4() {
    return arguments.length <= 4 ? undefined : arguments[4];
};
var arg5 = exports.arg5 = function arg5() {
    return arguments.length <= 5 ? undefined : arguments[5];
};
var arg6 = exports.arg6 = function arg6() {
    return arguments.length <= 6 ? undefined : arguments[6];
};

var mergeMixins = function mergeMixins(mixinsPre, proto, mixinsPost) {
    var reduceMixins = (0, _ramda.reduce)(function (a, b) {
        return _op(b, mergeTo(a));
    })({});
    var pre = _op(mixinsPre, reduceMixins);
    var post = _op(mixinsPost, reduceMixins);
    var chooseTarget = arg0;

    _op(pre, mergeToWithM(chooseTarget)(proto));
    _op(post, mergeToM(proto));

    return proto;
};

// --- providing mixins will *alter* proto -- this is to avoid doing a clone or flattening the
// prototype chain.
// --- you can avoid this by passing Object.create (proto) instead of proto.
// --- probably if you are working with mixins you don't mind if the proto is altered, just saying.

// --- multiple instanceExtensions can be given: will be merged right-to-left using R.mergeAll,
// meaning prototypes will be discarded.

// note: you are free to put properties in the prototype, though this is probably not a great idea.
// at the very least, you should ensure that they are never mutated.

var _factory = function _factory(proto) {
    var mixinsPre = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var mixinsPost = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    return lets(function (_) {
        return mergeMixins(mixinsPre, proto, mixinsPost);
    }, function (protoMixed) {
        return {
            // --- consider dropping this: Object.getPrototypeOf xxx
            proto: protoMixed,
            create: function create() {
                for (var _len8 = arguments.length, instanceExtension = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                    instanceExtension[_key8] = arguments[_key8];
                }

                return _op(_op(protoMixed, Object.create), mergeFromM(_op(instanceExtension, _ramda.mergeAll)));
            }
        };
    });
};

// --- xxx maybe a factoryMixinsM and non-m version?
// would be nice to not have it fuck with the prototype.
// the non-m version will make a clone, possibly only with owns?
// or another flag for owns and not-owns? I?
// --- xxx change all In to I?
//
// --- xxx think about which maps return lists and which return the same kind of thing being mapped.

// --- convenience.
// note that this will *alter* the prototype.
var factoryMixins = exports.factoryMixins = (0, _ramda.curry)(function (mixinsPre, mixinsPost, proto) {
    return _factory(proto, mixinsPre, mixinsPost);
});

// --- usage:
// const dogProps = { name: 'defaultname', age: undefined, ... }
// const Dog = dogProto | factory | factoryProps (dogProps)
// or
// const dogFactory = factory >> factoryProps (dogProps)
// const Dog = dogProto | dogFactory
//
// const dog = Dog.create ({ age: 10 )
//
// This is where you can put your instance properties initialisation. Totally optional -- also
// without this, you will get an instance!
// This is a good place to document the properties: put them in the instance{} even if they're
// undefined.
// props is altered.
var factoryProps = exports.factoryProps = (0, _ramda.curry)(function (props, factory) {
    var orig = function orig() {
        return factory.create.apply(factory, arguments);
    };
    return Object.assign({}, factory, {
        create: function create(args) {
            var o = orig(props);
            var src = args,
                tgt = o;

            for (var i in args) {
                if (hasOwn.call(src, i) && ok(src[i])) tgt[i] = src[i];
            }return tgt;
        }
    });
});

var factoryInit = exports.factoryInit = function factoryInit(init) {
    return function (proto) {
        return {
            proto: proto,
            create: function create(props) {
                var o = Object.create(proto);
                init(o, props);
                return o;
            }
        };
    };
};

var factory = exports.factory = factoryInit(function (o, props) {
    if (props == null) return;
    for (var i in props) {
        if (oPro.hasOwnProperty.call(props, i)) o[i] = props[i];
    }
});

// --- e.g.:
// const theFactory = proto | factory | factoryStatics (statics) | factoryInit (init)
// for if you want to have other functions in the factory (parallel to .create())
// note that they get added to the factory, not the object:
//
// const statics = { numLegs: _ => 4 }
// const dogFactory = dogProto | factory | factoryStatics (statics)
// const dog = dogFactory.create ()
// // dog.numLegs () // no
// dogFactory.numLegs () // 4
//
// in many cases, a simple function exported by the module will probably get you what you want.
// you can of course always put the static functions in the prototype as well. it will mean
// infinitesimally more memory use -- and that you need at least one instance.
//
// const dogProto = { numLegs: _ => 4, ... }
// const dogFactory = dogProto | factory
// const dog = dogFactory.create ()
// dog.numLegs () // 4

var factoryStatics = exports.factoryStatics = mergeFromM;

// --- don't really like this.
// proto gets altered.
// order difficult.
var factoryMixinPre = exports.factoryMixinPre = (0, _ramda.curry)(function (mixin, proto) {
    return factoryMixinPre([mixin], [], proto);
});
var factoryMixinPost = exports.factoryMixinPost = (0, _ramda.curry)(function (mixin, proto) {
    return factoryMixinPre([], [mixin], proto);
});

// ------ bind

// would be nice to bind with an arg, e.g. exit with a code.
//const exit = 'exit' | bind (process)

// xxx bind and invoke
// bind >> invoke
// xxx bind the other way around
// o | bind ('funcname')

// xxx cursor | bind ('theta')
// xxx 'theta' | bindOn (cursor)

// xxx preps
// --- dies if o[prop] is not a function.
var bindTo = exports.bindTo = _recurry(2)(_manual2.default.bindTo);
var bindTry = exports.bindTry = _recurry(2)(_manual2.default.bindTry);

// bindPropTo
// 'log'   | bindPropTo (console)
// console | bindProp   ('log')
//
// console.log | bindTo (console)
// console     | bind   (console.log)

var bind = exports.bind = bindTo;

// --- returns a thunk (function) representing the bind: doesn't actually try to bind until that function is invoked.
var bindLate = exports.bindLate = (0, _ramda.curry)(function (o, key) {
    return function () {
        return o[key].apply(o, arguments);
    };
});

var subtract = exports.subtract = _recurry(2)(_manual2.default.subtract);
var subtractFrom = exports.subtractFrom = _recurry(2)(_manual2.default.subtractFrom);
var minus = exports.minus = subtract;
var add = exports.add = _recurry(2)(_manual2.default.add);
var plus = exports.plus = add;
var multiply = exports.multiply = _recurry(2)(_manual2.default.multiply);
var divideBy = exports.divideBy = _recurry(2)(_manual2.default.divideBy);
var divideInto = exports.divideInto = _recurry(2)(_manual2.default.divideInto);
var modulo = exports.modulo = _recurry(2)(_manual2.default.modulo);
var moduloWholePart = exports.moduloWholePart = _recurry(2)(_manual2.default.moduloWholePart);
var toThe = exports.toThe = _recurry(2)(_manual2.default.toThe);

// --- synonym for always. check impl of always. xxx
var blush = exports.blush = function blush(x) {
    return function (_) {
        return x;
    };
};

// @test
var T = exports.T = blush(true);
var F = exports.F = blush(false);

var condElse = exports.condElse = T;
var condPredicate = exports.condPredicate = _recurry(2)(_manual2.default.condPredicate);

var guard = exports.guard = condPredicate;
var guardV = exports.guardV = _op3(blush, guard);
var otherwise = exports.otherwise = condElse;

// @deprecated
// export const ifEquals = curry ((test, yes, no, x) => x === test ? yes (x) : no (x))
// export const whenEquals = curry ((test, yes, x) => x | ifEquals (test) (yes) (noop))
// export const ifEquals__ = (x, test, yes, no = noop) => x | ifEquals (test) (yes) (no)

var ignore = function ignore(n) {
    return function (f) {
        return function () {
            for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                args[_key9] = arguments[_key9];
            }

            return _op(_op(_op(args, (0, _ramda.splitAt)(n)), prop(1)), passToN(f));
        };
    };
};
var headTail = function headTail(f) {
    return _op3((0, _ramda.splitAt)(1), f);
};

var defaultToV = exports.defaultToV = _op3(blush, defaultTo);

var _console = console,
    log = _console.log;

var logWith = function logWith(header) {
    return function () {
        for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
            args[_key10] = arguments[_key10];
        }

        return log.apply(undefined, [header].concat(args));
    };
};

// a map results in a collection of the same shape: list to list, object to object.
// the modifier As means the shape will change.

// filter: truthy, like JS filter & R filter
// map + filter could also be done with reduceObj, of course.
// filter applies to the mapped value.

// --- @test
var _withFilter = function _withFilter(_) {
    return new Map().set(mapAsKeys, mapAsKeysWithFilter).set(mapAsKeysIn, mapAsKeysInWithFilter).set(mapAsValues, mapAsValuesWithFilter).set(mapAsValuesIn, mapAsValuesInWithFilter).set(mapKeys, mapKeysWithFilter).set(mapValues, mapValuesWithFilter).set(mapKeysIn, mapKeysInWithFilter).set(mapValuesIn, mapValuesInWithFilter).set(mapTuples, mapTuplesWithFilter).set(mapTuplesIn, mapTuplesInWithFilter);
};

var withFilter = exports.withFilter = function withFilter(p) {
    return function (mapper) {
        return _op(_withFilter().get(mapper), ifOk(function (f) {
            return f(p);
        }, function (_) {
            return die('cannot augment mapper');
        }));
    };
};

var mapAsKeys = exports.mapAsKeys = function mapAsKeys(f) {
    return function (o) {
        var ret = [];
        for (var k in o) {
            if (hasOwn.call(o, k)) ret.push(f(k));
        }return ret;
    };
};

var mapAsKeysWithFilter = function mapAsKeysWithFilter(p) {
    return function (f) {
        return function (o) {
            var ret = [];
            for (var k in o) {
                if (hasOwn.call(o, k)) {
                    var kk = f(k);
                    if (p(kk)) ret.push(f(k));
                }
            }return ret;
        };
    };
};

var mapAsKeysIn = exports.mapAsKeysIn = function mapAsKeysIn(f) {
    return function (o) {
        var ret = [];
        for (var k in o) {
            ret.push(f(k));
        }return ret;
    };
};

var mapAsKeysInWithFilter = function mapAsKeysInWithFilter(p) {
    return function (f) {
        return function (o) {
            var ret = [];
            for (var k in o) {
                var kk = f(k);
                if (p(kk)) ret.push(f(k));
            }
            return ret;
        };
    };
};

// @canonical
// const keys = mapAsKeys (id)
// const keysIn = mapAsKeysIn (id)

var keys = exports.keys = function keys(o) {
    var ret = [];
    for (var k in o) {
        if (hasOwn.call(o, k)) ret.push(k);
    }return ret;
};

var keysIn = exports.keysIn = function keysIn(o) {
    var ret = [];
    for (var k in o) {
        ret.push(k);
    }return ret;
};

var mapAsValues = exports.mapAsValues = function mapAsValues(f) {
    return function (o) {
        var ret = [];
        for (var k in o) {
            if (hasOwn.call(o, k)) ret.push(f(o[k]));
        }return ret;
    };
};

var mapAsValuesWithFilter = function mapAsValuesWithFilter(p) {
    return function (f) {
        return function (o) {
            var ret = [];
            for (var k in o) {
                if (hasOwn.call(o, k)) {
                    var kk = f(o[k]);
                    if (p(kk)) ret.push(kk);
                }
            }return ret;
        };
    };
};

var mapAsValuesIn = exports.mapAsValuesIn = function mapAsValuesIn(f) {
    return function (o) {
        var ret = [];
        for (var k in o) {
            ret.push(f(o[k]));
        }return ret;
    };
};

var mapAsValuesInWithFilter = function mapAsValuesInWithFilter(p) {
    return function (f) {
        return function (o) {
            var ret = [];
            for (var k in o) {
                var kk = f(o[k]);
                if (p(kk)) ret.push(kk);
            }
            return ret;
        };
    };
};

// @canonical
// const values = mapAsValues (id)
// const valuesIn = mapAsValuesIn (id)

var values = exports.values = function values(o) {
    var ret = [];
    for (var k in o) {
        if (hasOwn.call(o, k)) ret.push(o[k]);
    }return ret;
};

var valuesIn = exports.valuesIn = function valuesIn(o) {
    var ret = [];
    for (var k in o) {
        ret.push(o[k]);
    }return ret;
};

var mapKeys = exports.mapKeys = function mapKeys(f) {
    return function (o) {
        var ret = {};
        for (var k in o) {
            if (hasOwn.call(o, k)) ret[f(k)] = o[k];
        }return ret;
    };
};

var mapKeysWithFilter = function mapKeysWithFilter(p) {
    return function (f) {
        return function (o) {
            var ret = {};
            for (var k in o) {
                if (hasOwn.call(o, k)) {
                    var kk = f(k);
                    if (p(kk)) ret[kk] = o[k];
                }
            }return ret;
        };
    };
};

var mapValues = exports.mapValues = function mapValues(f) {
    return function (o) {
        var ret = {};
        for (var k in o) {
            if (hasOwn.call(o, k)) ret[k] = f(o[k]);
        }return ret;
    };
};

var mapValuesWithFilter = function mapValuesWithFilter(p) {
    return function (f) {
        return function (o) {
            var ret = {};
            for (var k in o) {
                if (hasOwn.call(o, k)) {
                    var vv = f(o[k]);
                    if (p(vv)) ret[k] = vv;
                }
            }return ret;
        };
    };
};

var mapKeysIn = exports.mapKeysIn = function mapKeysIn(f) {
    return function (o) {
        var ret = {};
        for (var k in o) {
            ret[f(k)] = o[k];
        }return ret;
    };
};

var mapKeysInWithFilter = function mapKeysInWithFilter(p) {
    return function (f) {
        return function (o) {
            var ret = {};
            for (var k in o) {
                var kk = f(k);
                if (p(kk)) ret[kk] = o[k];
            }
            return ret;
        };
    };
};

var mapValuesIn = exports.mapValuesIn = function mapValuesIn(f) {
    return function (o) {
        var ret = {};
        for (var k in o) {
            ret[k] = f(o[k]);
        }return ret;
    };
};

var mapValuesInWithFilter = function mapValuesInWithFilter(p) {
    return function (f) {
        return function (o) {
            var ret = {};
            for (var k in o) {
                var vv = f(o[k]);
                if (p(vv)) ret[k] = vv;
            }
            return ret;
        };
    };
};

// --- note: it is up to you to ensure that the resulting keys don't clash
var mapTuples = exports.mapTuples = function mapTuples(f) {
    return function (o) {
        var ret = {};
        for (var k in o) {
            if (hasOwn.call(o, k)) {
                var _f = f([k, o[k]]),
                    _f2 = _slicedToArray(_f, 2),
                    kk = _f2[0],
                    vv = _f2[1];

                ret[kk] = vv;
            }
        }return ret;
    };
};

var mapTuplesWithFilter = function mapTuplesWithFilter(p) {
    return function (f) {
        return function (o) {
            var ret = {};
            for (var k in o) {
                if (hasOwn.call(o, k)) {
                    var kkvv = f([k, o[k]]);
                    if (!p(kkvv)) continue;

                    var _kkvv = _slicedToArray(kkvv, 2),
                        kk = _kkvv[0],
                        vv = _kkvv[1];

                    ret[kk] = vv;
                }
            }return ret;
        };
    };
};

var mapTuplesIn = exports.mapTuplesIn = function mapTuplesIn(f) {
    return function (o) {
        var ret = {};
        for (var k in o) {
            var _f3 = f([k, o[k]]),
                _f4 = _slicedToArray(_f3, 2),
                kk = _f4[0],
                vv = _f4[1];

            ret[kk] = vv;
        }

        return ret;
    };
};

var mapTuplesInWithFilter = function mapTuplesInWithFilter(p) {
    return function (f) {
        return function (o) {
            var ret = {};
            for (var k in o) {
                var kkvv = f([k, o[k]]);
                if (!p(kkvv)) continue;

                var _kkvv2 = _slicedToArray(kkvv, 2),
                    kk = _kkvv2[0],
                    vv = _kkvv2[1];

                ret[kk] = vv;
            }

            return ret;
        };
    };
};

var o = _op(Object.create({ a: 1, b: 2 }), mergeFromM({ c: 3, d: 4 }));

/*
o | mapAsKeysIn (id)
| log
o | valuesIn
| log
o | mapValues (double)
| log
o | mapTuplesIn (([k, v]) => [k + ',', v + 1])
| log
*/

// const betterMap = mapTuples | withFilter (ok)
// o | betterMap (([k, v]) => {
//     const kk = k == 'a' ? null : k
//     return [k + ',', v + 1]
// })

var toUpperCase = dot('toUpperCase');
var ifEqualsD = _op(_op('d', eq), ifPredicate);
var mapper = ifEqualsD(function (_) {
    return null;
})(toUpperCase);

/*
o | (mapAsKeys | withFilter (ok)) (mapper)
| tap (logWith ('ere'))
const reducer = (acc, [k, v]) => {
if (k === 'd') return acc
return [...acc, toUpperCase (k)]
}
o | reduceObj (reducer) ([])
| log
o | eachObj ((...args) => args | logWith ('eachObj'))
o | (eachObj | addIndex) ((...args) => args | logWith ('eachObj'))
o | (eachObj | addCollection) ((...args) => args | logWith ('eachObj'))
10 | ampersand ([double, triple, quadruple]) | log
; [10, 20] | asterisk ([double, triple]) | log
*/