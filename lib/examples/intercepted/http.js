'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.download = exports.end = undefined;

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _index = require('../../index');

var _followRedirects = require('follow-redirects');

var _util = require('./util');

var _utilIo = require('./util-io');

var _utilBilby = require('./util-bilby');

var _utilDaggy = require('./util-daggy');

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

var end = exports.end = (0, _index.side)('end');

var request = function request(protocol) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _op(protocol, (0, _index.condS)([_op(_op('http:', _index.eq), (0, _index.guard)(function (_) {
            return _followRedirects.http.request.apply(_followRedirects.http, args);
        })), _op(_op('https:', _index.eq), (0, _index.guard)(function (_) {
            return _followRedirects.https.request.apply(_followRedirects.https, args);
        })), _op(_index.otherwise, (0, _index.guard)(_op3((0, _index.sprintf1)('protocol not supported (%s)'), _index.die)))]));
    };
};

// --- throws
// const ifFileExists = ifPredicate (fs.existsSync)

var fileLengthMaybe = (0, _util.tryCatchS)(_utilBilby.Just, _op(_utilBilby.Nothing, _index.always), _op3(_fs2.default.statSync, (0, _index.prop)('size')));

var _downloader = function _downloader(bytesDownloadedInitial) {
    return function (_ref) {
        var res = _ref.res,
            contentLength = _ref.contentLength,
            writeToDisk = _ref.writeToDisk,
            onData = _ref.onData,
            onEnd = _ref.onEnd,
            onError = _ref.onError;

        // --- legacy: in an earlier version, not having contentLength was ok; now that we support
        // resuming downloads it will be rejected before getting here.
        var completed = _op(contentLength, (0, _index.ifOk)(
        // --- contentLength -> bytesDownloadedInitial -> percentage
        _op3((0, _index.add)(bytesDownloadedInitial), _index.divideBy), _op(_op(null, _index.always), _index.always)));
        var bytesDownloaded = bytesDownloadedInitial;
        return _op(_op(_op(res, (0, _util.on)('data')(function (chunk) {
            bytesDownloaded += chunk.length;
            _op(_op(chunk, (0, _index.tap)(writeToDisk)), (0, _index.tap)(function (str) {
                return _op({ str: str, completed: _op(bytesDownloaded, completed) }, onData);
            }));
        })), (0, _util.on)('end')(onEnd)), (0, _util.on)('error')(onError));
    };
};

// --- to keep it simple we assume the server honors the partial download request.
var download = exports.download = function download(_ref2) {
    var source = _ref2.source,
        filename = _ref2.filename,
        _ref2$onAlreadyDone = _ref2.onAlreadyDone,
        onAlreadyDone = _ref2$onAlreadyDone === undefined ? _index.noop : _ref2$onAlreadyDone,
        _ref2$onEnd = _ref2.onEnd,
        onEnd = _ref2$onEnd === undefined ? _index.noop : _ref2$onEnd,
        _ref2$onData = _ref2.onData,
        onData = _ref2$onData === undefined ? _index.noop : _ref2$onData,
        _ref2$onError = _ref2.onError,
        onError = _ref2$onError === undefined ? _index.noop : _ref2$onError;

    var _url$parse = _url2.default.parse(source),
        protocol = _url$parse.protocol,
        hostname = _url$parse.hostname,
        port = _url$parse.port,
        path = _url$parse.path;

    var writeToDisk = (0, _utilIo.appendToFile)(filename);
    var bytesDownloadedInitial = _op(_op(filename, fileLengthMaybe), (0, _index.condS)([_op(_op('isNone', _index.prop), (0, _index.guardV)(0)), _op(_index.otherwise, (0, _index.guard)((0, _utilBilby.flatMap)(_index.id)))]));
    var downloader = _op(bytesDownloadedInitial, _downloader);
    var cb = function cb(res) {
        return (0, _index.lets)(function (_) {
            return res;
        }, (0, _index.prop)('headers'), (0, _index.prop)('statusCode'), _op3(_op3(_index.arg1, (0, _index.prop)('content-length')), (0, _index.whenOk)(Number)), _index.id, function (res, headers, statusCode, contentLength) {
            return _op(null, (0, _index.condS)([_op(function (_) {
                return _op(contentLength, _index.notOk);
            }, (0, _index.guard)(function (_) {
                return _op(_op('no content length', _index.exception), onError);
            })),
            // --- on a partial download, contentLength is just the part left.
            _op(function (_) {
                return contentLength === 0 && bytesDownloadedInitial !== 0;
            }, (0, _index.guard)(onAlreadyDone)), _op(function (_) {
                return (0, _ramda.none)(_op(statusCode, _index.eq))([200, 206]);
            }, (0, _index.guard)(function (_) {
                return _op(_op('status ' + statusCode, _index.exception), onError);
            })), _op(_index.otherwise, (0, _index.guard)(function (_) {
                return downloader({ res: res, contentLength: contentLength, writeToDisk: writeToDisk, onData: onData, onEnd: onEnd, onError: onError });
            }))]));
        });
    };

    var headers = {
        Range: _op(_op(bytesDownloadedInitial, (0, _index.add)(0)), (0, _index.sprintf1)('bytes=%d-'))
    };
    _op(_op(request(protocol)({ hostname: hostname, port: port, path: path, headers: headers, method: 'GET' }, cb), (0, _util.on)('error')(onError)), end);
};