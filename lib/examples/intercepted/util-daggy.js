'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toJS = exports.dag = undefined;

var _index = require('../../index');

var _op = function _op() {
    return _index.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
    return _index.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
    return _index.composeRight.apply(undefined, arguments);
};

var dag = exports.dag = function dag(type) {
    return function (x) {
        return type.is(x);
    };
};
var toJS = exports.toJS = (0, _index.dot)('toJS');