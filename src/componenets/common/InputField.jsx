import React from "react";

const InputField = ({
  label,
  name,
  maxLength,
  type,
  onInput,
  onFocus,
  onBlur,
  className,
  placeholder,
  value,
  disabled,
  onChange,
  width,
}) => (
  <input
    type={type}
    name={name}
    value={value}
    maxLength={maxLength}
    className={className}
    placeholder={placeholder}
    disabled={disabled}
    onInput={onInput}
    onFocus={onFocus}
    onBlur={onBlur}
    onChange={onChange}
    aria-autocomplete="list"
    autoComplete="off"
    style={{
      width: width,
    }}
  />
);

export default InputField;
