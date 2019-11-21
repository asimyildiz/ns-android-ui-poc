import AbstractNativeObjectModel from '../AbstractNativeObjectModel';

/**
 * @name Offer
 * @class
 *
 * @property {String} packageName -
 * @property {String} frequency -
 * @property {String} priceDisplayText -
 * @property {String} title -
 * @property {String} dbsPackageName -
 * @property {String} descriptionCode -
 * @property {String} description -
 * @property {String} descriptionDetail -
 * @property {String} memberPrice -
 * @property {String} memberPriceCurrencyTypeCd -
 * @property {Number} serviceAccountId -
 * @property {Number} usageSpecId -
 * @property {String} verificationMessage -
 * @property {Boolean} verificationRequired -
 * @property {String} commitmentMessage -
 */
class Offer extends AbstractNativeObjectModel {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat([
            'packageName',
            'frequency',
            'priceDisplayText',
            'title',
            'dbsPackageName',
            'descriptionCode',
            'description',
            'descriptionDetail',
            'memberPrice',
            'memberPriceCurrencyTypeCd',
            'serviceAccountId',
            'usageSpecId',
            'verificationMessage',
            'verificationRequired',
            'commitmentMessage']);
    }

    /**
     * @type {String}
     * @const
     */
    static get FOR_RENT() {
        return 'Kirala';
    }

    /**
     * @type {String}
     * @const
     */
    static get FOR_SALE() {
        return 'Satın Al';
    }

    constructor(data) {
        super(data);

        if (data) {
            this.packageName = data.PackageName;
            this.frequency = data.Frequency;
            this.priceDisplayText = data.PriceDisplayText;
            this.title = data.Title;
            this.dbsPackageName = data.DBSPackageName;
            this.descriptionCode = data.DescriptionCode;
            this.description = data.Description;
            this.descriptionDetail = data.DescriptionDetail;
            this.memberPrice = data.MemberPrice;
            this.memberPriceCurrencyTypeCd = data.MemberPriceCurrencyTypeCd;
            this.serviceAccountId = data.ServiceAccountId;
            this.usageSpecId = data.UsageSpecId;
            this.verificationMessage = data.VerificationMessage;
            this.verificationRequired = data.VerificationRequired;
            this.commitmentMessage = data.CommitmentMessage;
        }
    }

    /**
     * Returns if offer is for rent or not
     * @return {Boolean}
     */
    isForRent() {
        return this.title.indexOf(Offer.FOR_RENT) >= 0;
    }

    /**
     * Returns if offer is for sale or not
     * @return {Boolean}
     */
    isForSale() {
        return this.title.indexOf(Offer.FOR_SALE) >= 0;
    }

    /**
     * Returns title of offer
     * @return {String}
     */
    getMenuItemTitle() {
        const title = this.title ? this.title : '';
        let priceInfo = '';

        if (this.isForRent() || this.isForSale()) {
            if (this.memberPrice && this.memberPriceCurrencyTypeCd) {
                priceInfo = ` (${this.memberPrice} ${this.memberPriceCurrencyTypeCd})`;
            }
        }

        return title + priceInfo;
    }
}

export default Offer;
