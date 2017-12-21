var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, test, xtest, expectToEqual, expectToBe, zipAll, dot, dot1, dot2, dot3, dotN, dotMut, dot1Mut, dot2Mut, dot3Mut, dotNMut, tapDot, tapDot1, tapDot2, tapDot3, tapDotN, tapMut, tapDotMut, tapDot1Mut, tapDot2Mut, tapDot3Mut, tapDotNMut;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
ref$ = require('../index'), zipAll = ref$.zipAll, dot = ref$.dot, dot1 = ref$.dot1, dot2 = ref$.dot2, dot3 = ref$.dot3, dotN = ref$.dotN, dotMut = ref$.dotMut, dot1Mut = ref$.dot1Mut, dot2Mut = ref$.dot2Mut, dot3Mut = ref$.dot3Mut, dotNMut = ref$.dotNMut, tapDot = ref$.tapDot, tapDot1 = ref$.tapDot1, tapDot2 = ref$.tapDot2, tapDot3 = ref$.tapDot3, tapDotN = ref$.tapDotN, tapMut = ref$.tapMut, tapDotMut = ref$.tapDotMut, tapDot1Mut = ref$.tapDot1Mut, tapDot2Mut = ref$.tapDot2Mut, tapDot3Mut = ref$.tapDot3Mut, tapDotNMut = ref$.tapDotNMut;
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
  describe('aliases', function(){
    var normal, mut, names;
    normal = [dot, dot1, dot2, dot3, dotN];
    mut = [dotMut, dot1Mut, dot2Mut, dot3Mut, dotNMut];
    names = ['dot-mut', 'dot1-mut', 'dot2-mut', 'dot3-mut', 'dot-n-mut'];
    return each(function(arg$){
      var aliasL, aliasR, name;
      aliasL = arg$[0], aliasR = arg$[1], name = arg$[2];
      return test(name, function(){
        return expect(aliasL).toBe(aliasR);
      });
    })(
    zipAll(normal, mut, names));
  });
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
      dotMut('shift')(
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
  describe('aliases', function(){
    var normal, mut, names;
    normal = [tap, tapDot, tapDot1, tapDot2, tapDot3, tapDotN];
    mut = [tapMut, tapDotMut, tapDot1Mut, tapDot2Mut, tapDot3Mut, tapDotNMut];
    names = ['tap-mut', 'tap-dot-mut', 'tap-dot1-mut', 'tap-dot2-mut', 'tap-dot3-mut', 'tap-dot-n-mut'];
    return each(function(arg$){
      var aliasL, aliasR, name;
      aliasL = arg$[0], aliasR = arg$[1], name = arg$[2];
      return test(name, function(){
        return expect(aliasL).toBe(aliasR);
      });
    })(
    zipAll(normal, mut, names));
  });
  describe('tapMut', function(){
    return test('array', function(){
      return expectToEqual([1, 2, 3, 4, 5])(
      tapMut(function(x){
        return x.unshift(1);
      })(
      tapMut(function(x){
        return x.push(5);
      })(
      [2, 3, 4])));
    });
  });
  describe('tapDot', function(){
    test('array 1', function(){
      return expectToEqual([2, 3, 4])(
      tapDotMut('shift')(
      [1, 2, 3, 4]));
    });
    test('array 2', function(){
      return expectToEqual([4, 3, 2, 1])(
      tapDotMut('reverse')(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToEqual('tac')(
      dot('get-name')(
      tapDotMut('reverse-name-mut')(
      tapDot('bark-io')(
      obj))));
      return expectToEqual(1)(
      log.mock.calls.length);
    });
  });
  describe('tapDot1', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      tapDot1('concat', 5)(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToBe(obj)(
      tapDot1('speak-io', 'hello')(
      obj));
      return expectToEqual([['hello']])(
      log.mock.calls);
    });
  });
  describe('tapDot2', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      tapDot2('concat', 5, 6)(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToBe(obj)(
      tapDot2('garble', 'hello', 'goodbye')(
      obj));
      return expectToEqual([['hello!goodbye']])(
      log.mock.calls);
    });
  });
  describe('tapDot3', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      tapDot3('concat', 5, 6, 7)(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToBe(obj)(
      tapDot3('garble', 'hello', 'goodbye', 'hello')(
      obj));
      return expectToEqual([['hello!goodbye!hello']])(
      log.mock.calls);
    });
  });
  describe('tapDotN', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      tapDotN('concat', [1, 2, 3])(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToBe(obj)(
      tapDotN('garble', ['hello', 'goodbye', 'hello'])(
      obj));
      return expectToEqual([['hello!goodbye!hello']])(
      log.mock.calls);
    });
  });
  describe('tapDot combine', function(){
    return test('array', function(){
      return expectToEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])(
      tapDot1Mut('unshift', 1)(
      tapDotNMut('push', [11, 12])(
      tapDot3Mut('push', 8, 9, 10)(
      tapDot2Mut('push', 6, 7)(
      tapDot1Mut('push', 5)(
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