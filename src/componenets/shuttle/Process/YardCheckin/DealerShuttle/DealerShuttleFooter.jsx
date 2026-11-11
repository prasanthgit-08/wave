import { formatForApi } from "../../../../../utils/dateUtils";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import {
  setPageNumber,
  setSelectedUnitCompanyName,
  setSelectedUnitCompanyFK,
  setSelectedDealerShuttleData,
  setDealerShuttleAmount,
  setDealerShuttleMiles,
  setDealerShuttleDate,
  setSavedSuccessForDealerShuttle,
} from "../../../../../redux/YardCheckinSlice";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
import { setListingData, setSelectedId } from "../../../../../redux/YardCheckinSecondShuttleSlice";

function DealerShuttleFooter() {
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
  const selectedDriverFK = useSelector((state) => state.yardCheckinReducer.selectedDriverID);
  const selectedDriverCompanyFK = useSelector(
    (state) => state.yardCheckinReducer.companyNameFKForDriverSelection
  );
  const selectedDriverCompanyDetails = useSelector(
    (state) => state.yardCheckinReducer.selectedDriverCompanyDetails
  );
  const selectedDealerShuttleData = useSelector(
    (state) => state.yardCheckinReducer.selectedDealerShuttleData
  );
  const dealerShuttleAmount = useSelector((state) => state.yardCheckinReducer.dealerShuttleAmount);
  const dealerShuttleMiles = useSelector((state) => state.yardCheckinReducer.dealerShuttleMiles);
  const dealerShuttleDate = useSelector((state) => state.yardCheckinReducer.dealerShuttleDate);
  const isShuttleDateValid = useSelector((state) => state.yardCheckinReducer.isShuttleDateValid);

  const unitShuttlesVO = {
    driverFK: {
      driverPK: selectedDriverFK,
    },
    driverCompanyFKInt: selectedDriverCompanyFK,
    unitFKInt: selectedDealerShuttleData?.unitFK || "",
    unitCompanyFKInt: selectedDriverCompanyFK,
    posted: true,
    postDate: todayDate,
    secondShuttle: false,
    secondShuttleHold: selectedDriverCompanyDetails?.approveAdditionalShuttlePay,
    dispatchPK: selectedDealerShuttleData?.dispatchPK || "",
    dealer: true,
    pickupCustomerPlantFK: {
      customerPlantPK: selectedDealerShuttleData?.pickupCustomerPlant?.customerPlantPK || "",
    },
    pickupDealerFK: {
      dealerPK: selectedDealerShuttleData?.pickupDealer?.dealerPK || "",
    },
    dropCustomerPlantFK: {
      customerPlantPK: selectedDealerShuttleData?.deliveryCustomerPlant?.customerPlantPK || "",
    },
    dropDealerFK: {
      dealerPK: selectedDealerShuttleData?.deliveryDealer?.dealerPK || "",
    },
    pickupYardFK: {
      yardPK: selectedDealerShuttleData?.pickupYard?.yardPK || "",
    },
    dropYardFK: {
      yardPK: selectedDealerShuttleData?.deliveryYard?.yardPK || "",
    },
    amount: dealerShuttleAmount,
    miles: dealerShuttleMiles,
    towable: selectedDealerShuttleData.unitId?.unitTypeFK?.towable,
    shuttleDate: dealerShuttleDate,
    source: "Dealer Record",
  };

  const saveDealerShuttleRecord = () => {
    // Show the loader
    setLoader(true);
    YardCheckinService.dealerShuttleSave(unitShuttlesVO)
      .then((res) => {
        // Hide the loader
        setLoader(false);

        if (res.data && res.data.errorMsg) {
          // If there's an error message in the response data, display it
          setSaveError(true);
          setErrorMessage(res.data.errorMsg);
          setModalPopUp(true);
        } else {
          if (res.data !== "") {
            setModalPopUp(true);
          }
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
    saveDealerShuttleRecord();
  };

  //Onclick function for Cancel Button
  const handleCancelOnClick = () => {
    reset();
    navigate("/yard-checkin-unit-selection");
    setCancelShow(false);
    toast.success("Changes Cancelled");
  };

  const reset = () => {
    dispatch(setPageNumber(0));
    dispatch(setSelectedUnitCompanyName(""));
    dispatch(setSelectedUnitCompanyFK(""));
    //Clear selected unit
    dispatch(setSelectedDealerShuttleData(""));
    dispatch(setDealerShuttleAmount(""));
    dispatch(setDealerShuttleMiles(""));
    dispatch(setDealerShuttleDate(""));
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
      dispatch(setSavedSuccessForDealerShuttle(true));
      navigate("/yard-checkin-unit-selection");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          disabled={
            loader === false &&
            selectedDealerShuttleData !== "" &&
            dealerShuttleDate !== "" &&
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
        body={saveError === true ? errorMessage : "Dealer shuttle data saved successfully."}
        handleOK={warningPopupModalHide}
        showOK={true}
        color={saveError === true ? "red" : "Black"}
      />
      <WarningModalPopUp
        show={cancelShow}
        onHide={() => {
          setCancelShow(false);
        }}
        title={"Cancel Dealer Shuttle Changes"}
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

export default DealerShuttleFooter;
