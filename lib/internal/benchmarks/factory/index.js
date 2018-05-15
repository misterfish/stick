#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.myside1 = exports.myside = exports.mydot = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _stick = require('stick');

var _dogTrad = require('./dog-trad');

var _dogTrad2 = _interopRequireDefault(_dogTrad);

var _dogStick = require('./dog-stick');

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _op = function _op(a, b) {
    return b(a);
};

var _op2 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(b, a);
});

var _op3 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(a, b);
});

var logWith = function logWith(header) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _fishLib.log.apply(undefined, [header].concat(args));
    };
};

var trad = function trad(n) {
    return function () {
        for (var i = 0; i < n; i++) {
            new _dogTrad2.default();
        }
    };
};

var stick = function stick(n) {
    return function () {
        for (var i = 0; i < n; i++) {
            _dogStick.DogSimple.create();
        }
    };
};

var trad2props = function trad2props(n) {
    return function () {
        for (var i = 0; i < n; i++) {
            new _dogTrad2.default({
                color: 'blue', speed: 'fast'
            });
        }
    };
};

var stick2props = function stick2props(n) {
    return function () {
        for (var i = 0; i < n; i++) {
            _dogStick.DogSimple.create({
                color: 'blue', speed: 'fast'
            });
        }
    };
};

// const tradTwoProps = n => () => {
//     for (let i = 0; i < n; i++) new DogTrad ({
//         'blue', 'fast'
// }

var stickTwoPropsWithInit = function stickTwoPropsWithInit(n) {
    return function () {
        for (var i = 0; i < n; i++) {
            _dogStick.DogInit.create({
                color: 'blue', speed: 'fast'
            });
        }
    };
};

var stickTwoPropsWithInitComposey = function stickTwoPropsWithInitComposey(n) {
    return function () {
        for (var i = 0; i < n; i++) {
            _dogStick.DogInitComposey.create({
                color: 'blue', speed: 'fast'
            });
        }
    };
};

var stickTwoPropsCopying = function stickTwoPropsCopying(n) {
    return function () {
        for (var i = 0; i < n; i++) {
            _dogStick.DogSimple.create({
                color: 'blue', speed: 'fast'
            });
        }
    };
};

var stickZeroPropsCopyingNoArg = function stickZeroPropsCopyingNoArg(n) {
    return function () {
        for (var i = 0; i < n; i++) {
            _dogStick.DogSimple.create();
        }
    };
};

var stickZeroPropsCopyingEmptyObject = function stickZeroPropsCopyingEmptyObject(n) {
    return function () {
        for (var i = 0; i < n; i++) {
            _dogStick.DogSimple.create({});
        }
    };
};

var stickTwoPropsCopyingTest = function stickTwoPropsCopyingTest(n) {
    return function () {
        for (var i = 0; i < n; i++) {
            _dogStick.DogSimpleTest.create({
                color: 'blue', speed: 'fast'
            });
        }
    };
};

var stickZeroPropsCopyingNoArgTest = function stickZeroPropsCopyingNoArgTest(n) {
    return function () {
        for (var i = 0; i < n; i++) {
            _dogStick.DogSimpleTest.create();
        }
    };
};

var stickZeroPropsCopyingEmptyObjectTest = function stickZeroPropsCopyingEmptyObjectTest(n) {
    return function () {
        for (var i = 0; i < n; i++) {
            _dogStick.DogSimpleTest.create({});
        }
    };
};

var testLaatsData = function testLaatsData(_) {
    return [{ x: 100, y: 200 }, { x: 200, y: 250 }, { x: 100, y: 200 }, { x: 200, y: 250 }, { x: 100, y: 200 }, { x: 200, y: 250 }, { x: 100, y: 200 }, { x: 200, y: 250 }, { x: 100, y: 200 }, { x: 200, y: 250 }, { x: 100, y: 200 }, { x: 200, y: 250 }, { x: 100, y: 200 }, { x: 200, y: 250 }];
};

var testLaats3 = function testLaats3(ary) {
    return function () {
        var width = 100,
            scale = 1.5;

        var copy = [].concat(_toConsumableArray(ary));
        copy.sort(function (a, b) {
            return laats3(function (_) {
                return a.y * (width / scale) + a.x;
            }, function (_) {
                return b.y * (width / scale) + b.x;
            }, function (va, vb) {
                return va > vb ? 1 : va == vb ? 0 : -1;
            });
        });
    };
};

var testNoLaats3 = function testNoLaats3(ary) {
    return function () {
        var width = 100,
            scale = 1.5;

        var copy = [].concat(_toConsumableArray(ary));
        copy.sort(function (a, b) {
            var va = a.y * (width / scale) + a.x;
            var vb = b.y * (width / scale) + b.x;
            return va > vb ? 1 : va == vb ? 0 : -1;
        });
    };
};

var testMixinsComposey = function testMixinsComposey(n) {
    return function () {
        for (var i = 0; i < n; i++) {
            _dogStick.DogSimpleMixinComposey.create();
        }
    };
};
var testMixinsNotComposey = function testMixinsNotComposey(n) {
    return function () {
        for (var i = 0; i < n; i++) {
            _dogStick.DogSimpleMixinNotComposey.create();
        }
    };
};

var mydot = exports.mydot = function mydot(prop) {
    return function (o) {
        return o[prop]();
    };
};
var myside = exports.myside = function myside(prop) {
    return function (o) {
        return o[prop](), o;
    };
};
var myside1 = exports.myside1 = function myside1(prop) {
    return function (val) {
        return function (o) {
            return o[prop](val), o;
        };
    };
};

var create = mydot('create');
var speak = myside('speak');
var sleep = myside('sleep');
var repeat = myside1('repeat');

_op(_op(_dogStick.DogSimple.create(), speak), _fishLib.log);

var testMethodsStick = function testMethodsStick(Dog) {
    return function (_) {
        return _op(_op(_op(_op(Dog, create), speak), sleep), repeat('methods sticks'));
    };
};

var testMethodsDots = function testMethodsDots(Dog) {
    return function () {
        var d = Dog.create();
        d.speak();
        d.sleep();
        d.repeat('methods dots');
    };
};

var n = 1e4;
var suite1 = [function (_) {
    return (0, _util.bench)('trad create 1000', n)(trad(1000));
}, function (_) {
    return (0, _util.bench)('stick create 1000', n)(stick(1000));
}];

var suite2 = [function (_) {
    return (0, _util.bench)('trad create 1000 with 2 props', n)(trad2props(1000));
}, function (_) {
    return (0, _util.bench)('stick create 1000 with 2 props', n)(stick2props(1000));
}];

var suite3 = [function (_) {
    return (0, _util.bench)('stick, 1000, 2 props, with init', n)(stickTwoPropsWithInit(1000));
}, function (_) {
    return (0, _util.bench)('stick, 1000, 2 props, with init composey', n)(stickTwoPropsWithInitComposey(1000));
}, function (_) {
    return (0, _util.bench)('stick, 1000, 2 props, by copying', n)(stickTwoPropsCopying(1000));
}, function (_) {
    return (0, _util.bench)('stick, 1000, 0 props, by copying, {}', n)(stickZeroPropsCopyingEmptyObject(1000));
}, function (_) {
    return (0, _util.bench)('stick, 1000, 0 props, by copying, undef', n)(stickZeroPropsCopyingNoArg(1000));
}];

var suite3test = [
// _ => bench ('stick, 1000, 2 props, with init', n) (stickTwoPropsWithInitTest (1000)),
function (_) {
    return (0, _util.bench)('stick, 1000, 2 props, by copying', n)(stickTwoPropsCopyingTest(1000));
}, function (_) {
    return (0, _util.bench)('stick, 1000, 0 props, by copying, {}', n)(stickZeroPropsCopyingEmptyObjectTest(1000));
}, function (_) {
    return (0, _util.bench)('stick, 1000, 0 props, by copying, undef', n)(stickZeroPropsCopyingNoArgTest(1000));
}];

var suiteLaats = [function (_) {
    return (0, _util.bench)('laats with 3', n)(testLaats3(testLaatsData()));
}, function (_) {
    return (0, _util.bench)('no laats with 3', n)(testNoLaats3(testLaatsData()));
}];

var suiteMixins = [function (_) {
    return (0, _util.bench)('mixins composey, 1000 obj', n)(testMixinsComposey(1000));
}, function (_) {
    return (0, _util.bench)('mixins not composey, 1000 obj', n)(testMixinsNotComposey(1000));
}];

var suiteMethods = [function (_) {
    return (0, _util.bench)('methods as sticks', n)(testMethodsStick(_dogStick.DogSimple));
}, function (_) {
    return (0, _util.bench)('methods as dots', n)(testMethodsDots(_dogStick.DogSimple));
}];

var suites = [suiteMethods, suite3,
// suiteLaats,
suiteMixins];

_op(suites, (0, _ramda.map)(_op(_stick.invoke, _ramda.forEach)));