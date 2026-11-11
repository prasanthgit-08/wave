import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import FormContent from "./FormContent";
import EmailCondition from "./EmailCondition";
import { useSelector } from "react-redux";
const EmailRecipientsContent = () => {
  const [tabValidation, setTabValidation] = useState(false);
  const viewDetail = useSelector((state) => state.emailRecipient.viewDetail);

  return (
    <div className={`${QuarterScreen.height} shadow-sm rounded border`}>
      <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="m-b-2">
        <Tab
          eventKey="general"
          title={"General"}
          tabClassName={viewDetail ? "" : tabValidation ? "color-green" : "color-red"}
        >
          <FormContent setTabValidation={setTabValidation} />
        </Tab>
        <Tab eventKey="EmailCondition" title={"Condition"}>
          <EmailCondition />
        </Tab>
      </Tabs>
    </div>
  );
};

export default EmailRecipientsContent;
