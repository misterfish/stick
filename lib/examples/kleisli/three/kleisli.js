'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.k = undefined;

var _index = require('../../../index');

var _op = function _op() {
    return _index.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
    return _index.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
    return _index.composeRight.apply(undefined, arguments);
};

var init = (0, _index.dot2)('init');
var create = (0, _index.dot)('create');

var flatMap = (0, _index.dot1)('flatMap');

var IDX = -1;

// a k function, when .call'd, should transparently flatmap.
// composing one or more functions is optional, and yields a new k function.
var proto = {
    init: function init(f, tag) {
        return _op(this, (0, _index.mergeM)({
            tag: tag,
            _f: f,
            idx: ++IDX
        }));
    },

    // call (...args) { return this._f (...args) },
    call: function call(fx) {
        var _this = this;

        // console.log ('idx, fx', this.tag, fx)
        return fx.flatMap(function (x) {
            // console.log ('inside flatmap, x', x)
            // console.log ('inside flatmap, this._f', this._f)
            // console.log ('inside flatmap, this._f (x)', this.tag, this._f (x))
            return _this._f(x);
        });
    },
    compose: function compose(b) {
        var _this2 = this;

        // console.log ('compose, b', b)
        //return k ((...args) => {
        return function () {
            // b is a normal function
            // this is a magic one

            // console.log ('inside composed, args:', args)
            // console.log ('b', b)
            var bb = b.apply(undefined, arguments);
            // console.log ('bb, bb.getOrElse ("none")', bb.getOrElse ("none"))
            var called = _this2.call(bb);
            // console.log ('called', called)
            return called;
        };
    }
};

var Kleisli = _op(proto, _index.factory);

var k = exports.k = function k(f) {
    var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
    return _op(_op(Kleisli, create), init(f, tag));
};
exports.default = Kleisli;