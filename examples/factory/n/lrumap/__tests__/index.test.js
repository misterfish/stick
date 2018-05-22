import LRUMap from '../index';

describe('LRUMap', () => {
  let cache

  beforeEach(() => {
    cache = new LRUMap();
  });

  describe('new LRUMap({ limit: 3 })', () => {
    it('should limit the size of the cache and keep Last Result Used', () => {
      cache = new LRUMap({ limit: 3 });

      cache.set('Carole', 0);
      cache.set('Granade', 1);
      cache.set('Segers', 2);

      expect(cache.has('Carole')).toEqual(true);
      expect(cache.has('Granade')).toEqual(true);
      expect(cache.has('Segers')).toEqual(true);

      // refresh the very first key of the map, to make sure it's not evicted
      cache.get('Carole');
      cache.set('super president', 3);

      expect(cache._cache.size).toEqual(3);

      expect(cache.has('Granade')).toEqual(false);
      expect(cache.has('Segers')).toEqual(true);
      expect(cache.has('Carole')).toEqual(true);
      expect(cache.has('super president')).toEqual(true);
    });
  });

  describe('#set, #has and then #get', () => {
    it('should work with `("str")`', () => {
      cache.set('Carole', 'Human unicorn');

      expect(cache.has('Carole')).toEqual(true);
      expect(cache.get('Carole')).toEqual('Human unicorn');
    });
  });

  describe('.toString', () => {
    it('should return a special identifier', () => {
      expect(cache.toString()).toEqual('[object LRUMap]');
    });
  });
});
