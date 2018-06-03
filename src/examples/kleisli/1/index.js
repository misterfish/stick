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
} from '../../../index'

import Kleisli, { k, } from './kleisli'

import { some, none, } from 'bilby'

const flatMap = dot1 ('flatMap')
const getOrElse = dot1 ('getOrElse')

// a | b | c --> c.call (b.call (a))

// const composeAsMethodsRight = (...args) => args.reduce ((b, a) => a.compose (b))
// const composeAsMethods      = (...args) => args.reduce ((a, b) => a.compose (b))
const composeAsMethodsRight = (b, a) => a.compose (b)
const composeAsMethods      = (a, b) => a.compose (b)

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
const step1 = tap (logWith ('step1'))
    >> ifLt0 (none | always, inc >> some)
const step2 = tap (logWith ('step2 begin')) >> ifOdd (none | always, inc >> some)
    >> tap (getOrElse ('none') >> logWith ('step2 return'))

const step3 = inc >> some

// console.log ('k(some)', k(some))
// console.log ('k(some).compose', k(some).compose)
// console.log ('k(some) >> k (step1)', k(some) >> k (step1))
// console.log ('k(some) >> k (step1) >> k(step2)', k(some) >> k (step1) >> k(step2))
// console.log ('k(some).call(null, 10).getOrElse(42)', k(some).call(10).getOrElse(42))

const doit =
     some
  >> k ( tap (logWith ('helloooo')))
  >> k (step1)
  >> k (step2)

console.log ('hello')

// ; -5 | rangeTo (5)
//      | map (doit | bindProp ('call'))
//      | map (getOrElse ('none'))
//      | log

// ;( (k (step1))) .call (some (3))
// | getOrElse ('none') // 4

//;( (k (step1) >> k (step2))) .call (some (3))
// const composed = k (k (step2, 'step2').compose (step1, 'step1'), 'composed')
//const composed = k (step1 >> k (step2))
const composed = (id >> k (step1) >> k (step2) >> k (step3))

composed (some (3))
| getOrElse ('none')
| log

// 1) Kleisli as an object
// 2) Kleisli copies itself into functions
// 3) pure stick

function enhanceFunction () {
    const proto = {
        compose (b) {
            return (...args) => this (b (...args))
        },
    }
    // Function.prototype | mergeM (proto)
    mergeM (proto) (Function.prototype)
}
