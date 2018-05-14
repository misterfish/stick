var ref$, assoc, assocPath, head, tail, reduceRight, chain, id, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, list, test, xtest, expectToEqual, expectToBe, ifPredicate, whenPredicate, ifPredicate__, ifOk, whenOk, ifOk__, ifTrue, whenTrue, ifTrue__, ifFalse, whenFalse, ifFalse__, ifYes, whenYes, ifYes__, ifNo, whenNo, ifNo__, ifFunction, whenFunction, ifFunction__, ifEmpty, whenEmpty, ifEmpty__, cond, doTests, doTestDoubleArm, doTestSingleArm, slice$ = [].slice;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, id = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), list = ref$.list, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
ref$ = require('../index'), ifPredicate = ref$.ifPredicate, whenPredicate = ref$.whenPredicate, ifPredicate__ = ref$.ifPredicate__, ifOk = ref$.ifOk, whenOk = ref$.whenOk, ifOk__ = ref$.ifOk__, ifTrue = ref$.ifTrue, whenTrue = ref$.whenTrue, ifTrue__ = ref$.ifTrue__, ifFalse = ref$.ifFalse, whenFalse = ref$.whenFalse, ifFalse__ = ref$.ifFalse__, ifYes = ref$.ifYes, whenYes = ref$.whenYes, ifYes__ = ref$.ifYes__, ifNo = ref$.ifNo, whenNo = ref$.whenNo, ifNo__ = ref$.ifNo__, ifFunction = ref$.ifFunction, whenFunction = ref$.whenFunction, ifFunction__ = ref$.ifFunction__, ifEmpty = ref$.ifEmpty, whenEmpty = ref$.whenEmpty, ifEmpty__ = ref$.ifEmpty__, cond = ref$.cond;
doTests = curry$(function(describeSpec, tests){
  return each(function(testSpec){
    var numArms, ref$, ref1$, theTest;
    numArms = (ref$ = (ref1$ = testSpec.numArms, delete testSpec.numArms, ref1$)) != null ? ref$ : 1;
    theTest = numArms === 2 ? doTestDoubleArm : doTestSingleArm;
    return theTest(describeSpec, testSpec);
  })(
  tests);
});
doTestDoubleArm = curry$(function(arg$, arg1$){
  var fn, is__, anaphoric, ref$, desc, inputVal, expectBranch;
  fn = arg$.fn, is__ = arg$.is__, anaphoric = (ref$ = arg$.anaphoric) != null ? ref$ : true;
  desc = arg1$.desc, inputVal = arg1$.inputVal, expectBranch = arg1$.expectBranch;
  return test(desc, function(){
    var x$, ja, y$, nee, ret, ref$, expectedRet, expectedCallsJa, expectedCallsNee;
    x$ = ja = jest.fn();
    x$.mockImplementation(function(x){
      return [x, x, x];
    });
    y$ = nee = jest.fn();
    y$.mockImplementation(function(x){
      return [x, x, x, x];
    });
    ret = !is__
      ? fn(ja, nee)(
      inputVal)
      : fn(inputVal, ja, nee);
    ref$ = expectBranch === 'ja'
      ? [[inputVal, inputVal, inputVal], 1, 0]
      : [[inputVal, inputVal, inputVal, inputVal], 0, 1], expectedRet = ref$[0], expectedCallsJa = ref$[1], expectedCallsNee = ref$[2];
    expectToEqual(expectedCallsJa)(
    ja.mock.calls.length);
    expectToEqual(expectedCallsNee)(
    nee.mock.calls.length);
    if (anaphoric) {
      return expectToEqual(expectedRet)(
      ret);
    }
  });
});
doTestSingleArm = curry$(function(arg$, arg1$){
  var fn, is__, anaphoric, ref$, desc, inputVal, expectBranch;
  fn = arg$.fn, is__ = arg$.is__, anaphoric = (ref$ = arg$.anaphoric) != null ? ref$ : true;
  desc = arg1$.desc, inputVal = arg1$.inputVal, expectBranch = arg1$.expectBranch;
  return test(desc, function(){
    var x$, ja, ret, ref$, expectedRet, expectedCallsJa;
    x$ = ja = jest.fn();
    x$.mockImplementation(function(x){
      return [x, x, x];
    });
    ret = !is__
      ? fn(ja)(
      inputVal)
      : fn(inputVal, ja);
    ref$ = expectBranch === 'ja'
      ? [[inputVal, inputVal, inputVal], 1]
      : [void 8, 0], expectedRet = ref$[0], expectedCallsJa = ref$[1];
    expectToEqual(expectedCallsJa)(
    ja.mock.calls.length);
    if (anaphoric) {
      return expectToEqual(expectedRet)(
      ret);
    }
  });
});
describe('whenPredicate', function(){
  var describeSpec, tests, describeSpec2, tests2, this$ = this;
  describeSpec = {
    fn: whenPredicate((function(it){
      return it > 3;
    })),
    is__: false,
    anaphoric: true
  };
  tests = list({
    desc: '4',
    inputVal: 4,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: '3',
    inputVal: 3,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'null',
    inputVal: null,
    expectBranch: 'nee',
    numArms: 1
  });
  doTests(describeSpec, tests);
  describeSpec2 = {
    fn: whenPredicate(id),
    is__: false,
    anaphoric: true
  };
  tests2 = list({
    desc: 'exact truth, not truthy',
    inputVal: 3,
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec2, tests2);
});
describe('ifPredicate', function(){
  var describeSpec, tests, describeSpec2, tests2, this$ = this;
  describeSpec = {
    fn: ifPredicate((function(it){
      return it > 3;
    })),
    is__: false,
    anaphoric: true
  };
  tests = list({
    desc: '4',
    inputVal: 4,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: '3',
    inputVal: 3,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'null',
    inputVal: null,
    expectBranch: 'nee',
    numArms: 2
  });
  doTests(describeSpec, tests);
  describeSpec2 = {
    fn: ifPredicate(id),
    is__: false,
    anaphoric: true
  };
  tests2 = list({
    desc: 'exact truth, not truthy',
    inputVal: 3,
    expectBranch: 'nee',
    numArms: 2
  });
  return doTests(describeSpec2, tests2);
});
describe('ifPredicate__', function(){
  var describeSpec, tests, describeSpec2, tests2;
  describeSpec = {
    fn: function(){
      var this$ = this;
      return ifPredicate__.apply(null, [(function(it){
        return it > 3;
      })].concat(slice$.call(arguments)));
    },
    is__: true
  };
  tests = list({
    desc: '4',
    inputVal: 4,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: '3',
    inputVal: 3,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'null',
    inputVal: null,
    expectBranch: 'nee',
    numArms: 2
  });
  doTests(describeSpec, tests);
  describeSpec2 = {
    fn: function(){
      return ifPredicate__.apply(null, [id].concat(slice$.call(arguments)));
    },
    is__: true
  };
  tests2 = list({
    desc: 'exact truth, not truthy',
    inputVal: 3,
    expectBranch: 'nee',
    numArms: 2
  });
  return doTests(describeSpec2, tests2);
});
describe('whenOk', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: whenOk,
    is__: false
  };
  tests = list({
    desc: 'true',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'null',
    inputVal: null,
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('ifOk', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifOk,
    is__: false
  };
  tests = list({
    desc: 'true',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'null',
    inputVal: null,
    expectBranch: 'nee',
    numArms: 2
  });
  return doTests(describeSpec, tests);
});
describe('ifOk__', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifOk__,
    is__: true
  };
  tests = list({
    desc: 'true',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'true, no else',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'false, no else',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'undefined, no else',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'null',
    inputVal: null,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'null, no else',
    inputVal: null,
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('whenTrue', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: whenTrue,
    is__: false
  };
  tests = list({
    desc: 'true',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: '3',
    inputVal: 3,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('ifTrue', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifTrue,
    is__: false
  };
  tests = list({
    desc: 'true',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: '3',
    inputVal: 3,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'nee',
    numArms: 2
  });
  return doTests(describeSpec, tests);
});
describe('ifTrue__', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifTrue__,
    is__: true
  };
  tests = list({
    desc: 'true',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'true, no else',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: '3',
    inputVal: 3,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: '3, no else',
    inputVal: 3,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'false, no else',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('whenFalse', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: whenFalse,
    is__: false
  };
  tests = list({
    desc: 'false',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'true',
    inputVal: true,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('ifFalse', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifFalse,
    is__: false
  };
  tests = list({
    desc: 'false',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'true',
    inputVal: true,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'nee',
    numArms: 2
  });
  return doTests(describeSpec, tests);
});
describe('ifFalse__', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifFalse__,
    is__: true
  };
  tests = list({
    desc: 'false',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'false, no else',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'true',
    inputVal: true,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'true, no else',
    inputVal: true,
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('whenYes', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: whenYes,
    is__: false
  };
  tests = list({
    desc: 'true',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: '3',
    inputVal: 3,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('ifYes', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifYes,
    is__: false
  };
  tests = list({
    desc: 'true',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: '3',
    inputVal: 3,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 2
  });
  return doTests(describeSpec, tests);
});
describe('ifYes__', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifYes__,
    is__: true
  };
  tests = list({
    desc: 'true',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'true, no else',
    inputVal: true,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: '3',
    inputVal: 3,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: '3, no else',
    inputVal: 3,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'false, no else',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('whenNo', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: whenNo,
    is__: false
  };
  tests = list({
    desc: 'true',
    inputVal: true,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: '3',
    inputVal: 3,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'ja',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('ifNo', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifNo,
    is__: false
  };
  tests = list({
    desc: 'true',
    inputVal: true,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: '3',
    inputVal: 3,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'ja',
    numArms: 2
  });
  return doTests(describeSpec, tests);
});
describe('ifNo__', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifNo__,
    is__: true
  };
  tests = list({
    desc: 'true',
    inputVal: true,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'true, no else',
    inputVal: true,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'false, no else',
    inputVal: false,
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'empty string, no else',
    inputVal: '',
    expectBranch: 'ja',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('whenFunction', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: whenFunction,
    is__: false
  };
  tests = list({
    desc: 'function',
    inputVal: function(){},
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'undefined',
    inputVal: void 8,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'array',
    inputVal: [],
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('ifFunction', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifFunction,
    is__: false
  };
  tests = list({
    desc: 'function',
    inputVal: function(){},
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'empty string',
    inputVal: '',
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'array',
    inputVal: [],
    expectBranch: 'nee',
    numArms: 2
  });
  return doTests(describeSpec, tests);
});
describe('ifFunction__', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifFunction__,
    is__: true
  };
  tests = list({
    desc: 'function',
    inputVal: function(){},
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'function, no else',
    inputVal: function(){},
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'false',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'false, no else',
    inputVal: false,
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'array',
    inputVal: [],
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'array, no else',
    inputVal: [],
    expectBranch: 'nee',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('whenEmpty', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: whenEmpty,
    is__: false
  };
  tests = list({
    desc: 'array n = 1',
    inputVal: [9],
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'array n = 0',
    inputVal: [],
    expectBranch: 'ja',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('ifEmpty', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifEmpty,
    is__: false
  };
  tests = list({
    desc: 'array n = 1',
    inputVal: [9],
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'array n = 0',
    inputVal: [],
    expectBranch: 'ja',
    numArms: 2
  });
  return doTests(describeSpec, tests);
});
describe('ifEmpty__', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifEmpty__,
    is__: true
  };
  tests = list({
    desc: 'array n = 1',
    inputVal: [9],
    expectBranch: 'nee',
    numArms: 2
  }, {
    desc: 'array n = 1, no else',
    inputVal: [9],
    expectBranch: 'nee',
    numArms: 1
  }, {
    desc: 'array n = 0',
    inputVal: [],
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'array n = 0, no else',
    inputVal: [],
    expectBranch: 'ja',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('cond', function(){
  test(1, function(){
    return expectToEqual('feet')(
    cond([
      [
        function(str){
          return deepEq$(str, 'lions', '===');
        }, function(){
          return 'feet';
        }
      ], [
        function(str){
          return deepEq$(str, 'tigers', '===');
        }, function(){
          return 'heads';
        }
      ], [
        void 8, function(target){
          return 'no match on ' + target;
        }
      ]
    ])(
    'lions'));
  });
  test(2, function(){
    return expectToEqual('heads')(
    cond([
      [
        function(str){
          return deepEq$(str, 'lions', '===');
        }, function(){
          return 'feet';
        }
      ], [
        function(str){
          return deepEq$(str, 'tigers', '===');
        }, function(){
          return 'heads';
        }
      ], [
        void 8, function(target){
          return 'no match on ' + target;
        }
      ]
    ])(
    'tigers'));
  });
  test('lazy, in order', function(){
    var mock;
    mock = jest.fn();
    cond([
      [
        function(str){
          return deepEq$(str, 'lions', '===');
        }, function(){
          return 'feet';
        }
      ], [
        function(str){
          return deepEq$(str, 'tigers', '===');
        }, mock
      ], [
        void 8, function(target){
          return 'no match on ' + target;
        }
      ]
    ])(
    'lions');
    return expectToEqual(0)(
    mock.mock.calls.length);
  });
  return test(3, function(){
    return expectToEqual('no match on beetles')(
    cond([
      [
        function(str){
          return deepEq$(str, 'lions', '===');
        }, function(){
          return 'feet';
        }
      ], [
        function(str){
          return deepEq$(str, 'tigers', '===');
        }, function(){
          return 'heads';
        }
      ], [
        void 8, function(target){
          return 'no match on ' + target;
        }
      ]
    ])(
    'beetles'));
  });
});
describe('cond strict', function(){
  return xtest(1, function(){
    return condStrict([
      [
        1 + 1 === 3, function(){
          return 'hands';
        }
      ], [
        1 + 1 === 2, function(){
          return 'nails';
        }
      ], [
        void 8, function(){
          return 'no match';
        }
      ]
    ]);
  });
});
describe('cond non-strict', function(){
  return xtest(1, function(){
    return condNonStrict([
      [
        function(){
          return 1 + 1 === 3;
        }, function(){
          return 'hands';
        }
      ], [
        function(){
          return 1 + 1 === 2;
        }, function(){
          return 'nails';
        }
      ], [
        void 8, function(){
          return 'no match';
        }
      ]
    ]);
  });
});
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}
function deepEq$(x, y, type){
  var toString = {}.toString, hasOwnProperty = {}.hasOwnProperty,
      has = function (obj, key) { return hasOwnProperty.call(obj, key); };
  var first = true;
  return eq(x, y, []);
  function eq(a, b, stack) {
    var className, length, size, result, alength, blength, r, key, ref, sizeB;
    if (a == null || b == null) { return a === b; }
    if (a.__placeholder__ || b.__placeholder__) { return true; }
    if (a === b) { return a !== 0 || 1 / a == 1 / b; }
    className = toString.call(a);
    if (toString.call(b) != className) { return false; }
    switch (className) {
      case '[object String]': return a == String(b);
      case '[object Number]':
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        return +a == +b;
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') { return false; }
    length = stack.length;
    while (length--) { if (stack[length] == a) { return true; } }
    stack.push(a);
    size = 0;
    result = true;
    if (className == '[object Array]') {
      alength = a.length;
      blength = b.length;
      if (first) {
        switch (type) {
        case '===': result = alength === blength; break;
        case '<==': result = alength <= blength; break;
        case '<<=': result = alength < blength; break;
        }
        size = alength;
        first = false;
      } else {
        result = alength === blength;
        size = alength;
      }
      if (result) {
        while (size--) {
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))){ break; }
        }
      }
    } else {
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) {
        return false;
      }
      for (key in a) {
        if (has(a, key)) {
          size++;
          if (!(result = has(b, key) && eq(a[key], b[key], stack))) { break; }
        }
      }
      if (result) {
        sizeB = 0;
        for (key in b) {
          if (has(b, key)) { ++sizeB; }
        }
        if (first) {
          if (type === '<<=') {
            result = size < sizeB;
          } else if (type === '<==') {
            result = size <= sizeB
          } else {
            result = size === sizeB;
          }
        } else {
          first = false;
          result = size === sizeB;
        }
      }
    }
    stack.pop();
    return result;
  }
}