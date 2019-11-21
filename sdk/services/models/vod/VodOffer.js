import AbstractNativeObjectModel from '../AbstractNativeObjectModel';
import VodResult from './VodResult';
import Offer from './Offer';

/**
 * @name VodOffer
 * @class
 *
 * @property {Offer[]} offers -
 * @property {VodResult} result -
 */
class VodOffer extends AbstractNativeObjectModel {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat([
            'offers',
            'result']);
    }

    constructor(data) {
        super(data);

        if (data) {
            if (data.Offers) {
                this.offers = [];
                for (let i = 0; i < data.Offers.length; i++) {
                    const offer = data.Offers[i];
                    this.offers.push(new Offer(offer));
                }
            }

            this.result = new VodResult(data.Result);
        }
    }
}

export default VodOffer;
