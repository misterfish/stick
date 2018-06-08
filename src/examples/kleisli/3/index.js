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
    add, multiply,
    modulo,
    passTo1,
    rangeTo,
} from '../../../index'

import { some, none, } from 'bilby'

const flatMap = dot1 ('flatMap')
const getOrElse = dot1 ('getOrElse')

const k = flatMap

const inc = add (1)

const isOdd = modulo (2) >> ne (0)
const ifLt0 = 0 | lt | ifPredicate
const ifOdd = isOdd | ifPredicate

const step1 = ifLt0 (none | always, inc >> some)
const step2 = ifOdd (none | always, inc >> some)

const transform =
     k (step1)
  >> k (step2)

; -1 | rangeTo (3)
     | map (some >> transform >> getOrElse ('none'))
     | log
