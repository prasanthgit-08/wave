import { formatForApi } from "../../../../../utils/dateUtils";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setPageNumber,
  setSelectedUnitCompanyName,
  setSelectedUnitCompanyFK,
  setUnitNumberLast5,
  setUnitNumberPK,
  setUnitNumberInput,
  setUnitShuttlesPK,
  setSecondShuttle,
  setTypeOfShuttle,
  setAdditionalReason,
  setSpecialCodeOfSelectedUnit,
  setIsSelectedUnitTowable,
  setIsSelectedUnitMotorized,
  setChangeColor,
  setShuttleAmountForYardToYard,
  setShuttleMilesForYardToYard,
  setShuttleDateForYardToYard,
  setPickupYardIDForYardToYard,
  setPickupYardNameForYardToYard,
  setPickupYardCodeForYardToYard,
  setDeliveryYardIDForYardToYard,
  setDeliveryYardNameForYardToYard,
  setDeliveryYardCodeForYardToYard,
  setIsYardToYardCombinationExist,
  setRowForYardToYard,
  setPositionForYardToYard,
  setSavedSuccessForYardToYard,
} from "../../../../../redux/YardCheckinSlice";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
import { setListingData, setSelectedId } from "../../../../../redux/YardCheckinSecondShuttleSlice";

function YardToYardFooter() {
  //navigate, dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const todayDate = formatForApi(new Date());

  //Get value from redux
  const unitShuttlesPK = useSelector((state) => state.yardCheckinReducer.unitShuttlesPK);
  const driverDefaultCompanyName = useSelector((state) => state.yardCheckinReducer.driverDefaultCompanyName);
  const selectedDriverCompany = useSelector(
    (state) => state.yardCheckinReducer.companyNameForDriverSelection
  );
  const selectedDriverFK = useSelector((state) => state.yardCheckinReducer.selectedDriverID);
  const selectedDriverCompanyFK = useSelector(
    (state) => state.yardCheckinReducer.companyNameFKForDriverSelection
  );
  const selectedDriverCompanyDetails = useSelector(
    (state) => state.yardCheckinReducer.selectedDriverCompanyDetails
  );
  const unitNumberFK = useSelector((state) => state.yardCheckinReducer.unitNumberPK);
  const selectedUnitCompanyName = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyName);
  const selectedUnitCompanyFK = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyFK);
  const isSelectedUnitTowable = useSelector((state) => state.yardCheckinReducer.isSelectedUnitTowable);
  const secondShuttle = useSelector((state) => state.yardCheckinReducer.secondShuttle);
  const additionalReason = useSelector((state) => state.yardCheckinReducer.additionalReason);
  const shuttleDate = useSelector((state) => state.yardCheckinReducer.shuttleDateForYardToYard);
  const shuttleAmount = useSelector((state) => state.yardCheckinReducer.shuttleAmountForYardToYard);
  const shuttleMilesForYardToYard = useSelector(
    (state) => state.yardCheckinReducer.shuttleMilesForYardToYard
  );
  const pickupYardIDForYardToYard = useSelector(
    (state) => state.yardCheckinReducer.pickupYardIDForYardToYard
  );
  const pickupYardCodeForYardToYard = useSelector(
    (state) => state.yardCheckinReducer.pickupYardCodeForYardToYard
  );
  const isYardToYardRouteConfirmed = useSelector(
    (state) => state.yardCheckinReducer.isYardToYardRouteConfirmed
  );
  const deliveryYardIDForYardToYard = useSelector(
    (state) => state.yardCheckinReducer.deliveryYardIDForYardToYard
  );
  const deliveryYardCodeForYardToYard = useSelector(
    (state) => state.yardCheckinReducer.deliveryYardCodeForYardToYard
  );
  const isYardToYardCombinationExist = useSelector(
    (state) => state.yardCheckinReducer.isYardToYardCombinationExist
  );
  const row = useSelector((state) => state.yardCheckinReducer.rowForYardToYard);
  const position = useSelector((state) => state.yardCheckinReducer.positionForYardToYard);
  const selectedId = useSelector((state) => state.yardCheckinSecondShuttleReducer.selectedId);
  const isShuttleDateValid = useSelector((state) => state.yardCheckinReducer.isShuttleDateValid);

  //modal pop up
  const [modalPopup, setModalPopUp] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //Loader
  const [loader, setLoader] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);

  const unitShuttlesVO = {
    unitShuttlePK: unitShuttlesPK,
    driverFK: {
      driverPK: selectedDriverFK,
    },
    driverCompanyFKInt: selectedDriverCompanyFK,
    unitFKInt: unitNumberFK,
    sisterUnitFK: driverDefaultCompanyName === selectedUnitCompanyName ? "" : unitNumberFK,
    unitCompanyFKInt: selectedUnitCompanyFK,
    posted: true,
    postDate: todayDate,
    secondShuttle: secondShuttle,
    secondShuttleHold: selectedDriverCompanyDetails?.approveAdditionalShuttlePay,
    secondShuttleReason: additionalReason,
    yardTransfer: true,
    pickupYardFK: {
      yardPK: pickupYardIDForYardToYard,
    },
    dropYardFK: {
      yardPK: deliveryYardIDForYardToYard,
    },
    pickupSisterYardCode: pickupYardCodeForYardToYard,
    dropSisterYardCode: deliveryYardCodeForYardToYard,
    amount: shuttleAmount,
    miles: shuttleMilesForYardToYard,
    towable: isSelectedUnitTowable,
    shuttleDate: shuttleDate,
    yardRow: row,
    yardPosition: position,
    source: "Shuttle Record",
    selectedDriverCompanyName: selectedDriverCompany,
    selectedUnitCompanyName: selectedUnitCompanyName,
    checkCrossDB:
      driverDefaultCompanyName === selectedDriverCompany && selectedDriverCompany === selectedUnitCompanyName
        ? false
        : true,
    defaultCompanyName: driverDefaultCompanyName,
    dispatchId: selectedId,
  };

  const saveUnitShuttlesRecord = () => {
    // Show the loader
    setLoader(true);
    YardCheckinService.saveUnitShuttlesRecord(unitShuttlesVO)
      .then((res) => {
        // Hide the loader
        setLoader(false);
        if (res.data !== "") {
          setModalPopUp(true);
        }
      })
      .catch((err) => {
        // Hide the loader
        setLoader(false);
        if (err.response) {
          // The request was made and the server responded with a status code
          setSaveError(true);
          setErrorMessage(err.response.data.errorMsg || "Sorry, something went wrong.Please try again.");
          setModalPopUp(true);
        } else if (err.request) {
          // The request was made but no response was received
          setSaveError(true);
          setErrorMessage("Sorry, it's unable to establish a connection to the remote service.");
          setModalPopUp(true);
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMessage(err.response.data.errorMsg || "Sorry, something went wrong.Please try again.");
        }

        setSaveError(true);
      })
      .finally(() => {
        dispatch(setSelectedId(null));
        dispatch(setListingData([]));
      });
  };

  //Onclick function for Save Button
  const handleSaveOnClick = () => {
    saveUnitShuttlesRecord();
  };

  //Onclick function for Cancel Button
  const handleCancelOnClick = () => {
    if (selectedId) {
      navigate("/yard-checkin-second-shuttle");
    } else {
      reset();
      navigate("/yard-checkin-unit-selection");
    }
    setCancelShow(false);
    toast.success("Changes Cancelled");
  };

  //Onclick function for Cancel Button
  const reset = () => {
    dispatch(setPageNumber(0));
    dispatch(setSelectedUnitCompanyName(""));
    dispatch(setSelectedUnitCompanyFK(""));
    //Clear selected unit
    dispatch(setUnitNumberLast5(""));
    dispatch(setChangeColor(false));
    dispatch(setUnitNumberPK(""));
    dispatch(setUnitNumberInput(""));
    dispatch(setSpecialCodeOfSelectedUnit(""));
    dispatch(setIsSelectedUnitTowable(""));
    dispatch(setIsSelectedUnitMotorized(""));
    dispatch(setUnitShuttlesPK(""));
    dispatch(setSecondShuttle(false));
    dispatch(setTypeOfShuttle(""));
    dispatch(setAdditionalReason(""));
    dispatch(setShuttleAmountForYardToYard(""));
    dispatch(setShuttleMilesForYardToYard(""));
    dispatch(setShuttleDateForYardToYard(""));
    dispatch(setPickupYardIDForYardToYard(""));
    dispatch(setPickupYardNameForYardToYard(""));
    dispatch(setPickupYardCodeForYardToYard(""));
    dispatch(setDeliveryYardIDForYardToYard(""));
    dispatch(setDeliveryYardNameForYardToYard(""));
    dispatch(setDeliveryYardCodeForYardToYard(""));
    dispatch(setIsYardToYardCombinationExist(""));
    dispatch(setRowForYardToYard(""));
    dispatch(setPositionForYardToYard(""));
    dispatch(setSelectedId(null));
    dispatch(setListingData([]));
  };

  //modal pop up
  const warningPopupModalHide = () => {
    if (saveError === true) {
      setLoader(false);
      setSaveError(false);
      setErrorMessage("");
      setModalPopUp(false);
    } else {
      setModalPopUp(false);
      reset();
      dispatch(setSavedSuccessForYardToYard(true));
      navigate("/yard-checkin-unit-selection");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        {/* Process Button */}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          disabled={
            unitNumberFK !== "" &&
            shuttleDate !== "" &&
            isShuttleDateValid &&
            pickupYardIDForYardToYard !== "" &&
            deliveryYardIDForYardToYard !== "" &&
            row !== "" &&
            isYardToYardCombinationExist === "" &&
            isYardToYardRouteConfirmed
              ? false
              : true
          }
          onClick={handleSaveOnClick}
        >
          {loader === true ? (
            <div className="loader-container">
              <div className="loader_YardCheckin"></div>
            </div>
          ) : (
            "Save"
          )}
        </button>

        {/* Cancel Button */}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => setCancelShow(true)}
        >
          Cancel
        </button>
      </div>
      <WarningModalPopUp
        show={modalPopup}
        onHide={warningPopupModalHide}
        title={saveError === true ? "Error" : "Success"}
        body={saveError === true ? errorMessage : "Yard To Yard shuttle data saved successfully."}
        handleOK={warningPopupModalHide}
        showOK={true}
        color={saveError === true ? "red" : "Black"}
      />
      <WarningModalPopUp
        show={cancelShow}
        onHide={() => {
          setCancelShow(false);
        }}
        title={"Cancel Yard To Yard Shuttle Changes"}
        body={"Please confirm you want to cancel your changes"}
        showYes={true}
        handleYES={handleCancelOnClick}
        showNo={true}
        handleNO={() => {
          setCancelShow(false);
        }}
      />
    </div>
  );
}

export default YardToYardFooter;
