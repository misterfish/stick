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
    mergeAll as rMergeAll,
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
    mergeTo,
    arg0,
    mergeToWithM,
//     mergeToM, mergeFromM,
    // factory, factoryInit,
    whenHas,
} from 'stick'

// --- factory with a cycle is sometimes faster than new with a cycle.

export const mergeMixins = (mixinsPre, proto, mixinsPost) => {
    // --- to be safe, don't make reduce point-free, though it would still have been ok for now
    // (since the merger is immutable)
    const reduceMixins = ary => reduce ((a, b) => b | mergeTo (a)) ({}) (ary)
    const pre = mixinsPre | reduceMixins
    const post = mixinsPost | reduceMixins
    const chooseTarget = arg0

    pre | mergeToWithM (chooseTarget) (proto)
    post | mergeToM (proto)

    return proto
}

// --- one function laats: negligible difference. 400 ms on 1e6 iters.
const _factoryWithMixins = (proto, mixinsPre = [], mixinsPost = []) => {
    const protoMixed = mergeMixins (mixinsPre, proto, mixinsPost)
    return ({
        proto: protoMixed,
        create: (...instanceExtension) => protoMixed
            | Object.create
            | mergeFromM (instanceExtension | rMergeAll),
    })
}

// --- literally Object.assign, but Object.assign is 2x slower for some reason.
// --- *does* merge in non ok values (think ramda `has`)
export const mergeFromMManual = (src) => (tgt) => {
    for (let i in src) if (oPro.hasOwnProperty.call (src, i))
        tgt[i] = src[i]
    return tgt
}

export const mergeToMManual = (tgt) => (src) => {
    for (let i in src) if (oPro.hasOwnProperty.call (src, i))
        tgt[i] = src[i]
    return tgt
}

export const mergeFromM = mergeFromMManual
export const mergeToM = mergeToMManual

const proto = {
    speak () { return 'woof' },
    sleep () { throw new Error ("dogs don't sleep") },
}

// --- sort of feel like providing this, but what to call it?
export const multi = (factory) => {
    const orig = factory.create
    factory.create = (...propsAry) => {
        const merged = rMergeAll (propsAry)
        return orig.call (factory, merged)
    }
    return factory
}

// --- orders of magnitude faster than cycling -- comparable to new.
// --- call it factoryInit, the other one factoryProps.
const factoryInit = (init) => (proto) => ({
    proto,
    create: (props) => {
        const o = Object.create (proto)
        init (o, props)
        return o
    },
})

const factory = factoryInit ((o, props) => {
    if (props == null) return
    for (let i in props) if (oPro.hasOwnProperty.call (props, i))
        o[i] = props[i]
})

const factoryInitWithMixins = (pre, post, init) => (proto) => {
    const merged = mergeMixins (pre, proto, post)
    return {
        proto: merged,
        create: (props) => {
            const o = Object.create (merged)
            init (o, merged)
            return o
        },
    }
}

const factoryWithMixins = (pre, post) => factoryInitWithMixins (pre, post, (o, props) => {
    if (props == null) return
    for (let i in props) if (oPro.hasOwnProperty.call (props, i))
        o[i] = props[i]
})

// --- composey
const factoryMixins = (pre, post) => (factory) => {
    const orig = factory.create
    const merged = mergeMixins (pre, factory.proto, post)

    factory.proto = merged
    factory.create = (props) => orig.call (factory, merged)

    return factory
}


// --- hasOwnProperty only makes a difference of a few ms.
// deze.
const _factoryWithPropsCopyInlineIn = (proto) => {
    // let i
    return ({
    proto,
    create: (props) => {
        const p = Object.create (proto)
        for (let i in props) p[i] = props[i]

        return p
    },
})
}

// --- conclusions:
// - the thing that makes them (both) slow is cycling through the props.
// - hasOwnProperty adds a few ms @ 1e6
// - flip, curry, very expensive.
// - Object.assign about twice as slow as manual.
// - stick operator twice in constructor is negligible (about 60ms on 1e7 iters). still, make implementations non-stick.
// - init is much better than trying to name the props with an array.
// - mergeFromM is extremely slow (adds 4s @ 1e6)
// - allowing a props spread array makes it 200/300 ms slower at 1e6
// - doing factory in a composey way to allow init (factory | withInit (...)) is quite a bit slower,
// hard to justify.
// - factoryInit (noop) is trivially slower.
// - calling `has` instead of inlining it adds ~ 80ms per property @ 1e7
// - checking for props == null is trivial.
// - composey way of mixins adds only 50ms @ 1e7
//   (why did composey way of init add so much more?)

const oPro = Object.prototype

// --- takes *much* longer
const withInit = (init) => (factory) => {
    const orig = factory.create
    factory.create = (props) => {
        const o = orig.call (factory, props)
        init (o, props)
        return o
    }
    return factory
}

export const DogSimple = proto | factory
// export const DogSimpleTest = proto | factoryTest

export const DogInit = proto | factoryInit ((p, props) => {
    p.speed = props.speed
    p.color = props.color
})

export const DogInitComposey = proto | factory | withInit ((o, props) => {
    o.speed = props.speed
    o.color = props.color
})

const Animal = (() => {
    const proto = {
        breathe () { return 'huff' },
        sleep () { throw new Error ("animals don't sleep") },
        speak () { throw new Error ("animals don't speak") },
    }
    return proto | factory
}) ()

const Sleeper = (() => {
    const proto = {
        sleep () { return 'zzz' },
        repeat (x) { return 'you said ' + x },
    }
    return proto | factory
}) ()

export const DogSimpleMixinComposey = proto | factory | factoryMixins ([Animal.proto], [Sleeper.proto])
export const DogSimpleMixinNotComposey = proto | factoryWithMixins ([Animal.proto], [Sleeper.proto])

// --- ok.
// export const DogWithFunction4 = proto | factoryInit (noop)

// export const DogMulti = proto | factory | multi
// export const DogMultiInit = proto | factory | multi

// factoryInit, factory = factoryInit (noop)
// const DogInit = proto | factoryInit (noop)
