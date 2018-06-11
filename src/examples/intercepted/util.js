defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import ramda, {
    curry, findIndex,
} from 'ramda'

import {
    pipe, composeRight, compose,
    prop, map, addIndex,
    always, id,
    not, T, F, join,
    ok, dot1, dot2, side2,
    guard, otherwise,
    lets,
    concat, condS, guardV, repeat,
    againstEither,
    timesV,
    tryCatch,
    path,
    split,
} from '../../index'

// --- beware circular reference: don't use these in point-free functions.
import {
    ifLongerThan, ifNegativeOne,
} from './util-pred'

import {
    isJust, toJust,
} from './util-bilby'

export const then = dot1 ('then')
export const recover = dot1 ('catch')

export const minus = curry ((a, b) => b - a)

const removeSpaces = dot2 ('replace') (/\s+/g) ('')

// --- beware, overwrites any flags that the re already had.
export const xRegExpFlags = (re, flags) => new RegExp (
    re.source | removeSpaces,
    flags,
)

export const findPredOk = curry ((pred, xs) => {
    for (const x of xs) {
        const p = pred (x)
        if (ok (p)) return p
    }
})

export const findPredOkGen = curry ((pred, gen) => {
    let n
    while (! (n = gen.next ()).done) {
        const p = pred (n.value)
        if (ok (p)) return p
    }
})

export const findPredMaybeGen = curry ((pred, gen) => {
    let n
    while (! (n = gen.next ()).done) {
        const p = pred (n.value)
        if (p | isJust) return p | toJust
    }
})


export const tryCatchS = curry ((good, bad, f, v) =>
    tryCatch (good, bad, _ => f (v))
)

export const length = prop ('length')

export const mapX = map | addIndex

// ------ lazyfish extensions
export const lazyFindPred = curry ((pred, lxs) => {
    while (true) {
        const { value, done, } = lxs.next ()
        if (done) break
        const predVal = pred (value)
        if (predVal) return predVal
    }
})

export const substring = dot2 ('substring')

export const ellipsisAfter = curry ((n, s) => s | ifLongerThan (n) (
    substring (0, n) >> concat ('…'),
    id,
))

// --- only own (R.toPairs and R.map are like this too)
// --- order: k, v
export const mapObj = curry ((f, o) => {
    const ret = []
    for (const i in o) {
        ret.push (f (i, o[i]))
    }
    return ret
})

export const allOk = x => x
    | findIndex (ok >> not)
    | ifNegativeOne (T, F)

// --- doesn't truncate if too long.
export const padTo = curry ((n, str) => lets (
    _ => str.length,
    (l) => str | condS ([
        (_ => l >= n) | guardV (str),
        otherwise | guard (x => x | (timesV (n - l) (' ') | join ('') | concat)),
    ])
))

export const on = side2 ('on')

export const either = (f, g) => againstEither (f, g)

export const pathDot = split ('.') >> path

export const uniqueWith = (f) => (xs) => {
    const ret = []
    const s = new Set
    for (const x of xs) {
        const xx = f (x)
        if (s.has (xx)) continue
        ret.push (x)
        s.add (f (x))
    }
    return ret
}
