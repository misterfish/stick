defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import fs from 'fs'

import ramda, {
    curry,
} from 'ramda'

import {
    pipe, composeRight, compose,
    always, join, tap,
    dot2, ifFalse, sprintfN,
    concatTo, concat,
    compactOk, compact,
    lets,
    exception, raise, bindPropTo,
    timesV,
} from '../../index'

import fishLib, {
    log, warn, error,
    green, yellow, magenta, red, brightRed, cyan, brightBlue, blue,
    sysSpawn,
} from 'fish-lib'

fishLib.sysSet ({ sync: false, die: false, verbose: false, })

const on = dot2 ('on')

export const sys = (...args) => new Promise ((res, rej) => {
    let ret
    const sysArgs = args | concat ([
        ({ out, ok, err, }) => ok | ifFalse (
            _ => "cmd failed" | exception | raise,
            _ => ret = out,
        )
    ])
    sysSpawn (...sysArgs)
    | on ('close') ((code, signal) => code === 0
        ? ret | res
        : code | 'cmd error (code = %d)' | rej
    )
    | on ('error') (rej)
})

export const writeFile = curry ((path, contents) => fs.writeFileSync (path, contents))
export const write = 'write' | bindPropTo (process.stdout)

export const appendToFile = curry ((filename, contents) => fs.appendFileSync (filename, contents))

export {
    warn, error, log,
    green, yellow, magenta, red, brightRed, cyan, brightBlue, blue,
}

export const goUp = '[A' | always

const spinner = {
    job: void 8,
    charIdx: 0,
    chars: "◓◑◒◐",
    label: '',
    lastNumChars: 0,
    cycleChar () {
        this.charIdx = ++this.charIdx % this.chars.length
    },
    str () {
        return lets (
            _ => '' | timesV (this.lastNumChars) | join (''),
            _ => this.chars [this.charIdx],
            _ => this.label,
            (pref, char, label) => [char, label, char]
                | sprintfN ('%s %s %s')
                | tap (l => this.lastNumChars = l.length)
                | concatTo (pref)
        )
        | tap (_ => this.cycleChar ())
    },
    start (label) {
        this.label = label
        this.job = setInterval (
            _ => this.str () | write,
            100,
        )
    },
    stop () {
        clearInterval (this.job)
    },
}

export const startSpinner = 'start' | bindPropTo (spinner)
export const stopSpinner = 'stop' | bindPropTo (spinner)

export const showCursor = _ => '\u001b[?25h' | write
export const hideCursor = _ => '\u001b[?25l' | write

