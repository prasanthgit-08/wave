import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import General from "./General";
import Claim from "./Claim";
import Emails from "./Emails";
import DamageComments from "./DamageComments";
import DamageInstructions from "./DamageInstructions";
import Resources from "./Resources";
import Documents from "./Documents";
import DocumentsEditScreen from "./DocumentsEditScreen";
import { useSelector } from "react-redux";
import EmailsDamageEdit from "./EmailDamageEdit";
import EmailsDamage from "../tabs/EmailsDamage";
import { setValidGeneral } from "../../../../../redux/DispatchDelay/DelayProcessing/DelayDamageSlice";

const UnitDetailsDamageContent = () => {
  //const viewDetail = false;
  const isClaimTabValid = useSelector((state) => state.delayDamage.isClaimTabValid);
  const validGeneral = useSelector((state) => state.delayDamage.validGeneral);
  const viewDetail = useSelector((state) => state.delayDamage.viewDetail);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border threeFourthScreenFormContentHeight">
        <Tabs /* activeKey={activeKey} onSelect={handleTabSelect} */ id="uncontrolled-tab-example">
          <Tab
            eventKey="general"
            title={"General"}

            tabClassName={!viewDetail ? (validGeneral ? "color-green" : "color-red") : ""}
          >
            <General />
          </Tab>
          <Tab
            //  tabClassName
            eventKey="claim"
            title={"Claim"}
            tabClassName={!viewDetail ? (isClaimTabValid ? "color-green" : "color-red") : ""}
          >
            <Claim />
          </Tab>
          <Tab
            //  tabClassName
            eventKey="emails"
            title={"Emails"}
          >
            <EmailsDamage />
          </Tab>
          <Tab
            //  tabClassName
            eventKey="damageComments"
            title={"Damage Comments"}
          >
            <DamageComments />
          </Tab>
          <Tab
            //  tabClassName
            eventKey="damageInstructions"
            title={"Damage Instructions"}
          >
            <DamageInstructions />
          </Tab>
          <Tab
            //  tabClassName
            eventKey="resources"
            title={"Resources"}
          >
            <Resources />
          </Tab>
          <Tab
            //  tabClassName
            eventKey="documents"
            title={"Documents"}
          >
            {viewDetail ? <Documents /> : <DocumentsEditScreen />}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default UnitDetailsDamageContent;
