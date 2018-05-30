'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorSequence = exports.IrregularSequence = exports.GeometricSequence = exports.ArithmeticSequence = exports.Sequence = undefined;

var _daggy = require('daggy');

var _daggy2 = _interopRequireDefault(_daggy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sequence = exports.Sequence = _daggy2.default.taggedSum('Sequence', {
  ArithmeticSequence: ['n'],
  GeometricSequence: ['c'],
  IrregularSequence: [],
  ErrorSequence: ['reason']
});

var ArithmeticSequence = Sequence.ArithmeticSequence,
    GeometricSequence = Sequence.GeometricSequence,
    IrregularSequence = Sequence.IrregularSequence,
    ErrorSequence = Sequence.ErrorSequence;
exports.ArithmeticSequence = ArithmeticSequence;
exports.GeometricSequence = GeometricSequence;
exports.IrregularSequence = IrregularSequence;
exports.ErrorSequence = ErrorSequence;