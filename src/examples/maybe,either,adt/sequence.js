defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import {
  pipe, compose, composeRight,
  minus, divideBy, lets, reduceAbort, contains,
} from '../../index'

const testReduce = f => n => (acc, x) => f (acc, x) === n ? x : null
const testReduceArithmetic = minus    | testReduce
const testReduceGeometric  = divideBy | testReduce

const testSequence = g => f => ([a, b, ...rest]) => lets (
  _ => b | g (a),
  n => rest | reduceAbort (n | f) (b) (null),
  (n, reduced) => reduced === null ? false : n,
)

const containsNull = null | contains

export const isArithmetic = testReduceArithmetic | testSequence (minus)
export const isGeometric  = testReduceGeometric  | testSequence (divideBy)
export const isError      = x => containsNull (x) ? 'contains null' : false
