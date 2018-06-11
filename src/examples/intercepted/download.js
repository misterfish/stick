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

import { Left, Right, } from './util-bilby'

import {
    dag,
} from './util-daggy'

import {
    fromJS,
    update, updateIn,
    get, getIn,
    push as iPush,
} from './util-immutable'

import {
    length, mapX, padTo, either,
} from './util'

import {
    goUp,
} from './util-io'

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

const mockDownloads = _ => [
    { tag: 'episode-27', source: 'http://traffic.megaphone.fm/PPY6458293736.mp3', filename: 'Intercepted - Season 3 - Episode 27 - the-super-bowl-of-racism.mp3', },
    { tag: 'episode-28', source: 'http://traffic.megaphone.fm/PPY8078356160.mp3', filename: 'Intercepted - Season 3 - Episode 28 - merican-psycho.mp3', },
    { tag: 'episode-29', source: 'http://traffic.megaphone.fm/PPY7212168126.mp3', filename: 'Intercepted - Season 3 - Episode 29 - for-whom-the-trump-trolls.mp3', },
]

const toString = dot ('toString')

// mockDownloads () | startDownloads
