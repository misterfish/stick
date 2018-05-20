var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, test, xtest, expectToEqual, expectToBe, array, compact, compactOk, list, last;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
ref$ = require('../index'), array = ref$.array, compact = ref$.compact, compactOk = ref$.compactOk, list = ref$.list, last = ref$.last;
describe('list', function(){
  test(1, function(){
    return expectToEqual([3, 4, 5])(
    list(3, 4, 5));
  });
  return test('empty', function(){
    return expectToEqual([])(
    list());
  });
});
describe('compact*', function(){
  var mixed, falsey, truthy;
  mixed = [1, '', 0, '0', void 8, false, true, 2];
  falsey = [false, void 8, null, '', 0, NaN];
  truthy = [true, '0', [], {}, -1, Infinity];
  describe('compact', function(){
    test(1, function(){
      return expectToEqual([1, '0', true, 2])(
      compact(
      mixed));
    });
    test('all falsey', function(){
      return expectToEqual([])(
      compact(
      falsey));
    });
    return test('all truthy', function(){
      return expectToEqual(truthy)(
      compact(
      truthy));
    });
  });
  return describe('compactOk', function(){
    test(1, function(){
      return expectToEqual([1, '', 0, '0', false, true, 2])(
      compactOk(
      mixed));
    });
    test('all falsey', function(){
      return expectToEqual([false, '', 0, NaN])(
      compactOk(
      falsey));
    });
    return test('all truthy', function(){
      return expectToEqual(truthy)(
      compactOk(
      truthy));
    });
  });
});
describe('last', function(){
  var x, y;
  x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  y = [];
  test(1, function(){
    return expectToEqual(10)(
    last(
    x));
  });
  return test('undef on empty', function(){
    return expectToEqual(void 8)(
    last(
    y));
  });
});