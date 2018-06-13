'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toOrderedMap = exports.entrySeq = exports.listToOrderedSet = exports.filter = exports.getIn = exports.get = exports.valueSeq = exports.size = exports.updateIn = exports.update = exports.setIn = exports.set = exports.del = exports.find = exports.add = exports.push = exports.sortBy = exports.toJS = exports.fromJS = undefined;

var _index = require('../../index');

var _immutable = require('immutable');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _op = function _op() {
    return _index.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
    return _index.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
    return _index.composeRight.apply(undefined, arguments);
};

exports.fromJS = _immutable.fromJS;
var toJS = exports.toJS = (0, _index.dot)('toJS');
var sortBy = exports.sortBy = (0, _index.dot1)('sortBy');
var push = exports.push = (0, _index.dot1)('push');
var add = exports.add = (0, _index.dot1)('add');
var find = exports.find = (0, _index.dot1)('find');
var del = exports.del = (0, _index.dot1)('delete');

var set = exports.set = (0, _index.dot2)('set');
var setIn = exports.setIn = (0, _index.dot2)('setIn');

var update = exports.update = (0, _index.dot2)('update');
var updateIn = exports.updateIn = (0, _index.dot2)('updateIn');

var size = exports.size = (0, _index.prop)('size');

var valueSeq = exports.valueSeq = (0, _index.dot)('valueSeq');
var get = exports.get = (0, _index.dot1)('get');
var getIn = exports.getIn = (0, _index.dot1)('getIn');

var filter = exports.filter = (0, _index.dot1)('filter');

var listToOrderedSet = exports.listToOrderedSet = function listToOrderedSet(xs) {
    return _immutable.OrderedSet.of.apply(_immutable.OrderedSet, _toConsumableArray(xs));
};

var entrySeq = exports.entrySeq = (0, _index.dot)('entrySeq');
var toOrderedMap = exports.toOrderedMap = (0, _index.dot)('toOrderedMap');