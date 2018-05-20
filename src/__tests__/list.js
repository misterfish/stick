var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, list, test, xtest, expectToEqual, expectToBe, array, compact, compactOk, joinOk;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), list = ref$.list, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
ref$ = require('../index'), array = ref$.array, compact = ref$.compact, compactOk = ref$.compactOk, joinOk = ref$.joinOk;
describe('array', function(){
  return test(1, function(){
    return expectToEqual([3, 4, 5])(
    [3, 4, 5]);
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
describe('joinOk', function(){
  return test(1, function(){
    return expectToEqual('1 2 false 3 true 5')(
    joinOk(' ')(
    [1, 2, false, null, 3, true, void 8, 5]));
  });
});