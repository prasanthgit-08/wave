import { useFormContext } from "react-hook-form";
import useDebouncer from "../../../../../hooks/useDebouncer";
import { useDispatch, useSelector } from "react-redux";
import { setOrderEntrySchemaConditions } from "../../../../../store/slices/unit.slice";
import { useEffect } from "react";
import { overWidthInitialState } from "../../schemas/overWidth.schema";

const useOverWidth = () => {
  const dispatch = useDispatch();

  const { watch, setValue, trigger, getValues, resetField } = useFormContext();
  const selectedUnitType = useSelector((state) => state.unit.selectedUnitType);

  // Debounce function
  const debounceUpdate = useDebouncer(() => {
    const overWidth = getValues("overWidth");
    dispatch(
      setOrderEntrySchemaConditions({
        overWidth: { ...overWidth }, // use latest values directly
      })
    );
  }, 150);

  // Updating overWidth fields dynamically
  const updateOverWidthFields = (fields) => {
    const current = getValues("overWidth");

    if (fields.trailerOverhangs === false) {
      fields.trailerOverhangFoot = "";
      fields.trailerOverhangInch = "";
    }

    if (fields.trailerOnly) {
      fields.boatMake = "";
      fields.hullId = "";
      fields.boatLengthFoot = "";
      fields.boatLengthInch = "";
      fields.boatWidthFoot = "";
      fields.boatWidthInch = "";
      fields.boatHeightFoot = "";
      fields.boatHeightInch = "";
      fields.totalHeightFoot = "";
      fields.totalHeightInch = "";
    }

    setValue("overWidth", { ...current, ...fields }, { shouldValidate: false, shouldDirty: true });

    debounceUpdate();
  };

  const formatAmount = (raw, inputType) => {
    let value = raw.replace(/[^\d.]/g, ""); // allow digits + decimal only
    let indexOfDecimal = value.indexOf(".");

    // Auto insert decimal if 6 digits typed with no decimal
    if (value.length === 6 && indexOfDecimal === -1) {
      value = value.slice(0, 5) + "." + value.slice(5);
      indexOfDecimal = value.indexOf(".");
    }

    // Handle backspace before decimal point
    if (inputType === "deleteContentBackward" && indexOfDecimal > 0 && value[indexOfDecimal - 1] === ".") {
      value = value.slice(0, indexOfDecimal - 1) + value.slice(indexOfDecimal);
    }

    return value;
  };

  const restrictYearInput = (value) => {
    return value.replace(/\D/g, ""); // remove all non-digits
  };

  const validateYearOnBlur = (value) => {
    const currentYear = new Date().getFullYear();
    const minYear = 1900;
    const maxYear = currentYear + 1;

    if (!/^\d{4}$/.test(value)) {
      return String(maxYear); // default if invalid
    }

    const year = Number(value);
    if (year < minYear) return String(minYear);
    if (year > maxYear) return String(maxYear);
    return String(year);
  };

  const minMaxCalculation = (rawValue, min = 1, max = 9) => {
    // Step 1: allow only digits
    let value = rawValue.replace(/\D/g, "");

    if (!value) return ""; // allow empty while typing

    const num = Number(value);

    // Step 2: clamp to min/max
    if (num < min) return String(min);
    if (num > max) return String(max);

    return String(num);
  };

  // Resetting overWidth tab values
  useEffect(() => {
    if (!selectedUnitType) {
      resetField("overWidth", {
        defaultValue: overWidthInitialState,
      });

      // Clear schema conditions in redux
      dispatch(
        setOrderEntrySchemaConditions({
          overWidth: { ...overWidthInitialState },
        })
      );
    }
  }, [selectedUnitType]);

  return {
    updateOverWidthFields,
    formatAmount,
    restrictYearInput,
    validateYearOnBlur,
    minMaxCalculation,
  };
};

export default useOverWidth;
