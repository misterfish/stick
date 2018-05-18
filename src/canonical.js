import {
    curry, tap,
    has, hasIn,
} from 'ramda'

// --- canonical can take functions from both main and manual.
// beware of circular dependencies -- be sure tests are up to date.

import {
    dot, dot1, dot2, dot3, dot4, dot5, dotN,
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

export const ifBind = curry ((yes, no, [o, k]) => lets (
    _ => k | bindTry (o),
    ifOk (yes, no),
))

export const whenBind = yes => ifBind (yes) (noop)

