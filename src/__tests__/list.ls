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
    test, xtest,
    expect-to-equal, expect-to-be,
} = require './common'

{
    array, compact, compact-ok,
    list, last,
} = require '../index'

describe 'list' ->
    test 1 ->
        list 3 4 5
        |> expect-to-equal [3 to 5]
    test 'empty' ->
        list()
        |> expect-to-equal []

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

describe 'last' ->
    x = [1 to 10]
    y = []
    test 1 -> x |> last |> expect-to-equal 10
    test 'undef on empty' -> y |> last |> expect-to-equal void
