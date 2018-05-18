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


export default {
    dot, dot1, dot2, dot3, dot4, dot5, dotN,
    side, side1, side2, side3, side4, side5, sideN,
}
