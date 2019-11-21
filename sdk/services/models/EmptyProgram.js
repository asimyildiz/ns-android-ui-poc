import AbstractProgram from './AbstractProgram';

/**
 * class for an empty program
 * @model EmptyProgram
 */
class EmptyProgram extends AbstractProgram {
    /**
     * @constructor
     */
    constructor() {
        super();
        /**
         * A flag that indicates the nature of the program (empty).
         * A shortcut to 'instanceof $EmptyProgram'
         * @constant
         * @type {Boolean}
         * @default true
         */
        this.isEmpty = true;
    }
}

export default EmptyProgram;
