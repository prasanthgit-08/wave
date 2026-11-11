import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";

const Input = ({
  name,
  control,
  type = "text",
  onChange,
  onInput,
  onBlur,
  onBeforeInput,
  label,
  required = false,
  loading = false,
  className = "",
  maxLength,
  max,
  min,
  value,
  width,
  style,
  disabled = false,
  focusFlag = false,
  autoComplete = "one-time-code",
  spellCheck = false,
  validationError = false,
  allowNegative = true,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!focusFlag) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 200);

    return () => clearTimeout(timer);
  }, [focusFlag]);

  /**
   * Common input component.
   * This is used for both:
   * - React Hook Form
   * - Normal React input
   */
  const renderInput = (field = {}, error) => {
    const inputType = type === "password" && showPassword ? "text" : type;

    const fieldValue = value ?? field.value ?? "";
    const borderColor = error || validationError ? "borderRed" : required ? "borderGreen" : "";
    // allowNegative={false}: drop any edit (typing or paste) that would put a minus sign in the value;
    // the input is controlled, so it simply keeps its previous value
    const isBlockedNegative = (e) => !allowNegative && e.target.value.includes("-");

    return (
      <div className="position-relative pass-box">
        <input
          {...rest}
          ref={inputRef}
          label={label}
          type={inputType}
          name={field.name ?? name}
          id={field.name ?? name}
          maxLength={maxLength}
          max={max}
          min={min}
          autoComplete={autoComplete}
          autoCorrect="off"
          aria-autocomplete="none"
          spellCheck={spellCheck}
          inputMode={type === "number" ? "numeric" : "text"}
          /* screens that colour the border inline need their style kept, not replaced by width */
          style={{ width, ...style }}
          value={fieldValue}
          disabled={disabled || loading}
          onBeforeInput={(e) => {
            onBeforeInput?.(e);
          }}
          onInput={(e) => {
            if (isBlockedNegative(e)) return;
            onChange?.(e);
            field.onChange?.(e);
          }}
          onChange={(e) => {
            if (isBlockedNegative(e)) return;
            onInput?.(e);
            field.onChange?.(e);
          }}

          onBlur={(e) => {
            onBlur?.(e);
            field.onBlur?.(e);
          }}
          className={`${className} ${disabled || loading ? "" : borderColor}`}
        />

        {/* Password toggle */}
        {type === "password" && (
          <span
            style={{
              cursor: "pointer",
              right: "10px",
              position: "absolute",
              top: "5px",
            }}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <FontAwesomeIcon
              className="font-24 account-icon text-primary eyeClass"
              icon={showPassword ? faEye : faEyeSlash}
            />
          </span>
        )}

        {/* Loader */}
        {loading && (
          <div
            style={{
              right: "21px",
              top: "0px",
            }}
            className="loader-container position-absolute"
          >
            <div className="input_loader"></div>
          </div>
        )}
      </div>
    );
  };

  /**
   * React Hook Form mode
   */
  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => renderInput(field, error)}
      />
    );
  }

  /**
   * Normal React input mode
   */
  return renderInput(
    {
      name,
      value,
    },
    null
  );
};

export default Input;
