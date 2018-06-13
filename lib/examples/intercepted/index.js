#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _lazyfish = require('lazyfish');

var _index = require('../../index');

var _download = require('../download/download');

var _util = require('../util/util');

var _utilPred = require('../util/util-pred');

var _utilBilby = require('../util/util-bilby');

var _utilIo = require('../util/util-io');

var _utilGen = require('../util/util-gen');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logWith = function logWith(header) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _utilIo.log.apply(undefined, [header].concat(args));
    };
};

var _op = function _op() {
    return _index.pipe.apply(undefined, arguments);
};

var _op2 = function _op2() {
    return _index.compose.apply(undefined, arguments);
};

var _op3 = function _op3() {
    return _index.composeRight.apply(undefined, arguments);
};

var getPage = function getPage(url) {
    return (0, _utilIo.sys)('curl', ['-s', url]);
};

var doDownloads = _op3(_op3((0, _util.mapX)(function (x, idx) {
    return _op(x, (0, _utilBilby.fold)(function (l) {
        return _op(_op(l, (0, _index.tap)((0, _utilIo.warn)("Invalid: " + l))), (0, _index.always)(null));
    }, function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3),
            source = _ref2[0],
            filename = _ref2[1],
            tag = _ref2[2];

        return { source: source, filename: filename, tag: tag };
    }));
}), _index.compactOk), _download.startDownloads);

var exit = _op('exit', (0, _index.bindPropTo)(process));

_op(process, (0, _util.on)('SIGINT')(_op3(_utilIo.showCursor, (0, _index.tap)(function (_) {
    return _op(0, exit);
}))));

// --- see below for format of JSON

// --- endIdx = not inclusive
var findStoreJSON = function findStoreJSON(str, endIdx) {
    return _op(_op(_op([[0, '']], (0, _lazyfish.lazyListOk)(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            idx = _ref4[0],
            v = _ref4[1];

        return _op(idx, (0, _index.condS)([_op(_op(endIdx, _index.gte), (0, _index.guardV)(null)), _op(_index.otherwise, (0, _index.guardV)([idx + 1, _op(str, (0, _ramda.take)(idx + 1))]))]));
    })), (0, _util.lazyFindPred)((0, _util.tryCatchS)(_index.id, _op(null, _index.always), function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            i = _ref6[0],
            str = _ref6[1];

        return _op(str, JSON.parse);
    }))), (0, _index.ifOk)(_utilBilby.Right, _op(_op("couldn't snip JSON", _utilBilby.Left), _index.always)));
};

var PAT = / window.initialStoreTree \s+ = \s+ /;

var processPage = function processPage(str) {
    return _op(_op(_op(_op(str, (0, _index.xMatch)(_config2.default.pattern)), (0, _utilBilby.toEither)(_op([_config2.default.pattern.source, str], (0, _index.sprintfN)("can't find %s in %s")))), (0, _utilBilby.flatMap)(function (m) {
        return (0, _index.lets)(function (_) {
            return _op(m, (0, _index.prop)('index'));
        }, function (_) {
            return _op(_op(m, (0, _index.prop)(0)), _util.length);
        }, function (patLoc, patLen) {
            return findStoreJSON(_op(str, (0, _ramda.drop)(patLoc + patLen)), _op(_op(str, _util.length), (0, _util.minus)(patLoc + patLen)));
        });
    })), (0, _utilBilby.flatMap)(processPodcasts));
};

var processPodcasts = function processPodcasts(podcasts) {
    return _op(_op(_op(_op(_op(_op(_op(podcasts, (0, _util.pathDot)('resources.platform.Podcast.intercepted.episodes.edges')), (0, _index.map)((0, _index.prop)('node'))), (0, _index.map)(function (node) {
        return [node, node.embedId];
    })), (0, _util.uniqueWith)((0, _index.prop)(1))), (0, _index.map)(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            node = _ref8[0],
            embedId = _ref8[1];

        return (0, _index.lets)(function (_) {
            return _op(node, (0, _util.pathDot)('displayName.text'));
        }, function (title) {
            return {
                source: makeURL(embedId),
                filename: makeFilename(title),
                tag: makeTag(title)
            };
        });
    })), (0, _index.map)(function (_ref9) {
        var source = _ref9.source,
            filename = _ref9.filename,
            tag = _ref9.tag;
        return _op([source, filename, tag], (0, _utilBilby.sequenceM)(_utilBilby.Right));
    })), (0, _utilPred.ifSingletonLeft)((0, _index.prop)(0),
    // --- results in Right (Right (...))
    _utilBilby.Right));
};

var titleToTag = (0, _index.dot)('toLowerCase');
var titleToFilename = titleToTag;

var makeTag = _op3((0, _utilBilby.toEither)('no title'), (0, _utilBilby.flatMap)(_op3(_op3(titleToTag, (0, _util.ellipsisAfter)(30)), _utilBilby.Right)));
var makeURL = _op3((0, _utilBilby.toEither)('no resourceID'), (0, _utilBilby.flatMap)(_op3((0, _index.sprintf1)('http://traffic.megaphone.fm/%s.mp3'), _utilBilby.Right)));

var makeFilename = function makeFilename(title) {
    return _op(title, (0, _index.ifOk)(_op3(_op3(titleToFilename, (0, _index.sprintf1)('intercepted - %s.mp3')), _utilBilby.Right), _op(_op("Can't make filename", _utilBilby.Left), _index.always)));
};

var go = function go(url) {
    return _op(_op(_op(_op(_op(_op(_op(_op(_op(url, getPage), (0, _index.tap)(_utilIo.hideCursor)), (0, _index.tap)(function (_) {
        return (0, _utilIo.startSpinner)('getting metadata');
    })), (0, _util.then)((0, _index.tap)(_utilIo.stopSpinner)))

    // --- not possible to kill this step with ctl-c unfortunately xxx
    , (0, _util.then)((0, _index.tap)(function (_) {
        return (0, _utilIo.log)('\nparsing ... (this might take a while)');
    }))), (0, _util.then)(_op3(_op3(processPage, (0, _utilBilby.foldRight)("Couldn't process page")), doDownloads))), (0, _util.then)((0, _download.report)())), (0, _util.recover)(_op3((0, _index.prop)('stack'), _utilIo.warn))), (0, _util.then)(_utilIo.showCursor));
};

_op(_config2.default.url, go);