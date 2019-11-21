import AbstractNativeObjectModel from './AbstractNativeObjectModel';

/**
 * class for channel model
 * @model AbstractChannel
 */
class AbstractChannel extends AbstractNativeObjectModel {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
    /**
     * @type {Number}
     */
    static get TV_TYPE() {
        return 1;
    }

    /**
     * @type {Number}
     */
    static get RADIO_TYPE() {
        return 2;
    }

    /**
     * @type {Number}
     */
    static get OTHER_TYPE() {
        return 4;
    }

    /**
     * @type {Number}
     */
    static get ALL_TYPE() {
        return 7;
    }

    /**
     * @type {Number}
     */
    static get SD() {
        return 0;
    }

    /**
     * @type {Number}
     */
    static get HD() {
        return 1;
    }

    /**
     * @type {Number}
     */
    static get UHD() {
        return 2;
    }

    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat(['logo', 'number', 'type', 'description', 'data', 'resolution', 'is3D', 'genre', 'name']);
    }

    /**
     * @constructor
     */
    constructor() {
        super();
        this._blocked = false;
    }

    /**
     * init object properties
     * @param {Object} params
     */
    init(params) {
        if (params) {
            this.logo = params.logo;
            this.number = params.number;
            this.type = params.type;
            this.description = params.description;
            // this.setNativeObject(params.nativeObject);
        }
        this._create(params);
    }

    /**
     * This function can be overridden.
     * It is called automatically when the class is instantiated.
     * @param {Object} params
     * @ignore
     */
    _create(params) {
    // Nothing by default
    }

    /**
     * check that the type of channel is TV
     * @returns {Boolean}
     */
    isTVChannel() {
        return this.type === AbstractChannel.TV_TYPE;
    }

    /**
     * check that the type of channel is RADIO
     * @returns {Boolean}
     */
    isRadioChannel() {
        return this.type === AbstractChannel.RADIO_TYPE;
    }

    /**
     * Return true if the channel is blocked
     * @returns {Boolean} true if the channel is blocked
     */
    isBlocked() {
        return this._blocked;
    }

    /**
     * Return true if the channel is locked (not manually) => adults channels
     * @returns {Boolean}
     */
    isLocked() {
        return this._locked;
    }

    /**
     * Return true if the channel is locked OR manually blocked
     * @returns {Boolean}
     */
    isLockedOrBlocked() {
        return this.isLocked() || this.isBlocked();
    }
}

export default AbstractChannel;
