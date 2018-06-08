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
} from '../../../index'

const init = dot1 ('init')
const create = dot ('create')

const flatMap = dot1 ('flatMap')

// --- flatMap should happen during `call`, not `compose`, so that a chain consisting of a single
// function works as expected.
// --- we'll refer to `k` style functions as 'magic'

const proto = {
    init (f) {
        return this | mergeM ({
            _f: f,
        })
    },
    call (fx) {
        return fx.flatMap (x => this._f (x))
    },
    compose (b) {
        // --- `b` is a normal function
        // --- `this` is a magic one
        return (...args) => this.call (b (...args))
    },
}

const Kleisli = proto | factory

export const k = f => Kleisli | create | init (f)
