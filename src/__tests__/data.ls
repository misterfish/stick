{
    assoc: rAssoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map: rMap, filter, prop: rProp, path: rPath, defaultTo: rDefaultTo, curry, forEach: rEach, complement, isNil,
    repeat: rRepeat,
    times: r-times,
    join: r-join,
    split: r-split,
    reverse,
    tap,
    flip,
    zip,
} = require 'ramda'

{
    odd, even,
} = require 'prelude-ls'

{
    list,
    test, xtest,
    expect-to-equal, expect-to-be,
} = require './common'

{
    map, each, each-obj, each-obj-in,
    keys, keys-in,
    values, values-in,
    map-keys, map-values,
    map-keys-in, map-values-in,
    map-tuples, map-tuples-in,
    map-as-keys, map-as-keys-in,
    map-as-values, map-as-values-in,
    with-filter,
    add-index, add-collection,
    reduce-obj, reduce-obj-in,

    default-to, default-to-v,

    join, split,
    prop,

    assoc, assoc-m,
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

    #map-pairs, map-pairs-in,
    ampersand, asterisk,

    arg0, arg1, arg2, arg3, arg4, arg5, arg6,

} = require '../index'

sort-alpha = (.sort ())
sort-num = (.sort ((a, b) -> a - b))

describe 'map, each' ->
    describe 'map' ->
        map-x = map |> add-index
        map-x-c = map |> add-index |> add-collection
        map-c-x = map |> add-collection |> add-index

        test 1 ->
            [1 2 3] |> map (* 2) |> expect-to-equal [2 4 6]
        test 'capped' ->
            [1 2 3]
            |> map (x, arg2) -> arg2
            |> expect-to-equal [void void void]
        test 'indexed' ->
            [1 2 3]
            |> map-x (x, idx) -> idx
            |> expect-to-equal [0 1 2]
        test 'mapXC' ->
            [1 2 3]
            |> map-x-c (x, i, c) -> i * c.length
            |> expect-to-equal [0 3 6]
        test 'mapCX' ->
            [1 2 3]
            |> map-c-x (x, c, i) -> i * c.length
            |> expect-to-equal [0 3 6]

    describe 'each' ->
        each-x = each |> add-index
        each-x-c = each |> add-index |> add-collection
        each-c-x = each |> add-collection |> add-index
        y = y: []
        ping = (x) -> y.y.push x

        before-each -> y.y = []
        test 1 ->
            [1 2 3] |> each (x) -> ping x
            y.y |> expect-to-equal [1 2 3]
        test 'capped' ->
            [1 2 3] |> each (x, arg2) -> ping arg2
            y.y |> expect-to-equal [void void void]
        test 'indexed' ->
            [1 2 3] |> each-x (x, idx) -> ping idx
            y.y |> expect-to-equal [0 1 2]
        test 'eachXC' ->
            [1 2 3] |> each-x-c (x, i, c) -> ping i * c.length
            y.y |> expect-to-equal [0 3 6]
        test 'eachCX' ->
            [1 2 3] |> each-c-x (x, c, i) -> ping i * c.length
            y.y |> expect-to-equal [0 3 6]

    describe 'eachObj' ->
        each-obj-x = each-obj |> add-index
        each-obj-x-c = each-obj |> add-index |> add-collection
        each-obj-c-x = each-obj |> add-collection |> add-index
        base = base-val: 15
        o = (Object.create base) <<< a: 1 b: 2
        y =
            y: void
            z: []

        before-each -> y.y = {}; y.z = []
        test 1 ->
            o |> each-obj (v, k) -> y.y[k] = v
            y.y |> expect-to-equal a: 1 b: 2
        test 'capped' ->
            o |> each-obj (v, k, arg3) -> y.z.push arg3
            y.z |> expect-to-equal [void void]
        test 'indexed' ->
            o |> each-obj-x (v, k, idx) -> y.y[k] = v; y.z.push idx
            y.y |> expect-to-equal a: 1 b: 2
            y.z |> expect-to-equal [0 1]
        test 'eachObjXC' ->
            o |> each-obj-x-c (v, k, idx, c) -> y.y[k] = v; y.z.push idx; y.z.push c
            y.y |> expect-to-equal a: 1 b: 2
            y.z |> expect-to-equal [0, o, 1, o]
        test 'eachObjCX' ->
            o |> each-obj-c-x (v, k, c, idx) -> y.y[k] = v; y.z.push idx; y.z.push c
            y.y |> expect-to-equal a: 1 b: 2
            y.z |> expect-to-equal [0, o, 1, o]

describe 'reduceObj' ->
    base = base-val: 15
    o = (Object.create base) <<< a: 1 b: 2
    # --- remember not to depend on order.
    describe 'reduceObj' ->
        test 1 ->
            f = (acc, [k, v]) -> [...acc, "\"#k\": #v"]
            reduced = o |> reduce-obj f, []
            json = reduced
                |> r-join ', '
                |> (x) -> "{#x}"
            (JSON.parse json).a
            |> expect-to-equal 1
            (JSON.parse json).base-val
            |> expect-to-equal void
    describe 'reduceObjIn' ->
        test 1 ->
            f = (acc, [k, v]) -> [...acc, "\"#k\": #v"]
            reduced = o |> reduce-obj-in f, []
            json = reduced
                |> r-join ', '
                |> (x) -> "{#x}"
            (JSON.parse json).a
            |> expect-to-equal 1
            (JSON.parse json).base-val
            |> expect-to-equal 15

describe 'keys, values' ->
    base = base-val: 10
    o = (Object.create base) <<< one: 1 two: 2
    sort-alpha = (.sort ())
    sort-num = (.sort ((a, b) -> a - b))
    test 'keys' ->
        o |> keys
          |> sort-alpha
          |> expect-to-equal <[ one two ]>
    test 'keysIn' ->
        o |> keys-in
          |> sort-alpha
          |> expect-to-equal <[ baseVal one two ]>
    test 'values' ->
        o |> values
          |> sort-num
          |> expect-to-equal [1 2]
    test 'valuesIn' ->
        o |> values-in
          |> sort-num
          |> expect-to-equal [1 2 10]

describe 'map keys/values/tuples' ->
    base = base-val: 10
    o = (Object.create base) <<< one: 1 two: 2
    test 'mapKeys' ->
        o |> map-keys (.to-upper-case ())
          |> expect-to-equal do
              TWO: 2
              ONE: 1
    test 'mapValues' ->
        o |> map-values (* 10)
          |> expect-to-equal do
              one: 10
              two: 20
    test 'mapKeysIn' ->
        o |> map-keys-in (.to-upper-case ())
          |> expect-to-equal do
              TWO: 2
              BASEVAL: 10
              ONE: 1
    test 'mapValuesIn' ->
        o |> map-values-in (* 10)
          |> expect-to-equal do
              base-val: 100
              two: 20
              one: 10
    test 'mapTuples' ->
        o |> map-tuples ([k, v]) -> [k.to-upper-case (), v + 1]
          |> expect-to-equal do
              TWO: 3
              ONE: 2
    test 'mapTuplesIn' ->
        o |> map-tuples-in ([k, v]) -> [k.to-upper-case (), v + 1]
          |> expect-to-equal do
              BASEVAL: 11
              TWO: 3
              ONE: 2

describe 'map as' ->
    base = base-val: 10
    o = (Object.create base) <<< one: 1 two: 2
    describe 'mapAsKeys' ->
        o |> map-as-keys (.to-upper-case ())
          |> expect-to-equal ['ONE' 'TWO']
    describe 'mapAsKeysIn' ->
        o |> map-as-keys-in (.to-upper-case ())
          |> expect-to-equal ['ONE' 'TWO' 'BASEVAL']
    describe 'mapAsValues' ->
        o |> map-as-values (* 10)
          |> sort-num
          |> expect-to-equal [10 20]
    describe 'mapAsValuesIn' ->
        o |> map-as-values-in (* 10)
          |> expect-to-equal [10 20 100]

describe 'map as + with filter' ->
    base = base-val: 10
    o = (Object.create base) <<< one: 1 two: 2
    map-k-reject-starts-with-O = map-as-keys |> with-filter (.0 != 'O')
    map-k-in-reject-starts-with-O = map-as-keys-in |> with-filter (.0 != 'O')
    map-v-odd = map-as-values |> with-filter odd
    map-v-in-odd = map-as-values-in |> with-filter odd
    test 'mapAsKeysWithFilter' ->
        o |> map-k-reject-starts-with-O (.to-upper-case ())
          |> expect-to-equal <[ TWO ]>
    test 'mapAsKeysInWithFilter' ->
        o |> map-k-in-reject-starts-with-O (.to-upper-case ())
          |> sort-alpha
          |> expect-to-equal <[ BASEVAL TWO ]>
    test 'mapAsValuesWithFilter' ->
        o |> map-v-odd (+ 1)
          |> expect-to-equal [3]
    test 'mapAsValuesInWithFilter' ->
        o |> map-v-in-odd (+ 1)
          |> sort-num
          |> expect-to-equal [3 11]

describe 'map + with filter' ->
    base = base-val: 10
    o = (Object.create base) <<< one: 1 two: 2
    map-k-reject-starts-with-O = map-keys |> with-filter (.0 != 'O')
    map-k-in-reject-starts-with-O = map-keys-in |> with-filter (.0 != 'O')
    map-v-odd = map-values |> with-filter odd
    map-v-in-odd = map-values-in |> with-filter odd
    map-tuples-v-odd = map-tuples |> with-filter ([k, v]) -> odd v
    map-tuples-v-in-odd = map-tuples-in |> with-filter ([k, v]) -> odd v
    test 'mapKeysWithFilter' ->
        o |> map-k-reject-starts-with-O (.to-upper-case ())
          |> expect-to-equal TWO: 2
    test 'mapKeysInWithFilter' ->
        o |> map-k-in-reject-starts-with-O (.to-upper-case ())
          |> expect-to-equal TWO: 2 BASEVAL: 10
    test 'mapValuesWithFilter' ->
        o |> map-v-odd (+ 1)
          |> expect-to-equal two: 3
    test 'mapValuesInWithFilter' ->
        o |> map-v-in-odd (+ 1)
          |> expect-to-equal two: 3 baseVal: 11
    test 'mapTuplesWithFilter' ->
        o |> map-tuples-v-odd ([k, v]) -> [k.to-upper-case (), v + 1]
          |> expect-to-equal TWO: 3
    test 'mapTuplesInWithFilter' ->
        o |> map-tuples-v-in-odd ([k, v]) -> [k.to-upper-case (), v + 1]
          |> expect-to-equal TWO: 3 BASEVAL: 11


describe 'join, split' ->
    describe 'join' ->
        test 1 ->
            [1 to 4] |> join ','
            |> expect-to-equal '1,2,3,4'
    describe 'split' ->
        test 1 ->
            '1,2,3,4' |> split ',' |> map Number
            |> expect-to-equal [1 to 4]

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

describe 'default to value' ->
    test 1 ->
        false
        |> default-to-v 43
        |> expect-to-equal false
    test 2 ->
        null
        |> default-to-v 42
        |> expect-to-equal 42
    test 3 ->
        void
        |> default-to-v 42
        |> expect-to-equal 42

describe 'default to __' ->
    return
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

describe 'data stuff' ->
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

    describe 'assoc' ->
        base = base-val: 10
        orig = (Object.create base) <<< a: 1 b:2
        nieuw = orig |> assoc 'b' 3
        test 1 ->
            (expect nieuw).not.to-be orig
            nieuw.a |> expect-to-equal 1
            nieuw.b |> expect-to-equal 3
        test 'flattens proto' ->
            nieuw.base-val |> expect-to-equal 10

    describe 'assocM' ->
        test 1 ->
            orig = a: 1 b:2
            nieuw = orig
                |> assoc-m 'b' 3
            (expect nieuw).to-be orig
            (expect nieuw).to-equal a: 1 b: 3

    describe 'prop' ->
        test 'prop' ->
            (a: 1
            b: 2)
            |> prop 'b'
            |> expect-to-equal 2

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

describe 'discard / flatten prototype' ->
    describe 'discardPrototype' ->
        base = base-val: 10
        base2 = Object.create base
        obj = Object.create base2
        obj.base-val |> expect-to-equal 10
        (obj |> discard-prototype).base-val |> expect-to-equal void

    describe 'flattenPrototype' ->
        base = Object.create base-val: 10
            ..feets = 'sometimes'
        base2 = Object.create base
            ..hands = 'mostways'
        obj = Object.create base2
            ..legs = 'noo'
        obj.base-val |> expect-to-equal 10
        (obj |> flatten-prototype) |> expect-to-equal do
            base-val: 10 feets: 'sometimes' hands: 'mostways' legs: 'noo'

# --- not sure how useful this is.
describe 'mapPairs' ->
    return
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

# --- not sure how useful this is.
describe 'mapPairsIn' ->
    return
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

describe 'asterisk' ->
    test 1 ->
        [1 2 3]
        |> asterisk [(* 2), ( + 1), (/ 2)]
        |> expect-to-equal [2 3 1.5]

describe 'ampersand' ->
    test 1 ->
        10
        |> ampersand [(* 2), ( + 1), (/ 2)]
        |> expect-to-equal [20 11 5]

describe 'argx' ->
    test 'arg0' ->
        arg0 1
        |> expect-to-equal 1
    test 'arg1' ->
        arg1 1 2
        |> expect-to-equal 2
    test 'arg2' ->
        arg2 1 2 3
        |> expect-to-equal 3
    test 'arg3' ->
        arg3 1 2 3 4
        |> expect-to-equal 4
    test 'arg4' ->
        arg4 1 2 3 4 5
        |> expect-to-equal 5
    test 'arg5' ->
        arg5 1 2 3 4 5 6
        |> expect-to-equal 6
    test 'arg6' ->
        arg6 1 2 3 4 5 6 7
        |> expect-to-equal 7
