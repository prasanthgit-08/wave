import React from "react";

/* Common Footer Usage Example
******************************  
const MyComponent = () => {
  const buttons = [
    { label: "Save", onClick: () => console.log("Save clicked"), disabled: false },
    { label: "Cancel", onClick: () => console.log("Cancel clicked") },
    { label: "Edit", onClick: () => console.log("Edit clicked") },
    { label: "Delete", onClick: () => console.log("Delete clicked") },
  ];

  return <CommonFooter buttons={buttons} />;
}; 
*/

const CommonFooter = ({
  buttons = [],
  rightButtons = [],
  leftButtons = [],
  MiscellaneousContent,
  hideBorderTop = false,
}) => {
  // If only buttons are provided, right align it by default
  const defaultRightButtons = Array.isArray(rightButtons) && rightButtons.length > 0 ? rightButtons : buttons;

  return (
    <div
      className={`d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-dark border-2
      ${!hideBorderTop ? "border-top" : ""}
    `}
    >
      <div className="d-flex align-items-center flex-wrap m-r-10">
        {MiscellaneousContent && <MiscellaneousContent />}
        {Array.isArray(leftButtons) &&
          leftButtons.length > 0 &&
          leftButtons.map((button, index) => (
            <button
              key={`left-${index}`}
              className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${button?.className || ""}`}
              type={button?.type || "button"}
              hidden={button?.hidden || false}
              disabled={button?.disabled || false}
              onClick={button?.onClick}
              onMouseDown={button?.onMouseDown}
              style={button?.style || {}}
            >
              {button?.label}
            </button>
          ))}
      </div>
      <div className="d-flex align-items-center flex-wrap">
        {Array.isArray(defaultRightButtons) &&
          defaultRightButtons.length > 0 &&
          defaultRightButtons.map((button, index) => (
            <button
              key={`right-${index}`}
              className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${button?.className || ""}`}
              type={button?.type || "button"}
              hidden={button?.hidden || false}
              disabled={button?.disabled || false}
              onClick={button?.onClick}
              onMouseDown={button?.onMouseDown}
              style={button?.style || {}}
            >
              {button?.label}
            </button>
          ))}
      </div>
    </div>
  );
};

export default CommonFooter;
