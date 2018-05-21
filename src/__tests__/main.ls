{
    assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, prop: rProp, path: rPath, defaultTo: rDefaultTo, forEach: each, complement, isNil,
    repeat: rRepeat,
    times: r-times,
    join: r-join,
    split: r-split,
    reverse,
    tap,
    zip,
    sum,
    equals: r-equals,
    identical: r-identical,
    curry,
} = require 'ramda'

{
    list,
    test, xtest,
    expect-to-equal, expect-to-be,
    expect-to-throw, expect-not-to-throw,
    expect-to-be-instance-of,
} = require './common'

{
    eq, ne, gt, gte, lt, lte,

    bind-prop-to, bind-prop, bind-to, bind,
    bind-try-prop-to, bind-try-prop, bind-try-to, bind-try,

    noop,
    not: stick-not,
    roll, recurry,

    cascade,
    flip, flip3, flip4, flip5,
    sprintf1, sprintf-n,

    let-v, let-n-v,
    laat, let2, let3, let4, let5, let6,
    let-n, let-s,

    zip-all,

    is-type, get-type,
    is-function, is-array, is-object,
    is-number, is-reg-exp, is-boolean, is-string,
    is-integer,

    range-from, range-to,
    range-from-by, range-to-by,
    range-from-by-asc, range-from-by-desc,

    neu, neu1, neu2, neu3, neu4, neu5, neu-n,

    x-reg-exp, x-reg-exp-str, x-reg-exp-flags,
    x-match, x-match-str, x-match-str-flags,
    match: stick-match,
    x-match-global,
    x-replace, x-replace-str, x-replace-str-flags,

    if-replace, if-x-replace, if-x-replace-str, if-x-replace-str-flags,

    blush, always, T, F,
    bind-late-prop-to, bind-late-prop,

    subtract-from, subtract, minus,
    add, plus,
    multiply, divide-by, divide-into,
    modulo, modulo-whole-part,
    to-the,

    repeat-v, repeat-f, repeat-side,
    times-v, times-f, times-side,

} = main = require '../index'

sum-all = list >> sum

describe 'noop, not' ->
    test 'noop' ->
        noop ()  |> expect-to-equal void
        noop 5   |> expect-to-equal void
        noop [4] |> expect-to-equal void
    test 'not' ->
        3     |> stick-not |> expect-to-equal false
        true  |> stick-not |> expect-to-equal false
        false |> stick-not |> expect-to-equal true
        ''    |> stick-not |> expect-to-equal true
        '0'   |> stick-not |> expect-to-equal false
describe 'recurry, roll' ->
    f = (a) -> (b) -> (c) -> (d) -> (e) -> (f) ->
        a + b + c + d + e + f
    g = curry (a, b, c, d, e, f) -> a + b + c + d + e + f
    describe 'roll a manually curried function' ->
        r = roll f
        test 1 ->
            r 3 4 5 6 7 8 |> expect-to-equal 33
        test 'too few args, result can be called using manual style' ->
            (r 3 4 5 6 7) 8 |> expect-to-equal 33
            (((r 3 4 5) 6) 7) 8 |> expect-to-equal 33
        test 'too few args, result can not be called using normal style' ->
            (r 3 4 5) 6 7 8 |> expect-to-be-instance-of Function
        test 'arity of rolled is 0 (not well-defined)' ->
            r.length |> expect-to-equal 0
        test 'arity of partial is always 1 (due to manual currying)' ->
            (r 3 4 5).length |> expect-to-equal 1
    describe 'roll a ramda curried function' ->
        r = roll g
        test 1 ->
            r 3 4 5 6 7 8 |> expect-to-equal 33
        test 'too few args, result can be called using manual style' ->
            (r 3 4 5 6 7) 8 |> expect-to-equal 33
            (((r 3 4 5) 6) 7) 8 |> expect-to-equal 33
        test 'too few args, result can be called using normal style' ->
            (r 3 4 5) 6 7 8 |> expect-to-equal 33
        test 'arity works the normal way' ->
            (r 3 4).length |> expect-to-equal 4
    describe 'recurry a manually curried function' ->
        r = (recurry 6) f
        test 'manual style' ->
            (((((r 3) 4) 5) 6) 7) 8 |> expect-to-equal 33
        test 'normal style' ->
            (r 3 4 5) 6 7 8 |> expect-to-equal 33
            ((r 3 4 5) 6 7) 8 |> expect-to-equal 33
            (((r 3) 4 5) 6) 7 8 |> expect-to-equal 33
        test 'arity is 0 (not well-defined)' ->
            r.length |> expect-to-equal 0

describe 'comparisons' ->
    describe 'eq' ->
        test 1 ->
            3 |> eq 3 |> expect-to-equal true
            4 |> eq 3 |> expect-to-equal false
        test 'unlike ramda equals' ->
            [] |> r-equals [] |> expect-to-equal true
            [] |> eq [] |> expect-to-equal false
        test 'unlike ramda identical' ->
            0 |> r-identical -0 |> expect-to-equal false
            0 |> eq -0 |> expect-to-equal true
    describe 'ne' ->
        test 1 ->
            3 |> ne 3 |> expect-to-equal false
            4 |> ne 3 |> expect-to-equal true
    describe 'gt' ->
        test 1 ->
            3 |> gt 2 |> expect-to-equal true
            3 |> gt 3 |> expect-to-equal false
            3 |> gt 4 |> expect-to-equal false
    describe 'gte' ->
        test 1 ->
            3 |> gte 2 |> expect-to-equal true
            3 |> gte 3 |> expect-to-equal true
            3 |> gte 4 |> expect-to-equal false
    describe 'lt' ->
        test 1 ->
            3 |> lt 2 |> expect-to-equal false
            3 |> lt 3 |> expect-to-equal false
            3 |> lt 4 |> expect-to-equal true
    describe 'lte' ->
        test 1 ->
            3 |> lte 2 |> expect-to-equal false
            3 |> lte 3 |> expect-to-equal true
            3 |> lte 4 |> expect-to-equal true

describe 'math' ->
    test 'subtract' ->
        3 |> subtract-from 5 |> expect-to-equal 2
        5 |> subtract 3 |> expect-to-equal 2
        5 |> minus 3 |> expect-to-equal 2
    test 'add' ->
        3 |> plus 5 |> expect-to-equal 8
        3 |> add 5 |> expect-to-equal 8
    test 'multiply' ->
        3 |> multiply 5 |> expect-to-equal 15
    test 'divide' ->
        3 |> divide-by 5 |> expect-to-equal 0.6
        3 |> divide-into 6 |> expect-to-equal 2
    test 'modulo' ->
        10 |> modulo 3 |> expect-to-equal 1
        10 |> modulo-whole-part 3 |> expect-to-equal 3
        -10 |> modulo-whole-part 3 |> expect-to-equal -3
    test 'exp' ->
        10 |> to-the 2 |> expect-to-equal 100
#         10 |> to-the (-2) |> expect-to-equal 0.01

describe 'cascade' ->
    test 1 ->
        odd = (x) -> x % 2 != 0
        cascade do
            [1 to 5]
            filter (odd)
            map (* 2)
        |> expect-to-equal [2 6 10]

describe 'bind*' ->
    dog =
        name: 'dog'
        speak: -> 'my name is ' + @name
        garble: (...args) -> r-join '!' args
    dog-speak = dog.speak
    dog-garble = dog.garble

    describe 'bind prop to' ->
        test 2 ->
            f = 'speak' |> bind-prop-to dog
            f () |> expect-to-equal 'my name is dog'
        test 'passes args' ->
            garble = 'garble' |> bind-prop-to dog
            garble 'a' 1 'c' |> expect-to-equal 'a!1!c'
        test 'dies' ->
            -> 'nothing' |> bind-prop dog
            |> expect-to-throw

    describe 'bind prop from' ->
        test 2 ->
            f = dog |> bind-prop 'speak'
            f () |> expect-to-equal 'my name is dog'
        test 'passes args' ->
            garble = dog |> bind-prop 'garble'
            garble 'a' 1 'c' |> expect-to-equal 'a!1!c'
        test 'dies' ->
            -> dog |> bind-prop 'nothing'
            |> expect-to-throw

    describe 'bind func to' ->
        test 2 ->
            f = dog-speak |> bind-to dog
            f () |> expect-to-equal 'my name is dog'
        test 'passes args' ->
            garble = dog-garble |> bind-to dog
            garble 'a' 1 'c' |> expect-to-equal 'a!1!c'
        test 'dies' ->
            -> null |> bind-to dog
            |> expect-to-throw

    describe 'bind func from' ->
        test 2 ->
            f = dog |> bind dog-speak
            f () |> expect-to-equal 'my name is dog'
        test 'passes args' ->
            garble = dog |> bind dog-garble
            garble 'a' 1 'c' |> expect-to-equal 'a!1!c'
        test 'dies' ->
            -> dog |> bind null
            |> expect-to-throw

    describe 'blush, always, T, F' ->
        test 'blush' ->
            f = 42 |> blush
            f 1 |> expect-to-equal 42
            f null |> expect-to-equal 42
            f 1 2 3 |> expect-to-equal 42
            f [1 2 3] |> expect-to-equal 42
        test 'always' ->
            blush |> expect-to-equal always
        test 'T' ->
            f = T
            f 1 |> expect-to-equal true
            f null |> expect-to-equal true
            f 1 2 3 |> expect-to-equal true
            f [1 2 3] |> expect-to-equal true
        test 'F' ->
            f = F
            f 1 |> expect-to-equal false
            f null |> expect-to-equal false
            f 1 2 3 |> expect-to-equal false
            f [1 2 3] |> expect-to-equal false

    describe 'bind late' ->
        test 'prop to' ->
            obj2 = {}
            bound = 'speak' |> bind-late-prop-to obj2
            (expect -> bound()).to-throw TypeError
            obj2.speak = -> 'spoke'
            (expect bound()).to-equal 'spoke'
        test 'prop from' ->
            obj2 = {}
            bound = obj2 |> bind-late-prop 'speak'
            (expect -> bound()).to-throw TypeError
            obj2.speak = -> 'spoke'
            (expect bound()).to-equal 'spoke'

    describe 'bind try *' ->
        describe 'bind try prop to' ->
            test 1 ->
                f = 'speak' |> bind-try-prop-to dog
                f () |> expect-to-equal 'my name is dog'
            test 'returns null on bad bind' ->
                f = 'bleak' |> bind-try-prop-to dog
                f |> expect-to-equal null
        describe 'bind try prop' ->
            test 1 ->
                f = dog |> bind-try-prop 'speak'
                f () |> expect-to-equal 'my name is dog'
            test 'returns null on bad bind' ->
                f = dog |> bind-try-prop 'bleak'
                f |> expect-to-equal null
        describe 'bind try func to' ->
            test 1 ->
                f = dog-speak |> bind-try-to dog
                f () |> expect-to-equal 'my name is dog'
            test 'returns null on bad bind' ->
                f = null |> bind-try-to dog
                f |> expect-to-equal null
        describe 'bind try func' ->
            test 1 ->
                f = dog |> bind-try dog-speak
                f () |> expect-to-equal 'my name is dog'
            test 'returns null on bad bind' ->
                f = dog |> bind-try null
                f |> expect-to-equal null

describe 'flip' ->
    describe 'target manually curried' ->
        divide = (a) -> (b) -> a / b
        divide-and-add-three-args = (a) -> (b) -> (c) -> a / b + c
        divide-and-add-four-args = (a) -> (b) -> (c) -> (d) -> a / b + c + d

        divide-flipped = flip divide
        divide-and-add-three-args-flipped = flip3 divide-and-add-three-args
        divide-and-add-four-args-flipped = flip4 divide-and-add-four-args

        test 'init' ->
            (expect (divide 10) 5).to-equal 2
            (expect ((divide-and-add-three-args 10) 5) 1).to-equal 3
            (expect (((divide-and-add-four-args 10) 5) 1) 2).to-equal 5

        describe '2 args' ->
            test 1 ->
                (expect divide-flipped 10 5).to-equal 0.5
            test 'result is curried' ->
                (expect (divide-flipped 10) 5).to-equal 0.5
        describe '2 + 1 args' ->
            test 1 ->
                (expect divide-and-add-three-args-flipped 10 5 1).to-equal 1.5
            test 'result is curried' ->
                (expect ((divide-and-add-three-args-flipped 10) 5) 1).to-equal 1.5
            test 'result is curried part deux' ->
                (expect (divide-and-add-three-args-flipped 10 5) 1).to-equal 1.5
        describe '2 + > 1 args' ->
            test 1 ->
                (expect divide-and-add-four-args-flipped 10 5 1 2).to-equal 3.5
            test 'result is curried' ->
                (expect (((divide-and-add-four-args-flipped 10) 5) 1) 2).to-equal 3.5
            test 'result is curried part deux' ->
                (expect (divide-and-add-four-args-flipped 10 5 1) 2).to-equal 3.5
            test 'result is curried part trois' ->
                (expect (divide-and-add-four-args-flipped 10 5) 1 2).to-equal 3.5
            test 'result is curried part quatre' ->
                (expect (divide-and-add-four-args-flipped 10) 5 1 2).to-equal 3.5
    describe 'target created with LS curry function' ->
        divide = (a, b) --> a / b
        divide-and-add-three-args = (a, b, c) --> a / b + c
        divide-and-add-four-args = (a, b, c, d) --> a / b + c + d

        divide-flipped = flip divide
        divide-and-add-three-args-flipped = flip3 divide-and-add-three-args
        divide-and-add-four-args-flipped = flip4 divide-and-add-four-args

        test 'init' ->
            (expect (divide 10) 5).to-equal 2
            (expect ((divide-and-add-three-args 10) 5) 1).to-equal 3
            (expect (((divide-and-add-four-args 10) 5) 1) 2).to-equal 5

        describe '2 args' ->
            test 1 ->
                (expect divide-flipped 10 5).to-equal 0.5
            test 'result is curried' ->
                (expect (divide-flipped 10) 5).to-equal 0.5
        describe '2 + 1 args' ->
            test 1 ->
                (expect divide-and-add-three-args-flipped 10 5 1).to-equal 1.5
            test 'result is curried' ->
                (expect ((divide-and-add-three-args-flipped 10) 5) 1).to-equal 1.5
            test 'result is curried part deux' ->
                (expect (divide-and-add-three-args-flipped 10 5) 1).to-equal 1.5
        describe '2 + > 1 args' ->
            test 1 ->
                (expect divide-and-add-four-args-flipped 10 5 1 2).to-equal 3.5
            test 'result is curried' ->
                (expect (((divide-and-add-four-args-flipped 10) 5) 1) 2).to-equal 3.5
            test 'result is curried part deux' ->
                (expect (divide-and-add-four-args-flipped 10 5 1) 2).to-equal 3.5
            test 'result is curried part trois' ->
                (expect (divide-and-add-four-args-flipped 10 5) 1 2).to-equal 3.5
            test 'result is curried part quatre' ->
                (expect (divide-and-add-four-args-flipped 10) 5 1 2).to-equal 3.5
    describe 'target created with ramda curry function' ->
        divide = curry (a, b) -> a / b
        divide-and-add-three-args = curry (a, b, c) -> a / b + c
        divide-and-add-four-args = curry (a, b, c, d) -> a / b + c + d

        divide-flipped = flip divide
        divide-and-add-three-args-flipped = flip3 divide-and-add-three-args
        divide-and-add-four-args-flipped = flip4 divide-and-add-four-args

        test 'init' ->
            (expect (divide 10) 5).to-equal 2
            (expect ((divide-and-add-three-args 10) 5) 1).to-equal 3
            (expect (((divide-and-add-four-args 10) 5) 1) 2).to-equal 5

        describe '2 args' ->
            test 1 ->
                (expect divide-flipped 10 5).to-equal 0.5
            test 'result is curried' ->
                (expect (divide-flipped 10) 5).to-equal 0.5
        describe '2 + 1 args' ->
            test 1 ->
                (expect divide-and-add-three-args-flipped 10 5 1).to-equal 1.5
            test 'result is curried' ->
                (expect ((divide-and-add-three-args-flipped 10) 5) 1).to-equal 1.5
            test 'result is curried part deux' ->
                (expect (divide-and-add-three-args-flipped 10 5) 1).to-equal 1.5
        describe '2 + > 1 args' ->
            test 1 ->
                (expect divide-and-add-four-args-flipped 10 5 1 2).to-equal 3.5
            test 'result is curried' ->
                (expect (((divide-and-add-four-args-flipped 10) 5) 1) 2).to-equal 3.5
            test 'result is curried part deux' ->
                (expect (divide-and-add-four-args-flipped 10 5 1) 2).to-equal 3.5
            test 'result is curried part trois' ->
                (expect (divide-and-add-four-args-flipped 10 5) 1 2).to-equal 3.5
            test 'result is curried part quatre' ->
                (expect (divide-and-add-four-args-flipped 10) 5 1 2).to-equal 3.5

describe 'letV' ->
    describe 'let-v' ->
        test 1 ->
            let-v 10 12 19, sum-all
            |> expect-to-equal 41
        test 'last arg must be a function' ->
            -> let-v 10
            |> expect-to-throw
            -> let-v 10 12 19
            |> expect-to-throw
            -> let-v sum-all
            |> expect-not-to-throw
    describe 'letNV' ->
        test 1 ->
            let-n-v [10 12 19], sum-all
            |> expect-to-equal 41

describe 'laat' ->
    test 'main' ->
        laat do
            -> 10, -> 12, -> 19, sum-all
        |> expect-to-equal 41
    describe 'specific versions' ->
        test 'let2' ->
            let2 do
                -> 10
                (+ 1)
            |> expect-to-equal 11
        test 'let3' ->
            let3 do
                -> 10
                (+ 1)
                sum-all # 21
            |> expect-to-equal 21
        test 'let4' ->
            let4 do
                -> 10
                (+ 1)
                sum-all # 21
                sum-all # 42
            |> expect-to-equal 42
        test 'let5' ->
            let5 do
                -> 10
                (+ 1)   # 11
                sum-all # 21
                sum-all # 42
                sum-all # 84
            |> expect-to-equal 84
        test 'let6' ->
            let6 do
                -> 10
                (+ 1)
                sum-all # 21
                sum-all # 42
                sum-all # 84
                sum-all # 168
            |> expect-to-equal 168
        test 'letN' ->
            let-n [
                -> 10
                (+ 1)
                sum-all # 21
                sum-all # 42
                sum-all # 84
                sum-all # 168
            ]
            |> expect-to-equal 168
        test 'letS' ->
            3 |> let-s [
                (t) -> t + 1
                (t, f) -> t + f
                (t, f, s) -> t * f * s
            ]
            |> expect-to-equal 84

    describe 'generic version' ->
        test 'laat (2)' ->
            laat do
                -> 10
                (+ 1)
            |> expect-to-equal 11
        test 'laat (3)' ->
            laat do
                -> 10
                (+ 1)
                sum-all # 21
            |> expect-to-equal 21
        test 'laat (6)' ->
            laat do
                -> 10
                (+ 1)
                sum-all # 21
                sum-all # 42
                sum-all # 84
                sum-all # 168
            |> expect-to-equal 168
        test 'laat (7)' ->
            (-> laat do
                -> 10
                (+ 1)
                sum-all # 21
                sum-all # 42
                sum-all # 84
                sum-all # 168
                sum-all) # 336
            |> expect-to-throw
        xtest 'laat (10)' ->
            laat do
                -> 10
                (+ 1)
                sum-all # 21
                sum-all # 42
                sum-all # 84
                sum-all # 168
                sum-all # 336
                sum-all # 672
                sum-all # 1344
                sum-all # 2688
            |> expect-to-equal 2688
    test 'single function' ->
        laat -> 11
        |> expect-to-equal 11
    test 'fibonacci' ->
        fibonacci = (n) ->
            sum-last-two = (xs) -> xs[*-1] + xs[*-2]
            entry = (...prev) ->
                m = prev.length
                switch
                | m == 0 => 1
                | m == 1 => 1
                | otherwise => sum-last-two prev
            refs = r-repeat entry, n + 1
            args = [...refs, list]
            laat ...args

        (expect fibonacci 0).to-equal [1]
        (expect fibonacci 1).to-equal [1 1]
        (expect fibonacci 2).to-equal [1 1 2]
        (expect fibonacci 4).to-equal [1 1 2 3 5]

        # (expect fibonacci 8).to-equal [1 1 2 3 5 8 13 21 34]
        # (expect fibonacci 9).to-equal [1 1 2 3 5 8 13 21 34 55]

describe 'sprintf*' ->
    describe 'sprintf1' ->
        test 1 ->
            'dog'
            |> sprintf1 'my name is %s'
            |> expect-to-equal 'my name is dog'
        test 2 ->
            10/3
            |> sprintf1 'my name is %0.2f'
            |> expect-to-equal 'my name is 3.33'
    describe 'sprintfn' ->
        test 1 ->
            ['is' 'dog']
            |> sprintf-n 'my name %s not %s'
            |> expect-to-equal 'my name is not dog'
        test 2 ->
            ['is' 10/3]
            |> sprintf-n 'my name %s %0.2f'
            |> expect-to-equal 'my name is 3.33'

describe 'zip-all' ->
    test 1 ->
        zip-all do
            [1 2 3]
            <[ un deux trois ]>
        |> expect-to-equal [
            [1 'un'] [2 'deux'] [3 'trois']
        ]
    test 2 ->
        zip-all do
            <[ un deux trois ]>
            <[ yek do seh ]>
            <[ egy ketto harom ]>
        |> expect-to-equal [
            <[ un yek egy ]>
            <[ deux do ketto ]>
            <[ trois seh harom ]>
        ]
    test "two args equivalent to ramda's zip" ->
        zip-all do
            <[ un yek egy ]>
            <[ yek do seh ]>
        |> expect-to-equal zip do
            <[ un yek egy ]>
            <[ yek do seh ]>

describe 'new' ->
    class C
        (...args) -> @nums = args
        speak: -> r-join ' ' [
            'hulu'
            ...@nums
        ]

    test 'neu' ->
        C
        |> neu
        |> (.speak())
        |> expect-to-equal 'hulu'

    test 'neu1' ->
        10
        |> neu1 C
        |> (.speak())
        |> expect-to-equal 'hulu 10'

    test 'neu2' ->
        (neu2 C) 20 30
        |> (.speak())
        |> expect-to-equal 'hulu 20 30'

    test 'neu3' ->
        (neu3 C) 2 4 6
        |> (.speak())
        |> expect-to-equal 'hulu 2 4 6'

    test 'neu4' ->
        (neu4 C) 2 4 6 8
        |> (.speak())
        |> expect-to-equal 'hulu 2 4 6 8'

    test 'neu5' ->
        (neu5 C) 2 4 6 8 10
        |> (.speak())
        |> expect-to-equal 'hulu 2 4 6 8 10'

    test 'neuN' ->
        [4 8 9]
        |> neu-n C
        |> (.speak())
        |> expect-to-equal 'hulu 4 8 9'

describe 'match/regex' ->
    test 'x-regexp' ->
        re = x-reg-exp new RegExp ' (ses) $' 'm'
        'horses\npigs'
        |> (.match re)
        |> (m) -> m.1
        |> expect-to-equal 'ses'
    test 'x-regexp-flags' ->
        re = x-reg-exp-flags do
            new RegExp ' (SeS) $'
            'mi'
        'horses\npigs'
        |> (.match re)
        |> (m) -> m.1
        |> expect-to-equal 'ses'
    test 'x-regexp-flags, overrides existing flags' ->
        re = x-reg-exp-flags do
            new RegExp ' (SeS) $' 'i'
            'm'
        'horses\npigs'
        |> (.match re)
        |> expect-to-equal null
    test 'x-regexp-str, no flags' ->
        re = x-reg-exp-str ' (igs) $'
        'horses\npigs'
        |> (.match re)
        |> (m) -> m.1
        |> expect-to-equal 'igs'
    test 'x-regexp-str, flags' ->
        re = x-reg-exp-str ' (ses) $' 'm'
        'horses\npigs'
        |> (.match re)
        |> (m) -> m.1
        |> expect-to-equal 'ses'
    test 'xmatch-str' ->
        'horses'
        |> x-match-str ' ( o . s ) '
        |> (.1)
        |> expect-to-equal 'ors'
    test 'xmatch-str-flags' ->
        'horses\npigs'
        |> x-match-str-flags ' (ses) $' 'm'
        |> (.1)
        |> expect-to-equal 'ses'
    test 'xmatch' ->
        'horses'
        |> x-match new RegExp ' ( o . s ) '
        |> (m) -> m.1
        |> expect-to-equal 'ors'
    test 'xmatch-global' ->
        y = []
        re = new RegExp ' (s .) '
        'shorses and shoes'
        |> x-match-global re, (m) -> y.push m
        y |> expect-to-equal ['sh' 'se' 's ' 'sh']
    test 'match' ->
        'horses'
        |> stick-match new RegExp '(o.s)'
        |> (m) -> m.1
        |> expect-to-equal 'ors'
    test 'x-replace' ->
        'lots of pigs'
        |> x-replace (new RegExp '(o .)'), 'po'
        |> expect-to-equal 'lpos of pigs'
    test 'x-replace global' ->
        'lots of pigs'
        |> x-replace (new RegExp '(o .)' 'g'), 'po'
        |> expect-to-equal 'lpos po pigs'
    test 'x-replace-str' ->
        'lots of pigs'
        |> x-replace-str ' (o .. p) ' 'stick'
        |> expect-to-equal 'lots stickigs'
    test 'x-replace-str-flags' ->
        'lots of pigs'
        |> x-replace-str-flags ' (o .) ' '' 'po'
        |> expect-to-equal 'lpos of pigs'
    test 'x-replace-str-flags global' ->
        'lots of pigs'
        |> x-replace-str-flags ' (o .) ' 'g' 'po'
        |> expect-to-equal 'lpos po pigs'

describe 'ifReplace*' ->

    do-test = (expect-result, expect-repl-count, success, func) ->
        var ja-res, nee-res, repl-count
        ja = jest.fn()
            ..mock-implementation (x, cnt) -> ja-res := x; repl-count := cnt
        nee = jest.fn()
            ..mock-implementation (x) -> nee-res := x; repl-count := 0

        func ja, nee

        [ja-calls, nee-calls, result] =
            if success then [1 0 ja-res] else [0 1 nee-res]

        ja.mock.calls.length |> expect-to-equal ja-calls
        nee.mock.calls.length |> expect-to-equal nee-calls

        result |> expect-to-equal expect-result
        repl-count |> expect-to-equal expect-repl-count

    test 'ifReplace succesful' ->
        [re, target, replacement] = [
            /s/g 'sandmishes' 't'
        ]
        do-test 'tandmithet' 3 true (ja, nee) ->
            target |> (if-replace ja, nee, re, replacement)
    test 'ifReplace succesful, repl is a function' ->
        [re, target, replacement] = [
            /s/g 'sandmishes' (.to-upper-case())
        ]
        do-test 'SandmiSheS' 3 true (ja, nee) ->
            target |> (if-replace ja, nee, re, replacement)
    test 'ifReplace not succesful' ->
        [re, target, replacement] = [
            /xxxx/g 'sandmishes' 't'
        ]
        do-test 'sandmishes' 0 false (ja, nee) ->
            target |> (if-replace ja, nee, re, replacement)
    test 'ifXReplace succesful' ->
        [re, target, replacement] = [
            new RegExp ' s ' 'g'
            'sandmishes' 't'
        ]
        do-test 'tandmithet' 3 true (ja, nee) ->
            target |> (if-x-replace ja, nee, re, replacement)
    test 'ifXReplace not succesful' ->
        [re, target, replacement] = [
            new RegExp ' xxxx ' 'g'
            'sandmishes' 't'
        ]
        do-test 'sandmishes' 0 false (ja, nee) ->
            target |> (if-x-replace ja, nee, re, replacement)
    test 'ifXReplaceStr succesful' ->
        [re-str, target, replacement] = [
            ' s ' 'sandmishes' 't'
        ]
        do-test 'tandmishes' 1 true (ja, nee) ->
            target |> (if-x-replace-str ja, nee, re-str, replacement)
    test 'ifXReplaceStr not succesful' ->
        [re-str, target, replacement] = [
            ' xxxx ' 'sandmishes' 't'
        ]
        do-test 'sandmishes' 0 false (ja, nee) ->
            target |> (if-x-replace-str ja, nee, re-str, replacement)
    test 'ifXReplaceStrFlags succesful' ->
        [re-str, target, replacement] = [
            ' s ' 'sandmishes' 't'
        ]
        do-test 'tandmithet' 3 true (ja, nee) ->
            target |> (if-x-replace-str-flags ja, nee, re-str, 'g', replacement)
    test 'ifXReplaceStrFlags not succesful' ->
        [re-str, target, replacement] = [
            ' xxxx ' 'sandmishes' 't'
        ]
        do-test 'sandmishes' 0 false (ja, nee) ->
            target |> (if-x-replace-str-flags ja, nee, re-str, 'g', replacement)

describe 'repeat, times' ->
    y = y: void
    ping = (x) -> y.y.push (x)
    before-each -> y.y = []
    describe 'repeatV' ->
        test 1 ->
            5
            |> repeat-v 'thing'
            |> expect-to-equal ['thing'] * 5
    describe 'repeatF' ->
        test 1 ->
            3
            |> repeat-f (n) -> "thing#n"
            |> expect-to-equal ['thing0' 'thing1' 'thing2']
    describe 'repeatSide' ->
        test 1 ->
            3
            |> repeat-side (n) -> ping "thing#n"
            |> expect-to-equal void
            y.y |> expect-to-equal ['thing0' 'thing1' 'thing2']
    describe 'timesV' ->
        test 1 ->
            'thing'
            |> times-v 5
            |> expect-to-equal ['thing'] * 5
    describe 'timesF' ->
        test 1 ->
            (n) -> "thing#n"
            |> times-f 3
            |> expect-to-equal ['thing0' 'thing1' 'thing2']
    describe 'timesSide' ->
        test 1 ->
            (n) -> ping "thing#n"
            |> times-side 3
            |> expect-to-equal void
            y.y |> expect-to-equal ['thing0' 'thing1' 'thing2']


describe 'types' ->
    test 'isType' ->
        3 |> is-type 'Number' |> expect-to-equal true
        3 |> is-type 'Boolean' |> expect-to-equal false
        3 |> is-type 'String' |> expect-to-equal false
        3 |> is-type Number |> expect-to-equal false
        3 |> is-type Boolean |> expect-to-equal false
        3 |> is-type String |> expect-to-equal false
    test 'getType' ->
        3    |> get-type |> expect-to-equal 'Number'
        true |> get-type |> expect-to-equal 'Boolean'
        '3'  |> get-type |> expect-to-equal 'String'
        void |> get-type |> expect-to-equal 'Undefined'
        null |> get-type |> expect-to-equal 'Null'

    test 'isFunction' ->
        (+ 3)     |> is-function |> expect-to-equal true
        3         |> is-function |> expect-to-equal false
        '3'       |> is-function |> expect-to-equal false
    test 'isArray' ->
        []        |> is-array |> expect-to-equal true
        {}        |> is-array |> expect-to-equal false
        3         |> is-array |> expect-to-equal false
    test 'isObject' ->
        {}        |> is-object |> expect-to-equal true
        []        |> is-object |> expect-to-equal false
        null      |> is-object |> expect-to-equal false
    test 'isNumber' ->
        3         |> is-number |> expect-to-equal true
        NaN       |> is-number |> expect-to-equal true
        '2'       |> is-number |> expect-to-equal false
        true      |> is-number |> expect-to-equal false
    test 'isRegExp' ->
        // abc // |> is-reg-exp |> expect-to-equal true
        3         |> is-reg-exp |> expect-to-equal false
        null      |> is-reg-exp |> expect-to-equal false
    test 'isBoolean' ->
        true      |> is-boolean |> expect-to-equal true
        false     |> is-boolean |> expect-to-equal true
        0         |> is-boolean |> expect-to-equal false
        null      |> is-boolean |> expect-to-equal false
    test 'isString' ->
        '3'       |> is-string |> expect-to-equal true
        3         |> is-string |> expect-to-equal false
        true      |> is-string |> expect-to-equal false
    test 'isInteger' ->
        '3.2'     |> is-integer |> expect-to-equal false
        '3'       |> is-integer |> expect-to-equal false
        3.2       |> is-integer |> expect-to-equal false
        -3.2      |> is-integer |> expect-to-equal false
        3         |> is-integer |> expect-to-equal true
        0         |> is-integer |> expect-to-equal true
        -0        |> is-integer |> expect-to-equal true
        -3        |> is-integer |> expect-to-equal true

describe 'range, compact' ->
    describe 'rangeFromBy' ->
        test 1 ->
            range-from-by 2 0 10 |> expect-to-equal [0 to 9 by 2]
        test 3 ->
            range-from-by -2 10 0 |> expect-to-equal [10 to 1 by -2]
    describe 'rangeFromBy specific' ->
        test 1 ->
            range-from-by-asc 2 0 10 |> expect-to-equal [0 to 9 by 2]
        test 3 ->
            0 |> range-from-by-desc -2 10 |> expect-to-equal [10 to 1 by -2]
    describe 'rangeToBy' ->
        test 1 ->
            range-to-by 2 10 0 |> expect-to-equal [0 to 9 by 2]
        test 2 ->
            0 |> range-to-by 2 10 |> expect-to-equal [0 to 9 by 2]
        test 3 ->
            range-to-by -2 0 10 |> expect-to-equal [10 to 1 by -2]
    describe 'rangeFrom' ->
        test 1 ->
            10 |> range-from 0 |> expect-to-equal [0 to 9]
    describe 'rangeTo' ->
        test 1 ->
            0 |> range-to 10 |> expect-to-equal [0 to 9]
