import AbstractFilterChannelService from './abstract/AbstractFilterChannelService';
import AbstractFavoritesAndBlockedList from './abstract/AbstractFavoritesAndBlockedList';
import AbstractChannel from './models/AbstractChannel';
import ServiceCache from './helpers/ServiceCache';
import ServiceErrors from './helpers/ServiceErrors';
import isFunction from '../utils/IsFunction';
import Arrays from '../utils/Arrays';

/**
 * class for channel service
 * @alias channelService
 */
class AbstractChannelService extends AbstractFilterChannelService {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
    /**
     * @type {Number}
     */
    static byNumberComparator(a, b) {
        return a.number - b.number;
    }

    /**
     * @type {Number}
     */
    static byNameComparator(a, b) {
        const aTitle = a.name.toUpperCase().trim();
        const bTitle = b.name.toUpperCase().trim();
        const turkishAlphabet = '0123456789AaBbCcÇçDdEeFfGgĞğHhIıİiJjKkLlMmNnOoÖöPpQqRrSsŞşTtUuÜüVvWwXxYyZz';
        if (aTitle.length === 0 || bTitle.length === 0) {
            return aTitle.length - bTitle.length;
        }
        for (let i = 0; i < aTitle.length && i < bTitle.length; i++) {
            const ai = turkishAlphabet.indexOf(aTitle[i]);
            const bi = turkishAlphabet.indexOf(bTitle[i]);
            if (ai !== bi) {
                return ai - bi;
            }
        }
        return -1;
    }

    /**
     * @type {Function}
     */
    static byTypeFilter(type) {
        return function (channel) {
            if (type == null) return true;
            // Need to apply the type as a mask to know if type match
            // TV_TYPE (1) & TV_TYPE (1) => 1
            // TV_TYPE (1) & ALL_TYPE (7) => 1
            // RADIO_TYPE (2) & ALL_TYPE (7) => 2
            // RADIO_TYPE (2) & TV_TYPE (1) => 0
            return (channel.type & type) !== 0;
        };
    }

    /**
     * @constructor
     */
    constructor() {
        super();
        this.__channelbyId = {};

        this._currentChannelListId = AbstractFavoritesAndBlockedList.ALL_CHANNEL_LIST_ID;
        this._currentChannelListType = AbstractChannel.ALL_TYPE;

        this._activeFilteredListId = null;
    }

    /** ***************************************************************************************
     * MODELs FACTORY
     **************************************************************************************** */

    /**
     * Create a new channel model.
     * Always prefer using these method instead of using new AbstractChannel(),
     * as these method will always create the model with the right implementation.
     *
     * @param {Object} properties The model properties
     * @returns {AbstractChannel} The channel model
     */
    newChannel(properties) {
        const channel = this._newChannel(properties);
        if (channel instanceof AbstractChannel) {
            return channel;
        }
        throw new Error('The channel model must inherits from AbstractChannel !');
    }

    /** ***************************************************************************************
     * PUBLIC API
     **************************************************************************************** */
    /** ***************************************************************************************
     * CHANNEL LIST
     **************************************************************************************** */
    /**
     * Change the current list.
     *
     * @param {String} listId A predefined list id or a favorite list id
     * @param {Number} [type] The channel type (See AbstractChannel.XXX_TYPE)
     * @param {Object} [options] Additional options
     * @param {Boolean} [options.skipNotify] - If true do not fire the onChannelListChange event
     * @returns {Promise<Object, Error>} Returns a promise resolved with {listId:listId, type:listType} or rejected if the list does not exist
     * @fires AbstractChannelService#onChannelListChange
     */
    setCurrentChannelListId(listId, type, options) {
        options = options || {};
        if (listId == null) {
            return ServiceErrors.throwErrorAsPromise('You must specify the id of a list !');
        }
        type = type || AbstractChannel.ALL_TYPE;
        if (listId === this._currentChannelListId && type === this._currentChannelListType) {
            // The current list is already the one that need to be set
            return Promise.resolve({
                listId,
                type
            });
        }
        return this
            ._setCurrentChannelListId(listId)
            .then((currentListId) => {
                const oldId = this._currentChannelListId;
                const oldType = this._currentChannelListType;
                this._currentChannelListId = currentListId;
                this._currentChannelListType = type;

                if (options.skipNotify !== true) {
                    this._onChannelListChange({
                        id: currentListId,
                        type
                    }, {
                        id: oldId,
                        type: oldType
                    });
                }

                return {
                    currentListId,
                    type
                };
            });
    }

    /**
     * Get the current list Id.
     *
     * @returns {Promise<Object, Error>} Returns a promise resolved with {id:listId, type:listType}
     */
    getCurrentChannelListId() {
        return Promise.resolve({
            listId: this._currentChannelListId,
            type: this._currentChannelListType
        });
    }

    /**
     * Get the channels of the current channel list , sorted by LCN.
     * You can use the listId option to get a the channel of a specific list.
     *
     * @param {Object} [options] Additional options
     * @param {Number} [options.type] - The type of channel to look for : $Channel.TV_TYPE or $Channel.Radio_TYPE. If omitted, any type will match.
     * @param {Boolean} [options.force=false] If true, don't use the value stored in the cache
     * @param {Object} [options.filter] filter to use
     * @param {String} [options.listId=null] If set, get channel on a specific list
     * @param {Function} [options.sort=$ChannelService.byNumberComparator] If a function is specified, will sort the list by channel numbers
     * @returns {Promise<AbstractChannel[],Error>} A promise resolved with an array of channels or rejected in case of problem
     */
    getChannelList(options) {
        options = options || {};
        if (!options.listId && options.filter && Object.keys(options.filter).length !== 0 && options.filter.name) {
            options.listId = options.filter.key;
            this._activeFilteredListId = options.name;
        }
        const filter = options.filter || {};
        const listId = options.listId || this._currentChannelListId;
        let cacheId = options.cacheId || listId;
        const type = options.type || this._currentChannelListType;
        let getListOfAllChannelsAsPromise; // all channels, any type
        let needCacheUpdate = false;
        if (!options.force && Object.keys(filter).length === 0 && ServiceCache.hasFromCacheSync(listId)) {
            // Retrieve from cache if available.
            getListOfAllChannelsAsPromise = ServiceCache.getFromCache(listId);
        } else if (filter && filter.isFilter && filter.id) {
            getListOfAllChannelsAsPromise = this.getFilterList(filter.id);
            cacheId = filter.id;
            needCacheUpdate = true;
        } else {
            cacheId = listId;
            needCacheUpdate = true;
            if (listId === AbstractFavoritesAndBlockedList.ALL_CHANNEL_LIST_ID) {
                getListOfAllChannelsAsPromise = this._getAllList(options);
            } else {
                getListOfAllChannelsAsPromise = this._getFavoriteList(listId, options);
            }
        }

        return getListOfAllChannelsAsPromise
            .then((list) => {
                if (this._currentOrderKey) {
                    const sort = this.getCurrentOrderMethod();
                    if (isFunction(sort)) {
                        list = list.sort(sort);
                    }
                }
                this._updateChannelIndexes(list); // quick ref channelId => channel
                if (needCacheUpdate && cacheId) { // TODO THIS CODE BLOCK IS RUNNING TOO MUCH TIME. SHOULD BE CHECKED LATER
                    ServiceCache.addToCacheSync(cacheId, list);
                }
                return Promise.resolve(list);
            })
            .then(list => list.filter(AbstractChannelService.byTypeFilter(type)));
    }

    /**
     * return channel list filter accordingly
     * @param {Object} filter
     * @returns {Promise<AbstractChannel[]>}
     */
    getChannelListByFilter(filter) {
        let promiseGetChannelList = null;
        if (filter.isFilter) {
            promiseGetChannelList = this.getFilterList(filter.id);
        } else {
            promiseGetChannelList = this.getFavoriteList(filter);
        }
        return promiseGetChannelList;
    }

    /** *********************************************************************************************************
     * ORDERING
     ********************************************************************************************************** */
    /**
     * Oder the channel list by number (order by default)
     * With the cache mechanism, the next call of getChannelList will be sorted by number until a call of orderChannelListByName
     * @returns {*}
     */
    orderChannelListByNumber() {
        if (!this._currentOrderKey || this._currentOrderKey === 'CHANNELS_ORDERLIST_BREADCRUMB_NAME') {
            this._currentOrderKey = 'CHANNELS_ORDERLIST_BREADCRUMB_NUMBER';
            return this.getOrderedChannelList();
        }
        return Promise.resolve();
    }

    /**
     * Order the channel list by name
     * With the cache mechanism, the next call of getChannelList will be sorted by name until a call of orderChannelListByNumber
     * @returns {*}
     */
    orderChannelListByName() {
        if (!this._currentOrderKey || this._currentOrderKey === 'CHANNELS_ORDERLIST_BREADCRUMB_NUMBER') {
            this._currentOrderKey = 'CHANNELS_ORDERLIST_BREADCRUMB_NAME';
            return this.getOrderedChannelList();
        }
        return Promise.resolve();
    }

    /**
     * get ordered channel list
     * @returns {*}
     */
    getOrderedChannelList() {
        return this.getFilter()
            .then((filter) => {
                const listId = filter && filter.name && filter.name.indexOf('CHANNELS_CHANLIST_VALUE_CHGPUSE') > -1 ? filter.name : undefined;
                return this.getChannelList({
                    force: false,
                    filter,
                    listId
                });
            });
    }

    /**
     * returns current order method based on current order type
     * @returns {*}
     */
    getCurrentOrderMethod() {
        switch (this._currentOrderKey) {
        case 'CHANNELS_ORDERLIST_BREADCRUMB_NAME':
            return AbstractChannelService.byNameComparator;
        case 'CHANNELS_ORDERLIST_BREADCRUMB_NUMBER':
        default:
            return AbstractChannelService.byNumberComparator;
        }
    }

    /**
     * reset channel list order
     */
    clearChannelListOrder() {
        this._currentOrderKey = null;
    }

    /**
     * Get the name of the current order of the channel list
     * TODO DEPENDENT TO TRANSLATION MODULE, SO IT SHOULD NOT BE HERE
     * @returns {*}
     */
    getChannelListOrderName(translator) {
        return Promise.resolve(translator(this._currentOrderKey));
    }

    /** *********************************************************************************************************
     * LOCKED / BLOCKED
     ********************************************************************************************************** */
    /**
     * Get locked and blocked channels
     * @returns {*}
     */
    getBlockedAndLockedChannelList() {
        return Promise.all([
            this.getBlockedChannelList(),
            this.getLockedChannelList()
        ]).then(results => results[0].concat(results[1]));
    }

    /**
     * Get manual blocked channel list
     * @returns {*}
     */
    getBlockedChannelList() {
        return this.getBlockedList()
            .then((blocked) => {
                const newItems = [];
                const listPromises = [];
                // We want to return the channels object and not the list of ids
                for (let i = 0; i < blocked.length; i++) {
                    const channel = blocked[i];
                    listPromises.push(this.getChannelById(channel.id)
                        .then((currentChannel) => {
                            newItems.push(currentChannel);
                        }));
                }
                return Promise.all(listPromises)
                    .then(() => Promise.resolve(newItems));
            });
    }

    /**
     * Get unlockable channel list (adults channels)
     * @returns {*}
     */
    getLockedChannelList() {
        return this.find(item => item.isLocked());
    }

    /** ***************************************************************************************
     * SHORTCUTs
     **************************************************************************************** */

    /**
     * Get the list of TV channels, sorted by LCN.

     * @param {Object} [options] Additional options
     * @param {Boolean} [options.force=false] If true, don't use the value stored in the cache
     * @param {String} [options.listId=null] If set, get channel on a specific list
     * @returns {Promise<AbstractChannel[]>}
     */
    getTVChannelList(options) {
        options = options || {};
        options.type = AbstractChannel.TV_TYPE;
        return this.getChannelList(options);
    }

    /**
     * Get the list of radio channels, sorted by LCN.
     *
     * @param {Object} [options] Additional options
     * @param {Boolean} [options.force=false] If true, don't use the value stored in the cache
     * @param {String} [options.listId=null] If set, get channel on a specific list
     * @returns {Promise<AbstractChannel[]>}
     */
    getRadioChannelList(options) {
        options = options || {};
        options.type = AbstractChannel.RADIO_TYPE;
        return this.getChannelList(options);
    }

    /**
     * Get the list of other channels (neither TV nor radio), sorted by LCN.
     *
     * @param {Object} [options] Additional options
     * @param {Boolean} [options.force=false] If true, don't use the value stored in the cache
     * @param {String} [options.listId=null] If set, get channel on a specific list
     * @returns {Promise<AbstractChannel[]>}
     */
    getOtherChannelList(options) {
        options = options || {};
        options.type = AbstractChannel.OTHER_TYPE;
        return this.getChannelList(options);
    }

    /**
     * Get the favorite list by it's id
     *
     * @param {Object} filter The filter of the favorite
     * @param {Object} [options] Additional options
     * @param {Number} [options.type] - The type of channel to look for : $Channel.TV_TYPE or $Channel.Radio_TYPE. If omitted, any type will match.
     * @param {Boolean} [options.force=false] If true, don't use the value stored in the cache
     * @param {Function} [options.sort=$ChannelService.byNumberComparator] If a function is specified, will sort the list by channel numbers
     * @returns {Promise<AbstractChannel[],Error>} A promise resolved with an array of channels or rejected in case of problem
     */
    getFavoriteList(filter, options) {
        if (filter.name == null) {
            return ServiceErrors.throwErrorAsPromise('You must specify the id of the favorite list !');
        }
        options = options || {};
        options.listId = filter.name;
        options.cacheId = filter.id;
        return this.getChannelList(options);
    }

    /**
     * Get all the blocked channels of a given type (TV or RADIO)
     *
     * @param {Object} [options] Additional options
     * @param {Number} [options.type] - The type of channel to look for : $Channel.TV_TYPE or $Channel.Radio_TYPE. If omitted, any type will match.
     * @param {Boolean} [options.force=false] If true, don't use the value stored in the cache
     * @param {Function} [options.sort=AbstractChannelService.byNumberComparator] If a function is specified, will sort the list by channel numbers
     */
    getBlockedList(options) {
        options = options || {};
        options.listId = AbstractFavoritesAndBlockedList.BLOCKED_CHANNEL_LIST_ID;
        return this.getChannelList(options);
    }

    /**
     * Clears channel cache
     */
    dropChannelCache() {
        this.clearFilteredList(); // we need to also clear filter list here
        ServiceCache.deleteFromCacheSync(AbstractFavoritesAndBlockedList.ALL_CHANNEL_LIST_ID);
    }

    /** ***************************************************************************************
     * CHANNEL
     **************************************************************************************** */
    /**
     * Return a channel by id
     * @param {String} id
     * @param {Object} options
     * @returns {*|Promise<AbstractChannel>}
     */
    getChannelById(id, options) {
        return this.getChannel(id, options, 'id');
    }

    /**
     * Return a channel by number
     * @param {String} number
     * @param {Object} options
     * @returns {*|Promise<AbstractChannel>}
     */
    getChannelByNumber(number, options) {
        return this.getChannel(number, options, 'number');
    }

    /**
     * returns a channel by searching it from sid from channel triplet
     * @param {String} id
     * @param {Object} options
     * @returns {*|Promise<AbstractChannel>}
     */
    getChannelBySId(id, options) {
    // Check input args
        if (id == null) {
            return ServiceErrors.throwErrorAsPromise('getChannel: id is null !');
        }
        options = options || {};
        // Get the channel list and return the channel
        return this
            .getChannelList(options)
            .then((channelList) => {
                for (let i = 0; i < channelList.length; i++) {
                    const channelIdParts = channelList[i].id.split('.');
                    if (channelIdParts && channelIdParts.length === 3 && channelIdParts[2] === id) {
                        return channelList[i];
                    }
                }
                return null;
            });
    }

    /**
     * Get a channel by its ID.
     * The channel must belongs to the list
     *
     * @param {String} id Id of channel
     * @param {Object} [options] Additional options
     * @param {Number} [options.type] - The type of channel to look for : $Channel.TV_TYPE or $Channel.Radio_TYPE. If omitted, any type will match.
     * @param {Boolean} [options.force=false] If true, refresh the channel list (ie renew the cache)
     * @param {String} [options.listId=null] If set, get channel on a specific list
     * @param {String} key of the selector
     * @returns {Promise<AbstractChannel|Error>} A promise resolved with the channel data (or undefined if not found).
     */
    getChannel(id, options, key) {
    // Check input args
        if (id == null) {
            return ServiceErrors.throwErrorAsPromise('getChannel: id is null !');
        }
        options = options || {};
        // Get the channel list and return the channel
        return this
            .getChannelList(options)
            .then((channelList) => {
                const index = Arrays.search(channelList, id, key || 'id');
                return channelList[index];
            });
    }

    /**
     * Get multiple channels by number
     * @param {String[]} numberList
     * @returns {*|Promise<AbstractChannel[]>}
     */
    getMultipleChannelsByNumber(numberList) {
        const list = [];
        return this.getChannelList()
            .then((channelList) => {
                for (let i = 0; i < numberList.length; i++) {
                    const index = Arrays.search(channelList, numberList[i], 'number');
                    if (index > 0) {
                        list.push(channelList[index]);
                    }
                }
                return list;
            });
    }

    /**
     * Get the channel after a given one.
     *
     * @param {Number|AbstractChannel} channel - The reference channel number or object.
     *        If a number is given, it does not have to exist in the channel list.
     * @param {Object} [options]
     * @param {Number} [options.type] - The type of channel to look for : $Channel.TV_TYPE or $Channel.Radio_TYPE. If omitted, any type will match.
     * @param {Boolean} [options.cyclic=true] - Whether or not to loop at the end of the channel list.
     * @param {Boolean} [options.force=false] If true, refresh the channel list (ie renew the cache)
     * @param {String} [options.listId=null] If set, get channel on a specific list
     * @returns {Promise<AbstractChannel|Error>} a promise (next channel object, error).
     */
    getNextChannel(channel, options) {
    // Check input args
        if (channel == null) {
            return ServiceErrors.throwErrorAsPromise('getNextChannel: channel is null !');
        }
        options = options || {};
        // Get the channel list and return the channel
        return this
            .getChannelList(options)
            .then((channelList) => {
                const number = channel.number || channel;
                let index = Arrays.interpolationSearch(channelList, number, 'number');
                if (index < 0) {
                    // This channel number doesn't exist. Start the search here.
                    index = -2 - index;
                }

                const len = channelList.length;
                let i = index;
                while (true) {
                    i++;
                    if (i === len) {
                        if (options.cyclic === false) {
                            break;
                        }
                        i = 0;
                    } else if (i === index) {
                        break;
                    }
                    return channelList[i];
                }
                return null;
            });
    }

    /**
     * Get the channel before a given one.
     *
     * @param {Number|AbstractChannel} channel - The reference channel number or object.
     *        If a number is given, it does not have to exist in the channel list.
     * @param {Object} [options]
     * @param {Number} [options.type] - The type of channel to look for : $Channel.TV_TYPE or $Channel.Radio_TYPE. If omitted, any type will match.
     * @param {Boolean} [options.cyclic=true] - Whether or not to loop at the beginning of the channel list.
     * @param {Boolean} [options.force=false] If true, refresh the channel list (ie renew the cache)
     * @param {String} [options.listId=null] If set, get channel on a specific list
     * @returns {Promise<AbstractChannel|Error>} a promise (next channel object, error).
     */
    getPreviousChannel(channel, options) {
    // Check input args
        if (channel == null) {
            return ServiceErrors.throwErrorAsPromise('getPreviousChannel: channel is null !');
        }
        options = options || {};
        // Get the channel list and return the channel
        return this
            .getChannelList(options)
            .then((channelList) => {
                const number = channel.number || channel;
                let index = Arrays.interpolationSearch(channelList, number, 'number');
                if (index < 0) {
                    // This channel number doesn't exist. Start the search here.
                    index = -1 - index;
                }

                const len = channelList.length;
                let i = index;
                while (true) {
                    i--;
                    if (i < 0) {
                        if (options.cyclic === false) {
                            break;
                        }
                        i = len - 1;
                    } else if (i === index) {
                        break;
                    }
                    return channelList[i];
                }
                return null;
            });
    }

    /**
     * Returns the closest channel by number.
     *
     * @param {Number|AbstractChannel} channel - the reference channel, or its number.
     * @param {Object} [options]
     * @param {Number} [options.type] - The type of channel to look for : $Channel.TV_TYPE or $Channel.Radio_TYPE. If omitted, any type will match.
     * @param {Boolean} [options.cyclic=true] - Whether or not to loop at the beginning and the end of the channel list.
     * @param {String} [options.listId=null] If set, get channel on a specific list
     * @returns {Promise<AbstractChannel|Error>} channel, or undefined if the channel list was empty.
     */
    getNearestChannel(channel, options) {
    // Check input args
        if (channel == null) {
            return ServiceErrors.throwErrorAsPromise('getPreviousChannel: channel is null !');
        }
        options = options || {};
        // Get the channel list and return the channel
        const self = this;
        return this
            .getPreviousChannel(channel, options)
            .then(previous => self
                .getNextChannel(channel, options)
                .then((next) => {
                    if (!previous) {
                        return next;
                        /* can be undefined; */
                    }
                    if (!next) {
                        return previous;
                        /* always defined if we got here */
                    }

                    // here, both previous and next channels are defined.
                    const number = channel.number || channel;
                    const $prev = Math.abs(previous.number - number);
                    const $next = Math.abs(next.number - number);
                    if ($prev <= $next) {
                        return previous;
                    }
                    return next;
                }));
    }

    /** ***************************************************************************************
     * OVERRIDE
     **************************************************************************************** */
    /**
     * Find channel(s) using a function as filter.
     *
     * @param {Function|null} filterFunction A function that takes a channel in arg and return true or false (true mean keep channel)
     * @param {Object} [options] Additional options
     * @param {Boolean} [options.force=false] If true, don't use the value stored in the cache
     * @param {String} [options.listId=null] If set, get channel on a specific list
     * @returns {Promise<AbstractChannel[], Error>} A promise (channel(s), error)
     * @override
     */
    _find(filterFunction, options) {
        options = options || {};
        options.listId = this._currentChannelListId;
        return this.getChannelList(options);
    }

    /** ***************************************************************************************
     * PROTECTED
     **************************************************************************************** */

    /**
     * This method updates the internal channel index.
     * @param {AbstractChannel[]} channelList
     * @protected
     */
    _updateChannelIndexes(channelList) {
        if (!channelList) {
            return;
        }
        if (!this.__channelbyId) {
            this.__channelbyId = {};
        }
        const byId = this.__channelbyId;
        for (let i = 0; i < channelList.length; i++) {
            const channel = channelList[i];
            byId[channel.id] = channel;
        }
    }

    /** ***************************************************************************************
     * EVENTs
     **************************************************************************************** */
    /**
     * Fired when the current list has been changed
     *
     * @param {Object} newChannelListDef The new list {listId:listId, type:listType}
     * @param {Object} oldChannelListDef The old list {listId:listId, type:listType}
     * @event onChannelListChange
     */
    onChannelListChange(newChannelListDef, oldChannelListDef) {
    }

    /**
     * Fired when the current list has been changed
     *
     * @param {Object} newChannelListDef The new list {listId:listId, type:listType}
     * @param {Object} oldChannelListDef The old list {listId:listId, type:listType}
     * @protected
     */
    _onChannelListChange(newChannelListDef, oldChannelListDef) {
        return this.onChannelListChange(newChannelListDef, oldChannelListDef);
    }

    /** ***************************************************************************************
     * ABSTRACT METHODs
     **************************************************************************************** */
    /**
     * create new channel
     * @param {Object} properties
     * @return {Promise<AbstractChannel>}
     * @abstract
     * @protected
     */
    _newChannel(properties) {
        return ServiceErrors.notImplementedPromise('AbstractChannelService', '_newChannel');
    }

    /**
     * Vendor implementation to get the list that contains all channels
     *
     * DON'T FORGET TO MARK THE CHANNELS BLOCKED WITH THE _blocked PROPERTY !!!
     *
     * @param {Object} [options] Additional options
     * @returns {Promise<AbstractChannel[],Error>} A promise resolved with an array of channels or rejected in case of problem
     * @abstract
     * @protected
     */
    _getAllList(options) {
        return ServiceErrors.notImplementedPromise('AbstractChannelService', '_getAllList');
    }

    // ////////////////////////////////////////////////////////////////////////////////////////
    // OPTIONAL ABSTRACT
    // ////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Vendor implementation to set the active channel list.
     * This is an optional implementation.
     *
     * @param {String} listId The id of the list
     * @return {Promise<String,Error>} A promise (listId, error)
     * @abstract
     * @protected
     */
    _setCurrentChannelListId(listId) {
        return Promise.resolve(listId);
    }
}

export default AbstractChannelService;
