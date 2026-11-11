import { formatForApi } from "../../../../../utils/dateUtils";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  setPageNumber,
  setSelectedUnitCompanyName,
  setSelectedUnitCompanyFK,
  //Selected Unit
  setUnitNumberLast5,
  setUnitNumberPK,
  setUnitNumberInput,
  setUnitShuttlesPK,
  setSpecialCodeOfSelectedUnit,
  setIsSelectedUnitTowable,
  setIsSelectedUnitMotorized,
  setChangeColor,
  setPickupCityIDForPlantToYard,
  setDeliveryYardIDForPlantToYard,
  //Dry Run
  setPickupCityIDForDryRun,
  setPickupCityNameForDryRun,
  setDeliveryYardIDForDryRun,
  setDeliveryYardNameForDryRun,
  setDeliveryYardCodeForDryRun,
  setShuttleAmountForDryRun,
  setShuttleMilesForDryRun,
  setShuttleDateForDryRun,
  setIsCityToYardCombinationExistForDryRun,
  setReasonForDryRun,
  setSavedSuccessForDryRun,
} from "../../../../../redux/YardCheckinSlice";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";

function DryRunFooter() {
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
  const pickupCityIDForDryRun = useSelector((state) => state.yardCheckinReducer.pickupCityIDForDryRun);
  const pickupCityNameForDryRun = useSelector((state) => state.yardCheckinReducer.pickupCityNameForDryRun);
  const deliveryYardIDForDryRun = useSelector((state) => state.yardCheckinReducer.deliveryYardIDForDryRun);
  const deliveryYardCodeForDryRun = useSelector(
    (state) => state.yardCheckinReducer.deliveryYardCodeForDryRun
  );
  const shuttleAmount = useSelector((state) => state.yardCheckinReducer.shuttleAmountForDryRun);
  const miles = useSelector((state) => state.yardCheckinReducer.shuttleMilesForDryRun);
  const shuttleDate = useSelector((state) => state.yardCheckinReducer.shuttleDateForDryRun);
  const reasonForDryRun = useSelector((state) => state.yardCheckinReducer.reasonForDryRun);
  const isCityToYardCombinationExistForDryRun = useSelector(
    (state) => state.yardCheckinReducer.isCityToYardCombinationExistForDryRun
  );
  const isShuttleDateValid = useSelector((state) => state.yardCheckinReducer.isShuttleDateValid);
  const isDryRunRouteConfirmed = useSelector((state) => state.yardCheckinReducer.isDryRunRouteConfirmed);

  const unitShuttlesVO = {
    unitShuttlePK: unitShuttlesPK,
    driverFK: {
      driverPK: selectedDriverFK,
    },
    driverCompanyFKInt: selectedDriverCompanyFK,
    unitFKInt: unitNumberFK,
    sisterUnitFK: driverDefaultCompanyName === selectedUnitCompanyName ? "" : unitNumberFK,
    unitCompanyFKInt: selectedUnitCompanyFK,

    plantToYard: false,
    pickupShuttleCityFK: {
      shuttleCityPK: pickupCityIDForDryRun,
    },
    dropYardFK: {
      yardPK: deliveryYardIDForDryRun,
    },
    pickupCity: pickupCityNameForDryRun,
    dropSisterYardCode: deliveryYardCodeForDryRun,
    amount: shuttleAmount,
    miles: miles,
    towable: isSelectedUnitTowable,
    shuttleDate: shuttleDate,
    posted: true,
    postDate: todayDate,
    secondShuttle: true,
    secondShuttleHold: selectedDriverCompanyDetails?.approveAdditionalShuttlePay,
    dryRun: true,
    dryRunReason: reasonForDryRun,
    source: "Dry Run Record",
    selectedDriverCompanyName: selectedDriverCompany,
    selectedUnitCompanyName: selectedUnitCompanyName,
    checkCrossDB:
      driverDefaultCompanyName === selectedDriverCompany && selectedDriverCompany === selectedUnitCompanyName
        ? false
        : true,
    defaultCompanyName: driverDefaultCompanyName,
  };

  const shuttleDryRunSave = () => {
    // Show the loader
    setLoader(true);
    YardCheckinService.shuttleDryRunSave(unitShuttlesVO)
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
    shuttleDryRunSave();
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
    //Dry Run
    dispatch(setPickupCityIDForDryRun(""));
    dispatch(setPickupCityNameForDryRun(""));
    dispatch(setDeliveryYardIDForDryRun(""));
    dispatch(setDeliveryYardNameForDryRun(""));
    dispatch(setDeliveryYardCodeForDryRun(""));
    dispatch(setShuttleAmountForDryRun(""));
    dispatch(setShuttleMilesForDryRun(""));
    dispatch(setShuttleDateForDryRun(""));
    dispatch(setIsCityToYardCombinationExistForDryRun(""));
    dispatch(setReasonForDryRun(""));
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
      dispatch(setSavedSuccessForDryRun(true));
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
            pickupCityIDForDryRun !== "" &&
            deliveryYardIDForDryRun !== "" &&
            shuttleDate !== "" &&
            isShuttleDateValid &&
            reasonForDryRun?.trim() !== "" &&
            isCityToYardCombinationExistForDryRun === "" &&
            isDryRunRouteConfirmed
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
          saveError === true ? errorMessage : "Dry Run details for the selected driver saved  successfully."
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
        title={"Cancel Dry Run Changes"}
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

export default DryRunFooter;
