import AbstractProgram from '../../../services/models/AbstractProgram';
import DesktopProgramGenre from './DesktopProgramGenre';
import DesktopProgramIDType from './DesktopProgramIDType';
import Arrays from '../../../utils/Arrays';
import categoryData from '../data/CategoryData';

/**
 * class for program model
 * @model DesktopProgram
 */
class DesktopProgram extends AbstractProgram {
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
        this.channelId = this._nativeObject.service_id;
        this.start = this._nativeObject.start_date * 1000;

        // replace by duration when generated event doesn't have end_date
        if (this._nativeObject.end_date) {
            this.duration = (this._nativeObject.end_date - this._nativeObject.start_date) * 1000;
        } else {
            this.duration = this._nativeObject.duration;
        }

        this.name = this._nativeObject.name;
        this.description = this._nativeObject.description;
        this.parentalRating = this._nativeObject.rating;
        const categoryIndex = Arrays.search(categoryData, this._nativeObject.category_id, 'id');
        if (categoryIndex !== -1) {
            this.genre = categoryData[categoryIndex].content_nibble_lvl_1;
        } else {
            this.genre = DesktopProgramGenre.UNDEFINED;
        }
        this.image = this._getProgramImagePath(this._nativeObject);
        this.showType = this._nativeObject.showType;
        this.hasRecording = false;
        this.recording = null;
        this.programmeIDType = DesktopProgramIDType.ID_DVB_EVENT;
    }

    /**
     * Returns the program image path.
     * It removes the '../../../..' prefix contained in generic events data.
     * @param {AbstractProgram} program
     * @returns {String}
     * @protected
     */
    _getProgramImagePath(program) {
        if (program.image) {
            return program.image.substring(12);
        }
        return '';
    }
}

export default DesktopProgram;
