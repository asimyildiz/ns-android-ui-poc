import AbstractChannel from '../../../services/models/AbstractChannel';

/**
 * class for channel model
 * @model DesktopChannel
 */
class DesktopChannel extends AbstractChannel {
    /**
     * synchronize model from nativeObject
     * @param {Object} bindings
     * @protected
     * @override
     */
    _synchronizeModelFromNativeObject(bindings) {
        bindings = bindings || this._bindings;
        if (this._nativeObject == null) {
            return;
        }

        this.id = this._nativeObject.id;
        this.url = this._nativeObject.url;
        this.logo = this._nativeObject.logo;
        this.name = this._nativeObject.name;
        this.number = parseInt(this._nativeObject.number, 10);
        this.type = this._nativeObject.type || AbstractChannel.TV_TYPE;
        this.description = this._nativeObject.contentDescription;
        this.logo = `${this.id}.png`;
        this.recordable = true;
        this.ccid = this.id;
    }
}

export default DesktopChannel;
