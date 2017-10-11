'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.doe = undefined;

var _ramda = require('ramda');

var _index = require('./index');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _op = function _op(a, b) {
    return b(a);
};

var _op2 = function _op2(a, b) {
    return function () {
        return b(a.apply(undefined, arguments));
    };
};

// --- doe requires more than 1, because without it, don't need doe.
//     fix, allow only 1 XXX
var doe = exports.doe = function doe() {
    for (var _len = arguments.length, mainArgs = Array(_len), _key = 0; _key < _len; _key++) {
        mainArgs[_key] = arguments[_key];
    }

    // --- retrieve the monadic value: chain gets dispatched to the monad's chain/bind function.
    var retrieve = (0, _ramda.chain)(_ramda.identity);

    var fs = _op(mainArgs, (0, _index.ifLengthOne)(function (it) {
        return it[0];
    }, function (it) {
        return it;
    }));

    var _doe = function _doe(fs, argsAcc) {
        return fs.length === 1 ? function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            return (0, _ramda.head)(fs).apply(null, [].concat(_toConsumableArray(argsAcc), args));
        } : function () {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            var chainVal = (0, _ramda.head)(fs).apply(null, [].concat(_toConsumableArray(argsAcc), args));
            var newArgsAcc = [].concat(_toConsumableArray(argsAcc), [_op(chainVal, retrieve)]);
            return (0, _ramda.chain)(_doe((0, _ramda.tail)(fs), newArgsAcc))(chainVal);
        };
    };

    var firstReturn = (0, _ramda.head)(fs)();
    // --- if tail is empty, return firstReturn. xx
    return (0, _ramda.chain)(_doe((0, _ramda.tail)(fs), [_op(firstReturn, retrieve)]))(firstReturn);
};