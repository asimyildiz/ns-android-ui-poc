import Utils from './Utils';

class StoreHelper {
    /**
     * merge store objects into a single object
     * @param {Object} storeObjects
     * @param {Object} storeObject
     */
    static mergeStoreObject(storeObjects, storeObject) {
        Object.keys(storeObject).forEach((key) => {
            storeObjects[key] = Object.assign(storeObjects[key], storeObject[key]);
        });
    }

    /**
     * create and return a store object from all files included inside store folder
     * @returns {{state: {}, mutations: {}, actions: {}, getters: {}}}
     */
    static createStore() {
        // get all files under store
        const files = require.context('@/store', true, /^\.\/(?!-)[^.]+\.(js)$/);
        const filenames = files.keys();

        const storeObjects = {
            state: {},
            mutations: {},
            actions: {},
            getters: {}
        };

        filenames.forEach((filename) => {
            const name = filename.replace(/^\.\//, '').replace(/\.(js)$/, '');
            if (name !== 'index') {
                const storeObject = Utils.getModule(files, filename);
                StoreHelper.mergeStoreObject(storeObjects, storeObject);
            }
        });

        return storeObjects;
    }
}

export default StoreHelper;
