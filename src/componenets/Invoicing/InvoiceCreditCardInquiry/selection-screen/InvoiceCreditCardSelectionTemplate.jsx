import React, { useEffect, useState } from "react";
import { InvoiceCreditCardSelection } from "./InvoiceCreditCardSelection";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import { useSelector, useDispatch } from "react-redux";
import { resetFields, setCreditCardEnquiryView } from "../../../../redux/Invoicing/CreditCardEnquirySlice";
import CreditCardEnquiryService from "../../../../services/Invoicing/CreditCardEnquiryService";
import { useNavigate } from "react-router-dom";

function InvoiceCreditCardSelectionTemplate() {
  const { pageNumber, selectedId, selectedPK } = useSelector((state) => state.creditCardEnquirySlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Handler Functions */

  // Close
  const handleClose = () => {
    navigate(`/`);
    dispatch(resetFields());
  };

  return (
    <QuarterScreenWrapper>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleClose}
        >
          Close
        </button>
      </div>
      <>
        <InvoiceCreditCardSelection />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            disabled={selectedPK || selectedId ? false : true}
            onClick={() => {
              navigate(`/credit-card-enquiry/view/${selectedPK ? selectedPK : selectedId}/${pageNumber}`);
              dispatch(setCreditCardEnquiryView([]));
            }}
          >
            Next
          </button>
        </div>
      </div>
    </QuarterScreenWrapper>
  );
}

export default InvoiceCreditCardSelectionTemplate;
