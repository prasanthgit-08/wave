const numberValidation = (value) => {
  if (!value) return value;
  const number = String(value)?.replace(/[^\d:.\d{1}]/g, "");

  if (value) return number;
};

export default numberValidation;
