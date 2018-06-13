defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import {
    pipe, compose, composeRight,
    map, tap,
    always, whenOk,
    dot, dot1,
    condS, guard, otherwise,
    sprintf1, sprintfN,
    bindPropTo,
    lt, notOk, guardV, timesF,
    reduce,
    assoc,
} from '../../index'

import {
    updateStatus,
    Download,
    DownloadInProgress, DownloadPending,
    DownloadCompleted, DownloadError,
    DownloadAlreadyDone,
    show,
} from './types'

import {
    download,
} from './http'

import { Left, Right, fold, } from '../util/util-bilby'

import {
    dag,
} from '../util/util-daggy'

import {
    fromJS,
    update, updateIn,
    get, getIn,
    push as iPush,
} from '../util/util-immutable'

import {
    then, length, mapX, padTo, either,
} from '../util/util'

import {
    goUp, red, green,
} from '../util/util-io'

// xxx
const countNewLines = 0 | always

const reporter = {
    lastNumLines: undefined,
    write: 'write' | bindPropTo (process.stdout),
    reset () {
        this.lastNumLines | whenOk (
            n => goUp | timesF (n) | map (tap ('write' | bindPropTo (this)))
        )
        this.lastNumLines = 0
    },
    log (...args) {
        console.log (...args)
        this.lastNumLines += 1 + (args | countNewLines)
    }
}

const write = 'write' | bindPropTo (reporter)
const log = 'log' | bindPropTo (reporter)

const render = state => {
    reporter.reset ()
    state | map (({ tag, source, filename, status, }) =>
        [tag | padTo (40), status | show] | sprintfN ('%s %s')
    )
    | map (tap (log))
    reporter.lastNumLines = state.size
}

const initialState = [] | fromJS

let state = initialState
const fireAction = (reducer) => {
    state = state | reducer | tap (render)
}

const actionAddDownload = ({ tag, source, filename, }) => fireAction (
    iPush (Download (tag, source, filename, DownloadPending)),
)

const actionUpdateProgress = (which, completed) => fireAction (
    updateIn ([which], updateStatus (_ => completed | condS ([
        either (notOk, 1 | lt) | guardV (DownloadInProgress (completed)),
        otherwise | guardV (DownloadCompleted),
    ]))),
)

const actionSetAlreadyDone = (which) => fireAction (
    updateIn ([which], updateStatus (_ => DownloadAlreadyDone)),
)

const actionDownloadError = (which, err) => fireAction (
    updateIn ([which], updateStatus (_ => DownloadError (err))),
)

const allP = (...args) => Promise.all (...args)

export const startDownloads = (downloads) => {
    downloads | map (({ tag, source, filename, }) =>
        actionAddDownload ({ tag, source, filename, })
    )

    return state
        | mapX (({ tag, source, filename }, idx) =>
            new Promise ((resolve, reject) => download ({
                source, filename,
                onAlreadyDone: _ => {
                    actionSetAlreadyDone (idx)
                    return tag
                    | sprintf1 ('%s → ok')
                    | Right | resolve
                },
                onData: ({ completed, }) => {
                    actionUpdateProgress (idx, completed)
                },
                onError: (err) => {
                    actionDownloadError (idx, err.message)
                    ; [tag, err.message]
                    | sprintfN ('%s → error: %s')
                    | Left | resolve
                },
                onEnd: _ => tag
                    | sprintf1 ('%s → ok')
                    | Right
                    | resolve
            }))
        )
        | allP
}

export const report = _ => reduce ((acc, resultE) => {
    return resultE | fold (
        _ => acc | assoc ('numError') (acc.numError + 1),
        _ => acc | assoc ('numOk') (acc.numOk + 1),
    )}) ({ numError: 0, numOk: 0, })
    >> (({ numError, numOk, }) => [numOk | String | green, numError | String | red])
    >> sprintfN ('%s ok / %s error')
    >> tap (log)


const mockDownloads = _ => [
    { tag: 'episode-10', source: 'http://localhost:3003/static/episode-10.mp3', filename: 'Episode 10.mp3', },
    { tag: 'episode-11', source: 'http://localhost:3003/static/episode-11.mp3', filename: 'Episode 11.mp3', },
    { tag: 'episode-12', source: 'http://localhost:3003/static/episode-12.mp3', filename: 'Episode 12.mp3', },
    { tag: 'episode-13', source: 'http://localhost:3003/static/episode-13.mp3', filename: 'Episode 13.mp3', },
    { tag: 'episode-14', source: 'http://localhost:3003/static/episode-14.mp3', filename: 'Episode 14.mp3', },
    { tag: 'episode-15', source: 'http://localhost:3003/static/episode-15.mp3', filename: 'Episode 15.mp3', },
    { tag: 'episode-16', source: 'http://localhost:3003/static/episode-16.mp3', filename: 'Episode 16.mp3', },
    { tag: 'episode-17', source: 'http://localhost:3003/static/episode-17.mp3', filename: 'Episode 17.mp3', },
    { tag: 'episode-18', source: 'http://localhost:3003/static/episode-18.mp3', filename: 'Episode 18.mp3', },
    { tag: 'episode-19', source: 'http://localhost:3003/static/episode-19.mp3', filename: 'Episode 19.mp3', },
    { tag: 'episode-404', source: 'http://localhost:3003/static/404', filename: 'Episode 404.mp3', },
]

// mockDownloads () | startDownloads | then (report ())
