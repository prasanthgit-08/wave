const phoneExtension = (value) => {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, "");

  if (value) return phoneNumber;
};

export default phoneExtension;
