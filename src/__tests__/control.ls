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
    try-catch, try-catch__,
    exception, raise, die, decorate-exception,
} = require '../index'

describe 'try/catch__' ->
    fails = -> throw new Error
    passes = -> 99

    how-to-fail = jest.fn()
        ..mock-return-value 'failed'

    test 'should fail' ->
        try-catch__ fails, how-to-fail
        |> expect-to-equal 'failed'
    test 'should succeed' ->
        try-catch__ passes, how-to-fail
        |> expect-to-equal 99

describe 'try/catch' ->
    fails = -> throw new Error
    passes = -> 99

    how-to-pass = jest.fn()
        ..mock-implementation (x) -> [x, x, x]
    how-to-fail = jest.fn()
        ..mock-return-value 'failed'

    test 'should fail' ->
        fails
        |> try-catch how-to-pass, how-to-fail
        |> expect-to-equal 'failed'
    test 'should succeed, and pass params' ->
        passes
        |> try-catch how-to-pass, how-to-fail
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

