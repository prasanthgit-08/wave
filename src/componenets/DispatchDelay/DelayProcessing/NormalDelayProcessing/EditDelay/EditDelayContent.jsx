import React, { useState, useEffect } from "react";
import General from "./tabs/General";
import Emails from "./tabs/Emails";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import DelayComments from "./tabs/DelayComments";
const EditDelayContent = () => {
  const dispatch = useDispatch();

  const editGenerlTabValid = useSelector((state) => state.delayProcessing.editGenerlTabValid);
  const editEmailTabValid = useSelector((state) => state.delayProcessing.editEmailTabValid);
  const loading = useSelector((state) => state.delayProcessing.loading);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border threeFourthScreenFormContentHeight">
        <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="m-b-2">
          <Tab
            tabClassName={loading ? "" : editGenerlTabValid ? "color-green" : "color-red"}
            eventKey="general"
            title={"General"}
          >
            <General />
          </Tab>

          <Tab tabClassName={editEmailTabValid ? "" : "color-red"} eventKey="emails" title={"Emails"}>
            <Emails />
          </Tab>

          <Tab eventKey="comments" title={"Delay Comments"}>
            <DelayComments />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default EditDelayContent;
