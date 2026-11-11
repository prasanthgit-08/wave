import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setPageNumber,
  setSelectedUnitCompanyName,
  setSelectedUnitCompanyFK,
  setReasonForShuttleDelay,
  setAuthorizedByForShuttleDelay,
  setDriverFKForShuttleDelay,
  setUserFKForShuttleDelay,
  setReportedByForShuttleDelay,
  setDateReportedForShuttleDelay,
  setReportingDriverName,
  setReportingUsername,
  setUnitNumberLast5,
  setUnitNumberPK,
  setPickupCityIDForPlantToYard,
  setDeliveryYardIDForPlantToYard,
  setUnitNumberInput,
  setSpecialCodeOfSelectedUnit,
  setIsSelectedUnitTowable,
  setIsSelectedUnitMotorized,
  setChangeColor,
  setSavedSuccessForShuttleDelay,
} from "../../../../../redux/YardCheckinSlice";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
function ShuttleDelayFooter() {
  //navigate, dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Get value from redux
  const unitDefaultCompanyName = useSelector((state) => state.yardCheckinReducer.unitDefaultCompanyName);
  const selectedUnitCompanyName = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyName);
  const unitNumberSelected = useSelector((state) => state.yardCheckinReducer.unitNumberInput);
  const unitNumberFK = useSelector((state) => state.yardCheckinReducer.unitNumberPK);
  const reasonForShuttleDelay = useSelector((state) => state.yardCheckinReducer.reasonForShuttleDelay);
  const authorizedByForShuttleDelay = useSelector(
    (state) => state.yardCheckinReducer.authorizedByForShuttleDelay
  );
  const driverFKForShuttleDelay = useSelector((state) => state.yardCheckinReducer.driverFKForShuttleDelay);
  const reportingDriverName = useSelector((state) => state.yardCheckinReducer.reportingDriverName);
  const userFKForShuttleDelay = useSelector((state) => state.yardCheckinReducer.userFKForShuttleDelay);
  const reportingUsername = useSelector((state) => state.yardCheckinReducer.reportingUsername);
  const reportedByForShuttleDelay = useSelector(
    (state) => state.yardCheckinReducer.reportedByForShuttleDelay
  );
  const dateReportedForShuttleDelay = useSelector(
    (state) => state.yardCheckinReducer.dateReportedForShuttleDelay
  );
  const notesForShuttleDelay = useSelector((state) => state.yardCheckinReducer.notesForShuttleDelay);
  const isShuttleDateValid = useSelector((state) => state.yardCheckinReducer.isShuttleDateValid);

  //modal pop up
  const [modalPopup, setModalPopUp] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cancelShow, setCancelShow] = useState(false);
  //Loader
  const [loader, setLoader] = useState(false);

  const unitShuttleDelaysVO = {
    unitFK: unitNumberFK,
    reason: reasonForShuttleDelay,
    authorizedBy: authorizedByForShuttleDelay,
    reportingDriverFK: unitDefaultCompanyName === selectedUnitCompanyName ? driverFKForShuttleDelay : "",
    reportingUserFK: unitDefaultCompanyName === selectedUnitCompanyName ? userFKForShuttleDelay : "",
    reportedBy:
      unitDefaultCompanyName !== selectedUnitCompanyName && reportedByForShuttleDelay === ""
        ? reportingDriverName || reportingUsername
        : reportedByForShuttleDelay,
    delayDate: dateReportedForShuttleDelay,
    notes: notesForShuttleDelay,
    selectedUnitCompanyName: selectedUnitCompanyName,
    checkCrossDB: unitDefaultCompanyName === selectedUnitCompanyName ? false : true,
  };

  const saveUnitShuttlesRecord = () => {
    // Show the loader
    setLoader(true);
    YardCheckinService.unitShuttleDelaySave(unitShuttleDelaysVO)
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
      });
  };

  //Onclick function for Save Button
  const handleSaveOnClick = () => {
    saveUnitShuttlesRecord();
  };

  //Onclick function for Cancel Button
  const handleCancelOnClick = () => {
    reset();
    navigate("/yard-checkin-unit-selection");
    setCancelShow(false);
    toast.success("Changes Cancelled");
  };

  //Reset
  const reset = () => {
    dispatch(setPageNumber(0));
    dispatch(setSelectedUnitCompanyName(""));
    dispatch(setSelectedUnitCompanyFK(""));
    //Clear selected unit
    dispatch(setPickupCityIDForPlantToYard(""));
    dispatch(setDeliveryYardIDForPlantToYard(""));
    dispatch(setUnitNumberLast5(""));
    dispatch(setChangeColor(false));
    dispatch(setUnitNumberPK(""));
    dispatch(setUnitNumberInput(""));
    dispatch(setSpecialCodeOfSelectedUnit(""));
    dispatch(setIsSelectedUnitTowable(""));
    dispatch(setIsSelectedUnitMotorized(""));
    dispatch(setReasonForShuttleDelay(""));
    dispatch(setAuthorizedByForShuttleDelay(""));
    dispatch(setDriverFKForShuttleDelay(""));
    dispatch(setUserFKForShuttleDelay(""));
    dispatch(setReportedByForShuttleDelay(""));
    dispatch(setDateReportedForShuttleDelay(""));
    dispatch(setReportingDriverName(""));
    dispatch(setReportingUsername(""));
    navigate("/yard-checkin-unit-selection");
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
      dispatch(setSavedSuccessForShuttleDelay(true));
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
            loader === false &&
            unitNumberSelected !== "" &&
            reasonForShuttleDelay?.trim() !== "" &&
            authorizedByForShuttleDelay?.trim() !== "" &&
            (driverFKForShuttleDelay !== "" ||
              userFKForShuttleDelay !== "" ||
              reportedByForShuttleDelay?.trim() !== "") &&
            dateReportedForShuttleDelay !== "" &&
            isShuttleDateValid
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
        body={
          saveError === true
            ? errorMessage
            : "Shuttle Delay details for the selected unit saved successfully."
        }
        handleOK={warningPopupModalHide}
        showOK={true}
        color={saveError === true ? "red" : "Black"}
      />
      <WarningModalPopUp
        show={cancelShow}
        onHide={() => {
          setCancelShow(false);
        }}
        title={"Cancel Unit Shuttle Delay Changes"}
        body={"Please confirm you want to cancel your changes."}
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

export default ShuttleDelayFooter;
