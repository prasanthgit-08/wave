import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import General from "./tabs/General";
import Emails from "./tabs/Emails";
import BreakdownComments from "./tabs/BreakdownComments";
import Documents from "./tabs/Documents";
import { useLocation } from "react-router-dom";

const EditBreakdownContent = () => {
  const location = useLocation();
  const isEditMode = location.pathname?.includes("edit");
  const editGenerlTabValid = useSelector((state) => state.delaybreakdown.editGenerlTabValid);
  const editEmailTabValid = useSelector((state) => state.delaybreakdown.editEmailTabValid);
  const editDocumentTabValid = useSelector((state) => state.delaybreakdown.editDocumentTabValid);
  const generalLoading = useSelector((state) => state.delaybreakdown.generalLoading);

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

          <Tab tabClassName={editEmailTabValid ? "" : "color-red"} eventKey="emails" title={"Emails"}>
            <Emails />
          </Tab>

          <Tab eventKey="Breakdown Comments" title={"Breakdown Comments"}>
            <BreakdownComments />
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

export default EditBreakdownContent;
