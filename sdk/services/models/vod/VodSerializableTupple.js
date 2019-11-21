import AbstractNativeObjectModel from '../AbstractNativeObjectModel';

/**
 * class for vod serializable tupple model
 * @model VodSerializableTupple
 */
class VodSerializableTupple extends AbstractNativeObjectModel {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat([
            'item1',
            'item2']);
    }

    /**
     * @param {Object} data
     * @constructor
     */
    constructor(data) {
        super(data);

        if (data) {
            this.item1 = data.Item1;
            this.item2 = data.Item2;
        }
    }
}

export default VodSerializableTupple;
