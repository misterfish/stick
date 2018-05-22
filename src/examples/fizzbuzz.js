#!/usr/bin/env node

defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import ramda, {
    or, and,
    not, either, both, any, all, allPass, anyPass,
    isEmpty, tap, fromPairs, toPairs, head,
    tail, reduceRight, chain, splitAt, curry, zip, contains,
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
    id, recurry, roll,
    map, filter, reject, reduce,
    flip, flip3,
    join, split,
    last,
    dot, dot1, dot2,
    side, side1, side2,
    cond, condS, guard, guardV, otherwise,
    sprintf1, sprintfN, rangeBy,
    noop, blush, always, T, F,
    prop, path, has, hasIn,
    bindPropTo, bindProp, bindTo, bind,
    assoc, assocPath, update, updatePath,
    assocM, assocPathM, updateM, updatePathM,
    concatTo, concatFrom, appendTo, appendFrom,
    concatToM, concatFromM, appendToM, appendFromM,
    laat as lets, letS,
    compactOk, compact,
    lt, gt, eq, ne, lte, gte,
    factory, factoryProps,
    rangeTo,
} from 'stick'

// const { log, } = console
const bothN = ([a, b]) => both (a, b)
const orN = ([a, b]) => or (a, b)
const andN = ([a, b]) => and (a, b)
const isMultiple = x => y => y % x === 0
const isMultiple3 = 3 | isMultiple
const isMultiple5 = 5 | isMultiple
const isMultiple7 = 7 | isMultiple
const isMultiple3or7 = [isMultiple3, isMultiple7] | anyPass
const whenIsMultiple3or7 = isMultiple3or7 | whenPredicate
const logWith = header => (...args) => log (... [header, ...args])
const fizzBuzz1 = whenIsMultiple3or7 (log)


const makeRow = str => n => [n, str] | sprintfN ('%s: %s')
const row = str => makeRow (str) >> log
const fizz = row ('fizz')
const buzz = row ('buzz')
const fizzbuzz = row ('fizzbuzz')
const niks = row ('')

const fizzBuzz2 = letS ([
    isMultiple3,
    isMultiple5,
    (_, is3, is5) => [is3, is5] | andN,
    (n, is3, is5, is15) => cond (
        is15 | blush | guard (_ => n | fizzbuzz),
        is3  | blush | guard (_ => n | fizz),
        is5  | blush | guard (_ => n | buzz),
        otherwise    | guard (_ => n | niks),
    )
])

const fizzBuzz = fizzBuzz2

1 | rangeTo (100)
  | map (fizzBuzz)
