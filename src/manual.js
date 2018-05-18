import {
    ok, notOk,
    isFunction,
} from './index'

const noop = _ => {}
const oPro = Object.prototype
const hasOwn = oPro.hasOwnProperty

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

// --- null or undefined test ('otherwise') matches immediately
// and passes null to the function.
// --- we test on truthiness, not strict.
// --- this feels more natural -- like how if works, and also cond in ramda.
// trivial to convert to strict.
export const condo = (...blocks) => {
    for (const [test, exec] of blocks) {
        if (notOk (test)) return exec (null)
        const result = test ()
        if (result) return exec (result)
    }
}

export const condO = (blocks) => (target) => {
    for (const [test, exec] of blocks) {
        if (notOk (test)) return exec (target)
        const result = test (target)
        if (result) return exec (target, result)
    }
}

export const subtract     = m => n => n - m
export const subtractFrom = n => m => n - m

export const add = m => n => m + n
export const multiply = m => n => m * n

export const divideBy = m => n => n / m
export const divideInto = m => n => m / n

export default {
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
    condo, condO,
    subtract, subtractFrom,
    add,
    multiply, divideBy, divideInto,
}
