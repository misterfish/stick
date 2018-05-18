var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, zip, list, test, xtest, expectToEqual, expectToBe, defaultTo, defaultTo__, assocM, appendTo, appendToM, appendFrom, appendFromM, prependFrom, prependFromM, prependTo, prependToM, concatTo, concatToM, concatFrom, concatFromM, precatTo, precatFrom, mergeTo, mergeFrom, mergeToM, mergeFromM, mergeToWithM, mergeFromWithM, mergeToIn, mergeFromIn, mergeToInM, mergeFromInM, mergeAllIn, injectToM, injectFromM, discardPrototype, flattenPrototype, mapPairs, mapPairsIn, eachObjIn, applyScalar, passScalar;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('./common'), list = ref$.list, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
ref$ = require('../index'), defaultTo = ref$.defaultTo, defaultTo__ = ref$.defaultTo__, assocM = ref$.assocM, appendTo = ref$.appendTo, appendToM = ref$.appendToM, appendFrom = ref$.appendFrom, appendFromM = ref$.appendFromM, prependFrom = ref$.prependFrom, prependFromM = ref$.prependFromM, prependTo = ref$.prependTo, prependToM = ref$.prependToM, concatTo = ref$.concatTo, concatToM = ref$.concatToM, concatFrom = ref$.concatFrom, concatFromM = ref$.concatFromM, precatTo = ref$.precatTo, precatFrom = ref$.precatFrom, mergeTo = ref$.mergeTo, mergeFrom = ref$.mergeFrom, mergeToM = ref$.mergeToM, mergeFromM = ref$.mergeFromM, mergeToWithM = ref$.mergeToWithM, mergeFromWithM = ref$.mergeFromWithM, mergeToIn = ref$.mergeToIn, mergeFromIn = ref$.mergeFromIn, mergeToInM = ref$.mergeToInM, mergeFromInM = ref$.mergeFromInM, mergeAllIn = ref$.mergeAllIn, injectToM = ref$.injectToM, injectFromM = ref$.injectFromM, discardPrototype = ref$.discardPrototype, flattenPrototype = ref$.flattenPrototype, mapPairs = ref$.mapPairs, mapPairsIn = ref$.mapPairsIn, eachObjIn = ref$.eachObjIn, applyScalar = ref$.applyScalar, passScalar = ref$.passScalar;
describe('default to', function(){
  test(1, function(){
    return expectToEqual(false)(
    defaultTo(function(){
      return 42;
    })(
    false));
  });
  test(2, function(){
    return expectToEqual(42)(
    defaultTo(function(){
      return 42;
    })(
    null));
  });
  return test(3, function(){
    return expectToEqual(42)(
    defaultTo(function(){
      return 42;
    })(
    void 8));
  });
});
describe('default to __', function(){
  test(1, function(){
    return expectToEqual(false)(
    defaultTo__(false, function(){
      return 42;
    }));
  });
  test(2, function(){
    return expectToEqual(42)(
    defaultTo(function(){
      return 42;
    })(
    defaultTo__(null, function(){
      return 42;
    })));
  });
  return test(3, function(){
    return expectToEqual(42)(
    defaultTo(function(){
      return 42;
    })(
    defaultTo__(void 8, function(){
      return 42;
    })));
  });
});
describe('data transforms', function(){
  var run, testM;
  run = function(args){
    var fn, src, tgt, dir;
    fn = args.fn, src = args.src, tgt = args.tgt, dir = args.dir;
    if (dir === 'to') {
      return fn(tgt)(
      src);
    } else {
      return fn(src)(
      tgt);
    }
  };
  testM = function(args){
    var res, mut, tgt;
    res = args.res, mut = args.mut, tgt = args.tgt;
    if (mut) {
      return expect(res).toBe(tgt);
    } else {
      return expect(res).not.toBe(tgt);
    }
  };
  describe('assocM', function(){
    return test(1, function(){
      var orig, nieuw;
      orig = {
        a: 1,
        b: 2
      };
      nieuw = assocM('b', 3)(
      orig);
      expect(nieuw).toBe(orig);
      return expect(nieuw).toEqual({
        a: 1,
        b: 3
      });
    });
  });
  describe('appendTo', function(){
    var fn, dir, mut;
    fn = appendTo;
    dir = 'to';
    mut = false;
    test(1, function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = [4, 5, 6];
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([1, 2, 3, [4, 5, 6]]);
    });
    test(2, function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([1, 2, 3, 4]);
    });
    return test('eg', function(){
      var res;
      res = appendTo([4])(
      3);
      return expect(res).toEqual([4, 3]);
    });
  });
  describe('appendToM', function(){
    var fn, dir, mut;
    fn = appendToM;
    dir = 'to';
    mut = true;
    test('array to array', function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = [4, 5, 6];
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([1, 2, 3, [4, 5, 6]]);
    });
    test('elem to array', function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([1, 2, 3, 4]);
    });
    return test('eg', function(){
      var res;
      res = appendToM([4])(
      3);
      return expect(res).toEqual([4, 3]);
    });
  });
  describe('appendFrom', function(){
    var fn, dir, mut;
    fn = appendFrom;
    dir = 'from';
    mut = false;
    test(1, function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = [4, 5, 6];
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([1, 2, 3, [4, 5, 6]]);
    });
    test(2, function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([1, 2, 3, 4]);
    });
    return test('eg', function(){
      var res;
      res = appendFrom(4)(
      [3]);
      return expect(res).toEqual([3, 4]);
    });
  });
  describe('appendFromM', function(){
    var fn, dir, mut;
    fn = appendFromM;
    dir = 'from';
    mut = true;
    test('array -> array', function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = [4, 5, 6];
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([1, 2, 3, [4, 5, 6]]);
    });
    test('elem -> array', function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([1, 2, 3, 4]);
    });
    return test('eg', function(){
      var res;
      res = appendFromM(3)(
      [4]);
      return expect(res).toEqual([4, 3]);
    });
  });
  describe('prependTo', function(){
    var fn, dir, mut;
    fn = prependTo;
    dir = 'to';
    mut = false;
    test('array -> array', function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = [4, 5, 6];
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([[4, 5, 6], 1, 2, 3]);
    });
    test('number -> array', function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([4, 1, 2, 3]);
    });
    return test('eg', function(){
      var res;
      res = prependTo([4])(
      3);
      return expect(res).toEqual([3, 4]);
    });
  });
  describe('prependFrom', function(){
    var fn, dir, mut;
    fn = prependFrom;
    dir = 'from';
    mut = false;
    test('array -> array', function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = [4, 5, 6];
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([[4, 5, 6], 1, 2, 3]);
    });
    test('element -> array', function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([4, 1, 2, 3]);
    });
    return test('eg', function(){
      var res;
      res = prependFrom(3)(
      [4]);
      return expect(res).toEqual([3, 4]);
    });
  });
  describe('prependFromM', function(){
    var fn, dir, mut;
    fn = prependFromM;
    dir = 'from';
    mut = true;
    test('array to array', function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = [4, 5, 6];
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([[4, 5, 6], 1, 2, 3]);
    });
    test('elem to array', function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([4, 1, 2, 3]);
    });
    return test('eg', function(){
      var res;
      res = prependFromM(4)(
      [3]);
      return expect(res).toEqual([4, 3]);
    });
  });
  describe('prependToM', function(){
    var fn, dir, mut;
    fn = prependToM;
    dir = 'to';
    mut = true;
    test('array to array', function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = [4, 5, 6];
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([[4, 5, 6], 1, 2, 3]);
    });
    test('elem to array', function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([4, 1, 2, 3]);
    });
    return test('eg', function(){
      var res;
      res = prependToM([3])(
      4);
      return expect(res).toEqual([4, 3]);
    });
  });
  describe('concatTo', function(){
    var fn, dir, mut;
    fn = concatTo;
    dir = 'to';
    mut = false;
    test('array -> array', function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = [4, 5, 6];
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([1, 2, 3, 4, 5, 6]);
    });
    test('string -> string', function(){
      var tgt, src, res;
      tgt = "don't give me no ";
      src = 'jibber jabber';
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual(tgt + src);
    });
    return test('unequal types => dont throw, unlike ramda', function(){
      var tgt, src;
      tgt = [1, 2, 3];
      src = 4;
      return expect(function(){
        return concatTo(tgt)(
        src);
      }).not.toThrow();
    });
  });
  describe('concatToM', function(){
    var fn, dir, mut;
    fn = concatToM;
    dir = 'to';
    mut = true;
    test(1, function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = [4, 5, 6];
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([1, 2, 3, 4, 5, 6]);
    });
    return test('strings -> throw', function(){
      var tgt, src;
      tgt = "don't give me no ";
      src = 'jibber jabber';
      return expect(function(){
        return concatToM(tgt)(
        src);
      }).toThrow();
    });
  });
  describe('concatFrom', function(){
    var fn, dir, mut;
    fn = concatFrom;
    dir = 'from';
    mut = false;
    test('array -> array', function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = [4, 5, 6];
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([1, 2, 3, 4, 5, 6]);
    });
    test('elem -> array', function(){
      var tgt, src;
      tgt = [1, 2, 3];
      src = 4;
      return expect(function(){
        return concatFrom(tgt)(
        src);
      }).toThrow();
    });
    return test('alias', function(){
      expectToEqual(concatFrom)(
      precatTo);
      return expectToEqual(concatTo)(
      precatFrom);
    });
  });
  describe('concatFromM', function(){
    var fn, dir, mut;
    fn = concatFromM;
    dir = 'from';
    mut = true;
    return test(1, function(){
      var tgt, src, res;
      tgt = [1, 2, 3];
      src = [4, 5, 6];
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
  describe('mergeTo', function(){
    var fn, dir, mut;
    fn = mergeTo;
    dir = 'to';
    mut = false;
    test(1, function(){
      var tgt, src, res;
      tgt = {
        a: 1,
        b: 2
      };
      src = {
        b: 3,
        c: 4
      };
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
    });
    test('also takes null/undef', function(){
      var tgt, src, res;
      tgt = {
        a: 1,
        b: 2
      };
      src = {
        b: 3,
        c: 4,
        d: void 8
      };
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      return expectToBe(true)(
      'd' in res);
    });
    test('discards non-own vals 1', function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({
        hidden: 42
      });
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({
        hidden: 43
      });
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
      return expect(res.hidden).toEqual(void 8);
    });
    test('discards non-own vals 2', function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({
        hidden: 42
      });
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({});
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
      return expect(res.hidden).toEqual(void 8);
    });
    return test('discards non-own vals 3', function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({});
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({
        hidden: 43
      });
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
      return expect(res.hidden).toEqual(void 8);
    });
  });
  describe('mergeFrom', function(){
    var fn, dir, mut;
    fn = mergeFrom;
    dir = 'from';
    mut = false;
    test(1, function(){
      var tgt, src, res;
      tgt = {
        a: 1,
        b: 2
      };
      src = {
        b: 3,
        c: 4
      };
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
    });
    test('discards non-own vals 1', function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({
        hidden: 42
      });
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({
        hidden: 43
      });
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
      return expect(res.hidden).toEqual(void 8);
    });
    test('discards non-own vals 2', function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({
        hidden: 42
      });
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({});
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
      return expect(res.hidden).toEqual(void 8);
    });
    return test('discards non-own vals 3', function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({});
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({
        hidden: 43
      });
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
      return expect(res.hidden).toEqual(void 8);
    });
  });
  describe('mergeToM', function(){
    var fn, dir, mut;
    fn = mergeToM;
    dir = 'to';
    mut = true;
    test(1, function(){
      var tgt, src, res;
      tgt = {
        a: 1,
        b: 2
      };
      src = {
        b: 3,
        c: 4
      };
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
    });
    test('discards non-own on src', function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({});
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({
        hidden: 43
      });
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
      return expect(res.hidden).toEqual(void 8);
    });
    test('discards non-own on src, retains on tgt', function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({
        hidden: 42
      });
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({});
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
      return expect(res.hidden).toEqual(42);
    });
    return test('discards non-own vals 3', function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({
        hidden: 42
      });
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({
        hidden: 43
      });
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
    });
  });
  describe('mergeFromM', function(){
    var fn, dir, mut;
    fn = mergeFromM;
    dir = 'from';
    mut = true;
    test(1, function(){
      var tgt, src, res;
      tgt = {
        a: 1,
        b: 2
      };
      src = {
        b: 3,
        c: 4
      };
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
    });
    test('discards non-own on src', function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({});
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({
        hidden: 43
      });
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
      return expect(res.hidden).toEqual(void 8);
    });
    test('discards non-own on src, retains on tgt', function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({
        hidden: 42
      });
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({});
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
      return expect(res.hidden).toEqual(42);
    });
    return test('discards non-own vals 3', function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({
        hidden: 42
      });
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({
        hidden: 43
      });
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
    });
  });
  describe('mergeToWithM', function(){
    var tgt, src, noop, chooseLeft, chooseRight;
    noop = function(){};
    chooseLeft = function(a, b){
      return a;
    };
    chooseRight = function(a, b){
      return b;
    };
    describe('main', function(){
      return test('when no collisions, acts like mergeToM', function(){
        var x$, tgt, y$, src;
        x$ = tgt = Object.create({
          hidden1: 42
        });
        x$.a = 1;
        x$.b = 2;
        y$ = src = Object.create({
          hidden2: 42
        });
        y$.c = 3;
        y$.d = 4;
        return expectToEqual(mergeToM(tgt)(
        src))(
        mergeToWithM(noop, tgt)(
        src));
      });
    });
    describe('collide with own of target', function(){
      var tgt, src;
      beforeEach(function(){
        var x$;
        x$ = tgt = Object.create({
          hidden: 42
        });
        x$.a = 'target a';
        x$.b = 'target b';
        return src = {
          b: 'source b',
          c: 'source c'
        };
      });
      test('choose target', function(){
        mergeToWithM(chooseLeft, tgt)(
        src);
        return expectToEqual({
          a: 'target a',
          b: 'target b',
          c: 'source c'
        })(
        tgt);
      });
      return test('choose source', function(){
        mergeToWithM(chooseRight, tgt)(
        src);
        return expectToEqual({
          a: 'target a',
          b: 'source b',
          c: 'source c'
        })(
        tgt);
      });
    });
    return describe('collide with in of target', function(){
      var tgt, src;
      beforeEach(function(){
        var x$;
        x$ = tgt = Object.create({
          hidden: 'target hidden'
        });
        x$.a = 'target a';
        x$.b = 'target b';
        return src = {
          c: 'source c',
          hidden: 'source hidden'
        };
      });
      test('proto chain of target is not checked', function(){
        mergeToWithM(null, tgt)(
        src);
        return expectToEqual({
          a: 'target a',
          b: 'target b',
          c: 'source c',
          hidden: 'source hidden'
        })(
        tgt);
      });
      xtest('choose target, hidden val floats', function(){
        mergeToWithM(chooseLeft, tgt)(
        src);
        expectToEqual({
          a: 'target a',
          b: 'target b',
          c: 'source c',
          hidden: 'target hidden'
        })(
        tgt);
        return expectToEqual('target hidden')(
        tgt.hidden);
      });
      return xtest('choose source, hidden val floats', function(){
        mergeToWithM(chooseRight, tgt)(
        src);
        return expectToEqual({
          a: 'target a',
          b: 'source b',
          c: 'source c',
          hidden: 'source hidden'
        })(
        tgt);
      });
    });
  });
  describe('mergeFromWithM', function(){
    var tgt, src, noop, chooseLeft, chooseRight;
    noop = function(){};
    chooseLeft = function(a, b){
      return a;
    };
    chooseRight = function(a, b){
      return b;
    };
    describe('main', function(){
      return test('when no collisions, acts like mergeFromM', function(){
        var x$, tgt, y$, src;
        x$ = tgt = Object.create({
          hidden1: 42
        });
        x$.a = 1;
        x$.b = 2;
        y$ = src = Object.create({
          hidden2: 42
        });
        y$.c = 3;
        y$.d = 4;
        return expectToEqual(mergeFromM(src)(
        tgt))(
        mergeFromWithM(noop, src)(
        tgt));
      });
    });
    describe('collide with own of target', function(){
      var tgt, src;
      beforeEach(function(){
        var x$;
        x$ = tgt = Object.create({
          hidden: 42
        });
        x$.a = 'target a';
        x$.b = 'target b';
        return src = {
          b: 'source b',
          c: 'source c'
        };
      });
      test('choose target', function(){
        mergeFromWithM(chooseLeft, src)(
        tgt);
        return expectToEqual({
          a: 'target a',
          b: 'target b',
          c: 'source c'
        })(
        tgt);
      });
      return test('choose source', function(){
        mergeFromWithM(chooseRight, src)(
        tgt);
        return expectToEqual({
          a: 'target a',
          b: 'source b',
          c: 'source c'
        })(
        tgt);
      });
    });
    return describe('collide with in of target', function(){
      var tgt, src;
      beforeEach(function(){
        var x$;
        x$ = tgt = Object.create({
          hidden: 'target hidden'
        });
        x$.a = 'target a';
        return src = {
          b: 'source b',
          c: 'source c',
          hidden: 'source hidden'
        };
      });
      test('proto chain of target is not checked', function(){
        mergeFromWithM(null, src)(
        tgt);
        return expectToEqual({
          a: 'target a',
          b: 'source b',
          c: 'source c',
          hidden: 'source hidden'
        })(
        tgt);
      });
      xtest('choose target, hidden val floats', function(){
        mergeFromWithM(chooseLeft, src)(
        tgt);
        expectToEqual({
          a: 'target a',
          b: 'target b',
          c: 'source c',
          hidden: 'target hidden'
        })(
        tgt);
        return expectToEqual('target hidden')(
        tgt.hidden);
      });
      return xtest('choose source, hidden val floats', function(){
        mergeFromWithM(chooseRight, src)(
        tgt);
        return expectToEqual({
          a: 'target a',
          b: 'source b',
          c: 'source c',
          hidden: 'source hidden'
        })(
        tgt);
      });
    });
  });
  describe('mergeToIn', function(){
    var fn, dir, mut;
    fn = mergeToIn;
    dir = 'to';
    mut = false;
    test(1, function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({
        hidden: 42
      });
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({});
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4,
        hidden: 42
      });
    });
    test(2, function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({});
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({
        hidden: 43
      });
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4,
        hidden: 43
      });
    });
    return test(3, function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({
        hidden: 42
      });
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({
        hidden: 43
      });
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4,
        hidden: 43
      });
    });
  });
  describe('mergeFromIn', function(){
    var fn, dir, mut;
    fn = mergeFromIn;
    dir = 'from';
    mut = false;
    test(1, function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({
        hidden: 42
      });
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({});
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4,
        hidden: 42
      });
    });
    test(2, function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({});
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({
        hidden: 43
      });
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4,
        hidden: 43
      });
    });
    return test(3, function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({
        hidden: 42
      });
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({
        hidden: 43
      });
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4,
        hidden: 43
      });
    });
  });
  describe('mergeToInM', function(){
    var fn, dir, mut;
    fn = mergeToInM;
    dir = 'to';
    mut = true;
    test(1, function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({
        hidden: 42
      });
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({});
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
      return expect(res.hidden).toEqual(42);
    });
    test(2, function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({});
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({
        hidden: 43
      });
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4,
        hidden: 43
      });
    });
    return test(3, function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({
        hidden: 42
      });
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({
        hidden: 43
      });
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4,
        hidden: 43
      });
    });
  });
  describe('mergeFromInM', function(){
    var fn, dir, mut;
    fn = mergeFromInM;
    dir = 'from';
    mut = true;
    test(1, function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({
        hidden: 42
      });
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({});
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
      return expect(res.hidden).toEqual(42);
    });
    test(2, function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({});
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({
        hidden: 43
      });
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4,
        hidden: 43
      });
    });
    return test(3, function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create({
        hidden: 42
      });
      x$.a = 1;
      x$.b = 2;
      y$ = src = Object.create({
        hidden: 43
      });
      y$.b = 3;
      y$.c = 4;
      res = run({
        fn: fn,
        src: src,
        tgt: tgt,
        dir: dir
      });
      testM({
        res: res,
        mut: mut,
        tgt: tgt
      });
      return expect(res).toEqual({
        a: 1,
        b: 3,
        c: 4,
        hidden: 43
      });
    });
  });
  return describe('mergeAllIn', function(){
    test('no prototypes', function(){
      return expectToEqual({
        a: 1,
        b: 2,
        c: 3
      })(
      mergeAllIn(list({
        a: 1
      }, {
        b: 2
      }, {
        c: 3
      })));
    });
    return test('with prototypes', function(){
      return expectToEqual({
        a: 1,
        b: 2,
        c: 3
      })(
      mergeAllIn(list(Object.create(
      {
        a: 1
      }), Object.create(
      {
        b: 2
      }), Object.create(
      {
        c: 3
      }))));
    });
  });
});
describe('discardPrototype', function(){
  var proto1, proto2, obj;
  proto1 = Object.create({
    blah: 10
  });
  proto2 = Object.create(proto1);
  obj = Object.create(proto2);
  expectToEqual(10)(
  obj.blah);
  return expectToEqual(void 8)(
  discardPrototype(
  obj).blah);
});
describe('flattenPrototype', function(){
  var x$, proto1, y$, proto2, z$, obj;
  x$ = proto1 = Object.create({
    blah: 10
  });
  x$.feets = 'sometimes';
  y$ = proto2 = Object.create(proto1);
  y$.hands = 'mostways';
  z$ = obj = Object.create(proto2);
  z$.legs = 'noo';
  expectToEqual(10)(
  obj.blah);
  return expectToEqual({
    blah: 10,
    feets: 'sometimes',
    hands: 'mostways',
    legs: 'noo'
  })(
  flattenPrototype(
  obj));
});
describe('mapPairs', function(){
  test('obj', function(){
    var x$;
    return expectToEqual({
      ARE: 'yes, thanks',
      YOU: 'yes, and you?'
    })(
    mapPairs(function(k, v){
      return [k.toUpperCase(), 'yes, ' + v];
    })(
    (x$ = Object.create({
      how: 'fine'
    }), x$.are = 'thanks', x$.you = 'and you?', x$)));
  });
  return test('array', function(){
    return expectToEqual({
      HOW: 'yes, fine',
      ARE: 'yes, thanks',
      YOU: 'yes, and you?'
    })(
    mapPairs(function(k, v){
      return [k.toUpperCase(), 'yes, ' + v];
    })(
    ['how', 'fine', 'are', 'thanks', 'you', 'and you?']));
  });
});
describe('mapPairsIn', function(){
  return test(1, function(){
    var ref$;
    return expectToEqual({
      HOW: 'yes, fine',
      ARE: 'yes, thanks',
      YOU: 'yes, and you?'
    })(
    mapPairsIn(function(k, v){
      return [k.toUpperCase(), 'yes, ' + v];
    })(
    (ref$ = Object.create(
    {
      how: 'fine'
    }), ref$.are = 'thanks', ref$.you = 'and you?', ref$)));
  });
});
describe('eachObjIn', function(){
  return test('also enumerates prototype vals', function(){
    var ret;
    ret = [];
    eachObjIn(function(v, k){
      ret.push(k);
      return ret.push(v);
    })(
    Object.create(
    function(){
      return {
        how: 'fine',
        are: 'thanks'
      };
    }()));
    return expectToEqual(['how', 'fine', 'are', 'thanks'])(
    ret);
  });
});
describe('applyScalar', function(){
  return test(1, function(){
    var this$ = this;
    return expectToEqual([2, 3, 1.5])(
    applyScalar([
      (function(it){
        return it * 2;
      }), (function(it){
        return it + 1;
      }), (function(it){
        return it / 2;
      })
    ])(
    [1, 2, 3]));
  });
});
describe('passScalar', function(){
  return test(1, function(){
    var this$ = this;
    return expectToEqual([2, 3, 1.5])(
    passScalar([1, 2, 3])(
    [
      (function(it){
        return it * 2;
      }), (function(it){
        return it + 1;
      }), (function(it){
        return it / 2;
      })
    ]));
  });
});