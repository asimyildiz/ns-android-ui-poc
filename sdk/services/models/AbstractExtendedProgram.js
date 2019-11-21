import AbstractProgram from './AbstractProgram';

/**
 * class for extended program model
 * @model AbstractExtendedProgram
 */
class AbstractExtendedProgram extends AbstractProgram {
    /**
     * @constructor
     */
    constructor() {
        super();

        /**
         * kind of language.
         * @type {String}
         * @default undefined
         */
        this.languageCode = undefined;

        /**
         * TODO description
         * @type {String[]}
         * @default []
         */
        this.items = []; // NO NO NO ! c'est dans le prototype au lieu de l'instance !

        /**
         * text description.
         * @type {String}
         * @default undefined
         */
        this.text = undefined;
    }

    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat([
            'Actors',
            'Directors',
            'Country',
            'Production Year',
            'MasterProductionID',
            'SeriesID'
        ]);
    }
}

export default AbstractExtendedProgram;
