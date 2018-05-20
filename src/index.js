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
    isEmpty, tap, has, hasIn, flip as rFlip, fromPairs, toPairs, toPairsIn, assoc as rAssoc, assocPath, head,
    last, tail, reduceRight, chain, identity as id, reduce, map as rMap, filter, reject,
    prop as rProp, path as rPath, defaultTo as rDefaultTo, curry, curryN,
    splitEvery,
    forEach as rEach, forEachObjIndexed as rEachObj, complement, times as rTimes,
    range as rRange, isNil, addIndex as rAddIndex, take, equals, mapAccum,
    repeat as rRepeat, concat as rConcat, append as rAppend, compose as rCompose,
    merge as rMerge, mergeAll as rMergeAll,
    zip,
    gt as rGt, gte as rGte, lt as rLt, lte as rLte,
    not,
} from 'ramda'

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

export const noop = () => {}

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

export const cond = manual.cond
export const condN = (blocks) => cond (...blocks)
export const condS = _recurry (2) (manual.condS)

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
export const decorateException = _recurry (2) (manual.decorateException)

// --- despite the name, die simply throws an exception, which can of course be caught.
// it shouldn't be too surprising to JS users that it doesn't halt the runtime.

export const die = exception >> raise

// ------ cascade

export const cascade = (val, ...fxs) => fxs
    .reduce ((a, b) => b (a), val)

// --------- data.

// ------ defaultTo.

export const defaultTo = _recurry (2) (manual.defaultTo)

// --- @deprecated
export const defaultTo__ = (x, f) => x | defaultTo (f)

// ------ join, split etc.
export const split  = _recurry (2) (manual.split)
export const join   = _recurry (2) (manual.join)

// ------ object manipulation.

export const prop   = _recurry (2) (manual.prop)
export const assoc  = _recurry (3) (manual.assoc)
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

export const eachObj = _recurry (2) (manual.eachObj)
export const eachObjIn = _recurry (2) (manual.eachObjIn)

export const reduceObj = _recurry (3) (manual.reduceObj)
export const reduceObjIn = _recurry (3) (manual.reduceObjIn)

// fs `ampersand` x = map map' fs where map' f = f x
export const ampersand = _recurry (2) (manual.ampersand)
export const asterisk = _recurry (2) (manual.asterisk)

// --------- laat / let

// --- last arg must be a function.
// 1 arg is possible but trivial.
export const laat = (...xs) => {
    const f = xs.pop ()
    return letN (xs, f)
}

/*
 * For example, our `defaultTo` takes a function:
 * null | defaultTo (_ -> 'bad news')
 * For simple values, defaultToV can be more convenient:
 * null | defaultToV ('bad news')
*/
// i like letV fitting the pattern
// laat -> letV
// letN -> letNV
// lets2 -> let2
// letsN -> letN
// lets -> laat
// letsS -> letS

export const letN = _recurry (2) (manual.letN)

// --- these can be called directly by speed freaks; `lets` should be good enough for nearly all
// uses.
export const lets2 = (f1, f2) => {
    const n1 = f1 ()
    return f2 (n1)
}

export const lets3 = (f1, f2, f3) => {
    const n1 = f1 ()
    const n2 = f2 (n1)
    return f3 (n1, n2)
}

export const lets4 = (f1, f2, f3, f4) => {
    const n1 = f1 ()
    const n2 = f2 (n1)
    const n3 = f3 (n1, n2)
    return f4 (n1, n2, n3)
}

export const lets5 = (f1, f2, f3, f4, f5) => {
    const n1 = f1 ()
    const n2 = f2 (n1)
    const n3 = f3 (n1, n2)
    const n4 = f4 (n1, n2, n3)
    return f5 (n1, n2, n3, n4)
}

export const lets6 = (f1, f2, f3, f4, f5, f6) => {
    const n1 = f1 ()
    const n2 = f2 (n1)
    const n3 = f3 (n1, n2)
    const n4 = f4 (n1, n2, n3)
    const n5 = f5 (n1, n2, n3, n4)
    return f6 (n1, n2, n3, n4, n5)
}

export const letsN = (xs) => lets (...xs)

// --- generic form, for any non-zero number of arguments.
const _lets = (...xs) => {
    const executeStep = prevVals => applyToN (prevVals)

    const ys = xs
        // --- acc contains running output array, up to the previous item.
        | mapAccum ((acc, v) => executeStep (acc) (v)
            | (stepVal => [[...acc, stepVal], stepVal])
        ) ([])
        | rProp (1)

    return ys | last
}

export const lets = (...xs) => {
    if (xs.length === 2) return lets2 (...xs)
    if (xs.length === 3) return lets3 (...xs)
    if (xs.length === 4) return lets4 (...xs)
    if (xs.length === 5) return lets5 (...xs)
    if (xs.length === 6) return lets6 (...xs)
    return _lets (...xs)
}

// --- move xxx
export const letsS = curry ((specAry, tgt) => lets (
  _ => tgt,
  ... specAry,
))

// --- 'call' and 'provide' always mean pass a context.
// --- 'apply' always means 'apply this function to some params'
// --- 'pass' means 'pass these params to a function'
// --- 'invoke' means just call this function, no context or params.

// ------ ; {}.toString | callOn ([])

export const callOn = _recurry (2) (manual.callOn)
export const callOn1 = _recurry (3) (manual.callOn1)
export const callOn2 = _recurry (4) (manual.callOn2)
export const callOn3 = _recurry (5) (manual.callOn3)
export const callOn4 = _recurry (6) (manual.callOn4)
export const callOn5 = _recurry (7) (manual.callOn5)
export const callOnN = _recurry (3) (manual.callOnN)

// ------ ; [] | provideTo ({}.toString)

export const provideTo = _recurry (2) (manual.provideTo)
export const provideTo1 = _recurry (3) (manual.provideTo1)
export const provideTo2 = _recurry (4) (manual.provideTo2)
export const provideTo3 = _recurry (5) (manual.provideTo3)
export const provideTo4 = _recurry (6) (manual.provideTo4)
export const provideTo5 = _recurry (7) (manual.provideTo5)
export const provideToN = _recurry (3) (manual.provideToN)

export const invoke = f => f ()

// ------ sum | applyToN ([1, 2, 3])
export const applyTo1 = _recurry (2) (manual.applyTo1)
export const applyTo2 = _recurry (3) (manual.applyTo2)
export const applyTo3 = _recurry (4) (manual.applyTo3)
export const applyTo4 = _recurry (5) (manual.applyTo4)
export const applyTo5 = _recurry (6) (manual.applyTo5)
export const applyToN = _recurry (2) (manual.applyToN)

// --- 1 | passTo (double)
export const passTo = _recurry (2) (manual.passTo)
// --- ; [1, 2, 3] | passToN (sum)
export const passToN = _recurry (2) (manual.passToN)

// --- flip first and second args of a curried function, even for functions with more than 2 args
// and for manually curried functions, unlike R.flip.
// --- does not work with non-curried functions.

export const flip  = _recurry (3) (manual.flip)
export const flip3 = _recurry (4) (manual.flip3)
export const flip4 = _recurry (5) (manual.flip4)
export const flip5 = _recurry (6) (manual.flip5)

// ------ sprintf
export const sprintf1 = _recurry (2) (manual.sprintf1)
export const sprintfN = _recurry (2) (manual.sprintfN)

// --- R.zip only takes two.
export const zipAll = (...xss) => {
    const ret = []
    const l = xss [0].length
    for (let i = 0; i < l; i++) ret.push (
        xss.map (xs => xs [i])
    )
    return ret
}

// ------ repeat, side

export const repeatV    = _recurry (2) (manual.repeatV)
export const repeatF    = _recurry (2) (manual.repeatF)
export const repeatSide = _recurry (2) (manual.repeatSide)
export const timesV     = _recurry (2) (manual.timesV)
export const timesF     = _recurry (2) (manual.timesF)
export const timesSide  = _recurry (2) (manual.timesSide)

// ------ types. @test

export const isType = _recurry (2) (manual.isType)
export const isArray = isType ('Array')
export const isFunction = isType ('Function')

    /*
// --- wants upper case, e.g. output of toString.
export const CANONisType = curry ((t, x) => x
    | provideTo ({}.toString)
    | dot2 ('slice') (8, -1)
    | equals (t)
)
*/
// xxx getType
// export const getType = provideTo ({}.toString)
//    >> dot2 ('slice') (8, -1) (
//)



// @test
// --- assumed to be a Number.
export const isInteger = x => x === Math.floor (x)

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
export const xRegExpStr = (reStr, flags = '') => letN (
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

export const ifReplace = _recurry (5) (manual.ifReplace)

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

// --- returns a copy with prototype vals surfaced.
export const flattenPrototype = mergeToInM ({})

// --- using rest params to pluck it is about 4 times faster than writing the args out -- but even
// the latter can do 1e5 iterations per ms.

export const arg0 = (...args) => args [0]
export const arg1 = (...args) => args [1]
export const arg2 = (...args) => args [2]
export const arg3 = (...args) => args [3]
export const arg4 = (...args) => args [4]
export const arg5 = (...args) => args [5]
export const arg6 = (...args) => args [6]

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

const _factory = (proto, mixinsPre = [], mixinsPost = []) => lets (
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
                if (hasOwn.call (src, i) && ok (src [i]))
                    tgt [i] = src [i]
            return tgt
        },
    }
})

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
// for if you want to have other functions in the factory (parallel to .create())
// note that they get added to the factory, not the object:
//
// const statics = { numLegs: _ => 4 }
// const dogFactory = dogProto | factory | factoryStatics (statics)
// const dog = dogFactory.create ()
// // dog.numLegs () // no
// dogFactory.numLegs () // 4
//
// in many cases, a simple function exported by the module will probably get you what you want.
// you can of course always put the static functions in the prototype as well. it will mean
// infinitesimally more memory use -- and that you need at least one instance.
//
// const dogProto = { numLegs: _ => 4, ... }
// const dogFactory = dogProto | factory
// const dog = dogFactory.create ()
// dog.numLegs () // 4

export const factoryStatics = mergeFromM

// --- don't really like this.
// proto gets altered.
// order difficult.
export const factoryMixinPre = curry ((mixin, proto) => factoryMixinPre ([mixin], [], proto))
export const factoryMixinPost = curry ((mixin, proto) => factoryMixinPre ([], [mixin], proto))

// ------ bind

// would be nice to bind with an arg, e.g. exit with a code.
//const exit = 'exit' | bind (process)

// xxx bind and invoke
// bind >> invoke
// xxx bind the other way around
// o | bind ('funcname')

// xxx cursor | bind ('theta')
// xxx 'theta' | bindOn (cursor)

// xxx preps
// --- dies if o[prop] is not a function.
export const bindTo = _recurry (2) (manual.bindTo)
export const bindTry = _recurry (2) (manual.bindTry)

// bindPropTo
// 'log'   | bindPropTo (console)
// console | bindProp   ('log')
//
// console.log | bindTo (console)
// console     | bind   (console.log)

export const bind = bindTo

// --- returns a thunk (function) representing the bind: doesn't actually try to bind until that function is invoked.
export const bindLate = curry ((o, key) => (...args) => o[key] (...args))



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

// --- synonym for always. check impl of always. xxx
export const blush = x => _ => x

// @test
export const T = blush (true)
export const F = blush (false)

export const condElse = T
export const condPredicate = _recurry (2) (manual.condPredicate)

export const guard = condPredicate
export const guardV = blush >> guard
export const otherwise = condElse

// @deprecated
// export const ifEquals = curry ((test, yes, no, x) => x === test ? yes (x) : no (x))
// export const whenEquals = curry ((test, yes, x) => x | ifEquals (test) (yes) (noop))
// export const ifEquals__ = (x, test, yes, no = noop) => x | ifEquals (test) (yes) (no)

const ignore = n => f => (...args) => args | splitAt (n) | prop (1) | passToN (f)
const headTail = f => splitAt (1) >> f

export const defaultToV = blush >> defaultTo

const { log, } = console
const logWith = header => (...args) => log (... [header, ...args])

// a map results in a collection of the same shape: list to list, object to object.
// the modifier As means the shape will change.

// filter: truthy, like JS filter & R filter
// map + filter could also be done with reduceObj, of course.
// filter applies to the mapped value.

// --- @test
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

export const withFilter = (p) => (mapper) => _withFilter ()
    .get (mapper) | ifOk (
        f => f (p),
        _ => die ('cannot augment mapper'),
    )

export const mapAsKeys = (f) => (o) => {
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

export const mapAsKeysIn = (f) => (o) => {
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

export const keys = (o) => {
    const ret = []
    for (const k in o) if (hasOwn.call (o, k)) ret.push (k)
    return ret
}

export const keysIn = (o) => {
    const ret = []
    for (const k in o) ret.push (k)
    return ret
}

export const mapAsValues = (f) => (o) => {
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

export const mapAsValuesIn = (f) => (o) => {
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

export const values = (o) => {
    const ret = []
    for (const k in o) if (hasOwn.call (o, k)) ret.push (o [k])
    return ret
}

export const valuesIn = (o) => {
    const ret = []
    for (const k in o) ret.push (o [k])
    return ret
}

export const mapKeys = (f) => (o) => {
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

export const mapValues = (f) => (o) => {
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

export const mapKeysIn = (f) => (o) => {
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

export const mapValuesIn = (f) => (o) => {
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
export const mapTuples = (f) => (o) => {
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

export const mapTuplesIn = (f) => (o) => {
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

const toUpperCase = dot ('toUpperCase')
const ifEqualsD = 'd' | eq | ifPredicate
const mapper = ifEqualsD (_ => null) (toUpperCase)
