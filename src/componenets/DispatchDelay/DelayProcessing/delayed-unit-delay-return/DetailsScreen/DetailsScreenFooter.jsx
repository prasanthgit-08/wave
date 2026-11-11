import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  resetReturn,
  setDelayReturnByDriver,
  setMiscDeliveryDetails,
  setMiscPickupDetails,
  setReturnDetails,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import { setMiscPickupID } from "../../../../../redux/OrderEntryFilterSlice";

const DetailsScreenFooter = () => {
  const navigate = useNavigate();

  const { companyName, driverfk, unitfk, delayedUnitPK } = useParams();
  const isMiscPickup = useSelector((state) => state.delayProcessing.isMiscPickup);
  const isMiscDelivery = useSelector((state) => state.delayProcessing.isMiscDelivery);
  const returnDetails = useSelector((state) => state.delayProcessing.returnDetails);
  const defaultPickupDealerFK = useSelector((state) => state.delayProcessing.defaultPickupDealerFK);
  const defaultDealerFK = useSelector((state) => state.delayProcessing.defaultDealerFK);
  const currentPlantId = useSelector((state) => state.delayProcessing.currentPlantId);
  const pickupPlantId = useSelector((state) => state.delayProcessing.pickupPlantId);
  const [cancel, setCancel] = useState(false);
  const dispatch = useDispatch();
  // window.history.pushState(null, "", window.location.href);

  const handleCancelYes = () => {
    setCancel(true);
    dispatch(setReturnDetails(null));
    dispatch(resetReturn());
    dispatch(setMiscPickupDetails(null));
    dispatch(setMiscDeliveryDetails(null));
    dispatch(setDelayReturnByDriver(false));
    toast.success("Changes Cancelled");
  };

  useEffect(() => {
    if (cancel) {
      dispatch(setReturnDetails(null));
    }
  }, [cancel]);
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          disabled={
            !(
              defaultDealerFK ||
              returnDetails?.isCurrentLocationChecked ||
              currentPlantId ||
              returnDetails?.dealerRefused ||
              isMiscPickup
            ) ||
            !(
              returnDetails?.isPickupLocationChecked ||
              defaultPickupDealerFK ||
              pickupPlantId ||
              isMiscDelivery
            )
          }
          onClick={() => {
            if (
              isMiscPickup &&
              (returnDetails?.isCurrentLocationChecked || defaultDealerFK || currentPlantId) &&
              !returnDetails?.dealerRefused
            ) {
              navigate(
                "/delay-return-pickup/" +
                  String(companyName)?.trim() +
                  "/" +
                  unitfk +
                  "/" +
                  driverfk +
                  "/" +
                  delayedUnitPK
              );
            } else if (
              isMiscDelivery &&
              (returnDetails?.isPickupLocationChecked || pickupPlantId || defaultPickupDealerFK) &&
              !returnDetails?.isPickupLocationChecked
            ) {
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
            dispatch(setMiscPickupID(null));
          }}
        >
          Next
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            handleCancelYes();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DetailsScreenFooter;
