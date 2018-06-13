defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import ramda, {
    curry,
} from 'ramda'

import {
    pipe, composeRight, compose,
    multiply, always,
    ifOk, dot1, sprintf1,
    concatTo,
} from '../../index'

import daggy from 'daggy'

import {
    padTo,
} from '../util/util'

import {
    blue, yellow, green, brightRed, red,
} from '../util/util-io'

import {
    cata,
} from '../util/util-bilby'

export const Download = daggy.tagged ('Download', [
    'tag', 'source', 'filename', 'status',
])

export const DownloadStatus = daggy.taggedSum ('DownloadStatus', {
    DownloadInProgress: ['completed'],
    DownloadPending: [],
    DownloadCompleted: [],
    DownloadError: ['err'],
    DownloadAlreadyDone: [],
})

// export const show = dot ('show')

if (false) DownloadStatus.prototype.show = function () {
    return this | cata ({
        DownloadInProgress: () => this.completed | ifOk (
            multiply (100) >> sprintf1 ('%.1f %%') >> brightRed
            >> sprintf1 ('in progress: %s'),
            'in progress: (unknown)' | always,
        ),
        DownloadPending: () => '🕑' | yellow,
        DownloadCompleted: () => '✔' | green,
        DownloadError: (err) => err | ifOk (
            'error: ' | concatTo,
            'error' | always,
        ) | red,
        DownloadAlreadyDone: () => '✔' | blue | sprintf1 ('%s (already downloaded)'),
    })
    | padTo (50)
}

const deconstruct = curry ((f, x) => f (x, x))

export const show = deconstruct ((downloadStatus, { completed, }) =>
    downloadStatus | cata ({
        DownloadInProgress: () => completed | ifOk (
            multiply (100) >> sprintf1 ('in progress: %.1f %%'),
            'in progress: (unknown)' | always,
        ) | brightRed,
        DownloadPending: () => '🕑' | yellow,
        DownloadCompleted: () => '✔' | green,
        DownloadError: (err) => err | ifOk (
            'error: ' | concatTo,
            'error' | always,
        ) | red,
        DownloadAlreadyDone: () => '✔' | blue | sprintf1 ('%s (already downloaded)'),
    })
    | padTo (50)
)

Download.prototype.updateStatus = function (updater) {
    const { tag, source, filename, status, } = this
    return Download (tag, source, filename, status | updater)
}

const { DownloadInProgress, DownloadPending, DownloadCompleted, DownloadError, DownloadAlreadyDone, } = DownloadStatus

export { DownloadInProgress, DownloadPending, DownloadCompleted, DownloadError, DownloadAlreadyDone, }

export const updateStatus = dot1 ('updateStatus')

