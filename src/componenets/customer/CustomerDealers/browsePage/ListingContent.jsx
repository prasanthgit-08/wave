import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import DealerTab from "./Tabs/DealerTab";
import CustomerTab from "./Tabs/CustomerTab";
import PlantTab from "./Tabs/PlantTab";
import PlantGroupTab from "./Tabs/PlantGroupTab";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../../redux/CustomerDealerSlice";

const ListingContent = () => {
  const dispatch = useDispatch();

  const activeTab = useSelector((state) => state.customerDealersFilter.activeTab);

  return (
    <div className="p-2">
      <div className="shadow-sm " style={{ height: "675px" }}>
        <Tabs
          defaultActiveKey="Dealer"
          id="uncontrolled-tab-example"
          className="m-b-2"
          activeKey={activeTab}
          onSelect={(k) => {
            dispatch(setActiveTab(k));
          }}
        >
          <Tab eventKey="Dealer" title={"Dealer"}>
            <DealerTab />
          </Tab>
          <Tab eventKey="Customer" title={"Customers"}>
            <CustomerTab />
          </Tab>
          <Tab eventKey="Plant" title={"Plants"}>
            <PlantTab />
          </Tab>
          <Tab eventKey="PlantGroup" title={"Plant Groups"}>
            <PlantGroupTab />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ListingContent;
