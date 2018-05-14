#!/usr/bin/env node

'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _stick = require('stick');

var _dogTrad = require('./dog-trad');

var _dogTrad2 = _interopRequireDefault(_dogTrad);

var _dogStick = require('./dog-stick');

var _util = require('../util');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var _op = function _op(a, b) {
    return b(a);
};

var _op2 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(b, a);
});

var _op3 = (0, _ramda.curry)(function (a, b) {
    return (0, _ramda.compose)(a, b);
});

var laats3 = function laats3(f1, f2, f3) {
    var n1 = f1();
    var n2 = f2(n1);
    return f3(n1, n2);
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

        var copy = [].concat((0, _toConsumableArray3.default)(ary));
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

        var copy = [].concat((0, _toConsumableArray3.default)(ary));
        copy.sort(function (a, b) {
            var va = a.y * (width / scale) + a.x;
            var vb = b.y * (width / scale) + b.x;
            return va > vb ? 1 : va == vb ? 0 : -1;
        });
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

var suite3 = [
// _ => bench ('stick, 1000, 2 props, with init', n) (stickTwoPropsWithInit (1000)),
function (_) {
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

var suites = [suite3, suiteLaats];

_op(DogSimpleMixinComposey.create(), _fishLib.log);

// suites | map (invoke | each)