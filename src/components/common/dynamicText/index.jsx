import React, { useRef, useCallback, useEffect, useState } from "react";

const DynamicText = ({
  numFields,
  maxCharLimit,
  inputValues,
  setInputValues,
  disabled,
  invoice,
  horizontal = false,
  className,
  requireFirstField = false,
}) => {
  const inputRefs = useRef([]);
  const valuesRef = useRef([...inputValues]); // Local store for fast typing — no rerender

  const [isFirstFieldValid, setIsFirstFieldValid] = useState(
    requireFirstField ? !!inputValues[0]?.trim() : true
  );

  maxCharLimit = Math.min(maxCharLimit, 40);

  // ===============================
  // 🔹 SYNC EXTERNAL VALUE CHANGES
  // ===============================
  useEffect(() => {
    // Update local ref
    valuesRef.current = [...inputValues];

    // Update DOM inputs (because uncontrolled)
    inputRefs.current.forEach((input, index) => {
      if (input) {
        input.value = inputValues[index] ?? "";
      }
    });
  }, [inputValues]);

  // ========== PASTE ==========
  const handlePaste = (index, event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("Text");
    const words = pasteData.split(/\s+/);

    const newValues = [...valuesRef.current];

    let currentIndex = index;
    let i = 0;

    while (i < words?.length && currentIndex < numFields) {
      const word = words[i];

      if (newValues[currentIndex]?.length + word?.length > maxCharLimit - 2) {
        if (
          currentIndex + 1 < numFields &&
          newValues[currentIndex + 1]?.length + word?.length <= maxCharLimit - 2
        ) {
          currentIndex++;
        } else {
          const truncatedWord = word.substring(0, maxCharLimit - 2 - newValues[currentIndex]?.length);
          newValues[currentIndex] += " " + truncatedWord;
          break;
        }
      } else {
        newValues[currentIndex] = newValues[currentIndex] ? newValues[currentIndex] + " " + word : word;

        if (newValues[currentIndex]?.length === maxCharLimit - 2) {
          currentIndex++;
        }
        i++;
      }
    }

    valuesRef.current = newValues; // Update local store

    // Update DOM manually (because uncontrolled)
    newValues.forEach((val, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = val; // forces UI to show paste result
      }
    });

    // Commit to state immediately ONLY for paste
    setInputValues([...newValues]);
  };

  const handleChange = useCallback(
    (index, event) => {
      let value = event.target.value;

      if (value?.length > maxCharLimit) {
        value = value.slice(0, maxCharLimit);
        event.target.value = value; // force DOM correction
      }

      // Always update ref
      valuesRef.current[index] = value;

      // COMMIT FIRST FIELD IMMEDIATELY
      if (requireFirstField && index === 0) {
        setInputValues((prev) => {
          const updated = [...prev];
          updated[0] = value;
          return updated;
        });
      }

      if (value?.length >= maxCharLimit && index < numFields - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (value?.length === 0 && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [maxCharLimit, numFields, requireFirstField, setInputValues]
  );

  // ========== ON BLUR (COMMIT TO STATE) ==========
  const handleBlur = () => {
    setInputValues([...valuesRef.current]); // Update only once
  };

  // ========== FIRST FIELD VALIDATION STYLE ==========
  /* const getFirstFieldClass = (index) => {
    if (requireFirstField && index === 0) {
      return valuesRef.current[0]?.trim()?.length > 0 ? "borderGreen" : "borderRed";
    }
    return "";
  }; */
  const getFirstFieldClass = (index) => {
    if (requireFirstField && index === 0) {
      return isFirstFieldValid ? "borderGreen" : "borderRed";
    }
    return "";
  };

  // Sync when external values change
  useEffect(() => {
    if (requireFirstField) {
      setIsFirstFieldValid(!!inputValues[0]?.trim());
    }
  }, [inputValues, requireFirstField]);

  // ========== RENDER FIELDS ==========
  const renderInput = (value, index) => (
    <input
      key={index}
      ref={(el) => (inputRefs.current[index] = el)}
      type="text"
      defaultValue={value} // IMPORTANT: uncontrolled
      maxLength={invoice ? maxCharLimit : 40}
      onChange={(e) => handleChange(index, e)}
      onPaste={(e) => handlePaste(index, e)}
      onBlur={handleBlur}
      disabled={disabled || false}
      className={`customFormControl h-19 ${className || ""} ${getFirstFieldClass(index)}`}
      style={{ whiteSpace: "pre-wrap", marginBottom: "10px" }}
    />
  );

  if (horizontal) {
    return (
      <div className={`dynamicTextFieldWrapper d-flex horizontal`}>
        {inputValues.map((value, index) => renderInput(value, index))}
      </div>
    );
  }

  return inputValues.map((value, index) => renderInput(value, index));
};

export default DynamicText;
