/**
 * class for boot manager
 * @alias bootManager
 * @name BootManager
 */
class BootManager {
    /**
     * init services
     * @param {Object} beINFW
     * @param {Object} config
     */
    init(beINFW, config) {
        /** init all other managers */
        if (beINFW) {
            this.context = beINFW;
            this.context.vodManager.init(beINFW, config);
        } else {
            throw new Error('You must pass the context of beINFW to BootManager.init method');
        }
    }
}

export default BootManager;
