'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ifAllOk = exports.ifSingletonLeft = exports.ifNegativeOne = exports.ifException = exports.isException = exports.ifLongerThan = exports.isArray = exports.isType = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _index = require('../../index');

var _util = require('./util');

var _utilBilby = require('./util-bilby');

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

// --- beware circular reference: don't use these in point-free functions.


var isType = exports.isType = (0, _ramda.curry)(function (type, val) {
    return _op((0, _index.getType)(val), (0, _index.eq)(type));
});
var isArray = exports.isArray = isType('Array');

var ifLongerThan = exports.ifLongerThan = function ifLongerThan(n) {
    return (0, _index.ifPredicate)(_op3(_util.length, (0, _index.gt)(n)));
};

var isException = exports.isException = isType('Error');
var ifException = exports.ifException = (0, _index.ifPredicate)(isException);
var ifNegativeOne = exports.ifNegativeOne = (0, _index.ifPredicate)(_op(-1, _index.eq));

// --- ugly (...args), but avoiding circular refs.
var ifSingletonLeft = exports.ifSingletonLeft = function ifSingletonLeft() {
    return (0, _index.ifPredicate)((0, _index.againstAll)([isArray, _op3(_util.length, (0, _index.eq)(1)), _op3((0, _index.prop)(0), _utilBilby.isLeft)])).apply(undefined, arguments);
};
var ifAllOk = exports.ifAllOk = function ifAllOk() {
    return (0, _index.ifPredicate)(_util.allOk).apply(undefined, arguments);
};