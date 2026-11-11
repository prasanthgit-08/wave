import React from "react";
import { Alert, Tab, Tabs } from "react-bootstrap";
import Details from "./Tabs/Details";
import Reports from "./Tabs/Reports";
import BOLs from "./Tabs/BOLs";
import Dispatch from "./Tabs/Dispatch";
import Delays from "./Tabs/Delays";
import Invoice from "./Tabs/Invoice";
import { useSelector } from "react-redux";
import { useState } from "react";

function CutomerEmialMaintenanceContent({ tabName, setTabName, loading }) {
  const isMailValid = useSelector((state) => state.customerEmailMaintenance.isMailValid);

  const detailsTab = useSelector((state) => state.customerEmailMaintenance.detailsTabValid);

  const reportTab = useSelector((state) => state.customerEmailMaintenance.reportsTabValid);

  const EditMode = useSelector((state) => state.customerEmailMaintenance.editMode);
  const dispatchTabValid = useSelector((state) => state.customerEmailMaintenance.dispatchTabValid);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Tabs
              id="uncontrolled-tab-example"
              className="m-b-10"
              activeKey={tabName}
              onSelect={(key) => {
                setTabName(key);
              }}
            >
              <Tab
                eventKey="details"
                title={"Details"}
                tabClassName={
                  EditMode ? "" : detailsTab ? (isMailValid ? "color-red" : "color-green") : "color-red"
                }
              >
                <Details loading={loading} />
              </Tab>

              <Tab
                eventKey="reports"
                title={"Reports"}
                tabClassName={EditMode ? "" : reportTab ? "color-green" : "color-red"}
              >
                <Reports />
              </Tab>

              <Tab eventKey="bols" title={"BOL's"}>
                <BOLs />
              </Tab>

              <Tab
                eventKey="dispatch"
                title={"Dispatch"}
                tabClassName={EditMode ? "" : dispatchTabValid ? " " : "color-red"}
              >
                <Dispatch />
              </Tab>
              <Tab eventKey="delay" title={"Delays"}>
                <Delays />
              </Tab>
              <Tab eventKey="invoice" title={"Invoice"}>
                <Invoice />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CutomerEmialMaintenanceContent;
