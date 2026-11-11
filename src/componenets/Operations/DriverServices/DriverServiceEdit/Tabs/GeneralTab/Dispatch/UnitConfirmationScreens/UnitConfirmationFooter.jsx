import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setDispatchViewObject,
  setUnitDatesFlag,
  resetDispatches,
  setRigionStatus,
  setIsNext,
  setIsPrevious,
  setIndex,
  setPageNumber,
  setSelectedDispatchPK,
} from "../../../../../../../../redux/DispatchesSlice";
import DispatchesService from "../../../../../../../../services/DispatchesService";
import ModalComponent from "../../../../../../../../componenets/common/ModalComponent";
import LoadingIcon from "../../../../../../../../componenets/common/LoadingIcon";

function UnitConfirmationFooter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dispatchLoader, setDispatchLoader] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const unitDates = useSelector((state) => state.dispatchesReducer.unitDatesFlag);
  const dispatchViewData = useSelector((state) => state.dispatchesReducer.dispatchViewObject);
  const estimatedPickupDate = useSelector((state) => state.dispatchesReducer.pickupDate);
  const estimatedDeliveryDate = useSelector((state) => state.dispatchesReducer.deliveryDate);
  const driverData = useSelector((state) => state.dispatchesReducer.driverData);
  const totalFee = useSelector((state) => state.dispatchesReducer.totalFee);
  const poeFK = useSelector((state) => state.dispatchesReducer.selectedPOE);
  const division = useSelector((state) => state.dispatchesReducer.divisionStatus);
  const region = useSelector((state) => state.dispatchesReducer.regionStatus);
  const selectedTruck = useSelector((state) => state.dispatchesReducer.selectedTruckPK);
  const selectedTrailer = useSelector((state) => state.dispatchesReducer.selectedTrailerPK);
  const gvwrEligibleTrucks = useSelector((state) => state.dispatchesReducer.gvwrEligibleTrucks);
  const eligibleTrailerPKSMap = useSelector((state) => state.dispatchesReducer.eligibleTrailerPKSMap);
  const rateFromRedux = useSelector((state) => state.dispatchesReducer.ratePerMile);
  const rateObjFromRedux = useSelector((state) => state.dispatchesReducer.rateObj);
  const isFlatRatedFrmRedux = useSelector((state) => state.dispatchesReducer.flatRated);
  const isMultiUnitDispatch = useSelector((state) => state.dispatchesReducer.isMultiUnitDispatch);
  const requireFlatbedFromBackEnd = useSelector((state) => state.dispatchesReducer.requireFlatbedFromBackEnd);

  const disableDispatchButton = useSelector((state) => state.dispatchesReducer.disableDispatch);
  const reloadCountWithOutbound = useSelector((state) => state.dispatchesReducer.reloadCountWithOutbound);
  const trailerDisabled = useSelector((state) => state.dispatchesReducer.isTrailerDisable);

  const [cancelSwitch, setCancelSwitch] = useState(false);
  const [doReloadWithOutbound, setDoReloadWithOutbound] = useState(false);
  const hasPrevious = useSelector((state) => state.dispatchesReducer.hasPrevious);
  const hasNext = useSelector((state) => state.dispatchesReducer.hasNext);
  const isPrevious = useSelector((state) => state.dispatchesReducer.isPrevious);
  const isNext = useSelector((state) => state.dispatchesReducer.isNext);
  const index = useSelector((state) => state.dispatchesReducer.index);
  const multiUnitBrowseDataMap = useSelector((state) => state.dispatchesReducer.multiUnitBrowseDataMap);
  let selectedDispatchPKList = useSelector((state) => state.dispatchesReducer.selectedDispatchPKList);
  const individualUnitSaveVOList = useSelector((state) => state.dispatchesReducer.individualUnitSaveVOList);
  const handleCancel = () => {
    setCancelSwitch(true);
  };

  const handlePrevious = () => {
    dispatch(setDispatchViewObject(null));
    if (division !== "flatbed" && division !== "popup" && division !== "truckCamper") {
      if (region === "reload") navigate("/reload-unit-browse");
      else navigate("/outbound-unit-browse");
    } else {
      navigate("/flatbed-unit-browse");
    }
    dispatch(setIndex(0));
  };

  const handlePreviousOfUnitDates = () => {
    dispatch(setUnitDatesFlag(false));
    if (division === "driveaway" || division === "towaway") {
      navigate("/single-unit-confirmation");
    } else {
      navigate("/flatbed-unit-confirmation");
    }
  };

  const handleContinue = () => {
    if (
      (dispatchViewData?.canadianDelivery && !dispatchViewData?.canadianPickup) ||
      (dispatchViewData?.canadianPickup && !dispatchViewData?.canadianDelivery)
    ) {
      navigate("/driver-dispatch/port-of-entry-selection");
    } else {
      dispatch(setUnitDatesFlag(true));
      if (division === "driveaway" || division === "towaway") {
        navigate("/single-unit-confirmation");
      } else {
        navigate("/flatbed-unit-confirmation");
      }
    }
  };

  const handleDispatch = () => {
    setDispatchLoader(true);
    if (division !== "flatbed" && division !== "popup" && division !== "truckCamper") {
      DispatchesService.saveDispatchRecord(
        dispatchViewData,
        estimatedPickupDate,
        estimatedDeliveryDate,
        driverData,
        totalFee,
        poeFK,
        division,
        region,
        selectedTruck,
        rateObjFromRedux,
        isFlatRatedFrmRedux,
        selectedTrailer,
        trailerDisabled
      )
        .then((response) => {
          setDispatchLoader(false);
          setSaveFailed(false);
          setSaveSuccess(true);
        })
        .catch((err) => {
          setDispatchLoader(false);
          setSaveSuccess(false);
          setSaveFailed(true);
        });
    } else {
      DispatchesService.saveMultiDispatchRecords(
        dispatchViewData,
        estimatedPickupDate,
        estimatedDeliveryDate,
        driverData,
        poeFK,
        division,
        region,
        selectedTruck,
        individualUnitSaveVOList,
        selectedTrailer
      )
        .then((response) => {
          setDispatchLoader(false);
          setSaveFailed(false);
          setSaveSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setDispatchLoader(false);
          setSaveSuccess(false);
          setSaveFailed(true);
        });
    }
  };
  const handleSuccess = () => {
    if (reloadCountWithOutbound === "0" || !reloadCountWithOutbound) {
      dispatch(resetDispatches());
      navigate(`/driver-service-selection/${driverData?.driverPK}/form`);
    } else {
      if (region === "outbound") {
        dispatch(setRigionStatus("reload"));
        setDoReloadWithOutbound(true);
        dispatch(setSelectedDispatchPK(null));
      }
    }
    setSaveSuccess(false);
  };
  const handlePreviousUnitButton = () => {
    dispatch(setIsPrevious(true));
  };

  const handleNextUnitButton = () => {
    dispatch(setIsNext(true));
  };

  useEffect(() => {
    if (isNext) {
      dispatch(setIndex(index + 1));
    }
    if (isPrevious) {
      dispatch(setIndex(index - 1));
    }
  }, [driverData, isNext, isPrevious]);

  const handleError = () => {
    setSaveFailed(false);
  };
  const handleYes = () => {
    dispatch(resetDispatches());
    navigate(`/driver-dispatch/${driverData?.driverPK}`);
  };

  const handleNo = () => {
    setCancelSwitch(false);
  };
  const handleReloadWithOutbound = () => {
    dispatch(setUnitDatesFlag(false));
    dispatch(setPageNumber(0));
    navigate("/reload-unit-browse");
    setDoReloadWithOutbound(false);
  };

  const handleNoReloadWithOutbound = () => {
    dispatch(resetDispatches());
    navigate(`/driver-service-selection/${driverData?.driverPK}/form`);
    setDoReloadWithOutbound(false);
  };

  useEffect(() => {
    if (!driverData || driverData?.length === 0) {
      navigate("/driver-service-selection");
    }
  }, [driverData]);

  return (
    <div className="d-flex  align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        {unitDates ? (
          <>
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              onClick={() => {
                handlePreviousOfUnitDates();
              }}
            >
              Previous
            </button>
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              onClick={() => {
                handleDispatch();
              }}
              disabled={
                disableDispatchButton ||
                (gvwrEligibleTrucks !== null && gvwrEligibleTrucks.size === 0) ||
                (eligibleTrailerPKSMap !== null && eligibleTrailerPKSMap.size === 0)
              }
            >
              Dispatch
            </button>
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              onClick={() => {
                handleCancel();
              }}
            >
              Cancel
            </button>
          </>
        ) : isMultiUnitDispatch ? (
          <>
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              onClick={() => {
                handleNextUnitButton();
              }}
              disabled={!hasNext}
            >
              Next Unit
            </button>
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              onClick={() => {
                handlePreviousUnitButton();
              }}
              disabled={!hasPrevious}
            >
              Previous Unit
            </button>
            <input type="text" value={index + 1 + " of " + selectedDispatchPKList.length}></input>
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              onClick={() => {
                handlePrevious();
              }}
            >
              {" "}
              Previous
            </button>
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              onClick={() => {
                handleContinue();
              }}
              disabled={
                rateFromRedux === 0 ||
                dispatchViewData?.payMiles === 0 ||
                (division === "towaway" && (gvwrEligibleTrucks === null || gvwrEligibleTrucks.length === 0))
              }
            >
              {" "}
              Continue
            </button>
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              onClick={() => {
                handleCancel();
              }}
            >
              {" "}
              Cancel
            </button>
          </>
        ) : (
          <>
            {division === "towaway" && requireFlatbedFromBackEnd && (
              <button
                className="btn btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                style={{ backgroundColor: "transparent", pointerEvents: "none" }}
              >
                1 of 1
              </button>
            )}
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              onClick={() => {
                handlePrevious();
              }}
            >
              {" "}
              Previous
            </button>

            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              onClick={() => {
                handleContinue();
              }}
              disabled={
                dispatchViewData?.amount === 0 ||
                dispatchViewData?.payMiles === 0 ||
                (division === "towaway" && (gvwrEligibleTrucks === null || gvwrEligibleTrucks.length === 0))
              }
            >
              {" "}
              Continue
            </button>
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              onClick={() => {
                handleCancel();
              }}
            >
              {" "}
              Cancel
            </button>
          </>
        )}
        ;{dispatchLoader === true && <LoadingIcon />}
        <ModalComponent
          show={cancelSwitch}
          onHide={handleNo}
          title={"Confirm Cancelling Dispatch"}
          body={"Do you want to cancel dispatching"}
          handleYES={handleYes}
          handleNO={handleNo}
        />
        <ModalComponent
          show={saveSuccess}
          onHide={handleSuccess}
          title={"Success"}
          body={
            division === "towaway"
              ? "Towaway dispatch record saved successfully "
              : division === "driveaway"
                ? "Driveaway dispatch record saved successfully"
                : division === "flatbed"
                  ? "Flatbed Multi Unit dispatch records saved successfully"
                  : division === "popup"
                    ? "Popup Multi Unit dispatch records saved successfully"
                    : "Truck Camper Multi Unit dispatch records saved successfully"
          }
          okayButton
          handleOK={handleSuccess}
        />
        <ModalComponent
          show={saveFailed}
          onHide={handleError}
          title={"Error"}
          body={"Could not save dispatch record"}
          okayButton
          showError
          handleOK={handleError}
        />
        <ModalComponent
          show={doReloadWithOutbound}
          onHide={handleNoReloadWithOutbound}
          title={reloadCountWithOutbound + " Reloads can be done along with this outbound dispatch."}
          body={"Do you want to continue reload dispatching with this outbound ?"}
          handleYES={handleReloadWithOutbound}
          handleNO={handleNoReloadWithOutbound}
        />
      </div>
    </div>
  );
}

export default UnitConfirmationFooter;
