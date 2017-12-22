var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, list, test, xtest, expectToEqual, expectToBe, zipAll, invoke, applyTo1, applyTo2, applyTo3, applyToN, passTo1, passTo2, passTo3, passToN, apply1, apply2, apply3, applyN, pass1, pass2, pass3, passN, call, call1, call2, call3, callN, callOn, callOn1, callOn2, callOn3, callOnN, callUnder, callUnder1, callUnder2, sumAll;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), list = ref$.list, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
ref$ = require('../index'), zipAll = ref$.zipAll, invoke = ref$.invoke, applyTo1 = ref$.applyTo1, applyTo2 = ref$.applyTo2, applyTo3 = ref$.applyTo3, applyToN = ref$.applyToN, passTo1 = ref$.passTo1, passTo2 = ref$.passTo2, passTo3 = ref$.passTo3, passToN = ref$.passToN, apply1 = ref$.apply1, apply2 = ref$.apply2, apply3 = ref$.apply3, applyN = ref$.applyN, pass1 = ref$.pass1, pass2 = ref$.pass2, pass3 = ref$.pass3, passN = ref$.passN, call = ref$.call, call1 = ref$.call1, call2 = ref$.call2, call3 = ref$.call3, callN = ref$.callN, callOn = ref$.callOn, callOn1 = ref$.callOn1, callOn2 = ref$.callOn2, callOn3 = ref$.callOn3, callOnN = ref$.callOnN, callUnder = ref$.callUnder, callUnder1 = ref$.callUnder1, callUnder2 = ref$.callUnder2;
sumAll = function(){
  var args, res$, i$, to$;
  res$ = [];
  for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
    res$.push(arguments[i$]);
  }
  args = res$;
  return reduce(function(a, b){
    return a + b;
  }, 0)(
  args);
};
describe('invoke', function(){
  var func;
  func = function(){
    return 'horse';
  };
  test(1, function(){
    return expectToEqual('horse')(
    invoke(
    func));
  });
  test(2, function(){
    return expectToEqual(0)(
    invoke(
    sumAll));
  });
  return test('iffy', function(){
    return expectToEqual(42)(
    invoke(function(){
      var this$ = this;
      return (function(it){
        return it + 1;
      });
    })(41));
  });
});
describe('pass*', function(){
  var func;
  func = function(){
    return 'horse';
  };
  describe('applyTo1', function(){
    test(1, function(){
      return expectToEqual(12)(
      applyTo1(12)(
      sumAll));
    });
    test(2, function(){
      var this$ = this;
      return expectToEqual(16)(
      applyTo1(12)(
      (function(it){
        return it + 4;
      })));
    });
    return test('discards extra args 1', function(){
      return expectToEqual('horse')(
      applyTo1('abc')(
      func));
    });
  });
  describe('applyTo2', function(){
    test(1, function(){
      return expectToEqual(25)(
      applyTo2(12, 13)(
      sumAll));
    });
    return test(2, function(){
      return expectToEqual(50)(
      applyTo2(20, 30)(
      curry$(function(x$, y$){
        return x$ + y$;
      })));
    });
  });
  describe('applyTo3', function(){
    test(1, function(){
      return expectToEqual(39)(
      applyTo3(12, 13, 14)(
      sumAll));
    });
    return test('discards', function(){
      return expectToEqual(50)(
      applyTo3(20, 30, 40)(
      curry$(function(x$, y$){
        return x$ + y$;
      })));
    });
  });
  describe('applyToN', function(){
    test(1, function(){
      return expectToEqual(54)(
      applyToN([12, 13, 14, 15])(
      sumAll));
    });
    return test(2, function(){
      return expectToEqual(50)(
      applyToN([20, 30])(
      curry$(function(x$, y$){
        return x$ + y$;
      })));
    });
  });
  return describe('aliases', function(){
    test(1, function(){
      return expectToEqual(applyTo1)(
      apply1);
    });
    test(2, function(){
      return expectToEqual(applyTo2)(
      apply2);
    });
    test(3, function(){
      return expectToEqual(applyTo3)(
      apply3);
    });
    return test('n', function(){
      return expectToEqual(applyToN)(
      applyN);
    });
  });
});
describe('passTo*', function(){
  var func;
  func = function(){
    return 'horse';
  };
  describe('passTo1', function(){
    test(1, function(){
      return expectToEqual(12)(
      passTo1(sumAll)(
      12));
    });
    test(2, function(){
      var this$ = this;
      return expectToEqual(16)(
      passTo1((function(it){
        return it + 4;
      }))(
      12));
    });
    return test('discards extra args 1', function(){
      return expectToEqual('horse')(
      passTo1(func)(
      'abc'));
    });
  });
  describe('passTo2', function(){
    test(1, function(){
      return expectToEqual(25)(
      passTo2(sumAll)(12, 13));
    });
    return test(2, function(){
      return expectToEqual(50)(
      passTo2(curry$(function(x$, y$){
        return x$ + y$;
      }))(20, 30));
    });
  });
  describe('passTo3', function(){
    test(1, function(){
      return expectToEqual(39)(
      passTo3(sumAll)(12, 13, 14));
    });
    return test('discards', function(){
      return expectToEqual(50)(
      passTo3(curry$(function(x$, y$){
        return x$ + y$;
      }))(20, 30, 40));
    });
  });
  describe('passToN', function(){
    test(1, function(){
      return expectToEqual(54)(
      passToN(sumAll)(
      [12, 13, 14, 15]));
    });
    return test(2, function(){
      return expectToEqual(50)(
      passToN(curry$(function(x$, y$){
        return x$ + y$;
      }))(
      [20, 30]));
    });
  });
  return describe('aliases', function(){
    test(1, function(){
      return expectToEqual(passTo1)(
      pass1);
    });
    test(2, function(){
      return expectToEqual(passTo2)(
      pass2);
    });
    test(3, function(){
      return expectToEqual(passTo3)(
      pass3);
    });
    return test('n', function(){
      return expectToEqual(passToN)(
      passN);
    });
  });
});
describe('call*', function(){
  var obj;
  obj = {
    name: 'dog',
    speak: function(){
      return 'my name is ' + this.name;
    },
    speak1: function(word){
      return ("my " + word + " is ") + this.name;
    },
    speakAll: compose$(list, join(':'))
  };
  describe('aliases', function(){
    var normal, alias, names;
    normal = [callOn, callOn1, callOn2, callOn3, callOnN];
    alias = [call, call1, call2, call3, callN];
    names = ['call', 'call1', 'call2', 'call3', 'call-n'];
    return each(function(arg$){
      var aliasL, aliasR, name;
      aliasL = arg$[0], aliasR = arg$[1], name = arg$[2];
      return test(name, function(){
        return expect(aliasL).toBe(aliasR);
      });
    })(
    zipAll(normal, alias, names));
  });
  describe('callOn', function(){
    test('array', function(){
      return expectToEqual([3, 2, 1])(
      callOn([1, 2, 3])(
      [].reverse));
    });
    return test('user-obj', function(){
      return expectToEqual('my name is dog')(
      callOn(obj)(
      obj.speak));
    });
  });
  describe('callOn1', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      callOn1([1, 2, 3], 4)(
      [].concat));
    });
    return test('user-obj', function(){
      return expectToEqual('my friend is dog')(
      callOn1(obj, 'friend')(
      obj.speak1));
    });
  });
  describe('callOn2', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4, 5])(
      callOn2([1, 2, 3], 4, 5)(
      [].concat));
    });
    test('user-obj, caps (discards) second arg', function(){
      return expectToEqual('my friend is dog')(
      callOn2(obj, 'friend', 'send')(
      obj.speak1));
    });
    return test('user-obj', function(){
      return expectToEqual('friend:send')(
      callOn2(obj, 'friend', 'send')(
      obj.speakAll));
    });
  });
  describe('callOn3', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4, 5, 6])(
      callOn3([1, 2, 3], 4, 5, 6)(
      [].concat));
    });
    return test('user-obj', function(){
      return expectToEqual('friend:send:end')(
      callOn3(obj, 'friend', 'send', 'end')(
      obj.speakAll));
    });
  });
  describe('callOnN', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4, 5, 6])(
      callOnN([1, 2, 3], [4, 5, 6])(
      [].concat));
    });
    return test('user-obj', function(){
      return expectToEqual('friend:lend')(
      callOnN(obj, ['friend', 'lend'])(
      obj.speakAll));
    });
  });
  describe('callUnder', function(){
    test('array', function(){
      return expectToEqual([3, 2, 1])(
      callUnder([].reverse)(
      [1, 2, 3]));
    });
    test('bound function alias', function(){
      var trim;
      trim = callUnder(''.trim);
      return expectToEqual('dog')(
      trim(' dog '));
    });
    return test('user-obj', function(){
      return expectToEqual('my name is dog')(
      callUnder(obj.speak)(
      obj));
    });
  });
  describe('callUnder1', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      callUnder1([].concat, 4)(
      [1, 2, 3]));
    });
    return test('user-obj', function(){
      return expectToEqual('my friend is dog')(
      callUnder1(obj.speak1, 'friend')(
      obj));
    });
  });
  return describe('callUnder2', function(){
    return test('bound function alias', function(){
      var replaceDl;
      replaceDl = callUnder2(''.replace, 'd', 'l');
      return expectToEqual('log')(
      replaceDl('dog'));
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