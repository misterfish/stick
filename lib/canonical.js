'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.whenBind = exports.ifBind = exports.whenHasIn = exports.ifHasIn = exports.whenHas = exports.ifHas = exports.whenPredicate = exports.ifPredicate = exports.sideN = exports.side5 = exports.side4 = exports.side3 = exports.side2 = exports.side1 = exports.side = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// --- canonical can take functions from both main and manual.
// beware of circular dependencies -- be sure tests are up to date.

var _ramda = require('ramda');

var _index = require('./index');

var side = exports.side = function side(prop) {
    return (0, _ramda.tap)((0, _index.dot)(prop));
};
var side1 = exports.side1 = (0, _ramda.curry)(function (prop, val) {
    return (0, _ramda.tap)((0, _index.dot1)(prop)(val));
});
var side2 = exports.side2 = (0, _ramda.curry)(function (prop, val1, val2) {
    return (0, _ramda.tap)((0, _index.dot2)(prop)(val1)(val2));
});
var side3 = exports.side3 = (0, _ramda.curry)(function (prop, val1, val2, val3) {
    return (0, _ramda.tap)((0, _index.dot3)(prop)(val1)(val2)(val3));
});
var side4 = exports.side4 = (0, _ramda.curry)(function (prop, val1, val2, val3, val4) {
    return (0, _ramda.tap)((0, _index.dot4)(prop)(val1)(val2)(val3)(val4));
});
var side5 = exports.side5 = (0, _ramda.curry)(function (prop, val1, val2, val3, val4, val5) {
    return (0, _ramda.tap)((0, _index.dot5)(prop)(val1)(val2)(val3)(val4)(val5));
});
var sideN = exports.sideN = (0, _ramda.curry)(function (prop, vs) {
    return (0, _ramda.tap)((0, _index.dotN)(prop)(vs));
});

var ifPredicate = exports.ifPredicate = (0, _ramda.curry)(function (f, yes, no, x) {
    return f(x) === true ? yes(x) : no(x);
});
var whenPredicate = exports.whenPredicate = (0, _ramda.curry)(function (f, yes, x) {
    return x | ifPredicate(f)(yes)(noop);
});

var ifHas = exports.ifHas = (0, _ramda.curry)(function (yes, no, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        o = _ref2[0],
        k = _ref2[1];

    return o | (0, _ramda.has)(k) ? yes(o[k], o, k) : no(o, k);
});
var whenHas = exports.whenHas = (0, _ramda.curry)(function (yes, spec) {
    return spec | ifHas(yes)(noop);
});

var ifHasIn = exports.ifHasIn = (0, _ramda.curry)(function (yes, no, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        o = _ref4[0],
        k = _ref4[1];

    return o | (0, _ramda.hasIn)(k) ? yes(o[k], o, k) : no(o, k);
});
var whenHasIn = exports.whenHasIn = (0, _ramda.curry)(function (yes, spec) {
    return spec | ifHasIn(yes)(noop);
});

var ifBind = exports.ifBind = (0, _ramda.curry)(function (yes, no, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        o = _ref6[0],
        k = _ref6[1];

    return lets(function (_) {
        return k | bindTry(o);
    }, ifOk(yes, no));
});

var whenBind = exports.whenBind = function whenBind(yes) {
    return ifBind(yes)(noop);
};