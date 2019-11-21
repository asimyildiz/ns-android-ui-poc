import ServiceErrors from './helpers/ServiceErrors';

/**
 * class for volume service
 * @alias volumeService
 */
class AbstractVolumeService {
    /**
     * Set the main volume.
     *
     * @param {Number} volume - Volume percent between 0 and 100 inclusive.
     * @returns {Promise<Number>} A Promise resolved when the volume is actually changed, with the new volume percentage between 0 and 100 inclusive.
     */
    setVolume(volume) {
        return this._setVolume(volume)
            .then(() => volume);
    }

    /**
     * Get the current main volume.
     *
     * @param {Object} options Additional options
     * @param {Boolean} [options.force=false] If true, renew the cache
     * @returns {Promise<Number>} A Promise resolved with the volume percentage between 0 and 100 inclusive.
     */
    getVolume(options) {
        return this._getVolume(options);
    }

    /**
     * Mute the volume.
     * Note: not equivalent to setVolume(0) ! Mute preserves the current volume.
     *
     * @returns {Promise} A Promise resolved when the volume is actually muted.
     */
    mute() {
        return this._mute();
    }

    /**
     * Unmute the volume.
     *
     * @returns {Promise} A Promise resolved when the volume is actually unmuted.
     */
    unMute() {
        return this._unMute();
    }

    /**
     * Check if the volume is muted.
     *
     * @param {Object} [options] Additional options
     * @param {Boolean} [options.force=false] If true, refresh the cache
     * @returns {Promise<Boolean>} A Promise resolved with the mute status.
     */
    isMuted(options) {
        return this._isMuted(options);
    }


    //   ___                 _
    //  |_ _|_ __ ___  _ __ | |
    //   | || '_ ` _ \| '_ \| |
    //   | || | | | | | |_) | |
    //  |___|_| |_| |_| .__/|_|
    // Implementations|_|

    /**
     * @returns {Promise<Number>} A Promise resolved when the volume is actually changed, with the volume percentage between 0 and 100 inclusive.
     * @abstract
     * @protected
     */
    _setVolume(volume) {
        return ServiceErrors.notImplementedPromise('AbstractVolumeService', '_setVolume');
    }

    /**
     * @returns {Promise<Number>} A Promise resolved with the volume percentage between 0 and 100 inclusive.
     * @abstract
     * @protected
     */
    _getVolume(options) {
        return ServiceErrors.notImplementedPromise('AbstractVolumeService', '_getVolume');
    }

    /**
     * @returns {Promise} A Promise resolved when the volume is actually muted.
     * @abstract
     * @protected
     */
    _mute() {
        return ServiceErrors.notImplementedPromise('AbstractVolumeService', '_mute');
    }

    /**
     * @returns {Promise} A Promise resolved when the volume is actually unmuted.
     * @abstract
     * @protected
     */
    _unMute() {
        return ServiceErrors.notImplementedPromise('AbstractVolumeService', '_unMute');
    }

    /**
     * @returns {Promise<boolean>} A Promise resolved with the mute status.
     * @abstract
     * @protected
     */
    _isMuted(options) {
        return ServiceErrors.notImplementedPromise('AbstractVolumeService', '_isMuted');
    }
}

export default AbstractVolumeService;
