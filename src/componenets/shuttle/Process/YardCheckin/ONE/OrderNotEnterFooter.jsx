import { formatForApi } from "../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setPageNumber,
  setSelectedUnitCompanyName,
  setSelectedUnitCompanyFK,
  setSelectedUnitCompanyNameONE,
  setSelectedUnitCompanyFKONE,
  setUnitNumberForOrderNotEnter,
  setCustomerSelectedForOrderNotEnter,
  setPlantSelectedForOrderNotEnter,
  setShuttleDateForOrderNotEnter,
  setPickupCityForOrderNotEnter,
  setDeliveryYardForOrderNotEnter,
  setShuttleAmountForOrderNotEnter,
  setShuttleMilesForOrderNotEnter,
  setIsCityYardCombinationExistForOrderNotEnter,
  setRowForOrderNotEnter,
  setPositionForOrderNotEnter,
  setUnitNumberInput,
  setPickupCityIDForPlantToYard,
  setPickupCityNameForOrderNotEnter,
  setDeliveryYardIDForPlantToYard,
  setDeliveryYardCodeForOrderNotEnter,
  setSavedSuccessForOrderNotEnter,
  setIsUnitShuttleONEUnique,
} from "../../../../../redux/YardCheckinSlice";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";

function OrderNotEnterFooter() {
  const navigate = useNavigate();
  //navigate, dispatch
  const dispatch = useDispatch();

  const todayDate = formatForApi(new Date());

  //modal pop up
  const [modalPopup, setModalPopUp] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cancelShow, setCancelShow] = useState(false);
  //Loader
  const [loader, setLoader] = useState(false);

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

  const unitNumberForOrderNotEnter = useSelector(
    (state) => state.yardCheckinReducer.unitNumberForOrderNotEnter
  );
  const unitTypeMotorized = useSelector((state) => state.yardCheckinReducer.unitTypeMotorized);
  const unitTypeTowable = useSelector((state) => state.yardCheckinReducer.unitTypeTowable);
  const companyForOrderNotEnter = useSelector((state) => state.yardCheckinReducer.companyForOrderNotEnter);
  const selectedUnitCompanyName = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyNameONE);
  const selectedUnitCompanyFK = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyFKONE);
  const customerSelectedForOrderNotEnter = useSelector(
    (state) => state.yardCheckinReducer.customerSelectedForOrderNotEnter
  );
  const plantSelectedForOrderNotEnter = useSelector(
    (state) => state.yardCheckinReducer.plantSelectedForOrderNotEnter
  );
  const shuttleDateForOrderNotEnter = useSelector(
    (state) => state.yardCheckinReducer.shuttleDateForOrderNotEnter
  );
  const shuttleAmountForOrderNotEnter = useSelector(
    (state) => state.yardCheckinReducer.shuttleAmountForOrderNotEnter
  );
  const shuttleMilesForOrderNotEnter = useSelector(
    (state) => state.yardCheckinReducer.shuttleMilesForOrderNotEnter
  );
  const pickupCityForOrderNotEnter = useSelector(
    (state) => state.yardCheckinReducer.pickupCityForOrderNotEnter
  );
  const pickupCityNameForOrderNotEnter = useSelector(
    (state) => state.yardCheckinReducer.pickupCityNameForOrderNotEnter
  );
  const deliveryYardForOrderNotEnter = useSelector(
    (state) => state.yardCheckinReducer.deliveryYardForOrderNotEnter
  );
  const deliveryYardCodeForOrderNotEnter = useSelector(
    (state) => state.yardCheckinReducer.deliveryYardCodeForOrderNotEnter
  );
  const isCityYardCombinationExistForOrderNotEnter = useSelector(
    (state) => state.yardCheckinReducer.isCityYardCombinationExistForOrderNotEnter
  );
  const rowForOrderNotEnter = useSelector((state) => state.yardCheckinReducer.rowForOrderNotEnter);
  const positionForOrderNotEnter = useSelector((state) => state.yardCheckinReducer.positionForOrderNotEnter);
  const isShuttleDateValid = useSelector((state) => state.yardCheckinReducer.isShuttleDateValid);
  const isUnitShuttleONEUnique = useSelector((state) => state.yardCheckinReducer.isUnitShuttleONEUnique);

  const unitShuttlesONEsVO = {
    driverFK: {
      driverPK: selectedDriverFK,
    },
    driverCompanyFKInt: selectedDriverCompanyFK,
    unitNumber: unitNumberForOrderNotEnter,
    motorized: unitTypeMotorized,
    towable: unitTypeTowable,
    customerFK: {
      customerPK: customerSelectedForOrderNotEnter,
    },
    customerPlantFK: {
      customerPlantPK: plantSelectedForOrderNotEnter,
    },

    pickupShuttleCityFK: {
      shuttleCityPK: pickupCityForOrderNotEnter,
    },
    dropYardFK: {
      yardPK: deliveryYardForOrderNotEnter,
    },
    shuttleDate: shuttleDateForOrderNotEnter,
    amount: shuttleAmountForOrderNotEnter,
    yardRow: rowForOrderNotEnter,
    yardPosition: positionForOrderNotEnter,
  };

  const unitShuttlesVO = {
    unitShuttlePK: unitShuttlesPK,
    selectedDriverCompanyName: selectedDriverCompany,
    driverFK: {
      driverPK: selectedDriverFK,
    },
    driverCompanyFKInt: selectedDriverCompanyFK,

    unitCompanyFKInt: selectedUnitCompanyFK,
    selectedUnitCompanyName: selectedUnitCompanyName,
    shuttleDate: shuttleDateForOrderNotEnter,
    pickupShuttleCityFK: {
      shuttleCityPK: pickupCityForOrderNotEnter,
    },
    dropYardFK: {
      yardPK: deliveryYardForOrderNotEnter,
    },
    pickupCity: pickupCityNameForOrderNotEnter,
    dropSisterYardCode: deliveryYardCodeForOrderNotEnter,
    amount: shuttleAmountForOrderNotEnter,
    miles: shuttleMilesForOrderNotEnter,
    towable: unitTypeTowable,
    yardRow: rowForOrderNotEnter,
    yardPosition: positionForOrderNotEnter,
    posted: true,
    postDate: todayDate,

    secondShuttle: false,
    secondShuttleHold: selectedDriverCompanyDetails?.approveAdditionalShuttlePay,
    source: "ONE Record",
    unitShuttleONEsVO: unitShuttlesONEsVO,
    checkCrossDB:
      driverDefaultCompanyName === selectedDriverCompany && selectedDriverCompany === selectedUnitCompanyName
        ? false
        : true,
    defaultCompanyName: driverDefaultCompanyName,
  };

  const shuttleONESave = () => {
    // Show the loader
    setLoader(true);
    YardCheckinService.shuttleONESave(unitShuttlesVO)
      .then((res) => {
        // Hide the loader
        setLoader(false);
        if (res.data !== "") {
          setModalPopUp(true);
        }
        dispatch(setIsUnitShuttleONEUnique(true));
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
    shuttleONESave();
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
    dispatch(setPickupCityIDForPlantToYard(""));
    dispatch(setDeliveryYardIDForPlantToYard(""));
    dispatch(setUnitNumberForOrderNotEnter(""));
    dispatch(setSelectedUnitCompanyNameONE(""));
    dispatch(setSelectedUnitCompanyFKONE(""));
    dispatch(setCustomerSelectedForOrderNotEnter(""));
    dispatch(setPlantSelectedForOrderNotEnter(""));
    dispatch(setShuttleDateForOrderNotEnter(""));
    dispatch(setPickupCityForOrderNotEnter(""));
    dispatch(setPickupCityNameForOrderNotEnter(""));
    dispatch(setDeliveryYardForOrderNotEnter(""));
    dispatch(setDeliveryYardCodeForOrderNotEnter(""));
    dispatch(setShuttleAmountForOrderNotEnter(""));
    dispatch(setShuttleMilesForOrderNotEnter(""));
    dispatch(setIsCityYardCombinationExistForOrderNotEnter(""));
    dispatch(setRowForOrderNotEnter(""));
    dispatch(setPositionForOrderNotEnter(""));
    dispatch(setUnitNumberInput(""));
    dispatch(setSelectedUnitCompanyName(""));
    dispatch(setSelectedUnitCompanyFK(""));
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
      dispatch(setSavedSuccessForOrderNotEnter(true));
      navigate("/yard-checkin-unit-selection");
    }
  };

  useEffect(() => {
    // Enable save if all conditions are satisfied
    if (unitNumberForOrderNotEnter !== "" && unitNumberForOrderNotEnter.length >= 5) {
      // enable save
      dispatch(setIsUnitShuttleONEUnique(true));
    } else {
      // disable save
      dispatch(setIsUnitShuttleONEUnique(false));
    }
  }, [unitNumberForOrderNotEnter]);

  const validateAndSave = () => {
    YardCheckinService.checkUnitSHuttleOneUniqueness(unitNumberForOrderNotEnter)
      .then((response) => {
        if (response.data === true) {
          dispatch(setIsUnitShuttleONEUnique(true));
          handleSaveOnClick();
        } else {
          dispatch(setIsUnitShuttleONEUnique(false));
          // Optionally show a warning/toast here
        }
      })
      .catch((err) => {
        dispatch(setIsUnitShuttleONEUnique(false));
        // Handle error if needed
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2 ">
      <div className="d-flex align-items-center flex-wrap">
        {/* Process Button */}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          disabled={
            isUnitShuttleONEUnique === false
              ? true
              : !(
                  unitNumberForOrderNotEnter !== "" &&
                  unitNumberForOrderNotEnter.length >= 5 &&
                  companyForOrderNotEnter !== "" &&
                  customerSelectedForOrderNotEnter !== "" &&
                  plantSelectedForOrderNotEnter !== "" &&
                  shuttleDateForOrderNotEnter !== "" &&
                  isShuttleDateValid &&
                  pickupCityForOrderNotEnter !== "" &&
                  deliveryYardForOrderNotEnter !== "" &&
                  isCityYardCombinationExistForOrderNotEnter === "" &&
                  rowForOrderNotEnter !== "" &&
                  loader === false &&
                  isUnitShuttleONEUnique
                )
          }
          onClick={validateAndSave}
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
          onClick={() => {
            setCancelShow(true);
            dispatch(setIsUnitShuttleONEUnique(true));
          }}
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
            : "Shuttle details for unit with order not entered saved successfully."
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
        title={"Cancel Order Not Enter Unit Changes"}
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

export default OrderNotEnterFooter;
