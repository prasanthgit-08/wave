import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { setCurrentTab, setDriverAddNotes } from "../../../../../../../../redux/DriverAddNotesSlice";
import Notes from "../../../../../../../Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/DriverAddNotes/tab/Notes";

import Dispatch from "../../../../../../../Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/DriverAddNotes/tab/DispatchNotes";
import DriverServicesService from "../../../../../../../../services/DriverServicesService";

const DriverAddNotesContent = () => {
  const dispatch = useDispatch();
  const { driverId } = useParams();
  const loading = useSelector((state) => state.driverAddNotesReducer.loading);

  const fetchDriverDetails = () => {
    DriverServicesService.getDriverDetails(driverId)
      .then((res) => {
        dispatch(setDriverAddNotes(res.data));

        console.log(res.data);
      })

      .catch((err) => console.log(err));
  };
  const currentTab = useSelector((state) => state.driverAddNotesReducer.currentTab);
  const handleTabSelection = (key) => {
    dispatch(setCurrentTab(key));
  };

  useEffect(() => {
    fetchDriverDetails();
  }, []);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <Tabs
          defaultActiveKey="general"
          id="uncontrolled-tab-example"
          className="m-b-0"
          onSelect={handleTabSelection}
          activeKey={currentTab}
        >
          <Tab title={"Notes"} eventKey="notes">
            <Notes />
          </Tab>
          <Tab title={"Dispatch"} eventKey="dispatch">
            <Dispatch />
          </Tab>
        </Tabs>
        {loading && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DriverAddNotesContent;
