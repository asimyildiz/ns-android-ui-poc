import VodAccessor from '../../services/models/vod/VodAccessor';

/**
 * class for vod manager
 * @alias vodManager
 * @name VodManager
 */
class VodManager {
    /**
     * init vod service
     * @param {Object} context
     * @param {Object} config
     */
    init(context, config) {
        this.context = context;
        this.context.vodService.init({
            serverUrl: config.serverUrl,
            serviceUrl: config.serviceUrl,
            serviceTimeout: config.serviceTimeout,
            versionCheckUrl: config.versionCheckUrl,
            currentVersion: config.currentVersion
        });
    }

    /**
     * check context, and if there is no context set for this manager, throw an error
     */
    checkContext() {
        if (!this.context) {
            throw new Error('Please initialize BootManager first');
        }
    }

    /**
     * set accesskeys to current vod service
     * @param {Object} params
     */
    setAccessKeys(params) {
        this.checkContext();
        const accessKeys = new VodAccessor({
            clientId: params.clientId,
            applicationId: params.applicationId,
            dbsCode: params.dbsCode,
            portalCode: params.portalCode,
            partyRoleId: params.partyRoleId,
            sessionKey: params.sessionKey,
            serviceAccountId: params.serviceAccountId
        });

        this.context.vodService.setCurrentAccessKeys(accessKeys);
    }
}

export default VodManager;
