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

const hasOwn = Object.prototype.hasOwnProperty
const oStr   = Object.prototype.toString

// --- takes a manually curried function like
// f = a => b => c => d => { body }
// and returns a new function g which can be called as:
// g (a, b, c, d)
//
// g is curried, but only allows the manual calling style.
//
// g does not have a well-defined arity.
//
// Consider using R.uncurryN if this latter is a problem. The resulting function will still be curried, despite the name.

export const roll = manual.roll

// --- takes a manually curried function and allows it to be called using either of the two calling
// styles.
// --- `recurry` itself must be called using the manual style.
// --- as with `roll`, the recurried function does not have a well-defined arity.

// const r = (a => b => c => a * b * c) | recurry
// r (1, 2, 3) = roll (orig) (1, 2, 3)
// r (1, 2)    = roll (orig) (1, 2)
// r (1) = roll (orig) (1)
// r (1) (2) (3)
// r ()

// --- it does work to recurry `recurry` using itself, in order to allow both calling styles, but
// will probably cause a performance hit.
// const _recurry = manual.recurry (2) (manual.recurry)

export const recurry = manual.recurry

const _recurry = recurry

export const noop = () => {}
export const not = f => !f

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
export const ifPredicateOk = _recurry (4) (manual.ifPredicateOk)
export const whenPredicateOk = _recurry (2) (manual.whenPredicateOk)

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
// /---

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

// --- 4 | appendTo ([1, 2, 3])
// --- ([1, 2, 3]) | append (4)

export const append    = _recurry (2) (manual.append)
export const appendTo  = _recurry (2) (manual.appendTo)
export const appendM   = _recurry (2) (manual.appendM)
export const appendToM = _recurry (2) (manual.appendToM)

// ------ prepend.

// --- 1 | prependTo ([2, 3, 4])
// --- ([2, 3, 4]) | prepend (1)
export const prependTo  = _recurry (2) (manual.prependTo)
export const prepend    = _recurry (2) (manual.prepend)
export const prependM   = _recurry (2) (manual.prependM)
export const prependToM = _recurry (2) (manual.prependToM)

// --- arrays or strings
// --- ramda's concat does more type checking and also allows fantasy land semigroups.
// --- [4] | concatTo ([1, 2, 3])
// --- [1, 2, 3] | concat ([4])
// --- [1, 2, 3] | concat ([4])
export const concatTo = _recurry (2) (manual.concatTo)
export const concat   = _recurry (2) (manual.concat)
export const precatTo = concat
export const precat   = concatTo

// --- only arrays (strings will throw)
export const concatToM = _recurry (2) (manual.concatToM)
export const concatM   = _recurry (2) (manual.concatM)

// --- own properties, including null/undefined.
// --- 2x faster than Object.assign.
// --- @todo: why is it so much faster?

// --- { b: 2 } | mergeTo ({ a: 1, b: null })
// --- ({ a: 1, b: null }) | merge ({ b: 2 })
// --- ({ a: 1, b: null }) | merge     ({ b: 2 })
export const mergeTo  = _recurry (2) (manual.mergeTo)
export const merge    = _recurry (2) (manual.merge)
export const mergeM   = _recurry (2) (manual.mergeM)
export const mergeToM = _recurry (2) (manual.mergeToM)

// --- copies enumerable own properties from src into tgt, mut.
////// --- uses collision function if key exists in the target, anywhere in target's prototype chain.
// --- 'with' refers to collision
// --- 'to' refers to tgt
// --- to avoid non-intuitive behavior, only own properties are checked on the target.
////// --- if a collision occurs in the target's prototype chain, the value will surface, regardless of whether src or tgt version is chosen.

export const mergeToWithM = _recurry (3) (manual.mergeToWithM)
export const mergeWithM   = _recurry (3) (manual.mergeWithM)

export const mergeToWhenM = _recurry (3) (manual.mergeToWhenM)
export const mergeWhenM   = _recurry (3) (manual.mergeWhenM)
export const mergeToWhen  = _recurry (3) (manual.mergeToWhen)
export const mergeWhen    = _recurry (3) (manual.mergeWhen)

export const mergeToInM = _recurry (2) (manual.mergeToInM)
export const mergeInM   = _recurry (2) (manual.mergeInM)

// --- all enumerable properties (non-own and own) on both the src and tgt will be copied to the new
// object.
export const mergeIn = _recurry (2) (manual.mergeIn)

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

// --- simple dispatches to Array.prototype functions, but capped.

export const map    = _recurry (2) (manual.map)
export const each   = _recurry (2) (manual.each)

export const filter = _recurry (2) (manual.filter)
export const reject = _recurry (2) (manual.reject)

// --- undef on empty array, like ramda
export const last = xs => xs [xs.length - 1]

export const addIndex      = _recurry (3) (manual.addIndex)
export const addCollection = _recurry (3) (manual.addCollection)

    /*
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

// --- doesn't take array, only obj.
export const mapPairsIn = curry ((f, obj) => obj
    | toPairsIn
    | map (([k, v]) => f (k, v))
    | fromPairs,
)
*/

export const eachObj = _recurry (2) (manual.eachObj)
export const eachObjIn = _recurry (2) (manual.eachObjIn)

export const reduceObj = _recurry (3) (manual.reduceObj)
export const reduceObjIn = _recurry (3) (manual.reduceObjIn)

// fs `ampersand` x = map map' fs where map' f = f x
export const ampersand = _recurry (2) (manual.ampersand)
export const asterisk = _recurry (2) (manual.asterisk)

// --------- laat / let

/*
 * laat = let* from racket
 * letN = let* + array
 * letS = let* + stick (implies N)
 * let1, let2, etc.: wrapped by laat, but can be called directly too.
 * letNV = like letV, with array
 * letV = let with values instead of functions
 */

// --- last arg must be a function.
// 1 arg is possible but trivial.
export const letV = (...xs) => {
    const f = xs.pop ()
    return letNV (xs, f)
}

/*
 * For example, our `defaultTo` takes a function:
 * null | defaultTo (_ -> 'bad news')
 * For simple values, defaultToV can be more convenient:
 * null | defaultToV ('bad news')
*/
// i like letV fitting the pattern
// laat -> letV x
// letN -> letNV x
// lets2 -> let2 x
// letsN -> letN x
// lets -> laat x
// letsS -> letS x

export const letNV = _recurry (2) (manual.letNV)

// --- trivial form.
export const let1 = f => invoke (f)

// --- these can be called directly by speed freaks; `lets` should be good enough for nearly all
// uses.
export const let2 = (f1, f2) => {
    const n1 = f1 ()
    return f2 (n1)
}

export const let3 = (f1, f2, f3) => {
    const n1 = f1 ()
    const n2 = f2 (n1)
    return f3 (n1, n2)
}

export const let4 = (f1, f2, f3, f4) => {
    const n1 = f1 ()
    const n2 = f2 (n1)
    const n3 = f3 (n1, n2)
    return f4 (n1, n2, n3)
}

export const let5 = (f1, f2, f3, f4, f5) => {
    const n1 = f1 ()
    const n2 = f2 (n1)
    const n3 = f3 (n1, n2)
    const n4 = f4 (n1, n2, n3)
    return f5 (n1, n2, n3, n4)
}

export const let6 = (f1, f2, f3, f4, f5, f6) => {
    const n1 = f1 ()
    const n2 = f2 (n1)
    const n3 = f3 (n1, n2)
    const n4 = f4 (n1, n2, n3)
    const n5 = f5 (n1, n2, n3, n4)
    return f6 (n1, n2, n3, n4, n5)
}

export const letN = (xs) => laat (...xs)

// --- throws an error if more than 6 arguments are given.
// --- this ought to be enough for normal usage.
// --- there is a generic functional form (see canonical.js), but it depends on mapAccum, for which
// we depend on Ramda.
export const laat = (...xs) => {
    if (xs.length === 1) return let1 (...xs)
    if (xs.length === 2) return let2 (...xs)
    if (xs.length === 3) return let3 (...xs)
    if (xs.length === 4) return let4 (...xs)
    if (xs.length === 5) return let5 (...xs)
    if (xs.length === 6) return let6 (...xs)
    throw new Error ('laat: too many arguments (max = 6)')
}

export const letS = _recurry (2) (manual.letS)

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

// --- passTo is not called apply ...
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

// ------ types.

export const getType    = x => oStr.call (x).slice (8, -1)
export const isType     = _recurry (2) (manual.isType)

export const isFunction = isType ('Function')
export const isArray    = isType ('Array')
export const isObject   = isType ('Object')
export const isNumber   = isType ('Number')
export const isRegExp   = isType ('RegExp')
export const isBoolean  = isType ('Boolean')
export const isString   = isType ('String')

// --- assumed to be a Number.
export const isInteger = x => x === Math.floor (x)

// --- excl, so it's like ramda.
// --- note that `by` should be negative to count down.

export const rangeFromBy     = _recurry (3) (manual.rangeFromBy)
export const rangeFromByAsc  = _recurry (3) (manual.rangeFromByAsc)
export const rangeFromByDesc = _recurry (3) (manual.rangeFromByDesc)
export const rangeToBy       = _recurry (3) (manual.rangeToBy)
export const rangeToByAsc    = _recurry (3) (manual.rangeToByAsc)
export const rangeToByDesc   = _recurry (3) (manual.rangeToByDesc)

export const rangeTo         = rangeToBy (1)
export const rangeFrom       = rangeFromBy (1)

export const compact   = filter (Boolean)
export const compactOk = reject (notOk)

// --- turn positional args into a list with those values.
export const list = (...args) => args

// --------- new.

export const neu = x => new x
export const neu1 = _recurry (2) (manual.neu1)
export const neu2 = _recurry (3) (manual.neu2)
export const neu3 = _recurry (4) (manual.neu3)
export const neu4 = _recurry (5) (manual.neu4)
export const neu5 = _recurry (6) (manual.neu5)
export const neuN = _recurry (2) (manual.neuN)

// --------- regex.

// --- these deviate somewhat from the naming conventions: we're assuming you generally want to pipe
// the target to the match functions.

const removeSpaces = dot2 ('replace') (/\s+/g) ('')

// --- input: regex.
export const xRegExp = re => new RegExp (
    re.source | removeSpaces,
    re.flags,
)

// --- beware, overwrites any flags that the re already had.
export const xRegExpFlags = (re, flags) => new RegExp (
    re.source | removeSpaces,
    flags,
)

// --- input: string, [string].
export const xRegExpStr = (reStr, flags = '') => laat (
    _ => reStr | removeSpaces,
    _ => flags,
    neu2 (RegExp),
)

export const match = _recurry (2) (manual.match)

// --- not every function (currently) has a matching 'replace' version.

// @todo make xMatch incur only a compile-time cost.

// --- input: regex.
export const xMatch             = _recurry (2) (manual.xMatch)
export const xMatchGlobal       = _recurry (3) (manual.xMatchGlobal)
// --- input: string.
export const xMatchStr          = _recurry (2) (manual.xMatchStr)
// --- input: string, string.
export const xMatchStrFlags     = _recurry (3) (manual.xMatchStrFlags)
export const xReplace           = _recurry (3) (manual.xReplace)
export const xReplaceStr        = _recurry (3) (manual.xReplaceStr)
export const xReplaceStrFlags   = _recurry (4) (manual.xReplaceStrFlags)

export const ifReplace          = _recurry (5) (manual.ifReplace)
export const ifXReplace         = _recurry (5) (manual.ifXReplace)
export const ifXReplaceStr      = _recurry (5) (manual.ifXReplaceStr)
export const ifXReplaceStrFlags = _recurry (6) (manual.ifXReplaceStrFlags)

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

const _factory = (proto, mixinsPre = [], mixinsPost = []) => laat (
    _ => mergeMixins (mixinsPre, proto, mixinsPost),
    (protoMixed) => ({
        // --- consider dropping this: Object.getPrototypeOf xxx
        proto: protoMixed,
        create: (...instanceExtension) => protoMixed
            | Object.create
            | mergeM (instanceExtension | rMergeAll),
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

export const factoryMixins = noop ((mixinsPre, mixinsPost, proto) =>
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

export const factoryProps = _recurry (2) (manual.factoryProps)
export const factoryInit = _recurry (2) (manual.factoryInit)
export const factory = factoryInit ((o, props) => {
    if (props == null) return
    for (const i in props) if (hasOwn.call (props, i))
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

export const factoryStatics = mergeM

// --- don't really like this.
// proto gets altered.
// order difficult.
export const factoryMixinPre = noop ((mixin, proto) => factoryMixinPre ([mixin], [], proto))
export const factoryMixinPost = noop ((mixin, proto) => factoryMixinPre ([], [mixin], proto))

// ------ bind

// 'log'   | bindPropTo (console)
// console | bindProp   ('log')

// --- dies if o[prop] is not a function.
export const bindPropTo = _recurry (2) (manual.bindPropTo)
export const bindProp   = _recurry (2) (manual.bindProp)

export const bindTryPropTo = _recurry (2) (manual.bindTryPropTo)
export const bindTryProp   = _recurry (2) (manual.bindTryProp)
export const bindTryTo     = _recurry (2) (manual.bindTryTo)
export const bindTry       = _recurry (2) (manual.bindTry)

// console.log | bindTo (console)
// console     | bind   (console.log)

export const bindTo = _recurry (2) (manual.bindTo)
export const bind = _recurry (2) (manual.bind)

// --- returns a thunk representing the bind:
// doesn't actually try to bind until that function is invoked.
export const bindLatePropTo = _recurry (2) (manual.bindLatePropTo)
export const bindLateProp   = _recurry (2) (manual.bindLateProp)

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

export const blush = x => _ => x
export const always = blush

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

export const defaultToV = blush >> defaultTo

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
