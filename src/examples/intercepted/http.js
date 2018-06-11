defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import url from 'url'
import fs from 'fs'

import ramda, {
    none,
} from 'ramda'

import {
    pipe, compose, composeRight,
    not, prop, tap, id, always, add,
    ok, ifOk, whenOk,
    dot, dot1, side,
    condS, guard, otherwise,
    sprintf1, noop, lets,
    eq, die, exception, arg1,
    divideBy, guardV,
    notOk,
} from '../../index'

import { http, https } from 'follow-redirects'

import {
    tryCatchS, on,
} from './util'

import {
    appendToFile,
} from './util-io'

import {
    Just, Nothing,
    flatMap,
} from './util-bilby'

import {
    dag,
} from './util-daggy'

export const end = side ('end')

const request = protocol => (...args) => protocol | condS ([
    'http:' | eq | guard (_ => http.request (...args)),
    'https:' | eq | guard (_ => https.request (...args)),
    otherwise | guard (sprintf1 ('protocol not supported (%s)') >> die)
])

// --- throws
// const ifFileExists = ifPredicate (fs.existsSync)

const fileLengthMaybe = tryCatchS (
    Just,
    Nothing | always,
    fs.statSync >> prop ('size'),
)

const _downloader = bytesDownloadedInitial => ({ res, contentLength, writeToDisk, onData, onEnd, onError, }) => {
    // --- legacy: in an earlier version, not having contentLength was ok; now that we support
    // resuming downloads it will be rejected before getting here.
    const completed = contentLength | ifOk (
        // --- contentLength -> bytesDownloadedInitial -> percentage
        add (bytesDownloadedInitial) >> divideBy,
        null | always | always,
    )
    let bytesDownloaded = bytesDownloadedInitial
    return res
        | on ('data') (chunk => {
            bytesDownloaded += chunk.length
            chunk
            | tap (writeToDisk)
            | tap (str => ({ str, completed: bytesDownloaded | completed, }) | onData)
        })
        | on ('end') (onEnd)
        | on ('error') (onError)
}

// --- to keep it simple we assume the server honors the partial download request.
export const download = ({ source, filename, onAlreadyDone = noop, onEnd = noop, onData = noop, onError = noop, }) => {
    const { protocol, hostname, port, path, } = url.parse (source)
    const writeToDisk = appendToFile (filename)
    const bytesDownloadedInitial = filename | fileLengthMaybe | condS ([
        'isNone' | prop | guardV (0),
        otherwise | guard (flatMap (id)),
    ])
    const downloader = bytesDownloadedInitial | _downloader
    const cb = (res) => lets (
        _ => res,
        prop ('headers'),
        prop ('statusCode'),
        arg1 >> prop ('content-length') >> whenOk (Number),
        id,
        (res, headers, statusCode, contentLength) => null | condS ([
            (_ => contentLength | notOk) | guard (_ => 'no content length' | exception | onError),
            // --- on a partial download, contentLength is just the part left.
            (_ => contentLength === 0 && bytesDownloadedInitial !== 0) | guard (onAlreadyDone),
            (_ => none (statusCode | eq) ([200, 206])) | guard (_ => (('status ' + statusCode) | exception | onError)),
            otherwise | guard (_ => downloader ({ res, contentLength, writeToDisk, onData, onEnd, onError, })),
        ])
    )

    const headers = {
        Range: bytesDownloadedInitial | add (0) | sprintf1 ('bytes=%d-'),
    }
    request (protocol) ({ hostname, port, path, headers, method: 'GET' }, cb)
    | on ('error') (onError)
    | end
}


