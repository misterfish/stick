### Usage

#### ٭ node

	npm i stick-js # or yarn

	cat >.babelrc <<EOT
	{"presets": ["babel-preset-es2015", "stage-0"], "plugins": [
		"babel-plugin-operator-overload"
	]}
	EOT

	node_modules/.bin/babel -d lib src
	node lib/<entry-file>.js

#### ٭ webpack

##### webpack config:

	module: {
	  rules: [
		{
		  test: /\.js$/,
		  exclude: /node_modules/,
		  use: {
			loader: 'babel-loader',
			options: {
			  presets: [[
				"env",
				{ "modules": false },
			  ]],
			  plugins: [
				'operator-overload',
			  ]
			}
		  },
		},
		...
	  ]
	  ...
	  }

### What we provide

- A way to start using the pipe (or 'stick') operator today while 
  proposal
  [TC39/proposal-pipeline-operator](https://github.com/tc39/proposal-pipeline-operator)
  is still being fleshed out.

  Note that we use `|`, not `|>`, which is not only easier to overload but
  far more pleasant to work with, and which will still work even if/when the
  proposal is accepted.

- A toolkit of functions centered around this pattern, and a number of
  idioms which they facilitate.

  You can use our functions, or your own favorite library (Ramda, lodash/fp,
  etc.), or mix and match as you like.

The overloading is made possible thanks to the great
[babel-plugin-operator-overload](https://github.com/jussi-kalliokoski/babel-plugin-operator-overload)
library by Jussi Kalliokoski (@jussi-kalliokoski).

### Features (/ why?)

### Synopsis (overview of main features).

#### ٭ basic example ٭

    // --- source files must begin with this header.

	defineBinaryOperator ('|',  (...args) => pipe         (...args))
	defineBinaryOperator ('<<', (...args) => compose      (...args))
	defineBinaryOperator ('>>', (...args) => composeRight (...args))

	import {
		pipe, compose, composeRight,

	// --- /header

		map, join,
	} from 'stick-js'

	import { green, } from 'chalk'

	const { log, } = console

	; [1, 2, 3]
	| map (x => x + 1)
	| join ('/')
	| green
	| sprintf1 ('The answer is %s')
	| log // outputs 'The answer is 2/3/4' (colorfully)

#### ٭ the 'stick' operator ٭

`a | b` is simply an equivalent way of writing `b (a)`

A really simple idea, with pretty surprising consequences.

(What if I really want to do bitwise math, you ask? Don't worry, you still
can: see below).

    // --- reminder: source files must begin with this.
	// --- from here on out we'll omit it in the examples.
	defineBinaryOperator ('|',  (...args) => pipe         (...args))
	defineBinaryOperator ('<<', (...args) => compose      (...args))
	defineBinaryOperator ('>>', (...args) => composeRight (...args))

	import {
	  pipe, compose, composeRight,
	  map, join, split,
	} from 'stick-js'

	const multiply = x => y => x * y
	const double = multiply (2)     // or 2 | multiply

	3 | double                      // 6
	double (3)                      // 6
	3 | multiply (4)                // 12

    const capitaliseFirstLetter = x => x[0].toUpperCase () + x.slice (1)

	'just a perfect day'
	  | split (' ')                 // split (' ') is a function
	  | map (capitaliseFirstLetter) // map (capitaliseFirstLetter) is a function
	  | join (' ')                  // join (' ') is a function
    // 'Just A Perfect Day'

#### ٭ currying styles ٭

All curried functions provided by stick-js can be called using either of 2 currying styles.

This would be a good time to read up on curried functions if you're not familiar with them.

1. we will refer to this sort of function and calling style as 'manual':

		const f = a => b => c => a + b + c          // call like f (1) (2) (3)

2. and this sort as 'normal':

		const g = R.curry ((a, b, c) => a + b + c) // call like f (1) (2) (3) or f (1, 2, 3)
	                                               // or f (1, 2, 3)
                                                   // or f (1) (2, 3)
                                                   // etc.

Calling:

	import { map, } from 'stick-js'
	const double = x => x * 2

	map (double, [1, 2, 3])    // [2, 4, 6] (normal style)
	map (double) ([1, 2, 3])   // [2, 4, 6] (manual style)
	; [1, 2, 3] | map (double) // [2, 4, 6] (manual style with stick)

For extra performance you can also limit yourself to the manual style (see
below).

#### ٭ markers ٭

	import { sprintfN, sprintf1, } from 'stick-js'

	3 | sprintf1 ('4 - 1 is %s') // '4 - 1 is 3'

'N' is a marker meaning an array is expected.

	; [4, 3]
	| sprintfN ('%s - 1 is %s')  // same.

'V' means a value is expected, to disambiguate cases where a function also
fits.

	import { timesV, timesF, } from 'stick-js'

	const { random, } = Math

	3      | timesV (4)          // [3, 3, 3, 3]
	random | timesF (4)          // [<random-num>, <random-num>, <random-num>, <random-num>]

'M' means the data is being mutated. In JS we absolutely can not pretend
everything is immutable.

    import { appendTo, appendToM, } from 'stick-js'

	const a = [1, 2, 3]
	const b = 4 | appendTo (a) // functional style: the array is cloned.
	b === a // false

	const a = [1, 2, 3]
	const b = 4 | appendToM (a) // non-functional style: the array is mutated.
	b === a // true

	const webGLContext = { ... a complicated object ... }
	webGLContext | mergeM ({ someProp: false, }) // you definitely want mutable here.

And there are a few more which we'll see along the way.

#### ٭ ok, anaphoric if ٭

`ok (x)` is false if `x` is `null` or `undefined`. Everything else passes.

	import { map, ok, notOk, ifOk, } from 'stick-js'

	const { log, } = console

	; [0, false, '', null, void 8]
	| map (ok)    // [true, true, true, false, false]

	; [0, false, '', null, void 8]
	| map (notOk) // [false, false, false, true, true]

Something we see a lot in JS in the wild is:

	let answer
	if (someVar !== undefined && someVar !== null) {
	  answer = someVar + 1
	} else {
	  answer = 'nothing'
	}

This can vastly improved using an 'anaphoric if' and a stick idiom.
`ifOk` takes two functions -- a 'then' function and an 'else' function.
In the 'ok'	case, the value being tested is passed to the function.

	const add1IfYouCan = val => val | ifOk (
	  // `that` is here `val`
	  that => that + 1,

	  // no value is passed.
	  _ => 'nothing',
	)

A variant, using a point-free add function and the `always` function:

	import { add, always, } from 'stick-js'

	const add1 = 1 | add // or add (1)

	const add1IfYouCan = x => x | ifOk (
	  add1,
	  'nothing' | always,
	)

Usage:

	; [0, 10, null, void 8]
	| map (add1IfYouCan) // [1, 11, 'nothing', 'nothing']

#### ٭ point-free ٭

A common pattern is when the argument to a function is passed immediately into a pipe:

	const add1IfYouCan = x => x | ifOk (add1, 'nothing' | always)

Since `x` does not appear anywhere else in the expression, we can simply remove it, along with the function argument:

	const add1IfYouCan = ifOk (add1, 'nothing' | always)

If the pipe chain consists of more than 1 link …

	const { dot, sprintf1, tap, }
    const { log, } = console

    const add1IfYouCan = x => x
	  | ifOk (add1, 'nothing' | always)
	  | String                        // conversion using type constructor
	  | dot ('toUpperCase')
	  | sprintf1 ('The answer is %s')
	  | tap (log)                     // outputs 'The answer is 1', 'The answer is NOTHING', ...

… then we remove the `x => x` and change all the `|` to `>>`

    const add1IfYouCan =
	  ifOk (add1, 'nothing' | always)
	  >> String
	  >> dot ('toUpperCase')
	  >> sprintf1 ('The answer is %s')
	  >> tap (log)

The following pattern holds:

    a | b | c = a | (b >> c)

So when the chains start to get long (as above), you can cut pieces out
using this property. For example, you can refactor lines 2-4 into a new
function:

    // --- convert input to String, make uppercase, perform sprintf.
    const processString = String
	  >> dot ('toUpperCase')
	  >> sprintf1 ('The answer is %s')

	const add1IfYouCan = x => x
	  | ifOk (add1, 'nothing' | always)
	  | processString
	  | tap (log)
	  
Or

	const add1IfYouCan = ifOk (add1, 'nothing' | always)
	  >> processString
	  >> tap (log)

#### ٭ compositional predicates ٭

`ifOk` is a convenience for `ifPredicate (ok)` or `ok | ifPredicate`.

There is also a 'when' form, which has no 'else' branch.
	  
	import { add, whenOk, } from 'stick-js'

	const add1 = 1 | add // or add (1)

	3    | whenOk (add1) // 4
	null | whenOk (add1) // undefined

The selection of `if` and `when` functions we provide is intentionally skimpy, to encourage you to compose your own.

	const { floor, } = Math

	// --- predicate to match integers.
	const isInteger = x => x === floor (x)

	// --- or how about
	// import { eq, } from 'stick-js'
	// const isInteger = x => x | floor | eq (x)

	// --- or if you're getting bored:
	// import { timesV, asterisk, passToN, } from 'stick-js'
	// const arrowSnd = f => timesV (2) >> asterisk ([id, f])
	// const isInteger = arrowSnd (floor) >> passToN (eq)

	// --- now compose it into an anaphoric if:

	const ifInteger = isInteger | ifPredicate

	const add1 = add (1)

	; [3.5, 4, 4.2]
	| map (ifInteger (add1, 'nothing' | always))
	  // ['nothing', 5, 'nothing']

More complicated predicates:

	// --- @todo use `allN`
	const both = (f, g) => x => f (x) && g (x) ? true : false

	const isOdd = x => x % 2

	const isOddInteger = both (isInteger, isOdd)
	const ifOddInteger = isOddInteger | ifPredicate

	; [3.5, 4, 5, 5.5]
	| map (ifOddInteger (
	  add1,
	  'nothing' | always,
	))
	| log

	; [3.5, 4, 5, 5.5] | map (isOddInteger) | log

#### ٭ compositional decoration ٭

Our `map` function is capped at one argument, meaning the map routine only
gets the value and not the index or the collection.

	import { map, addIndex, addCollection, } from 'stick-js'

	; [4, 5, 6]
	| map ((x, idx) => idx) // [undefined, undefined, undefined]

But:

	const mapWithIndex = map | addIndex
	const mapWithCollection = map | addCollection

	; [4, 5, 6]
	| mapWithIndex ((x, idx) => idx) // [0, 1, 2]

	; [4, 5, 6]
	| mapWithCollection ((x, coll) => coll) // [[4, 5, 6], [4, 5, 6], [4, 5, 6]]

	; [4, 5, 6]
	| (map | addIndex | addCollection) ((x, idx, coll) => ...)

	; [4, 5, 6]
	| (map | addCollection | addIndex) ((x, coll, idx) => ...)

We can also enhance our merge functions, to deal with conflicts:

    import { mergeWith, mergeToSym, } from 'stick-js'

    const chooseTgt = (src, tgt) => tgt
    const chooseSrc = (src, tgt) => src

    // --- choose target value on conflict
	const mergeChooseTgt = mergeToSym | mergeWith (chooseTgt)

    // --- choose source value on conflict
	const mergeChooseSrc = mergeToSym | mergeWith (chooseSrc)

	const os = { name: 'source name', }
    const ot = { name: 'target name', }

	os | mergeChooseSrc (ot) // 'source name'
	os | mergeChooseTgt (ot) // 'target name'

Or to only merge if certain conditions hold:

	import { mergeWhen, eq, } from 'stick-js'

	const { floor, } = Math
	const isInteger = x => x | floor | eq (x)
	const srcIsInteger = (src, tgt) => src | isInteger
	const mergeToWhenSrcIsInteger = mergeToSym | mergeWhen (srcIsInteger)

	const os = { val: 2.2, vil: 3,  vol: 3.5, }
	const ot = { val: 25,  vil: 25, vol: 25,  vel: 42, }

	os | mergeTo (ot)                 // { val: 2.2, vil: 3, vol: 3.5, vel: 42, }
	os | mergeToWhenSrcIsInteger (ot) // { val: 25,  vil: 3, vol: 25,  vel: 42, }

#### ٭ semantics and argument order are often based on English grammar ٭

(We're dying to see a port to Hungarian, too)

Once you master this, the usage becomes intuitive and greatly reduces the
need to check the docs.

(What's the argument order of `append`, `times`, and `subtract` in your favorite library?)

	import {
	  sprintfN, sprintf1, mergeTo, merge, prependTo, prepend,
	  appendTo, append, bindPropTo, bindProp, bindTo, bind, invoke,
	} from 'stick-js'

	const tgt = { thing: 'sandwich', want: 'no thanks',  }
	const src = {                    want: 'yes please', }

When a function ends in a preposition, for example, ‘To’, the identifier to
the right is the object of the preposition.

Read this as ‘merge src **to tgt**’

	src | mergeTo (tgt)                  // { thing: 'sandwich', want: 'yes please', }

The same function without the preposition means that the identifier to the right is the object of the verb ‘merge’.

Read this as: ‘**merge src** to tgt’

	tgt | merge (src)                    // { thing: 'sandwich', want: 'yes please', }

	4 | appendTo ([1, 2, 3])             // [1, 2, 3, 4]
	; ([1, 2, 3]) | append (4)           // [1, 2, 3, 4]

	0 | prependTo ([1, 2, 3])            // [0, 1, 2, 3]
	; ([1, 2, 3]) | prepend (0)          // [0, 1, 2, 3]

	const dog = {
	  name: 'Caesar',
	  speak () { return 'My name is ' + this.name },
	}

	const cat = {
	  name: 'Fritz',
	  speak () { throw new Error },
	}

	const f = 'speak' | bindPropTo (dog)
	f ()                                  // 'My name is Caesar'

    // --- 'bind prop "speak" to object'
	'speak' | bindPropTo (dog)   | invoke // same

    // --- also 'bind prop "speak" to object'
	dog     | bindProp ('speak') | invoke // same

	dog.speak | bindTo (dog) | invoke     // same

    // cat.speak ()                       // Error
	dog.speak | bindTo (cat) | invoke     // 'My name is Fritz'
	cat | bind (dog.speak)   | invoke     // 'My name is Fritz'

    // --- 'call this function on this context', i.e., bind and call.
	; ({}.toString) | callOn (3)          // '[object Number]'

	// --- 'provide this context to this function'
	; 3 | provideTo ({}.toString)         // '[object Number]'

Note that this fits the `a | b | c` pattern:

	dog.speak | bindTo (cat) | invoke     // 'My name is Fritz'

So we can also write it as `a | (b >> c)`:

	dog.speak | (bindTo (cat) >> invoke)  // 'My name is Fritz'

In fact `bindTo (x) >> invoke` is already provided under the name `callOn`,
and its inverse `provideTo`:

    dog.speak | callOn (cat)              // 'My name is Fritz'
    cat       | provideTo (dog.speak)     // 'My name is Fritz'

Some other miscellaneous examples.

	// --- '3 to the 4th'
	3 | toThe (4)                         // 81

	// --- '3 divided by 6'
	3 | divideBy (6)                      // 0.5

	// --- 'divide 3 into 6'
	3 | divideInto (6)                    // 2

	// --- 'subtract 3 from 4'
	3 | subtractFrom (4)                  // 1

	// --- 'subtract 4 from 3'
	3 | subtract (4)                      // -1

	// --- '3 minus 4'
	3 | minus (4)                         // -1

#### ٭ side effects & chaining ٭ mutable vs immutable ٭

	import {
	  map, side1, appendM, append, prependM, prepend,
	} from 'stick-js'

Chaining with the `.` will often not do what you want.

	; [2, 3, 4]
	  .push (5)
	  .unshift (1) // error, return value of previous line was 5

But this will:

	const push    = 'push'    | side1
	const unshift = 'unshift' | side1

The 1 in side1 refers to the arity of the function, i.e., the exact number
of arguments it expects. When working with functions in this way it's
important to specify this.

`.push` and `.unshift`, both methods of `Array.prototype`, expect exactly
one argument, hence `side1` in both caes.

	; [2, 3, 4]
	| push (5)
	| unshift (1) // [1, 2, 3, 4, 5]

	// --- using stick functions for mutable data:

	; [2, 3, 4]
	| appendM (5)
	| prependM (1)

	// --- using stick functions for immutable data:

	; [2, 3, 4]
	| append (5)  // new array [2, 3, 4, 5]
	| prepend (1) // new array [1, 2, 3, 4, 5]

#### ٭ factory ٭ synopsis ٭

    import {
	  factory, factoryProps,
	  factoryStatics,
	} from 'stick-js'

    // --- dog.js:
    const proto = {
	  init () {
		...
		return this
	  },
	  breathe () { return 'huff' },
	  whoami ()  { return this.name },
	  getType () { return this.type },
	}

	const props = {
	  type: 'dog',
	  name: undefined,
	}

    // --- basic:
	export default proto | factory

	// --- variants:
	export default proto | factory | factoryProps (props)
	export default proto | factory | factoryStatics ({ ... }) | factoryProps (props)

    // ------ main.js

	import Dog from './dog'

	const dog = Dog.create ()
	// const dog = Dog.create ().init () // useful in practice
	dog.breathe ()                       // 'huff'
	dog.type                             // 'dog', if `factoryProps` used
	dog.getType ()                       // 'dog', same
	dog.whoami ()                        // undefined, because no default.

	const dog2 = Dog.create ({ name: 'garfunkel', })
	dog2.whoami ()                       // 'garfunkel', thanks to args to create

#### ٭ factory w/mixins ٭ synopsis ٭

    // ------ animal.js:

    import {
	  factory, factoryStatics, mixinM, mixinPreM,
	  factoryProps,
	  ifPredicate,
	} from 'stick-js'

    const isOdd = x => x % 2 !== 0
    const ifOdd = isOdd | ifPredicate

    // --- a 'base' object (animal)

    const proto = {
	  init () {
		...
		return this
	  },
	  move () {
		return this.numLegs | ifOdd (
		  _ => 'hobble',
		  _ => 'gait',
		)
	  },
	  breathe () { return 'huff' },
	  speak ()   { 'not implemented' | die },
	  getType () { return this.type },
	}

	const props = {
	  type: 'animal',
	  numLegs: undefined,
	}
	
	export default proto | factory | factoryProps (props)

    // ------ cheater.js:

    // --- some orthogonal functionality

	const proto = {
      cheat: howMuch => 'I cheat ' + howMuch,
	}

	export default proto | factory

    // ------ dog.js:

    import {
	  sprintf1,
	  factory,
	} from 'stick-js'

    import Animal from './animal'
    import Cheater from './cheater'

	const { proto: animalProto, } = Animal
	const { proto: cheaterProto, } = Cheater

    // --- a composite object (dog), extended from animal, with extra functions mixed in.

    const proto = {
	  init () {
		...
		return this
	  },
	  speak () { return this.name | sprintf1 ('Dog %s says woof') }
	}

	const props = {
	  type: 'dog',
	  numLegs: 4,
	  name: undefined,
	}

	export default proto
	  | mixinPreM (animalProto)
	  | mixinM (cheaterProto)
	  | factory
	  | factoryProps (props)

    // ------ main.js

	import Dog from './dog'

	const dog = Dog.create ({ name: 'garfunkel', })
	// const dog = Dog.create ({ name: 'garfunkel', }).init () // with init
	dog.breathe ()                                  // 'huff' (from animal)
	dog.getType ()                                  // 'dog' (function from animal, property from dog)
	dog.speak ()                                    // 'Dog garfunkel says woof' (function from dog, property from instance initialisation)
	dog.cheat ('a bit')                             // 'I cheat a bit' (from cheater)

Stick idioms:

    const breathe = dot ('breathe')
	const getType = dot ('getType')
	const speak = dot ('speak')
	const cheat = dot1 ('cheat')
	const init = side ('init')
	const create = dot1 ('create')

	const dog = Dog
	  | create ({ name: 'garfunkel', })
	  | init

    dog | breathe
	dog | getType
	dog | speak

	Dog | create ({ name: 'garfunkel', })
	    | init
        | cheat

#### ٭ factory ٭ explained

We provide a functional style for working with objects the way JS was
designed to: using prototypical inheritance and Object.create. We hope to
show you that the `new` keyword and 'classes' and all the baggage they bring
are unnecessary, and that they obfuscate the way that it actually works.

We provide a simple abstraction for factories, with as little sugar
and magic as possible, and encourage you to mix and match the components to
do exactly what you need.

To recap: you create an object in JS by first building a prototype object,
consisting of only functions.

    const animalProto = {
	  breathe () { return 'huff' },
	  speak () { throw new Error },
	  ...
	}

To make an `animal` instance, you pass this prototype object to Object.create,
then assign properties. If you wish you can treat one of these instances as
a prototype for a new kind of object, a `dog` for example, copy in some
more functions, use Object.create again, and so on.

We encapsulate this process with the notion of a factory, which is an object
which knows how to spawn objects of a certain type.

    import { factory, } from 'stick-js'

    const animalProto = {
	  breathe () { return 'huff' },
	  speak () { throw new Error },
	  ...
	}

	const Animal = animalProto | factory // other idioms might call it `animal` or `animalFactory`
	const animal1 = Animal.create ()
	const animal2 = Animal.create ()
	animal1.breathe () // 'huff'
	animal2.breathe () // 'huff'
	animal2.speak () // Error

To add properties:

    const animalProps = {
	  type: 'animal',
	  size: undefined,
	  numLegs: undefined,
	}

And we recommend always having an `init` method, which you will almost certainly
need. `myFactory.create ().init ()` becomes a well-worn pattern.

    const isOdd = x => x % 2 !== 0
	const ifOdd = isOdd | ifPredicate

    const animalProto = {
	  init () {
		...
		return this
	  },
	  breathe () { return 'huff' },
	  speak () { throw new Error },
	  move () {
		return this.numLegs | ifOdd (
		  _ => 'hobble',
		  _ => 'gait',
		)
	  },
	}

	const Animal = animalProto | factory | factoryProps (animalProps)

On `create`, the properties which are 'ok' will get copied in to the new
object.

The others are there for documentation: put them here, not peppered
throughout the methods. Do use `undefined` for props that are waiting to be
defined, which is arguably better than `null` and definitely better than
`false`. Use `void 8` or your very own favorite number to impress … no one.

    const animal = Animal.create ().init ()
	animal.type // 'animal'
	animal.size // undefined

You can pass an object to `create` to initialise properties. These will be
copied in *after* the props that were passed to `factoryProps` are.

    const bigBiped = Animal.create ({ size: 'big', numLegs: 2, }).init ()

You can also eliminate the dots entirely:

    const create = dot1 ('create')
	const init   = side ('init')
	const move   = dot  ('move')
	const speak  = dot  ('speak')

    Animal | create ({ size: 'small', numLegs: 2, })
	       | init
	       | move // 'gait'

Note that by using `side` for `init` we are assured that the instance is
passed down through the pipe and not the return value of `init` (although in
this case, `init` returns `this`, so `dot` would have worked too.) `create`
and `move` definitely need `dot` and not `side`.

To extend `Animal` to the obligatory `Dog` find the `Animal` prototype
(if `animalProto` is not in scope).

    const animalProto = Animal.proto

Or

    const animalProto = Animal.create ().__proto__ // might not be available in all runtimes

Create it, add dog methods, and make a new factory:

    const dogProto = animalProto
	  | Object.create
	  | mergeM ({
	    speak () { return this.loud ? 'WOOF' : 'woof' },
	  })

    const dogProps = {
	  numLegs: 4,
	  loud: undefined,
	}

	const Dog = dogProto | factory | factoryProps (dogProps)

    ; [true, false]
	| map ((loudness) => Dog
	  | create ({ loud: loudness, })
	  | (dog => [dog.speak (), dog.breathe (), dog.move ()])
	)
	// [['WOOF', 'huff', 'gait'], ['woof', 'huff', 'gait']]
	
Note that we can call methods of both `Animal` and `Dog` now.

#### ٭ dog ٭ with mixins ٭

    const Dog = dogProto | mixinM (animalProto) | factory | factoryProps (dogProps)

Working with mixins is tricky. At some point, there will be namespace
conflicts and it's not always obvious which version should win out -- and
you have to decide how you want to deal with that.

But you have all the tools now to specify exactly how you want it to work.
Now you have what JS is known for giving you a lot of: freedom.

    const Dog = dogProto | mixinPreM (animalProto) | factory | factoryProps (dogProps)
	const dog1 = Dog | create ({})
	dog1 | breathe // 'huff'
    const Dog = dogProto | mixinPreM (animalProto) | factory | factoryProps (dogProps)
	Dog.create ({}) | speak // 'woof'

We mixed the animal into the dog as a 'pre' mixin, meaning that on name
conflicts, Dog's version will win. If we had used `mixinM` instead of
`mixinPreM`:

    const Dog = dogProto | mixinM (animalProto) | factory | factoryProps (dogProps)
	Dog | create ({})
	    | speak // Error, this is Animal's version.

Non-pre mixins are useful for orthogonal functionality -- something like
logging, for example.

You can add as many pre and post mixins as you like.

    dogProto | mixinPreM (...) | ... | mixinM (...) | ... | factory

Or use the 'N' versions to provide an array:

    dogProto | mixinPreNM ([a, b, c]) | mixinNM ([d, e, f]) | factory

Note the 'M' marker on the mixin functions. This is to make clear that these
functions mutate the prototype object, which might be a bit surprising when
using this style. We do not provide non-M versions of the mixin functions,
because it's not obvious exactly what the semantics should be, as several
alternatives could be equally intuitive.

Should the prototype chain be flattened? Should it be discarded, leaving
only the own keys? Should it create a new object using and mutate it?

You can specify these behaviors explicitly:

    dogProto | flattenPrototype | <mixin functions ...> |
    dogProto | discardPrototype | <mixin functions ...> |
    dogProto | Object.create    | <mixin functions ...> |

#### ٭ frontend stuff ٭

    import { path, prop, whenTrue, always, } from 'stick-js'

If you use react/redux, perhaps with saga, chances are your modules end in
something like this:

	const withConnect = connect(mapStateToProps, mapDispatchToProps);
	const withReducer = injectReducer({ key: 'home', reducer });
	const withSaga = injectSaga({ key: 'home', saga });

	export default compose(
	  withReducer,
	  withSaga,
	  withConnect,
	)(HomePage);

We should see by now that this composing of functions, invoked upon a single
value, is exactly our pipe pattern. So why not:

	export default App
	  | connect       (mapStateToProps, mapDispatchToProps)
	  | injectSaga    ({ key: 'home', saga, })
	  | injectReducer ({ key: 'home', reducer, })

And maybe you call actions using a structure like:

    export function mapDispatchToProps(dispatch) {
	  return {
		onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
	  };
	};

Why not:

	export const mapDispatchToProps = (dispatch) => ({
	  onChangeUsername: path (['target', 'value'] >> changeUsername >> dispatch,
	})

Try it yourself and see :D

If you use styled components, perhaps you pass optional props in. Checking
for the presence of the props can be annoying, so how about:

	const SomeElementS = styled.div`
	  top: 5%;
	  left: 5%;
	  ${ prop ('width')  >> whenOk   (sprintf1 ('width: %spx;')) }
	  ${ prop ('height') >> whenOk   (sprintf1 ('height: %spx;')) }
	  ${ prop ('error')  >> whenTrue ('color: red;' | always) }
	`

	<SomeElementS width='100%' error={true} />

#### ٭ backend stuff ٭

When you're using a framework like Express, you have the well-known `app`
object that you carry around everywhere. It just so happens that nearly all
methods of `app` return `app`, so that chaining works in the familiar way:

	app
	.use (...)
	.all (...)
	.post ('/endpoint1', ((req, res) => ...))
	.patch ('/endpoint2', ((req, res) => ...))
	.get ('/endpoint3', ((req, res) => ...))
	...
	.listen (config.port, ...)

But there are cases when the makers were not so thoughtful, or when you
simply don't know (or don't care) what a function or method returns. The
pipe will free you from the limitations of the dot, and allow you to compose
your own fluid interfaces. We'll use Express here to prove that it works.
See the raindrops example for how you might use this with WebGL, and there
are many other places this can be used.

    import { side1, side2, list, appendTo, } from 'stick-js'
	import { fromPairs, } from 'ramda'

	const get      = side2 ('get')
	const post     = side2 ('post')
	const patch    = side2 ('patch')
	const use      = side1 ('use')
	const all      = side2 ('all')
	const send     = side1 ('send')
	const status   = side1 ('status')
	const listen   = side2 ('listen')
	const sendJSON = side1 ('json')

	const sendStatus = code => data => status (code) >> sendJSON (data)
	const msg = appendTo (['msg']) >> list >> fromPairs

    app | use (bodyParser.json())
		| all ('*', (req, res, next) => {
		  ...
			next ()
		})

		| post ('/endpoint1', ((req, res) => {
		  ...
		  res | sendStatus (500) ('Server error' | msg)
		}))

		| patch ('/endpoint2', ((req, res) => {
		  ...
		  res | sendStatus (200) ({ results, })
		}))

		...

		| get ('/endpoint3', ((req, res) => ...))

		| listen (config.port) (...)


#### ٭ cond ٭

	import {
	  map, join, condS, guard, otherwise,
	  sprintfN, rangeTo, lt, gt, tap, appendTo, prop,
	} from 'stick-js'

	import { curry, }              from 'ramda'
	import { yellow, green, red, } from 'chalk'

	const { log, } = console

	const cmpStr = curry ((str, color, tgtStr, x) => [x, str | color, tgtStr]
	  | sprintfN ('%s is %s %s')
	)

	const lessThanStr     = cmpStr ('less than', yellow)
	const greaterThanStr  = cmpStr ('greater than', red)
	const inBetweenString = ([ low, high ]) => cmpStr ('in between', green, [low, high] | join (' and '))

    // --- this is intentionally complex for illustration
	const getCmpStr = curry ((low, high, x) => x
	  | condS ([
		low  | lt | guard ((low | lessThanStr)           >> appendTo ([-1])),
		high | gt | guard ((high | greaterThanStr)       >> appendTo ([1])),
		otherwise | guard (inBetweenString ([low, high]) >> appendTo ([0])),
	  ])
	)

	const inRange = ([low, high]) => x => getCmpStr (low, high, x)

	const snd = prop (1)
	const fst = prop (0)

	10 | rangeTo (20)             // [10, 11, ... 19]
       | map (inRange ([13, 17])) // maps to tuples of [int, str]
       | tap (map (snd >> log))   // logs the str
       | map (fst)                // [-1, -1, ... 0, ... 1, 1]










### performance

Stick is fast. See here for a benchmark of our factory example.

Though it initially depended on Ramda, we have decided to eliminate that
dependency by reimplementing many of the functions. While profiling the
WebGL example we found that even trivial functions like `R.flip` and `R.tap`
are surprisingly expensive.

This really only becomes an issue in critical loops -- an inner loop of a
socket or server, an animation, a particle system where lots of objects are
spawned per second, WebGL. For cases like these, see below.

It is true that `a | b` compiles to three function calls, whereas `b (a)` is
only one. But this is almost certainly not going to affect your app. Your JS
runtime can call *a lot* of functions per millisecond.

Nonetheless you are encouraged to mix and match our functions with whichever
functional libraries you like -- Ramda, Lodash/FP, or anything else, as it
suits you.

	import { map, } from 'ramda'
	import { filter, } from 'lodash/fp'
	import { ifPredicate, } from 'stick-js'

The stick idiom will still work, as long as the functions are curried and
data-last.

Furthermore Ramda is probably perfectly fine for your app, and its functions
often provide type-checking and error messages (we don't), and many of their
functions are more sophisticated. `R.map` works on functors and
transformers, for example -- ours doesn't.

And, it is our belief that if you are already using the `flow` pattern in
Lodash/FP or the `pipe` function in Ramda, that it will really be a
no-brainer to overload the operator and keep everything else the same.

    _.flow (
	  _.split (' '),
	  _.map (capitaliseFirstLetter),
	  _.join (' '),
	) (myData)

	// ->
	myData
	| _.split (' '),
	| _.map (capitaliseFirstLetter),
	| _.join (' ')

merge benchmark: manual / index / ramda

### Extra performance

For speed freaks: the curried functions you import from the main module are
written first using manual currying, and then recurried and exported. This
is in order to allow both calling styles.

For a speed boost you can check the docs to see if your function is exported
by 'stick-js/manual'. If so, you can directly import the manual version, but
you must remember to call it using the manual style:

	import { merge, } from 'stick-js/manual'
	merge (obj1, obj2) // will not work
    obj2 | merge (obj1) // ok
	merge (obj1) (obj2) // also ok




### Bitwise math

Of course, we've saved your precious bitwise operators. You can either:

1. Use the functional form

		import { bitwiseOr, bitwiseShiftBy, } from 'stick-js'
		4 | bitwiseOr (9) // 13

2. Do your bitwise math in a separate scope than that in which the
`defineBinaryOperator` calls appear. The operators are only overloaded in
the scope in which the calls are made. We recommend doing the bitwise math
in a separate source file and not mixing the two styles in one file.

### Why not use lodash? / ramda/ etc.

- you don't need to carry around the _
- free functions are far more flexible than dotted ones
- predictable semantics based on English
- prototype stuff
