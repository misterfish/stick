var ref$, assoc, assocPath, head, tail, reduceRight, chain, identity, reduce, map, filter, join, split, rProp, rPath, rDefaultTo, curry, each, complement, isNil, rRepeat, rTimes, reverse, tap, flip, keys, zip, list, test, xtest, expectToEqual, expectToBe, factory, factoryInit, factoryProps, factoryStatics, numKeys, this$ = this, toString$ = {}.toString;
ref$ = require('ramda'), assoc = ref$.assoc, assocPath = ref$.assocPath, head = ref$.head, tail = ref$.tail, reduceRight = ref$.reduceRight, chain = ref$.chain, identity = ref$.identity, reduce = ref$.reduce, map = ref$.map, filter = ref$.filter, join = ref$.join, split = ref$.split, rProp = ref$.prop, rPath = ref$.path, rDefaultTo = ref$.defaultTo, curry = ref$.curry, each = ref$.forEach, complement = ref$.complement, isNil = ref$.isNil, rRepeat = ref$.repeat, rTimes = ref$.times, reverse = ref$.reverse, tap = ref$.tap, flip = ref$.flip, keys = ref$.keys, zip = ref$.zip;
ref$ = require('./common'), list = ref$.list, test = ref$.test, xtest = ref$.xtest, expectToEqual = ref$.expectToEqual, expectToBe = ref$.expectToBe;
ref$ = require('../index'), factory = ref$.factory, factoryInit = ref$.factoryInit, factoryProps = ref$.factoryProps, factoryStatics = ref$.factoryStatics;
numKeys = compose$(keys, function(it){
  return it.length;
});
describe('factory ', function(){
  var dogSpeak, getDogProto, dogProto, dogProps;
  dogSpeak = function(){
    if (this.loud) {
      return 'WOOF';
    } else {
      return 'woof';
    }
  };
  getDogProto = function(){
    return {
      speak: dogSpeak
    };
  };
  dogProto = getDogProto();
  dogProps = {
    loud: void 8
  };
  describe('factoryInit', function(){
    describe('noop init', function(){
      var dogFactory, dog;
      dogFactory = factoryInit(function(){})(
      dogProto);
      dog = dogFactory.create();
      beforeEach(function(){
        return dog.loud = false;
      });
      test(1, function(){
        expectToEqual('woof')(
        dog.speak());
        dog.loud = true;
        return expectToEqual('WOOF')(
        dog.speak());
      });
      return test(2, function(){
        var pug;
        pug = factoryInit(function(){})(
        dogFactory.proto).create();
        return expectToEqual('woof')(
        pug.speak());
      });
    });
    return describe('init', function(){
      var init, dogFactory;
      init = function(o, props){
        return o.loud = props.loud;
      };
      dogFactory = factoryInit(init)(
      dogProto);
      test(1, function(){
        var dog1, dog2;
        dog1 = dogFactory.create({
          loud: false
        });
        expectToEqual('woof')(
        dog1.speak());
        dog2 = dogFactory.create({
          loud: true
        });
        return expectToEqual('WOOF')(
        dog2.speak());
      });
      test('factory proto prop', function(){
        return expectToEqual(dogProto)(
        dogFactory.proto);
      });
      test('manual extend', function(){
        var pugProto, ref$, pug;
        pugProto = (ref$ = import$({}, dogProto), ref$.isPug = function(){
          return true;
        }, ref$);
        pug = factoryInit(init)(
        pugProto).create({
          loud: true
        });
        expectToEqual('WOOF')(
        pug.speak());
        return expectToEqual(true)(
        pug.isPug());
      });
      test('instance spec not altered', function(){
        var spec, dog1;
        spec = {
          loud: true
        };
        dog1 = dogFactory.create(spec);
        expectToEqual('WOOF')(
        dog1.speak());
        return expectToEqual({
          loud: true
        })(
        spec);
      });
      return test('proto not altered', function(){
        var dog1;
        dog1 = dogFactory.create({
          loud: true
        });
        expectToEqual('WOOF')(
        dog1.speak());
        return expectToEqual(getDogProto())(
        dogFactory.proto);
      });
    });
  });
  describe('factory', function(){
    describe('factory', function(){
      var dogFactory;
      dogFactory = factory(
      dogProto);
      test(1, function(){
        var dog1, dog2;
        dog1 = dogFactory.create({
          loud: false
        });
        expectToEqual('woof')(
        dog1.speak());
        dog2 = dogFactory.create({
          loud: true
        });
        return expectToEqual('WOOF')(
        dog2.speak());
      });
      test('factory proto prop', function(){
        return expectToEqual(dogProto)(
        dogFactory.proto);
      });
      test('manual extend', function(){
        var pugProto, ref$, pug;
        pugProto = (ref$ = import$({}, dogProto), ref$.isPug = function(){
          return true;
        }, ref$);
        pug = factory(
        pugProto).create({
          loud: true
        });
        expectToEqual('WOOF')(
        pug.speak());
        return expectToEqual(true)(
        pug.isPug());
      });
      test('null/undef props', function(){
        var dog1, dog2, dog3;
        dog1 = dogFactory.create(null);
        expectToEqual('woof')(
        dog1.speak());
        dog2 = dogFactory.create(void 8);
        expectToEqual('woof')(
        dog2.speak());
        dog3 = dogFactory.create();
        return expectToEqual('woof')(
        dog3.speak());
      });
      test('props: only own get copied', function(){
        var propsBase, x$, props, dog;
        propsBase = {
          baseVal: 15
        };
        x$ = props = Object.create(propsBase);
        x$.loud = true;
        dog = dogFactory.create(props);
        expectToEqual('WOOF')(
        dog.speak());
        expectToEqual(true)(
        dog.loud);
        return expectToEqual(void 8)(
        dog.baseVal);
      });
      test('proto not altered', function(){
        var props, dog;
        props = {
          loud: true
        };
        dog = dogFactory.create(props);
        expectToEqual('WOOF')(
        dog.speak());
        return expectToEqual(dogProto)(
        dogFactory.proto);
      });
      return test('props not altered', function(){
        var props, dog;
        props = {
          loud: true
        };
        dog = dogFactory.create(props);
        expectToEqual('WOOF')(
        dog.speak());
        return expectToEqual({
          loud: true
        })(
        props);
      });
    });
    describe('factoryProps', function(){
      var base, x$, propsLoud, propsSoftX, dogFactory;
      base = {
        baseVal: 10
      };
      x$ = propsLoud = Object.create(base);
      x$.loud = true;
      propsSoftX = Object.create({
        loud: false
      });
      dogFactory = factoryProps(propsLoud)(
      factory(
      dogProto));
      test('no props in create', function(){
        var dog1;
        dog1 = dogFactory.create();
        return expectToEqual('WOOF')(
        dog1.speak());
      });
      test('null/undef props in create', function(){
        var dog1, dog2;
        dog1 = dogFactory.create(null);
        expectToEqual('WOOF')(
        dog1.speak());
        dog2 = dogFactory.create(void 8);
        return expectToEqual('WOOF')(
        dog2.speak());
      });
      test('only own props in factory props get copied', function(){
        var dog1;
        dog1 = dogFactory.create();
        expectToEqual('WOOF')(
        dog1.speak());
        return expectToEqual(void 8)(
        dog1.baseVal);
      });
      test('props in create override props in factoryProps', function(){
        var dog;
        dog = dogFactory.create({
          loud: false
        });
        return expectToEqual('woof')(
        dog.speak());
      });
      test('... but only own props in the create props', function(){
        var dog;
        dog = dogFactory.create(propsSoftX);
        return expectToEqual('WOOF')(
        dog.speak());
      });
      test('... and only if they are not null/undef', function(){
        var dog;
        dog = dogFactory.create({
          loud: null
        });
        return expectToEqual('WOOF')(
        dog.speak());
      });
      test('proto not altered', function(){
        var props, dog;
        props = {
          loud: true
        };
        dog = dogFactory.create(props);
        expectToEqual('WOOF')(
        dog.speak());
        return expectToEqual(dogProto)(
        dogFactory.proto);
      });
      return test('neither props object altered', function(){
        var props, dog;
        props = {
          loud: true
        };
        dog = dogFactory.create(props);
        expectToEqual('WOOF')(
        dog.speak());
        expectToEqual({
          loud: true
        })(
        props);
        expectToEqual({
          loud: true
        })(
        propsLoud);
        return expectToEqual(10)(
        propsLoud.baseVal);
      });
    });
    describe('factoryStatics', function(){
      var base, x$, statics, dogFactory;
      base = {
        baseVal: 10
      };
      x$ = statics = Object.create(base);
      x$.numLegs = function(){
        return 4;
      };
      dogFactory = factoryStatics(statics)(
      factory(
      dogProto));
      test(1, function(){
        var dog;
        dog = dogFactory.create();
        expectToEqual('woof')(
        dog.speak());
        return expectToEqual(4)(
        dogFactory.numLegs());
      });
      return test('only own properties in the statics object', function(){
        var dog;
        dog = dogFactory.create();
        expectToEqual('woof')(
        dog.speak());
        expectToEqual(4)(
        dogFactory.numLegs());
        return expectToEqual(void 8)(
        dogFactory.baseVal);
      });
    });
    xtest('proto', function(){
      expectToEqual('Function')(
      toString$.call(proto.ooze).slice(8, -1));
      expectToEqual('Function')(
      toString$.call(proto.walk).slice(8, -1));
      return expectToEqual('Function')(
      toString$.call(proto.confess).slice(8, -1));
    });
    xtest('instance spec not altered', function(){
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
    return xtest('proto chain multi-level', function(){
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
    xtest('instance spec, and mixins pre, right order', function(){
      expectToEqual('I am red')(
      redAnimal.confess());
      expectToEqual('topper hop')(
      redAnimal.hop());
      expectToEqual('topper top')(
      redAnimal.top());
      return expectToEqual('walker pop')(
      redAnimal.pop());
    });
    return xtest("mixins pre doesn't clobber", function(){
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
    xtest('instance spec, and mixins post, right order', function(){
      expectToEqual('I am red')(
      redAnimal.confess());
      expectToEqual('topper hop')(
      redAnimal.hop());
      expectToEqual('topper top')(
      redAnimal.top());
      return expectToEqual('walker pop')(
      redAnimal.pop());
    });
    xtest("mixins post does clobber", function(){
      return expectToEqual('walker walk')(
      redAnimal.walk());
    });
    return xtest('mixins not altered', function(){
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
    xtest('instance spec', function(){
      var redAnimal;
      redAnimal = create({
        color: 'red'
      });
      return expectToEqual('I am red')(
      redAnimal.confess());
    });
    xtest('instance spec, multiple', function(){
      var redAnimal;
      redAnimal = create({
        color: 'red'
      }, {
        color: 'blue'
      });
      return expectToEqual('I am blue')(
      redAnimal.confess());
    });
    return xtest('instance spec, multiple, prototypes discarded', function(){
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
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}