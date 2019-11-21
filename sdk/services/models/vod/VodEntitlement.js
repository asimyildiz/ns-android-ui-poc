import AbstractNativeObjectModel from '../AbstractNativeObjectModel';
import VodOffer from './VodOffer';
import AssetType from './AssetType';

/**
 * @name VODEntitlement
 * @class
 *
 * @property {Boolean} hasEntitlement -
 * @property {Number} usageSpecId -
 * @property {String} offerType -
 * @property {String} usageSpecCode -
 * @property {String} price -
 * @property {Number} leftFreeQuantity -
 * @property {Number} drmDuration -
 * @property {String} drmDurationType -
 * @property {Boolean} entitledToVersion -
 * @property {Number[]} usageSpecIdListForOrder -
 * @property {String} versionId -
 * @property {String} versionType -
 * @property {String} memberPrice -
 * @property {String} memberPriceCurrencyTypeCd -
 * @property {Number} usageSpecIdForPlay -
 * @property {String} buttonLabel -
 * @property {AssetType[]} assetTypes -
 * @property {VodOffer} offerList -
 * @property {Boolean} isAdvantage -
 */
class VodEntitlement extends AbstractNativeObjectModel {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat([
            'hasEntitlement',
            'usageSpecId',
            'offerType',
            'usageSpecCode',
            'price',
            'leftFreeQuantity',
            'drmDuration',
            'drmDurationType',
            'entitledToVersion',
            'usageSpecIdListForOrder',
            'versionId',
            'versionType',
            'memberPrice',
            'memberPriceCurrencyTypeCd',
            'usageSpecIdForPlay',
            'buttonLabel',
            'assetTypes',
            'offerList',
            'isAdvantage']);
    }

    constructor(data) {
        super(data);

        if (data) {
            this.hasEntitlement = data.HasEntitlement;
            this.usageSpecId = data.UsageSpecId;
            this.offerType = data.OfferType;
            this.usageSpecCode = data.UsageSpecCode;
            this.price = data.Price;
            this.leftFreeQuantity = data.LeftFreeQuantity;
            this.drmDuration = data.DrmDuration;
            this.drmDurationType = data.DrmDurationType;
            this.entitledToVersion = data.EntitledToVersion;

            this.usageSpecIdListForOrder = data.UsageSpecIdListForOrder || [];

            this.versionId = data.VersionId;
            this.versionType = data.VersionType;
            this.memberPrice = data.MemberPrice;
            this.memberPriceCurrencyTypeCd = data.MemberPriceCurrencyTypeCd;
            this.usageSpecIdForPlay = data.UsageSpecIdForPlay;
            this.buttonLabel = data.ButtonLabel;

            if (data.AssetTypes) {
                this.assetTypes = [];
                for (let i = 0; i < data.AssetTypes.length; i++) {
                    this.assetTypes.push(new AssetType(data.AssetTypes[i]));
                }
            }

            this.offerList = new VodOffer(data.OfferList);
            this.isAdvantage = data.IsAdvantage;
        }
    }
}

export default VodEntitlement;
