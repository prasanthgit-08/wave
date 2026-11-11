import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import {
  setPageNumber,
  setSelectedUnitCompanyName,
  setSelectedUnitCompanyFK,
  setShuttleAmountForPlantToYard,
  setShuttleMilesForPlantToYard,
  setShuttleDateForPlantToYard,
  setStatusForPlantToYard,
  setPickupCityIDForPlantToYard,
  setPickupCityNameForPlantToYard,
  setDeliveryYardIDForPlantToYard,
  setDeliveryYardNameForPlantToYard,
  setDeliveryYardCodeForPlantToYard,
  setIsCityYardCombinationExist,
  setRowForPlantToYard,
  setPositionForPlantToYard,
  setGvwrForPlantToYard,
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
} from "../../../../../redux/YardCheckinSlice";

const ActivationDelayFooter = () => {
  //navigate, dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const unitNumberFK = useSelector((state) => state.yardCheckinReducer.unitNumberPK);
  const selectedUnitCompanyName = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyName);
  const driverDefaultCompanyName = useSelector((state) => state.yardCheckinReducer.driverDefaultCompanyName);
  const selectedDriverCompany = useSelector(
    (state) => state.yardCheckinReducer.companyNameForDriverSelection
  );
  const reasonForActivationDelay = useSelector((state) => state.yardCheckinReducer.reasonForActivationDelay);

  //modal pop up
  const [modalPopup, setModalPopUp] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const unitShuttlesVO = {
    unitFKInt: unitNumberFK,
    reasonForActivationDelay: reasonForActivationDelay,
    selectedDriverCompanyName: selectedDriverCompany,
    selectedUnitCompanyName: selectedUnitCompanyName,
    checkCrossDB:
      driverDefaultCompanyName === selectedDriverCompany && selectedDriverCompany === selectedUnitCompanyName
        ? false
        : true,
    defaultCompanyName: driverDefaultCompanyName,
  };

  const saveActivationDelay = () => {
    // Show the loader
    setLoader(true);
    YardCheckinService.saveActivationDelay(unitShuttlesVO)
      .then((res) => {
        // Hide the loader
        setLoader(false);
        if (res.data == true) {
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
      navigate("/yard-checkin-unit-selection");
    }
  };

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
    //Clear Plant to Yard data
    dispatch(setShuttleAmountForPlantToYard(""));
    dispatch(setShuttleMilesForPlantToYard(""));
    dispatch(setShuttleDateForPlantToYard(""));
    dispatch(setStatusForPlantToYard("inYard"));
    dispatch(setPickupCityIDForPlantToYard(""));
    dispatch(setPickupCityNameForPlantToYard(""));
    dispatch(setDeliveryYardIDForPlantToYard(""));
    dispatch(setDeliveryYardNameForPlantToYard(""));
    dispatch(setDeliveryYardCodeForPlantToYard(""));
    dispatch(setIsCityYardCombinationExist(""));
    dispatch(setRowForPlantToYard(""));
    dispatch(setPositionForPlantToYard(""));
    dispatch(setGvwrForPlantToYard(""));
  };

  //Onclick function for Save Button
  const handleSaveOnClick = () => {
    saveActivationDelay();
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        {/* Save Button */}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          disabled={reasonForActivationDelay !== "" ? false : true}
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
      </div>
      <WarningModalPopUp
        show={modalPopup}
        onHide={warningPopupModalHide}
        title={saveError === true ? "Error" : "Success"}
        body={saveError === true ? errorMessage : "Activation Delay data saved successfully."}
        handleOK={warningPopupModalHide}
        showOK={true}
        color={saveError === true ? "red" : "Black"}
      />
    </div>
  );
};

export default ActivationDelayFooter;
