defineBinaryOperator ('|', (a, b) => b (a))
defineBinaryOperator ('>>', (a, b) => (...args) => b (a (...args)))

import {
    isEmpty, tap, has, hasIn, flip, fromPairs, toPairs, assoc, assocPath, head,
    tail, reduceRight, chain, identity, reduce, map, filter, reject, join,
    split, prop as rProp, path as rPath, defaultTo as rDefaultTo, curry,
    forEach as each, forEachObjIndexed as eachObj, complement, times as rTimes,
    range as rRange, isNil, addIndex, take, equals, mapAccum,
    repeat as rRepeat,
    append as rAppend,
    concat as rConcat,
    zip,
} from 'ramda'

import { assocMut, ifLengthOne, } from './index'

// --- doe requires more than 1, because without it, don't need doe.
//     fix, allow only 1 XXX
export const doe = (...mainArgs) => {
    // --- retrieve the monadic value: chain gets dispatched to the monad's chain/bind function.
    const retrieve = chain (identity)

    const fs = mainArgs | ifLengthOne (
        it => it [0],
        it => it,
    )

    const _doe = (fs, argsAcc) => fs.length === 1
        ? (...args) => {
            return head (fs).apply (null, [...argsAcc, ...args])
        }
        : (...args) => {
            const chainVal = head (fs).apply (null, [...argsAcc, ...args])
            const newArgsAcc = [...argsAcc, chainVal | retrieve]
            return chain (_doe (tail (fs), newArgsAcc)) (
                chainVal
            )
        }

    const firstReturn = head (fs) ()
    // --- if tail is empty, return firstReturn. xx
    return chain (_doe (tail (fs), [firstReturn | retrieve]) ) (firstReturn)
}
