#!/usr/bin/env node

defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import fs from 'fs'

import tmp from 'tmp-promise'

import ramda, {
    isEmpty, fromPairs, zip, curry,
} from 'ramda'

import fishLib, {
    log, info, warn, error, green, yellow, magenta, brightRed, cyan, brightBlue,
    sprintf, forceColors, getopt, shellQuote,
    sysSpawn,
} from 'fish-lib'

import {
    pipe, compose, composeRight,
    not, ok, ifOk, ifPredicate, whenOk, whenPredicate,
    ifYes, ifNo,
    xMatch,
    id, tap, recurry, roll,
    map, filter, reject, reduce, flip, flip3,
    join, split, last, head, tail,
    dot, dot1, dot2, side, side1, side2,
    cond, condS, guard, guardV, otherwise,
    sprintf1, sprintfN, rangeBy,
    noop, blush, always, T, F,
    prop, path, has, hasIn,
    bindPropTo, bindProp, bindTo, bind,
    assoc, assocPath, assocM, assocPathM,
    concatTo, concat, appendTo, append,
    concatToM, concatM, appendToM, appendM,
    invoke,
    merge, mergeTo, mergeM, mergeToM,
    mergeIn, mergeInTo, mergeInM, mergeInToM,
    updateM, update, updatePathM, updatePath,
    lets, letS, compactOk, compact,
    arg0, arg2, arg1,
    list,
    dot3,
    die, raise, decorateException, exception,
    lt, gt, eq, ne, lte, gte,
    factory, factoryProps,
    againstBoth, againstAny,
    timesV,
    multiply,
    defaultTo,
    repeatV,
    rangeTo,
} from '../../../index'

import busboyMod from 'busboy'
import bodyParser from 'body-parser'
import corsMod from 'cors'

import express from 'express'
//import throttle from 'express-throttle'
import serveStaticThrottle from 'serve-static-throttle'

import bilby, { left, right, } from 'bilby'

import spinner from './spinner/spinner'

import {
    resolveP, startP, errFull, allP,
} from '../../util/util'

const app = express ()

const config = {
    port: 3003,
    // --- example
    paths: lets (
        _ => __dirname,
        arg0 >> sprintf1 ('%s/../..'),
        arg1 >> sprintf1 ('%s/data'),
        arg2 >> sprintf1 ('%s/keys.db'),

        (bindir, rootdir, datadir, dbfile) => ({ bindir, rootdir, datadir, dbfile }),
    ),
    inflation: 1,
    throttle: { bps: 1e6 },
}

const then     = dot1 ('then')
const recover  = dot1 ('catch')
const get      = dot2 ('get')
const post     = dot2 ('post')
const post3    = dot3 ('post')
const del      = dot2 ('delete')
const put      = dot2 ('put')
const put3     = dot3 ('put')
const options  = dot2 ('options')
const patch    = dot2 ('patch')
const use      = dot1 ('use')
const use2     = dot2 ('use')
const all      = dot2 ('all')
const send     = dot1 ('send')
const status   = dot1 ('status')
const listen   = dot2 ('listen')
const sendJSON = dot1 ('json')
const set      = dot2 ('set')

const ifEmpty = isEmpty | ifPredicate

// --- json, needs JS.
const sendStatus = code => data => status (code) >> sendJSON (data)

// --- json, needs JSON.
const sendStatusRawJSON = code => data =>
    status (code) >> set ('Content-Type', 'application/json') >> send (data)

const msg = appendTo (['msg']) >> list >> fromPairs

const errorFull = errFull >> error

// --- put = idempotent, will update on duplicate code, will fail on duplicate name.
// --- error thrown inside handler, e.g., on final step of catch, is caught by express, possibly
// with unhandled rejection warning from node.

// --- example
// const checkPostParamsStore = (keys) => {
//     if (!isArray (keys)) return false
//     for (const key of keys) {
//         if (!isObject (key)) return false
//         const { code, name, missing, active } = key
//         if (!allOk (code, name, missing, active)) return false
//     }
//     return true
// }

// --- not currently used.
const corsOptions = {
    origin: (origin, done) => origin | cond ([
        / ^ http s? :\/\/ localhost / | xMatch | guard (_ => done (null, true)),
        otherwise | guard (_ => new Error ('you have disappointed cors'))
    ]),
}

// --- an error thrown inside the handler won't crash the server.
// still a catch is nice at the end, so the server can log, and so the client gets a JSON msg
// instead of a stack trace.
// the final step of the catch can throw an error, in which case we just let it bubble.

const on = side2 ('on')
const lines = split ('\n')
const fold = dot2 ('fold')

const go_up = _ => '[A'

const spin = invoke (() => {
    const spin = spinner ('wheel')
    let first = true
    const goup = go_up ()
    const pref = goup + goup
    const put = concat ('\n\n') >> ('write' | bindPropTo (process.stdout))
    return ({
        first: _ => put (''),
        spin: _ => put (pref + spin ()),
    })
})

const logWith = (header) => (...args) => log (... [header, ...args])

// --- 400 & 422 are both ok for validation errors, e.g., syntax is ok and server understood
// it but violates domain rules.
// --- 422 is technically for WebDAV but ok.
// --- 409 = conflict, e.g., edit conflict or resource conflict.
// --- 2xx is definitely not good if there's any kind of an error, even though you could argue that the request was ok.
//
// --- we use 422 for user-facing errors (e.g. problems with csv) and 400 for non-user-facing, e.g.
// bad params sent by FE.

const startServer = tmp => app
    | tap (_ => console.log ('tmp', tmp))
    | use (bodyParser.json())
    | use2 ('/static', serveStaticThrottle (tmp, { throttle: config.throttle }))
    | all ('*', (req, res, next) => {
        spin.spin ()
        next ()
    })
    | get ('/ping', (req, res) => startP ()
        | then (res | ping)
        | recover ((err) => {
          ; err | errFull
          | sprintf1 ("Couldn't ping: %s")
          | warn

          res | sendStatus (500) ('Server error' | msg)
        })
    )

//     | get ('/file/:slug', (req, res) => req | letS ([
//         (req) => req | prop ('params'),
//         (req, params) => params | prop ('slug'),
//         arg2 >> resolveP
//              >> then (slug => res | serveFile (slug))
//              >> recover ((err) => {
//                ; err | errFull
//                | sprintf1 ("Couldn't ping: %s")
//                | warn
//
//                res | sendStatus (500) ('Server error' | msg)
//              })
//     ]))

    | listen (config.port) (() => {
        config.port | green
                    | sprintf1 ('Listening on port %s')
                    | tap (info)

        spin.first ()
    })

// const cors = corsOptions | corsMod
//     | options ('/api/analyse-events-keys', cors)
//     | post3 ('/analyse-events-keys', cors, ((req, res) => {

const ping = sendStatus (200) ({ msg: 'ping', })

const sizes = n => ({
    'episode-10': 1000000 * n,
    'episode-11': 1000100 * n,
    'episode-12': 1000200 * n,
    'episode-13': 1000300 * n,
    'episode-14': 1000400 * n,
    'episode-15': 2000500 * n,
    'episode-16': 2000000 * n,
    'episode-17': 2000800 * n,
    'episode-18': 2000100 * n,
    'episode-19': 2000000 * n,
})

// --- promise.
const tmpDir = dot1 ('dir')
const initTmp = _ => tmp | tmpDir ({ unsafeCleanup: true, })
                         | then ('path' | prop)

const initFiles = tmp => 10 | rangeTo (20)
                            | map (String >> concatTo ('episode-') >> makeFile (tmp))
                            | allP
                            | then (tmp | always)

const getSize = slug => sizes (config.inflation) [slug]

const makeFile = tmp => slug => new Promise ((resolve, reject) => tap (logWith ('WUT')) >> lets (
    _ => getSize (slug) | defaultTo (_ => reject ("Can't get size for " + slug)),
    _ => [tmp, slug] | sprintfN ('%s/%s.mp3'),
    (size) => size | repeatV ('1') | join (''),
    (_, filename, data) => fs.writeFileSync (filename, data),
    resolve,
))

// const { floor, random, } = Math
// const getRandomSize = size => size | multiply (random ()) | floor | tap (logWith ('RAND'))
// const serveFile = slug => res => slug | resolveP
//     | then (makeFile)
//     | then (_ => getFile (slug) (res))
// const getFile = slug => res => lets (
//     _ => getSize (slug) | defaultTo (_ => getRandomSize (10e6)),
//     (size) => startRandomServe (size),
//     arg1 >> then (contents => res | sendStatus (200) ({ contents, }))
// )
// const OLDstartRandomServe = size => new Promise ((resolve, reject) =>
//     sysSpawn (
//         'dd',
//         ['if=/dev/urandom', 'iflag=fullblock', size | sprintf1 ('count=%s'), 'bs=1'],
//         { sync: false, die: false, verbose: true, },
//         ({ ok, out, err, }) => {
//             console.log ('returned!')
//             if (!ok) return err | reject
//             return out | resolve
//         },
//     )
// )
//
// const toString = dot ('toString')
// const startRandomServe = size => new Promise ((resolve, reject) => {
//     const buf = ''
//     const str = fs.createReadStream ('/dev/urandom', { start: 0, end: size, })
//     console.log ('created stream with size', size)
//     if (!str) return reject ("couldn't open stream")
//     str | on ('data') (toString >> concatTo (buf))
//         | on ('error') (xxx => reject ("error reading stream" + xxx))
//         | on ('end') (_ => buf | resolve)
// })

// --- allows async inits before server starts.
startP ()
| then (initTmp)
| then (initFiles)
| then (startServer)
| recover (decorateException ("Couldn't start server: ") >> errorFull)

