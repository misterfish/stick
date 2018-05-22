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
    factory, factory-init, factory-props, factory-statics,
} = require '../index'

num-keys = keys >> (.length)

describe 'factory ' ->
#     var prehistoric-proto
#     var animal-proto
#     var dog-proto
# 
#     init = ->
#         prehistoric-proto :=
#             ooze: -> 'ooze'
#             breathe: -> throw new Error 'not implemented'
#             speak: -> throw new Error 'not implemented'
# 
#         animal-proto := (Object.create prehistoric-proto) <<<
#             breathe: -> 'wooo'
#             speak: -> throw new Error 'not implemented'
#         dog-proto := (Object.create animal-proto) <<<

    # --- so we can test for alterations.
    dog-speak = -> if @loud then 'WOOF' else 'woof'
    get-dog-proto = -> speak: dog-speak
    # /---

    dog-proto = get-dog-proto ()
    # --- only for doc
    dog-props = loud: void

    describe 'factoryInit' ->
        describe 'noop init' ->
            dog-factory = dog-proto |> factory-init ->
            dog = dog-factory.create()
            before-each -> dog.loud = false
            test 1 ->
                dog.speak () |> expect-to-equal 'woof'
                dog.loud = true
                dog.speak () |> expect-to-equal 'WOOF'
            test 2 ->
                pug = (dog-factory.proto |> factory-init ->).create()
                pug.speak () |> expect-to-equal 'woof'
        describe 'init' ->
            init = (o, props) -> o.loud = props.loud
            dog-factory = dog-proto |> factory-init init
            test 1 ->
                dog1 = dog-factory.create loud: false
                dog1.speak () |> expect-to-equal 'woof'
                dog2 = dog-factory.create loud: true
                dog2.speak () |> expect-to-equal 'WOOF'
            test 'factory proto prop' ->
                dog-factory.proto |> expect-to-equal dog-proto
            test 'manual extend' ->
                pug-proto = {} <<< dog-proto <<< is-pug: -> true
                pug = (pug-proto |> factory-init init).create loud: true
                pug.speak () |> expect-to-equal 'WOOF'
                pug.is-pug () |> expect-to-equal true
            test 'instance spec not altered' ->
                spec = loud: true
                dog1 = dog-factory.create spec
                dog1.speak () |> expect-to-equal 'WOOF'
                spec |> expect-to-equal loud: true
            test 'proto not altered' ->
                dog1 = dog-factory.create loud: true
                dog1.speak () |> expect-to-equal 'WOOF'
                dog-factory.proto |> expect-to-equal get-dog-proto()

    describe 'factory' ->
        describe 'factory' ->
            dog-factory = dog-proto |> factory
            test 1 ->
                dog1 = dog-factory.create loud: false
                dog1.speak () |> expect-to-equal 'woof'
                dog2 = dog-factory.create loud: true
                dog2.speak () |> expect-to-equal 'WOOF'
            test 'factory proto prop' ->
                dog-factory.proto |> expect-to-equal dog-proto
            test 'manual extend' ->
                pug-proto = {} <<< dog-proto <<< is-pug: -> true
                pug = (pug-proto |> factory).create loud: true
                pug.speak () |> expect-to-equal 'WOOF'
                pug.is-pug () |> expect-to-equal true
            test 'null/undef props' ->
                dog1 = dog-factory.create null
                dog1.speak () |> expect-to-equal 'woof'
                dog2 = dog-factory.create void
                dog2.speak () |> expect-to-equal 'woof'
                dog3 = dog-factory.create ()
                dog3.speak () |> expect-to-equal 'woof'
            test 'props: only own get copied' ->
                props-base = base-val: 15
                props = (Object.create props-base)
                    ..loud = true
                dog = dog-factory.create props
                dog.speak () |> expect-to-equal 'WOOF'
                dog.loud |> expect-to-equal true
                dog.base-val |> expect-to-equal void
            test 'proto not altered' ->
                props = loud: true
                dog = dog-factory.create props
                dog.speak () |> expect-to-equal 'WOOF'
                dog-factory.proto |> expect-to-equal dog-proto
            test 'props not altered' ->
                props = loud: true
                dog = dog-factory.create props
                dog.speak () |> expect-to-equal 'WOOF'
                props |> expect-to-equal loud: true
        describe 'factoryProps' ->
            base = base-val: 10
            props-loud = (Object.create base)
                ..loud = true
            props-soft-x = (Object.create loud: false)
            dog-factory = dog-proto |> factory |> factory-props props-loud
            test 'no props in create' ->
                dog1 = dog-factory.create ()
                dog1.speak () |> expect-to-equal 'WOOF'
            test 'null/undef props in create' ->
                dog1 = dog-factory.create null
                dog1.speak () |> expect-to-equal 'WOOF'
                dog2 = dog-factory.create void
                dog2.speak () |> expect-to-equal 'WOOF'
            test 'only own props in factory props get copied' ->
                dog1 = dog-factory.create ()
                dog1.speak () |> expect-to-equal 'WOOF'
                dog1.base-val |> expect-to-equal void
            test 'props in create override props in factoryProps' ->
                dog = dog-factory.create loud: false
                dog.speak () |> expect-to-equal 'woof'
            test '... but only own props in the create props' ->
                dog = dog-factory.create props-soft-x
                dog.speak () |> expect-to-equal 'WOOF'
            test '... and only if they are not null/undef' ->
                dog = dog-factory.create loud: null
                dog.speak () |> expect-to-equal 'WOOF'
            test 'proto not altered' ->
                props = loud: true
                dog = dog-factory.create props
                dog.speak () |> expect-to-equal 'WOOF'
                dog-factory.proto |> expect-to-equal dog-proto
            test 'neither props object altered' ->
                props = loud: true
                dog = dog-factory.create props
                dog.speak () |> expect-to-equal 'WOOF'
                props |> expect-to-equal loud: true
                props-loud |> expect-to-equal loud: true
                props-loud.base-val |> expect-to-equal 10
        describe 'factoryStatics' ->
            base = base-val: 10
            statics = (Object.create base)
                ..num-legs = -> 4
            dog-factory = dog-proto |> factory |> factory-statics statics
            test 1 ->
                dog = dog-factory.create ()
                dog.speak () |> expect-to-equal 'woof'
                dog-factory.num-legs () |> expect-to-equal 4
            test 'only own properties in the statics object' ->
                dog = dog-factory.create ()
                dog.speak () |> expect-to-equal 'woof'
                dog-factory.num-legs () |> expect-to-equal 4
                dog-factory.base-val |> expect-to-equal void

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
