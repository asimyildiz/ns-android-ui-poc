import AbstractXhrService from './AbstractXhrService';
import VodAccessor from './models/vod/VodAccessor';
import VodClassificationNode from './models/vod/VodClassificationNode';
import VodContent from './models/vod/VodContent';
import VodResult from './models/vod/VodResult';
import VodPlayResult from './models/vod/VodPlayResult';
import VodUserSpecificProductData from './models/vod/VodUserSpecificProductData';
import VodClassificationTree from './models/vod/VodClassificationTree';
import VodSerializableTupple from './models/vod/VodSerializableTupple';
import VodErrorMessages from './models/vod/VodErrorMessages';
import ServiceErrors from './helpers/ServiceErrors';

/**
 * class for vod service
 * @alias vodService
 */
class AbstractVodService extends AbstractXhrService {
    /**
     * @type {Object}
     * @returns {Object}
     */
    static get ORDER_MODE() {
        return {
            ASC: 'ASCENDING',
            DESC: 'DESCENDING'
        };
    }

    /**
     * @type {Object}
     * @returns {Object}
     */
    static get STREAM_TYPES() {
        return {
            DASH: 'DASH',
            SMOOTHSTREAM: 'SS'
        };
    }

    /**
     * set properties to use vod service
     */
    init(params) {
        super.init(params);

        params = params || {};
        this._accessKeys = null;
        return Promise.resolve();
    }

    /**
     * Sets _accessKeys for active session
     *
     * @param {VodAccessor} accessKeys
     */
    setCurrentAccessKeys(accessKeys) {
        this._accessKeys = accessKeys;
    }

    /**
     * @param {Boolean} isSortCategoriesAvailable
     * @returns {Promise<*>}
     */
    getClassificationTree(isSortCategoriesAvailable) {
        return this._getClassificationTree(isSortCategoriesAvailable);
    }

    /**
     * @param {Boolean} isSortCategoriesAvailable
     * @returns {Promise} result of HTTP POST request
     * @protected
     */
    _getClassificationTree(isSortCategoriesAvailable) {
        if (!this._accessKeys) {
            return ServiceErrors.throwErrorAsPromise('_getClassificationTree: accessKeys is null !');
        }

        const params = {
            accessKeys: this._accessKeys.parseForService(),
            addSortClassifications: isSortCategoriesAvailable
        };

        return this.postWithPromise('getClassificationTree', params)
            .then(this.__handleArrayResponse.bind(this, VodClassificationNode))
            .then(this.__parseClassificationTree.bind(this));
    }

    /**
     * @param {String} categoryId
     * @param {Number} index
     * @param {Number} length
     * @param {String} orderMode
     */
    getContentsInClassification(categoryId, index, length, orderMode) {
        return this._getContentsInClassification(categoryId, index, length, orderMode);
    }

    /**
     * @param {String} categoryId
     * @param {Number} index
     * @param {Number} length
     * @param {String} orderMode
     * @returns {Promise} result of HTTP POST request
     */
    _getContentsInClassification(categoryId, index, length, orderMode) {
        const params = {
            categoryId,
            index,
            length,
            orderMode: orderMode || AbstractVodService.ORDER_MODE.ASC,
            useContentV2: 'true',
            accessKeys: this._accessKeys.parseForService()
        };

        return this.postWithPromise('getContentsInClassification', params)
            .then(this.__handleSerializableTuppleResponse.bind(this));
    }

    /**
     * @param {String} contentID
     * @param {String} assetID
     */
    playPreview(contentID, assetID) {
        return this._playPreview(contentID, assetID);
    }

    /**
     * @param {String} contentID
     * @param {String} assetID
     * @returns {Promise} result of HTTP POST request
     */
    _playPreview(contentID, assetID) {
        const params = {
            contentID,
            assetID,
            accessKeys: this._accessKeys.parseForService()
        };

        return this.postWithPromise('playPreview', params)
            .then(response => this.__handleSingleResponse(new VodPlayResult(response)));
    }

    /**
     * @param {String} contentID
     * @param {String} classificationTermName
     */
    getUserSpecificContentData(contentID, classificationTermName) {
        return this._getUserSpecificContentData(contentID, classificationTermName);
    }

    /**
     * @param {String} contentID
     * @param {String} classificationTermName
     * @returns {Promise} result of HTTP POST request
     */
    _getUserSpecificContentData(contentID, classificationTermName) {
        const params = {
            contentID,
            classificationTermName: classificationTermName || '',
            useVersionEntitlement: 'true',
            accessKeys: this._accessKeys.parseForService(),
            streamFormatType: AbstractVodService.STREAM_TYPES.DASH
        };

        return this.postWithPromise('getUserSpecificContentData', params)
            .then(response => this.__handleSingleResponse(new VodUserSpecificProductData(response)));
    }

    /**
     * @param {String} contentID
     */
    getContentDetail(contentID) {
        return this._getContentDetail(contentID);
    }

    /**
     * @param {String} contentID
     * @returns {Promise} result of HTTP POST request
     */
    _getContentDetail(contentID) {
        const params = {
            contentID,
            accessKeys: this._accessKeys.parseForService()
        };

        return this.postWithPromise('getContentDetail', params)
            .then(response => this.__handleSingleResponse(new VodContent(response)));
    }

    /**
     * @param {String} contentID
     * @param {Number} usageSpecId
     * @param {String} assetID
     * @param {String} streamType
     */
    play(contentID, usageSpecId, assetID, streamType) {
        return this._play(contentID, usageSpecId, assetID, streamType);
    }

    /**
     * @param {String} contentID
     * @param {Number} usageSpecId
     * @param {String} assetID
     * @param {String} streamFormatType
     * @returns {Promise} result of HTTP POST request
     */
    _play(contentID, usageSpecId, assetID, streamFormatType) {
        const params = {
            contentID,
            usageSpecId,
            assetID,
            streamFormatType,
            useVersionEntitlement: 'true',
            accessKeys: this._accessKeys.parseForService()
        };

        return this.postWithPromise('play', params)
            .then(response => this.__handleSingleResponse(new VodPlayResult(response)));
    }

    /**
     * Send the request as HTTP POST.
     *
     * @param {String} method - Remote method name.
     * @param {Object} params - Params required for the method.
     * @returns {Promise} - Returns method response as Promise.
     * @override
     */
    postWithPromise(method, params) {
        return super.postWithPromise(method, params)
            .catch((error) => {
                if (error && error.type === AbstractXhrService.ERROR_CANCEL) {
                    return Promise.reject(VodErrorMessages.CANCEL);
                } if (error && error.type === AbstractXhrService.ERROR_TIMEOUT) {
                    return Promise.reject(VodErrorMessages.CON1005);
                }
                return Promise.reject(VodErrorMessages.createHttpError(error));
            })
            .then((response) => {
                if (!response || !response.data) {
                    return Promise.reject(VodErrorMessages.CON1011);
                }
                return Promise.resolve(response.data);
            });
    }

    /**
     * @param {Function} ClassInstance
     * @param {Object} data
     * @returns {Promise<*>}
     * @private
     */
    __handleArrayResponse(ClassInstance, data) {
        const list = [];
        for (let i = 0; i < data.length; i++) {
            list.push(new ClassInstance(data[i]));
        }
        return Promise.resolve(list);
    }

    /**
     * @param {Object} data
     * @private
     */
    __handleSingleResponse(data) {
        if (data instanceof VodResult && !data.result) {
            return Promise.reject(VodErrorMessages.createFromVODResult(data));
        } if (data.result instanceof VodResult && !data.result.result) {
            return Promise.reject(VodErrorMessages.createFromVODResult(data.result));
        }
        return Promise.resolve(data);
    }

    /**
     * @param {Object} data
     * @returns {Promise<*>}
     * @private
     */
    __handleSerializableTuppleResponse(data) {
        const totalCount = data.Item1;

        const contentList = [];
        for (let i = 0; i < data.Item2.length; i++) {
            contentList.push(new VodContent(data.Item2[i]));
        }

        return Promise.resolve(
            new VodSerializableTupple({
                Item1: totalCount,
                Item2: contentList
            })
        );
    }

    /**
     * Parses ClassificationTree array
     * @param {Array} classificationTree
     * @returns {Promise<*>}
     * @private
     */
    __parseClassificationTree(classificationTree) {
        // Consider special cases
        if (classificationTree.length > 0) {
            const vodClassificationTree = new VodClassificationTree();
            for (let i = 0; i < classificationTree.length; i++) {
                vodClassificationTree.addClassificationTree(classificationTree[i]);
            }
            return Promise.resolve(vodClassificationTree);
        }

        return Promise.reject(VodErrorMessages.CON1011);
    }

    /**
     * Send the request as HTTP GET.
     *
     * @param {String} url - Remote service url.
     * @param {Object} params - Params required for the service.
     * @returns {Promise} - Returns service response as Promise.
     * @override
     */
    getWithPromise(url, params) {
        return super.getWithPromise(url, params)
            .catch((error) => {
                if (error && error.type === AbstractXhrService.ERROR_TIMEOUT) {
                    return Promise.reject(VodErrorMessages.CON1005);
                }
                return Promise.reject(VodErrorMessages.createHttpError(error));
            })
            .then(response => Promise.resolve(response.data));
    }
}

export default AbstractVodService;
