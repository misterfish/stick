defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import {
    pipe, compose, composeRight,
    ok, split,
    defaultToV,
} from '../../../../index'

const config = {
	spinners: {
        stick: "|/-\\",
        zero: ".o0O0o. ",
        arrows: "⇐⇖⇑⇗⇒⇘⇓⇙",
        wheel: "◓◑◒◐",
        pie: "○◔◑◕●",
        clock1: "◴◷◶◵",
        clock2: require ('./spinner-clock').default,
        bars: "▏▎▍▌▋▊▉█▉▊▌▍▎",
        gauge: "▁▂▃▄▅▆▇█▇▆▅▄▃▂",
    }
}

export default (type) => {
    const str = config.spinners [type] | defaultToV ([])
    let i = 0
    let l = str.length
    const arr = str | split ('')
    return _ => arr [++i % l]
}
