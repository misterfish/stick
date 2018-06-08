'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.k = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _index = require('../../../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _op = function _op() {
    return _index.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
    return _index.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
    return _index.composeRight.apply(undefined, arguments);
};

var init = (0, _index.dot1)('init');
var create = (0, _index.dot)('create');

var flatMap = (0, _index.dot1)('flatMap');

// --- flatMap should happen during `call`, not `compose`, so that a chain consisting of a single
// function works as expected.
// --- we'll refer to `k` style functions as 'magic'

var proto = {
    init: function init(f) {
        return _op(this, (0, _index.mergeM)({
            _f: f
        }));
    },
    call: function call(fx) {
        var _this = this;

        return fx.flatMap(function (x) {
            return _this._f(x);
        });
    },
    compose: function compose(b) {
        var _this2 = this;

        // --- `b` is a normal function
        // --- `this` is a magic one
        return function () {
            return _this2.call(b.apply(undefined, arguments));
        };
    }
};

var Kleisli = _op(proto, _index.factory);

var k = exports.k = function k(f) {
    return _op(_op(Kleisli, create), init(f));
};