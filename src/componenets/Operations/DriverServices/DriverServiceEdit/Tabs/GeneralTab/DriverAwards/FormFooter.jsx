import React from "react";

const FormFooter = () => {
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn visibility-hidden btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          disabled={true}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FormFooter;
