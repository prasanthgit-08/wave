import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DelayProcessingService from "../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import {
  setActiveKey,
  setCustomerNotes,
  setDelayContact,
  setDelayContactExtension,
  setDelayContactFAX,
  setDelayContactPhone,
  setDelayCustomerNotes,
  setDelayDate,
  setDelayedUnitCodeFK,
  setDelayedUnitCodeInput,
  setDelayedUnitPK,
  setDelayInHouseNotes,
  setDelayReturnByDriver,
  setDeliveryCheck,
  setDriverReleased,
  setEditFlag,
  setEmailData,
  setEmailList,
  setInHouseNotes,
  setIsEmailClicked,
  setIsMiscDelivery,
  setIsMiscPickup,
  setIsPostal,
  setLocationContact,
  setLocationPhone,
  setMiscMoveDeliveryDetails,
  setMoveData,
  setReported,
  setReturnDetails,
  setReturnValidEntry,
  setViewOnly,
} from "../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import { setNotes, setSelectedCompanyName } from "../../../../redux/EditMaster/UnitSelectionSlice";
import ModalComponent from "../../../common/ModalComponent";
import { CompanyName } from "../../../../services/constants/applicationConstants";
import {
  resetSplitTripLocation,
  setMiscellaneousDealerData,
  setSplitTripFiles,
  setSplitTripMilesData,
  setUndispatchFlag,
} from "../../../../redux/UndispatchSlice";
import { PermissionKeyGeneratorUtil } from "../../../../utils/PermissionKeyGeneratorUtil";

const Footer = () => {
  const { companyName, driverfk, unitfk } = useParams();
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isReroute, setIsReroute] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const [isReleaseDriver, setIsReleaseDriver] = useState(false);
  const [isReturn, setIsReturn] = useState(false);
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const [selectedCompanyName, setCompanyName] = useState(() => {
    // Initialize state from localStorage
    return localStorage.getItem("selectedCompany");
  });
  const editFlag = useSelector((state) => state.delayProcessing.editFlag);
  const breakdownData = useSelector((state) => state.delayProcessing.breakdown);
  const damageData = useSelector((state) => state.delayProcessing.damage);
  const viewOnly = useSelector((state) => state.delayProcessing.viewOnly);
  const user = useSelector((state) => state.delayProcessing.user);
  const inHouseNotes = useSelector((state) => state.delayProcessing.inHouseNotes);
  const delayedUnitCodeFK = useSelector((state) => state.delayProcessing.delayedUnitCodeFK);
  const delayDate = useSelector((state) => state.delayProcessing.delayDate);
  const workingUnitLocationFK = useSelector((state) => state.delayProcessing.workingUnitLocationFK);
  const reportedDate = useSelector((state) => state.delayProcessing.reported);
  const delayContact = useSelector((state) => state.delayProcessing.delayContact);
  const delayContactPhone = useSelector((state) => state.delayProcessing.delayContactPhone);
  const delayContactExtension = useSelector((state) => state.delayProcessing.delayContactExtension);
  const delayContactFAX = useSelector((state) => state.delayProcessing.delayContactFAX);
  const customerNotes = useSelector((state) => state.delayProcessing.customerNotes);
  const delayInHouseNotes = useSelector((state) => state.delayProcessing.delayInHouseNotes);
  const delayCustomerNotes = useSelector((state) => state.delayProcessing.delayCustomerNotes);
  const emailData = useSelector((state) => state.delayProcessing.emailList);
  const locationContact = useSelector((state) => state.delayProcessing.locationContact);
  const locationPhone = useSelector((state) => state.delayProcessing.locationPhone);
  const activeKey = useSelector((state) => state.delayProcessing.activeKey);
  const delayedUnitCode = useSelector((state) => state.delayProcessing.delayedUnitCodeFK);
  const isPostal = useSelector((state) => state.delayProcessing.isPostal);
  const initialEmailList = useSelector((state) => state.delayProcessing.initialEmailList);
  const isCurrentLocEmpty = useSelector((state) => state.delayProcessing.isCurrentLocEmpty);
  const delayedUnitPK = useSelector((state) => state.delayProcessing.delayedUnitPK);
  let dealerCity = useSelector((state) => state.editDealerReducer.dealerCity);
  let dealerState = useSelector((state) => state.editDealerReducer.dealerStatecode);
  let dealerPost = useSelector((state) => state.editDealerReducer.dealerPostcode);

  const currentLocation = useSelector((state) => state.delayProcessing.currentLocation);
  const sendNotificationEmails = useSelector((state) => state.delayProcessing.sendNotificationEmails);
  const sendUpdateEmails = useSelector((state) => state.delayProcessing.sendUpdateEmails);
  const isDelayLocalCompany = useSelector((state) => state.delayProcessing.isDelayLocalCompany);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const [cancelShow, setCancelShow] = useState(false);
  const handleCancelNo = () => setCancelShow(false);
  const [activeShow, setActiveShow] = useState(false);
  const [active, setActive] = useState(true);
  const returnDetails = useSelector((state) => state.delayProcessing.returnDetails);

  //prevent users from navigating back to the previous page when they try to hit the back button.
  window.history.pushState(null, "", window.location.href);

  const [disableEdit, setDisableEdit] = useState(false);
  const [disableComment, setDisableComment] = useState(false);
  const [disableEmail, setDisableEmail] = useState(false);
  const [disableReturn, setDisableReturn] = useState(false);
  const [disableRelease, setDisableRelease] = useState(false);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("delay", "edit");
  const commentPermission = PermissionKeyGeneratorUtil("delay", "comment");
  const emailPermission = PermissionKeyGeneratorUtil("delay", "email");

  const [savedCompanyName, setSavedCompanyName] = useState(() => {
    // Initialize state from localstorage
    return localStorage.getItem("selectedCompany");
  });

  useEffect(() => {
    if (delayedUnitPK) {
      DelayProcessingService.isReturnActive(unitfk)
        .then(({ data }) => {
          setDisableReturn(!data);
        })
        .catch(() => {
          setDisableReturn(true);
        });

      DelayProcessingService.isReleaseActive(unitfk)
        .then(({ data }) => {
          setDisableRelease(!data);
        })
        .catch(() => {
          setDisableRelease(true);
        });
    } else {
      setDisableRelease(true);
      setDisableReturn(true);
    }
  }, [delayedUnitPK]);
  useEffect(() => {
    DelayProcessingService.isReturnActive(unitfk)
      .then(({ data }) => {
        setDisableReturn(!data);
      })
      .catch(() => {
        setDisableReturn(true);
      });
    DelayProcessingService.isReleaseActive(unitfk)
      .then(({ data }) => {
        setDisableRelease(!data);
      })
      .catch(() => {
        setDisableRelease(true);
      });
  }, []);
  useEffect(() => {
    if (deniedPermissions) {
      const formattedEmailPermission = emailPermission?.replace(/:/g, "_");
      setDisableEdit(deniedPermissions?.includes(editPermission?.replace(/:/g, "_")));
      setDisableComment(deniedPermissions?.includes(commentPermission?.replace(/:/g, "_")));
      setDisableEmail(deniedPermissions?.includes(formattedEmailPermission));
    }
  }, []);
  const saveDelay = () => {
    let sisterCompanyFK = null;
    let sisterDelayedUnitFK = null;
    let sisterUnitFK = null;
    let sisterDispatchFK = null;
    let delayUnitLocationFK = 3;
    let atPickup = false;
    let inYard = false;
    let breakdown = false;
    let damage = false;
    let delay = true;
    let returned = false;
    let returnedBySameDriver = false;
    let returnedToPickupLocation = false;
    let unitReturnFK = null;
    let refused = false;
    let active = true;
    let lastUpdate = null;
    let driverReleased = false;
    let driverReleaseDate = null;
    let updatedLocation;
    if (currentLocation?.postalCode?.length > 0) {
      updatedLocation = currentLocation;
    } else {
      updatedLocation = {
        ...currentLocation,
        city: dealerCity,
        stateCode: dealerState,
        postalCode: dealerPost,
      };
    }

    if (!editFlag) {
      if (!delayContact) {
        toast.error("Save Failed. Delay Contact is not present");
      } else {
        DelayProcessingService.saveDelay(
          rowData?.delayedUnitPK,
          rowData?.unitPK,
          rowData?.dispatchPK,
          sisterCompanyFK,
          sisterDelayedUnitFK,
          sisterUnitFK,
          sisterDispatchFK,
          rowData?.driverFK,
          rowData?.transportCompanyFK,
          delayedUnitCodeFK,
          delayUnitLocationFK,
          workingUnitLocationFK,
          delayDate,
          reportedDate,
          delayContact,
          delayContactPhone,
          delayContactExtension,
          delayContactFAX,
          atPickup,
          inYard,
          breakdown,
          damage,
          delay,
          returned,
          returnedBySameDriver,
          returnedToPickupLocation,
          unitReturnFK,
          refused,
          active,
          lastUpdate,
          driverReleased,
          driverReleaseDate,
          delayInHouseNotes,
          delayCustomerNotes,
          inHouseNotes,
          customerNotes,
          updatedLocation,
          rowData?.terminateDelivery,
          rowData?.releasedForDispatch,
          rowData?.orderCanceled,
          rowData?.leftPickupLocation,
          rowData?.releasedAtYard,
          rowData?.pickupAtYard,
          rowData?.resolved,
          user,
          selectedCompanyName,
          sendNotificationEmails,
          sendUpdateEmails,
          locationContact,
          locationPhone,
          disableEmail
        )
          .then((response) => {
            const delayedUnitPK = response?.data?.split(":")[1]?.trim();
            dispatch(setDelayedUnitPK(delayedUnitPK));
            const updatedEmailList = emailListWithDelayedUnitPK(delayedUnitPK);
            saveEmail(updatedEmailList);
            toast.success("Delay added to the Unit");
            navigate(-3);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Delay Save Failed");
          });
      }
    } else {
      saveEditedDelay();
    }
  };

  const saveEditedDelay = () => {
    if (rowData?.inHouseNotes != null) {
      dispatch(setInHouseNotes(rowData?.inHouseNotes + inHouseNotes));
    }
    if (rowData?.customerNotes != null) {
      dispatch(setCustomerNotes(rowData?.customerNotes + customerNotes));
    }
    DelayProcessingService.saveDelay(
      rowData?.delayedUnitPK,
      rowData?.unit.unitPK,
      rowData?.dispatchFK,
      rowData?.sisterCompanyFK,
      rowData?.sisterDelayedUnitFK,
      rowData?.sisterUnitFK,
      rowData?.sisterDispatchFK,
      rowData?.driverFK,
      rowData?.transportCompanyFK,
      delayedUnitCodeFK,
      rowData?.delayUnitLocationFK,
      rowData?.workingUnitLocationFK,
      delayDate,
      reportedDate,
      delayContact,
      delayContactPhone,
      delayContactExtension,
      delayContactFAX,
      rowData?.atPickup,
      rowData?.inYard,
      rowData?.breakdown,
      rowData?.damage,
      rowData?.delay,
      rowData?.returned,
      rowData?.returnedBySameDriver,
      rowData?.returnedToPickupLocation,
      rowData?.delayedUnitReturnFK,
      rowData?.refused,
      rowData?.active,
      rowData?.lastUpdate,
      rowData?.driverReleased,
      rowData?.driverReleaseDate,
      delayInHouseNotes,
      delayCustomerNotes,
      inHouseNotes,
      customerNotes,
      rowData?.workingUnitLocationDetails,
      rowData?.terminateDelivery,
      rowData?.releasedForDispatch,
      rowData?.orderCanceled,
      rowData?.leftPickupLocation,
      rowData?.releasedAtYard,
      rowData?.pickupAtYard,
      rowData?.resolved,
      user,
      selectedCompanyName,
      sendNotificationEmails,
      sendUpdateEmails,
      locationContact,
      locationPhone,
      disableEmail
    )
      .then((response) => {
        const delayedUnitPK = response?.data?.split(":")[1]?.trim();
        const updatedEmailList = emailListWithDelayedUnitPK(delayedUnitPK);
        editEmail(updatedEmailList);
        toast.success("Delayed Unit is updated");
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Delay Edit Failed");
      });
  };

  const emailListWithDelayedUnitPK = (delayedUnitPK) => {
    return emailData?.length === 0
      ? [{ email: "", delayedUnitFK: delayedUnitPK }]
      : emailData.map((email) => ({
          ...email,
          delayedUnitFK: delayedUnitPK,
        }));
  };

  const saveEmail = (updatedEmailList) => {
    DelayProcessingService.saveEmail(updatedEmailList, sendNotificationEmails, selectedCompanyName).then(
      (response) => {}
    );
  };

  const editEmail = (updatedEmailList) => {
    const comName = selectedCompanyName;
    DelayProcessingService.editEmail(updatedEmailList, sendUpdateEmails, comName).then((response) => {});
  };

  useEffect(() => {
    if (
      rowData?.delay === true &&
      rowData?.breakdown === false &&
      rowData?.damage === false &&
      rowData?.returned === false
    ) {
      setIsReroute(true);
    }

    if (
      rowData?.active === true &&
      ((!breakdownData?.repaired && !breakdownData?.furtherRepairsRequired) || damageData?.status !== "C") &&
      rowData?.driverReleased === true
    ) {
      setIsMove(true);
    }

    if (
      rowData?.delay === true &&
      rowData?.breakdown === false &&
      rowData?.damage === false &&
      rowData?.driverReleased === false &&
      breakdownData != null &&
      (breakdownData?.repaired === true || breakdownData?.furtherRepairsRequired === true) &&
      damageData != null &&
      damageData?.status === "C"
    ) {
      setIsReleaseDriver(true);
    }

    if (rowData?.breakdown === true && rowData?.returned === false) {
      setIsReturn(true);
    }

    const { delayedUnitDispatchDetails, breakdown, damage, returned } = rowData || {};
    const isPickupConditionMet =
      (delayedUnitDispatchDetails?.pickupYardFK && delayedUnitDispatchDetails?.pickupYardExit) ||
      (!delayedUnitDispatchDetails?.pickupYardFK && delayedUnitDispatchDetails?.pickedUp);

    const isBreakdownConditionMet = (breakdown || damage) && !returned;

    if (isPickupConditionMet && isBreakdownConditionMet) {
      setIsReturn(true);
    }

    if (rowData?.active) {
      setActive(true);
    } else {
      setActive(false);
    }

    dispatch(setSelectedCompanyName(savedCompanyName));
    dispatch(setReturnValidEntry(false));
  }, []);

  // Function to determine if a button should be displayed
  const shouldHideButton = (keyword) => pathname?.includes(keyword);

  const handleCancelYes = () => {
    if (!editFlag) {
      navigate("/delay-processing/delayed-unit-browse"); // Go back to the previous page
      dispatch(setLocationContact(null));
      dispatch(setLocationPhone(null));
    } else {
      dispatch(setDelayInHouseNotes(rowData?.delayInHouseNotes));
      dispatch(setDelayCustomerNotes(rowData?.delayCustomerNotes));
      dispatch(setDelayContact(rowData?.delayContact ? rowData.delayContact : ""));
      dispatch(setDelayContactPhone(rowData?.delayContactPhone));
      dispatch(setDelayContactExtension(rowData?.delayContactExtension));
      dispatch(setDelayContactFAX(rowData?.delayContactFAX));
      dispatch(setDelayedUnitCodeFK(rowData?.delayedUnitCode?.delayedUnitCodePK));
      dispatch(setDelayedUnitCodeInput(rowData?.delayedUnitCode?.description?.trim()));
      setCancelShow(false);
      dispatch(setInHouseNotes(rowData?.inHouseNotes ? rowData.inHouseNotes : ""));
      dispatch(setCustomerNotes(rowData?.customerNotes ? rowData.customerNotes : ""));
      dispatch(setViewOnly(true));
      dispatch(setEditFlag(false));
      dispatch(setNotes(null));
      dispatch(setActiveKey("general"));
      dispatch(setDelayDate(rowData?.delayDate));
      dispatch(setReported(rowData?.reported));
    }

    dispatch(setSelectedCompanyName(selectedCompanyName));
    dispatch(setEmailData(initialEmailList));
    dispatch(setEmailList(initialEmailList));

    dispatch(setIsEmailClicked(false));

    toast.success("Changes Cancelled");
  };
  //Activate and Deactivate

  const handleActiveSave = (e) => {
    e.preventDefault();
    let localDelayedUnitId = 0;
    let sisterDelayedUnitId = 0;
    let company = selectedCompanyName;
    if (!isDelayLocalCompany) {
      sisterDelayedUnitId = rowData?.delayedUnitPK;
      localDelayedUnitId = 0;
    } else {
      localDelayedUnitId = rowData?.delayedUnitPK;
      sisterDelayedUnitId = 0;
    }

    if (active === true) {
      DelayProcessingService.deactivateDelay(localDelayedUnitId, company, sisterDelayedUnitId)
        .then((response) => {
          if (response !== "Failed") {
            setActiveShow(false);
            setActive(false);
            toast.success("Delay Deactivated");
          } else {
            toast.error("Delay Deactivation Failed");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (!rowData?.unit?.canceled) {
        DelayProcessingService.activateDelay(localDelayedUnitId, company, sisterDelayedUnitId)
          .then((response) => {
            if (response !== "Failed") {
              setActiveShow(false);
              setActive(true);
              toast.success("Delay Activated");
            } else {
              toast.error("Delay Activation Failed");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        toast.error("Failed as Unit is canceled");
      }
    }
  };
  const handleActiveClose = () => setActiveShow(false);
  const handleActiveShow = () => setActiveShow(true);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("unit-details") || !viewOnly}
          disabled={!rowData?.active}
        >
          Reroute
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("unit-details") || !viewOnly}
          onClick={() => {
            navigate(`/dispatch-delay-move/${unitfk}/${driverfk}/${delayedUnitPK}`);
            dispatch(setMoveData(null));
            dispatch(setMiscMoveDeliveryDetails(null));
          }}
          disabled={!rowData?.active}
        >
          Move
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("unit-details") || !viewOnly}
          onClick={() => {
            dispatch(setUndispatchFlag(true));
            dispatch(setDriverReleased(true));
            localStorage.setItem("driverRelease", true);
            /********To Clear the Location,miles and uploaded files****/
            dispatch(resetSplitTripLocation());
            dispatch(setSplitTripFiles({ actionType: "clear" }));
            dispatch(setSplitTripMilesData(null));
          }}
          disabled={disableRelease || !active}
        >
          Release Driver
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("unit-details") || !viewOnly}
          onClick={() => {
            navigate(
              "/delay-return-details/" +
                savedCompanyName +
                "/" +
                Number(rowData?.unit.unitPK) +
                "/" +
                Number(rowData?.driverFK)
            );
            dispatch(setReturnDetails(null));
            dispatch(setIsMiscPickup(false));
            dispatch(setIsMiscDelivery(false));
            dispatch(setReturnValidEntry(true));
            dispatch(setDelayReturnByDriver(false));
          }}
          disabled={disableReturn || !active || !rowData?.driverFK}
        >
          Return
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("unit-details") || !viewOnly}
          disabled={!rowData?.active}
          onClick={() => {
            navigate(
              "/breakdown/browse/" +
                selectedCompanyName +
                "/" +
                rowData?.delayedUnitPK +
                "/" +
                rowData?.driverFK
            );
          }}
        >
          Breakdown
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("unit-details") || !viewOnly}
          onClick={() => {
            navigate(
              "/damage-unit/add/" +
                selectedCompanyName +
                "/" +
                rowData?.delayedUnitPK +
                "/" +
                rowData?.driverFK
            );
          }}
        >
          Damage
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("unit-details") || !viewOnly}
          style={active === false ? { backgroundColor: "red" } : { backgroundColor: "" }}
          onClick={handleActiveShow}
        >
          Active
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => {
            navigate(
              "/delay-processing/edit-delay/" + companyName + "/" + Number(unitfk) + "/" + Number(driverfk)
            );
          }}
        >
          Edit
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("delayed-details") && viewOnly}
          onClick={() => {
            saveDelay();
            dispatch(setEditFlag(false));
            dispatch(setActiveKey("general"));
          }}
          disabled={
            (rowData?.delay && viewOnly) ||
            (locationPhone && !formatPhoneNumber(locationPhone)?.match(phoneRegex)) ||
            isCurrentLocEmpty ||
            (rowData?.delay &&
              (!formatPhoneNumber(delayContactPhone)?.match(phoneRegex) ||
                !formatPhoneNumber(delayContactFAX)?.match(phoneRegex) ||
                delayContactExtension === null ||
                delayContactExtension?.trim()?.length < 4)) ||
            !delayedUnitCode ||
            !isPostal ||
            (!editFlag && !locationPhone) ||
            isNaN(parseLocalDate(delayDate).getTime()) ||
            isNaN(parseLocalDate(reportedDate).getTime())
          }
        >
          Save
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => {
            if (!viewOnly) {
              setCancelShow(true);
            } else {
              handleCancelYes();
            }
          }}
        >
          Cancel
        </button>
      </div>
      {/* Cancel Confirmation Modal */}
      <ModalComponent
        show={cancelShow}
        onHide={handleCancelNo}
        title={"Cancel Delay Processing Changes"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />

      {/* Active/InActive Delay Modal */}
      <ModalComponent
        show={activeShow}
        onHide={handleActiveClose}
        title={active ? "Deactivate Delay" : "Activate Delay"}
        body={
          active
            ? " Please confirm you want to Deactivate this Delay"
            : " Please confirm you want to Activate this Delay"
        }
        handleYES={handleActiveSave}
        handleNO={handleActiveClose}
      />
    </div>
  );
};

export default Footer;
