#!/usr/bin/env node

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
        curryN,
} from 'ramda'

import fishLib, {
    log, info, warn, error, green, yellow, magenta, brightRed, cyan, brightBlue,
    sprintf, forceColors,
} from 'fish-lib'

import { laatStar, laat, array, prependFrom, applyScalar, sprintfN, xReplace, xReplaceStr, xReplaceStrFlags, pass1, whenBind, ifBind__, ifBind, } from './index'

'lots of pigs'
| xReplace (/ (o .) /) ('po')
| log // 'lpos of pigs'

'lots of pigs'
| xReplace (/ (o .) /g) ('po')
| log // 'lpos po pigs'

'lots of pigs'
| xReplaceStr (' (o .. p) ') ('stick')
| log // 'lots stickigs'

'lots of pigs'
| xReplaceStrFlags (' (o .) ') ('') ('po')
| log // 'lpos of pigs'

'lots of pigs'
| xReplaceStrFlags (' (o .) ') ('g') ('po')
| log // 'lpos po pigs'



const fromCelsius = cel => laat (
    [
        cel / 5 * 9 + 32,
        cel - 273,
    ],
    (fah, kel) => [cel, fah, kel]
        | applyScalar ([cyan, yellow, magenta])
        | sprintfN ('%s°C -> %s°F / %s°K')
)

// --- sucks a lot.
const fromCelsiusAlt = cel => laat (
    [
        cel / 5 * 9 + 32,
        cel - 273,
    ],
    array
        >> prependFrom (cel)
        >> applyScalar ([cyan, yellow, magenta])
        >> sprintfN ('%s°C -> %s°F / %s°K')
)

const fromFahrenheitMwah = fah => laat (
    [
        (fah - 32) / 9 * 5,
        (fah - 32) / 9 * 5 - 273,
    ],
    (cel, kel) => [fah, cel, kel]
        | applyScalar ([yellow, cyan, magenta])
        | sprintfN ('%s°F -> %s°C / %s°K')
)

const fromFahrenheit = fah => laatStar (
    [
        () => (fah - 32) / 9 * 5,
        cel => cel - 273,
    ],
    (cel, kel) => [fah, cel, kel]
        | applyScalar ([yellow, cyan, magenta])
        | sprintfN ('%s°F -> %s°C / %s°K')
)
30 | fromCelsius | log
86 | fromFahrenheit | log
