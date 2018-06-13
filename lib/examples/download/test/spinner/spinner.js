'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('../../../../index');

var _op = function _op() {
    return _index.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
    return _index.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
    return _index.composeRight.apply(undefined, arguments);
};

var config = {
    spinners: {
        stick: "|/-\\",
        zero: ".o0O0o. ",
        arrows: "⇐⇖⇑⇗⇒⇘⇓⇙",
        wheel: "◓◑◒◐",
        pie: "○◔◑◕●",
        clock1: "◴◷◶◵",
        clock2: require('./spinner-clock').default,
        bars: "▏▎▍▌▋▊▉█▉▊▌▍▎",
        gauge: "▁▂▃▄▅▆▇█▇▆▅▄▃▂"
    }
};

exports.default = function (type) {
    var str = _op(config.spinners[type], (0, _index.defaultToV)([]));
    var i = 0;
    var l = str.length;
    var arr = _op(str, (0, _index.split)(''));
    return function (_) {
        return arr[++i % l];
    };
};