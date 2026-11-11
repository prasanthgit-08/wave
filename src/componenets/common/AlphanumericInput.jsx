import React from "react";

const AlphanumericInput = () => {
  const handleInputChange = (event) => {
    // Remove all non-alphanumeric characters
    const alphanumericValue = event.target.value.replace(/[^A-Za-z0-9]/g, "");
    event.target.value = alphanumericValue;
  };

  return <input type="text" onInput={handleInputChange} placeholder="Enter alphanumeric value" />;
};

export default AlphanumericInput;
