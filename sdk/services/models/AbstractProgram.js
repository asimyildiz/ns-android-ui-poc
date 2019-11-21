import AbstractNativeObjectModel from './AbstractNativeObjectModel';

/**
 * class for program model
 * @model AbstractProgram
 */
class AbstractProgram extends AbstractNativeObjectModel {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
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
     * @type {Number}
     */
    static get LIVE_SHOW() {
        return 0;
    }

    /**
     * @type {Number}
     */
    static get FIRST_RUN_SHOW() {
        return 1;
    }

    /**
     * @type {Number}
     */
    static get RERUN_SHOW() {
        return 2;
    }

    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat(['channelId',
            'start',
            'duration',
            'name',
            'description',
            'parentalRating',
            'genre',
            'image',
            'resolution',
            'longDescription',
            'is3D',
            'audioLanguages',
            'subtitleLanguages',
            'showType']);
    }

    /**
     * Generates a target id for reminders
     * @returns {String}
     */
    generateTargetId() {
        return `${this.channelId}/${this.start}`;
    }

    /**
     * Checks if program is live or next
     * @returns {Boolean}
     */
    checkLive() {
        return (this.start < Date.now()) && (this.start + this.duration > Date.now());
    }

    /**
     * Checks if it is an episode from a series
     * @returns {Boolean}
     */
    isSeriesEpisode() {
        return false;
    }
}

export default AbstractProgram;
