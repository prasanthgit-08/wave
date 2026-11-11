import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import TextTab from "./tabs/TextTab";
import DetailsTab from "./tabs/DetailsTab";
import { useSelector } from "react-redux";

function InvoiceDeatilContent() {
  const [activeKey, setActiveKey] = useState("text");
  const isDetailsTabValid = useSelector((state) => state.miscInvoiceReducer.isDetailsTabValid);
  const flagAddorEdit = useSelector((state) => state.miscInvoiceReducer.flagAddorEdit);
  const description = useSelector((state) => state.miscInvoiceReducer.description);
  const amount = useSelector((state) => state.miscInvoiceReducer.amount);
  const list = useSelector((state) => state.miscInvoiceReducer.list);
  const totalAmount = useSelector((state) => state.miscInvoiceReducer.totalAmount);

  return (
    <div className="shadow-sm rounded border quarterScreenBrowseHeight" style={{ height: "550px" }}>
      <Tabs activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Tab eventKey={"text"} title={"Text"}>
          <TextTab />
        </Tab>
        <Tab
          eventKey={"details"}
          title={"Details"}
          tabClassName={
            !list ||
            list?.length === 0 ||
            (flagAddorEdit && (!amount || !description)) ||
            totalAmount === 0 ||
            amount === "."
              ? "color-red"
              : "color-green"
          }
        >
          <DetailsTab />
        </Tab>
      </Tabs>
    </div>
  );
}

export default InvoiceDeatilContent;
