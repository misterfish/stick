defineBinaryOperator ('|', (a, b) => b (a))
defineBinaryOperator ('>>', curry ((a, b) => compose (b, a)))
defineBinaryOperator ('<<', curry ((a, b) => compose (a, b)))

import ramda, {
    always, not,
  either, both,
    any, all, allPass, anyPass,
    isEmpty, tap, has, hasIn, flip, fromPairs, toPairs, assoc, assocPath, head,
    tail, reduceRight, chain, identity as id, reduce, map, filter, reject, join,
    split, splitAt, prop, curry, zip, contains,
    forEach as each, forEachObjIndexed as eachObj, complement,
    isNil, addIndex, take, equals, mapAccum, compose, append, concat,
    T, F, repeat as rRepeat, times as rTimes, range,
} from 'ramda'

import {
    ok, ifOk, ifTrue, ifFalse, ifYes, ifNo, ifPredicate, ifEmpty,
    whenOk, whenTrue, whenFalse, whenYes, whenNo, whenPredicate, whenEmpty,
    dot, dot1, dot2, nieuw, nieuw1, nieuw2,
    cond, guard, otherwise,
    sprintf1, sprintfN, times, rangeBy,
    noop, doe, blush,
    concatTo, concatFrom, appendTo, appendFrom, appendToMut,
    invoke, applyN, pass1,
    laat, laatO, laats, laatsO,
    compactOk, compact,
    lt, gt, eq, ne, lte, gte,
  factory, factoryInit, factoryProps,
  side, side1, side2, side3, side4, side5,
  mergeFromM,
} from 'stick'

import * as WebGL from "./webgl"

const instance = {
  canvas: void 8,
  options: void 8,
  vert: void 8,
  frag: void 8,
  gl: void 8,
  program: void 8,
  width: 0,
  height: 0,
}

const proto = {
  init () {
    const { canvas, options, vert, frag, } = this
    this.gl = WebGL.getContext (canvas, options)
    const program = this.createProgram (vert, frag)
    console.log ('program', program)
    return this | mergeFromM ({
      program,
      width: canvas.width,
      height: canvas.height,
    }) | useProgram (program)
  },
  createProgram (vert, frag) {
    return WebGL.createProgram (this.gl, vert, frag)
  },
  useProgram (program) {
    this.program = program
    this.gl.useProgram (program)
    return this
  },
  createTexture (source, i) {
    return WebGL.createTexture (this.gl, source, i)
  },
  createUniform (type, name, ...v) {
    return WebGL.createUniform (this.gl, this.program, type, name, ...v)
  },
  activeTexture (i) {
    return WebGL.activeTexture (this.gl, i)
  },
  updateTexture (source) {
    return WebGL.updateTexture (this.gl, source)
  },
  draw () {
    WebGL.setRectangle (this.gl,  -1,  -1,  2,  2)
    this.gl.drawArrays (this.gl.TRIANGLES,  0,  6)
  },
}

export const createUniform2f = side4 ('createUniform') ('2f')
export const createUniform1f = side3 ('createUniform') ('1f')
export const createUniform1i = side3 ('createUniform') ('1i')
export const createTexture = side2 ('createTexture')
export const useProgram = side1 ('useProgram')
export const activeTexture = side1 ('activeTexture')
export const updateTexture = side1 ('updateTexture')
export const draw = side ('draw')

export default proto | factory | factoryProps (instance)
