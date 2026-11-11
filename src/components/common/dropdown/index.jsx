import React from "react";
import { Controller } from "react-hook-form";
import { Form } from "react-bootstrap";
import "./index.css";

const Dropdown = ({
  name,
  control,
  options = [], // expecting an array of object for eg:- [{id:1, name:'option1'}]
  className = "",
  disabled = false,
  required = false,
  optionsLabel, // eg:- [{id:1, name:'option1'}] → optionsLabel='name'
  optionsValue, // eg:- [{id:1, name:'option1'}] → optionsValue='id'
  placeholder = "--Select--", // default placeholder
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const borderColor = (!field.value && error) || error ? "borderRed" : required ? "borderGreen" : "";

        return (
          <Form.Select
            {...field}
            id={name}
            disabled={disabled}
            className={`${className} ${error ? "borderRed" : ""} ${
              !field.value ? "placeholder-selection" : ""
            }`}
            {...rest} // passing remaining all props
          >
            <option hidden value="">
              {placeholder}
            </option>
            {options.map((option, i) => (
              <option
                className="placeholder-selection"
                key={option.id || i}
                value={option[optionsValue] || ""}
              >
                {option[optionsLabel] || ""}
              </option>
            ))}
          </Form.Select>
        );
      }}
    />
  );
};

export default Dropdown;
