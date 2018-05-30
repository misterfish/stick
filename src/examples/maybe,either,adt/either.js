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
    red, blue,
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
    multiply,
    ampersand,
    flattenPrototype,
  divideInto,
  timesV,
  asterisk as asteriskN,
  list,
  prependTo,
} from '../../index'

import { left as Left, right as Right, } from 'bilby'

const toEither = l => ifOk (
  Right,
  l | Left | always,
)

const flatMap = dot1 ('flatMap')
const fold = dot2 ('fold')
const arrowSnd = f => ([a, b]) => [a, b | f]
const foldArrow = f => ([a, b]) => f (a, b)
// @todo remove
const propOf = o => prop => o [prop]

const translations = {
  rouge: 'red',
  bleu: 'blue',
  vert: 'green',
  // blanc undefined
}

const count = {
  red: 5,
  blue: 0,
  // green undefined
}

const formatAnswer = list >> asteriskN ([yellow, id]) >> sprintfN ('%s → %s')

const getTranslation = propOf (translations) >> toEither ('no translation')
const getCount       = propOf (count)        >> toEither ('no count')

const getQuotient = condS ([
  0 | eq    | guardV ('count was zero' | Left),
  otherwise | guard  (divideInto (10) >> Right),
])

const doLookup = getTranslation
  >> flatMap (getCount)
  >> flatMap (getQuotient)

const calculate = doLookup >> fold (
  prependTo (['✘' | red])   >> sprintfN ('%s %s'),
  prependTo (['✔' | green]) >> sprintfN ('%s %s'),
)

const doit = timesV (2)
  >> arrowSnd (calculate)
  >> foldArrow (formatAnswer)

const go = _ =>
  ['rouge', 'bleu', 'vert', 'blanc']
  | map (doit)
  | tap (map (log))

go ()
