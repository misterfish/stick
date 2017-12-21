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
    zip-all,

    dot, dot1, dot2, dot3, dot-n,
    dot-mut, dot1-mut, dot2-mut, dot3-mut, dot-n-mut,
    tap-dot, tap-dot1, tap-dot2, tap-dot3, tap-dot-n,
    tap-mut,
    tap-dot-mut, tap-dot1-mut, tap-dot2-mut, tap-dot3-mut, tap-dot-n-mut,
} = require '../index'

describe 'dot*' ->
    obj =
        name: 'dog'
        bark: -> 'rough'
        speak: (word) -> "my #word is " + @name
        jump: (where, how-high) -> "jumping #how-high #where"
        garble: (...all) -> all |> join '!'

    describe 'aliases' ->
        normal = [dot, dot1, dot2, dot3, dot-n]
        mut = [dot-mut, dot1-mut, dot2-mut, dot3-mut, dot-n-mut]
        names = ['dot-mut', 'dot1-mut', 'dot2-mut', 'dot3-mut', 'dot-n-mut']

        zip-all normal, mut, names
        |> each ([alias-l, alias-r, name]) ->
            test name, ->
                (expect alias-l).to-be alias-r

    describe 'dot' ->
        trim = dot 'trim'
        bark = dot 'bark'
        test 'string' ->
            ' dog '
            |> trim
            |> expect-to-equal 'dog'
        test 'user obj' ->
            obj
            |> bark
            |> expect-to-equal 'rough'
        test 'array' ->
            [1 to 4]
            |> dot-mut 'shift'
            |> expect-to-equal 1
    describe 'dot1' ->
        speak = dot1 'speak'
        test 'string' ->
            'dog'
            |> dot1 'concat' 's'
            |> expect-to-equal 'dogs'
        test 'user-obj' ->
            obj
            |> speak 'name'
            |> expect-to-equal 'my name is dog'
    describe 'dot2' ->
        jump = dot2 'jump'
        test 'string' ->
            'dog'
            |> dot2 'concat' 'gie' 's'
            |> expect-to-equal 'doggies'
        test 'user-obj' ->
            obj
            |> jump 'up' '3m'
            |> expect-to-equal 'jumping 3m up'
    describe 'dot3' ->
        garble = dot3 'garble'
        test 'string' ->
            'dog'
            |> dot3 'concat' 'g' 'ie' 's'
            |> expect-to-equal 'doggies'
        test 'user-obj' ->
            obj
            |> garble 'a' 'b' 'c'
            |> expect-to-equal 'a!b!c'
    describe 'dotN' ->
        garble = dotN 'garble'
        test 'string' ->
            'dog'
            |> dotN 'concat' ['g' 'ie' 's']
            |> expect-to-equal 'doggies'
        test 'user-obj' ->
            obj
            |> garble ['a' 'b' 'c' 'd']
            |> expect-to-equal 'a!b!c!d'
    describe 'dots combine' ->
        test 1 ->
            ' dog '
            |> dot 'trim'
            |> dot1 'concat' 'g'
            |> dot2 'slice' 1 3
            |> dot3 'concat' 'g' 'i' 'es'
            |> dotN 'replace' ['o' -> 'lo']
            |> expect-to-equal 'loggies'

describe 'tapMut, tapDot*' ->
    var log
    var obj
    before-each ->
        log := jest.fn()
        obj :=
            name: 'cat'
            'get-name': -> @name
            'reverse-name-mut': -> @name = reverse @name
            'bark-io': -> log 'rough'
            'speak-io': (word) -> log word
            jump: (where, how-high) -> "jumping #how-high #where"
            garble: (...all) -> log join '!' all

    describe 'aliases' ->
        normal = [tap, tap-dot, tap-dot1, tap-dot2, tap-dot3, tap-dot-n]
        mut = [tap-mut, tap-dot-mut, tap-dot1-mut, tap-dot2-mut, tap-dot3-mut, tap-dot-n-mut]
        names = ['tap-mut', 'tap-dot-mut', 'tap-dot1-mut', 'tap-dot2-mut', 'tap-dot3-mut', 'tap-dot-n-mut']
        zip-all normal, mut, names
        |> each ([alias-l, alias-r, name]) ->
            test name, ->
                (expect alias-l).to-be alias-r
    describe 'tapMut' ->
        test 'array' ->
            [2 to 4]
            |> tap-mut (x) -> x.push 5
            |> tap-mut (x) -> x.unshift 1
            |> expect-to-equal [1 to 5]
    describe 'tapDot' ->
        test 'array 1' ->
            [1 to 4]
            |> tap-dot-mut 'shift'
            |> expect-to-equal [2 to 4]
        test 'array 2' ->
            [1 to 4]
            |> tap-dot-mut 'reverse'
            |> expect-to-equal [4 to 1 by -1]
        test 'user-obj' ->
            obj
            |> tap-dot 'bark-io'
            |> tap-dot-mut 'reverse-name-mut'
            |> dot 'get-name'
            |> expect-to-equal 'tac'

            log.mock.calls.length
            |> expect-to-equal 1
    describe 'tapDot1' ->
        test 'array' ->
            [1 to 4]
            |> tap-dot1 'concat' 5
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj
            |> tap-dot1 'speak-io' 'hello'
            |> expect-to-be obj

            log.mock.calls
            |> expect-to-equal [['hello']]
    describe 'tapDot2' ->
        test 'array' ->
            [1 to 4]
            |> tap-dot2 'concat' 5 6
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj
            |> tap-dot2 'garble' 'hello' 'goodbye'
            |> expect-to-be obj

            log.mock.calls
            |> expect-to-equal [['hello!goodbye']]
    describe 'tapDot3' ->
        test 'array' ->
            [1 to 4]
            |> tap-dot3 'concat' 5 6 7
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj
            |> tap-dot3 'garble' 'hello' 'goodbye' 'hello'
            |> expect-to-be obj

            log.mock.calls
            |> expect-to-equal [['hello!goodbye!hello']]
    describe 'tapDotN' ->
        test 'array' ->
            [1 to 4]
            |> tap-dot-n 'concat' [1 2 3]
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj
            |> tap-dot-n 'garble' ['hello' 'goodbye' 'hello']
            |> expect-to-be obj

            log.mock.calls
            |> expect-to-equal [['hello!goodbye!hello']]
    describe 'tapDot combine' ->
        test 'array' ->
            [2, 3, 4]
            |> tap-dot1-mut 'push' 5
            |> tap-dot2-mut 'push' 6 7
            |> tap-dot3-mut 'push' 8 9 10
            |> tap-dot-n-mut 'push' [11 12]
            |> tap-dot1-mut 'unshift' 1
            |> expect-to-equal [1 to 12]
    describe 'tapDot' ->
        test 'array' ->
        test 'user-obj' ->
    describe 'tapDot' ->
        test 'array' ->
        test 'user-obj' ->
    describe 'tapDot' ->
        test 'array' ->
        test 'user-obj' ->
    describe 'tapDot' ->
        test 'array' ->
        test 'user-obj' ->
    describe 'tapDot' ->
        test 'array' ->
        test 'user-obj' ->
