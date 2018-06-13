#!/usr/bin/env node

const logWith = (header) => (...args) => log (... [header, ...args])

defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import ramda, { drop, take, }  from 'ramda'

import { lazyList, lazyTake, lazyFind, lazyListOk, } from 'lazyfish'

import {
    pipe, composeRight, compose,
    always, path, assoc,
    tap, reduce,
    prop,
    map, id,
    sprintfN, condS, otherwise,
    gte, ifOk, sprintf1,
    compactOk, guardV,
    letS, lets, xMatch, xReplace,
    dot,
    bindPropTo, asteriskN,
    split,
} from '../../index'

import { startDownloads, } from '../download/download'

import {
    lazyFindPred,
    then, recover,
    minus,
    findPredMaybeGen,
    tryCatchS,
    length,
    mapX,
    substring, ellipsisAfter,
    on,
    pathDot,
    uniqueWith,
} from '../util/util'

import {
    ifLongerThan, ifSingletonLeft,
    ifNegativeOne, ifAllOk,
} from '../util/util-pred'

import {
    Left, Right,
    Just, Nothing,
    fold, flatMap,
    toEither,
    sequenceM,
    foldRight,
} from '../util/util-bilby'

import {
    sys,
    warn, error, log, write,
    green, red, brightRed,
    startSpinner, stopSpinner,
    showCursor, hideCursor,
} from '../util/util-io'

import {
    next, done, value,
} from '../util/util-gen'

import config from './config'

const getPage = url => sys ('curl', ['-s', url])

const doDownloads = mapX ((x, idx) => x | fold (
    l => l | tap (warn ("Invalid: " + l)) | always (null),
    ([source, filename, tag]) => ({ source, filename, tag, }),
))
    >> compactOk
    >> startDownloads

const report = _ => reduce ((acc, resultE) => {
    return resultE | fold (
    _ => acc | assoc ('numError') (acc.numError + 1),
    _ => acc | assoc ('numOk') (acc.numOk + 1),
)}) ({ numError: 0, numOk: 0, })
    >> (({ numError, numOk, }) => [numOk | String | green, numError | String | red])
    >> sprintfN ('%s ok / %s error')
    >> tap (log)

const exit = 'exit' | bindPropTo (process)

process | on ('SIGINT') (showCursor >> tap (_ => 0 | exit))

// --- see below for format of JSON

// --- endIdx = not inclusive
const findStoreJSON = (str, endIdx) => [[0, '']]
    | lazyListOk (([idx, v]) => idx | condS ([
        endIdx | gte | guardV (null),
        otherwise | guardV (
            [idx + 1, str | take (idx + 1)]
        ),
    ]))
    | lazyFindPred (tryCatchS (
        id,
        null | always,
        ([i, str]) => str | JSON.parse,
    ))
    | ifOk (
        Right,
        "couldn't snip JSON" | Left | always,
    )

const PAT = / window.initialStoreTree \s+ = \s+ /

const processPage = str => str
    | xMatch (config.pattern)
    | toEither ([config.pattern.source, str] | sprintfN ("can't find %s in %s"))
    | flatMap (m => lets (
        _ => m | prop ('index'),
        _ => m | prop (0) | length,
        (patLoc, patLen) => findStoreJSON (
            str | drop (patLoc + patLen),
            str | length | minus (patLoc + patLen),
        ),
    ))
    | flatMap (processPodcasts)

const processPodcasts = podcasts => podcasts
    | pathDot ('resources.platform.Podcast.intercepted.episodes.edges')
    | map (prop ('node'))
    | map ((node) => [node, node.embedId])
    | uniqueWith (prop (1))
    | map (([node, embedId]) => lets (
        _ => node | pathDot ('displayName.text'),
        (title) => ({
            source: makeURL (embedId),
            filename: makeFilename (title),
            tag: makeTag (title),
        }),
    ))
    | map (({ source, filename, tag, }) =>
        [source, filename, tag] | sequenceM (Right)
    )
    | ifSingletonLeft (
        prop (0),
        // --- results in Right (Right (...))
        Right,
    )

const titleToTag = dot ('toLowerCase')
const titleToFilename = titleToTag

const makeTag = toEither ('no title') >> flatMap (titleToTag >> ellipsisAfter (30) >> Right)
const makeURL = toEither ('no resourceID') >> flatMap (
    sprintf1 ('http://traffic.megaphone.fm/%s.mp3') >> Right
)

const makeFilename = (title) => title | ifOk (
    titleToFilename >> sprintf1 ('intercepted - %s.mp3') >> Right,
    "Can't make filename" | Left | always,
)

const go = url => url
    | getPage
    | tap (hideCursor)
    | tap (_ => startSpinner ('getting metadata'))
    | then (tap (stopSpinner))

    // --- not possible to kill this step with ctl-c unfortunately xxx
    | then (tap (_ => log ('\nparsing ... (this might take a while)')))

    | then (
        processPage
        >> foldRight ("Couldn't process page")
        >> doDownloads
    )
    | then (report ())
    | recover (prop ('stack') >> warn)
    | then (showCursor)

config.url | go
