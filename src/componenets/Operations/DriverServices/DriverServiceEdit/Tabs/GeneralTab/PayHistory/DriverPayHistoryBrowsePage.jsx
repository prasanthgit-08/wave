import React from "react";
import PayHistorySummaryTab from "./Tabs/SummaryTab/PayHistorySummaryTab";
import PayHistoryDetailTab from "./Tabs/DetailsTab/PayHistoryDetailTab";
import { Tab, Tabs } from "react-bootstrap";
import SummaryContent from "./Tabs/SummaryTab/SummaryContent";
import DetailsContent from "./Tabs/DetailsTab/DetailsContent";
import QueuedContent from "./Tabs/QueuedTab/QueuedContent";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../../../../../redux/DriverPayHistorySlice";
import LoadingIcon from "../../../../../../common/LoadingIcon";

function DriverPayHistoryBrowsePage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.driverPayHistoryReducer.loading);
  const loader = useSelector((state) => state.driverPayHistoryReducer.dateLoading);
  const detailLoading = useSelector((state) => state.driverPayHistoryReducer.detailLoading);
  const queuedLoading = useSelector((state) => state.driverPayHistoryReducer.queuedLoading);

  return (
    <div className="p-2">
      <div className="quarterScreenFormContentHeight">
        <div className="p-0 w-100">
          <Tabs
            defaultActiveKey={"summaryTab"}
            id="uncontrolled-tab-example"
            className="m-b-0"
            onSelect={(key) => {
              dispatch(setActiveTab(key));
            }}
          >
            <Tab eventKey="summaryTab" title={"Summary"}>
              <SummaryContent />
            </Tab>

            <Tab eventKey="detailTab" title={"Detail"}>
              <DetailsContent />
            </Tab>

            <Tab eventKey="queuedTab" title={"Queued"}>
              <QueuedContent />
            </Tab>
          </Tabs>
          {(loading || detailLoading || queuedLoading || loader) && <LoadingIcon />}
        </div>
      </div>
    </div>
  );
}

export default DriverPayHistoryBrowsePage;
