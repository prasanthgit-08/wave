import React, { useEffect, useState } from "react";
import Header from "../../../common/Header";
import FormContent from "./FormContent";
import CommonFooter from "../../../common/CommonFooter";
import SettlementDelayService from "../../../../services/DispatchDelay/BreakdownProcessing/SettlementDelayService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  setIsDataLoaded,
  setSortTypeFeeTab,
  setSortValueFeeTab,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/SettlementSlice";
import LoadingIcon from "../../../common/LoadingIcon";

const DelayUnitBreakdownSettlement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const breakdownFK = params.breakdownFK;
  const delayedUnitPK = params.delayedUnitPK;
  const companyName = params.selectedCompanyName;
  const decodedCompanyName = decodeURIComponent(companyName);
  const feeData = useSelector((state) => state.settlementReducer.feeData);
  const generalTabData = useSelector((state) => state.settlementReducer.generalTabData);
  const navigateToSettlement = useSelector((state) => state.delaybreakdown.navigateToSettlement);
  const [loadSave, setLoadSave] = useState(false);

  let saveExpensesRequest = {
    delayedUnitBreakDownFK: breakdownFK,
    companyName: decodedCompanyName,
    delayedUnitExpensesVOList:
      [
        {
          delayedUnitBreakdownFK: breakdownFK || null,
          delayedUnitPK: delayedUnitPK !== undefined && delayedUnitPK !== "undefined" ? delayedUnitPK : 0,
          delayedUnitExpensePK: generalTabData?.delayedUnitExpensePK || 0,

          totalInvoiceAmount: 0,

          totalDriverAmount:
            (generalTabData?.driverDowntimeAmount || 0) +
            (generalTabData?.driverAPUAmount || 0) +
            (generalTabData?.driverPermits || 0) +
            (generalTabData?.driverTolls || 0) +
            (generalTabData?.additionalDriverAmount || 0) +
            (generalTabData?.driverBreakdownFee || 0),

          mileageRate: 0,
          totalMiles: 0,
          driverToll: generalTabData?.driverTolls || 0,
          driverPermits: generalTabData?.driverPermits || 0,
          driverDownTime: generalTabData?.driverDowntimeAmount || 0,
          driverAttemptPickUp: generalTabData?.driverAPUAmount || 0,
          driverAttitionalAmt: generalTabData?.additionalDriverAmount || 0,
          breakDownFee: generalTabData?.driverBreakdownFee || 0,
          fuelCredit: generalTabData?.driverFuelCredit || 0,
        },
      ] || [],
    delayedBreakdownFeesVOList: feeData?.map((item) => ({
      delayedUnitFeePK: item?.delayedUnitFeePK,
      delayedUnitBreakdownFK: item?.delayedUnitBreakdownFK,
      description: item?.description,
      invoiceAmount: item?.invoiceAmount || 0,
      driverAmount: item?.driverAmount || 0,
      reimbursment: item?.reimbursment ? 1 : 0,
    })),
  };

  const handleSave = () => {
    setLoadSave(true);

    SettlementDelayService.saveData(saveExpensesRequest)
      .then((response) => {
        if (response?.data) {
          navigate(`/breakdown-processing/view-breakdown/${breakdownFK}`);
          toast.success("Save Completed");
        } else {
          toast.error("Save Failed");
        }
      })
      .catch(() => {
        toast.error("Save Failed");
      })
      .finally(() => {
        setLoadSave(false);
        dispatch(setIsDataLoaded(false));
      });
  };

  const buttons = [{ label: "Settle", onClick: () => handleSave(), disabled: false }];

  const onClose = () => {
    dispatch(setSortValueFeeTab(""));
    dispatch(setSortTypeFeeTab(true));
    dispatch(setIsDataLoaded(false));
  };

  useEffect(() => {
    if (!navigateToSettlement) {
      dispatch(setSortValueFeeTab(""));
      dispatch(setSortTypeFeeTab(true));
      navigate(`/breakdown-processing/view-breakdown/${breakdownFK}`);
    }
  }, [navigateToSettlement]);

  return (
    <div className="customContainer">
      {loadSave && <LoadingIcon />}
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header
          closeConfirmationHandler={onClose}
          closeNavigationURL={`/breakdown-processing/view-breakdown/${breakdownFK}`}
        />
        <FormContent />
        <CommonFooter buttons={buttons} />
      </div>
    </div>
  );
};

export default DelayUnitBreakdownSettlement;
