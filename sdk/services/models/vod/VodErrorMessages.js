import VodError from './VodError';
import VodResult from './VodResult';

/**
 * class for vod error model
 * @model VodErrorMessages
 */
class VodErrorMessages {
    /**
     * @type {VodError}
     */
    static get GENERIC() {
        return new VodError({
            name: 'GENERIC',
            message: '<TODO: PUT A MESSAGE HERE>'
        });
    }

    /**
     * @type {VodError}
     */
    static get CON5000() {
        return new VodError({
            name: 'CON5000',
            message: '',
            code: 'CON5000'
        });
    }

    /**
     * @type {VodError}
     */
    static get NOINTERNET() {
        return new VodError({
            name: 'NOINTERNET',
            message: '',
            code: ''
        });
    }

    /**
     * @type {VodError}
     */
    static get CON1000() {
        return new VodError({
            name: 'GENERIC',
            message: 'VOD_CATALOGUE_MESSAGE_TEXT',
            code: 'CON1000'
        });
    }

    /**
     * @type {VodError}
     */
    static get CON1002() {
        return new VodError({
            name: 'GENERIC',
            message: 'VOD_CATALOGUE_MESSAGE_PROXYERROR',
            code: 'CON1002'
        });
    }

    /**
     * @type {VodError}
     */
    static get CON1004() {
        return new VodError({
            name: 'GENERIC',
            message: 'VOD_NODATA_MESSAGE_ALL',
            code: 'CON1004'
        });
    }

    /**
     * @type {VodError}
     */
    static get CON1005() {
        return new VodError({
            name: 'GENERIC',
            message: 'VOD_NODATA_MESSAGE_TIMEOUT',
            code: 'CON1005'
        });
    }

    /**
     * @type {VodError}
     */
    static get CON1006() {
        return new VodError({
            name: 'GENERIC',
            message: 'VOD_ERROR_MESSAGE_GENDBS',
            code: 'CON1006'
        });
    }

    /**
     * @type {VodError}
     */
    static get CON1007() {
        return new VodError({
            name: 'GENERIC',
            message: 'VOD_ERROR_MESSAGE_ENCDBS',
            code: 'CON1007'
        });
    }

    /**
     * @type {VodError}
     */
    static get CON1008() {
        return new VodError({
            name: 'GENERIC',
            message: 'VOD_ERROR_MESSAGE_GENPORTAL',
            code: 'CON1008'
        });
    }

    /**
     * @type {VodError}
     */
    static get CON1009() {
        return new VodError({
            name: 'GENERIC',
            message: 'VOD_ERROR_MESSAGE_RESOLV',
            code: 'CON1009'
        });
    }

    /**
     * @type {VodError}
     */
    static get CON1011() {
        return new VodError({
            name: 'GENERIC',
            message: 'VOD_ERROR_MESSAGE_SERVICELAYER',
            code: 'CON1011'
        });
    }

    /**
     * @type {VodError}
     */
    static get CON1102() {
        return new VodError({
            name: 'GENERIC',
            message: 'VOD_ERROR_MESSAGE_BADURLS',
            code: 'CON1102'
        });
    }

    /**
     * @type {VodError}
     */
    static get SCR1001() {
        return new VodError({
            name: 'GENERIC',
            message: 'VOD_ERROR_MESSAGE_SIGNALLOST',
            code: 'SCR1001'
        });
    }

    /**
     * @type {VodError}
     */
    static get SCR1002() {
        return new VodError({
            name: 'GENERIC',
            message: 'VOD_ERROR_MESSAGE_SMARTCARD',
            code: 'SCR1002'
        });
    }

    /**
     * @type {VodError}
     */
    static get SCR1003() {
        return new VodError({
            name: 'GENERIC',
            message: 'VOD_ERROR_MESSAGE_SCANDSIGNAL',
            code: 'SCR1003'
        });
    }

    /**
     * @type {VodError}
     */
    static get DRM1101() {
        return new VodError({
            name: 'GENERIC',
            message: 'VOD_PLAYERROR_MESSAGE_DRMWEBSERVICE',
            code: 'DRM1101'
        });
    }

    /**
     * @type {VodError}
     */
    static get FRM1101() {
        return new VodError({
            name: 'GENERIC',
            message: 'VOD_PLAYERROR_MESSAGE_FORMAT',
            code: 'FRM1101'
        });
    }

    /**
     * @type {VodError}
     */
    static get CANCEL() {
        return new VodError({
            name: 'CANCEL',
            message: '',
            code: 'CANCEL'
        });
    }

    /**
     * Creates VodError object from VODResult object
     *
     * @param {VodResult} vodError
     * @returns {VodError}
     */
    static createFromVODResult(vodError) {
        const error = VodErrorMessages.GENERIC;
        if (vodError && vodError instanceof VodResult) {
            error.name = 'VOD';
            error.message = vodError.message;
            error.code = vodError.code;
            error.showPopup = vodError.showPopup;
        }

        return error;
    }

    /**
     * Creates GenericError object from Error object which comes from HTTP requests
     *
     * @param {Error} httpError
     * @returns {VodError}
     */
    static createHttpError(httpError) {
        const error = VodErrorMessages.CON1004;
        if (httpError && httpError instanceof Error) {
            if (httpError.status) {
                error.code = `${error.code}-${httpError.status}`;
            }
        }

        return error;
    }
}

export default VodErrorMessages;
