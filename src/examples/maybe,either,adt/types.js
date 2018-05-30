import daggy from 'daggy'

export const Sequence = daggy.taggedSum ('Sequence', {
  ArithmeticSequence: ['n'],
  GeometricSequence: ['c'],
  IrregularSequence: [],
  ErrorSequence: ['reason'],
})

const { ArithmeticSequence, GeometricSequence, IrregularSequence, ErrorSequence, } = Sequence

export { ArithmeticSequence, GeometricSequence, IrregularSequence, ErrorSequence, }
