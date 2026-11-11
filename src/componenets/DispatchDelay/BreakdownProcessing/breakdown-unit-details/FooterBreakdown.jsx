import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DelayProcessingService from "../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import {
  setActiveKey,
  setBreakdownInvoiceDetails,
  setCreditCardFlag,
  setCreditCardPayment,
  setCustomerFK,
  setDocumentsTabRedisKeys,
  setEditBrkdownOfExistingDelayUnitFlag,
  setEditFlag,
  setEmailFlag,
  setEmailTabVisible,
  setIsEmailClicked,
  setIsPostal,
  setNavigateToInvoice,
  setNavigateToMainPage,
  setNavigateToSettlement,
  setPaidFlag,
  setReported,
  setUnitFK,
  setViewOnly,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import {
  setNotes,
  setSelectedCompanyName,
  setSelectedId,
} from "../../../../redux/EditMaster/UnitSelectionSlice";
import ModalComponent from "../../../common/ModalComponent";
import BreakdownProcessingService from "../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import EditMasterExpressShuttle from "../../../Units/EditMasterExpress/EditMasterExpressShuttle/EditMasterExpressShuttle";
import { setShowBreakdownShuttle } from "../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import {
  setChangeColor,
  setCompany,
  setDisplayFlag,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setTotalPages,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownFeesSlice";
import { setBrowseType, setUnitNumber } from "../../../../redux/UnitActivationSlice";
import DelayUnitExpenseService from "../../../../services/DispatchDelay/BreakdownProcessing/DelayUnitExpenseService";
import {
  setBreakdownFK,
  setDelayedUnitExpsnseId,
  setDelayedUnitId,
  setIsValid,
  setValidEntry,
  setViewDetail,
} from "../../../../redux/DelayUnitExpenseSlice";
import { PermissionKeyGeneratorUtil } from "../../../../utils/PermissionKeyGeneratorUtil";

const FooterBreakdown = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const params = useParams();
  const id = params.id;
  const breakdownFK = params.breakdownFK;
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

  const editFlag = useSelector((state) => state.delaybreakdown.editFlag);
  const paidFlag = useSelector((state) => state.delaybreakdown.paidFlag);
  const breakdownSaveFlag = useSelector((state) => state.delaybreakdown.breakdownSaveFlag);
  const editBrkdownOfExistingDelayUnitFlag = useSelector(
    (state) => state.delaybreakdown.editBrkdownOfExistingDelayUnitFlag
  );
  const breakdownData = useSelector((state) => state.delaybreakdown.breakdownData);
  const viewOnly = useSelector((state) => state.delaybreakdown.viewOnly);
  const activeKey = useSelector((state) => state.delaybreakdown.activeKey);
  const activateUnit = useSelector((state) => state.delaybreakdown.activateUnit);
  const delayedUnitExpsnseId = useSelector((state) => state.delayUnitExpenseSlice.delayedUnitExpsnseId);

  const sendEmail = useSelector((state) => state.delaybreakdown.sendEmail);
  const updateEmailbreakdown = useSelector((state) => state.delaybreakdown.updateEmail);

  const [cancelShow, setCancelShow] = useState(false);
  const handleCancelNo = () => setCancelShow(false);
  //Used for Breakdown Shuttle
  const showBreakdownShuttle = useSelector(
    (state) => state.editMasterExpressTabsReducer.showBreakdownShuttle
  );
  const [unitPK, setUnitPK] = useState("");
  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);

  const [delayBreakdownShuttleData, setDelayBreakdownShuttleData] = useState([]);
  const [isShuttleButtonDisabled, setIsShuttleButtonDisabled] = useState(false);
  const [hasValidExpenseRecord, setHasValidExpenseRecord] = useState(false);
  const [disableExpense, setDisableExpense] = useState(false);

  const creditCardPayment = useSelector((state) => state.delaybreakdown.creditCardPayment);
  const documentsTabRedisKeys = useSelector((state) => state.delaybreakdown.documentsTabRedisKeys);

  const navigatedFrom = localStorage.getItem("navigatedFrom");
  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const expenseEditPermission = PermissionKeyGeneratorUtil("DELAYUNITSEXPENSE", "EDIT");

  const editPermission = PermissionKeyGeneratorUtil("breakdown", "edit");
  const commentPermission = PermissionKeyGeneratorUtil("breakdown", "comment");
  const emailPermission = PermissionKeyGeneratorUtil("breakdown", "email");

  const [disableEdit, setDisableEdit] = useState(false);
  const [disableComment, setDisableComment] = useState(false);
  const [disableEmail, setDisableEmail] = useState(false);

  useEffect(() => {
    if (deniedPermissions) {
      const formattedEmailPermission = emailPermission?.replace(/:/g, "_");
      setDisableEdit(deniedPermissions?.includes(editPermission?.replace(/:/g, "_")));
      setDisableComment(deniedPermissions?.includes(commentPermission?.replace(/:/g, "_")));
      setDisableEmail(deniedPermissions?.includes(formattedEmailPermission));
    }
  }, []);

  const saveDelayBreakdown = () => {
    const payload = {
      ...breakdownData,
      redisKeys: documentsTabRedisKeys,
      disableEmail: disableEmail,
    };
    BreakdownProcessingService.saveBreakdown(payload)
      .then((response) => {
        if (response?.data?.result[0].DelayedUnitBreakdownFk) {
          toast.success("Breakdown added to the Unit");
          if (!disableEmail) {
            sendNotificationEmail(response?.data?.result[0].DelayedUnitBreakdownFk);
          }
          if (activateUnit) {
            dispatch(setBrowseType("SingleUnits"));
            dispatch(setUnitNumber(rowData?.unit?.unitNumber));
            navigate("/unit-activation-single-selection");
          } else {
            if (navigatedFrom === "newBreakdown") {
              navigate(
                `/delay-processing/new-delayed-unit-confirmation/${selectedCompanyName}/${rowData?.unitFK}/${rowData?.driverFK}`
              );
              setTimeout(() => {
                localStorage.removeItem("navigatedFrom");
              }, 100);
              dispatch(setNavigateToMainPage(true));
            } else if (rowData?.delayedUnitPK) {
              navigate(
                "/breakdown/browse/" +
                  selectedCompanyName +
                  "/" +
                  rowData?.delayedUnitPK +
                  "/" +
                  rowData?.driverFK
              );
            } else {
              navigate("/delay-processing/delayed-unit-browse");
            }
            dispatch(setEditBrkdownOfExistingDelayUnitFlag(false));
            dispatch(setViewOnly(true));
            dispatch(setEditFlag(false));
          }
        } else {
          toast.error("Breakdown Save Failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendNotificationEmail = (breakdownFK) => {
    if (sendEmail) {
      BreakdownProcessingService.sendNotificationEmail(selectedCompanyName, "BREAKDOWN", breakdownFK)
        .then((response) => {
          const data = response?.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (updateEmailbreakdown) {
      BreakdownProcessingService.sendUpdateNotificationEmail(selectedCompanyName, "BREAKDOWN", breakdownFK)
        .then((response) => {
          const data = response?.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Function to determine if a button should be displayed
  const shouldHideButton = (keyword) => pathname?.includes(keyword);

  const handleCancelYes = () => {
    dispatch(setDocumentsTabRedisKeys({ actionType: "clear" }));
    if (navigatedFrom === "newBreakdown") {
      navigate(
        `/delay-processing/new-delayed-unit-confirmation/${selectedCompanyName}/${rowData?.unitFK}/${rowData?.driverFK}`
      );
      setTimeout(() => {
        localStorage.removeItem("navigatedFrom");
      }, 100);
      dispatch(setNavigateToMainPage(true));
    } else if (!editBrkdownOfExistingDelayUnitFlag) {
      if (rowData?.delayedUnitPK) {
        navigate(
          "/breakdown/browse/" + selectedCompanyName + "/" + rowData?.delayedUnitPK + "/" + rowData?.driverFK
        );
      } else {
        navigate("/delay-processing/delayed-unit-browse");
      }
    } else {
      navigate("/breakdown-processing/view-breakdown/" + breakdownFK);
      dispatch(setEditBrkdownOfExistingDelayUnitFlag(false));
    }
    setCancelShow(false);
    dispatch(setEmailFlag(false));
    dispatch(setEmailTabVisible(true));
    dispatch(setViewOnly(true));
    dispatch(setEditFlag(false));
    dispatch(setNotes(null));
    dispatch(setActiveKey("general"));
    dispatch(setSelectedId(null));
    dispatch(setSelectedCompanyName(selectedCompanyName));

    dispatch(setIsEmailClicked(false));

    toast.success("Changes Cancelled");
  };
  //used for breakdown Fee
  useEffect(() => {
    dispatch(setCompany(selectedCompanyName));
  }, [selectedCompanyName]);

  //used for Breakdown Shuttle

  useEffect(() => {
    if (breakdownFK) {
      setLoader(true);

      BreakdownProcessingService.getDelayBreakdownInformation(breakdownFK)
        .then((response) => {
          const data = response?.data?.delayUnitBreakdownDetails[0];
          setDelayBreakdownShuttleData(data);
          setUnitPK(data?.unitfk);
          setLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    }
  }, [breakdownFK]);
  //used disable shuttle button
  useEffect(() => {
    if (delayBreakdownShuttleData) {
      const breaksownNotRepaired =
        delayBreakdownShuttleData?.Repaired === false &&
        delayBreakdownShuttleData?.FurtherRepairsRequired === false;

      if (
        !delayBreakdownShuttleData?.SisterUnitFK &&
        delayBreakdownShuttleData?.PickupCustomerPlantFK &&
        (delayBreakdownShuttleData?.InYard || delayBreakdownShuttleData?.AtPickup) &&
        breaksownNotRepaired &&
        !delayBreakdownShuttleData?.partialtrip
      ) {
        setIsShuttleButtonDisabled(false);
      } else {
        setIsShuttleButtonDisabled(true);
      }
    }
  }, [delayBreakdownShuttleData]);

  //Used for Breakdown Invoice
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    BreakdownProcessingService.getBreakdownInvoiceData(breakdownFK)
      .then((response) => {
        const data = response?.data;
        setFlag(data?.isDelayPresent?.[0]?.IsDelayPresent === 1);
        dispatch(setCreditCardFlag(data?.isDelayPresent?.[0]?.FODInvoice === 1));
        dispatch(setPaidFlag(data?.isDelayPresent?.[0]?.IsPaidPresent === 1));
        dispatch(setCreditCardPayment(data?.isDelayPresent?.[0]?.CreditCardPayment || ""));
        dispatch(setUnitFK(data?.isDelayPresent?.[0]?.UnitFK || null));
        dispatch(setCustomerFK(data?.isDelayPresent?.[0]?.customerFK || null));
      })
      .catch(() => {});
  }, [breakdownFK]);

  useEffect(() => {
    if (rowData?.delayedUnitPK && breakdownFK) {
      setLoader1(true);
      DelayUnitExpenseService.getData("validate", rowData?.delayedUnitPK, 0, breakdownFK, {})
        .then(({ data }) => {
          dispatch(setDelayedUnitExpsnseId(data?.DelayedUnitExpensePK || 0));
          setHasValidExpenseRecord(data?.DriverFlag || 0);
          dispatch(setDelayedUnitId(rowData?.delayedUnitPK || 0));
        })
        .catch()
        .finally(() => {
          setLoader1(false);
        });
    }
  }, [rowData]);

  useEffect(() => {
    if (hasValidExpenseRecord && (delayedUnitExpsnseId || !deniedPermissions?.includes(editPermission))) {
      setDisableExpense(false);
      dispatch(setViewDetail(hasValidExpenseRecord));
    } else {
      setDisableExpense(true);
    }
  }, [hasValidExpenseRecord, deniedPermissions, editPermission, delayedUnitExpsnseId]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("breakdown-details") || !viewOnly || editFlag}

          disabled={isShuttleButtonDisabled}

          onClick={() => {
            dispatch(setShowBreakdownShuttle(true));
          }}
        >
          Shuttle
        </button>
        <EditMasterExpressShuttle
          show={showBreakdownShuttle}
          onHide={() => dispatch(setShowBreakdownShuttle(false))}
          unitPK={unitPK}
        />
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("breakdown-details") || !viewOnly || editFlag}
          onClick={() => {
            dispatch(setNavigateToSettlement(true));
            navigate(
              `/delay-settlement/${breakdownFK}/${rowData?.delayedUnitPK}/${encodeURIComponent(selectedCompanyName)}`
            );
          }}
          disabled={!paidFlag}
        >
          Settlement
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("breakdown-details") || !viewOnly || editFlag}
          onClick={() => {
            dispatch(setNavigateToInvoice(true));
            navigate("/delay-unit-breakdown-invoice/" + breakdownFK);
          }}
          disabled={!flag}
        >
          Invoice
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("breakdown-details") || !viewOnly || editFlag}
          disabled={disableExpense}
          onClick={() => {
            dispatch(setValidEntry(true));
            dispatch(setBreakdownFK(breakdownFK));
            navigate(`/delay-unit-expense/${rowData?.delayedUnitPK}/${breakdownFK}`);
          }}
        >
          Expenses
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("breakdown-details") || !viewOnly || editFlag}
          // disabled

          onClick={() => {
            dispatch(setDisplayFlag(true));
            navigate("/delayed-unit-fees-view/" + breakdownFK);
            dispatch(setNormalSortValue(null));
            dispatch(setNormalSortFlag(false));
            dispatch(setPageNumber(0));
            dispatch(setChangeColor(false));
          }}
        >
          Fees
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={shouldHideButton("breakdown-details") || !viewOnly || editFlag}
          onClick={() => {
            dispatch(setEditFlag(true));
            dispatch(setViewOnly(true));
            dispatch(setEditBrkdownOfExistingDelayUnitFlag(true));
            dispatch(setEmailFlag(true));
            if (activeKey !== "general" && activeKey !== "documents" && activeKey !== "breakdownComments") {
              dispatch(setActiveKey("general"));
            }
          }}
        >
          Edit
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={viewOnly && !editFlag}
          onClick={() => {
            saveDelayBreakdown();
            // dispatch(setEditFlag(false));
            dispatch(setActiveKey("general"));
          }}
          disabled={!breakdownSaveFlag}
        >
          Save
        </button>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => {
            if (!viewOnly || editBrkdownOfExistingDelayUnitFlag) {
              setCancelShow(true);
            } else {
              handleCancelYes();
            }
          }}
        >
          Cancel
        </button>
      </div>
      {loader1 && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
      {/* Cancel Confirmation Modal */}
      <ModalComponent
        show={cancelShow}
        onHide={handleCancelNo}
        title={"Cancel Breakdown Processing Changes"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
    </div>
  );
};

export default FooterBreakdown;
