import axios from 'axios';

/**
 * class for xhr service
 * @alias xhrService
 */
class AbstractXhrService {
    /**
     * @type {String}
     * @returns {String}
     */
    static get ERROR_TIMEOUT() {
        return 'ERROR_TIMEOUT';
    }

    /**
     * @type {String}
     * @returns {String}
     */
    static get ERROR_CANCEL() {
        return 'ERROR_CANCEL';
    }

    /**
     * constructor
     */
    constructor() {
        this.activeHandlers = {};
        this.serviceTimeout = 0;
    }

    /**
     *
     * @param {Object} params
     */
    init(params) {
        params = params || {};
        this.serverUrl = params.serverUrl;
        this.serviceUrl = params.serviceUrl;
        this.serviceTimeout = params.serviceTimeout;
        this.versionCheckUrl = params.versionCheckUrl;
        this.currentVersion = params.currentVersion;
    }

    /**
     * cancels active service request
     *
     * @param {String} method method name
     * @returns {Promise<*>}
     */
    cancelActiveRequest(method) {
        return this._cancelActiveRequest(method);
    }

    /**
     * cancels active service request vendor implementation
     *
     * @param {String} method method name
     * @returns {Promise<*>}
     * @protected
     */
    _cancelActiveRequest(method) {
        if (this.activeHandlers && this.activeHandlers[method]) {
            this.activeHandlers[method].cancel();
            this.activeHandlers[method] = null;
        }
        return Promise.resolve();
    }

    /**
     * Send the request as HTTP POST and returns a promise as a result.
     *
     * @param {String} method - Remote method name.
     * @param {Object} params - Params required for the method.
     * @returns {Promise<*>} - Returns method response as Promise.
     */
    postWithPromise(method, params) {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };

        const url = this.serverUrl + this.serviceUrl + method;
        return new Promise(((resolve, reject) => {
            if (this.cancelPrevious) {
                this.cancelActiveRequest(method);
                this.cancelPrevious = false;
            }
            this.activeHandlers[method] = this.postXhr(url, params, headers, resolve, reject);
        }));
    }

    /**
     * post an xhr request
     *
     * @param {String} url
     * @param {Object} params
     * @param {Object} headers
     * @param {Function} resolveCallback
     * @param {Function} rejectCallback
     * @returns {Object}
     */
    postXhr(url, params, headers, resolveCallback, rejectCallback) {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const axiosConfig = {
            cancelToken: source.token,
            timeout: this.serviceTimeout,
            headers,
            transformRequest: [data => JSON.stringify(data)]
        };

        axios.post(url, params, axiosConfig).then(resolveCallback).catch(this._handleError.bind(this, rejectCallback));
        return source;
    }

    /**
     * Send the request as HTTP GET and returns a promise.
     *
     * @param {String} url - Remote service url.
     * @param {Object} params - Params required for the service.
     * @returns {Promise} - Returns service response as Promise.
     * @protected
     */
    getWithPromise(url, params) {
        return new Promise(((resolve, reject) => {
            this.getXhr(url, params, { 'Content-Type': 'text' }, resolve, reject);
        }));
    }

    /**
     * gets an xhr request
     *
     * @param {String} url
     * @param {Object} params
     * @param {Object} headers
     * @param {Function} resolveCallback
     * @param {Function} rejectCallback
     * @returns {Object}
     */
    getXhr(url, params, headers, resolveCallback, rejectCallback) {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const axiosConfig = {
            cancelToken: source.token,
            timeout: this.serviceTimeout,
            headers,
            transformRequest: [data => JSON.stringify(data)]
        };

        axios.get(url, params, axiosConfig).then(resolveCallback).catch(this._handleError.bind(this, rejectCallback));
        return source;
    }

    /**
     * handle error for a service call
     * @param {Function} rejectCallback
     * @param {Object} error
     * @protected
     */
    _handleError(rejectCallback, error) {
        if (axios.isCancel(error)) {
            rejectCallback({ type: AbstractXhrService.ERROR_CANCEL });
        } else if (error && error.code === 'ECONNABORTED') {
            rejectCallback({ type: AbstractXhrService.ERROR_TIMEOUT });
        } else {
            rejectCallback(error);
        }
    }
}

export default AbstractXhrService;
