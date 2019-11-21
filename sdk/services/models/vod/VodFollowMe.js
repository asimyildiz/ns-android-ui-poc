import AbstractNativeObjectModel from '../AbstractNativeObjectModel';

/**
 * class for vod follow me model
 * @model VodFollowMe
 */
class VodFollowMe extends AbstractNativeObjectModel {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat([
            'contentId',
            'date',
            'duration',
            'elapsed',
            'userID']);
    }

    /**
     * @param {Object} data
     * @constructor
     */
    constructor(data) {
        super(data);

        if (data) {
            this.contentId = data.ContentID;

            if (data.Date) {
                const regex = /-?\d+/;
                const timeToParse = regex.exec(data.Date);
                if (timeToParse && timeToParse.length > 0) {
                    this.date = new Date(parseInt(timeToParse[0], 10));
                }
            }

            this.duration = data.Duration;
            this.elapsed = data.Elapsed;
            this.userId = data.UserID;
        }
    }
}

export default VodFollowMe;
