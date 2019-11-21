import AbstractNativeObjectModel from './AbstractNativeObjectModel';

/**
 * class for generic error model
 * @model GenericError
 */
class GenericError extends AbstractNativeObjectModel {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat([
            'name',
            'message']);
    }

    /**
     * @param {Object} data
     * @constructor
     */
    constructor(data) {
        super(data);

        data = data || {};
        this.name = data.name;
        this.message = data.message;
    }
}

export default GenericError;
