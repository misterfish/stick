var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, test, xtest, expectToEqual, expectToBe, bitwiseAnd, bitwiseOr, bitwiseXor, bitwiseNot, bitwiseLeft, bitwiseRight, bitwiseRightZeroFill;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
ref$ = require('../index'), bitwiseAnd = ref$.bitwiseAnd, bitwiseOr = ref$.bitwiseOr, bitwiseXor = ref$.bitwiseXor, bitwiseNot = ref$.bitwiseNot, bitwiseLeft = ref$.bitwiseLeft, bitwiseRight = ref$.bitwiseRight, bitwiseRightZeroFill = ref$.bitwiseRightZeroFill;
describe('bitwise', function(){
  describe('bitwiseAnd', function(){
    test(1, function(){
      return expectToEqual(3)(
      bitwiseAnd(7, 3));
    });
    return test('curried', function(){
      return expectToEqual(3)(
      bitwiseAnd(7)(
      3));
    });
  });
  describe('bitwiseOr', function(){
    test(1, function(){
      return expectToEqual(7)(
      bitwiseOr(7, 3));
    });
    return test('curried', function(){
      return expectToEqual(7)(
      bitwiseOr(7)(
      3));
    });
  });
  describe('bitwiseXor', function(){
    test(1, function(){
      return expectToEqual(4)(
      bitwiseXor(7, 3));
    });
    test(2, function(){
      return expectToEqual(6)(
      bitwiseXor(7, 1));
    });
    return test('curried', function(){
      return expectToEqual(4)(
      bitwiseXor(7)(
      3));
    });
  });
  describe('bitwiseNot', function(){
    var niet;
    niet = function(x){
      return -(x + 1);
    };
    test(1, function(){
      return expectToEqual(niet(7))(
      bitwiseNot(7));
    });
    return test(2, function(){
      return expectToEqual(niet(4))(
      bitwiseNot(4));
    });
  });
  describe('bitwiseLeft', function(){
    test(1, function(){
      return expectToEqual(14)(
      bitwiseLeft(7, 1));
    });
    test(2, function(){
      return expectToEqual(20)(
      bitwiseLeft(5, 2));
    });
    return test('curried', function(){
      return expectToEqual(14)(
      bitwiseLeft(7)(
      1));
    });
  });
  describe('bitwiseRight', function(){
    test(1, function(){
      return expectToEqual(7)(
      bitwiseRight(14, 1));
    });
    test(2, function(){
      return expectToEqual(5)(
      bitwiseRight(20, 2));
    });
    test(3, function(){
      return expectToEqual(-4)(
      bitwiseRight(-7, 1));
    });
    return test('curried', function(){
      return expectToEqual(7)(
      bitwiseRight(14)(
      1));
    });
  });
  describe('bitwiseRightZeroFill', function(){
    test(1, function(){
      return expectToEqual(7)(
      bitwiseRightZeroFill(14, 1));
    });
    test(2, function(){
      return expectToEqual(5)(
      bitwiseRightZeroFill(20, 2));
    });
    test(3, function(){
      return expectToEqual(2147483644)(
      bitwiseRightZeroFill(-7, 1));
    });
    return test('curried', function(){
      return expectToEqual(7)(
      bitwiseRightZeroFill(14)(
      1));
    });
  });
  return describe('combine', function(){
    return test(1, function(){
      var i;
      i = 12345;
      return expectToEqual(bitwiseNot(i))(
      bitwiseXor(i)(
      -1));
    });
  });
});