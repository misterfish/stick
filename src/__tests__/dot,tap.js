var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, test, xtest, expectToEqual, expectToBe, zipAll, dot, dot1, dot2, dot3, dotN, side, side1, side2, side3, sideN;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
ref$ = require('../index'), zipAll = ref$.zipAll, dot = ref$.dot, dot1 = ref$.dot1, dot2 = ref$.dot2, dot3 = ref$.dot3, dotN = ref$.dotN, side = ref$.side, side1 = ref$.side1, side2 = ref$.side2, side3 = ref$.side3, sideN = ref$.sideN;
describe('dot*', function(){
  var obj;
  obj = {
    name: 'dog',
    bark: function(){
      return 'rough';
    },
    speak: function(word){
      return ("my " + word + " is ") + this.name;
    },
    jump: function(where, howHigh){
      return "jumping " + howHigh + " " + where;
    },
    garble: function(){
      var all, res$, i$, to$;
      res$ = [];
      for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      all = res$;
      return join('!')(
      all);
    }
  };
  describe('dot', function(){
    var trim, bark;
    trim = dot('trim');
    bark = dot('bark');
    test('string', function(){
      return expectToEqual('dog')(
      trim(
      ' dog '));
    });
    test('user obj', function(){
      return expectToEqual('rough')(
      bark(
      obj));
    });
    return test('array', function(){
      return expectToEqual(1)(
      dot('shift')(
      [1, 2, 3, 4]));
    });
  });
  describe('dot1', function(){
    var speak;
    speak = dot1('speak');
    test('string', function(){
      return expectToEqual('dogs')(
      dot1('concat', 's')(
      'dog'));
    });
    return test('user-obj', function(){
      return expectToEqual('my name is dog')(
      speak('name')(
      obj));
    });
  });
  describe('dot2', function(){
    var jump;
    jump = dot2('jump');
    test('string', function(){
      return expectToEqual('doggies')(
      dot2('concat', 'gie', 's')(
      'dog'));
    });
    return test('user-obj', function(){
      return expectToEqual('jumping 3m up')(
      jump('up', '3m')(
      obj));
    });
  });
  describe('dot3', function(){
    var garble;
    garble = dot3('garble');
    test('string', function(){
      return expectToEqual('doggies')(
      dot3('concat', 'g', 'ie', 's')(
      'dog'));
    });
    return test('user-obj', function(){
      return expectToEqual('a!b!c')(
      garble('a', 'b', 'c')(
      obj));
    });
  });
  describe('dotN', function(){
    var garble;
    garble = dotN('garble');
    test('string', function(){
      return expectToEqual('doggies')(
      dotN('concat', ['g', 'ie', 's'])(
      'dog'));
    });
    return test('user-obj', function(){
      return expectToEqual('a!b!c!d')(
      garble(['a', 'b', 'c', 'd'])(
      obj));
    });
  });
  return describe('dots combine', function(){
    return test(1, function(){
      return expectToEqual('loggies')(
      dotN('replace', [
        'o', function(){
          return 'lo';
        }
      ])(
      dot3('concat', 'g', 'i', 'es')(
      dot2('slice', 1, 3)(
      dot1('concat', 'g')(
      dot('trim')(
      ' dog '))))));
    });
  });
});
describe('tapMut, tapDot*', function(){
  var log, obj;
  beforeEach(function(){
    log = jest.fn();
    return obj = {
      name: 'cat',
      'get-name': function(){
        return this.name;
      },
      'reverse-name-mut': function(){
        return this.name = reverse(this.name);
      },
      'bark-io': function(){
        return log('rough');
      },
      'speak-io': function(word){
        return log(word);
      },
      jump: function(where, howHigh){
        return "jumping " + howHigh + " " + where;
      },
      garble: function(){
        var all, res$, i$, to$;
        res$ = [];
        for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
          res$.push(arguments[i$]);
        }
        all = res$;
        return log(join('!', all));
      }
    };
  });
  describe('side', function(){
    test('array 1', function(){
      return expectToEqual([2, 3, 4])(
      side('shift')(
      [1, 2, 3, 4]));
    });
    test('array 2', function(){
      return expectToEqual([4, 3, 2, 1])(
      side('reverse')(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToEqual('tac')(
      dot('get-name')(
      side('reverse-name-mut')(
      side('bark-io')(
      obj))));
      return expectToEqual(1)(
      log.mock.calls.length);
    });
  });
  describe('tapDot1', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      side1('concat', 5)(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToBe(obj)(
      side1('speak-io', 'hello')(
      obj));
      return expectToEqual([['hello']])(
      log.mock.calls);
    });
  });
  describe('tapDot2', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      side2('concat', 5, 6)(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToBe(obj)(
      side2('garble', 'hello', 'goodbye')(
      obj));
      return expectToEqual([['hello!goodbye']])(
      log.mock.calls);
    });
  });
  describe('tapDot3', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      side3('concat', 5, 6, 7)(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToBe(obj)(
      side3('garble', 'hello', 'goodbye', 'hello')(
      obj));
      return expectToEqual([['hello!goodbye!hello']])(
      log.mock.calls);
    });
  });
  describe('tapDotN', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      sideN('concat', [1, 2, 3])(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToBe(obj)(
      sideN('garble', ['hello', 'goodbye', 'hello'])(
      obj));
      return expectToEqual([['hello!goodbye!hello']])(
      log.mock.calls);
    });
  });
  describe('tapDot combine', function(){
    return test('array', function(){
      return expectToEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])(
      side1('unshift', 1)(
      sideN('push', [11, 12])(
      side3('push', 8, 9, 10)(
      side2('push', 6, 7)(
      side1('push', 5)(
      [2, 3, 4]))))));
    });
  });
  describe('tapDot', function(){
    test('array', function(){});
    return test('user-obj', function(){});
  });
  describe('tapDot', function(){
    test('array', function(){});
    return test('user-obj', function(){});
  });
  describe('tapDot', function(){
    test('array', function(){});
    return test('user-obj', function(){});
  });
  describe('tapDot', function(){
    test('array', function(){});
    return test('user-obj', function(){});
  });
  return describe('tapDot', function(){
    test('array', function(){});
    return test('user-obj', function(){});
  });
});