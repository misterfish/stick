{
    assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, prop: rProp, path: rPath, defaultTo: rDefaultTo, curry, forEach: each, complement, isNil,
    repeat: rRepeat,
    times: r-times,
    reverse,
    flip,
    zip,
} = require 'ramda'

{
    test, xtest,
    expect-to-equal, expect-to-be,
} = require './common'

{
    dot, dot1, dot2, dot3, dot4, dot5, dot-n,
    side, side1, side2, side3, side4, side5, side-n,
} = require '../index'

describe 'dot*' ->
    obj =
        name: 'dog'
        # 0-arg
        bark: -> 'rough'
        # 1-arg
        speak: (word) -> "my #word is " + @name
        # 2-arg
        jump: (where, how-high) -> "jumping #how-high #where"
        # 3-arg
        paint: (color, force, why) -> "painting #color #force #why"
        # 4-arg
        pant: (up, down, left, right) -> "panting #up/#down,#left+#right"
        # 5-arg
        rant: (up, down, left, right, around) -> "ranting #up/#down,#left+#right--#around"
        # n-arg
        garble: (...all) -> all |> join '!'

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
            |> dot 'shift'
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
        paint = dot3 'paint'
        test 'string' ->
            'dog'
            |> dot3 'concat' 'g' 'ie' 's'
            |> expect-to-equal 'doggies'
        test 'user-obj' ->
            obj
            |> paint 'red' 'hard' 'because'
            |> expect-to-equal 'painting red hard because'
    describe 'dot4' ->
        pant = dot4 'pant'
        test 'string' ->
            'dog'
            |> dot4 'concat' 'g' 'i' 'e' 's'
            |> expect-to-equal 'doggies'
        test 'user-obj' ->
            obj
            |> pant 'hier' 'daar' 'nergens' 'ergens'
            |> expect-to-equal 'panting hier/daar,nergens+ergens'
    describe 'dot5' ->
        rant = dot5 'rant'
        test 'string' ->
            'do'
            |> dot5 'concat' 'g' 'g' 'i' 'e' 's'
            |> expect-to-equal 'doggies'
        test 'user-obj' ->
            obj
            |> rant 'hier' 'daar' 'nergens' 'ergens' 'overal'
            |> expect-to-equal 'ranting hier/daar,nergens+ergens--overal'
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

describe 'side*' ->
    var log
    var obj
    before-each ->
        log := jest.fn()
        obj :=
            name: 'cat'
            'get-name': -> @name
            'reverse-name-mut': -> @name = reverse @name
            # 0-arg
            'bark-io': -> log 'rough'
            # 1-arg
            'speak-io': (word) -> log word
            # 2-arg
            jump: (where, how-high) -> log "jumping #how-high #where"
            # 3-arg
            paint: (color, force, why) -> log "painting #color #force #why"
            # 4-arg
            pant: (up, down, left, right) -> log "panting #up/#down,#left+#right"
            # 5-arg
            rant: (up, down, left, right, around) -> log "ranting #up/#down,#left+#right--#around"
            # n-arg
            garble: (...all) -> log join '!' all




    describe 'side' ->
        test 'array 1' ->
            [1 to 4]
            |> side 'shift'
            |> expect-to-equal [2 to 4]
        test 'array 2' ->
            [1 to 4]
            |> side 'reverse'
            |> expect-to-equal [4 to 1 by -1]
        test 'user-obj' ->
            obj
            |> side 'bark-io'
            |> side 'reverse-name-mut'
            |> dot 'get-name'
            |> expect-to-equal 'tac'

            log.mock.calls.length
            |> expect-to-equal 1
    describe 'side1' ->
        test 'array' ->
            [1 to 4]
            |> side1 'concat' 5
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj
            |> side1 'speak-io' 'hello'
            |> expect-to-be obj

            log.mock.calls
            |> expect-to-equal [['hello']]
    describe 'side2' ->
        test 'array' ->
            [1 to 4]
            |> side2 'concat' 5 6
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj
            |> side2 'jump' 'up' '4m'
            |> expect-to-be obj

            log.mock.calls
            |> expect-to-equal [['jumping 4m up']]
    describe 'side3' ->
        test 'array' ->
            [1 to 4]
            |> side3 'concat' 5 6 7
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj
            |> side3 'paint' 'hello' 'goodbye' 'hello'
            |> expect-to-be obj

            log.mock.calls
            |> expect-to-equal [['painting hello goodbye hello']]
    describe 'side4' ->
        test 'array' ->
            [1 to 4]
            |> side4 'concat' 5 6 7 8
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj
            |> side4 'pant' 'hier' 'daar' 'nergens' 'ergens'
            |> expect-to-be obj

            log.mock.calls
            |> expect-to-equal [['panting hier/daar,nergens+ergens']]
    describe 'side5' ->
        test 'array' ->
            [1 to 4]
            |> side5 'concat' 5 6 7 8 9
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj
            |> side5 'rant' 'hier' 'daar' 'nergens' 'ergens' 'overal'
            |> expect-to-be obj

            log.mock.calls
            |> expect-to-equal [['ranting hier/daar,nergens+ergens--overal']]
    describe 'sideN' ->
        test 'array' ->
            [1 to 4]
            |> side-n 'concat' [1 2 3]
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj
            |> side-n 'garble' ['hello' 'goodbye' 'hello']
            |> expect-to-be obj

            log.mock.calls
            |> expect-to-equal [['hello!goodbye!hello']]
    describe 'side combine' ->
        test 'array' ->
            [2, 3, 4]
            |> side1 'push' 5
            |> side2 'push' 6 7
            |> side3 'push' 8 9 10
            |> side-n 'push' [11 12]
            |> side1 'unshift' 1
            |> expect-to-equal [1 to 12]
