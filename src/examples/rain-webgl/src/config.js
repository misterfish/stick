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
} from 'stick'

export default {
  canvasSelector: '#rain-canvas',
  defaultWeather: {
    raining:true,
    minR:20,
    maxR:50,
    rainChance:0.35,
    rainLimit:6,
    dropletsRate:50,
    dropletsSize:[3,5.5],
    trailRate:1,
    trailScaleRange:[0.25,0.35],
    flashFg:null,
    flashBg:null,
    flashChance:0,
    collisionRadiusIncrease:0.0002,
  },
  weatherData: {
    rain:{
      rainChance:0.35,
      dropletsRate:50,
      raining:true,
      // trailRate:2.5,
    },
    storm:{
      maxR:55,
      rainChance:0.4,
      dropletsRate:80,
      dropletsSize:[3,5.5],
      trailRate:2.5,
      trailScaleRange:[0.25,0.4],
//       flashFg:textureStormLightningFg,
//       flashBg:textureStormLightningBg,
//       flashChance:0.1
    },
    fallout:{
      minR:30,
      maxR:60,
      rainChance:0.35,
      dropletsRate:20,
      trailRate:4,
      collisionRadiusIncrease:0
    },
    drizzle:{
      minR:10,
      maxR:40,
      rainChance:0.15,
      rainLimit:2,
      dropletsRate:10,
      dropletsSize:[3.5,6],
    },
    sunny:{
      rainChance:0,
      rainLimit:0,
      droplets:0,
      raining:false,
    },
  },
  defaultRaindrops: {
    minR:10,
    maxR:40,
    maxDrops:900,
    rainChance:0.3,
    rainLimit:3,
    dropletsRate:50,
    dropletsSize:[2,4],
    dropletsCleaningRadiusMultiplier:0.43,
    raining:true,
    globalTimeScale:1,
    trailRate:1,
    autoShrink:true,
    spawnArea:[-0.1,0.95],
    trailScaleRange:[0.2,0.5],
    collisionRadius:0.65,
    collisionRadiusIncrease:0.01,
    dropFallMultiplier:1,
    collisionBoostMultiplier:0.05,
    collisionBoost:1,
  },
}
