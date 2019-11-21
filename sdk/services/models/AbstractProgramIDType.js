/**
 * class for program id type model
 * @model AbstractProgramIDType
 */
class AbstractProgramIDType {
    /**
     * @constant
     * @type {Number}
     * @default 0
     */
    static get ID_TVA_CRID() {
        return 0;
    }

    /**
     * @constant
     * @type {Number}
     * @default 1
     */
    static get ID_DVB_EVENT() {
        return 1;
    }

    /**
     * @constant
     * @type {Number}
     * @default 2
     */
    static get ID_TVA_GROUP_CRID() {
        return 2;
    }
}

export default AbstractProgramIDType;
