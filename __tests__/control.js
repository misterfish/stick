var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, arrayLs, test, xtest, expectToEqual, expectToBe, tryCatch, tryCatch__, exception, raise, die, decorateException;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), arrayLs = ref$.arrayLs, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
ref$ = require('../lib/index'), tryCatch = ref$.tryCatch, tryCatch__ = ref$.tryCatch__, exception = ref$.exception, raise = ref$.raise, die = ref$.die, decorateException = ref$.decorateException;
describe('try/catch__', function(){
  var fails, passes, x$, howToFail;
  fails = function(){
    throw new Error;
  };
  passes = function(){
    return 99;
  };
  x$ = howToFail = jest.fn();
  x$.mockReturnValue('failed');
  test('should fail', function(){
    return expectToEqual('failed')(
    tryCatch__(fails, howToFail));
  });
  return test('should succeed', function(){
    return expectToEqual(99)(
    tryCatch__(passes, howToFail));
  });
});
describe('try/catch', function(){
  var fails, passes, x$, howToPass, y$, howToFail;
  fails = function(){
    throw new Error;
  };
  passes = function(){
    return 99;
  };
  x$ = howToPass = jest.fn();
  x$.mockImplementation(function(x){
    return [x, x, x];
  });
  y$ = howToFail = jest.fn();
  y$.mockReturnValue('failed');
  test('should fail', function(){
    return expectToEqual('failed')(
    tryCatch(howToPass, howToFail)(
    fails));
  });
  return test('should succeed, and pass params', function(){
    return expectToEqual([99, 99, 99])(
    tryCatch(howToPass, howToFail)(
    passes));
  });
});
describe('exceptions', function(){
  test('exception', function(){
    return expectToEqual(new Error('a b c'))(
    exception('a', 'b', 'c'));
  });
  test('raise', function(){
    return expect(function(){
      return raise(
      new Error('bad news'));
    }).toThrow('bad news');
  });
  test('die', function(){
    return expect(function(){
      return die('really', 'bad', 'news');
    }).toThrow('really bad news');
  });
  test('decorate exception', function(){
    return expectToEqual(new Error('bad news: file not found'))(
    decorateException('bad news:')(
    new Error('file not found')));
  });
  return test('all', function(){
    return expect(function(){
      return raise(
      decorateException('bad news:')(
      exception(
      'file not found')));
    }).toThrow('bad news: file not found');
  });
});