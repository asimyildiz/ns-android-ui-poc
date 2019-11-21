import * as TnsUtils from 'tns-core-modules/utils/utils'

/**
 * utilities
 */
/* istanbul ignore */
class Utils {
    /**
     * @type {String}
     * @returns {String}
     */
    static get ANDROID() {
        return 'android';
    }

    /**
     * @type {String}
     * @returns {String}
     */
    static get ANDROID_TV() {
        return 'androidTV';
    }

    /**
     * @type {String}
     * @returns {String}
     */
    static get IOS() {
        return 'iOS';
    }

    /**
     * @type {String}
     * @returns {String}
     */
    static get APPLE_TV() {
        return 'appleTV';
    }


    /**
     * returns application type
     * @returns {String}
     */
    static getApplicationType() {
        if (TnsUtils.ad) {
            // Android: Load either the TV or phone UI
            const uiModeManager = TnsUtils.ad.getApplicationContext().getSystemService(android.content.Context.UI_MODE_SERVICE);
            if (uiModeManager.getCurrentModeType() === android.content.res.Configuration.UI_MODE_TYPE_TELEVISION) {
                // android TV
                return Utils.ANDROID_TV;
            } else {
                // android
                return Utils.ANDROID;
            }
        } else {
            // iOS
            return Utils.IOS;
        }
    }

    /**
     * get a file and return it's content
     * @param {Function} files
     * @param {String} filename
     * @returns {*}
     */
    static getModule(files, filename) {
        const file = files(filename);
        return file.default ? file.default : file;
    }

    /**
     * return a query value from url
     * @param {String} name
     * @param {String} url
     * @returns {*}
     */
    static getParameterByName(name, url) {
        if (url) {
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }
        return '';
    }
}

export default Utils;