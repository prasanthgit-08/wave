import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import TestFileResultRequired from "./TestFileResultRequired";
import TestFileResultOptional from "./TestFileResultOptional";

const TestFileResultContent = () => {
  return (
    <div className="shadow-sm rounded border quarterScreenFormContentHeight">
      <Tabs defaultActiveKey="Required" id="uncontrolled-tab-example" className="m-b-2">
        <Tab eventKey="Required" title={"Required"}>
          <TestFileResultRequired />
        </Tab>

        <Tab eventKey="Optional" title={"Optional"}>
          <TestFileResultOptional />
        </Tab>
      </Tabs>
    </div>
  );
};

export default TestFileResultContent;
