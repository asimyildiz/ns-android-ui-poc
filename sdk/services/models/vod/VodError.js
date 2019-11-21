import GenericError from '../GenericError';

/**
 * class for vod error model
 * @model VodError
 */
class VodError extends GenericError {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat([
            'code',
            'showPopup']);
    }

    /**
     * @param {Object} data
     * @constructor
     */
    constructor(data) {
        super(data);

        data = data || {};
        this.code = data.code;
        this.showPopup = data.showPopup;
    }
}

export default VodError;
