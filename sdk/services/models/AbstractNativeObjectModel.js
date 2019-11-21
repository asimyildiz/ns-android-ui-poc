import AbstractBusinessModel from './AbstractBusinessModel';

/**
 * class for native object model
 * @model AbstractNativeObjectModel
 */
class AbstractNativeObjectModel extends AbstractBusinessModel {
    /**
     * @constructor
     */
    constructor() {
        super();
        // model properties => native object properties binding
        this._bindings = {};

        // pointer to an object provided by a vendor implementation which is needed for some APIs
        this._nativeObject = null;
    }

    /** ***************************************************************************************
     * NATIVE
     **************************************************************************************** */
    /**
     * Return the native object associated to these business model.
     *
     * @param {Boolean} synchronize Should the returned native object be synchronized with the model properties (according to the bindings property)
     * @param {Object} bindings The bindings map to use (instead of the default one)
     */
    getNativeObject(synchronize, bindings) {
        synchronize = synchronize || false;
        if (synchronize) {
            this._synchronizeNativeObjectFromModel(bindings);
        }
        return this._nativeObject;
    }

    /**
     * Set the native object associated with this model.
     *
     * @param {Object} nativeObject The vendor native object
     * @param {Boolean} synchronize Should the model be synchronized with the native object properties (according to the bindings property)
     * @param {Object} bindings The bindings map to use (instead of the default one)
     * @returns {AbstractBusinessModel}
     */
    setNativeObject(nativeObject, synchronize, bindings) {
        synchronize = synchronize || false;
        this._nativeObject = nativeObject;
        if (synchronize) {
            this._synchronizeModelFromNativeObject(bindings);
        }
        return this;
    }

    /** ***************************************************************************************
     * SYNCHRONIZATION
     **************************************************************************************** */
    /**
     * synchronize nativeObject using current model
     * @param {Object} bindings
     * @protected
     */
    _synchronizeNativeObjectFromModel(bindings) {
        bindings = bindings || this._bindings;
        if (this._nativeObject == null) {
            return;
        }
        // update this._nativeObject properties with model ones (this)
        Object.keys(bindings).forEach(function (modelPropertyPath) {
            const nativeObjectPropertyPath = bindings[modelPropertyPath];
            this._nativeObject[nativeObjectPropertyPath] = this[modelPropertyPath];
        }, this);
    }

    /**
     * synchronize model using nativeObject
     * @param {Object} bindings
     * @protected
     */
    _synchronizeModelFromNativeObject(bindings) {
        bindings = bindings || this._bindings;
        if (this._nativeObject == null) {
            return;
        }
        // update model properties (this) with this._nativeObject ones>
        Object.keys(bindings).forEach(function (modelPropertyPath) {
            this[modelPropertyPath] = this._nativeObject[bindings[modelPropertyPath]];
        }, this);
    }
}

export default AbstractNativeObjectModel;
