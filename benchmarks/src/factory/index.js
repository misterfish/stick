#!/usr/bin/env node

defineBinaryOperator ('|', (a, b) => b (a))
defineBinaryOperator ('>>', curry ((a, b) => compose (b, a)))
defineBinaryOperator ('<<', curry ((a, b) => compose (a, b)))

import ramda, {
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
    side, side1,
} from 'stick'

import DogTrad from './dog-trad'

import {
    DogSimple as DogStickSimple,
    DogSimpleTest as DogStickSimpleTest,
    DogProps as DogStickProps,
    DogInit as DogStickInit,
    DogInitComposey as DogStickInitComposey,
    DogSimpleMixinComposey as DogStickSimpleMixinComposey,
    DogSimpleMixinNotComposey as DogStickSimpleMixinNotComposey,
    // DogInit4 as DogStickInit4,
} from './dog-stick'

import { bench, } from '../util'

const logWith = header => (...args) => log (... [header, ...args])

const trad = n => () => {
    for (let i = 0; i < n; i++) new DogTrad ()
}

const stick = n => () => {
    for (let i = 0; i < n; i++) DogStickSimple.create ()
}

const trad2props = n => () => {
    for (let i = 0; i < n; i++) new DogTrad ({
        color: 'blue', speed: 'fast',
    })
}

const stick2props = n => () => {
    for (let i = 0; i < n; i++) DogStickSimple.create ({
        color: 'blue', speed: 'fast',
    })
}

// const tradTwoProps = n => () => {
//     for (let i = 0; i < n; i++) new DogTrad ({
//         'blue', 'fast'
// }

const stickTwoPropsWithInit = (n) => () => {
    for (let i = 0; i < n; i++) DogStickInit.create ({
        color: 'blue', speed: 'fast',
    })
}

const stickTwoPropsWithInitComposey = (n) => () => {
    for (let i = 0; i < n; i++) DogStickInitComposey.create ({
        color: 'blue', speed: 'fast',
    })
}

const stickTwoPropsCopying = (n) => () => {
    for (let i = 0; i < n; i++) DogStickSimple.create ({
        color: 'blue', speed: 'fast',
    })
}

const stickZeroPropsCopyingNoArg = (n) => () => {
    for (let i = 0; i < n; i++) DogStickSimple.create ()
}

const stickZeroPropsCopyingEmptyObject = (n) => () => {
    for (let i = 0; i < n; i++) DogStickSimple.create ({})
}


const stickTwoPropsCopyingTest = (n) => () => {
    for (let i = 0; i < n; i++) DogStickSimpleTest.create ({
        color: 'blue', speed: 'fast',
    })
}

const stickZeroPropsCopyingNoArgTest = (n) => () => {
    for (let i = 0; i < n; i++) DogStickSimpleTest.create ()
}

const stickZeroPropsCopyingEmptyObjectTest = (n) => () => {
    for (let i = 0; i < n; i++) DogStickSimpleTest.create ({})
}

const testLaatsData = _ => [
    { x: 100, y: 200 },
    { x: 200, y: 250 },
    { x: 100, y: 200 },
    { x: 200, y: 250 },
    { x: 100, y: 200 },
    { x: 200, y: 250 },
    { x: 100, y: 200 },
    { x: 200, y: 250 },
    { x: 100, y: 200 },
    { x: 200, y: 250 },
    { x: 100, y: 200 },
    { x: 200, y: 250 },
    { x: 100, y: 200 },
    { x: 200, y: 250 },
]

const testLaats3 = (ary) => () => {
    const [width, scale] = [100, 1.5]
    const copy = [...ary]
    copy.sort ((a, b) => laats3 (
        _ => (a.y*(width/scale))+a.x,
        _ => (b.y*(width/scale))+b.x,
        (va, vb) => va>vb?1:va==vb?0:-1,
    ))
}

const testNoLaats3 = (ary) => () => {
    const [width, scale] = [100, 1.5]
    const copy = [...ary]
    copy.sort ((a, b) => {
        const va=(a.y*(width/scale))+a.x;
        const vb=(b.y*(width/scale))+b.x;
        return va>vb?1:va==vb?0:-1;
    })
}

const testMixinsComposey = (n) => () => {
    for (let i = 0; i < n; i++) DogStickSimpleMixinComposey.create ()
}
const testMixinsNotComposey = (n) => () => {
    for (let i = 0; i < n; i++) DogStickSimpleMixinNotComposey.create ()
}

export const mydot = (prop) => (o) => o[prop] ()
export const myside = (prop) => (o) => (o[prop] (), o)
export const myside1 = (prop) => (val) => (o) => (o[prop] (val), o)

const create = mydot ('create')
const speak = myside ('speak')
const sleep = myside ('sleep')
const repeat = myside1 ('repeat')

DogStickSimple.create () | speak | log

const testMethodsStick = Dog => _ => Dog
    | create
    | speak
    | sleep
    | repeat ('methods sticks')

const testMethodsDots = (Dog) => () => {
    const d = Dog.create ()
    d.speak ()
    d.sleep ()
    d.repeat ('methods dots')
}

const n = 1e4
const suite1 = [
    _ => bench ('trad create 1000', n) (trad (1000)),
    _ => bench ('stick create 1000', n) (stick (1000)),
]

const suite2 = [
    _ => bench ('trad create 1000 with 2 props', n) (trad2props (1000)),
    _ => bench ('stick create 1000 with 2 props', n) (stick2props (1000)),
]

const suite3 = [
    _ => bench ('stick, 1000, 2 props, with init', n) (stickTwoPropsWithInit (1000)),
    _ => bench ('stick, 1000, 2 props, with init composey', n) (stickTwoPropsWithInitComposey (1000)),
    _ => bench ('stick, 1000, 2 props, by copying', n) (stickTwoPropsCopying (1000)),
    _ => bench ('stick, 1000, 0 props, by copying, {}', n) (stickZeroPropsCopyingEmptyObject (1000)),
    _ => bench ('stick, 1000, 0 props, by copying, undef', n) (stickZeroPropsCopyingNoArg (1000)),
]

const suite3test = [
    // _ => bench ('stick, 1000, 2 props, with init', n) (stickTwoPropsWithInitTest (1000)),
    _ => bench ('stick, 1000, 2 props, by copying', n) (stickTwoPropsCopyingTest (1000)),
    _ => bench ('stick, 1000, 0 props, by copying, {}', n) (stickZeroPropsCopyingEmptyObjectTest (1000)),
    _ => bench ('stick, 1000, 0 props, by copying, undef', n) (stickZeroPropsCopyingNoArgTest (1000)),
]

const suiteLaats = [
    _ => bench ('laats with 3', n) (testLaats3 (testLaatsData ())),
    _ => bench ('no laats with 3', n) (testNoLaats3 (testLaatsData ())),
]

const suiteMixins = [
    _ => bench ('mixins composey, 1000 obj', n) (testMixinsComposey (1000)),
    _ => bench ('mixins not composey, 1000 obj', n) (testMixinsNotComposey (1000)),
]

const suiteMethods = [
    _ => bench ('methods as sticks', n) (testMethodsStick (DogStickSimple)),
    _ => bench ('methods as dots', n) (testMethodsDots (DogStickSimple)),
]

const suites = [
    suiteMethods,
    suite3,
    // suiteLaats,
    suiteMixins,
]



suites | map (invoke | each)
