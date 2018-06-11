'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateStatus = exports.DownloadAlreadyDone = exports.DownloadError = exports.DownloadCompleted = exports.DownloadPending = exports.DownloadInProgress = exports.show = exports.DownloadStatus = exports.Download = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _index = require('../../index');

var _daggy = require('daggy');

var _daggy2 = _interopRequireDefault(_daggy);

var _util = require('./util');

var _utilIo = require('./util-io');

var _utilBilby = require('./util-bilby');

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

var Download = exports.Download = _daggy2.default.tagged('Download', ['tag', 'source', 'filename', 'status']);

var DownloadStatus = exports.DownloadStatus = _daggy2.default.taggedSum('DownloadStatus', {
    DownloadInProgress: ['completed'],
    DownloadPending: [],
    DownloadCompleted: [],
    DownloadError: ['err'],
    DownloadAlreadyDone: []
});

// export const show = dot ('show')

if (false) DownloadStatus.prototype.show = function () {
    var _this = this;

    return _op(_op(this, (0, _utilBilby.cata)({
        DownloadInProgress: function DownloadInProgress() {
            return _op(_this.completed, (0, _index.ifOk)(_op3(_op3(_op3((0, _index.multiply)(100), (0, _index.sprintf1)('%.1f %%')), _utilIo.brightRed), (0, _index.sprintf1)('in progress: %s')), _op('in progress: (unknown)', _index.always)));
        },
        DownloadPending: function DownloadPending() {
            return _op('🕑', _utilIo.yellow);
        },
        DownloadCompleted: function DownloadCompleted() {
            return _op('✔', _utilIo.green);
        },
        DownloadError: function DownloadError(err) {
            return _op(_op(err, (0, _index.ifOk)(_op('error: ', _index.concatTo), _op('error', _index.always))), _utilIo.red);
        },
        DownloadAlreadyDone: function DownloadAlreadyDone() {
            return _op(_op('✔', _utilIo.blue), (0, _index.sprintf1)('%s (already downloaded)'));
        }
    })), (0, _util.padTo)(50));
};

var deconstruct = (0, _ramda.curry)(function (f, x) {
    return f(x, x);
});

var show = exports.show = deconstruct(function (downloadStatus, _ref) {
    var completed = _ref.completed;
    return _op(_op(downloadStatus, (0, _utilBilby.cata)({
        DownloadInProgress: function DownloadInProgress() {
            return _op(_op(completed, (0, _index.ifOk)(_op3((0, _index.multiply)(100), (0, _index.sprintf1)('in progress: %.1f %%')), _op('in progress: (unknown)', _index.always))), _utilIo.brightRed);
        },
        DownloadPending: function DownloadPending() {
            return _op('🕑', _utilIo.yellow);
        },
        DownloadCompleted: function DownloadCompleted() {
            return _op('✔', _utilIo.green);
        },
        DownloadError: function DownloadError(err) {
            return _op(_op(err, (0, _index.ifOk)(_op('error: ', _index.concatTo), _op('error', _index.always))), _utilIo.red);
        },
        DownloadAlreadyDone: function DownloadAlreadyDone() {
            return _op(_op('✔', _utilIo.blue), (0, _index.sprintf1)('%s (already downloaded)'));
        }
    })), (0, _util.padTo)(50));
});

Download.prototype.updateStatus = function (updater) {
    var tag = this.tag,
        source = this.source,
        filename = this.filename,
        status = this.status;

    return Download(tag, source, filename, _op(status, updater));
};

var DownloadInProgress = DownloadStatus.DownloadInProgress,
    DownloadPending = DownloadStatus.DownloadPending,
    DownloadCompleted = DownloadStatus.DownloadCompleted,
    DownloadError = DownloadStatus.DownloadError,
    DownloadAlreadyDone = DownloadStatus.DownloadAlreadyDone;
exports.DownloadInProgress = DownloadInProgress;
exports.DownloadPending = DownloadPending;
exports.DownloadCompleted = DownloadCompleted;
exports.DownloadError = DownloadError;
exports.DownloadAlreadyDone = DownloadAlreadyDone;
var updateStatus = exports.updateStatus = (0, _index.dot1)('updateStatus');