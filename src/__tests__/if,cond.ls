{
    assoc, assocPath, head, tail, reduceRight, chain, identity: id, reduce, map, filter, join, split, prop: rProp, path: rPath, defaultTo: rDefaultTo, curry, forEach: each, complement, isNil,
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
    if-predicate, when-predicate, if-predicate__,

    if-ok, when-ok, if-ok__,
    if-true, when-true, if-true__,
    if-false, when-false, if-false__,
    if-yes, when-yes, if-yes__,
    if-no, when-no, if-no__,

    if-function, when-function, if-function__,
    if-length-one, when-length-one, if-length-one__,
    if-empty, when-empty, if-empty__,

    cond,

} = require '../index'

# --- @todo test anaphoric

# --- note that num-arms is part of the test spec, not describe spec
# (because of the __ variants).

do-tests = (describe-spec, tests) -->
    tests |> each (test-spec) ->
        num-arms = delete test-spec.num-arms ? 1
        the-test = if num-arms == 2 then do-test-double-arm else do-test-single-arm
        the-test describe-spec, test-spec

# --- mocks return unlikely vals based on input-val
# --- for all tests, count the number of calls to ja/nee mock
# --- for anaphoric ones, also check that ja/nee were passed input and
# therefore return the expected value.

do-test-double-arm = ({ fn, is__, anaphoric = true }, { desc, input-val, expect-branch, }) --> test desc, ->
    ja = jest.fn()
        ..mock-implementation (x) -> [x] * 3
    nee = jest.fn()
        ..mock-implementation (x) -> [x] * 4

    ret =
        # --- also ensures that currying works.
        if not is__ then input-val |> fn ja, nee
        else fn input-val, ja, nee

    [expected-ret, expected-calls-ja, expected-calls-nee] =
        if expect-branch == 'ja' then [[input-val] * 3, 1, 0]
        else [[input-val] * 4, 0, 1]

    ja.mock.calls.length |> expect-to-equal expected-calls-ja
    nee.mock.calls.length |> expect-to-equal expected-calls-nee

    if anaphoric then ret |> expect-to-equal expected-ret

do-test-single-arm = ({ fn, is__, anaphoric = true }, { desc, input-val, expect-branch, }) --> test desc, ->
    ja = jest.fn()
        ..mock-implementation (x) -> [x] * 3

    ret =
        if not is__ then input-val |> fn ja
        else fn input-val, ja

    [expected-ret, expected-calls-ja] =
        if expect-branch == 'ja' then [[input-val] * 3, 1]
        else [void 0]

    ja.mock.calls.length |> expect-to-equal expected-calls-ja

    if anaphoric then ret |> expect-to-equal expected-ret

# --- @todo: remove anaphoric (they are all anaphoric)
describe 'whenPredicate' ->
    describe-spec =
        fn: when-predicate (> 3)
        is__: false
        anaphoric: true

    tests = list do
        *   desc: '4'
            input-val: 4
            expect-branch: 'ja'
            num-arms: 1
        *   desc: '3'
            input-val: 3
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'null'
            input-val: null
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec, tests

    describe-spec2 =
        fn: when-predicate id
        is__: false
        anaphoric: true

    tests2 = list do
        *   desc: 'exact truth, not truthy'
            input-val: 3
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec2, tests2

describe 'ifPredicate' ->
    describe-spec =
        fn: if-predicate (> 3)
        is__: false
        anaphoric: true

    tests = list do
        *   desc: '4'
            input-val: 4
            expect-branch: 'ja'
            num-arms: 2
        *   desc: '3'
            input-val: 3
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'null'
            input-val: null
            expect-branch: 'nee'
            num-arms: 2

    do-tests describe-spec, tests

    describe-spec2 =
        fn: if-predicate id
        is__: false
        anaphoric: true

    tests2 = list do
        *   desc: 'exact truth, not truthy'
            input-val: 3
            expect-branch: 'nee'
            num-arms: 2

    do-tests describe-spec2, tests2

describe 'ifPredicate__' ->
    describe-spec =
        fn: -> if-predicate__ ...[(> 3), ...&]
        is__: true

    tests = list do
        *   desc: '4'
            input-val: 4
            expect-branch: 'ja'
            num-arms: 2
        *   desc: '3'
            input-val: 3
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'null'
            input-val: null
            expect-branch: 'nee'
            num-arms: 2

    do-tests describe-spec, tests

    describe-spec2 =
        fn: -> if-predicate__ ...[id, ...&]
        is__: true

    tests2 = list do
        *   desc: 'exact truth, not truthy'
            input-val: 3
            expect-branch: 'nee'
            num-arms: 2

    do-tests describe-spec2, tests2

describe 'whenOk' ->
    describe-spec =
        fn: when-ok
        is__: false

    tests = list do
        *   desc: 'true'
            input-val: true
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'false'
            input-val: false
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'empty string'
            input-val: ''
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'undefined'
            input-val: void
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'null'
            input-val: null
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec, tests

describe 'ifOk' ->
    describe-spec =
        fn: if-ok
        is__: false

    tests = list do
        *   desc: 'true'
            input-val: true
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'false'
            input-val: false
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'empty string'
            input-val: ''
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'undefined'
            input-val: void
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'null'
            input-val: null
            expect-branch: 'nee'
            num-arms: 2

    do-tests describe-spec, tests

describe 'ifOk__' ->
    describe-spec =
        fn: if-ok__
        is__: true

    tests = list do
        *   desc: 'true'
            input-val: true
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'true, no else'
            input-val: true
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'false'
            input-val: false
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'false, no else'
            input-val: false
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'undefined'
            input-val: void
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'undefined, no else'
            input-val: void
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'null'
            input-val: null
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'null, no else'
            input-val: null
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec, tests

describe 'whenTrue' ->
    describe-spec =
        fn: when-true
        is__: false

    tests = list do
        *   desc: 'true'
            input-val: true
            expect-branch: 'ja'
            num-arms: 1
        *   desc: '3'
            input-val: 3
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'false'
            input-val: false
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'empty string'
            input-val: ''
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'undefined'
            input-val: void
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec, tests

describe 'ifTrue' ->
    describe-spec =
        fn: if-true
        is__: false

    tests = list do
        *   desc: 'true'
            input-val: true
            expect-branch: 'ja'
            num-arms: 2
        *   desc: '3'
            input-val: 3
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'false'
            input-val: false
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'empty string'
            input-val: ''
            expect-branch: 'nee'
            num-arms: 2

    do-tests describe-spec, tests

describe 'ifTrue__' ->
    describe-spec =
        fn: if-true__
        is__: true

    tests = list do
        *   desc: 'true'
            input-val: true
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'true, no else'
            input-val: true
            expect-branch: 'ja'
            num-arms: 1
        *   desc: '3'
            input-val: 3
            expect-branch: 'nee'
            num-arms: 2
        *   desc: '3, no else'
            input-val: 3
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'false'
            input-val: false
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'false, no else'
            input-val: false
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec, tests

describe 'whenFalse' ->
    describe-spec =
        fn: when-false
        is__: false

    tests = list do
        *   desc: 'false'
            input-val: false
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'true'
            input-val: true
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'empty string'
            input-val: ''
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'undefined'
            input-val: void
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec, tests

describe 'ifFalse' ->
    describe-spec =
        fn: if-false
        is__: false

    tests = list do
        *   desc: 'false'
            input-val: false
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'true'
            input-val: true
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'empty string'
            input-val: ''
            expect-branch: 'nee'
            num-arms: 2

    do-tests describe-spec, tests

describe 'ifFalse__' ->
    describe-spec =
        fn: if-false__
        is__: true

    tests = list do
        *   desc: 'false'
            input-val: false
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'false, no else'
            input-val: false
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'true'
            input-val: true
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'true, no else'
            input-val: true
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec, tests

describe 'whenYes' ->
    describe-spec =
        fn: when-yes
        is__: false

    tests = list do
        *   desc: 'true'
            input-val: true
            expect-branch: 'ja'
            num-arms: 1
        *   desc: '3'
            input-val: 3
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'false'
            input-val: false
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'empty string'
            input-val: ''
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'undefined'
            input-val: void
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec, tests

describe 'ifYes' ->
    describe-spec =
        fn: if-yes
        is__: false

    tests = list do
        *   desc: 'true'
            input-val: true
            expect-branch: 'ja'
            num-arms: 2
        *   desc: '3'
            input-val: 3
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'false'
            input-val: false
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'empty string'
            input-val: ''
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'undefined'
            input-val: void
            expect-branch: 'nee'
            num-arms: 2

    do-tests describe-spec, tests

describe 'ifYes__' ->
    describe-spec =
        fn: if-yes__
        is__: true

    tests = list do
        *   desc: 'true'
            input-val: true
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'true, no else'
            input-val: true
            expect-branch: 'ja'
            num-arms: 1
        *   desc: '3'
            input-val: 3
            expect-branch: 'ja'
            num-arms: 2
        *   desc: '3, no else'
            input-val: 3
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'false'
            input-val: false
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'false, no else'
            input-val: false
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec, tests

describe 'whenNo' ->
    describe-spec =
        fn: when-no
        is__: false

    tests = list do
        *   desc: 'true'
            input-val: true
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'false'
            input-val: false
            expect-branch: 'ja'
            num-arms: 1
        *   desc: '3'
            input-val: 3
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'empty string'
            input-val: ''
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'undefined'
            input-val: void
            expect-branch: 'ja'
            num-arms: 1

    do-tests describe-spec, tests

describe 'ifNo' ->
    describe-spec =
        fn: if-no
        is__: false

    tests = list do
        *   desc: 'true'
            input-val: true
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'false'
            input-val: false
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'empty string'
            input-val: ''
            expect-branch: 'ja'
            num-arms: 2
        *   desc: '3'
            input-val: 3
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'undefined'
            input-val: void
            expect-branch: 'ja'
            num-arms: 2

    do-tests describe-spec, tests

describe 'ifNo__' ->
    describe-spec =
        fn: if-no__
        is__: true

    tests = list do
        *   desc: 'true'
            input-val: true
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'true, no else'
            input-val: true
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'false'
            input-val: false
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'false, no else'
            input-val: false
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'empty string'
            input-val: ''
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'empty string, no else'
            input-val: ''
            expect-branch: 'ja'
            num-arms: 1

    do-tests describe-spec, tests



describe 'whenFunction' ->
    describe-spec =
        fn: when-function
        is__: false

    tests = list do
        *   desc: 'function'
            input-val: ->
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'false'
            input-val: false
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'empty string'
            input-val: ''
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'undefined'
            input-val: void
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'array'
            input-val: []
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec, tests

describe 'ifFunction' ->
    describe-spec =
        fn: if-function
        is__: false

    tests = list do
        *   desc: 'function'
            input-val: ->
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'false'
            input-val: false
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'empty string'
            input-val: ''
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'array'
            input-val: []
            expect-branch: 'nee'
            num-arms: 2

    do-tests describe-spec, tests

describe 'ifFunction__' ->
    describe-spec =
        fn: if-function__
        is__: true

    tests = list do
        *   desc: 'function'
            input-val: ->
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'function, no else'
            input-val: ->
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'false'
            input-val: false
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'false, no else'
            input-val: false
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'array'
            input-val: []
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'array, no else'
            input-val: []
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec, tests

describe 'whenLengthOne' ->
    describe-spec =
        fn: when-length-one
        is__: false

    tests = list do
        *   desc: 'array n = 1'
            input-val: [9]
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'array n = 0'
            input-val: []
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec, tests

describe 'ifLengthOne' ->
    describe-spec =
        fn: if-length-one
        is__: false

    tests = list do
        *   desc: 'array n = 1'
            input-val: [9]
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'array n = 0'
            input-val: []
            expect-branch: 'nee'
            num-arms: 2

    do-tests describe-spec, tests

describe 'ifLengthOne__' ->
    describe-spec =
        fn: if-length-one__
        is__: true

    tests = list do
        *   desc: 'array n = 1'
            input-val: [9]
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'array n = 1, no else'
            input-val: [9]
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'array n = 0'
            input-val: []
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'array n = 0, no else'
            input-val: []
            expect-branch: 'nee'
            num-arms: 1

    do-tests describe-spec, tests

describe 'whenEmpty' ->
    describe-spec =
        fn: when-empty
        is__: false

    tests = list do
        *   desc: 'array n = 1'
            input-val: [9]
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'array n = 0'
            input-val: []
            expect-branch: 'ja'
            num-arms: 1

    do-tests describe-spec, tests

describe 'ifEmpty' ->
    describe-spec =
        fn: if-empty
        is__: false

    tests = list do
        *   desc: 'array n = 1'
            input-val: [9]
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'array n = 0'
            input-val: []
            expect-branch: 'ja'
            num-arms: 2

    do-tests describe-spec, tests

describe 'ifEmpty__' ->
    describe-spec =
        fn: if-empty__
        is__: true

    tests = list do
        *   desc: 'array n = 1'
            input-val: [9]
            expect-branch: 'nee'
            num-arms: 2
        *   desc: 'array n = 1, no else'
            input-val: [9]
            expect-branch: 'nee'
            num-arms: 1
        *   desc: 'array n = 0'
            input-val: []
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'array n = 0, no else'
            input-val: []
            expect-branch: 'ja'
            num-arms: 1

    do-tests describe-spec, tests

describe 'cond' ->
    test 1 ->
        'lions' |> cond [
            [
                (str) -> str === 'lions'
                -> 'feet'
            ]
            [
                (str) -> str === 'tigers'
                -> 'heads'
            ]
            [
                void
                (target) -> 'no match on ' + target
            ]
        ]
        |> expect-to-equal 'feet'
    test 2 ->
        'tigers' |> cond [
            [
                (str) -> str === 'lions'
                -> 'feet'
            ]
            [
                (str) -> str === 'tigers'
                -> 'heads'
            ]
            [
                void
                (target) -> 'no match on ' + target
            ]
        ]
        |> expect-to-equal 'heads'
    test 'lazy, in order' ->
        mock = jest.fn()
        'lions' |> cond [
            [
                (str) -> str === 'lions'
                -> 'feet'
            ]
            [
                (str) -> str === 'tigers'
                mock
            ]
            [
                void
                (target) -> 'no match on ' + target
            ]
        ]
        mock.mock.calls.length
        |> expect-to-equal 0
    test 3 ->
        'beetles' |> cond [
            [
                (str) -> str === 'lions'
                -> 'feet'
            ]
            [
                (str) -> str === 'tigers'
                -> 'heads'
            ]
            [
                void
                (target) -> 'no match on ' + target
            ]
        ]
        |> expect-to-equal 'no match on beetles'

describe 'cond strict' ->
    xtest 1 ->
        cond-strict [
            [
                1 + 1 == 3
                -> 'hands'
            ]
            [
                1 + 1 == 2
                -> 'nails'
            ]
            [
                void
                -> 'no match'
            ]
        ]

describe 'cond non-strict' ->
    xtest 1 ->
        cond-non-strict [
            [
                -> 1 + 1 == 3
                -> 'hands'
            ]
            [
                -> 1 + 1 == 2
                -> 'nails'
            ]
            [
                void
                -> 'no match'
            ]
        ]





