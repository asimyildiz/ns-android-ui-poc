import AbstractExtendedProgram from '../../../services/models/AbstractExtendedProgram';

/**
 * class for extended program model
 * @model DesktopExtendedProgram
 */
class DesktopExtendedProgram extends AbstractExtendedProgram {
    /**
     * This function can be overridden to extended program component initialization.
     * It is called automatically when the class is instantiated.
     * @ignore
     */
    constructor(properties) {
        super();
        this.Actors = properties.Actors;
        this.Directors = properties.Directors;
        this.Country = properties.Country;
        this['Production Year'] = properties['Production Year'];
        this.MasterProductionID = 'PT0000095122';
        this.SeriesID = '';
    }
}

export default DesktopExtendedProgram;
