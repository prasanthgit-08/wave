import moment from "moment";

/*
 * ---------------------------------------------------------------------------
 * TIME ZONE RULES FOR THIS APPLICATION
 * ---------------------------------------------------------------------------
 * The backend runs entirely in America/Indiana/Indianapolis and sends dates as
 *   "YYYY-MM-DD"                       (date-only columns)
 *   "YYYY-MM-DDTHH:mm:ss.SSS-05:00"    (timestamps, with the Indiana offset)
 *   "MM/DD/YYYY"                       (fields with @JsonFormat)
 *
 * JavaScript parses a date-only ISO string with `new Date("2023-12-06")` as
 * MIDNIGHT UTC, which is 7 PM on 12/05 in Indiana - so the screen shows the
 * previous day. `moment.utc(...)` and `toISOString()` have the same problem in
 * the other direction. Never use those on business dates. Use:
 *
 *   parseLocalDate(value)   string/Date -> Date, interpreted as a LOCAL calendar date
 *   formatForApi(value)     Date/string -> "YYYY-MM-DD" to send to the backend
 *   formatDate / formatDatetimeToDate / customFormatDate for display
 *
 * Output formats are unchanged ("MM/DD/YY", "MM/DD/YYYY", "YYYY-MM-DD", ...).
 * ---------------------------------------------------------------------------
 */

const DATE_ONLY_ISO = /^\d{4}-\d{2}-\d{2}$/;
const DATE_ONLY_US = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
const US_FORMATS = ["MM/DD/YYYY", "M/D/YYYY", "MM/DD/YY", "M/D/YY"];

/**
 * Converts any backend/UI date value into a moment that represents the calendar
 * date (and wall-clock time) it was written with - never shifted through UTC.
 *
 *  - Date / number / moment  -> as-is (local)
 *  - "YYYY-MM-DD"            -> local midnight of that day
 *  - "MM/DD/YYYY", "MM/DD/YY"-> local midnight of that day
 *  - ISO timestamp           -> keeps the offset the backend sent (parseZone),
 *                               so 2023-12-06T22:00-05:00 is still 12/06
 *  - anything else           -> moment(value) (local), possibly invalid
 *
 * @param {string|Date|number|moment.Moment|null|undefined} value
 * @returns {moment.Moment} a moment, invalid when the input cannot be parsed
 */
const toMoment = (value) => {
  if (value === null || value === undefined || value === "") {
    return moment.invalid();
  }
  if (moment.isMoment(value)) {
    return value.clone();
  }
  if (value instanceof Date || typeof value === "number") {
    return moment(value);
  }
  const str = String(value).trim();
  if (DATE_ONLY_ISO.test(str)) {
    return moment(str, "YYYY-MM-DD", true);
  }
  if (DATE_ONLY_US.test(str)) {
    const strict = moment(str, US_FORMATS, true);
    return strict.isValid() ? strict : moment(str, US_FORMATS);
  }
  if (str.includes("T") || /[+-]\d{2}:?\d{2}$/.test(str) || /Z$/.test(str)) {
    // "...Z" / "...+00:00" is a true instant (what toISOString() produces for
    // "now"): show it in local time.
    if (/(Z|[+-]00:?00)$/.test(str)) {
      return moment(str);
    }
    // Otherwise keep the wall-clock the backend sent ("...-05:00", or no offset),
    // independent of the browser's zone.
    const zoned = moment.parseZone(str);
    if (!zoned.isValid()) return zoned;
    return moment([
      zoned.year(),
      zoned.month(),
      zoned.date(),
      zoned.hour(),
      zoned.minute(),
      zoned.second(),
      zoned.millisecond(),
    ]);
  }
  // Anything else ("December 6, 2023", "Dec 6 2023 10:00", ...): same JS parsing
  // the old `new Date(str)` used, without moment's deprecation warning.
  return moment(new Date(str));
};

/**
 * Drop-in replacement for `new Date(value)` on business dates.
 *
 * Interprets the value as a LOCAL calendar date, so "2023-12-06" becomes
 * 12/06/2023 00:00 local (not 7 PM on 12/05). Returns an Invalid Date (same as
 * `new Date("garbage")`) when the input is empty or unparseable, so existing
 * `isNaN(date.getTime())` checks keep working.
 *
 * @param {string|Date|number|moment.Moment|null|undefined} value
 * @returns {Date}
 */
const parseLocalDate = (value) => {
  const m = toMoment(value);
  return m.isValid() ? m.toDate() : null;
};

/**
 * Drop-in replacement for `date.toISOString().slice(0, 10)` /
 * `.split("T")[0]` / `.substring(0, 10)` when sending a date to the backend.
 *
 * Formats the LOCAL calendar date as "YYYY-MM-DD" without converting to UTC,
 * so an evening date is not pushed to the next day.
 *
 * @param {string|Date|number|moment.Moment|null|undefined} value
 * @returns {string} "YYYY-MM-DD", or "" when the input is empty/invalid
 */
const formatForApi = (value) => {
  const m = toMoment(value);
  return m.isValid() ? m.format("YYYY-MM-DD") : "";
};

/**
 * Formats a given date into a specified format using Moment.js.
 *
 * @param {string|Date} date - The date to be formatted. Can be a date string or a Date object.
 * @param {string} format - (Optional) The format string to format the date. Defaults to 'MM/DD/YY'.
 *
 * @returns {string} - The formatted date string.
 *
 * @example
 * const formattedDate = formatDate(new Date(), 'MMMM Do YYYY, h:mm:ss a');
 * console.log(formattedDate); // Output: April 20th 2023, 10:50:57 am
 *
 * Moment Format Options Examples
 * ---------------------------------------------------------------
 *          format           <==>        Date Output
 * -------------------------     ---------------------------------  
 *       'MM/DD/YY'           <==>         04/20/23
 *      'MM/DD/YYYY'         <==>        04/20/2023
 *     "MMM DD YYYY"         <==>        Apr 20 2023
 *     "MMM DD YY"           <==>        Apr 20 23
 *        'dddd'             <==>        Thursday
 * 'MMMM Do YYYY, h:mm:ss a' <==>    April 20th 2023, 10:50:57 am
 */
const formatDate = (date, format) => {
  if (!date) {
    return "";
  }
  // Was moment.utc(date): that showed the UTC day, which is the NEXT day for
  // any Indiana timestamp after 7 PM. toMoment keeps the backend's own day.
  let formattedDate = toMoment(date).format(format || "MM/DD/YY");
  return formattedDate;
};

/**
 * Formats a datetime string into a date string in 'YYYY-MM-DD' format or 'MM/DD/YY' format.
 *
 * @param {string} inputStr - The datetime string to be formatted.
 * @param {string} format - (Optional) The desired format for the date. Defaults to 'YYYY-MM-DD'.
 *
 * @returns {string} - The formatted date string.
 *
 * @example
 * const formattedDate = formatDatetimeToDate("2023-10-09T18:30:00.000+00:00");
 * console.log(formattedDate); // Output: "2023-10-09"
 *
 * @example
 * const formattedDate = formatDatetimeToDate("2023-10-09T18:30:00.000+00:00", "MM/DD/YY");
 * console.log(formattedDate); // Output: "10/09/23"
 */
const formatDatetimeToDate = (inputStr, format = "YYYY-MM-DD", localTimezone) => {
  if (!inputStr) {
    return "";
  }
  // Both branches now keep the calendar day the value was written with.
  // (Previously the default branch used moment.utc, which shifted evening
  // Indiana timestamps to the next day.) `localTimezone` is kept so existing
  // callers compile unchanged.
  return toMoment(inputStr).format(format);
};

/**
 * Converts a date in "MM/DD" format to "YYYY-MM-DD" format using the current year.
 *
 * @param {string} monthDay - The date string in "MM/DD" format.
 *
 * @returns {string} - The formatted date string in "YYYY-MM-DD" format.
 *
 * @example
 * const formattedDate = formatMonthDayToISODate('09/14');
 * console.log(formattedDate); // Output: '2023-09-14' (assuming the current year is 2023)
 */
const formatMonthDayToISODate = (monthDay) => {
  const [month, day] = monthDay?.split("/");
  const year = new Date().getFullYear();

  const formattedDate = `${year}-${month?.padStart(2, "0")}-${day?.padStart(2, "0")}`;

  if (!monthDay || monthDay?.trim().length === 0) return "";

  return formattedDate;
};

/**
 * Normalizes a given date by resetting the time to 00:00:00.
 * This ensures the date is treated as midnight on the same calendar day,
 * useful for date-only comparisons.
 *
 * @param {string|Date|null} date - The date to be normalized. Can be a Date object or a parsable date string.
 * @returns {Date|null} - A Date object with the time set to 00:00:00, or null if the input is invalid.
 *
 * @example
 * // Normalize a date string
 * const result = normalizeDate('2024-09-21T12:34:56Z');
 * console.log(result); // Outputs: Sat Sep 21 2024 00:00:00 GMT+0000 (UTC)
 *
 * @example
 * // Normalize a Date object
 * const result = normalizeDate(new Date());
 * console.log(result); // Outputs: Today's date at 00:00:00
 */
const normalizeDate = (date) => {
  if (!date) return null;
  const normalized = parseLocalDate(date); // local calendar date, never UTC-shifted
  normalized.setHours(0, 0, 0, 0); // Reset time to 00:00:00
  return normalized;
};

/**
 * Formats a datetime string to 'MM/DD/YY, hh:mm:ss A' format.
 *
 * @param {string|Date} dateTime - The datetime input.
 * @returns {string} - Formatted datetime string with date as MM/DD/YY and time preserved.
 */
const formatDateWithTime = (dateTime, format = "MM/DD/YY, hh:mm:ss A") => {
  if (!dateTime) return "";
  return toMoment(dateTime).format(format);
};

/**
 * Parses a backend timestamp as the actual instant it represents (its offset is respected),
 * expressed in the browser's local zone.
 *
 * Use this - not toMoment / parseLocalDate / formatDateWithTime, which keep the backend's
 * wall-clock and drop the offset - when a timestamp is compared with "now" (new Date() /
 * moment()), so the comparison gives the same result in every time zone.
 *
 * @example
 * // browser in IST (+05:30)
 * parseInstant("2026-10-23T07:20:00.000-04:00").format("MM/DD/YY HH:mm"); // "10/23/26 16:50"
 *
 * @param {string|Date|number|moment.Moment|null|undefined} value
 * @returns {moment.Moment} a moment, invalid when the input cannot be parsed
 */
const parseInstant = (value) => {
  if (value === null || value === undefined || value === "") {
    return moment.invalid();
  }
  return moment.isMoment(value) ? value.clone().local() : moment(value);
};

export {
  toMoment,
  parseInstant,
  parseLocalDate,
  formatForApi,
  formatDate,
  formatDatetimeToDate,
  formatMonthDayToISODate,
  normalizeDate,
  formatDateWithTime,
};
