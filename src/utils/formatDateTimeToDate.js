/**
 * Kept for backwards compatibility: this file used to hold its own copy of
 * formatDatetimeToDate (built on moment.utc, which shifted evening Indiana
 * timestamps to the next day). The single implementation now lives in
 * ./dateUtils so the two cannot drift apart again.
 *
 * @example
 * const formattedDate = formatDatetimeToDate("2023-10-09T18:30:00.000-05:00");
 * console.log(formattedDate); // Output: "2023-10-09"
 *
 * @example
 * const formattedDate = formatDatetimeToDate("2023-10-09T18:30:00.000-05:00", "MM/DD/YY");
 * console.log(formattedDate); // Output: "10/09/23"
 */
import { formatDatetimeToDate } from "./dateUtils";

export default formatDatetimeToDate;
