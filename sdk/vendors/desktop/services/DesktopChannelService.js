import AbstractChannelService from '../../../services/AbstractChannelService';
import LocalStorage from '../../../services/helpers/LocalStorage';
import Arrays from '../../../utils/Arrays';
import DesktopChannel from '../models/DesktopChannel';
import channelData from '../data/ChannelData';

/**
 * class for channel service for desktop vendor implementation
 * @alias channelService
 * @name DesktopChannelService
 */
class DesktopChannelService extends AbstractChannelService {
    /**
     * @constructor
     */
    constructor() {
        super();
        this.videos = [
            'videos/broadcast1.mp4',
            'videos/broadcast2.mp4'
        ];

        // For MHtml5FavoritesAndBlockedList
        this.STORAGE_KEY_FAVORITES = 'Favorite channels';
        this.STORAGE_KEY_FAVORITES_IDS = 'Favorite channels list ids';

        this.create();
    }

    /**
     * create fake data for channelList
     */
    create() {
    // Blocked channel
        const blockedChannelMap = this._getBlockedChannelMap(); // channel.id : true

        // Create channel list
        this._allChannelList = this._createChannelList(channelData, blockedChannelMap);
    }

    /**
     * Vendor implementation to create a new channel model.
     *
     * @param {Object} properties The model properties
     * @returns {DesktopChannel} The channel model.
     */
    _newChannel(properties) {
        return new DesktopChannel(properties);
    }

    /**
     * delete a favorite list
     * @param {String} favoriteListId
     * @param {Object} options
     * @returns {*}
     * @protected
     */
    _deleteFavoriteList(favoriteListId, options) {
        return this._getAvailableFavoriteLists()
            .then((ids) => {
                let favoriteListIndex;
                let name;
                for (let i = 0; i < ids.length; i++) {
                    if (ids[i].id === favoriteListId) {
                        favoriteListIndex = i;
                        name = ids[i].name;
                    }
                }
                if (favoriteListIndex == null) {
                    return null;
                }

                // Remove the list
                ids.splice(favoriteListIndex, 1);

                return LocalStorage.store(this.STORAGE_KEY_FAVORITES_IDS, ids)
                    .then(() => {
                        const listId = `${this.STORAGE_KEY_FAVORITES}:${name}`;
                        LocalStorage.remove(listId);
                        return favoriteListId;
                    });
            });
    }

    /** ***************************************************************************************
     * IMPLEMENTATION
     **************************************************************************************** */
    /**
     * set current channel list id
     * @param {String} listId
     * @returns {Promise<String>}
     * @protected
     */
    _setCurrentChannelListId(listId) {
        return Promise.resolve(listId);
    }

    /**
     * get all list id
     * @param {String} listId
     * @param {Object} options
     * @returns {Promise<Array>}
     * @protected
     */
    _getAllList(listId, options) {
        return Promise.resolve(this._allChannelList);
    }

    /**
     * Get nearest channel by number
     * Returns the channel with given number if it is present.
     * Otherwise returns the closest of previous and next channels.
     *
     * @param {Number|AbstractChannel} channel channel number
     * @param {Object} [options]
     * @param {Number} [options.type] - The type of channel to look for : $Channel.TV_TYPE or $Channel.Radio_TYPE. If omitted, any type will match.
     * @param {Boolean} [options.cyclic=true] - Whether or not to loop at the beginning and the end of the channel list.
     * @param {String} [options.listId=null] If set, get channel on a specific list
     * @returns {Promise} nearest channel
     */
    getNearestChannel(channel, options) {
        options = options || {};
        options.cyclic = false;
        // Get the channel list and return the channel
        return this.getNextChannel(channel, options)
            .then(nextChannel => (nextChannel || this.getPreviousChannel(channel, options)));
    }

    /** ***************************************************************************************
     * HELPERS
     **************************************************************************************** */

    /**
     * converts fake channel list data to DesktopChannel[]
     * @param {Object[]} genericChannelList
     * @param {Object[]} blockedChannelMap
     * @returns {Array}
     * @protected
     */
    _createChannelList(genericChannelList, blockedChannelMap) {
        const channelList = new Array(genericChannelList.length);

        for (let i = 0; i < genericChannelList.length; i++) {
            const channel = genericChannelList[i];
            channel.url = this.videos[Math.floor(Math.random() * this.videos.length)];

            channelList[i] = this._newChannel().setNativeObject(channel, true);
            if (blockedChannelMap[channel.id]) {
                channelList[i]._blocked = true;
            }
        }
        return channelList;
    }

    /**
     * get blocked channel map from LocalStorage
     * @returns {Object}
     * @protected
     */
    _getBlockedChannelMap() {
        const blockedChannelMap = {}; // channel.id : true
        const blockedListId = `${this.STORAGE_KEY_FAVORITES}:${this.BLOCKED_LIST_ID}`;
        try {
            const blockedList = LocalStorage.retrieveSync(blockedListId);
            if (blockedList == null) {
                LocalStorage.storeSync(blockedListId, []);
            } else {
                for (let i = 0; i < blockedList.length; i++) {
                    blockedChannelMap[blockedList[i]] = true;
                }
            }
        } catch (e) {
            // console.error('Can not get or initialize the blocked channel list', e);
        }
        return blockedChannelMap;
    }

    /** ***************************************************************************************
     * FAVORITE LISTs
     **************************************************************************************** */

    /**
     * @param {AbstractChannel} channel The model object
     * @param {String} favoriteListId The id of the favorite list
     * @returns {Promise<AbstractChannel|Error>} A Promise resolved with the model added, rejected in case of error
     * @protected
     * @override
     */
    _addFavorite(channel, favoriteListId) {
        return this
            ._getFavoriteList(favoriteListId)
            .then((favoriteChannels) => {
                favoriteChannels = favoriteChannels.map(favChannel => favChannel.id);
                favoriteChannels.push(channel.id);
                return favoriteChannels;
            })
            .then(LocalStorage.store.bind(null, `${this.STORAGE_KEY_FAVORITES}:${favoriteListId}`))
            .then(() => channel);
    }

    /**
     * @param {AbstractChannel} channel The model object
     * @param {String} favoriteListId The id of the favorite list
     * @returns {Promise<AbstractChannel|Error>} A Promise resolved with the model removed, rejected in case of error
     * @override
     * @protected
     */
    _removeFavorite(channel, favoriteListId) {
        return this._getFavoriteList(favoriteListId)
            .then((favoriteChannels) => {
                const index = Arrays.search(favoriteChannels, channel.id, 'id');
                favoriteChannels = favoriteChannels.map(favChannel => favChannel.id);
                favoriteChannels.splice(index, 1);
                return favoriteChannels;
            })
            .then(LocalStorage.store.bind(null, `${this.STORAGE_KEY_FAVORITES}:${favoriteListId}`))
            .then(() => channel);
    }

    /**
     * @return {Promise<Array>} An array of object containing information on the list ([ {id:"favoriteId", name"favorite name'} ...])
     * @override
     * @protected
     */
    _getAvailableFavoriteLists() {
        return LocalStorage.retrieve(this.STORAGE_KEY_FAVORITES_IDS)
            .then((ids) => {
                if (ids == null) {
                    // Initialize the list
                    return LocalStorage.store(this.STORAGE_KEY_FAVORITES_IDS, []);
                }
                return ids;
            });
    }

    /**
     * @param {String} name The name of the favorite list
     * @param {Object} [options] Additional options that may be needed by the middleware
     * @returns {Promise<String>} The id of the created list
     * @override
     * @protected
     */
    _createFavoriteList(name) {
        return this._getAvailableFavoriteLists()
            .then((ids) => {
                for (let i = 0; i < ids.length; i++) {
                    if (ids[i].id === name) { // Favorite list already exists
                        return ids[i];
                    }
                }
                // Add the list
                ids.push({
                    id: name,
                    name
                });
                return LocalStorage.store(this.STORAGE_KEY_FAVORITES_IDS, ids)
                    .then(() => {
                        const listId = `${this.STORAGE_KEY_FAVORITES}:${name}`;
                        return LocalStorage.store(listId, []);
                    });
            })
            .then(() => name);
    }

    /**
     * @param {String} favoriteListId The id of the favorite list
     * @param {Object} [options] Additional options that may be needed by the middleware
     * @returns {Promise<Array>}
     * @override
     * @protected
     */
    _getFavoriteList(favoriteListId, options) {
        const listId = `${this.STORAGE_KEY_FAVORITES}:${favoriteListId}`;
        return LocalStorage.retrieve(listId)
            .then((ids) => {
                if (ids == null) {
                    throw new Error(`The favorite list '${listId}' does not exist !`);
                }
                // The list is a list of ids, need to create a list of channel
                const favoriteIds = {};
                for (let i = 0; i < ids.length; i++) { // Create a map of favorite channel ids
                    favoriteIds[ids[i]] = true;
                }
                const favoriteChannelsList = [];
                if (ids.length > 0) {
                    for (let i = 0; i < this._allChannelList.length; i++) {
                        if (favoriteIds[this._allChannelList[i].id]) {
                            favoriteChannelsList.push(this._allChannelList[i]);
                        }
                    }
                }
                return favoriteChannelsList;
            });
    }

    /** ***************************************************************************************
     * FILTER LISTs
     **************************************************************************************** */

    /**
     * return filtered list according to id
     * @param {String} id
     * @returns {Promise<AbstractChannel[]>}
     * @override
     * @protected
     */
    _getFilterList(id) {
        return this.find(channel => channel);
    }
}

export default DesktopChannelService;
