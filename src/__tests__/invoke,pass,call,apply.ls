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
    zip-all,
    invoke,

    apply-to1, apply-to2, apply-to3, apply-to4, apply-to5,
    apply-to-n,
    pass-to, pass-to-n,

    call, call1, call2, call3, call-n,
    call-on, call-on1, call-on2, call-on3, call-on4, call-on5, call-on-n,
    provide-to, provide-to1, provide-to2, provide-to3, provide-to4,
    provide-to5, provide-to-n,

} = require '../index'

sum-all = (...args) -> args |> reduce ((a, b) -> a + b), 0

describe 'invoke' ->
    func = -> 'horse'
    test 1 ->
        func
        |> invoke
        |> expect-to-equal 'horse'
    test 2 ->
        sum-all
        |> invoke
        |> expect-to-equal 0
    test 'iffy' ->
        (invoke -> (+ 1)) 41
        |> expect-to-equal 42

describe 'pass*' ->
    func = -> 'horse'
    describe 'applyTo1' ->
        test 1 ->
            sum-all
            |> apply-to1 12
            |> expect-to-equal 12
        test 2 ->
            (+ 4)
            |> apply-to1 12
            |> expect-to-equal 16
        test 'discards extra args 1' ->
            func
            |> apply-to1 'abc'
            |> expect-to-equal 'horse'
    describe 'applyTo2' ->
        test 1 ->
            sum-all
            |> apply-to2 12 13
            |> expect-to-equal 25
        test 2 ->
            (+)
            |> apply-to2 20 30
            |> expect-to-equal 50
    describe 'applyTo3' ->
        test 1 ->
            sum-all
            |> apply-to3 12 13 14
            |> expect-to-equal 39
        test 'discards' ->
            (+)
            |> apply-to3 20 30 40
            |> expect-to-equal 50
    describe 'applyTo4' ->
        test 1 ->
            sum-all
            |> apply-to4 12 13 14 15
            |> expect-to-equal 54
    describe 'applyTo5' ->
        test 1 ->
            sum-all
            |> apply-to5 12 13 14 15 16
            |> expect-to-equal 70
    describe 'applyToN' ->
        test 1 ->
            sum-all
            |> apply-to-n [12 to 15]
            |> expect-to-equal 54
        test 2 ->
            (+)
            |> apply-to-n [20 30]
            |> expect-to-equal 50

describe 'passTo*' ->
    func = -> 'horse'
    describe 'passTo' ->
        test 1 ->
            12
            |> pass-to sum-all
            |> expect-to-equal 12
        test 2 ->
            12
            |> pass-to (+ 4)
            |> expect-to-equal 16
        test 'discards extra args 1' ->
            'abc'
            |> pass-to func
            |> expect-to-equal 'horse'
    describe 'passToN' ->
        test 1 ->
            [12 to 15]
            |> pass-to-n sum-all
            |> expect-to-equal 54
        test 2 ->
            [20 30]
            |> pass-to-n (+)
            |> expect-to-equal 50

describe 'call*' ->
    obj1 =
        name: 'dog'
    obj2 =
        speak: -> 'my name is ' + @name
        speak1: (word) -> "my #word is " + @name
        speak-all: list >> join ':'
    describe 'callOn' ->
        test 'array' ->
            [].reverse
            |> call-on [1 to 3]
            |> expect-to-equal [3 to 1]
        test 'user-obj' ->
            obj2.speak
            |> call-on obj1
            |> expect-to-equal 'my name is dog'
    describe 'callOn1' ->
        test 'array' ->
            [].concat
            |> call-on1 [1 to 3] 4
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj2.speak1
            |> call-on1 obj1, 'friend'
            |> expect-to-equal 'my friend is dog'
    describe 'callOn2' ->
        test 'array' ->
            [].concat
            |> call-on2 [1 to 3] 4 5
            |> expect-to-equal [1 to 5]
        test 'user-obj, caps (discards) second arg' ->
            obj2.speak1
            |> call-on2 obj1, 'friend' 'send'
            |> expect-to-equal 'my friend is dog'
        test 'user-obj' ->
            obj2.speak-all
            |> call-on2 obj1, 'friend' 'send'
            |> expect-to-equal 'friend:send'
    describe 'callOn3' ->
        test 'array' ->
            [].concat
            |> call-on3 [1 to 3] 4 5 6
            |> expect-to-equal [1 to 6]
        test 'user-obj' ->
            obj2.speak-all
            |> call-on3 obj1, 'friend' 'send' 'end'
            |> expect-to-equal 'friend:send:end'
    describe 'callOn4' ->
        test 'array' ->
            [].concat
            |> call-on4 [1 to 3] 4 5 6 7
            |> expect-to-equal [1 to 7]
        test 'user-obj' ->
            obj2.speak-all
            |> call-on4 obj1, 'friend' 'send' 'end' 'lend'
            |> expect-to-equal 'friend:send:end:lend'
    describe 'callOn5' ->
        test 'array' ->
            [].concat
            |> call-on5 [1 to 3] 4 5 6 7 8
            |> expect-to-equal [1 to 8]
        test 'user-obj' ->
            obj2.speak-all
            |> call-on5 obj1, 'friend' 'send' 'end' 'lend' 'trend'
            |> expect-to-equal 'friend:send:end:lend:trend'
    describe 'callOnN' ->
        test 'array' ->
            [].concat
            |> call-on-n [1 to 3] [4 5 6]
            |> expect-to-equal [1 to 6]
        test 'user-obj' ->
            obj2.speak-all
            |> call-on-n obj1, ['friend' 'lend']
            |> expect-to-equal 'friend:lend'

    describe 'provideTo' ->
        test 'array' ->
            [1 to 3]
            |> provide-to [].reverse
            |> expect-to-equal [3 to 1]
        test 'bound function alias' ->
            trim = provide-to ''.trim
            trim ' dog '
            |> expect-to-equal 'dog'
        test 'user-obj' ->
            obj1
            |> provide-to obj2.speak
            |> expect-to-equal 'my name is dog'
    describe 'provideTo1' ->
        test 'array' ->
            [1 to 3]
            |> provide-to1 [].concat, 4
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj1
            |> provide-to1 obj2.speak1, 'friend'
            |> expect-to-equal 'my friend is dog'
    describe 'provideTo2' ->
        test 'bound function alias' ->
            replace-dl = provide-to2 ''.replace, 'd' 'l'
            replace-dl 'dog'
            |> expect-to-equal 'log'
        test 'array' ->
            [1 to 3]
            |> provide-to2 [].concat, 4 5
            |> expect-to-equal [1 to 5]
        test 'user-obj' ->
            obj1
            |> provide-to2 obj2.speak-all, 'friend' 'send'
            |> expect-to-equal 'friend:send'
    describe 'provideTo3' ->
        test 'array' ->
            [1 to 3]
            |> provide-to3 [].concat, 4 5 6
            |> expect-to-equal [1 to 6]
        test 'user-obj' ->
            obj1
            |> provide-to3 obj2.speak-all, 'friend' 'send' 'end'
            |> expect-to-equal 'friend:send:end'
    describe 'provideTo4' ->
        test 'array' ->
            [1 to 3]
            |> provide-to4 [].concat, 4 5 6 7
            |> expect-to-equal [1 to 7]
        test 'user-obj' ->
            obj1
            |> provide-to4 obj2.speak-all, 'friend' 'send' 'end' 'lend'
            |> expect-to-equal 'friend:send:end:lend'
    describe 'provideTo5' ->
        test 'array' ->
            [1 to 3]
            |> provide-to5 [].concat, 4 5 6 7 8
            |> expect-to-equal [1 to 8]
        test 'user-obj' ->
            obj1
            |> provide-to5 obj2.speak-all, 'friend' 'send' 'end' 'lend' 'trend'
            |> expect-to-equal 'friend:send:end:lend:trend'
    describe 'provideToN' ->
        test 'array' ->
            [1 to 3]
            |> provide-to-n [].concat, [4 to 9]
            |> expect-to-equal [1 to 9]
        test 'user-obj' ->
            obj1
            |> provide-to-n obj2.speak-all, ['friend' 'send' 'end' 'lend']
            |> expect-to-equal 'friend:send:end:lend'



