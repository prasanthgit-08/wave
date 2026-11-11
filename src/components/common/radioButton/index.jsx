import React from "react";
import { Controller } from "react-hook-form";

const RadioButton = ({
  control,
  name,
  options,
  horizontal = false,
  horizontalAlignmentClassName = "ms-3",
  verticalAlignmentClassName = "mb-1",
  disabled = false,
  hidden = false,
  onChange,
  className = "",
  labelClassName = "",
  defaultWidth,
  value,
  forceCheckIf = null,
  defaultValue,
  leftLabel = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const currentValue = forceCheckIf !== null ? forceCheckIf : value !== undefined ? value : field.value;
        return (
          <div
            className={`customRadioGroup ${horizontal ? "d-flex" : ""} ${
              hidden ? "hide-elements" : ""
            } ${className}`}
          >
            {options
              ?.filter((opt) => !opt?.hidden)
              .map((option) => {
                let value, label, width;
                if (typeof option === "string") {
                  value = option;
                  label = option;
                } else if (typeof option === "object" && option !== null) {
                  value = option.value;
                  label = option.label || option.value;
                  width = option?.width;
                } else {
                  return null; // skip invalid option
                }

                return (
                  <div
                    key={value}
                    className={`d-flex align-items-center ${
                      horizontal ? `${horizontalAlignmentClassName}` : `${verticalAlignmentClassName}`
                    }`}
                    style={{ width: defaultWidth || width }}
                  >
                    {leftLabel && (
                      <label
                        className="fw-semibold ms-2 "
                        style={{ whiteSpace: "nowrap", marginRight: "6px" }}
                      >
                        {label}
                      </label>
                    )}
                    <input
                      type="radio"
                      className={`${labelClassName}`}
                      name={name}
                      id={name}
                      value={value}
                      checked={currentValue === value}
                      onChange={() => {
                        if (onChange) onChange(option);
                        field.onChange(value);
                      }}
                      disabled={disabled || option?.disabled || false}
                    />
                    {!leftLabel && (
                      <label className="fw-semibold ms-2 customLabel" style={{ whiteSpace: "nowrap" }}>
                        {label}
                      </label>
                    )}
                  </div>
                );
              })}
          </div>
        );
      }}
    />
  );
};

export default RadioButton;

{
  /* <RadioButton
        name="status"
        control={reactHookForm.control}
        options={[
          { value: "all", label: "All" },
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive", disabled: true },
        ]}
        horizontal
      /> */
}

// if you are not using react-hook-form then you can use this
// <RadioButton
//   name="status"
//   defaultValue={"all"}
//   options={[
//     { value: "all", label: "All" },
//     { value: "active", label: "Active" },
//     { value: "inactive", label: "Inactive", disabled: true },
//   ]}
//   horizontal
// />
