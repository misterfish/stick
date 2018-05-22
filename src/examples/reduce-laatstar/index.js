#!/usr/bin/env node

defineBinaryOperator ('|', (a, b) => b (a))
defineBinaryOperator ('>>', curry ((a, b) => compose (b, a)))
defineBinaryOperator ('<<', curry ((a, b) => compose (a, b)))

import ramda, {
    isEmpty, tap, has, hasIn, flip, fromPairs, toPairs, assoc, assocPath, head,
    tail, reduceRight, chain, identity, reduce, map, filter, reject, join,
    split, prop, curry, zip, contains,
    curryN, uncurryN,
    forEach as each, forEachObjIndexed as eachObj, complement,
    isNil, addIndex, take, equals, mapAccum, compose, append, concat,
} from 'ramda'

import fishLib, {
    log, info, warn, error, green, yellow, magenta, brightRed, cyan, brightBlue,
    sprintf, forceColors,
} from 'fish-lib'

import {
    ok, ifOk, dot, dot1, dot2, ifTrue, cond, whenOk, appendFrom, pass1, sprintf1, sprintfN, times,
    noop, condEquals, concatTo, guard, otherwise, doe, ifPredicate, applyN, appendTo,
    laat, laatDat, laatStar, gt, eq, applyScalar, assocMut,
    ifEmpty, blush,
    laatStarDat,
} from 'sanda'

// 'uncurry' is really crazy.

const laatStarN = laatStarDat

// --- n means n + 1 args.
const laatStar1 = curry ((a, z) => [[a], z] | applyN (laatStarN))
const laatStar2 = curry ((a, b, z) => [[a, b], z] | applyN (laatStarN))
const laatStar3 = curry ((a, b, c, z) => [[a, b, c], z] | applyN (laatStarN))
const laatStar4 = curry ((a, b, c, d, z) => [[a, b, c, d], z] | applyN (laatStarN))
const laatStar5 = curry ((a, b, c, d, e, z) => [[a, b, c, d, e], z] | applyN (laatStarN))
const laatStar6 = curry ((a, b, c, d, e, f, z) => [[a, b, c, d, e, f], z] | applyN (laatStarN))

const myReduce3 = curry ((f, acc, xs) => xs | ifEmpty (
    _ => acc,
    _ => laatStar (
        _ => head (xs),
        _ => tail (xs),
        (h, t) => myReduce3 (f, f (acc, h), t),
    ),
))

const myReduce2 = curry ((f, acc, xs) => xs | ifEmpty (
    _ => acc,
    laatStarN ([
        head,
        tail,
        (_, h, t) => myReduce2 (f, f (acc, h), t),
    ])),
)

const myReduce1 = uncurryN (3) ((f, acc) => ifEmpty (
    acc | blush,
    laatStar3 (
        head,
        tail,
        (_, h, t) => t | myReduce1 (f) (f (acc, h)),
    )),
)

const myReduce4 = uncurryN (3) ((f, acc) => ifEmpty (
    acc | blush,
    laatStar5 (
        head,
        tail,
        myReduce4 (f) | blush,
        (_, h, t) => f (acc, h),
        (_, h, t, reducer, reduced) => t | reducer (reduced),
    )),
)

// --- sux.
const myReduce5 = uncurryN (3) ((f, acc) => ifEmpty (
    acc | blush,
    laatStar3 (
        myReduce5 (f) | blush,
        (xs) => xs | head | appendTo ([acc]) | applyN (f),
        (xs, reducer, reduced) => xs | tail | reducer (reduced),
    )),
)

// --- add all these numbers (55)
; [
    [myReduce1, green],
    [myReduce2, cyan],
    [myReduce3, yellow],
    [myReduce4, brightRed],
    [myReduce5, brightBlue],
]
| map (([myReduce, color]) => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    | myReduce ((a, b) => a + b, 0)
    | color
    | sprintf1 ("The answer is: %s")
)
| join ('\n')
| log
