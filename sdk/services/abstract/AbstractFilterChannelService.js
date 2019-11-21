import AbstractFavoritesAndBlockedChannelService from './AbstractFavoritesAndBlockedChannelService';
import isFunction from '../../utils/IsFunction';
import ServiceErrors from '../helpers/ServiceErrors';
import LocalStorage from '../helpers/LocalStorage';

/**
 * class for object properties
 * @name AbstractFilterChannelService
 */
class AbstractFilterChannelService extends AbstractFavoritesAndBlockedChannelService {
    /**
     * @type {Object}
     */
    static get STORAGE() {
        return {
            filter: {
                key: 'local-storage-filter-selected-key'
            }
        };
    }

    /**
     * @type {Object}
     */
    static get TYPE() {
        return {
            DAY: 'day',
            FILTER: 'filter'
        };
    }

    /**
     * @type {Array<String>}
     */
    static get favoriteList() {
        return [
            'CHANNELS_CHANLIST_VALUE_CHGPUSE1',
            'CHANNELS_CHANLIST_VALUE_CHGPUSE2',
            'CHANNELS_CHANLIST_VALUE_CHGPUSE3',
            'CHANNELS_CHANLIST_VALUE_CHGPUSE4'
        ];
    }

    /**
     * @type {Array<String>}
     */
    static get filterList() {
        return [
            'all',
            'hd',
            'national',
            'news',
            'movies_series',
            'sports',
            'kids',
            'music',
            'documentary',
            'ent_life',
            'world'
        ];
    }

    /**
     * @type {Object}
     */
    static get FILTERS() {
        return {
            ALL: {
                key: 'CHANNELS_CHANLIST_VALUE_CHGPSYS1',
                id: 'All',
                default: true
            },
            HD: {
                key: 'CHANNELS_CHANLIST_VALUE_HDCHANNEL',
                id: 'hd'
            },
            NATIONAL: {
                key: 'CHANNELS_CHANLIST_VALUE_CHGPTHEM1',
                id: 'National'
            },
            NEWS: {
                key: 'CHANNELS_CHANLIST_VALUE_CHGPTHEM2',
                id: 'News'
            },
            MOVIES_SERIES: {
                key: 'CHANNELS_CHANLIST_VALUE_CHGPTHEM3',
                id: 'Movie & Series'
            },
            SPORTS: {
                key: 'CHANNELS_CHANLIST_VALUE_CHGPTHEM4',
                id: 'Sports'
            },
            KIDS: {
                key: 'CHANNELS_CHANLIST_VALUE_CHGPTHEM5',
                id: 'Kids'
            },
            MUSIC: {
                key: 'CHANNELS_CHANLIST_VALUE_CHGPTHEM6',
                id: 'Music'
            },
            DOCUMENTARY: {
                key: 'CHANNELS_CHANLIST_VALUE_CHGPTHEM7',
                id: 'Documentary'
            },
            ENT_LIFE: {
                key: 'CHANNELS_CHANLIST_VALUE_CHGPTHEM8',
                id: 'General Entertainment'
            },
            WORLD: {
                key: 'CHANNELS_CHANLIST_VALUE_CHGPTHEM9',
                id: 'International'
            }
        };
    }

    /**
     * @constructor
     */
    constructor() {
        super();
        this.loadCurrentFilter();
        this.initFilters();
        this.channels = {};
        this._currentOrderKey = null;
    }

    /**
     * Create filters
     * @returns {Promise|Error}
     */
    initFilters() {
        let filter;


        let filterName;
        const filters = [];
        const configFilters = AbstractFilterChannelService.filterList || [];
        for (let i = 0; i < configFilters.length; i++) {
            filterName = configFilters[i].toUpperCase();
            filter = AbstractFilterChannelService.FILTERS[filterName];
            if (!filter) {
                return ServiceErrors.throwErrorAsPromise(`filter with name '${filterName}' does not exist !`);
            }
            filter.isFilter = true;
            filters.push(filter);
        }
        this._filters = filters;
        return Promise.resolve();
    }

    /**
     * Returns filter list
     * @returns {Promise<Array>}
     */
    getAvailableFiltersList() {
        return Promise.resolve(this._filters);
    }

    /**
     * Get channels filtered according to active filter id
     * @returns {Promise<Array<AbstractChannel>>}
     */
    getActiveFiltersList() {
        return this.getFilterList(this._currentFilter.id);
    }

    /**
     * Get channels filtered according to id
     * @param {string} id
     * @returns {Promise<Array<AbstractChannel>>}
     */
    getFilterList(id) {
        const channelList = this.channels[id];
        let promise = Promise.resolve(channelList);
        if (!channelList) {
            let channelFilterPromise = null;
            switch (id) {
            case AbstractFilterChannelService.FILTERS.ALL.id:
                channelFilterPromise = this.find(() => true);
                break;
            case AbstractFilterChannelService.FILTERS.HD.id:
                channelFilterPromise = this._getHdFilter();
                break;
            default:
                channelFilterPromise = this._getFilterList(id);
                break;
            }
            promise = channelFilterPromise
                .then(this._cacheFilteredList.bind(this, id));
        }
        return promise.then((channels) => {
            if (this._currentOrderKey) {
                const sort = this.getCurrentOrderMethod();
                if (isFunction(sort)) {
                    channels = channels.sort(sort);
                }
            }
            return Promise.resolve(channels);
        });
    }

    /**
     * Find channel(s) using a function as filter.
     *
     * @param {Function|null} filterFunction A function that takes a channel in arg and return true or false (true mean keep channel)
     * @param {Object} [options] Additional options
     * @param {Boolean} [options.force=false] If true, don't use the value stored in the cache
     * @param {String} [options.listId=null] If set, get channel on a specific list
     * @returns {Promise<AbstractChannel[], Error>} A promise (channel(s), error)
     */
    find(filterFunction, options) {
        return this._find(filterFunction, options)
            .then(list => list.filter(filterFunction));
    }

    /**
     * cache the filtered channels on UI side
     * @param id
     * @param channelList
     * @returns {*}
     * @protected
     */
    _cacheFilteredList(id, channelList) {
        const currentFilterListId = id || (this._currentFilter && this._currentFilter.id);
        if (currentFilterListId && channelList && channelList.length > 0) {
            this.channels[currentFilterListId] = channelList;
        }
        return Promise.resolve(channelList);
    }

    /**
     * clear filtered channels which were stored on UI side
     */
    clearFilteredList() {
        this.channels = {};
    }

    /**
     * if we need to search inside filtered channels the channel to tune,
     * this is put here only for optimization purpose when we have ALL filter active
     * we do not need to search for the channel but just to zap
     */
    hasNeedChannelSearch() {
        return Promise.resolve(this._currentFilter.id !== AbstractFilterChannelService.FILTERS.ALL.id);
    }

    /**
     * Return HD channels
     * @returns {Promise<AbstractChannel[]>}
     * @protected
     */
    _getHdFilter() {
        return this.find(channel => (channel.resolution === channel.HD));
    }

    /** ***************************************************************************************
     * ABSTRACT
     **************************************************************************************** */
    /**
     * get current order method
     * @returns {AbstractChannelService.byNumberComparator|Promise}
     */
    getCurrentOrderMethod() {
        return ServiceErrors.notImplementedPromise('AbstractFilterChannelService', 'getCurrentOrderMethod');
    }

    /**
     * Find channel(s) using a function as filter.
     *
     * @param {Function|null} filterFunction A function that takes a channel in arg and return true or false (true mean keep channel)
     * @param {Object} [options] Additional options
     * @param {Boolean} [options.force=false] If true, don't use the value stored in the cache
     * @param {String} [options.listId=null] If set, get channel on a specific list
     * @returns {Promise<AbstractChannel[], Error>} A promise (channel(s), error)
     */
    _find(filterFunction, options) {
        return ServiceErrors.notImplementedPromise('AbstractFilterChannelService', '_find');
    }

    /**
     * Returns filtered list (must be override by vendor)
     * @param {String} id
     * @returns {Promise<AbstractChannel[]>}
     * @protected
     */
    _getFilterList(id) {
        return ServiceErrors.notImplementedPromise('AbstractFilterChannelService', '_getFilterList');
    }

    /** *********************************************************************************************************
     * API to rebuild because it is not connected with the rest of the ChannelService
     ********************************************************************************************************** */

    /**
     * Load Filter
     * @returns {*}
     */
    loadCurrentFilter() {
        return LocalStorage.retrieve(AbstractFilterChannelService.STORAGE.filter.key)
            .then((currentFilter) => {
                this._currentFilter = currentFilter || {};
            });
    }

    /**
     * sets current active filter
     * @param {Object} filter
     * @returns {*}
     */
    setFilter(filter) {
        return LocalStorage.store(AbstractFilterChannelService.STORAGE.filter.key, filter)
            .then((data) => {
                this._currentFilter = filter;
                this.onFilterChange();
            });
    }

    /**
     * returns current active filter
     * @returns {Promise<Object>}
     */
    getFilter() {
        return Promise.resolve(this._currentFilter);
    }

    /**
     * clears active filter and cached channel list on UI side
     */
    clearFilter() {
        this.clearFilteredList();
        return this.setFilter({});
    }

    /**
     * Get current filter name
     * @returns {Promise<string>}
     */
    getFilterName() {
        return Promise.resolve((this._currentFilter && this._currentFilter.key) ? this._currentFilter.key : AbstractFilterChannelService.FILTERS.ALL.key);
    }

    /**
     * Return false is using all channels list
     * @returns {Promise<boolean>}
     */
    isChannelFiltered() {
        return Promise.resolve(this._currentFilter && this._currentFilter.key !== AbstractFilterChannelService.FILTERS.ALL.key);
    }

    /** ***************************************************************************************
     * EVENTs
     **************************************************************************************** */
    /**
     * Is fired when filter change
     */
    onFilterChange() {
        this.clearFilteredList();
    }
}

export default AbstractFilterChannelService;
