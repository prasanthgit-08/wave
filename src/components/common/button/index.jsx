import React from "react";

const CustomButton = ({
  className,
  onClick,
  label,
  hidden,
  style,
  loading = false,
  size = "medium",
  disabled = false,
  type = "button",
}) => {
  const minWidthMap = {
    small: "50px",
    medium: "100px",
    large: "140px",
  };

  return (
    <button
      className={` btn btn-secondary btn-sm m-1 ${className}`}
      onClick={onClick}
      type={type}
      hidden={hidden}
      style={{ minWidth: minWidthMap[size], ...style }}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="loader-container">
          <div
            className="loader"
            style={{
              width: "23px",
              height: "23px",
              border: "3px solid #f3f3f3",
              borderTop: "3px solid #3498db",
              margin: "-3px",
            }}
          ></div>
        </div>
      ) : (
        label
      )}
    </button>
  );
};

export default CustomButton;
