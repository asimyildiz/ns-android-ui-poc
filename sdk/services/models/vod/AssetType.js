import AbstractNativeObjectModel from '../AbstractNativeObjectModel';

/**
 * @name AssetType
 * @class
 *
 * @property {Boolean} type -
 * @property {Number} assetId -
 * @property {String} assetLabel -
 */
class AssetType extends AbstractNativeObjectModel {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat([
            'type',
            'assetId',
            'assetLabel']);
    }

    constructor(data) {
        super(data);

        if (data) {
            this.type = data.Type;
            this.assetId = data.AssetId;
            this.assetLabel = data.AssetLabel;
        }
    }
}

export default AssetType;
