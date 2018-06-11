'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startDownloads = undefined;

var _index = require('../../index');

var _types = require('./types');

var _http = require('./http');

var _utilBilby = require('./util-bilby');

var _utilDaggy = require('./util-daggy');

var _utilImmutable = require('./util-immutable');

var _util = require('./util');

var _utilIo = require('./util-io');

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

// xxx
var countNewLines = _op(0, _index.always);

var reporter = {
    lastNumLines: undefined,
    write: _op('write', (0, _index.bindPropTo)(process.stdout)),
    reset: function reset() {
        var _this = this;

        _op(this.lastNumLines, (0, _index.whenOk)(function (n) {
            return _op(_op(_utilIo.goUp, (0, _index.timesF)(n)), (0, _index.map)((0, _index.tap)(_op('write', (0, _index.bindPropTo)(_this)))));
        }));
        this.lastNumLines = 0;
    },
    log: function log() {
        var _console;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        (_console = console).log.apply(_console, _toConsumableArray(args));
        this.lastNumLines += 1 + _op(args, countNewLines);
    }
};

var write = _op('write', (0, _index.bindPropTo)(reporter));
var log = _op('log', (0, _index.bindPropTo)(reporter));

var render = function render(state) {
    reporter.reset();
    _op(_op(state, (0, _index.map)(function (_ref) {
        var tag = _ref.tag,
            source = _ref.source,
            filename = _ref.filename,
            status = _ref.status;
        return _op([_op(tag, (0, _util.padTo)(40)), _op(status, _types.show)], (0, _index.sprintfN)('%s %s'));
    })), (0, _index.map)((0, _index.tap)(log)));
    reporter.lastNumLines = state.size;
};

var initialState = _op([], _utilImmutable.fromJS);

var state = initialState;
var fireAction = function fireAction(reducer) {
    state = _op(_op(state, reducer), (0, _index.tap)(render));
};

var actionAddDownload = function actionAddDownload(_ref2) {
    var tag = _ref2.tag,
        source = _ref2.source,
        filename = _ref2.filename;
    return fireAction((0, _utilImmutable.push)((0, _types.Download)(tag, source, filename, _types.DownloadPending)));
};

var actionUpdateProgress = function actionUpdateProgress(which, completed) {
    return fireAction((0, _utilImmutable.updateIn)([which], (0, _types.updateStatus)(function (_) {
        return _op(completed, (0, _index.condS)([_op((0, _util.either)(_index.notOk, _op(1, _index.lt)), (0, _index.guardV)((0, _types.DownloadInProgress)(completed))), _op(_index.otherwise, (0, _index.guardV)(_types.DownloadCompleted))]));
    })));
};

var actionSetAlreadyDone = function actionSetAlreadyDone(which) {
    return fireAction((0, _utilImmutable.updateIn)([which], (0, _types.updateStatus)(function (_) {
        return _types.DownloadAlreadyDone;
    })));
};

var actionDownloadError = function actionDownloadError(which, err) {
    return fireAction((0, _utilImmutable.updateIn)([which], (0, _types.updateStatus)(function (_) {
        return (0, _types.DownloadError)(err);
    })));
};

var allP = function allP() {
    return Promise.all.apply(Promise, arguments);
};

var startDownloads = exports.startDownloads = function startDownloads(downloads) {
    _op(downloads, (0, _index.map)(function (_ref3) {
        var tag = _ref3.tag,
            source = _ref3.source,
            filename = _ref3.filename;
        return actionAddDownload({ tag: tag, source: source, filename: filename });
    }));

    return _op(_op(state, (0, _util.mapX)(function (_ref4, idx) {
        var tag = _ref4.tag,
            source = _ref4.source,
            filename = _ref4.filename;
        return new Promise(function (resolve, reject) {
            return (0, _http.download)({
                source: source, filename: filename,
                onAlreadyDone: function onAlreadyDone(_) {
                    actionSetAlreadyDone(idx);
                    return _op(_op(_op(tag, (0, _index.sprintf1)('%s → ok')), _utilBilby.Right), resolve);
                },
                onData: function onData(_ref5) {
                    var completed = _ref5.completed;

                    actionUpdateProgress(idx, completed);
                },
                onError: function onError(err) {
                    actionDownloadError(idx, err.message);_op(_op(_op([tag, err.message], (0, _index.sprintfN)('%s → error: %s')), _utilBilby.Left), resolve);
                },
                onEnd: function onEnd(_) {
                    return _op(_op(_op(tag, (0, _index.sprintf1)('%s → ok')), _utilBilby.Right), resolve);
                }
            });
        });
    })), allP);
};

var mockDownloads = function mockDownloads(_) {
    return [{ tag: 'episode-27', source: 'http://traffic.megaphone.fm/PPY6458293736.mp3', filename: 'Intercepted - Season 3 - Episode 27 - the-super-bowl-of-racism.mp3' }, { tag: 'episode-28', source: 'http://traffic.megaphone.fm/PPY8078356160.mp3', filename: 'Intercepted - Season 3 - Episode 28 - merican-psycho.mp3' }, { tag: 'episode-29', source: 'http://traffic.megaphone.fm/PPY7212168126.mp3', filename: 'Intercepted - Season 3 - Episode 29 - for-whom-the-trump-trolls.mp3' }];
};

var toString = (0, _index.dot)('toString');

// mockDownloads () | startDownloads