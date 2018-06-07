#!/usr/bin/env node

defineBinaryOperator ('|',  (...args) => pipe         (...args))
// defineBinaryOperator ('<<', (...args) => compose      (...args))
// defineBinaryOperator ('>>', (...args) => composeRight (...args))

defineBinaryOperator ('>>', (...args) => composeAsMethodsRight (...args))

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
    composeAsMethodsRight,
    composeAsMethods,
} from '../../../index'

import { k, } from './kleisli'

import { some, none, } from 'bilby'

const flatMap = dot1 ('flatMap')
const getOrElse = dot1 ('getOrElse')

const inc = add (1)
const double = multiply (2)
const kinc = k (inc)
const kdouble = k (double)

// const incThenDouble = kdouble >> kinc
// log (incThenDouble.call (2))

enhanceFunction ()
// ; (inc >> double).call (null, 2) // 6
// | log

const isOdd = modulo (2) >> ne (0)
const ifLt0 = 0 | lt | ifPredicate
const ifOdd = isOdd | ifPredicate

const logWith = (header) => (...args) => log (... [header, ...args])

const step1 = ifLt0 (none | always, inc >> some)
const step2 = ifOdd (none | always, inc >> some)

// works, 1-style
// const doit =
//      some
//   >> k (step1)
//   >> k (step2)

// --- um looks familiar
//const doit = k (step1) >> k (step2)
const doit = k (step1 >> k (step2))

; [(-3), (1), (2)] | map (some >> doit >> getOrElse ('none'))
                   | map (log)

function enhanceFunction () {
    const proto = {
        compose (b) {
            return (...args) => this (b (...args))
        },
    }
    // Function.prototype | mergeM (proto)
    mergeM (proto) (Function.prototype)
}
