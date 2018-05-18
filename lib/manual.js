"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var ifBind = exports.ifBind = function ifBind(yes) {
    return function (no) {
        return function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
                o = _ref6[0],
                k = _ref6[1];

            var bound = bindTry(o)(k);
            return ok(bound) ? yes(bound) : no();
        };
    };
};

var whenBind = exports.whenBind = function whenBind(yes) {
    return ifBind(yes)(noop);
};

exports.default = {
    dot: dot, dot1: dot1, dot2: dot2, dot3: dot3, dot4: dot4, dot5: dot5, dotN: dotN,
    side: side, side1: side1, side2: side2, side3: side3, side4: side4, side5: side5, sideN: sideN,
    ifPredicate: ifPredicate, whenPredicate: whenPredicate,
    ifHas: ifHas, ifHasIn: ifHasIn,
    whenHas: whenHas, whenHasIn: whenHasIn,
    ifBind: ifBind, whenBind: whenBind
};