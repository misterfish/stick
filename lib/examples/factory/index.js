#!/usr/bin/env node
'use strict';

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _index = require('../../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _op = function _op() {
    return _index.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
    return _index.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
    return _index.composeRight.apply(undefined, arguments);
};

var logWith = function logWith(header) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _fishLib.log.apply(undefined, [header].concat(args));
    };
};

var create = _op('create', _index.dot1);
var init = _op('init', _index.side);
var speak = _op('speak', _index.dot);

var animalProto = {
    speak: function speak() {
        _op("don't know how to speak", die);
    }
};

var dogProto = {
    init: function init() {
        return this;
    },
    speak: function speak() {
        return this.loud ? 'WOOF' : 'woof ';
    }
};

var dogProps = {
    loud: void 8,
    type: 'dog'
};

var cheatProto = {
    cheat: function cheat(howMuch) {
        return 'i cheat ' + howMuch;
    }
};

var eatProto = {
    eat: function eat(howMuch) {
        return 'i eat ' + howMuch;
    }
};

var oratorProto = {
    practice: _index.noop,
    speak: function speak(_) {
        return 'blah blah blah';
    }
};

var fac1 = _op(_op(dogProto, _index.factory), (0, _index.factoryProps)(dogProps));

_op(_op(_op(_op(fac1, create({})), init), speak), _fishLib.log);
_op(_op(_op(_op(fac1, create({ loud: true })), init), speak), _fishLib.log);
_op(_op(_op(_op(fac1, create({})), init), (0, _ramda.prop)('type')), _fishLib.log);

var cheat = (0, _index.dot1)('cheat');
var eat = (0, _index.dot1)('eat');

var fac2 = _op(_op(_op(_op(dogProto, Object.create), (0, _index.mixinNM)([cheatProto, eatProto, oratorProto])), _index.factory), (0, _index.factoryProps)(dogProps));
var dogRuinedByAnOrator = _op(_op(fac2, create({ loud: true })), init);

_op(_op(dogRuinedByAnOrator, cheat('a lot')), _fishLib.log);
_op(_op(dogRuinedByAnOrator, eat('a bit')), _fishLib.log);
_op(_op(dogRuinedByAnOrator, speak), _fishLib.log);

// which speak do you want?
// pre to keep dog
// post for orator

// also a good place to show tap
// const fac3 = dogProto | Object.create | mixinPreNM ([ cheatProto, eatProto, oratorProto, ]) | factory | factoryProps (dogProps)
var fac3 = _op(_op(_op(_op(dogProto, Object.create), (0, _index.mixinPreM)(oratorProto)), _index.factory), (0, _index.factoryProps)(dogProps));
var dogSpeaksTheWayShesSupposedTo = _op(_op(fac3, create({ loud: true })), init);
_op(_op(dogSpeaksTheWayShesSupposedTo, speak), logWith('no blah blah:'));

var a = { speak: 'orig' };
var b = { speak: 'ruined' };
_op(_op(a, (0, _index.mixinPreM)(b)), _fishLib.log);