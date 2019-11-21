import AbstractVolumeService from '../../../services/AbstractVolumeService';

/**
 * class for volume service for desktop vendor implementation
 * @alias volumeService
 * @name DesktopVolumeService
 */
class DesktopVolumeService extends AbstractVolumeService {
    /**
     * set volume to localStorage
     * @param {Number} volume
     * @returns {Promise<Number>}
     * @protected
     * @override
     */
    /* eslint no-undef: 0 */
    _setVolume(volume) {
        localStorage.setItem('volume', volume);
        return Promise.resolve(volume);
    }

    /**
     * get volume from localStorage
     * @returns {Promise<Number>}
     * @protected
     * @override
     */
    /* eslint no-undef: 0 */
    _getVolume() {
        return Promise.resolve(parseInt(localStorage.getItem('volume'), 10));
    }
}

export default DesktopVolumeService;
