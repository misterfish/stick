'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.passToN = exports.passTo = exports.applyToN = exports.applyTo5 = undefined;
exports.applyTo4 = exports.applyTo3 = exports.applyTo2 = exports.applyTo1 = exports.provideToN = exports.provideTo5 = exports.provideTo4 = exports.provideTo3 = exports.provideTo2 = exports.provideTo1 = exports.provideTo = exports.callOnN = exports.callOn5 = exports.callOn4 = exports.callOn3 = exports.callOn2 = exports.callOn1 = exports.callOn = exports.laat = exports.asterisk = exports.ampersand = exports.addCollection = exports.addIndex = exports.eachObjIn = exports.eachObj = exports.each = exports.map = exports.mergeFromIn = exports.mergeToIn = exports.mergeFromInM = exports.mergeToInM = exports.mergeFromWhenOkM = exports.mergeToWhenOkM = exports.mergeFromWithM = exports.mergeToWithM = exports.mergeFrom = exports.mergeTo = exports.mergeFromM = exports.mergeToM = exports.concatFromM = exports.concatToM = exports.concatFrom = exports.concatTo = exports.prependToM = exports.prependFromM = exports.prependFrom = exports.prependTo = exports.appendFromM = exports.appendToM = exports.appendTo = exports.appendFrom = exports.assocM = exports.defaultTo = exports.decorateException = exports.tryCatch = exports.toThe = exports.moduloWholePart = exports.modulo = exports.subtractFrom = exports.subtract = exports.divideInto = exports.divideBy = exports.multiply = exports.add = exports.condO = exports.condo = exports.condPredicate = exports.whenBind = exports.ifBind = exports.bindTry = exports.isType = exports.bind = exports.whenHasIn = exports.ifHasIn = exports.whenHas = exports.ifHas = exports.hasIn = exports.has = exports.whenPredicate = exports.ifPredicate = exports.sideN = exports.side5 = exports.side4 = exports.side3 = exports.side2 = exports.side1 = exports.side = exports.dotN = exports.dot5 = exports.dot4 = exports.dot3 = exports.dot2 = exports.dot1 = exports.dot = exports.lte = exports.lt = exports.gte = exports.gt = exports.ne = exports.eq = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _index = require('./index');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var noop = function noop(_) {};
var oPro = Object.prototype;
var hasOwn = oPro.hasOwnProperty;

var eq = exports.eq = function eq(x) {
    return function (y) {
        return x === y;
    };
};
var ne = exports.ne = function ne(x) {
    return function (y) {
        return x !== y;
    };
};
var gt = exports.gt = function gt(m) {
    return function (n) {
        return n > m;
    };
};
var gte = exports.gte = function gte(m) {
    return function (n) {
        return n >= m;
    };
};
var lt = exports.lt = function lt(m) {
    return function (n) {
        return n < m;
    };
};
var lte = exports.lte = function lte(m) {
    return function (n) {
        return n <= m;
    };
};

var dot = exports.dot = function dot(prop) {
    return function (o) {
        return o[prop]();
    };
};

var dot1 = exports.dot1 = function dot1(prop) {
    return function (val) {
        return function (o) {
            return o[prop](val);
        };
    };
};
var dot2 = exports.dot2 = function dot2(prop) {
    return function (val1) {
        return function (val2) {
            return function (o) {
                return o[prop](val1, val2);
            };
        };
    };
};
var dot3 = exports.dot3 = function dot3(prop) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (o) {
                    return o[prop](val1, val2, val3);
                };
            };
        };
    };
};
var dot4 = exports.dot4 = function dot4(prop) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (val4) {
                    return function (o) {
                        return o[prop](val1, val2, val3, val4);
                    };
                };
            };
        };
    };
};
var dot5 = exports.dot5 = function dot5(prop) {
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
var dotN = exports.dotN = function dotN(prop) {
    return function (vs) {
        return function (o) {
            return o[prop].apply(o, _toConsumableArray(vs));
        };
    };
};

var side = exports.side = function side(prop) {
    return function (o) {
        return dot(prop)(o), o;
    };
};
var side1 = exports.side1 = function side1(prop) {
    return function (val1) {
        return function (o) {
            return dot1(prop)(val1)(o), o;
        };
    };
};
var side2 = exports.side2 = function side2(prop) {
    return function (val1) {
        return function (val2) {
            return function (o) {
                return dot2(prop)(val1)(val2)(o), o;
            };
        };
    };
};
var side3 = exports.side3 = function side3(prop) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (o) {
                    return dot3(prop)(val1)(val2)(val3)(o), o;
                };
            };
        };
    };
};
var side4 = exports.side4 = function side4(prop) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (val4) {
                    return function (o) {
                        return dot4(prop)(val1)(val2)(val3)(val4)(o), o;
                    };
                };
            };
        };
    };
};
var side5 = exports.side5 = function side5(prop) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (val4) {
                    return function (val5) {
                        return function (o) {
                            return dot5(prop)(val1)(val2)(val3)(val4)(val5)(o), o;
                        };
                    };
                };
            };
        };
    };
};

var sideN = exports.sideN = function sideN(prop) {
    return function (vs) {
        return function (o) {
            return dotN(prop)(vs)(o), o;
        };
    };
};

var ifPredicate = exports.ifPredicate = function ifPredicate(f) {
    return function (yes) {
        return function (no) {
            return function (x) {
                return f(x) === true ? yes(x) : no(x);
            };
        };
    };
};
var whenPredicate = exports.whenPredicate = function whenPredicate(f) {
    return function (yes) {
        return ifPredicate(f)(yes)(noop);
    };
};

var has = exports.has = function has(k) {
    return function (o) {
        return hasOwn.call(o, k);
    };
};
var hasIn = exports.hasIn = function hasIn(k) {
    return function (o) {
        return k in o;
    };
};
var ifHas = exports.ifHas = function ifHas(yes) {
    return function (no) {
        return function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                o = _ref2[0],
                k = _ref2[1];

            return has(k)(o) ? yes(o[k], o, k) : no(o, k);
        };
    };
};
var whenHas = exports.whenHas = function whenHas(yes) {
    return ifHas(yes)(noop);
};
var ifHasIn = exports.ifHasIn = function ifHasIn(yes) {
    return function (no) {
        return function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                o = _ref4[0],
                k = _ref4[1];

            return hasIn(k)(o) ? yes(o[k], o, k) : no(o, k);
        };
    };
};
var whenHasIn = exports.whenHasIn = function whenHasIn(yes) {
    return ifHasIn(yes)(noop);
};

var bind = exports.bind = function bind(o) {
    return function (prop) {
        return o[prop].bind(o);
    };
};

var isType = exports.isType = function isType(t) {
    return function (x) {
        var str = oPro.toString.call(x);
        return str.slice(8, -1) === t;
    };
};

// --- beware point-free (circular).
var whenFunction = function whenFunction(yes, o) {
    return whenPredicate(_index.isFunction)(yes)(o);
};

// --- returns undefined if o[prop] is not a function.
var bindTry = exports.bindTry = function bindTry(o) {
    return function (prop) {
        return whenFunction(function (_) {
            return bind(o)(prop);
        }, o[prop]);
    };
};

var ifBind = exports.ifBind = function ifBind(yes) {
    return function (no) {
        return function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
                o = _ref6[0],
                k = _ref6[1];

            var bound = bindTry(o)(k);
            return (0, _index.ok)(bound) ? yes(bound) : no();
        };
    };
};

var whenBind = exports.whenBind = function whenBind(yes) {
    return ifBind(yes)(noop);
};

// ------ cond

// --- different from ramda:
// brackets
// piping
// otherwise

/*

condo (
  [_ => 3 == 4, _ => 'twilight zone'],
  [_ => 3 == 5, _ => 'even stranger'],
  [null, _ => 'ok'],
)

or with a native idiom:

condo (
  (_ => 3 == 4) | guard (_ => 'twilight zone'),
  (_ => 3 == 5) | guard (_ => 'even stranger'),
  otherwise     | guard (_ => 'ok'),
)

guardA is a convenience for a guard which returns a simple expression, so guard (_ => 'twilight zone')
could be replaced by guardA ('twilight zone')

*/

var condPredicate = exports.condPredicate = function condPredicate(exec) {
    return function (pred) {
        return [pred, exec];
    };
};

// --- we test on truthiness, not strict.
// --- this feels more natural -- like how if works, and also cond in ramda.
// trivial to convert to strict.
var condo = exports.condo = function condo() {
    for (var _len = arguments.length, blocks = Array(_len), _key = 0; _key < _len; _key++) {
        blocks[_key] = arguments[_key];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = blocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                test = _step$value[0],
                exec = _step$value[1];

            var result = test();
            if (result) return exec(result);
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

var condO = exports.condO = function condO(blocks) {
    return function (target) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = blocks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _step2$value = _slicedToArray(_step2.value, 2),
                    test = _step2$value[0],
                    exec = _step2$value[1];

                var result = test(target);
                if (result) return exec(target, result);
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
    };
};

var add = exports.add = function add(m) {
    return function (n) {
        return m + n;
    };
};
var multiply = exports.multiply = function multiply(m) {
    return function (n) {
        return m * n;
    };
};
var divideBy = exports.divideBy = function divideBy(m) {
    return function (n) {
        return n / m;
    };
};
var divideInto = exports.divideInto = function divideInto(m) {
    return function (n) {
        return m / n;
    };
};
var subtract = exports.subtract = function subtract(m) {
    return function (n) {
        return n - m;
    };
};
var subtractFrom = exports.subtractFrom = function subtractFrom(m) {
    return function (n) {
        return m - n;
    };
};
var modulo = exports.modulo = function modulo(m) {
    return function (n) {
        return n % m;
    };
};
var moduloWholePart = exports.moduloWholePart = function moduloWholePart(m) {
    return function (n) {
        var div = n / m;
        var flo = Math.floor(div);
        return div < 0 ? 1 + flo : flo;
    };
};
var toThe = exports.toThe = function toThe(e) {
    return function (b) {
        return Math.pow(b, e);
    };
};

// ------ exceptions

var tryCatch = exports.tryCatch = function tryCatch(good) {
    return function (bad) {
        return function (f) {
            var successVal = void 0;
            try {
                successVal = f();
            } catch (e) {
                return bad(e);
            }
            return good(successVal);
        };
    };
};

var decorateException = exports.decorateException = function decorateException(prefix) {
    return function (e) {
        var msg = [prefix];
        (0, _index.whenOk)(function (m) {
            return msg.push(m);
        })(e.message);
        e.message = msg.join(' ');
        return e;
    };
};

var defaultTo = exports.defaultTo = function defaultTo(f) {
    return function (x) {
        return (0, _index.ok)(x) ? x : f();
    };
};
var assocM = exports.assocM = function assocM(prop) {
    return function (val) {
        return function (o) {
            return o[prop] = val, o;
        };
    };
};

var appendFrom = exports.appendFrom = function appendFrom(elem) {
    return function (ary) {
        return [].concat(_toConsumableArray(ary), [elem]);
    };
};
var appendTo = exports.appendTo = function appendTo(ary) {
    return function (elem) {
        return [].concat(_toConsumableArray(ary), [elem]);
    };
};

var appendToM = exports.appendToM = function appendToM(tgt) {
    return function (src) {
        return tgt.push(src), tgt;
    };
};
var appendFromM = exports.appendFromM = function appendFromM(src) {
    return function (tgt) {
        return tgt.push(src), tgt;
    };
};
var prependTo = exports.prependTo = function prependTo(ary) {
    return function (elem) {
        return [elem].concat(_toConsumableArray(ary));
    };
};
var prependFrom = exports.prependFrom = function prependFrom(elem) {
    return function (ary) {
        return [elem].concat(_toConsumableArray(ary));
    };
};
var prependFromM = exports.prependFromM = function prependFromM(src) {
    return function (tgt) {
        return tgt.unshift(src), tgt;
    };
};
var prependToM = exports.prependToM = function prependToM(tgt) {
    return function (src) {
        return tgt.unshift(src), tgt;
    };
};

var concatTo = exports.concatTo = function concatTo(tgt) {
    return function (src) {
        return tgt.concat(src);
    };
};
var concatFrom = exports.concatFrom = function concatFrom(src) {
    return function (tgt) {
        return tgt.concat(src);
    };
};
var concatToM = exports.concatToM = function concatToM(tgt) {
    return function (src) {
        return tgt.push.apply(tgt, _toConsumableArray(src)), tgt;
    };
};
var concatFromM = exports.concatFromM = function concatFromM(src) {
    return function (tgt) {
        return tgt.push.apply(tgt, _toConsumableArray(src)), tgt;
    };
};

// --- these seem to be much faster than Object.assign -- why?
// @profile
var mergeToM = exports.mergeToM = function mergeToM(tgt) {
    return function (src) {
        for (var i in src) {
            if (oPro.hasOwnProperty.call(src, i)) tgt[i] = src[i];
        }return tgt;
    };
};

var mergeFromM = exports.mergeFromM = function mergeFromM(src) {
    return function (tgt) {
        for (var i in src) {
            if (oPro.hasOwnProperty.call(src, i)) tgt[i] = src[i];
        }return tgt;
    };
};

var mergeTo = exports.mergeTo = function mergeTo(tgt) {
    return function (src) {
        var a = mergeToM({})(tgt);
        return mergeToM(a)(src);
    };
};

var mergeFrom = exports.mergeFrom = function mergeFrom(src) {
    return function (tgt) {
        var a = mergeToM({})(tgt);
        return mergeToM(a)(src);
    };
};

var mergeToWithM = exports.mergeToWithM = function mergeToWithM(collision) {
    return function (tgt) {
        return function (src) {
            var ret = tgt;

            var _loop = function _loop(i) {
                whenHas(function (v, o, k) {
                    return ifHas(function (v, o, k) {
                        return ret[i] = collision(ret[i], src[i]);
                    })(function (o, k) {
                        return ret[i] = src[i];
                    })([ret, i]);
                })([src, i]);
            };

            for (var i in src) {
                _loop(i);
            }return ret;
        };
    };
};

var mergeFromWithM = exports.mergeFromWithM = function mergeFromWithM(collision) {
    return function (src) {
        return function (tgt) {
            return mergeToWithM(collision)(tgt)(src);
        };
    };
};

// --- @test
var mergeToWhenOkM = exports.mergeToWhenOkM = function mergeToWhenOkM(tgt) {
    return function (src) {
        for (var i in src) {
            if (hasOwn.call(src, i) && (0, _index.ok)(src[i])) tgt[i] = src[i];
        }return tgt;
    };
};

// --- @test
var mergeFromWhenOkM = exports.mergeFromWhenOkM = function mergeFromWhenOkM(src) {
    return function (tgt) {
        return mergeToWhenOkM(tgt)(src);
    };
};

var mergeToInM = exports.mergeToInM = function mergeToInM(tgt) {
    return function (src) {
        for (var i in src) {
            tgt[i] = src[i];
        }return tgt;
    };
};

var mergeFromInM = exports.mergeFromInM = function mergeFromInM(src) {
    return function (tgt) {
        return mergeToInM(tgt)(src);
    };
};

var mergeToIn = exports.mergeToIn = function mergeToIn(tgt) {
    return function (src) {
        var a = mergeToInM({})(tgt);
        return mergeToInM(a)(src);
    };
};
var mergeFromIn = exports.mergeFromIn = function mergeFromIn(src) {
    return function (tgt) {
        return mergeToIn(tgt)(src);
    };
};

var map = exports.map = function map(f) {
    return function (ary) {
        return ary.map(function (x) {
            return f(x);
        });
    };
};
var each = exports.each = function each(f) {
    return function (ary) {
        return ary.forEach(function (x) {
            return f(x);
        });
    };
};

// --- returns obj
var eachObj = exports.eachObj = function eachObj(f) {
    return function (o) {
        for (var k in o) {
            if (hasOwn.call(o, k)) f(o[k], k);
        }return o;
    };
};

// --- returns obj
var eachObjIn = exports.eachObjIn = function eachObjIn(f) {
    return function (o) {
        for (var k in o) {
            f(o[k], k);
        }return o;
    };
};

// --- works on lists & objects
var addIndex = exports.addIndex = function addIndex(orig) {
    return function (f) {
        return function (ary) {
            var idx = -1;
            var g = function g() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                return f.apply(undefined, args.concat([++idx]));
            };
            return orig(g)(ary);
        };
    };
};

// --- works on lists & objects
var addCollection = exports.addCollection = function addCollection(orig) {
    return function (f) {
        return function (ary) {
            var g = function g() {
                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args[_key3] = arguments[_key3];
                }

                return f.apply(undefined, args.concat([ary]));
            };
            return orig(g)(ary);
        };
    };
};

// --- @canonical
/*
export const ampersand = (fs) => (x) => fs | laatsO ([
    _ => f => f (x),
    (fs, mapper) => fs | map (mapper),
])
*/

var ampersand = exports.ampersand = function ampersand(fs) {
    return function (x) {
        var mapper = function mapper(f) {
            return f(x);
        };
        return map(mapper)(fs);
    };
};

var asterisk = exports.asterisk = function asterisk(fs) {
    return function (xs) {
        var ret = [];
        var i = -1;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = fs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var f = _step3.value;

                var x = xs[++i];
                ret.push(f(x));
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        return ret;
    };
};

/*
export const asterisk = curry ((fs, xs) => xs
    | zip (fs)
    | map (([f, x]) => f (x))
)
*/

// ------ laat / let

var laat = exports.laat = function laat(xs) {
    return function (f) {
        return f.apply(null, xs);
    };
};

// ------ call/provide

var callOn = exports.callOn = function callOn(o) {
    return function (f) {
        return f.call(o);
    };
};
var callOn1 = exports.callOn1 = function callOn1(o) {
    return function (val1) {
        return function (f) {
            return f.call(o, val1);
        };
    };
};
var callOn2 = exports.callOn2 = function callOn2(o) {
    return function (val1) {
        return function (val2) {
            return function (f) {
                return f.call(o, val1, val2);
            };
        };
    };
};
var callOn3 = exports.callOn3 = function callOn3(o) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (f) {
                    return f.call(o, val1, val2, val3);
                };
            };
        };
    };
};
var callOn4 = exports.callOn4 = function callOn4(o) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (val4) {
                    return function (f) {
                        return f.call(o, val1, val2, val3, val4);
                    };
                };
            };
        };
    };
};
var callOn5 = exports.callOn5 = function callOn5(o) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (val4) {
                    return function (val5) {
                        return function (f) {
                            return f.call(o, val1, val2, val3, val4, val5);
                        };
                    };
                };
            };
        };
    };
};
var callOnN = exports.callOnN = function callOnN(o) {
    return function (vs) {
        return function (f) {
            return f.apply(o, vs);
        };
    };
};

var provideTo = exports.provideTo = function provideTo(f) {
    return function (o) {
        return f.call(o);
    };
};
var provideTo1 = exports.provideTo1 = function provideTo1(f) {
    return function (val) {
        return function (o) {
            return f.call(o, val);
        };
    };
};
var provideTo2 = exports.provideTo2 = function provideTo2(f) {
    return function (val1) {
        return function (val2) {
            return function (o) {
                return f.call(o, val1, val2);
            };
        };
    };
};
var provideTo3 = exports.provideTo3 = function provideTo3(f) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (o) {
                    return f.call(o, val1, val2, val3);
                };
            };
        };
    };
};
var provideTo4 = exports.provideTo4 = function provideTo4(f) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (val4) {
                    return function (o) {
                        return f.call(o, val1, val2, val3, val4);
                    };
                };
            };
        };
    };
};
var provideTo5 = exports.provideTo5 = function provideTo5(f) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (val4) {
                    return function (val5) {
                        return function (o) {
                            return f.call(o, val1, val2, val3, val4, val5);
                        };
                    };
                };
            };
        };
    };
};
var provideToN = exports.provideToN = function provideToN(f) {
    return function (vs) {
        return function (o) {
            return f.apply(o, vs);
        };
    };
};

var applyTo1 = exports.applyTo1 = function applyTo1(val1) {
    return function (f) {
        return f(val1);
    };
};
var applyTo2 = exports.applyTo2 = function applyTo2(val1) {
    return function (val2) {
        return function (f) {
            return f(val1, val2);
        };
    };
};
var applyTo3 = exports.applyTo3 = function applyTo3(val1) {
    return function (val2) {
        return function (val3) {
            return function (f) {
                return f(val1, val2, val3);
            };
        };
    };
};
var applyTo4 = exports.applyTo4 = function applyTo4(val1) {
    return function (val2) {
        return function (val3) {
            return function (val4) {
                return function (f) {
                    return f(val1, val2, val3, val4);
                };
            };
        };
    };
};
var applyTo5 = exports.applyTo5 = function applyTo5(val1) {
    return function (val2) {
        return function (val3) {
            return function (val4) {
                return function (val5) {
                    return function (f) {
                        return f(val1, val2, val3, val4, val5);
                    };
                };
            };
        };
    };
};
var applyToN = exports.applyToN = function applyToN(vs) {
    return function (f) {
        return f.apply(null, vs);
    };
};

var passTo = exports.passTo = function passTo(f) {
    return function (val) {
        return f(val);
    };
};
var passToN = exports.passToN = function passToN(f) {
    return function (vs) {
        return f.apply(null, vs);
    };
};

exports.default = {
    eq: eq, ne: ne, gt: gt, gte: gte, lt: lt, lte: lte,
    dot: dot, dot1: dot1, dot2: dot2, dot3: dot3, dot4: dot4, dot5: dot5, dotN: dotN,
    side: side, side1: side1, side2: side2, side3: side3, side4: side4, side5: side5, sideN: sideN,
    ifPredicate: ifPredicate, whenPredicate: whenPredicate,
    has: has, hasIn: hasIn,
    ifHas: ifHas, ifHasIn: ifHasIn,
    whenHas: whenHas, whenHasIn: whenHasIn,
    bind: bind,
    ifBind: ifBind, whenBind: whenBind,
    bindTry: bindTry,
    isType: isType,
    condPredicate: condPredicate, condo: condo, condO: condO,
    subtract: subtract, subtractFrom: subtractFrom,
    add: add,
    multiply: multiply, divideBy: divideBy, divideInto: divideInto,
    modulo: modulo, moduloWholePart: moduloWholePart,
    toThe: toThe,
    tryCatch: tryCatch, decorateException: decorateException,
    defaultTo: defaultTo,
    assocM: assocM,
    appendFrom: appendFrom, appendTo: appendTo, appendToM: appendToM, appendFromM: appendFromM,
    prependTo: prependTo, prependFrom: prependFrom, prependToM: prependToM, prependFromM: prependFromM,
    concatTo: concatTo, concatFrom: concatFrom, concatToM: concatToM, concatFromM: concatFromM,
    mergeTo: mergeTo, mergeFrom: mergeFrom, mergeToM: mergeToM, mergeFromM: mergeFromM,
    mergeToWithM: mergeToWithM, mergeFromWithM: mergeFromWithM,
    mergeToWhenOkM: mergeToWhenOkM, mergeFromWhenOkM: mergeFromWhenOkM,
    mergeToInM: mergeToInM, mergeFromInM: mergeFromInM, mergeToIn: mergeToIn, mergeFromIn: mergeFromIn,
    addIndex: addIndex, addCollection: addCollection,
    map: map, each: each, eachObj: eachObj, eachObjIn: eachObjIn,
    ampersand: ampersand, asterisk: asterisk,
    laat: laat,
    callOn: callOn, callOn1: callOn1, callOn2: callOn2, callOn3: callOn3, callOn4: callOn4, callOn5: callOn5, callOnN: callOnN,
    provideTo: provideTo, provideTo1: provideTo1, provideTo2: provideTo2, provideTo3: provideTo3, provideTo4: provideTo4, provideTo5: provideTo5, provideToN: provideToN,
    applyTo1: applyTo1, applyTo2: applyTo2, applyTo3: applyTo3, applyTo4: applyTo4, applyTo5: applyTo5, applyToN: applyToN,
    passTo: passTo, passToN: passToN
};