#!/usr/bin/env node
'use strict';

var _ramda = require('ramda');

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _op = function _op(a, b) {
    return b(a);
};

var _op2 = function _op2(a, b) {
    return function () {
        return b(a.apply(undefined, arguments));
    };
};

_op(_op('lots of pigs', (0, _index.xReplace)(/ (o .) /)('po')), _fishLib.log); // 'lpos of pigs'

_op(_op('lots of pigs', (0, _index.xReplace)(/ (o .) /g)('po')), _fishLib.log); // 'lpos po pigs'

_op(_op('lots of pigs', (0, _index.xReplaceStr)(' (o .. p) ')('stick')), _fishLib.log); // 'lots stickigs'

_op(_op('lots of pigs', (0, _index.xReplaceStrFlags)(' (o .) ')('')('po')), _fishLib.log); // 'lpos of pigs'

_op(_op('lots of pigs', (0, _index.xReplaceStrFlags)(' (o .) ')('g')('po')), _fishLib.log); // 'lpos po pigs'


var fromCelsius = function fromCelsius(cel) {
    return (0, _index.laat)([cel / 5 * 9 + 32, cel - 273], function (fah, kel) {
        return _op(_op([cel, fah, kel], (0, _index.applyScalar)([_fishLib.cyan, _fishLib.yellow, _fishLib.magenta])), (0, _index.sprintfN)('%s°C -> %s°F / %s°K'));
    });
};

// --- sucks a lot.
var fromCelsiusAlt = function fromCelsiusAlt(cel) {
    return (0, _index.laat)([cel / 5 * 9 + 32, cel - 273], _op2(_op2(_op2(_index.array, (0, _index.prependFrom)(cel)), (0, _index.applyScalar)([_fishLib.cyan, _fishLib.yellow, _fishLib.magenta])), (0, _index.sprintfN)('%s°C -> %s°F / %s°K')));
};

var fromFahrenheitMwah = function fromFahrenheitMwah(fah) {
    return (0, _index.laat)([(fah - 32) / 9 * 5, (fah - 32) / 9 * 5 - 273], function (cel, kel) {
        return _op(_op([fah, cel, kel], (0, _index.applyScalar)([_fishLib.yellow, _fishLib.cyan, _fishLib.magenta])), (0, _index.sprintfN)('%s°F -> %s°C / %s°K'));
    });
};

var fromFahrenheit = function fromFahrenheit(fah) {
    return (0, _index.laatStar)([function () {
        return (fah - 32) / 9 * 5;
    }, function (cel) {
        return cel - 273;
    }], function (cel, kel) {
        return _op(_op([fah, cel, kel], (0, _index.applyScalar)([_fishLib.yellow, _fishLib.cyan, _fishLib.magenta])), (0, _index.sprintfN)('%s°F -> %s°C / %s°K'));
    });
};
_op(_op(30, fromCelsius), _fishLib.log);
_op(_op(86, fromFahrenheit), _fishLib.log);