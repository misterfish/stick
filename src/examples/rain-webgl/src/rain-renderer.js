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
  assocM,
  mergeFromM,
} from 'stick'

import * as WebGL from "./webgl"
import GL, {
  createUniform2f,
  createUniform1f,
  createUniform1i,
  createTexture,
  useProgram,
  activeTexture,
  updateTexture,
  draw,
} from "./gl-obj"
import loadImages from "./image-loader"
import createCanvas from "./create-canvas"

const eachX = addIndex (each)
const _draw = side ('_draw')

const requireShaderScript = require ('glslify')

const vertShader = requireShaderScript ('./shaders/simple.vert')
const fragShader = requireShaderScript ('./shaders/water.frag')

const defaultOptions = {
  renderShadow: false,
  minRefraction: 256,
  maxRefraction: 512,
  brightness: 1,
  alphaMultiply: 20,
  alphaSubtract: 5,
  parallaxBg: 5,
  parallaxFg: 20
}

const instance = {
  canvas: void 8,
  canvasLiquid: void 8,
  imageFg: void 8,
  imageBg: void 8,
  imageShine: void 8,
  optionsArg: void 8,

  gl: void 8,
  width: 0,
  height: 0,
  textures: void 8,
  programWater: void 8,
  parallaxX: 0,
  parallaxY: 0,
  renderShadow: false,
  options: void 8,
}

// --- xxx vertShader and fragShader are not instance vars
const proto = {
  init () {
    const { optionsArg, canvas, } = this
    this | mergeFromM ({
      options: Object.assign ({}, defaultOptions, optionsArg),
      width: canvas.width,
      height: canvas.height,
      gl: GL.create ({
        canvas,
        vert: vertShader,
        frag: fragShader,
        options: { alpha: false },
      }).init (),
    })

    const { gl, width, height, imageBg, imageFg, imageShine, options, } = this

    const { renderShadow, minRefraction, maxRefraction, brightness, alphaMultiply, alphaSubtract, parallaxBg, parallaxFg, } = options
    const { width: ibWidth, height: ibHeight } = imageBg
    this.programWater = gl.program

    gl | createUniform2f ('resolution', width, height)
       | createUniform1f ('textureRatio', width / height)
       | createUniform1i ('renderShine', imageShine | ok)
       | createUniform1i ('renderShadow', renderShadow)
       | createUniform1f ('minRefraction', minRefraction)
       | createUniform1f ('refractionDelta', maxRefraction-minRefraction)
       | createUniform1f ('brightness', brightness)
       | createUniform1f ('alphaMultiply', alphaMultiply)
       | createUniform1f ('alphaSubtract', alphaSubtract)
       | createUniform1f ('parallaxBg', parallaxBg)
       | createUniform1f ('parallaxFg', parallaxFg)
       | createTexture (null,  0)

    const textures = [
      {
        name: 'textureShine',
        img: imageShine | ifOk (
          id,
          _ => createCanvas (2, 2),
        ),
      },
      { name: 'textureFg', img: imageFg },
      { name: 'textureBg', img: imageBg }
    ]

    textures | eachX (({ img, name }, i) => gl
      | createTexture (img, i+1)
      | createUniform1i (name, i+1)
    )

    return this
      | assocM ('textures', textures)
      | _draw
  },

  _draw () {
    const { gl, programWater, parallaxX, parallaxY, } = this
    gl | useProgram (programWater)
       | createUniform2f ('parallax', parallaxX, parallaxY)
    this.updateTexture()
    gl | draw

    return this.requestDraw ()
  },

  requestDraw () {
    requestAnimationFrame (_ => this._draw ())
    return this
  },

  updateTextures () {
    const { textures, gl, } = this
    textures | eachX ((texture, i) => gl
      | activeTexture (i+1)
      | updateTexture (texture.img)
    )
  },

  updateTexture () {
    const { gl, canvasLiquid, } = this
    gl | activeTexture (0)
       | updateTexture (canvasLiquid)
  },

  resize(){
  },
  get overlayTexture(){
  },
  set overlayTexture(v){
  }
}

export default proto | factory | factoryProps (instance)
