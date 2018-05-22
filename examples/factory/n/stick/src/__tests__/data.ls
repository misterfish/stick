{
    assoc: rAssoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map: rMap, prop: rProp, path: rPath, defaultTo: rDefaultTo, curry, forEach: rEach, complement, isNil,
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
    map, filter, reject,
    each, each-obj, each-obj-in,
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
    append-to, append-to-m, append, append-m,
    prepend, prepend-m, prepend-to, prepend-to-m,
    concat-to, concat-to-m, concat, concat-m,
    precat-to, precat,

    merge-to, merge, merge-to-m, merge-m,
    merge-in-to, merge-in, merge-in-to-m, merge-in-m,

    merge-to-sym, merge-sym, merge-to-m-sym, merge-m-sym,
    merge-in-to-sym, merge-in-sym, merge-in-to-m-sym, merge-in-m-sym,

    merge-all-in,
    merge-with,
    merge-when,

    discard-prototype, flatten-prototype,

    #map-pairs, map-pairs-in,
    ampersand, asterisk,

    arg0, arg1, arg2, arg3, arg4, arg5, arg6,

} = require '../index'

# { } = require '../manual'

sort-alpha = (.sort ())
sort-num = (.sort ((a, b) -> a - b))

noop = ->
choose-src = (a, b) -> a
choose-tgt = (a, b) -> b

# --- the -null versions are to prove that the collision function is not called in certain cases.

merge-to-choose-tgt-m = merge-to-m-sym |> merge-with choose-tgt
merge-to-choose-tgt   = merge-to-sym   |> merge-with choose-tgt
merge-to-choose-src-m = merge-to-m-sym |> merge-with choose-src
merge-to-choose-src   = merge-to-sym   |> merge-with choose-src
merge-to-with-null-m  = merge-to-m-sym |> merge-with null
merge-to-with-null    = merge-to-sym   |> merge-with null
merge-to-with-noop-m  = merge-to-m-sym |> merge-with noop
merge-to-with-noop    = merge-to-sym   |> merge-with noop

merge-in-to-choose-tgt-m = merge-in-to-m-sym |> merge-with choose-tgt
merge-in-to-choose-tgt   = merge-in-to-sym   |> merge-with choose-tgt
merge-in-to-choose-src-m = merge-in-to-m-sym |> merge-with choose-src
merge-in-to-choose-src   = merge-in-to-sym   |> merge-with choose-src
merge-in-to-with-noop-m  = merge-in-to-m-sym |> merge-with noop
merge-in-to-with-noop    = merge-in-to-sym   |> merge-with noop

merge-choose-tgt-m    = merge-m-sym    |> merge-with choose-tgt
merge-choose-tgt      = merge-sym      |> merge-with choose-tgt
merge-choose-src-m    = merge-m-sym    |> merge-with choose-src
merge-choose-src      = merge-sym      |> merge-with choose-src
merge-with-null-m     = merge-m-sym    |> merge-with null
merge-with-null       = merge-sym      |> merge-with null
merge-with-noop-m     = merge-m-sym    |> merge-with noop
merge-with-noop       = merge-sym      |> merge-with noop

merge-in-choose-tgt-m    = merge-in-m-sym    |> merge-with choose-tgt
merge-in-choose-tgt      = merge-in-sym      |> merge-with choose-tgt
merge-in-choose-src-m    = merge-in-m-sym    |> merge-with choose-src
merge-in-choose-src      = merge-in-sym      |> merge-with choose-src
merge-in-with-null-m     = merge-in-m-sym    |> merge-with null
merge-in-with-null       = merge-in-sym      |> merge-with null
merge-in-with-noop-m     = merge-in-m-sym    |> merge-with noop
merge-in-with-noop       = merge-in-sym      |> merge-with noop

src-ok = (s, _) -> s?
tgt-ok = (_, t) -> t?

merge-to-when-src-ok-m = merge-to-m-sym |> merge-when src-ok
merge-to-when-src-ok   = merge-to-sym   |> merge-when src-ok
merge-to-when-tgt-ok-m = merge-to-m-sym |> merge-when tgt-ok
merge-to-when-tgt-ok   = merge-to-sym   |> merge-when tgt-ok
merge-when-src-ok-m = merge-m-sym |> merge-when src-ok
merge-when-src-ok   = merge-sym   |> merge-when src-ok
merge-when-tgt-ok-m = merge-m-sym |> merge-when tgt-ok
merge-when-tgt-ok   = merge-sym   |> merge-when tgt-ok

describe 'map, filter, reject, each' ->
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
    describe 'filter' ->
        filter-x = filter |> add-index
        filter-x-c = filter |> add-index |> add-collection
        filter-c-x = filter |> add-collection |> add-index

        test 1 ->
            [1 2 3] |> filter (odd) |> expect-to-equal [1 3]
        test 'capped' ->
            [1 2 3]
            |> filter (x, arg2) -> arg2
            |> expect-to-equal []
        test 'indexed' ->
            [1 2 3]
            |> filter-x (x, idx) -> idx == 2
            |> expect-to-equal [3]
        test 'filterXC' ->
            [1 2 3]
            |> filter-x-c (x, i, c) -> i * c.length == 3
            |> expect-to-equal [2]
        test 'filterCX' ->
            [1 2 3]
            |> filter-c-x (x, c, i) -> i * c.length == 3
            |> expect-to-equal [2]

    describe 'reject' ->
        reject-x = reject |> add-index
        reject-x-c = reject |> add-index |> add-collection
        reject-c-x = reject |> add-collection |> add-index

        test 1 ->
            [1 2 3] |> reject (even) |> expect-to-equal [1 3]
        test 'capped' ->
            [1 2 3]
            |> reject (x, arg2) -> arg2 == void
            |> expect-to-equal []
        test 'indexed' ->
            [1 2 3]
            |> reject-x (x, idx) -> idx == 2
            |> expect-to-equal [1 2]
        test 'rejectXC' ->
            [1 2 3]
            |> reject-x-c (x, i, c) -> i * c.length == 3
            |> expect-to-equal [1 3]
        test 'rejectCX' ->
            [1 2 3]
            |> reject-c-x (x, c, i) -> i * c.length == 3
            |> expect-to-equal [1 3]

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

    describe 'append' ->
        fn = append
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
            |> append 4
            (expect res).to-equal [3 4]

    describe 'appendM' ->
        fn = append-m
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
            |> append-m 3
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

    describe 'prepend' ->
        fn = prepend
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
            |> prepend 3
            (expect res).to-equal [3 4]

    describe 'prependM' ->
        fn = prepend-m
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
            |> prepend-m 4
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

    describe 'concat' ->
        fn = concat
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
            expect(-> src |> concat tgt).to-throw()
        test 'alias' ->
            precat-to   |> expect-to-equal concat
            precat |> expect-to-equal concat-to

    describe 'concatM' ->
        fn = concat-m
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
        test 'discards non-own vals on src' ->
            tgt = Object.create
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
        test 'discards non-own vals on tgt' ->
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

    describe 'merge' ->
        fn = merge
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
        test 'discards non-own vals on src' ->
            tgt = Object.create
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
        test 'discards non-own vals on tgt' ->
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

    describe 'mergeM' ->
        fn = merge-m
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

    describe 'mergeToWith' ->
        var tgt, src
        noop = ->
        describe 'main' ->
            var src, tgt
            before-each ->
                tgt := Object.create hidden1: 42
                    ..a = 1
                    ..b = 2
                src := Object.create hidden2: 42
                    ..c = 3
                    ..d = 4
            test 'when no collisions, acts like mergeTo M' ->
                src |> merge-to-with-noop-m tgt
                    |> expect-to-equal (src |> merge-to-m tgt)

            test 'when no collisions, acts like mergeTo M in' ->
                src |> merge-in-to-with-noop-m tgt
                    |> expect-to-equal (src |> merge-in-to-m tgt)

            test 'when no collisions, acts like mergeTo' ->
                src |> merge-to-with-noop tgt
                    |> expect-to-equal (src |> merge-to tgt)

            test 'when no collisions, acts like mergeTo in' ->
                src |> merge-in-to-with-noop tgt
                    |> expect-to-equal (src |> merge-in-to tgt)

        # --- testing all possible combinations is overkill.
        # suffice it to show that they can be composed with an arbitrary merge function and in an
        # various orders.
        describe 'with + when' ->
            var tgt, src
            src-odd = (a, b) -> odd a
            src-even = (a, b) -> even a
            tgt-odd = (a, b) -> odd b
            tgt-even = (a, b) -> even b
            # --- need to understand behavior of this xxx
            describe 'with then when' ->
                return
                before-each ->
                    tgt := Object.create hidden: 43
                        ..a = 20
                        ..b = 20
                    src := Object.create hidden: 42
                        ..b = 11
                        ..c = 12
                test 'with then when' ->
                    merger = merge-m |> merge-with choose-src |> merge-when src-odd
                    tgt |> merger src
                    tgt |> expect-to-equal do
                        a: 20
                        b: 11
                test 'when test is applied before with test' ->
                    tgt := Object.create hidden: 43
                        ..a = 20
                        ..b = 21
                    src := Object.create hidden: 42
                        ..b = 10
                        ..c = 12
                    merger = merge-m |> merge-with choose-src |> merge-when src-odd
                    tgt |> merger src
                    tgt |> expect-to-equal do
                        a: 20
                        b: 21
                test 'when test is applied before with test, 2' ->
                    tgt := Object.create hidden: 43
                        ..a = 20
                        ..b = 20
                    src := Object.create hidden: 42
                        ..b = 10
                        ..c = 12
                    merger = merge-m |> merge-with choose-src |> merge-when src-even
                    tgt |> merger src
                    tgt |> expect-to-equal do
                        a: 20
                        b: 10
                        c: 12
                test 'when test is applied before with test, 3' ->
                    tgt := Object.create hidden: 43
                        ..a = 20
                        ..b = 21
                    src := Object.create hidden: 42
                        ..b = 10
                        ..c = 12
                    merger = merge-m |> merge-with choose-src |> merge-when src-odd
                    tgt |> merger src
                    tgt |> expect-to-equal do
                        a: 20
                        b: 21
                test 'when test is applied before with test, 4' ->
                    tgt := Object.create hidden: 43
                        ..a = 20
                        ..b = 20
                    src := Object.create hidden: 42
                        ..b = 11
                        ..c = 12
                    merger = merge-m |> merge-with choose-src |> merge-when src-even
                    tgt |> merger src
                    tgt |> expect-to-equal do
                        a: 20
                        b: 20
                        c: 12
            # --- need to understand behavior of this xxx
            describe 'when then with' ->
                return
                test 'with then when' ->
                    tgt := Object.create hidden: 43
                        ..a = 20
                        ..b = 20
                    src := Object.create hidden: 42
                        ..b = 11
                        ..c = 12
                    merger = merge-m |> merge-when src-odd |> merge-with choose-src
                    tgt |> merger src
                    tgt |> expect-to-equal do
                        a: 20
                        b: 11
                test 'when test is applied before with test' ->
                    tgt := Object.create hidden: 43
                        ..a = 20
                        ..b = 21
                    src := Object.create hidden: 42
                        ..b = 10
                        ..c = 12
                    merger = merge-m |> merge-when src-odd |> merge-with choose-src
                    tgt |> merger src
                    tgt |> expect-to-equal do
                        a: 20
                        b: 21
                test 'when test is applied before with test, 2' ->
                    tgt := Object.create hidden: 43
                        ..a = 20
                        ..b = 20
                    src := Object.create hidden: 42
                        ..b = 10
                        ..c = 12
                    merger = merge-m |> merge-when src-even |> merge-with choose-src
                    tgt |> merger src
                    tgt |> expect-to-equal do
                        a: 20
                        b: 10
                        c: 12
                test 'when test is applied before with test, 3' ->
                    tgt := Object.create hidden: 43
                        ..a = 20
                        ..b = 21
                    src := Object.create hidden: 42
                        ..b = 10
                        ..c = 12
                    merger = merge-m |> merge-when src-odd |> merge-with choose-src
                    tgt |> merger src
                    tgt |> expect-to-equal do
                        a: 20
                        b: 21
                test 'when test is applied before with test, 4' ->
                    tgt := Object.create hidden: 43
                        ..a = 20
                        ..b = 20
                    src := Object.create hidden: 42
                        ..b = 11
                        ..c = 12
                    merger = merge-m |> merge-when tgt-even |> merge-with choose-src
                    tgt |> merger src
                    tgt |> expect-to-equal do
                        a: 20
                        b: 20
                        c: 12

        describe 'collisions' ->
            var tgt, src
            before-each ->
                tgt := Object.create hidden: 43
                    ..a = 'target a'
                    ..b = 'target b'
                src := Object.create hidden: 42
                    ..b = 'source b'
                    ..c = 'source c'
            test 'choose target M' ->
                src |> merge-to-choose-tgt-m tgt
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'target b'
                    c: 'source c'
            test 'choose source M' ->
                src |> merge-to-choose-src-m tgt
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'source b'
                    c: 'source c'
            test 'choose target' ->
                src |> merge-to-choose-tgt tgt
                    |> expect-to-equal do
                        a: 'target a'
                        b: 'target b'
                        c: 'source c'
            test 'choose source' ->
                src |> merge-to-choose-src tgt
                    |> expect-to-equal do
                        a: 'target a'
                        b: 'source b'
                        c: 'source c'


            test 'choose target M in' ->
                src |> merge-in-to-choose-tgt-m tgt
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'target b'
                    c: 'source c'
                    hidden: 43
            test 'choose source M in' ->
                src |> merge-in-to-choose-src-m tgt
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'source b'
                    c: 'source c'
                    hidden: 42
            test 'choose target in' ->
                src |> merge-in-to-choose-tgt tgt
                    |> expect-to-equal do
                        a: 'target a'
                        b: 'target b'
                        c: 'source c'
                        hidden: 43
            test 'choose source in' ->
                src |> merge-in-to-choose-src tgt
                    |> expect-to-equal do
                        a: 'target a'
                        b: 'source b'
                        c: 'source c'
                        hidden: 42

        # --- not sure this is necessary.
        describe 'no collision' ->
            var tgt, src
            before-each ->
                tgt := Object.create hidden: 43
                    ..a = 'target a'
                    ..b = 'target b'
                src := Object.create hidden: 42
                    ..c = 'source c'

            test 'collision f is not called M' ->
                src |> merge-to-with-null-m tgt
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'target b'
                    c: 'source c'

            test 'collision f is not called' ->
                src |> merge-to-with-null tgt
                    |> expect-to-equal do
                        a: 'target a'
                        b: 'target b'
                        c: 'source c'

    describe 'mergeWith' ->
        var tgt, src
        noop = ->
        describe 'main' ->
            before-each ->
                tgt = Object.create hidden1: 42
                    ..a = 1
                    ..b = 2
                src = Object.create hidden2: 42
                    ..c = 3
                    ..d = 4
            test 'when no collisions, acts like merge M' ->
                tgt |> merge-with-noop-m src
                    |> expect-to-equal (tgt |> merge-m src)
            test 'when no collisions, acts like merge' ->
                tgt |> merge-with-noop src
                    |> expect-to-equal (tgt |> merge src)
            test 'when no collisions, acts like merge M in' ->
                tgt |> merge-in-with-noop-m src
                    |> expect-to-equal (tgt |> merge-in-m src)
            test 'when no collisions, acts like merge in' ->
                tgt |> merge-in-with-noop src
                    |> expect-to-equal (tgt |> merge-in src)

        describe 'collisions' ->
            var tgt, src
            before-each ->
                tgt := Object.create hidden: 43
                    ..a = 'target a'
                    ..b = 'target b'
                src := Object.create hidden: 42
                    ..b = 'source b'
                    ..c = 'source c'
            test 'choose target M' ->
                tgt |> merge-choose-tgt-m src
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'target b'
                    c: 'source c'
            test 'choose source M' ->
                tgt |> merge-choose-src-m src
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'source b'
                    c: 'source c'
            test 'choose target' ->
                tgt |> merge-choose-tgt src
                    |> expect-to-equal do
                        a: 'target a'
                        b: 'target b'
                        c: 'source c'
            test 'choose source' ->
                tgt |> merge-choose-src src
                    |> expect-to-equal do
                        a: 'target a'
                        b: 'source b'
                        c: 'source c'

            test 'choose target M in' ->
                tgt |> merge-in-choose-tgt-m src
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'target b'
                    c: 'source c'
                    hidden: 43
            test 'choose source M in' ->
                tgt |> merge-in-choose-src-m src
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'source b'
                    c: 'source c'
                    hidden: 42
            test 'choose target in' ->
                tgt |> merge-in-choose-tgt src
                    |> expect-to-equal do
                        a: 'target a'
                        b: 'target b'
                        c: 'source c'
                        hidden: 43
            test 'choose source' ->
                tgt |> merge-in-choose-src src
                    |> expect-to-equal do
                        a: 'target a'
                        b: 'source b'
                        c: 'source c'
                        hidden: 42

        # --- not sure this is necessary.
        describe 'no collision' ->
            var tgt, src
            before-each ->
                tgt := Object.create hidden: 'target hidden'
                    ..a = 'target a'
                # --- src prototype is discarded anyway.
                src :=
                    b: 'source b'
                    c: 'source c'
                    hidden: 'source hidden'
            test 'proto chain of target is not checked M' ->
                tgt |> merge-with-null-m src
                tgt |> expect-to-equal do
                    a: 'target a'
                    b: 'source b'
                    c: 'source c'
                    hidden: 'source hidden'
            test 'proto chain of target is not checked' ->
                tgt |> merge-with-null src
                    |> expect-to-equal do
                        a: 'target a'
                        b: 'source b'
                        c: 'source c'
                        hidden: 'source hidden'

    describe 'mergeToIn' ->
        fn = merge-in-to
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

    describe 'mergeIn' ->
        fn = merge-in
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

    describe 'merge*WhenM' ->
        base = base-val: 10
        var tgt
        var src
        src-ok = (s, _) -> s?
        tgt-ok = (_, t) -> t?
        before-each ->
            tgt := (Object.create base) <<< a: 1 b: 2 c: null
            src := (Object.create base) <<< a: 3 b: null c: 4
        test 1 ->
            src |> merge-to-when-src-ok-m tgt
            tgt |> expect-to-equal a: 3 b: 2 c: 4
        test 2 ->
            src |> merge-to-when-tgt-ok-m tgt
            tgt |> expect-to-equal a: 3 b: null c: null
        test 3 ->
            tgt |> merge-when-src-ok-m src
            tgt |> expect-to-equal a: 3 b: 2 c: 4
        test 4 ->
            tgt |> merge-when-tgt-ok-m src
            tgt |> expect-to-equal a: 3 b: null c: null

    describe 'merge*When' ->
        base = base-val: 10
        tgt = (Object.create base) <<< a: 1 b: 2 c: null
        src = (Object.create base) <<< a: 3 b: null c: 4
        test 1 ->
            src |> merge-to-when-src-ok tgt
                |> expect-to-equal a: 3 b: 2 c: 4
        test 2 ->
            src |> merge-to-when-tgt-ok tgt
                |> expect-to-equal a: 3 b: null c: null
        test 3 ->
            tgt |> merge-when-src-ok src
                |> expect-to-equal a: 3 b: 2 c: 4
        test 4 ->
            tgt |> merge-when-tgt-ok src
                |> expect-to-equal a: 3 b: null c: null

    describe 'mergeToInM' ->
        fn = merge-in-to-m
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

    describe 'mergeInM' ->
        fn = merge-in-m
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
