var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, rJoin, rSplit, reverse, tap, zip, sum, rEquals, rIdentical, list, test, xtest, expectToEqual, expectToBe, expectToThrow, expectNotToThrow, main, eq, ne, gt, gte, lt, lte, bindPropTo, bindProp, bindTo, bind, bindTryPropTo, bindTryProp, bindTryTo, bindTry, cascade, flip, flip3, flip4, flip5, sprintf1, sprintfN, letV, letNV, laat, let2, let3, let4, let5, let6, letN, letS, zipAll, isType, getType, isFunction, isArray, isObject, isNumber, isRegExp, isBoolean, isString, isInteger, rangeFrom, rangeTo, rangeFromBy, rangeToBy, rangeFromByAsc, rangeFromByDesc, neu, neu1, neu2, neu3, neu4, neu5, neuN, xRegExp, xRegExpStr, xRegExpFlags, xMatch, xMatchStr, xMatchStrFlags, stickMatch, xMatchGlobal, xReplace, xReplaceStr, xReplaceStrFlags, ifReplace, ifXReplace, ifXReplaceStr, ifXReplaceStrFlags, blush, always, T, F, bindLatePropTo, bindLateProp, subtractFrom, subtract, minus, add, plus, multiply, divideBy, divideInto, modulo, moduloWholePart, toThe, repeatV, repeatF, repeatSide, timesV, timesF, timesSide, sumAll, slice$ = [].slice;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, rJoin = ref$.join, rSplit = ref$.split, reverse = ref$.reverse, tap = ref$.tap, zip = ref$.zip, sum = ref$.sum, rEquals = ref$.equals, rIdentical = ref$.identical;
ref$ = require('./common'), list = ref$.list, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe, expectToThrow = ref$.expectToThrow, expectNotToThrow = ref$.expectNotToThrow;
ref$ = main = require('../index'), eq = ref$.eq, ne = ref$.ne, gt = ref$.gt, gte = ref$.gte, lt = ref$.lt, lte = ref$.lte, bindPropTo = ref$.bindPropTo, bindProp = ref$.bindProp, bindTo = ref$.bindTo, bind = ref$.bind, bindTryPropTo = ref$.bindTryPropTo, bindTryProp = ref$.bindTryProp, bindTryTo = ref$.bindTryTo, bindTry = ref$.bindTry, cascade = ref$.cascade, flip = ref$.flip, flip3 = ref$.flip3, flip4 = ref$.flip4, flip5 = ref$.flip5, sprintf1 = ref$.sprintf1, sprintfN = ref$.sprintfN, letV = ref$.letV, letNV = ref$.letNV, laat = ref$.laat, let2 = ref$.let2, let3 = ref$.let3, let4 = ref$.let4, let5 = ref$.let5, let6 = ref$.let6, letN = ref$.letN, letS = ref$.letS, zipAll = ref$.zipAll, isType = ref$.isType, getType = ref$.getType, isFunction = ref$.isFunction, isArray = ref$.isArray, isObject = ref$.isObject, isNumber = ref$.isNumber, isRegExp = ref$.isRegExp, isBoolean = ref$.isBoolean, isString = ref$.isString, isInteger = ref$.isInteger, rangeFrom = ref$.rangeFrom, rangeTo = ref$.rangeTo, rangeFromBy = ref$.rangeFromBy, rangeToBy = ref$.rangeToBy, rangeFromByAsc = ref$.rangeFromByAsc, rangeFromByDesc = ref$.rangeFromByDesc, neu = ref$.neu, neu1 = ref$.neu1, neu2 = ref$.neu2, neu3 = ref$.neu3, neu4 = ref$.neu4, neu5 = ref$.neu5, neuN = ref$.neuN, xRegExp = ref$.xRegExp, xRegExpStr = ref$.xRegExpStr, xRegExpFlags = ref$.xRegExpFlags, xMatch = ref$.xMatch, xMatchStr = ref$.xMatchStr, xMatchStrFlags = ref$.xMatchStrFlags, stickMatch = ref$.match, xMatchGlobal = ref$.xMatchGlobal, xReplace = ref$.xReplace, xReplaceStr = ref$.xReplaceStr, xReplaceStrFlags = ref$.xReplaceStrFlags, ifReplace = ref$.ifReplace, ifXReplace = ref$.ifXReplace, ifXReplaceStr = ref$.ifXReplaceStr, ifXReplaceStrFlags = ref$.ifXReplaceStrFlags, blush = ref$.blush, always = ref$.always, T = ref$.T, F = ref$.F, bindLatePropTo = ref$.bindLatePropTo, bindLateProp = ref$.bindLateProp, subtractFrom = ref$.subtractFrom, subtract = ref$.subtract, minus = ref$.minus, add = ref$.add, plus = ref$.plus, multiply = ref$.multiply, divideBy = ref$.divideBy, divideInto = ref$.divideInto, modulo = ref$.modulo, moduloWholePart = ref$.moduloWholePart, toThe = ref$.toThe, repeatV = ref$.repeatV, repeatF = ref$.repeatF, repeatSide = ref$.repeatSide, timesV = ref$.timesV, timesF = ref$.timesF, timesSide = ref$.timesSide;
sumAll = compose$(list, sum);
describe('comparisons', function(){
  describe('eq', function(){
    test(1, function(){
      expectToEqual(true)(
      eq(3)(
      3));
      return expectToEqual(false)(
      eq(3)(
      4));
    });
    test('unlike ramda equals', function(){
      expectToEqual(true)(
      rEquals([])(
      []));
      return expectToEqual(false)(
      eq([])(
      []));
    });
    return test('unlike ramda identical', function(){
      expectToEqual(false)(
      rIdentical(-0)(
      0));
      return expectToEqual(true)(
      eq(-0)(
      0));
    });
  });
  describe('ne', function(){
    return test(1, function(){
      expectToEqual(false)(
      ne(3)(
      3));
      return expectToEqual(true)(
      ne(3)(
      4));
    });
  });
  describe('gt', function(){
    return test(1, function(){
      expectToEqual(true)(
      gt(2)(
      3));
      expectToEqual(false)(
      gt(3)(
      3));
      return expectToEqual(false)(
      gt(4)(
      3));
    });
  });
  describe('gte', function(){
    return test(1, function(){
      expectToEqual(true)(
      gte(2)(
      3));
      expectToEqual(true)(
      gte(3)(
      3));
      return expectToEqual(false)(
      gte(4)(
      3));
    });
  });
  describe('lt', function(){
    return test(1, function(){
      expectToEqual(false)(
      lt(2)(
      3));
      expectToEqual(false)(
      lt(3)(
      3));
      return expectToEqual(true)(
      lt(4)(
      3));
    });
  });
  return describe('lte', function(){
    return test(1, function(){
      expectToEqual(false)(
      lte(2)(
      3));
      expectToEqual(true)(
      lte(3)(
      3));
      return expectToEqual(true)(
      lte(4)(
      3));
    });
  });
});
describe('math', function(){
  test('subtract', function(){
    expectToEqual(2)(
    subtractFrom(5)(
    3));
    expectToEqual(2)(
    subtract(3)(
    5));
    return expectToEqual(2)(
    minus(3)(
    5));
  });
  test('add', function(){
    expectToEqual(8)(
    plus(5)(
    3));
    return expectToEqual(8)(
    add(5)(
    3));
  });
  test('multiply', function(){
    return expectToEqual(15)(
    multiply(5)(
    3));
  });
  test('divide', function(){
    expectToEqual(0.6)(
    divideBy(5)(
    3));
    return expectToEqual(2)(
    divideInto(6)(
    3));
  });
  test('modulo', function(){
    expectToEqual(1)(
    modulo(3)(
    10));
    expectToEqual(3)(
    moduloWholePart(3)(
    10));
    return expectToEqual(-3)(
    moduloWholePart(3)(
    -10));
  });
  return test('exp', function(){
    return expectToEqual(100)(
    toThe(2)(
    10));
  });
});
describe('cascade', function(){
  return test(1, function(){
    var odd, this$ = this;
    odd = function(x){
      return x % 2 !== 0;
    };
    return expectToEqual([2, 6, 10])(
    cascade([1, 2, 3, 4, 5], filter(odd), map((function(it){
      return it * 2;
    }))));
  });
});
describe('bind*', function(){
  var dog, dogSpeak, dogGarble;
  dog = {
    name: 'dog',
    speak: function(){
      return 'my name is ' + this.name;
    },
    garble: function(){
      var args, res$, i$, to$;
      res$ = [];
      for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      return rJoin('!', args);
    }
  };
  dogSpeak = dog.speak;
  dogGarble = dog.garble;
  describe('bind prop to', function(){
    test(2, function(){
      var f;
      f = bindPropTo(dog)(
      'speak');
      return expectToEqual('my name is dog')(
      f());
    });
    test('passes args', function(){
      var garble;
      garble = bindPropTo(dog)(
      'garble');
      return expectToEqual('a!1!c')(
      garble('a', 1, 'c'));
    });
    return test('dies', function(){
      return expectToThrow(
      function(){
        return bindProp(dog)(
        'nothing');
      });
    });
  });
  describe('bind prop from', function(){
    test(2, function(){
      var f;
      f = bindProp('speak')(
      dog);
      return expectToEqual('my name is dog')(
      f());
    });
    test('passes args', function(){
      var garble;
      garble = bindProp('garble')(
      dog);
      return expectToEqual('a!1!c')(
      garble('a', 1, 'c'));
    });
    return test('dies', function(){
      return expectToThrow(
      function(){
        return bindProp('nothing')(
        dog);
      });
    });
  });
  describe('bind func to', function(){
    test(2, function(){
      var f;
      f = bindTo(dog)(
      dogSpeak);
      return expectToEqual('my name is dog')(
      f());
    });
    test('passes args', function(){
      var garble;
      garble = bindTo(dog)(
      dogGarble);
      return expectToEqual('a!1!c')(
      garble('a', 1, 'c'));
    });
    return test('dies', function(){
      return expectToThrow(
      function(){
        return bindTo(dog)(
        null);
      });
    });
  });
  describe('bind func from', function(){
    test(2, function(){
      var f;
      f = bind(dogSpeak)(
      dog);
      return expectToEqual('my name is dog')(
      f());
    });
    test('passes args', function(){
      var garble;
      garble = bind(dogGarble)(
      dog);
      return expectToEqual('a!1!c')(
      garble('a', 1, 'c'));
    });
    return test('dies', function(){
      return expectToThrow(
      function(){
        return bind(null)(
        dog);
      });
    });
  });
  describe('blush, always, T, F', function(){
    test('blush', function(){
      var f;
      f = blush(
      42);
      expectToEqual(42)(
      f(1));
      expectToEqual(42)(
      f(null));
      expectToEqual(42)(
      f(1, 2, 3));
      return expectToEqual(42)(
      f([1, 2, 3]));
    });
    test('always', function(){
      return expectToEqual(always)(
      blush);
    });
    test('T', function(){
      var f;
      f = T;
      expectToEqual(true)(
      f(1));
      expectToEqual(true)(
      f(null));
      expectToEqual(true)(
      f(1, 2, 3));
      return expectToEqual(true)(
      f([1, 2, 3]));
    });
    return test('F', function(){
      var f;
      f = F;
      expectToEqual(false)(
      f(1));
      expectToEqual(false)(
      f(null));
      expectToEqual(false)(
      f(1, 2, 3));
      return expectToEqual(false)(
      f([1, 2, 3]));
    });
  });
  describe('bind late', function(){
    test('prop to', function(){
      var obj2, bound;
      obj2 = {};
      bound = bindLatePropTo(obj2)(
      'speak');
      expect(function(){
        return bound();
      }).toThrow(TypeError);
      obj2.speak = function(){
        return 'spoke';
      };
      return expect(bound()).toEqual('spoke');
    });
    return test('prop from', function(){
      var obj2, bound;
      obj2 = {};
      bound = bindLateProp('speak')(
      obj2);
      expect(function(){
        return bound();
      }).toThrow(TypeError);
      obj2.speak = function(){
        return 'spoke';
      };
      return expect(bound()).toEqual('spoke');
    });
  });
  return describe('bind try *', function(){
    describe('bind try prop to', function(){
      test(1, function(){
        var f;
        f = bindTryPropTo(dog)(
        'speak');
        return expectToEqual('my name is dog')(
        f());
      });
      return test('returns null on bad bind', function(){
        var f;
        f = bindTryPropTo(dog)(
        'bleak');
        return expectToEqual(null)(
        f);
      });
    });
    describe('bind try prop', function(){
      test(1, function(){
        var f;
        f = bindTryProp('speak')(
        dog);
        return expectToEqual('my name is dog')(
        f());
      });
      return test('returns null on bad bind', function(){
        var f;
        f = bindTryProp('bleak')(
        dog);
        return expectToEqual(null)(
        f);
      });
    });
    describe('bind try func to', function(){
      test(1, function(){
        var f;
        f = bindTryTo(dog)(
        dogSpeak);
        return expectToEqual('my name is dog')(
        f());
      });
      return test('returns null on bad bind', function(){
        var f;
        f = bindTryTo(dog)(
        null);
        return expectToEqual(null)(
        f);
      });
    });
    return describe('bind try func', function(){
      test(1, function(){
        var f;
        f = bindTry(dogSpeak)(
        dog);
        return expectToEqual('my name is dog')(
        f());
      });
      return test('returns null on bad bind', function(){
        var f;
        f = bindTry(null)(
        dog);
        return expectToEqual(null)(
        f);
      });
    });
  });
});
describe('flip', function(){
  describe('target manually curried', function(){
    var divide, divideAndAddThreeArgs, divideAndAddFourArgs, divideFlipped, divideAndAddThreeArgsFlipped, divideAndAddFourArgsFlipped;
    divide = function(a){
      return function(b){
        return a / b;
      };
    };
    divideAndAddThreeArgs = function(a){
      return function(b){
        return function(c){
          return a / b + c;
        };
      };
    };
    divideAndAddFourArgs = function(a){
      return function(b){
        return function(c){
          return function(d){
            return a / b + c + d;
          };
        };
      };
    };
    divideFlipped = flip(divide);
    divideAndAddThreeArgsFlipped = flip3(divideAndAddThreeArgs);
    divideAndAddFourArgsFlipped = flip4(divideAndAddFourArgs);
    test('init', function(){
      expect(divide(10)(5)).toEqual(2);
      expect(divideAndAddThreeArgs(10)(5)(1)).toEqual(3);
      return expect(divideAndAddFourArgs(10)(5)(1)(2)).toEqual(5);
    });
    describe('2 args', function(){
      test(1, function(){
        return expect(divideFlipped(10, 5)).toEqual(0.5);
      });
      return test('result is curried', function(){
        return expect(divideFlipped(10)(5)).toEqual(0.5);
      });
    });
    describe('2 + 1 args', function(){
      test(1, function(){
        return expect(divideAndAddThreeArgsFlipped(10, 5, 1)).toEqual(1.5);
      });
      test('result is curried', function(){
        return expect(divideAndAddThreeArgsFlipped(10)(5)(1)).toEqual(1.5);
      });
      return test('result is curried part deux', function(){
        return expect(divideAndAddThreeArgsFlipped(10, 5)(1)).toEqual(1.5);
      });
    });
    return describe('2 + > 1 args', function(){
      test(1, function(){
        return expect(divideAndAddFourArgsFlipped(10, 5, 1, 2)).toEqual(3.5);
      });
      test('result is curried', function(){
        return expect(divideAndAddFourArgsFlipped(10)(5)(1)(2)).toEqual(3.5);
      });
      test('result is curried part deux', function(){
        return expect(divideAndAddFourArgsFlipped(10, 5, 1)(2)).toEqual(3.5);
      });
      test('result is curried part trois', function(){
        return expect(divideAndAddFourArgsFlipped(10, 5)(1, 2)).toEqual(3.5);
      });
      return test('result is curried part quatre', function(){
        return expect(divideAndAddFourArgsFlipped(10)(5, 1, 2)).toEqual(3.5);
      });
    });
  });
  describe('target created with LS curry function', function(){
    var divide, divideAndAddThreeArgs, divideAndAddFourArgs, divideFlipped, divideAndAddThreeArgsFlipped, divideAndAddFourArgsFlipped;
    divide = curry$(function(a, b){
      return a / b;
    });
    divideAndAddThreeArgs = curry$(function(a, b, c){
      return a / b + c;
    });
    divideAndAddFourArgs = curry$(function(a, b, c, d){
      return a / b + c + d;
    });
    divideFlipped = flip(divide);
    divideAndAddThreeArgsFlipped = flip3(divideAndAddThreeArgs);
    divideAndAddFourArgsFlipped = flip4(divideAndAddFourArgs);
    test('init', function(){
      expect(divide(10)(5)).toEqual(2);
      expect(divideAndAddThreeArgs(10)(5)(1)).toEqual(3);
      return expect(divideAndAddFourArgs(10)(5)(1)(2)).toEqual(5);
    });
    describe('2 args', function(){
      test(1, function(){
        return expect(divideFlipped(10, 5)).toEqual(0.5);
      });
      return test('result is curried', function(){
        return expect(divideFlipped(10)(5)).toEqual(0.5);
      });
    });
    describe('2 + 1 args', function(){
      test(1, function(){
        return expect(divideAndAddThreeArgsFlipped(10, 5, 1)).toEqual(1.5);
      });
      test('result is curried', function(){
        return expect(divideAndAddThreeArgsFlipped(10)(5)(1)).toEqual(1.5);
      });
      return test('result is curried part deux', function(){
        return expect(divideAndAddThreeArgsFlipped(10, 5)(1)).toEqual(1.5);
      });
    });
    return describe('2 + > 1 args', function(){
      test(1, function(){
        return expect(divideAndAddFourArgsFlipped(10, 5, 1, 2)).toEqual(3.5);
      });
      test('result is curried', function(){
        return expect(divideAndAddFourArgsFlipped(10)(5)(1)(2)).toEqual(3.5);
      });
      test('result is curried part deux', function(){
        return expect(divideAndAddFourArgsFlipped(10, 5, 1)(2)).toEqual(3.5);
      });
      test('result is curried part trois', function(){
        return expect(divideAndAddFourArgsFlipped(10, 5)(1, 2)).toEqual(3.5);
      });
      return test('result is curried part quatre', function(){
        return expect(divideAndAddFourArgsFlipped(10)(5, 1, 2)).toEqual(3.5);
      });
    });
  });
  return describe('target created with ramda curry function', function(){
    var divide, divideAndAddThreeArgs, divideAndAddFourArgs, divideFlipped, divideAndAddThreeArgsFlipped, divideAndAddFourArgsFlipped;
    divide = curry(function(a, b){
      return a / b;
    });
    divideAndAddThreeArgs = curry(function(a, b, c){
      return a / b + c;
    });
    divideAndAddFourArgs = curry(function(a, b, c, d){
      return a / b + c + d;
    });
    divideFlipped = flip(divide);
    divideAndAddThreeArgsFlipped = flip3(divideAndAddThreeArgs);
    divideAndAddFourArgsFlipped = flip4(divideAndAddFourArgs);
    test('init', function(){
      expect(divide(10)(5)).toEqual(2);
      expect(divideAndAddThreeArgs(10)(5)(1)).toEqual(3);
      return expect(divideAndAddFourArgs(10)(5)(1)(2)).toEqual(5);
    });
    describe('2 args', function(){
      test(1, function(){
        return expect(divideFlipped(10, 5)).toEqual(0.5);
      });
      return test('result is curried', function(){
        return expect(divideFlipped(10)(5)).toEqual(0.5);
      });
    });
    describe('2 + 1 args', function(){
      test(1, function(){
        return expect(divideAndAddThreeArgsFlipped(10, 5, 1)).toEqual(1.5);
      });
      test('result is curried', function(){
        return expect(divideAndAddThreeArgsFlipped(10)(5)(1)).toEqual(1.5);
      });
      return test('result is curried part deux', function(){
        return expect(divideAndAddThreeArgsFlipped(10, 5)(1)).toEqual(1.5);
      });
    });
    return describe('2 + > 1 args', function(){
      test(1, function(){
        return expect(divideAndAddFourArgsFlipped(10, 5, 1, 2)).toEqual(3.5);
      });
      test('result is curried', function(){
        return expect(divideAndAddFourArgsFlipped(10)(5)(1)(2)).toEqual(3.5);
      });
      test('result is curried part deux', function(){
        return expect(divideAndAddFourArgsFlipped(10, 5, 1)(2)).toEqual(3.5);
      });
      test('result is curried part trois', function(){
        return expect(divideAndAddFourArgsFlipped(10, 5)(1, 2)).toEqual(3.5);
      });
      return test('result is curried part quatre', function(){
        return expect(divideAndAddFourArgsFlipped(10)(5, 1, 2)).toEqual(3.5);
      });
    });
  });
});
describe('letV', function(){
  describe('let-v', function(){
    test(1, function(){
      return expectToEqual(41)(
      letV(10, 12, 19, sumAll));
    });
    return test('last arg must be a function', function(){
      expectToThrow(
      function(){
        return letV(10);
      });
      expectToThrow(
      function(){
        return letV(10, 12, 19);
      });
      return expectNotToThrow(
      function(){
        return letV(sumAll);
      });
    });
  });
  return describe('letNV', function(){
    return test(1, function(){
      return expectToEqual(41)(
      letNV([10, 12, 19], sumAll));
    });
  });
});
describe('laat', function(){
  test('main', function(){
    return expectToEqual(41)(
    laat(function(){
      return 10;
    }, function(){
      return 12;
    }, function(){
      return 19;
    }, sumAll));
  });
  describe('specific versions', function(){
    test('let2', function(){
      var this$ = this;
      return expectToEqual(11)(
      let2(function(){
        return 10;
      }, (function(it){
        return it + 1;
      })));
    });
    test('let3', function(){
      var this$ = this;
      return expectToEqual(21)(
      let3(function(){
        return 10;
      }, (function(it){
        return it + 1;
      }), sumAll));
    });
    test('let4', function(){
      var this$ = this;
      return expectToEqual(42)(
      let4(function(){
        return 10;
      }, (function(it){
        return it + 1;
      }), sumAll, sumAll));
    });
    test('let5', function(){
      var this$ = this;
      return expectToEqual(84)(
      let5(function(){
        return 10;
      }, (function(it){
        return it + 1;
      }), sumAll, sumAll, sumAll));
    });
    test('let6', function(){
      var this$ = this;
      return expectToEqual(168)(
      let6(function(){
        return 10;
      }, (function(it){
        return it + 1;
      }), sumAll, sumAll, sumAll, sumAll));
    });
    test('letN', function(){
      var this$ = this;
      return expectToEqual(168)(
      letN([
        function(){
          return 10;
        }, (function(it){
          return it + 1;
        }), sumAll, sumAll, sumAll, sumAll
      ]));
    });
    return test('letS', function(){
      return expectToEqual(84)(
      letS([
        function(t){
          return t + 1;
        }, function(t, f){
          return t + f;
        }, function(t, f, s){
          return t * f * s;
        }
      ])(
      3));
    });
  });
  describe('generic version', function(){
    test('laat (2)', function(){
      var this$ = this;
      return expectToEqual(11)(
      laat(function(){
        return 10;
      }, (function(it){
        return it + 1;
      })));
    });
    test('laat (3)', function(){
      var this$ = this;
      return expectToEqual(21)(
      laat(function(){
        return 10;
      }, (function(it){
        return it + 1;
      }), sumAll));
    });
    test('laat (6)', function(){
      var this$ = this;
      return expectToEqual(168)(
      laat(function(){
        return 10;
      }, (function(it){
        return it + 1;
      }), sumAll, sumAll, sumAll, sumAll));
    });
    return test('laat (10)', function(){
      var this$ = this;
      return expectToEqual(2688)(
      laat(function(){
        return 10;
      }, (function(it){
        return it + 1;
      }), sumAll, sumAll, sumAll, sumAll, sumAll, sumAll, sumAll, sumAll));
    });
  });
  test('single function', function(){
    return expectToEqual(11)(
    laat(function(){
      return 11;
    }));
  });
  return test('fibonacci', function(){
    var fibonacci;
    fibonacci = function(n){
      var sumLastTwo, entry, refs, args;
      sumLastTwo = function(xs){
        return xs[xs.length - 1] + xs[xs.length - 2];
      };
      entry = function(){
        var prev, res$, i$, to$, m;
        res$ = [];
        for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
          res$.push(arguments[i$]);
        }
        prev = res$;
        m = prev.length;
        switch (false) {
        case m !== 0:
          return 1;
        case m !== 1:
          return 1;
        default:
          return sumLastTwo(prev);
        }
      };
      refs = rRepeat(entry, n + 1);
      args = slice$.call(refs).concat([list]);
      return laat.apply(null, args);
    };
    expect(fibonacci(0)).toEqual([1]);
    expect(fibonacci(1)).toEqual([1, 1]);
    expect(fibonacci(2)).toEqual([1, 1, 2]);
    expect(fibonacci(8)).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34]);
    return expect(fibonacci(9)).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});
describe('sprintf*', function(){
  describe('sprintf1', function(){
    test(1, function(){
      return expectToEqual('my name is dog')(
      sprintf1('my name is %s')(
      'dog'));
    });
    return test(2, function(){
      return expectToEqual('my name is 3.33')(
      sprintf1('my name is %0.2f')(
      10 / 3));
    });
  });
  return describe('sprintfn', function(){
    test(1, function(){
      return expectToEqual('my name is not dog')(
      sprintfN('my name %s not %s')(
      ['is', 'dog']));
    });
    return test(2, function(){
      return expectToEqual('my name is 3.33')(
      sprintfN('my name %s %0.2f')(
      ['is', 10 / 3]));
    });
  });
});
describe('zip-all', function(){
  test(1, function(){
    return expectToEqual([[1, 'un'], [2, 'deux'], [3, 'trois']])(
    zipAll([1, 2, 3], ['un', 'deux', 'trois']));
  });
  test(2, function(){
    return expectToEqual([['un', 'yek', 'egy'], ['deux', 'do', 'ketto'], ['trois', 'seh', 'harom']])(
    zipAll(['un', 'deux', 'trois'], ['yek', 'do', 'seh'], ['egy', 'ketto', 'harom']));
  });
  return test("two args equivalent to ramda's zip", function(){
    return expectToEqual(zip(['un', 'yek', 'egy'], ['yek', 'do', 'seh']))(
    zipAll(['un', 'yek', 'egy'], ['yek', 'do', 'seh']));
  });
});
describe('new', function(){
  var C;
  C = (function(){
    C.displayName = 'C';
    var prototype = C.prototype, constructor = C;
    function C(){
      var args, res$, i$, to$;
      res$ = [];
      for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      this.nums = args;
    }
    C.prototype.speak = function(){
      return rJoin(' ', ['hulu'].concat(slice$.call(this.nums)));
    };
    return C;
  }());
  test('neu', function(){
    var this$ = this;
    return expectToEqual('hulu')(
    function(it){
      return it.speak();
    }(
    neu(
    C)));
  });
  test('neu1', function(){
    var this$ = this;
    return expectToEqual('hulu 10')(
    function(it){
      return it.speak();
    }(
    neu1(C)(
    10)));
  });
  test('neu2', function(){
    var this$ = this;
    return expectToEqual('hulu 20 30')(
    function(it){
      return it.speak();
    }(
    neu2(C)(20, 30)));
  });
  test('neu3', function(){
    var this$ = this;
    return expectToEqual('hulu 2 4 6')(
    function(it){
      return it.speak();
    }(
    neu3(C)(2, 4, 6)));
  });
  test('neu4', function(){
    var this$ = this;
    return expectToEqual('hulu 2 4 6 8')(
    function(it){
      return it.speak();
    }(
    neu4(C)(2, 4, 6, 8)));
  });
  test('neu5', function(){
    var this$ = this;
    return expectToEqual('hulu 2 4 6 8 10')(
    function(it){
      return it.speak();
    }(
    neu5(C)(2, 4, 6, 8, 10)));
  });
  return test('neuN', function(){
    var this$ = this;
    return expectToEqual('hulu 4 8 9')(
    function(it){
      return it.speak();
    }(
    neuN(C)(
    [4, 8, 9])));
  });
});
describe('match/regex', function(){
  test('x-regexp', function(){
    var re, this$ = this;
    re = xRegExp(new RegExp(' (ses) $', 'm'));
    return expectToEqual('ses')(
    function(m){
      return m[1];
    }(
    function(it){
      return it.match(re);
    }(
    'horses\npigs')));
  });
  test('x-regexp-flags', function(){
    var re, this$ = this;
    re = xRegExpFlags(new RegExp(' (SeS) $'), 'mi');
    return expectToEqual('ses')(
    function(m){
      return m[1];
    }(
    function(it){
      return it.match(re);
    }(
    'horses\npigs')));
  });
  test('x-regexp-flags, overrides existing flags', function(){
    var re, this$ = this;
    re = xRegExpFlags(new RegExp(' (SeS) $', 'i'), 'm');
    return expectToEqual(null)(
    function(it){
      return it.match(re);
    }(
    'horses\npigs'));
  });
  test('x-regexp-str, no flags', function(){
    var re, this$ = this;
    re = xRegExpStr(' (igs) $');
    return expectToEqual('igs')(
    function(m){
      return m[1];
    }(
    function(it){
      return it.match(re);
    }(
    'horses\npigs')));
  });
  test('x-regexp-str, flags', function(){
    var re, this$ = this;
    re = xRegExpStr(' (ses) $', 'm');
    return expectToEqual('ses')(
    function(m){
      return m[1];
    }(
    function(it){
      return it.match(re);
    }(
    'horses\npigs')));
  });
  test('xmatch-str', function(){
    var this$ = this;
    return expectToEqual('ors')(
    function(it){
      return it[1];
    }(
    xMatchStr(' ( o . s ) ')(
    'horses')));
  });
  test('xmatch-str-flags', function(){
    var this$ = this;
    return expectToEqual('ses')(
    function(it){
      return it[1];
    }(
    xMatchStrFlags(' (ses) $', 'm')(
    'horses\npigs')));
  });
  test('xmatch', function(){
    return expectToEqual('ors')(
    function(m){
      return m[1];
    }(
    xMatch(new RegExp(' ( o . s ) '))(
    'horses')));
  });
  test('xmatch-global', function(){
    var y, re;
    y = [];
    re = new RegExp(' (s .) ');
    xMatchGlobal(re, function(m){
      return y.push(m);
    })(
    'shorses and shoes');
    return expectToEqual(['sh', 'se', 's ', 'sh'])(
    y);
  });
  test('match', function(){
    return expectToEqual('ors')(
    function(m){
      return m[1];
    }(
    stickMatch(new RegExp('(o.s)'))(
    'horses')));
  });
  test('x-replace', function(){
    return expectToEqual('lpos of pigs')(
    xReplace(new RegExp('(o .)'), 'po')(
    'lots of pigs'));
  });
  test('x-replace global', function(){
    return expectToEqual('lpos po pigs')(
    xReplace(new RegExp('(o .)', 'g'), 'po')(
    'lots of pigs'));
  });
  test('x-replace-str', function(){
    return expectToEqual('lots stickigs')(
    xReplaceStr(' (o .. p) ', 'stick')(
    'lots of pigs'));
  });
  test('x-replace-str-flags', function(){
    return expectToEqual('lpos of pigs')(
    xReplaceStrFlags(' (o .) ', '', 'po')(
    'lots of pigs'));
  });
  return test('x-replace-str-flags global', function(){
    return expectToEqual('lpos po pigs')(
    xReplaceStrFlags(' (o .) ', 'g', 'po')(
    'lots of pigs'));
  });
});
describe('ifReplace*', function(){
  var doTest;
  doTest = function(expectResult, expectReplCount, success, func){
    var jaRes, neeRes, replCount, x$, ja, y$, nee, ref$, jaCalls, neeCalls, result;
    x$ = ja = jest.fn();
    x$.mockImplementation(function(x, cnt){
      jaRes = x;
      return replCount = cnt;
    });
    y$ = nee = jest.fn();
    y$.mockImplementation(function(x){
      neeRes = x;
      return replCount = 0;
    });
    func(ja, nee);
    ref$ = success
      ? [1, 0, jaRes]
      : [0, 1, neeRes], jaCalls = ref$[0], neeCalls = ref$[1], result = ref$[2];
    expectToEqual(jaCalls)(
    ja.mock.calls.length);
    expectToEqual(neeCalls)(
    nee.mock.calls.length);
    expectToEqual(expectResult)(
    result);
    return expectToEqual(expectReplCount)(
    replCount);
  };
  test('ifReplace succesful', function(){
    var ref$, re, target, replacement;
    ref$ = [/s/g, 'sandmishes', 't'], re = ref$[0], target = ref$[1], replacement = ref$[2];
    return doTest('tandmithet', 3, true, function(ja, nee){
      return ifReplace(ja, nee, re, replacement)(
      target);
    });
  });
  test('ifReplace succesful, repl is a function', function(){
    var ref$, re, target, replacement, this$ = this;
    ref$ = [
      /s/g, 'sandmishes', function(it){
        return it.toUpperCase();
      }
    ], re = ref$[0], target = ref$[1], replacement = ref$[2];
    return doTest('SandmiSheS', 3, true, function(ja, nee){
      return ifReplace(ja, nee, re, replacement)(
      target);
    });
  });
  test('ifReplace not succesful', function(){
    var ref$, re, target, replacement;
    ref$ = [/xxxx/g, 'sandmishes', 't'], re = ref$[0], target = ref$[1], replacement = ref$[2];
    return doTest('sandmishes', 0, false, function(ja, nee){
      return ifReplace(ja, nee, re, replacement)(
      target);
    });
  });
  test('ifXReplace succesful', function(){
    var ref$, re, target, replacement;
    ref$ = [new RegExp(' s ', 'g'), 'sandmishes', 't'], re = ref$[0], target = ref$[1], replacement = ref$[2];
    return doTest('tandmithet', 3, true, function(ja, nee){
      return ifXReplace(ja, nee, re, replacement)(
      target);
    });
  });
  test('ifXReplace not succesful', function(){
    var ref$, re, target, replacement;
    ref$ = [new RegExp(' xxxx ', 'g'), 'sandmishes', 't'], re = ref$[0], target = ref$[1], replacement = ref$[2];
    return doTest('sandmishes', 0, false, function(ja, nee){
      return ifXReplace(ja, nee, re, replacement)(
      target);
    });
  });
  test('ifXReplaceStr succesful', function(){
    var ref$, reStr, target, replacement;
    ref$ = [' s ', 'sandmishes', 't'], reStr = ref$[0], target = ref$[1], replacement = ref$[2];
    return doTest('tandmishes', 1, true, function(ja, nee){
      return ifXReplaceStr(ja, nee, reStr, replacement)(
      target);
    });
  });
  test('ifXReplaceStr not succesful', function(){
    var ref$, reStr, target, replacement;
    ref$ = [' xxxx ', 'sandmishes', 't'], reStr = ref$[0], target = ref$[1], replacement = ref$[2];
    return doTest('sandmishes', 0, false, function(ja, nee){
      return ifXReplaceStr(ja, nee, reStr, replacement)(
      target);
    });
  });
  test('ifXReplaceStrFlags succesful', function(){
    var ref$, reStr, target, replacement;
    ref$ = [' s ', 'sandmishes', 't'], reStr = ref$[0], target = ref$[1], replacement = ref$[2];
    return doTest('tandmithet', 3, true, function(ja, nee){
      return ifXReplaceStrFlags(ja, nee, reStr, 'g', replacement)(
      target);
    });
  });
  return test('ifXReplaceStrFlags not succesful', function(){
    var ref$, reStr, target, replacement;
    ref$ = [' xxxx ', 'sandmishes', 't'], reStr = ref$[0], target = ref$[1], replacement = ref$[2];
    return doTest('sandmishes', 0, false, function(ja, nee){
      return ifXReplaceStrFlags(ja, nee, reStr, 'g', replacement)(
      target);
    });
  });
});
describe('repeat, times', function(){
  var y, ping;
  y = {
    y: void 8
  };
  ping = function(x){
    return y.y.push(x);
  };
  beforeEach(function(){
    return y.y = [];
  });
  describe('repeatV', function(){
    return test(1, function(){
      return expectToEqual(['thing', 'thing', 'thing', 'thing', 'thing'])(
      repeatV('thing')(
      5));
    });
  });
  describe('repeatF', function(){
    return test(1, function(){
      return expectToEqual(['thing0', 'thing1', 'thing2'])(
      repeatF(function(n){
        return "thing" + n;
      })(
      3));
    });
  });
  describe('repeatSide', function(){
    return test(1, function(){
      expectToEqual(void 8)(
      repeatSide(function(n){
        return ping("thing" + n);
      })(
      3));
      return expectToEqual(['thing0', 'thing1', 'thing2'])(
      y.y);
    });
  });
  describe('timesV', function(){
    return test(1, function(){
      return expectToEqual(['thing', 'thing', 'thing', 'thing', 'thing'])(
      timesV(5)(
      'thing'));
    });
  });
  describe('timesF', function(){
    return test(1, function(){
      return expectToEqual(['thing0', 'thing1', 'thing2'])(
      timesF(3)(
      function(n){
        return "thing" + n;
      }));
    });
  });
  return describe('timesSide', function(){
    return test(1, function(){
      expectToEqual(void 8)(
      timesSide(3)(
      function(n){
        return ping("thing" + n);
      }));
      return expectToEqual(['thing0', 'thing1', 'thing2'])(
      y.y);
    });
  });
});
describe('types', function(){
  test('isType', function(){
    expectToEqual(true)(
    isType('Number')(
    3));
    expectToEqual(false)(
    isType('Boolean')(
    3));
    expectToEqual(false)(
    isType('String')(
    3));
    expectToEqual(false)(
    isType(Number)(
    3));
    expectToEqual(false)(
    isType(Boolean)(
    3));
    return expectToEqual(false)(
    isType(String)(
    3));
  });
  test('getType', function(){
    expectToEqual('Number')(
    getType(
    3));
    expectToEqual('Boolean')(
    getType(
    true));
    expectToEqual('String')(
    getType(
    '3'));
    expectToEqual('Undefined')(
    getType(
    void 8));
    return expectToEqual('Null')(
    getType(
    null));
  });
  test('isFunction', function(){
    var this$ = this;
    expectToEqual(true)(
    isFunction(
    (function(it){
      return it + 3;
    })));
    expectToEqual(false)(
    isFunction(
    3));
    return expectToEqual(false)(
    isFunction(
    '3'));
  });
  test('isArray', function(){
    expectToEqual(true)(
    isArray(
    []));
    expectToEqual(false)(
    isArray(
    {}));
    return expectToEqual(false)(
    isArray(
    3));
  });
  test('isObject', function(){
    expectToEqual(true)(
    isObject(
    {}));
    expectToEqual(false)(
    isObject(
    []));
    return expectToEqual(false)(
    isObject(
    null));
  });
  test('isNumber', function(){
    expectToEqual(true)(
    isNumber(
    3));
    expectToEqual(true)(
    isNumber(
    NaN));
    expectToEqual(false)(
    isNumber(
    '2'));
    return expectToEqual(false)(
    isNumber(
    true));
  });
  test('isRegExp', function(){
    expectToEqual(true)(
    isRegExp(
    /abc/));
    expectToEqual(false)(
    isRegExp(
    3));
    return expectToEqual(false)(
    isRegExp(
    null));
  });
  test('isBoolean', function(){
    expectToEqual(true)(
    isBoolean(
    true));
    expectToEqual(true)(
    isBoolean(
    false));
    expectToEqual(false)(
    isBoolean(
    0));
    return expectToEqual(false)(
    isBoolean(
    null));
  });
  test('isString', function(){
    expectToEqual(true)(
    isString(
    '3'));
    expectToEqual(false)(
    isString(
    3));
    return expectToEqual(false)(
    isString(
    true));
  });
  return test('isInteger', function(){
    expectToEqual(false)(
    isInteger(
    '3.2'));
    expectToEqual(false)(
    isInteger(
    '3'));
    expectToEqual(false)(
    isInteger(
    3.2));
    expectToEqual(false)(
    isInteger(
    -3.2));
    expectToEqual(true)(
    isInteger(
    3));
    expectToEqual(true)(
    isInteger(
    0));
    expectToEqual(true)(
    isInteger(
    -0));
    return expectToEqual(true)(
    isInteger(
    -3));
  });
});
describe('range, compact', function(){
  describe('rangeFromBy', function(){
    test(1, function(){
      return expectToEqual([0, 2, 4, 6, 8])(
      rangeFromBy(2, 0, 10));
    });
    return test(3, function(){
      return expectToEqual([10, 8, 6, 4, 2])(
      rangeFromBy(-2, 10, 0));
    });
  });
  describe('rangeFromBy specific', function(){
    test(1, function(){
      return expectToEqual([0, 2, 4, 6, 8])(
      rangeFromByAsc(2, 0, 10));
    });
    return test(3, function(){
      return expectToEqual([10, 8, 6, 4, 2])(
      rangeFromByDesc(-2, 10)(
      0));
    });
  });
  describe('rangeToBy', function(){
    test(1, function(){
      return expectToEqual([0, 2, 4, 6, 8])(
      rangeToBy(2, 10, 0));
    });
    test(2, function(){
      return expectToEqual([0, 2, 4, 6, 8])(
      rangeToBy(2, 10)(
      0));
    });
    return test(3, function(){
      return expectToEqual([10, 8, 6, 4, 2])(
      rangeToBy(-2, 0, 10));
    });
  });
  describe('rangeFrom', function(){
    return test(1, function(){
      return expectToEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])(
      rangeFrom(0)(
      10));
    });
  });
  return describe('rangeTo', function(){
    return test(1, function(){
      return expectToEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])(
      rangeTo(10)(
      0));
    });
  });
});
function compose$() {
  var functions = arguments;
  return function() {
    var i, result;
    result = functions[0].apply(this, arguments);
    for (i = 1; i < functions.length; ++i) {
      result = functions[i](result);
    }
    return result;
  };
}
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