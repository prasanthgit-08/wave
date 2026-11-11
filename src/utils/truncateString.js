/**
 * truncateString - Truncates a string to a specified length and adds an ellipsis ("...") if truncated.
 *
 * @param {string} str - The string to be truncated
 * @param {number} num - The maximum number of characters to keep before truncating
 *
 * @returns {string} The truncated string with an ellipsis appended if truncation occurred
 */
export function truncateString(str, num) {
  if (!str || str?.length <= num) {
    return str;
  }
  return str?.slice(0, num) + "...";
}
