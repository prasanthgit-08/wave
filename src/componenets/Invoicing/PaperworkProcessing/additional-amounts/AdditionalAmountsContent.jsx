/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import CustomerInstructions from "./tabs/CustomerInstructions";
import UnitInstructions from "./tabs/UnitInstructions";
import { useDispatch, useSelector } from "react-redux";
import { setUnitViewDisableNext } from "../../../../redux/Invoicing/PaperworkProcessingSlice";
import Amounts from "./tabs/Amounts";

const AdditionalAmountsContent = () => {
  const dispatch = useDispatch();

  const unitInformationTabValid = useSelector((state) => state.paperworkProcessing.unitInformationTabValid);
  const additionalAmountsDisableNext = useSelector(
    (state) => state.paperworkProcessing.additionalAmountsDisableNext
  );
  const customerInstructions = useSelector((state) => state.paperworkProcessing.customerInstructions);
  const unitInstructionValue = useSelector((state) => state.paperworkProcessing.unitInstructionValue);

  useEffect(() => {
    if (unitInformationTabValid) {
      dispatch(setUnitViewDisableNext(false));
    } else {
      dispatch(setUnitViewDisableNext(true));
    }
  }, [unitInformationTabValid]);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <Tabs defaultActiveKey="unitInformation" className="m-b-2">
          <Tab
            eventKey="unitInformation"
            title={"Amounts"}
            tabClassName={additionalAmountsDisableNext ? "color-red" : ""}
          >
            <Amounts />
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
        </Tabs>
      </div>
    </div>
  );
};

export default AdditionalAmountsContent;
