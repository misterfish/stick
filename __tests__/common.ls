array-ls = -> [.. for &]

test = (desc, the-test) --> global.it desc, the-test
xtest = (desc, the-test) --> global.xit desc, the-test

# --- i.e., 'dot1', but we're not allowed to use that in tests.
to-equal = (v, o) --> o.to-equal v
to-be = (v, o) --> o.to-be v

expect-to-equal = (expected, received) -->
    received |> expect |> to-equal expected
expect-to-be = (expected, received) -->
    received |> expect |> to-be expected

describe 'dummy' ->
    test 'dummy' ->

export
    array-ls,
    test, xtest,
    expect-to-equal, expect-to-be,
