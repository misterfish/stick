'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.condO = exports.condo = exports.whenBind = exports.ifBind = exports.bindTry = exports.isType = exports.bind = exports.whenHasIn = exports.ifHasIn = exports.whenHas = exports.ifHas = exports.hasIn = exports.has = exports.whenPredicate = exports.ifPredicate = exports.sideN = exports.side5 = exports.side4 = exports.side3 = exports.side2 = exports.side1 = exports.side = exports.dotN = exports.dot5 = exports.dot4 = exports.dot3 = exports.dot2 = exports.dot1 = exports.dot = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _index = require('./index');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var noop = function noop(_) {};
var oPro = Object.prototype;
var hasOwn = oPro.hasOwnProperty;

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

// --- null or undefined test ('otherwise') matches immediately
// and passes null to the function.
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

            if ((0, _index.notOk)(test)) return exec(null);
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

                if ((0, _index.notOk)(test)) return exec(target);
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

exports.default = {
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
    condo: condo, condO: condO
};