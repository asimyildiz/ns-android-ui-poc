/**
 *
 * @name Arrays
 * @class
 */
class Arrays {
    /**
     * Search a value in an unordered list, or a property value in an unordered object list.<br>
     * A lot faster than Array.prototype.findIndex<br>
     * Algorithmic complexity : O(n)<br>
     * If the array is sorted, use {@link Arrays.binarySearch|binarySearch} instead.
     *
     * @param {Array<*>} arr - the array.
     * @param {*} value - the value to look for, tested by strict equality ===
     * @param {String} [propertyName] - if given, element[propertyName] is compared. If not, element is compared.
     * @returns {Number} The index in the array of the found element. Otherwise -1.
     */
    static search(arr, value, propertyName) {
        for (let i = 0; i < arr.length; i++) {
            const val = propertyName
                ? arr[i][propertyName]
                : arr[i];
            if (val === value) {
                return i;
            }
        }
        // key was not found
        return -1;
    }

    /**
     * Shuffles an array with the {@link http://en.wikipedia.org/wiki/Fisher–Yates_shuffle|Fisher-Yates} algorithm.<br>
     * The array is shuffled in-place and not copied.
     *
     * @param {Array} arr - the aray to shuffle.
     * @returns {Array}
     */
    static shuffle(arr) {
        const length = arr.length;
        let buffer;
        for (let i = 0; i < length; i++) {
            const j = Math.floor((Math.random() * (length - i)) + i);
            buffer = arr[i];
            arr[i] = arr[j];
            arr[j] = buffer;
        }
        return arr;
    }

    /**
     * Fast search of a value in an array of values, or a property value in an array of objects.<br>
     * The objects in the array must be sorted in ascending order of this property.<br>
     * @see {@link http://en.wikipedia.org/wiki/Binary_search_algorithm}<br>
     * This algorithm is a lot faster than naïve search, but needs the array to be sorted in the first place.<br>
     * Algorithmic complexity : O(log n)<br>
     *
     * @param {Array} arr - The array to search.
     * @param {*} value - the value to look for, tested by strict equality ===
     * @param {String} [propertyName] - if given, element[propertyName] is compared. If not, element is compared.
     * @param {Object} [options]
     * @param {String} [options.strategy=match] - If given, define the strategy to adopt to the final index.
     *      If options.strategy equals 'match', it returns a positive index in the array of the found element. Otherwise -1-insertionPoint
     *      where insertionPoint is the index where the element would be inserted.
     *      If options.strategy equals 'floor', it returns the greater index smaller than value in the array. If the value is smaller than
     *      the first element value, it returns -1.
     *      If options.strategy equals 'round', it returns the nearest index of the value in the array.
     *      If options.strategy equals 'ceil', it returns the smallest index greater than value in the array. If the value is greater than
     *      the last element value, it returns array.length.
     * @param {Boolean} [options.forceArrayRange=false] - If true, it makes sure the returned index is in array range.
     *      Used when strategy is 'floor' or 'ceil'.
     *      If the returned index was -1 it will return 0 and if it was arr.length, it will return arr.length-1.
     * @returns {Number} - An index (positive or negative). See options for more details.
     */
    static binarySearch(arr, value, propertyName, options) {
    /* jshint bitwise: false */
        let imin = 0;
        let imax = arr.length - 1;

        if (typeof propertyName === 'object') {
            options = propertyName;
            propertyName = null;
        }

        // continue searching while [imin,imax] is not empty
        while (imin <= imax) {
            // calculate the midpoint for roughly equal partition
            const imid = (imin + imax) >>> 1;
            const val = propertyName
                ? arr[imid][propertyName]
                : arr[imid];
            if (val === value) {
                // key found at index imid
                return imid;
            } if (val < value) {
                // determine which subarray to search
                // change min index to search upper subarray
                imin = imid + 1;
            } else {
                // change max index to search lower subarray
                imax = imid - 1;
            }
        }

        // key was not found, so check strategy
        return Arrays.__applySearchOptions(imin, options, arr, value, propertyName);
    }

    /**
     * Fast search of a value in an array of values, or a property value in an array of objects.<br>
     * The objects in the array must be sorted in ascending order of this property.<br>
     * @see {@link http://en.wikipedia.org/wiki/Interpolation_search}<br>
     * This algorithm is a lot faster than naïve search, but needs the array to be sorted in the first place.<br>
     * It is best used if the values in the array are uniformly distributed.<br>
     * Average algorithmic complexity : O(log log n)<br>
     *
     * @param {Array} arr - The array to search.
     * @param {*} value - the value to look for, tested by strict equality ===
     * @param {String} [propertyName] - if given, element[propertyName] is compared. If not, element is compared.
     * @param {Object} [options]
     * @param {Object} [options.strategy=match] - If given, define the strategy to adopt to the final index.
     *      If options.strategy equals 'match', it returns a positive index in the array of the found element. Otherwise -1-insertionPoint
     *      where insertionPoint is the index where the element would be inserted.
     *      If options.strategy equals 'floor', it returns the greater index smaller than value in the array. If the value is smaller than
     *      the first element value, it returns -1.
     *      If options.strategy equals 'round', it returns the nearest index of the value in the array.
     *      If options.strategy equals 'ceil', it returns the smallest index greater than value in the array. If the value is greater than
     *      the last element value, it returns array.length.
     * @param {Object} [options.forceArrayRange=false] - If true, it makes sure the returned index is in array range.
     *      Used when strategy is 'floor' or 'ceil'.
     *      If the returned index was -1 it will return 0 and if it was arr.length, it will return arr.length-1.
     * @returns {Number} - An index (positive or negative). See options for more details.
     */
    static interpolationSearch(arr, value, propertyName, options) {
        let low = 0;
        let high = arr.length - 1;
        let i;
        let lowValue = arr[low];
        let highValue = arr[high];

        if (typeof propertyName === 'object') {
            options = propertyName;
            propertyName = null;
        }

        while (low <= high) {
            // Interpolation : guess where the value would be if the array was uniformly distributed.
            i = (low + (((value - lowValue) * (high - low)) / (highValue - lowValue)) + 0.5) | 0;
            if (i < low) {
                i = low;
            }
            if (i > high) {
                i = high;
            }
            const val = propertyName
                ? arr[i][propertyName]
                : arr[i];

            if (val < value) {
                low = i + 1;
                lowValue = arr[low]; // may be out of range.
            } else if (val > value) {
                high = i - 1;
                highValue = arr[high]; // may be out of range
            } else {
                return i;
            }
        }

        // Not found.
        // Here low = high+1, and the value would be inserted between the two.
        // So check strategy
        return Arrays.__applySearchOptions(low, options, arr, value, propertyName);
    }

    /**
     * Apply the strategy options of binarySearch and interpolationSearch.
     * @param options
     * @param insertionIndex
     * @param arr
     * @param value
     * @param propertyName
     * @returns {*}
     * @private
     */
    static __applySearchOptions(insertionIndex, options, arr, value, propertyName) {
        options = options || {};
        options.strategy = options.strategy || 'match';
        options.forceArrayRange = !!options.forceArrayRange;

        // 'match' strategy
        if (options.strategy === 'match') {
            return -insertionIndex - 1;
        } if (options.strategy === 'floor') {
            // 'floor' strategy
            if (options.forceArrayRange && insertionIndex === 0) {
                return 0;
            }
            return insertionIndex - 1;
        } if (options.strategy === 'round') {
            // 'round' strategy
            // If the property is not a number, we can't use the round strategy
            if (typeof value !== 'number') {
                throw new TypeError("You can't use strategy 'round' with a non-numerical value.");
            }
            // If insertion index is 0, the value is smaller than the first element so returns 0
            if (insertionIndex === 0) {
                return 0;
            } if (insertionIndex === arr.length) {
                // Else if insertion index is arr.length, the value is greater than the first element so returns arr.length - 1
                return arr.length - 1;
            }
            // Else it is between two valid index, so round it

            const lowVal = propertyName ? arr[insertionIndex - 1][propertyName] : arr[insertionIndex - 1];
            const topVal = propertyName ? arr[insertionIndex][propertyName] : arr[insertionIndex];

            return value - lowVal < topVal - value ? insertionIndex - 1 : insertionIndex;
        } if (options.strategy === 'ceil') {
            // 'ceil' strategy
            if (options.forceArrayRange && insertionIndex === arr.length) {
                return arr.length - 1;
            }
            return insertionIndex;
        }

        // unknown strategy
        throw new RangeError(`strategy is not valid! It must be 'match' or 'floor' or 'round' or 'ceil'. '${options.strategy}' given.`);
    }
}

export default Arrays;
