defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import ramda, {
    curry,
} from 'ramda'

import {
    pipe, composeRight, compose,
    prop, againstAll,
    ifPredicate, eq, gt,
    getType,
} from '../../index'

// --- beware circular reference: don't use these in point-free functions.
import {
    allOk,
    length,
} from './util'

import {
    isJust, toJust, isLeft,
} from './util-bilby'

export const isType = curry ((type, val) => getType (val) | eq (type))
export const isArray = isType ('Array')

export const ifLongerThan = n => ifPredicate (length >> gt (n))

export const isException = isType ('Error')
export const ifException = ifPredicate (isException)
export const ifNegativeOne = ifPredicate (-1 | eq)

// --- ugly (...args), but avoiding circular refs.
export const ifSingletonLeft = (...args) => ifPredicate (
    againstAll ([isArray, length >> eq (1), prop (0) >> isLeft])
) (...args)
export const ifAllOk = (...args) => ifPredicate (allOk) (...args)
