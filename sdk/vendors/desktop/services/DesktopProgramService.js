import AbstractProgramService from '../../../services/AbstractProgramService';
import Arrays from '../../../utils/Arrays';
import DesktopProgram from '../models/DesktopProgram';
import DesktopExtendedProgram from '../models/DesktopExtendedProgram';
import programData from '../data/ProgramData';

/**
 * class for program service for desktop vendor implementation
 * @alias programService
 * @name DesktopProgramService
 */
class DesktopProgramService extends AbstractProgramService {
    /**
     * @constructor
     */
    constructor() {
        super();
        this._epg = undefined;
        this._programsById = [];
        this.__createSchedule(programData);
    }

    /** ***************************************************************************************
     * PRIVATE
     **************************************************************************************** */
    /**
     * Converts the generic program list to an object indexed by channel ID
     * @param {Array} genericProgramList
     * @private
     */
    __createSchedule(genericProgramList) {
        let i;
        const schedule = {};
        const channelIds = [];

        // All program dates are translated so that the 1st program starts yesterday;
        const DAY = 24 * 3600 * 1000;
        const yesterday = Date.now() - DAY;
        const firstProgramStart = genericProgramList[0].start_date * 1000;
        let delta = yesterday - firstProgramStart;
        delta -= delta % DAY; // remove hours, minutes, seconds from delta

        for (i = 0; i < genericProgramList.length; i++) {
            const program = genericProgramList[i];
            const channelId = program.service_id;
            let scheduleChannel = schedule[channelId];
            if (!scheduleChannel) {
                channelIds.push(channelId);
                scheduleChannel = [];
                schedule[channelId] = scheduleChannel;
            }
            program.start_date += delta / 1000;
            program.end_date += delta / 1000;

            // Create business model
            const businessProgram = this._newProgram().setNativeObject(program, true /* synchronize */);
            scheduleChannel.push(businessProgram);
            this._programsById.push(businessProgram);
            businessProgram._end = program.end_date * 1000;
        }

        // Maintain a list of programs to get a program by it's id
        this._programsById.sort((a, b) => a.id - b.id); // Sort by id for fast binary search by id

        // For each channel, sort the programs par ascending start time.
        function byStartDate(a, b) {
            return a.start - b.start;
        }

        for (i = 0; i < channelIds.length; i++) {
            schedule[channelIds[i]].sort(byStartDate);
        }

        this._epg = schedule;
    }

    /**
     * Gets an array of EPG programs for multiple channels.
     *
     * @param {string[]} channelIds - list of channel IDs.
     * @param {number} startTime - Beginning of range
     * @param {number} endTime - End of range
     * @param {object} [options] - an object with the following properties:<br>
     * @param {boolean} [options.fillHoles=false] - true to fill EPG holes with empty programs
     * @returns {Promise} A Promise resolved with the schedule events indexed by channel ID, like { channel1: [...], channel2: [...] }
     * @private
     */
    __getEPGPrograms(channelIds, startTime, endTime, options) {
        const programs = {};
        for (let i = 0; i < channelIds.length; i++) {
            const channelId = channelIds[i];
            const allPrograms = this._epg[channelId];

            const firstIndex = Arrays.interpolationSearch(allPrograms, startTime, 'start', {
                strategy: 'floor',
                forceArrayRange: true
            });
            const lastIndex = Arrays.interpolationSearch(allPrograms, endTime, 'start', {
                strategy: 'ceil'
            });
            programs[channelId] = allPrograms.slice(firstIndex, lastIndex);
        }

        return programs;
    }


    /** ***************************************************************************************
     * IMPLEMENTATIONs
     **************************************************************************************** */

    /**
     * Vendor implementation to create a new program model.
     *
     * @param {Object} properties The model properties
     * @returns {DesktopProgram} The program model
     * @override
     * @protected
     */
    _newProgram(properties) {
        return new DesktopProgram(properties);
    }

    /**
     * Extended program info
     *
     * @param {Object} properties
     * @returns {DesktopExtendedProgram}
     * @override
     * @protected
     */
    _newExtendedProgram(properties) {
        return new DesktopExtendedProgram(properties);
    }

    /**
     * vendor implementation to get extended data for actor director and production info
     * @param {Object} model
     * @returns {*}
     * @override
     * @protected
     */
    _getExtendedProgramInfo(model) {
        return Promise.resolve(this._newExtendedProgram({
            Actors: 'Actor1,Actor2,Actor3,Actor4,Actor5,Actor6,Actor7,Actor8,Actor9,Actor10,Actor11,Actor12',
            Directors: 'Director Name',
            Country: 'Turkey',
            'Production Year': '2013'
        }));
    }

    /**
     * creates reruns list
     * @params {Object} program
     * @returns {AbstractProgram[]} reruns list
     */
    _getRerunsList(program) {
        return Promise.resolve([
            {
                majorChannel: 1,
                id: 'TF1',
                channelName: 'DİZİMAX COMEDY HD',
                start_time: '2578153437',
                startDate: '08.01.2015',
                programmeID: 70686853
            },
            {
                majorChannel: 2,
                id: 'FRANCE2',
                channelName: 'DİZİMAX COMEDY HD',
                start_time: '2778753437',
                startDate: '18.01.2015',
                programmeID: 70687309
            },
            {
                majorChannel: 6,
                id: 'M6',
                channelName: 'DİZİMAX VICE',
                start_time: '3078153437',
                startDate: '08.01.2015',
                programmeID: 4420657
            },
            {
                majorChannel: 8,
                id: 'DIRECT8',
                channelName: 'BABY TV',
                start_time: '1978153437',
                startDate: '08.01.2015',
                programmeID: 37387343
            },
            {
                majorChannel: 14,
                id: 'FRANCE4',
                channelName: 'DİZİMAX COMEDY HD',
                start_time: '2015343712',
                startDate: '08.01.2015',
                programmeID: 33956756
            },
            {
                majorChannel: 15,
                id: 'BFMTV',
                channelName: 'DİZİMAX COMEDY HD',
                start_time: '2478153437',
                startDate: '18.01.2015',
                programmeID: 70668428
            },
            {
                majorChannel: 16,
                id: 'ITELE',
                channelName: 'DİZİMAX VICE',
                start_time: '2978153437',
                startDate: '08.01.2015',
                programmeID: 70658152
            },
            {
                majorChannel: 17,
                id: 'VIRGIN17',
                channelName: 'BABY TV',
                start_time: '2878153437',
                startDate: '08.01.2015',
                programmeID: 44540330
            },
            {
                majorChannel: 18,
                id: 'GULLI',
                channelName: 'DİZİMAX VICE',
                start_time: '2270153437',
                startDate: '08.01.2015',
                programmeID: 15093702
            },
            {
                majorChannel: 1,
                id: 'TF1',
                channelName: 'BABY TV',
                start_time: '2178153437',
                startDate: '08.01.2015',
                programmeID: 70686853
            },
            {
                majorChannel: 2,
                id: 'FRANCE2',
                channelName: 'DİZİMAX VICE',
                start_time: '3078153437',
                startDate: '08.01.2015',
                programmeID: 70687309
            },
            {
                majorChannel: 6,
                id: 'M6',
                channelName: 'BABY TV',
                start_time: '2278153437',
                startDate: '08.01.2015',
                programmeID: 4420657
            },
            {
                majorChannel: 8,
                id: 'DIRECT8',
                channelName: 'DİZİMAX VICE',
                start_time: '2178153437',
                startDate: '08.01.2015',
                programmeID: 37387343
            },
            {
                majorChannel: 14,
                id: 'FRANCE4',
                channelName: 'BABY TV',
                start_time: '2378153437',
                startDate: '08.01.2015',
                programmeID: 33956756
            }
        ]);
    }

    /**
     * Get an array of EPG Programs for multiple channels.
     *
     * @param {String[]} channelIds - list of channel IDs.
     * @param {Object} [options]
     * @param {timestamp} [options.startTime=Date.now()] - Beginning of range
     * @param {timestamp} [options.endTime=Date.now()+12 hours] - End of range
     * @param {Boolean} [options.sort=true] - Set to false if the programs don't need to be sorted by start date.
     * @param {Boolean} [options.fillHoles=false] - Flag to hide or display holes between programs
     * @returns {Promise} A Promise resolved with the programs indexed by channel ID, like { channel1: [...], channel2: [...] }
     * @override
     * @protected
     */
    _getProgramGrid(channelIds, options) {
        return Promise.resolve(this.__getEPGPrograms(channelIds, options.startTime, options.endTime));
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
     * @returns {Promise<DesktopProgram[],Error>} A Promise resolved with an array of {@link DesktopProgram}
     * @override
     * @protected
     */
    _getProgramsByChannel(channelId, options) {
        let programs = this.__getEPGPrograms([channelId], options.startTime, options.endTime || Infinity)[channelId];
        if (options.number) {
            programs = programs.slice(0, options.number);
        }
        return Promise.resolve(programs);
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
     * @override
     * @protected
     */
    _getProgram(programId, options) {
        const index = Arrays.binarySearch(this._programsById, programId, 'id');
        return Promise.resolve(this._programsById[index]);
    }

    /**
     * convert player programmes
     * @param {Object[]} programmes
     * @returns {*}
     */
    _convertPlayerProgrammes(programmes) {
        const programs = [];
        for (let i = 0; i < programmes.length; i++) {
            programs.push(this._newProgram().setNativeObject(programmes[i], true /* synchronize */));
        }
        return Promise.resolve(programs);
    }
}

export default DesktopProgramService;
