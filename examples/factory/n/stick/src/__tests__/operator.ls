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
    bitwise-and, bitwise-or, bitwise-xor, bitwise-not,
    bitwise-left, bitwise-right, bitwise-right-zero-fill,
} = require '../index'

describe 'bitwise' ->
    describe 'bitwiseAnd' ->
        test 1 ->
            bitwise-and 7 3
            |> expect-to-equal 3
        test 'curried' ->
            3
            |> bitwise-and 7
            |> expect-to-equal 3
    describe 'bitwiseOr' ->
        test 1 ->
            bitwise-or 7 3
            |> expect-to-equal 7
        test 'curried' ->
            3
            |> bitwise-or 7
            |> expect-to-equal 7
    describe 'bitwiseXor' ->
        test 1 ->
            bitwise-xor 7 3
            |> expect-to-equal 4
        test 2 ->
            bitwise-xor 7 1
            |> expect-to-equal 6
        test 'curried' ->
            3
            |> bitwise-xor 7
            |> expect-to-equal 4
    describe 'bitwiseNot' ->
        niet = (x) -> -(x + 1)
        test 1 ->
            bitwise-not 7
            |> expect-to-equal niet 7
        test 2 ->
            bitwise-not 4
            |> expect-to-equal niet 4
    describe 'bitwiseLeft' ->
        test 1 ->
            bitwise-left 7 1
            |> expect-to-equal 14
        test 2 ->
            bitwise-left 5 2
            |> expect-to-equal 20
        test 'curried' ->
            1
            |> bitwise-left 7
            |> expect-to-equal 14
    describe 'bitwiseRight' ->
        test 1 ->
            bitwise-right 14 1
            |> expect-to-equal 7
        test 2 ->
            bitwise-right 20 2
            |> expect-to-equal 5
        test 3 ->
            bitwise-right -7 1
            |> expect-to-equal -4
        test 'curried' ->
            1
            |> bitwise-right 14
            |> expect-to-equal 7
    describe 'bitwiseRightZeroFill' ->
        test 1 ->
            bitwise-right-zero-fill 14 1
            |> expect-to-equal 7
        test 2 ->
            bitwise-right-zero-fill 20 2
            |> expect-to-equal 5
        test 3 ->
            bitwise-right-zero-fill -7 1
            |> expect-to-equal 2147483644
        test 'curried' ->
            1
            |> bitwise-right-zero-fill 14
            |> expect-to-equal 7
    describe 'combine' ->
        test 1 ->
            i = 12345
            -1 |> bitwise-xor i
            |> expect-to-equal bitwise-not i
