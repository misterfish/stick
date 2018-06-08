defineBinaryOperator ('|',  (...args) => pipe         (...args))

import {
    pipe,
    mergeM,
} from '../../../index'

export const enhanceFunction = () => {
    const proto = {
        compose (b) {
            return (...args) => this (b (...args))
        },
    }
    Function.prototype | mergeM (proto)
}

