import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  resetReturn,
  setDelayReturnByDriver,
  setMiscDeliveryDetails,
  setMiscPickupDetails,
  setReturnDetails,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import { emailRegex } from "../../../../../utils/validation/EmailRegex";
import { useAppNavigate } from "../../../../../hooks/useAppNavigate";

const PickupFooter = () => {
  const navigate = useNavigate();
  const { goBack } = useAppNavigate();

  const { unitfk, driverfk, companyName, delayedUnitPK } = useParams();
  const isMiscDelivery = useSelector((state) => state.delayProcessing.isMiscDelivery);
  const returnDetails = useSelector((state) => state.delayProcessing.returnDetails);
  const miscPickupAddr = useSelector((state) => state.delayProcessing.miscPickupDetails);
  const data = useSelector((state) => state.delayProcessing.data);

  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the page was reloaded
    if (sessionStorage.getItem("reloaded") === "true") {
      // If it's a reload, navigate to the return page
      navigate(
        "/delay-return-details/" +
          String(companyName)?.trim() +
          "/" +
          unitfk +
          "/" +
          driverfk +
          "/" +
          delayedUnitPK
      );
    } else {
      // Mark that the page has been loaded
      sessionStorage.setItem("reloaded", "true");
    }

    // Cleanup sessionStorage when the component unmounts
    return () => {
      sessionStorage.removeItem("reloaded");
    };
  }, [navigate]);

  useEffect(() => {
    if (!data) {
      navigate(
        "/delay-return-details/" +
          String(companyName)?.trim() +
          "/" +
          Number(unitfk) +
          "/" +
          Number(driverfk) +
          "/" +
          delayedUnitPK
      );
    }
  }, [data]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            if (isMiscDelivery && !returnDetails?.isPickupLocationChecked) {
              navigate(
                "/delay-return-delivery/" +
                  String(companyName)?.trim() +
                  "/" +
                  unitfk +
                  "/" +
                  driverfk +
                  "/" +
                  delayedUnitPK
              );
            } else {
              navigate(
                "/delay-return-miles/" +
                  String(companyName)?.trim() +
                  "/" +
                  unitfk +
                  "/" +
                  driverfk +
                  "/" +
                  delayedUnitPK
              );
            }
          }}
          disabled={
            !(
              miscPickupAddr?.name &&
              miscPickupAddr?.address1 &&
              miscPickupAddr?.postalcodePK &&
              miscPickupAddr?.phone &&
              miscPickupAddr?.phone?.length === 13 &&
              miscPickupAddr?.deliveryContact &&
              miscPickupAddr?.deliveryContactPhone?.length === 13 &&
              (miscPickupAddr?.openSunday ||
                miscPickupAddr?.openMonday ||
                miscPickupAddr?.openTuesday ||
                miscPickupAddr?.openWednesday ||
                miscPickupAddr?.openThursday ||
                miscPickupAddr?.openFriday ||
                miscPickupAddr?.openSaturday)
            ) ||
            (miscPickupAddr?.email && !emailRegex.test(miscPickupAddr?.email))
          }
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
            dispatch(resetReturn());
            dispatch(setMiscPickupDetails(null));
            dispatch(setMiscDeliveryDetails(null));
            dispatch(setReturnDetails(null));
            dispatch(setDelayReturnByDriver(false));

            navigate(
              "/delay-return-details/" +
                String(companyName)?.trim() +
                "/" +
                unitfk +
                "/" +
                driverfk +
                "/" +
                delayedUnitPK
            );
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PickupFooter;
