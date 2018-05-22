#!/usr/bin/env node

defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import ramda, {
    multiply,
    curryN,
    sum,
    always, not,
    either, both,
    any, all, allPass, anyPass,
    isEmpty, tap, has, hasIn, flip, fromPairs, toPairs, assoc, assocPath, head,
    tail, reduceRight, chain, identity as id, reduce, map, filter, reject, join,
    split, splitAt, prop, curry, zip, contains,
    forEach as each, forEachObjIndexed as eachObj, complement,
    isNil, addIndex, take, equals, mapAccum, append, concat,
    T, F, repeat as rRepeat, times as rTimes, range,
} from 'ramda'

import fishLib, {
    log, info, warn, error, green, yellow, magenta, brightRed, cyan, brightBlue,
    sprintf, forceColors, getopt, shellQuote,
} from 'fish-lib'

import {
    pipe, compose, composeRight,
    ok, ifOk, ifTrue, ifFalse, ifYes, ifNo, ifPredicate, ifEmpty,
    whenOk, whenTrue, whenFalse, whenYes, whenNo, whenPredicate, whenEmpty,
    dot, dot1, dot2, nieuw, nieuw1, nieuw2,
    side,
    cond, guard, otherwise,
    sprintf1, sprintfN, times, rangeBy,
    noop, doe, blush,
    concatTo, concatFrom, appendTo, appendFrom, appendToMut,
    invoke, applyN, pass1,
    laat, laatO, laats, laatsO,
    compactOk, compact,
    lt, gt, eq, ne, lte, gte,
    factory, factoryInit, factoryProps,
    mixinPreM, mixinM,
    mixinNM, mixinPreNM,
    flipC,
} from '../../index'

const logWith = header => (...args) => log (... [header, ...args])

const create = 'create' | dot1
const init = 'init' | side
const speak = 'speak' | dot

const animalProto = {
    speak () { "don't know how to speak" | die },
}

const dogProto = {
    init () { return this },
    speak () { return this.loud ? 'WOOF' : 'woof '},
}

const dogProps = {
    loud: void 8,
    type: 'dog',
}

const cheatProto = {
    cheat: howMuch => 'i cheat ' + howMuch,
}

const eatProto = {
    eat: howMuch => 'i eat ' + howMuch,
}

const oratorProto = {
    practice: noop,
    speak: _ => 'blah blah blah',
}

const fac1 = dogProto | factory | factoryProps (dogProps)

fac1 | create ({})              | init | speak | log
fac1 | create ({ loud: true, }) | init | speak | log
fac1 | create ({})              | init | prop ('type') | log

const cheat = dot1 ('cheat')
const eat = dot1 ('eat')

const fac2 = dogProto | Object.create | mixinNM ([ cheatProto, eatProto, oratorProto, ]) | factory | factoryProps (dogProps)
const dogRuinedByAnOrator = fac2 | create ({ loud: true, }) | init

dogRuinedByAnOrator | cheat ('a lot') | log
dogRuinedByAnOrator | eat ('a bit') | log
dogRuinedByAnOrator | speak | log

// which speak do you want?
// pre to keep dog
// post for orator

// also a good place to show tap
// const fac3 = dogProto | Object.create | mixinPreNM ([ cheatProto, eatProto, oratorProto, ]) | factory | factoryProps (dogProps)
const fac3 = dogProto | Object.create | mixinPreM (oratorProto, ) | factory | factoryProps (dogProps)
const dogSpeaksTheWayShesSupposedTo = fac3 | create ({ loud: true, }) | init
dogSpeaksTheWayShesSupposedTo | speak | logWith ('no blah blah:')

const a = { speak: 'orig' }
const b = { speak:  'ruined' }
a | mixinPreM (b) | log
