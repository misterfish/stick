fs = require 'fs'

{
    map,
} = require 'ramda'

# {
#     left,
# } = require 'bilby'

list = -> [.. for &]

test = (desc, the-test) --> global.it desc, the-test
xtest = (desc, the-test) --> global.xit desc, the-test
{ before-all, before-each, } = global

to-equal = (v, o) --> o.to-equal v
to-be = (v, o) --> o.to-be v
to-throw = (o) -> o.to-throw()
to-throw-a = (v, o) --> o.to-throw v

expect-to-equal = (expected, received) -->
    received |> expect |> to-equal expected
expect-to-be = (expected, received) -->
    received |> expect |> to-be expected
expect-not-to-equal = (expected, received) -->
    (expect received).not.to-equal expected
expect-not-to-be = (expected, received) -->
    (expect received).not.to-be expected
expect-ok = (received) ->
    received |> expect-to-equal expect.anything()
expect-to-match-regex = (regex, received) -->
    (expect received).to-equal expect.string-matching regex

expect-to-be-instance-of = (expected, received) -->
    (expect received).to-be-instance-of expected

# --- checks constructor.name.
expect-constructor-name-to-be = (expected, received) -->
    received.constructor.name |> expect-to-be expected

# --- expect-to-reject is dangerous, prefer expect-to-reject-with.
expect-to-reject = (fn) ->
    res = [false]
    fn()
        .catch -> res.0 = true
        .then ->
            res.0 |> expect-to-be true

expect-to-reject-with = (catcher, fn) -->
    fn()
        .then ->
            false |> expect-to-be true
        .catch catcher

expect-to-throw = (fn) ->
    fn
    |> expect
    |> to-throw

expect-to-throw-a = (error-type, fn) -->
    fn
    |> expect
    |> to-throw-a error-type

expect-not-to-throw = (fn) ->
    fn()
    true |> expect-to-be true

zip-all = (...xss) ->
    ret = []
    l = xss.0.length
    for i from 0 to l - 1
        ret.push do
            xss |> map (xs) -> xs[i]
    ret

# --- throws.
rm-if-exists = (filepath, { verbose = false, } = {}) ->
    return unless fs.existsSync filepath
    console.log 'Removing ' filepath if verbose
    fs.unlinkSync filepath


describe 'dummy' ->
    test 'dummy' ->

export
    list,
    test, xtest, before-all, before-each,
    rm-if-exists,
    zip-all,
    expect-to-equal, expect-to-be,
    expect-ok,
    expect-not-to-equal, expect-not-to-be,
    expect-to-reject, expect-to-reject-with,
    expect-to-match-regex,
    expect-to-throw, expect-to-throw-a,
    expect-not-to-throw,

    expect-to-be-instance-of,
    expect-constructor-name-to-be,
