import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppNavigate } from "../../../../../hooks/useAppNavigate";

const DelayCreditCardFooter = () => {
  const navigate = useNavigate();
  const { goBack } = useAppNavigate();
  const [savedCompanyName, setSavedCompanyName] = useState(() => {
    // Initialize state from localStorage
    return localStorage.getItem("selectedCompany");
  });
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            navigate("/delay-return-documents");
          }}
        >
          Next
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            goBack();
          }}
        >
          Back
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            goBack();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DelayCreditCardFooter;
