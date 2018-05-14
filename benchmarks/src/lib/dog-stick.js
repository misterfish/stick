#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DogInit = exports.DogSimple = exports.multi = exports.mergeFromM = exports.mergeFromMManual = exports.mergeToM = exports.mergeMixins = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _stick = require('stick');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _op = function _op(a, b) {
    return b(a);
};

var _op2 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(b, a);
});

var _op3 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(a, b);
});

// --- factory with a cycle is sometimes faster than new with a cycle.

var mergeMixins = exports.mergeMixins = function mergeMixins(mixinsPre, proto, mixinsPost) {
    // --- to be safe, don't make reduce point-free, though it would still have been ok for now
    // (since the merger is immutable)
    var reduceMixins = function reduceMixins(ary) {
        return (0, _ramda.reduce)(function (a, b) {
            return _op(b, (0, _stick.mergeTo)(a));
        })({})(ary);
    };
    var pre = _op(mixinsPre, reduceMixins);
    var post = _op(mixinsPost, reduceMixins);
    var chooseTarget = _stick.arg0;

    _op(pre, (0, _stick.mergeToWithM)(chooseTarget)(proto));
    _op(post, mergeToM(proto));

    return proto;
};

// --- one function laats: negligible difference. 400 ms on 1e6 iters.
var _factoryWithMixins = function _factoryWithMixins(proto) {
    var mixinsPre = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var mixinsPost = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var protoMixed = mergeMixins(mixinsPre, proto, mixinsPost);
    return {
        proto: protoMixed,
        create: function create() {
            for (var _len = arguments.length, instanceExtension = Array(_len), _key = 0; _key < _len; _key++) {
                instanceExtension[_key] = arguments[_key];
            }

            return _op(_op(protoMixed, Object.create), mergeFromM(_op(instanceExtension, _ramda.mergeAll)));
        }
    };
};

// --- orders of magnitude faster than cycling -- comparable to new.
// --- call it factoryInit, the other one factoryProps.
var factoryInit = function factoryInit(init) {
    return function (proto) {
        return {
            proto: proto,
            create: function create(props) {
                var o = Object.create(proto);
                init(o, props);
                return o;
            }
        };
    };
};

var factory = factoryInit(function (o, props) {
    if (props == null) return;
    for (var i in props) {
        if (oPro.hasOwnProperty.call(props, i)) o[i] = props[i];
    }
});

// --- hasOwnProperty only makes a difference of a few ms.
// deze.
var _factoryWithPropsCopyInlineIn = function _factoryWithPropsCopyInlineIn(proto) {
    // let i
    return {
        proto: proto,
        create: function create(props) {
            var p = Object.create(proto);
            for (var i in props) {
                p[i] = props[i];
            }return p;
        }
    };
};

// --- conclusions:
// - the thing that makes them (both) slow is cycling through the props.
// - hasOwnProperty adds a few ms @ 1e6
// - flip, curry, very expensive.
// - Object.assign about twice as slow as manual.
// - stick operator twice in constructor is negligible (about 60ms on 1e7 iters). still, make implementations non-stick.
// - init is much better than trying to name the props with an array.
// - mergeFromM is extremely slow (adds 4s @ 1e6)
// - allowing a props spread array makes it 200/300 ms slower at 1e6
// - doing factory in a composey way to allow init (factory | withInit (...)) is quite a bit slower,
// hard to justify.
// - factoryInit (noop) is trivially slower.
// - calling `has` instead of inlining it adds ~ 80ms per property @ 1e7
// - checking for props == null is trivial.

var mergeToM = exports.mergeToM = _stick.noop;
var oPro = Object.prototype;

// --- literally Object.assign, but Object.assign is 2x slower for some reason.
// --- *does* merge in non ok values (think ramda `has`)
var mergeFromMManual = exports.mergeFromMManual = function mergeFromMManual(src) {
    return function (tgt) {
        for (var i in src) {
            if (oPro.hasOwnProperty.call(src, i)) tgt[i] = src[i];
        }return tgt;
    };
};

var mergeFromM = exports.mergeFromM = mergeFromMManual;

// export const factory = (proto) => _factory (proto)

var proto = {
    speak: function speak() {
        return 'woof';
    }
};

var multi = exports.multi = function multi(factory) {
    var orig = factory.create;
    factory.create = function () {
        for (var _len2 = arguments.length, propsAry = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            propsAry[_key2] = arguments[_key2];
        }

        var merged = (0, _ramda.mergeAll)(propsAry);
        return orig.call(factory, merged);
    };
    return factory;
};

var DogSimple = exports.DogSimple = _op(proto, factory);
// export const DogSimpleTest = proto | factoryTest

var DogInit = exports.DogInit = _op(proto, factoryInit(function (p, props) {
    p.speed = props.speed;
    p.color = props.color;
}));

// --- ok.
// export const DogWithFunction4 = proto | factoryInit (noop)

// export const DogMulti = proto | factory | multi
// export const DogMultiInit = proto | factory | multi

// factoryInit, factory = factoryInit (noop)
// const DogInit = proto | factoryInit (noop)