import AbstractNativeObjectModel from '../AbstractNativeObjectModel';

/**
 * class for vod classification node model
 * @model VodClassificationNode
 */
class VodClassificationNode extends AbstractNativeObjectModel {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat([
            'isErotic',
            'classificationTermName',
            'classificationTermKey',
            'classificationName',
            'reportingClassificationName',
            'classificationLogo',
            'backgroundPath',
            'childNodes',
            'classificationTermCategory',
            'isPvrRequired',
            'pvrMessage',
            'classificationUrlSlug']);
    }

    /**
     * @param {Object} data
     * @constructor
     */
    constructor(data) {
        super(data);

        if (data) {
            this.isErotic = data.isErotic || false;
            this.classificationTermName = data.ClassificationTermName;
            this.classificationTermKey = data.ClassificationTermKey;
            this.classificationName = data.ClassificationName;
            this.reportingClassificationName = data.ReportingClassificationName;
            this.classificationLogo = data.ClassificationLogo;
            this.backgroundPath = data.BackgroundPath;

            this.childNodes = [];
            if (data.ChildNodes) {
                for (let i = 0; i < data.ChildNodes.length; i++) {
                    this.childNodes.push(new VodClassificationNode(data.ChildNodes[i]));
                }
            }

            this.classificationTermCategory = data.ClassificationTermCategory;
            this.isPvrRequired = data.IsPvrRequired || false;
            this.pvrMessage = data.PVRMessage;
            this.classificationUrlSlug = data.ClassificationUrlSlug;
        }
    }
}

export default VodClassificationNode;
