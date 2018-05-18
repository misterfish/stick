#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.myside1 = exports.myside = exports.mydot = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _index = require('../../../index');

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _op = function _op() {
    return pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
    return compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
    return composeRight.apply(undefined, arguments);
};

var blah = _op3((0, _ramda.add)(2), (0, _ramda.multiply)(6));
_op(_op(5, blah), _fishLib.log);

var logWith = function logWith(header) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _fishLib.log.apply(undefined, [header].concat(args));
    };
};

var obj = {
    flag: true,
    toggle: function toggle(n) {
        for (var i = 0; i < n; i++) {
            this.flag = !this.flag;
        }
    },
    add5: function add5(a, b, c, d, e) {
        return a + b + c + d + e;
    },
    get: function get() {
        return this.flag;
    }
};

var mydot = exports.mydot = function mydot(prop) {
    return function (o) {
        return o[prop]();
    };
};
var myside = exports.myside = function myside(prop) {
    return function (o) {
        return o[prop](), o;
    };
};
var myside1 = exports.myside1 = function myside1(prop) {
    return function (val) {
        return function (o) {
            return o[prop](val), o;
        };
    };
};

var dot1JSep = function dot1JSep(prop) {
    return function (val) {
        return function (o) {
            return o[prop](val);
        };
    };
};
var dot1JCom = function dot1JCom(prop, val) {
    return function (o) {
        return o[prop](val);
    };
};

var side1JSep = function side1JSep(prop) {
    return function (val) {
        return function (o) {
            return dot1JSep(prop)(val)(o), o;
        };
    };
};
var side1JCom = function side1JCom(prop, val) {
    return function (o) {
        return dot1JCom(prop, val)(o), o;
    };
};

var side1C = (0, _ramda.curry)(function (prop, val) {
    return (0, _ramda.tap)((0, _index.dot1)(prop)(val));
});

var dot5J = function dot5J(prop) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (val4) {
                    return function (val5) {
                        return function (o) {
                            return o[prop](val1, val2, val3, val4, val5);
                        };
                    };
                };
            };
        };
    };
};
var dot5C = (0, _ramda.curry)(function (prop, val1, val2, val3, val4, val5, o) {
    return o[prop](val1, val2, val3, val4, val5);
});

var toggleJSep = side1JSep('toggle')(3);
var toggleJCom = side1JCom('toggle', 3);
var toggleC = side1C('toggle')(3);

var add5J = dot5J('add5');
var add5C = dot5C('add5');

var n = 1e6;

var testSide1JSep = function testSide1JSep(_) {
    return _op(obj, toggleJSep);
};
var testSide1JCom = function testSide1JCom(_) {
    return _op(obj, toggleJCom);
};
var testSide1C = function testSide1C(_) {
    return _op(obj, toggleC);
};

var testDot5J = function testDot5J(_) {
    return _op(obj, add5J(5, 6, 7, 8, 9));
};
var testDot5C = function testDot5C(_) {
    return _op(obj, add5C(5, 6, 7, 8, 9));
};

// --- the resulting function is not curried.
// note that this function does not have a well-defined arity.

var roll = function roll(f) {
    return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
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

// const r = (a => b => c => a * b * c) | recurry
// r (1, 2, 3) = roll (orig) (1, 2, 3)
// r (1, 2)    = roll (orig) (1, 2)
// r (1) = roll (orig) (1)
// r (1) (2) (3)
// r ()
var recurry = function recurry(n) {
    return function (f) {
        return function () {
            var rolled = roll(f).apply(undefined, arguments);
            var dn = n - arguments.length;
            return dn <= 1 ? rolled : recurry(dn)(rolled);
        };
    };
};

// const _arity = n => f =>
//     n === 1 ? ((a) => f (a)) :
//     n === 2 ? ((a, b) => f (a, b)) :
//     n === 3 ? ((a, b, c) => f (a, b, c)) :
//     n === 4 ? ((a, b, c, d) => f (a, b, c, d)) :
//     n === 5 ? ((a, b, c, d, e) => f (a, b, c, d, e)) :
//     die ('Invalue value for _arity (' + n + '), expected 1 to 5')
//
// const arity1 = _arity (1)
// const arity2 = _arity (2)
// const arity3 = _arity (3)
// const arity4 = _arity (4)
// const arity5 = _arity (5)
//

// if maximising iterations per millisecond is crucial to you, you can import the manual versions
// directly.
// everyone else will probably want to use the normal versions.

var multiply5J = function multiply5J(a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return function (e) {
                    return a * b * c * d * e;
                };
            };
        };
    };
};

var multiply5U = _op(multiply5J, roll);
var multiply5UR = _op(multiply5J, (0, _ramda.uncurryN)(5));
var testUncurryMineMultiply5 = function testUncurryMineMultiply5(_) {
    return multiply5U(3, 4, 5, 6, 7);
};
var testUncurryRamdaMultiply5 = function testUncurryRamdaMultiply5(_) {
    return multiply5UR(3, 4, 5, 6, 7);
};

var multiplyBy120US = multiply5U(2, 3, 4, 5);
var testMultiplyBy120US = function testMultiplyBy120US(_) {
    return multiplyBy120US(5);
};

var multiplyBy120UR = multiply5UR(2, 3, 4, 5);
var testMultiplyBy120UR = function testMultiplyBy120UR(_) {
    return multiplyBy120UR(5);
};

var curryMultiply5 = (0, _ramda.curry)(function (a, b, c, d, e) {
    return a * b * c * d * e;
});
// --- 12 times faster than curry
var manualMultiply5 = function manualMultiply5(a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return function (e) {
                    return a * b * c * d * e;
                };
            };
        };
    };
};
// --- 1.5 times faster than curry
// curry is of course much more pleasant to write.
// and you can curry any function, even one you didn't write.
var manualPlusRollMultiply5 = _op(manualMultiply5, roll);
var recurryMultiply5 = _op(manualMultiply5, recurry(5));
var manualUncurryNMultiply5 = _op(manualMultiply5, (0, _ramda.uncurryN)(5));

var testCurryMultiply5 = function testCurryMultiply5() {
    curryMultiply5(1, 2, 3, 4, 5);
    curryMultiply5(1, 2, 3, 4)(5);
    curryMultiply5(1, 2, 3)(4)(5);
};

var testManualPlusRollMultiply5 = function testManualPlusRollMultiply5() {
    manualPlusRollMultiply5(1, 2, 3, 4, 5);
    manualPlusRollMultiply5(1, 2, 3, 4)(5);
    manualPlusRollMultiply5(1, 2, 3)(4)(5);
};

var testManualMultiply5 = function testManualMultiply5() {
    manualMultiply5(1)(2)(3)(4)(5);
    manualMultiply5(1)(2)(3)(4)(5);
    manualMultiply5(1)(2)(3)(4)(5);
};

// --- about 4 times faster than uncurry
var testRecurryMultiply5 = function testRecurryMultiply5() {
    recurryMultiply5(1, 2, 3, 4, 5);
    recurryMultiply5(1, 2, 3, 4)(5);
    recurryMultiply5(1, 2, 3)(4)(5);
};

// --- more than 3 times slower than just currying with ramda
var testManualUncurryNMultiply5 = function testManualUncurryNMultiply5() {
    manualUncurryNMultiply5(1, 2, 3, 4, 5);
    manualUncurryNMultiply5(1, 2, 3, 4)(5);
    manualUncurryNMultiply5(1, 2, 3)(4)(5);
};

// --- right
var myCompose = function myCompose(f) {
    return function (g) {
        return function () {
            return f(g.apply(undefined, arguments));
        };
    };
};

// --- taking out curry doesn't make either of them faster.

var xxxtestComposeRamda = function () {
    // defineBinaryOperator ('>>', curry ((a, b) => compose (b, a)))
    var _op4 = function _op4(a, b) {
        return compose(b, a);
    };

    var plusTwo = _op(2, _ramda.add);
    var timesFive = _op(5, _ramda.multiply);
    // const f = plusTwo >> timesFive
    var f = compose(plusTwo, timesFive);
    return function () {
        _op(10, f); // 60
        _op(11, f); // 65
        _op(12, f); // 70
    };
}();

// --- not faster!
var xxxtestComposeMine = function () {
    // --- i don't think it needs curry -- this is about the composer, not fog.
    // ramda decides not to curry fog.
    // defineBinaryOperator ('>>', curry ((a, b) => myCompose (b) (a)))
    var _op5 = function _op5(a, b) {
        return myCompose(b)(a);
    };

    var plusTwo = _op(2, _ramda.add);
    var timesFive = _op(5, _ramda.multiply);
    // const f = plusTwo >> timesFive
    var f = myCompose(plusTwo)(timesFive);
    return function () {
        _op(10, f); // 60
        _op(11, f); // 65
        _op(12, f); // 70
    };
}();

var clampManual = function clampManual(a) {
    return function (b) {
        return function (n) {
            return n < a ? a : n > b ? b : n;
        };
    };
};

// --- only slightly faster than theirs.
var clampRecurry = _op(clampManual, recurry(3));
var clampRoll = _op(clampManual, roll);

// clampRecurry.length | die
// clamp.length | die

var testClampRamda = function testClampRamda() {
    _op(5.5, (0, _ramda.clamp)(5, 6));
    _op(5.5, (0, _ramda.clamp)(6, 7));
    _op(5.5, (0, _ramda.clamp)(4, 5));
};

// --- 10 times faster than ramda
var testClampManual = function testClampManual() {
    _op(5.5, clampManual(5)(6));
    _op(5.5, clampManual(6)(7));
    _op(5.5, clampManual(4)(5));
};

var testClampRecurry = function testClampRecurry() {
    _op(5.5, clampRecurry(5)(6));
    _op(5.5, clampRecurry(6, 7));
    _op(5.5, clampRecurry(4)(5));
};

// --- slightly slower than recurry + pipe, about the same as ramda + pipe
var testClampRoll = function testClampRoll() {
    clampRoll(5, 6, 5.5);
    clampRoll(6, 7, 5.5);
    clampRoll(4, 5, 5.5);
};

// ramda's compose uses this.
// our `compose` is implemented using an arrow function and the spread operator, so it does not
// forward `this` to the new function.
// the stick idiom is that if you need the composed function to be bound to something specific, you should bind it into your functions beforehand.
// and, if you bind them using arrow functions, JS will prevent anyone from ever rebinding them
// (which in this idiom is a good thing)
// e.g.:

var proto = {
    bark: function bark() {
        return this.loud ? 'WOOF' : 'woof';
    }
};
var Dog = _op(proto, _index.factory);
var loudDog = Dog.create({ loud: true });
var softDog = Dog.create({ loud: false });

var loudBark = function loudBark(_) {
    return loudDog.bark();
};
var softBark = function softBark(_) {
    return softDog.bark();
};
var asString = (0, _index.sprintf1)('The dog said: %s');
var composedLoud = _op3(loudBark, asString);
var composedSoft = _op3(softBark, asString);
composedLoud(); // WOOF
composedSoft(); // woof

// compose, theirs: 1000000 iters, took 2812.0 ms (355.6 iters / ms)
// compose, mine: 1000000 iters, took 837.0 ms (1194.7 iters / ms)

var testComposeRamda = function testComposeRamda() {
    var composed = (0, _ramda.compose)((0, _ramda.multiply)(6), (0, _ramda.add)(2));
    _op(5, composed);
};

var testComposeMine = function testComposeMine() {
    var composed = _op3((0, _ramda.add)(2), (0, _ramda.multiply)(6));
    _op(5, composed);
};

// side1, js curry, separate: 1000000 iters, took 54.0 ms (18518.5 iters / ms)
// side1, js curry, combined: 1000000 iters, took 51.0 ms (19607.8 iters / ms)
// side1, rd curry: 1000000 iters, took 407.0 ms (2457.0 iters / ms)

// --- conclusions:
// separate/combined: negligible
// js curry: much faster.
// ramda curry is definitely fast enough for apps.
// my 'roll' is 3-4 times faster than uncurryN, and doesn't need n.
//
// Please keep in mind that the speeds we are talking about here only come into play when you're
// looping millions of times or more per second.
// Even the 'slow' version is perfectly acceptable for apps and it is almost certianly not the reason your app is slow.

var suite1 = [function (_) {
    return (0, _util.bench)('side1, js curry, separate', n)(testSide1JSep);
}, function (_) {
    return (0, _util.bench)('side1, js curry, combined', n)(testSide1JCom);
}, function (_) {
    return (0, _util.bench)('side1, rd curry', n)(testSide1C);
},

// dot5, js curry: 1000000 iters, took 57.0 ms (17543.9 iters / ms)
// dot5, rd curry: 1000000 iters, took 549.0 ms (1821.5 iters / ms)

function (_) {
    return (0, _util.bench)('dot5, js curry', n)(testDot5J);
}, function (_) {
    return (0, _util.bench)('dot5, rd curry', n)(testDot5C);
}];

var suite2 = [function (_) {
    return (0, _util.bench)('uncurry, mine, multiply, arity 5', n)(testUncurryMineMultiply5);
}, function (_) {
    return (0, _util.bench)('uncurry, theirs, multiply, arity 5', n)(testUncurryRamdaMultiply5);
}, function (_) {
    return (0, _util.bench)('partial uncurry, mine', n)(testMultiplyBy120US);
}, function (_) {
    return (0, _util.bench)('partial uncurry, theirs', n)(testMultiplyBy120UR);
}, function (_) {
    return (0, _util.bench)('curry, theirs', n)(testCurryMultiply5);
}, function (_) {
    return (0, _util.bench)('manual + roll', n)(testManualPlusRollMultiply5);
}, function (_) {
    return (0, _util.bench)('manual', n)(testManualMultiply5);
}, function (_) {
    return (0, _util.bench)('manual + uncurryN', n)(testManualUncurryNMultiply5);
}, function (_) {
    return (0, _util.bench)('manual + recurry', n)(testRecurryMultiply5);
}];

// const suite3 = [
//     _ => bench ('compose, mine', n) (testComposeMine),
//     _ => bench ('compose, theirs', n) (testComposeRamda),
// ]

var suite4 = [function (_) {
    return (0, _util.bench)('clamp, theirs', n)(testClampRamda);
}, function (_) {
    return (0, _util.bench)('clamp, manual', n)(testClampManual);
}, function (_) {
    return (0, _util.bench)('clamp, recurry', n)(testClampRecurry);
}, function (_) {
    return (0, _util.bench)('clamp, roll', n)(testClampRoll);
}];

var suiteCompose = [function (_) {
    return (0, _util.bench)('compose, theirs', n)(testComposeRamda);
}, function (_) {
    return (0, _util.bench)('compose, mine', n)(testComposeMine);
}];

var suites = [
//     suite1,
//     suite2,
//     suite3,
//     suite4,
suiteCompose];

_op(suites, (0, _ramda.map)(_op(_index.invoke, _ramda.forEach)));

var rec = _op(manualMultiply5, recurry(5));

_op(rec(1, 2, 3, 4, 5), _fishLib.log);
_op(rec(1, 2, 3, 4)(5), _fishLib.log);
_op(rec(1, 2, 3)(4, 5), _fishLib.log);
_op(rec(1, 2, 3)(4)(5), _fishLib.log);

_op(rec(1, 2)(3, 4, 5), _fishLib.log);
_op(rec(1, 2)(3, 4)(5), _fishLib.log);
_op(rec(1, 2)(3)(4)(5), _fishLib.log);
_op(rec(1, 2)(3)(4, 5), _fishLib.log);

_op(rec(1)(2)(3, 4, 5), _fishLib.log);
_op(rec(1)(2)(3)(4, 5), _fishLib.log);
_op(rec(1)(2)(3, 4)(5), _fishLib.log);
_op(rec(1)(2)(3)(4)(5), _fishLib.log);

_op(rec(1)(2, 3)(4, 5), _fishLib.log);
_op(rec(1)(2, 3)(4)(5), _fishLib.log);

_op(rec(1)(2, 3, 4)(5), _fishLib.log);

// in the js version we could enforce
// o | dot2 ('theprop', x, y)
// or
// o | dot2 ('theprop') (x) (y)
//
// solution:
// allow a 'fast' mode for power users
// import { dot2, } from 'stick/fast'
// o | dot2 ('theprop') (x) (y) // --- style enforced as long as symbol is in scope
// import { dot2, } from 'stick'
// o | dot2 ('theprop') (x) (y) // --- or
// o | dot2 ('theprop', x) (y) // --- or
// o | dot2 ('theprop') (x, y) // --- or
// o | dot2 ('theprop', x, y) // --- or
//
// rationale: it has to be possible to keep this fast. this will be the main backbone of the object
// system.
//
//
// dus:
//  reference version
//  normal version (curry, but no flip, etc.)
//  fast version (js curry, no ramda if possible)
//
// now compare a `curry` function with a manual + roll