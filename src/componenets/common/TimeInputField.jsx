import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

const TimeInputField = ({
  /**
   * Can either pass the redux function as setTime or can define the onChange function which returns the event
   * Currently the format for 24 hrs is implemented
   * ---------------------------------------------------------------------------------------------------------
   * time: pass the value which holds the time
   */
  time,
  setTime,
  name,
  id,
  className,
  onChange,
  format,
  hidden,
  disabled,
  onBlur,
}) => {
  const dispatch = useDispatch();
  const timeInputRef = useRef(null);
  const [cursor, setCursor] = useState("");
  const [key, setKey] = useState("");

  /**
   * Keeps the cursor on the previous state
   */
  const handleInputFocus = (e) => {
    if (!(e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight")) {
      timeInputRef.current.setSelectionRange(cursor, cursor);
      timeInputRef.current.focus();
    }
  };

  /**
   * Updates the key and prevents entering alphabets and special characters
   */
  const handleKeyDown = (e) => {
    setKey(e.key);
    if (/^[a-zA-Z\W_]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  /**
   * Changes the number according to format
   */
  const checkformat = (time) => {
    if (format === "24") {
      if (time[0] > 2) time = "2" + time.slice(1);
      if (time[0] >= 2 && time[1] > 4) time = time.slice(0, 1) + "4" + time.slice(2);
      if (time[0] >= 2 && time[1] >= 4 && time[3] >= 0) time = time.slice(0, 3) + "0" + time.slice(4);
      else if (time[3] > 5) time = time.slice(0, 3) + "5" + time.slice(4);
      if (time[0] >= 2 && time[1] >= 4 && time[4] >= 0) time = time.slice(0, 4) + "0";
    }
    return time;
  };

  /**
   * Changes the time according to the change in e.target.value
   */
  const timeValidation = (e) => {
    let newTime = e.target.value;
    let index = e.target.selectionStart;
    if (newTime.length < 5) {
      if (newTime[0] !== time[0]) {
        newTime = "0" + newTime;
        key !== "Backspace" && index++;
      } else {
        if (index !== 2) {
          newTime = newTime.slice(0, index) + "0" + newTime.slice(index);
          key === "Delete" && index++;
        } else {
          if (key === "Backspace") {
            newTime = newTime.slice(0, index - 1) + "0:" + newTime.slice(index);
            index--;
          }
          if (key === "Delete") {
            newTime = newTime.slice(0, index) + ":0" + newTime.slice(index + 1);
            index += 2;
          }
        }
      }
      setCursor(index);
    } else if (newTime.length > 5) {
      if (index !== 6) {
        if (index !== 3) {
          newTime = newTime.slice(0, index) + newTime.slice(index + 1);
        } else {
          newTime = newTime.slice(0, index - 1) + ":" + newTime[index - 1] + newTime.slice(index + 2);
          setCursor(index + 1);
        }
      } else {
        newTime = newTime.slice(0, index - 1);
      }
    }
    return checkformat(newTime);
  };

  return (
    <div>
      <input
        type="text"
        className={`${className || ""} ${hidden ? "hide-elements" : ""}`}
        id={id || "TimeInputField"}
        name={name || "TimeInputField"}
        value={time}
        maxLength={6}
        autoComplete="off"
        aria-autocomplete="list"
        ref={timeInputRef}
        onKeyDown={handleKeyDown}
        onKeyUp={(e) => handleInputFocus(e)}
        onChange={(e) => {
          setCursor(e.target.selectionStart);
          dispatch(setTime(timeValidation(e)));
          if (onChange) onChange(e);
        }}
        disabled={disabled}
        onBlur={onBlur}
      />
    </div>
  );
};

export default TimeInputField;
