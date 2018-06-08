#!/usr/bin/env node
'use strict';

var _index = require('../../../../index');

var _bilby = require('bilby');

var _enhanceFunction = require('../../enhance-function');

var _kleisli = require('../kleisli');

var _op = function _op() {
    return _index.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
    return _index.composeAsMethodsRight.apply(undefined, arguments);
};

var _console = console,
    log = _console.log;


(0, _enhanceFunction.enhanceFunction)();

var getOrElse = (0, _index.dot1)('getOrElse');
var inc = (0, _index.add)(1);

var isOdd = _op2((0, _index.modulo)(2), (0, _index.ne)(0));
var ifLt0 = _op(_op(0, _index.lt), _index.ifPredicate);
var ifOdd = _op(isOdd, _index.ifPredicate);

var step1 = ifLt0(_op(_bilby.none, _index.always), _op2(inc, _bilby.some));
var step2 = ifOdd(_op(_bilby.none, _index.always), _op2(inc, _bilby.some));

var transform = _op2(_op2(_bilby.some, (0, _kleisli.k)(step1)), (0, _kleisli.k)(step2));_op(_op(_op(-1, (0, _index.rangeTo)(3)), (0, _index.map)(_op2(transform, getOrElse('none')))), log);