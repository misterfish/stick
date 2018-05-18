#!/usr/bin/env node

defineBinaryOperator ('|', (a, b) => b (a))
defineBinaryOperator ('>>', curry ((a, b) => compose (b, a)))
defineBinaryOperator ('<<', curry ((a, b) => compose (a, b)))

import ramda, {
    uncurryN,
    always, not,
    either, both,
    any, all, allPass, anyPass,
    isEmpty, tap, has, hasIn, flip, fromPairs, toPairs, assoc, assocPath, head,
    tail, reduceRight, chain, identity as id, reduce, map, filter, reject, join,
    split, splitAt, prop, curry, zip, contains,
    forEach as each, forEachObjIndexed as eachObj, complement,
    isNil, addIndex, take, equals, mapAccum, compose, append, concat,
    T, F, repeat as rRepeat, times as rTimes, range,
} from 'ramda'

import fishLib, {
    log, info, warn, error, green, yellow, magenta, brightRed, cyan, brightBlue,
    sprintf, forceColors, getopt, shellQuote,
} from 'fish-lib'

import {
    ok, ifOk, ifTrue, ifFalse, ifYes, ifNo, ifPredicate, ifEmpty,
    whenOk, whenTrue, whenFalse, whenYes, whenNo, whenPredicate, whenEmpty,
    dot, dot1, dot2, nieuw, nieuw1, nieuw2,
    cond, guard, otherwise,
    sprintf1, sprintfN, times, rangeBy,
    noop, doe, blush,
    concatTo, concatFrom, appendTo, appendFrom, appendToMut,
    invoke, applyN, pass1,
    laat, laatO, laats, laatsO,
    compactOk, compact,
    lt, gt, eq, ne, lte, gte,
    die,
    // side, side1, side2, side3, side4, side5, sideN,
} from '../../../index'

import { bench, } from '../util'

const logWith = header => (...args) => log (... [header, ...args])

const obj = {
    flag: true,
    toggle (n) {
        for (let i = 0; i < n; i++) this.flag = ! this.flag
    },
    add5 (a, b, c, d, e) { return a + b + c + d + e },
    get () { return this.flag },
}

export const mydot = (prop) => (o) => o[prop] ()
export const myside = (prop) => (o) => (o[prop] (), o)
export const myside1 = (prop) => (val) => (o) => (o[prop] (val), o)

const dot1JSep = prop => val => o => o [prop] (val)
const dot1JCom = (prop, val) => o => o [prop] (val)

const side1JSep = prop => val => o => (dot1JSep (prop) (val) (o), o)
const side1JCom = (prop, val) => o => (dot1JCom (prop, val) (o), o)

const side1C = curry (
    (prop, val) => tap (dot1 (prop) (val))
)

const dot5J = prop => val1 => val2 => val3 => val4 => val5 => o => o[prop] (val1, val2, val3, val4, val5)
const dot5C = curry ((prop, val1, val2, val3, val4, val5, o) => o [prop] (val1, val2, val3, val4, val5))

const toggleJSep = side1JSep ('toggle') (3)
const toggleJCom = side1JCom ('toggle', 3)
const toggleC = side1C ('toggle') (3)

const add5J = dot5J ('add5')
const add5C = dot5C ('add5')

const n = 1e6

const testSide1JSep = _ => obj | toggleJSep
const testSide1JCom = _ => obj | toggleJCom
const testSide1C = _ => obj | toggleC

const testDot5J = _ => obj | add5J (5, 6, 7, 8, 9)
const testDot5C = _ => obj | add5C (5, 6, 7, 8, 9)

// --- should not be called recurry, because the resulting function is not curried.
// there should be a similar version called recurry.
// then the stick functions can be implemented with it ... ?
// note that this function does not have a well-defined arity.
const roll = (f) => (...args) => {
  let g = f
  for (const i of args) g = g (i)
  return g
}

// const r = (a => b => c => a * b * c) | recurry
// r (1, 2, 3) = roll (orig) (1, 2, 3)
// r (1, 2)    = roll (orig) (1, 2)
// r (1) = roll (orig) (1)
// r (1) (2) (3)
// r ()
const recurry = (n) => (f) => (...args) => {
    const rolled = roll (f) (...args)
    const dn = n - args.length
    return dn <= 1 ? rolled
                   : recurry (dn) (rolled)
}

// if maximising iterations per millisecond is crucial to you, you can import the manual versions
// directly.
// everyone else will probably want to use the normal versions.

const multiply5J = a => b => c => d => e => a * b * c * d * e

const multiply5U = multiply5J | roll
const multiply5UR = multiply5J | uncurryN (5)
const testUncurryMineMultiply5 = _ => multiply5U (3, 4, 5, 6, 7)
const testUncurryTheirsMultiply5 = _ => multiply5UR (3, 4, 5, 6, 7)

const multiplyBy120US = multiply5U (2, 3, 4, 5)
const testMultiplyBy120US = _ => multiplyBy120US (5)

const multiplyBy120UR = multiply5UR (2, 3, 4, 5)
const testMultiplyBy120UR = _ => multiplyBy120UR (5)

const curryMultiply5 = curry ((a, b, c, d, e) => a * b * c * d * e)
// --- 12 times faster than curry
const manualMultiply5 = a => b => c => d => e => a * b * c * d * e
// --- 1.5 times faster than curry
// curry is of course much more pleasant to write.
// and you can curry any function, even one you didn't write.
const manualPlusRollMultiply5 = manualMultiply5 | roll
const recurryMultiply5 = manualMultiply5 | recurry (5)
const manualUncurryNMultiply5 = manualMultiply5 | uncurryN (5)

const testCurryMultiply5 = () => {
    curryMultiply5 (1, 2, 3, 4, 5)
    curryMultiply5 (1, 2, 3, 4) (5)
    curryMultiply5 (1, 2, 3) (4) (5)
}

const testManualPlusRollMultiply5 = () => {
    manualPlusRollMultiply5 (1, 2, 3, 4, 5)
    manualPlusRollMultiply5 (1, 2, 3, 4) (5)
    manualPlusRollMultiply5 (1, 2, 3) (4) (5)
}

const testManualMultiply5 = () => {
    manualMultiply5 (1) (2) (3) (4) (5)
    manualMultiply5 (1) (2) (3) (4) (5)
    manualMultiply5 (1) (2) (3) (4) (5)
}

// --- about 4 times faster than uncurry
const testRecurryMultiply5 = () => {
    recurryMultiply5 (1, 2, 3, 4, 5)
    recurryMultiply5 (1, 2, 3, 4) (5)
    recurryMultiply5 (1, 2, 3) (4) (5)
}

// --- more than 3 times slower than just currying with ramda
const testManualUncurryNMultiply5 = () => {
    manualUncurryNMultiply5 (1, 2, 3, 4, 5)
    manualUncurryNMultiply5 (1, 2, 3, 4) (5)
    manualUncurryNMultiply5 (1, 2, 3) (4) (5)
}

// side1, js curry, separate: 1000000 iters, took 54.0 ms (18518.5 iters / ms)
// side1, js curry, combined: 1000000 iters, took 51.0 ms (19607.8 iters / ms)
// side1, rd curry: 1000000 iters, took 407.0 ms (2457.0 iters / ms)

// --- conclusions:
// separate/combined: negligible
// js curry: much faster.
// ramda curry is definitely fast enough for apps.
// my 'roll' is 3-4 times faster than uncurryN, and doesn't need n.
//
// Please keep in mind that the speeds we are talking about here only come into play when you're
// looping millions of times or more per second.
// Even the 'slow' version is perfectly acceptable for apps and it is almost certianly not the reason your app is slow.

const suite1 = [
    _ => bench ('side1, js curry, separate', n) (testSide1JSep),
    _ => bench ('side1, js curry, combined', n) (testSide1JCom),
    _ => bench ('side1, rd curry', n) (testSide1C),

    // dot5, js curry: 1000000 iters, took 57.0 ms (17543.9 iters / ms)
    // dot5, rd curry: 1000000 iters, took 549.0 ms (1821.5 iters / ms)

    _ => bench ('dot5, js curry', n) (testDot5J),
    _ => bench ('dot5, rd curry', n) (testDot5C),
]

const suite2 = [
    _ => bench ('uncurry, mine, multiply, arity 5', n) (testUncurryMineMultiply5),
    _ => bench ('uncurry, theirs, multiply, arity 5', n) (testUncurryTheirsMultiply5),
    _ => bench ('partial uncurry, mine', n) (testMultiplyBy120US),
    _ => bench ('partial uncurry, theirs', n) (testMultiplyBy120UR),

    _ => bench ('curry, theirs', n) (testCurryMultiply5),
    _ => bench ('manual + roll', n) (testManualPlusRollMultiply5),
    _ => bench ('manual', n) (testManualMultiply5),
    _ => bench ('manual + uncurryN', n) (testManualUncurryNMultiply5),
    _ => bench ('manual + recurry', n) (testRecurryMultiply5),
]

const suites = [
    suite1,
    suite2,
]

// suites | map (invoke | each)

const rec = manualMultiply5 | recurry (5)

rec (1, 2, 3, 4, 5) | log
rec (1, 2, 3, 4) (5) | log
rec (1, 2, 3) (4, 5) | log
rec (1, 2, 3) (4) (5) | log

rec (1, 2) (3, 4, 5) | log
rec (1, 2) (3, 4) (5) | log
rec (1, 2) (3) (4) (5) | log
rec (1, 2) (3) (4, 5) | log

rec (1) (2) (3, 4, 5) | log
rec (1) (2) (3) (4, 5) | log
rec (1) (2) (3, 4) (5) | log
rec (1) (2) (3) (4) (5) | log

rec (1) (2, 3) (4, 5) | log
rec (1) (2, 3) (4) (5) | log

rec (1) (2, 3, 4) (5) | log


// in the js version we could enforce
// o | dot2 ('theprop', x, y)
// or
// o | dot2 ('theprop') (x) (y)
//
// solution:
// allow a 'fast' mode for power users
// import { dot2, } from 'stick/fast'
// o | dot2 ('theprop') (x) (y) // --- style enforced as long as symbol is in scope
// import { dot2, } from 'stick'
// o | dot2 ('theprop') (x) (y) // --- or
// o | dot2 ('theprop', x) (y) // --- or
// o | dot2 ('theprop') (x, y) // --- or
// o | dot2 ('theprop', x, y) // --- or
//
// rationale: it has to be possible to keep this fast. this will be the main backbone of the object
// system.
//
//
// dus:
//  reference version
//  normal version (curry, but no flip, etc.)
//  fast version (js curry, no ramda if possible)
//
// now compare a `curry` function with a manual + roll
