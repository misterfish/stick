defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import {
    pipe, composeRight, compose,
    dot,
} from '../../index'

export const dag = type => x => type.is (x)
export const toJS = dot ('toJS')
