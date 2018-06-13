#!/usr/bin/env node
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _tmpPromise = require('tmp-promise');

var _tmpPromise2 = _interopRequireDefault(_tmpPromise);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _fishLib = require('fish-lib');

var _fishLib2 = _interopRequireDefault(_fishLib);

var _index = require('../../../index');

var _busboy = require('busboy');

var _busboy2 = _interopRequireDefault(_busboy);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveStaticThrottle = require('serve-static-throttle');

var _serveStaticThrottle2 = _interopRequireDefault(_serveStaticThrottle);

var _bilby = require('bilby');

var _bilby2 = _interopRequireDefault(_bilby);

var _spinner = require('./spinner/spinner');

var _spinner2 = _interopRequireDefault(_spinner);

var _util = require('../../util/util');

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
//import throttle from 'express-throttle'


var app = (0, _express2.default)();

var config = {
    port: 3003,
    // --- example
    paths: (0, _index.lets)(function (_) {
        return __dirname;
    }, _op3(_index.arg0, (0, _index.sprintf1)('%s/../..')), _op3(_index.arg1, (0, _index.sprintf1)('%s/data')), _op3(_index.arg2, (0, _index.sprintf1)('%s/keys.db')), function (bindir, rootdir, datadir, dbfile) {
        return { bindir: bindir, rootdir: rootdir, datadir: datadir, dbfile: dbfile };
    }),
    inflation: 1,
    throttle: { bps: 1e6 }
};

var then = (0, _index.dot1)('then');
var recover = (0, _index.dot1)('catch');
var get = (0, _index.dot2)('get');
var post = (0, _index.dot2)('post');
var post3 = (0, _index.dot3)('post');
var del = (0, _index.dot2)('delete');
var put = (0, _index.dot2)('put');
var put3 = (0, _index.dot3)('put');
var options = (0, _index.dot2)('options');
var patch = (0, _index.dot2)('patch');
var use = (0, _index.dot1)('use');
var use2 = (0, _index.dot2)('use');
var all = (0, _index.dot2)('all');
var send = (0, _index.dot1)('send');
var status = (0, _index.dot1)('status');
var listen = (0, _index.dot2)('listen');
var sendJSON = (0, _index.dot1)('json');
var set = (0, _index.dot2)('set');

var ifEmpty = _op(_ramda.isEmpty, _index.ifPredicate);

// --- json, needs JS.
var sendStatus = function sendStatus(code) {
    return function (data) {
        return _op3(status(code), sendJSON(data));
    };
};

// --- json, needs JSON.
var sendStatusRawJSON = function sendStatusRawJSON(code) {
    return function (data) {
        return _op3(_op3(status(code), set('Content-Type', 'application/json')), send(data));
    };
};

var msg = _op3(_op3((0, _index.appendTo)(['msg']), _index.list), _ramda.fromPairs);

var errorFull = _op3(_util.errFull, _fishLib.error);

// --- put = idempotent, will update on duplicate code, will fail on duplicate name.
// --- error thrown inside handler, e.g., on final step of catch, is caught by express, possibly
// with unhandled rejection warning from node.

// --- example
// const checkPostParamsStore = (keys) => {
//     if (!isArray (keys)) return false
//     for (const key of keys) {
//         if (!isObject (key)) return false
//         const { code, name, missing, active } = key
//         if (!allOk (code, name, missing, active)) return false
//     }
//     return true
// }

// --- not currently used.
var corsOptions = {
    origin: function origin(_origin, done) {
        return _op(_origin, (0, _index.cond)([_op(_op(/ ^ http s? :\/\/ localhost /, _index.xMatch), (0, _index.guard)(function (_) {
            return done(null, true);
        })), _op(_index.otherwise, (0, _index.guard)(function (_) {
            return new Error('you have disappointed cors');
        }))]));
    }

    // --- an error thrown inside the handler won't crash the server.
    // still a catch is nice at the end, so the server can log, and so the client gets a JSON msg
    // instead of a stack trace.
    // the final step of the catch can throw an error, in which case we just let it bubble.

};var on = (0, _index.side2)('on');
var lines = (0, _index.split)('\n');
var fold = (0, _index.dot2)('fold');

var go_up = function go_up(_) {
    return '[A';
};

var spin = (0, _index.invoke)(function () {
    var _spin = (0, _spinner2.default)('wheel');
    var first = true;
    var goup = go_up();
    var pref = goup + goup;
    var put = _op3((0, _index.concat)('\n\n'), _op('write', (0, _index.bindPropTo)(process.stdout)));
    return {
        first: function first(_) {
            return put('');
        },
        spin: function spin(_) {
            return put(pref + _spin());
        }
    };
});

var logWith = function logWith(header) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _fishLib.log.apply(undefined, [header].concat(args));
    };
};

// --- 400 & 422 are both ok for validation errors, e.g., syntax is ok and server understood
// it but violates domain rules.
// --- 422 is technically for WebDAV but ok.
// --- 409 = conflict, e.g., edit conflict or resource conflict.
// --- 2xx is definitely not good if there's any kind of an error, even though you could argue that the request was ok.
//
// --- we use 422 for user-facing errors (e.g. problems with csv) and 400 for non-user-facing, e.g.
// bad params sent by FE.

var startServer = function startServer(tmp) {
    return _op(_op(_op(_op(_op(_op(app, (0, _index.tap)(function (_) {
        return console.log('tmp', tmp);
    })), use(_bodyParser2.default.json())), use2('/static', (0, _serveStaticThrottle2.default)(tmp, { throttle: config.throttle }))), all('*', function (req, res, next) {
        spin.spin();
        next();
    })), get('/ping', function (req, res) {
        return _op(_op((0, _util.startP)(), then(_op(res, ping))), recover(function (err) {
            ;_op(_op(_op(err, _util.errFull), (0, _index.sprintf1)("Couldn't ping: %s")), _fishLib.warn);

            _op(res, sendStatus(500)(_op('Server error', msg)));
        }));
    }))

    //     | get ('/file/:slug', (req, res) => req | letS ([
    //         (req) => req | prop ('params'),
    //         (req, params) => params | prop ('slug'),
    //         arg2 >> resolveP
    //              >> then (slug => res | serveFile (slug))
    //              >> recover ((err) => {
    //                ; err | errFull
    //                | sprintf1 ("Couldn't ping: %s")
    //                | warn
    //
    //                res | sendStatus (500) ('Server error' | msg)
    //              })
    //     ]))

    , listen(config.port)(function () {
        _op(_op(_op(config.port, _fishLib.green), (0, _index.sprintf1)('Listening on port %s')), (0, _index.tap)(_fishLib.info));

        spin.first();
    }));
};

// const cors = corsOptions | corsMod
//     | options ('/api/analyse-events-keys', cors)
//     | post3 ('/analyse-events-keys', cors, ((req, res) => {

var ping = sendStatus(200)({ msg: 'ping' });

var sizes = function sizes(n) {
    return {
        'episode-10': 1000000 * n,
        'episode-11': 1000100 * n,
        'episode-12': 1000200 * n,
        'episode-13': 1000300 * n,
        'episode-14': 1000400 * n,
        'episode-15': 2000500 * n,
        'episode-16': 2000000 * n,
        'episode-17': 2000800 * n,
        'episode-18': 2000100 * n,
        'episode-19': 2000000 * n
    };
};

// --- promise.
var tmpDir = (0, _index.dot1)('dir');
var initTmp = function initTmp(_) {
    return _op(_op(_tmpPromise2.default, tmpDir({ unsafeCleanup: true })), then(_op('path', _index.prop)));
};

var initFiles = function initFiles(tmp) {
    return _op(_op(_op(_op(10, (0, _index.rangeTo)(20)), (0, _index.map)(_op3(_op3(String, (0, _index.concatTo)('episode-')), makeFile(tmp)))), _util.allP), then(_op(tmp, _index.always)));
};

var getSize = function getSize(slug) {
    return sizes(config.inflation)[slug];
};

var makeFile = function makeFile(tmp) {
    return function (slug) {
        return new Promise(function (resolve, reject) {
            return _op3((0, _index.tap)(logWith('WUT')), (0, _index.lets)(function (_) {
                return _op(getSize(slug), (0, _index.defaultTo)(function (_) {
                    return reject("Can't get size for " + slug);
                }));
            }, function (_) {
                return _op([tmp, slug], (0, _index.sprintfN)('%s/%s.mp3'));
            }, function (size) {
                return _op(_op(size, (0, _index.repeatV)('1')), (0, _index.join)(''));
            }, function (_, filename, data) {
                return _fs2.default.writeFileSync(filename, data);
            }, resolve));
        });
    };
};

// const { floor, random, } = Math
// const getRandomSize = size => size | multiply (random ()) | floor | tap (logWith ('RAND'))
// const serveFile = slug => res => slug | resolveP
//     | then (makeFile)
//     | then (_ => getFile (slug) (res))
// const getFile = slug => res => lets (
//     _ => getSize (slug) | defaultTo (_ => getRandomSize (10e6)),
//     (size) => startRandomServe (size),
//     arg1 >> then (contents => res | sendStatus (200) ({ contents, }))
// )
// const OLDstartRandomServe = size => new Promise ((resolve, reject) =>
//     sysSpawn (
//         'dd',
//         ['if=/dev/urandom', 'iflag=fullblock', size | sprintf1 ('count=%s'), 'bs=1'],
//         { sync: false, die: false, verbose: true, },
//         ({ ok, out, err, }) => {
//             console.log ('returned!')
//             if (!ok) return err | reject
//             return out | resolve
//         },
//     )
// )
//
// const toString = dot ('toString')
// const startRandomServe = size => new Promise ((resolve, reject) => {
//     const buf = ''
//     const str = fs.createReadStream ('/dev/urandom', { start: 0, end: size, })
//     console.log ('created stream with size', size)
//     if (!str) return reject ("couldn't open stream")
//     str | on ('data') (toString >> concatTo (buf))
//         | on ('error') (xxx => reject ("error reading stream" + xxx))
//         | on ('end') (_ => buf | resolve)
// })

// --- allows async inits before server starts.
_op(_op(_op(_op((0, _util.startP)(), then(initTmp)), then(initFiles)), then(startServer)), recover(_op3((0, _index.decorateException)("Couldn't start server: "), errorFull)));