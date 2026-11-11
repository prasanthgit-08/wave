import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadingIcon from "../../../common/LoadingIcon";
import General from "./Tabs/General";
import Conditions from "./Tabs/Conditions";
import { setActiveOrderTab } from "../../../../redux/CustomerOrdersSlice";

function CustomerOrderContent() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("general");
  const isCustomerOrderLoading = useSelector((state) => state.customerOrdersReducer.isCustomerOrderLoading);
  const isCustomerLoading = useSelector((state) => state.customerOrdersReducer.isCustomerLoading);
  const viewDetail = useSelector((state) => state.customerOrdersReducer.viewDetail);
  const disableSave = useSelector((state) => state.customerOrdersReducer.disableSave);

  return (
    <>
      {(isCustomerOrderLoading || (viewDetail && isCustomerLoading)) && <LoadingIcon />}
      <Tabs
        defaultActiveKey="general"
        id="uncontrolled-tab-example"
        className="m-b-0"
        onSelect={(key) => {
          setTab(key);
          dispatch(setActiveOrderTab(key));
        }}
        activeKey={tab}
      >
        <Tab
          tabClassName={!viewDetail ? (disableSave ? "color-red" : "color-green") : ""}
          eventKey="general"
          title={"General"}
        >
          <General />
        </Tab>
        <Tab eventKey="conditions" title={"Conditions"}>
          <Conditions />
        </Tab>
      </Tabs>
    </>
  );
}
export default CustomerOrderContent;
