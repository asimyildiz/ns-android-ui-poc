const errorSingleton = Symbol('ServiceErrors');
const errorSingletonEnforcer = Symbol('ServiceErrors');

class ServiceErrors {
    /**
     * @constructor
     * @param {Symbol} enforcer
     */
    constructor(enforcer) {
        if (enforcer !== errorSingletonEnforcer) {
            throw new Error('Cannot construct singleton');
        }
    }

    /**
     * returns the instance of ServiceCache, singleton
     * @returns {ServiceCache}
     */
    static get instance() {
        if (!this[errorSingleton]) {
            this[errorSingleton] = new ServiceErrors(errorSingletonEnforcer);
        }

        return this[errorSingleton];
    }

    /**
     * Return a promise that will be rejected with an error and that will fired the onError event.
     * @param errorMessage {String} The error message
     * @returns {Promise} A rejected promise
     * @protected
     */
    throwErrorAsPromise(errorMessage) {
        return Promise.reject(new Error(errorMessage))
            .catch(this._onErrorCallback());
    }

    /**
     * Return a promise rejected with a "child class must implement the xxx method" error and that will fire the onError event.
     * @param {String} className - the name of the class that the method is not implemented inside
     * @param {String} methodName - the name of the method that is not implemented
     * @returns {Promise} A rejected promise
     */
    notImplementedPromise(className, methodName) {
        const e = new Error(`You must implement ${className}.${methodName}`);
        this._onError(e);
        return Promise.reject(e);
    }

    /**
     * Throws an error with a "child class must implement the xxx method" error and that will fire the onError event.
     * @param {String} className - the name of the class that the method is not implemented inside
     * @param {String} methodName - the name of the method that is not implemented
     * @throws {Error}
     */
    notImplementedSync(className, methodName) {
        const e = new Error(`You must implement ${className}.${methodName}`);
        this._onError(e);
        throw e;
    }

    /**
     * Create the callback to be used with a rejected promise.
     * The callback is bound to the this to make sure the context inside the callback is the service object.
     * @returns {*}
     * @protected
     */
    _onErrorCallback() {
        return (function (e) {
            this._onError(e);
            throw e;
        }).bind(this);
    }

    /**
     * Extension point
     * @param {Error} e The error
     * @protected
     */
    _onError(e) {
        this.onError(e);
    }

    /**
     * Fired when an error has occured
     * @param {Error} e The error
     * @event onError
     */
    onError(e) {
    }
}

export default ServiceErrors.instance;
