var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, flip, zip, test, xtest, expectToEqual, expectToBe, dot, dot1, dot2, dot3, dot4, dot5, dotN, side, side1, side2, side3, side4, side5, sideN;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
ref$ = require('../index'), dot = ref$.dot, dot1 = ref$.dot1, dot2 = ref$.dot2, dot3 = ref$.dot3, dot4 = ref$.dot4, dot5 = ref$.dot5, dotN = ref$.dotN, side = ref$.side, side1 = ref$.side1, side2 = ref$.side2, side3 = ref$.side3, side4 = ref$.side4, side5 = ref$.side5, sideN = ref$.sideN;
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
    paint: function(color, force, why){
      return "painting " + color + " " + force + " " + why;
    },
    pant: function(up, down, left, right){
      return "panting " + up + "/" + down + "," + left + "+" + right;
    },
    rant: function(up, down, left, right, around){
      return "ranting " + up + "/" + down + "," + left + "+" + right + "--" + around;
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
    var paint;
    paint = dot3('paint');
    test('string', function(){
      return expectToEqual('doggies')(
      dot3('concat', 'g', 'ie', 's')(
      'dog'));
    });
    return test('user-obj', function(){
      return expectToEqual('painting red hard because')(
      paint('red', 'hard', 'because')(
      obj));
    });
  });
  describe('dot4', function(){
    var pant;
    pant = dot4('pant');
    test('string', function(){
      return expectToEqual('doggies')(
      dot4('concat', 'g', 'i', 'e', 's')(
      'dog'));
    });
    return test('user-obj', function(){
      return expectToEqual('panting hier/daar,nergens+ergens')(
      pant('hier', 'daar', 'nergens', 'ergens')(
      obj));
    });
  });
  describe('dot5', function(){
    var rant;
    rant = dot5('rant');
    test('string', function(){
      return expectToEqual('doggies')(
      dot5('concat', 'g', 'g', 'i', 'e', 's')(
      'do'));
    });
    return test('user-obj', function(){
      return expectToEqual('ranting hier/daar,nergens+ergens--overal')(
      rant('hier', 'daar', 'nergens', 'ergens', 'overal')(
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
describe('side*', function(){
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
        return log("jumping " + howHigh + " " + where);
      },
      paint: function(color, force, why){
        return log("painting " + color + " " + force + " " + why);
      },
      pant: function(up, down, left, right){
        return log("panting " + up + "/" + down + "," + left + "+" + right);
      },
      rant: function(up, down, left, right, around){
        return log("ranting " + up + "/" + down + "," + left + "+" + right + "--" + around);
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
  describe('side1', function(){
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
  describe('side2', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      side2('concat', 5, 6)(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToBe(obj)(
      side2('jump', 'up', '4m')(
      obj));
      return expectToEqual([['jumping 4m up']])(
      log.mock.calls);
    });
  });
  describe('side3', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      side3('concat', 5, 6, 7)(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToBe(obj)(
      side3('paint', 'hello', 'goodbye', 'hello')(
      obj));
      return expectToEqual([['painting hello goodbye hello']])(
      log.mock.calls);
    });
  });
  describe('side4', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      side4('concat', 5, 6, 7, 8)(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToBe(obj)(
      side4('pant', 'hier', 'daar', 'nergens', 'ergens')(
      obj));
      return expectToEqual([['panting hier/daar,nergens+ergens']])(
      log.mock.calls);
    });
  });
  describe('side5', function(){
    test('array', function(){
      return expectToEqual([1, 2, 3, 4])(
      side5('concat', 5, 6, 7, 8, 9)(
      [1, 2, 3, 4]));
    });
    return test('user-obj', function(){
      expectToBe(obj)(
      side5('rant', 'hier', 'daar', 'nergens', 'ergens', 'overal')(
      obj));
      return expectToEqual([['ranting hier/daar,nergens+ergens--overal']])(
      log.mock.calls);
    });
  });
  describe('sideN', function(){
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
  return describe('side combine', function(){
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
});