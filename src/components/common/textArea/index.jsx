import { Controller } from "react-hook-form";

const TextArea = ({
  name,
  control,
  type,
  onChange,
  onBlur,
  label,
  required = false,
  className,
  value,
  width,
  disabled,
  palceholder,
  rows = 16,
  cols = 90,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        // Decide border color based on validation state
        const borderColor = (!field.value && error) || error ? "borderRed" : required ? "borderGreen" : "";
        return (
          <div className="">
            <textarea // position-relative pass-box --- classname
              id={name}
              className={`${className} ${disabled ? "" : borderColor}`}
              label={label}
              type={"text"}
              name={field.name}
              style={{ width }}
              value={value ?? field.value ?? ""}
              disabled={disabled}
              autoComplete="newpassword"
              aria-autocomplete="none"
              palceholder={palceholder}
              rows={rows}
              cols={cols}
              // merge custom + RHF onChange
              onChange={(e) => {
                if (onChange) onChange(e);
                field.onChange(e);
              }}
              // merge custom + RHF onBlur
              onBlur={(e) => {
                if (onBlur) onBlur(e);
                field.onBlur(e);
              }}
              {...rest} // passing remaining all props
            />
          </div>
        );
      }}
    />
  );
};

export default TextArea;
