import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import FeesTab from "./tabs/FeesTab";
import GeneralTab from "./tabs/GeneralTab";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab } from "../../../../redux/Invoicing/PaperworkProcessingSlice";

const BreakdownDelayContent = () => {
  const feeDelayArray = useSelector((state) => state.paperworkProcessing.feeDelayArray);
  const currentTab = useSelector((state) => state.paperworkProcessing.currentTab);
  const dispatch = useDispatch();
  const breakdownDelayArray = useSelector((state) => state.paperworkProcessing.breakdownDelayArray);
  const selectedDelayUnitBreakdownFK = useSelector(
    (state) => state.paperworkProcessing.selectedDelayUnitBreakdownFK
  );

  const isExpencePresent = breakdownDelayArray.find(
    (item) => item.delayedUnitBreakdownFKInt === selectedDelayUnitBreakdownFK
  );
  const isFeePresent = feeDelayArray.find(
    (item) => item.delayedUnitBreakdownFKInt === selectedDelayUnitBreakdownFK
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (breakdownDelayArray?.length !== 0) {
      dispatch(setCurrentTab("general"));
    } else if (breakdownDelayArray?.length === 0 && feeDelayArray?.length !== 0) {
      dispatch(setCurrentTab("fees"));
    }
  }, []);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      if (!isExpencePresent) {
        dispatch(setCurrentTab("fees"));
      } else if (isExpencePresent || !isFeePresent) {
        dispatch(setCurrentTab("general"));
      }
      setLoading(false);
    }, 50);

    return () => {
      clearTimeout(timeout);
      setLoading(false);
    };
  }, [isExpencePresent, selectedDelayUnitBreakdownFK]);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <Tabs
          defaultActiveKey="general"
          id="uncontrolled-tab-example"
          className="m-b-2"
          onSelect={(key) => dispatch(setCurrentTab(key))}
          activeKey={currentTab}
        >
          <Tab eventKey="general" title={"General"} tabClassName={""} disabled={!isExpencePresent}>
            <GeneralTab />
          </Tab>

          <Tab eventKey="fees" title={"Fees"} disabled={!isFeePresent} tabClassName={""}>
            <FeesTab />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default BreakdownDelayContent;
