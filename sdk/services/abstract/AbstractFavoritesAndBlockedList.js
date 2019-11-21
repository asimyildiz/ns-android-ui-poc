import ServiceCache from '../helpers/ServiceCache';
import ServiceErrors from '../helpers/ServiceErrors';

/**
 * class for object properties
 * @name AbstractFavoritesAndBlockedList
 */
class AbstractFavoritesAndBlockedList {
    /**
     * @type {String}
     */
    static get ALL_CHANNEL_LIST_ID() {
        return 'ALL_CHANNELS';
    }

    /**
     * @type {String}
     */
    static get BLOCKED_CHANNEL_LIST_ID() {
        return 'ALL_BLOCKED_CHANNELS';
    }

    /**
     * @constructor
     */
    constructor() {
    // For MFavoritesAndBlockedList
        this.BLOCKED_LIST_ID = AbstractFavoritesAndBlockedList.BLOCKED_CHANNEL_LIST_ID;
        this.ALL_LIST_ID = AbstractFavoritesAndBlockedList.ALL_CHANNEL_LIST_ID;
    }

    /** ***************************************************************************************
     * FAVORITE and BLOCKED LIST
     **************************************************************************************** */

    /**
     * Add a model to the list of favorite models.
     *
     * @param {AbstractBusinessModel} model The model object
     * @param {String} favoriteListId The id of the favorite list
     * @param {String} favoriteListKey The key of the favorite list to store inside cache
     * @returns {Promise<AbstractBusinessModel,Error>} A Promise resolved with the model added, rejected in case of error
     */
    addFavorite(model, favoriteListId, favoriteListKey) {
        if (model == null || model.id == null) {
            return Promise.reject(new Error('You must specify a model (a model object with an id) !'));
        }
        if (favoriteListId == null) {
            return Promise.reject(new Error('You must specify a favoriteListId !'));
        }

        const cacheKey = favoriteListKey || favoriteListId;
        return this
            ._addFavorite(model, favoriteListId)
            .then((modelAdded) => {
                const favoriteListInCache = ServiceCache.hasFromCacheSync(cacheKey) ? ServiceCache.getFromCacheSync(cacheKey) : null;
                if (favoriteListInCache != null && favoriteListInCache.indexOf(modelAdded) === -1) { // model not yet in the cache, add it
                    favoriteListInCache.push(modelAdded);
                }
                return modelAdded;
            });
    }

    /**
     * Remove a model from the list of favorite models.
     *
     * @param {AbstractBusinessModel} model The model object
     * @param {String} favoriteListId The id of the favorite list
     * @param {String} favoriteListKey The key of the favorite list to remove from cache
     * @returns {Promise<AbstractBusinessModel,Error>} A Promise resolved with the model removed, rejected in case of error
     */
    removeFavorite(model, favoriteListId, favoriteListKey) {
        if (model == null || model.id == null) {
            return Promise.reject(new Error('You must specify a model (a model object with an id) !'));
        }
        if (favoriteListId == null) {
            return Promise.reject(new Error('You must specify a favoriteListId !'));
        }

        const cacheKey = favoriteListKey || favoriteListId;
        return this
            ._removeFavorite(model, favoriteListId)
            .then((modelRemoved) => {
                const favoriteListInCache = ServiceCache.hasFromCacheSync(cacheKey) ? ServiceCache.getFromCacheSync(cacheKey) : null;
                if (favoriteListInCache != null) { // Remove model if in the cache
                    const index = favoriteListInCache.indexOf(modelRemoved);
                    favoriteListInCache.splice(index, 1);
                }
                return modelRemoved;
            });
    }

    /**
     * Create a favorite list
     * Please note that some vendors do not offer the possibility to create list (they have an unalterable number of favorite lists)
     * If a favorite list with the name already exists, return it's id.
     *
     * @param {String} name The name of the favorite list
     * @param {Object} [options] Additional options that may be needed by the middleware
     * @returns {Promise<String>} The id of the created list
     */
    createFavoriteList(name, options) {
        if (name == null) {
            return Promise.reject(new Error('You must specify a name !'));
        }
        if (name === this.BLOCKED_LIST_ID || name === this.ALL_LIST_ID) {
            return Promise.reject(new Error(`The specified name '${name}' is reserved !`));
        }
        return this._createFavoriteList(name, options);
    }

    /**
     * Delete a favorite list
     * Please note that some vendors do not offer the possibility to delete a list (they have a unalterable number of favorite lists)
     *
     * @param {String} favoriteListId The id of the favorite list
     * @param {Object} [options] Additional options that may be needed by the middleware
     * @returns {Promise<String>} The id of the deleted list
     */
    deleteFavoriteList(favoriteListId, options) {
        if (favoriteListId == null) {
            return Promise.reject(new Error('You must specify a favoriteListId !'));
        }
        return this._deleteFavoriteList(favoriteListId, options);
    }

    /**
     * Return the list of the favorite lists available on the device.
     * On some vendors, there is a bank of favorite lists (for example 8 predefined favorite lists)
     * On other, you need to create the favorite list before being able to use it.
     *
     * @returns {Promise<Array>} An array of object containing information on the list ([ {id:"favoriteId", name:"favorite name'} ...])
     */
    getAvailableFavoriteLists() {
        return this
            ._getAvailableFavoriteLists()
            .then(lists => lists.filter(list => list.name !== this.BLOCKED_LIST_ID));
    }

    // ////////////////////////////////////////////////////////////////////////////////////////
    // BLOCKED model LIST
    // ////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Add a model to a list of blocked models.
     *
     * @param {AbstractBusinessModel} model A model object.
     * @param {Object} options Additional options
     * @param {Boolean} [options.force=false] If true, don't use the cache
     * @returns {Promise<AbstractBusinessModel|Error>} A Promise resolved when the model has been added.
     */
    addBlocked(model, options) {
        if (model == null || model.id == null) {
            return Promise.reject(new Error('You must specify a model (a model object with an id) !'));
        }
        options = options || {};
        return this
            ._addBlocked(model, options)
            .then((modelAdded) => {
                modelAdded._blocked = true;
                const blockedListInCache = ServiceCache.hasFromCacheSync(this.BLOCKED_LIST_ID) ? ServiceCache.getFromCacheSync(this.BLOCKED_LIST_ID) : null;
                if (blockedListInCache != null) { // model not yet in the cache, add it
                    const modelIndex = blockedListInCache.map(modelInCache => modelInCache.id).indexOf(modelAdded.id);

                    if (modelIndex === -1) {
                        blockedListInCache.push(modelAdded);
                    }
                }
                this.onAddBlocked(modelAdded);
                return modelAdded;
            });
    }

    /**
     * Remove a model from a list of blocked models.
     *
     * @param {AbstractBusinessModel} model A model object.
     * @param {Object} options Additional options
     * @param {Boolean} [options.force=false] If true, don't use the cache
     * @returns {Promise<AbstractBusinessModel|Error>} A Promise resolved when the model has been removed.
     */
    removeBlocked(model, options) {
        if (model == null || model.id == null) {
            return Promise.reject(new Error('You must specify a model (a model object with an id) !'));
        }
        options = options || {};
        return this
            ._removeBlocked(model, options)
            .then((modelRemoved) => {
                modelRemoved._blocked = false;
                const blockedListInCache = ServiceCache.hasFromCacheSync(this.BLOCKED_LIST_ID) ? ServiceCache.getFromCacheSync(this.BLOCKED_LIST_ID) : null;
                if (blockedListInCache != null) { // Remove model if in the cache
                    const modelIndex = blockedListInCache.map(modelInCache => modelInCache.id).indexOf(modelRemoved.id);

                    if (modelIndex !== -1) {
                        blockedListInCache.splice(modelIndex, 1);
                    }
                }
                this.onRemoveBlocked(modelRemoved);
                return modelRemoved;
            });
    }

    // ////////////////////////////////////////////////////////////////////////////////////////
    // ABSTRACT
    // ////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Vendor implementation to add a model to a list of favorite models.
     *
     * @param {AbstractBusinessModel} model The model object
     * @param {String} favoriteListId The id of the favorite list
     * @returns {Promise<AbstractBusinessModel|Error>} A Promise resolved with the model added, rejected in case of error
     * @protected
     */
    _addFavorite(model, favoriteListId) {
        return ServiceErrors.notImplementedPromise('AbstractFavoritesAndBlockedList', '_addFavorite');
    }

    /**
     * Vendor implementation to remove a model from the list of favorite models.
     *
     * @param {AbstractBusinessModel} model The model object
     * @param {String} favoriteListId The id of the favorite list
     * @returns {Promise<AbstractBusinessModel|Error>} A Promise resolved with the model removed, rejected in case of error
     * @protected
     */
    _removeFavorite(model, favoriteListId) {
        return ServiceErrors.notImplementedPromise('AbstractFavoritesAndBlockedList', '_removeFavorite');
    }

    /**
     * Vendor implementation to create a favorite list
     * If the vendor do not offer the possibility to create the list, the call must reject the promise with a clear message.
     * If the list already exists, do not reject the promise, resolve with the id of the existing list.
     *
     * @param {String} name The name of the favorite list
     * @param {Object} [options] Additional options that may be needed by the middleware
     * @returns {Promise<String>} The id of the created list
     * @protected
     */
    _createFavoriteList(name, options) {
        return ServiceErrors.notImplementedPromise('AbstractFavoritesAndBlockedList', '_createFavoriteList');
    }

    /**
     * Vendor implementation to delete a favorite list
     * If the vendor do not offer the possibility to delete list, the call must reject the promise with a clear message.
     *
     * @param {String} favoriteListId The id of the favorite list
     * @param {Object} [options] Additional options that may be needed by the middleware
     * @returns {Promise<String>} The id of the created list
     * @protected
     */
    _deleteFavoriteList(favoriteListId, options) {
        return ServiceErrors.notImplementedPromise('AbstractFavoritesAndBlockedList', '_deleteFavoriteList');
    }

    /**
     * Vendor implementation to get the list of the favorite lists available on the device.
     *
     * @return {Promise<Array>} An array of object containing information on the list ([ {id:"favoriteId", name"favorite name'} ...])
     * @protected
     */
    _getAvailableFavoriteLists() {
        return ServiceErrors.notImplementedPromise('AbstractFavoritesAndBlockedList', '_getAvailableFavoriteLists');
    }

    /**
     * Vendor implementation to get a favorite list
     *
     * @param {String} favoriteListId The id of the favorite list
     * @param {Object} [options] Additional options that may be needed by the middleware
     * @returns {Promise<Array>}
     * @protected
     */
    _getFavoriteList(favoriteListId, options) {
        return ServiceErrors.notImplementedPromise('AbstractFavoritesAndBlockedList', '_getFavoriteList');
    }

    // ////////////////////////////////////////////////////////////////////////////////////////
    // OPTIONAL ABSTRACT
    // ////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Vendor implementation to add a model to the blocked list
     * Optional: by default, the blocked list is considered as a favorite list, and _addBlocked rely on _addFavorite
     *
     * @param {AbstractBusinessModel} model The model object
     * @returns {Promise<AbstractBusinessModel|Error>} A Promise resolved with the model added, rejected in case of error
     * @protected
     */
    _addBlocked(model) {
        return this._addFavorite(model, this.BLOCKED_LIST_ID);
    }

    /**
     * Vendor implementation to remove a model from the blocked list
     * Optional: by default, the blocked list is considered as a favorite list, and _removeBlocked rely on _removeFavorite
     *
     * @param {AbstractBusinessModel} model The model object
     * @returns {Promise<AbstractBusinessModel|Error>} A Promise resolved with the model removed, rejected in case of error
     * @protected
     */
    _removeBlocked(model) {
        return this._removeFavorite(model, this.BLOCKED_LIST_ID);
    }

    /**
     * event to fire when a source is locked
     * @param {AbstractBusinessModel} modelAdded
     */
    onAddBlocked(modelAdded) {}

    /**
     * event to fire when a source is unlocked
     * @param {AbstractBusinessModel} modelRemoved
     */
    onRemoveBlocked(modelRemoved) {}
}

export default AbstractFavoritesAndBlockedList;
