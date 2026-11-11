import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDispatches,
  setIndex,
  setMultiUnitsMap,
  setPageNumber,
  setSelectedDispatchPK,
  setSelectedDispatchPKList,
  setSelectedUnitMultiLoadFK,
} from "../../../../../../../../redux/DispatchesSlice";
import ModalComponent from "../../../../../../../common/ModalComponent";
function UnitBrowseFooter() {
  const navigate = useNavigate();
  const driverData = useSelector((state) => state.dispatchesReducer.driverData);
  const selectedDispatchPK = useSelector((state) => state.dispatchesReducer.selectedDispatchPK);
  const selectedDispatchPKList = useSelector((state) => state.dispatchesReducer.selectedDispatchPKList);
  const currentURL = window.location.pathname;
  const individualUnitConfirmationVO = useSelector(
    (state) => state.dispatchesReducer.individualUnitConfirmationVO
  );
  const individualUnitConfirmationVOList = useSelector(
    (state) => state.dispatchesReducer.individualUnitConfirmationVOList
  );
  const dispatch = useDispatch();
  const totalUnitsCountRedux = useSelector((state) => state.dispatchesReducer.totalUnitsCountRedux);
  let totalCurrentUnitsCount = useSelector((state) => state.dispatchesReducer.totalCurrentUnitsCount);
  let multiUnitsMap = useSelector((state) => state.dispatchesReducer.multiUnitsMap);
  let unitBrowseMap = useSelector((state) => state.dispatchesReducer.unitBrowseMap);
  let [isAnyMultiUnitSelected, setIsAnyMultiUnitSelected] = useState(false);
  const division = useSelector((state) => state.dispatchesReducer.divisionStatus);
  const canadianPickup = useSelector((state) => state.dispatchesReducer.canadianPickup);
  const canadianDelivery = useSelector((state) => state.dispatchesReducer.canadianDelivery);
  const codriver = useSelector((state) => state.dispatchesReducer.codriver);
  const bobTaildriver = useSelector((state) => state.dispatchesReducer.bobTaildriver);
  const hasCodriverOrBobtaildriverPassport = useSelector(
    (state) => state.dispatchesReducer.hasCodriverOrBobtaildriverPassport
  );
  const ratePerMile = useSelector((state) => state.dispatchesReducer.ratePerMile);
  const [enablePopup, setEnablePopup] = useState(false);
  const [msg, setMsg] = useState("");
  const handlePrevious = () => {
    if (currentURL === `/reload-unit-browse`) {
      dispatch(setPageNumber(0));
      dispatch(setSelectedDispatchPK(null));
      dispatch(setMultiUnitsMap(null));
      dispatch(setSelectedDispatchPKList([]));
      navigate(`/driver-dispatch-reload/${driverData?.driverPK}`);
    } else if (currentURL === `/outbound-unit-browse`) {
      dispatch(setPageNumber(0));
      dispatch(setSelectedDispatchPK(null));
      dispatch(setMultiUnitsMap(null));
      dispatch(setSelectedDispatchPKList([]));
      navigate(`/driver-dispatch-outbound/${driverData?.driverPK}`);
    } else {
      dispatch(setPageNumber(0));
      dispatch(setSelectedDispatchPK(null));
      dispatch(setMultiUnitsMap(null));
      dispatch(setSelectedDispatchPKList([]));
      dispatch(setSelectedUnitMultiLoadFK(null));
      dispatch(setIndex(0));
      navigate(`/driver-dispatch-flatbed/${driverData?.driverPK}`);
    }
  };

  const handleCanadianPickupOrDelivery = () => {
    let driverString = "Driver";
    setEnablePopup(true);
    if (codriver) {
      driverString = "Co driver " + codriver;
    } else {
      if (bobTaildriver) {
        driverString = "Bobtail driver " + bobTaildriver;
      }
    }
    setMsg(
      driverString +
        " can not accompany the Primary Driver " +
        driverData.firstName +
        " " +
        (driverData.lastName ? driverData.lastName : "") +
        " for " +
        (canadianDelivery ? "Canadian Delivery" : "Canadian Pickup") +
        " since he does not have passport. Do you want to continue dispatching? "
    );
  };
  const handleYes = () => {
    if (selectedDispatchPK != null) {
      navigate("/single-unit-confirmation");
    }
    setEnablePopup(false);
  };

  const handleNo = () => {
    setEnablePopup(false);
  };
  const handleContinue = () => {
    if (currentURL === `/reload-unit-browse` || currentURL === `/outbound-unit-browse`) {
      if ((canadianDelivery || canadianPickup) && !hasCodriverOrBobtaildriverPassport) {
        handleCanadianPickupOrDelivery();
      } else {
        if (selectedDispatchPK != null) {
          navigate("/single-unit-confirmation");
        }
      }
    } else if (currentURL === "/flatbed-unit-browse") {
      if ((canadianDelivery || canadianPickup) && !hasCodriverOrBobtaildriverPassport) {
        handleCanadianPickupOrDelivery();
      } else {
        if (selectedDispatchPKList != null && selectedDispatchPKList.length > 0) {
          navigate("/flatbed-unit-confirmation");
        }
      }
    }
  };
  useEffect(() => {
    let isAnyMultiUnitSelected = false;
    selectedDispatchPKList.forEach((dispatchPK) => {
      if (unitBrowseMap.get(dispatchPK)?.MultiDispatch === true) {
        isAnyMultiUnitSelected = true;
      }
    });
    setIsAnyMultiUnitSelected(isAnyMultiUnitSelected);
  }, [selectedDispatchPKList]);
  const handleCancel = () => {
    if (
      currentURL === `/reload-unit-browse` ||
      currentURL === `/outbound-unit-browse` ||
      currentURL === `/flatbed-unit-browse`
    ) {
      dispatch(resetDispatches());

      navigate(`/driver-dispatch/${driverData?.driverPK}`);
    }
  };

  useEffect(() => {
    if (!driverData) {
      navigate(`/driver-service-selection`);
    }
  }, [driverData]);

  const isSingleUnitBrowse = currentURL === `/reload-unit-browse` || currentURL === `/outbound-unit-browse`;
  const isFlatbedUnitBrowse = currentURL === `/flatbed-unit-browse`;

  const hasZeroRatePerMileInSelection = selectedDispatchPKList?.some(
    (dispatchPK) => Number(unitBrowseMap?.get(dispatchPK)?.RatePerMile) === 0
  );

  const isContinueDisabled =
    (isSingleUnitBrowse && (!selectedDispatchPK || Number(ratePerMile) === 0)) ||
    (isFlatbedUnitBrowse && (!selectedDispatchPKList?.length || hasZeroRatePerMileInSelection));

  return (
    <div className="d-flex  align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      {division === "flatbed" || division === "popup" || division === "truckCamper" ? (
        <>
          <div style={{ flexGrow: 1, textAlign: "left", paddingLeft: "70px" }}>
            <label style={{ marginRight: "10px" }}>Total Units</label>
            <input
              style={{ marginRight: "10px" }}
              type="text"
              value={
                multiUnitsMap
                  ? Array.from(multiUnitsMap.values()).some((value) => value === true)
                    ? isAnyMultiUnitSelected
                      ? totalUnitsCountRedux
                      : division === "flatbed"
                        ? 2
                        : division === "popup"
                          ? 10
                          : 5
                    : 0
                  : 0
              }
            ></input>
            <label style={{ marginRight: "20px" }}>Current Units</label>
            <input
              type="text"
              value={
                multiUnitsMap
                  ? Array.from(multiUnitsMap.values()).some((value) => value === true)
                    ? selectedDispatchPKList.length
                    : 0
                  : 0
              }
            ></input>
          </div>
          <div className="d-flex align-items-center flex-wrap">
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              onClick={handlePrevious}
            >
              Previous
            </button>

            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              disabled={isContinueDisabled}
              onClick={handleContinue}
            >
              Continue
            </button>

            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              hidden={false}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex align-items-center flex-wrap">
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              onClick={handlePrevious}
            >
              Previous
            </button>

            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              disabled={isContinueDisabled}
              onClick={handleContinue}
            >
              Continue
            </button>

            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type=""
              hidden={false}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <ModalComponent
              show={enablePopup}
              onHide={handleNo}
              title={"Warning"}
              body={msg}
              handleYES={handleYes}
              handleNO={handleNo}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default UnitBrowseFooter;
