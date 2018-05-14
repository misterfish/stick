'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultToA = exports.divideBy = exports.notOk = exports.ne = exports.eq = exports.lte = exports.lt = exports.gte = exports.gt = exports.ifEquals__ = exports.whenEquals = exports.ifEquals = exports.otherwise = exports.guardA = exports.guard = exports.blush = exports.condPredicate = exports.condEquals = exports.condElse = exports.laatsO = exports.laatO = exports.plus = exports.minus = exports.subtractFrom = exports.mapAccumX = exports.mapX = exports.isInteger = exports.isFunction = exports.isArray = exports.isType = exports.factoryMixinPost = exports.factoryMixinPre = exports.factoryStatics = exports.factory = exports.factoryInit = exports.factoryProps = exports.factoryMixins = exports.arg10 = exports.arg9 = exports.arg8 = exports.arg7 = exports.arg6 = undefined;
exports.arg5 = exports.arg4 = exports.arg3 = exports.arg2 = exports.arg1 = exports.arg0 = exports.flattenPrototype = exports.discardPrototype = exports.ifXReplaceStrFlags = exports.ifXReplaceStr = exports.ifXReplace = exports.ifReplace = exports.xReplaceStrFlags = exports.xReplaceStr = exports.xReplace = exports.xMatchStrFlags = exports.xMatchStr = exports.xMatch = exports.xMatchGlobal = exports.match = exports.xRegExpStr = exports.xRegExpFlags = exports.xRegExp = exports.nieuwN = exports.nieuw3 = exports.nieuw2 = exports.nieuw1 = exports.nieuw = exports.joinOk = exports.list = exports.compactOk = exports.compact = exports.rangeBy = exports.times = exports.repeat = exports.zipAll = exports.noop = exports.sprintfN = exports.sprintf1 = exports.flipC = exports.passN = exports.passToN = exports.pass3 = exports.pass2 = exports.pass1 = exports.passTo3 = exports.passTo2 = exports.passTo1 = exports.applyN = exports.apply3 = exports.apply2 = exports.apply1 = exports.applyToN = exports.applyTo3 = exports.applyTo2 = exports.applyTo1 = exports.invoke = exports.callUnder2 = exports.callUnder1 = exports.callUnder = exports.callN = exports.call3 = exports.call2 = exports.call1 = exports.call = exports.callOnN = exports.callOn3 = exports.callOn2 = exports.callOn1 = exports.callOn = exports.lets = exports.laats = exports.laats6 = exports.laats5 = exports.laats4 = exports.laats3 = exports.laats2 = exports.given = exports.laat = exports.scalarPass = exports.scalarApply = exports.passScalar = exports.applyScalarIfOk = exports.applyScalar = exports.eachObjIn = exports.mapPairsIn = exports.mapPairs = exports.mergeAllIn = exports.mergeFromInM = exports.mergeToInM = exports.mergeFromIn = exports.mergeToIn = exports.injectFromM = exports.injectToM = exports.mergeFromWhenOkM = exports.mergeToWhenOkM = exports.mergeFromWithM = exports.mergeToWithM = exports.mergeFromM = exports.mergeToM = undefined;
exports.mergeFrom = exports.mergeTo = exports.concatFromM = exports.concatToM = exports.concatFrom = exports.concatTo = exports.prependToM = exports.prependFromM = exports.prependFrom = exports.prependTo = exports.appendFromM = exports.appendToM = exports.appendTo = exports.appendFrom = exports.assocM = exports.defaultTo__ = exports.defaultTo = exports.bindLate = exports.bindTry = exports.bind = exports.cascade = exports.ifPredicate__ = exports.whenPredicate = exports.ifPredicate = exports.ifEmpty__ = exports.whenEmpty = exports.ifEmpty = exports.ifOne__ = exports.whenOne = exports.ifOne = exports.ifZero__ = exports.whenZero = exports.ifZero = exports.ifArray = exports.decorateException = exports.die = exports.raise = exports.exception = exports.tryCatch__ = exports.tryCatch = exports.cond = exports.condO = exports.condo = exports.ifBind__ = exports.whenBind = exports.ifBind = exports.ifHasIn__ = exports.whenHasIn = exports.ifHasIn = exports.ifHas__ = exports.whenHas = exports.ifHas = exports.ifFunction__ = exports.whenFunction = exports.ifFunction = exports.ifNo__ = exports.whenNo = exports.ifNo = exports.ifYes__ = exports.whenYes = exports.ifYes = exports.ifFalse__ = exports.whenFalse = exports.ifFalse = exports.ifTrue__ = exports.whenTrue = exports.ifTrue = exports.ifNotOk__ = exports.whenNotOk = exports.ifNotOk = exports.ifOk__ = exports.whenOk = exports.ifOk = exports.sideN = exports.side5 = exports.side4 = exports.side3 = exports.side2 = exports.side1 = exports.side = exports.dotN = exports.dot6 = exports.dot5 = exports.dot4 = exports.dot3 = exports.dot2 = exports.dot1 = exports.dot = exports.ok = exports.doe = exports.bitwiseRightZeroFillBy = exports.bitwiseRightBy = exports.bitwiseLeftBy = exports.bitwiseRightZeroFill = exports.bitwiseRight = exports.bitwiseLeft = exports.bitwiseNot = exports.bitwiseXor = exports.bitwiseOr = exports.bitwiseAnd = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ramda = require('ramda');

var _sprintf = require('sprintf');

var _sprintf2 = _interopRequireDefault(_sprintf);

var _operator = require('./operator');

var _monad = require('./monad');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// ramda map works on objs: keys same, values altered.
// could make an object mapper which lets you return pairs.
//
// Object.assign and {...} drop proto vals.

// [1 2 3] -> [4 5 6] -> [1 2 3 [4 5 6]]
// [] -> a -> []

// the preposition refers to the identifier following.
//
// functions with an On ending are aliased to a version without it:
// call = callOn
// bind = bindOn
//
// functions with To and From endings have no aliases.

var _op = function _op(a, b) {
    return b(a);
};

var _op2 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(b, a);
});

var _op3 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(a, b);
});

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

var ok = exports.ok = function ok(x) {
    return !(0, _ramda.isNil)(x);
};

var dot = exports.dot = (0, _ramda.curry)(function (prop, o) {
    return o[prop]();
});
var dot1 = exports.dot1 = (0, _ramda.curry)(function (prop, val, o) {
    return o[prop](val);
});
var dot2 = exports.dot2 = (0, _ramda.curry)(function (prop, val1, val2, o) {
    return o[prop](val1, val2);
});
var dot3 = exports.dot3 = (0, _ramda.curry)(function (prop, val1, val2, val3, o) {
    return o[prop](val1, val2, val3);
});
var dot4 = exports.dot4 = (0, _ramda.curry)(function (prop, val1, val2, val3, val4, o) {
    return o[prop](val1, val2, val3, val4);
});
var dot5 = exports.dot5 = (0, _ramda.curry)(function (prop, val1, val2, val3, val4, val5, o) {
    return o[prop](val1, val2, val3, val4, val5);
});
var dot6 = exports.dot6 = (0, _ramda.curry)(function (prop, val1, val2, val3, val4, val5, val6, o) {
    return o[prop](val1, val2, val3, val4, val5, val6);
});
var dotN = exports.dotN = (0, _ramda.curry)(function (prop, vs, o) {
    return o[prop].apply(o, _toConsumableArray(vs));
});

var side = exports.side = function side(prop) {
    return (0, _ramda.tap)(dot(prop));
};
var side1 = exports.side1 = (0, _ramda.curry)(function (prop, val) {
    return (0, _ramda.tap)(dot1(prop)(val));
});
var side2 = exports.side2 = (0, _ramda.curry)(function (prop, val1, val2) {
    return (0, _ramda.tap)(dot2(prop)(val1)(val2));
});
var side3 = exports.side3 = (0, _ramda.curry)(function (prop, val1, val2, val3) {
    return (0, _ramda.tap)(dot3(prop)(val1)(val2)(val3));
});
var side4 = exports.side4 = (0, _ramda.curry)(function (prop, val1, val2, val3, val4) {
    return (0, _ramda.tap)(dot4(prop)(val1)(val2)(val3)(val4));
});
var side5 = exports.side5 = (0, _ramda.curry)(function (prop, val1, val2, val3, val4, val5) {
    return (0, _ramda.tap)(dot5(prop)(val1)(val2)(val3)(val4)(val5));
});
var sideN = exports.sideN = (0, _ramda.curry)(function (prop, vs) {
    return (0, _ramda.tap)(dotN(prop)(vs));
});

// deprecated
// export const dotM = dot
// export const dot1M = dot1
// export const dot2M = dot2
// export const dot3M = dot3
// export const dotNM = dotN
// export const dot4M = dot3

// __ = not data-last, not curried

// ------ deps: noop, isFunction, ok

// ------ useless, same as ifYes.
// --- strict evaluation of cond.
// --- not anaphoric unless param is baked into yes or no.
// --- doesn't seem useful to pass anything into the yes and no functions.
// --- for anaphoric, see cond.

// @todo need something like
// when (isTTY, stdin => ...)
// stdin | whenPredicate (isTTY, stdin => ...)
//
// doesn't work
// stdin.setRawMode | whenFunction (applyTo1 (bool))
// stdin.bindTry ('setRawMode') | whenFunction (applyTo1 (bool))
// --- this is horrible.
// bool => tap (stdin => 'setRawMode' | bindTry (stdin) | whenFunction (applyTo1 (bool))),
// @todo whenBind? whenCan?

//@todo export const ifNotOk = curry ((f, x) => ok (x) ? void 8 : f (x))

var ifOk = exports.ifOk = (0, _ramda.curry)(function (yes, no, x) {
    return ok(x) ? yes(x) : no(x);
});
var whenOk = exports.whenOk = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifOk(yes)(noop));
});
var ifOk__ = exports.ifOk__ = function ifOk__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifOk(yes)(no));
};

// @todo
var ifNotOk = exports.ifNotOk = (0, _ramda.curry)(function (yes, no, x) {
    return (0, _ramda.isNil)(x) ? yes(x) : no(x);
});
var whenNotOk = exports.whenNotOk = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifNotOk(yes)(noop));
});
var ifNotOk__ = exports.ifNotOk__ = function ifNotOk__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifNotOk(yes)(no));
};

var ifTrue = exports.ifTrue = (0, _ramda.curry)(function (yes, no, x) {
    return x === true ? yes(x) : no(x);
});
var whenTrue = exports.whenTrue = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifTrue(yes)(noop));
});
var ifTrue__ = exports.ifTrue__ = function ifTrue__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifTrue(yes)(no));
};

var ifFalse = exports.ifFalse = (0, _ramda.curry)(function (yes, no, x) {
    return x === false ? yes(x) : no(x);
});
var whenFalse = exports.whenFalse = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifFalse(yes)(noop));
});
var ifFalse__ = exports.ifFalse__ = function ifFalse__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifFalse(yes)(no));
};

// --- xxx alias as ifTruthy / falsey
var ifYes = exports.ifYes = (0, _ramda.curry)(function (yes, no, x) {
    return x ? yes(x) : no(x);
});
var whenYes = exports.whenYes = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifYes(yes)(noop));
});
var ifYes__ = exports.ifYes__ = function ifYes__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifYes(yes)(no));
};

// --- single-letter lower case flag instead of __? xxx
// --- xxx is it possible to compose the __ versions, like with ifPredicate?
var ifNo = exports.ifNo = (0, _ramda.curry)(function (yes, no, x) {
    return !x ? yes(x) : no(x);
});
var whenNo = exports.whenNo = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifNo(yes)(noop));
});
var ifNo__ = exports.ifNo__ = function ifNo__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifNo(yes)(no));
};

var ifFunction = exports.ifFunction = (0, _ramda.curry)(function (yes, no, x) {
    return isFunction(x) ? yes(x) : no(x);
});
var whenFunction = exports.whenFunction = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifFunction(yes)(noop));
});
var ifFunction__ = exports.ifFunction__ = function ifFunction__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifFunction(yes)(no));
};

// @todo test
var ifHas = exports.ifHas = (0, _ramda.curry)(function (yes, no, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        o = _ref2[0],
        k = _ref2[1];

    return _op(o, (0, _ramda.has)(k)) ? yes(o[k], o, k) : no(o, k);
});
var whenHas = exports.whenHas = (0, _ramda.curry)(function (yes, spec) {
    return _op(spec, ifHas(yes)(noop));
});
var ifHas__ = exports.ifHas__ = function ifHas__(spec, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(spec, ifHas(yes)(no));
};

// what about is versions?
//export const isTrue = eq (true)
//export const isFalse = eq (false)

// @todo test
var ifHasIn = exports.ifHasIn = (0, _ramda.curry)(function (yes, no, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        o = _ref4[0],
        k = _ref4[1];

    return _op(o, (0, _ramda.hasIn)(k)) ? yes(o[k], o, k) : no(o, k);
});
var whenHasIn = exports.whenHasIn = (0, _ramda.curry)(function (yes, spec) {
    return _op(spec, ifHasIn(yes)(noop));
});
var ifHasIn__ = exports.ifHasIn__ = function ifHasIn__(spec, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(spec, ifHasIn(yes)(no));
};

// @todo test
var ifBind = exports.ifBind = (0, _ramda.curry)(function (yes, no, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        o = _ref6[0],
        k = _ref6[1];

    return laat([_op(k, bindTry(o))], ifOk(yes, no));
});
var whenBind = exports.whenBind = (0, _ramda.curry)(function (yes, spec) {
    return _op(spec, ifBind(yes)(noop));
});
var ifBind__ = exports.ifBind__ = function ifBind__(spec, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(spec, ifBind(yes)(no));
};

// --- last one always? undef if none?
// tests for truthINEss, so it acts like if().
// export const cond = curry ((blocks, target) => {
//     let result
//     for (const [test, exec] of blocks) {
//         if (!ok (test)) return exec (target)
//
//         const result = test (target)
// 		// @todo test.
//         // this order for symmetry with null case.
//         if (result) return exec (target, result)
//     }
// })

// --- can't funnel through ramda's cond, because they miss the 'otherwise' behavior.
var _cond = function _cond(withTarget, blocks, target) {
    var result = void 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        var _loop = function _loop() {
            var _step$value = _slicedToArray(_step.value, 2),
                a = _step$value[0],
                b = _step$value[1];

            var _ref7 = _op(b, ifOk(function () {
                return [a, b];
            }, function () {
                return [null, a];
            })),
                _ref8 = _slicedToArray(_ref7, 2),
                test = _ref8[0],
                exec = _ref8[1];

            // --- null or undefined test ('otherwise') matches immediately


            if (_op(test, notOk)) return {
                    v: withTarget ? exec(target) : exec()
                };

            var result = withTarget ? test(target) : test();
            // @todo test.
            if (result) return {
                    v: withTarget ? exec(target, result) : exec(result)
                };
        };

        for (var _iterator = blocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ret = _loop();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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

// --- no target, but predicate functions should still be functions and not expressions, to keep it
// lazy.
// xxx ditch brackets!
var condo = exports.condo = function condo(blocks) {
    return _cond(false, blocks);
};

var condO = exports.condO = (0, _ramda.curry)(function (blocks, target) {
    return _cond(true, blocks, target);
});
var cond = exports.cond = condO;

// ------ exceptions.

// @todo was buggy, changed
var tryCatch = exports.tryCatch = (0, _ramda.curry)(function (good, bad, f) {
    var successVal = void 0;
    try {
        successVal = f();
    } catch (e) {
        return bad(e);
    }
    return good(successVal);
});

var tryCatch__ = exports.tryCatch__ = function tryCatch__(whatToTry) {
    var howToCatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

    try {
        return whatToTry();
    } catch (e) {
        return howToCatch(e);
    }
};

var exception = exports.exception = function exception() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new Error(_op(args, (0, _ramda.join)(' ')));
};
var raise = exports.raise = function raise(e) {
    throw e;
};
// --- i don't love the name die, because it can be caught.
// still, it's descriptive, and everyone knows this is js anyway.
var die = exports.die = function die() {
    return _op(exception.apply(undefined, arguments), raise);
};
var decorateException = exports.decorateException = (0, _ramda.curry)(function (prefix, e) {
    return _op(e, assocM('message', joinOk(' ')([prefix, e.message])));
});

// @ might be good if __ versions don't call the curried versions, because it messes up TCO.

// @todo
var ifArray = exports.ifArray = (0, _ramda.curry)(function (yes, no, x) {
    return isArray(x) ? yes(x) : no(x);
});

var ifZero = exports.ifZero = (0, _ramda.curry)(function (yes, no, x) {
    return x === 0 ? yes(x) : no(x);
});
var whenZero = exports.whenZero = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifZero(yes)(noop));
});
var ifZero__ = exports.ifZero__ = function ifZero__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifZero(yes)(no));
};
var ifOne = exports.ifOne = (0, _ramda.curry)(function (yes, no, x) {
    return x === 1 ? yes(x) : no(x);
});
var whenOne = exports.whenOne = (0, _ramda.curry)(function (yes, x) {
    return _op(x, ifOne(yes)(noop));
});
var ifOne__ = exports.ifOne__ = function ifOne__(x, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(x, ifOne(yes)(no));
};

// --- use ramda empty xxx
var ifEmpty = exports.ifEmpty = (0, _ramda.curry)(function (yes, no, xs) {
    return xs.length === 0 ? yes(xs) : no(xs);
});
var whenEmpty = exports.whenEmpty = (0, _ramda.curry)(function (yes, xs) {
    return _op(xs, ifEmpty(yes)(noop));
});
var ifEmpty__ = exports.ifEmpty__ = function ifEmpty__(xs, yes) {
    var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    return _op(xs, ifEmpty(yes)(no));
};

// --- tests for exact truth. Rationale: predicate can easily be made to test truthy by adding >>
// truthy.
//
// --- we don't provide an ifNotPredicate function, because users are encouraged to compose their
// own functions, and it would be confusing.
//
// (should ifNotPredicate match falsey or false? If falsey, it breaks symmetry with ifPredicate; if
// false, it behaves differently than ifPredicate (pred >> not), which is also confusing.
//
var ifPredicate = exports.ifPredicate = (0, _ramda.curry)(function (f, yes, no, x) {
    return f(x) === true ? yes(x) : no(x);
});
var whenPredicate = exports.whenPredicate = (0, _ramda.curry)(function (f, yes, x) {
    return _op(x, ifPredicate(f)(yes)(noop));
});
var ifPredicate__ = exports.ifPredicate__ = function ifPredicate__(f, x, yes) {
    var no = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
    return _op(x, ifPredicate(f)(yes)(no));
};

// @todo
// alias ifEmpty -> isLengthOne
//
// @todo
// isLeft, isRight, isSome, isNone,

// ------ cascade

var cascade = exports.cascade = function cascade(val) {
    for (var _len2 = arguments.length, fxs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        fxs[_key2 - 1] = arguments[_key2];
    }

    return _op(fxs, (0, _ramda.reduce)(function (a, b) {
        return b(a);
    }, val));
};

// ------ bind

// would be nice to bind with an arg, e.g. exit with a code.
//const exit = 'exit' | bind (process)

// xxx bind and invoke
// bind >> invoke
// xxx bind the other way around
// o | bind ('funcname')

// xxx cursor | bind ('theta')
// xxx 'theta' | bindOn (cursor)

// --- dies if o[prop] is not a function.
var bind = exports.bind = (0, _ramda.curry)(function (o, prop) {
    return o[prop].bind(o);
});

// --- returns undefined if o[prop] is not a function.
var bindTry = exports.bindTry = (0, _ramda.curry)(function (o, prop) {
    return _op(o[prop], whenFunction(function () {
        return bind(o, prop);
    }));
});

// --- returns a function representing the 'result' of the bind: doesn't actually try to bind until
// that function is invoked.
var bindLate = exports.bindLate = (0, _ramda.curry)(function (o, key) {
    return function () {
        return o[key].apply(o, arguments);
    };
});

// --------- data.

// ------ defaultTo.

// --- f is a *function*.
var defaultTo = exports.defaultTo = (0, _ramda.curry)(function (f, x) {
    return ok(x) ? x : f();
});
var defaultTo__ = exports.defaultTo__ = function defaultTo__(x, f) {
    return _op(x, defaultTo(f));
};

// ------ assoc.

var assocM = exports.assocM = (0, _ramda.curry)(function (prop, val, o) {
    return o[prop] = val, o;
});

// ------ append.

var appendFrom = exports.appendFrom = (0, _ramda.curry)(function (elem, ary) {
    return [].concat(_toConsumableArray(ary), [elem]);
});
var appendTo = exports.appendTo = (0, _ramda.flip)(appendFrom);

// [] -> a -> [], mut
var appendToM = exports.appendToM = (0, _ramda.curry)(function (tgt, src) {
    tgt.push(src);
    return tgt;
});

var pushTo = appendToM;

// [] -> a -> [], mut
var appendFromM = exports.appendFromM = (0, _ramda.flip)(appendToM);

// ------ prepend.

var prependTo = exports.prependTo = (0, _ramda.curry)(function (ary, elem) {
    return [elem].concat(_toConsumableArray(ary));
});

var prependFrom = exports.prependFrom = (0, _ramda.flip)(prependTo);

var prependFromM = exports.prependFromM = (0, _ramda.curry)(function (src, tgt) {
    tgt.unshift(src);
    return tgt;
});

var prependToM = exports.prependToM = (0, _ramda.curry)(function (tgt, src) {
    tgt.unshift(src);
    return tgt;
});

// [1 2 3] -> [4 5 6] -> [1 2 3 4 5 6]

// [] -> [] -> []
// [] -> a -> [] => error
// String -> String -> String
// @todo: alias precatFrom
var concatTo = exports.concatTo = _ramda.concat;

// @todo: alias precatTo/From
var concatFrom = exports.concatFrom = (0, _ramda.flip)(_ramda.concat);

// [] -> [] -> [], mut
var concatToM = exports.concatToM = (0, _ramda.curry)(function (tgt, src) {
    tgt.push.apply(tgt, _toConsumableArray(src));
    return tgt;
});

var concatFromM = exports.concatFromM = (0, _ramda.flip)(concatToM);

var mergeTo = exports.mergeTo = _ramda.merge;
var mergeFrom = exports.mergeFrom = (0, _ramda.flip)(_ramda.merge);

// --- own properties, including null/undefined.
// --- 2x faster than Object.assign.
// --- @test: enumerable own?
// --- @todo: why is it so much faster?

/** @ref
export const mergeToM = curry ((tgt, src) => {
    const ret = tgt
    for (let i in src) [src, i] | whenHas ((v, o, k) => ret[k] = v)
    return ret
})
 */

var mergeToM = exports.mergeToM = function mergeToM(tgt) {
    return function (src) {
        for (var i in src) {
            if (oPro.hasOwnProperty.call(src, i)) tgt[i] = src[i];
        }return tgt;
    };
};

/** @ref
export const mergeFromM = flip (mergeToM)
 */

var mergeFromM = exports.mergeFromM = function mergeFromM(src) {
    return function (tgt) {
        for (var i in src) {
            if (oPro.hasOwnProperty.call(src, i)) tgt[i] = src[i];
        }return tgt;
    };
};

// --- discards non-own on src.
// --- does not discard non-own on tgt, b/c mut.
// --- uses collision function if key exists in the target, anywhere in target's prototype chain.
// --- 'with' refers to collision
// --- 'to' refers to tgt
// --- if a collision occurs in the target's prototype chain, the value will surface, regardless of
// whether src or tgt version is chosen.

var mergeToWithM = exports.mergeToWithM = (0, _ramda.curry)(function (collision, tgt, src) {
    var ret = tgt;

    var _loop2 = function _loop2(i) {
        _op([src, i], whenHas(function (v, o, k) {
            _op([ret, i], ifHasIn(function (v, o, k) {
                return ret[i] = collision(ret[i], src[i]);
            }, function (o, k) {
                return ret[i] = src[i];
            }));
        }));
    };

    for (var i in src) {
        _loop2(i);
    }return ret;
});

var mergeFromWithM = exports.mergeFromWithM = (0, _ramda.curry)(function (collision, src, tgt) {
    return mergeToWithM(collision, tgt, src);
});

var mergeToWhenOkM = exports.mergeToWhenOkM = function mergeToWhenOkM(tgt) {
    return function (src) {
        for (var i in src) {
            if (oPro.hasOwnProperty.call(src, i) && ok(src[i])) tgt[i] = src[i];
        }return tgt;
    };
};

// --- @todo test
var mergeFromWhenOkM = exports.mergeFromWhenOkM = function mergeFromWhenOkM(src) {
    return function (tgt) {
        for (var i in src) {
            if (oPro.hasOwnProperty.call(src, i) && ok(src[i])) tgt[i] = src[i];
        }return tgt;
    };
};

var injectToM = exports.injectToM = mergeToM;
var injectFromM = exports.injectFromM = mergeFromM;

// --- both will float.
var mergeToIn = exports.mergeToIn = (0, _ramda.curry)(function (tgt, src) {
    var ret = {};
    for (var i in tgt) {
        ret[i] = tgt[i];
    }for (var _i in src) {
        ret[_i] = src[_i];
    }return ret;
});

// --- both will float.
var mergeFromIn = exports.mergeFromIn = (0, _ramda.flip)(mergeToIn);

var mergeToInM = exports.mergeToInM = (0, _ramda.curry)(function (tgt, src) {
    var ret = tgt;
    for (var i in src) {
        ret[i] = src[i];
    }return ret;
});

var mergeFromInM = exports.mergeFromInM = (0, _ramda.flip)(mergeToInM);

// --- like R.mergeAll but also use prototype vals.
// --- to and from not applicable, also not curried or meant to be used piped.
var mergeAllIn = exports.mergeAllIn = function mergeAllIn(xs) {
    return _op(xs, (0, _ramda.reduce)(function (target, source) {
        return _op(source, mergeToInM(target));
    }, {}));
};

// ------ map.

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

var mapPairs = exports.mapPairs = (0, _ramda.curry)(function (f, obj) {
    return _op(obj, ifArray(_op2(_op2((0, _ramda.splitEvery)(2), (0, _ramda.map)(function (_ref9) {
        var _ref10 = _slicedToArray(_ref9, 2),
            k = _ref10[0],
            v = _ref10[1];

        return f(k, v);
    })), _ramda.fromPairs), _op2(_op2(_ramda.toPairs, (0, _ramda.map)(function (_ref11) {
        var _ref12 = _slicedToArray(_ref11, 2),
            k = _ref12[0],
            v = _ref12[1];

        return f(k, v);
    })), _ramda.fromPairs)));
});

// --- doesn't take array, only obj.
var mapPairsIn = exports.mapPairsIn = (0, _ramda.curry)(function (f, obj) {
    return _op(_op(_op(obj, _ramda.toPairsIn), (0, _ramda.map)(function (_ref13) {
        var _ref14 = _slicedToArray(_ref13, 2),
            k = _ref14[0],
            v = _ref14[1];

        return f(k, v);
    })), _ramda.fromPairs);
});

// --- ramda already gives us eachObj.

var eachObjIn = exports.eachObjIn = (0, _ramda.curry)(function (f, obj) {
    for (var k in obj) {
        f(obj[k], k);
    }
});

// [a -> b] -> [a] -> [b]
var applyScalar = exports.applyScalar = (0, _ramda.curry)(function (fs, xs) {
    return _op(_op(xs, (0, _ramda.zip)(fs)), (0, _ramda.map)(function (_ref15) {
        var _ref16 = _slicedToArray(_ref15, 2),
            f = _ref16[0],
            x = _ref16[1];

        return f(x);
    }));
});

var applyScalarIfOk = exports.applyScalarIfOk = (0, _ramda.curry)(function (fs, xs) {
    return _op(_op(xs, (0, _ramda.zip)(fs)), (0, _ramda.map)(function (_ref17) {
        var _ref18 = _slicedToArray(_ref17, 2),
            f = _ref18[0],
            x = _ref18[1];

        return _op(x, whenOk(f));
    }));
});

var passScalar = exports.passScalar = (0, _ramda.flip)(applyScalar);

// @todo
var scalarApply = exports.scalarApply = applyScalar;
var scalarPass = exports.scalarPass = passScalar;

// --------- laat

var laat = exports.laat = function laat(xs, f) {
    return f.apply(null, xs);
};
var given = exports.given = laat;

// --- these can be called directly by speed freaks; `laats` should be good enough for nearly all
// uses.
var laats2 = exports.laats2 = function laats2(f1, f2) {
    var n1 = f1();
    return f2(n1);
};

var laats3 = exports.laats3 = function laats3(f1, f2, f3) {
    var n1 = f1();
    var n2 = f2(n1);
    return f3(n1, n2);
};

var laats4 = exports.laats4 = function laats4(f1, f2, f3, f4) {
    var n1 = f1();
    var n2 = f2(n1);
    var n3 = f3(n1, n2);
    return f4(n1, n2, n3);
};

var laats5 = exports.laats5 = function laats5(f1, f2, f3, f4, f5) {
    var n1 = f1();
    var n2 = f2(n1);
    var n3 = f3(n1, n2);
    var n4 = f4(n1, n2, n3);
    return f5(n1, n2, n3, n4);
};

var laats6 = exports.laats6 = function laats6(f1, f2, f3, f4, f5, f6) {
    var n1 = f1();
    var n2 = f2(n1);
    var n3 = f3(n1, n2);
    var n4 = f4(n1, n2, n3);
    var n5 = f5(n1, n2, n3, n4);
    return f6(n1, n2, n3, n4, n5);
};

// --- generic form, for any non-zero number of arguments.
var _laats = function _laats() {
    for (var _len3 = arguments.length, xs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        xs[_key3] = arguments[_key3];
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

var laats = exports.laats = function laats() {
    if (arguments.length === 2) return laats2.apply(undefined, arguments);
    if (arguments.length === 3) return laats3.apply(undefined, arguments);
    if (arguments.length === 4) return laats4.apply(undefined, arguments);
    if (arguments.length === 5) return laats5.apply(undefined, arguments);
    if (arguments.length === 6) return laats6.apply(undefined, arguments);
    return _laats.apply(undefined, arguments);
};

var lets = exports.lets = laats;

// --- 'call' always means pass a context.
// --- 'apply' always means 'apply this function to some params'
// --- 'pass' means 'pass these params to a function'
// --- 'invoke' means just call this function, no context or params.

// ------ ; {}.toString | callOn ([])

var callOn = exports.callOn = (0, _ramda.curry)(function (o, f) {
    return f.call(o);
});
var callOn1 = exports.callOn1 = (0, _ramda.curry)(function (o, val, f) {
    return f.call(o, val);
});
var callOn2 = exports.callOn2 = (0, _ramda.curry)(function (o, val1, val2, f) {
    return f.call(o, val1, val2);
});
var callOn3 = exports.callOn3 = (0, _ramda.curry)(function (o, val1, val2, val3, f) {
    return f.call(o, val1, val2, val3);
});
var callOnN = exports.callOnN = (0, _ramda.curry)(function (o, vs, f) {
    return f.apply(o, vs);
});

var call = exports.call = callOn;
var call1 = exports.call1 = callOn1;
var call2 = exports.call2 = callOn2;
var call3 = exports.call3 = callOn3;
var callN = exports.callN = callOnN;

// ------ ; [] | callUnder ({}.toString)

var callUnder = exports.callUnder = (0, _ramda.curry)(function (f, o) {
    return f.call(o);
});
var callUnder1 = exports.callUnder1 = (0, _ramda.curry)(function (f, val, o) {
    return f.call(o, val);
});
var callUnder2 = exports.callUnder2 = (0, _ramda.curry)(function (f, val1, val2, o) {
    return f.call(o, val1, val2);
});

// --- alias applyTo0 xxx
var invoke = exports.invoke = function invoke(f) {
    return f();
};

// ------ sum | applyToN ([1, 2, 3])

var applyTo1 = exports.applyTo1 = (0, _ramda.curry)(function (val, f) {
    return f(val);
});
var applyTo2 = exports.applyTo2 = (0, _ramda.curry)(function (val1, val2, f) {
    return f(val1, val2);
});
var applyTo3 = exports.applyTo3 = (0, _ramda.curry)(function (val1, val2, val3, f) {
    return f(val1, val2, val3);
});
var applyToN = exports.applyToN = (0, _ramda.curry)(function (vs, f) {
    return f.apply(null, vs);
});

// maybe: export const applyTo = applyTo1

var apply1 = exports.apply1 = applyTo1;
var apply2 = exports.apply2 = applyTo2;
var apply3 = exports.apply3 = applyTo3;
var applyN = exports.applyN = applyToN;

// --- i don't think these are useful. xxx
var passTo1 = exports.passTo1 = (0, _ramda.curry)(function (f, val) {
    return f(val);
});
var passTo2 = exports.passTo2 = (0, _ramda.curry)(function (f, val1, val2) {
    return f(val1, val2);
});
var passTo3 = exports.passTo3 = (0, _ramda.curry)(function (f, val1, val2, val3) {
    return f(val1, val2, val3);
});
var pass1 = exports.pass1 = passTo1;
var pass2 = exports.pass2 = passTo2;
var pass3 = exports.pass3 = passTo3;

// ------ ; [1, 2, 3] | passToN (sum)
var passToN = exports.passToN = (0, _ramda.curry)(function (f, vs) {
    return f.apply(null, vs);
});
var passN = exports.passN = passToN;

// --- flip first and second args of a curried function, even for functions with more than 2 args.
// --- also works for functions curried with the a => b => ... notation (unlike R.flip).
// --- does not work with non-curried functions.

var flipC = exports.flipC = function flipC(f) {
    return (0, _ramda.curryN)(2)(function (a, b) {
        for (var _len4 = arguments.length, rest = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
            rest[_key4 - 2] = arguments[_key4];
        }

        return laat(
        // --- if f had arity 2, f (b) (a) is the answer; otherwise it's a curried interim result,
        // since f itself was curried.
        [f(b)(a)], function (interimResult) {
            return _op(rest, ifEmpty(function () {
                return interimResult;
            }, (0, _ramda.reduce)(function (a, b) {
                return a(b);
            })(interimResult)));
        });
    });
};

// ------ sprintf

var sprintf1 = exports.sprintf1 = (0, _ramda.curry)(function (str, a) {
    return (0, _sprintf2.default)(str, a);
});
var sprintfN = exports.sprintfN = (0, _ramda.curry)(function (str, xs) {
    return _sprintf2.default.apply(null, [str].concat(_toConsumableArray(xs)));
});

var noop = exports.noop = function noop() {};

// --- r's zip only takes two.
// @dep appendToM
var zipAll = exports.zipAll = function zipAll() {
    for (var _len5 = arguments.length, xss = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        xss[_key5] = arguments[_key5];
    }

    var ret = [];
    var l = xss[0].length;

    var _loop3 = function _loop3(i) {
        _op(_op(xss, (0, _ramda.map)(function (xs) {
            return xs[i];
        })), pushTo(ret));
    };

    for (var i = 0; i < l; i++) {
        _loop3(i);
    }return ret;
};

// --------- list.

// multiple versions with preps ??
var repeat = exports.repeat = (0, _ramda.flip)(_ramda.repeat);
var times = exports.times = (0, _ramda.flip)(_ramda.times);

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
    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
    }

    return args;
};

var joinOk = exports.joinOk = (0, _ramda.curry)(function (j, xs) {
    return _op(_op(xs, compactOk), (0, _ramda.join)(j));
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
    return laat([_op(reStr, removeSpaces), flags], nieuw2(RegExp));
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

// xxx repl might be a function.
var ifReplace = exports.ifReplace = (0, _ramda.curry)(function (yes, no, re, repl, target) {
    var success = 0;
    var out = target.replace(re, function () {
        ++success;
        return repl;
    });
    return _op(success, ifYes(function () {
        return yes(out, success);
    }, function () {
        return no(target);
    }));
});

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

// --- returns a copy with prototype vals floated.
var flattenPrototype = exports.flattenPrototype = function flattenPrototype(o) {
    var ret = {};
    for (var i in o) {
        ret[i] = o[i];
    }return ret;
};

// --- check if slower xx
// const arg0 = (...args) => args [0]
// const arg1 = (...args) => args [1]

var arg0 = exports.arg0 = function arg0(a) {
    return a;
};
var arg1 = exports.arg1 = function arg1(_, a) {
    return a;
};
var arg2 = exports.arg2 = function arg2(_, _1, a) {
    return a;
};
var arg3 = exports.arg3 = function arg3(_, _1, _2, a) {
    return a;
};
var arg4 = exports.arg4 = function arg4(_, _1, _2, _3, a) {
    return a;
};
var arg5 = exports.arg5 = function arg5(_, _1, _2, _3, _4, a) {
    return a;
};
var arg6 = exports.arg6 = function arg6(_, _1, _2, _3, _4, _5, a) {
    return a;
};
var arg7 = exports.arg7 = function arg7(_, _1, _2, _3, _4, _5, _6, a) {
    return a;
};
var arg8 = exports.arg8 = function arg8(_, _1, _2, _3, _4, _5, _6, _7, a) {
    return a;
};
var arg9 = exports.arg9 = function arg9(_, _1, _2, _3, _4, _5, _6, _7, _8, a) {
    return a;
};
var arg10 = exports.arg10 = function arg10(_, _1, _2, _3, _4, _5, _6, _7, _8, _9, a) {
    return a;
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
    return laats(function (_) {
        return mergeMixins(mixinsPre, proto, mixinsPost);
    }, function (protoMixed) {
        return {
            // --- consider dropping this: Object.getPrototypeOf xxx
            proto: protoMixed,
            create: function create() {
                for (var _len7 = arguments.length, instanceExtension = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                    instanceExtension[_key7] = arguments[_key7];
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
            for (var i in args) {
                var src = args,
                    _tgt = props;

                if (oPro.hasOwnProperty.call(src, i) && ok(src[i])) _tgt[i] = src[i];
            }
            return orig(tgt);
        }
    });
});

// @test
// @todo ref
// @todo mixins etc.
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
// for if you reeally want to have other functions in the factory (parallel to .create())
//
// in many cases, a simple function exported by the module will probably get you what you want.
// you can of course always put the static functions in the prototype as well. it will mean
// infinitesimally more memory use -- and that you need at least one instance.

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

/*
// --- note, there is no magic here and nothing spectacular.
// if you find that you need more flexibility than that this provides (e.g. the second argument of Object.create to assign properties etc.), just
// reimplement this in your app code.
// unwieldy name, yes, but calling it 'extend' would probably just add to JS confusion.
// hopefully this name makes it clear to js programmers what's going on.
// note, Object.setPrototypeOf would not work here (alters the extension object).
//
const oCreateExtendWith = curry ((extend, proto) => proto | Object.create | mergeFromM (extend))
const oCreateBase = curry ((proto, extend) => oCreateExtendWith (extend, proto))
const Cat = (() => {
const proto = {
    // recommendation: do use arrow functions, despite what they tell you.
    // it makes it clear that this is a pure function, not dependent on `this`.
    speak: _ => 'meow' | log,
}
return proto | oCreateBase (Animal.proto) | factory
// --- or
// return Animal.proto | oCreateExtendWith (proto) | factory
// --- or
// return proto | factoryMixinPre (Animal.proto)
return proto | factoryMixins ([Animal.proto], [])
}) ()
*/

// xxx getType
// export const getType = callUnder ({}.toString)
//    >> dot2 ('slice') (8, -1) (
//)

// --- wants upper case, e.g. output of toString.
var isType = exports.isType = (0, _ramda.curry)(function (t, x) {
    return _op(_op(_op(x, callUnder({}.toString)), dot2('slice')(8, -1)), (0, _ramda.equals)(t));
});
var isArray = exports.isArray = isType('Array');
var isFunction = exports.isFunction = isType('Function');

// @test
// --- assumed to be a Number.
var isInteger = exports.isInteger = function isInteger(x) {
    return x === Math.floor(x);
};

// --- map indexed: not sure about exporting these.
var mapX = exports.mapX = (0, _ramda.addIndex)(_ramda.map);
var mapAccumX = exports.mapAccumX = (0, _ramda.addIndex)(_ramda.mapAccum);

var subtractFrom = exports.subtractFrom = _ramda.subtract;
var minus = exports.minus = (0, _ramda.flip)(subtractFrom);
var plus = exports.plus = _ramda.add;

// @test
var laatO = exports.laatO = (0, _ramda.curry)(function (fs, f, x) {
    return laat(_op(fs, (0, _ramda.map)(applyTo1(x))), function () {
        for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            args[_key8] = arguments[_key8];
        }

        return _op(f, applyToN([x].concat(args)));
    });
});

var laatsO = exports.laatsO = (0, _ramda.curry)(function (specAry, tgt) {
    return laats.apply(undefined, [function (_) {
        return tgt;
    }].concat(_toConsumableArray(specAry)));
});

var listDat = (0, _ramda.curry)(function (fs, n) {
    return _op(fs, (0, _ramda.map)(applyTo1(n)));
});

// --- or:
var listDat2 = function listDat2(n) {
    return _op((0, _ramda.map)(applyTo1(n)), flipC);
};
var listDat3 = flipC(function (n) {
    return (0, _ramda.map)(applyTo1(n));
});
// --- >> is higher.
var listDat4 = _op(_op(_op2(applyTo1, _ramda.map), _ramda.curry), flipC);
var listDat6 = _op(_op2(applyTo1, _ramda.map), flipC);

var listDat5 = flipC(function (n) {
    return _op(_op(n, applyTo1), _ramda.map);
});

var _$ = {};

// xx can lead to annoying bug if a symbol slips past the linter.
// consider using _$
var condElse = exports.condElse = appendTo([void 8]);

var condEquals = exports.condEquals = (0, _ramda.curry)(function (exec, testString) {
    return [
    //     testString | ifEquals (_$) (noop) (equals),
    _op(testString, _ramda.equals), exec];
});

var condPredicate = exports.condPredicate = (0, _ramda.curry)(function (exec, pred) {
    return [pred, exec];
});

// --- synonym for always. check impl of always. xxx
var blush = exports.blush = function blush(x) {
    return function (_) {
        return x;
    };
};

var guard = exports.guard = condPredicate;
var guardA = exports.guardA = _op2(blush, guard);
var otherwise = exports.otherwise = condElse;

var ifEquals = exports.ifEquals = (0, _ramda.curry)(function (test, yes, no, x) {
    return x === test ? yes(x) : no(x);
});
var whenEquals = exports.whenEquals = (0, _ramda.curry)(function (test, yes, x) {
    return _op(x, ifEquals(test)(yes)(noop));
});
var ifEquals__ = exports.ifEquals__ = function ifEquals__(x, test, yes) {
    var no = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
    return _op(x, ifEquals(test)(yes)(no));
};

var gt = exports.gt = (0, _ramda.flip)(_ramda.gt);
var gte = exports.gte = (0, _ramda.flip)(_ramda.gte);
var lt = exports.lt = (0, _ramda.flip)(_ramda.lt);
var lte = exports.lte = (0, _ramda.flip)(_ramda.lte);

// --- different from R.equals, which considers two different objects equal if their contents are
//     the same (equivalent).
// --- different from R.identical, which has some different semantics involving e.g. 0 and -0.
// --- literally just wraps ===.
// rationale: must be able to confidently refactor working code which uses ===
var eq = exports.eq = (0, _ramda.curry)(function (x, y) {
    return x === y;
});
var ne = exports.ne = (0, _ramda.curry)(function (x, y) {
    return x !== y;
});

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
    return _op2((0, _ramda.splitAt)(1), f);
};

// --- biased towards not using method lookup, but free floating function names.
// --- exceptions as expressions.
// --- extended regex.
//
// curry2
// curry3
// condMultiple
//
//

var notOk = exports.notOk = _ramda.isNil;

var divideBy = exports.divideBy = (0, _ramda.flip)(_ramda.divide);

var defaultToA = exports.defaultToA = _op2(blush, defaultTo);

// ditch brackets on cond.
// a line can still be an array if you want the 'raw' predicate / exec.
// make an extra one (condN ?) for if programmatic building is required.

//
// subtract, subtractFrom.
// divide, divideBy.
//
//
//
// spread. e.g.: csv => [csv, length csv] because spread (identity, length)
// or spread2 (length)
// arrows.
//
// be careful with defaultToA ({}) if point-free. ?
//

// const toThe = curry ((exp, base) => Math.pow (base, exp))

// const deconstruct = curry ((f, x) => f (x, x))
// destructuring, as a function:
// const show = deconstruct ((downloadStatus, { completed, }) =>
//
// you repeat 'downloadStatus' anyway
// export const show = deconstruct ((downloadStatus, { completed, }) =>
// downloadStatus | cata ({
//
// so why not:
//
// or like this, except that you lose the documentation aspect.
// this | pluck ('beans', 'bones', 'binds', (dit, beans, bones, binds) => ...)
// could combine ramda props with apply.