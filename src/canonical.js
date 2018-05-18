import {
    curry, tap,
} from 'ramda'

// --- canonical can take functions from both main and manual.
// beware of circular loops -- be sure tests are up to date.

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


