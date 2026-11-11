import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetUnitSelectionFilters } from "../../../../redux/EditMaster/UnitSelectionSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  resetReturn,
  setDelayReturnByDriver,
  setMiscDeliveryDetails,
  setMiscPickupDetails,
  setReturnDetails,
} from "../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";

const DelayReturnHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { unitfk, driverfk, companyName, delayedUnitPK } = useParams();
  const selectedCompanyName = useSelector((state) => state.unitSelection.selectedCompanyName);
  const returnValidEntry = useSelector((state) => state.delayProcessing.returnValidEntry);

  useEffect(() => {
    if (!returnValidEntry) {
      navigate(
        "/delay-processing/delayed-details/" +
          String(companyName)?.trim() +
          "/" +
          unitfk +
          "/" +
          driverfk +
          "/" +
          delayedUnitPK
      );
    }
  }, [returnValidEntry]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            dispatch(resetReturn());
            dispatch(setDelayReturnByDriver(false));
            dispatch(setReturnDetails(null));
            dispatch(setMiscPickupDetails(null));
            dispatch(setMiscDeliveryDetails(null));
            navigate(
              "/delay-processing/delayed-details/" +
                String(selectedCompanyName)?.trim() +
                "/" +
                unitfk +
                "/" +
                driverfk +
                "/" +
                delayedUnitPK
            );
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DelayReturnHeader;
