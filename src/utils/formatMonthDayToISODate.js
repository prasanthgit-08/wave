const formatMonthDayToISODate = (monthDay) => {
  const [month, day] = monthDay?.split("/");
  const year = new Date().getFullYear(); // Hardcoded year

  // Use template literals to format the date as YYYY-MM-DD
  const formattedDate = `${year}-${month?.padStart(2, "0")}-${day?.padStart(2, "0")}`;

  if (!monthDay || monthDay?.trim().length === 0) return "";

  return formattedDate;
};

export default formatMonthDayToISODate;

// Example Usage:
// Use the formatMonthDayToISODate function to convert a "MM/DD" formatted date to "YYYY-MM-DD" format.
// const inputDate = '09/14'; // Provide a date in the "MM/DD" format
// const formattedDate = formatMonthDayToISODate(inputDate); // Call the utility function
// console.log(formattedDate); // Output: '2000-09-14' - The date is now in "YYYY-MM-DD" format.
