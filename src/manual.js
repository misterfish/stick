import { sprintf, } from 'sprintf-js'

import {
    ok, notOk, whenOk,
    isFunction,
} from './index'

const noop = _ => {}
const oPro = Object.prototype
const hasOwn = oPro.hasOwnProperty

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

export const has = k => o => hasOwn.call (o, k)
export const hasIn = k => o => k in o
export const ifHas = yes => no => ([o, k]) => has (k) (o) ? yes (o [k], o, k) : no (o, k)
export const whenHas = yes => ifHas (yes) (noop)
export const ifHasIn = yes => no => ([o, k]) => hasIn (k) (o) ? yes (o [k], o, k) : no (o, k)
export const whenHasIn = yes => ifHasIn (yes) (noop)

export const bind = o => prop => o [prop].bind (o)

export const isType = (t) => (x) => {
    const str = oPro.toString.call (x)
    return str.slice (8, -1) === t
}

// --- beware point-free (circular).
const whenFunction = (yes, o) => whenPredicate (isFunction) (yes) (o)

// --- returns undefined if o[prop] is not a function.
export const bindTry = o => prop => whenFunction (
    _ => bind (o) (prop),
    o [prop],
)

export const ifBind = yes => no => ([o, k]) => {
    const bound = bindTry (o) (k)
    return ok (bound) ? yes (bound) : no ()
}

export const whenBind = yes => ifBind (yes) (noop)

// ------ cond

// --- different from ramda:
// brackets
// piping
// otherwise

/*

condo (
  [_ => 3 == 4, _ => 'twilight zone'],
  [_ => 3 == 5, _ => 'even stranger'],
  [null, _ => 'ok'],
)

or with a native idiom:

condo (
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
export const condo = (...blocks) => {
    for (const [test, exec] of blocks) {
        const result = test ()
        if (result) return exec (result)
    }
}

export const condO = (blocks) => (target) => {
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
    const oo = mergeFromInM (o) ({})
    oo [prop] = val
    return oo
}

export const assocM = prop => val => o => (o[prop] = val, o)

export const appendFrom = elem => ary => [...ary, elem]
export const appendTo   = ary => elem => [...ary, elem]

export const appendToM    = (tgt) => (src) => (tgt.push (src), tgt)
export const appendFromM  = (src) => (tgt) => (tgt.push (src), tgt)
export const prependTo    = ary => elem => [elem, ...ary]
export const prependFrom  = elem => ary => [elem, ...ary]
export const prependFromM = src => tgt => (tgt.unshift (src), tgt)
export const prependToM   = tgt => src => (tgt.unshift (src), tgt)

export const concatTo    = tgt => src => tgt.concat (src)
export const concatFrom  = src => tgt => tgt.concat (src)
export const concatToM   = tgt => src => (tgt.push (...src), tgt)
export const concatFromM = src => tgt => (tgt.push (...src), tgt)

// --- these seem to be much faster than Object.assign -- why?
// @profile
export const mergeToM = (tgt) => (src) => {
    for (const i in src) if (oPro.hasOwnProperty.call (src, i))
        tgt[i] = src[i]
    return tgt
}

export const mergeFromM = (src) => (tgt) => {
    for (const i in src) if (oPro.hasOwnProperty.call (src, i))
        tgt[i] = src[i]
    return tgt
}

export const mergeTo = (tgt) => (src) => {
    const a = mergeToM ({}) (tgt)
    return mergeToM (a) (src)
}

export const mergeFrom = (src) => (tgt) => {
    const a = mergeToM ({}) (tgt)
    return mergeToM (a) (src)
}

export const mergeToWithM = (collision) => (tgt) => (src) => {
	const ret = tgt
    for (const i in src) whenHas (
        (v, o, k) => ifHas (
			(v, o, k) => ret[i] = collision (ret[i], src[i]))
			((o, k) => ret[i] = src[i])
            ([ret, i])
        )
        ([src, i])
	return ret
}

export const mergeFromWithM = (collision) => (src) => (tgt) => mergeToWithM (collision) (tgt) (src)

// --- @test
export const mergeToWhenOkM = (tgt) => (src) => {
    for (const i in src) if (hasOwn.call (src, i) && ok (src[i]))
        tgt[i] = src[i]
    return tgt
}

// --- @test
export const mergeFromWhenOkM = (src) => (tgt) => mergeToWhenOkM (tgt) (src)

export const mergeToInM = (tgt) => (src) => {
    for (const i in src) tgt[i] = src[i]
    return tgt
}

export const mergeFromInM = (src) => (tgt) => mergeToInM (tgt) (src)

export const mergeToIn = (tgt) => (src) => {
    const a = mergeToInM ({}) (tgt)
    return mergeToInM (a) (src)
}
export const mergeFromIn = (src) => (tgt) => mergeToIn (tgt) (src)

// --- note: capped.
export const map  = f => ary => ary.map     (x => f (x))
export const each = f => ary => ary.forEach (x => f (x))

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


// --- @canonical
/*
export const ampersand = (fs) => (x) => fs | letsO ([
    _ => f => f (x),
    (fs, mapper) => fs | map (mapper),
])
*/

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

/*
export const asterisk = curry ((fs, xs) => xs
    | zip (fs)
    | map (([f, x]) => f (x))
)
*/

// ------ laat / let

export const letN = xs => f => f.apply (null, xs)

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

export default {
    eq, ne, gt, gte, lt, lte,
    dot, dot1, dot2, dot3, dot4, dot5, dotN,
    side, side1, side2, side3, side4, side5, sideN,
    ifPredicate, whenPredicate,
    has, hasIn,
    ifHas, ifHasIn,
    whenHas, whenHasIn,
    bind,
    ifBind, whenBind,
    bindTry,
    isType,
    condPredicate, condo, condO,
    subtract, subtractFrom,
    add,
    multiply, divideBy, divideInto,
    modulo, moduloWholePart,
    toThe,
    tryCatch, decorateException,
    defaultTo,
    assoc, assocM,
    appendFrom, appendTo, appendToM, appendFromM,
    prependTo, prependFrom, prependToM, prependFromM,
    concatTo, concatFrom, concatToM, concatFromM,
    mergeTo, mergeFrom, mergeToM, mergeFromM,
    mergeToWithM, mergeFromWithM,
    mergeToWhenOkM, mergeFromWhenOkM,
    mergeToInM, mergeFromInM, mergeToIn, mergeFromIn,
    addIndex, addCollection,
    map, each, eachObj, eachObjIn,
    reduceObj, reduceObjIn,
    ampersand, asterisk,
    letN,
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
}
