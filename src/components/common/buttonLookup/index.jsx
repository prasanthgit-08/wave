import React from "react";

const ButtonLookup = ({ className, disabled, hidden, onClick, style }) => {
  return (
    <i
      className={`fa-solid fa-magnifying-glass lookupMagnifierIcon
        ${className || ""}
        ${disabled ? "disableElement" : ""} 
        ${hidden ? "hide-elements" : ""}
      `}
      onClick={onClick}
      style={style}
    />
  );
};

export default ButtonLookup;
