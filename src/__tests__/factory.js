var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, keys, zip, list, test, xtest, expectToEqual, expectToBe, factory, numKeys, this$ = this, toString$ = {}.toString;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, keys = ref$.keys, zip = ref$.zip;
ref$ = require('./common'), list = ref$.list, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
factory = require('../index').factory;
numKeys = compose$(keys, function(it){
  return it.length;
});
describe('factory ', function(){
  var animalProto, init, testProtoUnaltered;
  init = function(){
    var prehistoricProto, ref$;
    prehistoricProto = {
      ooze: function(){
        return 'ooze';
      }
    };
    return animalProto = (ref$ = Object.create(prehistoricProto), ref$.walk = function(){
      return 'walk';
    }, ref$.confess = function(){
      return 'I am ' + this.color;
    }, ref$);
  };
  testProtoUnaltered = function(){
    return;
    expectToEqual('walk')(
    animalProto.walk());
    expectToEqual('Function')(
    toString$.call(animalProto.confess).slice(8, -1));
    expectToEqual('ooze')(
    animalProto.ooze());
    return expectToEqual(2)(
    numKeys(
    animalProto));
  };
  describe(1, function(){
    var proto, create;
    beforeEach(function(){
      var fact;
      init();
      fact = factory(animalProto);
      proto = fact.proto;
      return create = fact.create;
    });
    afterEach(function(){
      return testProtoUnaltered();
    });
    test('main', function(){
      var redAnimal, blueAnimal;
      redAnimal = create({
        color: 'red'
      });
      blueAnimal = create({
        color: 'blue'
      });
      expectToEqual('I am red')(
      redAnimal.confess());
      return expectToEqual('I am blue')(
      blueAnimal.confess());
    });
    test('proto', function(){
      expectToEqual('Function')(
      toString$.call(proto.ooze).slice(8, -1));
      expectToEqual('Function')(
      toString$.call(proto.walk).slice(8, -1));
      return expectToEqual('Function')(
      toString$.call(proto.confess).slice(8, -1));
    });
    test('instance spec not altered', function(){
      var instanceSpec, redAnimal;
      instanceSpec = {
        color: 'red'
      };
      redAnimal = create(instanceSpec);
      return expectToEqual({
        color: 'red'
      })(
      instanceSpec);
    });
    return test('proto chain multi-level', function(){
      var redAnimal;
      redAnimal = create({
        color: 'red'
      });
      return expectToEqual('ooze')(
      redAnimal.ooze());
    });
  });
  describe('mixins pre', function(){
    var proto, create, redAnimal, hopper, topper, walker;
    beforeEach(function(){
      var fact;
      init();
      fact = factory(animalProto, [hopper, topper, walker]);
      proto = fact.proto;
      create = fact.create;
      return redAnimal = create({
        color: 'red'
      });
    });
    afterEach(function(){
      return testProtoUnaltered();
    });
    hopper = {
      hop: function(){
        return 'hopper hop';
      }
    };
    topper = {
      hop: function(){
        return 'topper hop';
      },
      top: function(){
        return 'topper top';
      }
    };
    walker = {
      pop: function(){
        return 'walker pop';
      },
      walk: function(){
        return 'walker walk';
      }
    };
    test('instance spec, and mixins pre, right order', function(){
      expectToEqual('I am red')(
      redAnimal.confess());
      expectToEqual('topper hop')(
      redAnimal.hop());
      expectToEqual('topper top')(
      redAnimal.top());
      return expectToEqual('walker pop')(
      redAnimal.pop());
    });
    return test("mixins pre doesn't clobber", function(){
      return expectToEqual('walk')(
      redAnimal.walk());
    });
  });
  describe('mixins post', function(){
    var proto, create, redAnimal, hopper, topper, walker;
    beforeEach(function(){
      var fact;
      init();
      fact = factory(animalProto, [], [hopper, topper, walker]);
      proto = fact.proto;
      create = fact.create;
      return redAnimal = create({
        color: 'red'
      });
    });
    afterEach(function(){
      return testProtoUnaltered();
    });
    hopper = {
      hop: function(){
        return 'hopper hop';
      }
    };
    topper = {
      hop: function(){
        return 'topper hop';
      },
      top: function(){
        return 'topper top';
      }
    };
    walker = {
      pop: function(){
        return 'walker pop';
      },
      walk: function(){
        return 'walker walk';
      }
    };
    test('instance spec, and mixins post, right order', function(){
      expectToEqual('I am red')(
      redAnimal.confess());
      expectToEqual('topper hop')(
      redAnimal.hop());
      expectToEqual('topper top')(
      redAnimal.top());
      return expectToEqual('walker pop')(
      redAnimal.pop());
    });
    test("mixins post does clobber", function(){
      return expectToEqual('walker walk')(
      redAnimal.walk());
    });
    return test('mixins not altered', function(){
      expectToEqual(1)(
      numKeys(hopper));
      expectToEqual(2)(
      numKeys(topper));
      return expectToEqual(2)(
      numKeys(walker));
    });
  });
  return describe('instance extension', function(){
    var proto, create, redAnimal, hopper, topper, walker;
    beforeEach(function(){
      var fact;
      init();
      fact = factory(animalProto, [hopper, topper, walker], [hopper, topper, walker]);
      proto = fact.proto;
      return create = fact.create;
    });
    hopper = {
      hop: function(){
        return 'hopper hop';
      }
    };
    topper = {
      hop: function(){
        return 'topper hop';
      },
      top: function(){
        return 'topper top';
      }
    };
    walker = {
      pop: function(){
        return 'walker pop';
      },
      walk: function(){
        return 'walker walk';
      }
    };
    test('instance spec', function(){
      var redAnimal;
      redAnimal = create({
        color: 'red'
      });
      return expectToEqual('I am red')(
      redAnimal.confess());
    });
    test('instance spec, multiple', function(){
      var redAnimal;
      redAnimal = create({
        color: 'red'
      }, {
        color: 'blue'
      });
      return expectToEqual('I am blue')(
      redAnimal.confess());
    });
    return test('instance spec, multiple, prototypes discarded', function(){
      var x$, spec1, y$, spec2, redAnimal;
      x$ = spec1 = Object.create({
        hidden: 42
      });
      x$.color = 'red';
      x$['in'] = 'pines';
      y$ = spec2 = Object.create({
        hidden: 43
      });
      y$.color = 'blue';
      y$.out = 'leaves';
      redAnimal = create(spec1, spec2);
      expectToEqual('I am blue')(
      redAnimal.confess());
      return expectToEqual({
        'in': 'pines',
        out: 'leaves',
        color: 'blue'
      })(
      redAnimal);
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