import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Text from "./tabs/Text";
import Details from "./tabs/Details";

const InvoiceInformationViewContent = () => {
  const [activeKey, setActiveKey] = useState("text");

  return (
    <div>
      <Tabs activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Tab eventKey={"text"} title={"Text"}>
          <Text />
        </Tab>
        <Tab eventKey={"details"} title={"Details"}>
          <Details />
        </Tab>
      </Tabs>
    </div>
  );
};

export default InvoiceInformationViewContent;
