import React from "react";
import { Controller } from "react-hook-form";

const Checkbox = ({
  control,
  name,
  id,
  disabled = false,
  hidden = false,
  className = "",
  onChange,
  checked = false,
  error = false,
}) => {
  const renderInput = ({ isChecked, hasError, handleChange }) => (
    <div className={`d-flex align-items-center ${hidden ? "hide-elements" : ""} ${className}`}>
      <input
        type="checkbox"
        id={id || name}
        className={`form-check-input me-2 p-0 ${hasError ? "borderRed" : ""}`}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );

  // Standalone mode: no react-hook-form, fully controlled by the parent
  if (!control) {
    return renderInput({
      isChecked: !!checked,
      hasError: error,
      handleChange: (e) => {
        if (onChange) onChange(e.target.checked);
      },
    });
  }

  // react-hook-form mode
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) =>
        renderInput({
          isChecked: !!field.value || checked,
          hasError: fieldError,
          handleChange: (e) => {
            if (onChange) onChange(e.target.checked);
            field.onChange(e.target.checked);
          },
        })
      }
    />
  );
};

export default Checkbox;

{
  /*
  // With react-hook-form
  <Checkbox name="towable" control={control} disabled={false} />

  // Without react-hook-form (plain controlled state)
  const [towable, setTowable] = useState(false);
  <Checkbox name="towable" checked={towable} onChange={setTowable} />
  */
}
