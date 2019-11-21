import AbstractProgram from './models/AbstractProgram';
import ServiceErrors from './helpers/ServiceErrors';
import ProgramHelper from './helpers/ProgramHelper';

/**
 * class for program service
 * @alias programService
 */
class AbstractProgramService {
    /**
     * @constructor
     */
    constructor() {
        this.programHelper = new ProgramHelper();
    }

    /** ***************************************************************************************
     * MODELs FACTORY
     **************************************************************************************** */
    /**
     * Create a new program model.
     * Always prefer using these method instead of using new $Program(),
     * as these method will always create the model with the right implementation.
     *
     * @param {Object} properties The model properties
     * @returns {AbstractProgram} The program model
     */
    newProgram(properties) {
        const program = this._newProgram(properties);
        if (program instanceof AbstractProgram) {
            return program;
        }
        throw new Error('The program model must inherit from $AbstractProgram !');
    }

    /** ***************************************************************************************
     * PUBLIC API
     **************************************************************************************** */
    /**
     * Get a map of EPG Programs for multiple channels.
     *
     * @param {String[]} channelIds - list of channel IDs.
     * @param {Object} [options]
     * @param {timestamp} [options.startTime=Date.now()] - Beginning of range
     * @param {timestamp} [options.endTime=Date.now()+12 hours] - End of range
     * @param {Boolean} [options.sort=true] - Set to false if the programs don't need to be sorted by start date.
     * @param {Boolean} [options.fillHoles=false] - Flag to hide or display holes between programs
     * @returns {Promise} A Promise resolved with the programs indexed by channel ID, like { channel1: [...], channel2: [...] }
     */
    getProgramGrid(channelIds, options) {
        options = options || {};
        options.startTime = options.startTime || Date.now();
        options.endTime = options.endTime || Date.now() + (12 * 3600 * 1000);
        if (options.endTime < options.startTime) {
            return ServiceErrors.throwErrorAsPromise('getProgramGrid: endTime must be after startTime.');
        }
        if (options.sort === undefined) {
            options.sort = true;
        }

        return this._getProgramGrid(channelIds, options)
            .then((epg) => {
                const sort = options.sort;
                const fillHoles = options.fillHoles;
                for (let i = 0; i < channelIds.length; i++) {
                    const channelId = channelIds[i];
                    let programs;
                    if (epg[channelId] == null) {
                        programs = [];
                        epg[channelId] = [];
                    } else {
                        programs = epg[channelId];
                    }
                    if (sort) {
                        programs.sort(this._startDateComparator);
                    }
                    if (fillHoles) {
                        this.programHelper._addEmptyPrograms(programs, channelId, options.startTime, options.endTime, options.lightweight);
                    }
                }
                return epg;
            });
    }

    /**
     * Get an array of EPG Programs for a single channel.<br>
     * You can specify either startTime and endtime or startTime and a number of programs to return.
     * Both an end time and a number of programs can be given. In this case both restrictions are respected : the returned programs
     * will never exceed the end time nor the number.
     *
     * @param {String|AbstractChannel} channel - channel object or channel ID.
     * @param {Object} [options]
     * @param {timestamp} [options.startTime=Date.now()] - Beginning of range. The first program covers at least this time and may begin before.
     * @param {timestamp} [options.endTime=Date.now()+12 hours] - End of range. The last program covers at least this time and may finish later.
     * @param {timestamp} [options.number] - number of programs to return.
     * @param {Boolean} [options.sort=true] - Set to false if the programs don't need to be sorted by start date.
     * @param {Boolean} [options.fillHoles=false] - Flag to hide or display holes between programs
     * @returns {Promise<AbstractProgram[],Error>} A Promise resolved with an array of {@link AbstractProgram}
     */
    getProgramsByChannel(channel, options) {
        const channelId = channel.id || channel;
        options = options || {};
        options.startTime = options.startTime || Date.now();
        if (options.number && (typeof options.number !== 'number' || options.number < 0)) {
            return ServiceErrors.throwErrorAsPromise('getProgramByChannel: number must be a positive integer.');
        }
        if (!options.endTime && !options.number) {
            options.endTime = Date.now() + (12 * 3600 * 1000);
        }
        if (options.endTime) {
            const timestampsAreValid = options.endTime > options.startTime; // checks both type and order
            if (!timestampsAreValid) {
                return ServiceErrors.throwErrorAsPromise('getProgramByChannel: invalid startTime and/or endTime.');
            }
        }
        if (options.sort === undefined) {
            options.sort = true;
        }

        return this._getProgramsByChannel(channelId, options)
            .then((programs) => {
                if (options.sort) {
                    programs.sort(this._startDateComparator);
                }
                if (options.fillHoles && (options.number == null || options.number > programs.length)) {
                    const end = programs.length > 0 ? (programs[programs.length - 1].start + programs[programs.length - 1].duration) : options.endTime;
                    this.programHelper._addEmptyPrograms(programs, channelId, options.startTime, end, options.lightweight);
                }
                return programs;
            });
    }

    /**
     * Return the program referenced by it's (unique) id
     *
     * @param {String} programId the unique id of the program to get
     * @param {Object} options Additional options
     * @param {Boolean} [options.force=false] If true, renew the cache
     * @param {Array<String>} [options.properties=null] If not null, specify the program properties to get (get all properties by default)
     * @returns {Promise<AbstractProgram, Error>} A promise (recording, error)
     */
    getProgram(programId, options) {
        options = options || {};

        // Check input args
        if (programId == null) {
            return ServiceErrors.throwErrorAsPromise('getProgram: programId is null !');
        }
        // Create a promise that read the internal recording db
        return this._getProgram(programId, options);
    }

    /**
     *
     * @param {AbstractChannel} channel
     * @param {Number} startTime
     * @returns {*}
     */
    findProgramByChannel(channel, startTime) {
        const options = {
            startTime,
            number: 1
        };
        return this.getProgramsByChannel(channel, options)
            .then((programs) => {
                if (programs && programs.length > 0) {
                    return Promise.resolve(programs[0]);
                }
                return Promise.resolve(null);
            });
    }

    /**
     * creates reruns list
     * @params {Object} data
     * @returns {AbstractProgram[]} reruns list
     */
    getRerunsList(data) {
        return this._getRerunsList(data);
    }

    /**
     * getting extended data for actor director and production info
     * @param {Object} model
     * @returns {*}
     */
    getExtendedProgramInfo(model) {
        return this._getExtendedProgramInfo(model);
    }

    /**
     * convert player programmes
     * @param {Object[]} programmes
     * @returns {*}
     */
    convertPlayerProgrammes(programmes) {
        return this._convertPlayerProgrammes(programmes);
    }

    /** ***************************************************************************************
     * ABSTRACT METHODs
     **************************************************************************************** */
    /**
     * Vendor implementation to create a new program model.
     *
     * @param {Object} properties The model properties
     * @returns {AbstractProgram} The program model
     * @abstract
     * @protected
     */
    _newProgram(properties) {
        ServiceErrors.notImplementedSync('AbstractProgramService', '_newProgram');
    }

    /**
     * Vendor implementation to get an array of EPG Programs for multiple channel.
     *
     * @param {String[]} channelIds - list of channel IDs.
     * @param {Object} [options]
     * @param {timestamp} [options.startTime=Date.now()] - Beginning of range
     * @param {timestamp} [options.endTime=Date.now()+12 hours] - End of range
     * @param {Boolean} [options.sort=true] - Set to false if the programs don't need to be sorted by start date.
     * @param {Boolean} [options.fillHoles=false] - Flag to hide or display holes between programs
     * @returns {Promise} A Promise resolved with the programs indexed by channel ID, like { channel1: [...], channel2: [...] }
     * @abstract
     * @protected
     */
    _getProgramGrid(channelIds, options) {
        return ServiceErrors.notImplementedPromise('AbstractProgramService', '_getProgramGrid');
    }

    /**
     * Get an array of EPG Programs for a single channel.<br>
     * You can specify either startTime and endtime or startTime and a number of programs to return.
     * Both an end time and a number of programs can be given. In this case both restrictions are respected : the returned programs
     * will never exceed the end time nor the number.
     *
     * @param {String|AbstractChannel} channel - channel object or channel ID.
     * @param {Object} [options]
     * @param {timestamp} [options.startTime=Date.now()] - Beginning of range. The first program covers at least this time and may begin before.
     * @param {timestamp} [options.endTime=Date.now()+12 hours] - End of range. The last program covers at least this time and may finish later.
     * @param {timestamp} [options.number] - number of programs to return.
     * @param {Boolean} [options.sort=true] - Set to false if the programs don't need to be sorted by start date.
     * @param {Boolean} [options.fillHoles=false] - Flag to hide or display holes between programs
     * @returns {Promise<AbstractProgram[],Error>} A Promise resolved with an array of {@link AbstractProgram}
     * @abstract
     * @protected
     */
    _getProgramsByChannel(channel, options) {
        return ServiceErrors.notImplementedPromise('AbstractProgramService', '_getProgramsByChannel');
    }

    /**
     * Vendor implementation that returns the program referenced by it's (unique) id
     * Some implementation may not support these feature
     *
     * @param {String} programId the unique id of the program to get
     * @param {Object} options Additional options
     * @param {Boolean} [options.force=false] If true, renew the cache
     * @param {String[]} [options.properties=null] If not null, specify the program properties to get (get all properties by default)
     * @returns {Promise<AbstractProgram, Error>} A promise (AbstractProgram, error)
     * @abstract
     * @protected
     */
    _getProgram(programId, options) {
        return ServiceErrors.notImplementedPromise('AbstractProgramService', '_getProgram');
    }

    /**
     * vendor implementation to get reruns list of a program
     * @param {Object} params
     * @returns {*}
     * @abstract
     * @protected
     */
    _getRerunsList(params) {
        return ServiceErrors.notImplementedPromise('AbstractProgramService', '_getRerunsList');
    }

    /**
     * vendor implementation to get extended data for actor director and production info
     * @param {Object} model
     * @returns {*}
     * @abstract
     * @protected
     */
    _getExtendedProgramInfo(model) {
        return ServiceErrors.notImplementedPromise('AbstractProgramService', '_getExtendedProgramInfo');
    }

    /**
     * convert player programmes
     * @param {Object[]} programmes
     * @returns {*}
     * @abstract
     * @protected
     */
    _convertPlayerProgrammes(programmes) {
        return ServiceErrors.notImplementedPromise('AbstractProgramService', '_convertPlayerProgrammes');
    }

    /** ***************************************************************************************
     * HELPERs
     **************************************************************************************** */
    /**
     * Comparator function to sort received programs.
     * Parameters p1 and p2 are objects with a "start" timestamp property.<br>
     * This is the case of {@link AbstractProgram} and lightweight program objects.
     * @param {AbstractProgram} p1 A program model
     * @param {AbstractProgram} p2 A program model
     * @returns {number} p1.start - p2.start
     * @protected
     */
    _startDateComparator(p1, p2) {
        return p1.start - p2.start;
    }
}

export default AbstractProgramService;
