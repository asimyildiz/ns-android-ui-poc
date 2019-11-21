/**
 * class for object properties
 * @name AbstractObjectProperties
 */
class AbstractObjectProperties {
    /**
     * @constructor
     */
    constructor() {
    // Check that PROPERTIES is defined
        if (this.getPropertiesNames() == null) {
            // console.error('You must define a static variable named PROPERTIES in your class');
        }
    }

    // ////////////////////////////////////////////////////////////////////////////////////////
    // PUBLIC API
    // ////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Set the value of a property
     * Note: there is no check to see if the property is a declared one or not
     *
     * @param {String} name The name of the property
     * @param {*} value The value of the property
     * @param {Boolean} disableNotify Disable the onPropertyChanged event
     * @returns {Object} The class instance to create chainable calls
     * @fires {AbstractObjectProperties#onPropertyChanged}
     */
    setProperty(name, value, disableNotify) {
        this[name] = value;
        if (!disableNotify) {
            this._onPropertyChanged(name, value);
        }
        return this;
    }

    /**
     * Returns the value of the given property
     * @param {String} name The name of the property
     * @returns {*} The value of the property
     */
    getProperty(name) {
        return this[name];
    }

    /**
     * Allows to set properties to a business model, only allowed properties (defined by the model) can be set.
     * @param {Object} properties A map of properties (name,value) pairs
     * @returns {Object} class instance
     */
    setProperties(properties) {
        if (properties !== undefined) {
            // Retrieve properties defined by the model
            const propertiesAllowed = this.getAllProperties();
            // Iterate on allowed properties and keep values given by param(properties)
            Object.keys(propertiesAllowed || {}).map((pName) => {
                const { length } = pName;
                const pValue = (properties[pName] != null) ? properties[pName] : this[pName];
                this.set(pName, pValue, true);

                return length;
            });
            this._onPropertiesChanged(properties);
        }
        return this;
    }

    /**
     * Get a map of all properties
     *
     * @returns {Object} A map of properties (name,value) pairs
     */
    getAllProperties() {
        const properties = {};
        (this.getPropertiesNames() || []).map((pName) => {
            const { length } = pName;
            properties[pName] = this.get(pName);

            return length;
        });
        return properties;
    }

    /**
     * Get a map of all defined properties
     *
     * @returns {Object} A map of defined properties (name,value) pairs
     */
    getAllDefinedProperties() {
        const properties = {};
        (this.getPropertiesNames() || []).map((pName) => {
            const { length } = pName;
            const value = this.get(pName);
            if (value) {
                properties[pName] = value;
            }

            return length;
        });
        return properties;
    }

    /**
     * Get the name of all properties
     * @returns {Array<String>} The name of the defined properties
     */
    getPropertiesNames() {
        return this.constructor.PROPERTIES;
    }

    /** ***************************************************************************************
     * EVENTs
     **************************************************************************************** */
    /**
     * on property changed event to be fired
     * @param {String} name
     * @param {Object} value
     * @protected
     */
    _onPropertyChanged(name, value) {
        this.onPropertyChanged(name, value);
    }

    /**
     * on multiple properties changed event to be fired
     * @param {Object} properties
     * @protected
     */
    _onPropertiesChanged(properties) {
        this.onPropertiesChanged(properties);
    }

    /**
     * Fired when a property has been set.
     * Note: for this implementation, the events is trigger whenever the set method is called,
     * meaning that event is triggered even if the property value has not changed
     *
     * @param {Object} name The name of the property
     * @param {Object} value The value of the property
     * @event onPropertyChanged
     */
    onPropertyChanged(name, value) {
    }

    /**
     * Fired when a properties has been set.
     * Note: for this implementation, the events is trigger whenever the set method is called,
     * meaning that event is triggered even if the property value has not changed
     *
     * @param {Object} properties The map of the properties
     * @event onPropertiesChanged
     */
    onPropertiesChanged(properties) {
    }
}

export default AbstractObjectProperties;
