import React, { useEffect } from "react";

const Loading = ({
  show = false,
  small = false, // if true, smaller lodder will show ( using for table)
  textClassName = "",
  smallerFont = false,
}) => {
  useEffect(() => {
    if (small || !show) return;
    const handleKeyDown = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Attach listener globally once
    document.addEventListener("keydown", handleKeyDown, true);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [show]);

  return (
    <>
      {small ? (
        <div
          className={`d-flex justify-content-center loadingStyling ${smallerFont ? "smallerFont" : ""} ${textClassName || ""} `}
        >
          {/* LOADING... */}
          <div className="small-loader" />
        </div>
      ) : (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader" />
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
