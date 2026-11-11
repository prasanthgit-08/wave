import React, { useEffect } from "react";
import ThreeFourthScreenWrapper from "../../../Templates/Screens/ThreeFourthScreenWrapper";
import EditMasterExpressEditPageContent from "./EditMasterExpressEditPageContent";
import EditMasterExpressEditPageFooter from "./EditMasterExpressEditPageFooter";
import EditMasterExpressEditPageHeader from "./EditMasterExpressEditPageHeader";
import { useSelector } from "react-redux";
import { lastpointer } from "../../../../utils/utils";
import CommonLockServices from "../../../../service/commonLock/commonLock.service";

function EditMasterExpressEditPageTemplate() {
  const invoicePercentage = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.invoicePercentage
  );
  const overInvoicePercentage = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.overInvoicePercentage
  );
  const invoiceFlatrate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.invoiceFlatrate);
  const flatRateReturn = useSelector((state) => state.editMasterExpressInvoiceTabReducer.flatRateReturn);
  const baseRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.baseRate);
  const returnRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.returnRate);
  const fuelSurchargeRate = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.fuelSurchargeRate
  );
  const cdlRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.cdlRate);
  const invoiceApportionedRate = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.invoiceApportionedRate
  );
  const supplementalRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.supplementalRate);
  const supplementalFuelSurchargeRate = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.supplementalFuelSurchargeRate
  );
  const lengthRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.lengthRate);
  const additionalRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.additionalRate);
  const additionalFuelSurchargeRate = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.additionalFuelSurchargeRate
  );
  const invoiceAdditionalFlatRate = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.invoiceAdditionalFlatRate
  );
  const specialRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.specialRate);
  const specialFuelSurchargeRate = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.specialFuelSurchargeRate
  );
  const driverRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.driverRate);
  const driverFuelSurchargeRate = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.driverFuelSurchargeRate
  );

  const invoiceCanadianCharge = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.invoiceCanadianCharge
  );
  const invoiceUsCharge = useSelector((state) => state.editMasterExpressInvoiceTabReducer.invoiceUsCharge);
  const invoicePortEscortFee = useSelector(
    (state) => state.editMasterExpressInvoiceTabReducer.invoicePortEscortFee
  );
  const invoiceELDFee = useSelector((state) => state.editMasterExpressInvoiceTabReducer.invoiceELDFee);

  /* const invoiceTabValid = true; */

  return (
    <>
      <ThreeFourthScreenWrapper>
        <EditMasterExpressEditPageHeader />
        <EditMasterExpressEditPageContent /* invoiceTabValid={invoiceTabValid} */ />
        <EditMasterExpressEditPageFooter /* invoiceTabValid={invoiceTabValid} */ />
      </ThreeFourthScreenWrapper>
    </>
  );
}

export default EditMasterExpressEditPageTemplate;
