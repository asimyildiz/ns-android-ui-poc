const cacheSingleton = Symbol('ServiceCache');
const cacheSingletonEnforcer = Symbol('ServiceCache');

class ServiceCache {
    /**
     * @constructor
     * @param {Symbol} enforcer
     */
    constructor(enforcer) {
        if (enforcer !== cacheSingletonEnforcer) {
            throw new Error('Cannot construct singleton');
        }

        this._cache = {};
        this._cacheToRefresh = true; // if true the cache should be renewed
    }

    /**
     * returns the instance of ServiceCache, singleton
     * @returns {ServiceCache}
     */
    static get instance() {
        if (!this[cacheSingleton]) {
            this[cacheSingleton] = new ServiceCache(cacheSingletonEnforcer);
        }

        return this[cacheSingleton];
    }

    /**
     * Add an object to the cache
     * @param key {String} The object identifier
     * @param value {Object} The object to store
     */
    addToCacheSync(key, value) {
        this._cache[key] = value;
    }

    /**
     * Get an object from the cache
     * Warning: asynchronous method that returns a Promise
     * @param {String} key The object identifier
     * @returns {Promise<Object|Error>} A promise (object,error)
     */
    getFromCache(key) {
        return new Promise(((resolve, reject) => {
            if (this.hasFromCacheSync(key)) {
                resolve(this.getFromCacheSync(key));
            } else {
                reject(new Error(`The key '${key}' is not in cache !`));
            }
        }));
    }

    /**
     * Get an object from the cache
     * @param {String} key The object identifier
     * @returns {Object|Error} The object or null
     */
    getFromCacheSync(key) {
        if (!this.hasFromCacheSync(key)) {
            throw new Error(`The key '${key}' is not in cache !`);
        }
        return this._cache[key];
    }

    /**
     * Return true if object referenced by the key is in the cache
     * @param {String} key The object identifier
     * @returns {Boolean} True if object is in the cache
     */
    hasFromCacheSync(key) {
        return this._cache[key] != null; // [CS] I prefer this to this._cache[key] !== undefined in the case the deletion on some device does not work as expected
    }

    /**
     * Delete the object referenced by it's id from the cache
     * @param {String} key The object identifier
     */
    deleteFromCacheSync(key) {
        this._cache[key] = null;
        delete this._cache[key];
    }

    /**
     * Reset the cache, ie delete all object from it.
     */
    resetCacheSync() {
        this._cache = {};
    }

    /**
     * manage getter with cache
     * @param {Object} options
     * @returns {Promise<Object|Error>}
     */
    manageGetterWithCache(options) {
        return this._manageCache(options || {});
    }

    /**
     * manage setter with cache
     * @param {Object} options
     * @returns {Promise<Object|Error>}
     */
    manageSetterWithCache(options) {
        return this._manageCache(options || {});
    }

    /**
     * manage cache
     * @param {Object} options
     * @returns {Promise<Object|Error>}
     * @private
     */
    _manageCache(options) {
        options = options || {};
        let returnPromise = Promise.resolve(null);
        if (options.key == null) {
            returnPromise = Promise.reject(new Error('Can not manage getter|setter with cache: key option is null'));
        } else if (options.getter == null && options.setter == null) {
            returnPromise = Promise.reject(new Error('Can not manage getter|setter with cache: getter|setter option is null'));
        } else if (options.getter && this.hasFromCacheSync(options.key) && !options.force) {
            returnPromise = this.getFromCache(options.key);
        } else {
            options.value = (options.value != null && !Array.isArray(options.value)) ? [options.value] : options.value;
            options.params = (options.params != null && !Array.isArray(options.params)) ? [options.params] : options.params;
            returnPromise = (options.getter) ? this[options.getter](...options.params) : this[options.setter](...options.value);
            returnPromise.then((value) => {
                this.addToCacheSync(options.key, value);
                // if event option declare, trigger it
                if (options.event) {
                    this[options.event](value);
                }
                return value;
            });
        }
        return returnPromise;
    }
}

export default ServiceCache.instance;
