{
    assoc, assocPath, head, tail, reduceRight, chain, identity: id, reduce, map, filter, join, split, prop: rProp, path: rPath, defaultTo: rDefaultTo, curry, forEach: each, complement, isNil,
    repeat: rRepeat,
    times: r-times,
    reverse,
    tap,
    flip,
    zip,
} = require 'ramda'

{ odd, even } = require 'prelude-ls'

{
    list,
    test, xtest,
    expect-to-equal, expect-to-be,
} = require './common'

{
    ok, not-ok,
    is-true, is-false,
    is-yes, is-no, is-truthy, is-falsey,

    if-predicate, when-predicate, if-predicate__,

    if-ok, when-ok,
    if-not-ok, when-not-ok,
    if-true, when-true,
    if-false, when-false,
    if-yes, when-yes,
    if-truthy, when-truthy,
    if-no, when-no,
    if-falsey, when-falsey,

    if-has, when-has, if-has-in, when-has-in,
    if-bind, when-bind,

    cond,

    # --- @deprecated
    if-ok__, if-true__, if-false__,
    if-yes__, if-no__,

} = require '../index'

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

do-test-double-arm = ({ fn, is__ }, { desc, input-val, expect-branch, }) --> test desc, ->
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

    ret |> expect-to-equal expected-ret

do-test-single-arm = ({ fn, is__ }, { desc, input-val, expect-branch, }) --> test desc, ->
    ja = jest.fn()
        ..mock-implementation (x) -> [x] * 3

    ret =
        if not is__ then input-val |> fn ja
        else fn input-val, ja

    [expected-ret, expected-calls-ja] =
        if expect-branch == 'ja' then [[input-val] * 3, 1]
        else [void 0]

    ja.mock.calls.length |> expect-to-equal expected-calls-ja

    ret |> expect-to-equal expected-ret

describe 'whenPredicate' ->
    describe-spec =
        fn: when-predicate (> 3)
        is__: false

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

    tests2 = list do
        *   desc: 'exact truth, not truthy'
            input-val: 3
            expect-branch: 'nee'
            num-arms: 2

    do-tests describe-spec2, tests2

    test 'anaphoric' ->
        3 |> if-predicate odd, (+ 1), (- 1)
          |> expect-to-equal 4
        3 |> if-predicate even, (+ 1), (- 1)
          |> expect-to-equal 2
        3 |> when-predicate odd, (+ 1)
          |> expect-to-equal 4
        3 |> when-predicate even, (+ 1)
          |> expect-to-equal void

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

describe 'whenNotOk' ->
    describe-spec =
        fn: when-not-ok
        is__: false

    tests = list do
        *   desc: 'true'
            input-val: true
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
            expect-branch: 'ja'
            num-arms: 1
        *   desc: 'null'
            input-val: null
            expect-branch: 'ja'
            num-arms: 1

    do-tests describe-spec, tests

describe 'ifNotOk' ->
    describe-spec =
        fn: if-not-ok
        is__: false

    tests = list do
        *   desc: 'true'
            input-val: true
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
        *   desc: 'undefined'
            input-val: void
            expect-branch: 'ja'
            num-arms: 2
        *   desc: 'null'
            input-val: null
            expect-branch: 'ja'
            num-arms: 2

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

    test 'alias whenTruthy' ->
        when-yes |> expect-to-equal when-truthy

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

    test 'alias ifTruthy' ->
        if-yes |> expect-to-equal if-truthy

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

    test 'alias whenFalsey' ->
        when-no |> expect-to-equal when-falsey

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

    test 'alias ifFalsey' ->
        if-no |> expect-to-equal if-falsey

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

describe 'is/isNot' ->
    test 'ok' ->
        true |> ok |> expect-to-equal true
        false |> ok |> expect-to-equal true
        void |> ok |> expect-to-equal false
        null |> ok |> expect-to-equal false
    test 'notOk' ->
        true |> not-ok |> expect-to-equal false
        false |> not-ok |> expect-to-equal false
        void |> not-ok |> expect-to-equal true
        null |> not-ok |> expect-to-equal true
    test 'isTrue' ->
        true |> is-true |> expect-to-equal true
        1 |> is-true |> expect-to-equal false
        0 |> is-true |> expect-to-equal false
        '1' |> is-true |> expect-to-equal false
        false |> is-true |> expect-to-equal false
        void |> is-true |> expect-to-equal false
        null |> is-true |> expect-to-equal false
    test 'isFalse' ->
        false |> is-false |> expect-to-equal true
        true |> is-false |> expect-to-equal false
        0 |> is-false |> expect-to-equal false
        1 |> is-false |> expect-to-equal false
        '1' |> is-false |> expect-to-equal false
        void |> is-false |> expect-to-equal false
        null |> is-false |> expect-to-equal false
    test 'isYes' ->
        true |> is-yes |> expect-to-equal true
        1 |> is-yes |> expect-to-equal true
        '1' |> is-yes |> expect-to-equal true
        '2' |> is-yes |> expect-to-equal true
        '0' |> is-yes |> expect-to-equal true
        '' |> is-yes |> expect-to-equal false
        0 |> is-yes |> expect-to-equal false
        false |> is-yes |> expect-to-equal false
        void |> is-yes |> expect-to-equal false
        null |> is-yes |> expect-to-equal false
    test 'isNo' ->
        true |> is-no |> expect-to-equal false
        1 |> is-no |> expect-to-equal false
        '1' |> is-no |> expect-to-equal false
        '2' |> is-no |> expect-to-equal false
        '0' |> is-no |> expect-to-equal false
        '' |> is-no |> expect-to-equal true
        0 |> is-no |> expect-to-equal true
        false |> is-no |> expect-to-equal true
        void |> is-no |> expect-to-equal true
        null |> is-no |> expect-to-equal true
    test 'aliases' ->
        is-no |> expect-to-equal is-falsey
        is-yes |> expect-to-equal is-truthy

describe 'if/when has/hasIn' ->
    base = water: 'wet' nothing: void me: 'ik'
    extended = (Object.create base) <<<
        baby: 'feet'
    describe 'if-has' ->
        test 'main' ->
            [base, 'water'] |> if-has do
                (v, o, k) -> v + k + o.me
                -> 42
            |> expect-to-equal 'wetwaterik'
        test 'has undefined (should be true)' ->
            [base, 'nothing'] |> if-has do
                (v, o, k) -> 41
                -> 42
            |> expect-to-equal 41
        test 'nonexistent' ->
            [base, 'nada'] |> if-has do
                (v, o, k) -> 41
                -> 42
            |> expect-to-equal 42
        test 'extended' ->
            [extended, 'water'] |> if-has do
                (v, o, k) -> 41
                -> 42
            |> expect-to-equal 42
        test 'extended' ->
            [extended, 'baby'] |> if-has do
                (v, o, k) -> 41
                -> 42
            |> expect-to-equal 41
    describe 'when-has' ->
        test 'main' ->
            [base, 'water'] |> when-has do
                (v, o, k) -> v + k + o.me
            |> expect-to-equal 'wetwaterik'
        test 'has undefined (should be true)' ->
            [base, 'nothing'] |> when-has do
                (v, o, k) -> 41
            |> expect-to-equal 41
        test 'nonexistent' ->
            [base, 'nada'] |> when-has do
                (v, o, k) -> 41
            |> expect-to-equal void
        test 'extended' ->
            [extended, 'water'] |> when-has do
                (v, o, k) -> 41
            |> expect-to-equal void
        test 'extended' ->
            [extended, 'baby'] |> when-has do
                (v, o, k) -> 41
            |> expect-to-equal 41
    describe 'if-has-in' ->
        test 'main' ->
            [base, 'water'] |> if-has-in do
                (v, o, k) -> v + k + o.me
                -> 42
            |> expect-to-equal 'wetwaterik'
        test 'has-in undefined (should be true)' ->
            [base, 'nothing'] |> if-has-in do
                (v, o, k) -> 41
                -> 42
            |> expect-to-equal 41
        test 'nonexistent' ->
            [base, 'nada'] |> if-has-in do
                (v, o, k) -> 41
                -> 42
            |> expect-to-equal 42
        test 'extended' ->
            [extended, 'water'] |> if-has-in do
                (v, o, k) -> 41
                -> 42
            |> expect-to-equal 41
        test 'extended' ->
            [extended, 'baby'] |> if-has-in do
                (v, o, k) -> 41
                -> 42
            |> expect-to-equal 41
    describe 'when-has-in' ->
        test 'main' ->
            [base, 'water'] |> when-has-in do
                (v, o, k) -> v + k + o.me
            |> expect-to-equal 'wetwaterik'
        test 'has-in undefined (should be true)' ->
            [base, 'nothing'] |> when-has-in do
                (v, o, k) -> 41
            |> expect-to-equal 41
        test 'nonexistent' ->
            [base, 'nada'] |> when-has-in do
                (v, o, k) -> 41
            |> expect-to-equal void
        test 'extended' ->
            [extended, 'water'] |> when-has-in do
                (v, o, k) -> 41
            |> expect-to-equal 41
        test 'extended' ->
            [extended, 'baby'] |> when-has-in do
                (v, o, k) -> 41
            |> expect-to-equal 41
