var fs, map, list, test, xtest, beforeAll, beforeEach, toEqual, toBe, toThrow, toThrowA, expectToEqual, expectToBe, expectNotToEqual, expectNotToBe, expectOk, expectToMatchRegex, expectToBeInstanceOf, expectConstructorNameToBe, expectToReject, expectToRejectWith, expectToThrow, expectToThrowA, expectNotToThrow, zipAll, rmIfExists, out$ = typeof exports != 'undefined' && exports || this;
fs = require('fs');
map = require('ramda').map;
list = function(){
  var i$, x$, len$, results$ = [];
  for (i$ = 0, len$ = (arguments).length; i$ < len$; ++i$) {
    x$ = (arguments)[i$];
    results$.push(x$);
  }
  return results$;
};
test = curry$(function(desc, theTest){
  return global.it(desc, theTest);
});
xtest = curry$(function(desc, theTest){
  return global.xit(desc, theTest);
});
beforeAll = global.beforeAll, beforeEach = global.beforeEach;
toEqual = curry$(function(v, o){
  return o.toEqual(v);
});
toBe = curry$(function(v, o){
  return o.toBe(v);
});
toThrow = function(o){
  return o.toThrow();
};
toThrowA = curry$(function(v, o){
  return o.toThrow(v);
});
expectToEqual = curry$(function(expected, received){
  return toEqual(expected)(
  expect(
  received));
});
expectToBe = curry$(function(expected, received){
  return toBe(expected)(
  expect(
  received));
});
expectNotToEqual = curry$(function(expected, received){
  return expect(received).not.toEqual(expected);
});
expectNotToBe = curry$(function(expected, received){
  return expect(received).not.toBe(expected);
});
expectOk = function(received){
  return expectToEqual(expect.anything())(
  received);
};
expectToMatchRegex = curry$(function(regex, received){
  return expect(received).toEqual(expect.stringMatching(regex));
});
expectToBeInstanceOf = curry$(function(expected, received){
  return expect(received).toBeInstanceOf(expected);
});
expectConstructorNameToBe = curry$(function(expected, received){
  return expectToBe(expected)(
  received.constructor.name);
});
expectToReject = function(fn){
  var res;
  res = [false];
  return fn()['catch'](function(){
    return res[0] = true;
  }).then(function(){
    return expectToBe(true)(
    res[0]);
  });
};
expectToRejectWith = curry$(function(catcher, fn){
  return fn().then(function(){
    return expectToBe(true)(
    false);
  })['catch'](catcher);
});
expectToThrow = function(fn){
  return toThrow(
  expect(
  fn));
};
expectToThrowA = curry$(function(errorType, fn){
  return toThrowA(errorType)(
  expect(
  fn));
});
expectNotToThrow = function(fn){
  fn();
  return expectToBe(true)(
  true);
};
zipAll = function(){
  var xss, res$, i$, to$, ret, l, i;
  res$ = [];
  for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
    res$.push(arguments[i$]);
  }
  xss = res$;
  ret = [];
  l = xss[0].length;
  for (i$ = 0, to$ = l - 1; i$ <= to$; ++i$) {
    i = i$;
    ret.push(map(fn$)(
    xss));
  }
  return ret;
  function fn$(xs){
    return xs[i];
  }
};
rmIfExists = function(filepath, arg$){
  var verbose, ref$;
  verbose = (ref$ = (arg$ != null
    ? arg$
    : {}).verbose) != null ? ref$ : false;
  if (!fs.existsSync(filepath)) {
    return;
  }
  if (verbose) {
    console.log('Removing ', filepath);
  }
  return fs.unlinkSync(filepath);
};
describe('dummy', function(){
  return test('dummy', function(){});
});
out$.list = list;
out$.test = test;
out$.xtest = xtest;
out$.beforeAll = beforeAll;
out$.beforeEach = beforeEach;
out$.rmIfExists = rmIfExists;
out$.zipAll = zipAll;
out$.expectToEqual = expectToEqual;
out$.expectToBe = expectToBe;
out$.expectOk = expectOk;
out$.expectNotToEqual = expectNotToEqual;
out$.expectNotToBe = expectNotToBe;
out$.expectToReject = expectToReject;
out$.expectToRejectWith = expectToRejectWith;
out$.expectToMatchRegex = expectToMatchRegex;
out$.expectToThrow = expectToThrow;
out$.expectToThrowA = expectToThrowA;
out$.expectNotToThrow = expectNotToThrow;
out$.expectToBeInstanceOf = expectToBeInstanceOf;
out$.expectConstructorNameToBe = expectConstructorNameToBe;
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