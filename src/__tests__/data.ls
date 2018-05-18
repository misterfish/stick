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
    default-to, default-to__,

    assoc-m,
    append-to, append-to-m, append-from, append-from-m,
    prepend-from, prepend-from-m, prepend-to, prepend-to-m,
    concat-to, concat-to-m, concat-from, concat-from-m,
    precat-to, precat-from,

    merge-to, merge-from, merge-to-m, merge-from-m,
    merge-to-with-m, merge-from-with-m,
    merge-to-in, merge-from-in, merge-to-in-m, merge-from-in-m,
    merge-all-in,
    inject-to-m, inject-from-m,

    discard-prototype, flatten-prototype,

    map-pairs, map-pairs-in, each-obj-in,
    apply-scalar, pass-scalar,

} = require '../index'

describe 'default to' ->
    test 1 ->
        false
        |> default-to -> 42
        |> expect-to-equal false
    test 2 ->
        null
        |> default-to -> 42
        |> expect-to-equal 42
    test 3 ->
        void
        |> default-to -> 42
        |> expect-to-equal 42

describe 'default to __' ->
    test 1 ->
        default-to__ false -> 42
        |> expect-to-equal false
    test 2 ->
        default-to__ null -> 42
        |> default-to -> 42
        |> expect-to-equal 42
    test 3 ->
        default-to__ void -> 42
        |> default-to -> 42
        |> expect-to-equal 42

describe 'data transforms' ->
    # --- vals always get loaded from src into target (direction of pipe is
    # changed).

    run = (args) ->
        { fn, src, tgt, dir, } = args
        if dir == 'to' then src |> fn tgt
        else                tgt |> fn src

    test-m = (args) ->
        { res, mut, tgt, } = args
        if mut then (expect res).to-be tgt
        else        (expect res).not.to-be tgt

    describe 'assocM' ->
        test 1 ->
            orig = a: 1 b:2
            nieuw = orig
                |> assoc-m 'b' 3
            (expect nieuw).to-be orig
            (expect nieuw).to-equal a: 1 b: 3

    describe 'appendTo' ->
        fn = append-to
        dir = 'to'
        mut = false
        test 1 ->
            tgt = [1 2 3]
            src = [4 5 6]
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [1 2 3 [4 5 6]]
        test 2 ->
            tgt = [1 2 3]
            src = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [1 to 4]
        test 'eg' ->
            res = 3
            |> append-to [4]
            (expect res).to-equal [4 3]

    describe 'appendToM' ->
        fn = append-to-m
        dir = 'to'
        mut = true
        test 'array to array' ->
            tgt = [1 2 3]
            src = [4 5 6]
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [1 2 3 [4 5 6]]
        test 'elem to array' ->
            tgt = [1 2 3]
            src = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [1 to 4]
        test 'eg' ->
            res = 3
            |> append-to-m [4]
            (expect res).to-equal [4 3]

    describe 'appendFrom' ->
        fn = append-from
        dir = 'from'
        mut = false
        test 1 ->
            tgt = [1 2 3]
            src = [4 5 6]
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [1 2 3 [4 5 6]]
        test 2 ->
            tgt = [1 2 3]
            src = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [1 to 4]
        test 'eg' ->
            res = [3]
            |> append-from 4
            (expect res).to-equal [3 4]

    describe 'appendFromM' ->
        fn = append-from-m
        dir = 'from'
        mut = true
        test 'array -> array' ->
            tgt = [1 2 3]
            src = [4 5 6]
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [1 2 3 [4 5 6]]
        test 'elem -> array' ->
            tgt = [1 2 3]
            src = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [1 to 4]
        test 'eg' ->
            res = [4]
            |> append-from-m 3
            (expect res).to-equal [4 3]

    describe 'prependTo' ->
        fn = prepend-to
        dir = 'to'
        mut = false
        test 'array -> array' ->
            tgt = [1 2 3]
            src = [4 5 6]
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [[4 5 6] 1 2 3]
        test 'number -> array' ->
            tgt = [1 2 3]
            src = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [4 1 2 3]
        test 'eg' ->
            res = 3
            |> prepend-to [4]
            (expect res).to-equal [3 4]

    describe 'prependFrom' ->
        fn = prepend-from
        dir = 'from'
        mut = false
        test 'array -> array' ->
            tgt = [1 2 3]
            src = [4 5 6]
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [[4 5 6] 1 2 3]
        test 'element -> array' ->
            tgt = [1 2 3]
            src = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [4 1 2 3]
        test 'eg' ->
            res = [4]
            |> prepend-from 3
            (expect res).to-equal [3 4]

    describe 'prependFromM' ->
        fn = prepend-from-m
        dir = 'from'
        mut = true
        test 'array to array' ->
            tgt = [1 2 3]
            src = [4 5 6]
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [[4 5 6] 1 2 3]
        test 'elem to array' ->
            tgt = [1 2 3]
            src = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [4 1 2 3]
        test 'eg' ->
            res = [3]
            |> prepend-from-m 4
            (expect res).to-equal [4 3]

    describe 'prependToM' ->
        fn = prepend-to-m
        dir = 'to'
        mut = true
        test 'array to array' ->
            tgt = [1 2 3]
            src = [4 5 6]
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [[4 5 6] 1 2 3]
        test 'elem to array' ->
            tgt = [1 2 3]
            src = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [4 1 2 3]
        test 'eg' ->
            res = 4
            |> prepend-to-m [3]
            (expect res).to-equal [4 3]

    describe 'concatTo' ->
        fn = concat-to
        dir = 'to'
        mut = false
        test 'array -> array' ->
            tgt = [1 2 3]
            src = [4 5 6]
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [1 to 6]
        test 'string -> string' ->
            tgt = "don't give me no "
            src = 'jibber jabber'
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal tgt + src
        test 'unequal types => dont throw, unlike ramda' ->
            tgt = [1 2 3]
            src = 4
            (expect -> src |> concat-to tgt).not.to-throw()

    describe 'concatToM' ->
        fn = concat-to-m
        dir = 'to'
        mut = true
        test 1 ->
            tgt = [1 2 3]
            src = [4 5 6]
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [1 to 6]
        test 'strings -> throw' ->
            tgt = "don't give me no "
            src = 'jibber jabber'
            (expect -> src |> concat-to-m tgt).to-throw()

    describe 'concatFrom' ->
        fn = concat-from
        dir = 'from'
        mut = false
        test 'array -> array' ->
            tgt = [1 2 3]
            src = [4 5 6]
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [1 to 6]
        test 'elem -> array' ->
            tgt = [1 2 3]
            src = 4
            expect(-> src |> concat-from tgt).to-throw()
        test 'alias' ->
            precat-to   |> expect-to-equal concat-from
            precat-from |> expect-to-equal concat-to

    describe 'concatFromM' ->
        fn = concat-from-m
        dir = 'from'
        mut = true
        test 1 ->
            tgt = [1 2 3]
            src = [4 5 6]
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal [1 to 6]

    describe 'mergeTo' ->
        fn = merge-to
        dir = 'to'
        mut = false
        test 1 ->
            tgt = a: 1 b: 2
            src =      b: 3 c: 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal a: 1 b: 3 c: 4
        test 'also takes null/undef' ->
            tgt = a: 1 b: 2
            src =      b: 3 c: 4 d: void
            res = run do
                { fn, src, tgt, dir, }
            # --- = JS `in`
            ('d' of res) |> expect-to-be true
        test 'discards non-own vals 1' ->
            tgt = Object.create hidden: 42
                ..a = 1
                ..b = 2
            src = Object.create hidden: 43
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4
            (expect res.hidden).to-equal void
        test 'discards non-own vals 2' ->
            tgt = Object.create hidden: 42
                ..a = 1
                ..b = 2
            src = Object.create {}
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4
            (expect res.hidden).to-equal void
        test 'discards non-own vals 3' ->
            tgt = Object.create {}
                ..a = 1
                ..b = 2
            src = Object.create hidden: 43
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4
            (expect res.hidden).to-equal void

    describe 'mergeFrom' ->
        fn = merge-from
        dir = 'from'
        mut = false
        test 1 ->
            tgt = a: 1 b: 2
            src =      b: 3 c: 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal a: 1 b: 3 c: 4
        test 'discards non-own vals 1' ->
            tgt = Object.create hidden: 42
                ..a = 1
                ..b = 2
            src = Object.create hidden: 43
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4
            (expect res.hidden).to-equal void
        test 'discards non-own vals 2' ->
            tgt = Object.create hidden: 42
                ..a = 1
                ..b = 2
            src = Object.create {}
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4
            (expect res.hidden).to-equal void
        test 'discards non-own vals 3' ->
            tgt = Object.create {}
                ..a = 1
                ..b = 2
            src = Object.create hidden: 43
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4
            (expect res.hidden).to-equal void

    describe 'mergeToM' ->
        fn = merge-to-m
        dir = 'to'
        mut = true
        test 1 ->
            tgt = a: 1 b: 2
            src =      b: 3 c: 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal a: 1 b: 3 c: 4
        test 'discards non-own on src' ->
            tgt = Object.create {}
                ..a = 1
                ..b = 2
            src = Object.create hidden: 43
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal a: 1 b: 3 c: 4
            (expect res.hidden).to-equal void
        test 'discards non-own on src, retains on tgt' ->
            tgt = Object.create hidden: 42
                ..a = 1
                ..b = 2
            src = Object.create {}
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal a: 1 b: 3 c: 4
            (expect res.hidden).to-equal 42
        test 'discards non-own vals 3' ->
            tgt = Object.create hidden: 42
                ..a = 1
                ..b = 2
            src = Object.create hidden: 43
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal a: 1 b: 3 c: 4

    describe 'mergeFromM' ->
        fn = merge-from-m
        dir = 'from'
        mut = true
        test 1 ->
            tgt = a: 1 b: 2
            src =      b: 3 c: 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal a: 1 b: 3 c: 4
        test 'discards non-own on src' ->
            tgt = Object.create {}
                ..a = 1
                ..b = 2
            src = Object.create hidden: 43
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal a: 1 b: 3 c: 4
            (expect res.hidden).to-equal void
        test 'discards non-own on src, retains on tgt' ->
            tgt = Object.create hidden: 42
                ..a = 1
                ..b = 2
            src = Object.create {}
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal a: 1 b: 3 c: 4
            (expect res.hidden).to-equal 42
        test 'discards non-own vals 3' ->
            tgt = Object.create hidden: 42
                ..a = 1
                ..b = 2
            src = Object.create hidden: 43
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }
            (expect res).to-equal a: 1 b: 3 c: 4

    describe 'mergeToWithM' ->
        var tgt, src
        noop = ->
        choose-left = (a, b) -> a
        choose-right = (a, b) -> b
        describe 'main' ->
            test 'when no collisions, acts like mergeToM' ->
                tgt = Object.create hidden1: 42
                    ..a = 1
                    ..b = 2
                src = Object.create hidden2: 42
                    ..c = 3
                    ..d = 4
                src
                |> merge-to-with-m noop, tgt
                |> expect-to-equal (src |> merge-to-m tgt)

        describe 'collide with own of target' ->
            var tgt, src
            before-each ->
                tgt := Object.create hidden: 42
                    ..a = 'target a'
                    ..b = 'target b'
                # --- src prototype is discarded anyway.
                src :=
                    b: 'source b'
                    c: 'source c'
            test 'choose target' ->
                src |> merge-to-with-m choose-left, tgt
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'target b'
                    c: 'source c'
            test 'choose source' ->
                src |> merge-to-with-m choose-right, tgt
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'source b'
                    c: 'source c'

        describe 'collide with in of target' ->
            var tgt, src
            before-each ->
                tgt := Object.create hidden: 'target hidden'
                    ..a = 'target a'
                    ..b = 'target b'
                # --- src prototype is discarded anyway.
                src :=
                    c: 'source c'
                    hidden: 'source hidden'

            test 'proto chain of target is not checked' ->
                src |> merge-to-with-m null tgt
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'target b'
                    c: 'source c'
                    hidden: 'source hidden'

            # --- old behaviors.
            xtest 'choose target, hidden val floats' ->
                src |> merge-to-with-m choose-left, tgt
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'target b'
                    c: 'source c'
                    hidden: 'target hidden'
                tgt.hidden |> expect-to-equal 'target hidden'
            xtest 'choose source, hidden val floats' ->
                src |> merge-to-with-m choose-right, tgt
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'source b'
                    c: 'source c'
                    hidden: 'source hidden'

    describe 'mergeFromWithM' ->
        var tgt, src
        noop = ->
        choose-left = (a, b) -> a
        choose-right = (a, b) -> b
        describe 'main' ->
            test 'when no collisions, acts like mergeFromM' ->
                tgt = Object.create hidden1: 42
                    ..a = 1
                    ..b = 2
                src = Object.create hidden2: 42
                    ..c = 3
                    ..d = 4
                tgt
                |> merge-from-with-m noop, src
                |> expect-to-equal (tgt |> merge-from-m src)

        describe 'collide with own of target' ->
            var tgt, src
            before-each ->
                tgt := Object.create hidden: 42
                    ..a = 'target a'
                    ..b = 'target b'
                # --- src prototype is discarded anyway.
                src :=
                    b: 'source b'
                    c: 'source c'
            test 'choose target' ->
                tgt |> merge-from-with-m choose-left, src
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'target b'
                    c: 'source c'
            test 'choose source' ->
                tgt |> merge-from-with-m choose-right, src
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'source b'
                    c: 'source c'

        describe 'collide with in of target' ->
            var tgt, src
            before-each ->
                tgt := Object.create hidden: 'target hidden'
                    ..a = 'target a'
                # --- src prototype is discarded anyway.
                src :=
                    b: 'source b'
                    c: 'source c'
                    hidden: 'source hidden'
            test 'proto chain of target is not checked' ->
                tgt |> merge-from-with-m null src
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'source b'
                    c: 'source c'
                    hidden: 'source hidden'
            # --- old behaviors.
            xtest 'choose target, hidden val floats' ->
                tgt |> merge-from-with-m choose-left, src
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'target b'
                    c: 'source c'
                    hidden: 'target hidden'
                tgt.hidden |> expect-to-equal 'target hidden'
            xtest 'choose source, hidden val floats' ->
                tgt |> merge-from-with-m choose-right, src
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'source b'
                    c: 'source c'
                    hidden: 'source hidden'

    describe 'mergeToIn' ->
        fn = merge-to-in
        dir = 'to'
        mut = false
        test 1 ->
            tgt = Object.create hidden: 42
                ..a = 1
                ..b = 2
            src = Object.create {}
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4 hidden: 42
        test 2 ->
            tgt = Object.create {}
                ..a = 1
                ..b = 2
            src = Object.create hidden: 43
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4 hidden: 43
        test 3 ->
            tgt = Object.create hidden: 42
                ..a = 1
                ..b = 2
            src = Object.create hidden: 43
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4 hidden: 43

    describe 'mergeFromIn' ->
        fn = merge-from-in
        dir = 'from'
        mut = false
        test 1 ->
            tgt = Object.create hidden: 42
                ..a = 1
                ..b = 2
            src = Object.create {}
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4 hidden: 42
        test 2 ->
            tgt = Object.create {}
                ..a = 1
                ..b = 2
            src = Object.create hidden: 43
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4 hidden: 43
        test 3 ->
            tgt = Object.create hidden: 42
                ..a = 1
                ..b = 2
            src = Object.create hidden: 43
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4 hidden: 43

    describe 'mergeToInM' ->
        fn = merge-to-in-m
        dir = 'to'
        mut = true
        test 1 ->
            tgt = Object.create hidden: 42
                ..a = 1
                ..b = 2
            src = Object.create {}
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4
            (expect res.hidden).to-equal 42
        test 2 ->
            tgt = Object.create {}
                ..a = 1
                ..b = 2
            src = Object.create hidden: 43
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4 hidden: 43
        test 3 ->
            tgt = Object.create hidden: 42
                ..a = 1
                ..b = 2
            src = Object.create hidden: 43
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4 hidden: 43

    describe 'mergeFromInM' ->
        fn = merge-from-in-m
        dir = 'from'
        mut = true
        test 1 ->
            tgt = Object.create hidden: 42
                ..a = 1
                ..b = 2
            src = Object.create {}
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4
            (expect res.hidden).to-equal 42
        test 2 ->
            tgt = Object.create {}
                ..a = 1
                ..b = 2
            src = Object.create hidden: 43
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4 hidden: 43
        test 3 ->
            tgt = Object.create hidden: 42
                ..a = 1
                ..b = 2
            src = Object.create hidden: 43
                ..b = 3
                ..c = 4
            res = run do
                { fn, src, tgt, dir, }
            test-m do
                { res, mut, tgt, }

            (expect res).to-equal a: 1 b: 3 c: 4 hidden: 43

    describe 'mergeAllIn' ->
        test 'no prototypes' ->
            merge-all-in list do
                *   a: 1
                *   b: 2
                *   c: 3
            |> expect-to-equal do
                a: 1 b: 2 c: 3
        test 'with prototypes' ->
            merge-all-in list do
                { a: 1 } |> Object.create
                { b: 2 } |> Object.create
                { c: 3 } |> Object.create
            |> expect-to-equal do
                a: 1 b: 2 c: 3

describe 'discardPrototype' ->
    proto1 = Object.create blah: 10
    proto2 = Object.create proto1
    obj = Object.create proto2
    obj.blah |> expect-to-equal 10
    (obj |> discard-prototype).blah |> expect-to-equal void

describe 'flattenPrototype' ->
    proto1 = Object.create blah: 10
        ..feets = 'sometimes'
    proto2 = Object.create proto1
        ..hands = 'mostways'
    obj = Object.create proto2
        ..legs = 'noo'
    obj.blah |> expect-to-equal 10
    (obj |> flatten-prototype) |> expect-to-equal do
        blah: 10 feets: 'sometimes' hands: 'mostways' legs: 'noo'

describe 'mapPairs' ->
    test 'obj' ->
        (Object.create how: 'fine'
            ..are = 'thanks'
            ..you = 'and you?')
        |> map-pairs (k, v) ->
            [k.to-upper-case(), 'yes, ' + v]
        |> expect-to-equal do
            ARE: 'yes, thanks'
            YOU: 'yes, and you?'
    test 'array' ->
        ['how' 'fine' 'are' 'thanks' 'you' 'and you?']
        |> map-pairs (k, v) ->
            [k.to-upper-case(), 'yes, ' + v]
        |> expect-to-equal do
            HOW: 'yes, fine'
            ARE: 'yes, thanks'
            YOU: 'yes, and you?'

describe 'mapPairsIn' ->
    test 1 ->
        ({ how: 'fine' }
        |> Object.create)

        <<<
            are: 'thanks'
            you: 'and you?'

        |> map-pairs-in (k, v) ->
            [k.to-upper-case(), 'yes, ' + v]
        |> expect-to-equal do
            HOW: 'yes, fine'
            ARE: 'yes, thanks'
            YOU: 'yes, and you?'

describe 'eachObjIn' ->
    test 'also enumerates prototype vals' ->
        ret = []
        do ->
            how: 'fine'
            are: 'thanks'
        |> Object.create
        |> each-obj-in (v, k) ->
            ret.push k
            ret.push v

        ret |> expect-to-equal <[ how fine are thanks ]>

            # --- apply function to arguments has more hits on google.
            # --- maybe pass -> prams
            #
            # --- apply -> func

describe 'applyScalar' ->
    test 1 ->
        [1 2 3]
        |> apply-scalar [(* 2), ( + 1), (/ 2)]
        |> expect-to-equal [2 3 1.5]

describe 'passScalar' ->
    test 1 ->
        [(* 2), ( + 1), (/ 2)]
        |> pass-scalar [1 2 3]
        |> expect-to-equal [2 3 1.5]
