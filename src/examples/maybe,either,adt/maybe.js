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
    ampersand, asterisk,
    flattenPrototype,
  divideInto,
  timesV,
} from '../../index'

import { some as Just, none as Nothing, } from 'bilby'

const toMaybe = o => o | ifOk (
  Just,
  Nothing | always,
)

const flatMap = dot1 ('flatMap')
const fold = dot2 ('fold')

const translations = {
    rouge: 'red',
    bleu: 'blue',
    vert: 'green',
}

const count = {
    red: 5,
    blue: 0,
    // green missing
}

const formatAnswer = input => answer => [input | yellow, answer] | sprintfN ('%s → %s')

const go = _ =>
  ['rouge', 'bleu', 'vert', 'blanc']
  | map (doit)
  | tap (map (log))

const doit = x => x | calculate | formatAnswer (x)

const calculate = french => doLookup (french)
  | fold (
    answer => answer + ' ' + green ('✔'),
    red ('✘') | always,
  )

const doLookup = french => french
  | getTranslation
  | flatMap (getCount)
  | flatMap (getQuotient)

const getTranslation = french =>
  translations [french] | toMaybe

const getCount = english =>
  count [english] | toMaybe

const getQuotient = condS ([
  0 | eq    | guard (_ => Nothing),
  otherwise | guard (cnt => Just (10 / cnt)),
])

go ()
