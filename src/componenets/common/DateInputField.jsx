/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { customFormatDate } from "../../utils/validation/DateFormatUtils";
import { formatDatetimeToDate, parseLocalDate, formatForApi } from "../../utils/dateUtils";

const DateInputField = ({
  /**
   * -------------------------------------------
   * date={new Date()}
   * Pass min and max values using the new Date() constructor
   * min={new Date('January 1, 2000 00:00:00')}
   * max={new Date('December 31, 2099 00:00:00')}
   * ---------------------------------------------------------------
   * The default format is mm/dd/yy
   * The following are examples for format in DateInputField
   * ---------------------------------------------------------------
   *          format           <==>        Date Output
   * -------------------------     ---------------------------------
   *       'MM/DD/YY'          <==>         04/20/23
   *      'MM/DD/YYYY'         <==>        04/20/2023
   *     "MMM DD YYYY"         <==>        Apr 20 2023
   *     "MMM DD YY"           <==>        Apr 20 23
   *        "MM/DD"            <==>          04/20
   *        'dddd'             <==>        Thursday
   * 'MMMM Do YYYY, h:mm:ss a' <==>    April 20th 2023, 10:50:57 am
   * ---------------------------------------------------------------
   * Default placeholder => mm/dd/yy
   * Pass custom placeholder using the placeholder property
   */
  // ---------------------------------------------------------------
  // Pass either local/redux state as date
  date = new Date(),
  // SetState function for updating local/redux date state (check usage example)
  setDate,
  // min value for date
  min, //=parseLocalDate("2000-01-01"), // local midnight; new Date("YYYY-MM-DD") would be UTC
  // max value for date
  max,
  // SetState function for date validation
  setIsDateValid,
  // pass the required date format
  format = "MM/DD/YY",
  // Custom function for updating payload date with changes in date input
  updatePayloadDate,
  // SetState function for updating payload date with changes in date input
  setPayloadDate,
  // Specal Case for updating payload date as => MM/YY
  formatPayloadWithoutYear = false,
  // -------------------------------
  dateInput,
  setDateInput,
  disabled = false,
  name,
  id,
  className,
  placeholder,
  handleCalendarOnChange,
  onChange,
  onBlur,
  handleOnBlur,
  inputOnBlur,
  clearDateTrigger,
  customHandleDateInputChange,
  hidden = false,
  maxLength,
  smallInput = false, // for smaller date input fields
  // MM/DD format only: a typed month/day already past this year means its next occurrence,
  // so it is selected in next year instead of the current one
  rollPastMonthDayToNextYear = false,
  isDateValid,
  reduxSetDate, // deprecated, use setDate instead
}) => {
  // -----------------------------
  const dateInputRef = useRef();
  const [formattedDateInput, setFormattedDateInput] = useState(dateInput || "");
  /* text in the input. A parent passing setDateInput owns it, so an emptied dateInput must stay
     empty - falling back to the internal copy (filled on focus) brought a deleted date back */
  const shownDateInput = setDateInput ? (dateInput ?? "") : formattedDateInput;

  const mmdd2yRegex = /^\d{2}\/\d{2}\/\d{2}$/;
  const mmdd4yRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  const mmddRegex = /^\d{2}\/\d{2}$/;

  const returnMinDate = () => {
    if (min) {
      const date = parseLocalDate(min);

      if (isNaN(date.getTime())) {
        console.error("Invalid min date:", min);
        return undefined;
      }
      return formatForApi(date); // local YYYY-MM-DD, not UTC-shifted
    }
  };

  const returnMaxDate = () => {
    if (max) {
      const date = parseLocalDate(max);

      if (isNaN(date.getTime())) {
        console.error("Invalid max date:", max);
        return undefined;
      }
      return formatForApi(date); // local YYYY-MM-DD, not UTC-shifted
    }
  };

  /**
   * Invalid typed text never becomes a date, so the calendar input underneath stays "" - and the
   * calendar's Clear on "" changes nothing, so the browser fires no event and the text could not be
   * cleared. While such text is shown, the calendar holds this placeholder instead, making Clear a real
   * change. It is one day outside the calendar's own min / max when that is near today, so it cannot
   * be picked (picking it would again be "no change"); otherwise today. It never reaches date / payload.
   */
  const showsClearablePlaceholder = !date && !!shownDateInput;
  const getClearablePlaceholder = () => {
    const toLocalDay = (isoDay) => {
      const [year, month, day] = isoDay.split("-").map(Number);
      return new Date(year, month - 1, day);
    };
    const toIsoDay = (d) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // built from the same strings as the min / max attributes, so it is outside what the calendar allows
    const candidates = [];
    const maxDay = returnMaxDate();
    const minDay = returnMinDate();
    if (maxDay) {
      const next = toLocalDay(maxDay);
      next.setDate(next.getDate() + 1);
      candidates.push(next);
    }
    if (minDay) {
      const previous = toLocalDay(minDay);
      previous.setDate(previous.getDate() - 1);
      candidates.push(previous);
    }
    // only one near today - otherwise the calendar would open years away
    const ONE_YEAR = 366 * 24 * 60 * 60 * 1000;
    const nearest = candidates
      .filter((d) => Math.abs(d - today) <= ONE_YEAR)
      .sort((a, b) => Math.abs(a - today) - Math.abs(b - today))[0];
    return toIsoDay(nearest || today);
  };

  const returnInputMaxLength = () => {
    if (format?.toLowerCase() === "mm/dd/yy") return 8;
    if (format?.toLowerCase() === "mm/dd/yyyy") return 10;
    if (format?.toLowerCase() === "mm/dd") return 5;
    return 8;
  };

  const isValidDate = (dateString) => {
    if (
      format?.toLowerCase() === "mm/dd/yy" ||
      format?.toLowerCase() === "mm/dd/yyyy" ||
      format?.toLowerCase() === "mm/dd"
    ) {
      const [month, day, year] = dateString?.toString()?.split("/");
      const date = new Date(`${month}/${day}/${year}`);
      return !isNaN(date.getTime());
    }
    // TODO: add future cases as required
  };

  const convertToCurrentCenturyYear = (twoDigitYear) => {
    const currentYear = new Date().getFullYear().toString();
    const currentCentury = parseInt(currentYear.slice(0, 2)) * 100;
    return currentCentury + parseInt(twoDigitYear);
  };

  const checkLeapYear = (year) => year % 4 === 0;

  // year to attach to a typed MM/DD - the current one, or the next when the day has passed (opt-in)
  const getYearForMonthDay = (monthDay) => {
    const currentYear = new Date().getFullYear();
    if (!rollPastMonthDayToNextYear) return currentYear;
    const [month, day] = monthDay.split("/").map(Number);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(currentYear, month - 1, day) < today ? currentYear + 1 : currentYear;
  };

  const setValidDateValue = (value) => {
    setDate && setDate(formatDatetimeToDate(parseLocalDate(value), undefined, true));
    reduxSetDate && reduxSetDate(formatDatetimeToDate(parseLocalDate(value), undefined, true));
  };

  const handleDateInputChange = (value) => {
    const monthsWith30Days = ["04", "06", "09", "11"];
    const monthsWith31Days = ["01", "03", "05", "07", "08", "10", "12"];
    const month = value.slice(0, 2);
    const day = value.slice(3, 5);
    const year = value.slice(6);

    if (format?.toLowerCase().startsWith("mm/dd")) {
      // Autoformatting to provided format
      if (value?.length === 3 && value.indexOf("/") === -1) {
        value = month + "/" + value.slice(2);
      } else if (value?.length === 6 && value.lastIndexOf("/") !== 5 && value.split("/")?.length !== 3) {
        value = value.slice(0, 5) + "/" + value.slice(5);
      }

      // Autocorrecting to valid month
      if (value?.length >= 2) {
        if (parseInt(month) > 12) value = "12" + value.slice(2);
        if (month === "00") value = "01" + value.slice(2);
      }
      // Autocorrecting to valid day based on month
      if (value?.length >= 5) {
        if (monthsWith30Days.includes(month) && parseInt(day) > 30) {
          value = month + "/30" + value.slice(5);
        }
        if (monthsWith31Days.includes(month) && parseInt(day) > 31) {
          value = month + "/31" + value.slice(5);
        }
        if (month === "02" && parseInt(day) > 29) {
          value = month + "/29" + value.slice(5);
        }
        if (day === "00") {
          value = month + "/01" + value.slice(5);
        }
      }
      // Autocorrecting Leap Year
      if (
        month === "02" &&
        ((format?.toLowerCase() === "mm/dd/yy" && value?.length === 8) ||
          (format?.toLowerCase() === "mm/dd/yyyy" && value?.length === 10))
      ) {
        const isLeapYear = checkLeapYear(year);
        if (isLeapYear) {
          if (parseInt(day) > 29) {
            value = month + "/29/" + year;
          }
        } else {
          if (parseInt(day) > 28) {
            value = month + "/28/" + year;
          }
        }
      }
      // Preventing Leap Year for mm/dd
      if (
        month === "02" &&
        format?.toLowerCase() === "mm/dd" &&
        value?.length === 5 &&
        parseInt(value.slice(3)) > 28
      ) {
        value = month + "/28";
      }
    }

    // Setting formatted values for mm/dd/yy & mm/dd/yyyy
    if (
      (format?.toLowerCase() === "mm/dd/yy" && mmdd2yRegex.test(value)) ||
      (format?.toLowerCase() === "mm/dd/yyyy" && mmdd4yRegex.test(value))
    ) {
      // Marking date as invalid if it is outside the min & max range
      // Compare calendar days only - min/max often carry a time (e.g. new Date()),
      // while the typed value is local midnight, so the same day must stay in range
      const toDay = (d) => parseLocalDate(d).setHours(0, 0, 0, 0);
      const isOutOfRange = (max && toDay(value) > toDay(max)) || (min && toDay(value) < toDay(min));

      if (isOutOfRange) {
        setIsDateValid && setIsDateValid(false);
      } else if (isValidDate(value)) {
        setValidDateValue(value);
        setIsDateValid && setIsDateValid(true);
      }
    }
    if (
      (format?.toLowerCase() === "mm/dd/yy" && (!mmdd2yRegex.test(value) || !isValidDate(value))) ||
      (format?.toLowerCase() === "mm/dd/yyyy" && (!mmdd4yRegex.test(value) || !isValidDate(value)))
    ) {
      setIsDateValid && setIsDateValid(false);
    }

    // Setting formatted values for mm/dd
    if (format?.toLowerCase() === "mm/dd") {
      if (mmddRegex.test(value)) {
        // the year is only for building the date - the typed text stays MM/DD, otherwise the
        // input briefly showed MM/DD/YYYY until the date sync formatted it back
        const fullDateValue = value + "/" + getYearForMonthDay(value).toString();
        if (isValidDate(fullDateValue)) {
          setValidDateValue(fullDateValue);
          setIsDateValid && setIsDateValid(true);
        }
      } else {
        setIsDateValid && setIsDateValid(false);
      }
    }

    if (setDateInput) {
      setDateInput(value);
    } else {
      setFormattedDateInput(value);
    }

    // For clearing date value
    if (value?.length === 0) {
      setDate && setDate("");
      reduxSetDate && reduxSetDate("");
      setIsDateValid && setIsDateValid(true);
    }
  };

  /**
   * Update Payload Date with changes in Calendar Date input
   */
  useEffect(() => {
    if (updatePayloadDate) {
      updatePayloadDate();
    }
    if (setPayloadDate) {
      setPayloadDate(date);
    }
    if (formatPayloadWithoutYear) {
      if (date) {
        const dateObject = parseLocalDate(date); // "YYYY-MM-DD" as a local day, not UTC
        const mm = String(dateObject.getMonth() + 1).padStart(2, "0");
        const dd = String(dateObject.getDate()).padStart(2, "0");
        const formattedDate = `${mm}/${dd}`;
        setPayloadDate && setPayloadDate(formattedDate);
      } else {
        setPayloadDate && setPayloadDate("");
      }
    }
  }, [date]);

  /**
   * Update formatted Date Input with Calendar Date
   */
  useEffect(() => {
    if (setDateInput) {
      setDateInput(date ? customFormatDate(date, format?.toUpperCase()) : "");
    } else {
      setFormattedDateInput(date ? customFormatDate(date, format?.toUpperCase()) : "");
    }
    setIsDateValid && setIsDateValid(true);
  }, [date, disabled]);

  // Preventing Leap Year from calendar for mm/dd
  useEffect(() => {
    if (
      format?.toLowerCase() === "mm/dd" &&
      shownDateInput?.length === 5 &&
      shownDateInput.slice(0, 2) === "02" &&
      parseInt(shownDateInput.slice(3)) > 28
    ) {
      if (setDateInput) {
        setDateInput(shownDateInput.slice(0, 3) + "28");
      } else {
        setFormattedDateInput(shownDateInput.slice(0, 3) + "28");
      }
    }
  }, [dateInput, formattedDateInput]);

  // Clear Date Input and Calendar Date on trigger change
  useEffect(() => {
    // if prop is NOT passed, do nothing
    if (clearDateTrigger === undefined) return;

    // Clear text input
    if (setDateInput) {
      setDateInput("");
    } else {
      setFormattedDateInput("");
    }

    // Clear actual date
    setDate && setDate("");
    reduxSetDate && reduxSetDate("");

    // Reset validation
    setIsDateValid && setIsDateValid(true);

    // Optional payload clear
    setPayloadDate && setPayloadDate("");
  }, [clearDateTrigger]);
  return (
    <div className="DateInputField position-relative">
      {/* Calendar Date Input */}
      <input
        type="date"
        className={`customFormControl w-100 ${className || ""} ${hidden ? "hide-elements" : ""}`}
        id={id || "DateInputField"}
        name={name || "DateInputField"}
        ref={dateInputRef}
        value={date ? formatForApi(date) : showsClearablePlaceholder ? getClearablePlaceholder() : ""}
        min={returnMinDate()}
        max={returnMaxDate()}
        disabled={disabled}
        onFocus={() => {
          const value = date ? customFormatDate(date, format?.toUpperCase()) : "";
          if (value) {
            setFormattedDateInput && setFormattedDateInput(value);
            setDateInput && setDateInput(value);
            setIsDateValid && setIsDateValid(true);
          }
        }}
        onChange={(e) => {
          // Clear pressed while invalid text is shown (the placeholder made it a real change): clear that text
          if (showsClearablePlaceholder && !e.target.value) {
            if (setDateInput) setDateInput("");
            else setFormattedDateInput("");
            setIsDateValid && setIsDateValid(true);
          }
          setDate && setDate(e.target.value);
          reduxSetDate && reduxSetDate(e.target.value);
          handleCalendarOnChange && handleCalendarOnChange(e);
          onChange && onChange(e);
        }}
        onBlur={(e) => {
          // blur callbacks read the value - they must never get the placeholder, only "" as before
          const placeholder = showsClearablePlaceholder ? e.target.value : "";
          if (placeholder) e.target.value = "";
          onBlur && onBlur(e);
          handleOnBlur && handleOnBlur(e.target.value);
          // restored, so Clear still works if the calendar is opened again before the next render
          if (placeholder) e.target.value = placeholder;
        }}
      />
      <div
        className={`formattedDateContainer ${disabled ? "disableElement" : ""} ${smallInput ? "smallInput" : ""}`}
      >
        {/* Formmatted Date Input */}
        <input
          type="text"
          placeholder={placeholder || (format ? format?.toLowerCase() : "mm/dd/yy")}
          style={{
            width: smallInput ? "65px" : format?.toLowerCase() === "mm/dd/yyyy" ? "72px" : "70px",
            height: "1rem",
            border: "none",
            position: "relative",
            top: "-1px",
            paddingLeft: "0px",
          }}
          disabled={disabled}
          className={disabled ? "disableElement" : ""}
          value={shownDateInput}
          onBeforeInput={(e) => {
            const allowedChars = /^[0-9]+$/;
            if (!e.data || !allowedChars.test(e.data)) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            customHandleDateInputChange && customHandleDateInputChange(e);
            handleDateInputChange(e.target.value);
          }}
          onBlur={(e) => {
            inputOnBlur && inputOnBlur(e);
          }}
          maxLength={maxLength || returnInputMaxLength()}
        />
      </div>
    </div>
  );
};

export default DateInputField;
