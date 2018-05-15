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

var _op = function _op(a, b) {
    return b(a);
};

var _op2 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(b, a);
});

var _op3 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(a, b);
});

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

// side1, js curry, separate: 1000000 iters, took 54.0 ms (18518.5 iters / ms)
// side1, js curry, combined: 1000000 iters, took 51.0 ms (19607.8 iters / ms)
// side1, rd curry: 1000000 iters, took 407.0 ms (2457.0 iters / ms)

// --- conclusions:
// separate/combined: negligible
// js curry: much faster.
// ramda curry is definitely fast enough for apps.
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

var suites = [suite1];

_op(suites, (0, _ramda.map)(_op(_index.invoke, _ramda.forEach)));

_op(obj.flag, _fishLib.log);

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