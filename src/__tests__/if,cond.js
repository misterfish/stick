var ref$, assoc, assocPath, head, tail, reduceRight, chain, id, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, odd, even, list, test, xtest, expectToEqual, expectToBe, expectToThrow, ok, notOk, isTrue, isFalse, isYes, isNo, isTruthy, isFalsey, ifPredicate, whenPredicate, ifPredicate__, ifOk, whenOk, ifNotOk, whenNotOk, ifTrue, whenTrue, ifFalse, whenFalse, ifYes, whenYes, ifTruthy, whenTruthy, ifNo, whenNo, ifFalsey, whenFalsey, ifHas, whenHas, ifHasIn, whenHasIn, ifBind, whenBind, cond, condN, condO, guard, guardV, otherwise, ifOk__, ifTrue__, ifFalse__, ifYes__, ifNo__, doTests, doTestDoubleArm, doTestSingleArm, slice$ = [].slice;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, id = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('prelude-ls'), odd = ref$.odd, even = ref$.even;
ref$ = require('./common'), list = ref$.list, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe, expectToThrow = ref$.expectToThrow;
ref$ = require('../index'), ok = ref$.ok, notOk = ref$.notOk, isTrue = ref$.isTrue, isFalse = ref$.isFalse, isYes = ref$.isYes, isNo = ref$.isNo, isTruthy = ref$.isTruthy, isFalsey = ref$.isFalsey, ifPredicate = ref$.ifPredicate, whenPredicate = ref$.whenPredicate, ifPredicate__ = ref$.ifPredicate__, ifOk = ref$.ifOk, whenOk = ref$.whenOk, ifNotOk = ref$.ifNotOk, whenNotOk = ref$.whenNotOk, ifTrue = ref$.ifTrue, whenTrue = ref$.whenTrue, ifFalse = ref$.ifFalse, whenFalse = ref$.whenFalse, ifYes = ref$.ifYes, whenYes = ref$.whenYes, ifTruthy = ref$.ifTruthy, whenTruthy = ref$.whenTruthy, ifNo = ref$.ifNo, whenNo = ref$.whenNo, ifFalsey = ref$.ifFalsey, whenFalsey = ref$.whenFalsey, ifHas = ref$.ifHas, whenHas = ref$.whenHas, ifHasIn = ref$.ifHasIn, whenHasIn = ref$.whenHasIn, ifBind = ref$.ifBind, whenBind = ref$.whenBind, cond = ref$.cond, condN = ref$.condN, condO = ref$.condO, guard = ref$.guard, guardV = ref$.guardV, otherwise = ref$.otherwise, ifOk__ = ref$.ifOk__, ifTrue__ = ref$.ifTrue__, ifFalse__ = ref$.ifFalse__, ifYes__ = ref$.ifYes__, ifNo__ = ref$.ifNo__;
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
  var fn, is__, desc, inputVal, expectBranch;
  fn = arg$.fn, is__ = arg$.is__;
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
    return expectToEqual(expectedRet)(
    ret);
  });
});
doTestSingleArm = curry$(function(arg$, arg1$){
  var fn, is__, desc, inputVal, expectBranch;
  fn = arg$.fn, is__ = arg$.is__;
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
    return expectToEqual(expectedRet)(
    ret);
  });
});
describe('whenPredicate', function(){
  var describeSpec, tests, describeSpec2, tests2, this$ = this;
  describeSpec = {
    fn: whenPredicate((function(it){
      return it > 3;
    })),
    is__: false
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
    is__: false
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
    is__: false
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
    is__: false
  };
  tests2 = list({
    desc: 'exact truth, not truthy',
    inputVal: 3,
    expectBranch: 'nee',
    numArms: 2
  });
  doTests(describeSpec2, tests2);
  return test('anaphoric', function(){
    var this$ = this;
    expectToEqual(4)(
    ifPredicate(odd, (function(it){
      return it + 1;
    }), (function(it){
      return it - 1;
    }))(
    3));
    expectToEqual(2)(
    ifPredicate(even, (function(it){
      return it + 1;
    }), (function(it){
      return it - 1;
    }))(
    3));
    expectToEqual(4)(
    whenPredicate(odd, (function(it){
      return it + 1;
    }))(
    3));
    return expectToEqual(void 8)(
    whenPredicate(even, (function(it){
      return it + 1;
    }))(
    3));
  });
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
describe('whenNotOk', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: whenNotOk,
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
    expectBranch: 'ja',
    numArms: 1
  }, {
    desc: 'null',
    inputVal: null,
    expectBranch: 'ja',
    numArms: 1
  });
  return doTests(describeSpec, tests);
});
describe('ifNotOk', function(){
  var describeSpec, tests;
  describeSpec = {
    fn: ifNotOk,
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
    expectBranch: 'ja',
    numArms: 2
  }, {
    desc: 'null',
    inputVal: null,
    expectBranch: 'ja',
    numArms: 2
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
  doTests(describeSpec, tests);
  return test('alias whenTruthy', function(){
    return expectToEqual(whenTruthy)(
    whenYes);
  });
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
  doTests(describeSpec, tests);
  return test('alias ifTruthy', function(){
    return expectToEqual(ifTruthy)(
    ifYes);
  });
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
  doTests(describeSpec, tests);
  return test('alias whenFalsey', function(){
    return expectToEqual(whenFalsey)(
    whenNo);
  });
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
  doTests(describeSpec, tests);
  return test('alias ifFalsey', function(){
    return expectToEqual(ifFalsey)(
    ifNo);
  });
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
describe('cond', function(){
  describe('cond', function(){
    describe('raw', function(){
      test('truthy', function(){
        return expectToEqual('ok')(
        cond([
          function(){
            return 3 === 4;
          }, function(){
            return 'twilight zone';
          }
        ], [
          function(){
            return 3 === 5;
          }, function(){
            return 'even stranger';
          }
        ], [
          function(){
            return 'ok';
          }, function(str){
            return str;
          }
        ], [
          null, function(){
            return 'error';
          }
        ]));
      });
      test('fallthrough', function(){
        return expectToEqual(void 8)(
        cond([
          function(){
            return 3 === 4;
          }, function(){
            return 'twilight zone';
          }
        ], [
          function(){
            return 3 === 5;
          }, function(){
            return 'even stranger';
          }
        ]));
      });
      return test('null test should throw', function(){
        return expectToThrow(
        function(){
          return cond([
            function(){
              return 3 === 4;
            }, function(){
              return 'twilight zone';
            }
          ], [
            function(){
              return 3 === 5;
            }, function(){
              return 'even stranger';
            }
          ], [null, function(){}]);
        });
      });
    });
    return describe('idiomatic', function(){
      test('truthy', function(){
        return expectToEqual('ok')(
        cond(guard(function(){
          return 'twilight zone';
        })(
        function(){
          return 3 === 4;
        }), guard(function(){
          return 'even stranger';
        })(
        function(){
          return 3 === 5;
        }), guard(function(str){
          return str;
        })(
        function(){
          return 'ok';
        }), guard(function(){
          return 'error';
        })(
        otherwise)));
      });
      test('fallthrough', function(){
        return expectToEqual(void 8)(
        cond(guard(function(){
          return 'twilight zone';
        })(
        function(){
          return 3 === 4;
        }), guard(function(){
          return 'even stranger';
        })(
        function(){
          return 3 === 5;
        })));
      });
      return test('otherwise', function(){
        return expectToEqual('ok')(
        cond(guard(function(){
          return 'twilight zone';
        })(
        function(){
          return 3 === 4;
        }), guard(function(){
          return 'even stranger';
        })(
        function(){
          return 3 === 5;
        }), guard(function(){
          return 'ok';
        })(
        otherwise)));
      });
    });
  });
  describe('condN', function(){
    describe('raw', function(){
      test('truthy', function(){
        return expectToEqual('ok')(
        condN([
          [
            function(){
              return 3 === 4;
            }, function(){
              return 'twilight zone';
            }
          ], [
            function(){
              return 3 === 5;
            }, function(){
              return 'even stranger';
            }
          ], [
            function(){
              return 'ok';
            }, function(str){
              return str;
            }
          ], [
            null, function(){
              return 'error';
            }
          ]
        ]));
      });
      test('fallthrough', function(){
        return expectToEqual(void 8)(
        condN([
          [
            function(){
              return 3 === 4;
            }, function(){
              return 'twilight zone';
            }
          ], [
            function(){
              return 3 === 5;
            }, function(){
              return 'even stranger';
            }
          ]
        ]));
      });
      return test('null test should throw', function(){
        return expectToThrow(
        function(){
          return condN([
            [
              function(){
                return 3 === 4;
              }, function(){
                return 'twilight zone';
              }
            ], [
              function(){
                return 3 === 5;
              }, function(){
                return 'even stranger';
              }
            ], [null, function(){}]
          ]);
        });
      });
    });
    return describe('idiomatic', function(){
      test('truthy', function(){
        return expectToEqual('ok')(
        condN([
          guard(function(){
            return 'twilight zone';
          })(
          function(){
            return 3 === 4;
          }), guard(function(){
            return 'even stranger';
          })(
          function(){
            return 3 === 5;
          }), guard(function(str){
            return str;
          })(
          function(){
            return 'ok';
          }), guard(function(){
            return 'error';
          })(
          otherwise)
        ]));
      });
      test('fallthrough', function(){
        return expectToEqual(void 8)(
        condN([
          guard(function(){
            return 'twilight zone';
          })(
          function(){
            return 3 === 4;
          }), guard(function(){
            return 'even stranger';
          })(
          function(){
            return 3 === 5;
          })
        ]));
      });
      return test('otherwise', function(){
        return expectToEqual('ok')(
        condN([
          guard(function(){
            return 'twilight zone';
          })(
          function(){
            return 3 === 4;
          }), guard(function(){
            return 'even stranger';
          })(
          function(){
            return 3 === 5;
          }), guard(function(){
            return 'ok';
          })(
          otherwise)
        ]));
      });
    });
  });
  describe('condO', function(){
    describe('raw', function(){
      test('truthy', function(){
        var this$ = this;
        return expectToEqual(5)(
        condO([
          [
            (function(it){
              return it === 5;
            }), function(){
              return 'twilight zone';
            }
          ], [
            (function(it){
              return it === 4;
            }), function(){
              return 'even stranger';
            }
          ], [
            odd, (function(it){
              return it + 2;
            })
          ], [
            null, function(){
              return 'error';
            }
          ]
        ])(
        3));
      });
      test('fallthrough', function(){
        var this$ = this;
        return expectToEqual(void 8)(
        condO([
          [
            (function(it){
              return it === 5;
            }), function(){
              return 'twilight zone';
            }
          ], [
            (function(it){
              return it === 4;
            }), function(){
              return 'even stranger';
            }
          ]
        ])(
        3));
      });
      return test('null test should throw', function(){
        return expectToThrow(
        function(){
          var this$ = this;
          return condO([
            [
              function(){
                return 3 === 4;
              }, function(){
                return 'twilight zone';
              }
            ], [
              function(){
                return 3 === 5;
              }, function(){
                return 'even stranger';
              }
            ], [
              null, (function(it){
                return it + 5;
              })
            ]
          ])(
          3);
        });
      });
    });
    return describe('idiomatic', function(){
      test('truthy', function(){
        var this$ = this;
        return expectToEqual(12)(
        condO([
          guard(function(){
            return 'twilight zone';
          })(
          (function(it){
            return it === 4;
          })), guard(function(){
            return 'even stranger';
          })(
          (function(it){
            return it === 5;
          })), guard((function(it){
            return it + 9;
          }))(
          odd), guard(function(){
            return 'error';
          })(
          otherwise)
        ])(
        3));
      });
      test('fallthrough', function(){
        var this$ = this;
        return expectToEqual(void 8)(
        condO([
          guard(function(){
            return 'twilight zone';
          })(
          (function(it){
            return it === 4;
          })), guard(function(){
            return 'even stranger';
          })(
          (function(it){
            return it === 5;
          })), guard((function(it){
            return it + 9;
          }))(
          even)
        ])(
        3));
      });
      return test('otherwise', function(){
        var this$ = this;
        return expectToEqual('ok')(
        condO([
          guard(function(){
            return 'twilight zone';
          })(
          (function(it){
            return it === 4;
          })), guard(function(){
            return 'even stranger';
          })(
          (function(it){
            return it === 5;
          })), guard(function(){
            return 'ok';
          })(
          otherwise)
        ])(
        3));
      });
    });
  });
  describe('misc', function(){
    return test('guardV', function(){
      var this$ = this;
      expectToEqual('big')(
      condO([
        guardV('big')(
        (function(it){
          return it > 30;
        })), guardV('medium')(
        (function(it){
          return it > 20;
        }))
      ])(
      32));
      return expectToEqual('medium')(
      cond(guardV('big')(
      function(){
        return 21 > 30;
      }), guardV('medium')(
      function(){
        return 21 > 20;
      })));
    });
  });
  test(1, function(){
    return expectToEqual('feet')(
    condO([
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
    condO([
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
  return test('lazy, in order', function(){
    var mock;
    mock = jest.fn();
    condO([
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
});
describe('is/isNot', function(){
  test('ok', function(){
    expectToEqual(true)(
    ok(
    true));
    expectToEqual(true)(
    ok(
    false));
    expectToEqual(false)(
    ok(
    void 8));
    return expectToEqual(false)(
    ok(
    null));
  });
  test('notOk', function(){
    expectToEqual(false)(
    notOk(
    true));
    expectToEqual(false)(
    notOk(
    false));
    expectToEqual(true)(
    notOk(
    void 8));
    return expectToEqual(true)(
    notOk(
    null));
  });
  test('isTrue', function(){
    expectToEqual(true)(
    isTrue(
    true));
    expectToEqual(false)(
    isTrue(
    1));
    expectToEqual(false)(
    isTrue(
    0));
    expectToEqual(false)(
    isTrue(
    '1'));
    expectToEqual(false)(
    isTrue(
    false));
    expectToEqual(false)(
    isTrue(
    void 8));
    return expectToEqual(false)(
    isTrue(
    null));
  });
  test('isFalse', function(){
    expectToEqual(true)(
    isFalse(
    false));
    expectToEqual(false)(
    isFalse(
    true));
    expectToEqual(false)(
    isFalse(
    0));
    expectToEqual(false)(
    isFalse(
    1));
    expectToEqual(false)(
    isFalse(
    '1'));
    expectToEqual(false)(
    isFalse(
    void 8));
    return expectToEqual(false)(
    isFalse(
    null));
  });
  test('isYes', function(){
    expectToEqual(true)(
    isYes(
    true));
    expectToEqual(true)(
    isYes(
    1));
    expectToEqual(true)(
    isYes(
    '1'));
    expectToEqual(true)(
    isYes(
    '2'));
    expectToEqual(true)(
    isYes(
    '0'));
    expectToEqual(false)(
    isYes(
    ''));
    expectToEqual(false)(
    isYes(
    0));
    expectToEqual(false)(
    isYes(
    false));
    expectToEqual(false)(
    isYes(
    void 8));
    return expectToEqual(false)(
    isYes(
    null));
  });
  test('isNo', function(){
    expectToEqual(false)(
    isNo(
    true));
    expectToEqual(false)(
    isNo(
    1));
    expectToEqual(false)(
    isNo(
    '1'));
    expectToEqual(false)(
    isNo(
    '2'));
    expectToEqual(false)(
    isNo(
    '0'));
    expectToEqual(true)(
    isNo(
    ''));
    expectToEqual(true)(
    isNo(
    0));
    expectToEqual(true)(
    isNo(
    false));
    expectToEqual(true)(
    isNo(
    void 8));
    return expectToEqual(true)(
    isNo(
    null));
  });
  return test('aliases', function(){
    expectToEqual(isFalsey)(
    isNo);
    return expectToEqual(isTruthy)(
    isYes);
  });
});
describe('if/when has/hasIn', function(){
  var base, extended, ref$;
  base = {
    water: 'wet',
    nothing: void 8,
    me: 'ik'
  };
  extended = (ref$ = Object.create(base), ref$.baby = 'feet', ref$);
  describe('if-has', function(){
    test('main', function(){
      return expectToEqual('wetwaterik')(
      ifHas(function(v, o, k){
        return v + k + o.me;
      }, function(){
        return 42;
      })(
      [base, 'water']));
    });
    test('has undefined (should be true)', function(){
      return expectToEqual(41)(
      ifHas(function(v, o, k){
        return 41;
      }, function(){
        return 42;
      })(
      [base, 'nothing']));
    });
    test('nonexistent', function(){
      return expectToEqual(42)(
      ifHas(function(v, o, k){
        return 41;
      }, function(){
        return 42;
      })(
      [base, 'nada']));
    });
    test('extended', function(){
      return expectToEqual(42)(
      ifHas(function(v, o, k){
        return 41;
      }, function(){
        return 42;
      })(
      [extended, 'water']));
    });
    return test('extended', function(){
      return expectToEqual(41)(
      ifHas(function(v, o, k){
        return 41;
      }, function(){
        return 42;
      })(
      [extended, 'baby']));
    });
  });
  describe('when-has', function(){
    test('main', function(){
      return expectToEqual('wetwaterik')(
      whenHas(function(v, o, k){
        return v + k + o.me;
      })(
      [base, 'water']));
    });
    test('has undefined (should be true)', function(){
      return expectToEqual(41)(
      whenHas(function(v, o, k){
        return 41;
      })(
      [base, 'nothing']));
    });
    test('nonexistent', function(){
      return expectToEqual(void 8)(
      whenHas(function(v, o, k){
        return 41;
      })(
      [base, 'nada']));
    });
    test('extended', function(){
      return expectToEqual(void 8)(
      whenHas(function(v, o, k){
        return 41;
      })(
      [extended, 'water']));
    });
    return test('extended', function(){
      return expectToEqual(41)(
      whenHas(function(v, o, k){
        return 41;
      })(
      [extended, 'baby']));
    });
  });
  describe('if-has-in', function(){
    test('main', function(){
      return expectToEqual('wetwaterik')(
      ifHasIn(function(v, o, k){
        return v + k + o.me;
      }, function(){
        return 42;
      })(
      [base, 'water']));
    });
    test('has-in undefined (should be true)', function(){
      return expectToEqual(41)(
      ifHasIn(function(v, o, k){
        return 41;
      }, function(){
        return 42;
      })(
      [base, 'nothing']));
    });
    test('nonexistent', function(){
      return expectToEqual(42)(
      ifHasIn(function(v, o, k){
        return 41;
      }, function(){
        return 42;
      })(
      [base, 'nada']));
    });
    test('extended', function(){
      return expectToEqual(41)(
      ifHasIn(function(v, o, k){
        return 41;
      }, function(){
        return 42;
      })(
      [extended, 'water']));
    });
    return test('extended', function(){
      return expectToEqual(41)(
      ifHasIn(function(v, o, k){
        return 41;
      }, function(){
        return 42;
      })(
      [extended, 'baby']));
    });
  });
  return describe('when-has-in', function(){
    test('main', function(){
      return expectToEqual('wetwaterik')(
      whenHasIn(function(v, o, k){
        return v + k + o.me;
      })(
      [base, 'water']));
    });
    test('has-in undefined (should be true)', function(){
      return expectToEqual(41)(
      whenHasIn(function(v, o, k){
        return 41;
      })(
      [base, 'nothing']));
    });
    test('nonexistent', function(){
      return expectToEqual(void 8)(
      whenHasIn(function(v, o, k){
        return 41;
      })(
      [base, 'nada']));
    });
    test('extended', function(){
      return expectToEqual(41)(
      whenHasIn(function(v, o, k){
        return 41;
      })(
      [extended, 'water']));
    });
    return test('extended', function(){
      return expectToEqual(41)(
      whenHasIn(function(v, o, k){
        return 41;
      })(
      [extended, 'baby']));
    });
  });
});
describe('ifBind, whenBind', function(){
  var base, extended, ref$;
  base = {
    water: 'wet',
    nothing: void 8,
    me: 'ik',
    douse: function(level){
      return this.water + ("ness level " + level);
    }
  };
  extended = (ref$ = Object.create(base), ref$.baby = 'feet', ref$);
  describe('ifBind', function(){
    test('base', function(){
      return expectToEqual('wetness level 10')(
      ifBind(function(bound){
        return bound(10);
      }, function(){
        return 42;
      })(
      [base, 'douse']));
    });
    test('extended', function(){
      return expectToEqual('wetness level 10')(
      ifBind(function(bound){
        return bound(10);
      }, function(){
        return 42;
      })(
      [extended, 'douse']));
    });
    return test('no', function(){
      return expectToEqual(42)(
      ifBind(function(){
        return 41;
      }, function(){
        return 42;
      })(
      [base, 'nothing']));
    });
  });
  return describe('whenBind', function(){
    test('base', function(){
      return expectToEqual('wetness level 10')(
      whenBind(function(bound){
        return bound(10);
      })(
      [base, 'douse']));
    });
    test('extended', function(){
      return expectToEqual('wetness level 10')(
      whenBind(function(bound){
        return bound(10);
      })(
      [extended, 'douse']));
    });
    return test('no', function(){
      return expectToEqual(void 8)(
      whenBind(function(){
        return 41;
      })(
      [base, 'nothing']));
    });
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