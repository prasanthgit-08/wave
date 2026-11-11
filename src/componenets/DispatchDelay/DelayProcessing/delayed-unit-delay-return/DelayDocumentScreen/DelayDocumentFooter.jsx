import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { useDispatch, useSelector } from "react-redux";
import {
  resetArrays,
  resetReturn,
  setCreditCardArrayList,
  setDelayReturnByDriver,
  setIsDelayUndispatch,
  setMiscDeliveryDetails,
  setMiscPickupDetails,
  setReturnDetails,
  setReturnedBySameDriver,
  setReturnRateCalc,
  setReturnValidEntry,
  setTransIds,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import toast from "react-hot-toast";
import ModalComponent from "../../../../common/ModalComponent";
import {
  setActive,
  setActiveDispatch,
  setBrowseType,
  setCompanyName,
  setUnitId,
  setUnitNumber,
  setUnitSelected,
} from "../../../../../redux/UnitActivationSlice";
import { faL } from "@fortawesome/free-solid-svg-icons";
import UndispatchService from "../../../../../services/UndispatchService";
import { useAppNavigate } from "../../../../../hooks/useAppNavigate";

const DelayDocumentFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { goBack } = useAppNavigate();
  const [returnData, setreturnData] = useState();

  const { companyName, driverfk, unitfk, delayedUnitPK } = useParams();
  const returnDetails = useSelector((state) => state.delayProcessing.returnDetails);
  const delayReturnSave = useSelector((state) => state.delayProcessing.delayReturnSave);
  const data = useSelector((state) => state.delayProcessing.data);
  const returnRate = useSelector((state) => state.delayProcessing.returnRateCalc);
  const selectedCompanyName = useSelector((state) => state.unitSelection.selectedCompanyName);

  const customerPaperworkScanFiles = useSelector((state) => state.delayProcessing.customerPaperworkScanFiles);
  const companyPaperworkScanFiles = useSelector((state) => state.delayProcessing.companyPaperworkScanFiles);
  const bolScanFiles = useSelector((state) => state.delayProcessing.bolScanFiles);
  const dafScanFiles = useSelector((state) => state.delayProcessing.dafScanFiles);
  const iftaScanFiles = useSelector((state) => state.delayProcessing.iftaScanFiles);

  const customerPaperworkFiles = useSelector((state) => state.delayProcessing.customerPaperworkFiles);
  const companyPaperworkFiles = useSelector((state) => state.delayProcessing.companyPaperworkFiles);
  const delayReturnByDriver = useSelector((state) => state.delayProcessing.delayReturnByDriver);
  const bolFiles = useSelector((state) => state.delayProcessing.bolFiles);
  const dafFiles = useSelector((state) => state.delayProcessing.dafFiles);
  const iftaFiles = useSelector((state) => state.delayProcessing.iftaFiles);

  const miscPickupAddr = useSelector((state) => state.delayProcessing.miscPickupDetails);
  const miscDeliveryAddr = useSelector((state) => state.delayProcessing.miscDeliveryDetails);
  const creditCardArrayList = useSelector((state) => state.delayProcessing.creditCardArrayList);
  const transIds = useSelector((state) => state.delayProcessing.transIds);
  const mileBalance = useSelector((state) => state.delayProcessing.mileBalance);

  const [cancelShow, setCancelShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCancelNo = () => setCancelShow(false);

  const handleCancelYes = () => {
    navigate(
      "/delay-return-details/" +
        String(companyName)?.trim() +
        "/" +
        Number(unitfk) +
        "/" +
        Number(driverfk) +
        "/" +
        delayedUnitPK
    );

    dispatch(setReturnRateCalc(null));
    dispatch(resetArrays());
    dispatch(resetReturn());
    dispatch(setReturnDetails(null));
    dispatch(setDelayReturnByDriver(false));

    toast.success("Changes Cancelled");
  };

  useEffect(() => {
    setreturnData({
      delayedUnitId: delayedUnitPK,
      unitFK: unitfk,
      dispatchFK: data?.DispatchPK,
      dealerRefusal: returnDetails?.dealerRefused,
      invoiceCustomer: true,
      invoiceResponcibleParty: 0,
      responciblePartyCustomerAddressFK: null,
      pickupDealerFK: data?.pickupDealerFK,
      pickupUnitAddressFK: data?.pickupUnitAddressFK,
      pickupCustomerPlantFK: data?.pickupCustomerPlantFK,
      pickupYardFK: data?.pickupYardFK,
      returnDealerFK: returnDetails?.returnPickupDealerFK,
      returnUnitAddressFK: returnDetails?.defaultmiscUnitAddrFK,
      returnCustomerPlantFK: returnDetails?.returnPickupCustomerPlantFK,
      deliveryDealerFK: returnDetails?.returnDeliveryDealerFK,
      deliveryUnitAddressFK: returnDetails?.defaultmiscPickupUnitAddrFK,
      deliveryCustomerPlantFK: returnDetails?.returnDeliveryPlantFK,
      deliveryYardFK: data?.pickupYardFK,
      invoiceMiles: returnRate?.outboundInvoiceMiles ? returnRate.outboundInvoiceMiles : 0,
      invoiceReturnMiles: returnRate?.returnInvoiceMiles ? returnRate.returnInvoiceMiles : 0,
      invoiceCustomerRateFK: data?.invoiceCustomerRateFK,
      invoiceFlatRate: returnRate?.outboundInvoiceFlatrate,
      invoiceReturnFlatRate: returnRate?.returnInvoiceFlatrate,
      invoiceRate: data?.invoiceRate,
      invoiceReturnRate: data?.invoiceReturnRate,
      invoiceFuelSuchargeRate: data?.invoiceFuelSurchargeRate,
      invoiceCDLARate: data?.invoiceCDLARate,
      invoiceCDLAReturn: data?.invoiceCDLAReturn ?? false,
      invoiceSupplementalRate: data?.invoiceSupplementalRate,
      invoiceSupplementalFuelSurchargeRate: data?.invoiceSupplementalFuelSurchargeRate,
      invoiceSupplementalDescription: data?.invoiceSupplementalDescription,
      invoiceSupplementalReturn: data?.invoiceSupplementalReturn ?? false,
      invoiceLengthRate: data?.invoiceLengthRate,
      invoiceLengthReturn: data?.invoiceLengthReturn ?? false,
      invoiceSpecialRate: data?.invoiceSpecialRate,
      invoiceSpecialFuelSurchargeRate: data?.invoiceSpecialFuelSurchargeRate,
      invoiceSpecialDescription: data?.invoiceSpecialDescription,
      invoiceSpecialReturn: data?.invoiceSpecialReturn ?? false,
      invoiceAdditionalRate: data?.invoiceAdditionalRate,
      invoiceAdditionalFuelSurchargeRate: data?.invoiceAdditionalFuelSurchargeRate,
      invoiceAdditionalDescription: data?.invoiceAdditionalDescription,
      invoiceAdditionalReturn: data?.invoiceAdditionalReturn ?? false,
      invoiceDriverRate: data?.invoiceDriverRate,
      invoiceDriverFuelSurchargeRate: data?.invoiceDriverFuelSurchargeRate,
      invoiceDriverDescription: data?.invoiceDriverDescription,
      invoiceDriverReturn: data?.invoiceDriverReturn ?? false,
      invoiceCanadianCharge: data?.invoiceCanadianCharge,
      invoiceUSCharge: data?.invoiceUSCharge,
      ELDRequired: data?.eldrequired ?? false, // This ensures it's never null
      invoiceELDFee: data?.invoiceELDFee,
      fodInvoiceAmount: data?.FODInvoice ? returnRate?.outboundInvoiceFlatrate : data?.invoiceRate,
      fodInvoiceReturnAmount: data?.FODInvoice ? returnRate?.returnInvoiceFlatrate : data?.invoiceReturnRate,
      driverMiles: returnRate?.outboundDriverMiles ? returnRate.outboundDriverMiles : 0,
      driverReturnMiles: returnRate?.returnDriverMiles ? returnRate.returnDriverMiles : 0,
      driverCustomerRateFK: data?.driverCustomerRateFK,
      driverFlatRate: returnRate?.outboundDriverFlatrate ?? 0,
      driverReturnFlatRate: returnRate?.returnDriverFlatrate ?? 0,
      driverFlatRateBalance: returnRate?.outboundDriverFlatrate ?? 0,
      driverRate: data?.driverReturnRate,
      driverFuelSuchargeRate: data?.driverFuelSurchargeRate,
      driverSupplementalRate: data?.driverSupplementalReturn ? data?.driverSupplementalRate : 0,
      driverSupplementalFuelSurchargeRate: data?.driverSupplementalReturn
        ? data?.driverSupplementalFuelSurchargeRate
        : 0,
      driverSupplementalDescription: data?.driverSupplementalReturn
        ? data?.driverSupplementalDescription
        : null,
      driverCDLARate: data?.driverCDLAReturn ? data?.driverCDLARate : 0,
      driverLengthRate: data?.driverLengthReturn ? data?.driverLengthRate : 0,
      driverSpecialRate: data?.driverSpecialReturn ? data?.driverSpecialRate : 0,
      driverSpecialFuelSurchargeRate: data?.driverSpecialReturn ? data?.driverSpecialFuelSurchargeRate : 0,
      driverSpecialDescription: data?.driverSpecialReturn ? data?.driverSpecialDescription : null,
      driverAdditionalRate: data?.driverAdditionalReturn ? data?.driverAdditionalRate : 0,
      driverAdditionalFuelSurchargeRate: data?.driverAdditionalReturn
        ? data?.driverAdditionalFuelSurchargeRate
        : 0,
      driverAdditionalDescription: data?.driverAdditionalReturn ? data?.driverAdditionalDescription : null,
      driverAdditionalFlatRate: data?.driverAdditionalReturn ? data?.driverAdditionalFlatRate : 0,
      halfTonAdjustmentRate: data?.halfTonAdjustmentRate,
      driverCanadianCharge: data?.driverCanadianCharge,
      driverUSCharge: data?.driverUSCharge,
      driverELDFee: data?.driverELDFee ? data?.driverELDFee : 0,
      noDeliveryPulloutFee: 0,
      companyName: selectedCompanyName,
      delayReturnByDriver: delayReturnByDriver,
      driverFK: driverfk,
      miscPickupAddr: miscPickupAddr,
      miscDeliveryAddr: miscDeliveryAddr,
      returnActive: returnRate?.returnActive,
      isReturnedToPickupLocation: returnDetails?.isPickupLocationChecked,
      shuttleCityFK: data?.customerplant?.shuttleCityFK,
      motorized: data?.motorized,
      mileBalance: mileBalance,
    });
  }, []);

  const uploadDocument = () => {
    const commonCustomerPaperworkFiles = [
      ...(customerPaperworkFiles ?? []),
      ...(customerPaperworkScanFiles ?? []),
    ];
    const commonCompanyPaperworkFiles = [
      ...(companyPaperworkFiles ?? []),
      ...(companyPaperworkScanFiles ?? []),
    ];
    const commonBolFiles = [...(bolFiles ?? []), ...(bolScanFiles ?? [])];
    const commonDafFiles = [...(dafFiles ?? []), ...(dafScanFiles ?? [])];
    const commonIftaFiles = [...(iftaFiles ?? []), ...(iftaScanFiles ?? [])];
    const allFilesEmpty =
      customerPaperworkFiles?.length === 0 &&
      companyPaperworkFiles?.length === 0 &&
      bolFiles?.length === 0 &&
      dafFiles?.length === 0 &&
      iftaFiles?.length === 0;
    if (!allFilesEmpty) {
      UndispatchService.saveSplitTripDocuments(
        data?.DispatchPK,
        commonCustomerPaperworkFiles,
        commonCompanyPaperworkFiles,
        commonBolFiles,
        commonDafFiles,
        commonIftaFiles,
        0
      )
        .then(() => {
          dispatch(setActive(true));
          dispatch(setActiveDispatch(true));
          dispatch(setUnitNumber(data?.unitNumber));
          dispatch(setUnitId(data?.unitPK));
          dispatch(setUnitSelected(data));
          dispatch(setCompanyName(selectedCompanyName));
          dispatch(setBrowseType("SingleUnits"));
          dispatch(setIsDelayUndispatch(true));
          dispatch(setDelayReturnByDriver(false));
          dispatch(resetReturn());
          dispatch(setMiscPickupDetails(null));
          dispatch(setMiscDeliveryDetails(null));

          toast.success("Delayed Unit Return Saved Successfully");
          navigate(
            `/delay-processing/delayed-details/${String(companyName)?.trim()}/${Number(unitfk)}/${Number(
              driverfk
            )}/${Number(delayedUnitPK)}`
          );
          setTimeout(() => {
            dispatch(resetReturn());
            dispatch(setDelayReturnByDriver(false));
            dispatch(setReturnDetails(null));
            dispatch(setMiscPickupDetails(null));
            dispatch(setMiscDeliveryDetails(null));
            dispatch(setReturnValidEntry(false));
          }, 150);
        })
        .catch(() => {
          toast.error("Delay Return Document Save Failed");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      if (returnRate?.returnActive) {
        dispatch(setActive(true));
        dispatch(setActiveDispatch(true));
        dispatch(setUnitNumber(data?.unitNumber));
        dispatch(setUnitId(data?.unitPK));
        dispatch(setUnitSelected(data));
        dispatch(setCompanyName(selectedCompanyName));
        dispatch(setBrowseType("SingleUnits"));
        dispatch(setIsDelayUndispatch(true));
        dispatch(setDelayReturnByDriver(false));
        dispatch(resetReturn());
        dispatch(setMiscPickupDetails(null));
        dispatch(setMiscDeliveryDetails(null));
        dispatch(setReturnValidEntry(false));

        toast.success("Delayed Unit Return Saved Successfully");
        // navigate("/unit-activation-single-selection");
        navigate(
          `/delay-processing/delayed-details/${String(companyName)?.trim()}/${Number(unitfk)}/${Number(
            driverfk
          )}/${Number(delayedUnitPK)}`
        );
      }

      if (data?.refused && !delayReturnByDriver && !returnRate?.returnActive) {
        toast.success("Unit is already Activated.Delay Return is completed");
        navigate(
          `/delay-processing/delayed-details/${String(companyName)?.trim()}/${Number(unitfk)}/${Number(
            driverfk
          )}/${Number(delayedUnitPK)}`
        );
      }

      if (!data?.refused && !delayReturnByDriver && !returnRate?.returnActive) {
        toast.success("Unit is already Activated and Undispatched.Delay Return is completed");
        navigate(
          `/delay-processing/delayed-details/${String(companyName)?.trim()}/${Number(unitfk)}/${Number(
            driverfk
          )}/${Number(delayedUnitPK)}`
        );
      }
      setTimeout(() => {
        dispatch(resetReturn());
        dispatch(setDelayReturnByDriver(false));
        dispatch(setReturnDetails(null));
        dispatch(setMiscPickupDetails(null));
        dispatch(setMiscDeliveryDetails(null));
      }, 150);
    }
  };
  const saveReturn = () => {
    setLoading(true);
    DelayProcessingService.saveReturn(
      returnData,
      creditCardArrayList,
      transIds,
      returnRate,
      returnDetails?.isCurrentLocationChecked
    )
      .then(({ data }) => {
        if (String(data[1]?.errorCode) === "1") {
          dispatch(setTransIds(data?.refTranID));
          dispatch(
            setCreditCardArrayList((prevList) =>
              (prevList || []).map((card) =>
                data?.completedCards?.includes(card?.unmaskedCardNumber) ? { ...card, processed: 1 } : card
              )
            )
          );
          toast.error("Saved Failed");
          setLoading(false);
        } else if (data[0]?.OperationStatus) {
          uploadDocument();
        } else {
          toast.error("Save failed..");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
      .finally(() => {});
  };

  useEffect(() => {
    if (!data) {
      navigate(
        "/delay-return-details/" +
          String(companyName)?.trim() +
          "/" +
          Number(unitfk) +
          "/" +
          Number(driverfk) +
          "/" +
          delayedUnitPK
      );
    }
  }, [data]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={saveReturn}
          disabled={delayReturnSave}
        >
          Return
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            goBack();
          }}
        >
          Back
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            setCancelShow(true);
          }}
        >
          Cancel
        </button>

        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Delay Return"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {loading && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DelayDocumentFooter;
