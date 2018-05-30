defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import {
  pipe, compose, composeRight,
  dot1, timesV, join, condS, guard, guardV, gt, otherwise,
} from '../../index'

export const cata = dot1 ('cata')

export const repeatChar = n => timesV (n) >> join ('')
export const pad = n => str => (n - str.length) | condS ([
  0 | gt    | guard (pad => [str, ' ' | repeatChar (pad)] | join ('')),
  otherwise | guardV (str),
])


