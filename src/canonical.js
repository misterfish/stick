import {
    curry, tap,
    has, hasIn,
    gt as rGt, gte as rGte, lt as rLt, lte as rLte,
    flip,
    subtract, add,
    divide,
    join,
    concat as rConcat,
} from 'ramda'

// --- canonical can take functions from both main and manual.
// beware of circular dependencies -- be sure tests are up to date.
// --- index and manual do not take from canonical, so in princple there shouldn't be any.

import {
    dot, dot1, dot2, dot3, dot4, dot5, dotN,
    isFunction, appendFrom, appendToM,
    prependTo, concatToM,
} from './index'

export const side  = (prop) => tap (dot (prop))
export const side1 = curry (
    (prop, val) => tap (dot1 (prop) (val))
)
export const side2 = curry (
    (prop, val1, val2) => tap (dot2 (prop) (val1) (val2))
)
export const side3 = curry (
    (prop, val1, val2, val3) => tap (dot3 (prop) (val1) (val2) (val3))
)
export const side4 = curry (
    (prop, val1, val2, val3, val4) => tap (dot4 (prop) (val1) (val2) (val3) (val4))
)
export const side5 = curry (
    (prop, val1, val2, val3, val4,val5) => tap (dot5 (prop) (val1) (val2) (val3) (val4) (val5))
)
export const sideN = curry (
    (prop, vs) => tap (dotN (prop) (vs))
)

export const ifPredicate = curry ((f, yes, no, x) => f (x) === true ? yes (x) : no (x))
export const whenPredicate = curry ((f, yes, x) => x | ifPredicate (f) (yes) (noop))

export const ifHas = curry ((yes, no, [o, k]) => o | has (k) ? yes (o[k], o, k) : no (o, k))
export const whenHas = curry ((yes, spec) => spec | ifHas (yes) (noop))

export const ifHasIn = curry ((yes, no, [o, k]) => o | hasIn (k) ? yes (o[k], o, k) : no (o, k))
export const whenHasIn = curry ((yes, spec) => spec | ifHasIn (yes) (noop))


const whenFunction = isFunction | whenPredicate

// --- dies if o[prop] is not a function.
export const bind = curry ((o, prop) => o [prop].bind (o))

// --- returns undefined if o[prop] is not a function.
export const bindTry = curry ((o, prop) => o[prop]
    | whenFunction (() => bind (o, prop)))

export const ifBind = curry ((yes, no, [o, k]) => lets (
    _ => k | bindTry (o),
    ifOk (yes, no),
))

export const whenBind = yes => ifBind (yes) (noop)

export const _cond = (withTarget, blocks, target) => {
    let result
    for (const [test, exec] of blocks) {
        // --- null or undefined test ('otherwise') matches immediately
        if (test | notOk) return withTarget ? exec (target) : exec ()

        const result = withTarget ? test (target) : test ()
        // @todo test.
        if (result) return withTarget ? exec (target, result) : exec (result)
    }
}

export const condo = blocks => _cond (false, blocks)
export const condO = curry ((blocks, target) => _cond (true, blocks, target))



export const ok = isNil >> not
export const notOk = isNil


export const gt  = flip (rGt)
export const gte = flip (rGte)
export const lt  = flip (rLt)
export const lte = flip (rLte)



export const subtractFrom = subtract
export const minus = flip (subtractFrom)
export const plus = add

export const divideBy = flip (divide)

export const tryCatch = curry ((good, bad, f) => {
    let successVal
    try {
        successVal = f ()
    } catch (e) {
        return bad (e)
    }
    return good (successVal)
})

export const exception = (...args) => new Error (
    args | join (' ')
)

export const decorateException = curry ((prefix, e) =>
    e | assocM ('message', joinOk (' ') ([prefix, e.message]))
)

export const appendTo = flip (appendFrom)
export const appendFromM = flip (appendToM)
export const prependFrom = flip (prependTo)

export const concatTo = rConcat
export const concatFrom = flip (rConcat)
export const concatFromM = flip (concatToM)

export const mergeTo = rMerge
export const mergeFrom = flip (rMerge)

export const mergeToWithM = curry ((collision, tgt, src) => {
    const ret = tgt
    for (let i in src)
        [src, i] | whenHas ((v, o, k) => {
            [ret, i] | ifHasIn (
                (v, o, k) => ret[i] = collision (ret[i], src[i]),
                (o, k) => ret[i] = src[i],
            )
        })
    return ret
})

export const mergeFromWithM = curry ((collision, src, tgt) =>
    mergeToWithM (collision, tgt, src)
)

export const mergeToWithM = curry ((collision, tgt, src) => {
    const ret = tgt
    for (let i in src)
        // [src, i] | whenHas ((v, o, k) => [ret, i] | ifHasIn (
        [src, i] | whenHas ((v, o, k) => [ret, i] | ifHas (
            (v, o, k) => ret[i] = collision (ret[i], src[i]),
            (o, k) => ret[i] = src[i],
        )
    )
    return ret
})



