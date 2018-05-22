TupleMap [![npm version](https://badge.fury.io/js/lrumap.svg)](https://badge.fury.io/js/lrumap) [![Build Status](https://travis-ci.org/memoize-immutable/LRUMap.svg?branch=master)](https://travis-ci.org/memoize-immutable/LRUMap) [![Dependency Status](https://david-dm.org/memoize-immutable/LRUMap.svg)](https://david-dm.org/memoize-immutable/LRUMap) [![Coverage Status](https://coveralls.io/repos/github/memoize-immutable/LRUMap/badge.svg?branch=master)](https://coveralls.io/github/memoize-immutable/LRUMap?branch=master)
========

A Map of limited size that keeps most recently used values.
This lib is one of the several possible cache for [memoize-immutable](/louisremi/memoize-immutable),
but it can suit other use-cases as it implements a usual Map API.

## Install

`npm install --save LRUMap`

This lib has no dependency, but requires a native implementation of Map.

## Usage

```js
var LRUMap = require('LRUMap');

// The default size limit of the map is 10.000
var cache = new LRUMap({ limit: 10000 });

var key = 'Carole';
var value = {any: 'thing'};

cache.set(key, value);

cache.has(key) === true;
cache.get(key) === value;
```

## When should you use this map?

This map should be used as an alternative to a native Map, when you need to
limit its size.

## Author

[@louis_remi](https://twitter.com/louis_remi)

## License

MPL-2.0
