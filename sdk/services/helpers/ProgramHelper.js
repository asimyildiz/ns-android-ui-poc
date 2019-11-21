import EmptyProgram from '../models/EmptyProgram';

class ProgramHelper {
    /**
     * @constructor
     */
    constructor() {
    /**
         * EPG: minimum duration between 2 programs to add an empty program.
         */
        this.minEmptyBlockDuration = 10 * 1000;

        /**
         * EPG: maximum duration of empty programs.
         */
        this.maxEmptyBlockDuration = 2 * 3600 * 1000;

        /* Internal unique numeric channel index used to generate empty program ids.
         * - must be an integer between 0 and 99999 (5 decimal digits, see _emptyProgram)
         * - must be unique for each channel
         * - must be consistent across channel data reload (empty programs must have the same generated id if all or part of the EPG is reloaded)
         * - does not have to be consistent across application reload.
         * A simple channel counter with the same lifecycle as the whole app does the job.
         */
        this.__channelCount = 0;
        this.__channelIndex = {};
    }

    /**
     * Fix a list of programs so that they are consecutive, between the startTime and endTime parameters.
     * The list is supposed to be initially sorted by ascending "start" value.
     * This method shortens, enlarges, adds or removes programs.
     *
     * @param {AbstractProgram[]} programs - list of programs.
     * @param {String} channelId - Used to create new empty blocks.
     * @param {Number} [startTime] - starting timestamp to consider. By default the beginning of the first program.
     * @param {Number} [endTime] - ending timestamp to consider. By default the end of the last program.
     * @param {Boolean} [lightweight=false] - if true, will create lightweight empty programs.
     * @returns {AbstractProgram[]} The modified program list. It's the initial list modified in-place, not a newly created one.
     * @protected
     */
    _addEmptyPrograms(programs, channelId, startTime, endTime, lightweight) {
    // TODO programs.splice.apply may not be the best way to insert empty programs.
        const channelIndex = this.__getChannelIndex(channelId);
        let emptyPrograms;
        if (programs.length === 0) {
            emptyPrograms = this._createEmptyPrograms(startTime, channelId, channelIndex, endTime - startTime, lightweight);
            programs.splice(...[programs.length, 0].concat(emptyPrograms)); // in-place concat
            return programs;
        }

        let lastProgram;
        let lastEnd;
        let duration;
        startTime = startTime || programs[0].start;
        endTime = endTime || programs[programs.length - 1].start + programs[programs.length - 1].duration;
        for (let i = 0; i < programs.length; i++) {
            const program = programs[i];
            if (i === 0) {
                if (program.start > startTime + this.minEmptyBlockDuration) {
                    emptyPrograms = this._createEmptyPrograms(startTime, channelId, channelIndex, program.start - startTime, lightweight);
                    programs.splice(...[i, 0].concat(emptyPrograms)); // Insert empty programs into the programs list
                    i += emptyPrograms.length;
                } else if (program.start + program.duration < startTime) {
                    programs.splice(0, 1); // Remove program
                    i = -1;
                }
            } else if (program.start < lastEnd) {
                // Overlapping programs
                if (program.start <= startTime) {
                    // Remove everything before starttime.
                    programs.splice(0, i);
                    i = -1;
                } else if (program.start === lastProgram.start && (program.start + program.duration) === lastEnd) {
                    // Remove duplicate
                    programs.splice(i, 1);
                    i = -1;
                } else {
                    // Shorten previous program.
                    programs[i - 1].duration = program.start - programs[i - 1].start;
                }
            } else if (program.start > lastEnd) {
                // Hole
                if (program.start > lastEnd + this.minEmptyBlockDuration) {
                    // Large hole: fill with empty blocks.
                    duration = program.start - lastEnd;
                    emptyPrograms = this._createEmptyPrograms(lastEnd, channelId, channelIndex, duration, lightweight);
                    programs.splice(...[i, 0].concat(emptyPrograms)); // Insert empty programs into the programs list
                    i += emptyPrograms.length;
                } else {
                    // Small hole: widen previous program.
                    programs[i - 1].duration = program.start - programs[i - 1].start;
                }
            }
            lastProgram = program;
            lastEnd = program.start + program.duration;
        }

        if (!lastEnd) {
            duration = endTime - startTime;
            emptyPrograms = this._createEmptyPrograms(startTime, channelId, channelIndex, duration, lightweight);
            programs.splice(...[programs.length, 0].concat(emptyPrograms)); // in-place concat
        } else if (lastEnd < endTime) {
            duration = endTime - lastEnd;
            emptyPrograms = this._createEmptyPrograms(lastEnd, channelId, channelIndex, duration, lightweight);
            programs.splice(...[programs.length, 0].concat(emptyPrograms)); // in-place concat
        }
        return programs;
    }

    /**
     * Crate a list of empty programs.
     *
     * @param {Number} starttime - timestamp of the beginning of the first empty program.
     * @param {String} channelId - mandatory : used to generate empty programs.
     * @param {Number} channelIndex - internal unique numeric channel index between 0 and 99999 inclusive wit no special meaning
     * @param {Number} totalDuration - total time duration to fill with empty programs.
     * @param {Boolean} [lightweight=false] - true to generate lightweight program objects instead of {@link AbstractProgram}.
     * @returns {AbstractProgram[]|Object[]}
     * @protected
     */
    _createEmptyPrograms(starttime, channelId, channelIndex, totalDuration, lightweight) {
        const programs = [];
        if (isNaN(totalDuration) || totalDuration < 0) {
            return programs;
        }
        let programStart = starttime;
        do {
            let programDuration = totalDuration;
            if (totalDuration > this.maxEmptyBlockDuration) {
                programDuration = this.maxEmptyBlockDuration;
            }
            const emptyProgram = this._emptyProgram(channelId, channelIndex, programStart, programDuration, lightweight);
            programs.push(emptyProgram);
            totalDuration -= programDuration;
            programStart += programDuration;
        } while (totalDuration > 0);
        return programs;
    }

    /**
     * Creates an empty schedule program.<br>
     *
     * Its ID is constructed as follows:
     * <pre>
     * A JS Number takes 53 bits, or 15 safe decimal digits.
     * A JS timestamp (in milliseconds) takes 13 decimal digits.
     * ┌─5 digits──────10 decimal digits─────┐
     * │ channel# │   starttime in seconds   │   where channel# is an internal index with no special meaning.
     * └─────────────────────────────────────┘
     * <pre>
     * It ensures that :
     *    - a given empty program always has the same id across different reloads.
     *    - the id is always a number, enabling aggressive memory and speed optimizations.
     *    - up to 100000 channels can be used without any id collisions.
     *
     * @param {String} channelId - channel ID
     * @param {Number} channelIndex - internal unique numeric channel index between 0 and 99999 inclusive wit no special meaning
     * @param {Number} start - timestamp of the beginning of the program
     * @param {Number} duration - in milliseconds
     * @param {Boolean} [lightweight=false] - true if a lighweight object is expected. By default (falsy) an
     *                  {@link AbstractProgram} is returned.
     * @returns {AbstractProgram|object}
     * @protected
     */
    _emptyProgram(channelId, channelIndex, start, duration, lightweight) {
        const id = (channelIndex * 1e10) + Math.floor(start / 1000);
        if (lightweight) {
            return {
                id,
                start,
                duration,
                name: null
            };
        }
        return new EmptyProgram({
            id,
            channelId,
            start,
            duration,
            isEmpty: true
        });
    }

    /**
     * Get the index of channel.<br>
     * @returns {number} Channel index
     * @params {string} channelId
     * @private
     */
    __getChannelIndex(channelId) {
        let index = this.__channelIndex[channelId];
        if (index === undefined) {
            index = this.__channelCount++;
            this.__channelIndex[channelId] = index;
        }
        return index;
    }
}

export default ProgramHelper;
