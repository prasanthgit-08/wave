/**
 * CustomRadioGroup Component
 * ************************************
 * This component provides a customizable group of radio buttons.
 *
 * @component
 *
 * @prop {Array} options - Either an array of strings (e.g., ['All', 'Active'])
 *                         or an array of objects (e.g., [{value: 'all', label: 'All'}, {value: 'active', label: 'Active'}])
 *
 * @prop {string} selectedOption - The value of the currently selected option.
 *
 * @prop {Function} onChange - Handler function called when a radio button is clicked.
 *                             The selected option's value is passed as an argument.
 *
 * @prop {string} [name='customRadioGroup'] - The common name attribute for all radio buttons in the group.
 *
 * @prop {boolean} [horizontal=false] - A flag indicating if the radio buttons should be aligned horizontally.
 *
 * @prop {string} [horizontalAlignmentClassName='me-3'] - Additional CSS classes for horizontal alignment, if required.
 *
 * @prop {boolean} [disabled=false] - If true, all radio buttons in the group will be disabled.
 *
 * @prop {boolean} [hidden=false] - If true, the entire radio group will be hidden.
 *
 * @example
 * <CustomRadioGroup
 *   options={['All', 'Active', 'Inactive']}
 *   selectedOption="Active"
 *   onChange={(value) => console.log(value)}
 * />
 *
 * OR
 *
 * <CustomRadioGroup
 *   // Options Array Schema if value & label is same
 *   options={[
 *     {value: 'all', disabled: false},
 *     {value: 'active', disabled: false},
 *     {value: 'inactive', disabled: true}
 *   ]}
 *   // Options Array Schema if value & label is different
 *   options={[
 *     {value: 'all', label: 'All', disabled: false},
 *     {value: 'active', label: 'Active', disabled: false},
 *     {value: 'inactive', label: 'Inactive', disabled: true}
 *   ]}
 *   selectedOption="all"
 *   onChange={(value) => console.log(value)}
 * />
 */

import React from "react";
import PropTypes from "prop-types";

const CustomRadioGroup = ({
  options,
  selectedOption,
  onChange,
  // Optional
  name = "customRadioGroup",
  horizontal = false,
  horizontalAlignmentClassName = "me-3",
  verticalAlignmentClassName = "m-b-5",
  disabled = false,
  hidden = false,
  className = "",
  labelClassName,
  defaultWidth,
}) => {
  const renderOption = (option) => {
    let value, label, width;

    if (typeof option === "string") {
      value = option;
      label = option;
    } else if (typeof option === "object" && option !== null) {
      value = option.value;
      label = option.label || option.value;
      width = option?.width;
    } else {
      // Handle unexpected data type, perhaps by logging an error or ignoring this option
      return null;
    }

    return (
      <div
        key={value}
        className={`d-flex align-items-center ${
          horizontal ? `${horizontalAlignmentClassName}` : `${verticalAlignmentClassName}`
        }`}
        style={{ width: defaultWidth || width }}
      >
        <input
          type="radio"
          className={labelClassName ? `form-check-input ${labelClassName}` : ""}
          name={name}
          value={value}
          checked={selectedOption === value}
          onChange={() => onChange(value)}
          disabled={disabled || option?.disabled || false}
        />
        <label className="f-w-600 m-l-5 customLabel" style={{ whiteSpace: "nowrap" }}>
          {label}
        </label>
      </div>
    );
  };

  return (
    <div
      className={`customRadioGroup ${horizontal ? "d-flex" : ""} ${hidden ? "hide-elements" : ""} ${className}`}
    >
      {options?.map(renderOption)}
    </div>
  );
};

CustomRadioGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string,
        disabled: PropTypes.bool,
      }),
    ])
  ).isRequired,
  selectedOption: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  horizontal: PropTypes.bool,
  horizontalAlignmentClassName: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
};

CustomRadioGroup.defaultProps = {
  name: "customRadioGroup",
  horizontal: false,
  horizontalAlignmentClassName: "me-3",
  disabled: false,
  hidden: false,
};

export default CustomRadioGroup;
