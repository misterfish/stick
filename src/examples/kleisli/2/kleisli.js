defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import {
    pipe, compose, composeRight,
    ok, ifOk, ifPredicate, whenOk, whenPredicate,
    id, tap, recurry, roll,
    map, filter, reject, reduce, flip, flip3,
    join, split, last, head, tail,
    dot, dot1, dot2, side, side1, side2,
    cond, condS, guard, guardV, otherwise,
    sprintf1, sprintfN, rangeBy,
    noop, blush, always, T, F,
    prop, path, has, hasIn,
    bindPropTo, bindProp, bindTo, bind,
    assoc, assocPath, assocM, assocPathM,
    concatTo, concat, appendTo, append,
    concatToM, concatM, appendToM, appendM,
    merge, mergeTo, mergeM, mergeToM,
    mergeIn, mergeInTo, mergeInM, mergeInToM,
    updateM, update, updatePathM, updatePath,
    lets, letS, compactOk, compact,
    die, raise, decorateException, exception,
    lt, gt, eq, ne, lte, gte,
    factory, factoryProps,
} from '../../../index'

const init = dot2 ('init')
const create = dot ('create')

const flatMap = dot1 ('flatMap')

let IDX = -1

// a k function, when .call'd, should transparently flatmap.
// composing one or more functions is optional, and yields a new k function.
const proto = {
    init (f, tag)       { return this | mergeM ({
        tag,
        _f: f,
        idx: ++IDX,
    })},
    // call (...args) { return this._f (...args) },
    call (fx) {
        // console.log ('idx, fx', this.tag, fx)
        return fx.flatMap (x => {
            // console.log ('inside flatmap, x', x)
            // console.log ('inside flatmap, this._f', this._f)
            // console.log ('inside flatmap, this._f (x)', this.tag, this._f (x))
            return this._f (x)
        })
    },
    compose (b) {
        // console.log ('compose, b', b)
        //return k ((...args) => {
        return (...args) => {
            // b is a normal function
            // this is a magic one

            // console.log ('inside composed, args:', args)
            // console.log ('b', b)
            const bb = b (...args)
            // console.log ('bb, bb.getOrElse ("none")', bb.getOrElse ("none"))
            const called = this.call (bb)
            // console.log ('called', called)
            return called
        }
    },
}

const Kleisli = proto | factory

export const k = (f, tag = 'none') => Kleisli | create | init (f, tag)
export default Kleisli
