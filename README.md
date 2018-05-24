# StickJS

### Intro

StickJS is a library for functional programming in JavaScript. It is
intended to be used in conjunction with the pipe operator `|>`, which is 
currently in the proposal stage (xxx link); or better yet, the bitwise-or 
('stick') operator `|`. This way you can start using it today in your 
projects using @xxx's babel-operator-overload, and the stick is more 
enjoyable to work with to boot. 

In addition to being fast and practical, it also introduces a new range of 
idioms and some conventions of its own. These may take some time to master, 
though people coming from a Lisp or Haskell background should hit the ground 
running. I hope to show you that it can improve both the quality of your 
code and your own enjoyment, and maybe clue you in to a new way to think 
about the whole business.



### Common patterns
rewriting
refactoring





# Github

### Usage

#### node

	npm i stick-js # or yarn

	cat >.babelrc <<EOT
	{"presets": ["babel-preset-es2015", "stage-0"], "plugins": [
		"babel-plugin-operator-overload"
	]}
	EOT

	babel -d lib src
	node lib/<entry-file>.js

#### webpack

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

### Features
	;

		lodash flow near the top
		people who already use lodash flow
		static tools

### Synopsis: major features.

(See x for a more complete overview)

#### basic example

    // --- source files must begin with this header.
	defineBinaryOperator ('|',  (...args) => pipe         (...args))
	defineBinaryOperator ('<<', (...args) => compose      (...args))
	defineBinaryOperator ('>>', (...args) => composeRight (...args))
	// --- /header

	import {
		pipe, compose, composeRight,
		map, join,
	} from 'stick'

	const { log, } = console

	; [1, 2, 3]
	| map (x => x + 1)
	| join ('/')
	| sprintf1 ('The answer is %s')
	| log // outputs 'The answer is 2/3/4'

#### markers

	defineBinaryOperator ('|',  (...args) => pipe         (...args))
	defineBinaryOperator ('<<', (...args) => compose      (...args))
	defineBinaryOperator ('>>', (...args) => composeRight (...args))

	import {
	  pipe, compose, composeRight,
	  sprintfN, sprintf1,
	} from 'stick'

	3 | sprintf1 ('4 - 1 is %s') // '4 - 1 is 3'

	; [4, 3]
	| sprintfN ('%s - 1 is %s') // same. 'N' is a marker meaning an array is expected.

#### ok, anaphoric if

	defineBinaryOperator ('|',  (...args) => pipe         (...args))
	defineBinaryOperator ('<<', (...args) => compose      (...args))
	defineBinaryOperator ('>>', (...args) => composeRight (...args))

	import {
	  pipe, compose, composeRight,
	  map, ok, notOk,
	  ifOk,
	} from 'stick'

	const { log, } = console

	const someVar = ...
	someVar | ok // true if `someVar` is not `null` or `undefined`

	; [0, false, '', null, void 8]
	| map (ok)    // [true, true, true, false, false]

	; [0, false, '', null, void 8]
	| map (notOk) // [false, false, false, true, true]

	// --- we see this a lot in JS:

	let answer
	if (someVar !== undefined && someVar !== null) {
	  answer = someVar + 1
	} else {
	  answer = 'nothing'
	}

	// --- it can be vastly improved using an 'anaphoric if' and a stick idiom:

	const add1IfYouCan = val => val
	  | ifOk (
		// in the 'ok' case, the value is passed to the function.
		x => x + 1,
		// in the 'not ok' case, no value is passed.
		_ => 'nothing',
	  )

	// --- or a variant:

	import { add, always, } from 'stick'

	const add1 = 1 | add // or add (1)
	const add1IfYouCan = x => x | ifOk (add1, 'nothing' | always)

    // --- usage:

	; [0, 10, null, void 8]
	| map (add1IfYouCan) // [1, 11, 'nothing', 'nothing']

#### point-free

// --- a common pattern is when the argument to a function is passed directly into a pipe:

	const add1IfYouCan = x => x | ifOk (add1, 'nothing' | always)

// --- since `x` does not appear anywhere else, we can simply remove it:

	const add1IfYouCan = ifOk (add1, 'nothing' | always)

// --- if the pipe chain consists of more than 1 link:

    const { log, } = console
    const add1IfYouCan = x => x
	  | ifOk (add1, 'nothing' | always)
	  | String						  // type conversions are easy using type constructors by the way
	  | dot ('toUpperCase')
	  | sprintf1 ('The answer is %s')
	  | tap (log)                     // outputs 'The answer is 1' or 'The answer is NOTHING' or ...

// --- ... then we remove the `x => x` and change all the `|` to `>>`

    const { log, } = console
	const { dot, sprintf1, tap, }
    const add1IfYouCan =
	  ifOk (add1, 'nothing' | always)
	  >> String
	  >> dot ('toUpperCase')
	  >> sprintf1 ('The answer is %s')
	  >> tap (log)

#### compositional predicates

##### (from here on out we omit the header, but do not forget it ...)

  // --- `ifOk` is a convenience for `ifPredicate (ok)` or `ok | ifPredicate`
  // --- there is also a 'when' form, which has no 'else branch'.
	  
	  import { add, whenOk, } from 'stick'
	  const add1 = 1 | add // or add (1)
	  3    | whenOk (add1) // 4
	  null | whenOk (add1) // undefined

  // --- the selection of `if` and `when` functions we provide is
  intentionally skimpy, to encourage you to write your own.

	const { floor, } = Math
	const isInteger = x => x === floor (x)

	// or how about
	// const isInteger = x => x | floor | eq (x)

	// or if you're getting bored:
	// const arrowSnd = f => timesV (2) >> asterisk ([id, f])
	// const isInteger = arrowSnd (floor) >> passToN (eq)

	// --- now compose it into an anaphoric if:

	const ifInteger = isInteger | ifPredicate

	const add1 = add (1)

	; [3.5, 4, 4.2]
	  | map (ifInteger (add1, 'nothing' | always))
	  // ['nothing', 5, 'nothing']

  // --- more complicated predicates

  // --- @todo remove
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

#### compositional decoration

	defineBinaryOperator ('|',  (...args) => pipe         (...args))
	defineBinaryOperator ('<<', (...args) => compose      (...args))
	defineBinaryOperator ('>>', (...args) => composeRight (...args))

	import {
	  pipe, compose, composeRight,
	  map,
	  addIndex, addCollection,
	} from 'stick'

	; [4, 5, 6]
	| map ((x, idx) => idx) // [undefined, undefined, undefined]

	const mapWithIndex = map | addIndex
	; [4, 5, 6]
	| mapWithIndex ((x, idx) => idx) // [0, 1, 2]

	const mapWithCollection = map | addCollection
	; [4, 5, 6]
	| mapWithCollection ((x, coll) => coll) // [[4, 5, 6], [4, 5, 6], [4, 5, 6]]

	; [4, 5, 6]
	  | (map | addIndex | addCollection) ((x, idx, coll) => ...)

	; [4, 5, 6]
	  | (map | addCollection | addIndex) ((x, coll, idx) => ...)

#### semantics and argument order are often derivable by thinking in English

	defineBinaryOperator ('|',  (...args) => pipe         (...args))
	defineBinaryOperator ('<<', (...args) => compose      (...args))
	defineBinaryOperator ('>>', (...args) => composeRight (...args))

	import {
	  pipe, compose, composeRight,
	  sprintfN, sprintf1, mergeTo, merge, prependTo, prepend,
	  appendTo, append, bindPropTo, bindProp, bindTo, bind, invoke,
	} from 'stick'

	const obj1 = { thing: 'sandwich', want: 'no thanks', }
	const obj2 = { want: 'yes please', }

	// --- obj1 is the object of the preposition 'to'. Read as: 'merge obj2 to obj1'
	obj2 | mergeTo (obj1)
	// --- No preposition -> obj1 is the object of the verb 'merge'.
	// --- Read as: 'merge obj2 to obj1'
	obj1 | merge (obj2)

	4 | appendTo ([1, 2, 3])
	; ([1, 2, 3]) | append (4)

	0 | prependTo ([1, 2, 3])
	; ([1, 2, 3]) | prepend (0)

	const dog = {
	  name: 'Caesar',
	  speak () { return 'My name is ' + this.name },
	}

	const cat = {
	  name: 'Bo',
	  speak () { throw new Error },
	}

	const f = 'speak' | bindPropTo (dog)
	f () // 'My name is Caesar'

	'speak' | bindPropTo (dog)   | invoke // same
	dog     | bindProp ('speak') | invoke // same

	dog.speak | bindTo (dog) | invoke // smae

	// cat.speak () // Error
	dog.speak | bindTo (cat) | invoke // 'My name is Bo'
	cat | bind (dog.speak)   | invoke // 'My name is Bo'

#### side effects & chaining, mutable vs immutable

defineBinaryOperator ('|',  (...args) => pipe         (...args))
defineBinaryOperator ('<<', (...args) => compose      (...args))
defineBinaryOperator ('>>', (...args) => composeRight (...args))

import {
  pipe, compose, composeRight,
  map, side1, appendM, append, prependM, prepend,
} from 'stick'

// --- chaining with the . will often not do what you want.

; [2, 3, 4]
  .push (5)
  .unshift (1) // error, return value of previous line was 5

// --- this will:

const push    = 'push' | side1
const unshift = 'unshift' | side1

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

#### dog

#### this example is intentionally complex

![#f03c15](https://placehold.it/15/f03c15/000000?text=hello) `#f03c15`

    yarn add ramda chalk

	---

	defineBinaryOperator ('|',  (...args) => pipe         (...args))
	defineBinaryOperator ('<<', (...args) => compose      (...args))
	defineBinaryOperator ('>>', (...args) => composeRight (...args))

	import {
	  pipe, compose, composeRight,
	  recurry, map, join, condS, guard, otherwise,
	  sprintfN, rangeTo, lt, gt,
	  tap, appendTo, prop,
	} from 'stick'

	import {
	  curry,
	} from 'ramda'

	import {
	  yellow, green, red,
	} from 'chalk'

	const { log, } = console

	const cmpStr = curry ((str, color, tgtStr, x) => [x, str | color, tgtStr]
	  | sprintfN ('%s is %s %s')
	)

	const lessThanStr     = cmpStr ('less than', yellow)
	const greaterThanStr  = cmpStr ('greater than', red)
	const inBetweenString = ([ low, high ]) => cmpStr ('in between', green, [low, high] | join (' and '))

	const getCmpStr = curry ((low, high, x) => x
	  | condS ([
		low | lt | guard ((low | lessThanStr) >> appendTo ([-1])),
		high | gt | guard ((high | greaterThanStr) >> appendTo ([1])),
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
