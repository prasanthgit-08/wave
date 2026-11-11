import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import General from "./tabs/General";
import Emails from "./tabs/Emails";
import Comments from "./tabs/Comments";
import DelayInstructions from "./tabs/DelayInstructions";
import Resources from "./tabs/Resources";
import { setActiveKey } from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";

const NewDelayContent = () => {
  const dispatch = useDispatch();
  const newGenerlTabValid = useSelector((state) => state.delayProcessing.newGenerlTabValid);
  const newEmailTabValid = useSelector((state) => state.delayProcessing.newEmailTabValid);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border threeFourthScreenFormContentHeight">
        <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="m-b-2">
          <Tab
            tabClassName={newGenerlTabValid ? "color-green" : "color-red"}
            eventKey="general"
            title={"General"}
          >
            <General />
          </Tab>

          <Tab tabClassName={newEmailTabValid ? "" : "color-red"} eventKey="emails" title={"Emails"}>
            <Emails />
          </Tab>

          <Tab eventKey="comments" title={"Comments"}>
            <Comments />
          </Tab>

          <Tab eventKey="delayInstructions" title={"Delay Instructions"}>
            <DelayInstructions />
          </Tab>

          <Tab eventKey="resources" title={"Resources"}>
            <Resources />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default NewDelayContent;
