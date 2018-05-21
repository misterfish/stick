import { sprintf, } from 'sprintf-js'

import {
    ok, notOk, whenOk, ifOk,
    isFunction, ifYes,
    laat,
    getType,
    xRegExp, xRegExpFlags, xRegExpStr,
    die,
} from './index'

import stick from './index'

const noop = _ => {}
const oPro = Object.prototype
const hasOwn = oPro.hasOwnProperty

export const roll = (f) => (...args) => {
    let g = f
    for (const i of args) g = g (i)
    return g
}

export const recurry = (n) => (f) => (...args) => {
    const rolled = roll (f) (...args)
    const dn = n - args.length
    return dn <= 1 ? rolled
                   : recurry (dn) (rolled)
}

export const eq = x => y => x === y
export const ne = x => y => x !== y
export const gt = m => n => n > m
export const gte = m => n => n >= m
export const lt = m => n => n < m
export const lte = m => n => n <= m

export const dot  = prop => o => o[prop] ()

export const dot1 = prop => val =>
    o => o[prop] (val)
export const dot2 = prop => val1 => val2 =>
    o => o[prop] (val1, val2)
export const dot3 = prop => val1 => val2 => val3 =>
    o => o[prop] (val1, val2, val3)
export const dot4 = prop => val1 => val2 => val3 => val4 =>
    o => o[prop] (val1, val2, val3, val4)
export const dot5 = prop => val1 => val2 => val3 => val4 => val5 =>
    o => o[prop] (val1, val2, val3, val4, val5)
export const dotN = prop => vs =>
    o => o[prop] (...vs)

export const side = prop =>
    o => (dot (prop)
    (o), o)
export const side1 = prop => val1 =>
    o => (dot1 (prop) (val1)
    (o), o)
export const side2 = prop => val1 => val2 =>
    o => (dot2 (prop) (val1) (val2)
    (o), o)
export const side3 = prop => val1 => val2 => val3 =>
    o => (dot3 (prop) (val1) (val2) (val3)
    (o), o)
export const side4 = prop => val1 => val2 => val3 => val4 =>
    o => (dot4 (prop) (val1) (val2) (val3) (val4)
    (o), o)
export const side5 = prop => val1 => val2 => val3 => val4 => val5 =>
    o => (dot5 (prop) (val1) (val2) (val3) (val4) (val5)
    (o), o)

export const sideN = prop => vs =>
    o => (dotN (prop) (vs) (o), o)

export const ifPredicate = f => yes => no => x => f (x) === true ? yes (x) : no (x)
export const whenPredicate = f => yes => ifPredicate (f) (yes) (noop)

// --- passes the *result* of the predicate test to the yes/no functions instead of passing `x`.
export const ifPredicateOk = f => yes => no => x => {
    const p = f (x)
    return ok (p) ? yes (p) : no (p)
}
export const whenPredicateOk = f => yes => ifPredicate (f) (yes) (noop)

export const has = k => o => hasOwn.call (o, k)
export const hasIn = k => o => k in o
export const ifHas = yes => no => ([o, k]) => has (k) (o) ? yes (o [k], o, k) : no (o, k)
export const whenHas = yes => ifHas (yes) (noop)
export const ifHasIn = yes => no => ([o, k]) => hasIn (k) (o) ? yes (o [k], o, k) : no (o, k)
export const whenHasIn = yes => ifHasIn (yes) (noop)

export const bindLatePropTo = o => prop => (...args) => o [prop] (...args)
export const bindLateProp   = prop => o => (...args) => o [prop] (...args)

export const bindPropTo = o => prop => o [prop].bind (o)
export const bindProp   = prop => o => o [prop].bind (o)
export const bindTo     = o => f => f.bind (o)
export const bind       = f => o => f.bind (o)

export const isType = t => x => getType (x) === t

// --- bindTry* returns `null` if o[prop] is not a function.
export const bindTryPropTo = o => prop => typeof o [prop] === 'function'
    ? bindPropTo (o) (prop)
    : null

export const bindTryProp   = prop => o => typeof o [prop] === 'function'
    ? bindPropTo (o) (prop)
    : null

export const bindTryTo     = o => f =>    typeof f        === 'function'
    ? bindTo (o) (f)
    : null

export const bindTry       = f => o =>    typeof f        === 'function'
    ? bindTo (o) (f)
    : null

export const ifBind   = trier => ifPredicateOk (passToN (trier))
export const whenBind = trier => yes => ifBind (trier) (yes) (noop)

// ------ cond

// --- different from ramda:
// brackets
// piping
// otherwise

/*

cond (
  [_ => 3 == 4, _ => 'twilight zone'],
  [_ => 3 == 5, _ => 'even stranger'],
  [null, _ => 'ok'],
)

or with a native idiom:

cond (
  (_ => 3 == 4) | guard (_ => 'twilight zone'),
  (_ => 3 == 5) | guard (_ => 'even stranger'),
  otherwise     | guard (_ => 'ok'),
)

guardV is a convenience for a guard which returns a simple expression, so guard (_ => 'twilight zone')
could be replaced by guardV ('twilight zone')

*/

export const condPredicate = exec => pred => [pred, exec]

// --- we test on truthiness, not strict.
// --- this feels more natural -- like how if works, and also cond in ramda.
// trivial to convert to strict.
export const cond = (...blocks) => {
    for (const [test, exec] of blocks) {
        const result = test ()
        if (result) return exec (result)
    }
}

export const condS = (blocks) => (target) => {
    for (const [test, exec] of blocks) {
        const result = test (target)
        if (result) return exec (target, result)
    }
}

export const add          = m => n => m + n
export const multiply     = m => n => m * n
export const divideBy     = m => n => n / m
export const divideInto   = m => n => m / n
export const subtract     = m => n => n - m
export const subtractFrom = m => n => m - n
export const modulo = m => n => n % m
export const moduloWholePart = m => n => {
    const div = n / m
    const flo = Math.floor (div)
    return div < 0 ? 1 + flo : flo
}
export const toThe = e => b => Math.pow (b, e)

// ------ exceptions

export const tryCatch = (good) => (bad) => (f) => {
	let successVal
	try {
		successVal = f ()
	} catch (e) {
		return bad (e)
	}
	return good (successVal)
}

export const decorateException = (prefix) => (e) => {
    const msg = [prefix]
    whenOk (m => msg.push (m)) (e.message)
    e.message = msg.join (' ')
    return e
}

export const defaultTo = f => x => ok (x) ? x : f ()

export const assoc = (prop) => (val) => (o) => {
    const oo = mergeInM (o) ({})
    oo [prop] = val
    return oo
}

export const assocM = prop => val => o => (o[prop] = val, o)

export const append = elem => ary => [...ary, elem]
export const appendTo   = ary => elem => [...ary, elem]

export const appendToM    = (tgt) => (src) => (tgt.push (src), tgt)
export const appendM  = (src) => (tgt) => (tgt.push (src), tgt)
export const prependTo    = ary => elem => [elem, ...ary]
export const prepend  = elem => ary => [elem, ...ary]
export const prependM = src => tgt => (tgt.unshift (src), tgt)
export const prependToM   = tgt => src => (tgt.unshift (src), tgt)

export const concatTo    = tgt => src => tgt.concat (src)
export const concat  = src => tgt => tgt.concat (src)
export const concatToM   = tgt => src => (tgt.push (...src), tgt)
export const concatM = src => tgt => (tgt.push (...src), tgt)

// --- these seem to be much faster than Object.assign -- why?
// @profile
export const mergeToM = (tgt) => (src) => {
    for (const i in src) if (oPro.hasOwnProperty.call (src, i))
        tgt[i] = src[i]
    return tgt
}

export const mergeM = (src) => (tgt) => {
    for (const i in src) if (oPro.hasOwnProperty.call (src, i))
        tgt[i] = src[i]
    return tgt
}

export const mergeTo = (tgt) => (src) => {
    const a = mergeToM ({}) (tgt)
    return mergeToM (a) (src)
}

export const merge = (src) => (tgt) => {
    const a = mergeToM ({}) (tgt)
    return mergeToM (a) (src)
}

// --- tgt will be altered.
// only `own` needs to be passed: direction and mutability have already been decided.
//
// in the M case tgt is just the tgt;
// in the non-M case it has been prepared to be a new copy.
//
// `own` refers to both tgt & src -- not possible to mix and match.

// --- a performance hit is acceptable here.
const mergeXWith = (collision) => (own) => (src) => (tgt) => {
    const [_whenHas, _ifHas] = own ? [whenHas, ifHas] : [whenHasIn, ifHasIn]
    for (const i in src) _whenHas (
        (v, o, k) => _ifHas (
			(v, o, k) => tgt [i] = collision (src [i], tgt [i]))
			((o, k) => tgt [i] = src [i])
            ([tgt, i])
        )
        ([src, i])
	return tgt
}

export const path = xs => o => {
    let j = o
    for (const i of xs) if (!ok (j)) return j
                        else j = j [i]
    return j
}

const getInfo = merger => path (['$$stick', 'merge']) (merger)
                       || die ('Unrecognised merge function')

const oldGetInfo1 = (merger) => merger === mergeToM         ? [true, true, true]
                          : merger === stick.mergeToM   ? [true, true, true]
                          : merger === mergeM           ? [false, true, true]
                          : merger === stick.mergeM     ? [false, true, true]
                          : merger === mergeTo          ? [true, false, true]
                          : merger === stick.mergeTo    ? [true, false, true]
                          : merger === merge            ? [false, false, true]
                          : merger === stick.merge      ? [false, false, true]
                          : merger === mergeToInM       ? [true, true, false]
                          : merger === stick.mergeToInM ? [true, true, false]
                          : merger === mergeInM         ? [false, true, false]
                          : merger === stick.mergeInM   ? [false, true, false]
                          : merger === mergeToIn        ? [true, false, false]
                          : merger === stick.mergeToIn  ? [true, false, false]
                          : merger === mergeIn          ? [false, false, false]
                          : merger === stick.mergeIn    ? [false, false, false]
                          : die ('Unrecognised merge function')

export const mergeWith = (collision) => (merger) => (a) => (b) => {
    const { to, mut, own, } = getInfo (merger)
    const [src, tgt] = to ? [b, a] : [a, b]
    const tgtM = mut ? tgt : (
        to ? merger ({}) (tgt) : merger (tgt) ({})
    )
    return mergeXWith (collision) (own) (src) (tgtM)
}

// --- we don't (currently) have `in`, and `with` forms for the `when` form.
// --- tests `f` for truthiness.
export const mergeToWhenM = (f) => (tgt) => (src) => {
    for (const i in src)
        if (hasOwn.call (src, i) && f (src [i], tgt [i]))
            tgt[i] = src[i]
    return tgt
}

// --- tests `f` for truthiness.
export const mergeToWhen = (f) => (tgt) => (src) => {
    const a = mergeToM ({}) (tgt)
    return mergeToWhenM (f) (a) (src)
}

// --- tests `f` for truthiness.
export const mergeWhenM = f => src => tgt => mergeToWhenM (f) (tgt) (src)

// --- tests `f` for truthiness.
export const mergeWhen = (f) => (src) => (tgt) => {
    const a = mergeToM ({}) (tgt)
    return mergeToWhenM (f) (a) (src)
}

export const mergeToInM = (tgt) => (src) => {
    for (const i in src) tgt[i] = src[i]
    return tgt
}

export const mergeInM = (src) => (tgt) => mergeToInM (tgt) (src)

export const mergeToIn = (tgt) => (src) => {
    const a = mergeToInM ({}) (tgt)
    return mergeToInM (a) (src)
}
export const mergeIn = (src) => (tgt) => mergeToIn (tgt) (src)

// --- note: capped.
export const map  = f => ary => ary.map     (x => f (x))
export const each = f => ary => ary.forEach (x => f (x))
export const filter = f => ary => ary.filter (x => f (x))
export const reject = f => ary => ary.filter (x => ! f (x))

// --- returns obj
export const eachObj = (f) => (o) => {
    for (const k in o) if (hasOwn.call (o, k)) f (o [k], k)
    return o
}

// --- returns obj
export const eachObjIn = (f) => (o) => {
    for (const k in o) f (o [k], k)
    return o
}

// --- works on lists & objects
export const addIndex = (orig) => (f) => (ary) => {
    let idx = -1
    const g = (...args) => f (...args, ++idx)
    return orig (g) (ary)
}

// --- works on lists & objects
export const addCollection = (orig) => (f) => (ary) => {
    const g = (...args) => f (...args, ary)
    return orig (g) (ary)
}

export const reduceObj = (f) => (acc) => (o) => {
    let curAcc = acc
    for (const k in o) if (hasOwn.call (o, k))
        curAcc = f (curAcc, [k, o [k]])
    return curAcc
}

export const reduceObjIn = (f) => (acc) => (o) => {
    let curAcc = acc
    for (const k in o)
        curAcc = f (curAcc, [k, o [k]])
    return curAcc
}

export const ampersand = (fs) => (x) => {
    const mapper = f => f (x)
    return map (mapper) (fs)
}

export const asterisk = (fs) => (xs) => {
    const ret = []
    let i = -1
    for (const f of fs) {
        const x = xs [++i]
        ret.push (f (x))
    }
    return ret
}

// ------ laat / let

export const letNV = xs => f => f.apply (null, xs)
export const letS = specAry => tgt => laat (
	_ => tgt,
	... specAry,
)

// ------ call/provide

export const callOn = o =>
    f => f.call (o)
export const callOn1 = o => val1 =>
    f => f.call (o, val1)
export const callOn2 = o => val1 => val2 =>
    f => f.call (o, val1, val2)
export const callOn3 = o => val1 => val2 => val3 =>
    f => f.call (o, val1, val2, val3)
export const callOn4 = o => val1 => val2 => val3 => val4 =>
    f => f.call (o, val1, val2, val3, val4)
export const callOn5 = o => val1 => val2 => val3 => val4 => val5 =>
    f => f.call (o, val1, val2, val3, val4, val5)
export const callOnN = o => vs =>
    f => f.apply (o, vs)

export const provideTo = f =>
    o => f.call (o)
export const provideTo1 = f => val =>
    o => f.call (o, val)
export const provideTo2 = f => val1 => val2 =>
    o => f.call (o, val1, val2)
export const provideTo3 = f => val1 => val2 => val3 =>
    o => f.call (o, val1, val2, val3)
export const provideTo4 = f => val1 => val2 => val3 => val4 =>
    o => f.call (o, val1, val2, val3, val4)
export const provideTo5 = f => val1 => val2 => val3 => val4 => val5 =>
    o => f.call (o, val1, val2, val3, val4, val5)
export const provideToN = f => vs =>
    o => f.apply (o, vs)

export const applyTo1 = val1 =>
    f => f (val1)
export const applyTo2 = val1 => val2 =>
    f => f (val1, val2)
export const applyTo3 = val1 => val2 => val3 =>
    f => f (val1, val2, val3)
export const applyTo4 = val1 => val2 => val3 => val4 =>
    f => f (val1, val2, val3, val4)
export const applyTo5 = val1 => val2 => val3 => val4 => val5 =>
    f => f (val1, val2, val3, val4, val5)
export const applyToN = vs =>
    f => f.apply (null, vs)

export const passTo = f => val => f (val)
export const passToN = f => vs => f.apply (null, vs)

// ------ join, split etc.
export const join = dot1 ('join')
export const split = dot1 ('split')

export const prop = p => o => o [p]

export const flip  = f => a => b =>
    f (b) (a)
export const flip3 = f => a => b => c =>
    f (b) (a) (c)
export const flip4 = f => a => b => c => d =>
    f (b) (a) (c) (d)
export const flip5 = f => a => b => c => d => e =>
    f (b) (a) (c) (d) (e)

// ------ sprintf

export const sprintf1 = str => a  => sprintf (str, a)
export const sprintfN = str => xs => sprintf.apply (null, [str, ...xs])

// ------ repeat, times
export const repeatV = (x) => (n) => {
    const ret = []
    for (let i = 0; i < n; i++) ret.push (x)
    return ret
}
export const repeatF = (f) => (n) => {
    const ret = []
    for (let i = 0; i < n; i++) ret.push (f (i))
    return ret
}
export const repeatSide = (f) => (n) => {
    for (let i = 0; i < n; i++) f (i)
}

export const timesV = (x) => (n) => repeatV (n) (x)
export const timesF = (f) => (n) => repeatF (n) (f)
export const timesSide = (n) => (f) => repeatSide (f) (n)

// ------ replace / match
export const ifReplace = (yes) => (no) => (re) => (replArg) => (target) => {
    let success = 0
    const repl = typeof replArg === 'function'
        ? (...args) => (++success, replArg (...args))
        : _         => (++success, replArg)
    const out = target.replace (re, repl)
    return success ? yes (out, success) : no (target)
}

// --- by should be negative to count down.
export const rangeFromBy = (by) => (from) => (to) =>
    from < to ? rangeFromByAsc  (by) (from) (to) :
    from > to ? rangeFromByDesc (by) (from) (to) :
    []

// --- no corresponding to version.
export const rangeFromByAsc = (by) => (from) => (to) => {
    const ret = []
    for (let i = from; i < to; i += by) ret.push (i)
    return ret
}

// --- no corresponding to version.
export const rangeFromByDesc = (by) => (from) => (to) => {
    const ret = []
    for (let i = from; i > to; i += by) ret.push (i)
    return ret
}

export const rangeToBy = (by) => (to) => (from) =>
    from < to ? rangeFromByAsc  (by) (from) (to) :
    from > to ? rangeFromByDesc (by) (from) (to) :
    []

export const neu1 = x => val1 =>
    new x (val1)
export const neu2 = x => val1 => val2 =>
    new x (val1, val2)
export const neu3 = x => val1 => val2 => val3 =>
    new x (val1, val2, val3)
export const neu4 = x => val1 => val2 => val3 => val4 =>
    new x (val1, val2, val3, val4)
export const neu5 = x => val1 => val2 => val3 => val4 => val5 =>
    new x (val1, val2, val3, val4, val5)
export const neuN = x => vs =>
    new x (...vs)

export const match = re => target => re.exec (target)

export const xMatchGlobal = (re) => (mapper) => (target) => {
	let out = []
	const reGlobal = xRegExpFlags (re, 'g')
	let m
	while (m = reGlobal.exec (target))
        appendToM (out) (mapper (...m))
	return out
}

export const xMatch = re => target => xRegExp (re).exec (target)
export const xMatchStr = reStr => target => xMatch (new RegExp (reStr)) (target)
export const xMatchStrFlags = reStr => flags => target =>
    xMatch (new RegExp (reStr, flags)) (target)
export const xReplace = re => repl => target =>
    target.replace (xRegExp (re), repl)
export const xReplaceStr = reStr => repl => target =>
    target.replace (xRegExpStr (reStr), repl)
export const xReplaceStrFlags = reStr => flags => repl => target =>
    target.replace (xRegExpStr (reStr, flags), repl)
export const ifXReplace = yes => no => re => repl => target =>
    ifReplace (yes) (no) (xRegExp (re)) (repl) (target)
export const ifXReplaceStr = yes => no => reStr => repl => target =>
    ifReplace (yes) (no) (xRegExpStr (reStr)) (repl) (target)
export const ifXReplaceStrFlags = yes => no => reStr => flags => repl => target =>
    ifReplace (yes) (no) (xRegExpStr (reStr, flags)) (repl) (target)

export const factoryProps = (props) => (factory) => {
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
}

export const factoryInit = (init) => (proto) => ({
    proto,
    create: (props) => {
        const o = Object.create (proto)
        init (o, props)
        return o
    },
})

// --- alters the prototype by merging in the mixins.
// --- if a key exists in the proto and is not nil, then it is not overwritten.
const mergeMixinPreM = (mixin) => (proto) => {
    const chooseTarget = (src, tgt) => ok (tgt) ? tgt : src
    mixin | mergeToWithM (chooseTarget) (proto)
}

// --- alters the prototype by merging in the mixins.
const mergeMixinPostM = (mixin) => (proto) => {
    const chooseTarget = (src, tgt) => ok (tgt) ? tgt : src
    mixin | mergeToM (proto)
}

export default {
    roll, recurry,
    eq, ne, gt, gte, lt, lte,
    dot, dot1, dot2, dot3, dot4, dot5, dotN,
    side, side1, side2, side3, side4, side5, sideN,
    ifPredicate, whenPredicate,
    ifPredicateOk, whenPredicateOk,
    has, hasIn,
    ifHas, ifHasIn,
    whenHas, whenHasIn,
    bindLatePropTo, bindLateProp,
    bindPropTo, bindProp, bindTo, bind,
    bindTryPropTo, bindTryProp, bindTryTo, bindTry,
    ifBind, whenBind,
    isType, getType,
    condPredicate, cond, condS,
    subtract, subtractFrom,
    add,
    multiply, divideBy, divideInto,
    modulo, moduloWholePart,
    toThe,
    tryCatch, decorateException,
    defaultTo,
    assoc, assocM,
    append, appendTo, appendToM, appendM,
    prependTo, prepend, prependToM, prependM,
    concatTo, concat, concatToM, concatM,
    mergeTo, merge, mergeToM, mergeM,
    mergeToWhenM, mergeWhenM,
    mergeToWhen, mergeWhen,
    mergeToInM, mergeInM, mergeToIn, mergeIn,
    mergeWith,
    addIndex, addCollection,
    map, filter, reject,
    each, eachObj, eachObjIn,
    reduceObj, reduceObjIn,
    ampersand, asterisk,
    letNV, letS,
    callOn, callOn1, callOn2, callOn3, callOn4, callOn5, callOnN,
    provideTo, provideTo1, provideTo2, provideTo3, provideTo4, provideTo5, provideToN,
    applyTo1, applyTo2, applyTo3, applyTo4, applyTo5, applyToN,
    passTo, passToN,
    join, split,
    prop,
    flip, flip3, flip4, flip5,
    sprintf1, sprintfN,
    repeatV, repeatF, repeatSide,
    timesV, timesF, timesSide,
    ifReplace,
    rangeFromBy, rangeToBy,
    rangeFromByAsc, rangeFromByDesc,
    neu1, neu2, neu3, neu4, neu5, neuN,
    match, xMatchGlobal,
    xMatch, xMatchStr, xMatchStrFlags,
    xReplace, xReplaceStr, xReplaceStrFlags,
    ifXReplace, ifXReplaceStr, ifXReplaceStrFlags,
    factoryProps, factoryInit,
}
