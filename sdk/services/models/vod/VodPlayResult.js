import AbstractNativeObjectModel from '../AbstractNativeObjectModel';
import VodResult from './VodResult';

/**
 * @name VodPlayResult
 * @class
 *
 * @property {VodResult} result -
 * @property {String} cdnUri -
 * @property {String} ticket -
 * @property {String} codec -
 */
class VodPlayResult extends AbstractNativeObjectModel {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat([
            'result',
            'cdnUri',
            'ticket',
            'codec']);
    }

    constructor(data) {
        super(data);

        if (data) {
            this.result = new VodResult(data.Result);
            this.cdnUri = data.CdnUri;
            this.ticket = data.Ticket;
            this.codec = data.Codec;
        }
    }
}

export default VodPlayResult;
