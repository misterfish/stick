'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hideCursor = exports.showCursor = exports.stopSpinner = exports.startSpinner = exports.goUp = exports.blue = exports.brightBlue = exports.cyan = exports.brightRed = exports.red = exports.magenta = exports.yellow = exports.green = exports.log = exports.error = exports.warn = exports.appendToFile = exports.write = exports.writeFile = exports.sys = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _index = require('../../index');

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _op = function _op() {
    return _index.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
    return _index.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
    return _index.composeRight.apply(undefined, arguments);
};

_fishLib2.default.sysSet({ sync: false, die: false, verbose: false });

var on = (0, _index.dot2)('on');

var sys = exports.sys = function sys() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new Promise(function (res, rej) {
        var ret = void 0;
        var sysArgs = _op(args, (0, _index.concat)([function (_ref) {
            var out = _ref.out,
                ok = _ref.ok,
                err = _ref.err;
            return _op(ok, (0, _index.ifFalse)(function (_) {
                return _op(_op("cmd failed", _index.exception), _index.raise);
            }, function (_) {
                return ret = out;
            }));
        }]));
        _op(_op(_fishLib.sysSpawn.apply(undefined, _toConsumableArray(sysArgs)), on('close')(function (code, signal) {
            return code === 0 ? _op(ret, res) : _op(_op(code, 'cmd error (code = %d)'), rej);
        })), on('error')(rej));
    });
};

var writeFile = exports.writeFile = (0, _ramda.curry)(function (path, contents) {
    return _fs2.default.writeFileSync(path, contents);
});
var write = exports.write = _op('write', (0, _index.bindPropTo)(process.stdout));

var appendToFile = exports.appendToFile = (0, _ramda.curry)(function (filename, contents) {
    return _fs2.default.appendFileSync(filename, contents);
});

exports.warn = _fishLib.warn;
exports.error = _fishLib.error;
exports.log = _fishLib.log;
exports.green = _fishLib.green;
exports.yellow = _fishLib.yellow;
exports.magenta = _fishLib.magenta;
exports.red = _fishLib.red;
exports.brightRed = _fishLib.brightRed;
exports.cyan = _fishLib.cyan;
exports.brightBlue = _fishLib.brightBlue;
exports.blue = _fishLib.blue;
var goUp = exports.goUp = _op('[A', _index.always);

var spinner = {
    job: void 8,
    charIdx: 0,
    chars: "◓◑◒◐",
    label: '',
    lastNumChars: 0,
    cycleChar: function cycleChar() {
        this.charIdx = ++this.charIdx % this.chars.length;
    },
    str: function str() {
        var _this = this;

        return _op((0, _index.lets)(function (_) {
            return _op(_op('', (0, _index.timesV)(_this.lastNumChars)), (0, _index.join)(''));
        }, function (_) {
            return _this.chars[_this.charIdx];
        }, function (_) {
            return _this.label;
        }, function (pref, char, label) {
            return _op(_op(_op([char, label, char], (0, _index.sprintfN)('%s %s %s')), (0, _index.tap)(function (l) {
                return _this.lastNumChars = l.length;
            })), (0, _index.concatTo)(pref));
        }), (0, _index.tap)(function (_) {
            return _this.cycleChar();
        }));
    },
    start: function start(label) {
        var _this2 = this;

        this.label = label;
        this.job = setInterval(function (_) {
            return _op(_this2.str(), write);
        }, 100);
    },
    stop: function stop() {
        clearInterval(this.job);
    }
};

var startSpinner = exports.startSpinner = _op('start', (0, _index.bindPropTo)(spinner));
var stopSpinner = exports.stopSpinner = _op('stop', (0, _index.bindPropTo)(spinner));

var showCursor = exports.showCursor = function showCursor(_) {
    return _op('\x1B[?25h', write);
};
var hideCursor = exports.hideCursor = function hideCursor(_) {
    return _op('\x1B[?25l', write);
};