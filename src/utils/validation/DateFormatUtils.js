import { toMoment } from "../dateUtils";
/**
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
 * ---------------------------------------------------------------
 *
 */
const customFormatDate = (date, format) => {
  // *** Previous implementation Reference ***
  // mm/dd/yy format
  // const options = { month: '2-digit', day: '2-digit', year: '2-digit' };
  // let formattedDate = new Date(date).toLocaleDateString('en-US', options).replace(/(\d{1,2})\/(\d{1,2})\/(\d{2})/, "$1/$2/$3");
  if (!date) {
    return "";
  }
  // Single parser for the whole app (see utils/dateUtils.js): keeps the calendar
  // day the value was written with, never shifted through UTC.
  const momentDate = toMoment(date);

  if (!momentDate.isValid()) {
    return "";
  }

  return momentDate.format(format || "MM/DD/YY");
};

export { customFormatDate };
