'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mapTuplesIn = exports.mapTuples = exports.mapValuesIn = exports.mapKeysIn = exports.mapValues = exports.mapKeys = exports.valuesIn = exports.values = exports.mapAsValuesIn = exports.mapAsValues = exports.keysIn = exports.keys = exports.mapAsKeysIn = exports.mapAsKeys = exports.withFilter = exports.defaultToV = exports.otherwise = exports.guardV = exports.guard = exports.condPredicate = exports.condElse = exports.F = exports.T = exports.always = undefined;
exports.blush = exports.toThe = exports.moduloWholePart = exports.modulo = exports.divideInto = exports.divideBy = exports.multiply = exports.plus = exports.add = exports.minus = exports.subtractFrom = exports.subtract = exports.bindLateProp = exports.bindLatePropTo = exports.bind = exports.bindTo = exports.bindTry = exports.bindTryTo = exports.bindTryProp = exports.bindTryPropTo = exports.bindProp = exports.bindPropTo = exports.factoryStatics = exports.factory = exports.factoryInit = exports.factoryProps = exports.mixinNM = exports.mixinPreNM = exports.mixinM = exports.mixinPreM = exports.arg6 = exports.arg5 = exports.arg4 = exports.arg3 = exports.arg2 = exports.arg1 = exports.arg0 = exports.flattenPrototype = exports.discardPrototype = exports.ifXReplaceStrFlags = exports.ifXReplaceStr = exports.ifXReplace = exports.ifReplace = exports.xReplaceStrFlags = exports.xReplaceStr = exports.xReplace = exports.xMatchStrFlags = exports.xMatchStr = exports.xMatchGlobal = exports.xMatch = exports.match = exports.xRegExpStr = exports.xRegExpFlags = exports.xRegExp = exports.neuN = exports.neu5 = exports.neu4 = exports.neu3 = exports.neu2 = exports.neu1 = exports.neu = exports.list = exports.compactOk = exports.compact = exports.rangeFrom = exports.rangeTo = exports.rangeToByDesc = exports.rangeToByAsc = exports.rangeToBy = exports.rangeFromByDesc = exports.rangeFromByAsc = exports.rangeFromBy = exports.isInteger = exports.isSymbol = exports.isString = exports.isBoolean = exports.isRegExp = exports.isNumber = exports.isObject = exports.isArray = exports.isFunction = exports.isType = exports.getType = exports.timesSide = exports.timesF = exports.timesV = exports.repeatSide = exports.repeatF = exports.repeatV = exports.zipAll = exports.sprintfN = exports.sprintf1 = exports.flip5 = exports.flip4 = exports.flip3 = exports.flip = exports.passToN = exports.passTo = exports.applyToN = exports.applyTo5 = undefined;
exports.applyTo4 = exports.applyTo3 = exports.applyTo2 = exports.applyTo1 = exports.invoke = exports.provideToN = exports.provideTo5 = exports.provideTo4 = exports.provideTo3 = exports.provideTo2 = exports.provideTo1 = exports.provideTo = exports.callOnN = exports.callOn5 = exports.callOn4 = exports.callOn3 = exports.callOn2 = exports.callOn1 = exports.callOn = exports.letS = exports.lets = exports.letN = exports.lets6 = exports.lets5 = exports.lets4 = exports.lets3 = exports.lets2 = exports.lets1 = exports.letNV = exports.letV = exports.asteriskN = exports.asterisk5 = exports.asterisk4 = exports.asterisk3 = exports.asterisk2 = exports.asterisk1 = exports.ampersandN = exports.reduceObjIn = exports.reduceObj = exports.eachObjIn = exports.eachObj = exports.addCollection = exports.addIndex = exports.tail = exports.head = exports.last = exports.reduceAbort = exports.contains = exports.find = exports.reject = exports.filter = exports.reduce = exports.each = exports.map = exports.mergeAllIn = exports.mergeWith = exports.mergeWhen = exports.mergeInSym = exports.mergeInMSym = exports.mergeInToSym = exports.mergeInToMSym = exports.mergeSym = exports.mergeMSym = exports.mergeToSym = exports.mergeToMSym = exports.mergeInTo = exports.mergeIn = exports.mergeInM = exports.mergeInToM = exports.mergeToM = exports.mergeM = exports.merge = exports.mergeTo = exports.concatM = exports.concatToM = exports.precat = exports.precatTo = exports.concat = exports.concatTo = exports.prependToM = exports.prependM = exports.prepend = exports.prependTo = exports.appendToM = exports.appendM = exports.appendTo = exports.append = exports.updatePath = exports.updatePathM = exports.update = exports.updateM = exports.assocPathM = exports.assocPath = exports.assocM = exports.assoc = exports.path = exports.propOf = exports.prop = exports.hasIn = exports.has = undefined;
exports.join = exports.split = exports.defaultTo__ = exports.defaultTo = exports.cascade = exports.die = exports.decorateException = exports.raise = exports.exception = exports.tryCatch = exports.tryCatch__ = exports.condS = exports.condN = exports.cond = exports.ifBind__ = exports.ifHasIn__ = exports.ifHas__ = exports.ifFunction__ = exports.ifNo__ = exports.ifYes__ = exports.ifFalse__ = exports.ifTrue__ = exports.ifNotOk__ = exports.ifOk__ = exports.ifPredicate__ = exports.whenBind = exports.ifBind = exports.whenHasIn = exports.ifHasIn = exports.whenHas = exports.ifHas = exports.whenFalsy = exports.ifFalsy = exports.whenTruthy = exports.ifTruthy = exports.whenNo = exports.ifNo = exports.whenYes = exports.ifYes = exports.whenFalse = exports.ifFalse = exports.whenTrue = exports.ifTrue = exports.whenNotOk = exports.ifNotOk = exports.whenOk = exports.ifOk = exports.whenPredicateOk = exports.ifPredicateOk = exports.whenPredicate = exports.ifPredicate = exports.isFalsy = exports.isTruthy = exports.isNo = exports.isYes = exports.isFalse = exports.isTrue = exports.sideN = exports.side5 = exports.side4 = exports.side3 = exports.side2 = exports.side1 = exports.side = exports.dotN = exports.dot5 = exports.dot4 = exports.dot3 = exports.dot2 = exports.dot1 = exports.dot = exports.tap = exports.id = exports.lte = exports.lt = exports.gte = exports.gt = exports.ne = exports.eq = exports.notOk = exports.ok = exports.not = exports.noop = exports.recurry = exports.roll = exports.bitwiseRightZeroFillBy = exports.bitwiseRightBy = exports.bitwiseLeftBy = exports.bitwiseRightZeroFill = exports.bitwiseRight = exports.bitwiseLeft = exports.bitwiseNot = exports.bitwiseXor = exports.bitwiseOr = exports.bitwiseAnd = exports.composeAsMethods = exports.composeAsMethodsRight = exports.compose = exports.composeRight = exports.pipe = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _operator = require('./operator');

var _manual = require('./manual');

var _manual2 = _interopRequireDefault(_manual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _op = function _op() {
    return pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
    return compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
    return composeRight.apply(undefined, arguments);
};

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

// --- @experimental
var composeAsMethodsRight = exports.composeAsMethodsRight = function composeAsMethodsRight(b, a) {
    return a.compose(b);
};
var composeAsMethods = exports.composeAsMethods = function composeAsMethods(a, b) {
    return a.compose(b);
};

// import { doe, } from './monad'

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
var _ref = {},
    hasOwn = _ref.hasOwnProperty,
    oStr = _ref.toString;

// --- takes a manually curried function like
// f = a => b => ... => z => { body }
// and returns a new function g which can be called as:
// g (a, b, ..., z)
//
// g is curried, but only allows the manual calling style.
//
// g does not have a well-defined arity.
//
// Consider using R.uncurryN if this latter is a problem. The resulting function will still be curried, despite the name.

var roll = exports.roll = _manual2.default.roll;

// --- takes a manually curried function and allows it to be called using either of the two calling
// styles.
// --- `recurry` itself must be called using the manual style.
// --- as with `roll`, the recurried function does not have a well-defined arity.

// const r = (a => b => c => a * b * c) | recurry
// r (1, 2, 3) = roll (orig) (1, 2, 3)
// r (1, 2)    = roll (orig) (1, 2)
// r (1) = roll (orig) (1)
// r (1) (2) (3)
// r ()

// --- it does work to recurry `recurry` using itself, in order to allow both calling styles, but
// will probably cause a performance hit.
// const _recurry = manual.recurry (2) (manual.recurry)

var recurry = exports.recurry = _manual2.default.recurry;

var _recurry = recurry;

var noop = exports.noop = function noop() {};
var not = exports.not = function not(x) {
    return !x;
};

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

var id = exports.id = function id(x) {
    return x;
};
var tap = exports.tap = _recurry(2)(_manual2.default.tap);

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
//  should ifNotPredicate match falsy or false? If falsy, it breaks symmetry with ifPredicate; if
// false, it behaves differently than ifPredicate (pred >> not), which is also confusing.
//

var isTrue = exports.isTrue = _op(true, eq);
var isFalse = exports.isFalse = _op(false, eq); // --- exactly false.
var isYes = exports.isYes = Boolean;
var isNo = exports.isNo = _op3(isYes, not);
var isTruthy = exports.isTruthy = isYes;
var isFalsy = exports.isFalsy = isNo;

var ifPredicate = exports.ifPredicate = _recurry(4)(_manual2.default.ifPredicate);
var whenPredicate = exports.whenPredicate = _recurry(3)(_manual2.default.whenPredicate);
var ifPredicateOk = exports.ifPredicateOk = _recurry(4)(_manual2.default.ifPredicateOk);
var whenPredicateOk = exports.whenPredicateOk = _recurry(2)(_manual2.default.whenPredicateOk);

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
var ifFalsy = exports.ifFalsy = ifNo;
var whenFalsy = exports.whenFalsy = whenNo;

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
// /---

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
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
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
    for (var _len2 = arguments.length, fxs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        fxs[_key2 - 1] = arguments[_key2];
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

// ------ objects.

// xxx @test
var has = exports.has = _recurry(2)(_manual2.default.has);
var hasIn = exports.hasIn = _recurry(2)(_manual2.default.hasIn);

var prop = exports.prop = _recurry(2)(_manual2.default.prop);
// xxx @test
var propOf = exports.propOf = _recurry(2)(_manual2.default.propOf);

// --- only traverses "typeof = 'object'" nodes; thinks like Date result in undefined.
var path = exports.path = _recurry(2)(_manual2.default.path);
var assoc = exports.assoc = _recurry(3)(_manual2.default.assoc);
var assocM = exports.assocM = _recurry(3)(_manual2.default.assocM);
var assocPath = exports.assocPath = _recurry(3)(_manual2.default.assocPath);
var assocPathM = exports.assocPathM = _recurry(3)(_manual2.default.assocPathM);

var updateM = exports.updateM = _recurry(3)(_manual2.default.updateM);
var update = exports.update = _recurry(3)(_manual2.default.update);
var updatePathM = exports.updatePathM = _recurry(3)(_manual2.default.updatePathM);
var updatePath = exports.updatePath = _recurry(3)(_manual2.default.updatePath);

// --- xxx
// // --- finds truthy and returns the *value*.
// const findValue = (f) => (xs) => {
//   let v
//   for (const i of xs) if (v = f (i)) return v
// }

// ------ append.

// --- 4 | appendTo ([1, 2, 3])
// --- ([1, 2, 3]) | append (4)

var append = exports.append = _recurry(2)(_manual2.default.append);
var appendTo = exports.appendTo = _recurry(2)(_manual2.default.appendTo);
var appendM = exports.appendM = _recurry(2)(_manual2.default.appendM);
var appendToM = exports.appendToM = _recurry(2)(_manual2.default.appendToM);

// ------ prepend.

// --- 1 | prependTo ([2, 3, 4])
// --- ([2, 3, 4]) | prepend (1)
var prependTo = exports.prependTo = _recurry(2)(_manual2.default.prependTo);
var prepend = exports.prepend = _recurry(2)(_manual2.default.prepend);
var prependM = exports.prependM = _recurry(2)(_manual2.default.prependM);
var prependToM = exports.prependToM = _recurry(2)(_manual2.default.prependToM);

// --- arrays or strings
// --- ramda's concat does more type checking and also allows fantasy land semigroups.
// --- [4] | concatTo ([1, 2, 3])
// --- [1, 2, 3] | concat ([4])
// --- [1, 2, 3] | concat ([4])
var concatTo = exports.concatTo = _recurry(2)(_manual2.default.concatTo);
var concat = exports.concat = _recurry(2)(_manual2.default.concat);
var precatTo = exports.precatTo = concat;
var precat = exports.precat = concatTo;

// --- only arrays (strings will throw)
var concatToM = exports.concatToM = _recurry(2)(_manual2.default.concatToM);
var concatM = exports.concatM = _recurry(2)(_manual2.default.concatM);

// --- own properties, including null/undefined.
// --- 2x faster than Object.assign.
// --- @todo: why is it so much faster?
// --- reminder: Object.assign and {...} only take own values.

// --- { b: 2 } | mergeTo ({ a: 1, b: null })
// --- ({ a: 1, b: null }) | merge ({ b: 2 })
// --- ({ a: 1, b: null }) | merge     ({ b: 2 })

// ---- these are the eight basis functions.
// they are not composed using our 'decorator' pattern, and the implementation is as fast (and ugly)
// possible.
var mergeTo = exports.mergeTo = _recurry(2)(_manual2.default.mergeTo);
var merge = exports.merge = _recurry(2)(_manual2.default.merge);

var mergeM = exports.mergeM = _recurry(2)(_manual2.default.mergeM);
var mergeToM = exports.mergeToM = _recurry(2)(_manual2.default.mergeToM);

// --- all enumerable properties (non-own and own) on the src will be copied to the tgt.
var mergeInToM = exports.mergeInToM = _recurry(2)(_manual2.default.mergeInToM);
var mergeInM = exports.mergeInM = _recurry(2)(_manual2.default.mergeInM);
// /---

// --- all enumerable properties (non-own and own) on both the src and tgt will be copied to the new
// object.
var mergeIn = exports.mergeIn = _recurry(2)(_manual2.default.mergeIn);
var mergeInTo = exports.mergeInTo = _recurry(2)(_manual2.default.mergeInTo);
// /---

// /---- basis


// --- xxx adding a property to a function can lead to gotchas.
// use symbols.


var mergeToMSym = exports.mergeToMSym = Symbol('mergeToM');
var mergeToSym = exports.mergeToSym = Symbol('mergeTo');
var mergeMSym = exports.mergeMSym = Symbol('mergeM');
var mergeSym = exports.mergeSym = Symbol('merge');
var mergeInToMSym = exports.mergeInToMSym = Symbol('mergeInToM');
var mergeInToSym = exports.mergeInToSym = Symbol('mergeInTo');
var mergeInMSym = exports.mergeInMSym = Symbol('mergeInM');
var mergeInSym = exports.mergeInSym = Symbol('mergeIn');

// --- 'when' forms run the predicate on both the src and tgt, testing for truthiness.
var mergeWhen = exports.mergeWhen = _recurry(3)(_manual2.default.mergeWhen);

// --- the 'own'-ness ('in') of the merge function will take effect on both tgt & src
// -- not possible to mix and match.
var mergeWith = exports.mergeWith = _recurry(4)(_manual2.default.mergeWith);

// --- like R.mergeAll but also use prototype vals.
// --- to and from not applicable, also not curried or meant to be used piped.
var mergeAllIn = exports.mergeAllIn = function mergeAllIn(xs) {
    return xs.reduce(function (tgt, src) {
        return mergeInToM(tgt)(src);
    }, {});
};

// ------ map.

// --- simple dispatches to Array.prototype functions, but capped.

var map = exports.map = _recurry(2)(_manual2.default.map);
var each = exports.each = _recurry(2)(_manual2.default.each);

var reduce = exports.reduce = _recurry(2)(_manual2.default.reduce);
var filter = exports.filter = _recurry(2)(_manual2.default.filter);
var reject = exports.reject = _recurry(2)(_manual2.default.reject);
var find = exports.find = _recurry(2)(_manual2.default.find);
var contains = exports.contains = _recurry(2)(_manual2.default.contains);

var reduceAbort = exports.reduceAbort = _recurry(4)(_manual2.default.reduceAbort);

// @test
// export const both   = _recurry (3) (manual.both)
// export const either = _recurry (3) (manual.either)
// export const allN   = _recurry (2) (manual.allN  )
// export const anyN   = _recurry (2) (manual.anyN  )

// --- undef on empty array, like ramda
var last = exports.last = function last(xs) {
    return xs[xs.length - 1];
};
// @test
// --- undef on empty array, like ramda
var head = exports.head = function head(xs) {
    return xs[0];
};
// @test
var tail = exports.tail = function tail(xs) {
    return xs.slice(1);
};

var addIndex = exports.addIndex = _recurry(3)(_manual2.default.addIndex);
var addCollection = exports.addCollection = _recurry(3)(_manual2.default.addCollection);

/*
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
const ifArray = (...args) => ifPredicate (isArray) (...args)
// @todo
export const mapPairs = curry ((f, obj) =>
obj | ifArray (
    splitEvery (2)
    >> map (([k, v]) => f (k, v))
    >> fromPairs,
     toPairs
    >> map (([k, v]) => f (k, v))
    >> fromPairs,
)
)
// --- doesn't take array, only obj.
export const mapPairsIn = curry ((f, obj) => obj
| toPairsIn
| map (([k, v]) => f (k, v))
| fromPairs,
)
*/

var eachObj = exports.eachObj = _recurry(2)(_manual2.default.eachObj);
var eachObjIn = exports.eachObjIn = _recurry(2)(_manual2.default.eachObjIn);

var reduceObj = exports.reduceObj = _recurry(3)(_manual2.default.reduceObj);
var reduceObjIn = exports.reduceObjIn = _recurry(3)(_manual2.default.reduceObjIn);

// fs `ampersand` x = map map' fs where map' f = f x
var ampersandN = exports.ampersandN = _recurry(2)(_manual2.default.ampersandN);

var asterisk1 = exports.asterisk1 = _recurry(2)(_manual2.default.asterisk1);
var asterisk2 = exports.asterisk2 = _recurry(4)(_manual2.default.asterisk2);
var asterisk3 = exports.asterisk3 = _recurry(6)(_manual2.default.asterisk3);
var asterisk4 = exports.asterisk4 = _recurry(8)(_manual2.default.asterisk4);
var asterisk5 = exports.asterisk5 = _recurry(10)(_manual2.default.asterisk5);
var asteriskN = exports.asteriskN = _recurry(2)(_manual2.default.asteriskN);

// --------- lets / let

/*
 * lets = let* from racket
 * letN = let* + array
 * letS = let* + stick (implies N)
 * lets1, lets2, etc.: wrapped by lets, but can be called directly too.
 * letNV = like letV, with array
 * letV = let with values instead of functions
 */

// --- last arg must be a function.
// 1 arg is possible but trivial.
var letV = exports.letV = function letV() {
    for (var _len3 = arguments.length, xs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        xs[_key3] = arguments[_key3];
    }

    var f = xs.pop();
    return letNV(xs, f);
};

/*
 * For example, our `defaultTo` takes a function:
 * null | defaultTo (_ -> 'bad news')
 * For simple values, defaultToV can be more convenient:
 * null | defaultToV ('bad news')
*/

var letNV = exports.letNV = _recurry(2)(_manual2.default.letNV);

// --- trivial form.
var lets1 = exports.lets1 = function lets1(f) {
    return invoke(f);
};

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

var letN = exports.letN = function letN(xs) {
    return lets.apply(undefined, _toConsumableArray(xs));
};

// --- throws an error if more than 6 arguments are given.
// --- this ought to be enough for normal usage.
// --- there is a generic functional form (see canonical.js), but it depends on mapAccum, for which
// we depend on Ramda.
var lets = exports.lets = function lets() {
    if (arguments.length === 1) return lets1.apply(undefined, arguments);
    if (arguments.length === 2) return lets2.apply(undefined, arguments);
    if (arguments.length === 3) return lets3.apply(undefined, arguments);
    if (arguments.length === 4) return lets4.apply(undefined, arguments);
    if (arguments.length === 5) return lets5.apply(undefined, arguments);
    if (arguments.length === 6) return lets6.apply(undefined, arguments);
    throw new Error('lets: too many arguments (max = 6)');
};

var letS = exports.letS = _recurry(2)(_manual2.default.letS);

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

// --- passTo is not called apply ...
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
    for (var _len4 = arguments.length, xss = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        xss[_key4] = arguments[_key4];
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

// ------ types.

var getType = exports.getType = function getType(x) {
    return oStr.call(x).slice(8, -1);
};
var isType = exports.isType = _recurry(2)(_manual2.default.isType);

var isFunction = exports.isFunction = isType('Function');
var isArray = exports.isArray = isType('Array');
var isObject = exports.isObject = isType('Object');
var isNumber = exports.isNumber = isType('Number');
var isRegExp = exports.isRegExp = isType('RegExp');
var isBoolean = exports.isBoolean = isType('Boolean');
var isString = exports.isString = isType('String');
var isSymbol = exports.isSymbol = isType('Symbol');

// --- assumed to be a Number.
var isInteger = exports.isInteger = function isInteger(x) {
    return x === Math.floor(x);
};

// --- excl, so it's like ramda.
// --- note that `by` should be negative to count down.

var rangeFromBy = exports.rangeFromBy = _recurry(3)(_manual2.default.rangeFromBy);
var rangeFromByAsc = exports.rangeFromByAsc = _recurry(3)(_manual2.default.rangeFromByAsc);
var rangeFromByDesc = exports.rangeFromByDesc = _recurry(3)(_manual2.default.rangeFromByDesc);
var rangeToBy = exports.rangeToBy = _recurry(3)(_manual2.default.rangeToBy);
var rangeToByAsc = exports.rangeToByAsc = _recurry(3)(_manual2.default.rangeToByAsc);
var rangeToByDesc = exports.rangeToByDesc = _recurry(3)(_manual2.default.rangeToByDesc);

var rangeTo = exports.rangeTo = rangeToBy(1);
var rangeFrom = exports.rangeFrom = rangeFromBy(1);

var compact = exports.compact = filter(Boolean);
var compactOk = exports.compactOk = reject(notOk);

// --- turn positional args into a list with those values.
var list = exports.list = function list() {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
    }

    return args;
};

// --------- new.

var neu = exports.neu = function neu(x) {
    return new x();
};
var neu1 = exports.neu1 = _recurry(2)(_manual2.default.neu1);
var neu2 = exports.neu2 = _recurry(3)(_manual2.default.neu2);
var neu3 = exports.neu3 = _recurry(4)(_manual2.default.neu3);
var neu4 = exports.neu4 = _recurry(5)(_manual2.default.neu4);
var neu5 = exports.neu5 = _recurry(6)(_manual2.default.neu5);
var neuN = exports.neuN = _recurry(2)(_manual2.default.neuN);

// --------- regex.

// --- these deviate somewhat from the naming conventions: we're assuming you generally want to pipe
// the target to the match functions.

var removeSpaces = dot2('replace')(/\s+/g)('');

// --- input: regex.
var xRegExp = exports.xRegExp = function xRegExp(re) {
    return new RegExp(_op(re.source, removeSpaces), re.flags);
};

// --- beware, overwrites any flags that the re already had.
var xRegExpFlags = exports.xRegExpFlags = function xRegExpFlags(re, flags) {
    return new RegExp(_op(re.source, removeSpaces), flags);
};

// --- input: string, [string].
var xRegExpStr = exports.xRegExpStr = function xRegExpStr(reStr) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return lets(function (_) {
        return _op(reStr, removeSpaces);
    }, function (_) {
        return flags;
    }, neu2(RegExp));
};

var match = exports.match = _recurry(2)(_manual2.default.match);

// --- not every function (currently) has a matching 'replace' version.

// @todo make xMatch incur only a compile-time cost.

// --- input: regex.
var xMatch = exports.xMatch = _recurry(2)(_manual2.default.xMatch);
var xMatchGlobal = exports.xMatchGlobal = _recurry(3)(_manual2.default.xMatchGlobal);
// --- input: string.
var xMatchStr = exports.xMatchStr = _recurry(2)(_manual2.default.xMatchStr);
// --- input: string, string.
var xMatchStrFlags = exports.xMatchStrFlags = _recurry(3)(_manual2.default.xMatchStrFlags);
var xReplace = exports.xReplace = _recurry(3)(_manual2.default.xReplace);
var xReplaceStr = exports.xReplaceStr = _recurry(3)(_manual2.default.xReplaceStr);
var xReplaceStrFlags = exports.xReplaceStrFlags = _recurry(4)(_manual2.default.xReplaceStrFlags);

var ifReplace = exports.ifReplace = _recurry(5)(_manual2.default.ifReplace);
var ifXReplace = exports.ifXReplace = _recurry(5)(_manual2.default.ifXReplace);
var ifXReplaceStr = exports.ifXReplaceStr = _recurry(5)(_manual2.default.ifXReplaceStr);
var ifXReplaceStrFlags = exports.ifXReplaceStrFlags = _recurry(6)(_manual2.default.ifXReplaceStrFlags);

// --- returns a copy with prototype vals discarded.
var discardPrototype = exports.discardPrototype = function discardPrototype(o) {
    return Object.assign({}, o);
};

// --- returns a copy with prototype vals surfaced.
var flattenPrototype = exports.flattenPrototype = mergeInToM({});

// xxx reduceRight

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

// --- usage:
// const dogProto = {
//     // --- you almost always need an `init`. The pattern 'Dog.create ().init ()' should become
//     really familiar.
//     init () { },
//     speak () { return this.loud ? 'WOOF' : 'woof' },
// }
// const dogProps = {
//     loud: undefined,
//     ...
// }
// const Dog = dogProto | factory | factoryProps (dogProps)
//
// or
//
// const dogFactory = factory >> factoryProps (dogProps)
// const Dog = dogProto | dogFactory
//
// const dog = Dog.create ({ loud: true, })
// dog.speak () // WOOF
//
// The props object is where you put your properties. It is optional -- just leave off the
// `factoryProps` part if you don't want it and everything will still work. But it is recommended as a good place to document the properties. (You're
// not putting your properties in the prototype, are you?) Do use `undefined`, not `false` or
// `null`. Use `void 8` or your very own favorite number to impress ... no one.

var mixinPreM = exports.mixinPreM = _recurry(2)(_manual2.default.mixinPreM);
var mixinM = exports.mixinM = _recurry(2)(_manual2.default.mixinM);
var mixinPreNM = exports.mixinPreNM = _recurry(2)(_manual2.default.mixinPreNM);
var mixinNM = exports.mixinNM = _recurry(2)(_manual2.default.mixinNM);

var factoryProps = exports.factoryProps = _recurry(2)(_manual2.default.factoryProps);
var factoryInit = exports.factoryInit = _recurry(2)(_manual2.default.factoryInit);

var factory = exports.factory = factoryInit(function (o, props) {
    if (props == null) return;
    for (var i in props) {
        if (hasOwn.call(props, i)) o[i] = props[i];
    }
});

// --- to use mixins:
// Imagine some orthogonal functionality, e.g:
// const cheaterProto = {
//     cheat: howMuch => 'I cheat ' + howMuch,
// }
//
// (an arrow function is fine here, because we're not referring to other methods or properties or
// mentioning `this`.
// Properties would be a bit unusual, but not impossible. All methods are callable, including those
// of other mixins and those of the dog.)
//
// const Dog = dogProto | mixinM (cheaterProto) | factory
// const dog = Dog.create ()
// dog.cheat ()
// dog.speak ()
//
// The tricky thing with mixins is the inevitable name clashes. To deal with this we offer 'pre'
// mixins and 'post' mixins. The `mixinM` function above is for 'post' mixins: the mixin will be
// copied into the prototype. If a key exists, it will be overwritten, unless the corresponding
// value from the mixin is nil. You can use `mixinPreM` for 'pre' mixins: the mixin values will be
// copied into the prototype, but they won't overwrite existing keys unless the prototype value
// corresponding to that key is nil.
//
// --- we do not provide non-M versions of the mixin functions.
//     the reason is that it would result in flattening the prototype the way all other objects are
//     flattened when using them immutably, which might be confusing.
// --- if it really is what you want, just do it yourself before passing it to the mixin functions:
//     const flattened = proto | flattenPrototype | mixin ...
// --- if you do not want your prototype altered, and also don't want to flatten it, just do
//     Object.create first:
//     const cloned = proto | Object.create | mixin ...
//
// There are also 'N' versions, which take arrays: `mixinNM` and `mixinPreNM`.


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
//
// If for some reason you need access to your newly minted object before `create` is called, you can
// use `factoryInit` instead of `factory`. This is how `factoryProps` is implemented internally.

var factoryStatics = exports.factoryStatics = mergeM;

// ------ bind

// 'log'   | bindPropTo (console)
// console | bindProp   ('log')

// --- dies if o[prop] is not a function.
var bindPropTo = exports.bindPropTo = _recurry(2)(_manual2.default.bindPropTo);
var bindProp = exports.bindProp = _recurry(2)(_manual2.default.bindProp);

var bindTryPropTo = exports.bindTryPropTo = _recurry(2)(_manual2.default.bindTryPropTo);
var bindTryProp = exports.bindTryProp = _recurry(2)(_manual2.default.bindTryProp);
var bindTryTo = exports.bindTryTo = _recurry(2)(_manual2.default.bindTryTo);
var bindTry = exports.bindTry = _recurry(2)(_manual2.default.bindTry);

// console.log | bindTo (console)
// console     | bind   (console.log)

var bindTo = exports.bindTo = _recurry(2)(_manual2.default.bindTo);
var bind = exports.bind = _recurry(2)(_manual2.default.bind);

// --- returns a thunk representing the bind:
//     doesn't actually try to bind until that function is invoked.
var bindLatePropTo = exports.bindLatePropTo = _recurry(2)(_manual2.default.bindLatePropTo);
var bindLateProp = exports.bindLateProp = _recurry(2)(_manual2.default.bindLateProp);

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

var blush = exports.blush = function blush(x) {
    return function (_) {
        return x;
    };
};
var always = exports.always = blush;

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

var defaultToV = exports.defaultToV = _op3(blush, defaultTo);

// a map results in a collection of the same shape: list to list, object to object.
// the modifier As means the shape will change.

// filter: truthy, like JS filter & R filter
// map + filter could also be done with reduceObj, of course.
// filter applies to the mapped value.

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

// --- note: in all functions which map keys or tuples, it's up to you to ensure that the keys don't
// clash.
// clashing keys will lead to unpredictable behavior between runtimes.

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

exports.default = {
    mergeToM: mergeToM, mergeM: mergeM,
    mergeTo: mergeTo, merge: merge,
    mergeInToM: mergeInToM, mergeInM: mergeInM,
    mergeInTo: mergeInTo, mergeIn: mergeIn
};