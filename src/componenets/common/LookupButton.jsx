import React from "react";

const LookupButton = ({ className, disabled, hidden, onClick, style }) => {
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

export default LookupButton;
