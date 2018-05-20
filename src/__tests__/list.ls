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
    array, compact, compact-ok, join-ok,
} = require '../index'

describe 'array' ->
    test 1 ->
        [3 4 5]
        |> expect-to-equal [3 to 5]

describe 'compact*' ->
    mixed = [1 '' 0 '0' void false true 2]
    falsey = [false void null '' 0 NaN]
    truthy = [true '0' [] {} -1 Infinity]
    describe 'compact' ->
        test 1 ->
            mixed
            |> compact
            |> expect-to-equal [
                1 '0' true 2
            ]
        test 'all falsey' ->
            falsey
            |> compact
            |> expect-to-equal [
            ]
        test 'all truthy' ->
            truthy
            |> compact
            |> expect-to-equal truthy
    describe 'compactOk' ->
        test 1 ->
            mixed
            |> compact-ok
            |> expect-to-equal [
                1 '' 0 '0' false true 2
            ]
        test 'all falsey' ->
            falsey
            |> compact-ok
            |> expect-to-equal [
                false '' 0 NaN
            ]
        test 'all truthy' ->
            truthy
            |> compact-ok
            |> expect-to-equal truthy

describe 'joinOk' ->
    test 1 ->
        [1 2 false null 3 true void 5]
        |> join-ok ' '
        |> expect-to-equal '1 2 false 3 true 5'
