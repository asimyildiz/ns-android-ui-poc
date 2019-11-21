import AbstractNativeObjectModel from '../AbstractNativeObjectModel';

/**
 * class for vod result model
 * @model VodResult
 *
 * @property {Boolean} result
 * @property {String} code
 * @property {String} message
 * @property {Boolean} showPopup
 */
class VodResult extends AbstractNativeObjectModel {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat([
            'result',
            'code',
            'message',
            'showPopup']);
    }

    constructor(data) {
        super(data);

        if (data) {
            this.result = data.Result || false;
            this.code = data.Code;
            this.message = data.Message;
            this.showPopup = data.ShowPopup || false;
        }
    }
}

export default VodResult;
