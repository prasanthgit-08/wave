import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setUnitShuttlesPK,
  setSecondShuttle,
  setSelectedUnitCompanyName,
  setSelectedUnitCompanyFK,
  setUnitNumberLast5,
  setUnitNumberPK,
  setUnitNumberInput,
  setSpecialCodeOfSelectedUnit,
  setIsSelectedUnitTowable,
  setIsSelectedUnitMotorized,
  setPickupCityIDForPlantToYard,
  setDeliveryYardIDForPlantToYard,
  setChangeColor,
  setPageNumber,
  setIsEligibleForBonus,
  setIsEligibleForDelay,
  //Dealer Shuttle
  setAllDealerShuttleData,
  toggleCancelChanges,
  //Reset
  setSavedSuccessForShuttleDelay,
  setSavedSuccessForOrderNotEnter,
  setSavedSuccessForDealerShuttle,
  setSavedSuccessForShuttleBonus,
  setSavedSuccessForDryRun,
  setSavedSuccessForPlantToYard,
  setSavedSuccessForYardToPlant,
  setSavedSuccessForYardToYard,
  setSavedSuccessForPlantToPlant,
  //Driver Details
  setSelectedDriver,
  setSelectedDriverID,
  setCompanyNameForDriverSelection,
  setCompanyNameFKForDriverSelection,
  setSelectedDriverCompanyDetails,
  setUnitShuttleData,
  setIsUnitShuttleONEUnique,
  setEnablePostPay,
} from "../../../../../redux/YardCheckinSlice";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
import LoadingIcon from "../../../../common/LoadingIcon";

function UnitSelectionFooter() {
  //navigate
  const navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch();

  //local state
  // const [unitShuttleData, setUnitShuttleData] = useState("");

  //Loader
  const [loader, setLoader] = useState(false);
  const [driverPayLoader, setDriverPayLoader] = useState(false);

  //modal pop up
  const [modalPopup, setModalPopUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [saveError, setSaveError] = useState(false);
  const [modalPopupForBonus, setModalPopupForBonus] = useState(false);
  const [driverPayConfirmationPopUpShow, setDriverPayConfirmationPopUpShow] = useState(false);
  const [multipleUnitsModalShow, setMultipleUnitsModalShow] = useState(false);
  const [multipleUnitsPlantModalShow, setMultipleUnitsPlantModalShow] = useState(false);
  const [openShuttleLoading, setOpenShuttleLoading] = useState(false);
  const [multipleShuttleLoading, setMultipleShuttleLoading] = useState(false);
  const [openShuttleData, setOpenShuttleData] = useState(null);
  const [multipleShuttleData, setMultipleShuttleData] = useState(null);
  const [flag, setFlag] = useState("");
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(false);
  const [flag4, setFlag4] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  //Get value from redux
  const selectedDriverCompanyDetails = useSelector(
    (state) => state.yardCheckinReducer.selectedDriverCompanyDetails
  );
  const driverDefaultCompanyName = useSelector((state) => state.yardCheckinReducer.driverDefaultCompanyName);
  const selectedDriverCompany = useSelector(
    (state) => state.yardCheckinReducer.companyNameForDriverSelection
  );
  const selectedUnitCompanyName = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyName);
  const selectedDriverFK = useSelector((state) => state.yardCheckinReducer.selectedDriverID);
  const unitNumberSelected = useSelector((state) => state.yardCheckinReducer.unitNumberInput);
  const unitNumberPK = useSelector((state) => state.yardCheckinReducer.unitNumberPK);
  const allUnitsData = useSelector((state) => state.yardCheckinReducer.allUnitsData);
  const pickupCityIDForPlantToYard = useSelector(
    (state) => state.yardCheckinReducer.pickupCityIDForPlantToYard
  );
  const deliveryYardIDForPlantToYard = useSelector(
    (state) => state.yardCheckinReducer.deliveryYardIDForPlantToYard
  );
  const isEligibleForBonus = useSelector((state) => state.yardCheckinReducer.isEligibleForBonus);
  const isEligibleForDelay = useSelector((state) => state.yardCheckinReducer.isEligibleForDelay);
  const listingData = useSelector((state) => state.yardCheckinSecondShuttleReducer.listingData);
  const unitShuttleData = useSelector((state) => state.yardCheckinReducer.unitShuttleData);
  const isUnitShuttleONEUnique = useSelector((state) => state.yardCheckinReducer.isUnitShuttleONEUnique);
  const unitNumberLast5 = useSelector((state) => state.yardCheckinReducer.unitNumberLast5);
  const enablePostPay = useSelector((state) => state.yardCheckinReducer.enablePostPay);
  const companyNameForDriverSelection = useSelector(
    (state) => state.yardCheckinReducer.companyNameForDriverSelection
  );

  //Onclick function for Cancel Button
  const reset = () => {
    dispatch(setUnitShuttleData(null));
    dispatch(toggleCancelChanges());
    dispatch(setSelectedUnitCompanyName(""));
    dispatch(setSelectedUnitCompanyFK(""));
    dispatch(setUnitNumberLast5(""));
    dispatch(setChangeColor(false));
    dispatch(setUnitNumberPK(""));
    dispatch(setPageNumber(0));
    dispatch(setUnitNumberInput(""));
    dispatch(setSpecialCodeOfSelectedUnit(""));
    dispatch(setIsSelectedUnitTowable(""));
    dispatch(setIsSelectedUnitMotorized(""));
    dispatch(setPickupCityIDForPlantToYard(""));
    dispatch(setDeliveryYardIDForPlantToYard(""));
    dispatch(setIsEligibleForBonus(false));
    dispatch(setSelectedDriver(""));
    dispatch(setSelectedDriverID(""));
    dispatch(setCompanyNameForDriverSelection(""));
    dispatch(setCompanyNameFKForDriverSelection(""));
    dispatch(setSelectedDriverCompanyDetails(""));
    dispatch(setIsEligibleForDelay(false));
    dispatch(setIsUnitShuttleONEUnique(true));
    setFlag2(false);
    setFlag3(false);
    setFlag(false);
    setFlag4(false);
    toast.success("Changes Cancelled");
  };

  /** check if selected driver has records for payment **/
  const checkPostPayStatus = () => {
    setPostLoading(true);
    YardCheckinService.checkPostPayStatus(companyNameForDriverSelection, selectedDriverFK)
      .then((response) => {
        const data = response.data;
        dispatch(setEnablePostPay(data));
        setPostLoading(false);
      })
      .catch((error) => {
        setDriverPayLoader(false);
        setPostLoading(false);
      });
  };

  // Fetch Multiple Shuttle Record
  const multipleShuttleRecordExistCheck = () => {
    if (unitNumberPK !== "") {
      setMultipleShuttleLoading(true);
      YardCheckinService.multipleShuttleRecordExistCheck(unitNumberPK, selectedUnitCompanyName)
        .then((response) => {
          const data = response;
          setMultipleShuttleData(data.data);

          if (data.data?.length > 1) {
            setFlag("multipleOrderEntryRecords");
          }

          // pass data.data directly
          openShuttleRecordExistCheck(data.data);
        })
        .catch(() => setMultipleShuttleLoading(false))
        .finally(() => setMultipleShuttleLoading(false));
    }
  };

  // Fetch Open Shuttle Record
  const openShuttleRecordExistCheck = (multipleShuttle = multipleShuttleData) => {
    if (unitNumberPK !== "") {
      setOpenShuttleLoading(true);
      YardCheckinService.openShuttleRecordExistCheck(unitNumberPK, selectedUnitCompanyName)
        .then((response) => {
          const data = response;
          if (data.data === "") {
            dispatch(setSecondShuttle(true));
          }

          if (multipleShuttle?.length <= 1) {
            dispatch(setUnitShuttlesPK(data.data[0]?.unitShuttlePK));
            dispatch(setUnitShuttleData(data.data[0]));
          } else {
            const recordWithDriver = multipleShuttle?.find(
              (shuttle) => shuttle?.driverFKInt !== null || shuttle?.sisterDriverFK !== null
            );
            if (recordWithDriver) {
              const shuttleToPlant =
                multipleShuttle?.filter(
                  (shuttle) =>
                    shuttle?.pickupYardFK &&
                    shuttle?.dropShuttleCityFK &&
                    shuttle?.driverFKInt === null &&
                    shuttle?.sisterDriverFK === null
                ) ?? [];
              const shuttlePlat = shuttleToPlant[0];

              const shuttleToYard =
                multipleShuttle?.filter(
                  (shuttle) =>
                    shuttle?.pickupShuttleCityFK &&
                    shuttle?.dropYardFK &&
                    shuttle?.driverFKInt === null &&
                    shuttle?.sisterDriverFK === null
                ) ?? [];
              const shuttleYard = shuttleToYard[0];

              if (shuttlePlat) {
                dispatch(setUnitShuttlesPK(shuttleYard?.unitShuttlePK));
                dispatch(setUnitShuttleData(shuttleYard));
                setFlag2(true);
              } else if (shuttleYard) {
                dispatch(setUnitShuttlesPK(shuttlePlat?.unitShuttlePK));
                dispatch(setUnitShuttleData(shuttlePlat));
                setFlag3(true);
              } else {
                dispatch(setUnitShuttlesPK(null));
                dispatch(setUnitShuttleData(null));
                setFlag4(true);
              }
            } else {
              dispatch(setUnitShuttlesPK(null));
              dispatch(setUnitShuttleData(null));
            }
          }
          setOpenShuttleData(data.data);
        })
        .catch(() => setOpenShuttleLoading(false))
        .finally(() => setOpenShuttleLoading(false));
    }
  };

  useEffect(() => {
    checkPostPayStatus();
  }, []);

  /*** call functions on page load ***/
  useEffect(() => {
    multipleShuttleRecordExistCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitNumberPK]);

  //Fetch Dealer Shuttle Records for the selected driver
  const getDealerShuttleList = () => {
    // Show the loader
    setLoader(true);
    YardCheckinService.getDealerShuttleList()
      .then((response) => {
        // Hide the loader
        setLoader(false);
        const data = response.data;
        dispatch(setAllDealerShuttleData(data));
        navigate("/dealer-shuttle");
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

  //Fetch Dealer Shuttle Records for the selected driver
  const handleDriverPayment = () => {
    setDriverPayConfirmationPopUpShow(false);
    // Show the loader
    setDriverPayLoader(true);
    YardCheckinService.handleDriversPay(selectedDriverFK, selectedDriverCompany)
      .then((response) => {
        // Hide the loader
        setDriverPayLoader(false);
        checkPostPayStatus();
        setModalPopUp(true);
      })
      .catch((err) => {
        // Hide the loader
        setDriverPayLoader(false);
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
    setModalPopUp(false);
    navigate("/yard-checkin-unit-selection");
  };
  //for unit check for unit number in unit shuttle ones table
  const unitShuttleOneUniqueCheck = () => {
    YardCheckinService.checkUnitSHuttleOneUniqueness(unitNumberSelected)
      .then((response) => {
        dispatch(setIsUnitShuttleONEUnique(response.data));
      })
      .catch((err) => {
        setErrorMessage("Sorry, something went wrong.Please try again.");
      });
  };

  useEffect(() => {
    if (allUnitsData?.length === 0 && unitNumberSelected?.length >= 5) {
      unitShuttleOneUniqueCheck();
    }
  }, [allUnitsData, unitNumberSelected]);

  const handleNavigation = (shuttleParam) => {
    // use the parameter if provided, else fallback to Redux
    const shuttle = shuttleParam ?? unitShuttleData;

    if (listingData && listingData?.length > 0) {
      navigate("/yard-checkin-second-shuttle");
    } else if (shuttle) {
      if (
        shuttle?.pickupShuttleCityFK?.shuttleCityPK !== undefined &&
        shuttle?.dropYardFK?.yardPK !== undefined
      ) {
        dispatch(setSavedSuccessForPlantToYard(false));
        navigate("/plant-to-yard-shuttle");
      } else if (
        shuttle?.pickupYardFK?.yardPK !== undefined &&
        shuttle?.dropShuttleCityFK?.shuttleCityPK !== undefined
      ) {
        dispatch(setSavedSuccessForYardToPlant(false));
        navigate("/yard-to-plant-shuttle");
      } else {
        dispatch(setSavedSuccessForPlantToYard(false));
        dispatch(setSavedSuccessForYardToPlant(false));
        dispatch(setSavedSuccessForYardToYard(false));
        dispatch(setSavedSuccessForPlantToPlant(false));
        navigate("/additional-shuttle");
      }
    } else {
      dispatch(setSavedSuccessForPlantToYard(false));
      dispatch(setSavedSuccessForYardToPlant(false));
      dispatch(setSavedSuccessForYardToYard(false));
      dispatch(setSavedSuccessForPlantToPlant(false));
      navigate("/additional-shuttle");
    }
  };

  const handleShuttleToYard = () => {
    const sourceData = flag === "multipleOrderEntryRecords" ? multipleShuttleData : openShuttleData;

    const validShuttles =
      sourceData?.filter((shuttle) => shuttle?.pickupShuttleCityFK && shuttle?.dropYardFK) ?? [];

    const firstShuttle = validShuttles[0];

    if (
      (flag === "multipleOrderEntryRecords" &&
        firstShuttle?.driverFKInt === null &&
        firstShuttle?.sisterDriverFK === null) ||
      flag === ""
    ) {
      if (firstShuttle) {
        dispatch(setUnitShuttlesPK(firstShuttle.unitShuttlePK));
        dispatch(setUnitShuttleData(firstShuttle));

        //  Navigate immediately with fresh shuttle
        setDriverPayConfirmationPopUpShow(false);
        handleNavigation(firstShuttle);
        return;
      }
    }

    setDriverPayConfirmationPopUpShow(false);
    handleNavigation();
  };

  const handleShuttleToPlant = () => {
    const sourceData = flag === "multipleOrderEntryRecords" ? multipleShuttleData : openShuttleData;

    const validShuttles =
      sourceData?.filter((shuttle) => shuttle?.pickupYardFK && shuttle?.dropShuttleCityFK) ?? [];

    const firstShuttle = validShuttles[0];

    if (
      (flag === "multipleOrderEntryRecords" &&
        firstShuttle?.driverFKInt === null &&
        firstShuttle?.sisterDriverFK === null) ||
      flag === ""
    ) {
      if (firstShuttle) {
        dispatch(setUnitShuttlesPK(firstShuttle.unitShuttlePK));
        dispatch(setUnitShuttleData(firstShuttle));

        // Pass firstShuttle explicitly so navigation works immediately
        setDriverPayConfirmationPopUpShow(false);
        handleNavigation(firstShuttle);
        return; // prevent calling again below
      }
    }

    setDriverPayConfirmationPopUpShow(false);
    handleNavigation(); // fallback if no firstShuttle
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        {(openShuttleLoading || multipleShuttleLoading || postLoading) && <LoadingIcon />}
        {/* Delay */}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={
            unitNumberSelected !== "" && allUnitsData?.length > 0 && isEligibleForDelay ? false : true
          }
          onClick={() => {
            dispatch(setSavedSuccessForShuttleDelay(false));
            navigate("/shuttle-delay");
          }}
        >
          Delay
        </button>

        {/* ONE */}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={
            allUnitsData?.length === 0 &&
            (unitNumberSelected.length >= 5 || unitNumberLast5.length === 5) &&
            isUnitShuttleONEUnique
              ? false
              : true
          }
          onClick={() => {
            dispatch(setSavedSuccessForOrderNotEnter(false));
            navigate("/shuttle-order-not-enter");
          }}
        >
          ONE
        </button>

        {/* Dealer */}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={
            unitNumberSelected === "" &&
            (unitNumberLast5 === "" || (unitNumberLast5.length < 5 && unitNumberLast5 !== "")) &&
            driverDefaultCompanyName === selectedDriverCompany
              ? false
              : true
          }
          onClick={() => {
            dispatch(setSavedSuccessForDealerShuttle(false));
            getDealerShuttleList();
          }}
        >
          {loader === true ? (
            <div className="loader-container">
              <div className="loader_YardCheckin"></div>
            </div>
          ) : (
            "Dealer"
          )}
        </button>

        {/* Bonus */}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={unitNumberSelected !== "" && allUnitsData?.length > 0 ? false : true}
          onClick={() => {
            if (!isEligibleForBonus) {
              setModalPopupForBonus(true);
            } else {
              setModalPopupForBonus(false);
              dispatch(setSavedSuccessForShuttleBonus(false));
              navigate("/shuttle-bonus");
            }
          }}
        >
          Bonus
        </button>

        {/* Dry Run */}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={pickupCityIDForPlantToYard !== "" && deliveryYardIDForPlantToYard ? false : true}
          onClick={() => {
            dispatch(setSavedSuccessForDryRun(false));
            navigate("/dry-run");
          }}
        >
          Dry Run
        </button>

        {/* Next */}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          disabled={unitNumberSelected !== "" && allUnitsData?.length > 0 ? false : true}
          onClick={() => {
            if (openShuttleData?.length > 1 || multipleShuttleData?.length > 1) {
              if (flag4) {
                setMultipleUnitsPlantModalShow(false);
                setMultipleUnitsModalShow(false);
                handleNavigation();
              }
              if (flag2) {
                setMultipleUnitsPlantModalShow(true);
              } else if (flag3) {
                setMultipleUnitsModalShow(true);
              } else {
                setMultipleUnitsModalShow(true);
              }
            } else {
              handleNavigation();
            }
          }}
        >
          Next
        </button>

        {/* Post Pay */}
        {!selectedDriverCompanyDetails?.processShuttlePay && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            disabled={
              unitNumberSelected !== "" ||
              (allUnitsData?.length === 0 &&
                (unitNumberSelected.length >= 5 || unitNumberLast5.length === 5) &&
                isUnitShuttleONEUnique) ||
              driverDefaultCompanyName !== selectedDriverCompany ||
              !enablePostPay
                ? true
                : false
            }
            onClick={() => setDriverPayConfirmationPopUpShow(true)}
          >
            {driverPayLoader === true ? (
              <div className="loader-container">
                <div className="loader_YardCheckin"></div>
              </div>
            ) : (
              "Post Pay"
            )}
          </button>
        )}

        {/* Cancel Button */}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={reset}
        >
          Cancel
        </button>
      </div>
      <WarningModalPopUp
        show={modalPopup}
        onHide={warningPopupModalHide}
        title={saveError === true ? "Error" : "Success"}
        body={saveError === true ? errorMessage : "Driver Payment Processed Successfully."}
        handleOK={warningPopupModalHide}
        showOK={true}
        color={saveError === true ? "red" : "Black"}
      />
      <WarningModalPopUp
        show={modalPopupForBonus}
        onHide={() => setModalPopupForBonus(false)}
        title={"Warning"}
        body={"Bonus not applicable. Selected driver hasn't shuttled this unit."}
        handleOK={() => {
          setModalPopupForBonus(false);
          dispatch(toggleCancelChanges());
          dispatch(setUnitNumberLast5(""));
          dispatch(setChangeColor(false));
          dispatch(setUnitNumberPK(""));
          dispatch(setPageNumber(0));
          dispatch(setUnitNumberInput(""));
          dispatch(setSpecialCodeOfSelectedUnit(""));
          dispatch(setIsSelectedUnitTowable(""));
          dispatch(setIsSelectedUnitMotorized(""));
          dispatch(setPickupCityIDForPlantToYard(""));
          dispatch(setDeliveryYardIDForPlantToYard(""));
          dispatch(setIsEligibleForBonus(false));
          navigate("/yard-checkin-unit-selection");
        }}
        showOK={true}
        color={"red"}
      />
      <WarningModalPopUp
        show={driverPayConfirmationPopUpShow}
        onHide={() => {
          setDriverPayConfirmationPopUpShow(false);
        }}
        title={"Confirm Payment for Shuttle Units"}
        body={"Please confirm payment for selected driver's shuttle units?"}
        showYes={true}
        handleYES={() => {
          handleDriverPayment();
        }}
        showNo={true}
        handleNO={() => {
          setDriverPayConfirmationPopUpShow(false);
        }}
      />
      <WarningModalPopUp
        show={multipleUnitsModalShow}
        onHide={() => {
          setMultipleUnitsModalShow(false);
        }}
        title={"Confirm shuttle to Delivery Yard"}
        body={"Please confirm if you want to Shuttle to delivery yard"}
        showYes={true}
        handleYES={() => {
          handleShuttleToYard();
        }}
        showNo={true}
        handleNO={() => {
          if (flag3) {
            handleNavigation();
          } else {
            setMultipleUnitsModalShow(false);
          }
          setMultipleUnitsPlantModalShow(true);
        }}
      />
      <WarningModalPopUp
        show={multipleUnitsPlantModalShow}
        onHide={() => {
          setMultipleUnitsPlantModalShow(false);
        }}
        title={"Confirm shuttle to Delivery Plant"}
        body={"Please confirm if you want to Shuttle to delivery plant"}
        showYes={true}
        handleYES={() => {
          handleShuttleToPlant();
        }}
        showNo={true}
        handleNO={() => {
          if (flag2) {
            handleNavigation();
          } else {
            setMultipleUnitsPlantModalShow(false);
          }
        }}
      />
    </div>
  );
}

export default UnitSelectionFooter;
