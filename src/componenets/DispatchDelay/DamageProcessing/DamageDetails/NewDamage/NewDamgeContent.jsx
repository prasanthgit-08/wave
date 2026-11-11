import React from "react";
import General from "./tabs/General";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Emails from "./tabs/Emails";
import Comments from "./tabs/Comments";
import DamageInstructions from "./tabs/DamageInstructions";
import Resources from "./tabs/Resources";
const NewDamgeContent = () => {
  const newGenerlTabValid = useSelector((state) => state.damageReducer.newGenerlTabValid);
  const newEmailTabValid = useSelector((state) => state.damageReducer.newEmailTabValid);
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
          <Tab eventKey="DamageInstructions" title={"Damage Instructions"}>
            <DamageInstructions />
          </Tab>
          <Tab eventKey="resources" title={"Resources"}>
            <Resources />
          </Tab>{" "}
        </Tabs>
      </div>
    </div>
  );
};

export default NewDamgeContent;
