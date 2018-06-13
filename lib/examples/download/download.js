'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.report = exports.startDownloads = undefined;

var _index = require('../../index');

var _types = require('./types');

var _http = require('./http');

var _utilBilby = require('../util/util-bilby');

var _utilDaggy = require('../util/util-daggy');

var _utilImmutable = require('../util/util-immutable');

var _util = require('../util/util');

var _utilIo = require('../util/util-io');

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

var report = exports.report = function report(_) {
    return _op3(_op3(_op3((0, _index.reduce)(function (acc, resultE) {
        return _op(resultE, (0, _utilBilby.fold)(function (_) {
            return _op(acc, (0, _index.assoc)('numError')(acc.numError + 1));
        }, function (_) {
            return _op(acc, (0, _index.assoc)('numOk')(acc.numOk + 1));
        }));
    })({ numError: 0, numOk: 0 }), function (_ref6) {
        var numError = _ref6.numError,
            numOk = _ref6.numOk;
        return [_op(_op(numOk, String), _utilIo.green), _op(_op(numError, String), _utilIo.red)];
    }), (0, _index.sprintfN)('%s ok / %s error')), (0, _index.tap)(log));
};

var mockDownloads = function mockDownloads(_) {
    return [{ tag: 'episode-10', source: 'http://localhost:3003/static/episode-10.mp3', filename: 'Episode 10.mp3' }, { tag: 'episode-11', source: 'http://localhost:3003/static/episode-11.mp3', filename: 'Episode 11.mp3' }, { tag: 'episode-12', source: 'http://localhost:3003/static/episode-12.mp3', filename: 'Episode 12.mp3' }, { tag: 'episode-13', source: 'http://localhost:3003/static/episode-13.mp3', filename: 'Episode 13.mp3' }, { tag: 'episode-14', source: 'http://localhost:3003/static/episode-14.mp3', filename: 'Episode 14.mp3' }, { tag: 'episode-15', source: 'http://localhost:3003/static/episode-15.mp3', filename: 'Episode 15.mp3' }, { tag: 'episode-16', source: 'http://localhost:3003/static/episode-16.mp3', filename: 'Episode 16.mp3' }, { tag: 'episode-17', source: 'http://localhost:3003/static/episode-17.mp3', filename: 'Episode 17.mp3' }, { tag: 'episode-18', source: 'http://localhost:3003/static/episode-18.mp3', filename: 'Episode 18.mp3' }, { tag: 'episode-19', source: 'http://localhost:3003/static/episode-19.mp3', filename: 'Episode 19.mp3' }, { tag: 'episode-404', source: 'http://localhost:3003/static/404', filename: 'Episode 404.mp3' }];
};

_op(_op(mockDownloads(), startDownloads), (0, _util.then)(report()));