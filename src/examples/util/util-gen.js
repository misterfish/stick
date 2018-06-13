defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import {
    pipe, composeRight, compose,
    dot, prop,
} from '../../index'

export const next = dot ('next')
export const done = prop ('done')
export const value = prop ('value')


