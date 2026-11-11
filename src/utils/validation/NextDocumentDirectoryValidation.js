export const nextDocumentFormat = (inputValue, userFirstBackslash) => {
  // Remove all non-alphanumeric characters and convert to uppercase
  const cleanedValue = inputValue.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

  let formattedValue = "";
  let firstBackslashAdded = false;

  for (let i = 0; i < cleanedValue.length; i++) {
    if (i > 0 && i % 2 === 0) {
      formattedValue += "\\";
    }
    formattedValue += cleanedValue[i];

    if (i === 1 && userFirstBackslash && !firstBackslashAdded) {
      formattedValue = "\\" + formattedValue;
      firstBackslashAdded = true;
    }
  }

  return formattedValue;
};
