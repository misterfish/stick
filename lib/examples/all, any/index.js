#!/usr/bin/env node
'use strict';

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _index = require('../../index');

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

var isOdd = function isOdd(x) {
				return (0, _index.isInteger)(x) && x % 2 !== 0;
};
var isLt3 = _op(3, _index.lt);
var truthy = _index.id;_op([1, 2, 3, 4, 5], _ramda2.default.all(isOdd)) // false
;_op([1, 3, 5], _ramda2.default.all(isOdd)) // true

;_op([1, 2, 3, 4, 5], (0, _index.allAgainst)(isOdd)) // false
;_op([1, 3, 5], (0, _index.allAgainst)(isOdd)); // true

var allTruthy = (0, _index.allAgainst)(truthy);_op([1, 2, 3, 4, 5, null], allTruthy) // false
;_op([1, 2, 3, 4, 5], allTruthy); // 5

var isOddAndLt3 = (0, _index.againstAll)([isOdd, isLt3]);
_op(1, isOddAndLt3); // true
_op(1.1, isOddAndLt3); // false
_op(2, isOddAndLt3); // false
_op(3, isOddAndLt3); // false

var isOddOrLt3 = (0, _index.againstAny)([isOdd, isLt3]);
_op(2, isOddOrLt3); // true
_op(3, isOddOrLt3); // true
_op(4, isOddOrLt3); // false
_op(5, isOddOrLt3); // true

// ramda doesn't have these: multiple values + multiple predicates

var allOddAndLt3 = (0, _index.allAgainst)(isOddAndLt3);_op([1, 2, 3, 4, 5], allOddAndLt3) // false
;_op([1, 3, 5], allOddAndLt3); // true

var allOddOrLt3 = (0, _index.allAgainst)(isOddOrLt3);_op([1, 2, 3, 4, 5], allOddOrLt3) // false
;_op([2, 3, 5], allOddOrLt3); // true

var anyOddAndLt3 = (0, _index.anyAgainst)(isOddAndLt3);_op([3, 4, 5], anyOddAndLt3) // false
;_op([2, 4, 5], anyOddAndLt3) // false
;_op([1, 4, 5], anyOddAndLt3); // true

var anyOddOrLt3 = (0, _index.anyAgainst)(isOddOrLt3);_op([4, 6], anyOddOrLt3) // false
;_op([3, 6], anyOddOrLt3) // true
;_op([3, 5], anyOddOrLt3) // true
;_op([2, 6], anyOddOrLt3) // true
;_op([1, 6], anyOddOrLt3); // true

var bothTruthy = (0, _index.bothAgainst)(truthy);
var eitherOdd = (0, _index.eitherAgainst)(isOdd);

// --- i.e. ; [null, 3] | allTruthy
bothTruthy(null, 3); // false
bothTruthy(1, 3); // 3

eitherOdd(1, 2); // true
eitherOdd(null, 2); // false
eitherOdd(2, 4); // false

var isOddAndLt3Alt = (0, _index.againstBoth)(isOdd)(isLt3);
_op(1, isOddAndLt3Alt); // true
_op(1.1, isOddAndLt3Alt); // false
_op(2, isOddAndLt3Alt); // false
_op(3, isOddAndLt3Alt); // false

var isOddOrLt3Alt = (0, _index.againstEither)(isOdd)(isLt3);
_op(2, isOddOrLt3Alt); // true
_op(3, isOddOrLt3Alt); // true
_op(4, isOddOrLt3Alt); // false
_op(5, isOddOrLt3Alt); // true