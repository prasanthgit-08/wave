/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import UnitInformation from "./tabs/UnitInformation";
import CustomerInstructions from "./tabs/CustomerInstructions";
import UnitInstructions from "./tabs/UnitInstructions";
import InvoiceHold from "./tabs/InvoiceHold";
import { useDispatch, useSelector } from "react-redux";
import { setUnitViewDisableNext } from "../../../../redux/Invoicing/PaperworkProcessingSlice";

const UnitViewContent = () => {
  const dispatch = useDispatch();
  const unitInformationTabValid = useSelector((state) => state.paperworkProcessing.unitInformationTabValid);
  const unitInformationTabValidated = useSelector(
    (state) => state.paperworkProcessing.unitInformationTabValidated
  );
  const invoiceHoldTabValid = useSelector((state) => state.paperworkProcessing.invoiceHoldTabValid);
  const selectedUnit = useSelector((state) => state.paperworkProcessing.selectedUnit);
  const missingPaperworkFlag = useSelector((state) => state.paperworkProcessing.missingPaperworkFlag);
  const selectedUnitsList = useSelector((state) => state.paperworkProcessing.selectedUnitsList);
  const customerInstructions = useSelector((state) => state.paperworkProcessing.customerInstructions);
  const unitInstructionValue = useSelector((state) => state.paperworkProcessing.unitInstructionValue);

  const getInvoiceHoldClassName = (unit) => {
    if (!unit) {
      return "";
    }
    if (Array.isArray(unit)) {
      if (unit?.some((item) => item?.unitOnInvoiceHold)) {
        if (unit?.every((item) => item?.unitOnInvoiceHoldUI)) {
          return "color-green";
        }

        return "color-red";
      } else {
        if (unit?.some((item) => item?.unitOnInvoiceHoldUI)) return "color-green";

        return "";
      }
    }

    if (unit?.unitOnInvoiceHold) {
      if (unit?.unitOnInvoiceHoldUI) {
        return "color-green";
      }

      return "color-red";
    } else {
      if (unit?.unitOnInvoiceHoldUI) {
        return "color-green";
      }
    }

    return "";
  };

  const invoiceHoldData = selectedUnitsList?.length > 1 ? selectedUnitsList : selectedUnit;

  useEffect(() => {
    if (unitInformationTabValid && invoiceHoldTabValid && !missingPaperworkFlag) {
      dispatch(setUnitViewDisableNext(false));
    } else {
      dispatch(setUnitViewDisableNext(true));
    }
  }, [unitInformationTabValid, invoiceHoldTabValid]);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <Tabs defaultActiveKey="unitInformation" className="m-b-2">
          <Tab
            eventKey="unitInformation"
            title={"Unit Information"}
            tabClassName={unitInformationTabValidated && !unitInformationTabValid ? "color-red" : ""}
          >
            <UnitInformation />
          </Tab>
          <Tab
            eventKey="customerInstructions"
            title={"Customer Instructions"}
            tabClassName={`${customerInstructions ? "bg-warning" : ""}`}
          >
            <CustomerInstructions />
          </Tab>

          <Tab
            eventKey="unitInstructions"
            title={"Unit Instructions"}
            tabClassName={`${unitInstructionValue ? "bg-warning" : ""}`}
          >
            <UnitInstructions />
          </Tab>

          <Tab
            eventKey="invoiceHold"
            title={"Invoice Hold"}

            tabClassName={getInvoiceHoldClassName(invoiceHoldData)}
          >
            <InvoiceHold />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default UnitViewContent;
