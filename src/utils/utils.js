import {
  COMMON_PAYLOAD_FIELDS,
  DRIVER_PAYLOAD_FIELDS,
  INVOICE_PAYLOAD_FIELDS,
} from "../constants/payload.constant";

/**
 * Returns currentCompany from localStorage.
 * @returns {object|null} Parsed company data or null.
 */
export const getCurrentCompany = () => {
  const company = localStorage.getItem("currentCompany");
  return company ? JSON.parse(company) : null;
};

/**
 * Writes a formatted value back into an input without sending the caret to the end.
 *
 * Assigning to an input's value moves the text cursor to the end of the text whenever
 * the new value differs from the old one, so typing in the middle of a formatted field
 * makes every character after the first one land at the end. This keeps the caret beside
 * the character the user is editing by shifting it with the length the formatter changed.
 *
 * @param {HTMLInputElement} input - The input element being edited (e.target).
 * @param {string} formattedValue - The value after formatting.
 * @returns {string} - The formatted value, for convenience.
 */
export const setFormattedInputValue = (input, formattedValue) => {
  if (!input || input.value === formattedValue) return formattedValue;

  const caretPosition = input.selectionStart ?? input.value.length;
  const lengthDifference = formattedValue.length - input.value.length;
  const nextCaretPosition = Math.min(Math.max(caretPosition + lengthDifference, 0), formattedValue.length);

  input.value = formattedValue;
  input.setSelectionRange?.(nextCaretPosition, nextCaretPosition);

  return formattedValue;
};

/**
 * Removes leading whitespace from a string.
 * @param {string} value - The input string.
 * @returns {string} - The input string without leading whitespace.
 */
export const removeLeadingWhitespace = (value) => {
  if (typeof value !== "string") return value;
  return value.replace(/^\s+/, "");
};

/**
 * Remove leading spaces only (but allow other symbols)
 * If the input is a single character, it will be replaced with an empty string if non-alphanumeric.
 * @param {string} value - The input string to process.
 * @returns {string} - The cleaned string with a valid first character
 */
export const cleanFirstChar = (value) => {
  return value.replace(/^\s+/, "");
};
/**
 * Returns true if the value is exactly a single dot (".").
 */
export const isOnlyDot = (value) => {
  return value === ".";
};

/**
 * Normalizes decimal input for display:
 * - "." → "" (cleared)
 * - ".5" or 0.5 → "0.5"
 * - "1." or 1. → "1"
 * - "0." → "0"
 *
 * @param {string | number} value - The input to correct.
 * @returns {string} - The cleaned and corrected string.
 */
export const correctDecimalInputOnBlur = (value) => {
  const str = String(value)?.trim();

  if (str === ".") {
    return "0";
  }

  if (/^\.\d+$/.test(str)) {
    return "0" + str; // ".5" → "0.5"
  }

  if (/^\d+\.$/.test(str)) {
    return str.slice(0, -1); // "1." → "1"
  }

  if (!str || str === "0") {
    return 0;
  }

  return Number(str);
};

/**
 * Pads a numeric value to at least two decimal places for display.
 * - 70 / "70" → "70.00", ".7" / "0.7" → "0.70", "1." → "1.00"
 * - Values with more than two decimals are kept as is (e.g. "1.2345")
 * - Empty, zero and non-numeric values are returned unchanged so existing
 *   truthy/zero checks keep working.
 *
 * @param {string | number} value - The value to format.
 * @returns {string | number} - The formatted value.
 */
export const formatMinTwoDecimals = (value) => {
  if (value === null || value === undefined) return value;
  const str = String(value).trim();
  if (!/^\d*\.?\d*$/.test(str) || !/\d/.test(str) || Number(str) === 0) return value;

  const [intPart, decPart = ""] = str.split(".");
  return `${intPart || "0"}.${decPart.padEnd(2, "0")}`;
};

/**
 * Ensures the value is non-negative.
 * - If the input is negative, returns "" (or 0 if you prefer).
 * - Allows integers and decimals >= 0.
 *
 * @param {string | number} value - The input to validate.
 * @returns {string} - A valid non-negative string value.
 */
export const preventNegative = (value) => {
  if (value == null || value === "") return "";

  const num = Number(value);

  if (isNaN(num) || num < 0) {
    return ""; // block negative or invalid values
  }

  return String(value);
};

// for checking last value is pointer or not
export const lastpointer = (value = "") => {
  if (!value) return;
  let str = String(value);
  return str?.charAt(str?.length - 1) === ".";
};

export const handleDecimalValue = (e, length) => {
  let value = e.target.value;
  let indexOfDecimal = value.indexOf(".");

  if (value.length === length - 2 && indexOfDecimal === -1) {
    value = value.slice(0, length - 3) + "." + value.slice(length - 3);
  } else if (indexOfDecimal === length - 3 && value.length === length - 2) {
  } else {
    value = value.replace(/[^\d\.]/g, "");
  }

  if (e.inputType === "deleteContentBackward" && value[indexOfDecimal - 1] === ".") {
    value = value.slice(0, indexOfDecimal - 1) + value.slice(indexOfDecimal);
    e.target.value = value;
    return;
  }

  return value;
};

export function handleBeforeInputForInteger(e, maxValue) {
  const currentValue = e.target.value;
  const inputChar = e.data;

  if (inputChar !== null && !/^[0-9+e]*$/.test(inputChar)) {
    e.preventDefault();
    return;
  }

  const newValue = parseInt(currentValue + inputChar, 10);
  if (newValue > maxValue) {
    e.preventDefault();
    return;
  }
}

export const toBool = (val) => (val ? 1 : 0);

export function booleanToNumber(data) {
  // If it's an array → map each item
  if (Array.isArray(data)) {
    return data.map((item) => booleanToNumber(item));
  }

  // If it's an object → convert its values
  if (data !== null && typeof data === "object") {
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, booleanToNumber(value)]));
  }

  // If it's boolean → convert
  if (typeof data === "boolean") {
    return data ? 1 : 0;
  }

  // Otherwise return as-is
  return data;
}

//function for restricting values starts with "." and ends with "."
export const validateDecimalInput = (value) => {
  if (!value) return true; // allow empty input
  if (value === ".") return false; // only dot
  if (value.endsWith(".")) return false; // ends with dot

  return true;
};

export const trimString = (val) => val?.trim?.() || "";

export const joinString = (...args) => {
  let separator = ", "; // default

  // if first arg is marked as separator override
  if (args[0]?.__sep) {
    separator = args[0].value;
    args.shift();
  }

  return args.map(trimString).filter(Boolean).join(separator);
};

// helper to mark separator
export const strSeparator = (value) => ({ __sep: true, value });

// if needed we can call like this
// joinString(sep(" - "), string1, string,2 string3);
// // "City - State - Zip"

export const updateFavicon = () => {
  const companyName = process.env.REACT_APP_COMPANY_NAME;

  const favicon = document.querySelector("link[rel='icon']");

  if (favicon) {
    favicon.setAttribute(
      "href",
      companyName === "Wave"
        ? `${process.env.PUBLIC_URL}/images/Wave-20th.jpg`
        : `${process.env.PUBLIC_URL}/images/Horizon-40th.jpg`
    );
  }
};

export const getSessionId = ({ userId, processName }) => {
  if (!userId || !processName) return null;
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  const result = `${userId}${processName}${day}${month}`;

  return result;
};

export const getStringCombination = (separator, ...fields) => {
  return fields
    .filter(Boolean)
    .map((field) => String(field).trim())
    .join(separator);
};

export const pickPayloadFields = (source = {}, template = {}) => {
  return Object.keys(template).reduce((result, key) => {
    result[key] = source?.[key] ?? null;
    return result;
  }, {});
};

export const generateUnitPayload = (data) => pickPayloadFields(data, COMMON_PAYLOAD_FIELDS);

export const generateInvoicePayload = (data) => pickPayloadFields(data, INVOICE_PAYLOAD_FIELDS);

export const generateDriverPayload = (data) => pickPayloadFields(data, DRIVER_PAYLOAD_FIELDS);
