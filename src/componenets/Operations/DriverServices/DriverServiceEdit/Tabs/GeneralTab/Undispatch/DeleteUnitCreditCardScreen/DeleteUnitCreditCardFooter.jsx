import React from "react";

const DeleteUnitCreditCardFooter = () => {
  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5">Next</button>{" "}
        <button className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5" type="">
          Back
        </button>
        <button className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5" type="">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteUnitCreditCardFooter;
