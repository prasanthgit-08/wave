import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Text from "./tabs/Text";
import Details from "./tabs/Details";
import Documents from "./tabs/Documents";
import { useSelector } from "react-redux";
import Updates from "./tabs/Updates";

const InvoiceDetailContent = () => {
  const [activeKey, setActiveKey] = useState("text");
  const invoiceById = useSelector((state) => state.invoiceInquiryReducer.invoiceById);
  const isUpdatesTabEnabled = invoiceById?.[0]?.invoiceCorrected || invoiceById?.[0]?.invoiceVoided;

  return (
    <div className="shadow-sm rounded border quarterScreenBrowseHeight" style={{ height: "570px" }}>
      <Tabs activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Tab eventKey={"text"} title={"Text"}>
          <Text invoiceById={invoiceById} />
        </Tab>
        <Tab eventKey={"details"} title={"Details"}>
          <Details />
        </Tab>
        <Tab eventKey={"documents"} title={"Documents"}>
          <Documents />
        </Tab>
        <Tab eventKey="updates" title="Updates" disabled={!isUpdatesTabEnabled}>
          <Updates />
        </Tab>
      </Tabs>
    </div>
  );
};

export default InvoiceDetailContent;
