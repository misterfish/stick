'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.divideBy = exports.plus = exports.minus = exports.subtractFrom = exports.lte = exports.lt = exports.gte = exports.gt = exports.notOk = exports.ok = exports.condO = exports.condo = exports._cond = exports.whenBind = exports.ifBind = exports.bindTry = exports.bind = exports.whenHasIn = exports.ifHasIn = exports.whenHas = exports.ifHas = exports.whenPredicate = exports.ifPredicate = exports.sideN = exports.side5 = exports.side4 = exports.side3 = exports.side2 = exports.side1 = exports.side = undefined;

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

var whenFunction = _index.isFunction | whenPredicate;

// --- dies if o[prop] is not a function.
var bind = exports.bind = (0, _ramda.curry)(function (o, prop) {
    return o[prop].bind(o);
});

// --- returns undefined if o[prop] is not a function.
var bindTry = exports.bindTry = (0, _ramda.curry)(function (o, prop) {
    return o[prop] | whenFunction(function () {
        return bind(o, prop);
    });
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

var _cond = exports._cond = function _cond(withTarget, blocks, target) {
    var result = void 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = blocks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                test = _step$value[0],
                exec = _step$value[1];

            // --- null or undefined test ('otherwise') matches immediately
            if (test | notOk) return withTarget ? exec(target) : exec();

            var _result = withTarget ? test(target) : test();
            // @todo test.
            if (_result) return withTarget ? exec(target, _result) : exec(_result);
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

var condo = exports.condo = function condo(blocks) {
    return _cond(false, blocks);
};
var condO = exports.condO = (0, _ramda.curry)(function (blocks, target) {
    return _cond(true, blocks, target);
});

var ok = exports.ok = isNil >> not;
var notOk = exports.notOk = isNil;

var gt = exports.gt = (0, _ramda.flip)(_ramda.gt);
var gte = exports.gte = (0, _ramda.flip)(_ramda.gte);
var lt = exports.lt = (0, _ramda.flip)(_ramda.lt);
var lte = exports.lte = (0, _ramda.flip)(_ramda.lte);

var subtractFrom = exports.subtractFrom = _ramda.subtract;
var minus = exports.minus = (0, _ramda.flip)(subtractFrom);
var plus = exports.plus = _ramda.add;

var divideBy = exports.divideBy = (0, _ramda.flip)(_ramda.divide);