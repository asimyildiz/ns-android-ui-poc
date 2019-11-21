import AbstractNativeObjectModel from '../AbstractNativeObjectModel';

/**
 * class for vod accessor model
 * @model VodAccessor
 */
class VodAccessor extends AbstractNativeObjectModel {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat([
            'serviceAccountId',
            'applicationId',
            'clientId',
            'partyRoleId',
            'dbsCode',
            'sessionKey',
            'portalCode']);
    }

    /**
     * @param {Object} data
     * @constructor
     */
    constructor(data) {
        super(data);

        if (data) {
            this.serviceAccountId = data.serviceAccountId;
            this.applicationId = data.applicationId;
            this.clientId = data.clientId;
            this.partyRoleId = data.partyRoleId;
            this.dbsCode = data.dbsCode;
            this.sessionKey = data.sessionKey;
            this.portalCode = data.portalCode;
        }
    }

    /**
     * creates an object to call a service with
     * @returns {Object}
     */
    parseForService() {
        return {
            ServiceAccountID: this.serviceAccountId,
            ClientID: this.applicationId,
            ClientName: this.clientId,
            PartyRoleID: this.partyRoleId,
            DBSCode: this.dbsCode,
            SessionKey: this.sessionKey,
            PortalCode: this.portalCode
        };
    }
}

export default VodAccessor;
