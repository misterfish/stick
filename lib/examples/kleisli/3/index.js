#!/usr/bin/env node
'use strict';

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _index = require('../../../index');

var _kleisli = require('./kleisli');

var _bilby = require('bilby');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _op = function _op() {
    return _index.pipe.apply(undefined, arguments);
};
// defineBinaryOperator ('<<', (...args) => compose      (...args))
// defineBinaryOperator ('>>', (...args) => composeRight (...args))

var _op2 = function _op2() {
    return _index.composeAsMethodsRight.apply(undefined, arguments);
};

var flatMap = (0, _index.dot1)('flatMap');
var getOrElse = (0, _index.dot1)('getOrElse');

var inc = (0, _index.add)(1);
var double = (0, _index.multiply)(2);
var kinc = (0, _kleisli.k)(inc);
var kdouble = (0, _kleisli.k)(double);

// const incThenDouble = kdouble >> kinc
// log (incThenDouble.call (2))

enhanceFunction();
// ; (inc >> double).call (null, 2) // 6
// | log

var isOdd = _op2((0, _index.modulo)(2), (0, _index.ne)(0));
var ifLt0 = _op(_op(0, _index.lt), _index.ifPredicate);
var ifOdd = _op(isOdd, _index.ifPredicate);

var logWith = function logWith(header) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _fishLib.log.apply(undefined, [header].concat(args));
    };
};

var step1 = ifLt0(_op(_bilby.none, _index.always), _op2(inc, _bilby.some));
var step2 = ifOdd(_op(_bilby.none, _index.always), _op2(inc, _bilby.some));

// works, 1-style
// const doit =
//      some
//   >> k (step1)
//   >> k (step2)

// --- um looks familiar
//const doit = k (step1) >> k (step2)
var doit = (0, _kleisli.k)(_op2(step1, (0, _kleisli.k)(step2)));_op(_op([-3, 1, 2], (0, _index.map)(_op2(_op2(_bilby.some, doit), getOrElse('none')))), (0, _index.map)(_fishLib.log));

function enhanceFunction() {
    var proto = {
        compose: function compose(b) {
            var _this = this;

            return function () {
                return _this(b.apply(undefined, arguments));
            };
        }
    };
    // Function.prototype | mergeM (proto)
    (0, _index.mergeM)(proto)(Function.prototype);
}