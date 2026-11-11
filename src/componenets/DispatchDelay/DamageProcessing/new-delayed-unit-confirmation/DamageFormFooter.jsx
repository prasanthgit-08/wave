import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCustomerNotes,
  setDelayContactExtension,
  setDelayContactFAX,
  setDelayContactPhone,
  setDelayCustomerNotes,
  setDelayInHouseNotes,
  setDeliveryCheck,
  setEditFlag,
  setInHouseNotes,
  setViewOnly,
} from "../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import toast from "react-hot-toast";

const DamageFormFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCompanyName, setCompanyName] = useState(() => {
    // Initialize state from localStorage
    return localStorage.getItem("selectedCompany");
  });
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={() => {
            dispatch(setViewOnly(false));
            dispatch(setDeliveryCheck(false));
            dispatch(setDelayContactPhone(null));
            dispatch(setDelayContactExtension(null));
            dispatch(setDelayContactFAX(null));
            dispatch(setDelayInHouseNotes(null));
            dispatch(setDelayCustomerNotes(null));
            dispatch(setInHouseNotes(null));
            dispatch(setCustomerNotes(null));
            dispatch(setEditFlag(false));
            navigate(
              "/delay-processing/unit-details/" +
                selectedCompanyName +
                "/" +
                Number(rowData?.unitPK) +
                "/" +
                Number(rowData?.driverFK)
            );
          }}
          type="button"
        >
          Delay
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
        >
          Breakdown
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
        >
          Damage
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={() => {
            navigate(-1); // Go back to the previous page
            toast.success("Changes Cancelled");
          }}
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DamageFormFooter;
