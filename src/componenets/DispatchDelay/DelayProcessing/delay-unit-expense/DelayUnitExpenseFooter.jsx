import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetState, setViewDetail } from "../../../../redux/DelayUnitExpenseSlice";
import { PermissionKeyGeneratorUtil } from "../../../../utils/PermissionKeyGeneratorUtil";
import ModalComponent from "../../../common/ModalComponent";
import toast from "react-hot-toast";
import DelayUnitExpenseService from "../../../../services/DispatchDelay/BreakdownProcessing/DelayUnitExpenseService";
import { useNavigate, useParams } from "react-router-dom";

const DelayUnitExpenseFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const breakdownFK = params.breakdownFK;
  const delayedUnitId = useParams().delayedUnitPK;

  const [showCancel, setShowCancel] = useState(false);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("delayUnitsExpense", "edit");
  const delayedUnitExpsnseId = useSelector((state) => state.delayUnitExpenseSlice.delayedUnitExpsnseId);
  const driverFK = useSelector((state) => state.delayUnitExpenseSlice.driverName);
  const validEntry = useSelector((state) => state.delayUnitExpenseSlice.validEntry);
  const invoiceDownTimeHours = useSelector((state) => state.delayUnitExpenseSlice.invoiceDownTimeHours);
  const invoiceDownTimeRate = useSelector((state) => state.delayUnitExpenseSlice.invoiceDownTimeRate);
  const invoiceDownTimeInvoice = useSelector((state) => state.delayUnitExpenseSlice.invoiceDownTimeInvoice);
  const driversDownTimeHours = useSelector((state) => state.delayUnitExpenseSlice.driversDownTimeHours);
  const driversDownTimeRate = useSelector((state) => state.delayUnitExpenseSlice.driversDownTimeRate);
  const driversDownTimeDriver = useSelector((state) => state.delayUnitExpenseSlice.driversDownTimeDriver);
  const attemptedPickupDriver = useSelector((state) => state.delayUnitExpenseSlice.attemptedPickupDriver);
  const attemptedPickupInvoice = useSelector((state) => state.delayUnitExpenseSlice.attemptedPickupInvoice);
  const attemptedPickupAuthorizedBy = useSelector(
    (state) => state.delayUnitExpenseSlice.attemptedPickupAuthorizedBy
  );
  const permitsInvoice = useSelector((state) => state.delayUnitExpenseSlice.permitsInvoice);
  const permitsDrivers = useSelector((state) => state.delayUnitExpenseSlice.permitsDrivers);
  const tollsInvoice = useSelector((state) => state.delayUnitExpenseSlice.tollsInvoice);
  const tollsDrivers = useSelector((state) => state.delayUnitExpenseSlice.tollsDrivers);
  const fuelCreditGallons = useSelector((state) => state.delayUnitExpenseSlice.fuelCreditGallons);
  const fuelCreditPrice = useSelector((state) => state.delayUnitExpenseSlice.fuelCreditPrice);
  const fuelCreditDriver = useSelector((state) => state.delayUnitExpenseSlice.fuelCreditDriver);
  const secondDriverGallons = useSelector((state) => state.delayUnitExpenseSlice.secondDriverGallons);
  const secondDriverPrice = useSelector((state) => state.delayUnitExpenseSlice.secondDriverPrice);
  const secondDriverDriver = useSelector((state) => state.delayUnitExpenseSlice.secondDriverDriver);
  const invoiceAdditionalMiles = useSelector((state) => state.delayUnitExpenseSlice.invoiceAdditionalMiles);
  const invoiceAdditionalRate = useSelector((state) => state.delayUnitExpenseSlice.invoiceAdditionalRate);
  const invoiceAdditionalInvoice = useSelector(
    (state) => state.delayUnitExpenseSlice.invoiceAdditionalInvoice
  );
  const driverAdditionalMiles = useSelector((state) => state.delayUnitExpenseSlice.driverAdditionalMiles);
  const driverAdditionalRate = useSelector((state) => state.delayUnitExpenseSlice.driverAdditionalRate);
  const driverAdditionalDriver = useSelector((state) => state.delayUnitExpenseSlice.driverAdditionalDriver);
  const breakdownFeeInvoice = useSelector((state) => state.delayUnitExpenseSlice.breakdownFeeInvoice);
  const breakdownFeeDriver = useSelector((state) => state.delayUnitExpenseSlice.breakdownFeeDriver);
  const invoiced = useSelector((state) => state.delayUnitExpenseSlice.invoiced);
  const driverPaid = useSelector((state) => state.delayUnitExpenseSlice.driverPaid);
  const viewDetail = useSelector((state) => state.delayUnitExpenseSlice.viewDetail);
  const invoiceFlatrated = useSelector((state) => state.delayUnitExpenseSlice.invoiceFlatrated);
  const driverFlatrated = useSelector((state) => state.delayUnitExpenseSlice.driverFlatrated);
  const unitFK = useSelector((state) => state.delayUnitExpenseSlice.unitFK);
  const dispatchFK = useSelector((state) => state.delayUnitExpenseSlice.dispatchFK);
  const data = useSelector((state) => state.delayUnitExpenseSlice.data);
  const isValid = useSelector((state) => state.delayUnitExpenseSlice.isValid);

  const saveData = {
    DriverFK: driverFK,
    DelayedUnitBreakdownFK: breakdownFK,
    InvoiceDowntimeHours: invoiceDownTimeHours,
    InvoiceDowntimeRate: invoiceDownTimeRate,
    InvoiceDowntimeAmount: invoiceDownTimeInvoice,
    DriverDowntimeHours: driversDownTimeHours,
    DriverDowntimeRate: driversDownTimeRate,
    DriverDowntimeAmount: driversDownTimeDriver,
    APUAuthorizedBy: attemptedPickupAuthorizedBy,
    InvoiceAPUAmount: attemptedPickupInvoice,
    DriverAPUAmount: attemptedPickupDriver,
    InvoicePermits: permitsInvoice,
    DriverPermits: permitsDrivers,
    InvoiceTolls: tollsInvoice,
    DriverTolls: tollsDrivers,
    DriverFuelGallons: fuelCreditGallons,
    FuelPricePerGallon: fuelCreditPrice,
    DriverFuelCredit: fuelCreditDriver,
    NextDriverFuelGallons: secondDriverGallons,
    NextDriverFuelCharge: secondDriverDriver,
    InvoiceMiles: invoiceAdditionalMiles,
    InvoiceFlatrate: invoiceAdditionalInvoice,
    DriverMiles: driverAdditionalMiles,
    DriverFlatrate: driverAdditionalDriver,
    InvoiceAdditionalRate: invoiceAdditionalRate,
    InvoiceAdditionalInvoice: invoiceAdditionalInvoice,
    DriverAdditionalRate: driverAdditionalRate,
    DriverAdditionalDriver: driverAdditionalDriver,
    InvoiceBreakdownFee: breakdownFeeInvoice,
    DriverBreakdownFee: breakdownFeeDriver,
    Invoiced: invoiced || 0,
    DriverPaid: driverPaid || 0,
    UnitFK: unitFK || null,
    DispatchFK: dispatchFK || null,
    InvoiceFK: data?.InvoiceFK,
  };

  const handleSave = () => {
    DelayUnitExpenseService.getData("Save", delayedUnitId, delayedUnitExpsnseId, breakdownFK, saveData).then(
      ({ data }) => {
        if (data?.ErrorCode === "0") {
          toast.success("Save sucessful");
          navigate(`/breakdown-processing/view-breakdown/${breakdownFK}`);
        } else {
          toast.success("Save failed");
        }
        dispatch(resetState());
      }
    );
  };

  const handleCancel = () => {
    if (delayedUnitExpsnseId) {
      if (!viewDetail) {
        setShowCancel(true);
      } else {
        toast.success("Changes Cancelled");
        navigate(`/breakdown-processing/view-breakdown/${breakdownFK}`);
        dispatch(resetState());
      }
    } else {
      setShowCancel(true);
    }
  };

  window.addEventListener("popstate", () => {
    dispatch(resetState());
    navigate(`/breakdown-processing/view-breakdown/${breakdownFK}`);
  });

  const handleCancelNo = () => {
    setShowCancel(false);
  };

  const handleCancelYes = () => {
    setShowCancel(false);

    if (!delayedUnitExpsnseId || viewDetail) {
      navigate(`/breakdown-processing/view-breakdown/${breakdownFK}`);
      dispatch(resetState());
    } else {
      dispatch(setViewDetail(true));
    }
    toast.success("Changes Cancelled");
  };

  useEffect(() => {
    if (!validEntry) {
      dispatch(resetState());
      navigate(`/breakdown-processing/view-breakdown/${breakdownFK}`);
    }
  }, [validEntry]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => {
            handleSave();
          }}
          hidden={viewDetail}
          disabled={isValid}
        >
          Save
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          hidden={!viewDetail}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
          disabled={deniedPermissions?.includes(editPermission)}
        >
          Edit
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => {
            handleCancel();
          }}
        >
          Cancel
        </button>
        <ModalComponent
          show={showCancel}
          onHide={handleCancelNo}
          title={"Cancel Delay Unit Expense Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
};

export default DelayUnitExpenseFooter;
