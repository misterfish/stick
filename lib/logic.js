"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// ------ function logic
// --- wrap short-circuiting && / ||

// --- like all1
var both = exports.both = function both(f) {
    return function (g) {
        return function (x) {
            return f(x) && g(x);
        };
    };
};
// --- like any1
var either = exports.either = function either(f) {
    return function (g) {
        return function (x) {
            return f(x) || g(x);
        };
    };
};

var allN = exports.allN = function allN(fs) {
    return function (x) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = fs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var f = _step.value;
                if (!f(x)) return false;
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

        return true;
    };
};

var andNot = not | andPredicate;
// --- if (x | andNot (y))
// --- if (x | andNot (y))
// export const andPredicate = (p) => 

// export const allF = ()
var allV = exports.allV = function allV(fs) {
    return function (x) {};
};

var bothPredicate = exports.bothPredicate = function bothPredicate(p) {
    return function (f) {
        return function (g) {
            return function (x) {
                return p(f(x)) && p(g(x));
            };
        };
    };
};
var eitherPredicate = exports.eitherPredicate = function eitherPredicate(p) {
    return function (f) {
        return function (g) {
            return function (x) {
                return p(f(x)) || p(g(x));
            };
        };
    };
};

var anyN = exports.anyN = function anyN(fs) {
    return function (x) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = fs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var f = _step2.value;
                if (f(x)) return true;
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

        return false;
    };
};

// ------ value logic
var allPredicate = exports.allPredicate = function allPredicate(p) {
    return function (xs) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = xs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var x = _step3.value;
                if (!p(x)) return false;
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

        return true;
    };
};
var anyPredicate = exports.anyPredicate = function anyPredicate(p) {
    return function (xs) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = xs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var x = _step4.value;
                if (p(x)) return true;
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

        return false;
    };
};

var any = exports.any = function any(p) {
    return function (xs) {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = xs[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var x = _step5.value;
                if (p(x)) return true;
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
    };
};

// --- wrap short-circuiting && / ||
var and = exports.and = function and(y) {
    return function (x) {
        return x && y;
    };
};
// export const andNot = y => x => x && !y
var or = exports.or = function or(y) {
    return function (x) {
        return x || y;
    };
};
var orNot = exports.orNot = function orNot(y) {
    return function (x) {
        return x || !y;
    };
};