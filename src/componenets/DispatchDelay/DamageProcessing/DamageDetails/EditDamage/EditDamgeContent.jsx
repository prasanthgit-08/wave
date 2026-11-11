import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import General from "./Tabs/General";
import Claim from "./Tabs/Claim";
import Emails from "./Tabs/Emails";
import DamageComments from "./Tabs/DamageComments";
import DamageInstructions from "./Tabs/DamageInstructions";
import Resources from "./Tabs/Resources";
import Documents from "./Tabs/Documents";
import { useSelector } from "react-redux";

const EditDamgeContent = () => {
  const editEmailTabValid = useSelector((state) => state.damageReducer.editEmailTabValid);
  const generalLoading = useSelector((state) => state.damageReducer.generalLoading);
  const claimLoading = useSelector((state) => state.damageReducer.claimLoading);
  const editGenerlTabValid = useSelector((state) => state.damageReducer.editGenerlTabValid);
  const editClaimTabValid = useSelector((state) => state.damageReducer.editClaimTabValid);
  const editDocumentTabValid = useSelector((state) => state.damageReducer.editDocumentTabValid);
  return (
    <div className="p-2">
      <div className="shadow-sm rounded border threeFourthScreenFormContentHeight">
        <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="m-b-2">
          <Tab
            tabClassName={generalLoading ? "" : editGenerlTabValid ? "color-green" : "color-red"}
            eventKey="general"
            title={"General"}
          >
            <General />
          </Tab>
          <Tab
            tabClassName={claimLoading ? "" : editClaimTabValid ? "color-green" : "color-red"}
            eventKey="claims"
            title={"Claim"}
          >
            <Claim />
          </Tab>
          <Tab tabClassName={editEmailTabValid ? "" : "color-red"} eventKey="emails" title={"Emails"}>
            <Emails />
          </Tab>

          <Tab eventKey="Damage Comments" title={"Damage Comments"}>
            <DamageComments />
          </Tab>
          <Tab eventKey="Damage Instructions" title={"Damage Instructions"}>
            <DamageInstructions />
          </Tab>
          <Tab eventKey="Resources" title={"Resources"}>
            <Resources />
          </Tab>
          <Tab
            tabClassName={editDocumentTabValid ? "" : "color-red"}
            eventKey="Documents"
            title={"Documents"}
          >
            <Documents />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default EditDamgeContent;
