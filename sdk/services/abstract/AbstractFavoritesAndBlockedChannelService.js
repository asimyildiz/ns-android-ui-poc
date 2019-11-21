import AbstractFavoritesAndBlockedList from './AbstractFavoritesAndBlockedList';

/**
 * class for object properties
 * @name AbstractFavoritesChannelService
 */
class AbstractFavoritesAndBlockedChannelService extends AbstractFavoritesAndBlockedList {
    /**
     * @constructor
     */
    constructor() {
        super();
        this.clearAllFavoriteLists = false;
        this.initFavorites();
    }

    /** *********************************************************************************************************
     * FAVORITES
     ********************************************************************************************************** */

    /**
     * init Favorite list
     * @returns {Promise}
     */
    initFavorites() {
        return this.getAvailableFavoriteLists()
            .then(this.checkFavorites.bind(this));
    }

    /**
     * Check and create Favorite list if needed
     * @param {String[]} list - favorite list names
     * @returns {Promise}
     */
    checkFavorites(list) {
        const favoritesConfigList = AbstractFavoritesAndBlockedList.favoriteList || [];
        if (list.length < favoritesConfigList.length) {
            return this._initFavorites(list, favoritesConfigList)
                .then(this.getAvailableFavoriteLists.bind(this));
        }
        return Promise.resolve(list);
    }

    /**
     * Delete current favorites list and then create new ones
     * @param {String[]} currentList
     * @param {String[]} configList
     * @returns {Promise}
     * @protected
     */
    _initFavorites(currentList, configList) {
        let promise = Promise.resolve();
        if (this.clearAllFavoriteLists) {
            // only delete favorite lists if it is forced from config
            promise = this.__deleteAllFavoritesList(currentList);
        }

        return promise
            .then(this.__createAllFavoritesList.bind(this, configList));
    }

    /**
     * Delete all favorites lists
     * @param {String[]} currentList
     * @returns {Promise}
     * @private
     */
    __deleteAllFavoritesList(currentList) {
    // does not work with Promise.all !
    // do not delete accidentally the blocked channel list
        if (currentList.length > 0 && currentList[0].id !== AbstractFavoritesAndBlockedList.BLOCKED_CHANNEL_LIST_ID) {
            return this.deleteFavoriteList(currentList[0].id)
                .then(() => {
                    currentList.shift();
                    return this.__deleteAllFavoritesList(currentList);
                });
        }
        return Promise.resolve();
    }

    /**
     * Create all favorites list
     * @param {String[]} configList
     * @returns {Promise}
     * @private
     */
    __createAllFavoritesList(configList) {
    // does not work with Promise.all !
        if (configList.length > 0) {
            return this.createFavoriteList(configList[0])
                .then(() => {
                    configList.shift();
                    return this.__createAllFavoritesList(configList);
                });
        }
        return Promise.resolve();
    }

    /**
     * TODO [Workaround] [UHDT6144XFW-193] FW problem, this context is not correct inside lists.filter function. [DTMYILDIZ]
     * @returns {Promise<String[]>}
     * @override
     */
    getAvailableFavoriteLists() {
        return this._getAvailableFavoriteLists()
            .then(lists => lists.filter(list => list.name !== this.BLOCKED_LIST_ID))
            .then(this.checkFavorites.bind(this))
            .then((list) => {
                for (let i = 0; i < list.length; i++) {
                    list[i].key = list[i].name;
                }
                return list;
            });
    }

    /**
     * Return FavoriteLists sorted by name
     * TODO DEPENDENT TO TRANSLATION MODULE, SO IT SHOULD NOT BE HERE
     * @param {Object} translator
     * @returns {Promise<String[]>}
     */
    getAvailableFavoriteListsSortedByName(translator) {
        return this.getAvailableFavoriteLists()
            .then(this.sortFavoriteListByName.bind(this, translator));
    }

    /**
     * Return FavoriteLists by name
     * @param {String} name
     * @returns {Promise<String[]>}
     */
    getFavoriteListByName(name) {
        return this.getAvailableFavoriteLists()
            .then((list) => {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].name === name) {
                        return list[i];
                    }
                }
                return null;
            });
    }

    /**
     * Rename specified favorite channel list
     * @param {AbstractChannel} oldChannel old channel item
     * @param {String} newName new channel name
     * @returns {*}
     */
    renameFavoriteChannelList(oldChannel, newName) {
        return this.createFavoriteList(newName)
            .then(name => this._getFavoriteList(oldChannel.name)
                .then(items => this._duplicateFavoriteChannelList(0, items, name)))
            .then(() => this.deleteFavoriteList(oldChannel.id));
    }

    /**
     * Duplicate channel list in a new one
     * @param {Number} index
     * @param {String[]} items
     * @param {String} name
     * @returns {Promise}
     * @protected
     */
    _duplicateFavoriteChannelList(index, items, name) {
        if (index >= items.length) {
            return Promise.resolve();
        }
        return this.addFavorite(items[index], name)
            .then(() => this._duplicateFavoriteChannelList(index + 1, items, name));
    }

    /**
     * sort favorite list by Name
     * TODO DEPENDENT TO TRANSLATION MODULE, SO IT SHOULD NOT BE HERE
     * @param {Object} translator - translator
     * @param {String[]} list - favorites list to sort
     * @returns {String[]} list of favorite
     */
    sortFavoriteListByName(translator, list) {
        return list.sort((a, b) => {
            const nameA = translator(a.name.toUpperCase());
            const nameB = translator(b.name.toUpperCase());
            if (nameA < nameB) {
                return -1;
            } if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }
}

export default AbstractFavoritesAndBlockedChannelService;
