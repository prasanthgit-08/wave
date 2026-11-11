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
  setSpecialCodeOfSelectedUnit,
  setIsSelectedUnitTowable,
  setIsSelectedUnitMotorized,
  setChangeColor,
  setShuttleAmountForShuttleBonus,
  setReasonForShuttleBonus,
  setPickupCityIDForPlantToYard,
  setDeliveryYardIDForPlantToYard,
  setSavedSuccessForShuttleBonus,
} from "../../../../../redux/YardCheckinSlice";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";

function ShuttleBonusFooter() {
  //navigate, dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const todayDate = formatForApi(new Date());

  //modal pop up
  const [modalPopup, setModalPopUp] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //Loader
  const [loader, setLoader] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);

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
  const unitNumberSelected = useSelector((state) => state.yardCheckinReducer.unitNumberInput);
  const selectedUnitCompanyFK = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyFK);
  const selectedUnitCompanyName = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyName);
  const isSelectedUnitTowable = useSelector((state) => state.yardCheckinReducer.isSelectedUnitTowable);
  const shuttleAmountForShuttleBonus = useSelector(
    (state) => state.yardCheckinReducer.shuttleAmountForShuttleBonus
  );
  const reasonForShuttleBonus = useSelector((state) => state.yardCheckinReducer.reasonForShuttleBonus);

  const unitShuttlesVO = {
    unitShuttlePK: unitShuttlesPK,
    selectedDriverCompanyName: selectedDriverCompany,
    driverFK: {
      driverPK: selectedDriverFK,
    },
    driverCompanyFKInt: selectedDriverCompanyFK,
    unitFKInt: unitNumberFK,
    sisterUnitFK: driverDefaultCompanyName === selectedUnitCompanyName ? "" : unitNumberFK,
    unitCompanyFKInt: selectedUnitCompanyFK,
    selectedUnitCompanyName: selectedUnitCompanyName,
    posted: true,
    postDate: todayDate,
    secondShuttle: false,
    secondShuttleHold: selectedDriverCompanyDetails?.approveAdditionalShuttlePay,
    amount: shuttleAmountForShuttleBonus,
    bonusReason: reasonForShuttleBonus,
    bonus: true,
    source: "Bonus Record",
    towable: isSelectedUnitTowable,
    checkCrossDB:
      driverDefaultCompanyName === selectedDriverCompany && selectedDriverCompany === selectedUnitCompanyName
        ? false
        : true,
    defaultCompanyName: driverDefaultCompanyName,
  };

  const saveUnitShuttlesRecord = () => {
    // Show the loader
    setLoader(true);
    YardCheckinService.shuttleBonusSave(unitShuttlesVO)
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
    dispatch(setPickupCityIDForPlantToYard(""));
    dispatch(setDeliveryYardIDForPlantToYard(""));
    dispatch(setShuttleAmountForShuttleBonus(""));
    dispatch(setReasonForShuttleBonus(""));
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
      dispatch(setSavedSuccessForShuttleBonus(true));
      navigate("/yard-checkin-unit-selection");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        {/* Process Button */}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          disabled={
            loader === false &&
            unitNumberSelected !== "" &&
            shuttleAmountForShuttleBonus !== "" &&
            shuttleAmountForShuttleBonus !== "." &&
            shuttleAmountForShuttleBonus > 0 &&
            reasonForShuttleBonus?.trim() !== ""
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
          saveError === true ? errorMessage : "Bonus details for the selected driver saved  successfully."
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
        title={"Cancel Driver Bonus"}
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

export default ShuttleBonusFooter;
