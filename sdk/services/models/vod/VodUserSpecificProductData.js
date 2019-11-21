import AbstractNativeObjectModel from '../AbstractNativeObjectModel';
import VodResult from './VodResult';
import VodEntitlement from './VodEntitlement';
import VodFollowMe from './VodFollowMe';
import VodOffer from './VodOffer';

/**
 * @name VodUserSpecificProductData
 * @class
 *
 * @property {String} cmsContentID -
 * @property {VodResult} result -
 * @property {VodEntitlement[]} entitlementList -
 * @property {VodFollowMe} followMeInfo -
 * @property {Number} pvrRequestType -
 * @property {Boolean} isFavorite -
 * @property {VodOffer} vodOffer -
 * @property {Boolean} isAdvantage -
 * @property {String} advantageMessage -
 * @property {String[]} playableAssetIDList -
 * @property {String} idavAssetID -
 */
class VodUserSpecificProductData extends AbstractNativeObjectModel {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat([
            'cmsContentID',
            'result',
            'entitlementList',
            'followMeInfo',
            'pvrRequestType',
            'isFavorite',
            'vodOffer',
            'isAdvantage',
            'advantageMessage',
            'playableAssetIDList',
            'idavAssetID']);
    }

    constructor(data) {
        super(data);

        if (data) {
            this.cmsContentID = data.CMSContentID;
            this.result = new VodResult(data.Result);

            if (data.EntitlementList) {
                this.entitlementList = [];
                for (let i = 0; i < data.EntitlementList.length; i++) {
                    this.entitlementList.push(new VodEntitlement(data.EntitlementList[i]));
                }
            }

            if (data.FollowMeInfo) {
                this.followMeInfo = new VodFollowMe(data.FollowMeInfo);
            }

            this.pvrRequestType = data.PVRRequestType;
            this.isFavorite = data.IsFavorite || false;
            this.vodOffer = new VodOffer(data.VodOffer);
            this.isAdvantage = data.IsAdvantage || false;
            this.advantageMessage = data.AdvantageMessage;

            if (data.PlayableAssetIDList) {
                this.playableAssetIDList = [];
                for (let i = 0; i < data.PlayableAssetIDList.length; i++) {
                    this.playableAssetIDList.push(data.PlayableAssetIDList[i]);
                }
            }

            this.idavAssetID = data.IDAVAssetID;
        }
    }
}

export default VodUserSpecificProductData;
