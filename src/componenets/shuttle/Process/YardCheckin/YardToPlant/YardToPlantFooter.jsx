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
  setShuttleAmountForYardToPlant,
  setShuttleMilesForYardToPlant,
  setShuttleDateForYardToPlant,
  setPickupYardIDForYardToPlant,
  setPickupYardCodeForYardToPlant,
  setDeliveryCityIDForYardToPlant,
  setDeliveryPlantIDForYardToPlant,
  setDeliveryPlantNameForYardToPlant,
  setDeliveryPlantCodeForYardToPlant,
  setIsYardCityCombinationExist,
  setPickupYardNameForYardToPlant,
  setDeliveryCityNameForYardToPlant,
  setSavedSuccessForYardToPlant,
} from "../../../../../redux/YardCheckinSlice";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
import { setListingData, setSelectedId } from "../../../../../redux/YardCheckinSecondShuttleSlice";

function YardToPlantFooter() {
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
  const selectedUnitCompanyFK = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyFK);
  const selectedUnitCompanyName = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyName);
  const isSelectedUnitTowable = useSelector((state) => state.yardCheckinReducer.isSelectedUnitTowable);
  const secondShuttle = useSelector((state) => state.yardCheckinReducer.secondShuttle);
  const additionalReason = useSelector((state) => state.yardCheckinReducer.additionalReason);
  const shuttleDate = useSelector((state) => state.yardCheckinReducer.shuttleDateForYardToPlant);
  const shuttleAmount = useSelector((state) => state.yardCheckinReducer.shuttleAmountForYardToPlant);
  const shuttleMilesForYardToPlant = useSelector(
    (state) => state.yardCheckinReducer.shuttleMilesForYardToPlant
  );
  const pickupYardID = useSelector((state) => state.yardCheckinReducer.pickupYardIDForYardToPlant);
  const deliveryCityID = useSelector((state) => state.yardCheckinReducer.deliveryCityIDForYardToPlant);
  const deliveryPlantID = useSelector((state) => state.yardCheckinReducer.deliveryPlantIDForYardToPlant);
  const isYardToPlantRouteConfirmed = useSelector(
    (state) => state.yardCheckinReducer.isYardToPlantRouteConfirmed
  );
  const deliveryPlantNameForYardToPlant = useSelector(
    (state) => state.yardCheckinReducer.deliveryPlantNameForYardToPlant
  );
  const deliveryPlantCode = useSelector((state) => state.yardCheckinReducer.deliveryPlantCodeForYardToPlant);
  const pickupYardCodeForYardToPlant = useSelector(
    (state) => state.yardCheckinReducer.pickupYardCodeForYardToPlant
  );
  const deliveryCityNameForYardToPlant = useSelector(
    (state) => state.yardCheckinReducer.deliveryCityNameForYardToPlant
  );
  const isYardCityCombinationExist = useSelector(
    (state) => state.yardCheckinReducer.isYardCityCombinationExist
  );
  const dispatchShuttle = useSelector((state) => state.yardCheckinReducer.dispatchShuttle);
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
    yardToPlant: true,

    pickupYardFK: {
      yardPK: pickupYardID,
    },
    dropShuttleCityFK: {
      shuttleCityPK: deliveryCityID,
    },
    dropCustomerPlantFK: {
      customerPlantPK: deliveryPlantID,
    },
    dropSisterPlantCode: deliveryPlantCode,
    pickupSisterYardCode: pickupYardCodeForYardToPlant,
    dropCity: deliveryCityNameForYardToPlant,
    amount: shuttleAmount,
    miles: shuttleMilesForYardToPlant,
    towable: isSelectedUnitTowable,
    shuttleDate: shuttleDate,
    source: "Shuttle Record",
    selectedDriverCompanyName: selectedDriverCompany,
    selectedUnitCompanyName: selectedUnitCompanyName,
    dispatchShuttle: dispatchShuttle,
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
    //Clear Plant to Yard data
    dispatch(setShuttleAmountForYardToPlant(""));
    dispatch(setShuttleMilesForYardToPlant(""));
    dispatch(setShuttleDateForYardToPlant(""));
    dispatch(setPickupYardIDForYardToPlant(""));
    dispatch(setPickupYardCodeForYardToPlant(""));
    dispatch(setDeliveryCityIDForYardToPlant(""));
    dispatch(setPickupYardNameForYardToPlant(""));
    dispatch(setDeliveryCityNameForYardToPlant(""));
    dispatch(setDeliveryPlantIDForYardToPlant(""));
    dispatch(setDeliveryPlantNameForYardToPlant(""));
    dispatch(setDeliveryPlantCodeForYardToPlant(""));
    dispatch(setIsYardCityCombinationExist(""));
    dispatch(setSelectedId(null));
    dispatch(setListingData([]));
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
      dispatch(setSavedSuccessForYardToPlant(true));
      navigate("/yard-checkin-unit-selection");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap ">
        {/* Process Button */}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          disabled={
            !(
              unitNumberFK !== "" &&
              shuttleDate !== "" &&
              isShuttleDateValid &&
              pickupYardID !== "" &&
              deliveryCityID !== "" &&
              isYardCityCombinationExist === "" &&
              isYardToPlantRouteConfirmed &&
              (deliveryPlantNameForYardToPlant === "" ||
                (deliveryPlantID !== "" && deliveryPlantNameForYardToPlant !== ""))
            )
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
        body={saveError === true ? errorMessage : "Yard To Plant shuttle data saved successfully."}
        handleOK={warningPopupModalHide}
        showOK={true}
        color={saveError === true ? "red" : "Black"}
      />
      <WarningModalPopUp
        show={cancelShow}
        onHide={() => {
          setCancelShow(false);
        }}
        title={"Cancel Yard To Plant Shuttle Changes"}
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

export default YardToPlantFooter;
