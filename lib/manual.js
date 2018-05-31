'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mixinNM = exports.mixinPreNM = exports.mixinM = exports.mixinPreM = exports.factoryInit = exports.factoryProps = exports.ifXReplaceStrFlags = exports.ifXReplaceStr = exports.ifXReplace = exports.xReplaceStrFlags = exports.xReplaceStr = exports.xReplace = exports.xMatchStrFlags = exports.xMatchStr = exports.xMatch = exports.xMatchGlobal = exports.match = exports.neuN = exports.neu5 = exports.neu4 = exports.neu3 = exports.neu2 = exports.neu1 = exports.rangeToBy = exports.rangeFromByDesc = exports.rangeFromByAsc = exports.rangeFromBy = exports.ifReplace = exports.timesSide = exports.timesF = exports.timesV = exports.repeatSide = exports.repeatF = exports.repeatV = exports.sprintfN = exports.sprintf1 = exports.flip5 = exports.flip4 = exports.flip3 = exports.flip = exports.split = exports.join = exports.passToN = exports.passTo = exports.applyToN = exports.applyTo5 = exports.applyTo4 = exports.applyTo3 = exports.applyTo2 = exports.applyTo1 = exports.provideToN = exports.provideTo5 = exports.provideTo4 = exports.provideTo3 = exports.provideTo2 = exports.provideTo1 = exports.provideTo = exports.callOnN = exports.callOn5 = exports.callOn4 = exports.callOn3 = exports.callOn2 = exports.callOn1 = exports.callOn = exports.letS = exports.letNV = exports.asterisk5 = exports.asterisk4 = exports.asterisk3 = exports.asterisk2 = exports.asterisk1 = exports.asteriskN = exports.ampersandN = exports.reduceObjIn = exports.reduceObj = exports.addCollection = exports.addIndex = exports.eachObjIn = exports.eachObj = exports.reduceAbort = exports.contains = undefined;
exports.find = exports.reject = exports.filter = exports.reduce = exports.each = exports.map = exports.mergeWhen = exports.mergeWith = exports.mergeIn = exports.mergeInTo = exports.mergeInM = exports.mergeInToM = exports.merge = exports.mergeTo = exports.mergeM = exports.mergeToM = exports.concatM = exports.concatToM = exports.concat = exports.concatTo = exports.prependToM = exports.prependM = exports.prepend = exports.prependTo = exports.appendM = exports.appendToM = exports.appendTo = exports.append = exports.updatePath = exports.updatePathM = exports.update = exports.updateM = exports.assocPathM = exports.assocPath = exports.assocM = exports.assoc = exports.path = exports.propOf = exports.prop = exports.defaultTo = exports.decorateException = exports.tryCatch = exports.toThe = exports.moduloWholePart = exports.modulo = exports.subtractFrom = exports.subtract = exports.divideInto = exports.divideBy = exports.multiply = exports.add = exports.condS = exports.cond = exports.condPredicate = exports.whenBind = exports.ifBind = exports.bindTry = exports.bindTryTo = exports.bindTryProp = exports.bindTryPropTo = exports.isType = exports.bind = exports.bindTo = exports.bindProp = exports.bindPropTo = exports.bindLateProp = exports.bindLatePropTo = exports.whenHasIn = exports.ifHasIn = exports.whenHas = exports.ifHas = exports.hasIn = exports.has = exports.whenPredicateOk = exports.ifPredicateOk = exports.whenPredicate = exports.ifPredicate = exports.sideN = exports.side5 = exports.side4 = exports.side3 = exports.side2 = exports.side1 = exports.side = exports.dotN = exports.dot5 = exports.dot4 = exports.dot3 = exports.dot2 = exports.dot1 = exports.dot = exports.tap = exports.lte = exports.lt = exports.gte = exports.gt = exports.ne = exports.eq = exports.recurry = exports.roll = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _sprintfJs = require('sprintf-js');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // --- as a general guideline we try to keep the functions here as fast as possible.
//     this means a lot of inlining and duplication, but stopping before it gets unmaintainable.

var noop = function noop(_) {};
var _ref = {},
    hasOwn = _ref.hasOwnProperty;
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

var recurry = exports.recurry = function recurry(n) {
    return function (f) {
        return function () {
            var rolled = roll(f).apply(undefined, arguments);
            var dn = n - arguments.length;
            return dn <= 1 ? rolled : recurry(dn)(rolled);
        };
    };
};

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

var tap = exports.tap = function tap(f) {
    return function (o) {
        return f(o), o;
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
                return f(x) ? yes(x) : no(x);
            };
        };
    };
};
var whenPredicate = exports.whenPredicate = function whenPredicate(f) {
    return function (yes) {
        return ifPredicate(f)(yes)(noop);
    };
};

// --- passes the *result* of the predicate test to the yes/no functions instead of passing `x`.
var ifPredicateOk = exports.ifPredicateOk = function ifPredicateOk(f) {
    return function (yes) {
        return function (no) {
            return function (x) {
                var p = f(x);
                return (0, _index.ok)(p) ? yes(p) : no(p);
            };
        };
    };
};
var whenPredicateOk = exports.whenPredicateOk = function whenPredicateOk(f) {
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
        return function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                o = _ref3[0],
                k = _ref3[1];

            return has(k)(o) ? yes(o[k], o, k) : no(o, k);
        };
    };
};
var whenHas = exports.whenHas = function whenHas(yes) {
    return ifHas(yes)(noop);
};
var ifHasIn = exports.ifHasIn = function ifHasIn(yes) {
    return function (no) {
        return function (_ref4) {
            var _ref5 = _slicedToArray(_ref4, 2),
                o = _ref5[0],
                k = _ref5[1];

            return hasIn(k)(o) ? yes(o[k], o, k) : no(o, k);
        };
    };
};
var whenHasIn = exports.whenHasIn = function whenHasIn(yes) {
    return ifHasIn(yes)(noop);
};

var bindLatePropTo = exports.bindLatePropTo = function bindLatePropTo(o) {
    return function (prop) {
        return function () {
            return o[prop].apply(o, arguments);
        };
    };
};
var bindLateProp = exports.bindLateProp = function bindLateProp(prop) {
    return function (o) {
        return function () {
            return o[prop].apply(o, arguments);
        };
    };
};

var bindPropTo = exports.bindPropTo = function bindPropTo(o) {
    return function (prop) {
        return o[prop].bind(o);
    };
};
var bindProp = exports.bindProp = function bindProp(prop) {
    return function (o) {
        return o[prop].bind(o);
    };
};
var bindTo = exports.bindTo = function bindTo(o) {
    return function (f) {
        return f.bind(o);
    };
};
var bind = exports.bind = function bind(f) {
    return function (o) {
        return f.bind(o);
    };
};

var isType = exports.isType = function isType(t) {
    return function (x) {
        return (0, _index.getType)(x) === t;
    };
};

// --- bindTry* returns `null` if o[prop] is not a function.
var bindTryPropTo = exports.bindTryPropTo = function bindTryPropTo(o) {
    return function (prop) {
        return typeof o[prop] === 'function' ? bindPropTo(o)(prop) : null;
    };
};

var bindTryProp = exports.bindTryProp = function bindTryProp(prop) {
    return function (o) {
        return typeof o[prop] === 'function' ? bindPropTo(o)(prop) : null;
    };
};

var bindTryTo = exports.bindTryTo = function bindTryTo(o) {
    return function (f) {
        return typeof f === 'function' ? bindTo(o)(f) : null;
    };
};

var bindTry = exports.bindTry = function bindTry(f) {
    return function (o) {
        return typeof f === 'function' ? bindTo(o)(f) : null;
    };
};

var ifBind = exports.ifBind = function ifBind(trier) {
    return ifPredicateOk(passToN(trier));
};
var whenBind = exports.whenBind = function whenBind(trier) {
    return function (yes) {
        return ifBind(trier)(yes)(noop);
    };
};

// ------ cond

// --- different from ramda:
// brackets
// piping
// otherwise

/*

cond (
  [_ => 3 == 4, _ => 'twilight zone'],
  [_ => 3 == 5, _ => 'even stranger'],
  [null, _ => 'ok'],
)

or with a native idiom:

cond (
  (_ => 3 == 4) | guard (_ => 'twilight zone'),
  (_ => 3 == 5) | guard (_ => 'even stranger'),
  otherwise     | guard (_ => 'ok'),
)

guardV is a convenience for a guard which returns a simple expression, so guard (_ => 'twilight zone')
could be replaced by guardV ('twilight zone')

*/

var condPredicate = exports.condPredicate = function condPredicate(exec) {
    return function (pred) {
        return [pred, exec];
    };
};

// --- we test on truthiness, not strict.
// --- this feels more natural -- like how if works, and also cond in ramda.
// trivial to convert to strict.
var cond = exports.cond = function cond() {
    for (var _len2 = arguments.length, blocks = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        blocks[_key2] = arguments[_key2];
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = blocks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _ref6 = _step2.value;

            var _ref7 = _slicedToArray(_ref6, 2);

            var test = _ref7[0];
            var exec = _ref7[1];

            var result = test();
            if (result) return exec(result);
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

var condS = exports.condS = function condS(blocks) {
    return function (target) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = blocks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _ref8 = _step3.value;

                var _ref9 = _slicedToArray(_ref8, 2);

                var test = _ref9[0];
                var exec = _ref9[1];

                var result = test(target);
                if (result) return exec(target, result);
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

// --- object stuff.

var prop = exports.prop = function prop(p) {
    return function (o) {
        return o[p];
    };
};
var propOf = exports.propOf = function propOf(o) {
    return function (p) {
        return o[p];
    };
};

var path = exports.path = function path(xs) {
    return function (o) {
        var j = o;
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = xs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var i = _step4.value;
                if (!(0, _index.ok)(j)) return j;else j = j[i];
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        return j;
    };
};

var assoc = exports.assoc = function assoc(prop) {
    return function (val) {
        return function (o) {
            var oo = mergeInM(o)({});
            oo[prop] = val;
            return oo;
        };
    };
};

var assocM = exports.assocM = function assocM(prop) {
    return function (val) {
        return function (o) {
            return o[prop] = val, o;
        };
    };
};

var assocPath = exports.assocPath = function assocPath(xs) {
    return function (x) {
        return function (o) {
            return assocPathM(xs)(x)(mergeInM(o)({}));
        };
    };
};

var assocPathM = exports.assocPathM = function assocPathM(xs) {
    return function (x) {
        return function (o) {
            var reducer = function reducer(ptr, pat, el) {
                if (!(0, _index.ok)(pat)) return [ptr, el];
                var pp = ptr[pat];
                var ppp = (0, _index.isArray)(pp) || (0, _index.isObject)(pp) ? pp : ptr[pat] = {};
                return [ppp, el];
            };

            var _xs$reduce = xs.reduce(function (_ref10, x) {
                var _ref11 = _slicedToArray(_ref10, 2),
                    p = _ref11[0],
                    s = _ref11[1];

                return reducer(p, s, x);
            }, [o, null]),
                _xs$reduce2 = _slicedToArray(_xs$reduce, 2),
                ptr = _xs$reduce2[0],
                pat = _xs$reduce2[1];

            ptr[pat] = x;
            return o;
        };
    };
};

// --- no 'in' forms: always flatten, like assoc.
var updateM = exports.updateM = function updateM(prop) {
    return function (f) {
        return function (o) {
            return o[prop] = f(o[prop]), o;
        };
    };
};
var update = exports.update = function update(prop) {
    return function (f) {
        return function (o) {
            var oo = merge(o)({});
            oo[prop] = f(o[prop]);
            return oo;
        };
    };
};

// --- if at some point these no longer route through path and assocPath/M, then unit tests need to
// be fleshed out.
var updatePathM = exports.updatePathM = function updatePathM(xs) {
    return function (f) {
        return function (o) {
            var x = path(xs)(o);
            return assocPathM(xs)(f(x))(o);
        };
    };
};

var updatePath = exports.updatePath = function updatePath(xs) {
    return function (f) {
        return function (o) {
            var x = path(xs)(o);
            return assocPath(xs)(f(x))(o);
        };
    };
};

var append = exports.append = function append(elem) {
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
var appendM = exports.appendM = function appendM(src) {
    return function (tgt) {
        return tgt.push(src), tgt;
    };
};
var prependTo = exports.prependTo = function prependTo(ary) {
    return function (elem) {
        return [elem].concat(_toConsumableArray(ary));
    };
};
var prepend = exports.prepend = function prepend(elem) {
    return function (ary) {
        return [elem].concat(_toConsumableArray(ary));
    };
};
var prependM = exports.prependM = function prependM(src) {
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
var concat = exports.concat = function concat(src) {
    return function (tgt) {
        return tgt.concat(src);
    };
};
var concatToM = exports.concatToM = function concatToM(tgt) {
    return function (src) {
        return tgt.push.apply(tgt, _toConsumableArray(src)), tgt;
    };
};
var concatM = exports.concatM = function concatM(src) {
    return function (tgt) {
        return tgt.push.apply(tgt, _toConsumableArray(src)), tgt;
    };
};

// --- these seem to be much faster than Object.assign.
// @profile

var mergeToM = exports.mergeToM = function mergeToM(tgt) {
    return function (src) {
        for (var i in src) {
            if (hasOwn.call(src, i)) tgt[i] = src[i];
        }return tgt;
    };
};

var mergeM = exports.mergeM = function mergeM(src) {
    return function (tgt) {
        for (var i in src) {
            if (hasOwn.call(src, i)) tgt[i] = src[i];
        }return tgt;
    };
};

var mergeTo = exports.mergeTo = function mergeTo(tgt) {
    return function (src) {
        var a = mergeToM({})(tgt);
        return mergeToM(a)(src);
    };
};

var merge = exports.merge = function merge(src) {
    return function (tgt) {
        var a = mergeToM({})(tgt);
        return mergeToM(a)(src);
    };
};

var mergeInToM = exports.mergeInToM = function mergeInToM(tgt) {
    return function (src) {
        for (var i in src) {
            tgt[i] = src[i];
        }return tgt;
    };
};

var mergeInM = exports.mergeInM = function mergeInM(src) {
    return function (tgt) {
        return mergeInToM(tgt)(src);
    };
};

var mergeInTo = exports.mergeInTo = function mergeInTo(tgt) {
    return function (src) {
        var a = mergeInToM({})(tgt);
        return mergeInToM(a)(src);
    };
};
var mergeIn = exports.mergeIn = function mergeIn(src) {
    return function (tgt) {
        return mergeInTo(tgt)(src);
    };
};

var getMergeX = function getMergeX(pluck) {
    return function (mergerSym) {
        return (0, _index.ifOk)(pluck)(function (_) {
            return (0, _index.die)((0, _sprintfJs.sprintf)('No merge function for symbol "%s"'));
        })(merges()[mergerSym]);
    };
};

// --- throw on failure.
var getMergeFunction = getMergeX(function (_ref12) {
    var f = _ref12.f;
    return f;
});
var getMergeInfo = getMergeX(function (_ref13) {
    var to = _ref13.to,
        mut = _ref13.mut,
        own = _ref13.own;
    return { to: to, mut: mut, own: own };
});

var merges = function merges(_) {
    var _ref14;

    return _ref14 = {}, _defineProperty(_ref14, _index.mergeToMSym, {
        f: mergeToM,
        to: true,
        mut: true,
        own: true
    }), _defineProperty(_ref14, _index.mergeToSym, {
        f: mergeTo,
        to: true,
        mut: false,
        own: true
    }), _defineProperty(_ref14, _index.mergeMSym, {
        f: mergeM,
        to: false,
        mut: true,
        own: true
    }), _defineProperty(_ref14, _index.mergeSym, {
        f: merge,
        to: false,
        mut: false,
        own: true
    }), _defineProperty(_ref14, _index.mergeInToMSym, {
        f: mergeInToM,
        to: true,
        mut: true,
        own: false
    }), _defineProperty(_ref14, _index.mergeInToSym, {
        f: mergeInTo,
        to: true,
        mut: false,
        own: false
    }), _defineProperty(_ref14, _index.mergeInMSym, {
        f: mergeInM,
        to: false,
        mut: true,
        own: false
    }), _defineProperty(_ref14, _index.mergeInSym, {
        f: mergeIn,
        to: false,
        mut: false,
        own: false
    }), _ref14;
};

// --- tgt will be altered.
// only `own` needs to be passed: direction and mutability have already been decided.
//
// in the M case tgt is just the tgt;
// in the non-M case it has been prepared to be a new copy.
//
// `own` refers to both tgt & src -- not possible to mix and match.

// --- a performance hit is acceptable here.
var mergeXWith = function mergeXWith(collision) {
    return function (own) {
        return function (src) {
            return function (tgt) {
                var _ref15 = own ? [whenHas, ifHas] : [whenHasIn, ifHasIn],
                    _ref16 = _slicedToArray(_ref15, 2),
                    _whenHas = _ref16[0],
                    _ifHas = _ref16[1];

                var _loop = function _loop(i) {
                    _whenHas(function (v, o, k) {
                        return _ifHas(function (v, o, k) {
                            return tgt[i] = collision(src[i], tgt[i]);
                        })(function (o, k) {
                            return tgt[i] = src[i];
                        })([tgt, i]);
                    })([src, i]);
                };

                for (var i in src) {
                    _loop(i);
                }return tgt;
            };
        };
    };
};

var mergeWith = exports.mergeWith = function mergeWith(collision) {
    return function (mergerSym) {
        // --- fail early instead of continuing with curry (throws)
        var merger = getMergeFunction(mergerSym);
        return function (a) {
            return function (b) {
                var _getMergeInfo = getMergeInfo(mergerSym),
                    to = _getMergeInfo.to,
                    mut = _getMergeInfo.mut,
                    own = _getMergeInfo.own;

                var _ref17 = to ? [b, a] : [a, b],
                    _ref18 = _slicedToArray(_ref17, 2),
                    src = _ref18[0],
                    tgt = _ref18[1];

                var tgtM = mut ? tgt : to ? merger({})(tgt) : merger(tgt)({});
                return mergeXWith(collision)(own)(src)(tgtM);
            };
        };
    };
};

// --- like with 'with', mut and direction have already been arranged, and `tgt` will be mutated.
// --- tests `p` for truthiness.
var mergeXWhen = function mergeXWhen(p) {
    return function (own) {
        return function (src) {
            return function (tgt) {
                var checkHas = own ? hasOwn : _index.T;
                for (var i in src) {
                    if (checkHas.call(src, i) && p(src[i], tgt[i])) tgt[i] = src[i];
                }return tgt;
            };
        };
    };
};

// xxx mergeXWhen and mergeXWith should be one function. that way a double call can work.

var mergeWhen = exports.mergeWhen = function mergeWhen(p) {
    return function (mergerSym) {
        // --- fail early instead of continuing with curry (throws)
        var merger = getMergeFunction(mergerSym);
        return function (a) {
            return function (b) {
                var _getMergeInfo2 = getMergeInfo(mergerSym),
                    to = _getMergeInfo2.to,
                    mut = _getMergeInfo2.mut,
                    own = _getMergeInfo2.own;

                var _ref19 = to ? [b, a] : [a, b],
                    _ref20 = _slicedToArray(_ref19, 2),
                    src = _ref20[0],
                    tgt = _ref20[1];

                var tgtM = mut ? tgt : to ? merger({})(tgt) : merger(tgt)({});
                return mergeXWhen(p)(own)(src)(tgtM);
            };
        };
    };
};

// --- note: capped.
var map = exports.map = function map(f) {
    return function (xs) {
        return xs.map(function (x) {
            return f(x);
        });
    };
};
var each = exports.each = function each(f) {
    return function (xs) {
        return xs.forEach(function (x) {
            return f(x);
        });
    };
};

// @test
var reduce = exports.reduce = function reduce(f) {
    return function (acc) {
        return function (xs) {
            return xs.reduce(f, acc);
        };
    };
};
var filter = exports.filter = function filter(f) {
    return function (xs) {
        return xs.filter(function (x) {
            return f(x);
        });
    };
};
var reject = exports.reject = function reject(f) {
    return function (xs) {
        return xs.filter(function (x) {
            return !f(x);
        });
    };
};
var find = exports.find = function find(p) {
    return function (xs) {
        return xs.find(p);
    };
};

// @test
var contains = exports.contains = function contains(v) {
    return function (xs) {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = xs[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var x = _step5.value;
                if (x === v) return true;
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }

        return false;
    };
};

// @test
var reduceAbort = exports.reduceAbort = function reduceAbort(f) {
    return function (acc) {
        return function (abortVal) {
            return function (xs) {
                var acco = acc;
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = xs[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var x = _step6.value;

                        var g = f(acco, x);
                        if (g === abortVal) return abortVal;
                        acco = g;
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }

                return acco;
            };
        };
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
                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args[_key3] = arguments[_key3];
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
                for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                    args[_key4] = arguments[_key4];
                }

                return f.apply(undefined, args.concat([ary]));
            };
            return orig(g)(ary);
        };
    };
};

var reduceObj = exports.reduceObj = function reduceObj(f) {
    return function (acc) {
        return function (o) {
            var curAcc = acc;
            for (var k in o) {
                if (hasOwn.call(o, k)) curAcc = f(curAcc, [k, o[k]]);
            }return curAcc;
        };
    };
};

var reduceObjIn = exports.reduceObjIn = function reduceObjIn(f) {
    return function (acc) {
        return function (o) {
            var curAcc = acc;
            for (var k in o) {
                curAcc = f(curAcc, [k, o[k]]);
            }return curAcc;
        };
    };
};

var ampersandN = exports.ampersandN = function ampersandN(fs) {
    return function (x) {
        var mapper = function mapper(f) {
            return f(x);
        };
        return map(mapper)(fs);
    };
};

/*

asteriskNN: fs => xs
asterisk2N: f => g => xs
asterisk2:  f => g => a => b

asteriskMapNN: fs => xs
asteriskMap2N: f => g => xs
asteriskMap2:  f => g => a => b

asteriskAppNN: xs => fs
asteriskApp2N: a => b => fs
asteriskApp2:  a => b => f => g


anvilNN

asterisk = anvilNN

*/

// const arrowSnd = f => timesV (2) >> asteriskN ([id, f])

var asteriskN = exports.asteriskN = function asteriskN(fs) {
    return function (xs) {
        var ret = [];
        var i = -1;
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
            for (var _iterator7 = fs[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var f = _step7.value;

                var x = xs[++i];
                ret.push(f(x));
            }
        } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                    _iterator7.return();
                }
            } finally {
                if (_didIteratorError7) {
                    throw _iteratorError7;
                }
            }
        }

        return ret;
    };
};

var asterisk1 = exports.asterisk1 = function asterisk1(f) {
    return function (a) {
        return [f(a)];
    };
};
var asterisk2 = exports.asterisk2 = function asterisk2(f) {
    return function (g) {
        return function (a) {
            return function (b) {
                return [f(a), g(b)];
            };
        };
    };
};
var asterisk3 = exports.asterisk3 = function asterisk3(f) {
    return function (g) {
        return function (h) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return [f(a), g(b), h(c)];
                    };
                };
            };
        };
    };
};
var asterisk4 = exports.asterisk4 = function asterisk4(f) {
    return function (g) {
        return function (h) {
            return function (i) {
                return function (a) {
                    return function (b) {
                        return function (c) {
                            return function (d) {
                                return [f(a), g(b), h(c), i(d)];
                            };
                        };
                    };
                };
            };
        };
    };
};
var asterisk5 = exports.asterisk5 = function asterisk5(f) {
    return function (g) {
        return function (h) {
            return function (i) {
                return function (j) {
                    return function (a) {
                        return function (b) {
                            return function (c) {
                                return function (d) {
                                    return function (e) {
                                        return [f(a), g(b), h(c), i(d), j(e)];
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};

// ------ lets / let

var letNV = exports.letNV = function letNV(xs) {
    return function (f) {
        return f.apply(null, xs);
    };
};
var letS = exports.letS = function letS(specAry) {
    return function (tgt) {
        return _index.lets.apply(undefined, [function (_) {
            return tgt;
        }].concat(_toConsumableArray(specAry)));
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

// ------ join, split etc.
var join = exports.join = dot1('join');
var split = exports.split = dot1('split');

var flip = exports.flip = function flip(f) {
    return function (a) {
        return function (b) {
            return f(b)(a);
        };
    };
};
var flip3 = exports.flip3 = function flip3(f) {
    return function (a) {
        return function (b) {
            return function (c) {
                return f(b)(a)(c);
            };
        };
    };
};
var flip4 = exports.flip4 = function flip4(f) {
    return function (a) {
        return function (b) {
            return function (c) {
                return function (d) {
                    return f(b)(a)(c)(d);
                };
            };
        };
    };
};
var flip5 = exports.flip5 = function flip5(f) {
    return function (a) {
        return function (b) {
            return function (c) {
                return function (d) {
                    return function (e) {
                        return f(b)(a)(c)(d)(e);
                    };
                };
            };
        };
    };
};

// ------ sprintf

var sprintf1 = exports.sprintf1 = function sprintf1(str) {
    return function (a) {
        return (0, _sprintfJs.sprintf)(str, a);
    };
};
var sprintfN = exports.sprintfN = function sprintfN(str) {
    return function (xs) {
        return _sprintfJs.sprintf.apply(null, [str].concat(_toConsumableArray(xs)));
    };
};

// ------ repeat, times
var repeatV = exports.repeatV = function repeatV(x) {
    return function (n) {
        var ret = [];
        for (var i = 0; i < n; i++) {
            ret.push(x);
        }return ret;
    };
};
var repeatF = exports.repeatF = function repeatF(f) {
    return function (n) {
        var ret = [];
        for (var i = 0; i < n; i++) {
            ret.push(f(i));
        }return ret;
    };
};
var repeatSide = exports.repeatSide = function repeatSide(f) {
    return function (n) {
        for (var i = 0; i < n; i++) {
            f(i);
        }
    };
};

var timesV = exports.timesV = function timesV(x) {
    return function (n) {
        return repeatV(n)(x);
    };
};
var timesF = exports.timesF = function timesF(f) {
    return function (n) {
        return repeatF(n)(f);
    };
};
var timesSide = exports.timesSide = function timesSide(f) {
    return function (n) {
        return repeatSide(n)(f);
    };
};

// ------ replace / match
var ifReplace = exports.ifReplace = function ifReplace(yes) {
    return function (no) {
        return function (re) {
            return function (replArg) {
                return function (target) {
                    var success = 0;
                    var repl = typeof replArg === 'function' ? function () {
                        return ++success, replArg.apply(undefined, arguments);
                    } : function (_) {
                        return ++success, replArg;
                    };
                    var out = target.replace(re, repl);
                    return success ? yes(out, success) : no(target);
                };
            };
        };
    };
};

// --- by should be negative to count down.
var rangeFromBy = exports.rangeFromBy = function rangeFromBy(by) {
    return function (from) {
        return function (to) {
            return from < to ? rangeFromByAsc(by)(from)(to) : from > to ? rangeFromByDesc(by)(from)(to) : [];
        };
    };
};

// --- no corresponding to version.
var rangeFromByAsc = exports.rangeFromByAsc = function rangeFromByAsc(by) {
    return function (from) {
        return function (to) {
            var ret = [];
            for (var i = from; i < to; i += by) {
                ret.push(i);
            }return ret;
        };
    };
};

// --- no corresponding to version.
var rangeFromByDesc = exports.rangeFromByDesc = function rangeFromByDesc(by) {
    return function (from) {
        return function (to) {
            var ret = [];
            for (var i = from; i > to; i += by) {
                ret.push(i);
            }return ret;
        };
    };
};

var rangeToBy = exports.rangeToBy = function rangeToBy(by) {
    return function (to) {
        return function (from) {
            return from < to ? rangeFromByAsc(by)(from)(to) : from > to ? rangeFromByDesc(by)(from)(to) : [];
        };
    };
};

var neu1 = exports.neu1 = function neu1(x) {
    return function (val1) {
        return new x(val1);
    };
};
var neu2 = exports.neu2 = function neu2(x) {
    return function (val1) {
        return function (val2) {
            return new x(val1, val2);
        };
    };
};
var neu3 = exports.neu3 = function neu3(x) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return new x(val1, val2, val3);
            };
        };
    };
};
var neu4 = exports.neu4 = function neu4(x) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (val4) {
                    return new x(val1, val2, val3, val4);
                };
            };
        };
    };
};
var neu5 = exports.neu5 = function neu5(x) {
    return function (val1) {
        return function (val2) {
            return function (val3) {
                return function (val4) {
                    return function (val5) {
                        return new x(val1, val2, val3, val4, val5);
                    };
                };
            };
        };
    };
};
var neuN = exports.neuN = function neuN(x) {
    return function (vs) {
        return new (Function.prototype.bind.apply(x, [null].concat(_toConsumableArray(vs))))();
    };
};

var match = exports.match = function match(re) {
    return function (target) {
        return re.exec(target);
    };
};

var xMatchGlobal = exports.xMatchGlobal = function xMatchGlobal(re) {
    return function (mapper) {
        return function (target) {
            var out = [];
            var reGlobal = (0, _index.xRegExpFlags)(re, 'g');
            var m = void 0;
            while (m = reGlobal.exec(target)) {
                appendToM(out)(mapper.apply(undefined, _toConsumableArray(m)));
            }return out;
        };
    };
};

var xMatch = exports.xMatch = function xMatch(re) {
    return function (target) {
        return (0, _index.xRegExp)(re).exec(target);
    };
};
var xMatchStr = exports.xMatchStr = function xMatchStr(reStr) {
    return function (target) {
        return xMatch(new RegExp(reStr))(target);
    };
};
var xMatchStrFlags = exports.xMatchStrFlags = function xMatchStrFlags(reStr) {
    return function (flags) {
        return function (target) {
            return xMatch(new RegExp(reStr, flags))(target);
        };
    };
};

var xReplace = exports.xReplace = function xReplace(re) {
    return function (repl) {
        return function (target) {
            return target.replace((0, _index.xRegExp)(re), repl);
        };
    };
};
var xReplaceStr = exports.xReplaceStr = function xReplaceStr(reStr) {
    return function (repl) {
        return function (target) {
            return target.replace((0, _index.xRegExpStr)(reStr), repl);
        };
    };
};
var xReplaceStrFlags = exports.xReplaceStrFlags = function xReplaceStrFlags(reStr) {
    return function (flags) {
        return function (repl) {
            return function (target) {
                return target.replace((0, _index.xRegExpStr)(reStr, flags), repl);
            };
        };
    };
};

var ifXReplace = exports.ifXReplace = function ifXReplace(re) {
    return function (repl) {
        return function (yes) {
            return function (no) {
                return function (target) {
                    return ifReplace(yes)(no)((0, _index.xRegExp)(re))(repl)(target);
                };
            };
        };
    };
};
var ifXReplaceStr = exports.ifXReplaceStr = function ifXReplaceStr(reStr) {
    return function (repl) {
        return function (yes) {
            return function (no) {
                return function (target) {
                    return ifReplace(yes)(no)((0, _index.xRegExpStr)(reStr))(repl)(target);
                };
            };
        };
    };
};
var ifXReplaceStrFlags = exports.ifXReplaceStrFlags = function ifXReplaceStrFlags(reStr) {
    return function (flags) {
        return function (repl) {
            return function (yes) {
                return function (no) {
                    return function (target) {
                        return ifReplace(yes)(no)((0, _index.xRegExpStr)(reStr, flags))(repl)(target);
                    };
                };
            };
        };
    };
};

var factoryProps = exports.factoryProps = function factoryProps(props) {
    return function (factory) {
        var orig = function orig() {
            return factory.create.apply(factory, arguments);
        };
        return Object.assign({}, factory, {
            create: function create(args) {
                var o = orig(props);
                var src = args,
                    tgt = o;

                for (var i in args) {
                    if (hasOwn.call(src, i) && (0, _index.ok)(src[i])) tgt[i] = src[i];
                }return tgt;
            }
        });
    };
};

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

// --- alters the prototype by merging in the mixins.
// --- if a key exists in the proto and its value is not nil, then it is not overwritten.
// --- the result is as if you had merged the proto into the mixin, keeping the proto's own
// prototype chain intact, then called that result the proto; except that the proto is altered in
// place of course because of the M.

var mixinPreM = exports.mixinPreM = function mixinPreM(mixin) {
    return function (proto) {
        var chooseTgtWhenOk = function chooseTgtWhenOk(src, tgt) {
            return (0, _index.ok)(tgt) ? tgt : src;
        };
        var mergeInToChooseTgtWhenOkM = mergeWith(chooseTgtWhenOk)(_index.mergeInToMSym);
        return mergeInToChooseTgtWhenOkM(proto)(mixin);
    };
};

// --- alters the prototype by merging in the mixins.
// --- if a key exists in the proto then it is overwritten, unless the corresponding value from the
//     mixin is nil.
var mixinM = exports.mixinM = function mixinM(mixin) {
    return function (proto) {
        var srcOk = function srcOk(src, _) {
            return (0, _index.ok)(src);
        };
        var mergeInToWhenSrcOkM = mergeWhen(srcOk)(_index.mergeInToMSym);
        return mergeInToWhenSrcOkM(proto)(mixin);
    };
};

var mixinPreNM = exports.mixinPreNM = function mixinPreNM(ms) {
    return function (proto) {
        return ms.reduce(function (protoAcc, mixin) {
            return mixinPreM(mixin)(protoAcc);
        }, proto);
    };
};

var mixinNM = exports.mixinNM = function mixinNM(ms) {
    return function (proto) {
        return ms.reduce(function (protoAcc, mixin) {
            return mixinM(mixin)(protoAcc);
        }, proto);
    };
};

exports.default = {
    roll: roll, recurry: recurry,
    eq: eq, ne: ne, gt: gt, gte: gte, lt: lt, lte: lte,
    dot: dot, dot1: dot1, dot2: dot2, dot3: dot3, dot4: dot4, dot5: dot5, dotN: dotN,
    side: side, side1: side1, side2: side2, side3: side3, side4: side4, side5: side5, sideN: sideN,
    path: path, tap: tap,
    ifPredicate: ifPredicate, whenPredicate: whenPredicate,
    ifPredicateOk: ifPredicateOk, whenPredicateOk: whenPredicateOk,
    has: has, hasIn: hasIn,
    ifHas: ifHas, ifHasIn: ifHasIn,
    whenHas: whenHas, whenHasIn: whenHasIn,
    bindLatePropTo: bindLatePropTo, bindLateProp: bindLateProp,
    bindPropTo: bindPropTo, bindProp: bindProp, bindTo: bindTo, bind: bind,
    bindTryPropTo: bindTryPropTo, bindTryProp: bindTryProp, bindTryTo: bindTryTo, bindTry: bindTry,
    ifBind: ifBind, whenBind: whenBind,
    isType: isType, getType: _index.getType,
    condPredicate: condPredicate, cond: cond, condS: condS,
    subtract: subtract, subtractFrom: subtractFrom,
    add: add,
    multiply: multiply, divideBy: divideBy, divideInto: divideInto,
    modulo: modulo, moduloWholePart: moduloWholePart,
    toThe: toThe,
    tryCatch: tryCatch, decorateException: decorateException,
    defaultTo: defaultTo,
    assoc: assoc, assocM: assocM, assocPath: assocPath, assocPathM: assocPathM,
    updateM: updateM, update: update, updatePathM: updatePathM, updatePath: updatePath,
    append: append, appendTo: appendTo, appendToM: appendToM, appendM: appendM,
    prependTo: prependTo, prepend: prepend, prependToM: prependToM, prependM: prependM,
    concatTo: concatTo, concat: concat, concatToM: concatToM, concatM: concatM,
    mergeTo: mergeTo, merge: merge, mergeToM: mergeToM, mergeM: mergeM,
    mergeInToM: mergeInToM, mergeInM: mergeInM, mergeInTo: mergeInTo, mergeIn: mergeIn,
    mergeWith: mergeWith, mergeWhen: mergeWhen,
    addIndex: addIndex, addCollection: addCollection,
    map: map, reduce: reduce, filter: filter, reject: reject, find: find, contains: contains,
    reduceAbort: reduceAbort,
    // both, either, allN, anyN,
    each: each, eachObj: eachObj, eachObjIn: eachObjIn,
    reduceObj: reduceObj, reduceObjIn: reduceObjIn,
    ampersandN: ampersandN,
    asterisk1: asterisk1, asterisk2: asterisk2, asterisk3: asterisk3, asterisk4: asterisk4, asterisk5: asterisk5, asteriskN: asteriskN,
    letNV: letNV, letS: letS,
    callOn: callOn, callOn1: callOn1, callOn2: callOn2, callOn3: callOn3, callOn4: callOn4, callOn5: callOn5, callOnN: callOnN,
    provideTo: provideTo, provideTo1: provideTo1, provideTo2: provideTo2, provideTo3: provideTo3, provideTo4: provideTo4, provideTo5: provideTo5, provideToN: provideToN,
    applyTo1: applyTo1, applyTo2: applyTo2, applyTo3: applyTo3, applyTo4: applyTo4, applyTo5: applyTo5, applyToN: applyToN,
    passTo: passTo, passToN: passToN,
    join: join, split: split,
    prop: prop, propOf: propOf,
    flip: flip, flip3: flip3, flip4: flip4, flip5: flip5,
    sprintf1: sprintf1, sprintfN: sprintfN,
    repeatV: repeatV, repeatF: repeatF, repeatSide: repeatSide,
    timesV: timesV, timesF: timesF, timesSide: timesSide,
    ifReplace: ifReplace,
    rangeFromBy: rangeFromBy, rangeToBy: rangeToBy,
    rangeFromByAsc: rangeFromByAsc, rangeFromByDesc: rangeFromByDesc,
    neu1: neu1, neu2: neu2, neu3: neu3, neu4: neu4, neu5: neu5, neuN: neuN,
    match: match, xMatchGlobal: xMatchGlobal,
    xMatch: xMatch, xMatchStr: xMatchStr, xMatchStrFlags: xMatchStrFlags,
    xReplace: xReplace, xReplaceStr: xReplaceStr, xReplaceStrFlags: xReplaceStrFlags,
    ifXReplace: ifXReplace, ifXReplaceStr: ifXReplaceStr, ifXReplaceStrFlags: ifXReplaceStrFlags,
    factoryProps: factoryProps, factoryInit: factoryInit,
    mixinM: mixinM, mixinPreM: mixinPreM,
    mixinNM: mixinNM, mixinPreNM: mixinPreNM
};