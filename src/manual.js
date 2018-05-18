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

guardA is a convenience for a guard which returns a simple expression, so guard (_ => 'twilight zone')
could be replaced by guardA ('twilight zone')

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
    for (let i in src) if (oPro.hasOwnProperty.call (src, i))
        tgt[i] = src[i]
    return tgt
}

export const mergeFromM = (src) => (tgt) => {
    for (let i in src) if (oPro.hasOwnProperty.call (src, i))
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
    assocM,
    appendFrom, appendTo, appendToM, appendFromM,
    prependTo, prependFrom, prependToM, prependFromM,
    concatTo, concatFrom, concatToM, concatFromM,
    mergeTo, mergeFrom, mergeToM, mergeFromM,
}
