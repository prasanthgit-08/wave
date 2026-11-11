export const zipVal = (value) => {
  const zipLength = value.length;

  if (!value) return value;
  if (/[a-zA-Z]/.test(value)) {
    const postalCode = value.replace(/[^A-Za-z0-9]/g, "");

    if (zipLength < 4) return postalCode;

    // Add a space after the first three characters
    return `${postalCode.slice(0, 3)} ${postalCode.slice(3, 6)}`;
  } else {
    const zipCode = value.replace(/[^\d]/g, "");
    if (zipLength < 6) return zipCode;

    return `${zipCode.slice(0, 5)}-${zipCode.slice(5, 9)}`;
  }
};
