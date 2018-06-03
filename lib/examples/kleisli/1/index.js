#!/usr/bin/env node
'use strict';

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _index = require('../../../index');

var _kleisli = require('./kleisli');

var _kleisli2 = _interopRequireDefault(_kleisli);

var _bilby = require('bilby');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _op = function _op() {
    return _index.pipe.apply(undefined, arguments);
};
// defineBinaryOperator ('<<', (...args) => compose      (...args))
// defineBinaryOperator ('>>', (...args) => composeRight (...args))

var _op2 = function _op2() {
    return composeAsMethodsRight.apply(undefined, arguments);
};

var flatMap = (0, _index.dot1)('flatMap');
var getOrElse = (0, _index.dot1)('getOrElse');

// a | b | c --> c.call (b.call (a))

// const composeAsMethodsRight = (...args) => args.reduce ((b, a) => a.compose (b))
// const composeAsMethods      = (...args) => args.reduce ((a, b) => a.compose (b))
var composeAsMethodsRight = function composeAsMethodsRight(b, a) {
    return a.compose(b);
};
var composeAsMethods = function composeAsMethods(a, b) {
    return a.compose(b);
};

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
var step1 = _op2((0, _index.tap)(logWith('step1')), ifLt0(_op(_bilby.none, _index.always), _op2(inc, _bilby.some)));
var step2 = _op2(_op2((0, _index.tap)(logWith('step2 begin')), ifOdd(_op(_bilby.none, _index.always), _op2(inc, _bilby.some))), (0, _index.tap)(_op2(getOrElse('none'), logWith('step2 return'))));

var step3 = _op2(inc, _bilby.some);

// console.log ('k(some)', k(some))
// console.log ('k(some).compose', k(some).compose)
// console.log ('k(some) >> k (step1)', k(some) >> k (step1))
// console.log ('k(some) >> k (step1) >> k(step2)', k(some) >> k (step1) >> k(step2))
// console.log ('k(some).call(null, 10).getOrElse(42)', k(some).call(10).getOrElse(42))

var doit = _op2(_op2(_op2(_bilby.some, (0, _kleisli.k)((0, _index.tap)(logWith('helloooo')))), (0, _kleisli.k)(step1)), (0, _kleisli.k)(step2));

console.log('hello');

// ; -5 | rangeTo (5)
//      | map (doit | bindProp ('call'))
//      | map (getOrElse ('none'))
//      | log

// ;( (k (step1))) .call (some (3))
// | getOrElse ('none') // 4

//;( (k (step1) >> k (step2))) .call (some (3))
// const composed = k (k (step2, 'step2').compose (step1, 'step1'), 'composed')
//const composed = k (step1 >> k (step2))
var composed = _op2(_op2(_op2(_index.id, (0, _kleisli.k)(step1)), (0, _kleisli.k)(step2)), (0, _kleisli.k)(step3));

_op(_op(composed((0, _bilby.some)(3)), getOrElse('none')), _fishLib.log);

// 1) Kleisli as an object
// 2) Kleisli copies itself into functions
// 3) pure stick

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