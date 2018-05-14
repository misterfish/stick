var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, list, test, xtest, expectToEqual, expectToBe, expectToThrow, main, ok, zipAll, bind, bindLate, bindTry, cascade, flipC, sprintf1, sprintfN, given, laat, lets, laats, nieuw, nieuw1, nieuw2, nieuw3, nieuwN, xRegExp, xRegExpStr, xMatch, xMatchStr, xMatchStrFlags, xReplace, xReplaceStr, xReplaceStrFlags, ifReplace, ifXReplace, ifXReplaceStr, ifXReplaceStrFlags, slice$ = [].slice;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), list = ref$.list, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe, expectToThrow = ref$.expectToThrow;
ref$ = main = require('../index'), ok = ref$.ok, zipAll = ref$.zipAll, bind = ref$.bind, bindLate = ref$.bindLate, bindTry = ref$.bindTry, cascade = ref$.cascade, flipC = ref$.flipC, sprintf1 = ref$.sprintf1, sprintfN = ref$.sprintfN, given = ref$.given, laat = ref$.laat, lets = ref$.lets, laats = ref$.laats, nieuw = ref$.nieuw, nieuw1 = ref$.nieuw1, nieuw2 = ref$.nieuw2, nieuw3 = ref$.nieuw3, nieuwN = ref$.nieuwN, xRegExp = ref$.xRegExp, xRegExpStr = ref$.xRegExpStr, xMatch = ref$.xMatch, xMatchStr = ref$.xMatchStr, xMatchStrFlags = ref$.xMatchStrFlags, xReplace = ref$.xReplace, xReplaceStr = ref$.xReplaceStr, xReplaceStrFlags = ref$.xReplaceStrFlags, ifReplace = ref$.ifReplace, ifXReplace = ref$.ifXReplace, ifXReplaceStr = ref$.ifXReplaceStr, ifXReplaceStrFlags = ref$.ifXReplaceStrFlags;
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
  var obj;
  obj = {
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
      return join('!', args);
    }
  };
  each(function(arg$){
    var bindFunc, bindFuncName;
    bindFunc = arg$[0], bindFuncName = arg$[1];
    return describe(bindFuncName, function(){
      test('binds', function(){
        var badSpeak, goodSpeak;
        badSpeak = obj.speak;
        expectToThrow(
        badSpeak);
        goodSpeak = bindFunc(obj, 'speak');
        return expect(goodSpeak()).toEqual('my name is dog');
      });
      test('passes args', function(){
        var garble;
        garble = bindFunc(obj, 'garble');
        return expectToEqual('a!1!c')(
        garble('a', 1, 'c'));
      });
      return test('curried', function(){
        return expectToEqual('my name is dog')(
        function(x){
          return x();
        }(
        bindFunc(obj)(
        'speak')));
      });
    });
  })(
  zip([bind, bindLate, bindTry], ['bind', 'bindLate', 'bindTry']));
  describe('bind hard', function(){
    return test('fails on undefined function', function(){
      return expect(function(){
        return obj.squeak();
      }).toThrow(TypeError);
    });
  });
  describe('bind late', function(){
    return test('1', function(){
      var obj2, bound;
      obj2 = {};
      bound = bindLate(obj2)(
      'speak');
      expect(function(){
        return bound();
      }).toThrow(TypeError);
      obj2.speak = function(){
        return 'spoke';
      };
      return expect(bound()).toEqual('spoke');
    });
  });
  describe('bind try', function(){
    return test('returns undefined on bad bind', function(){
      return expectToEqual(void 8)(
      bindTry(obj, 'squeqk'));
    });
  });
  return describe('forms', function(){
    return xtest('1', function(){
      return ifOk(
      bindTry(obj, 'speak'));
    });
  });
});
describe('flipC', function(){
  var fn;
  fn = flipC;
  describe('target created with "haskell" curry notation', function(){
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
    divideFlipped = flipC(divide);
    divideAndAddThreeArgsFlipped = flipC(divideAndAddThreeArgs);
    divideAndAddFourArgsFlipped = flipC(divideAndAddFourArgs);
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
      return test('result is curried part deux', function(){
        return expect(divideAndAddFourArgsFlipped(10, 5, 1)(2)).toEqual(3.5);
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
    divideFlipped = flipC(divide);
    divideAndAddThreeArgsFlipped = flipC(divideAndAddThreeArgs);
    divideAndAddFourArgsFlipped = flipC(divideAndAddFourArgs);
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
      return test('result is curried part deux', function(){
        return expect(divideAndAddFourArgsFlipped(10, 5, 1)(2)).toEqual(3.5);
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
    divideFlipped = flipC(divide);
    divideAndAddThreeArgsFlipped = flipC(divideAndAddThreeArgs);
    divideAndAddFourArgsFlipped = flipC(divideAndAddFourArgs);
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
      return test('result is curried part deux', function(){
        return expect(divideAndAddFourArgsFlipped(10, 5, 1)(2)).toEqual(3.5);
      });
    });
  });
});
describe('laat', function(){
  test('alias given', function(){
    return expect(given).toBe(laat);
  });
  return test(1, function(){
    return laat([10, 12, 19], function(ten, twelve, nineteen){
      return expect(ten + twelve + nineteen).toEqual(41);
    });
  });
});
describe('laatStar', function(){
  test('superset of laat', function(){
    return laats(function(){
      return 10;
    }, function(){
      return 12;
    }, function(){
      return 19;
    }, function(ten, twelve, nineteen){
      return expect(ten + twelve + nineteen).toEqual(41);
    });
  });
  return;
  test('recursive references', function(){
    return laats([
      10, function(ten){
        return ten + 2;
      }, function(ten, twelve){
        return twelve + 7;
      }, function(ten, twelve, nineteen){
        return 2;
      }
    ], function(ten, twelve, nineteen, two){
      return expectToEqual(43)(
      ten + twelve + nineteen + two);
    });
  });
  test('recursive references, second arg optional', function(){
    return laats([
      10, function(ten){
        return ten + 2;
      }, function(ten, twelve){
        return twelve + 7;
      }, function(ten, twelve, nineteen){
        return 2;
      }, function(ten, twelve, nineteen, two){
        return expectToEqual(43)(
        ten + twelve + nineteen + two);
      }
    ]);
  });
  test('single function', function(){
    return laats([function(){
      return 11;
    }], function(eleven){
      return expect(eleven).toEqual(11);
    });
  });
  test('mixed references', function(){
    return laats([
      10, function(ten){
        return ten + 2;
      }, 19, function(ten, twelve, nineteen){
        return 2;
      }, 5
    ], function(ten, twelve, nineteen, two, five){
      return expectToEqual(48)(
      ten + twelve + nineteen + two + five);
    });
  });
  return test('fibonacci', function(){
    var fibonacci;
    fibonacci = function(n){
      var sumLastTwo, entry, refs;
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
      return laats(refs, list);
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
      return join(' ', ['hulu'].concat(slice$.call(this.nums)));
    };
    return C;
  }());
  test('nieuw', function(){
    var this$ = this;
    return expectToEqual('hulu')(
    function(it){
      return it.speak();
    }(
    nieuw(
    C)));
  });
  test('nieuw1', function(){
    var this$ = this;
    return expectToEqual('hulu 10')(
    function(it){
      return it.speak();
    }(
    nieuw1(C)(
    10)));
  });
  test('nieuw2', function(){
    var this$ = this;
    return expectToEqual('hulu 20 30')(
    function(it){
      return it.speak();
    }(
    nieuw2(C)(20, 30)));
  });
  test('nieuw3', function(){
    var this$ = this;
    return expectToEqual('hulu 2 4 6')(
    function(it){
      return it.speak();
    }(
    nieuw3(C)(2, 4, 6)));
  });
  return test('nieuwN', function(){
    var this$ = this;
    return expectToEqual('hulu 4 8 9')(
    function(it){
      return it.speak();
    }(
    nieuwN(C)(
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
  test('match', function(){
    return expectToEqual('ors')(
    function(m){
      return m[1];
    }(
    main.match(new RegExp('(o.s)'))(
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