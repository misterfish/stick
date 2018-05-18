{
    assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, prop: rProp, path: rPath, defaultTo: rDefaultTo, curry, forEach: each, complement, isNil,
    repeat: rRepeat,
    times: r-times,
    reverse,
    tap,
    flip,
    zip,
} = require 'ramda'

{
    list,
    test, xtest,
    expect-to-equal, expect-to-be,
} = require './common'

{
    try-catch,
    # --- @deprecated
    try-catch__,
    exception, raise, die, decorate-exception,
} = require '../index'

describe 'try/catch__' ->
    fails = -> throw new Error
    passes = -> 99

    how-to-fail = jest.fn()
        ..mock-return-value 'failed'

    # --- @deprecated
    xtest 'should fail' ->
        try-catch__ fails, how-to-fail
        |> expect-to-equal 'failed'
    xtest 'should succeed' ->
        try-catch__ passes, how-to-fail
        |> expect-to-equal 99

describe 'try/catch' ->
    fails = -> throw new TypeError ('a thing is not a thang')
    passes = -> 99

    how-to-pass = jest.fn()
        ..mock-implementation (x) -> [x, x, x]
    how-to-fail = jest.fn()
        ..mock-implementation (e) -> 'failed: ' + e.message
    try-it = try-catch do
        how-to-pass
        how-to-fail

    test 'should fail' ->
        fails
        |> try-it
        |> expect-to-equal 'failed: a thing is not a thang'
    test 'should succeed, and pass params' ->
        passes
        |> try-it
        |> expect-to-equal [99 99 99]

describe 'exceptions' ->
    test 'exception' ->
        exception 'a' 'b' 'c'
        |> expect-to-equal new Error ('a b c')
    test 'raise' ->
        (expect -> new Error 'bad news' |> raise).to-throw 'bad news'
    test 'die' ->
        (expect -> die 'really' 'bad' 'news').to-throw 'really bad news'
    test 'decorate exception' ->
        new Error 'file not found'
        |> decorate-exception 'bad news:'
        |> expect-to-equal new Error 'bad news: file not found'
    test 'all' ->
        (expect ->
            'file not found'
            |> exception
            |> decorate-exception 'bad news:'
            |> raise
        ).to-throw 'bad news: file not found'

