'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.enhanceFunction = undefined;

var _index = require('../../../index');

var _op = function _op() {
    return _index.pipe.apply(undefined, arguments);
};

var enhanceFunction = exports.enhanceFunction = function enhanceFunction() {
    var proto = {
        compose: function compose(b) {
            var _this = this;

            return function () {
                return _this(b.apply(undefined, arguments));
            };
        }
    };
    _op(Function.prototype, (0, _index.mergeM)(proto));
};