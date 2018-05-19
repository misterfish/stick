// ramda map works on objs: keys same, values altered.
// could make an object mapper which lets you return pairs.
//
// Object.assign and {...} drop proto vals.

defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

export const pipe         = (a, b)    => b (a)
export const composeRight = (a, b)    => (...args) => b (a (...args))
export const compose      = (a, b)    => (...args) => a (b (...args))

import {
    splitAt,
    always,
    // --- has = has own (hence paired with hasIn version)
    isEmpty, tap, has, hasIn, flip, fromPairs, toPairs, toPairsIn, assoc, assocPath, head,
    last, tail, reduceRight, chain, identity as id, reduce, map as rMap, filter, reject, join,
    split, prop as rProp, path as rPath, defaultTo as rDefaultTo, curry, curryN,
    splitEvery,
    forEach as rEach, forEachObjIndexed as rEachObj, complement, times as rTimes,
    range as rRange, isNil, addIndex as rAddIndex, take, equals, mapAccum,
    repeat as rRepeat, concat as rConcat, append as rAppend, compose as rCompose,
    merge as rMerge, mergeAll as rMergeAll,
    zip,
    gt as rGt, gte as rGte, lt as rLt, lte as rLte,
    not,
} from 'ramda'

import sprintf from 'sprintf'

import {
    bitwiseAnd, bitwiseOr, bitwiseXor, bitwiseNot,
    bitwiseLeft, bitwiseRight, bitwiseRightZeroFill,
    bitwiseLeftBy, bitwiseRightBy, bitwiseRightZeroFillBy,
} from './operator'

import {
    doe,
} from './monad'

export {
    bitwiseAnd, bitwiseOr, bitwiseXor, bitwiseNot,
    bitwiseLeft, bitwiseRight, bitwiseRightZeroFill,
    bitwiseLeftBy, bitwiseRightBy, bitwiseRightZeroFillBy,
    doe,
}

import manual from './manual'

const oPro = Object.prototype
const hasOwn = oPro.hasOwnProperty

// const r = (a => b => c => a * b * c) | recurry
// r (1, 2, 3) = roll (orig) (1, 2, 3)
// r (1, 2)    = roll (orig) (1, 2)
// r (1) = roll (orig) (1)
// r (1) (2) (3)
// r ()

export const recurry = (n) => (f) => (...args) => {
    const rolled = roll (f) (...args)
    const dn = n - args.length
    return dn <= 1 ? rolled
                   : recurry (dn) (rolled)
}

const _recurry = recurry

// --- note that the resulting function is not curried, and does not have a well-defined arity. Use
// R.uncurryN if this is a problem.

export const roll = (f) => (...args) => {
  let g = f
  for (const i of args) g = g (i)
  return g
}

export const ok    = x => x != null
export const notOk = x => x == null

// --- different from R.equals, which considers two different objects equal if their contents are
//     the same (equivalent).
// --- different from R.identical, which has some different semantics involving e.g. 0 and -0.
// --- literally just wraps ===.
// rationale: must be able to confidently refactor working code which uses ===

export const eq = _recurry (2) (manual.eq)
export const ne = _recurry (2) (manual.ne)
export const gt = _recurry (2) (manual.gt)
export const gte = _recurry (2) (manual.gte)
export const lt = _recurry (2) (manual.lt)
export const lte = _recurry (2) (manual.lte)

export const dot  = _recurry (2) (manual.dot)
export const dot1 = _recurry (3) (manual.dot1)
export const dot2 = _recurry (4) (manual.dot2)
export const dot3 = _recurry (5) (manual.dot3)
export const dot4 = _recurry (6) (manual.dot4)
export const dot5 = _recurry (7) (manual.dot5)
export const dotN = _recurry (3) (manual.dotN)

export const side  = _recurry (2) (manual.side)
export const side1 = _recurry (3) (manual.side1)
export const side2 = _recurry (4) (manual.side2)
export const side3 = _recurry (5) (manual.side3)
export const side4 = _recurry (6) (manual.side4)
export const side5 = _recurry (7) (manual.side5)
export const sideN = _recurry (3) (manual.sideN)

// whenEmpty, whenFunction, ifNotPredicate: -> user-space.
// also, ifNotPredicate would be confusing:
//  should ifNotPredicate match falsey or false? If falsey, it breaks symmetry with ifPredicate; if
// false, it behaves differently than ifPredicate (pred >> not), which is also confusing.
//

export const isTrue   = true  | eq
export const isFalse  = false | eq // --- exactly false.
export const isYes    = Boolean
export const isNo     = isYes >> not
export const isTruthy = isYes
export const isFalsey = isNo

export const ifPredicate   = _recurry (4) (manual.ifPredicate)
export const whenPredicate = _recurry (3) (manual.whenPredicate)

export const ifOk          = ifPredicate   (ok)
export const whenOk        = whenPredicate (ok)
export const ifNotOk       = ifPredicate   (notOk)
export const whenNotOk     = whenPredicate (notOk)
export const ifTrue        = ifPredicate   (isTrue)
export const whenTrue      = whenPredicate (isTrue)
export const ifFalse       = ifPredicate   (isFalse)
export const whenFalse     = whenPredicate (isFalse)
export const ifYes         = ifPredicate   (isYes)
export const whenYes       = whenPredicate (isYes)
export const ifNo          = ifPredicate   (isNo)
export const whenNo        = whenPredicate (isNo)
export const ifTruthy      = ifYes
export const whenTruthy    = whenYes
export const ifFalsey      = ifNo
export const whenFalsey    = whenNo

// --- these have a different calling convention, so their names are a bit misleading based on the
// above pattern.
export const ifHas     = _recurry (3) (manual.ifHas)
export const whenHas   = _recurry (2) (manual.whenHas)
export const ifHasIn   = _recurry (3) (manual.ifHasIn)
export const whenHasIn = _recurry (2) (manual.whenHasIn)

export const ifBind    = _recurry (3) (manual.ifBind)
export const whenBind  = _recurry (2) (manual.whenBind)


// --- @deprecated.
export const ifPredicate__ = (f, x, yes, no = noop) => x | ifPredicate (f) (yes) (no)
export const ifOk__ = (x, yes, no = noop) => x | ifOk (yes) (no)
export const ifNotOk__ = (x, yes, no = noop) => x | ifNotOk (yes) (no)
export const ifTrue__ = (x, yes, no = noop) => x | ifTrue (yes) (no)
export const ifFalse__ = (x, yes, no = noop) => x | ifFalse (yes) (no)
export const ifYes__ = (x, yes, no = noop) => x | ifYes (yes) (no)
export const ifNo__ = (x, yes, no = noop) => x | ifNo (yes) (no)
export const ifFunction__ = (x, yes, no = noop) => x | ifFunction (yes) (no)
export const ifHas__ = (spec, yes, no = noop) => spec | ifHas (yes) (no)
export const ifHasIn__ = (spec, yes, no = noop) => spec | ifHasIn (yes) (no)
export const ifBind__ = (spec, yes, no = noop) => spec | ifBind (yes) (no)

export const condo = manual.condo
export const condO = _recurry (2) (manual.condO)
export const cond = condO

// ------ exceptions.

// @deprecated
export const tryCatch__ = (whatToTry, howToCatch = noop) => {
    try {
        return whatToTry ();
    } catch (e) {
        return howToCatch (e);
    }
}

export const tryCatch = _recurry (3) (manual.tryCatch)

export const exception = (...args) => new Error (args.join (' '))

export const raise = (e) => { throw e }

// --- die throws an exception, which can of course be caught.
// it shouldn't be too surprising to JS users that it doesn't halt the runtime.

export const decorateException = _recurry (2) (manual.decorateException)

export const die = exception >> raise

// ------ cascade

export const cascade = (val, ...fxs) => fxs
    .reduce ((a, b) => b (a), val)

// --------- data.

// ------ defaultTo.

export const defaultTo = _recurry (2) (manual.defaultTo)

// --- @deprecated
export const defaultTo__ = (x, f) => x | defaultTo (f)

// ------ assoc.

export const assocM = _recurry (3) (manual.assocM)

// ------ append.

export const appendFrom   = _recurry (2) (manual.appendFrom)
export const appendTo     = _recurry (2) (manual.appendTo)
export const appendFromM  = _recurry (2) (manual.appendFromM)
export const appendToM    = _recurry (2) (manual.appendToM)

// ------ prepend.

export const prependTo    = _recurry (2) (manual.prependTo)
export const prependFrom  = _recurry (2) (manual.prependFrom)
export const prependFromM = _recurry (2) (manual.prependFromM)
export const prependToM   = _recurry (2) (manual.prependToM)

// --- arrays or strings
// --- ramda's concat does more type checking and also allows fantasy land semigroups.
export const concatTo = _recurry (2) (manual.concatTo)
export const concatFrom = _recurry (2) (manual.concatFrom)
export const precatTo   = concatFrom
export const precatFrom = concatTo

// --- only arrays (strings will throw)
export const concatToM = _recurry (2) (manual.concatToM)
export const concatFromM = _recurry (2) (manual.concatFromM)

// --- own properties, including null/undefined.
// --- 2x faster than Object.assign.
// --- @todo: why is it so much faster?

export const mergeTo    = _recurry (2) (manual.mergeTo)
export const mergeFrom  = _recurry (2) (manual.mergeFrom)
export const mergeFromM = _recurry (2) (manual.mergeFromM)
export const mergeToM   = _recurry (2) (manual.mergeToM)

// --- copies enumerable own properties from src into tgt, mut.
////// --- uses collision function if key exists in the target, anywhere in target's prototype chain.
// --- 'with' refers to collision
// --- 'to' refers to tgt
// --- to avoid non-intuitive behavior, only own properties are checked on the target.
////// --- if a collision occurs in the target's prototype chain, the value will surface, regardless of whether src or tgt version is chosen.

export const mergeToWithM   = _recurry (3) (manual.mergeToWithM)
export const mergeFromWithM = _recurry (3) (manual.mergeFromWithM)

export const mergeToWhenOkM = _recurry (2) (manual.mergeToWhenOkM)
export const mergeFromWhenOkM = _recurry (2) (manual.mergeFromWhenOkM)

export const mergeToInM = _recurry (2) (manual.mergeToInM)
export const mergeFromInM = _recurry (2) (manual.mergeFromInM)

// --- all enumerable properties (non-own and own) on both the src and tgt will be copied to the new
// object.
export const mergeFromIn = _recurry (2) (manual.mergeFromIn)

// --- all enumerable properties (non-own and own) on both the src and tgt will be copied to the new
// object.
export const mergeToIn = _recurry (2) (manual.mergeToIn)

// --- like R.mergeAll but also use prototype vals.
// --- to and from not applicable, also not curried or meant to be used piped.
export const mergeAllIn = xs => xs.reduce (
    (tgt, src) => mergeToInM (tgt) (src),
    {},
)


// ------ map.

// --- simple dispatches to Array.prototype.map

export const map = _recurry (2) (manual.map)
export const each = _recurry (2) (manual.each)

export const addIndex = _recurry (3) (manual.addIndex)
export const addCollection  = _recurry (3) (manual.addCollection)

// --- returns an object.
// --- user function f is expected to return pairs: [k, v]
//
// if target is an obj, it maps on key/value pairs of object -- this is different from ramda's map
// in that it can change the keys.
// if target is an array [key, value, key, value], it maps on pairs (think %foo= @foo in perl)
//
// ordering: k, v.
// everywhere else: v, k.
//
// @todo optimise
// @todo aren't array pairs better than spaced ones?

const ifArray = (...args) => ifPredicate (isArray) (...args)

// @todo
export const mapPairs = curry ((f, obj) =>
    obj | ifArray (
        splitEvery (2)
        >> map (([k, v]) => f (k, v))
        >> fromPairs,

        toPairs
        >> map (([k, v]) => f (k, v))
        >> fromPairs,
    )
)

// @todo
// --- doesn't take array, only obj.
export const mapPairsIn = curry ((f, obj) => obj
    | toPairsIn
    | map (([k, v]) => f (k, v))
    | fromPairs,
)

// --- ramda already gives us eachObj.

export const eachObj = _recurry (2) (manual.eachObj)
export const eachObjIn = curry ((f, obj) => {
    for (const k in obj) f (obj[k], k)
})

// [a -> b] -> [a] -> [b]
export const applyScalar = curry ((fs, xs) => xs
    | zip (fs)
    | map (([f, x]) => f (x))
)

export const applyScalarIfOk = curry ((fs, xs) => xs
    | zip (fs)
    | map (([f, x]) => x | whenOk (f))
)

export const passScalar = flip (applyScalar)

// @todo
export const scalarApply = applyScalar
export const scalarPass = passScalar

// --------- laat

export const laat = (xs, f) => f.apply (null, xs)
export const given = laat

// --- these can be called directly by speed freaks; `laats` should be good enough for nearly all
// uses.
export const laats2 = (f1, f2) => {
    const n1 = f1 ()
    return f2 (n1)
}

export const laats3 = (f1, f2, f3) => {
    const n1 = f1 ()
    const n2 = f2 (n1)
    return f3 (n1, n2)
}

export const laats4 = (f1, f2, f3, f4) => {
    const n1 = f1 ()
    const n2 = f2 (n1)
    const n3 = f3 (n1, n2)
    return f4 (n1, n2, n3)
}

export const laats5 = (f1, f2, f3, f4, f5) => {
    const n1 = f1 ()
    const n2 = f2 (n1)
    const n3 = f3 (n1, n2)
    const n4 = f4 (n1, n2, n3)
    return f5 (n1, n2, n3, n4)
}

export const laats6 = (f1, f2, f3, f4, f5, f6) => {
    const n1 = f1 ()
    const n2 = f2 (n1)
    const n3 = f3 (n1, n2)
    const n4 = f4 (n1, n2, n3)
    const n5 = f5 (n1, n2, n3, n4)
    return f6 (n1, n2, n3, n4, n5)
}

// --- generic form, for any non-zero number of arguments.
const _laats = (...xs) => {
    const executeStep = prevVals => applyToN (prevVals)

    const ys = xs
        // --- acc contains running output array, up to the previous item.
        | mapAccum ((acc, v) => executeStep (acc) (v)
            | (stepVal => [[...acc, stepVal], stepVal])
        ) ([])
        | rProp (1)

    return ys | last
}

export const laats = (...xs) => {
    if (xs.length === 2) return laats2 (...xs)
    if (xs.length === 3) return laats3 (...xs)
    if (xs.length === 4) return laats4 (...xs)
    if (xs.length === 5) return laats5 (...xs)
    if (xs.length === 6) return laats6 (...xs)
    return _laats (...xs)
}

export const lets = laats

// --- 'call' always means pass a context.
// --- 'apply' always means 'apply this function to some params'
// --- 'pass' means 'pass these params to a function'
// --- 'invoke' means just call this function, no context or params.

// ------ ; {}.toString | callOn ([])

export const callOn = curry ((o, f) => f.call (o))
export const callOn1 = curry ((o, val, f) => f.call (o, val))
export const callOn2 = curry ((o, val1, val2, f) => f.call (o, val1, val2))
export const callOn3 = curry ((o, val1, val2, val3, f) => f.call (o, val1, val2, val3))
export const callOnN = curry ((o, vs, f) => f.apply (o, vs))

export const call = callOn
export const call1 = callOn1
export const call2 = callOn2
export const call3 = callOn3
export const callN = callOnN

// ------ ; [] | callUnder ({}.toString)

export const callUnder = curry ((f, o) => f.call (o))
export const callUnder1 = curry ((f, val, o) => f.call (o, val))
export const callUnder2 = curry ((f, val1, val2, o) => f.call (o, val1, val2))

// --- alias applyTo0 xxx
export const invoke = f => f ()

// ------ sum | applyToN ([1, 2, 3])

export const applyTo1 = curry ((val, f) => f (val))
export const applyTo2 = curry ((val1, val2, f) => f (val1, val2))
export const applyTo3 = curry ((val1, val2, val3, f) => f (val1, val2, val3))
export const applyToN = curry ((vs, f) => f.apply (null, vs))

// maybe: export const applyTo = applyTo1

export const apply1 = applyTo1
export const apply2 = applyTo2
export const apply3 = applyTo3
export const applyN = applyToN

// --- i don't think these are useful. xxx
export const passTo1 = curry ((f, val) => f (val))
export const passTo2 = curry ((f, val1, val2) => f (val1, val2))
export const passTo3 = curry ((f, val1, val2, val3) => f (val1, val2, val3))
export const pass1 = passTo1
export const pass2 = passTo2
export const pass3 = passTo3

// ------ ; [1, 2, 3] | passToN (sum)
export const passToN = curry ((f, vs) => f.apply (null, vs))
export const passN = passToN

// --- flip first and second args of a curried function, even for functions with more than 2 args.
// --- also works for functions curried with the a => b => ... notation (unlike R.flip).
// --- does not work with non-curried functions.

export const ifEmpty = curry ((yes, no, xs) => xs.length === 0 ? yes (xs) : no (xs))
export const flipC = f => curryN (2) (
    (a, b, ...rest) => laat (
        // --- if f had arity 2, f (b) (a) is the answer; otherwise it's a curried interim result,
        // since f itself was curried.
        [f (b) (a)],
        interimResult => rest | ifEmpty (
            () => interimResult,
            reduce ((a, b) => a (b)) (interimResult),
        )
    )
)

// ------ sprintf

export const sprintf1 = curry ((str, a) => sprintf (str, a))
export const sprintfN = curry ((str, xs) => sprintf.apply (null, [str, ...xs]))

export const noop = () => {}

// --- r's zip only takes two.
// @dep appendToM
export const zipAll = (...xss) => {
    const ret = []
    const l = xss[0].length
    for (let i = 0; i < l; i++)
        xss | map (xs => xs [i]) | appendToM (ret)
    return ret
}

// --------- list.

// multiple versions with preps ??
export const repeat = flip (rRepeat)
export const times = flip (rTimes)

// xxx timesVoid, to not make an array.
// maybe timesV

// @todo
// export const rangeBy = curry ((from, to, by, f) => {
//     for (let i = from; i <= to; i += by) f (i)
// })
// export const range = curry ((from, to, f) => rangeBy (from, to, 1, f))

// excl, so it's like ramda.
// they already provide range.
export const rangeBy = curry ((from, to, by) => {
    const coll = []
    for (let i = from; i < to; i += by) coll.push (i)
    return coll
})

export const compact = filter (Boolean)
export const compactOk = reject (isNil)

// --- turn positional args into a list with those values.
export const list = (...args) => args

export const joinOk = curry ((j, xs) => xs
    | compactOk
    | join (j)
)

// --------- new.
// xxx german aliases

export const nieuw = x => new x
export const nieuw1 = curry ((x, val) => new x (val))
export const nieuw2 = curry ((x, val1, val2) => new x (val1, val2))
export const nieuw3 = curry ((x, val1, val2, val3) => new x (val1, val2, val3))
export const nieuwN = curry ((x, vs) => new x (...vs))

// --------- regex.
// @deps: dot1

// --- leaving out the 'flip' versions: assuming you generally want to pipe the target to the match
// functions.

const removeSpaces = dot2 ('replace') (/\s+/g) ('')

// --- input: regex.
export const xRegExp = re => new RegExp (
    re.source | removeSpaces,
    re.flags,
)

// @todo test
// --- beware, overwrites any flags that the re already had.
export const xRegExpFlags = (re, flags) => new RegExp (
    re.source | removeSpaces,
    flags,
)

// --- input: string, [string].
export const xRegExpStr = (reStr, flags = '') => laat (
    [
        reStr | removeSpaces,
        flags,
    ],
    nieuw2 (RegExp)
)

export const match = curry ((re, target) => re.exec (target))

// xxx there should be a 'replace' version of all these functions as well.

// xxx make xMatch incur only a compile-time cost.

// @todo test
// @todo xMatchStrGlobal, maybe flags variations too
export const xMatchGlobal = curry ((re, mapper, target) => {
    let out = []
    const reGlobal = xRegExpFlags (re, 'g')
    let m
    while (m = reGlobal.exec (target))
        mapper (...m) | appendToM (out)
    return out
})

// --- input: regex.
export const xMatch = curry ((re, target) =>
    xRegExp (re) | dot1 ('exec', target)
)

// --- input: string.
export const xMatchStr = curry ((reStr, target) => target
    | xMatch (new RegExp (reStr)))

// --- input: string, string.
export const xMatchStrFlags = curry ((reStr, flags, target) => target
    | xMatch (new RegExp (reStr, flags)))

export const xReplace = curry ((re, repl, target) =>
    target.replace (xRegExp (re), repl)
)

export const xReplaceStr = curry ((reStr, repl, target) =>
    target.replace (xRegExpStr (reStr), repl)
)

export const xReplaceStrFlags = curry ((reStr, flags, repl, target) =>
    target.replace (xRegExpStr (reStr, flags), repl)
)

// xxx repl might be a function.
export const ifReplace = curry ((yes, no, re, repl, target) => {
    let success = 0
    const out = target.replace (re, () => {
        ++success
        return repl
    })
    return success | ifYes (() => yes (out, success), () => no (target))
})

export const ifXReplace = curry ((yes, no, re, repl, target) =>
    ifReplace (yes, no, re | xRegExp, repl, target)
)

export const ifXReplaceStr = curry ((yes, no, reStr, repl, target) =>
    ifReplace (yes, no, xRegExpStr (reStr), repl, target)
)

export const ifXReplaceStrFlags = curry ((yes, no, reStr, flags, repl, target) =>
    ifReplace (yes, no, xRegExpStr (reStr, flags), repl, target)
)

// --- returns a copy with prototype vals discarded.
export const discardPrototype = (o) => ({ ...o })

// --- returns a copy with prototype vals floated.
export const flattenPrototype = (o) => {
    const ret = {}
    for (const i in o) ret[i] = o[i]
    return ret
}

// --- check if slower xx
// const arg0 = (...args) => args [0]
// const arg1 = (...args) => args [1]

export const arg0  = (a) => a
export const arg1  = (_, a) => a
export const arg2  = (_, _1, a) => a
export const arg3  = (_, _1, _2, a) => a
export const arg4  = (_, _1, _2, _3, a) => a
export const arg5  = (_, _1, _2, _3, _4, a) => a
export const arg6  = (_, _1, _2, _3, _4, _5, a) => a
export const arg7  = (_, _1, _2, _3, _4, _5, _6, a) => a
export const arg8  = (_, _1, _2, _3, _4, _5, _6, _7, a) => a
export const arg9  = (_, _1, _2, _3, _4, _5, _6, _7, _8, a) => a
export const arg10 = (_, _1, _2, _3, _4, _5, _6, _7, _8, _9, a) => a

const mergeMixins = (mixinsPre, proto, mixinsPost) => {
    const reduceMixins = reduce ((a, b) => b | mergeTo (a)) ({})
    const pre = mixinsPre | reduceMixins
    const post = mixinsPost | reduceMixins
    const chooseTarget = arg0

    pre | mergeToWithM (chooseTarget) (proto)
    post | mergeToM (proto)

    return proto
}

// --- providing mixins will *alter* proto -- this is to avoid doing a clone or flattening the
// prototype chain.
// --- you can avoid this by passing Object.create (proto) instead of proto.
// --- probably if you are working with mixins you don't mind if the proto is altered, just saying.

// --- multiple instanceExtensions can be given: will be merged right-to-left using R.mergeAll,
// meaning prototypes will be discarded.

// note: you are free to put properties in the prototype, though this is probably not a great idea.
// at the very least, you should ensure that they are never mutated.

const _factory = (proto, mixinsPre = [], mixinsPost = []) => laats (
    _ => mergeMixins (mixinsPre, proto, mixinsPost),
    (protoMixed) => ({
        // --- consider dropping this: Object.getPrototypeOf xxx
        proto: protoMixed,
        create: (...instanceExtension) => protoMixed
            | Object.create
            | mergeFromM (instanceExtension | rMergeAll),
    })
)

// --- xxx maybe a factoryMixinsM and non-m version?
// would be nice to not have it fuck with the prototype.
// the non-m version will make a clone, possibly only with owns?
// or another flag for owns and not-owns? I?
// --- xxx change all In to I?
//
// --- xxx think about which maps return lists and which return the same kind of thing being mapped.

// --- convenience.
// note that this will *alter* the prototype.
export const factoryMixins = curry ((mixinsPre, mixinsPost, proto) =>
    _factory (proto, mixinsPre, mixinsPost)
)

// --- usage:
// const dogProps = { name: 'defaultname', age: undefined, ... }
// const Dog = dogProto | factory | factoryProps (dogProps)
// or
// const dogFactory = factory >> factoryProps (dogProps)
// const Dog = dogProto | dogFactory
//
// const dog = Dog.create ({ age: 10 )
//
// This is where you can put your instance properties initialisation. Totally optional -- also
// without this, you will get an instance!
// This is a good place to document the properties: put them in the instance{} even if they're
// undefined.
// props is altered.
export const factoryProps = curry ((props, factory) => {
    const orig = (...args) => factory.create (...args)
    return {
        ... factory,
        create (args) {
            const o = orig (props)
            const [src, tgt] = [args, o]
            for (const i in args)
                if (oPro.hasOwnProperty.call (src, i) && ok (src[i]))
                    tgt[i] = src[i]
            return tgt
        },
    }
})

// @test
// @todo ref
// @todo mixins etc.
export const factoryInit = (init) => (proto) => ({
    proto,
    create: (props) => {
        const o = Object.create (proto)
        init (o, props)
        return o
    },
})

export const factory = factoryInit ((o, props) => {
    if (props == null) return
    for (const i in props) if (oPro.hasOwnProperty.call (props, i))
        o[i] = props[i]
})


// --- e.g.:
// const theFactory = proto | factory | factoryStatics (statics) | factoryInit (init)
// for if you reeally want to have other functions in the factory (parallel to .create())
//
// in many cases, a simple function exported by the module will probably get you what you want.
// you can of course always put the static functions in the prototype as well. it will mean
// infinitesimally more memory use -- and that you need at least one instance.

export const factoryStatics = mergeFromM

// --- don't really like this.
// proto gets altered.
// order difficult.
export const factoryMixinPre = curry ((mixin, proto) => factoryMixinPre ([mixin], [], proto))
export const factoryMixinPost = curry ((mixin, proto) => factoryMixinPre ([], [mixin], proto))

    /*
// --- note, there is no magic here and nothing spectacular.
// if you find that you need more flexibility than that this provides (e.g. the second argument of Object.create to assign properties etc.), just
// reimplement this in your app code.
// unwieldy name, yes, but calling it 'extend' would probably just add to JS confusion.
// hopefully this name makes it clear to js programmers what's going on.
// note, Object.setPrototypeOf would not work here (alters the extension object).
//
const oCreateExtendWith = curry ((extend, proto) => proto | Object.create | mergeFromM (extend))
const oCreateBase = curry ((proto, extend) => oCreateExtendWith (extend, proto))

const Cat = (() => {
    const proto = {
        // recommendation: do use arrow functions, despite what they tell you.
        // it makes it clear that this is a pure function, not dependent on `this`.
        speak: _ => 'meow' | log,
    }
    return proto | oCreateBase (Animal.proto) | factory
    // --- or
    // return Animal.proto | oCreateExtendWith (proto) | factory
    // --- or
    // return proto | factoryMixinPre (Animal.proto)
    return proto | factoryMixins ([Animal.proto], [])
}) ()
*/


// xxx getType
// export const getType = callUnder ({}.toString)
//    >> dot2 ('slice') (8, -1) (
//)

// --- wants upper case, e.g. output of toString.
export const CANONisType = curry ((t, x) => x
    | callUnder ({}.toString)
    | dot2 ('slice') (8, -1)
    | equals (t)
)

export const isType = _recurry (2) (manual.isType)
export const isArray = isType ('Array')
export const isFunction = isType ('Function')

// @test
// --- assumed to be a Number.
export const isInteger = x => x === Math.floor (x)



// ------ bind

// would be nice to bind with an arg, e.g. exit with a code.
//const exit = 'exit' | bind (process)

// xxx bind and invoke
// bind >> invoke
// xxx bind the other way around
// o | bind ('funcname')

// xxx cursor | bind ('theta')
// xxx 'theta' | bindOn (cursor)

// --- dies if o[prop] is not a function.
export const bind = _recurry (2) (manual.bind)
export const bindTry = _recurry (2) (manual.bindTry)

// --- returns a function representing the 'result' of the bind: doesn't actually try to bind until
// that function is invoked.
export const bindLate = curry ((o, key) => (...args) => o[key] (...args))




// --- map indexed: not sure about exporting these.
// export const mapX = rAddIndex (map)
export const mapAccumX = rAddIndex (mapAccum)

export const subtract = _recurry (2) (manual.subtract)
export const subtractFrom = _recurry (2) (manual.subtractFrom)
export const minus = subtract
export const add = _recurry (2) (manual.add)
export const plus = add
export const multiply   = _recurry (2) (manual.multiply)
export const divideBy   = _recurry (2) (manual.divideBy)
export const divideInto = _recurry (2) (manual.divideInto)
export const modulo = _recurry (2) (manual.modulo)
export const moduloWholePart = _recurry (2) (manual.moduloWholePart)
export const toThe = _recurry (2) (manual.toThe)

// @test
export const laatO = curry ((fs, f, x) => laat (
    fs | map (applyTo1 (x)),
    (...args) => f | applyToN ([x, ...args]),
))

export const laatsO = curry ((specAry, tgt) => laats (
  _ => tgt,
  ... specAry,
))

const listDat = curry ((fs, n) => fs | map (
    applyTo1 (n),
))

// --- or:
const listDat2 = (n => map (applyTo1 (n)) | flipC)
const listDat3 = flipC (n => map (applyTo1 (n)))
// --- >> is higher.
const listDat4 = applyTo1 >> map | curry | flipC
const listDat6 = applyTo1 >> map | flipC

const listDat5 = flipC (n => n | applyTo1 | map)

// const _$ = {}

// --- synonym for always. check impl of always. xxx
export const blush = x => _ => x

const T = blush (true)
const F = blush (false)

export const condElse = T
export const condPredicate = _recurry (2) (manual.condPredicate)

export const guard = condPredicate
export const guardA = blush >> guard
export const otherwise = condElse

export const ifEquals = curry ((test, yes, no, x) => x === test ? yes (x) : no (x))
export const whenEquals = curry ((test, yes, x) => x | ifEquals (test) (yes) (noop))
export const ifEquals__ = (x, test, yes, no = noop) => x | ifEquals (test) (yes) (no)

const ignore = n => f => (...args) => args | splitAt (n) | prop (1) | passToN (f)
const headTail = f => splitAt (1) >> f


// --- biased towards not using method lookup, but free floating function names.
// --- exceptions as expressions.
// --- extended regex.
//
// curry2
// curry3
// condMultiple
//
//

export const defaultToA = blush >> defaultTo

// ditch brackets on cond.
// a line can still be an array if you want the 'raw' predicate / exec.
// make an extra one (condN ?) for if programmatic building is required.

// spread. e.g.: csv => [csv, length csv] because spread (identity, length)
// or spread2 (length)
// arrows.
//
// be careful with defaultToA ({}) if point-free. ?
//

// const toThe = curry ((exp, base) => Math.pow (base, exp))

// const deconstruct = curry ((f, x) => f (x, x))
// destructuring, as a function:
// const show = deconstruct ((downloadStatus, { completed, }) =>
//
// you repeat 'downloadStatus' anyway
// export const show = deconstruct ((downloadStatus, { completed, }) =>
// downloadStatus | cata ({
//
// so why not:
//
// or like this, except that you lose the documentation aspect.
// this | pluck ('beans', 'bones', 'binds', (dit, beans, bones, binds) => ...)
// could combine ramda props with apply.

const mapX = map | addIndex
const mapXL = map | addIndex | addCollection
const mapLX = map | addCollection | addIndex

const { log, } = console
const double = x => x | multiply (2)
const logWith = header => (...args) => log (... [header, ...args])
; [ 1, 2, 3 ]
    | mapX ((x, idx) => {
        [x | double, idx] | tap (logWith ('mapX'))
        return x
    })
    | mapXL ((x, idx, ary) => {
        [x | double, idx, ary] | tap (logWith ('mapXL'))
        return x
    })
    | mapLX ((x, ary, idx) => {
        [x | double, idx, ary] | tap (logWith ('mapLX'))
        return x
    })

const reduceObj = (f) => (acc) => (o) => {
    let curAcc = acc
    for (const k in o) if (hasOwn.call (o, k))
        curAcc = f (curAcc, [k, o [k]])
    return curAcc
}


// a map results in a collection of the same shape: list to list, object to object.
// the modifier As means the shape will change.

// filter: truthy, like JS filter & R filter
// map + filter could also be done with reduceObj, of course.
// filter applies to the mapped value.

const _withFilter = _ => new Map ()
    .set (mapAsKeys,     mapAsKeysWithFilter)
    .set (mapAsKeysIn,   mapAsKeysInWithFilter)
    .set (mapAsValues,   mapAsValuesWithFilter)
    .set (mapAsValuesIn, mapAsValuesInWithFilter)
    .set (mapKeys,       mapKeysWithFilter)
    .set (mapValues,     mapValuesWithFilter)
    .set (mapKeysIn,     mapKeysInWithFilter)
    .set (mapValuesIn,   mapValuesInWithFilter)
    .set (mapTuples,     mapTuplesWithFilter)
    .set (mapTuplesIn,   mapTuplesInWithFilter)

const withFilter = (p) => (mapper) => _withFilter ()
    .get (mapper) | ifOk (
        f => f (p),
        _ => die ('cannot augment mapper'),
    )

const mapAsKeys = (f) => (o) => {
    const ret = []
    for (const k in o) if (hasOwn.call (o, k)) ret.push (f (k))
    return ret
}

const mapAsKeysWithFilter = (p) => (f) => (o) => {
    const ret = []
    for (const k in o) if (hasOwn.call (o, k)) {
        const kk = f (k)
        if (p (kk)) ret.push (f (k))
    }
    return ret
}

const mapAsKeysIn = (f) => (o) => {
    const ret = []
    for (const k in o) ret.push (f (k))
    return ret
}

const mapAsKeysInWithFilter = (p) => (f) => (o) => {
    const ret = []
    for (const k in o) {
        const kk = f (k)
        if (p (kk)) ret.push (f (k))
    }
    return ret
}

// @canonical
// const keys = mapAsKeys (id)
// const keysIn = mapAsKeysIn (id)

const keys = (o) => {
    const ret = []
    for (const k in o) if (hasOwn.call (o, k)) ret.push (k)
    return ret
}

const keysIn = (o) => {
    const ret = []
    for (const k in o) ret.push (k)
    return ret
}

const mapAsValues = (f) => (o) => {
    const ret = []
    for (const k in o) if (hasOwn.call (o, k)) ret.push (f (o [k]))
    return ret
}

const mapAsValuesWithFilter = (p) => (f) => (o) => {
    const ret = []
    for (const k in o) if (hasOwn.call (o, k)) {
        const kk = f (o [k])
        if (p (kk)) ret.push (kk)
    }
    return ret
}

const mapAsValuesIn = (f) => (o) => {
    const ret = []
    for (const k in o) ret.push (f (o [k]))
    return ret
}

const mapAsValuesInWithFilter = (p) => (f) => (o) => {
    const ret = []
    for (const k in o) {
        const kk = f (o [k])
        if (p (kk)) ret.push (kk)
    }
    return ret
}

// @canonical
// const values = mapAsValues (id)
// const valuesIn = mapAsValuesIn (id)

const values = (o) => {
    const ret = []
    for (const k in o) if (hasOwn.call (o, k)) ret.push (o [k])
    return ret
}

const valuesIn = (o) => {
    const ret = []
    for (const k in o) ret.push (o [k])
    return ret
}

const mapKeys = (f) => (o) => {
    const ret = {}
    for (const k in o) if (hasOwn.call (o, k)) ret [f (k)] = o [k]
    return ret
}

const mapKeysWithFilter = (p) => (f) => (o) => {
    const ret = {}
    for (const k in o) if (hasOwn.call (o, k)) {
        const kk = f (k)
        if (p (kk)) ret [kk] = o [k]
    }
    return ret
}

const mapValues = (f) => (o) => {
    const ret = {}
    for (const k in o) if (hasOwn.call (o, k)) ret [k] = f (o [k])
    return ret
}

const mapValuesWithFilter = (p) => (f) => (o) => {
    const ret = {}
    for (const k in o) if (hasOwn.call (o, k)) {
        const vv = f (o [k])
        if (p (vv)) ret [k] = vv
    }
    return ret
}

const mapKeysIn = (f) => (o) => {
    const ret = {}
    for (const k in o) ret [f (k)] = o [k]
    return ret
}

const mapKeysInWithFilter = (p) => (f) => (o) => {
    const ret = {}
    for (const k in o) {
        const kk = f (k)
        if (p (kk)) ret [kk] = o [k]
    }
    return ret
}

const mapValuesIn = (f) => (o) => {
    const ret = {}
    for (const k in o) ret [k] = f (o [k])
    return ret
}

const mapValuesInWithFilter = (p) => (f) => (o) => {
    const ret = {}
    for (const k in o) {
        const vv = f (o [k])
        if (p (vv)) ret [k] = vv
    }
    return ret
}

// --- note: it is up to you to ensure that the resulting keys don't clash
const mapTuples = (f) => (o) => {
    const ret = {}
    for (const k in o) if (hasOwn.call (o, k)) {
        const [kk, vv] = f ([k, o [k]])
        ret [kk] = vv
    }

    return ret
}

const mapTuplesWithFilter = (p) => (f) => (o) => {
    const ret = {}
    for (const k in o) if (hasOwn.call (o, k)) {
        const kkvv = f ([k, o [k]])
        if (! p (kkvv)) continue
        const [kk, vv] = kkvv
        ret [kk] = vv
    }

    return ret
}

const mapTuplesIn = (f) => (o) => {
    const ret = {}
    for (const k in o) {
        const [kk, vv] = f ([k, o [k]])
        ret [kk] = vv
    }

    return ret
}

const mapTuplesInWithFilter = (p) => (f) => (o) => {
    const ret = {}
    for (const k in o) {
        const kkvv = f ([k, o [k]])
        if (! p (kkvv)) continue
        const [kk, vv] = kkvv
        ret [kk] = vv
    }

    return ret
}

const o = Object.create ({ a: 1, b: 2 }) | mergeFromM ({ c: 3, d: 4 })

o | mapAsKeysIn (id)
  | log

o | valuesIn
  | log

o | mapValues (double)
  | log

o | mapTuplesIn (([k, v]) => [k + ',', v + 1])
  | log

// const betterMap = mapTuples | withFilter (ok)
// o | betterMap (([k, v]) => {
//     const kk = k == 'a' ? null : k
//     return [k + ',', v + 1]
// })

const toUpperCase = dot ('toUpperCase')
const ifEqualsD = 'd' | eq | ifPredicate
const mapper = ifEqualsD (_ => null) (toUpperCase)

o | (mapAsKeys | withFilter (ok)) (mapper)
  | tap (logWith ('ere'))

const reducer = (acc, [k, v]) => {
    if (k === 'd') return acc
    return [...acc, toUpperCase (k)]
}

o | reduceObj (reducer) ([])
  | log




o | eachObj ((...args) => args | logWith ('eachObj'))
o | (eachObj | addIndex) ((...args) => args | logWith ('eachObj'))
o | (eachObj | addCollection) ((...args) => args | logWith ('eachObj'))
