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
  setDispatchShuttle,
  setTypeOfShuttle,
  setAdditionalReason,
  setSpecialCodeOfSelectedUnit,
  setIsSelectedUnitTowable,
  setIsSelectedUnitMotorized,
  setChangeColor,
  setPickupPlantIDForPlantToPlant,
  setPickupPlantNameForPlantToPlant,
  setPickupPlantCodeForPlantToPlant,
  setDeliveryPlantIDForPlantToPlant,
  setDeliveryPlantNameForPlantToPlant,
  setDeliveryPlantCodeForPlantToPlant,
  setShuttleDateForPlantToPlant,
  setShuttleAmountForPlantToPlant,
  setShuttleMilesForPlantToPlant,
  setIsPlantToPlantCombinationExist,
  setSavedSuccessForPlantToPlant,
  setStatusForPlantToYard,
} from "../../../../../redux/YardCheckinSlice";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
import { setListingData, setSelectedId } from "../../../../../redux/YardCheckinSecondShuttleSlice";

function PlantToPlantFooter() {
  const navigate = useNavigate();
  //navigate, dispatch
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
  const selectedUnitCompanyFK = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyFK);
  const selectedUnitCompanyName = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyName);
  const isSelectedUnitTowable = useSelector((state) => state.yardCheckinReducer.isSelectedUnitTowable);
  const secondShuttle = useSelector((state) => state.yardCheckinReducer.secondShuttle);
  const additionalReason = useSelector((state) => state.yardCheckinReducer.additionalReason);
  const pickupPlantIDForPlantToPlant = useSelector(
    (state) => state.yardCheckinReducer.pickupPlantIDForPlantToPlant
  );
  const pickupPlantCodeForPlantToPlant = useSelector(
    (state) => state.yardCheckinReducer.pickupPlantCodeForPlantToPlant
  );
  const deliveryPlantIDForPlantToPlant = useSelector(
    (state) => state.yardCheckinReducer.deliveryPlantIDForPlantToPlant
  );
  const deliveryPlantCodeForPlantToPlant = useSelector(
    (state) => state.yardCheckinReducer.deliveryPlantCodeForPlantToPlant
  );
  const shuttleDateForPlantToPlant = useSelector(
    (state) => state.yardCheckinReducer.shuttleDateForPlantToPlant
  );
  const shuttleAmount = useSelector((state) => state.yardCheckinReducer.shuttleAmountForPlantToPlant);
  const shuttleMilesForPlantToPlant = useSelector(
    (state) => state.yardCheckinReducer.shuttleMilesForPlantToPlant
  );
  const isPlantToPlantCombinationExist = useSelector(
    (state) => state.yardCheckinReducer.isPlantToPlantCombinationExist
  );
  const dispatchShuttle = useSelector((state) => state.yardCheckinReducer.dispatchShuttle);
  const selectedId = useSelector((state) => state.yardCheckinSecondShuttleReducer.selectedId);
  const isShuttleDateValid = useSelector((state) => state.yardCheckinReducer.isShuttleDateValid);
  const isPlantToPlantRouteConfirmed = useSelector(
    (state) => state.yardCheckinReducer.isPlantToPlantRouteConfirmed
  );

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
    plantTransfer: true,
    pickupCustomerPlantFK: {
      customerPlantPK: pickupPlantIDForPlantToPlant,
    },
    pickupSisterPlantCode: pickupPlantCodeForPlantToPlant,
    dropSisterPlantCode: deliveryPlantCodeForPlantToPlant,
    dropCustomerPlantFK: {
      customerPlantPK: deliveryPlantIDForPlantToPlant,
    },
    amount: shuttleAmount,
    miles: shuttleMilesForPlantToPlant,
    towable: isSelectedUnitTowable,
    shuttleDate: shuttleDateForPlantToPlant,
    source: "Shuttle Record",
    dispatchShuttle: dispatchShuttle,
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

  //Reset
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
    dispatch(setDispatchShuttle(false));
    dispatch(setTypeOfShuttle(""));
    dispatch(setAdditionalReason(""));
    dispatch(setPickupPlantIDForPlantToPlant(""));
    dispatch(setPickupPlantNameForPlantToPlant(""));
    dispatch(setPickupPlantCodeForPlantToPlant(""));
    dispatch(setDeliveryPlantIDForPlantToPlant(""));
    dispatch(setDeliveryPlantNameForPlantToPlant(""));
    dispatch(setDeliveryPlantCodeForPlantToPlant(""));
    dispatch(setShuttleDateForPlantToPlant(""));
    dispatch(setShuttleAmountForPlantToPlant(""));
    dispatch(setShuttleMilesForPlantToPlant(""));
    dispatch(setIsPlantToPlantCombinationExist(""));
    dispatch(setStatusForPlantToYard("inYard"));
    dispatch(setSelectedId(null));
    dispatch(setListingData([]));
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
      dispatch(setSavedSuccessForPlantToPlant(true));
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
            pickupPlantIDForPlantToPlant !== "" &&
            deliveryPlantIDForPlantToPlant !== "" &&
            shuttleDateForPlantToPlant !== "" &&
            isShuttleDateValid &&
            isPlantToPlantCombinationExist === "" &&
            isPlantToPlantRouteConfirmed
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
        body={saveError === true ? errorMessage : "Plant To Plant shuttle data saved successfully."}
        handleOK={warningPopupModalHide}
        showOK={true}
        color={saveError === true ? "red" : "Black"}
      />
      <WarningModalPopUp
        show={cancelShow}
        onHide={() => {
          setCancelShow(false);
        }}
        title={"Cancel Plant To Plant Shuttle Changes"}
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

export default PlantToPlantFooter;
