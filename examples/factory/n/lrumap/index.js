function LRUMap( opts ) {
  this._limit = opts && ('limit' in opts) ? opts.limit : 10000;
  this._cache = new Map();
  this.has = this._cache.has.bind(this._cache);
  this.clear = this._cache.clear.bind(this._cache);
}

LRUMap.prototype = {
  toString: function() {
    return '[object LRUMap]';
  },

  set: function( key, value ) {
    this._cache.delete(key);
    this._cache.set(key, value);

    if ( this._cache.size > this._limit ) {
      this._cache.delete( this._cache.keys().next().value );
    }

    return this;
  },

  get: function( key ) {
    if ( this._cache.has(key) ) {
      var value = this._cache.get(key);
      this._cache.delete(key);
      this._cache.set(key, value);
      return value;
    }
  }
};

export default LRUMap;
