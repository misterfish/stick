defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import {
    pipe, composeRight, compose,
    dot, prop,
    dot2, dot1,
    ifOk, always, id, noop,
    head, tail,
    bindPropTo,
} from '../../index'

import {
    curry,
} from 'ramda'

import bilby, {
    left as Left,
    right as Right,
    some as Just,
    none as Nothing,
} from 'bilby'

export {
    Left, Right,
    Just, Nothing,
}

export const isLeft = prop ('isLeft')
export const fold = dot2 ('fold')
export const flatMap = dot1 ('flatMap')

export const toEither = curry ((l, o) => o | ifOk (
    Right,
    l | Left | always,
))

export const isJust = prop ('isSome')
export const toJust = fold (
    id, noop,
)

const colon = curry ((x, xs) => [x, ...xs])
const liftA2 = 'liftA2' | bindPropTo (bilby)

export const sequenceM = (pure) => {
    const _sequence = xs => xs.length === 0
        ? ([] | pure)
        : liftA2 (colon, xs | head, xs | tail | _sequence)
    return _sequence
}

export const cata = dot1 ('cata')
