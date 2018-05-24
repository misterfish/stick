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

### Synopsis

(See x for a more complete overview)

	defineBinaryOperator ('|',  (...args) => pipe         (...args))
	defineBinaryOperator ('<<', (...args) => compose      (...args))
	defineBinaryOperator ('>>', (...args) => composeRight (...args))

	import {
		pipe, compose, composeRight,
		map, join,
	} from 'stick'

	const { log, } = console

	; [1, 2, 3]
	  | map (x => x + 1)
	  | join ('/')
	  | log // outputs '2/3/4'

#### 2
push
merge

####
dog

#### 4 - this example is intentionally complex

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

	10 | rangeTo (20) // [10, 11, ... 19]
       | map (inRange ([13, 17])) // maps to tuples of [int, str]
       | tap (map (snd >> log)) // logs the str
	   ![#f03c15](https://placehold.it/15/f03c15/000000?text=hello) `#f03c15`
       | map (fst) // [-1, -1, ... 0, ... 1, 1]
