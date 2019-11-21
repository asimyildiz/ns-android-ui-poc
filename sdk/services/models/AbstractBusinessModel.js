import AbstractObjectProperties from '../abstract/AbstractObjectProperties';

/**
 * class for volume service
 * @model AbstractBusinessModel
 */
class AbstractBusinessModel extends AbstractObjectProperties {
    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return ['id'];
    }

    /**
     * @param {Object} properties
     * @constructor
     */
    constructor(properties) {
        super(properties);
        this.id = null;

        if (properties) {
            this.setProperties(properties);
        }
    }
}

export default AbstractBusinessModel;
