import AbstractNativeObjectModel from '../AbstractNativeObjectModel';

/**
 * class for vod classification tree model
 * @model VodClassificationTree
 */
class VodClassificationTree extends AbstractNativeObjectModel {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat([
            'defaultCategories',
            'featuredCategories',
            'specialCategories',
            'sortedCategories']);
    }

    /**
     * @param {Object} data
     * @constructor
     */
    constructor(data) {
        super(data);
        this.defaultCategories = [];
        this.featuredCategories = [];
        this.specialCategories = [];
        this.sortedCategories = [];
    }

    /**
     * add classification node to correct classification tree object
     * @param {Object} classificationNode
     */
    addClassificationTree(classificationNode) {
        switch (classificationNode.classificationTermCategory) {
        case 'FTRD':
            this.featuredCategories.push(classificationNode);
            break;
        case 'SPCL':
            this.specialCategories.push(classificationNode);
            break;
        case 'SORT':
            this.sortedCategories.push(classificationNode);
            break;
        default:
            this.defaultCategories.push(classificationNode);
            break;
        }
    }
}

export default VodClassificationTree;
