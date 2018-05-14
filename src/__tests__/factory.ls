{
    assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, prop: rProp, path: rPath, defaultTo: rDefaultTo, curry, forEach: each, complement, isNil,
    repeat: rRepeat,
    times: r-times,
    reverse,
    tap,
    flip,
    keys,
    zip,
} = require 'ramda'

{
    list,
    test, xtest,
    expect-to-equal, expect-to-be,
} = require './common'

{
    factory,
} = require '../index'

num-keys = keys >> (.length)

describe 'factory ' ->
    var animal-proto

    init = ->
        prehistoric-proto =
            ooze: -> 'ooze'

        animal-proto := (Object.create prehistoric-proto) <<<
            walk: -> 'walk'
            confess: -> 'I am ' + @color

    # todo
    test-proto-unaltered = ->
        return
        animal-proto.walk() |> expect-to-equal 'walk'
        (typeof! animal-proto.confess) |> expect-to-equal 'Function'
        animal-proto.ooze() |> expect-to-equal 'ooze'
        animal-proto |> num-keys |> expect-to-equal 2

    describe 1 ->
        var proto, create
        before-each ->
            init()
            fact = factory animal-proto
            proto := fact.proto
            create := fact.create

        after-each -> test-proto-unaltered()

        xtest 'main' ->
            red-animal = create color: 'red'
            blue-animal = create color: 'blue'

            red-animal.confess()
            |> expect-to-equal 'I am red'

            blue-animal.confess()
            |> expect-to-equal 'I am blue'

        xtest 'proto' ->
            typeof! proto.ooze
            |> expect-to-equal 'Function'
            typeof! proto.walk
            |> expect-to-equal 'Function'
            typeof! proto.confess
            |> expect-to-equal 'Function'
        xtest 'instance spec not altered' ->
            instance-spec = color: 'red'
            red-animal = create instance-spec
            instance-spec
            |> expect-to-equal color: 'red'
        xtest 'proto chain multi-level' ->
            red-animal = create color: 'red'
            red-animal.ooze()
            |> expect-to-equal 'ooze'

    describe 'mixins pre' ->
        var proto, create, red-animal
        before-each ->
            init()
            fact = factory animal-proto, [hopper, topper, walker]
            proto := fact.proto
            create := fact.create
            red-animal := create color: 'red'
        after-each -> test-proto-unaltered()
        hopper =
            hop: -> 'hopper hop'
        topper =
            hop: -> 'topper hop'
            top: -> 'topper top'
        walker =
            pop: -> 'walker pop'
            # --- shouldn't make it to the object.
            walk: -> 'walker walk'

        xtest 'instance spec, and mixins pre, right order' ->
            red-animal.confess()
            |> expect-to-equal 'I am red'
            red-animal.hop()
            |> expect-to-equal 'topper hop'
            red-animal.top()
            |> expect-to-equal 'topper top'
            red-animal.pop()
            |> expect-to-equal 'walker pop'
        xtest "mixins pre doesn't clobber" ->
            red-animal.walk()
            |> expect-to-equal 'walk'

    describe 'mixins post' ->
        var proto, create, red-animal
        before-each ->
            init()
            fact = factory animal-proto, [], [hopper, topper, walker]
            proto := fact.proto
            create := fact.create
            red-animal := create color: 'red'
        after-each -> test-proto-unaltered()

        hopper =
            hop: -> 'hopper hop'
        topper =
            hop: -> 'topper hop'
            top: -> 'topper top'
        walker =
            pop: -> 'walker pop'
            # --- shouldn't make it to the object.
            walk: -> 'walker walk'

        xtest 'instance spec, and mixins post, right order' ->
            red-animal.confess()
            |> expect-to-equal 'I am red'
            red-animal.hop()
            |> expect-to-equal 'topper hop'
            red-animal.top()
            |> expect-to-equal 'topper top'
            red-animal.pop()
            |> expect-to-equal 'walker pop'
        xtest "mixins post does clobber" ->
            red-animal.walk()
            |> expect-to-equal 'walker walk'
        xtest 'mixins not altered' ->
            (num-keys hopper) |> expect-to-equal 1
            (num-keys topper) |> expect-to-equal 2
            (num-keys walker) |> expect-to-equal 2

    describe 'instance extension' ->
        var proto, create, red-animal
        before-each ->
            init()
            fact = factory animal-proto, [hopper, topper, walker], [hopper, topper, walker]
            proto := fact.proto
            create := fact.create

        hopper =
            hop: -> 'hopper hop'
        topper =
            hop: -> 'topper hop'
            top: -> 'topper top'
        walker =
            pop: -> 'walker pop'
            # --- shouldn't make it to the object.
            walk: -> 'walker walk'

        xtest 'instance spec' ->
            red-animal = create color: 'red'
            red-animal.confess()
            |> expect-to-equal 'I am red'

        xtest 'instance spec, multiple' ->
            red-animal = create do
                * color: 'red'
                * color: 'blue'
            red-animal.confess()
            |> expect-to-equal 'I am blue'

        xtest 'instance spec, multiple, prototypes discarded' ->
            spec1 = Object.create hidden: 42
                ..color = 'red'
                ..in = 'pines'
            spec2 = Object.create hidden: 43
                ..color = 'blue'
                ..out = 'leaves'

            red-animal = create spec1, spec2

            red-animal.confess()
            |> expect-to-equal 'I am blue'
            red-animal
            |> expect-to-equal do
                in: 'pines' out: 'leaves' color: 'blue'
