import React, { useState } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import BulkReimbursementDetails from "./BulkReimbursementDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { updateField } from "../../../../redux/Invoicing/BulkUnitReimbursementSlice";

const BulkReimbursementDetailsTemplate = () => {
  const { bulkunitpk } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);

  const updateTabEditData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const [cancelShow, setCancelShow] = useState(false);

  const detailsData = useSelector((state) => state.bulkUnitReimbursementReducer.detailsData);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/bulk-reimbursement-invoice-selection");
    setCancelShow(false);
    toast.success("Changes Cancelled");
  };

  const handleClose = () => {
    navigate(`/`);
    setCloseShow(false);
    toast.success("Page Closed");
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
      <div className="col-xs-6"></div>
      <>
        <BulkReimbursementDetails />
      </>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            disabled={
              !(
                detailsData.description &&
                Number(detailsData.invoiceAmount) > 0 &&
                Number(detailsData.driverAmount) > 0
              )
            }
            onClick={() => {
              navigate(`/bulk-reimbursement-document/${bulkunitpk}`);
            }}
          >
            Next
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={handleCancel}
            label={"Cancel"}
          >
            Cancel
          </button>
        </div>
      </div>
    </QuarterScreenWrapper>
  );
};

export default BulkReimbursementDetailsTemplate;
