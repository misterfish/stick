#!/usr/bin/env node

defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import fishLib, {
    log, info, warn, error, green, yellow, magenta, brightRed, cyan, brightBlue,
    sprintf, forceColors, getopt, shellQuote,
    red, blue,
} from 'fish-lib'

import {
  pipe, compose, composeRight,
  condS, guard, map, sprintfN, sprintf1, join, tap,
  otherwise,
} from '../../index'

import { ArithmeticSequence, GeometricSequence, IrregularSequence, ErrorSequence, } from './types'
import { isArithmetic, isGeometric, isError, } from './sequence'
import { cata, repeatChar, pad, } from './util'

const checkSequence = condS ([
  isArithmetic | guard ((_, n)      => n | ArithmeticSequence),
  isGeometric  | guard ((_, c)      => c | GeometricSequence),
  isError      | guard ((_, reason) => reason | ErrorSequence),
  otherwise    | guard (()          => IrregularSequence),
])

const format = cata ({
  ArithmeticSequence: n      => ['arithmetic', n] | map (yellow) | sprintfN ('%s: y = %sx'),
  GeometricSequence:  c      => ['geometric', c]  | map (green) | sprintfN ('%s: y = %s ** x'),
  ErrorSequence:      reason => reason | red | sprintf1 ('error: %s'),
  IrregularSequence:  _      => 'irregular sequence' | brightRed,
})

const report = xs => resolved =>
  [xs | join (', ') | pad (13), resolved]
  | sprintfN ('%s → %s')

const doit = xs => xs
  | checkSequence
  | format
  | report (xs)

const go = _ =>
  [
    [0, 4, 8, 12],   // --- arithmetic
    [1, 3, 9, 27],  // --- geometric
    [0, 1, 2, 5],   // --- irregular
    [null, 1, 2, 5] // --- error
  ]
  | map (doit)
  | tap (map (log))

go ()
