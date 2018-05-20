{
    assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, prop: rProp, path: rPath, defaultTo: rDefaultTo, curry, forEach: each, complement, isNil,
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
} = require 'ramda'

{
    list,
    test, xtest,
    expect-to-equal, expect-to-be,
    expect-to-throw, expect-not-to-throw,
} = require './common'

{
    zip-all,

    eq, ne, gt, gte, lt, lte,

    bind, bind-late, bind-try,
    cascade,
    flip, flip3, flip4, flip5,
    sprintf1, sprintf-n,

    laat, let-n,
    lets, lets2, lets3, lets4, lets5, lets6,
    lets-n, lets-o,

    nieuw, nieuw1, nieuw2, nieuw3, nieuw-n,

    x-reg-exp, x-reg-exp-str,
    x-match, x-match-str, x-match-str-flags, #match
    x-replace, x-replace-str, x-replace-str-flags,

    if-replace, if-x-replace, if-x-replace-str, if-x-replace-str-flags,

    subtract-from, subtract, minus,
    add, plus,
    multiply, divide-by, divide-into,
    modulo, modulo-whole-part,
    to-the,

} = main = require '../index'

sum-all = list >> sum

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
    obj =
        name: 'dog'
        speak: -> 'my name is ' + @name
        garble: (...args) -> r-join '!' args

    # --- common to all.
    zip [bind, bind-late, bind-try] <[ bind bindLate bindTry ]>
    |> each ([bind-func, bind-func-name]) ->
        describe bind-func-name, ->
            test 'binds' ->
                bad-speak = obj.speak
                bad-speak |> expect-to-throw

                good-speak = bind-func obj, 'speak'
                (expect good-speak()).to-equal 'my name is dog'
            test 'passes args' ->
                garble = bind-func obj, 'garble'
                garble 'a' 1 'c'
                |> expect-to-equal 'a!1!c'
            test 'curried' ->
                'speak'
                |> bind-func obj
                |> (x) -> x()
                |> expect-to-equal 'my name is dog'

    describe 'bind hard' ->
        test 'fails on undefined function' ->
            (expect -> obj.squeak()).to-throw TypeError
    describe 'bind late' ->
        test '1' ->
            obj2 = {}
            bound = 'speak' |> bind-late obj2
            (expect -> bound()).to-throw TypeError
            obj2.speak = -> 'spoke'
            (expect bound()).to-equal 'spoke'
    describe 'bind try' ->
        test 'returns undefined on bad bind' ->
            bind-try obj, 'squeqk'
            |> expect-to-equal void
    describe 'forms' ->
        xtest '1' ->
            bindTry(obj, 'speak') |> if-ok

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

describe 'laat' ->
    describe 'laat' ->
        test 1 ->
            laat 10 12 19, sum-all
            |> expect-to-equal 41
        test 'last arg must be a function' ->
            -> laat 10
            |> expect-to-throw
            -> laat 10 12 19
            |> expect-to-throw
            -> laat sum-all
            |> expect-not-to-throw
    describe 'letN' ->
        test 1 ->
            let-n [10 12 19], sum-all
            |> expect-to-equal 41

describe 'lets' ->
    test 'main' ->
        lets do
            -> 10, -> 12, -> 19, sum-all
        |> expect-to-equal 41
    describe 'specific versions' ->
        test 'lets2' ->
            lets2 do
                -> 10
                (+ 1)
            |> expect-to-equal 11
        test 'lets3' ->
            lets3 do
                -> 10
                (+ 1)
                sum-all # 21
            |> expect-to-equal 21
        test 'lets4' ->
            lets4 do
                -> 10
                (+ 1)
                sum-all # 21
                sum-all # 42
            |> expect-to-equal 42
        test 'lets5' ->
            lets5 do
                -> 10
                (+ 1)   # 11
                sum-all # 21
                sum-all # 42
                sum-all # 84
            |> expect-to-equal 84
        test 'lets6' ->
            lets6 do
                -> 10
                (+ 1)
                sum-all # 21
                sum-all # 42
                sum-all # 84
                sum-all # 168
            |> expect-to-equal 168
        test 'letsN' ->
            lets-n [
                -> 10
                (+ 1)
                sum-all # 21
                sum-all # 42
                sum-all # 84
                sum-all # 168
            ]
            |> expect-to-equal 168
        test 'letsO' ->
            3 |> lets-o [
                (t) -> t + 1
                (t, f) -> t + f
                (t, f, s) -> t * f * s
            ]
            |> expect-to-equal 84

    describe 'generic version' ->
        test 'lets (2)' ->
            lets do
                -> 10
                (+ 1)
            |> expect-to-equal 11
        test 'lets (3)' ->
            lets do
                -> 10
                (+ 1)
                sum-all # 21
            |> expect-to-equal 21
        test 'lets (6)' ->
            lets do
                -> 10
                (+ 1)
                sum-all # 21
                sum-all # 42
                sum-all # 84
                sum-all # 168
            |> expect-to-equal 168
        test 'lets (10)' ->
            lets do
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
        lets do
            -> 11
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
            lets ...args

        (expect fibonacci 0).to-equal [1]
        (expect fibonacci 1).to-equal [1 1]
        (expect fibonacci 2).to-equal [1 1 2]
        (expect fibonacci 8).to-equal [1 1 2 3 5 8 13 21 34]
        (expect fibonacci 9).to-equal [1 1 2 3 5 8 13 21 34 55]

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

    test 'nieuw' ->
        C
        |> nieuw
        |> (.speak())
        |> expect-to-equal 'hulu'

    test 'nieuw1' ->
        10
        |> nieuw1 C
        |> (.speak())
        |> expect-to-equal 'hulu 10'

    test 'nieuw2' ->
        (nieuw2 C) 20 30
        |> (.speak())
        |> expect-to-equal 'hulu 20 30'

    test 'nieuw3' ->
        (nieuw3 C) 2 4 6
        |> (.speak())
        |> expect-to-equal 'hulu 2 4 6'

    test 'nieuwN' ->
        [4 8 9]
        |> nieuw-n C
        |> (.speak())
        |> expect-to-equal 'hulu 4 8 9'

describe 'match/regex' ->
    test 'x-regexp' ->
        re = x-reg-exp new RegExp ' (ses) $' 'm'
        'horses\npigs'
        |> (.match re)
        |> (m) -> m.1
        |> expect-to-equal 'ses'
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
    test 'match' ->
        'horses'
        |> main.match new RegExp '(o.s)'
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
