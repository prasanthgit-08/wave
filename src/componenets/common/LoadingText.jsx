import React from "react";

const LoadingText = ({ className, smallerFont = false }) => {
  return (
    // temporary bug fix like loading text commented

    // <div className={`loadingStyling ${smallerFont ? 'smallerFont': ''} ${className || ''}`}>
    //   LOADING...
    // </div>
    <div className="loading-overlay fade modal-backdrop show">
      <div className="pos-center">
        <div className="loader" />
      </div>
    </div>
  );
};

export default LoadingText;
