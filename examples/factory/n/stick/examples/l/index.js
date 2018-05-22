#!/usr/bin/env node

defineBinaryOperator ('|', (a, b) => b (a))
defineBinaryOperator ('>>', curry ((a, b) => compose (b, a)))
defineBinaryOperator ('<<', curry ((a, b) => compose (a, b)))

import ramda, {
    splitAt,
    isEmpty, tap, has, hasIn, flip, fromPairs, toPairs, assoc, assocPath, head,
    tail, reduceRight, chain, identity, reduce, map, filter, reject, join,
    split, prop, curry, zip, contains, range,
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
        ifEmpty,
        laatStarDat, blush,
} from 'sanda'

// const length = prop ('length')

const laatStarN = laatStarDat

// --- n means n + 1 args.
const laatStar1 = curry ((a, z) => [[a], z] | applyN (laatStarN))
const laatStar2 = curry ((a, b, z) => [[a, b], z] | applyN (laatStarN))
const laatStar3 = curry ((a, b, c, z) => [[a, b, c], z] | applyN (laatStarN))
const laatStar4 = curry ((a, b, c, d, z) => [[a, b, c, d], z] | applyN (laatStarN))
const laatStar5 = curry ((a, b, c, d, e, z) => [[a, b, c, d, e], z] | applyN (laatStarN))
const laatStar6 = curry ((a, b, c, d, e, f, z) => [[a, b, c, d, e, f], z] | applyN (laatStarN))

const length1 = ifEmpty (
    0 | blush,
    laatStar3 (
        head,
        tail,
        (_, h, t) => 1 + length (t),
    )
)

const length2 = ifEmpty (
    0 | blush,
    splitAt (1) >> (([h, t]) => 1 + length (t)),
)

const headTail = f => splitAt (1) >> f

// --- not tco.
const length3 = ifEmpty (
    0 | blush,
    headTail (([h, t]) => 1 + length (t)),
)

const length = (() => {
    const _length = (xs, n) => xs.length === 0
        ? 0
        : _length (xs | tail, n + 1)
    return xs => _length (xs, 0)
}) ()

; [
    [1, 2, 3],
    [4],
    [],
    [8, 9, 10, 11],
    range (1, 10e3),
]
| map (xs => xs
    | length
    | appendTo ([xs | join ('|')])
    | sprintfN ("The length of %s is %s")
)
| join ('\n')
| log
