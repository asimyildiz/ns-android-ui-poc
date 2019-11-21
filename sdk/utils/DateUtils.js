/*
 * Copyright (c) 2014-2015 Wiztivi - contact@wiztivi.com
 * All Rights Reserved
 *
 * All information contained herein is proprietary and confidential.
 * Dissemination of this information or reproduction of this file or material, via any medium is strictly forbidden unless
 * prior written permission is obtained from Wiztivi.
 * No warranty, explicit or implicit, provided.
 * This software MAY NOT be used, modified or rewritten without prior written permission from Wiztivi.
 *
 */

/**
 * @fileoverview Date manager for broadcast manager
 */
const dateFormat = (function () {
    const token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g;
    const timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
    const timezoneClip = /[^-+\dA-Z]/g;
    const pad = function pad(val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) {
            val = `0${val}`;
        }
        return val;
    };

    // Regexes and supporting functions are cached through closure
    return function (date, translation, mask, utc) {
        const dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length === 1 && Object.prototype.toString.call(date) === '[object String]' && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date();
        if (isNaN(date)) {
            throw SyntaxError('invalid date');
        }

        mask = String(dF.masks[mask] || mask || dF.masks.default);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) === 'UTC:') {
            mask = mask.slice(4);
            utc = true;
        }

        const _ = utc ? 'getUTC' : 'get';
        const d = date[`${_}Date`]();
        const D = date[`${_}Day`]();
        const m = date[`${_}Month`]();
        const y = date[`${_}FullYear`]();
        const H = date[`${_}Hours`]();
        const M = date[`${_}Minutes`]();
        const s = date[`${_}Seconds`]();
        const L = date[`${_}Milliseconds`]();
        const o = utc ? 0 : date.getTimezoneOffset();
        const flags = {
            d,
            dd: pad(d),
            ddd: translation(dF.i18n.dayNames[D]),
            dddd: translation(dF.i18n.dayNames[D + 7]),
            m: m + 1,
            mm: pad(m + 1),
            mmm: translation(dF.i18n.monthNames[m]),
            mmmm: translation(dF.i18n.monthNames[m + 12]),
            yy: String(y).slice(2),
            yyyy: y,
            h: H % 12 || 12,
            hh: pad(H % 12 || 12),
            H,
            HH: pad(H),
            M,
            MM: pad(M),
            s,
            ss: pad(s),
            l: pad(L, 3),
            L: pad(L > 99 ? Math.round(L / 10) : L),
            t: H < 12 ? 'a' : 'p',
            tt: H < 12 ? 'am' : 'pm',
            T: H < 12 ? 'A' : 'P',
            TT: H < 12 ? 'AM' : 'PM',
            Z: utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
            o: (o > 0 ? '-' : '+') + pad((Math.floor(Math.abs(o) / 60) * 100) + (Math.abs(o) % 60), 4),
            S: ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : ((d % 100) - (d % 10) !== 10) * (d % 10)]
        };

        return mask.replace(token, $0 => ($0 in flags ? flags[$0] : $0.slice(1, $0.length - 1)));
    };
}());


dateFormat.masks = {
    default: 'ddd mmm dd yyyy HH:MM:ss',
    shortDate: 'm/d/yy',
    mediumDate: 'mmm d, yyyy',
    longDate: 'mmmm d, yyyy',
    fullDate: 'dddd, mmmm d, yyyy',
    shortTime: 'h:MM TT',
    mediumTime: 'h:MM:ss TT',
    longTime: 'h:MM:ss TT Z',
    isoDate: 'yyyy-mm-dd',
    isoTime: 'HH:MM:ss',
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

dateFormat.i18n = {
    dayNames: [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    monthNames: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ]
};

/**
 * This class represents DateUtils. This is a polyfill of Date with serevals tools to convert, transform,
 *
 * @name Date
 * @class
 */

/**
 * value for one second in millisecond.
 * @type {number}
 * @const
 */
Date.ONE_SECOND = 1000;
/**
 * value for one minute in millisecond.
 * @type {number}
 * @const
 */
Date.ONE_MINUTE = 60 * Date.ONE_SECOND;
/**
 * value for one hour in millisecond.
 * @type {number}
 * @const
 */
Date.ONE_HOUR = 60 * Date.ONE_MINUTE;
/**
 * value for one day in millisecond.
 * @type {number}
 * @const
 */
Date.ONE_DAY = 24 * Date.ONE_HOUR;


/**
 * Return a String representation of the current date.
 * @param {Object} translation object
 * @param {String} mask The expected pattern.
 * @param {Boolean} utc <i>Optional.</i> If <code>true</code>, the String will represent the current date in UTC time zone.
 * @returns {String} The string representation of the current date corresponding with the given <code>mask</code>.
 */
Date.prototype.format = function format(translation, mask, utc) {
    return dateFormat(this, translation, mask, utc);
};

/**
 * Compare the current date against another date.
 * @param b  {Date} the other date
 * @returns   -1 : if this < b
 *             0 : if this === b
 *             1 : if this > b
 *            NaN : if a or b is an illegal date
 */
Date.prototype.compare = function compare(b) {
    if (b.constructor !== Date) {
        throw 'invalid_date';
    }
    return (isFinite(this.valueOf()) && isFinite(b.valueOf()) ? (this > b) - (this < b) : NaN);
};

/**
 * Compare the current date against another date.
 * @param {Date} anotherDate Date to compare
 * @returns {boolean} true if anotherDate is younger than date
 * */
Date.prototype.isBefore = function isBefore(anotherDate) {
    return this.compare(anotherDate) === -1;
};

/**
 * Compare the current date against another date.
 * @param {Date} anotherDate Date to compare
 * @returns {boolean} true if anotherDate is older than date
 * */
Date.prototype.isAfter = function isAfter(anotherDate) {
    return this.compare(anotherDate) === 1;
};

/**
 * Gap between two date
 * @param {Date} anotherDate Date to compare
 * @returns {object} {sec: {number},min: {number},hour: {number},day: {number} }
 * */
Date.prototype.diff = function diff(anotherDate) {
    const dateDiff = {};
    let tmp = this - anotherDate;

    tmp = Math.floor(tmp / 1000);
    dateDiff.sec = tmp % 60;

    tmp = Math.floor((tmp - dateDiff.sec) / 60);
    dateDiff.min = tmp % 60;

    tmp = Math.floor((tmp - dateDiff.min) / 60);
    dateDiff.hour = tmp % 24;

    tmp = Math.floor((tmp - dateDiff.hour) / 24);
    dateDiff.day = tmp;

    return dateDiff;
};


/**
 * Clone the Date
 * @returns {Date} Cloned date
 * */
Date.prototype.clone = function clone() {
    return new Date(this.getTime());
};

/**
 * Addition with an duration in day
 * @param {number} days in day
 * @returns {Date} this
 * */
Date.prototype.addDays = function addDays(days) {
    this.setDate(this.getDate() + days);
    return this;
};

/**
 * Subtraction with an duration in day
 * @param {number} days in day
 * @returns {Date} this
 * */
Date.prototype.removeDays = function removeDays(days) {
    return this.addDays(-days);
};
/**
 * Addition with an duration in hour
 * @param {number} hours in hour
 * @returns {Date} this
 * */
Date.prototype.addHours = function addHours(hours) {
    this.setUTCHours(this.getUTCHours() + hours);
    return this;
};
/**
 * Subtraction with an duration in hour
 * @param {number} hours in hour
 * @returns {Date} this
 * */
Date.prototype.removeHours = function removeHours(hours) {
    return this.addHours(-hours);
};

/**
 * Addition with an duration in minute
 * @param {number} minutes in minute
 * @returns {Date} this
 * */
Date.prototype.addMinutes = function addMinutes(minutes) {
    this.setUTCMinutes(this.getUTCMinutes() + minutes);
    return this;
};
/**
 * Subtraction with an duration in minute
 * @param {number} minutes in minute
 * @returns {Date} this
 * */
Date.prototype.removeMinutes = function removeMinutes(minutes) {
    return this.addMinutes(-minutes);
};
/**
 * To round at the nearest half hour
 * @returns {number} time
 * */
Date.prototype.getDateRound30 = function getDateRound30() {
    if (this.getMinutes() < 30) {
        this.setMinutes(0);
    } else {
        this.setMinutes(30);
    }
    this.setUTCSeconds(0);
    this.setUTCMilliseconds(0);
    return this.getTime();
};
