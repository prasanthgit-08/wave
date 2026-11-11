import React, { useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import General from "../tab/General";
import Compliance from "../tab/Compliance";
import Maintenance from "../tab/Maintenance";
import Lease from "../tab/Lease";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DriverTrucksService from "../../../../../services/DriverFile/DriverTrucksService";
import {
  setDescriptionUnique,
  setFormData,
  setIsTabIdentification,
  setViewDetails,
} from "../../../../../redux/DriverTrucksSlice";
import LoadingIcon from "../../../../common/LoadingIcon";
import StateService from "../../../../../services/StateService";

const TruckFormContent = () => {
  const { driverId, recordId } = useParams();
  const id = recordId;
  const dispatch = useDispatch();
  const isGeneralTabValid = useSelector((state) => state.driverTrucks.isGeneralTabValid);
  const isComplianceTabValid = useSelector((state) => state.driverTrucks.isComplianceTabValid);
  const isMaintenanceTabValid = useSelector((state) => state.driverTrucks.isMaintenanceTabValid);
  const isTabIdentification = useSelector((state) => state.driverTrucks.isTabIdentification);
  const isLeaseTabValid = useSelector((state) => state.driverTrucks.isLeaseTabValid);
  const viewDetails = useSelector((state) => state.driverTrucks.viewDetails);
  const [loading8, setLoading8] = useState(false);
  const saveLoad = useSelector((state) => state.driverTrucks.saveLoad);
  const active = useSelector((state) => state.driverTrucks.active);
  const descriptionUnique = useSelector((state) => state.driverTrucks.descriptionUnique);
  // States list shared by General (license plate state) and Compliance (IRP plate state) - fetched once here
  const [stateList, setStateList] = useState([]);
  useEffect(() => {
    dispatch(setIsTabIdentification("general"));
    StateService.fetchPickupState()
      .then(({ data }) => {
        setStateList(data.content);
      })
      .catch(() => {});
  }, []);
  const fetchRecordById = () => {
    setLoading8(true);
    dispatch(setFormData(null));
    dispatch(setDescriptionUnique(false));
    DriverTrucksService.getDriverTruckById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setFormData(data));
        dispatch(setViewDetails(true));
      })
      .catch((error) => {
        console.error("Error fetching record:", error);
      })
      .finally(() => {
        setLoading8(false);
      });
  };

  useEffect(() => {
    if (recordId) {
      fetchRecordById();
      dispatch(setViewDetails(true));
      dispatch(setIsTabIdentification("general"));
    }
  }, [active]);
  return (
    <div className="p-2">
      {loading8 && <LoadingIcon />}
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <Tabs
          Tabs
          defaultActiveKey="general"
          activeKey={isTabIdentification}
          onSelect={(k) => {
            dispatch(setIsTabIdentification(k));
          }}
          id="uncontrolled-tab-example"
          className="m-b-2"
        >
          <Tab
            title={"General"}
            eventKey="general"
            tabClassName={!viewDetails ? (isGeneralTabValid ? "color-green" : "color-red") : ""}
          >
            <General stateList={stateList} />
          </Tab>

          <Tab
            title={"Compliance"}
            eventKey="compliance"
            tabClassName={!viewDetails ? (isComplianceTabValid ? "color-green" : "color-red") : ""}
          >
            <Compliance stateList={stateList} />
          </Tab>

          <Tab
            title={"Maintenance"}
            eventKey="maintenance"
            tabClassName={!viewDetails ? (isMaintenanceTabValid ? "color-green" : "color-red") : ""}
          >
            <Maintenance />
          </Tab>

          <Tab
            title={"Lease"}
            eventKey="lease"
            tabClassName={
              !viewDetails && isLeaseTabValid != null ? (isLeaseTabValid ? "color-green" : "color-red") : ""
            }
          >
            <Lease />
          </Tab>
        </Tabs>
        {saveLoad && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
      {loading8 && <LoadingIcon />}
    </div>
  );
};

export default TruckFormContent;
