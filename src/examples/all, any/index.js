#!/usr/bin/env node

defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import ramda, {
    not, either, both, any, all, allPass, anyPass,
    isEmpty, fromPairs, toPairs,
    reduceRight, chain, splitAt, curry, zip, contains,
    forEach as each, forEachObjIndexed as eachObj,
    take, mapAccum,
} from 'ramda'

import fishLib, {
    log, info, warn, error, green, yellow, magenta, brightRed, cyan, brightBlue,
    sprintf, forceColors, getopt, shellQuote,
} from 'fish-lib'

import {
    pipe, compose, composeRight,
    ok, ifOk, ifPredicate, whenOk, whenPredicate,
    id, tap, recurry, roll,
    map, filter, reject, reduce, flip, flip3,
    join, split, last, head, tail,
    dot, dot1, dot2, side, side1, side2,
    cond, condS, guard, guardV, otherwise,
    sprintf1, sprintfN, rangeBy,
    noop, blush, always, T, F,
    prop, path, has, hasIn,
    bindPropTo, bindProp, bindTo, bind,
    assoc, assocPath, assocM, assocPathM,
    concatTo, concat, appendTo, append,
    concatToM, concatM, appendToM, appendM,
    merge, mergeTo, mergeM, mergeToM,
    mergeIn, mergeInTo, mergeInM, mergeInToM,
    updateM, update, updatePathM, updatePath,
    lets, letS, compactOk, compact,
    die, raise, decorateException, exception,
    lt, gt, eq, ne, lte, gte,
    factory, factoryProps,
    isInteger,
    allAgainst,
    againstAll,
    againstAny,
    anyAgainst,
    bothAgainst,
    eitherAgainst,
    againstBoth,
    againstEither,
    list,
} from '../../index'

	const isOdd = x => isInteger (x) && (x % 2 !== 0)
	const isLt3 = 3 | lt
	const truthy = id

	; [1, 2, 3, 4, 5] | ramda.all (isOdd) // false
	; [1, 3, 5] | ramda.all (isOdd) // true

	; [1, 2, 3, 4, 5] | allAgainst (isOdd) // false
	; [1, 3, 5] | allAgainst (isOdd) // true

	const allTruthy = allAgainst (truthy)
	; [1, 2, 3, 4, 5, null] | allTruthy // false
	; [1, 2, 3, 4, 5] | allTruthy  // 5

	const isOddAndLt3 = againstAll ([isOdd, isLt3])
	1   | isOddAndLt3 // true
	1.1 | isOddAndLt3 // false
	2   | isOddAndLt3 // false
	3   | isOddAndLt3 // false

	const isOddOrLt3 = againstAny ([isOdd, isLt3])
	2   | isOddOrLt3 // true
	3   | isOddOrLt3 // true
	4   | isOddOrLt3 // false
	5   | isOddOrLt3 // true

	// ramda doesn't have these: multiple values + multiple predicates

	const allOddAndLt3 = allAgainst (isOddAndLt3)
	; [1, 2, 3, 4, 5] | allOddAndLt3 // false
	; [1, 3, 5] | allOddAndLt3 // true

	const allOddOrLt3 = allAgainst (isOddOrLt3)
	; [1, 2, 3, 4, 5] | allOddOrLt3 // false
	; [2, 3, 5] | allOddOrLt3 // true

	const anyOddAndLt3 = anyAgainst (isOddAndLt3)
	; [3, 4, 5] | anyOddAndLt3 // false
	; [2, 4, 5] | anyOddAndLt3 // false
	; [1, 4, 5] | anyOddAndLt3 // true

	const anyOddOrLt3 = anyAgainst (isOddOrLt3)
	; [4, 6] | anyOddOrLt3 // false
	; [3, 6] | anyOddOrLt3 // true
	; [3, 5] | anyOddOrLt3 // true
	; [2, 6] | anyOddOrLt3 // true
	; [1, 6] | anyOddOrLt3 // true

	const bothTruthy = bothAgainst (truthy)
	const eitherOdd = eitherAgainst (isOdd)

	// --- i.e. ; [null, 3] | allTruthy
	bothTruthy (null, 3) // false
	bothTruthy (1, 3) // 3

	eitherOdd (1, 2) // true
	eitherOdd (null, 2) // false
	eitherOdd (2, 4) // false

	const isOddAndLt3Alt = againstBoth (isOdd) (isLt3)
	1   | isOddAndLt3Alt // true
	1.1 | isOddAndLt3Alt // false
	2   | isOddAndLt3Alt // false
	3   | isOddAndLt3Alt // false

	const isOddOrLt3Alt = againstEither (isOdd) (isLt3)
	2   | isOddOrLt3Alt // true
	3   | isOddOrLt3Alt // true
	4   | isOddOrLt3Alt // false
	5   | isOddOrLt3Alt // true

