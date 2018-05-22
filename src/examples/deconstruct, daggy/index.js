#!/usr/bin/env node

defineBinaryOperator ('|', (a, b) => b (a))
defineBinaryOperator ('>>', curry ((a, b) => compose (b, a)))
defineBinaryOperator ('<<', curry ((a, b) => compose (a, b)))
defineBinaryOperator ('>>', curry ((a, b) => compose (b, a)))
defineBinaryOperator ('<<', curry ((a, b) => compose (a, b)))

import ramda, {
    sum,
    and,
    multiply,
    always, not,
    either, both,
    any, all, allPass, anyPass,
    isEmpty, tap, has, hasIn, flip, fromPairs, toPairs, assoc, assocPath, head,
    tail, reduceRight, chain, identity as id, reduce, map, filter, reject, join,
    split, splitAt, prop, curry, zip, contains,
    forEach as each, forEachObjIndexed as eachObj, complement,
    isNil, addIndex, take, equals, mapAccum, compose, append, concat,
    T, F, repeat as rRepeat, times as rTimes,
} from 'ramda'

import fishLib, {
    log, info, warn, error, green, yellow, magenta, brightRed, cyan, brightBlue,
    sprintf, forceColors, getopt, shellQuote,
} from 'fish-lib'

import {
    ok, ifOk, ifTrue, ifFalse, ifYes, ifNo, ifPredicate, ifEmpty,
    whenOk, whenTrue, whenFalse, whenYes, whenNo, whenPredicate, whenEmpty,
    dot, dot1, dot2, nieuw, nieuw1, nieuw2,
    condS, guard, otherwise,
    sprintf1, sprintfN, times, range, rangeBy,
    noop, doe, blush,
    concatTo, concatFrom, appendTo, appendFrom, appendToMut,
    invoke, applyN, pass1,
    laat, letS,
    compactOk, compact,
    lt, gt, eq, ne, lte, gte,
    arg0, arg1,
    list,
} from '../../index'

import daggy from 'daggy'

const double = 2 | multiply
const triple = 3 | multiply

/*
 * line 1 can be easily reduced.
 * line 2 can be reduced using transformation X.
 * if we wish to go further we can reduce line 3 using the `arg1` function.
 *     arg1 (a, b, c, ...) returns b
 * you can think of the argument list as a tuple and arg1 as a function which plucks index 1,
 * somewhat like `snd` in haskell.
 * line 4 can be reducedd using the `list` function, which converts its arguments into an array:
 *     list (a, b, c, ...) = [a, b, c, ...]
 * so
 *     list (three, six, eighteen) // -> [three, six, eighteen]
 * can be composed with ramda's sum function.
 */

const Thing = daggy.taggedSum ('Thing', {
    Ding: ['color'],
    Dong: ['size'],
})

const cata = dot1 ('cata')

const { Ding, Dong, } = Thing

const ding = Ding ('blue')

const deconstruct = curry ((f, x) => f (x) (x))

const deconstructOld = curry ((f, x) => f (x, x))

const gip = { colors: ['blue', 'red'], brightness: 'bright' }
const gop = { colors: ['uglyblue', 'uglyyellow'], brightness: 'dull' }

const combineColors = ([x, y]) => and (x | eq ('blue'), y | eq ('red')) ?
    'purple' : 'gruel'

const guardA = always >> guard

const brightMapFold = ({ colors, }) => colors | combineColors | sprintf1 ('%s, brightly')
const dullMapFold = ({ colors, }) => colors | combineColors | sprintf1 ('%s, dully')

export const showThingOld = deconstructOld ((ding, { color, }) => ding | cata ({
    Ding: (color) => color | log,
}))

export const showThing = deconstruct (ding => ({ color, }) => ding | cata ({
    Ding: (color) => color | log,
}))

export const showThing1 = deconstruct (({ color, }) => cata ({
    Ding: (color) => color | log,
}))

ding | showThingOld
ding | showThing
ding | showThing1

// --- optional: repeat param, for clarity
// export const show = gip => gip | deconstruct (({ brightness, }) => brightness | cond ([

export const show = deconstruct (({ brightness, }) => brightness | condS ([
    'bright' | eq | guardA (brightMapFold >> log),
    otherwise | guardA (dullMapFold >> log),
]))

export const show1 = letS ([
    prop ('brightness'),
    (_, brightness) => brightness | condS ([
        'bright' | eq | guardA (brightMapFold >> log),
        otherwise | guardA (dullMapFold >> log),
    ]),
    (gip, _, f) => gip | f,
])

gip | show
gop | show

gip | show1
gop | show1
