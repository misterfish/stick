    describe 'aliases' ->
        normal = [tap, tap-dot, tap-dot1, tap-dot2, tap-dot3, tap-dot-n]
        mut = [tap-mut, tap-dot-mut, tap-dot1-mut, tap-dot2-mut, tap-dot3-mut, tap-dot-n-mut]
        names = ['tap-mut', 'tap-dot-mut', 'tap-dot1-mut', 'tap-dot2-mut', 'tap-dot3-mut', 'tap-dot-n-mut']
        zip-all normal, mut, names
        |> each ([alias-l, alias-r, name]) ->
            test name, ->
                (expect alias-l).to-be alias-r

