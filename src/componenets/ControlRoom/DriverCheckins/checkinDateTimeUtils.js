import moment from "moment";
import { parseInstant } from "../../../utils/dateUtils";

/*
 * Checkin date/time rules (Driver Checkin UAT enhancement):
 *  - defaults to the current date and time, can be back dated
 *  - cannot be in the future
 *  - cannot be earlier than the latest checkin (entryDate) of the dispatch;
 *    the same date and time (to the minute) is allowed
 * Not used on the EPU/ETA entry screens.
 *
 * The checkin date/time is the user's wall-clock and is saved as entered: users are always in
 * Indiana, the application time zone, so no UTC conversion is done. For the validation, entryDate
 * is read with parseInstant (offset respected) and compared with the current instant.
 */

export const CHECKIN_DATE_FORMAT = "YYYY-MM-DD";
export const CHECKIN_TIME_FORMAT = "HH:mm";
const TIME_24H = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Current date and time as { date: "YYYY-MM-DD", time: "HH:mm" } */
export const getCurrentCheckinDateTime = () => {
  const now = moment();
  return { date: now.format(CHECKIN_DATE_FORMAT), time: now.format(CHECKIN_TIME_FORMAT) };
};

/** Latest entryDate from the getAllRecordByDispatchFK response, or null when there are no records */
export const getLatestEntryDate = (records) => {
  let latest = null;
  (records || []).forEach((record) => {
    const entry = parseInstant(record?.entryDate);
    if (entry.isValid() && (!latest || entry.isAfter(parseInstant(latest)))) {
      latest = record.entryDate;
    }
  });
  return latest;
};

/**
 * Earliest allowed checkin as a local moment (latest entryDate truncated to the minute), or null.
 *
 * A latest checkin that lies in the future (bad data: entered as wall-clock from another time
 * zone, or a wrong server clock) would make the allowed window [last checkin .. now] empty and
 * leave the field red with no value the user can pick (bug 4177). In that case there is no
 * lower bound - the "not in the future" rule still applies.
 */
export const getMinCheckinMoment = (lastCheckinEntryDate) => {
  const min = parseInstant(lastCheckinEntryDate);
  if (!min.isValid()) return null;
  if (min.isAfter(moment())) {
    console.warn("[DriverCheckin] last checkin is in the future, ignoring as minimum:", lastCheckinEntryDate);
    return null;
  }
  return min.startOf("minute");
};

export const combineCheckinDateTime = (date, time) =>
  moment(`${date} ${time}`, `${CHECKIN_DATE_FORMAT} ${CHECKIN_TIME_FORMAT}`, true);

/** Returns an error message, or "" when the checkin date and time are valid */
export const validateCheckinDateTime = (date, time, lastCheckinEntryDate) => {
  if (!date || !time) {
    return "Please enter the Checkin date and time";
  }
  if (!TIME_24H.test(time)) {
    return "Checkin time must be in 24 hour format (HH:mm)";
  }
  const selected = combineCheckinDateTime(date, time);
  if (!selected.isValid()) {
    return "Please enter a valid Checkin date and time";
  }
  if (selected.isAfter(moment())) {
    return "Checkin date and time cannot be in the future";
  }
  const min = getMinCheckinMoment(lastCheckinEntryDate);
  if (min && selected.isBefore(min)) {
    return `Checkin date and time cannot be earlier than the last checkin (${min.format("MM/DD/YY HH:mm")})`;
  }
  return "";
};
