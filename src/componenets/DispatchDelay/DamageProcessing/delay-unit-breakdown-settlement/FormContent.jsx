import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import FeesTab from "./FeesTab";
import GeneralTab from "./GeneralTab";

const FormContent = () => {
  return (
    <div className="p-2">
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="m-b-2">
          <Tab eventKey="general" title={"General"} tabClassName={""} /* disabled={!isExpencePresent} */>
            <GeneralTab />
          </Tab>

          <Tab eventKey="fees" title={"Fees"} /* disabled={!isFeePresent} */ tabClassName={""}>
            <FeesTab />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default FormContent;
