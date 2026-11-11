import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToCheckinList,
  resetApuArrays,
  resetApuScreen,
  resetBrowsePage,
  resetUndispatchDetails,
  setAPUCreditCardArrayList,
  setApuFiles,
  setCreditCardArrayList,
  setCreditCardConfirmationFlag,
  setDriverName,
  setReasonForActivationDelay,
  setSaving,
  setSelectedDispatch,
  setUndispatchBreakdownFlag,
  setUndispatchFlag,
  setUndispatchdelayFlag,
} from "../../../../../../../../redux/UndispatchSlice";
import { useDispatch, useSelector } from "react-redux";
import UndispatchService from "../../../../../../../../services/UndispatchService";
import LoadingText from "../../../../../../../common/LoadingText";
import toast from "react-hot-toast";
import ModalComponent from "../../../../../../../common/ModalComponent";
const UnDispatchDetailFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cancelShow, setCancelShow] = useState(false);
  const { driverId, dispatchId } = useParams();

  const [disableNext, setDisableNext] = useState(true);
  const [disableUndispatch, setDisableUndispatch] = useState(true);
  const [disable, setDisable] = useState(false);

  const dispatchData = useSelector((state) => state.undispatchReducer.dispatchData);
  const activationStatus = useSelector((state) => state.undispatchReducer.activationStatus);
  const equipment = useSelector((state) => state.undispatchReducer.equipment);
  const checkEquipment = useSelector((state) => state.undispatchReducer.checkEquipment);
  const deleteUnit = useSelector((state) => state.undispatchReducer.deleteUnit);
  const unitOnHold = useSelector((state) => state.undispatchReducer.unitOnHold);
  const attemptedPickup = useSelector((state) => state.undispatchReducer.attemptedPickup);
  const undispatchReason = useSelector((state) => state.undispatchReducer.undispatchReason);
  const conditionIssues = useSelector((state) => state.undispatchReducer.conditionIssues);
  const checkedinList = useSelector((state) => state.undispatchReducer.checkedinList);
  const driverAmount = useSelector((state) => state.undispatchReducer.driverAmount);
  const invoiceAmount = useSelector((state) => state.undispatchReducer.invoiceAmount);
  const billingCustomerId = useSelector((state) => state.undispatchReducer.billingCustomerId);
  const billingCustomer = useSelector((state) => state.undispatchReducer.billingCustomer);
  const chargeCreditcard = useSelector((state) => state.undispatchReducer.chargeCreditcard);
  const apuAuthorizedBy = useSelector((state) => state.undispatchReducer.apuAuthorizedBy);
  const invoiceTrextArray = useSelector((state) => state.undispatchReducer.invoiceTrextArray);
  const unitId = useSelector((state) => state.undispatchReducer.unitId);
  const customerId = useSelector((state) => state.undispatchReducer.customerId);
  const reasonForActivationDelay = useSelector((state) => state.undispatchReducer.reasonForActivationDelay);
  const customerApuPaperworkFiles = useSelector((state) => state.undispatchReducer.customerApuPaperworkFiles);
  const miscellaneousInvoiceTextArray = useSelector(
    (state) => state.undispatchReducer.miscellaneousInvoiceTextArray
  );

  const holdReason = useSelector((state) => state.undispatchReducer.holdReason);
  const holdNote = useSelector((state) => state.undispatchReducer.holdNote);
  const holdAuthorizedBy = useSelector((state) => state.undispatchReducer.holdAuthorizedBy);
  const deleteReason = useSelector((state) => state.undispatchReducer.deleteReason);
  const saving = useSelector((state) => state.undispatchReducer.saving);

  const apuFiles = useSelector((state) => state.undispatchReducer.apuFiles);
  const { customerUploadFiles, companyUploadFiles, customerScanFiles, companyScanFiles } = apuFiles;

  const undispatchFlag = useSelector((state) => state.undispatchReducer.undispatchFlag);

  const creditCardArrayList = useSelector((state) => state.undispatchReducer.creditCardArrayList);

  const invoiceBillingCustomerId = useSelector((state) => state.undispatchReducer.invoiceBillingCustomerId);
  const apuCreditCardArrayList = useSelector((state) => state.undispatchReducer.apuCreditCardArrayList);
  const sisterNotification = useSelector((state) => state.undispatchReducer.sisterNotification);
  const [transIDs, setTransIDs] = useState("");
  const monetraFinalArray = [...creditCardArrayList, ...apuCreditCardArrayList];

  const onUndispatch = () => {
    dispatch(setSaving(true)); // Set saving state to true

    const customerApuPaperworkFiles = [...customerUploadFiles, ...customerScanFiles];
    const companyApuPaperworkFiles = [...companyUploadFiles, ...companyScanFiles];

    UndispatchService.undispatchRecord(
      dispatchId,
      conditionIssues,
      activationStatus,
      equipment,
      unitOnHold,
      deleteUnit,
      attemptedPickup,
      undispatchReason,
      (dispatchData?.netPay || 0) - (dispatchData?.payBalance || 0),
      checkedinList?.length ? checkedinList.join(",") : "",
      reasonForActivationDelay,
      holdAuthorizedBy,
      holdNote,
      holdReason,
      deleteReason,
      driverAmount,
      invoiceAmount,
      apuAuthorizedBy,
      invoiceTrextArray?.[0] || "",
      invoiceTrextArray?.[1] || "",
      invoiceTrextArray?.[2] || "",
      invoiceTrextArray?.[3] || "",
      invoiceBillingCustomerId,
      false, //indicate not releaseDriver
      null,
      monetraFinalArray,
      transIDs,
      dispatchData?.unitPk ?? dispatchData?.sisterUnitFK,
      dispatchData?.unitCompany,
      dispatchData?.deliveryDealerFlag,
      dispatchData?.overWidth,
      sisterNotification,
      companyApuPaperworkFiles?.length > 0 || customerApuPaperworkFiles?.length > 0 ? true : false, //documentflag
      chargeCreditcard,
      creditCardArrayList?.length > 0 ? true : false,
      false, //breakdwon bit for release driver
      miscellaneousInvoiceTextArray?.[0] || "",
      miscellaneousInvoiceTextArray?.[1] || "",
      miscellaneousInvoiceTextArray?.[2] || "",
      miscellaneousInvoiceTextArray?.[3] || "",
      miscellaneousInvoiceTextArray?.[4] || "",
      miscellaneousInvoiceTextArray?.[5] || "",
      miscellaneousInvoiceTextArray?.[6] || "",
      miscellaneousInvoiceTextArray?.[7] || "",
      miscellaneousInvoiceTextArray?.[8] || ""
    )
      .then((res) => {
        const data = res?.data?.[0];

        if (data?.cardData?.errorCode === 1) {
          setTransIDs(data?.cardData?.refTranID);
          dispatch(
            setCreditCardArrayList((prevList) =>
              prevList.map((card) =>
                data?.cardData?.completedCards?.includes(card?.unmaskedCardNumber)
                  ? { ...card, processed: 1 }
                  : card
              )
            )
          );
          dispatch(
            setAPUCreditCardArrayList((prevList) =>
              prevList.map((card) =>
                data?.cardData?.completedCards?.includes(card?.unmaskedCardNumber)
                  ? { ...card, processed: 1 }
                  : card
              )
            )
          );
        }
        const customerApuPaperworkFiles = [...customerUploadFiles, ...customerScanFiles];
        const companyApuPaperworkFiles = [...companyUploadFiles, ...companyScanFiles];
        if (data?.cardData?.errorCode !== 1) {
          if (companyApuPaperworkFiles.length > 0 || customerApuPaperworkFiles.length > 0) {
            const invoiceId = data.invoiceFK;
            const invoiceNumber = data.invoiceNumber;
            const localCompanyName = data.LocalCompanyName;

            let sisterInvoiceId;
            let sisterInvoiceNumber;
            let sisterCompanyName;
            let sisterUserFK;

            if (data.sisterInvoiceFK == null) {
              sisterInvoiceId = "";
              sisterInvoiceNumber = "";
              sisterCompanyName = "";
              sisterUserFK = "";
            } else {
              sisterInvoiceId = data.sisterInvoiceFK;
              sisterInvoiceNumber = data.sisterInvoiceNumber;
              sisterCompanyName = data.SisterCompanyName;
              sisterUserFK = data.SystemAdministratorUserFK;
            }

            UndispatchService.saveApuDocuments(
              dispatchId,
              invoiceId,
              localCompanyName,
              sisterInvoiceId,
              invoiceNumber,
              sisterInvoiceNumber,
              sisterCompanyName,
              sisterUserFK,
              invoiceBillingCustomerId,
              customerApuPaperworkFiles,
              companyApuPaperworkFiles,
              chargeCreditcard
            )
              .then(() => {
                dispatch(setSaving(false));
                dispatch(resetUndispatchDetails());
                dispatch(resetBrowsePage());
                dispatch(resetApuScreen());
                dispatch(setDriverName(""));
                dispatch(setSelectedDispatch(null));
                dispatch(setCreditCardConfirmationFlag(false));
                if (conditionIssues === "Breakdown") {
                  dispatch(setUndispatchBreakdownFlag(true));
                  navigate(
                    "/new-breakdown/" +
                      dispatchData?.unitCompany +
                      "/" +
                      (dispatchData?.unitPk ?? dispatchData?.sisterUnitFK) +
                      "/" +
                      Number(driverId) +
                      "/" +
                      0
                  );
                } else if (conditionIssues === "Damage") {
                  dispatch(setUndispatchdelayFlag(true));
                  navigate(
                    "/new-damage/" +
                      dispatchData?.unitCompany +
                      "/" +
                      (dispatchData?.unitPk ?? dispatchData?.sisterUnitFK) +
                      "/" +
                      Number(driverId) +
                      "/" +
                      0
                  );
                } else {
                  navigate("/undispatch/" + driverId);
                  dispatch(setUndispatchFlag(false));
                }
                dispatch(resetUndispatchDetails());
                toast.success("Undispatch Done Successfully");
              })
              .catch(() => {
                dispatch(resetUndispatchDetails());
                dispatch(resetApuScreen());
                dispatch(setDriverName(""));
                dispatch(setSaving(false));
                dispatch(resetBrowsePage());
                dispatch(setCreditCardConfirmationFlag(false));
                navigate("/undispatch/" + driverId);
                toast.error("Something  went wrong");
              });
          } else {
            dispatch(setSaving(false));

            if (conditionIssues === "Breakdown") {
              navigate(
                "/new-breakdown/" +
                  dispatchData?.unitCompany +
                  "/" +
                  (dispatchData?.unitPk ?? dispatchData?.sisterUnitFK) +
                  "/" +
                  Number(driverId) +
                  "/0"
              );
              dispatch(setUndispatchBreakdownFlag(true));
            } else if (conditionIssues === "Damage") {
              navigate(
                "/new-damage/" +
                  dispatchData?.unitCompany +
                  "/" +
                  (dispatchData?.unitPk ?? dispatchData?.sisterUnitFK) +
                  "/" +
                  Number(driverId) +
                  "/0"
              );
              dispatch(setUndispatchdelayFlag(true));
            } else {
              navigate("/undispatch/" + driverId);
              dispatch(setUndispatchFlag(false));
            }
            dispatch(resetUndispatchDetails());
            dispatch(resetBrowsePage());
            toast.success("Undispatch Done Successfully");
          }
        }
      })
      .catch(() => {
        navigate("/undispatch/" + driverId);
        dispatch(setSaving(false));
        dispatch(setCreditCardConfirmationFlag(false));
        dispatch(setUndispatchFlag(false));
        dispatch(resetBrowsePage());
        toast.error("Something  went wrong");
      })
      .finally(() => {
        dispatch(setSelectedDispatch(null));
        dispatch(setApuFiles({ actionType: "clear" }));
      });
  };

  const handleBack = () => {
    if (deleteUnit) {
      navigate(`/undispatch-delete-unit-screen/${driverId}/${dispatchId}`);
    } else if (attemptedPickup) {
      navigate(`/undispatch-apu-document-screen/${driverId}/${dispatchId}`);
    } else if (unitOnHold) {
      navigate(`/undispatch-hold-screen/${driverId}/${dispatchId}`);
    } else if (activationStatus === "Delay") {
      navigate(`/undispatch-activation-delay-screen/${driverId}/${dispatchId}`);
    } else if (equipment === "Checkin" && checkEquipment) {
      navigate(`/undispatch-equipment-return-screen/${driverId}/${dispatchId}`);
    }
  };

  const handleNext = () => {
    if (equipment === "Checkin" && checkEquipment) {
      navigate(`/undispatch-equipment-return-screen/${driverId}/${dispatchId}`);
    } else if (activationStatus === "Delay") {
      navigate(`/undispatch-activation-delay-screen/${driverId}/${dispatchId}`);
    } else if (unitOnHold) {
      navigate(`/undispatch-hold-screen/${driverId}/${dispatchId}`);
    } else if (deleteUnit) {
      navigate(`/undispatch-delete-unit-screen/${driverId}/${dispatchId}`);
    } else if (attemptedPickup) {
      navigate(`/undispatch-apu-screen/${driverId}/${dispatchId}`);
    }
  };

  useEffect(() => {
    if (window.location.pathname === `/undispatch-confirmation/${driverId}/${dispatchId}`) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [window]);

  useEffect(() => {
    if (
      (conditionIssues === "None" || conditionIssues === "Breakdown" || conditionIssues === "Damage") &&
      activationStatus !== "Delay" &&
      (!checkEquipment || equipment === "Next Driver") &&
      !attemptedPickup &&
      undispatchReason?.trim() &&
      !deleteUnit &&
      !unitOnHold
    ) {
      setDisableUndispatch(false);
    } else {
      setDisableUndispatch(true);
    }

    if (
      // conditionIssues !== "None" ||
      (activationStatus === "Delay" ||
        (equipment === "Checkin" && checkEquipment) ||
        deleteUnit ||
        attemptedPickup ||
        unitOnHold) &&
      undispatchReason?.trim()
    ) {
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }, [
    activationStatus,
    conditionIssues,
    equipment,
    deleteUnit,
    unitOnHold,
    undispatchReason,
    attemptedPickup,
    checkEquipment,
  ]);

  const handleCancelShow = () => {
    if (
      disable ||
      (!attemptedPickup &&
        !unitOnHold &&
        !deleteUnit &&
        activationStatus != "Delay" &&
        equipment !== "Checkin")
    ) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      navigate("/undispatch/" + driverId);
      dispatch(resetUndispatchDetails());
      toast.success("Changes Cancelled");
      dispatch(setCreditCardConfirmationFlag(false));
      dispatch(setUndispatchFlag(false));
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    navigate("/undispatch/" + driverId);
    dispatch(resetUndispatchDetails());
    toast.success("Changes Cancelled");
    dispatch(setUndispatchFlag(false));
    dispatch(setCreditCardConfirmationFlag(false));
    setCancelShow(false);
  };
  useEffect(() => {
    if (!undispatchFlag) {
      navigate(`/undispatch/${driverId}`);
    }
  }, [undispatchFlag]);
  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          disabled={disableUndispatch && !disable}
          onClick={onUndispatch}
        >
          Undispatch
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={handleNext}
          disabled={disableNext}
          hidden={disable}
        >
          Next
        </button>{" "}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            if (disable) {
              handleBack();
            } else {
              navigate(`/undispatch-unit-confirmation-screen/${driverId}/${dispatchId}`);
            }
          }}
        >
          Back
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Undispatch Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
      {saving && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnDispatchDetailFooter;
