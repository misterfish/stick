var ref$, rAssoc, head, tail, reduceRight, chain, identity, reduce, rMap, rProp, rPath, rDefaultTo, curry, rEach, complement, isNil, rRepeat, rTimes, rJoin, rSplit, reverse, rTap, flip, zip, odd, even, list, test, xtest, expectToEqual, expectToBe, expectPredicate, expectToBeTruthy, expectToBeFalsy, expectToHaveTypeof, expectToHaveTypeOf, expectToContainObject, expectNotToEqual, expectNotToBe, map, filter, reject, each, eachObj, eachObjIn, keys, keysIn, values, valuesIn, mapKeys, mapValues, mapKeysIn, mapValuesIn, mapTuples, mapTuplesIn, mapAsKeys, mapAsKeysIn, mapAsValues, mapAsValuesIn, withFilter, addIndex, addCollection, reduceObj, reduceObjIn, defaultTo, defaultToV, join, split, prop, path, assoc, assocM, assocPath, assocPathM, updateM, update, updatePathM, updatePath, appendTo, appendToM, append, appendM, prepend, prependM, prependTo, prependToM, concatTo, concatToM, concat, concatM, precatTo, precat, mergeTo, merge, mergeToM, mergeM, mergeInTo, mergeIn, mergeInToM, mergeInM, mergeToSym, mergeSym, mergeToMSym, mergeMSym, mergeInToSym, mergeInSym, mergeInToMSym, mergeInMSym, mergeAllIn, mergeWith, mergeWhen, discardPrototype, flattenPrototype, asterisk1, ampersandN, asteriskN, arg0, arg1, arg2, arg3, arg4, arg5, arg6, sortAlpha, sortNum, noop, chooseSrc, chooseTgt, mergeToChooseTgtM, mergeToChooseTgt, mergeToChooseSrcM, mergeToChooseSrc, mergeToWithNullM, mergeToWithNull, mergeToWithNoopM, mergeToWithNoop, mergeInToChooseTgtM, mergeInToChooseTgt, mergeInToChooseSrcM, mergeInToChooseSrc, mergeInToWithNoopM, mergeInToWithNoop, mergeChooseTgtM, mergeChooseTgt, mergeChooseSrcM, mergeChooseSrc, mergeWithNullM, mergeWithNull, mergeWithNoopM, mergeWithNoop, mergeInChooseTgtM, mergeInChooseTgt, mergeInChooseSrcM, mergeInChooseSrc, mergeInWithNullM, mergeInWithNull, mergeInWithNoopM, mergeInWithNoop, srcOk, tgtOk, mergeToWhenSrcOkM, mergeToWhenSrcOk, mergeToWhenTgtOkM, mergeToWhenTgtOk, mergeWhenSrcOkM, mergeWhenSrcOk, mergeWhenTgtOkM, mergeWhenTgtOk, this$ = this, slice$ = [].slice;
ref$ = require('ramda'), rAssoc = ref$.assoc, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, rMap = ref$.map, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, rEach = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, rJoin = ref$.join, rSplit = ref$.split, reverse = ref$.reverse, rTap = ref$.tap, flip = ref$.flip, zip = ref$.zip;
ref$ = require('prelude-ls'), odd = ref$.odd, even = ref$.even;
ref$ = require('./common'), list = ref$.list, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe, expectPredicate = ref$.expectPredicate, expectToBeTruthy = ref$.expectToBeTruthy, expectToBeFalsy = ref$.expectToBeFalsy, expectToHaveTypeof = ref$.expectToHaveTypeof, expectToHaveTypeOf = ref$.expectToHaveTypeOf, expectToContainObject = ref$.expectToContainObject, expectNotToEqual = ref$.expectNotToEqual, expectNotToBe = ref$.expectNotToBe;
ref$ = require('../index'), map = ref$.map, filter = ref$.filter, reject = ref$.reject, each = ref$.each, eachObj = ref$.eachObj, eachObjIn = ref$.eachObjIn, keys = ref$.keys, keysIn = ref$.keysIn, values = ref$.values, valuesIn = ref$.valuesIn, mapKeys = ref$.mapKeys, mapValues = ref$.mapValues, mapKeysIn = ref$.mapKeysIn, mapValuesIn = ref$.mapValuesIn, mapTuples = ref$.mapTuples, mapTuplesIn = ref$.mapTuplesIn, mapAsKeys = ref$.mapAsKeys, mapAsKeysIn = ref$.mapAsKeysIn, mapAsValues = ref$.mapAsValues, mapAsValuesIn = ref$.mapAsValuesIn, withFilter = ref$.withFilter, addIndex = ref$.addIndex, addCollection = ref$.addCollection, reduceObj = ref$.reduceObj, reduceObjIn = ref$.reduceObjIn, defaultTo = ref$.defaultTo, defaultToV = ref$.defaultToV, join = ref$.join, split = ref$.split, prop = ref$.prop, path = ref$.path, assoc = ref$.assoc, assocM = ref$.assocM, assocPath = ref$.assocPath, assocPathM = ref$.assocPathM, updateM = ref$.updateM, update = ref$.update, updatePathM = ref$.updatePathM, updatePath = ref$.updatePath, appendTo = ref$.appendTo, appendToM = ref$.appendToM, append = ref$.append, appendM = ref$.appendM, prepend = ref$.prepend, prependM = ref$.prependM, prependTo = ref$.prependTo, prependToM = ref$.prependToM, concatTo = ref$.concatTo, concatToM = ref$.concatToM, concat = ref$.concat, concatM = ref$.concatM, precatTo = ref$.precatTo, precat = ref$.precat, mergeTo = ref$.mergeTo, merge = ref$.merge, mergeToM = ref$.mergeToM, mergeM = ref$.mergeM, mergeInTo = ref$.mergeInTo, mergeIn = ref$.mergeIn, mergeInToM = ref$.mergeInToM, mergeInM = ref$.mergeInM, mergeToSym = ref$.mergeToSym, mergeSym = ref$.mergeSym, mergeToMSym = ref$.mergeToMSym, mergeMSym = ref$.mergeMSym, mergeInToSym = ref$.mergeInToSym, mergeInSym = ref$.mergeInSym, mergeInToMSym = ref$.mergeInToMSym, mergeInMSym = ref$.mergeInMSym, mergeAllIn = ref$.mergeAllIn, mergeWith = ref$.mergeWith, mergeWhen = ref$.mergeWhen, discardPrototype = ref$.discardPrototype, flattenPrototype = ref$.flattenPrototype, asterisk1 = ref$.asterisk1, ampersandN = ref$.ampersandN, asteriskN = ref$.asteriskN, arg0 = ref$.arg0, arg1 = ref$.arg1, arg2 = ref$.arg2, arg3 = ref$.arg3, arg4 = ref$.arg4, arg5 = ref$.arg5, arg6 = ref$.arg6;
sortAlpha = function(it){
  return it.sort();
};
sortNum = function(it){
  return it.sort(function(a, b){
    return a - b;
  });
};
noop = function(){};
chooseSrc = function(a, b){
  return a;
};
chooseTgt = function(a, b){
  return b;
};
mergeToChooseTgtM = mergeWith(chooseTgt)(
mergeToMSym);
mergeToChooseTgt = mergeWith(chooseTgt)(
mergeToSym);
mergeToChooseSrcM = mergeWith(chooseSrc)(
mergeToMSym);
mergeToChooseSrc = mergeWith(chooseSrc)(
mergeToSym);
mergeToWithNullM = mergeWith(null)(
mergeToMSym);
mergeToWithNull = mergeWith(null)(
mergeToSym);
mergeToWithNoopM = mergeWith(noop)(
mergeToMSym);
mergeToWithNoop = mergeWith(noop)(
mergeToSym);
mergeInToChooseTgtM = mergeWith(chooseTgt)(
mergeInToMSym);
mergeInToChooseTgt = mergeWith(chooseTgt)(
mergeInToSym);
mergeInToChooseSrcM = mergeWith(chooseSrc)(
mergeInToMSym);
mergeInToChooseSrc = mergeWith(chooseSrc)(
mergeInToSym);
mergeInToWithNoopM = mergeWith(noop)(
mergeInToMSym);
mergeInToWithNoop = mergeWith(noop)(
mergeInToSym);
mergeChooseTgtM = mergeWith(chooseTgt)(
mergeMSym);
mergeChooseTgt = mergeWith(chooseTgt)(
mergeSym);
mergeChooseSrcM = mergeWith(chooseSrc)(
mergeMSym);
mergeChooseSrc = mergeWith(chooseSrc)(
mergeSym);
mergeWithNullM = mergeWith(null)(
mergeMSym);
mergeWithNull = mergeWith(null)(
mergeSym);
mergeWithNoopM = mergeWith(noop)(
mergeMSym);
mergeWithNoop = mergeWith(noop)(
mergeSym);
mergeInChooseTgtM = mergeWith(chooseTgt)(
mergeInMSym);
mergeInChooseTgt = mergeWith(chooseTgt)(
mergeInSym);
mergeInChooseSrcM = mergeWith(chooseSrc)(
mergeInMSym);
mergeInChooseSrc = mergeWith(chooseSrc)(
mergeInSym);
mergeInWithNullM = mergeWith(null)(
mergeInMSym);
mergeInWithNull = mergeWith(null)(
mergeInSym);
mergeInWithNoopM = mergeWith(noop)(
mergeInMSym);
mergeInWithNoop = mergeWith(noop)(
mergeInSym);
srcOk = function(s, _){
  return s != null;
};
tgtOk = function(_, t){
  return t != null;
};
mergeToWhenSrcOkM = mergeWhen(srcOk)(
mergeToMSym);
mergeToWhenSrcOk = mergeWhen(srcOk)(
mergeToSym);
mergeToWhenTgtOkM = mergeWhen(tgtOk)(
mergeToMSym);
mergeToWhenTgtOk = mergeWhen(tgtOk)(
mergeToSym);
mergeWhenSrcOkM = mergeWhen(srcOk)(
mergeMSym);
mergeWhenSrcOk = mergeWhen(srcOk)(
mergeSym);
mergeWhenTgtOkM = mergeWhen(tgtOk)(
mergeMSym);
mergeWhenTgtOk = mergeWhen(tgtOk)(
mergeSym);
describe('map, filter, reject, each', function(){
  describe('map', function(){
    var mapX, mapXC, mapCX;
    mapX = addIndex(
    map);
    mapXC = addCollection(
    addIndex(
    map));
    mapCX = addIndex(
    addCollection(
    map));
    test(1, function(){
      var this$ = this;
      return expectToEqual([2, 4, 6])(
      map((function(it){
        return it * 2;
      }))(
      [1, 2, 3]));
    });
    test('capped', function(){
      return expectToEqual([void 8, void 8, void 8])(
      map(function(x, arg2){
        return arg2;
      })(
      [1, 2, 3]));
    });
    test('indexed', function(){
      return expectToEqual([0, 1, 2])(
      mapX(function(x, idx){
        return idx;
      })(
      [1, 2, 3]));
    });
    test('mapXC', function(){
      return expectToEqual([0, 3, 6])(
      mapXC(function(x, i, c){
        return i * c.length;
      })(
      [1, 2, 3]));
    });
    return test('mapCX', function(){
      return expectToEqual([0, 3, 6])(
      mapCX(function(x, c, i){
        return i * c.length;
      })(
      [1, 2, 3]));
    });
  });
  describe('filter', function(){
    var filterX, filterXC, filterCX;
    filterX = addIndex(
    filter);
    filterXC = addCollection(
    addIndex(
    filter));
    filterCX = addIndex(
    addCollection(
    filter));
    test(1, function(){
      return expectToEqual([1, 3])(
      filter(odd)(
      [1, 2, 3]));
    });
    test('capped', function(){
      return expectToEqual([])(
      filter(function(x, arg2){
        return arg2;
      })(
      [1, 2, 3]));
    });
    test('indexed', function(){
      return expectToEqual([3])(
      filterX(function(x, idx){
        return idx === 2;
      })(
      [1, 2, 3]));
    });
    test('filterXC', function(){
      return expectToEqual([2])(
      filterXC(function(x, i, c){
        return i * c.length === 3;
      })(
      [1, 2, 3]));
    });
    return test('filterCX', function(){
      return expectToEqual([2])(
      filterCX(function(x, c, i){
        return i * c.length === 3;
      })(
      [1, 2, 3]));
    });
  });
  describe('reject', function(){
    var rejectX, rejectXC, rejectCX;
    rejectX = addIndex(
    reject);
    rejectXC = addCollection(
    addIndex(
    reject));
    rejectCX = addIndex(
    addCollection(
    reject));
    test(1, function(){
      return expectToEqual([1, 3])(
      reject(even)(
      [1, 2, 3]));
    });
    test('capped', function(){
      return expectToEqual([])(
      reject(function(x, arg2){
        return arg2 === void 8;
      })(
      [1, 2, 3]));
    });
    test('indexed', function(){
      return expectToEqual([1, 2])(
      rejectX(function(x, idx){
        return idx === 2;
      })(
      [1, 2, 3]));
    });
    test('rejectXC', function(){
      return expectToEqual([1, 3])(
      rejectXC(function(x, i, c){
        return i * c.length === 3;
      })(
      [1, 2, 3]));
    });
    return test('rejectCX', function(){
      return expectToEqual([1, 3])(
      rejectCX(function(x, c, i){
        return i * c.length === 3;
      })(
      [1, 2, 3]));
    });
  });
  describe('each', function(){
    var eachX, eachXC, eachCX, y, ping;
    eachX = addIndex(
    each);
    eachXC = addCollection(
    addIndex(
    each));
    eachCX = addIndex(
    addCollection(
    each));
    y = {
      y: []
    };
    ping = function(x){
      return y.y.push(x);
    };
    beforeEach(function(){
      return y.y = [];
    });
    test(1, function(){
      each(function(x){
        return ping(x);
      })(
      [1, 2, 3]);
      return expectToEqual([1, 2, 3])(
      y.y);
    });
    test('capped', function(){
      each(function(x, arg2){
        return ping(arg2);
      })(
      [1, 2, 3]);
      return expectToEqual([void 8, void 8, void 8])(
      y.y);
    });
    test('indexed', function(){
      eachX(function(x, idx){
        return ping(idx);
      })(
      [1, 2, 3]);
      return expectToEqual([0, 1, 2])(
      y.y);
    });
    test('eachXC', function(){
      eachXC(function(x, i, c){
        return ping(i * c.length);
      })(
      [1, 2, 3]);
      return expectToEqual([0, 3, 6])(
      y.y);
    });
    return test('eachCX', function(){
      eachCX(function(x, c, i){
        return ping(i * c.length);
      })(
      [1, 2, 3]);
      return expectToEqual([0, 3, 6])(
      y.y);
    });
  });
  return describe('eachObj', function(){
    var eachObjX, eachObjXC, eachObjCX, base, o, ref$, y;
    eachObjX = addIndex(
    eachObj);
    eachObjXC = addCollection(
    addIndex(
    eachObj));
    eachObjCX = addIndex(
    addCollection(
    eachObj));
    base = {
      baseVal: 15
    };
    o = (ref$ = Object.create(base), ref$.a = 1, ref$.b = 2, ref$);
    y = {
      y: void 8,
      z: []
    };
    beforeEach(function(){
      y.y = {};
      return y.z = [];
    });
    test(1, function(){
      eachObj(function(v, k){
        return y.y[k] = v;
      })(
      o);
      return expectToEqual({
        a: 1,
        b: 2
      })(
      y.y);
    });
    test('capped', function(){
      eachObj(function(v, k, arg3){
        return y.z.push(arg3);
      })(
      o);
      return expectToEqual([void 8, void 8])(
      y.z);
    });
    test('indexed', function(){
      eachObjX(function(v, k, idx){
        y.y[k] = v;
        return y.z.push(idx);
      })(
      o);
      expectToEqual({
        a: 1,
        b: 2
      })(
      y.y);
      return expectToEqual([0, 1])(
      y.z);
    });
    test('eachObjXC', function(){
      eachObjXC(function(v, k, idx, c){
        y.y[k] = v;
        y.z.push(idx);
        return y.z.push(c);
      })(
      o);
      expectToEqual({
        a: 1,
        b: 2
      })(
      y.y);
      return expectToEqual([0, o, 1, o])(
      y.z);
    });
    return test('eachObjCX', function(){
      eachObjCX(function(v, k, c, idx){
        y.y[k] = v;
        y.z.push(idx);
        return y.z.push(c);
      })(
      o);
      expectToEqual({
        a: 1,
        b: 2
      })(
      y.y);
      return expectToEqual([0, o, 1, o])(
      y.z);
    });
  });
});
describe('reduceObj', function(){
  var base, o, ref$;
  base = {
    baseVal: 15
  };
  o = (ref$ = Object.create(base), ref$.a = 1, ref$.b = 2, ref$);
  describe('reduceObj', function(){
    return test(1, function(){
      var f, reduced, json;
      f = function(acc, arg$){
        var k, v;
        k = arg$[0], v = arg$[1];
        return slice$.call(acc).concat(["\"" + k + "\": " + v]);
      };
      reduced = reduceObj(f, [])(
      o);
      json = function(x){
        return "{" + x + "}";
      }(
      rJoin(', ')(
      reduced));
      expectToEqual(1)(
      JSON.parse(json).a);
      return expectToEqual(void 8)(
      JSON.parse(json).baseVal);
    });
  });
  return describe('reduceObjIn', function(){
    return test(1, function(){
      var f, reduced, json;
      f = function(acc, arg$){
        var k, v;
        k = arg$[0], v = arg$[1];
        return slice$.call(acc).concat(["\"" + k + "\": " + v]);
      };
      reduced = reduceObjIn(f, [])(
      o);
      json = function(x){
        return "{" + x + "}";
      }(
      rJoin(', ')(
      reduced));
      expectToEqual(1)(
      JSON.parse(json).a);
      return expectToEqual(15)(
      JSON.parse(json).baseVal);
    });
  });
});
describe('keys, values', function(){
  var base, o, ref$, sortAlpha, sortNum, this$ = this;
  base = {
    baseVal: 10
  };
  o = (ref$ = Object.create(base), ref$.one = 1, ref$.two = 2, ref$);
  sortAlpha = function(it){
    return it.sort();
  };
  sortNum = function(it){
    return it.sort(function(a, b){
      return a - b;
    });
  };
  test('keys', function(){
    return expectToEqual(['one', 'two'])(
    sortAlpha(
    keys(
    o)));
  });
  test('keysIn', function(){
    return expectToEqual(['baseVal', 'one', 'two'])(
    sortAlpha(
    keysIn(
    o)));
  });
  test('values', function(){
    return expectToEqual([1, 2])(
    sortNum(
    values(
    o)));
  });
  return test('valuesIn', function(){
    return expectToEqual([1, 2, 10])(
    sortNum(
    valuesIn(
    o)));
  });
});
describe('map keys/values/tuples', function(){
  var base, o, ref$;
  base = {
    baseVal: 10
  };
  o = (ref$ = Object.create(base), ref$.one = 1, ref$.two = 2, ref$);
  test('mapKeys', function(){
    var this$ = this;
    return expectToEqual({
      TWO: 2,
      ONE: 1
    })(
    mapKeys(function(it){
      return it.toUpperCase();
    })(
    o));
  });
  test('mapValues', function(){
    var this$ = this;
    return expectToEqual({
      one: 10,
      two: 20
    })(
    mapValues((function(it){
      return it * 10;
    }))(
    o));
  });
  test('mapKeysIn', function(){
    var this$ = this;
    return expectToEqual({
      TWO: 2,
      BASEVAL: 10,
      ONE: 1
    })(
    mapKeysIn(function(it){
      return it.toUpperCase();
    })(
    o));
  });
  test('mapValuesIn', function(){
    var this$ = this;
    return expectToEqual({
      baseVal: 100,
      two: 20,
      one: 10
    })(
    mapValuesIn((function(it){
      return it * 10;
    }))(
    o));
  });
  test('mapTuples', function(){
    return expectToEqual({
      TWO: 3,
      ONE: 2
    })(
    mapTuples(function(arg$){
      var k, v;
      k = arg$[0], v = arg$[1];
      return [k.toUpperCase(), v + 1];
    })(
    o));
  });
  return test('mapTuplesIn', function(){
    return expectToEqual({
      BASEVAL: 11,
      TWO: 3,
      ONE: 2
    })(
    mapTuplesIn(function(arg$){
      var k, v;
      k = arg$[0], v = arg$[1];
      return [k.toUpperCase(), v + 1];
    })(
    o));
  });
});
describe('map as', function(){
  var base, o, ref$;
  base = {
    baseVal: 10
  };
  o = (ref$ = Object.create(base), ref$.one = 1, ref$.two = 2, ref$);
  describe('mapAsKeys', function(){
    var this$ = this;
    return expectToEqual(['ONE', 'TWO'])(
    mapAsKeys(function(it){
      return it.toUpperCase();
    })(
    o));
  });
  describe('mapAsKeysIn', function(){
    var this$ = this;
    return expectToEqual(['ONE', 'TWO', 'BASEVAL'])(
    mapAsKeysIn(function(it){
      return it.toUpperCase();
    })(
    o));
  });
  describe('mapAsValues', function(){
    var this$ = this;
    return expectToEqual([10, 20])(
    sortNum(
    mapAsValues((function(it){
      return it * 10;
    }))(
    o)));
  });
  return describe('mapAsValuesIn', function(){
    var this$ = this;
    return expectToEqual([10, 20, 100])(
    mapAsValuesIn((function(it){
      return it * 10;
    }))(
    o));
  });
});
describe('map as + with filter', function(){
  var base, o, ref$, mapKRejectStartsWithO, mapKInRejectStartsWithO, mapVOdd, mapVInOdd, this$ = this;
  base = {
    baseVal: 10
  };
  o = (ref$ = Object.create(base), ref$.one = 1, ref$.two = 2, ref$);
  mapKRejectStartsWithO = withFilter(function(it){
    return it[0] !== 'O';
  })(
  mapAsKeys);
  mapKInRejectStartsWithO = withFilter(function(it){
    return it[0] !== 'O';
  })(
  mapAsKeysIn);
  mapVOdd = withFilter(odd)(
  mapAsValues);
  mapVInOdd = withFilter(odd)(
  mapAsValuesIn);
  test('mapAsKeysWithFilter', function(){
    var this$ = this;
    return expectToEqual(['TWO'])(
    mapKRejectStartsWithO(function(it){
      return it.toUpperCase();
    })(
    o));
  });
  test('mapAsKeysInWithFilter', function(){
    var this$ = this;
    return expectToEqual(['BASEVAL', 'TWO'])(
    sortAlpha(
    mapKInRejectStartsWithO(function(it){
      return it.toUpperCase();
    })(
    o)));
  });
  test('mapAsValuesWithFilter', function(){
    var this$ = this;
    return expectToEqual([3])(
    mapVOdd((function(it){
      return it + 1;
    }))(
    o));
  });
  return test('mapAsValuesInWithFilter', function(){
    var this$ = this;
    return expectToEqual([3, 11])(
    sortNum(
    mapVInOdd((function(it){
      return it + 1;
    }))(
    o)));
  });
});
describe('map + with filter', function(){
  var base, o, ref$, mapKRejectStartsWithO, mapKInRejectStartsWithO, mapVOdd, mapVInOdd, mapTuplesVOdd, mapTuplesVInOdd, this$ = this;
  base = {
    baseVal: 10
  };
  o = (ref$ = Object.create(base), ref$.one = 1, ref$.two = 2, ref$);
  mapKRejectStartsWithO = withFilter(function(it){
    return it[0] !== 'O';
  })(
  mapKeys);
  mapKInRejectStartsWithO = withFilter(function(it){
    return it[0] !== 'O';
  })(
  mapKeysIn);
  mapVOdd = withFilter(odd)(
  mapValues);
  mapVInOdd = withFilter(odd)(
  mapValuesIn);
  mapTuplesVOdd = withFilter(function(arg$){
    var k, v;
    k = arg$[0], v = arg$[1];
    return odd(v);
  })(
  mapTuples);
  mapTuplesVInOdd = withFilter(function(arg$){
    var k, v;
    k = arg$[0], v = arg$[1];
    return odd(v);
  })(
  mapTuplesIn);
  test('mapKeysWithFilter', function(){
    var this$ = this;
    return expectToEqual({
      TWO: 2
    })(
    mapKRejectStartsWithO(function(it){
      return it.toUpperCase();
    })(
    o));
  });
  test('mapKeysInWithFilter', function(){
    var this$ = this;
    return expectToEqual({
      TWO: 2,
      BASEVAL: 10
    })(
    mapKInRejectStartsWithO(function(it){
      return it.toUpperCase();
    })(
    o));
  });
  test('mapValuesWithFilter', function(){
    var this$ = this;
    return expectToEqual({
      two: 3
    })(
    mapVOdd((function(it){
      return it + 1;
    }))(
    o));
  });
  test('mapValuesInWithFilter', function(){
    var this$ = this;
    return expectToEqual({
      two: 3,
      baseVal: 11
    })(
    mapVInOdd((function(it){
      return it + 1;
    }))(
    o));
  });
  test('mapTuplesWithFilter', function(){
    return expectToEqual({
      TWO: 3
    })(
    mapTuplesVOdd(function(arg$){
      var k, v;
      k = arg$[0], v = arg$[1];
      return [k.toUpperCase(), v + 1];
    })(
    o));
  });
  return test('mapTuplesInWithFilter', function(){
    return expectToEqual({
      TWO: 3,
      BASEVAL: 11
    })(
    mapTuplesVInOdd(function(arg$){
      var k, v;
      k = arg$[0], v = arg$[1];
      return [k.toUpperCase(), v + 1];
    })(
    o));
  });
});
describe('join, split', function(){
  describe('join', function(){
    return test(1, function(){
      return expectToEqual('1,2,3,4')(
      join(',')(
      [1, 2, 3, 4]));
    });
  });
  return describe('split', function(){
    return test(1, function(){
      return expectToEqual([1, 2, 3, 4])(
      map(Number)(
      split(',')(
      '1,2,3,4')));
    });
  });
});
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
describe('default to value', function(){
  test(1, function(){
    return expectToEqual(false)(
    defaultToV(43)(
    false));
  });
  test(2, function(){
    return expectToEqual(42)(
    defaultToV(42)(
    null));
  });
  return test(3, function(){
    return expectToEqual(42)(
    defaultToV(42)(
    void 8));
  });
});
describe('default to __', function(){
  return;
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
describe('data stuff', function(){
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
  describe('assoc', function(){
    var base, orig, ref$, nieuw;
    base = {
      baseVal: 10
    };
    orig = (ref$ = Object.create(base), ref$.a = 1, ref$.b = 2, ref$);
    nieuw = assoc('b', 3)(
    orig);
    test(1, function(){
      expect(nieuw).not.toBe(orig);
      expectToEqual(1)(
      nieuw.a);
      return expectToEqual(3)(
      nieuw.b);
    });
    return test('flattens proto', function(){
      return expectToEqual(10)(
      nieuw.baseVal);
    });
  });
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
  describe('assocPath', function(){
    var o;
    o = {
      o: void 8
    };
    beforeEach(function(){
      var base, ref$;
      base = {
        baseVal: 10
      };
      o.o = (ref$ = Object.create(base), ref$.a = 1, ref$.b = 2, ref$.c = {
        w: null,
        x: void 8,
        y: 3,
        z: {
          zz: 10,
          yy: 11
        }
      }, ref$);
      o.p = {
        a: 1,
        b: 2,
        c: [
          10, 11, [{
            a: 1
          }]
        ]
      };
      return o.q = {
        a: 1,
        b: 2,
        c: new Date,
        d: new Error
      };
    });
    test(1, function(){
      assocPathM(['a'], 2)(
      o.o);
      expectToContainObject({
        a: 2,
        b: 2
      })(
      o.o);
      return expectNotToBe(o.o)(
      rTap(expectToContainObject({
        a: 2,
        b: 2
      }))(
      assocPath(['a'], 2)(
      o.o)));
    });
    test(2, function(){
      assocPathM(['d'], 2)(
      o.o);
      return expectToContainObject({
        a: 1,
        b: 2,
        d: 2
      })(
      o.o);
    });
    test(3, function(){
      assocPathM(['a', 'c'], 3)(
      o.o);
      return expectToContainObject({
        b: 2,
        a: {
          c: 3
        }
      })(
      o.o);
    });
    test(4, function(){
      assocPathM(['d', 'a'], 3)(
      o.o);
      return expectToContainObject({
        a: 1,
        d: {
          a: 3
        }
      })(
      o.o);
    });
    test(5, function(){
      assocPathM(['a', 'd'], 3)(
      o.o);
      return expectToContainObject({
        b: 2,
        a: {
          d: 3
        }
      })(
      o.o);
    });
    test(6, function(){
      assocPathM(['c', 'w'], void 8)(
      o.o);
      return expectToEqual(void 8)(
      o.o.c.w);
    });
    test(7, function(){
      assocPathM(['c', 'w'], 10)(
      o.o);
      return expectToEqual(10)(
      o.o.c.w);
    });
    test(8, function(){
      assocPathM(['c', 'w'], null)(
      o.o);
      return expectToEqual(null)(
      o.o.c.w);
    });
    test(9, function(){
      assocPathM(['c', '1'], 1)(
      o.p);
      expectToEqual({
        a: 1,
        b: 2,
        c: [
          10, 1, [{
            a: 1
          }]
        ]
      })(
      o.p);
      return expectNotToBe(o.p)(
      rTap(expectToEqual({
        a: 1,
        b: 2,
        c: [
          10, 1, [{
            a: 1
          }]
        ]
      }))(
      assocPath(['c', '1'], 1)(
      o.p)));
    });
    test(10, function(){
      assocPathM(['c', 1], 1)(
      o.p);
      return expectToEqual({
        a: 1,
        b: 2,
        c: [
          10, 1, [{
            a: 1
          }]
        ]
      })(
      o.p);
    });
    test(11, function(){
      assocPathM(['c', '2', '0', 'a'], 2)(
      o.p);
      return expectToEqual({
        a: 1,
        b: 2,
        c: [
          10, 11, [{
            a: 2
          }]
        ]
      })(
      o.p);
    });
    test(11, function(){
      assocPathM(['c', '2', '0', 'a'], 2)(
      o.p);
      return expectToEqual({
        a: 1,
        b: 2,
        c: [
          10, 11, [{
            a: 2
          }]
        ]
      })(
      o.p);
    });
    test(12, function(){
      assocPathM(['c', 'd'], 2)(
      o.q);
      return expectToContainObject({
        a: 1,
        c: {
          d: 2
        }
      })(
      o.q);
    });
    return test('non-m flattens proto', function(){
      return expectToContainObject({
        baseVal: 10,
        c: 1
      })(
      assocPath(['c'], 1)(
      o.o));
    });
  });
  describe('update', function(){
    var o;
    o = {};
    beforeEach(function(){
      var base, ref$;
      base = {
        baseVal: 10
      };
      o.o = (ref$ = Object.create(base), ref$.a = 1, ref$.b = 2, ref$.c = {
        w: null,
        x: void 8,
        y: 3,
        z: {
          zz: 10,
          yy: 11
        }
      }, ref$);
      o.p = {
        a: 1,
        b: 2,
        c: [
          10, 11, [{
            a: 1
          }]
        ]
      };
      return o.q = {
        a: 1,
        b: 2,
        c: new Date,
        d: new Error
      };
    });
    describe('update', function(){
      test(1, function(){
        var this$ = this;
        updateM('a', (function(it){
          return it * 51;
        }))(
        o.o);
        return expectToContainObject({
          a: 51,
          b: 2
        })(
        o.o);
      });
      test('vivify m', function(){
        var this$ = this;
        updateM('nonexistent', (function(it){
          return it * 51;
        }))(
        o.o);
        return expectToContainObject({
          b: 2,
          nonexistent: NaN
        })(
        o.o);
      });
      test(2, function(){
        var this$ = this;
        return expectNotToBe(o.o)(
        rTap(expectToContainObject({
          a: 51,
          b: 2
        }))(
        update('a', (function(it){
          return it * 51;
        }))(
        o.o)));
      });
      return test('vivify', function(){
        var this$ = this;
        return expectNotToBe(o.o)(
        rTap(expectToContainObject({
          b: 2,
          nonexistent: NaN
        }))(
        update('nonexistent', (function(it){
          return it * 51;
        }))(
        o.o)));
      });
    });
    return describe('updatePath', function(){
      test(1, function(){
        var this$ = this;
        updatePathM(['c', 'y'], (function(it){
          return it * 10;
        }))(
        o.o);
        return expectToEqual(30)(
        o.o.c.y);
      });
      test('vivify M', function(){
        var this$ = this;
        updatePathM(['non', 'existent'], (function(it){
          return it * 10;
        }))(
        o.o);
        return expectToEqual(NaN)(
        o.o.non.existent);
      });
      test(2, function(){
        var this$ = this;
        return expectNotToBe(o.o)(
        rTap(expectPredicate(function(arg$){
          var y;
          y = arg$.c.y;
          return y === 30;
        }))(
        updatePath(['c', 'y'], (function(it){
          return it * 10;
        }))(
        o.o)));
      });
      return test('vivify', function(){
        var this$ = this;
        return expectNotToBe(o.o)(
        rTap(expectPredicate(function(arg$){
          var existent;
          existent = arg$.non.existent;
          return isNaN(existent);
        }))(
        updatePath(['non', 'existent'], (function(it){
          return it * 10;
        }))(
        o.o)));
      });
    });
  });
  describe('prop, path', function(){
    var o, p, q;
    o = {
      a: 1,
      b: 2,
      c: {
        w: null,
        x: void 8,
        y: 3,
        z: {
          zz: 10,
          yy: 11
        }
      }
    };
    p = {
      a: 1,
      b: 2,
      c: [
        10, 11, [{
          a: 1
        }]
      ]
    };
    q = {
      a: 1,
      b: 2,
      c: new Date,
      d: new Error
    };
    test('prop', function(){
      return expectToEqual(2)(
      prop('b')(
      o));
    });
    return describe('path', function(){
      test('path 1', function(){
        return expectToEqual(1)(
        path(['a'])(
        o));
      });
      test('path 2', function(){
        return expectToContainObject({
          w: null,
          x: void 8
        })(
        path(['c'])(
        o));
      });
      test('path 3', function(){
        return expectToBe(null)(
        path(['c', 'w'])(
        o));
      });
      test('path 4', function(){
        return expectToBe(void 8)(
        path(['c', 'x'])(
        o));
      });
      test('path 5', function(){
        return expectToBe(void 8)(
        path(['c', 'a'])(
        o));
      });
      test('path 6', function(){
        return expectToBe(3)(
        path(['c', 'y'])(
        o));
      });
      test('path 6.1', function(){
        return expectToBe(void 8)(
        path(['c', 'y', 'y'])(
        o));
      });
      test('path 6.2', function(){
        return expectToBe(void 8)(
        path(['c', 'y', 'y', 'y', 'y', 'y', 'y'])(
        o));
      });
      test('path 7', function(){
        return expectToBe(10)(
        path(['c', 'z', 'zz'])(
        o));
      });
      test('path 8', function(){
        return expectToBe(void 8)(
        path(['c', 'z', 'zz', 'zz', 'zz'])(
        o));
      });
      test('path 9', function(){
        return expectToEqual(11)(
        path(['c', '1'])(
        p));
      });
      test('path 10', function(){
        return expectToEqual(11)(
        path(['c', 1])(
        p));
      });
      test('path 11', function(){
        return expectToEqual(1)(
        path(['c', '2', '0', 'a'])(
        p));
      });
      return test('path 12', function(){
        return expectToEqual(void 8)(
        path(['c', 'date'])(
        p));
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
  describe('append', function(){
    var fn, dir, mut;
    fn = append;
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
      res = append(4)(
      [3]);
      return expect(res).toEqual([3, 4]);
    });
  });
  describe('appendM', function(){
    var fn, dir, mut;
    fn = appendM;
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
      res = appendM(3)(
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
  describe('prepend', function(){
    var fn, dir, mut;
    fn = prepend;
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
      res = prepend(3)(
      [4]);
      return expect(res).toEqual([3, 4]);
    });
  });
  describe('prependM', function(){
    var fn, dir, mut;
    fn = prependM;
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
      res = prependM(4)(
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
  describe('concat', function(){
    var fn, dir, mut;
    fn = concat;
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
        return concat(tgt)(
        src);
      }).toThrow();
    });
    return test('alias', function(){
      expectToEqual(concat)(
      precatTo);
      return expectToEqual(concatTo)(
      precat);
    });
  });
  describe('concatM', function(){
    var fn, dir, mut;
    fn = concatM;
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
    test('discards non-own vals on src', function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create;
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
    test('discards non-own vals on tgt', function(){
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
  describe('merge', function(){
    var fn, dir, mut;
    fn = merge;
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
    test('discards non-own vals on src', function(){
      var x$, tgt, y$, src, res;
      x$ = tgt = Object.create;
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
    test('discards non-own vals on tgt', function(){
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
  describe('mergeM', function(){
    var fn, dir, mut;
    fn = mergeM;
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
  describe('mergeToWith', function(){
    var tgt, src, noop;
    noop = function(){};
    describe('main', function(){
      var src, tgt;
      beforeEach(function(){
        var x$, y$;
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
        return y$;
      });
      test('when no collisions, acts like mergeTo M', function(){
        return expectToEqual(mergeToM(tgt)(
        src))(
        mergeToWithNoopM(tgt)(
        src));
      });
      test('when no collisions, acts like mergeTo M in', function(){
        return expectToEqual(mergeInToM(tgt)(
        src))(
        mergeInToWithNoopM(tgt)(
        src));
      });
      test('when no collisions, acts like mergeTo', function(){
        return expectToEqual(mergeTo(tgt)(
        src))(
        mergeToWithNoop(tgt)(
        src));
      });
      return test('when no collisions, acts like mergeTo in', function(){
        return expectToEqual(mergeInTo(tgt)(
        src))(
        mergeInToWithNoop(tgt)(
        src));
      });
    });
    describe('with + when', function(){
      var tgt, src, srcOdd, srcEven, tgtOdd, tgtEven;
      srcOdd = function(a, b){
        return odd(a);
      };
      srcEven = function(a, b){
        return even(a);
      };
      tgtOdd = function(a, b){
        return odd(b);
      };
      tgtEven = function(a, b){
        return even(b);
      };
      describe('with then when', function(){
        return;
        beforeEach(function(){
          var x$, y$;
          x$ = tgt = Object.create({
            hidden: 43
          });
          x$.a = 20;
          x$.b = 20;
          y$ = src = Object.create({
            hidden: 42
          });
          y$.b = 11;
          y$.c = 12;
          return y$;
        });
        test('with then when', function(){
          var merger;
          merger = mergeWhen(srcOdd)(
          mergeWith(chooseSrc)(
          mergeM));
          merger(src)(
          tgt);
          return expectToEqual({
            a: 20,
            b: 11
          })(
          tgt);
        });
        test('when test is applied before with test', function(){
          var x$, y$, merger;
          x$ = tgt = Object.create({
            hidden: 43
          });
          x$.a = 20;
          x$.b = 21;
          y$ = src = Object.create({
            hidden: 42
          });
          y$.b = 10;
          y$.c = 12;
          merger = mergeWhen(srcOdd)(
          mergeWith(chooseSrc)(
          mergeM));
          merger(src)(
          tgt);
          return expectToEqual({
            a: 20,
            b: 21
          })(
          tgt);
        });
        test('when test is applied before with test, 2', function(){
          var x$, y$, merger;
          x$ = tgt = Object.create({
            hidden: 43
          });
          x$.a = 20;
          x$.b = 20;
          y$ = src = Object.create({
            hidden: 42
          });
          y$.b = 10;
          y$.c = 12;
          merger = mergeWhen(srcEven)(
          mergeWith(chooseSrc)(
          mergeM));
          merger(src)(
          tgt);
          return expectToEqual({
            a: 20,
            b: 10,
            c: 12
          })(
          tgt);
        });
        test('when test is applied before with test, 3', function(){
          var x$, y$, merger;
          x$ = tgt = Object.create({
            hidden: 43
          });
          x$.a = 20;
          x$.b = 21;
          y$ = src = Object.create({
            hidden: 42
          });
          y$.b = 10;
          y$.c = 12;
          merger = mergeWhen(srcOdd)(
          mergeWith(chooseSrc)(
          mergeM));
          merger(src)(
          tgt);
          return expectToEqual({
            a: 20,
            b: 21
          })(
          tgt);
        });
        return test('when test is applied before with test, 4', function(){
          var x$, y$, merger;
          x$ = tgt = Object.create({
            hidden: 43
          });
          x$.a = 20;
          x$.b = 20;
          y$ = src = Object.create({
            hidden: 42
          });
          y$.b = 11;
          y$.c = 12;
          merger = mergeWhen(srcEven)(
          mergeWith(chooseSrc)(
          mergeM));
          merger(src)(
          tgt);
          return expectToEqual({
            a: 20,
            b: 20,
            c: 12
          })(
          tgt);
        });
      });
      return describe('when then with', function(){
        return;
        test('with then when', function(){
          var x$, y$, merger;
          x$ = tgt = Object.create({
            hidden: 43
          });
          x$.a = 20;
          x$.b = 20;
          y$ = src = Object.create({
            hidden: 42
          });
          y$.b = 11;
          y$.c = 12;
          merger = mergeWith(chooseSrc)(
          mergeWhen(srcOdd)(
          mergeM));
          merger(src)(
          tgt);
          return expectToEqual({
            a: 20,
            b: 11
          })(
          tgt);
        });
        test('when test is applied before with test', function(){
          var x$, y$, merger;
          x$ = tgt = Object.create({
            hidden: 43
          });
          x$.a = 20;
          x$.b = 21;
          y$ = src = Object.create({
            hidden: 42
          });
          y$.b = 10;
          y$.c = 12;
          merger = mergeWith(chooseSrc)(
          mergeWhen(srcOdd)(
          mergeM));
          merger(src)(
          tgt);
          return expectToEqual({
            a: 20,
            b: 21
          })(
          tgt);
        });
        test('when test is applied before with test, 2', function(){
          var x$, y$, merger;
          x$ = tgt = Object.create({
            hidden: 43
          });
          x$.a = 20;
          x$.b = 20;
          y$ = src = Object.create({
            hidden: 42
          });
          y$.b = 10;
          y$.c = 12;
          merger = mergeWith(chooseSrc)(
          mergeWhen(srcEven)(
          mergeM));
          merger(src)(
          tgt);
          return expectToEqual({
            a: 20,
            b: 10,
            c: 12
          })(
          tgt);
        });
        test('when test is applied before with test, 3', function(){
          var x$, y$, merger;
          x$ = tgt = Object.create({
            hidden: 43
          });
          x$.a = 20;
          x$.b = 21;
          y$ = src = Object.create({
            hidden: 42
          });
          y$.b = 10;
          y$.c = 12;
          merger = mergeWith(chooseSrc)(
          mergeWhen(srcOdd)(
          mergeM));
          merger(src)(
          tgt);
          return expectToEqual({
            a: 20,
            b: 21
          })(
          tgt);
        });
        return test('when test is applied before with test, 4', function(){
          var x$, y$, merger;
          x$ = tgt = Object.create({
            hidden: 43
          });
          x$.a = 20;
          x$.b = 20;
          y$ = src = Object.create({
            hidden: 42
          });
          y$.b = 11;
          y$.c = 12;
          merger = mergeWith(chooseSrc)(
          mergeWhen(tgtEven)(
          mergeM));
          merger(src)(
          tgt);
          return expectToEqual({
            a: 20,
            b: 20,
            c: 12
          })(
          tgt);
        });
      });
    });
    describe('collisions', function(){
      var tgt, src;
      beforeEach(function(){
        var x$, y$;
        x$ = tgt = Object.create({
          hidden: 43
        });
        x$.a = 'target a';
        x$.b = 'target b';
        y$ = src = Object.create({
          hidden: 42
        });
        y$.b = 'source b';
        y$.c = 'source c';
        return y$;
      });
      test('choose target M', function(){
        mergeToChooseTgtM(tgt)(
        src);
        return expectToEqual({
          a: 'target a',
          b: 'target b',
          c: 'source c'
        })(
        tgt);
      });
      test('choose source M', function(){
        mergeToChooseSrcM(tgt)(
        src);
        return expectToEqual({
          a: 'target a',
          b: 'source b',
          c: 'source c'
        })(
        tgt);
      });
      test('choose target', function(){
        return expectToEqual({
          a: 'target a',
          b: 'target b',
          c: 'source c'
        })(
        mergeToChooseTgt(tgt)(
        src));
      });
      test('choose source', function(){
        return expectToEqual({
          a: 'target a',
          b: 'source b',
          c: 'source c'
        })(
        mergeToChooseSrc(tgt)(
        src));
      });
      test('choose target M in', function(){
        mergeInToChooseTgtM(tgt)(
        src);
        return expectToEqual({
          a: 'target a',
          b: 'target b',
          c: 'source c',
          hidden: 43
        })(
        tgt);
      });
      test('choose source M in', function(){
        mergeInToChooseSrcM(tgt)(
        src);
        return expectToEqual({
          a: 'target a',
          b: 'source b',
          c: 'source c',
          hidden: 42
        })(
        tgt);
      });
      test('choose target in', function(){
        return expectToEqual({
          a: 'target a',
          b: 'target b',
          c: 'source c',
          hidden: 43
        })(
        mergeInToChooseTgt(tgt)(
        src));
      });
      return test('choose source in', function(){
        return expectToEqual({
          a: 'target a',
          b: 'source b',
          c: 'source c',
          hidden: 42
        })(
        mergeInToChooseSrc(tgt)(
        src));
      });
    });
    return describe('no collision', function(){
      var tgt, src;
      beforeEach(function(){
        var x$, y$;
        x$ = tgt = Object.create({
          hidden: 43
        });
        x$.a = 'target a';
        x$.b = 'target b';
        y$ = src = Object.create({
          hidden: 42
        });
        y$.c = 'source c';
        return y$;
      });
      test('collision f is not called M', function(){
        mergeToWithNullM(tgt)(
        src);
        return expectToEqual({
          a: 'target a',
          b: 'target b',
          c: 'source c'
        })(
        tgt);
      });
      return test('collision f is not called', function(){
        return expectToEqual({
          a: 'target a',
          b: 'target b',
          c: 'source c'
        })(
        mergeToWithNull(tgt)(
        src));
      });
    });
  });
  describe('mergeWith', function(){
    var tgt, src, noop;
    noop = function(){};
    describe('main', function(){
      beforeEach(function(){
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
        return y$;
      });
      test('when no collisions, acts like merge M', function(){
        return expectToEqual(mergeM(src)(
        tgt))(
        mergeWithNoopM(src)(
        tgt));
      });
      test('when no collisions, acts like merge', function(){
        return expectToEqual(merge(src)(
        tgt))(
        mergeWithNoop(src)(
        tgt));
      });
      test('when no collisions, acts like merge M in', function(){
        return expectToEqual(mergeInM(src)(
        tgt))(
        mergeInWithNoopM(src)(
        tgt));
      });
      return test('when no collisions, acts like merge in', function(){
        return expectToEqual(mergeIn(src)(
        tgt))(
        mergeInWithNoop(src)(
        tgt));
      });
    });
    describe('collisions', function(){
      var tgt, src;
      beforeEach(function(){
        var x$, y$;
        x$ = tgt = Object.create({
          hidden: 43
        });
        x$.a = 'target a';
        x$.b = 'target b';
        y$ = src = Object.create({
          hidden: 42
        });
        y$.b = 'source b';
        y$.c = 'source c';
        return y$;
      });
      test('choose target M', function(){
        mergeChooseTgtM(src)(
        tgt);
        return expectToEqual({
          a: 'target a',
          b: 'target b',
          c: 'source c'
        })(
        tgt);
      });
      test('choose source M', function(){
        mergeChooseSrcM(src)(
        tgt);
        return expectToEqual({
          a: 'target a',
          b: 'source b',
          c: 'source c'
        })(
        tgt);
      });
      test('choose target', function(){
        return expectToEqual({
          a: 'target a',
          b: 'target b',
          c: 'source c'
        })(
        mergeChooseTgt(src)(
        tgt));
      });
      test('choose source', function(){
        return expectToEqual({
          a: 'target a',
          b: 'source b',
          c: 'source c'
        })(
        mergeChooseSrc(src)(
        tgt));
      });
      test('choose target M in', function(){
        mergeInChooseTgtM(src)(
        tgt);
        return expectToEqual({
          a: 'target a',
          b: 'target b',
          c: 'source c',
          hidden: 43
        })(
        tgt);
      });
      test('choose source M in', function(){
        mergeInChooseSrcM(src)(
        tgt);
        return expectToEqual({
          a: 'target a',
          b: 'source b',
          c: 'source c',
          hidden: 42
        })(
        tgt);
      });
      test('choose target in', function(){
        return expectToEqual({
          a: 'target a',
          b: 'target b',
          c: 'source c',
          hidden: 43
        })(
        mergeInChooseTgt(src)(
        tgt));
      });
      return test('choose source', function(){
        return expectToEqual({
          a: 'target a',
          b: 'source b',
          c: 'source c',
          hidden: 42
        })(
        mergeInChooseSrc(src)(
        tgt));
      });
    });
    return describe('no collision', function(){
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
      test('proto chain of target is not checked M', function(){
        mergeWithNullM(src)(
        tgt);
        return expectToEqual({
          a: 'target a',
          b: 'source b',
          c: 'source c',
          hidden: 'source hidden'
        })(
        tgt);
      });
      return test('proto chain of target is not checked', function(){
        return expectToEqual({
          a: 'target a',
          b: 'source b',
          c: 'source c',
          hidden: 'source hidden'
        })(
        mergeWithNull(src)(
        tgt));
      });
    });
  });
  describe('mergeToIn', function(){
    var fn, dir, mut;
    fn = mergeInTo;
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
  describe('mergeIn', function(){
    var fn, dir, mut;
    fn = mergeIn;
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
  describe('merge*WhenM', function(){
    var base, tgt, src, srcOk, tgtOk;
    base = {
      baseVal: 10
    };
    srcOk = function(s, _){
      return s != null;
    };
    tgtOk = function(_, t){
      return t != null;
    };
    beforeEach(function(){
      var ref$;
      tgt = (ref$ = Object.create(base), ref$.a = 1, ref$.b = 2, ref$.c = null, ref$);
      return src = (ref$ = Object.create(base), ref$.a = 3, ref$.b = null, ref$.c = 4, ref$);
    });
    test(1, function(){
      mergeToWhenSrcOkM(tgt)(
      src);
      return expectToEqual({
        a: 3,
        b: 2,
        c: 4
      })(
      tgt);
    });
    test(2, function(){
      mergeToWhenTgtOkM(tgt)(
      src);
      return expectToEqual({
        a: 3,
        b: null,
        c: null
      })(
      tgt);
    });
    test(3, function(){
      mergeWhenSrcOkM(src)(
      tgt);
      return expectToEqual({
        a: 3,
        b: 2,
        c: 4
      })(
      tgt);
    });
    return test(4, function(){
      mergeWhenTgtOkM(src)(
      tgt);
      return expectToEqual({
        a: 3,
        b: null,
        c: null
      })(
      tgt);
    });
  });
  describe('merge*When', function(){
    var base, tgt, ref$, src;
    base = {
      baseVal: 10
    };
    tgt = (ref$ = Object.create(base), ref$.a = 1, ref$.b = 2, ref$.c = null, ref$);
    src = (ref$ = Object.create(base), ref$.a = 3, ref$.b = null, ref$.c = 4, ref$);
    test(1, function(){
      return expectToEqual({
        a: 3,
        b: 2,
        c: 4
      })(
      mergeToWhenSrcOk(tgt)(
      src));
    });
    test(2, function(){
      return expectToEqual({
        a: 3,
        b: null,
        c: null
      })(
      mergeToWhenTgtOk(tgt)(
      src));
    });
    test(3, function(){
      return expectToEqual({
        a: 3,
        b: 2,
        c: 4
      })(
      mergeWhenSrcOk(src)(
      tgt));
    });
    return test(4, function(){
      return expectToEqual({
        a: 3,
        b: null,
        c: null
      })(
      mergeWhenTgtOk(src)(
      tgt));
    });
  });
  describe('mergeToInM', function(){
    var fn, dir, mut;
    fn = mergeInToM;
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
  describe('mergeInM', function(){
    var fn, dir, mut;
    fn = mergeInM;
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
describe('discard / flatten prototype', function(){
  describe('discardPrototype', function(){
    var base, base2, obj, after;
    base = {
      baseVal: 10
    };
    base2 = Object.create(base);
    obj = Object.create(base2);
    expectToEqual(10)(
    obj.baseVal);
    after = discardPrototype(
    obj);
    expectNotToBe(obj)(
    after);
    expectToEqual(false)(
    'baseVal' in after);
    return expectToEqual(void 8)(
    after.baseVal);
  });
  return describe('flattenPrototype', function(){
    var x$, base, y$, base2, z$, obj, after;
    x$ = base = Object.create({
      baseVal: 10
    });
    x$.feets = 'sometimes';
    y$ = base2 = Object.create(base);
    y$.hands = 'mostways';
    z$ = obj = Object.create(base2);
    z$.legs = 'noo';
    expectToEqual(10)(
    obj.baseVal);
    after = flattenPrototype(
    obj);
    expectToEqual(true)(
    'baseVal' in after);
    return expectToEqual({
      baseVal: 10,
      feets: 'sometimes',
      hands: 'mostways',
      legs: 'noo'
    })(
    after);
  });
});
describe('mapPairs', function(){
  return;
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
  return;
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
describe('asterisk', function(){
  test(1, function(){
    var this$ = this;
    return expectToEqual([2])(
    asterisk1((function(it){
      return it * 2;
    }))(
    1));
  });
  return test('n', function(){
    var this$ = this;
    return expectToEqual([2, 3, 1.5])(
    asteriskN([
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
describe('ampersand', function(){
  return test(1, function(){
    var this$ = this;
    return expectToEqual([20, 11, 5])(
    ampersandN([
      (function(it){
        return it * 2;
      }), (function(it){
        return it + 1;
      }), (function(it){
        return it / 2;
      })
    ])(
    10));
  });
});
describe('argx', function(){
  test('arg0', function(){
    return expectToEqual(1)(
    arg0(1));
  });
  test('arg1', function(){
    return expectToEqual(2)(
    arg1(1, 2));
  });
  test('arg2', function(){
    return expectToEqual(3)(
    arg2(1, 2, 3));
  });
  test('arg3', function(){
    return expectToEqual(4)(
    arg3(1, 2, 3, 4));
  });
  test('arg4', function(){
    return expectToEqual(5)(
    arg4(1, 2, 3, 4, 5));
  });
  test('arg5', function(){
    return expectToEqual(6)(
    arg5(1, 2, 3, 4, 5, 6));
  });
  return test('arg6', function(){
    return expectToEqual(7)(
    arg6(1, 2, 3, 4, 5, 6, 7));
  });
});