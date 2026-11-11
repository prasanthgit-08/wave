/**
 * Helpers to reduce save payloads to only the fields the user changed.
 *
 * Usage:
 *   1. Take a deep copy of the payload when editing starts (the "original").
 *   2. At save, call buildChangedPayload(currentPayload, original, config).
 */

const isEmptyValue = (value) => value === null || value === undefined || value === "";

const isPlainObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

// null, undefined and "" are treated as equal, and 12 equals "12".
export const isSameValue = (a, b) => {
  if (isEmptyValue(a) && isEmptyValue(b)) return true;
  if (isEmptyValue(a) || isEmptyValue(b)) return false;

  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    return a.every((item, index) => isSameValue(item, b[index]));
  }

  if (isPlainObject(a) || isPlainObject(b)) {
    if (!isPlainObject(a) || !isPlainObject(b)) return false;
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    return [...keys].every((key) => isSameValue(a[key], b[key]));
  }

  return String(a) === String(b);
};

/**
 * Returns only the keys of `current` whose values differ from `original`, plus `keepKeys` (e.g. PKs).
 * Returns null when nothing changed. Falls back to `current` when there is no original to compare with.
 */
export const getChangedFields = (current, original, keepKeys = []) => {
  if (!isPlainObject(current)) return isSameValue(current, original) ? null : current;
  if (!isPlainObject(original)) return current;

  const changed = {};
  Object.keys(current).forEach((key) => {
    if (!isSameValue(current[key], original[key])) changed[key] = current[key];
  });

  if (Object.keys(changed).length === 0) return null;

  keepKeys.forEach((key) => {
    if (key in current) changed[key] = current[key];
  });
  return changed;
};

/**
 * Builds a reduced payload from `current` by comparing each top-level key against `original`.
 *
 * config[key] = { mode, keep, required }
 *   mode "fields" (default) - send only changed fields inside the object (+ `keep` keys)
 *   mode "whole"            - send the whole value if anything in it changed (use for lists)
 *   mode "always"           - always send the value
 *   required                - ("fields" mode) keys always sent, even when nothing in the object changed
 *
 * Keys that end up unchanged are omitted. Without an `original`, the full `current` payload is returned.
 */
export const buildChangedPayload = (current, original, config = {}) => {
  if (!isPlainObject(original)) return current;

  const payload = {};
  Object.keys(current).forEach((key) => {
    const { mode = "fields", keep = [], required = [] } = config[key] || {};
    let value;

    if (mode === "always") {
      value = current[key];
    } else if (mode === "whole") {
      value = isSameValue(current[key], original[key]) ? null : current[key];
    } else {
      value = getChangedFields(current[key], original[key], keep);
      if (isPlainObject(current[key]) && required.length > 0) {
        value = { ...value };
        required.forEach((requiredKey) => {
          if (requiredKey in current[key]) value[requiredKey] = current[key][requiredKey];
        });
      }
    }

    if (value !== null && value !== undefined) payload[key] = value;
  });
  return payload;
};
