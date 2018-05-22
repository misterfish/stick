var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, list, test, xtest, expectToEqual, expectToBe, zipAll, invoke, applyTo1, applyTo2, applyTo3, applyTo4, applyTo5, applyToN, passTo, passToN, call, call1, call2, call3, callN, callOn, callOn1, callOn2, callOn3, callOn4, callOn5, callOnN, provideTo, provideTo1, provideTo2, provideTo3, provideTo4, provideTo5, provideToN, sumAll;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), list = ref$.list, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
ref$ = require('../index'), zipAll = ref$.zipAll, invoke = ref$.invoke, applyTo1 = ref$.applyTo1, applyTo2 = ref$.applyTo2, applyTo3 = ref$.applyTo3, applyTo4 = ref$.applyTo4, applyTo5 = ref$.applyTo5, applyToN = ref$.applyToN, passTo = ref$.passTo, passToN = ref$.passToN, call = ref$.call, call1 = ref$.call1, call2 = ref$.call2, call3 = ref$.call3, callN = ref$.callN, callOn = ref$.callOn, callOn1 = ref$.callOn1, callOn2 = ref$.callOn2, callOn3 = ref$.callOn3, callOn4 = ref$.callOn4, callOn5 = ref$.callOn5, callOnN = ref$.callOnN, provideTo = ref$.provideTo, provideTo1 = ref$.provideTo1, provideTo2 = ref$.provideTo2, provideTo3 = ref$.provideTo3, provideTo4 = ref$.provideTo4, provideTo5 = ref$.provideTo5, provideToN = ref$.provideToN;
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
  describe('applyTo4', function(){
    return test(1, function(){
      return expectToEqual(54)(
      applyTo4(12, 13, 14, 15)(
      sumAll));
    });
  });
  describe('applyTo5', function(){
    return test(1, function(){
      return expectToEqual(70)(
      applyTo5(12, 13, 14, 15, 16)(
      sumAll));
    });
  });
  return describe('applyToN', function(){
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
});
describe('passTo*', function(){
  var func;
  func = function(){
    return 'horse';
  };
  describe('passTo', function(){
    test(1, function(){
      return expectToEqual(12)(
      passTo(sumAll)(
      12));
    });
    test(2, function(){
      var this$ = this;
      return expectToEqual(16)(
      passTo((function(it){
        return it + 4;
      }))(
      12));
    });
    return test('discards extra args 1', function(){
      return expectToEqual('horse')(
      passTo(func)(
      'abc'));
    });
  });
  return describe('passToN', function(){
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
});
describe('call*', function(){
  var obj1, obj2;
  obj1 = {
    name: 'dog'
  };
  obj2 = {
    speak: function(){
      return 'my name is ' + this.name;
    },
    speak1: function(word){
      return ("my " + word + " is ") + this.name;
    },
    speakAll: compose$(list, join(':'))
  };
  describe('callOn', function(){
    test('array', function(){
      return expectToEqual([3, 2, 1])(
      callOn([1, 2, 3])(
      [].reverse));
    });
    return test('user-obj', function(){
      return expectToEqual('my name is dog')(
      callOn(obj1)(
      obj2.speak));
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
      callOn1(obj1, 'friend')(
      obj2.speak1));
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
      callOn2(obj1, 'friend', 'send')(
      obj2.speak1));
    });
    return test('user-obj', function(){
      return expectToEqual('friend:send')(
      callOn2(obj1, 'friend', 'send')(
      obj2.speakAll));
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
      callOn3(obj1, 'friend', 'send', 'end')(
      obj2.speakAll));
    });
  });
  describe('callOn4', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4, 5, 6, 7])(
      callOn4([1, 2, 3], 4, 5, 6, 7)(
      [].concat));
    });
    return test('user-obj', function(){
      return expectToEqual('friend:send:end:lend')(
      callOn4(obj1, 'friend', 'send', 'end', 'lend')(
      obj2.speakAll));
    });
  });
  describe('callOn5', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4, 5, 6, 7, 8])(
      callOn5([1, 2, 3], 4, 5, 6, 7, 8)(
      [].concat));
    });
    return test('user-obj', function(){
      return expectToEqual('friend:send:end:lend:trend')(
      callOn5(obj1, 'friend', 'send', 'end', 'lend', 'trend')(
      obj2.speakAll));
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
      callOnN(obj1, ['friend', 'lend'])(
      obj2.speakAll));
    });
  });
  describe('provideTo', function(){
    test('array', function(){
      return expectToEqual([3, 2, 1])(
      provideTo([].reverse)(
      [1, 2, 3]));
    });
    test('bound function alias', function(){
      var trim;
      trim = provideTo(''.trim);
      return expectToEqual('dog')(
      trim(' dog '));
    });
    return test('user-obj', function(){
      return expectToEqual('my name is dog')(
      provideTo(obj2.speak)(
      obj1));
    });
  });
  describe('provideTo1', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      provideTo1([].concat, 4)(
      [1, 2, 3]));
    });
    return test('user-obj', function(){
      return expectToEqual('my friend is dog')(
      provideTo1(obj2.speak1, 'friend')(
      obj1));
    });
  });
  describe('provideTo2', function(){
    test('bound function alias', function(){
      var replaceDl;
      replaceDl = provideTo2(''.replace, 'd', 'l');
      return expectToEqual('log')(
      replaceDl('dog'));
    });
    test('array', function(){
      return expectToEqual([1, 2, 3, 4, 5])(
      provideTo2([].concat, 4, 5)(
      [1, 2, 3]));
    });
    return test('user-obj', function(){
      return expectToEqual('friend:send')(
      provideTo2(obj2.speakAll, 'friend', 'send')(
      obj1));
    });
  });
  describe('provideTo3', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4, 5, 6])(
      provideTo3([].concat, 4, 5, 6)(
      [1, 2, 3]));
    });
    return test('user-obj', function(){
      return expectToEqual('friend:send:end')(
      provideTo3(obj2.speakAll, 'friend', 'send', 'end')(
      obj1));
    });
  });
  describe('provideTo4', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4, 5, 6, 7])(
      provideTo4([].concat, 4, 5, 6, 7)(
      [1, 2, 3]));
    });
    return test('user-obj', function(){
      return expectToEqual('friend:send:end:lend')(
      provideTo4(obj2.speakAll, 'friend', 'send', 'end', 'lend')(
      obj1));
    });
  });
  describe('provideTo5', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4, 5, 6, 7, 8])(
      provideTo5([].concat, 4, 5, 6, 7, 8)(
      [1, 2, 3]));
    });
    return test('user-obj', function(){
      return expectToEqual('friend:send:end:lend:trend')(
      provideTo5(obj2.speakAll, 'friend', 'send', 'end', 'lend', 'trend')(
      obj1));
    });
  });
  return describe('provideToN', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])(
      provideToN([].concat, [4, 5, 6, 7, 8, 9])(
      [1, 2, 3]));
    });
    return test('user-obj', function(){
      return expectToEqual('friend:send:end:lend')(
      provideToN(obj2.speakAll, ['friend', 'send', 'end', 'lend'])(
      obj1));
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