'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.k = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

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

var k = exports.k = function k(f) {
    var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';

    var cc = function cc(fx) {
        return fx.flatMap(function (x) {
            return f(x);
        });
    };
    var pose = function pose(g) {
        console.log('g', g);
        return function (fx) {
            console.log('fx', fx);
            return fx.flatMap(function (x) {
                return f(g(x));
            });
        };
    };
    return cc;
};