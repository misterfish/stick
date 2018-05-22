#!/usr/bin/env node

defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))


import ramda, {
    always, not,
    either, both,
    any, all, allPass, anyPass,
    isEmpty, tap, has, hasIn, flip, fromPairs, toPairs, assoc, assocPath, head,
    tail, reduceRight, chain, identity as id, reduce, map, filter, reject, join,
    split, splitAt, prop, curry, zip, contains,
    forEach as each, forEachObjIndexed as eachObj, complement,
    isNil, addIndex, take, equals, mapAccum, append, concat,
    T, F, repeat as rRepeat, times as rTimes, range,
} from 'ramda'

import fishLib, {
    log, info, warn, error, green, yellow, magenta, brightRed, cyan, brightBlue,
    sprintf, forceColors, getopt, shellQuote,
} from 'fish-lib'

import {
    ok, ifOk, ifTrue, ifFalse, ifYes, ifNo, ifPredicate, ifEmpty,
    whenOk, whenTrue, whenFalse, whenYes, whenNo, whenPredicate, whenEmpty,
    dot, dot1, dot2, nieuw, nieuw1, nieuw2,
    cond, guard, otherwise,
    sprintf1, sprintfN, times, rangeBy,
    noop, doe, blush,
    concatTo, concatFrom, appendTo, appendFrom, appendToMut,
    invoke, applyN, pass1,
    laat, laatO, laats, laatsO,
    compactOk, compact,
    lt, gt, eq, ne, lte, gte,
    pipe, compose, composeRight,
} from 'stick'

3 | log
