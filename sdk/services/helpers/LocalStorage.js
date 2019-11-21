class LocalStorage {
    /**
     * store value to localStorage using key
     * @param {String} key
     * @param {Object} value
     * @returns {Promise<Object>}
     */
    static store(key, value) {
        return new Promise((resolve => resolve(LocalStorage.storeSync(key, value))));
    }

    /**
     * store value to localStorage using key, sync
     * @param {String} key
     * @param {Object} value
     * @returns {Object}
     */
    /* eslint no-undef: 0 */
    static storeSync(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
        return value;
    }

    /**
     * retrieve value from localStorage using key
     * @param {String} key
     * @param {Object} defaultValue
     * @returns {Promise<Object>}
     */
    static retrieve(key, defaultValue) {
        return new Promise(((resolve) => {
            resolve(LocalStorage.retrieveSync(key, defaultValue));
        }));
    }

    /**
     * retrieve value from localStorage using key, sync
     * @param {String} key
     * @param {Object} defaultValue
     * @returns {Object}
     */
    /* eslint no-undef: 0 */
    static retrieveSync(key, defaultValue) {
        const value = JSON.parse(window.localStorage.getItem(key));
        if (value == null && defaultValue != null) {
            return defaultValue;
        }
        return value;
    }

    /**
     * remove key and value pair which is stored to localStorage
     * @param {String} key
     * @returns {Promise<String>}
     */
    static remove(key) {
        return new Promise(((resolve) => {
            resolve(LocalStorage.removeSync(key));
        }));
    }

    /**
     * remove key and value pair which is stored to localStorage, sync
     * @param {String} key
     * @returns {String}
     */
    /* eslint no-undef: 0 */
    static removeSync(key) {
        window.localStorage.removeItem(key);
        return key;
    }
}

export default LocalStorage;
