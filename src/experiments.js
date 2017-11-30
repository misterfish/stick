#!/usr/bin/env node

defineBinaryOperator ('|', (a, b) => b (a))
defineBinaryOperator ('>>', curry ((a, b) => compose (b, a)))
defineBinaryOperator ('<<', curry ((a, b) => compose (a, b)))

import ramda, {
    find,
  either,
    isEmpty, tap, has, hasIn, flip, fromPairs, toPairs, assoc, assocPath, head,
    tail, reduceRight, chain, identity, reduce, map, filter, reject, join,
    split, prop, curry, zip, contains,
    forEach as each, forEachObjIndexed as eachObj, complement,
    isNil, addIndex, take, equals, mapAccum, compose, append, concat,
    T, F, repeat as rRepeat, times as rTimes,
    not,
} from 'ramda'

import fishLib, {
    log, info, warn, error, green, yellow, magenta, brightRed, cyan, brightBlue,
    sprintf, forceColors, getopt, shellQuote,
} from 'fish-lib'

import {
    ok, ifOk, dot, dot1, dot2, ifTrue, cond, whenOk, appendFrom, pass1, sprintf1, sprintfN, times,
    noop, condEquals, concatTo, guard, otherwise, doe, ifPredicate, applyN, appendTo,
    laat, laatDat, laatStar, applyScalar, assocMut, compactOk,
    gt, eq, ne, lt,
    laatStarDat, blush,
    ifEmpty, range, rangeBy,
    invoke,
  laatStar as laats,
  xMatch,
} from './index'

const notOk = isNil
const guardA = blush >> guard
const upper = dot ('toUpperCase')

// --- null for invalid, match object for valid.
const validateLeserID = xMatch (
  /^ (?:Leser_)? ([0-9a-fA-F_] {3,4}) $/
)

const makeValidLeserID = cond ([
  either (notOk, isEmpty) | guardA (    [void 8, void 8]),
  otherwise | guard (
    validateLeserID >> cond ([
      ok | guard (m =>                  [true, m [1] | upper | concatTo ('Leser_')]),
      otherwise | guardA (              [false, void 8])
    ])
  )
])

const makeValidLeserIDTrad = x => {
  if (x === undefined || x === null || x === '') return [void 8, void 8]
  const v = validateLeserID (x)
  if (v === undefined || v === null) return [false, void 8]
  return [true, 'Leser_' + v [1].toUpperCase ()]
}

// stick is tied up with ramda. so actually it's no 'either'
const makeValidLeserIDNoCondNoRamda = x => {
  if (x | notOk) return [void 8, void 8]
  if (x | isEmpty) return [void 8, void 8]
  const v = validateLeserID (x)
  if (v | notOk) return [false, void 8]
  return [true, 'Leser_' + v [1].toUpperCase ()]
}

; ['', '123', 'abc', '12AC', '12At', '12ac', '12at', '12345', 'Leser_123', 'Leser_abc', 'Leser_ABc', 'Leser_aBT', 'Leser_1234f']
  | map (x => x + ' : ' + (x | makeValidLeserID) + ' trad: ' + (x | makeValidLeserIDTrad))
  | join ('\n')
  | log

const bench = curry ((n, f) => {
  const t1 = Date.now ()
  for (let i = 0; i < n; i++)
    f ()
  const td = Date.now () - t1
  return [n | yellow, (td / n) | green]
  | sprintfN ("Num calls %s, time per call %s")
})

info ('trad')
; [
  (_ => 'Leser_123' | makeValidLeserIDTrad),
  (_ => 'Leser_abT' | makeValidLeserIDTrad),
  (_ => '12AC' | makeValidLeserIDTrad),
]
| map (bench (1000))
| log

info ('no cond')
; [
  (_ => 'Leser_123' | makeValidLeserIDNoCondNoRamda),
  (_ => 'Leser_abT' | makeValidLeserIDNoCondNoRamda),
  (_ => '12AC' | makeValidLeserIDNoCondNoRamda),
]
| map (bench (1000))
| log

info ('functional')
; [
  (_ => 'Leser_123' | makeValidLeserID),
  (_ => 'Leser_abT' | makeValidLeserID),
  (_ => '12AC' | makeValidLeserID),
]
| map (bench (1000))
| log

