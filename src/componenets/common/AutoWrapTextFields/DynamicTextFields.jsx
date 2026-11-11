import React, { useRef, useCallback, useEffect, useState } from "react";

const DynamicTextFields = ({
  numFields,
  maxCharLimit,
  inputValues,
  setInputValues,
  disabled,
  invoice,
  horizontal = false,
  className,
  maxLimit = 40,
  requireFirstField = false,
  disabledFields = [],
  hideDisabledFields = false,
}) => {
  const inputRefs = useRef([]);
  const valuesRef = useRef([...inputValues]); // Local store for fast typing — no rerender

  const [isFirstFieldValid, setIsFirstFieldValid] = useState(
    requireFirstField ? !!inputValues[0]?.trim() : true
  );

  maxCharLimit = Math.min(maxCharLimit, maxLimit);

  // ===============================
  // 🔹 SYNC EXTERNAL VALUE CHANGES
  // ===============================
  useEffect(() => {
    valuesRef.current = [...inputValues];

    inputRefs.current.forEach((input, index) => {
      if (input) {
        input.value = inputValues[index] ?? "";
      }
    });
  }, [inputValues]);

  // ========== PASTE ==========
  const handlePaste = (index, event) => {
    event.preventDefault();

    if (disabledFields.includes(index)) return;

    const pasteData = event.clipboardData.getData("Text").trim();
    if (!pasteData) return;

    const words = pasteData.split(/\s+/);
    const newValues = [...valuesRef.current];

    let currentIndex = index;

    words.forEach((word) => {
      while (word.length > 0 && currentIndex < numFields) {
        if (disabledFields.includes(currentIndex)) {
          currentIndex++;
          continue;
        }

        const currentValue = newValues[currentIndex] || "";
        const space = currentValue ? " " : "";
        const availableLength = maxCharLimit - currentValue.length - space.length;

        if (availableLength <= 0) {
          currentIndex++;
          continue;
        }

        // If full word fits, add it
        if (word.length <= availableLength) {
          newValues[currentIndex] = currentValue + space + word;
          word = "";
        } else {
          // If current field already has text, move word to next field
          if (currentValue) {
            currentIndex++;
          } else {
            // Only split if single word itself is bigger than maxCharLimit
            newValues[currentIndex] = word.slice(0, availableLength);
            word = word.slice(availableLength);
            currentIndex++;
          }
        }
      }
    });

    valuesRef.current = newValues;

    newValues.forEach((val, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = val;
      }
    });

    setInputValues([...newValues]);
  };

  const handleChange = useCallback(
    (index, event) => {
      if (disabledFields.includes(index)) return;

      let value = event.target.value;
      const previousValue = valuesRef.current[index] || "";
      const isDeleting = value.length < previousValue.length;

      if (!isDeleting && value.length > maxCharLimit) {
        value = value.slice(0, maxCharLimit);
        event.target.value = value;
      }

      valuesRef.current[index] = value;

      if (requireFirstField && index === 0) {
        setInputValues((prev) => {
          const updated = [...prev];
          updated[0] = value;
          return updated;
        });
      }

      if (!isDeleting && value.length >= maxCharLimit && index < numFields - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (isDeleting && value.length === 0 && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [maxCharLimit, numFields, requireFirstField, setInputValues, disabledFields]
  );

  // ========== ON BLUR (COMMIT TO STATE) ==========
  const handleBlur = () => {
    setInputValues([...valuesRef.current]);
  };

  const getFirstFieldClass = (index) => {
    if (requireFirstField && index === 0) {
      return isFirstFieldValid ? "borderGreen" : "borderRed";
    }
    return "";
  };

  useEffect(() => {
    if (requireFirstField) {
      setIsFirstFieldValid(!!inputValues[0]?.trim());
    }
  }, [inputValues, requireFirstField]);

  // ========== RENDER FIELDS ==========
  const renderInput = (value, index) => {
    if (hideDisabledFields && disabledFields.includes(index)) {
      return null;
    }

    return (
      <input
        key={index}
        ref={(el) => (inputRefs.current[index] = el)}
        type="text"
        defaultValue={value}
        maxLength={maxCharLimit}
        onChange={(e) => handleChange(index, e)}
        onPaste={(e) => handlePaste(index, e)}
        onBlur={handleBlur}
        disabled={disabled || (!hideDisabledFields && disabledFields.includes(index))}
        className={`customFormControl h-19 ${className || ""} ${getFirstFieldClass(index)}`}
        style={{ whiteSpace: "pre-wrap", marginBottom: "10px" }}
      />
    );
  };

  if (horizontal) {
    return (
      <div className={`dynamicTextFieldWrapper d-flex horizontal`}>
        {inputValues.map((value, index) => renderInput(value, index))}
      </div>
    );
  }

  return inputValues.map((value, index) => renderInput(value, index));
};

export default DynamicTextFields;
