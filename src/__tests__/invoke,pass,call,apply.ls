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
    pass1, pass2, pass3, pass-n,
    apply1, apply2, apply3, apply-n,

    call, call1, call2, call3, call-n,
    call-on, call-on1, call-on2, call-on3, call-on-n,
    call-under, call-under1, call-under2,

} = require '../index'

describe 'invoke' ->
    func = -> 'horse'
    sum-all = (...args) -> args |> reduce ((a, b) -> a + b), 0
    test 1 ->
        func
        |> invoke
        |> expect-to-equal 'horse'
    test 2 ->
        sum-all
        |> invoke
        |> expect-to-equal 0

describe 'pass*' ->
    func = -> 'horse'
    sum-all = (...args) -> args |> reduce ((a, b) -> a + b), 0
    describe 'pass1' ->
        test 1 ->
            sum-all
            |> pass1 12
            |> expect-to-equal 12
        test 2 ->
            (+ 4)
            |> pass1 12
            |> expect-to-equal 16
        test 'discards extra args 1' ->
            func
            |> pass1 'abc'
            |> expect-to-equal 'horse'
    describe 'pass2' ->
        test 1 ->
            sum-all
            |> pass2 12 13
            |> expect-to-equal 25
        test 2 ->
            (+)
            |> pass2 20 30
            |> expect-to-equal 50
    describe 'pass3' ->
        test 1 ->
            sum-all
            |> pass3 12 13 14
            |> expect-to-equal 39
        test 'discards' ->
            (+)
            |> pass3 20 30 40
            |> expect-to-equal 50
    describe 'passN' ->
        test 1 ->
            sum-all
            |> pass-n [12 to 15]
            |> expect-to-equal 54
        test 2 ->
            (+)
            |> pass-n [20 30]
            |> expect-to-equal 50

describe 'apply*' ->
    func = -> 'horse'
    sum-all = (...args) -> args |> reduce ((a, b) -> a + b), 0
    describe 'apply1' ->
        test 1 ->
            12
            |> apply1 sum-all
            |> expect-to-equal 12
        test 2 ->
            12
            |> apply1 (+ 4)
            |> expect-to-equal 16
        test 'discards extra args 1' ->
            'abc'
            |> apply1 func
            |> expect-to-equal 'horse'
    describe 'apply2' ->
        test 1 ->
            (apply2 sum-all) 12 13
            |> expect-to-equal 25
        test 2 ->
            (apply2 (+)) 20 30
            |> expect-to-equal 50
    describe 'apply3' ->
        test 1 ->
            (apply3 sum-all) 12 13 14
            |> expect-to-equal 39
        test 'discards' ->
            (apply3 (+)) 20 30 40
            |> expect-to-equal 50
    describe 'applyN' ->
        test 1 ->
            [12 to 15]
            |> apply-n sum-all
            |> expect-to-equal 54
        test 2 ->
            [20 30]
            |> apply-n (+)
            |> expect-to-equal 50

describe 'call*' ->
    obj =
        name: 'dog'
        speak: -> 'my name is ' + @name
        speak1: (word) -> "my #word is " + @name
        speak-all: list >> join ':'
    describe 'aliases' ->
        normal = [call-on, call-on1, call-on2, call-on3, call-on-n]
        alias = [call, call1, call2, call3, call-n]
        names = ['call', 'call1', 'call2', 'call3', 'call-n']

        zip-all normal, alias, names
        |> each ([alias-l, alias-r, name]) ->
            test name, ->
                (expect alias-l).to-be alias-r
    describe 'callOn' ->
        test 'array' ->
            [].reverse
            |> call-on [1 to 3]
            |> expect-to-equal [3 to 1]
        test 'user-obj' ->
            obj.speak
            |> call-on obj
            |> expect-to-equal 'my name is dog'
    describe 'callOn1' ->
        test 'array' ->
            [].concat
            |> call-on1 [1 to 3] 4
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj.speak1
            |> call-on1 obj, 'friend'
            |> expect-to-equal 'my friend is dog'
    describe 'callOn2' ->
        test 'array' ->
            [].concat
            |> call-on2 [1 to 3] 4 5
            |> expect-to-equal [1 to 5]
        test 'user-obj, caps (discards) second arg' ->
            obj.speak1
            |> call-on2 obj, 'friend' 'send'
            |> expect-to-equal 'my friend is dog'
        test 'user-obj' ->
            obj.speak-all
            |> call-on2 obj, 'friend' 'send'
            |> expect-to-equal 'friend:send'
    describe 'callOn3' ->
        test 'array' ->
            [].concat
            |> call-on3 [1 to 3] 4 5 6
            |> expect-to-equal [1 to 6]
        test 'user-obj' ->
            obj.speak-all
            |> call-on3 obj, 'friend' 'send' 'end'
            |> expect-to-equal 'friend:send:end'
    describe 'callOnN' ->
        test 'array' ->
            [].concat
            |> call-on-n [1 to 3] [4 5 6]
            |> expect-to-equal [1 to 6]
        test 'user-obj' ->
            obj.speak-all
            |> call-on-n obj, ['friend' 'lend']
            |> expect-to-equal 'friend:lend'

    describe 'callUnder' ->
        test 'array' ->
            [1 to 3]
            |> call-under [].reverse
            |> expect-to-equal [3 to 1]
        test 'bound function alias' ->
            trim = call-under ''.trim
            trim ' dog '
            |> expect-to-equal 'dog'
        test 'user-obj' ->
            obj
            |> call-under obj.speak
            |> expect-to-equal 'my name is dog'
    describe 'callUnder1' ->
        test 'array' ->
            [1 to 3]
            |> call-under1 [].concat, 4
            |> expect-to-equal [1 to 4]
        test 'user-obj' ->
            obj
            |> call-under1 obj.speak1, 'friend'
            |> expect-to-equal 'my friend is dog'
    describe 'callUnder2' ->
        test 'bound function alias' ->
            replace-dl = call-under2 ''.replace, 'd' 'l'
            replace-dl 'dog'
            |> expect-to-equal 'log'

