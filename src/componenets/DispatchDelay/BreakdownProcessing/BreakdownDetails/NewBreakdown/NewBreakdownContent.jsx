import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import General from "./tabs/General";
import Emails from "./tabs/Emails";
import Comments from "./tabs/Comments";
import DelayInstructions from "./tabs/DelayInstructions";
import Resources from "./tabs/Resources";
const NewBreakdownContent = () => {
  const dispatch = useDispatch();

  const newGenerlTabValid = useSelector((state) => state.delaybreakdown.newGenerlTabValid);
  const newEmailTabValid = useSelector((state) => state.delaybreakdown.newEmailTabValid);
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
          </Tab>{" "}
          <Tab tabClassName={newEmailTabValid ? "" : "color-red"} eventKey="emails" title={"Emails"}>
            <Emails />
          </Tab>
          <Tab eventKey="comments" title={"Comments"}>
            <Comments />
          </Tab>
          <Tab eventKey="BreakdownInstructions" title={"Breakdown Instructions"}>
            <DelayInstructions />
          </Tab>
          <Tab eventKey="resources" title={"Resources"}>
            <Resources />
          </Tab>{" "}
        </Tabs>
      </div>
    </div>
  );
};

export default NewBreakdownContent;
